import { motion } from 'framer-motion'
import { skillCategories } from '@/data/skills'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const viewport = { once: false, amount: 0.1 }

export default function Skills() {
  const reduced = useReducedMotion()

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...(reduced ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport, transition: { duration: 0.5 } })}
        >
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Skills</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-12">The toolkit</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.label}
              {...(reduced ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport, transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' } })}
              className="rounded-2xl border border-ink/8 bg-white/70 backdrop-blur-sm p-6"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">{cat.label}</h3>
              <ul className="space-y-2.5" role="list">
                {cat.skills.map((skill) => (
                  <li key={skill} className="text-sm text-muted flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent/40 flex-shrink-0" aria-hidden />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
