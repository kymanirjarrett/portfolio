import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const stats = [
  { value: '3.7', label: 'GPA / 4.0' },
  { value: '3×', label: "Dean's List" },
  { value: 'May 2028', label: 'Graduation' },
  { value: '2', label: 'Majors' },
]

export default function About() {
  const reduced = useReducedMotion()

  return (
    <section
      id="about"
      className="py-24 px-6"
      style={{ background: 'linear-gradient(180deg, #FAFAF7 0%, #f0f2ff 100%)' }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">About</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-6 text-balance">
            High-ceiling engineer.<br />Deliberately broad.
          </h2>
          <div className="space-y-4 text-muted text-lg leading-relaxed">
            <p>
              I'm a cloud and data engineer, full-stack developer, and cybersecurity major at
              the University of Cincinnati — and I've intentionally stayed broad. I've built
              enterprise ETL pipelines on AWS, shipped Fortune 500 apps with React and Node,
              and automated real operational workflows from scratch.
            </p>
            <p>
              What drives me isn't a job title — it's hard problems at the intersection of
              infrastructure, software, and security. I'm equally at home writing CloudFormation
              YAML and debugging a React hydration mismatch.
            </p>
            <p>
              Currently exploring DevOps and SOC/security analyst directions alongside my
              cloud-data and full-stack work. Open to wherever the most interesting problems are.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="grid grid-cols-2 gap-4"
        >
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-6 shadow-sm border border-ink/5"
            >
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
