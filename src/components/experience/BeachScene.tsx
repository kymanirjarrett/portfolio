import type { ReactNode } from 'react'
import { motion, useTransform, type MotionValue } from 'motion/react'
import { cn } from '@/lib/utils'

/*
 * A beach facing the sea, drawn with layered gradients and SVG: sky, sun, sea,
 * shoreline waves, and sand. `day` runs from 0 (sunrise) to 1 (sunset) and
 * drives the sky colors, the sun's arc, and its reflection on the water.
 * Layer order matters: the sea is above the sun so the sun rises out of it
 * and sets into it.
 */

export const HORIZON = 0.56 // horizon height, as a fraction of the scene

// Sky at dawn, midday, and golden hour: [top, near the horizon].
const SKY_TOP = ['#F4D3C2', '#A8DBEA', '#F2C08F']
const SKY_LOW = ['#FBEBDD', '#EAF6F8', '#FBE2C0']
const SEA_TOP = ['#7FB9BE', '#5DB7C2', '#6FA8AE']
const SEA_LOW = ['#4C9EA6', '#2F96A3', '#4A8F96']
const DAY = [0, 0.5, 1]

// The sun's arc, as fractions of the scene: it rises at the left of the open
// sky, peaks, and sets at the right edge.
const ARC_START_X = 0.48
const ARC_END_X = 0.93
const ARC_PEAK = 0.3 // how far above the horizon it climbs; keeps it clear of the nav

interface BeachSceneProps {
  day: MotionValue<number>
  /** The sun itself (3D canvas or flat fallback), sized by the scene. */
  sun: ReactNode
  /** Fade the left side to sand so text there stays readable (desktop layout). */
  scrim?: boolean
  /** The short header band on small screens: a smaller sun on a lower arc. */
  compact?: boolean
  className?: string
}

export default function BeachScene({
  day,
  sun,
  scrim = false,
  compact = false,
  className,
}: BeachSceneProps) {
  const peak = compact ? 0.22 : ARC_PEAK
  const skyTop = useTransform(day, DAY, SKY_TOP)
  const skyLow = useTransform(day, DAY, SKY_LOW)
  const seaTop = useTransform(day, DAY, SEA_TOP)
  const seaLow = useTransform(day, DAY, SEA_LOW)
  const sky = useTransform(
    [skyTop, skyLow],
    ([top, low]) => `linear-gradient(to bottom, ${top} 0%, ${low} ${HORIZON * 100}%)`
  )
  const sea = useTransform(
    [seaTop, seaLow],
    ([top, low]) => `linear-gradient(to bottom, ${top}, ${low})`
  )

  const sunX = useTransform(day, (d) => `${(ARC_START_X + (ARC_END_X - ARC_START_X) * d) * 100}%`)
  const sunY = useTransform(day, (d) => `${(HORIZON - peak * Math.sin(Math.PI * d)) * 100}%`)
  // The reflection is strongest when the sun is low over the water.
  const glint = useTransform(day, (d) => 0.25 + 0.55 * (1 - Math.sin(Math.PI * d)))

  return (
    <div aria-hidden="true" className={cn('relative overflow-hidden', className)}>
      <motion.div className="absolute inset-0" style={{ backgroundImage: sky }} />

      <motion.div
        className={cn(
          'absolute -translate-x-1/2 -translate-y-1/2',
          compact ? 'size-[clamp(9rem,40vw,13rem)]' : 'size-[clamp(13rem,26vw,26rem)]'
        )}
        style={{ left: sunX, top: sunY }}
      >
        {sun}
      </motion.div>

      {/* Sea, from the horizon down to the shore. */}
      <motion.div
        className="absolute inset-x-0"
        style={{ top: `${HORIZON * 100}%`, height: '22%', backgroundImage: sea }}
      >
        <motion.div
          className="absolute top-0 h-full w-[clamp(4rem,9vw,9rem)] -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,rgb(255_236_190/0.7)_0_2px,transparent_2px_10px)] [mask-image:linear-gradient(to_bottom,black,transparent)]"
          style={{ left: sunX, opacity: glint }}
        />
      </motion.div>

      {/* Sand, with waves washing over the top edge. */}
      <div className="absolute inset-x-0 bottom-0" style={{ top: `${(HORIZON + 0.2) * 100}%` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#E9DCC0] via-[#F1E7D3] to-canvas" />
        <Waves />
      </div>

      {scrim && (
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(246_241_231/0.96)_0%,rgb(246_241_231/0.92)_38%,rgb(246_241_231/0)_56%)]" />
      )}
    </div>
  )
}

/** Two layers of foam at the waterline, drifting slowly in opposite directions. */
function Waves() {
  const path =
    'M0 18 C 60 6, 120 6, 180 18 S 300 30, 360 18 S 480 6, 540 18 S 660 30, 720 18 V0 H0 Z'
  return (
    <div className="absolute inset-x-0 -top-px h-8 overflow-hidden">
      <svg
        viewBox="0 0 1440 36"
        preserveAspectRatio="none"
        className="absolute left-0 top-0 h-full w-[200%] animate-[wave_14s_linear_infinite]"
      >
        <path d={path} fill="#4C9EA6" opacity="0.55" />
        <path d={path} transform="translate(720 0)" fill="#4C9EA6" opacity="0.55" />
      </svg>
      <svg
        viewBox="0 0 1440 36"
        preserveAspectRatio="none"
        className="absolute left-0 top-0 h-[70%] w-[200%] animate-[wave_9s_linear_infinite_reverse]"
      >
        <path d={path} fill="#FFFDF7" opacity="0.8" />
        <path d={path} transform="translate(720 0)" fill="#FFFDF7" opacity="0.8" />
      </svg>
    </div>
  )
}
