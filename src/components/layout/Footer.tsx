import { LuArrowUp, LuFileText, LuMail, LuGitCommitHorizontal } from 'react-icons/lu'
import { SiGithub } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa6'
import { profile } from '../../data/profile'
import { NAV_LINKS } from '../../data/navigation'
import { TechIcon } from '../ui/TechChip'
import './Footer.css'

const BUILT_WITH = ['React', 'TypeScript', 'Vite', 'Docker', 'GitHub Actions', 'Vercel']

function buildDate() {
  try {
    return new Date(__BUILD_TIME__).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return ''
  }
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="container">
        <div className="footer-cta">
          <p className="mono footer-cta-cmd">
            <span className="accent">$</span> ./hire.sh --role devops
          </p>
          <h2>
            Have a role in mind? <span className="gradient-text">Let&apos;s talk.</span>
          </h2>
          <div className="footer-cta-btns">
            <a className="btn btn-primary" href={`mailto:${profile.email}`}>
              <LuMail /> {profile.email}
            </a>
            <a className="btn btn-ghost" href={profile.resume} target="_blank" rel="noopener noreferrer">
              <LuFileText /> Resume
            </a>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="nav-logo mono">
              <span className="nav-logo-mark">{profile.initials}</span>
              <span>{profile.handle}</span>
            </a>
            <p>{profile.headline}</p>
            <div className="footer-socials">
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
          </div>

          <nav className="footer-col" aria-label="Footer">
            <h3 className="mono">navigate</h3>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h3 className="mono">built with</h3>
            <ul className="footer-stack">
              {BUILT_WITH.map((t) => (
                <li key={t}>
                  <TechIcon name={t} /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="mono">system status</h3>
            <div className="status-card card">
              <p className="status-line">
                <span className="status-dot" aria-hidden="true" /> All systems operational
              </p>
              <dl className="status-meta mono">
                <div>
                  <dt>build</dt>
                  <dd>
                    <LuGitCommitHorizontal /> {__COMMIT_SHA__}
                  </dd>
                </div>
                <div>
                  <dt>deployed</dt>
                  <dd>{buildDate()}</dd>
                </div>
                <div>
                  <dt>pipeline</dt>
                  <dd className="ok">passing</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {year} {profile.name}. Designed and built by me.
          </p>
          <a href="#home" className="to-top" aria-label="Back to top">
            <span className="mono">back to top</span>
            <LuArrowUp />
          </a>
        </div>
      </div>
    </footer>
  )
}
