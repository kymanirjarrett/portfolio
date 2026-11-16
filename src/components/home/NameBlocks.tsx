import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { buildCells, CELL_COUNT, GRID_COLS, GRID_ROWS, LEVEL_COLORS } from '@/lib/nameGrid'

// Block heights in cell units. Name cells sit slightly raised at rest; in the
// graph, height rises with level like GitHub Skyline.
const EMPTY_H = 0.14
const NAME_H = 0.55
const LEVEL_H = [EMPTY_H, 0.6, 1.1, 1.6, 2.2]
const BLOCK = 0.86 // block footprint; the rest of each cell is the gap

// Per-column spring. Stiffness and damping give a slight overshoot that settles
// in about half a second; the left-to-right stagger adds about 0.3 s on top.
const STIFFNESS = 170
const DAMPING = 20
const STAGGER_S = 0.3

// Three-quarter view from slightly above.
const PITCH = THREE.MathUtils.degToRad(54)
const YAW = THREE.MathUtils.degToRad(-5)
const FOV = 22

interface NameBlocksProps {
  graph: boolean
  reduced: boolean
}

export default function NameBlocks({ graph, reduced }: NameBlocksProps) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const cells = useMemo(() => buildCells(), [])
  const geometry = useMemo(() => new RoundedBoxGeometry(BLOCK, 1, BLOCK, 3, 0.1), [])
  const invalidate = useThree((s) => s.invalidate)

  // Animation state per column: position (0 = name, 1 = graph), velocity, and
  // the clock time at which that column starts moving toward the new target.
  const sim = useRef({
    x: new Float32Array(GRID_COLS),
    v: new Float32Array(GRID_COLS),
    start: new Float32Array(GRID_COLS),
    target: 0,
    settled: false,
  })

  const colors = useMemo(() => {
    const rest = cells.map((c) => new THREE.Color(LEVEL_COLORS[c.name ? 4 : 0]))
    const graphColors = cells.map((c) => new THREE.Color(LEVEL_COLORS[c.level]))
    return { rest, graph: graphColors }
  }, [cells])

  const clock = useThree((s) => s.clock)
  useEffect(() => {
    const s = sim.current
    s.target = graph ? 1 : 0
    s.settled = false
    const now = clock.getElapsedTime()
    for (let col = 0; col < GRID_COLS; col++) {
      s.start[col] = reduced ? now : now + (col / (GRID_COLS - 1)) * STAGGER_S
      if (reduced) {
        s.x[col] = s.target
        s.v[col] = 0
      }
    }
    invalidate()
  }, [graph, reduced, clock, invalidate])

  const matrix = useMemo(() => new THREE.Matrix4(), [])
  const color = useMemo(() => new THREE.Color(), [])
  const pos = useMemo(() => new THREE.Vector3(), [])
  const scale = useMemo(() => new THREE.Vector3(1, 1, 1), [])
  const quat = useMemo(() => new THREE.Quaternion(), [])

  function writeInstances() {
    const m = mesh.current
    if (!m) return
    const { x } = sim.current
    for (let i = 0; i < CELL_COUNT; i++) {
      const cell = cells[i]
      const p = x[cell.col]
      const restH = cell.name ? NAME_H : EMPTY_H
      const h = Math.max(0.04, restH + (LEVEL_H[cell.level] - restH) * p)
      pos.set(cell.col - (GRID_COLS - 1) / 2, h / 2, cell.row - (GRID_ROWS - 1) / 2)
      scale.set(1, h, 1)
      matrix.compose(pos, quat, scale)
      m.setMatrixAt(i, matrix)
      color.copy(colors.rest[i]).lerp(colors.graph[i], THREE.MathUtils.clamp(p, 0, 1))
      m.setColorAt(i, color)
    }
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true
  }

  useLayoutEffect(writeInstances)

  useFrame((state, delta) => {
    const s = sim.current
    if (s.settled) return
    const dt = Math.min(delta, 1 / 30)
    const now = state.clock.getElapsedTime()
    let moving = false
    for (let col = 0; col < GRID_COLS; col++) {
      if (now < s.start[col]) {
        moving = true
        continue
      }
      const force = STIFFNESS * (s.target - s.x[col]) - DAMPING * s.v[col]
      s.v[col] += force * dt
      s.x[col] += s.v[col] * dt
      if (Math.abs(s.target - s.x[col]) > 0.001 || Math.abs(s.v[col]) > 0.001) moving = true
      else {
        s.x[col] = s.target
        s.v[col] = 0
      }
    }
    writeInstances()
    if (moving) state.invalidate()
    else s.settled = true
  })

  return (
    <>
      <PerspectiveCamera makeDefault />
      <FitCamera />
      <hemisphereLight args={['#fffaf0', '#c9bfa8', 1.6]} />
      <directionalLight position={[-8, 18, 10]} intensity={1.5} />
      <instancedMesh ref={mesh} args={[geometry, undefined, CELL_COUNT]}>
        <meshStandardMaterial roughness={0.9} metalness={0} />
      </instancedMesh>
      <ContactShadows
        position={[0, 0.001, 0]}
        scale={[GRID_COLS + 4, GRID_ROWS + 4]}
        far={3}
        blur={2.4}
        opacity={0.28}
        resolution={512}
        color="#1F2A24"
      />
    </>
  )
}

/** Places the camera so the whole grid, including the tallest blocks, fits the view's width. */
function FitCamera() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera
  const size = useThree((s) => s.size)

  useLayoutEffect(() => {
    const aspect = size.width / Math.max(size.height, 1)
    camera.fov = FOV
    camera.aspect = aspect
    const vHalf = THREE.MathUtils.degToRad(FOV / 2)
    const hHalf = Math.atan(Math.tan(vHalf) * aspect)
    const halfWidth = (GRID_COLS + 1) / 2
    const dist = (halfWidth / Math.tan(hHalf)) * 1.1
    camera.position.set(
      Math.sin(YAW) * Math.cos(PITCH) * dist,
      Math.sin(PITCH) * dist,
      Math.cos(YAW) * Math.cos(PITCH) * dist
    )
    camera.near = dist / 10
    camera.far = dist * 3
    camera.lookAt(0, 0.5, 0)
    camera.updateProjectionMatrix()
  }, [camera, size])

  return null
}
