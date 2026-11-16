import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import NameGrid2D from '@/components/home/NameGrid2D'
import { SocialLinks } from '@/components/SocialIcons'
import { useNameToggle } from '@/hooks/useNameToggle'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EMAIL } from '@/lib/contact'

const linkClass =
  'font-medium text-ink underline decoration-accent/50 decoration-2 underline-offset-[0.2em] transition-colors hover:text-accent hover:decoration-accent'

function External({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
    </a>
  )
}

function Internal({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className={linkClass}>
      {children}
    </Link>
  )
}

export default function Home() {
  const reduced = useReducedMotion()
  const { graph, handlers } = useNameToggle()

  return (
    <main
      id="main-content"
      className="relative isolate min-h-[100svh] overflow-hidden bg-gradient-to-b from-sky to-canvas"
    >
      <section
        aria-labelledby="home-heading"
        className="page-grid relative z-10 min-h-[100svh] content-center pb-10 pt-24"
      >
        <div className="col-span-12 lg:col-span-7">
          <h1
            id="home-heading"
            className="font-display text-[clamp(1.75rem,1.2rem+2vw,3rem)] font-semibold leading-tight tracking-[-0.02em]"
          >
            Hey, I'm<span className="sr-only"> Kymani Jarrett</span>
          </h1>

          {/* The name in blocks. Decorative for screen readers (the h1 carries the
              name), but a real control: hover, focus, or tap plays the graph. */}
          <div
            role="button"
            tabIndex={0}
            aria-pressed={graph}
            aria-label="Show the name as a contribution graph"
            className="relative mt-2 aspect-[53/12] w-full cursor-pointer touch-manipulation select-none rounded-lg"
            {...handlers}
          >
            <NameGrid2D
              graph={graph}
              reduced={reduced}
              className="absolute inset-x-0 top-1/2 -translate-y-1/2"
            />
          </div>

          <div className="mt-6 max-w-[56ch] space-y-3 text-lead">
            <p>
              Software engineer studying IT and Cybersecurity at the{' '}
              <External href="https://www.uc.edu">University of Cincinnati</External>.
            </p>
            <p>
              Most recently a Software Engineer Intern at{' '}
              <External href="https://www.jmsmucker.com">The J.M. Smucker Co.</External>, where I
              shipped keyless CI/CD and data pipelines on AWS.
            </p>
            <p>
              Before that, I built full-stack apps for Fortune 500 clients at the{' '}
              <External href="https://www.cech.uc.edu/Academics/school-of-information-technology/centers/itsolutionscenter.html">
                UC IT Solutions Center
              </External>
              .
            </p>
            <p>
              Outside of work, I'm building <Internal to="/projects/vigil">Vigil</Internal> and{' '}
              <Internal to="/projects/clausify">Clausify</Internal>, and leading corporate outreach
              for <External href="https://www.colorstack.org">ColorStack</External> at UC.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <a href={`mailto:${EMAIL}`} className={`${linkClass} font-display text-lead`}>
              {EMAIL}
            </a>
            <SocialLinks className="-ml-1" />
          </div>
        </div>
      </section>
    </main>
  )
}
