import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Billboard } from '@react-three/drei'
import * as THREE from 'three'
import { sphereLogos, type SphereLogo } from '@/data/sphereLogos'
import { fibonacci3D } from '@/lib/utils'

/*
 * The sun on the experience page: a warm clay sphere wrapped in the technology
 * logos. When a role is on screen, the sun turns to bring that role's logos to
 * the front and dims the rest. Logos are textured discs (not DOM overlays), so
 * the sun's body hides the ones on its far side.
 */

const CORE_RADIUS = 1.9
const LOGO_RADIUS = 2.02
const DISC_SIZE = 0.62
const DIM_OPACITY = 0.32
const IDLE_SPIN = 0.1 // radians per second around the vertical axis

const SUN_COLOR = '#F6BE55'
const SUN_GLOW = '#F2A93B'
const DISC_COLOR = '#FFF8EA'
const ICON_COLOR = '#0E6B4F'

/** Draws one logo onto a round paper disc, as a texture. */
function makeLogoTexture(logo: SphereLogo): THREE.CanvasTexture {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.beginPath()
  ctx.arc(size / 2, size / 2, size / 2 - 3, 0, Math.PI * 2)
  ctx.fillStyle = DISC_COLOR
  ctx.fill()
  ctx.lineWidth = 3
  ctx.strokeStyle = 'rgba(31, 42, 36, 0.12)'
  ctx.stroke()

  const [, , vbW, vbH] = logo.viewBox.split(/\s+/).map(Number)
  const iconSize = size * 0.54
  const scale = iconSize / Math.max(vbW, vbH)
  ctx.translate((size - vbW * scale) / 2, (size - vbH * scale) / 2)
  ctx.scale(scale, scale)
  ctx.fillStyle = ICON_COLOR
  ctx.fill(new Path2D(logo.path))

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

/** A soft radial glow, drawn once. */
function makeGlowTexture(): THREE.CanvasTexture {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255, 214, 140, 0.9)')
  g.addColorStop(0.45, 'rgba(255, 200, 120, 0.35)')
  g.addColorStop(0.9, 'rgba(255, 200, 120, 0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

const FORWARD = new THREE.Vector3(0, 0.12, 1).normalize()

interface SunProps {
  highlight: string[]
  reduced: boolean
}

function Sun({ highlight, reduced }: SunProps) {
  const group = useRef<THREE.Group>(null)
  const discs = useRef<(THREE.Mesh | null)[]>([])
  const positions = useMemo(() => fibonacci3D(sphereLogos.length), [])
  const textures = useMemo(() => sphereLogos.map(makeLogoTexture), [])
  const glow = useMemo(makeGlowTexture, [])

  useEffect(
    () => () => {
      textures.forEach((t) => t.dispose())
      glow.dispose()
    },
    [textures, glow]
  )

  const active = useMemo(() => new Set(highlight), [highlight])

  // The rotation that brings the average direction of the active logos to face
  // the viewer. Null when nothing is highlighted: the sun just spins slowly.
  const target = useMemo(() => {
    const dir = new THREE.Vector3()
    sphereLogos.forEach((logo, i) => {
      if (active.has(logo.name)) dir.add(new THREE.Vector3(...positions[i]))
    })
    if (dir.lengthSq() < 1e-6) {
      const first = sphereLogos.findIndex((l) => active.has(l.name))
      if (first < 0) return null
      dir.set(...positions[first])
    }
    return new THREE.Quaternion().setFromUnitVectors(dir.normalize(), FORWARD)
  }, [active, positions])

  useEffect(() => {
    if (reduced && target && group.current) group.current.quaternion.copy(target)
  }, [reduced, target])

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    const dt = Math.min(delta, 1 / 30)
    if (target) {
      if (!reduced) g.quaternion.slerp(target, 1 - Math.exp(-3 * dt))
    } else if (!reduced) {
      g.rotateY(IDLE_SPIN * dt)
    }
    discs.current.forEach((mesh, i) => {
      if (!mesh) return
      const on = active.size === 0 || active.has(sphereLogos[i].name)
      const material = mesh.material as THREE.MeshBasicMaterial
      const goalOpacity = on ? 1 : DIM_OPACITY
      const goalScale = on && active.size > 0 ? 1.18 : 1
      if (reduced) {
        material.opacity = goalOpacity
        mesh.scale.setScalar(goalScale)
      } else {
        material.opacity = THREE.MathUtils.damp(material.opacity, goalOpacity, 6, dt)
        mesh.scale.setScalar(THREE.MathUtils.damp(mesh.scale.x, goalScale, 6, dt))
      }
    })
  })

  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[-3, 4, 6]} intensity={1.4} />
      {/* Sized to fade out well inside the canvas, so its edges never show as a square. */}
      <sprite scale={[7.2, 7.2, 1]} position={[0, 0, -2.4]}>
        <spriteMaterial map={glow} transparent depthWrite={false} />
      </sprite>
      <mesh>
        <sphereGeometry args={[CORE_RADIUS, 48, 32]} />
        <meshStandardMaterial
          color={SUN_COLOR}
          emissive={SUN_GLOW}
          emissiveIntensity={0.45}
          roughness={0.85}
          metalness={0}
        />
      </mesh>
      <group ref={group}>
        {sphereLogos.map((logo, i) => {
          const [x, y, z] = positions[i]
          return (
            <Billboard
              key={logo.name}
              position={[x * LOGO_RADIUS, y * LOGO_RADIUS, z * LOGO_RADIUS]}
            >
              <mesh
                ref={(el) => {
                  discs.current[i] = el
                }}
              >
                <circleGeometry args={[DISC_SIZE / 2, 40]} />
                <meshBasicMaterial map={textures[i]} transparent toneMapped={false} />
              </mesh>
            </Billboard>
          )
        })}
      </group>
    </>
  )
}

interface SunSceneProps {
  /** Logo names to bring forward; empty means none are singled out. */
  highlight: string[]
  reduced: boolean
  /** On screen and the tab visible. When false the render loop stops. */
  active: boolean
}

export default function SunScene({ highlight, reduced, active }: SunSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, 9.2], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <Sun highlight={highlight} reduced={reduced} />
    </Canvas>
  )
}
