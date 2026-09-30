import Footer from '@/components/Footer'
import StackTags from '@/components/StackTags'
import StatusMarker from '@/components/StatusMarker'
import { CaseSection, PageHeader } from '@/components/PageLayout'
import { projects } from '@/data/projects'

const clausify = projects.find((p) => p.id === 'clausify')!

// A real sequence, so the steps are numbered.
const steps = [
  'The contract is split into clauses.',
  'Each clause gets a context-aware prompt.',
  'The model returns a structured JSON risk assessment for that clause.',
]

const architecture = [
  {
    layer: 'Backend',
    items: [
      'Layered Spring Boot application: controllers, services, and Spring Data JPA repositories',
      'MySQL for persistence',
    ],
  },
  {
    layer: 'Frontend',
    items: ['Angular', 'Tailwind CSS'],
  },
  {
    layer: 'AI',
    items: ['Groq, called through LangChain', 'RAG pipeline for clause-level analysis'],
  },
]

const decisions = [
  {
    title: 'Privacy first',
    body: 'Clausify stores only the text extracted from a contract, never the uploaded file, since contracts are often confidential.',
  },
  {
    title: 'Free-tier-only infrastructure',
    body: 'Every service Clausify runs on is used within its free tier.',
  },
  {
    title: 'Tailwind over Angular Material',
    body: 'The front end is styled with Tailwind CSS rather than Angular Material.',
  },
]

const targets = [
  { value: '85%+', label: 'accuracy on clause risk identification' },
  { value: 'Under 60 seconds', label: 'for a full contract analysis' },
]

export default function ClausifyCaseStudy() {
  return (
    <>
      <main id="main-content">
        <PageHeader title="Clausify" back={{ label: 'Back to projects', to: '/projects' }}>
          <div className="col-span-12 flex flex-wrap items-center gap-4">
            <p className="font-display text-lead font-medium text-muted">{clausify.kind}</p>
            <StatusMarker />
          </div>
          <p className="col-span-12 max-w-measure text-lead lg:col-span-8">
            {clausify.description}
          </p>
          <div className="col-span-12 pt-2">
            <a
              href={clausify.repoUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-quiet"
            >
              View the source
            </a>
          </div>
        </PageHeader>

        <CaseSection title="How the analysis works">
          <ol className="max-w-measure space-y-5">
            {steps.map((step, i) => (
              <li key={step} className="grid grid-cols-[2.5rem_1fr] items-baseline">
                <span className="font-display font-bold tabular-nums text-cobalt-light">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
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

        <CaseSection title="Decisions">
          <dl className="space-y-6">
            {decisions.map(({ title, body }) => (
              <div key={title} className="max-w-measure">
                <dt className="font-display font-semibold">{title}</dt>
                <dd className="mt-1 text-muted">{body}</dd>
              </div>
            ))}
          </dl>
        </CaseSection>

        <CaseSection title="Targets">
          <p className="max-w-measure text-muted">
            These are targets for the project, not measured results.
          </p>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            {targets.map(({ value, label }) => (
              <div key={label} className="border-t border-fg/15 pt-4">
                <dt className="font-display text-small font-medium text-muted">Target</dt>
                <dd className="mt-1">
                  <span className="block font-display text-h3 font-bold">{value}</span>
                  <span className="text-muted">{label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </CaseSection>

        <CaseSection title="Stack">
          <StackTags items={clausify.stack} label="Clausify stack" />
        </CaseSection>
        <div className="pb-section" />
      </main>
      <Footer />
    </>
  )
}
