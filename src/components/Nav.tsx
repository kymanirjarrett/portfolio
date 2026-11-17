import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import PixelMark from '@/components/PixelMark'
import { SocialLinks } from '@/components/SocialIcons'
import Tooltip from '@/components/Tooltip'
import { useCommandMenu } from '@/contexts/CommandMenuContext'
import { isApplePlatform } from '@/lib/platform'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Leadership', href: '/leadership' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [apple, setApple] = useState(false)
  const location = useLocation()
  const commandMenu = useCommandMenu()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Read after mount: the platform is only known in the browser.
  useEffect(() => setApple(isApplePlatform()), [])

  function isCurrent(href: string) {
    return location.pathname === href || location.pathname.startsWith(`${href}/`)
  }

  const shortcut = apple ? '⌘K' : 'Ctrl K'

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300',
        // Solid everywhere but the homepage, whose hero is designed to sit under a
        // clear nav; elsewhere (the beach sky) muted links would drop below AA.
        scrolled || menuOpen || location.pathname !== '/'
          ? 'bg-canvas/90 shadow-[0_1px_0_rgb(31_42_36/0.08)] backdrop-blur-sm'
          : 'bg-transparent'
      )}
    >
      <nav aria-label="Main" className="flex h-16 items-center justify-between px-gutter">
        <Tooltip label="Home" align="start">
          <Link
            to="/"
            aria-label="Kymani Jarrett, home"
            className="-m-2 rounded-md p-2 text-ink transition-colors hover:text-accent"
          >
            <PixelMark className="h-6 w-auto" />
          </Link>
        </Tooltip>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {navItems.map(({ label, href }) => (
              <li key={href}>
                <Link
                  to={href}
                  aria-current={isCurrent(href) ? 'page' : undefined}
                  className={cn(
                    'font-display font-medium transition-colors',
                    isCurrent(href)
                      ? 'text-ink underline decoration-accent decoration-2 underline-offset-8'
                      : 'text-muted hover:text-ink'
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <SocialLinks />
            <Tooltip label="Command menu" align="end">
              <button
                type="button"
                onClick={commandMenu.toggle}
                aria-keyshortcuts="Meta+K Control+K"
                className="ml-1 rounded-md px-2 py-1 font-mono text-[0.75rem] text-muted ring-1 ring-inset ring-ink/15 transition-colors hover:text-ink hover:ring-ink/30"
              >
                <span className="sr-only">Open command menu</span>
                <kbd aria-hidden="true" className="font-mono">
                  {shortcut}
                </kbd>
              </button>
            </Tooltip>
          </div>
        </div>

        <button
          type="button"
          className="-mr-2 p-2 text-ink md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-ink/10 px-gutter pb-8 pt-4 md:hidden">
          <ul className="mb-6 flex flex-col">
            {navItems.map(({ label, href }) => (
              <li key={href}>
                <Link
                  to={href}
                  aria-current={isCurrent(href) ? 'page' : undefined}
                  className="block py-3 font-display text-xl font-semibold text-ink"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <SocialLinks className="-ml-2.5" size={22} tooltips={false} />
        </div>
      )}
    </header>
  )
}
