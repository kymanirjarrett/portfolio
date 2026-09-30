import { useCallback } from 'react'
import { useLenis } from 'lenis/react'
import { useReducedMotion } from './useReducedMotion'

const NAV_OFFSET = -72

/** Scrolls to a section by id, through Lenis when it is running. */
export function useScrollToId() {
  const lenis = useLenis()
  const reduced = useReducedMotion()

  return useCallback(
    (id: string) => {
      const el = document.getElementById(id)
      if (!el) return
      if (lenis) {
        lenis.scrollTo(el, { offset: NAV_OFFSET, immediate: reduced })
      } else {
        el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
      }
    },
    [lenis, reduced]
  )
}
