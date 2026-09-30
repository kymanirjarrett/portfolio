import { lazy, Suspense, useCallback, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useWebGL } from '@/hooks/useWebGL'
import { DESKTOP_QUERY, useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

const ShaderGradientScene = lazy(() => import('./ShaderGradientScene'))

export const STATIC_GRADIENT_SRC = '/hero-gradient.webp'

interface HeroAtmosphereProps {
  /** False pauses the live gradient (hero off screen or tab hidden). */
  active: boolean
}

/**
 * The gradient behind the hero sphere. On desktop with WebGL it is a live
 * ShaderGradient; on mobile, under reduced motion, or without WebGL it is a
 * static export of the same gradient. The static image also shows while the
 * live one loads, so the swap is a fade rather than a pop.
 */
export default function HeroAtmosphere({ active }: HeroAtmosphereProps) {
  const reduced = useReducedMotion()
  const webGL = useWebGL()
  const desktop = useMediaQuery(DESKTOP_QUERY)
  const [liveReady, setLiveReady] = useState(false)
  const onReady = useCallback(() => setLiveReady(true), [])

  const live = desktop && webGL && !reduced

  return (
    <div aria-hidden className="hero-atmosphere pointer-events-none absolute inset-0 opacity-70">
      <img
        src={STATIC_GRADIENT_SRC}
        alt=""
        data-testid="hero-gradient-static"
        className="absolute inset-0 h-full w-full object-cover opacity-60 lg:opacity-100"
        decoding="async"
      />
      {live && (
        <Suspense fallback={null}>
          <div
            data-testid="hero-gradient-live"
            className={cn(
              'absolute inset-0 transition-opacity duration-[1600ms] ease-out-expo',
              liveReady ? 'opacity-100' : 'opacity-0'
            )}
          >
            <ShaderGradientScene active={active} onReady={onReady} />
          </div>
        </Suspense>
      )}
    </div>
  )
}
