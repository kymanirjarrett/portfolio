import {
  createContext,
  lazy,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { isCommandMenuShortcut } from '@/lib/platform'

// The menu (cmdk and its dialog) loads the first time it opens, so it stays out
// of the initial bundle. Only this provider and the shortcut listener ship up front.
const CommandMenu = lazy(() => import('@/components/CommandMenu'))

interface CommandMenuContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

const CommandMenuContext = createContext<CommandMenuContextValue | null>(null)

export function CommandMenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const toggle = useCallback(() => setOpen((v) => !v), [])

  // Radix only returns focus to its own Dialog.Trigger. The menu opens from a
  // shortcut or the nav button instead, so remember what had focus and restore it.
  const returnFocusTo = useRef<HTMLElement | null>(null)
  useEffect(() => {
    if (open) {
      setLoaded(true)
      returnFocusTo.current = document.activeElement as HTMLElement | null
      return
    }
    const el = returnFocusTo.current
    returnFocusTo.current = null
    if (!el?.isConnected) return
    const id = requestAnimationFrame(() => el.focus())
    return () => cancelAnimationFrame(id)
  }, [open])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!isCommandMenuShortcut(e)) return
      e.preventDefault()
      toggle()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [toggle])

  const value = useMemo(() => ({ open, setOpen, toggle }), [open, toggle])

  return (
    <CommandMenuContext.Provider value={value}>
      {children}
      {(open || loaded) && (
        <Suspense fallback={null}>
          <CommandMenu open={open} onOpenChange={setOpen} />
        </Suspense>
      )}
    </CommandMenuContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCommandMenu(): CommandMenuContextValue {
  const ctx = useContext(CommandMenuContext)
  if (!ctx) throw new Error('useCommandMenu must be used inside CommandMenuProvider')
  return ctx
}
