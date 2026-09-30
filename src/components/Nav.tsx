import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useResumeModal } from '@/contexts/ResumeModalContext'
import { useScrollToId } from '@/hooks/useScrollToId'
import { cn } from '@/lib/utils'

type NavItem = { label: string; href: string }

const navItems: NavItem[] = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Leadership', href: '/leadership' },
  { label: 'Contact', href: '/#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const scrollToId = useScrollToId()
  const { openModal } = useResumeModal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith('/#')) return
    e.preventDefault()
    setMenuOpen(false)
    const id = href.slice(2)
    if (location.pathname === '/') scrollToId(id)
    else navigate('/', { state: { scrollTo: id } })
  }

  function isCurrent(href: string) {
    return (
      !href.startsWith('/#') &&
      (location.pathname === href || location.pathname.startsWith(`${href}/`))
    )
  }

  const linkClass = (href: string) =>
    cn(
      'font-display font-medium transition-colors',
      isCurrent(href)
        ? 'text-fg underline decoration-cobalt decoration-2 underline-offset-8'
        : 'text-muted hover:text-fg'
    )

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300',
        scrolled || menuOpen
          ? 'bg-canvas/90 shadow-[0_1px_0_rgb(247_247_252/0.08)]'
          : 'bg-transparent'
      )}
    >
      <nav aria-label="Main" className="flex h-16 items-center justify-between px-gutter">
        <Link to="/" className="font-display text-lg font-bold text-fg [font-stretch:112%]">
          Kymani Jarrett
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {navItems.map(({ label, href }) => (
              <li key={label}>
                <Link
                  to={href}
                  onClick={(e) => handleClick(e, href)}
                  aria-current={isCurrent(href) ? 'page' : undefined}
                  className={linkClass(href)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <button type="button" onClick={openModal} className="btn-quiet py-2">
            View resume
          </button>
        </div>

        <button
          type="button"
          className="-mr-2 p-2 text-fg md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-fg/10 px-gutter pb-8 pt-4 md:hidden">
          <ul className="mb-6 flex flex-col">
            {navItems.map(({ label, href }) => (
              <li key={label}>
                <Link
                  to={href}
                  onClick={(e) => handleClick(e, href)}
                  aria-current={isCurrent(href) ? 'page' : undefined}
                  className="block py-3 font-display text-xl font-semibold text-fg"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false)
              openModal()
            }}
            className="btn-quiet"
          >
            View resume
          </button>
        </div>
      )}
    </header>
  )
}
