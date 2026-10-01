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
        // Lenis caches the page's scroll limit and refreshes it a moment after
        // layout changes. Right after a route change that cache still holds the
        // previous page's height and would clamp the target short, so re-measure.
        lenis.resize()
        lenis.scrollTo(el, { offset: NAV_OFFSET, immediate: reduced })
      } else {
        el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
      }
    },
    [lenis, reduced]
  )
}
