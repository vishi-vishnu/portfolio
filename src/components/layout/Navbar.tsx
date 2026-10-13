import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LuFileText, LuMenu, LuMoon, LuSun, LuX } from 'react-icons/lu'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useTheme } from '../../hooks/useTheme'
import { profile } from '../../data/profile'
import { NAV_LINKS } from '../../data/navigation'
import './Navbar.css'

const IDS = NAV_LINKS.map((l) => l.id)

export function Navbar() {
  const active = useActiveSection(IDS)
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const ThemeIcon = theme === 'dark' ? LuSun : LuMoon

  return (
    <>
      <motion.header
        className={`nav${scrolled ? ' is-scrolled' : ''}`}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="nav-inner" aria-label="Main">
          <a href="#home" className="nav-logo mono" aria-label={`${profile.name}, back to top`}>
            <span className="nav-logo-mark">{profile.initials}</span>
            <span className="nav-logo-text">
              {profile.handle}
              <span className="nav-logo-caret">_</span>
            </span>
          </a>

          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className={active === l.id ? 'active' : ''} aria-current={active === l.id ? 'true' : undefined}>
                  {active === l.id && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <span className="nav-text">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button className="icon-btn nav-theme" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'grid' }}
                >
                  <ThemeIcon />
                </motion.span>
              </AnimatePresence>
            </button>
            <a className="btn btn-primary btn-sm nav-resume" href={profile.resume} target="_blank" rel="noopener noreferrer">
              <LuFileText /> Resume
            </a>
            <button className="icon-btn nav-burger" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu">
              <LuMenu />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mobile-menu-top">
              <span className="mono mobile-menu-path">~/portfolio $ ls</span>
              <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close menu" autoFocus>
                <LuX />
              </button>
            </div>
            <motion.ul initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}>
              {NAV_LINKS.map((l, i) => (
                <motion.li key={l.id} variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
                  <a href={`#${l.id}`} onClick={() => setOpen(false)} className={active === l.id ? 'active' : ''}>
                    <span className="mono idx">0{i}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mobile-menu-foot">
              <a className="btn btn-primary" href={profile.resume} target="_blank" rel="noopener noreferrer">
                <LuFileText /> View Resume
              </a>
              <button className="btn btn-ghost" onClick={toggle}>
                <ThemeIcon /> {theme === 'dark' ? 'Light' : 'Dark'} theme
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
