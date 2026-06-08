import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const descriptors = [
  'Cloud & Data Engineering',
  'Full-Stack Development',
  'DevOps & CI/CD',
  'Cybersecurity',
]

const INTERVAL_MS = 2800

export default function RotatingDescriptor() {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setIndex((i) => (i + 1) % descriptors.length), INTERVAL_MS)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <span
      className="inline-block font-mono text-sm md:text-base text-accent tracking-widest uppercase select-none"
      aria-label={`Areas of focus: ${descriptors.join(', ')}`}
      aria-live="polite"
    >
      {reduced ? (
        <span>{descriptors[0]}</span>
      ) : (
        <AnimatePresence mode="wait">
          <motion.span
            key={descriptors[index]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="inline-block"
          >
            {descriptors[index]}
          </motion.span>
        </AnimatePresence>
      )}
    </span>
  )
}
