import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Preloader from './components/Preloader.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import TopBar from './components/TopBar.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1900)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
  }, [loading])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Preloader key="preloader" />}</AnimatePresence>
      <ScrollProgress />
      <TopBar />
      <Header />
      <main>
        <Hero ready={!loading} />
        <Marquee />
        <About />
        <Services />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </MotionConfig>
  )
}
