import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { experience } from '@/data/experience'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Footer from '@/components/Footer'

const viewport = { once: false, amount: 0.1 }

export default function ExperiencePage() {
  const reduced = useReducedMotion()
  const featured = experience.filter((e) => e.featured)
  const condensed = experience.filter((e) => !e.featured)

  const anim = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport,
          transition: { duration: 0.55, delay, ease: 'easeOut' },
        }

  return (
    <>
      <main id="main-content" className="min-h-screen" style={{
        background: 'radial-gradient(ellipse 90% 40% at 50% 0%, #dde3ff 0%, #FAFAF7 60%)',
      }}>
        {/* Hero */}
        <div className="pt-28 pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div {...(reduced ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } })}>
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors mb-8">
                <ArrowLeft size={14} />
                Back to portfolio
              </Link>
            </motion.div>

            <motion.p
              className="font-mono text-xs text-accent uppercase tracking-widest mb-4"
              {...(reduced ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.1 } })}
            >
              Work history
            </motion.p>
            <motion.h1
              className="font-display font-bold text-5xl md:text-6xl text-ink mb-4"
              {...(reduced ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.2 } })}
            >
              Experience
            </motion.h1>
            <motion.p
              className="text-xl text-muted leading-relaxed max-w-xl"
              {...(reduced ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.3 } })}
            >
              Where I've shipped production software, led technical work, and grown as an engineer.
            </motion.p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-24">
          <div className="max-w-4xl mx-auto space-y-6">
            {featured.map((item, i) => (
              <motion.article
                key={item.id}
                {...anim(i * 0.08)}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-ink/8 p-8"
                aria-label={`${item.role} at ${item.company}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
                  <div>
                    <h2 className="font-display font-bold text-2xl text-ink">{item.role}</h2>
                    <p className="text-accent font-medium mt-0.5">{item.company}</p>
                  </div>
                  <span className="font-mono text-xs text-muted bg-ink/5 px-3 py-1.5 rounded-full self-start whitespace-nowrap">
                    {item.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-6" role="list">
                  {item.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-3 text-muted text-sm leading-relaxed">
                      <span className="text-accent mt-1.5 flex-shrink-0" aria-hidden>▸</span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {item.stack.map((tech) => (
                    <span key={tech} className="text-xs font-mono px-2.5 py-1 rounded-full bg-accent/8 text-accent">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}

            {condensed.length > 0 && (
              <motion.div {...anim(0.15)}>
                <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4 mt-8">Additional</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {condensed.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-ink/8 p-5 bg-white/60"
                      aria-label={`${item.role} at ${item.company}`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-medium text-ink text-sm">{item.role}</h3>
                        <span className="font-mono text-xs text-muted">{item.period}</span>
                      </div>
                      <p className="text-xs text-muted">{item.company}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
