import { useEffect, useRef, useState, type FocusEvent, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const OPEN_DELAY_MS = 250

interface TooltipProps {
  /** Short visible label. The control keeps its own accessible name. */
  label: string
  children: ReactNode
  /** Where the bubble lines up under the control. Use "end" near the right edge. */
  align?: 'center' | 'end' | 'start'
  className?: string
}

/**
 * A small label under an icon-only control, shown on hover (after a short
 * delay) or keyboard focus. It meets WCAG 1.4.13: it stays open while the
 * pointer is over it, closes on Escape, and never covers the control. Touch
 * is ignored, since there is no hover and the tap already acts.
 *
 * The bubble is aria-hidden because it repeats the control's aria-label;
 * screen readers already announce that name.
 */
export default function Tooltip({ label, children, align = 'center', className }: TooltipProps) {
  const [open, setOpen] = useState(false)
  const timer = useRef<number>()

  useEffect(() => () => window.clearTimeout(timer.current), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  function show(delay: number) {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setOpen(true), delay)
  }

  function hide() {
    window.clearTimeout(timer.current)
    setOpen(false)
  }

  function onFocus(e: FocusEvent) {
    // Keyboard focus only; a mouse click also focuses but hover already covers it.
    let keyboard = true
    try {
      keyboard = (e.target as HTMLElement).matches(':focus-visible')
    } catch {
      // Older engines without :focus-visible: treat all focus as keyboard focus.
    }
    if (keyboard) show(0)
  }

  return (
    <span
      className={cn('relative inline-flex', className)}
      onPointerEnter={(e) => e.pointerType !== 'touch' && show(OPEN_DELAY_MS)}
      onPointerLeave={hide}
      onFocus={onFocus}
      onBlur={hide}
    >
      {children}
      <span
        aria-hidden="true"
        data-open={open}
        className={cn(
          // pt-2 bridges the gap, so the pointer can move onto the bubble without closing it.
          'pointer-events-none absolute top-full z-50 pt-2 opacity-0 transition-[opacity,transform] duration-150 ease-out-expo data-[open=true]:pointer-events-auto data-[open=true]:opacity-100',
          align === 'center' && 'left-1/2 -translate-x-1/2',
          align === 'end' && 'right-0',
          align === 'start' && 'left-0'
        )}
      >
        <span className="block whitespace-nowrap rounded-md bg-ink px-2 py-1 font-display text-[0.8125rem] font-medium text-canvas shadow-[0_6px_16px_-6px_rgb(31_42_36/0.4)]">
          {label}
        </span>
      </span>
    </span>
  )
}
