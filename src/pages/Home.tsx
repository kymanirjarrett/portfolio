import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '@/sections/Hero'
import Spotlight from '@/sections/Spotlight'
import About from '@/sections/About'
import Work from '@/sections/Work'
import Skills from '@/sections/Skills'
import Contact from '@/sections/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (!target) return
    // Wait one frame for the DOM to settle after navigation before scrolling
    const id = requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
    })
    // Clear the state so back-navigation doesn't re-trigger the scroll
    window.history.replaceState({}, '')
    return () => cancelAnimationFrame(id)
  }, [location.state])

  return (
    <main id="main-content">
      <Hero />
      <div
        style={{
          background: [
            'radial-gradient(ellipse 80% 50% at 15% 20%, rgba(221,227,255,0.4) 0%, transparent 60%)',
            'radial-gradient(ellipse 70% 45% at 85% 45%, rgba(255,230,215,0.28) 0%, transparent 60%)',
            'radial-gradient(ellipse 90% 40% at 50% 75%, rgba(59,73,223,0.07) 0%, transparent 65%)',
            '#FAFAF7',
          ].join(', '),
        }}
      >
        <Spotlight />
        <About />
        <Work />
        <Skills />
      </div>
      <Contact />
      <Footer />
    </main>
  )
}
