import { useEffect, useRef } from 'react'
import { X, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useLenis } from 'lenis/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
const RESUME_PATH = '/resume.pdf'
const DOWNLOAD_NAME = 'Kymani_Jarrett_Resume.pdf'

interface ResumeModalProps {
  open: boolean
  onClose: () => void
}

export default function ResumeModal({ open, onClose }: ResumeModalProps) {
  const reduced = useReducedMotion()
  const lenis = useLenis()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const isMobile = typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)

  useEffect(() => {
    if (!open) return
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    lenis?.stop()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return

      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      lenis?.start()
      prev?.focus()
    }
  }, [open, onClose, lenis])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/60"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
            data-lenis-prevent
            className="fixed inset-3 z-50 flex flex-col overflow-hidden rounded-panel bg-paper shadow-[0_24px_60px_rgb(20_20_50/0.35)] md:inset-x-[max(1.5rem,12vw)] md:inset-y-6"
            initial={reduced ? false : { opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-shrink-0 items-center justify-between gap-4 border-b border-ink/10 px-5 py-3">
              <span className="font-display font-semibold text-ink">Resume</span>
              <div className="flex items-center gap-2">
                <a
                  href={RESUME_PATH}
                  download={DOWNLOAD_NAME}
                  className="btn-quiet py-1.5 text-small"
                >
                  <Download size={15} aria-hidden />
                  Download resume
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink"
                  aria-label="Close resume preview"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 bg-ink/5">
              {isMobile ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                  <p className="text-muted">PDF preview isn't available on mobile.</p>
                  <a href={RESUME_PATH} download={DOWNLOAD_NAME} className="btn-quiet">
                    <Download size={16} aria-hidden />
                    Download resume
                  </a>
                </div>
              ) : (
                <iframe
                  src={`${RESUME_PATH}#view=FitH&toolbar=0`}
                  title="Resume"
                  className="h-full w-full border-0"
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
