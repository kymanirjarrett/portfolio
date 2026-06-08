import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import RotatingDescriptor from '@/components/RotatingDescriptor'
import { useWebGL } from '@/hooks/useWebGL'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useResumeModal } from '@/contexts/ResumeModalContext'
import { sphereLogos } from '@/data/skills'

const TechSphere = lazy(() => import('@/components/TechSphere'))

function FallbackLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-4 gap-4 p-8">
        {sphereLogos.slice(0, 12).map((logo) => (
          <div key={logo.slug} className="w-10 h-10 bg-ink/5 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  )
}

function ScrollCue({ reduced }: { reduced: boolean }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
      aria-hidden
    >
      <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
      {reduced ? (
        <ChevronDown size={16} />
      ) : (
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
          <ChevronDown size={16} />
        </motion.div>
      )}
    </div>
  )
}

export default function Hero() {
  const webGL = useWebGL()
  const reduced = useReducedMotion()
  const { openModal } = useResumeModal()

  const fadeUp = (delay: number) =>
    reduced
      ? {}
      : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: 'easeOut' } }

  function scrollToSpotlight(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    document.getElementById('spotlight')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }

  function scrollToContact(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden grain"
      aria-label="Hero"
      style={{
        background: 'radial-gradient(ellipse 90% 70% at 60% -5%, #dde3ff 0%, #eef0fb 30%, #f5f5f0 60%, #FAFAF7 100%)',
      }}
    >
      {/* Accent glow behind sphere */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-[80%] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 60% 50%, rgba(59,73,223,0.12) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 min-h-screen flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-20 pb-16 lg:pt-0 lg:pb-0">

          {/* Text column */}
          <div className="flex flex-col gap-6 lg:max-w-[480px]">
            <motion.div {...fadeUp(0.1)}>
              <RotatingDescriptor />
            </motion.div>

            <motion.h1
              className="font-display font-bold text-5xl md:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-ink text-balance"
              {...fadeUp(0.2)}
            >
              Kymani Jarrett
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted leading-relaxed text-balance max-w-md"
              {...fadeUp(0.35)}
            >
              Building at the intersection of cloud infrastructure, full-stack software,
              data engineering, and security. University of Cincinnati · 3.7 GPA · 3× Dean's List.
            </motion.p>

            <motion.div className="flex flex-wrap gap-3 pt-2" {...fadeUp(0.5)}>
              <a
                href="#spotlight"
                onClick={scrollToSpotlight}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-full hover:bg-accent/90 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                View my work
              </a>
              <a
                href="#contact"
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-6 py-3 border border-ink/15 text-ink font-medium rounded-full hover:bg-ink hover:text-paper transition-colors"
              >
                Get in touch
              </a>
            </motion.div>

            <motion.div className="flex gap-4 pt-1 text-sm text-muted" {...fadeUp(0.6)}>
              <a
                href="https://github.com/kymanirjarrett"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink transition-colors"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com/in/kymanirjarrett"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink transition-colors"
              >
                LinkedIn ↗
              </a>
              <button onClick={openModal} className="hover:text-ink transition-colors">
                Resume ↓
              </button>
            </motion.div>
          </div>

          {/* Sphere */}
          <motion.div
            className="relative w-full aspect-square max-w-lg mx-auto lg:mx-0 lg:max-w-none"
            {...(reduced ? {} : { initial: { opacity: 0, scale: 0.92 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.9, ease: 'easeOut' } })}
          >
            <Suspense fallback={<FallbackLoading />}>
              <TechSphere webGLSupported={webGL} />
            </Suspense>
          </motion.div>
        </div>
      </div>

      <ScrollCue reduced={reduced} />
    </section>
  )
}
