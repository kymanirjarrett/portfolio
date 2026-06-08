import Hero from '@/sections/Hero'
import Spotlight from '@/sections/Spotlight'
import About from '@/sections/About'
import Work from '@/sections/Work'
import Experience from '@/sections/Experience'
import Skills from '@/sections/Skills'
import Leadership from '@/sections/Leadership'
import Contact from '@/sections/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Spotlight />
      <About />
      <Work />
      <Experience />
      <Skills />
      <Leadership />
      <Contact />
      <Footer />
    </main>
  )
}
