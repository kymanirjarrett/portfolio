import ExperienceTimeline from '@/components/ExperienceTimeline'

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="page-grid py-section">
      <h2 id="experience-heading" className="heading-display col-span-12 mb-12 text-h2 lg:mb-20">
        Where I've worked
      </h2>
      <ExperienceTimeline />
    </section>
  )
}
