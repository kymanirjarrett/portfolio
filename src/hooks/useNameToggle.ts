import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'

/**
 * Hover, keyboard focus, and tap all switch the name into its graph state.
 *
 * - Mouse or pen: the graph shows while the pointer is over the name.
 * - Keyboard: focus shows it, blur hides it, and Enter or Space toggles it.
 * - Touch: a tap toggles it. Touch also fires pointerenter and focus, so both
 *   are ignored while a touch is in progress or the tap would cancel itself.
 */
export function useNameToggle() {
  const [graph, setGraph] = useState(false)
  const pointerActive = useRef(false)
  const lastPointer = useRef<string>('mouse')

  const onPointerDown = useCallback((e: PointerEvent) => {
    pointerActive.current = true
    lastPointer.current = e.pointerType
  }, [])

  const onPointerEnter = useCallback((e: PointerEvent) => {
    lastPointer.current = e.pointerType
    if (e.pointerType !== 'touch') setGraph(true)
  }, [])

  const onPointerLeave = useCallback((e: PointerEvent) => {
    if (e.pointerType !== 'touch') setGraph(false)
  }, [])

  const onClick = useCallback(() => {
    pointerActive.current = false
    if (lastPointer.current === 'touch') setGraph((v) => !v)
  }, [])

  const onFocus = useCallback(() => {
    // Focus that arrives with a pointer press is handled by hover or tap.
    if (!pointerActive.current) setGraph(true)
  }, [])

  const onBlur = useCallback(() => {
    pointerActive.current = false
    setGraph(false)
  }, [])

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Enter' && e.key !== ' ') return
    e.preventDefault()
    setGraph((v) => !v)
  }, [])

  return {
    graph,
    handlers: {
      onPointerDown,
      onPointerEnter,
      onPointerLeave,
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
    },
  }
}
