import { useCallback, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { BootLoader } from './components/layout/BootLoader'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Contact } from './components/sections/Contact'

/** Show the boot intro only on the first visit in a session, and never for reduced-motion users. */
function shouldBoot() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    if (sessionStorage.getItem('booted')) return false
    sessionStorage.setItem('booted', '1')
  } catch {
    /* ignore */
  }
  return true
}

// Decided once per page load (outside React so StrictMode double-renders don't consume the flag).
const BOOT = shouldBoot()

export default function App() {
  const [booting, setBooting] = useState(BOOT)
  const [ready, setReady] = useState(!booting)
  const finishBoot = useCallback(() => setBooting(false), [])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <AnimatePresence onExitComplete={() => setReady(true)}>{booting && <BootLoader onDone={finishBoot} />}</AnimatePresence>
      <ScrollProgress />
      <div className="page-grid" aria-hidden="true" />
      <Navbar />
      <main id="main">
        <Hero ready={ready} />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      {/* Visitor stats and Core Web Vitals. View them in Vercel → Project → Analytics / Speed Insights. */}
      <Analytics />
      <SpeedInsights />
    </MotionConfig>
  )
}
