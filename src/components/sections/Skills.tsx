import { useMemo, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { skillCategories, skills, levelLabel, type SkillCategoryId } from '../../data/skills'
import { getTech } from '../../data/techIcons'
import { spotlightHandler } from '../../hooks/useSpotlight'
import { SectionHeading } from '../ui/SectionHeading'
import { TechIcon } from '../ui/TechChip'
import './Skills.css'

type Filter = 'all' | SkillCategoryId

export function Skills() {
  const [filter, setFilter] = useState<Filter>('all')
  const tabs = useMemo(
    () => [{ id: 'all' as Filter, label: 'All', count: skills.length }, ...skillCategories.map((c) => ({ id: c.id as Filter, label: c.label, count: skills.filter((s) => s.category === c.id).length }))],
    [],
  )
  const shown = filter === 'all' ? skills : skills.filter((s) => s.category === filter)

  // Marquee: every unique skill, split into two rows that scroll in opposite directions.
  const half = Math.ceil(skills.length / 2)
  const rows = [skills.slice(0, half), skills.slice(half)]

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <SectionHeading
          index="02"
          label="skills"
          title={
            <>
              My <span className="gradient-text">toolbox</span>
            </>
          }
          subtitle="DevOps and cloud first, with a full stack foundation. Filter by area to see where each skill sits."
        />

        <div className="tabs" role="tablist" aria-label="Skill categories">
          {tabs.map((t) => (
            <button key={t.id} role="tab" aria-selected={filter === t.id} className="tab" onClick={() => setFilter(t.id)}>
              {filter === t.id && <motion.span layoutId="skill-tab" className="tab-bg" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              {t.label}
              <span className="count">{t.count}</span>
            </button>
          ))}
        </div>

        <motion.ul layout className="skill-grid" role="tabpanel">
          <AnimatePresence mode="popLayout">
            {shown.map((s, i) => {
              const { color } = getTech(s.name)
              return (
                <motion.li
                  layout
                  key={s.name}
                  className="skill card spotlight"
                  style={{ '--brand': color === 'currentColor' ? 'var(--text)' : color } as CSSProperties}
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.025, 0.4), ease: [0.22, 1, 0.36, 1] }}
                  onMouseMove={spotlightHandler}
                >
                  <div className="skill-top">
                    <span className="skill-logo">
                      <TechIcon name={s.name} />
                    </span>
                    <div className="skill-text">
                      <h3>{s.name}</h3>
                      {s.note && <p>{s.note}</p>}
                    </div>
                    {s.learning && <span className="skill-learning mono">learning</span>}
                  </div>
                  <div className="skill-meter">
                    <div className="skill-meter-row">
                      <span>{levelLabel(s.level)}</span>
                      <span className="mono">{s.level}%</span>
                    </div>
                    <div
                      className="skill-bar"
                      role="meter"
                      aria-label={`${s.name} proficiency`}
                      aria-valuenow={s.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <motion.span
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: s.level / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.15 + Math.min(i * 0.03, 0.5), ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </motion.ul>
      </div>

      <div className="marquee" aria-hidden="true">
        {rows.map((row, r) => (
          <div key={r} className={`marquee-row ${r ? 'reverse' : ''}`}>
            {[0, 1].map((dup) => (
              <div key={dup} className="marquee-track">
                {row.map((s) => (
                  <span key={s.name + dup} className="marquee-item">
                    <TechIcon name={s.name} /> {s.name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
