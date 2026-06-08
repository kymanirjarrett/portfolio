import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { leadership } from '@/data/leadership'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Footer from '@/components/Footer'

const viewport = { once: false, amount: 0.1 }

export default function LeadershipPage() {
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
    <>
      <main id="main-content" className="min-h-screen" style={{
        background: 'radial-gradient(ellipse 90% 40% at 50% 0%, #fde8d0 0%, #FAFAF7 60%)',
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
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: '#D97706' }}
              {...(reduced ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.1 } })}
            >
              Community & impact
            </motion.p>
            <motion.h1
              className="font-display font-bold text-5xl md:text-6xl text-ink mb-4"
              {...(reduced ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.2 } })}
            >
              Leadership
            </motion.h1>
            <motion.p
              className="text-xl text-muted leading-relaxed max-w-xl"
              {...(reduced ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.3 } })}
            >
              Opening doors, building community, and creating opportunities for the engineers around me.
            </motion.p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-24">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {leadership.map((item, i) => (
              <motion.article
                key={`${item.role}-${item.org}`}
                {...anim(i * 0.08)}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-ink/8 p-6"
                aria-label={`${item.role}, ${item.org}`}
              >
                <h2 className="font-display font-semibold text-lg text-ink mb-0.5">{item.role}</h2>
                <p className="text-sm font-medium mb-4" style={{ color: '#D97706' }}>{item.org}</p>

                <ul className="space-y-2.5" role="list">
                  {item.highlights.map((h, j) => (
                    <li key={j} className="flex gap-2.5 text-sm text-muted leading-relaxed">
                      <span className="mt-1 flex-shrink-0 text-xs" style={{ color: '#D97706' }} aria-hidden>▸</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
