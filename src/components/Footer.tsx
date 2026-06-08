import { useResumeModal } from '@/contexts/ResumeModalContext'

export default function Footer() {
  const year = new Date().getFullYear()
  const { openModal } = useResumeModal()

  return (
    <footer className="bg-ink text-paper py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="font-display font-semibold text-lg mb-1">Kymani Jarrett</p>
          <p className="text-paper/50 text-sm">University of Cincinnati · B.S. IT & Cybersecurity</p>
        </div>

        <nav aria-label="Footer links">
          <ul className="flex flex-wrap gap-6" role="list">
            <li>
              <a
                href="https://github.com/kymanirjarrett"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-paper/60 hover:text-paper transition-colors"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/kymanirjarrett"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-paper/60 hover:text-paper transition-colors"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="mailto:jarretkr@mail.uc.edu"
                className="text-sm text-paper/60 hover:text-paper transition-colors"
              >
                Email
              </a>
            </li>
            <li>
              <button
                onClick={openModal}
                className="text-sm text-paper/60 hover:text-paper transition-colors"
              >
                Resume
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-paper/10">
        <p className="text-paper/30 text-xs">
          © {year} Kymani Jarrett · Built with React, Vite, Three.js & Framer Motion
        </p>
      </div>
    </footer>
  )
}
