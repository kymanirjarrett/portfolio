import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ReactLenis, useLenis } from 'lenis/react'
import Home from './pages/Home'
import Nav from './components/Nav'
import { ResumeModalProvider } from './contexts/ResumeModalContext'

const VigilCaseStudy = lazy(() => import('./pages/VigilCaseStudy'))
const ClausifyCaseStudy = lazy(() => import('./pages/ClausifyCaseStudy'))
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'))
const LeadershipPage = lazy(() => import('./pages/LeadershipPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))

function PageLoader() {
  return <div className="min-h-screen bg-paper" aria-busy="true" />
}

function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useLenis()
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
  }, [pathname, lenis])
  return null
}

export default function App() {
  return (
    // Lenis smooths wheel scrolling but keeps native scroll, so position: sticky
    // and Motion's useScroll keep working. It turns itself off under
    // prefers-reduced-motion (respectReducedMotion defaults to true).
    <ReactLenis root options={{ autoRaf: true }}>
      <BrowserRouter>
        <ResumeModalProvider>
          <a
            href="#main-content"
            className="sr-only z-50 rounded-full bg-ink px-5 py-2.5 font-display font-semibold text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <ScrollToTop />
          <Nav />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/leadership" element={<LeadershipPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/vigil" element={<VigilCaseStudy />} />
              <Route path="/projects/clausify" element={<ClausifyCaseStudy />} />
            </Routes>
          </Suspense>
        </ResumeModalProvider>
      </BrowserRouter>
    </ReactLenis>
  )
}
