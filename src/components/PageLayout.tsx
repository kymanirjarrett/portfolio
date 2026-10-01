import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface PageHeaderProps {
  title: string
  back: { label: string; to: string }
  children?: ReactNode
}

export function PageHeader({ title, back, children }: PageHeaderProps) {
  return (
    <header className="page-grid gap-y-6 pb-12 pt-32 lg:pb-20 lg:pt-40">
      <Link to={back.to} className="link-inline col-span-12 justify-self-start font-display">
        {back.label}
      </Link>
      <h1 className="heading-display col-span-12 text-[clamp(2.75rem,1.6rem+5vw,8rem)] leading-[0.95] tracking-[-0.03em]">
        {title}
      </h1>
      {children}
    </header>
  )
}

interface CaseSectionProps {
  title: string
  children: ReactNode
}

/** Case study section: heading on the left, content across the rest of the row. */
export function CaseSection({ title, children }: CaseSectionProps) {
  const id = `section-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return (
    <section
      aria-labelledby={id}
      className="page-grid gap-y-6 border-t border-fg/10 py-14 lg:py-20"
    >
      <h2
        id={id}
        className="heading-card col-span-12 lg:sticky lg:top-28 lg:col-span-4 lg:self-start"
      >
        {title}
      </h2>
      <div className="col-span-12 lg:col-span-7 lg:col-start-6">{children}</div>
    </section>
  )
}
