import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const navLinks = [
  { label: 'Work', href: '/#work' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Skills', href: '/#skills' },
  { label: 'About', href: '/#about' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const reduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href.startsWith('/#') && location.pathname === '/') {
      e.preventDefault()
      setMenuOpen(false)
      const id = href.slice(2)
      document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                onClick={(e) => handleAnchorClick(e, href)}
                className="text-sm font-medium text-muted hover:text-ink transition-colors"
              >
                {label}
              </a>
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
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink text-paper text-sm font-medium rounded-full hover:bg-ink/80 transition-colors"
          >
            Resume
          </a>
        </div>

        {/* Mobile menu button */}
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
          <ul className="flex flex-col gap-4 mb-6" role="list">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => handleAnchorClick(e, href)}
                  className="text-base font-medium text-ink"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-ink text-paper text-sm font-medium rounded-full"
          >
            Download Resume
          </a>
        </div>
      )}
    </header>
  )
}
