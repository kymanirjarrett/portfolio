import Footer from '@/components/Footer'
import StackTags from '@/components/StackTags'
import { CaseSection, PageHeader } from '@/components/PageLayout'
import { projects } from '@/data/projects'

const vigil = projects.find((p) => p.id === 'vigil')!

const architecture = [
  {
    layer: 'Frontend',
    items: [
      'React and Vite dashboard, inspired by Datadog',
      'Live pipeline health across all jobs',
      'Trend charts for 7-day and 30-day baselines',
      'Security posture dashboard',
    ],
  },
  {
    layer: 'Backend and AWS',
    items: [
      'FastAPI with Pydantic-typed endpoints',
      'boto3 integration with the AWS Glue API',
      'Z-score anomaly detection engine',
      'SendGrid alert emails',
    ],
  },
  {
    layer: 'Data and hosting',
    items: [
      'PostgreSQL on Supabase, managed through Alembic migrations',
      'Row-level security on every table',
      'JWT authentication',
      'Render for the backend, Vercel for the frontend',
    ],
  },
]

const security = [
  {
    title: 'Role-based access control',
    body: 'Admin and Analyst roles, enforced server-side on every endpoint with the principle of least privilege.',
  },
  {
    title: 'Append-only audit log',
    body: 'Every user action is recorded with the IP address and timestamp, and entries are never edited or deleted.',
  },
  {
    title: 'Authentication event monitoring',
    body: 'Authentication events are monitored, including failed logins for emails that have no account, so credential stuffing is detectable.',
  },
  {
    title: 'Security posture dashboard',
    body: 'Failed login trends, active sessions, and permission changes in one view.',
  },
  {
    title: 'Row-level security',
    body: 'Enabled on every table in the same Alembic migration that creates it, so no table ever exists without a policy.',
  },
]

const decisions = [
  {
    title: 'Statistical, not rule-based alerting',
    body: "Fixed thresholds break when pipelines grow. Z-score based detection adapts to each pipeline's own baseline: a job that always takes 45 minutes won't fire an alert, but one that suddenly takes 4 hours will.",
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
    body: 'Pulling telemetry directly from the Glue API means no agent to deploy and no sidecar to manage. The monitoring layer is entirely external to the pipelines it watches.',
  },
  {
    title: 'Supabase for persistence',
    body: 'Managed PostgreSQL without the ops overhead of a self-managed database. Switching to RDS later is a connection string change.',
  },
  {
    title: 'Consecutive failure thresholds',
    body: 'Single failures are noise. Vigil only escalates after N consecutive failures, which eliminates alert fatigue from transient network blips and flaky job starts.',
  },
]

export default function VigilCaseStudy() {
  return (
    <>
      <main id="main-content">
        <PageHeader title="Vigil" back={{ label: 'Back to projects', to: '/projects' }}>
          <p className="col-span-12 font-display text-lead font-medium text-muted">{vigil.kind}</p>
          <p className="col-span-12 max-w-measure text-lead lg:col-span-8">{vigil.description}</p>
          <div className="col-span-12 flex flex-wrap gap-3 pt-2">
            <a
              href={vigil.liveUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-quiet"
            >
              Visit the live site
            </a>
            <a
              href={vigil.repoUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-quiet"
            >
              View the source
            </a>
          </div>
        </PageHeader>

        <CaseSection title="The problem">
          <p className="max-w-measure">
            ETL pipeline failures are silent. A job stalls, data goes stale, and analysts downstream
            don't know until something breaks visibly, sometimes hours later. Existing tools either
            require expensive enterprise contracts or don't understand your specific pipeline's
            normal behavior. Vigil was built to solve exactly this.
          </p>
        </CaseSection>

        <CaseSection title="The solution">
          <div className="max-w-measure space-y-4">
            <p>
              Vigil integrates with AWS Glue through boto3 to pull real-time and historical job run
              telemetry. A statistical anomaly detection layer, based on duration z-scores and
              consecutive failure thresholds, determines whether any given run should trigger an
              alert.
            </p>
            <p>
              Alerts route through SendGrid with structured context: which pipeline, what the
              anomaly was, and how it compares to the 7-day and 30-day baselines. A Datadog-inspired
              dashboard built in React gives engineers a live view of pipeline health across all
              jobs.
            </p>
            <p>
              Auth is handled with JWT, and data persists in PostgreSQL on Supabase, managed through
              Alembic migrations. The backend runs on Render; the frontend is deployed on Vercel.
            </p>
          </div>
        </CaseSection>

        <CaseSection title="Security">
          <dl className="space-y-6">
            {security.map(({ title, body }) => (
              <div key={title} className="max-w-measure">
                <dt className="font-display font-semibold">{title}</dt>
                <dd className="mt-1 text-muted">{body}</dd>
              </div>
            ))}
          </dl>
        </CaseSection>

        <CaseSection title="Architecture">
          <div className="grid gap-8 sm:grid-cols-3">
            {architecture.map(({ layer, items }) => (
              <div key={layer}>
                <h3 className="font-display font-semibold">{layer}</h3>
                <ul className="mt-3 space-y-2 text-muted">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CaseSection>

        <CaseSection title="Key decisions">
          <dl className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            {decisions.map(({ title, body }) => (
              <div key={title}>
                <dt className="font-display font-semibold">{title}</dt>
                <dd className="mt-1 text-muted">{body}</dd>
              </div>
            ))}
          </dl>
        </CaseSection>

        <CaseSection title="Stack">
          <StackTags items={vigil.stack} label="Vigil stack" />
        </CaseSection>
        <div className="pb-section" />
      </main>
      <Footer />
    </>
  )
}
