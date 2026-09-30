import Footer from '@/components/Footer'
import LeadershipList from '@/components/LeadershipList'
import { PageHeader } from '@/components/PageLayout'
import { leadership } from '@/data/leadership'

export default function LeadershipPage() {
  return (
    <>
      <main id="main-content">
        <PageHeader title="Outside of code" back={{ label: 'Back to home', to: '/' }} />
        <div className="page-grid pb-section">
          <LeadershipList items={leadership} headingLevel="h2" />
        </div>
      </main>
      <Footer />
    </>
  )
}
