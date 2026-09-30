import type { LeadershipItem } from '@/data/leadership'

interface LeadershipListProps {
  items: LeadershipItem[]
  headingLevel?: 'h2' | 'h3'
}

export default function LeadershipList({
  items,
  headingLevel: Heading = 'h3',
}: LeadershipListProps) {
  return (
    <ul className="col-span-12 grid grid-cols-12 gap-x-[var(--grid-gap)]">
      {items.map((item) => (
        <li
          key={`${item.role}-${item.org}`}
          className="col-span-12 border-t border-fg/15 py-8 md:col-span-6 lg:py-10"
        >
          <Heading className="heading-card">{item.role}</Heading>
          <p className="mt-1 font-display font-medium text-muted">{item.org}</p>
          <ul className="mt-5 max-w-measure space-y-2">
            {item.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
