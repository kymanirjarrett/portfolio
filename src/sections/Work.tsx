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

const viewport = { once: false, amount: 0.15 }

export default function Work() {
  const reduced = useReducedMotion()
  const featured = projects.filter((p) => p.featured)

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex items-end justify-between mb-12"
          {...(reduced ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport, transition: { duration: 0.5 } })}
        >
          <div>
            <p className="font-mono text-xs text-muted uppercase tracking-widest mb-3">Projects</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">Built for real problems</h2>
          </div>
          <Link
            to="/projects"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/70 transition-colors flex-shrink-0 ml-8"
          >
            Browse all <ArrowUpRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {featured.map((project, i) => {
            const accent = accentColors[project.id] ?? '#3B49DF'
            return (
              <motion.div
                key={project.id}
                {...(reduced ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport, transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' } })}
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="group block h-full rounded-2xl border border-ink/8 bg-white/70 backdrop-blur-sm p-8 hover:shadow-lg transition-all duration-300"
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

                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 5).map((tech) => (
                      <span key={tech} className="text-xs font-mono px-2.5 py-1 rounded-full bg-ink/5 text-muted">
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

        <motion.div
          className="text-center sm:hidden"
          {...(reduced ? {} : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport, transition: { duration: 0.4, delay: 0.2 } })}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-paper text-sm font-medium rounded-full hover:bg-ink/80 transition-colors"
          >
            Browse all projects <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
