import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const descriptors = [
  'Cloud & Data Engineering',
  'Full-Stack Development',
  'DevOps & CI/CD',
  'Cybersecurity',
]

const INTERVAL_MS = 4500

export default function RotatingDescriptor() {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setIndex((i) => (i + 1) % descriptors.length), INTERVAL_MS)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <p className="font-display text-lead font-semibold text-cobalt">
      {/* Screen readers get the full list once instead of an announcement every 4.5 seconds. */}
      <span className="sr-only">Areas of focus: {descriptors.join(', ')}</span>
      <span aria-hidden className="relative inline-block h-[1.5em] overflow-hidden align-bottom">
        {reduced ? (
          <span>{descriptors[0]}</span>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={descriptors[index]}
              className="inline-block"
              initial={{ y: '100%', opacity: 0, filter: 'blur(4px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: '-100%', opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {descriptors[index]}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
    </p>
  )
}
