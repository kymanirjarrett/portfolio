import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/data/projects'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const accentColors: Record<string, string> = {
  vigil: '#3B49DF',
  clausify: '#7C3AED',
  'bearcat-buddies': '#E11D48',
}

export default function Work() {
  const reduced = useReducedMotion()
  const featured = projects.filter((p) => p.featured)
  const bearcat = projects.find((p) => p.id === 'bearcat-buddies')!

  return (
    <section id="work" className="py-24 px-6 bg-paper">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Selected Work</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-12">Built for real problems</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {featured.map((project, i) => {
            const accent = accentColors[project.id] ?? '#3B49DF'
            return (
              <motion.div
                key={project.id}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="group block h-full rounded-2xl border border-ink/8 bg-white p-8 hover:shadow-lg hover:border-opacity-100 transition-all duration-300"
                  style={{ '--accent': accent } as React.CSSProperties}
                  aria-label={`${project.title}: ${project.tagline}`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-display font-bold text-lg"
                      style={{ background: accent }}
                      aria-hidden
                    >
                      {project.title[0]}
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="text-muted group-hover:text-ink group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                      aria-hidden
                    />
                  </div>

                  <h3 className="font-display font-bold text-2xl text-ink mb-1">{project.title}</h3>
                  <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: accent }}>
                    {project.tagline}
                  </p>

                  <p className="text-muted text-sm leading-relaxed mb-4">{project.problem}</p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.stack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2.5 py-1 rounded-full bg-ink/5 text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 5 && (
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-ink/5 text-muted">
                        +{project.stack.length - 5}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bearcat Buddies — smaller card */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="rounded-2xl border border-ink/8 bg-white p-6 md:flex md:items-center md:gap-8">
            <div
              className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-display font-bold mb-4 md:mb-0"
              style={{ background: accentColors['bearcat-buddies'] }}
              aria-hidden
            >
              B
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-semibold text-xl text-ink">{bearcat.title}</h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted mt-0.5">{bearcat.tagline}</p>
                </div>
              </div>
              <p className="text-muted text-sm leading-relaxed mt-3">{bearcat.problem}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0 md:flex-col md:items-end">
              {bearcat.stack.slice(0, 3).map((tech) => (
                <span key={tech} className="text-xs font-mono px-2.5 py-1 rounded-full bg-ink/5 text-muted">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
