import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const stack = [
  'React', 'Vite', 'TypeScript',
  'Python', 'FastAPI', 'boto3',
  'AWS Glue', 'AWS CloudWatch', 'AWS Step Functions',
  'SendGrid', 'PostgreSQL', 'Supabase', 'JWT',
]

const vp = { once: false, amount: 0.1 }

export default function VigilCaseStudy() {
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
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #dde3ff 0%, #FAFAF7 70%)' }}
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

            <motion.p className="font-mono text-xs text-accent uppercase tracking-widest mb-4" {...fade(0.1)}>
              ETL Monitoring & Observability
            </motion.p>

            <motion.h1 className="font-display font-bold text-5xl md:text-6xl text-ink mb-6" {...fade(0.2)}>
              Vigil
            </motion.h1>

            <motion.p className="text-xl text-muted leading-relaxed max-w-2xl mb-8" {...fade(0.3)}>
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
          <motion.section {...fadeIn()} aria-label="The problem">
            <h2 className="font-display font-bold text-2xl text-ink mb-4">The problem</h2>
            <p className="text-muted leading-relaxed text-lg">
              ETL pipeline failures are silent. A job stalls, data goes stale, and analysts
              downstream don't know until something breaks visibly — sometimes hours later.
              Existing tools either require expensive enterprise contracts or don't understand
              your specific pipeline's normal behavior. Vigil was built to solve exactly this.
            </p>
          </motion.section>

          {/* Solution */}
          <motion.section {...fadeIn()} aria-label="The solution">
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

          {/* Architecture */}
          <motion.section {...fadeIn()} aria-label="Architecture">
            <h2 className="font-display font-bold text-2xl text-ink mb-6">Architecture</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  layer: 'Frontend',
                  items: [
                    'React + Vite — Datadog-style dark dashboard',
                    'TypeScript — end-to-end type safety',
                    'Real-time pipeline health across all jobs',
                    'Trend charts for 7-day and 30-day baselines',
                  ],
                },
                {
                  layer: 'Backend & AWS',
                  items: [
                    'FastAPI — async, Pydantic-typed API',
                    'boto3 — AWS Glue, CloudWatch, Step Functions',
                    'Z-score anomaly detection engine',
                    'SendGrid — structured alert emails',
                  ],
                },
                {
                  layer: 'Data',
                  items: [
                    'Supabase (PostgreSQL) — pipeline telemetry',
                    'JWT authentication',
                    'Railway — backend hosting',
                    'Vercel — frontend deployment',
                  ],
                },
              ].map(({ layer, items }) => (
                <div key={layer} className="rounded-2xl border border-ink/8 bg-white p-5">
                  <h3 className="font-medium text-sm mb-3 text-accent">{layer}</h3>
                  <ul className="space-y-1.5">
                    {items.map((item) => (
                      <li key={item} className="text-xs text-muted leading-relaxed flex gap-2">
                        <span className="flex-shrink-0 mt-0.5 text-accent" aria-hidden>▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Key decisions */}
          <motion.section {...fadeIn()} aria-label="Key technical decisions">
            <h2 className="font-display font-bold text-2xl text-ink mb-6">Key decisions</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Statistical, not rule-based alerting',
                  body: "Fixed thresholds break when pipelines grow. Z-score based detection adapts to each pipeline's own baseline — a job that always takes 45 minutes won't fire an alert, but one that suddenly takes 4 hours will.",
                },
                {
                  title: 'Dual trend windows (7d + 30d)',
                  body: 'Short windows catch recent regressions; long windows reveal slow drift that rule-based systems miss entirely. Both are surfaced on every alert for context.',
                },
                {
                  title: 'FastAPI over Django/Flask',
                  body: 'Async-first, typed with Pydantic, and generates OpenAPI docs automatically. A better fit for a data-heavy API that needs to handle bursts of telemetry ingestion.',
                },
                {
                  title: 'boto3 direct integration',
                  body: 'Pulling telemetry directly from CloudWatch and Glue means no agent to deploy, no sidecar to manage. The monitoring layer is entirely external to the pipelines it watches.',
                },
                {
                  title: 'Supabase for persistence',
                  body: 'Postgres-compatible with a built-in auth layer and real-time subscriptions, without the ops overhead of a self-managed DB. Switching to RDS later is a connection string change.',
                },
                {
                  title: 'Consecutive failure thresholds',
                  body: 'Single failures are noise. Vigil only escalates after N consecutive failures, which eliminates alert fatigue from transient network blips and flaky job starts.',
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
                  className="font-mono text-sm px-3 py-1.5 rounded-full bg-accent/8 text-accent border border-accent/15"
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
