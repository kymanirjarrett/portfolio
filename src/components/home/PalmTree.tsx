import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { LEVEL_COLORS } from '@/lib/nameGrid'

/*
 * A stylized, clay-like palm built from primitives: a curved, segmented trunk,
 * arching fronds of split leaflets, and a few coconuts. Chunky on purpose. It is
 * scenery, so its motion is a slow breeze sway and a small lean toward the cursor.
 */

const TRUNK_COLOR = '#B98A5E'
const TRUNK_RING_COLOR = '#A87B50'
const COCONUT_COLOR = '#6B4A2B'
const FROND_COLORS = [LEVEL_COLORS[2], LEVEL_COLORS[3], LEVEL_COLORS[4]]

const FROND_COUNT = 8
const LEAFLET_PAIRS = 15
const MAX_LEAN = THREE.MathUtils.degToRad(3.5)

// The trunk leans in from the right toward the text. It starts well below the
// bottom of the view, so the palm always runs off the bottom edge of the screen.
const TRUNK_CURVE = new THREE.CubicBezierCurve3(
  new THREE.Vector3(0.45, -4, 0),
  new THREE.Vector3(0.3, 1.4, 0),
  new THREE.Vector3(-0.7, 4.3, 0.2),
  new THREE.Vector3(-1.7, 5.9, 0.3)
)
const CROWN = TRUNK_CURVE.getPoint(1)

// Camera framing: the world x that lands on the right edge of the view, so the
// palm is cropped by the screen edge as if growing just off-screen.
const RIGHT_EDGE_X = 0.55
const FOV = 34
const CAMERA_Z = 15
const LOOK_Y = 4.3

function rand(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453
  return x - Math.floor(x)
}

interface PalmTreeProps {
  reduced: boolean
}

export default function PalmTree({ reduced }: PalmTreeProps) {
  const lean = useRef<THREE.Group>(null)
  const crown = useRef<THREE.Group>(null)
  const fronds = useRef<(THREE.Group | null)[]>([])
  const pointerX = useRef(0)
  const size = useThree((s) => s.size) as { width: number; left?: number }

  const frondDefs = useMemo(
    () =>
      Array.from({ length: FROND_COUNT }, (_, i) => ({
        // Offset by half a step so no frond points straight at the camera.
        yaw: ((i + 0.5) / FROND_COUNT) * Math.PI * 2 + (rand(i + 1) - 0.5) * 0.35,
        pitch: 0.15 + rand(i + 11) * 0.35,
        length: 0.85 + rand(i + 21) * 0.3,
        phase: rand(i + 31) * Math.PI * 2,
        color: FROND_COLORS[i % FROND_COLORS.length],
      })),
    []
  )

  // Pointer position relative to the palm's view, from -1 (far left) to 1.
  useEffect(() => {
    if (reduced) return
    function onMove(e: PointerEvent) {
      const center = (size.left ?? 0) + size.width / 2
      pointerX.current = THREE.MathUtils.clamp(
        (e.clientX - center) / (window.innerWidth / 2),
        -1,
        1
      )
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced, size])

  useFrame((state, delta) => {
    if (reduced) return
    const t = state.clock.getElapsedTime()
    const dt = Math.min(delta, 1 / 30)
    if (lean.current) {
      // Lean toward the cursor: positive z rotation tips the crown to the left.
      const target = -pointerX.current * MAX_LEAN + Math.sin(t * 0.4) * 0.012
      lean.current.rotation.z = THREE.MathUtils.damp(lean.current.rotation.z, target, 1.6, dt)
    }
    if (crown.current) crown.current.rotation.z = Math.sin(t * 0.55 + 0.6) * 0.025
    fronds.current.forEach((frond, i) => {
      if (!frond) return
      const def = frondDefs[i]
      frond.rotation.z = -def.pitch + Math.sin(t * 0.9 + def.phase) * 0.05
      frond.rotation.x = Math.sin(t * 0.7 + def.phase * 1.3) * 0.035
    })
  })

  return (
    <>
      <PalmCamera />
      <hemisphereLight args={['#fffaf0', '#cdbf9f', 1.7]} />
      <directionalLight position={[-6, 10, 8]} intensity={1.6} />

      <group ref={lean}>
        <Trunk />
        <group ref={crown} position={CROWN}>
          {frondDefs.map((def, i) => (
            <group key={i} rotation-y={def.yaw}>
              <group
                ref={(el) => {
                  fronds.current[i] = el
                }}
                rotation-z={-def.pitch}
              >
                <Frond length={def.length} color={def.color} seed={i} />
              </group>
            </group>
          ))}
          <Coconuts />
        </group>
      </group>
    </>
  )
}

/** Puts the camera so the palm's right side is cropped by the edge of its view. */
function PalmCamera() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera
  const size = useThree((s) => s.size)

  useLayoutEffect(() => {
    const aspect = size.width / Math.max(size.height, 1)
    const halfW = Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * CAMERA_Z * aspect
    const x = RIGHT_EDGE_X - halfW
    camera.fov = FOV
    camera.aspect = aspect
    camera.position.set(x, LOOK_Y - 0.4, CAMERA_Z)
    camera.lookAt(x, LOOK_Y, 0)
    camera.updateProjectionMatrix()
  }, [camera, size])

  return <PerspectiveCamera makeDefault />
}

function Trunk() {
  const segments = useMemo(() => {
    const count = 13
    return Array.from({ length: count }, (_, i) => {
      const t0 = i / count
      const t1 = (i + 1) / count
      const a = TRUNK_CURVE.getPoint(t0)
      const b = TRUNK_CURVE.getPoint(t1)
      const mid = a.clone().lerp(b, 0.5)
      const dir = b.clone().sub(a)
      const length = dir.length()
      const quat = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.normalize()
      )
      const radius = THREE.MathUtils.lerp(0.42, 0.2, t0)
      return { mid, quat, length: length * 1.04, radius }
    })
  }, [])

  return (
    <group>
      {segments.map(({ mid, quat, length, radius }, i) => (
        <mesh key={i} position={mid} quaternion={quat}>
          {/* Wider at the bottom of each segment, so the trunk reads as stacked rings. */}
          <cylinderGeometry args={[radius * 0.9, radius * 1.1, length, 14]} />
          <meshStandardMaterial
            color={i % 2 ? TRUNK_COLOR : TRUNK_RING_COLOR}
            roughness={1}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  )
}

interface FrondProps {
  length: number
  color: string
  seed: number
}

/** One frond in its local space: the stem arches out along +x and droops at the tip. */
function Frond({ length, color, seed }: FrondProps) {
  const { stem, leaflets } = useMemo(() => {
    const L = 3.9 * length
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(L * 0.28, L * 0.16, 0),
      new THREE.Vector3(L * 0.58, L * 0.12, 0),
      new THREE.Vector3(L * 0.82, -L * 0.1, 0),
      new THREE.Vector3(L, -L * 0.36, 0),
    ])
    const stemGeometry = new THREE.TubeGeometry(curve, 28, 0.055, 6, false)

    const leafletMatrices: THREE.Matrix4[] = []
    const up = new THREE.Vector3(0, 1, 0)
    for (let i = 0; i < LEAFLET_PAIRS; i++) {
      const t = 0.12 + (i / (LEAFLET_PAIRS - 1)) * 0.84
      const p = curve.getPoint(t)
      const tangent = curve.getTangent(t)
      const side = new THREE.Vector3().crossVectors(tangent, up).normalize()
      const leafLength = 1.05 * length * (1 - t * 0.55) * (0.9 + rand(seed * 50 + i) * 0.2)
      const droop = 0.5 + t * 0.5
      for (const s of [1, -1]) {
        const dir = side
          .clone()
          .multiplyScalar(s * Math.cos(droop))
          .addScaledVector(up, -Math.sin(droop))
          .addScaledVector(tangent, 0.45)
          .normalize()
        const zAxis = tangent.clone().addScaledVector(dir, -dir.dot(tangent)).normalize()
        const yAxis = new THREE.Vector3().crossVectors(zAxis, dir).normalize()
        const basis = new THREE.Matrix4().makeBasis(dir, yAxis, zAxis)
        const center = p.clone().addScaledVector(dir, leafLength / 2)
        const m = new THREE.Matrix4()
          .makeTranslation(center.x, center.y, center.z)
          .multiply(basis)
          .multiply(new THREE.Matrix4().makeScale(leafLength / 2, 0.035, 0.11))
        leafletMatrices.push(m)
      }
    }
    return { stem: stemGeometry, leaflets: leafletMatrices }
  }, [length, seed])

  const leafletMesh = useRef<THREE.InstancedMesh>(null)
  const leafletGeometry = useMemo(() => new THREE.SphereGeometry(1, 10, 6), [])

  useLayoutEffect(() => {
    const m = leafletMesh.current
    if (!m) return
    leaflets.forEach((matrix, i) => m.setMatrixAt(i, matrix))
    m.instanceMatrix.needsUpdate = true
  }, [leaflets])

  return (
    <>
      <mesh geometry={stem}>
        <meshStandardMaterial color={color} roughness={1} metalness={0} />
      </mesh>
      <instancedMesh ref={leafletMesh} args={[leafletGeometry, undefined, leaflets.length]}>
        <meshStandardMaterial color={color} roughness={0.95} metalness={0} />
      </instancedMesh>
    </>
  )
}

function Coconuts() {
  const spots: [number, number, number][] = [
    [0.18, -0.32, 0.2],
    [-0.22, -0.36, 0.12],
    [0.02, -0.4, -0.24],
  ]
  return (
    <>
      {spots.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.24, 16, 12]} />
          <meshStandardMaterial color={COCONUT_COLOR} roughness={0.9} metalness={0} />
        </mesh>
      ))}
    </>
  )
}
