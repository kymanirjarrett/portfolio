import { useEffect, useState } from 'react'

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  cancelIdleCallback?: (id: number) => void
}

/**
 * Counts up from 0 to `stages`, one step per idle period, so heavy work (here,
 * creating the WebGL context and compiling shaders) is split across several
 * short tasks after first paint instead of one long one that blocks input.
 * `delayMs` holds off the first step, for work that can wait until the reader
 * has settled into the page.
 */
export function useIdleStage(stages: number, enabled = true, delayMs = 0): number {
  const [stage, setStage] = useState(0)
  const [waited, setWaited] = useState(delayMs <= 0)

  useEffect(() => {
    if (waited || !enabled) return
    const id = window.setTimeout(() => setWaited(true), delayMs)
    return () => window.clearTimeout(id)
  }, [waited, enabled, delayMs])

  useEffect(() => {
    if (!enabled || !waited || stage >= stages) return
    const w = window as IdleWindow
    if (w.requestIdleCallback && w.cancelIdleCallback) {
      const id = w.requestIdleCallback(() => setStage((s) => s + 1), { timeout: 1500 })
      return () => w.cancelIdleCallback!(id)
    }
    const id = window.setTimeout(() => setStage((s) => s + 1), 200)
    return () => window.clearTimeout(id)
  }, [enabled, waited, stage, stages])

  return stage
}
