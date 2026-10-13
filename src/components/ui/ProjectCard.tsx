import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { LuArrowUpRight, LuExternalLink, LuMaximize2, LuStar } from 'react-icons/lu'
import { SiGithub } from 'react-icons/si'
import { projectCategories, statusLabel, type Project } from '../../data/projects'
import { spotlightHandler } from '../../hooks/useSpotlight'
import { TechChip } from './TechChip'

interface Props {
  project: Project
  index: number
  featured: boolean
  onOpen: () => void
}

const MAX_CHIPS = 5
const CAT_LABEL = Object.fromEntries(projectCategories.map((c) => [c.id, c.label])) as Record<string, string>

export const ProjectCard = forwardRef<HTMLElement, Props>(function ProjectCard({ project: p, index, featured, onOpen }, ref) {
  const max = featured ? 8 : MAX_CHIPS
  const extra = p.stack.length - max

  return (
    <motion.article
      ref={ref}
      layout
      className={`pcard card spotlight${featured ? ' featured' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.36), ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={spotlightHandler}
    >
      <button type="button" className="pcard-media" onClick={onOpen} aria-label={`Open details for ${p.title}`}>
        <img src={p.image} alt={p.imageAlt} loading={featured ? 'eager' : 'lazy'} decoding="async" width={1600} height={1000} />
        <span className={`pstatus s-${p.status}`}>
          <i aria-hidden="true" />
          {statusLabel[p.status]}
        </span>
        {featured && (
          <span className="pfeatured">
            <LuStar /> Featured
          </span>
        )}
        <span className="pcard-zoom" aria-hidden="true">
          <LuMaximize2 /> View details
        </span>
      </button>

      <div className="pcard-body">
        <div className="pcard-meta mono">
          <span>{p.year}</span>
          <span className="dot" aria-hidden="true" />
          <span>{p.categories.map((c) => CAT_LABEL[c]).join(' · ')}</span>
        </div>
        <h3 className="pcard-title">
          <button type="button" onClick={onOpen}>
            {p.title}
          </button>
        </h3>
        <p className="pcard-tagline">{p.tagline}</p>
        {featured && <p className="pcard-desc">{p.description}</p>}

        <div className="pcard-stack">
          {p.stack.slice(0, max).map((s) => (
            <TechChip key={s} name={s} />
          ))}
          {extra > 0 && <span className="chip more">+{extra}</span>}
        </div>

        <div className="pcard-actions">
          {p.links?.live && (
            <a className="btn btn-primary btn-sm" href={p.links.live} target="_blank" rel="noopener noreferrer">
              <LuExternalLink /> Live demo
            </a>
          )}
          {p.links?.github ? (
            <a className="btn btn-ghost btn-sm" href={p.links.github} target="_blank" rel="noopener noreferrer">
              <SiGithub /> Code
            </a>
          ) : (
            <span className="pcard-soon mono">{p.status === 'academic' ? 'Academic project' : 'Repo coming soon'}</span>
          )}
          <button type="button" className="pcard-more" onClick={onOpen}>
            Details <LuArrowUpRight />
          </button>
        </div>
      </div>
    </motion.article>
  )
})
