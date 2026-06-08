import { useEffect, useRef } from 'react'
import { X, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ResumeModalProps {
  open: boolean
  onClose: () => void
}

export default function ResumeModal({ open, onClose }: ResumeModalProps) {
  const reduced = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const isMobile = typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)

  useEffect(() => {
    if (!open) return
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      prev?.focus()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
            className="fixed inset-x-4 inset-y-4 md:inset-x-8 md:inset-y-8 lg:inset-x-16 lg:inset-y-8 z-50 bg-surface rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            initial={reduced ? false : { opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-ink/8 flex-shrink-0">
              <span className="font-display font-semibold text-sm text-ink">Kymani Jarrett — Resume</span>
              <div className="flex items-center gap-2">
                <a
                  href="/resume.pdf"
                  download="Kymani_Jarrett_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-accent text-white text-xs font-medium rounded-full hover:bg-accent/90 transition-colors"
                >
                  <Download size={13} />
                  Download
                </a>
                <button
                  ref={closeRef}
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-ink hover:bg-ink/5 transition-colors"
                  aria-label="Close resume preview"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* PDF content */}
            <div className="flex-1 min-h-0 bg-ink/5">
              {isMobile ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
                  <p className="text-muted text-sm">PDF preview isn't available on mobile.</p>
                  <a
                    href="/resume.pdf"
                    download="Kymani_Jarrett_Resume.pdf"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-full hover:bg-accent/90 transition-colors"
                  >
                    <Download size={16} />
                    Download Resume
                  </a>
                </div>
              ) : (
                <iframe
                  src="/resume.pdf#view=FitH&toolbar=0"
                  title="Resume"
                  className="w-full h-full border-0"
                  aria-label="Resume PDF preview"
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
