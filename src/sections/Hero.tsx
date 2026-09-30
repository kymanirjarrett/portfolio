import { lazy, Suspense, useRef } from 'react'
import { motion } from 'motion/react'
import RotatingDescriptor from '@/components/RotatingDescriptor'
import HeroAtmosphere from '@/components/HeroAtmosphere'
import { useWebGL } from '@/hooks/useWebGL'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useInViewport } from '@/hooks/useInViewport'
import { usePageVisible } from '@/hooks/usePageVisible'
import { useScrollToId } from '@/hooks/useScrollToId'
import { useResumeModal } from '@/contexts/ResumeModalContext'

const TechSphere = lazy(() => import('@/components/TechSphere'))

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const webGL = useWebGL()
  const reduced = useReducedMotion()
  const visible = usePageVisible()
  const onScreen = useInViewport(sectionRef)
  const scrollToId = useScrollToId()
  const { openModal } = useResumeModal()
  const active = onScreen && visible

  // One load sequence on a shared clock: text enters, then the sphere scales in.
  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease: EASE_OUT_EXPO },
        }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden lg:min-h-[100svh]"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        {...(reduced
          ? {}
          : {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 1.6, ease: 'easeOut' },
            })}
      >
        <HeroAtmosphere active={active} />
      </motion.div>

      <div className="page-grid relative pb-12 pt-28 lg:min-h-[100svh] lg:items-center lg:pb-24 lg:pt-32">
        <div className="relative z-10 col-span-12 lg:col-span-7">
          <motion.h1 id="hero-heading" className="heading-hero" {...enter(0.1)}>
            <span className="block">Kymani</span>
            <span className="block">Jarrett</span>
          </motion.h1>

          <motion.div className="mt-6 lg:mt-8" {...enter(0.25)}>
            <RotatingDescriptor />
          </motion.div>

          <motion.p className="mt-4 max-w-[46ch] text-lead text-muted" {...enter(0.35)}>
            Software engineer studying IT and Cybersecurity at the University of Cincinnati. Most
            recently a Cloud Data Engineer Intern at The J.M. Smucker Co.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
            {...enter(0.45)}
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('projects')
              }}
              className="btn-primary"
            >
              See my work
            </a>
            <button type="button" onClick={openModal} className="btn-quiet">
              View resume
            </button>
            <a
              href="https://github.com/kymanirjarrett"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/kymanirjarrett"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink"
            >
              LinkedIn
            </a>
          </motion.div>
        </div>

        {/* The sphere is the single highlight. On desktop it bleeds off the right edge. */}
        {/* Outer div positions (Tailwind transform); inner div animates (Motion transform). */}
        <div className="relative col-span-12 mx-auto mt-10 aspect-square w-full max-w-[34rem] lg:absolute lg:right-[-9vw] lg:top-1/2 lg:mt-0 lg:w-[58vw] lg:max-w-none lg:-translate-y-1/2">
          <motion.div
            className="h-full w-full"
            {...(reduced
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 1.4, delay: 0.35, ease: EASE_OUT_EXPO },
                })}
          >
            <Suspense fallback={null}>
              <TechSphere webGLSupported={webGL} active={active} />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
