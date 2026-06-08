import { motion } from 'framer-motion'
import { experience } from '@/data/experience'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function Experience() {
  const reduced = useReducedMotion()
  const featured = experience.filter((e) => e.featured)
  const condensed = experience.filter((e) => !e.featured)

  return (
    <section
      id="experience"
      className="py-24 px-6"
      style={{ background: 'linear-gradient(180deg, #f0f2ff 0%, #FAFAF7 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Experience</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-12">Where I've shipped</h2>

        <div className="space-y-6">
          {featured.map((item, i) => (
            <motion.article
              key={item.id}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: 'easeOut' }}
              className="bg-white rounded-2xl border border-ink/8 p-8"
              aria-label={`${item.role} at ${item.company}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
                <div>
                  <h3 className="font-display font-bold text-2xl text-ink">{item.role}</h3>
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
                  <span
                    key={tech}
                    className="text-xs font-mono px-2.5 py-1 rounded-full bg-accent/8 text-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}

          {/* Condensed entries */}
          {condensed.length > 0 && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="grid sm:grid-cols-2 gap-4"
            >
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
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
