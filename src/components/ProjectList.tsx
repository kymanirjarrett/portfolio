import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import type { Project } from '@/data/projects'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import StackTags from './StackTags'
import StatusMarker from './StatusMarker'

const actionClass =
  'font-display font-semibold text-cobalt underline decoration-cobalt/30 underline-offset-4 transition-colors hover:decoration-cobalt'

function ProjectActions({ project }: { project: Project }) {
  const links = [
    project.caseStudy && { label: 'Read the case study', href: project.caseStudy, internal: true },
    project.liveUrl && { label: 'Visit the live site', href: project.liveUrl, internal: false },
    project.repoUrl && { label: 'View the source', href: project.repoUrl, internal: false },
  ].filter((l): l is { label: string; href: string; internal: boolean } => Boolean(l))

  if (links.length === 0) return null

  return (
    <ul
      className="flex flex-wrap gap-x-6 gap-y-2 lg:flex-col"
      aria-label={`${project.title} links`}
    >
      {links.map(({ label, href, internal }) => (
        <li key={label}>
          {internal ? (
            <Link to={href} className={actionClass}>
              {label}
            </Link>
          ) : (
            <a href={href} target="_blank" rel="noopener noreferrer" className={actionClass}>
              {label}
            </a>
          )}
        </li>
      ))}
    </ul>
  )
}

interface ProjectRowProps {
  project: Project
  /** Side the panel slides in from: -1 left, 1 right. 0 disables the motion. */
  from: -1 | 0 | 1
  headingLevel: 'h2' | 'h3'
}

function ProjectRow({ project, from, headingLevel: Heading }: ProjectRowProps) {
  const ref = useRef<HTMLElement>(null)
  // Scroll-scrubbed: the panel travels exactly as far as the reader has scrolled
  // and reverses when they scroll back.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.55'] })
  const x = useTransform(scrollYProgress, [0, 1], [`${from * 22}vw`, '0vw'])
  const animated = from !== 0

  return (
    <motion.article
      ref={ref}
      aria-labelledby={`project-${project.id}`}
      style={animated ? { x } : undefined}
      className="grid grid-cols-12 gap-x-[var(--grid-gap)] gap-y-6 border-t border-ink/15 py-10 lg:py-14"
    >
      <div className="col-span-12 lg:col-span-5">
        <Heading
          id={`project-${project.id}`}
          className="font-display text-[clamp(2rem,1.2rem+2.6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.02em] [font-stretch:112%]"
        >
          {project.title}
        </Heading>
        <p className="mt-3 font-display text-lead font-medium text-muted">{project.kind}</p>
        {project.inDevelopment && (
          <p className="mt-4">
            <StatusMarker />
          </p>
        )}
      </div>

      <div className="col-span-12 lg:col-span-5">
        <p className="max-w-measure">{project.description}</p>
        {project.context && (
          <p className="mt-4 max-w-measure text-small text-muted">{project.context}</p>
        )}
        <StackTags items={project.stack} label={`${project.title} stack`} className="mt-6" />
      </div>

      <div className="col-span-12 lg:col-span-2 lg:justify-self-end">
        <ProjectActions project={project} />
      </div>
    </motion.article>
  )
}

interface ProjectListProps {
  projects: Project[]
  headingLevel?: 'h2' | 'h3'
}

export default function ProjectList({ projects, headingLevel = 'h3' }: ProjectListProps) {
  const reduced = useReducedMotion()
  return (
    <div className="col-span-12">
      {projects.map((project, i) => (
        <ProjectRow
          key={project.id}
          project={project}
          from={reduced ? 0 : i % 2 === 0 ? -1 : 1}
          headingLevel={headingLevel}
        />
      ))}
    </div>
  )
}
