import { useCallback, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LuArrowUpRight } from 'react-icons/lu'
import { SiGithub } from 'react-icons/si'
import { projectCategories, projects, type Project, type ProjectCategoryId } from '../../data/projects'
import { profile } from '../../data/profile'
import { fadeUp, inView } from '../../lib/motion'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from '../ui/ProjectCard'
import { ProjectModal } from '../ui/ProjectModal'
import './Projects.css'

type Filter = 'all' | ProjectCategoryId

export function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState<Project | null>(null)
  const close = useCallback(() => setOpen(null), [])

  const tabs = useMemo(
    () =>
      projectCategories
        .map((c) => ({ ...c, count: c.id === 'all' ? projects.length : projects.filter((p) => p.categories.includes(c.id as ProjectCategoryId)).length }))
        .filter((c) => c.count > 0),
    [],
  )

  const shown = filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter))

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <SectionHeading
          index="03"
          label="projects"
          title={
            <>
              Things I&apos;ve <span className="gradient-text">built &amp; shipped</span>
            </>
          }
          subtitle="From containerised pipelines to full stack apps and responsive sites. Open any card for the details, live demo and code."
        />

        <div className="tabs" role="tablist" aria-label="Project categories">
          {tabs.map((t) => (
            <button key={t.id} role="tab" aria-selected={filter === t.id} className="tab" onClick={() => setFilter(t.id as Filter)}>
              {filter === t.id && <motion.span layoutId="project-tab" className="tab-bg" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              {t.label}
              <span className="count">{t.count}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="project-grid" role="tabpanel">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} featured={!!p.featured && filter === 'all'} onOpen={() => setOpen(p)} />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.a
          className="more-card card"
          href={profile.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeUp}
          {...inView}
        >
          <span className="more-icon">
            <SiGithub />
          </span>
          <span className="more-text">
            <strong>More on GitHub</strong>
            <span className="mono">github.com/vishi-vishnu</span>
          </span>
          <LuArrowUpRight className="more-arrow" />
        </motion.a>
      </div>

      {createPortal(<AnimatePresence>{open && <ProjectModal project={open} onClose={close} />}</AnimatePresence>, document.body)}
    </section>
  )
}
