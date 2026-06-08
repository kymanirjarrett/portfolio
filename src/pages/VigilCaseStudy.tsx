import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const stack = [
  'React', 'Vite', 'Python', 'FastAPI',
  'boto3', 'AWS Glue', 'AWS CloudWatch', 'AWS Step Functions',
  'SendGrid', 'PostgreSQL', 'Supabase', 'JWT',
]

export default function VigilCaseStudy() {
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
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #dde3ff 0%, #FAFAF7 70%)',
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
              className="font-mono text-xs text-accent uppercase tracking-widest mb-4"
              {...fade(0.1)}
            >
              ETL Monitoring & Observability
            </motion.p>

            <motion.h1
              className="font-display font-bold text-5xl md:text-6xl text-ink mb-6"
              {...fade(0.2)}
            >
              Vigil
            </motion.h1>

            <motion.p
              className="text-xl text-muted leading-relaxed max-w-2xl mb-8"
              {...fade(0.3)}
            >
              A production-grade ETL monitoring platform that surfaces pipeline failures,
              duration spikes, and drift before they become incidents — with automated
              alerting and 30-day trend analysis.
            </motion.p>

            <motion.div className="flex flex-wrap gap-3" {...fade(0.4)}>
              <a
                href="https://github.com/kymanirjarrett/vigil"
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
              ETL pipeline failures are silent. A job stalls, data goes stale, and analysts
              downstream don't know until something breaks visibly — sometimes hours later.
              Existing tools either require expensive enterprise contracts or don't understand
              your specific pipeline's normal behavior. Vigil was built to solve exactly this.
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
                Vigil integrates with AWS Glue, CloudWatch, and Step Functions via boto3 to
                pull real-time and historical pipeline telemetry. A statistical anomaly detection
                layer — based on duration z-scores and consecutive failure thresholds — determines
                whether any given run should trigger an alert.
              </p>
              <p>
                Alerts route through SendGrid with structured context: which pipeline, what
                the anomaly was, and how it compares to the 7-day and 30-day baselines.
                A Datadog-inspired dark dashboard built in React gives engineers a live view
                of pipeline health across all jobs.
              </p>
              <p>
                Auth is handled with JWT; data persists in Supabase (PostgreSQL).
                The backend runs on Railway; the frontend is deployed on Vercel.
              </p>
            </div>
          </motion.section>

          {/* Tech stack */}
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
                  className="font-mono text-sm px-3 py-1.5 rounded-full bg-accent/8 text-accent border border-accent/15"
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
                  title: 'Statistical, not rule-based alerting',
                  body: 'Fixed thresholds break when pipelines grow. Z-score based detection adapts to each pipeline\'s own baseline.',
                },
                {
                  title: 'Dual trend windows (7d + 30d)',
                  body: 'Short windows catch recent regressions; long windows reveal slow drift that rule-based systems miss entirely.',
                },
                {
                  title: 'FastAPI over Django/Flask',
                  body: 'Async-first, typed with Pydantic, and generates OpenAPI docs automatically — a better fit for a data-heavy API.',
                },
                {
                  title: 'Supabase for persistence',
                  body: 'Postgres-compatible with a built-in auth layer and real-time subscriptions, without the ops overhead of a self-managed DB.',
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
