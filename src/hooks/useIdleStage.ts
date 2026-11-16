import { useEffect, useState } from 'react'

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  cancelIdleCallback?: (id: number) => void
}

/**
 * Counts up from 0 to `stages`, one step per idle period, so heavy work (here,
 * creating the WebGL context and compiling shaders) is split across several
 * short tasks after first paint instead of one long one that blocks input.
 */
export function useIdleStage(stages: number, enabled = true): number {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (!enabled || stage >= stages) return
    const w = window as IdleWindow
    if (w.requestIdleCallback && w.cancelIdleCallback) {
      const id = w.requestIdleCallback(() => setStage((s) => s + 1), { timeout: 1500 })
      return () => w.cancelIdleCallback!(id)
    }
    const id = window.setTimeout(() => setStage((s) => s + 1), 200)
    return () => window.clearTimeout(id)
  }, [enabled, stage, stages])

  return stage
}
