import { lazy, Suspense, useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import NameGrid2D from '@/components/home/NameGrid2D'
import { useIdleStage } from '@/hooks/useIdleStage'
import { useInViewport } from '@/hooks/useInViewport'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useNameToggle } from '@/hooks/useNameToggle'
import { usePageVisible } from '@/hooks/usePageVisible'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useWebGL } from '@/hooks/useWebGL'

// One lazy chunk holds three.js, the canvas, and both scenes. Each export is
// wrapped separately so it can sit in its own place in the layout.
const loadScene = () => import('@/components/home/HomeScene')
const SceneCanvas = lazy(() => loadScene().then((m) => ({ default: m.SceneCanvas })))
const NameView = lazy(() => loadScene().then((m) => ({ default: m.NameView })))
const PalmView = lazy(() => loadScene().then((m) => ({ default: m.PalmView })))

/** The palm's resting pose as an image: used on small screens and without WebGL. */
function PalmPoster({ className }: { className?: string }) {
  return (
    <img src="/palm-poster.webp" alt="" aria-hidden="true" decoding="async" className={className} />
  )
}

const linkClass =
  'font-medium text-ink underline decoration-accent/50 decoration-2 underline-offset-[0.2em] transition-colors hover:text-accent hover:decoration-accent'

function External({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
    </a>
  )
}

function Internal({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className={linkClass}>
      {children}
    </Link>
  )
}

export default function Home() {
  const mainRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const webGL = useWebGL()
  const wide = useMediaQuery('(min-width: 768px)')
  const onScreen = useInViewport(mainRef)
  const visible = usePageVisible()
  const { graph, handlers } = useNameToggle()
  // 1: canvas and name, 2: palm. Each mounts in its own idle period.
  const stage = useIdleStage(2, webGL)

  const nameGrid = (
    <NameGrid2D
      graph={graph}
      reduced={reduced}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2"
    />
  )
  const poster = wide ? (
    <PalmPoster className="pointer-events-none absolute bottom-0 right-0 h-[94%] w-auto max-w-none" />
  ) : (
    // Small screens: smaller, behind the text at the top right, faded enough
    // that text over it keeps AA contrast.
    <PalmPoster className="pointer-events-none absolute -right-[34vw] -top-[6svh] h-[56svh] w-auto max-w-none opacity-25" />
  )

  return (
    <main
      ref={mainRef}
      id="main-content"
      className="relative isolate min-h-[100svh] overflow-hidden bg-gradient-to-b from-sky-deep from-0% via-sky via-40% to-canvas to-90%"
    >
      {/* Scenery sits behind the text (z-0); the canvas covers the whole hero. */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        {webGL && wide && stage >= 2 ? (
          <Suspense fallback={poster}>
            <PalmView reduced={reduced} className="absolute bottom-0 right-0 h-[94%] w-[44vw]" />
          </Suspense>
        ) : (
          poster
        )}
      </div>
      {webGL && stage >= 1 && (
        <Suspense fallback={null}>
          <SceneCanvas active={onScreen && visible} reduced={reduced} />
        </Suspense>
      )}

      <section
        aria-labelledby="home-heading"
        className="page-grid relative z-10 min-h-[100svh] content-center pb-10 pt-24"
      >
        <div className="col-span-12 lg:col-span-7">
          <h1
            id="home-heading"
            className="font-display text-[clamp(1.75rem,1.2rem+2vw,3rem)] font-semibold leading-tight tracking-[-0.02em]"
          >
            Hey, I'm<span className="sr-only"> Kymani Jarrett</span>
          </h1>

          {/* The name in blocks. Decorative for screen readers (the h1 carries the
              name), but a real control: hover, focus, or tap plays the graph. */}
          <div
            role="button"
            tabIndex={0}
            aria-pressed={graph}
            aria-label="Show the name as a contribution graph"
            className="relative mt-2 aspect-[53/12] w-full cursor-pointer touch-manipulation select-none rounded-lg"
            {...handlers}
          >
            {webGL && stage >= 1 ? (
              <Suspense fallback={nameGrid}>
                <NameView graph={graph} reduced={reduced} className="absolute inset-0" />
              </Suspense>
            ) : (
              nameGrid
            )}
          </div>

          <div className="mt-6 max-w-[56ch] space-y-3 text-lead">
            <p>
              Your friendly neighborhood Jamaican software engineer studying IT and Cybersecurity at
              the <External href="https://www.uc.edu">University of Cincinnati</External>.
            </p>
            <p>
              Previously a Software Engineer Intern at{' '}
              <External href="https://www.jmsmucker.com">The J.M. Smucker Co.</External>, where I
              shipped keyless CI/CD and data pipelines on AWS.
            </p>
            <p>
              Before that, I built full-stack apps for Fortune 500 clients at the{' '}
              <External href="https://www.cech.uc.edu/Academics/school-of-information-technology/centers/itsolutionscenter.html">
                UC IT Solutions Center
              </External>
              .
            </p>
            <p>
              Outside of work, I'm building <Internal to="/projects">projects</Internal> that
              improve the lives of those around me, and leading corporate outreach for{' '}
              <External href="https://www.colorstack.org">ColorStack</External> at UC.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
