import { useMediaQuery } from './useMediaQuery'

/** The single source of truth for reduced motion across the site. */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
