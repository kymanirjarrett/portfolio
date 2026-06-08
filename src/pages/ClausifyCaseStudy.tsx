import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const accent = '#7C3AED'

const stack = [
  'Next.js 14', 'TypeScript', 'Tailwind CSS', 'shadcn/ui',
  'Groq API', 'LangChain', 'pdf-parse',
  'PostgreSQL', 'pgvector', 'Supabase',
  'Vercel',
]

const vp = { once: false, amount: 0.1 }

export default function ClausifyCaseStudy() {
  const reduced = useReducedMotion()

  const fade = (delay = 0) =>
    reduced
      ? {}
      : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, delay, ease: 'easeOut' } }

  const fadeIn = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: vp,
          transition: { duration: 0.5, delay, ease: 'easeOut' },
        }

  return (
    <>
      <main id="main-content" className="bg-paper min-h-screen">
        {/* Hero */}
        <div
          className="relative pt-28 pb-20 px-6 overflow-hidden"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #ede9fe 0%, #FAFAF7 70%)' }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div {...fade(0)}>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors mb-8"
              >
                <ArrowLeft size={14} />
                Back to projects
              </Link>
            </motion.div>

            <motion.p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: accent }} {...fade(0.1)}>
              AI-Powered Legal SaaS
            </motion.p>

            <motion.h1 className="font-display font-bold text-5xl md:text-6xl text-ink mb-6" {...fade(0.2)}>
              Clausify
            </motion.h1>

            <motion.p className="text-xl text-muted leading-relaxed max-w-2xl mb-8" {...fade(0.3)}>
              Contract intelligence for non-lawyers. A RAG pipeline that reads legal documents,
              scores clause-level risk, and generates negotiation summaries — so you know exactly
              what you're signing.
            </motion.p>

            <motion.div className="flex flex-wrap gap-3" {...fade(0.4)}>
              <a
                href="https://kymanirjarrett.github.io/clausify-development/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
                style={{ background: accent }}
              >
                Live dev blog <ExternalLink size={14} />
              </a>
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

          {/* Stats */}
          <motion.section {...fadeIn()} aria-label="Project stats">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: '$0', label: 'Monthly infrastructure cost' },
                { value: '<60s', label: 'Contract analysis time' },
                { value: '100%', label: 'TypeScript' },
                { value: '14K+', label: 'Free API calls/day (Groq)' },
              ].map(({ value, label }) => (
                <div key={label} className="rounded-2xl border border-ink/8 bg-white p-5 text-center">
                  <p className="font-display font-bold text-2xl md:text-3xl mb-1" style={{ color: accent }}>{value}</p>
                  <p className="text-xs text-muted leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Problem */}
          <motion.section {...fadeIn()} aria-label="The problem">
            <h2 className="font-display font-bold text-2xl text-ink mb-4">The problem</h2>
            <p className="text-muted leading-relaxed text-lg">
              Legal review is slow and expensive. Most people sign contracts without fully
              understanding the risk buried inside individual clauses — auto-renewal traps,
              indemnification overreach, unilateral amendment rights. Lawyers cost $300/hr.
              Clausify is the alternative: AI-backed clause analysis built entirely on free-tier
              services.
            </p>
          </motion.section>

          {/* Solution */}
          <motion.section {...fadeIn()} aria-label="The solution">
            <h2 className="font-display font-bold text-2xl text-ink mb-4">The solution</h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Clausify accepts contract uploads (PDF), extracts text with pdf-parse, and chunks
                it at the clause level. Each clause is embedded into a pgvector index in Supabase
                for semantic retrieval. The RAG pipeline — built with LangChain and Groq's fast
                Llama 3.1 70B inference — scores each clause for risk across categories like
                liability, termination, IP assignment, and payment terms.
              </p>
              <p>
                When a new version of a contract is uploaded, Clausify diffs it against the prior
                version and generates an AI-written negotiation summary: what changed, what's still
                risky, and what to push back on. Row-Level Security policies in Postgres ensure
                complete data isolation between users at the database level.
              </p>
              <p>
                The frontend is built in Next.js 14 with App Router and shadcn/ui. The entire
                platform runs on Vercel's serverless infrastructure — zero ops, zero hosting cost.
              </p>
            </div>
          </motion.section>

          {/* Architecture */}
          <motion.section {...fadeIn()} aria-label="Architecture">
            <h2 className="font-display font-bold text-2xl text-ink mb-6">Architecture</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  layer: 'Frontend',
                  items: [
                    'Next.js 14 — App Router, React Server Components',
                    'TypeScript — end-to-end type safety',
                    'shadcn/ui — Radix UI + Tailwind components',
                    'pdf-parse — client-side contract preview',
                  ],
                },
                {
                  layer: 'AI & Processing',
                  items: [
                    'Groq API — Llama 3.1 70B inference',
                    'LangChain — document processing pipeline',
                    'pdf-parse — text extraction',
                    'RAG pipeline — vector-augmented generation',
                  ],
                },
                {
                  layer: 'Data & Infrastructure',
                  items: [
                    'PostgreSQL + pgvector — relational + vector store',
                    'Supabase Auth — JWT authentication',
                    'Supabase Storage — PDF file storage',
                    'Vercel — serverless edge deployment',
                  ],
                },
              ].map(({ layer, items }) => (
                <div key={layer} className="rounded-2xl border border-ink/8 bg-white p-5">
                  <h3 className="font-medium text-ink text-sm mb-3" style={{ color: accent }}>{layer}</h3>
                  <ul className="space-y-1.5">
                    {items.map((item) => (
                      <li key={item} className="text-xs text-muted leading-relaxed flex gap-2">
                        <span className="flex-shrink-0 mt-0.5" style={{ color: accent }}>▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Development process */}
          <motion.section {...fadeIn()} aria-label="Development process">
            <h2 className="font-display font-bold text-2xl text-ink mb-6">Development process</h2>
            <div className="space-y-4">
              {[
                {
                  week: 'Week 1',
                  title: 'Foundation & Architecture',
                  status: 'Complete',
                  items: [
                    'Initialized Next.js 14 project with TypeScript and App Router',
                    'Integrated shadcn/ui component library for accessible UI',
                    'Configured Supabase with PostgreSQL and pgvector extension',
                    'Created database schema with vector similarity search capabilities',
                    'Implemented Row-Level Security (RLS) policies for data isolation',
                    'Built environment automation scripts for multi-machine development',
                    'Deployed initial landing page to Vercel',
                  ],
                },
                {
                  week: 'Week 2',
                  title: 'Core Features & AI Integration',
                  status: 'In Progress',
                  items: [
                    'PDF upload component with drag-and-drop functionality',
                    'Document parsing using pdf-parse library',
                    'Groq API integration with Llama 3.1 70B model',
                    'Prompt engineering for accurate contract analysis',
                    'Analysis results UI with clause cards and risk visualization',
                    'API rate limiting and caching strategies',
                  ],
                },
                {
                  week: 'Week 3',
                  title: 'Vector Search & Comparison',
                  status: 'Upcoming',
                  items: [
                    'Vector embeddings for contract clauses (1536-dimensional)',
                    'Semantic similarity search with cosine distance',
                    'Clause comparison interface',
                    'Standard clause library (100+ entries)',
                    'Version diff tracking for contract iterations',
                    'IVFFlat indexing for O(log n) vector search',
                  ],
                },
                {
                  week: 'Week 4',
                  title: 'Polish & Documentation',
                  status: 'Upcoming',
                  items: [
                    'PDF export of analysis results',
                    'User dashboard with contract history',
                    'Legal disclaimers and terms of service',
                    'API documentation with examples',
                    'Production monitoring and alerting setup',
                  ],
                },
              ].map(({ week, title, status, items }) => {
                const isComplete = status === 'Complete'
                const isProgress = status === 'In Progress'
                return (
                  <div key={week} className="rounded-2xl border border-ink/8 bg-white p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="font-mono text-xs text-muted uppercase tracking-widest">{week}</span>
                        <h3 className="font-display font-semibold text-lg text-ink mt-0.5">{title}</h3>
                      </div>
                      <span
                        className="text-xs font-mono px-2.5 py-1 rounded-full"
                        style={{
                          background: isComplete ? '#7C3AED15' : isProgress ? '#0891B215' : '#5A5A5510',
                          color: isComplete ? accent : isProgress ? '#0891B2' : '#5A5A55',
                        }}
                      >
                        {status}
                      </span>
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                      {items.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-muted">
                          <span className="flex-shrink-0 mt-1" style={{ color: accent }} aria-hidden>▸</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </motion.section>

          {/* Key decisions */}
          <motion.section {...fadeIn()} aria-label="Key technical decisions">
            <h2 className="font-display font-bold text-2xl text-ink mb-6">Key decisions</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Clause-level chunking, not page-level',
                  body: 'Risk lives inside specific clauses. Page-level chunking dilutes signal. Clause boundaries give the RAG pipeline precise retrieval targets and accurate risk attribution.',
                },
                {
                  title: 'pgvector over Pinecone/Weaviate',
                  body: 'Keeps the embedding store in the same Postgres instance as the rest of the data. Fewer moving parts, no external vector DB to manage, and IVFFlat indexing handles scale.',
                },
                {
                  title: 'Groq for inference speed',
                  body: "Legal analysis needs to feel instant. Groq's LPU inference delivers sub-second response times that cloud-hosted model APIs can't match at free-tier limits.",
                },
                {
                  title: 'Row-Level Security at the DB layer',
                  body: 'Contract data is sensitive. RLS policies enforce user isolation at the Postgres level — not in application code — so a bug in the API layer can\'t leak another user\'s data.',
                },
                {
                  title: 'Serverless-only architecture',
                  body: 'Zero infrastructure to manage. Next.js API Routes on Vercel mean the backend scales with load and costs $0/month on the free tier, making the whole platform self-funding.',
                },
                {
                  title: 'Multi-version diff tracking',
                  body: 'Contracts get revised. Tracking version history lets Clausify show exactly what changed between drafts — not just what\'s in the latest — and flag newly introduced risk.',
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-2xl border border-ink/8 bg-white p-5">
                  <h3 className="font-medium text-ink mb-2 text-sm">{title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Stack */}
          <motion.section {...fadeIn()} aria-label="Technology stack">
            <h2 className="font-display font-bold text-2xl text-ink mb-6">Stack</h2>
            <div className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-sm px-3 py-1.5 rounded-full border"
                  style={{ color: accent, borderColor: `${accent}30`, background: `${accent}08` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </>
  )
}
