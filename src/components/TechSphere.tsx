import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Billboard, Html, OrbitControls } from '@react-three/drei'
import type * as THREE from 'three'
import { fibonacci3D } from '@/lib/utils'
import { sphereLogos } from '@/data/sphereLogos'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import LogoMark from './LogoMark'

const SPHERE_RADIUS = 2.2

// Each logo sits on a paper disc so it stays legible over every frame of the
// gradient behind the hero, from the brightest to the darkest.
const discClass =
  'flex h-11 w-11 items-center justify-center rounded-full bg-paper/90 text-cobalt shadow-[0_2px_10px_rgb(20_20_50/0.14)]'

function SphereGroup() {
  const groupRef = useRef<THREE.Group>(null)
  const positions = useMemo(() => fibonacci3D(sphereLogos.length), [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.12
    groupRef.current.rotation.x += delta * 0.03
  })

  return (
    <group ref={groupRef}>
      {sphereLogos.map((logo, i) => {
        const [x, y, z] = positions[i]
        return (
          <Billboard
            key={logo.name}
            position={[x * SPHERE_RADIUS, y * SPHERE_RADIUS, z * SPHERE_RADIUS]}
          >
            <Html center distanceFactor={6} style={{ pointerEvents: 'none', userSelect: 'none' }}>
              <div className={discClass} title={logo.name}>
                <LogoMark logo={logo} />
              </div>
            </Html>
          </Billboard>
        )
      })}
    </group>
  )
}

/** Stops rendering while the hero is off screen or the tab is hidden. */
function FrameloopSwitch({ active }: { active: boolean }) {
  const setFrameloop = useThree((state) => state.setFrameloop)
  useEffect(() => {
    setFrameloop(active ? 'always' : 'never')
  }, [active, setFrameloop])
  return null
}

function FallbackGrid() {
  return (
    <ul
      className="grid grid-cols-4 gap-x-4 gap-y-5 p-6 sm:grid-cols-5"
      aria-label="Technology logos"
    >
      {sphereLogos.map((logo) => (
        <li key={logo.name} className="flex flex-col items-center gap-1.5">
          <span className={discClass}>
            <LogoMark logo={logo} />
          </span>
          <span className="text-center text-small leading-tight text-muted">{logo.name}</span>
        </li>
      ))}
    </ul>
  )
}

interface TechSphereProps {
  webGLSupported: boolean
  /** False pauses the render loop. */
  active?: boolean
}

export default function TechSphere({ webGLSupported, active = true }: TechSphereProps) {
  const reduced = useReducedMotion()

  if (!webGLSupported || reduced) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <FallbackGrid />
      </div>
    )
  }

  return (
    <div
      className="h-full w-full"
      role="img"
      aria-label="Interactive 3D sphere of technology logos"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <FrameloopSwitch active={active} />
        <SphereGroup />
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.4} />
      </Canvas>
    </div>
  )
}
