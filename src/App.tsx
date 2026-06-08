import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Nav from './components/Nav'

const VigilCaseStudy = lazy(() => import('./pages/VigilCaseStudy'))
const ClausifyCaseStudy = lazy(() => import('./pages/ClausifyCaseStudy'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" aria-label="Loading" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/vigil" element={<VigilCaseStudy />} />
          <Route path="/projects/clausify" element={<ClausifyCaseStudy />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
