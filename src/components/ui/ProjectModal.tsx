import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { LuExternalLink, LuX, LuCheck } from 'react-icons/lu'
import { SiGithub } from 'react-icons/si'
import { statusLabel, type Project } from '../../data/projects'
import { TechChip } from './TechChip'

export function ProjectModal({ project: p, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null
    document.body.classList.add('no-scroll')
    dialogRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      // Keep keyboard focus inside the dialog.
      if (e.key === 'Tab' && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('no-scroll')
      prevFocus?.focus({ preventScroll: true })
    }
  }, [onClose])

  return (
    <motion.div className="pmodal-backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        ref={dialogRef}
        className="pmodal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pmodal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <button className="icon-btn pmodal-close" onClick={onClose} aria-label="Close details">
          <LuX />
        </button>
        <div className="pmodal-media">
          <img src={p.image} alt={p.imageAlt} width={1600} height={1000} />
        </div>
        <div className="pmodal-body">
          <div className="pcard-meta mono">
            <span className={`pstatus inline s-${p.status}`}>
              <i aria-hidden="true" />
              {statusLabel[p.status]}
            </span>
            <span>{p.year}</span>
          </div>
          <h3 id="pmodal-title" className="pmodal-title">
            {p.title}
          </h3>
          <p className="pmodal-tagline">{p.tagline}</p>
          <p className="pmodal-desc">{p.description}</p>

          <h4 className="pmodal-h mono">// highlights</h4>
          <ul className="pmodal-list">
            {p.highlights.map((h) => (
              <li key={h}>
                <LuCheck aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>

          <h4 className="pmodal-h mono">// tech stack</h4>
          <div className="pcard-stack">
            {p.stack.map((s) => (
              <TechChip key={s} name={s} />
            ))}
          </div>

          <div className="pmodal-actions">
            {p.links?.live && (
              <a className="btn btn-primary" href={p.links.live} target="_blank" rel="noopener noreferrer">
                <LuExternalLink /> Live demo
              </a>
            )}
            {p.links?.github && (
              <a className="btn btn-ghost" href={p.links.github} target="_blank" rel="noopener noreferrer">
                <SiGithub /> View code
              </a>
            )}
            {!p.links?.live && !p.links?.github && (
              <span className="pcard-soon mono">{p.status === 'academic' ? 'Academic project · no public repo' : 'Code and live demo coming soon'}</span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
