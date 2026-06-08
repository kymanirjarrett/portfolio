import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const stats = [
  { value: '3.7', label: 'GPA / 4.0' },
  { value: '3×', label: "Dean's List" },
  { value: 'May 2028', label: 'Graduation' },
  { value: '2', label: 'Majors' },
]

const viewport = { once: false, amount: 0.15 }

export default function About() {
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

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div {...anim(0)}>
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">About</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-6 text-balance">
            Cloud to code.<br />Data to security.
          </h2>
          <div className="space-y-4 text-muted text-lg leading-relaxed">
            <p>
              I'm a software engineer at the University of Cincinnati studying Information
              Technology and Cybersecurity. I've shipped enterprise ETL pipelines on AWS
              at The J.M. Smucker Company, built full-stack applications for Fortune 500
              clients at ITSC, and designed AI-powered products from the ground up.
            </p>
            <p>
              I work across the stack — infrastructure, APIs, UIs, data pipelines, and
              security tooling — because the best solutions usually live at the
              intersection. I'm drawn to systems that are observable, products that
              actually scale, and software that doesn't become a liability over time.
            </p>
            <p>
              Open to new-grad roles in cloud engineering, DevOps, full-stack development,
              and security.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-4"
          {...anim(0.1)}
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-ink/5">
              <p className="font-display font-bold text-4xl text-accent mb-1">{value}</p>
              <p className="text-sm text-muted">{label}</p>
            </div>
          ))}
          <div className="col-span-2 bg-ink rounded-2xl p-6 text-paper">
            <p className="font-mono text-xs text-paper/40 uppercase tracking-widest mb-2">University</p>
            <p className="font-display font-semibold text-xl leading-tight">
              B.S. Information Technology<br />B.S. Cybersecurity
            </p>
            <p className="text-paper/60 text-sm mt-2">University of Cincinnati</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
