import ProjectList from '@/components/ProjectList'
import { projects } from '@/data/projects'

export default function Work() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="page-grid overflow-x-clip py-section"
    >
      <h2 id="projects-heading" className="heading-display col-span-12 mb-10 text-h2 lg:mb-16">
        Things I've built
      </h2>
      <ProjectList projects={projects} />
    </section>
  )
}
