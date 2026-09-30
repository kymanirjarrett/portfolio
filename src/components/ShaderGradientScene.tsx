import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react'

/** Children of ShaderGradientCanvas render inside its react-three-fiber Canvas. */
function FrameloopSwitch({ active }: { active: boolean }) {
  const setFrameloop = useThree((state) => state.setFrameloop)
  useEffect(() => {
    setFrameloop(active ? 'always' : 'never')
  }, [active, setFrameloop])
  return null
}

interface ShaderGradientSceneProps {
  active: boolean
  onReady?: () => void
}

/**
 * Slow, low-contrast atmosphere behind the tech sphere. Loaded lazily so three.js
 * stays out of the initial bundle. `lightType: '3d'` avoids fetching HDR
 * environment maps over the network.
 */
export default function ShaderGradientScene({ active, onReady }: ShaderGradientSceneProps) {
  useEffect(() => {
    onReady?.()
  }, [onReady])

  return (
    <ShaderGradientCanvas pixelDensity={1} fov={45} pointerEvents="none" lazyLoad={false}>
      <FrameloopSwitch active={active} />
      <ShaderGradient
        control="props"
        type="plane"
        animate="on"
        uSpeed={0.08}
        uStrength={4}
        uDensity={1.5}
        uFrequency={5.5}
        uAmplitude={1}
        positionX={-0.95}
        positionY={0}
        positionZ={0}
        rotationX={0}
        rotationY={10}
        rotationZ={50}
        color1="#2F54EB"
        color2="#7B4DFF"
        color3="#FF7F11"
        reflection={0.1}
        cAzimuthAngle={180}
        cPolarAngle={90}
        cDistance={3.6}
        cameraZoom={1}
        lightType="3d"
        brightness={1.2}
        envPreset="city"
        grain="on"
        enableTransition={false}
      />
    </ShaderGradientCanvas>
  )
}
