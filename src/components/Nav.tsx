import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useResumeModal } from '@/contexts/ResumeModalContext'

type SubLink = { label: string; href: string }

type NavLink = {
  label: string
  href: string
  isAnchor: boolean
  children?: SubLink[]
}

const navLinks: NavLink[] = [
  {
    label: 'Home',
    href: '/',
    isAnchor: false,
    children: [
      { label: 'About', href: '/#about' },
      { label: 'Skills', href: '/#skills' },
    ],
  },
  { label: 'Experience', href: '/experience', isAnchor: false },
  { label: 'Projects', href: '/#projects', isAnchor: true },
  { label: 'Leadership', href: '/leadership', isAnchor: false },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileHomeExpanded, setMobileHomeExpanded] = useState(false)
  const location = useLocation()
  const reduced = useReducedMotion()
  const { openModal } = useResumeModal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setMobileHomeExpanded(false)
  }, [location])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }

  function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href.startsWith('/#')) {
      e.preventDefault()
      setMenuOpen(false)
      if (location.pathname === '/') {
        scrollTo(href.slice(2))
      } else {
        window.location.href = href
      }
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-paper/90 backdrop-blur-md border-b border-ink/5 shadow-sm' : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
        <Link
          to="/"
          className="font-display font-semibold text-lg tracking-tight text-ink hover:text-accent transition-colors"
          aria-label="Kymani Jarrett — home"
        >
          KJ
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6" role="list">
          {navLinks.map(({ label, href, isAnchor, children }) => (
            <li key={label} className="relative group">
              {children ? (
                /* Home — click navigates, hover reveals dropdown */
                <>
                  <Link
                    to={href}
                    className={`text-sm font-medium transition-colors ${
                      location.pathname === '/' ? 'text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {label}
                  </Link>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-150 z-50">
                    <div className="bg-paper rounded-xl shadow-lg border border-ink/8 py-1.5 min-w-[110px]">
                      {children.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          onClick={(e) => handleAnchorClick(e, sub.href)}
                          className="block px-4 py-2 text-sm text-muted hover:text-ink hover:bg-ink/4 transition-colors"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              ) : isAnchor ? (
                <a
                  href={href}
                  onClick={(e) => handleAnchorClick(e, href)}
                  className="text-sm font-medium text-muted hover:text-ink transition-colors"
                >
                  {label}
                </a>
              ) : (
                <Link
                  to={href}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === href ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/kymanirjarrett"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted hover:text-ink transition-colors"
            aria-label="GitHub profile"
          >
            GitHub
          </a>
          <button
            onClick={openModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink text-paper text-sm font-medium rounded-full hover:bg-ink/80 transition-colors"
          >
            Resume
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-ink"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-5 h-px bg-current" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-paper border-t border-ink/5 px-6 py-6">
          <ul className="flex flex-col gap-1 mb-6" role="list">
            {navLinks.map(({ label, href, isAnchor, children }) => (
              <li key={label}>
                {children ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <Link
                        to={href}
                        className="py-2.5 text-base font-medium text-ink"
                        onClick={() => setMenuOpen(false)}
                      >
                        {label}
                      </Link>
                      <button
                        onClick={() => setMobileHomeExpanded((v) => !v)}
                        className="p-2 text-muted"
                        aria-label="Toggle sub-links"
                      >
                        <span className={`block transition-transform duration-200 ${mobileHomeExpanded ? 'rotate-180' : ''}`}>
                          ▾
                        </span>
                      </button>
                    </div>
                    {mobileHomeExpanded && (
                      <div className="pl-4 flex flex-col gap-0.5 mb-1">
                        {children.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            onClick={(e) => handleAnchorClick(e, sub.href)}
                            className="py-2 text-sm text-muted"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : isAnchor ? (
                  <a
                    href={href}
                    onClick={(e) => handleAnchorClick(e, href)}
                    className="block py-2.5 text-base font-medium text-ink"
                  >
                    {label}
                  </a>
                ) : (
                  <Link to={href} className="block py-2.5 text-base font-medium text-ink">
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <button
            onClick={() => { setMenuOpen(false); openModal() }}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-ink text-paper text-sm font-medium rounded-full"
          >
            View Resume
          </button>
        </div>
      )}
    </header>
  )
}
