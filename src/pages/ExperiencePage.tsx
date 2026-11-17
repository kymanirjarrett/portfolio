import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useInView, useMotionValue, useScroll } from 'motion/react'
import BeachScene from '@/components/experience/BeachScene'
import StackTags from '@/components/StackTags'
import { education } from '@/data/education'
import { experience, type ExperienceItem } from '@/data/experience'
import { useIdleStage } from '@/hooks/useIdleStage'
import { useInViewport } from '@/hooks/useInViewport'
import { DESKTOP_QUERY, useMediaQuery } from '@/hooks/useMediaQuery'
import { usePageVisible } from '@/hooks/usePageVisible'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useWebGL } from '@/hooks/useWebGL'
import { cn } from '@/lib/utils'

const SunScene = lazy(() => import('@/components/experience/SunScene'))

/** Where the sun rests when the scene does not follow scroll. */
const MIDDAY = 0.5

/** The sun without WebGL, and while the 3D version loads. */
function FlatSun() {
  return (
    <div
      data-testid="flat-sun"
      className="absolute inset-[17%] rounded-full bg-[radial-gradient(circle_at_38%_35%,#FFE3A0,#F6BE55_55%,#EFA43A)] shadow-[0_0_80px_30px_rgb(255_206_130/0.55)]"
    />
  )
}

interface StopProps {
  index: number
  onActive: (index: number) => void
  className?: string
  children: ReactNode
}

/** One stop on the walk down the beach. Reports itself when it crosses the middle of the screen. */
function Stop({ index, onActive, className, children }: StopProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })
  useEffect(() => {
    if (inView) onActive(index)
  }, [inView, index, onActive])
  return (
    <div ref={ref} data-stop={index} className={cn('page-grid', className)}>
      <div className="col-span-12 lg:col-span-5">{children}</div>
    </div>
  )
}

function Education() {
  return (
    <section aria-labelledby="education-heading">
      <p className="font-mono text-[0.75rem] uppercase tracking-[0.08em] text-muted">Education</p>
      <h2 id="education-heading" className="heading-card mt-2">
        <a
          href={education.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-accent/40 decoration-2 underline-offset-[0.18em] transition-colors hover:text-accent hover:decoration-accent"
        >
          {education.school}
        </a>
      </h2>
      <ul className="mt-4 space-y-2 text-lead">
        {education.degrees.map((d) => (
          <li key={d.name}>
            {d.name}
            {d.track && <span className="block text-body text-muted">{d.track} track</span>}
          </li>
        ))}
      </ul>
      <dl className="mt-6 grid grid-cols-2 gap-x-6 sm:max-w-sm">
        <div>
          <dt className="text-small text-muted">Graduating</dt>
          <dd className="font-display text-lead font-semibold">{education.graduation}</dd>
        </div>
        <div>
          <dt className="text-small text-muted">GPA</dt>
          <dd className="font-display text-lead font-semibold tabular-nums">{education.gpa}</dd>
        </div>
      </dl>
      <div className="mt-6">
        <p className="text-small text-muted">Dean's List, {education.deansList.length} semesters</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {education.deansList.map((semester) => (
            <li
              key={semester}
              className="flex items-center gap-2 rounded-md bg-canvas/70 py-1 pl-1 pr-2.5 text-small ring-1 ring-inset ring-ink/10"
            >
              <span aria-hidden="true" className="size-4 rounded-[3px] bg-level-4" />
              {semester}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Role({ item }: { item: ExperienceItem }) {
  const id = `role-${item.id}`
  return (
    <article aria-labelledby={id}>
      <p className="text-small tabular-nums text-muted">{item.period}</p>
      <h2 id={id} className="heading-card mt-1">
        {item.company}
      </h2>
      <p className="mt-1 font-display font-medium text-accent">{item.role}</p>
      <ul className="mt-5 space-y-3">
        {item.bullets.map((bullet) => (
          <li key={bullet} className="relative pl-5">
            <span aria-hidden className="absolute left-0 top-[0.7em] h-px w-2.5 bg-ink/40" />
            {bullet}
          </li>
        ))}
      </ul>
      <StackTags items={item.stack} label={`${item.company} stack`} className="mt-6" />
    </article>
  )
}

export default function ExperiencePage() {
  const trackRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const desktop = useMediaQuery(DESKTOP_QUERY)
  const webGL = useWebGL()
  const visible = usePageVisible()
  const onScreen = useInViewport(trackRef)
  // The 3D sun (three.js plus shader compiles) loads about two seconds in, while
  // the reader takes in the first section; the flat sun stands in until then.
  const stage = useIdleStage(1, webGL, 2000)

  // Story order: education at sunrise, then each role, most recent at golden hour.
  const roles = useMemo(() => [...experience].reverse(), [])
  const [active, setActive] = useState(-1) // -1: education
  const highlight = active < 0 ? [] : roles[active].sunLogos

  // Scrolling through the page is one day at the beach. Without the pinned
  // desktop scene, or under reduced motion, the sun rests at midday.
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const midday = useMotionValue(MIDDAY)
  const followScroll = desktop && !reduced
  const day = followScroll ? scrollYProgress : midday

  const sun =
    webGL && stage >= 1 ? (
      <Suspense fallback={<FlatSun />}>
        <SunScene highlight={highlight} reduced={reduced} active={onScreen && visible} />
      </Suspense>
    ) : (
      <FlatSun />
    )

  return (
    <main ref={trackRef} id="main-content" className="relative bg-canvas">
      {desktop ? (
        <div className="sticky top-0 h-[100svh]">
          <BeachScene key="pinned" day={day} sun={sun} scrim className="h-full" />
        </div>
      ) : (
        <BeachScene key="band" day={day} sun={sun} compact className="h-[56svh]" />
      )}

      <div className={cn('relative z-10', desktop && '-mt-[100svh]')}>
        <Stop
          index={-1}
          onActive={setActive}
          className="pb-16 pt-10 lg:min-h-[100svh] lg:content-center lg:pb-20 lg:pt-28"
        >
          <h1 className="mb-10 font-display text-[clamp(1.75rem,1.2rem+2vw,3rem)] font-semibold leading-tight tracking-[-0.02em]">
            Experience
          </h1>
          <Education />
        </Stop>
        {roles.map((item, i) => (
          <Stop
            key={item.id}
            index={i}
            onActive={setActive}
            className="border-t border-ink/10 py-16 lg:min-h-[100svh] lg:content-center lg:border-0 lg:py-24"
          >
            <Role item={item} />
          </Stop>
        ))}
      </div>
    </main>
  )
}
