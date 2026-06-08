import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Billboard, Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { fibonacci3D } from '@/lib/utils'
import { sphereLogos } from '@/data/skills'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const SPHERE_RADIUS = 2.2

function LogoSprite({ position, name, slug }: { position: [number, number, number]; name: string; slug: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.set(
        position[0] * SPHERE_RADIUS,
        position[1] * SPHERE_RADIUS,
        position[2] * SPHERE_RADIUS,
      )
      const pulse = 0.9 + Math.sin(clock.getElapsedTime() * 0.5 + position[0] * 3) * 0.05
      meshRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <Billboard position={[position[0] * SPHERE_RADIUS, position[1] * SPHERE_RADIUS, position[2] * SPHERE_RADIUS]}>
      <Html
        center
        style={{ pointerEvents: 'none', userSelect: 'none' }}
        distanceFactor={6}
      >
        <div
          className="w-10 h-10 flex items-center justify-center"
          title={name}
          aria-label={name}
        >
          <img
            src={`https://cdn.simpleicons.org/${slug}/3B49DF`}
            alt={name}
            width={28}
            height={28}
            style={{ filter: 'drop-shadow(0 0 6px rgba(59,73,223,0.4))' }}
            loading="lazy"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement
              el.style.display = 'none'
            }}
          />
        </div>
      </Html>
    </Billboard>
  )
}

function SphereGroup() {
  const groupRef = useRef<THREE.Group>(null)
  const reduced = useReducedMotion()
  const { gl } = useThree()

  gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const positions = useMemo(() => fibonacci3D(sphereLogos.length), [])

  useFrame((_, delta) => {
    if (groupRef.current && !reduced) {
      groupRef.current.rotation.y += delta * 0.12
      groupRef.current.rotation.x += delta * 0.03
    }
  })

  return (
    <group ref={groupRef}>
      {sphereLogos.map((logo, i) => (
        <LogoSprite key={logo.slug} position={positions[i]} name={logo.name} slug={logo.slug} />
      ))}
    </group>
  )
}

function Scene() {
  const reduced = useReducedMotion()

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#3B49DF" />
      <pointLight position={[-5, -5, 5]} intensity={0.3} color="#FF7A45" />
      <SphereGroup />
      {!reduced && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.4}
          autoRotate={false}
        />
      )}
    </>
  )
}

function FallbackGrid() {
  return (
    <div
      className="grid grid-cols-4 gap-4 p-8"
      aria-label="Technology logos"
    >
      {sphereLogos.map((logo) => (
        <div key={logo.slug} className="flex flex-col items-center gap-1" title={logo.name}>
          <img
            src={`https://cdn.simpleicons.org/${logo.slug}/3B49DF`}
            alt={logo.name}
            width={32}
            height={32}
            loading="lazy"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement
              el.style.display = 'none'
            }}
          />
          <span className="text-xs text-muted font-mono text-center leading-tight">{logo.name}</span>
        </div>
      ))}
    </div>
  )
}

interface TechSphereProps {
  webGLSupported: boolean
}

export default function TechSphere({ webGLSupported }: TechSphereProps) {
  const reduced = useReducedMotion()

  if (!webGLSupported || reduced) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <FallbackGrid />
      </div>
    )
  }

  return (
    <div className="w-full h-full" role="img" aria-label="Interactive 3D sphere of technology logos">
      <Suspense fallback={<FallbackGrid />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{ antialias: true, alpha: true }}
          dpr={Math.min(window.devicePixelRatio, 2)}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  )
}
