import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '@/sections/Hero'
import Spotlight from '@/sections/Spotlight'
import About from '@/sections/About'
import Work from '@/sections/Work'
import Experience from '@/sections/Experience'
import Leadership from '@/sections/Leadership'
import Skills from '@/sections/Skills'
import Contact from '@/sections/Contact'
import Footer from '@/components/Footer'
import { useScrollToId } from '@/hooks/useScrollToId'

export default function Home() {
  const location = useLocation()
  const scrollToId = useScrollToId()

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (!target) return
    // Wait two frames so sections that measure themselves on mount (the
    // highlights strip sets its own height) have settled before scrolling.
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => scrollToId(target))
    })
    // Clear the state so back-navigation doesn't re-trigger the scroll.
    window.history.replaceState({}, '')
    return () => cancelAnimationFrame(id)
  }, [location.state, scrollToId])

  return (
    <>
      <main id="main-content">
        <Hero />
        <Spotlight />
        <About />
        <Work />
        <Experience />
        <Leadership />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
