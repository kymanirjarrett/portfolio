import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
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
      { label: 'Skills', href: '/#skills' },
      { label: 'About', href: '/#about' },
    ],
  },
  { label: 'Experience', href: '/experience', isAnchor: false },
  { label: 'Projects', href: '/#projects', isAnchor: true },
  { label: 'Leadership', href: '/leadership', isAnchor: false },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [homeExpanded, setHomeExpanded] = useState(false)
  const location = useLocation()
  const reduced = useReducedMotion()
  const { openModal } = useResumeModal()
  const dropdownRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setHomeExpanded(false)
  }, [location])

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setHomeExpanded(false)
      }
    }
    if (homeExpanded) document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [homeExpanded])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }

  function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const id = href.replace(/^\/#/, '')
    if (href.startsWith('/#')) {
      e.preventDefault()
      setMenuOpen(false)
      if (location.pathname === '/') {
        scrollTo(id)
      } else {
        // navigate to home then scroll after load
        window.location.href = href
      }
    }
  }

  function handleSubLinkClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const id = href.replace(/^\/#/, '')
    e.preventDefault()
    setHomeExpanded(false)
    setMenuOpen(false)
    if (location.pathname === '/') {
      scrollTo(id)
    } else {
      window.location.href = href
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
            <li key={label} className="relative" ref={children ? dropdownRef : undefined}>
              {children ? (
                /* Home with dropdown */
                <div className="relative group">
                  <button
                    onClick={() => setHomeExpanded((v) => !v)}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                      location.pathname === '/' ? 'text-ink' : 'text-muted hover:text-ink'
                    }`}
                    aria-expanded={homeExpanded}
                    aria-haspopup="true"
                  >
                    {label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${homeExpanded ? 'rotate-180' : ''}`}
                      aria-hidden
                    />
                  </button>

                  {homeExpanded && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                      <div className="bg-paper rounded-xl shadow-lg border border-ink/8 py-1.5 min-w-[120px]">
                        <Link
                          to="/"
                          className="block px-4 py-2 text-sm text-muted hover:text-ink hover:bg-ink/4 transition-colors"
                          onClick={() => setHomeExpanded(false)}
                        >
                          Home
                        </Link>
                        {children.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            onClick={(e) => handleSubLinkClick(e, sub.href)}
                            className="block px-4 py-2 text-sm text-muted hover:text-ink hover:bg-ink/4 transition-colors"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
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
          <span className="block w-5 h-px bg-current mb-1.5 transition-all" />
          <span className="block w-5 h-px bg-current mb-1.5 transition-all" />
          <span className="block w-5 h-px bg-current transition-all" />
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
                    <button
                      onClick={() => setHomeExpanded((v) => !v)}
                      className="flex items-center gap-1 py-2.5 text-base font-medium text-ink w-full"
                    >
                      {label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${homeExpanded ? 'rotate-180' : ''}`}
                        aria-hidden
                      />
                    </button>
                    {homeExpanded && (
                      <div className="pl-4 flex flex-col gap-0.5 mb-1">
                        <Link
                          to="/"
                          className="py-2 text-sm text-muted"
                          onClick={() => { setMenuOpen(false); setHomeExpanded(false) }}
                        >
                          Home
                        </Link>
                        {children.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            onClick={(e) => handleSubLinkClick(e, sub.href)}
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
                  <Link
                    to={href}
                    className="block py-2.5 text-base font-medium text-ink"
                  >
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
