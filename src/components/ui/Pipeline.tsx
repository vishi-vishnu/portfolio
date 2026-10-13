import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { LuCheck, LuFlaskConical, LuGitCommitHorizontal, LuLoaderCircle, LuPackage, LuRocket, LuShieldCheck, LuActivity } from 'react-icons/lu'
import { SiDocker } from 'react-icons/si'
import './Pipeline.css'

const STAGES = [
  { label: 'Commit', icon: LuGitCommitHorizontal },
  { label: 'Build', icon: LuPackage },
  { label: 'Test', icon: LuFlaskConical },
  { label: 'Scan', icon: LuShieldCheck },
  { label: 'Dockerize', icon: SiDocker },
  { label: 'Deploy', icon: LuRocket },
  { label: 'Monitor', icon: LuActivity },
]

/** Animated CI/CD run that loops: each stage goes pending -> running -> passed. */
export function Pipeline({ start = true }: { start?: boolean }) {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(reduce ? STAGES.length : 0)
  const [run, setRun] = useState(142)

  useEffect(() => {
    if (!start || reduce) return
    const done = step >= STAGES.length
    const t = setTimeout(
      () => {
        if (done) {
          setStep(0)
          setRun((r) => r + 1)
        } else setStep((s) => s + 1)
      },
      done ? 2600 : 750,
    )
    return () => clearTimeout(t)
  }, [step, start, reduce])

  const done = step >= STAGES.length
  const progress = Math.min(step / (STAGES.length - 1), 1)

  return (
    <div className="pipe card" role="img" aria-label="Animated CI/CD pipeline: commit, build, test, scan, dockerize, deploy, monitor">
      <div className="pipe-head mono">
        <span className={`pipe-status ${done ? 'ok' : 'run'}`}>
          {done ? <LuCheck /> : <LuLoaderCircle className="spin" />}
          {done ? 'passed' : 'running'}
        </span>
        <span className="pipe-name">
          deploy.yml <span className="dim">· run #{run} · main</span>
        </span>
        <span className="pipe-time dim">{done ? '2m 31s' : '...'}</span>
      </div>
      <ol className="pipe-track">
        <span className="pipe-line" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </span>
        {STAGES.map((s, i) => {
          const state = i < step ? 'done' : i === step ? 'active' : 'idle'
          const Icon = s.icon
          return (
            <li key={s.label} className={`pipe-stage ${state}`}>
              <span className="pipe-node">
                <Icon />
                {state === 'done' && (
                  <span className="pipe-tick">
                    <LuCheck />
                  </span>
                )}
              </span>
              <span className="pipe-label mono">{s.label}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
