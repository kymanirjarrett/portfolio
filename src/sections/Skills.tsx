import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { skillCategories, type SkillCategory } from '@/data/skills'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Each group starts scattered at its own offset and settles into the grid as
// the reader scrolls, so the four read as assembling rather than fading in.
const SCATTER = [
  { y: 160, rotate: -4 },
  { y: 70, rotate: 3 },
  { y: 220, rotate: -2 },
  { y: 110, rotate: 4 },
]

function SkillGroup({
  category,
  index,
  progress,
  animated,
}: {
  category: SkillCategory
  index: number
  progress: MotionValue<number>
  animated: boolean
}) {
  const scatter = SCATTER[index % SCATTER.length]
  const y = useTransform(progress, [0, 1], [scatter.y, 0])
  const rotate = useTransform(progress, [0, 1], [scatter.rotate, 0])

  return (
    <motion.div
      style={animated ? { y, rotate } : undefined}
      className="col-span-12 border-t border-ink/15 pt-6 sm:col-span-6 lg:col-span-3"
    >
      <h3 className="font-display text-lead font-semibold">{category.label}</h3>
      <ul className="mt-4 space-y-1.5">
        {category.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Skills() {
  const gridRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ['start end', 'start 0.45'] })

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="page-grid overflow-x-clip py-section"
    >
      <h2 id="skills-heading" className="heading-display col-span-12 mb-10 text-h2 lg:mb-16">
        Skills
      </h2>
      <div ref={gridRef} className="col-span-12 grid grid-cols-12 gap-x-[var(--grid-gap)] gap-y-10">
        {skillCategories.map((category, i) => (
          <SkillGroup
            key={category.label}
            category={category}
            index={i}
            progress={scrollYProgress}
            animated={!reduced}
          />
        ))}
      </div>
    </section>
  )
}
