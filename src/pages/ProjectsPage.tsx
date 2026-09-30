import Footer from '@/components/Footer'
import ProjectList from '@/components/ProjectList'
import { PageHeader } from '@/components/PageLayout'
import { projects } from '@/data/projects'

export default function ProjectsPage() {
  return (
    <>
      <main id="main-content">
        <PageHeader title="Things I've built" back={{ label: 'Back to home', to: '/' }} />
        <div className="page-grid overflow-x-clip pb-section">
          <ProjectList projects={projects} headingLevel="h2" />
        </div>
      </main>
      <Footer />
    </>
  )
}
