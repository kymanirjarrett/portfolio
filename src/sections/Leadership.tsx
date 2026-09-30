import { Link } from 'react-router-dom'
import LeadershipList from '@/components/LeadershipList'
import { HOME_LEADERSHIP_COUNT, leadership } from '@/data/leadership'

export default function Leadership() {
  return (
    <section id="leadership" aria-labelledby="leadership-heading" className="page-grid py-section">
      <div className="col-span-12 mb-10 flex flex-wrap items-end justify-between gap-4 lg:mb-16">
        <h2 id="leadership-heading" className="heading-display text-h2">
          Outside of code
        </h2>
        <Link to="/leadership" className="link-inline font-display">
          See all leadership roles
        </Link>
      </div>
      <LeadershipList items={leadership.slice(0, HOME_LEADERSHIP_COUNT)} />
    </section>
  )
}
