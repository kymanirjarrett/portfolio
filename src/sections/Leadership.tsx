import { motion } from 'framer-motion'
import { leadership } from '@/data/leadership'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function Leadership() {
  const reduced = useReducedMotion()

  return (
    <section
      id="leadership"
      className="py-24 px-6"
      style={{ background: 'linear-gradient(180deg, #FAFAF7 0%, #f0f2ff 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Leadership & Impact</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-12">
          Opening doors, building community
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leadership.map((item, i) => (
            <motion.article
              key={`${item.role}-${item.org}`}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className="bg-white rounded-2xl border border-ink/8 p-6"
              aria-label={`${item.role}, ${item.org}`}
            >
              <h3 className="font-display font-semibold text-lg text-ink mb-0.5">{item.role}</h3>
              <p className="text-accent text-sm font-medium mb-4">{item.org}</p>

              <ul className="space-y-2.5" role="list">
                {item.highlights.map((h, j) => (
                  <li key={j} className="flex gap-2.5 text-sm text-muted leading-relaxed">
                    <span className="text-accent mt-1 flex-shrink-0 text-xs" aria-hidden>▸</span>
                    {h}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
