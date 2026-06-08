import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const stack = [
  'Next.js', 'TypeScript', 'shadcn/ui', 'FastAPI',
  'LangChain', 'Groq', 'pgvector', 'Supabase',
  'PostgreSQL', 'AWS S3',
]

export default function ClausifyCaseStudy() {
  const reduced = useReducedMotion()

  const fade = (delay = 0) =>
    reduced ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, delay, ease: 'easeOut' } }

  return (
    <>
      <main id="main-content" className="bg-paper min-h-screen">
        {/* Hero */}
        <div
          className="relative pt-28 pb-20 px-6 overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #ede9fe 0%, #FAFAF7 70%)',
          }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div {...fade(0)}>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors mb-8"
              >
                <ArrowLeft size={14} />
                Back to portfolio
              </Link>
            </motion.div>

            <motion.p
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: '#7C3AED' }}
              {...fade(0.1)}
            >
              AI-Powered Legal SaaS
            </motion.p>

            <motion.h1
              className="font-display font-bold text-5xl md:text-6xl text-ink mb-6"
              {...fade(0.2)}
            >
              Clausify
            </motion.h1>

            <motion.p
              className="text-xl text-muted leading-relaxed max-w-2xl mb-8"
              {...fade(0.3)}
            >
              Contract intelligence for non-lawyers. A RAG pipeline that reads legal documents,
              scores clause-level risk, and generates negotiation summaries — so you know exactly
              what you're signing.
            </motion.p>

            <motion.div className="flex flex-wrap gap-3" {...fade(0.4)}>
              <a
                href="https://github.com/kymanirjarrett/clausify"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-paper text-sm font-medium rounded-full hover:bg-ink/80 transition-colors"
              >
                GitHub <ExternalLink size={14} />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
          {/* Problem */}
          <motion.section
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            aria-label="The problem"
          >
            <h2 className="font-display font-bold text-2xl text-ink mb-4">The problem</h2>
            <p className="text-muted leading-relaxed text-lg">
              Legal review is slow and expensive. Most people sign contracts without fully
              understanding the risk buried inside individual clauses — auto-renewal traps,
              indemnification overreach, unilateral amendment rights. Lawyers cost $300/hr.
              Clausify is the alternative.
            </p>
          </motion.section>

          {/* Solution */}
          <motion.section
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            aria-label="The solution"
          >
            <h2 className="font-display font-bold text-2xl text-ink mb-4">The solution</h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Clausify accepts contract uploads (PDF/DOCX → AWS S3), extracts text, and chunks
                it at the clause level. Each clause is embedded into a pgvector index in Supabase
                for semantic retrieval. The RAG pipeline — built with LangChain and Groq's fast
                inference — then scores each clause for risk across categories like liability,
                termination, and IP assignment.
              </p>
              <p>
                When a new version of a contract is uploaded, Clausify diffs it against the
                prior version and generates an AI-written negotiation summary: what changed,
                what's still risky, and what to push back on.
              </p>
              <p>
                The frontend is built in Next.js with shadcn/ui for a clean, accessible UI.
                The FastAPI backend handles ingestion, embedding, and generation.
              </p>
            </div>
          </motion.section>

          {/* Stack */}
          <motion.section
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            aria-label="Technology stack"
          >
            <h2 className="font-display font-bold text-2xl text-ink mb-6">Stack</h2>
            <div className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-sm px-3 py-1.5 rounded-full border"
                  style={{ color: '#7C3AED', borderColor: '#7C3AED30', background: '#7C3AED08' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.section>

          {/* Key decisions */}
          <motion.section
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            aria-label="Key technical decisions"
          >
            <h2 className="font-display font-bold text-2xl text-ink mb-6">Key decisions</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Clause-level chunking, not page-level',
                  body: 'Risk lives inside specific clauses. Page-level chunking dilutes signal. Clause boundaries give the RAG pipeline precise retrieval targets.',
                },
                {
                  title: 'pgvector over Pinecone/Weaviate',
                  body: 'Keeps the embedding store in the same Postgres instance as the rest of the data. Fewer moving parts, no external vector DB to manage.',
                },
                {
                  title: 'Groq for inference speed',
                  body: 'Legal analysis needs to feel instant. Groq\'s LPU inference delivers sub-second response times that hosted model APIs can\'t match.',
                },
                {
                  title: 'Multi-version diff tracking',
                  body: 'Contracts get revised. Tracking version history lets Clausify show exactly what changed between drafts — not just what\'s in the latest.',
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-2xl border border-ink/8 bg-white p-5">
                  <h3 className="font-medium text-ink mb-2 text-sm">{title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </>
  )
}
