import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../../data/projects'
import { skills } from '../../data/skills'
import './BootLoader.css'

const LINES = [
  'Booting portfolio kernel',
  `Loading skills (${skills.length})`,
  `Fetching projects (${projects.length})`,
  'Pulling image vishnu/portfolio:latest',
  'Health check passed',
]

/** Short "system boot" intro. Plays once per browser session. */
export function BootLoader({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (shown < LINES.length) {
      const t = setTimeout(() => setShown((s) => s + 1), 190)
      return () => clearTimeout(t)
    }
    const t = setTimeout(onDone, 380)
    return () => clearTimeout(t)
  }, [shown, onDone])

  const pct = Math.round((shown / LINES.length) * 100)

  return (
    <motion.div
      className="boot"
      role="status"
      aria-live="polite"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div className="boot-inner">
        <div className="boot-logo mono">
          <span className="boot-prompt">~$</span> vishnu<span className="boot-caret">_</span>
        </div>
        <ul className="boot-lines mono">
          {LINES.slice(0, shown).map((l) => (
            <li key={l}>
              <span className="ok">[ OK ]</span> {l}
            </li>
          ))}
        </ul>
        <div className="boot-bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${pct / 100})` }} />
        </div>
        <div className="boot-pct mono">{pct}%</div>
      </div>
    </motion.div>
  )
}
