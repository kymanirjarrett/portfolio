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
            className="fixed inset-0 z-50 bg-canvas/50 backdrop-blur-md"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden
          />

          {/* Flex wrapper centers the panel, so Motion's transform on the panel
              never fights a centering translate. */}
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6">
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Resume preview"
              data-lenis-prevent
              className="pointer-events-auto flex h-full max-h-full w-full flex-col overflow-hidden rounded-panel bg-surface shadow-[0_24px_60px_rgb(0_0_0/0.5)] ring-1 ring-fg/10 md:h-[calc(100dvh-3rem)] md:w-[min(100%,calc((100dvh-3rem-3.6rem)*0.7727))]"
              initial={reduced ? false : { opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-shrink-0 items-center justify-between gap-4 border-b border-fg/10 px-5 py-3">
                <span className="font-display font-semibold text-fg">Resume</span>
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
                    className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-fg/5 hover:text-fg"
                    aria-label="Close resume preview"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="min-h-0 flex-1 bg-fg/5">
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
                    src={`${RESUME_PATH}#toolbar=0&navpanes=0&view=Fit&zoom=page-fit`}
                    title="Resume"
                    className="h-full w-full border-0"
                  />
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
