import ExperienceTimeline from '@/components/ExperienceTimeline'
import { PageHeader } from '@/components/PageLayout'

export default function ExperiencePage() {
  return (
    <main id="main-content">
      <PageHeader title="Where I've worked" back={{ label: 'Back to home', to: '/' }} />
      <div className="page-grid pb-section">
        <ExperienceTimeline headingLevel="h2" />
      </div>
    </main>
  )
}
