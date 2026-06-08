import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const links = [
  {
    label: 'Email',
    href: 'mailto:jarretkr@mail.uc.edu',
    display: 'jarretkr@mail.uc.edu',
    icon: Mail,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/kymanirjarrett',
    display: 'github.com/kymanirjarrett',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/kymanirjarrett',
    display: 'linkedin.com/in/kymanirjarrett',
    icon: Linkedin,
  },
]

export default function Contact() {
  const reduced = useReducedMotion()

  return (
    <section id="contact" className="py-24 px-6 bg-ink text-paper relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(59,73,223,0.2) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <p className="font-mono text-xs text-paper/40 uppercase tracking-widest mb-4">Contact</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-6 text-balance">
            Let's build something worth talking about.
          </h2>
          <p className="text-paper/60 text-lg leading-relaxed mb-10">
            Open to new grad roles, co-op opportunities, and interesting problems across
            cloud, full-stack, DevOps, and security. Reach out — I respond fast.
          </p>

          <ul className="space-y-4 mb-10" role="list">
            {links.map(({ label, href, display, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 group"
                  aria-label={`${label}: ${display}`}
                >
                  <span className="w-10 h-10 rounded-xl bg-paper/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                    <Icon size={18} className="text-paper/60 group-hover:text-white transition-colors" />
                  </span>
                  <span className="text-paper/70 group-hover:text-paper transition-colors text-sm md:text-base">
                    {display}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-full hover:bg-accent/90 transition-colors"
            >
              Download Resume
            </a>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 border border-paper/20 text-paper/70 font-medium rounded-full hover:border-paper/40 hover:text-paper transition-colors"
            >
              Full CV
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
