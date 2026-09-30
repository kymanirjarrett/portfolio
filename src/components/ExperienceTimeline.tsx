import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { experience } from '@/data/experience'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import StackTags from './StackTags'

// Row layout: dates and company | rail | the role. The rail column has a fixed
// width so the line can be placed with plain arithmetic at every breakpoint.
const ROW = 'grid grid-cols-[1.5rem_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_4rem_minmax(0,3fr)]'
const LINE_POSITION = 'left-[0.75rem] lg:left-[calc((100%-4rem)*0.25+2rem)]'

interface ExperienceTimelineProps {
  headingLevel?: 'h2' | 'h3'
}

export default function ExperienceTimeline({
  headingLevel: Heading = 'h3',
}: ExperienceTimelineProps) {
  const listRef = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  // The line draws down as the reader scrolls through the roles and retracts
  // when they scroll back up.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.75', 'end 0.6'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <ol ref={listRef} className="relative col-span-12">
      <span
        aria-hidden
        className={`absolute bottom-0 top-2 w-px -translate-x-1/2 bg-ink/10 ${LINE_POSITION}`}
      />
      <motion.span
        aria-hidden
        style={reduced ? undefined : { scaleY }}
        className={`absolute bottom-0 top-2 w-[2px] origin-top -translate-x-1/2 bg-cobalt ${LINE_POSITION}`}
      />

      {experience.map((item) => (
        <li key={item.id} className={`${ROW} relative pb-16 last:pb-0 lg:pb-24`}>
          <div className="col-start-2 row-start-1 mb-4 lg:col-start-1 lg:mb-0 lg:pr-6 lg:text-right">
            <p className="text-small tabular-nums text-muted">{item.period}</p>
            <p className="mt-1 font-display font-semibold">{item.company}</p>
          </div>

          <div className="col-start-1 row-start-1 flex justify-center pt-1.5 lg:col-start-2">
            <span
              aria-hidden
              className="relative z-10 h-3 w-3 rounded-full border-2 border-cobalt bg-paper"
            />
          </div>

          <div className="col-start-2 lg:col-start-3 lg:row-start-1">
            <Heading className="heading-card">{item.role}</Heading>
            <ul className="mt-5 max-w-measure space-y-3">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="relative pl-5">
                  <span aria-hidden className="absolute left-0 top-[0.7em] h-px w-2.5 bg-ink/40" />
                  {bullet}
                </li>
              ))}
            </ul>
            <StackTags items={item.stack} label={`${item.company} stack`} className="mt-6" />
          </div>
        </li>
      ))}
    </ol>
  )
}
