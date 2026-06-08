import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react'
import { projects } from '@/data/projects'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Footer from '@/components/Footer'

const accentColors: Record<string, string> = {
  vigil: '#3B49DF',
  clausify: '#7C3AED',
  'bearcat-buddies': '#E11D48',
}

const viewport = { once: false, amount: 0.1 }

export default function ProjectsPage() {
  const reduced = useReducedMotion()

  const anim = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport,
          transition: { duration: 0.55, delay, ease: 'easeOut' },
        }

  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

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
              Selected work
            </motion.p>
            <motion.h1
              className="font-display font-bold text-5xl md:text-6xl text-ink mb-4"
              {...(reduced ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.2 } })}
            >
              Projects
            </motion.h1>
            <motion.p
              className="text-xl text-muted leading-relaxed max-w-xl"
              {...(reduced ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.3 } })}
            >
              Things I've built — from AI-powered SaaS to ETL observability platforms to automation pipelines.
            </motion.p>
          </div>
        </div>

        {/* Featured projects */}
        <div className="px-6 pb-12">
          <div className="max-w-4xl mx-auto space-y-6">
            {featured.map((project, i) => {
              const accent = accentColors[project.id] ?? '#3B49DF'
              return (
                <motion.article
                  key={project.id}
                  {...anim(i * 0.08)}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl border border-ink/8 p-8"
                  aria-label={project.title}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-display font-bold text-lg flex-shrink-0"
                        style={{ background: accent }}
                        aria-hidden
                      >
                        {project.title[0]}
                      </div>
                      <div>
                        <h2 className="font-display font-bold text-2xl text-ink">{project.title}</h2>
                        <p className="font-mono text-xs uppercase tracking-widest mt-0.5" style={{ color: accent }}>
                          {project.tagline}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted leading-relaxed mb-6">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech) => (
                      <span key={tech} className="text-xs font-mono px-2.5 py-1 rounded-full bg-ink/5 text-muted">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white rounded-full transition-colors"
                      style={{ background: accent }}
                    >
                      Case study <ArrowUpRight size={14} />
                    </Link>
                    {project.links.map(({ label, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-muted border border-ink/10 rounded-full hover:text-ink hover:border-ink/20 transition-colors"
                      >
                        {label} <ExternalLink size={13} />
                      </a>
                    ))}
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>

        {/* Other projects */}
        {rest.length > 0 && (
          <div className="px-6 pb-24">
            <div className="max-w-4xl mx-auto">
              <motion.p {...anim(0.1)} className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
                Other work
              </motion.p>
              <div className="grid sm:grid-cols-2 gap-4">
                {rest.map((project, i) => {
                  const accent = accentColors[project.id] ?? '#3B49DF'
                  return (
                    <motion.div
                      key={project.id}
                      {...anim(0.1 + i * 0.07)}
                      className="bg-white/70 backdrop-blur-sm rounded-2xl border border-ink/8 p-6"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0"
                          style={{ background: accent }}
                          aria-hidden
                        >
                          {project.title[0]}
                        </div>
                        <div>
                          <h3 className="font-medium text-ink text-sm">{project.title}</h3>
                          <p className="font-mono text-xs" style={{ color: accent }}>{project.tagline}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted leading-relaxed mb-4">{project.problem}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 4).map((tech) => (
                          <span key={tech} className="text-xs font-mono px-2 py-0.5 rounded-full bg-ink/5 text-muted">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
