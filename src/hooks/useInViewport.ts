import { useEffect, useState, type RefObject } from 'react'

/**
 * True while any part of the element is on screen. Without IntersectionObserver
 * it reports false, so anything gated on it (autoplay, WebGL loops) stays off.
 */
export function useInViewport(ref: RefObject<Element | null>, rootMargin = '0px'): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return inView
}
