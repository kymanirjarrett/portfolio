import { Canvas } from '@react-three/fiber'
import { View } from '@react-three/drei'
import NameBlocks from './NameBlocks'
import PalmTree from './PalmTree'

/*
 * Everything 3D on the homepage, loaded lazily so the text renders first and
 * three.js stays out of the initial bundle. The name and the palm share one
 * WebGL canvas: each <View> tracks a DOM box and the canvas draws each scene
 * into its box (scissoring), so the page holds a single WebGL context.
 */

interface SceneCanvasProps {
  /** On screen and the tab visible. When false the render loop stops. */
  active: boolean
  reduced: boolean
}

export function SceneCanvas({ active, reduced }: SceneCanvasProps) {
  // Reduced motion: nothing moves on its own, so render only when state changes.
  const frameloop = !active ? 'never' : reduced ? 'demand' : 'always'
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={frameloop}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <View.Port />
    </Canvas>
  )
}

interface NameViewProps {
  graph: boolean
  reduced: boolean
  className?: string
}

export function NameView({ graph, reduced, className }: NameViewProps) {
  return (
    <View className={className}>
      <NameBlocks graph={graph} reduced={reduced} />
    </View>
  )
}

export function PalmView({ reduced, className }: { reduced: boolean; className?: string }) {
  return (
    <View id="palm-view" className={className}>
      <PalmTree reduced={reduced} />
    </View>
  )
}
