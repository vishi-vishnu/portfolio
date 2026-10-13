import { motion, useReducedMotion } from 'framer-motion'
import { LuArrowRight, LuFileText, LuMail, LuMapPin, LuChevronDown } from 'react-icons/lu'
import { SiGithub } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa6'
import { profile } from '../../data/profile'
import { projects } from '../../data/projects'
import { skills } from '../../data/skills'
import { useTypewriter } from '../../hooks/useTypewriter'
import { EASE } from '../../lib/motion'
import { NetworkCanvas } from '../ui/NetworkCanvas'
import { Terminal } from '../ui/Terminal'
import { Pipeline } from '../ui/Pipeline'
import { TechIcon } from '../ui/TechChip'
import { CountUp } from '../ui/CountUp'
import './Hero.css'

const STATS = [
  { value: 1, suffix: '+', label: 'Year in industry' },
  { value: projects.length, suffix: '', label: 'Projects' },
  { value: skills.length, suffix: '+', label: 'Technologies' },
  { value: profile.certifications.length, suffix: '', label: 'Certifications' },
]

const FLOATERS = [
  { name: 'Docker', cls: 'f1' },
  { name: 'AWS', cls: 'f2' },
  { name: 'Kubernetes', cls: 'f3' },
  { name: 'GitHub Actions', cls: 'f4' },
  { name: 'React', cls: 'f5' },
]

export function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion()
  const role = useTypewriter(profile.roles, { enabled: ready && !reduce })

  const item = {
    hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
  }
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }
  const animate = ready ? 'show' : 'hidden'

  return (
    <section id="home" className="hero">
      <div className="hero-bg" aria-hidden="true">
        <NetworkCanvas className="hero-canvas" />
        <div className="hero-glow g1" />
        <div className="hero-glow g2" />
      </div>

      <div className="container hero-grid">
        <motion.div className="hero-copy" variants={container} initial="hidden" animate={animate}>
          <motion.div variants={item} className="hero-status">
            <span className="pulse" aria-hidden="true" />
            {profile.availability}
          </motion.div>

          <motion.p variants={item} className="hero-hello mono">
            <span className="accent">$</span> whoami
          </motion.p>

          <motion.h1 variants={item} className="hero-name">
            <span className="hero-hi">Hi, I&apos;m</span>
            <span className="gradient-text hero-fullname">{profile.name}</span>
          </motion.h1>

          <motion.p variants={item} className="hero-role mono" aria-label={profile.roles.join(', ')}>
            <span className="accent" aria-hidden="true">
              &gt;
            </span>{' '}
            <span aria-hidden="true">{role}</span>
            <span className="hero-caret" aria-hidden="true" />
          </motion.p>

          <motion.p variants={item} className="hero-intro">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="hero-ctas">
            <a href="#projects" className="btn btn-primary">
              View Projects <LuArrowRight className="arrow" />
            </a>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <LuFileText /> View Resume
            </a>
          </motion.div>

          <motion.div variants={item} className="hero-meta">
            <div className="hero-socials">
              <a className="icon-btn" href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <SiGithub />
              </a>
              <a className="icon-btn" href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a className="icon-btn" href={`mailto:${profile.email}`} aria-label="Email">
                <LuMail />
              </a>
            </div>
            <span className="hero-loc">
              <LuMapPin /> {profile.location}
            </span>
          </motion.div>

          <motion.dl variants={item} className="hero-stats">
            {STATS.map((s) => (
              <div key={s.label} className="hero-stat">
                <dt>{s.label}</dt>
                <dd className="mono">
                  <CountUp to={s.value} start={ready} />
                  {s.suffix}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          animate={ready ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.25 }}
        >
          {FLOATERS.map((f, i) => (
            <motion.span
              key={f.name}
              className={`floater ${f.cls}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={ready ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7 + i * 0.1, duration: 0.5, ease: EASE }}
              title={f.name}
            >
              <TechIcon name={f.name} />
            </motion.span>
          ))}
          <Terminal start={ready} />
        </motion.div>
      </div>

      <motion.div
        className="container hero-pipe"
        initial={{ opacity: 0, y: 30 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
      >
        <Pipeline start={ready} />
      </motion.div>

      <a href="#about" className="hero-scroll" aria-label="Scroll to About">
        <span className="mono">scroll</span>
        <LuChevronDown />
      </a>
    </section>
  )
}
