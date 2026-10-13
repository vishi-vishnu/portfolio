import { motion } from 'framer-motion'
import { LuTarget, LuAward, LuBriefcase, LuCloudCog, LuGraduationCap, LuMonitorSmartphone, LuServerCog, LuRocket } from 'react-icons/lu'
import type { IconType } from 'react-icons'
import { profile } from '../../data/profile'
import { timeline, type TimelineKind } from '../../data/timeline'
import { fadeUp, inView, stagger } from '../../lib/motion'
import { spotlightHandler } from '../../hooks/useSpotlight'
import { SectionHeading } from '../ui/SectionHeading'
import { TechChip } from '../ui/TechChip'
import './About.css'

const FOCUS_ICONS: Record<string, IconType> = { cloud: LuCloudCog, web: LuMonitorSmartphone, fullstack: LuServerCog }
const KIND_ICON: Record<TimelineKind, IconType> = { work: LuBriefcase, internship: LuRocket, education: LuGraduationCap }
const KIND_LABEL: Record<TimelineKind, string> = { work: 'Full-time', internship: 'Internship', education: 'Education' }

/** Short fake commit hash so each timeline entry reads like a git log line. */
function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7)
}

export function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <SectionHeading
          index="01"
          label="about"
          title={
            <>
              I build apps, then make them <span className="gradient-text">ship themselves.</span>
            </>
          }
        />

        <div className="about-grid">
          <motion.div className="about-copy" variants={stagger(0.12)} {...inView}>
            {profile.about.map((p, i) => (
              <motion.p key={i} variants={fadeUp}>
                {p}
              </motion.p>
            ))}
            <motion.aside className="about-goal" variants={fadeUp} aria-label="My goal">
              <span className="about-goal-icon" aria-hidden="true">
                <LuTarget />
              </span>
              <div>
                <span className="about-goal-label mono">my goal</span>
                <p>{profile.goal}</p>
              </div>
            </motion.aside>
            <motion.ul className="about-quick" variants={fadeUp}>
              <li>
                <span className="mono k">current</span> Full Stack Engineer @ Inthera
              </li>
              <li>
                <span className="mono k">focus</span> DevOps · Cloud · CI/CD
              </li>
              <li>
                <span className="mono k">learning</span> AWS · Kubernetes · Terraform
              </li>
            </motion.ul>
          </motion.div>

          <motion.figure className="yaml" variants={fadeUp} {...inView} aria-label="Profile summary written as a YAML manifest">
            <div className="yaml-bar mono">
              <span className="term-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              profile.yaml
            </div>
            <pre className="yaml-body mono">
              <code>
                <span className="c"># kubectl apply -f profile.yaml</span>
                {'\n'}
                <span className="k">apiVersion</span>: <span className="s">v1</span>
                {'\n'}
                <span className="k">kind</span>: <span className="s">Engineer</span>
                {'\n'}
                <span className="k">metadata</span>:{'\n'}
                {'  '}
                <span className="k">name</span>: <span className="s">vishnu-kumar-gk</span>
                {'\n'}
                {'  '}
                <span className="k">location</span>: <span className="s">{profile.location}</span>
                {'\n'}
                <span className="k">spec</span>:{'\n'}
                {'  '}
                <span className="k">roles</span>:{'\n'}
                {profile.roles.slice(0, 2).map((r) => (
                  <span key={r}>
                    {'    '}- <span className="s">{r}</span>
                    {'\n'}
                  </span>
                ))}
                {'  '}
                <span className="k">focus</span>: [<span className="s">cloud</span>, <span className="s">ci-cd</span>, <span className="s">web</span>]{'\n'}
                {'  '}
                <span className="k">company</span>: <span className="s">Inthera Consulting Group</span>
                {'\n'}
                {'  '}
                <span className="k">education</span>: <span className="s">B.E. ECE</span>
                {'\n'}
                {'  '}
                <span className="k">languages</span>: [{profile.languages.map((l, i) => (
                  <span key={l}>
                    <span className="s">{l}</span>
                    {i < profile.languages.length - 1 ? ', ' : ''}
                  </span>
                ))}]{'\n'}
                {'  '}
                <span className="k">replicas</span>: <span className="n">1</span> <span className="c"># one of a kind</span>
                {'\n'}
                <span className="k">status</span>:{'\n'}
                {'  '}
                <span className="k">phase</span>: <span className="ok">OpenToWork</span>
                <span className="yaml-caret" aria-hidden="true" />
              </code>
            </pre>
          </motion.figure>
        </div>

        <motion.div className="focus-grid" variants={stagger(0.1)} {...inView}>
          {profile.focus.map((f) => {
            const Icon = FOCUS_ICONS[f.key] ?? LuCloudCog
            return (
              <motion.article key={f.key} className={`focus card spotlight focus-${f.key}`} variants={fadeUp} onMouseMove={spotlightHandler}>
                <span className="focus-icon">
                  <Icon />
                </span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </motion.article>
            )
          })}
        </motion.div>

        <div className="tl-wrap">
          <motion.div className="tl-head" variants={fadeUp} {...inView}>
            <h3>Career timeline</h3>
            <p className="mono">
              <span className="accent">$</span> git log --graph career
            </p>
          </motion.div>

          <ol className="tl">
            {timeline.map((t, i) => {
              const Icon = KIND_ICON[t.kind]
              return (
                <motion.li
                  key={t.title + t.period}
                  className={`tl-item kind-${t.kind}${t.current ? ' current' : ''}`}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="tl-node" aria-hidden="true">
                    <Icon />
                  </span>
                  <div className="tl-card card spotlight" onMouseMove={spotlightHandler}>
                    <div className="tl-meta mono">
                      <span className="tl-hash">{hash(t.title + t.org)}</span>
                      {t.current && <span className="tl-head-tag">HEAD → main</span>}
                      <span className="tl-kind">{KIND_LABEL[t.kind]}</span>
                      <span className="tl-period">{t.period}</span>
                    </div>
                    <h4>{t.title}</h4>
                    <p className="tl-org">{t.org}</p>
                    <ul className="tl-points">
                      {t.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                    {t.tags && (
                      <div className="tl-tags">
                        {t.tags.map((tag) => (
                          <TechChip key={tag} name={tag} />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>

        <motion.div className="certs" variants={stagger(0.06)} {...inView}>
          <motion.h3 variants={fadeUp} className="certs-title">
            <LuAward /> Certifications
          </motion.h3>
          <div className="certs-grid">
            {profile.certifications.map((c) => (
              <motion.div key={c.name} className="cert card" variants={fadeUp}>
                <span className="cert-name">{c.name}</span>
                <span className="cert-issuer mono">{c.issuer}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
