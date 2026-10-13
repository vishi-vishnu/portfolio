import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import { profile } from '../../data/profile'
import { skills, skillCategories } from '../../data/skills'
import { projects, showStatus, statusLabel } from '../../data/projects'
import { timeline } from '../../data/timeline'
import { setTheme } from '../../hooks/useTheme'
import './Terminal.css'

type Line = { id: number; kind: 'cmd' | 'out'; content: ReactNode }

const PROMPT_USER = `${profile.handle}@cloud`

/** The intro that types itself when the hero loads. */
const SCRIPT: { cmd: string; out: ReactNode[] }[] = [
  {
    cmd: 'whoami',
    out: [
      <>
        <span className="t-green">{profile.name}</span> <span className="t-dim">·</span> {profile.roles[0]}{' '}
        <span className="t-dim">+</span> {profile.roles[1]}
      </>,
    ],
  },
  {
    cmd: 'docker build -t vishnu/portfolio:latest .',
    out: [
      <span className="t-dim">[+] Building 11.8s (14/14) FINISHED</span>,
      <>
        <span className="t-green">✔</span> image vishnu/portfolio:latest <span className="t-dim">(42.1MB)</span>
      </>,
    ],
  },
  {
    cmd: 'kubectl rollout status deploy/portfolio',
    out: [
      <>
        deployment <span className="t-cyan">"portfolio"</span> successfully rolled out <span className="t-green">✔</span>
      </>,
    ],
  },
  {
    cmd: 'cat status.json',
    out: [
      <>
        {'{ '}
        <span className="t-purple">"status"</span>: <span className="t-yellow">"open_to_work"</span>, <span className="t-purple">"roles"</span>: [
        <span className="t-yellow">"DevOps"</span>, <span className="t-yellow">"Full Stack"</span>] {'}'}
      </>,
    ],
  },
]

const SECTIONS = ['home', 'about', 'skills', 'projects', 'contact']

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function runCommand(raw: string): ReactNode[] | 'clear' {
  const input = raw.trim()
  const [cmd, ...args] = input.split(/\s+/)
  const arg = args.join(' ').toLowerCase()

  switch (cmd?.toLowerCase()) {
    case '':
      return []
    case 'help':
      return [
        <span className="t-dim">Available commands:</span>,
        ...[
          ['whoami', 'who I am'],
          ['about', 'short bio'],
          ['skills', 'tech stack by category'],
          ['projects', 'things I have built'],
          ['experience', 'career timeline'],
          ['contact', 'how to reach me'],
          ['resume', 'open my resume (PDF)'],
          ['cd <section>', 'jump to about / skills / projects / contact'],
          ['theme <dark|light>', 'switch theme'],
          ['clear', 'clear the terminal'],
        ].map(([c, d]) => (
          <>
            <span className="t-cyan t-pad">{c}</span>
            <span className="t-dim">{d}</span>
          </>
        )),
      ]
    case 'whoami':
      return [
        <>
          <span className="t-green">{profile.name}</span> · {profile.roles.join(' · ')}
        </>,
      ]
    case 'about':
      return [profile.intro]
    case 'skills':
      return skillCategories.map((c) => (
        <>
          <span className="t-purple t-pad">{c.label}</span>
          {skills
            .filter((s) => s.category === c.id)
            .map((s) => s.name)
            .join(', ')}
        </>
      ))
    case 'projects':
    case 'ls':
      return [
        ...projects.map((p) => (
          <>
            <span className="t-cyan t-pad">{p.id}/</span>
            {showStatus(p.status) && <span className="t-green">[{statusLabel[p.status]}] </span>}
            {p.title}
          </>
        )),
        <span className="t-dim">Tip: cd projects to see them in detail.</span>,
      ]
    case 'experience':
      return timeline.map((t) => (
        <>
          <span className="t-yellow t-pad">{t.period}</span>
          {t.title} <span className="t-dim">@ {t.org}</span>
        </>
      ))
    case 'contact':
      return [
        <>
          <span className="t-pad t-purple">email</span>
          <a className="t-link" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </>,
        <>
          <span className="t-pad t-purple">linkedin</span>
          <a className="t-link" href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">
            {profile.socials.linkedin.replace('https://www.', '')}
          </a>
        </>,
        <>
          <span className="t-pad t-purple">github</span>
          <a className="t-link" href={profile.socials.github} target="_blank" rel="noopener noreferrer">
            {profile.socials.github.replace('https://', '')}
          </a>
        </>,
      ]
    case 'resume':
      window.open(profile.resume, '_blank', 'noopener')
      return [<span className="t-green">Opening resume in a new tab...</span>]
    case 'github':
    case 'linkedin':
      window.open(profile.socials[cmd.toLowerCase() as 'github' | 'linkedin'], '_blank', 'noopener')
      return [<span className="t-green">Opening {cmd}...</span>]
    case 'cd':
    case 'open': {
      const target = arg.replace(/[~/.#]/g, '') || 'home'
      if (!SECTIONS.includes(target)) return [<span className="t-red">cd: no such section: {arg}</span>]
      scrollToSection(target)
      return [<span className="t-green">→ /{target}</span>]
    }
    case 'theme':
      if (arg !== 'dark' && arg !== 'light') return [<span className="t-dim">usage: theme dark | theme light</span>]
      setTheme(arg)
      return [<span className="t-green">Theme set to {arg}.</span>]
    case 'sudo':
      if (arg.includes('hire')) {
        setTimeout(() => scrollToSection('contact'), 600)
        return [<span className="t-green">[sudo] access granted. Redirecting to contact...</span>]
      }
      return [<span className="t-red">{PROMPT_USER} is not in the sudoers file. Nice try.</span>]
    case 'date':
      return [new Date().toString()]
    case 'echo':
      return [args.join(' ')]
    case 'pwd':
      return ['/home/vishnu/portfolio']
    case 'clear':
      return 'clear'
    default:
      return [
        <>
          <span className="t-red">command not found: {cmd}</span> <span className="t-dim">· type</span> <span className="t-cyan">help</span>
        </>,
      ]
  }
}

export function Terminal({ start = true }: { start?: boolean }) {
  const reduce = useReducedMotion()
  const [lines, setLines] = useState<Line[]>([])
  const [typing, setTyping] = useState('')
  const [interactive, setInteractive] = useState(false)
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [hIndex, setHIndex] = useState(-1)
  const idRef = useRef(0)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const push = useCallback((kind: Line['kind'], content: ReactNode) => {
    idRef.current += 1
    const id = idRef.current
    setLines((l) => [...l, { id, kind, content }])
  }, [])

  // Play the intro script once.
  useEffect(() => {
    if (!start) return
    let cancelled = false
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

    async function play() {
      await sleep(reduce ? 0 : 500)
      for (const step of SCRIPT) {
        if (cancelled) return
        if (!reduce) {
          for (let i = 1; i <= step.cmd.length; i++) {
            if (cancelled) return
            setTyping(step.cmd.slice(0, i))
            await sleep(28 + Math.random() * 30)
          }
          await sleep(220)
        }
        setTyping('')
        push('cmd', step.cmd)
        for (const o of step.out) {
          if (!reduce) await sleep(160)
          push('out', o)
        }
        await sleep(reduce ? 0 : 450)
      }
      if (cancelled) return
      push(
        'out',
        <span className="t-dim">
          Type <span className="t-cyan">help</span> to explore, or click a command below.
        </span>,
      )
      setInteractive(true)
    }
    play()
    return () => {
      cancelled = true
    }
  }, [start, reduce, push])

  // Keep the newest line visible (scrolls the terminal only, never the page).
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines, typing])

  const execute = (raw: string) => {
    push('cmd', raw)
    const out = runCommand(raw)
    if (out === 'clear') {
      setLines([])
      return
    }
    out.forEach((o) => push('out', o))
    if (raw.trim()) setHistory((h) => [raw, ...h].slice(0, 30))
    setHIndex(-1)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      execute(value)
      setValue('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const i = Math.min(hIndex + 1, history.length - 1)
      if (history[i] !== undefined) {
        setHIndex(i)
        setValue(history[i])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const i = hIndex - 1
      setHIndex(Math.max(i, -1))
      setValue(i >= 0 ? history[i] : '')
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  return (
    <div className="term" onClick={() => interactive && inputRef.current?.focus({ preventScroll: true })}>
      <div className="term-bar">
        <span className="term-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="term-title mono">{PROMPT_USER}: ~/portfolio</span>
        <span className="term-badge mono">zsh</span>
      </div>
      <div className="term-body mono" ref={bodyRef} aria-live="polite">
        {lines.map((l) =>
          l.kind === 'cmd' ? (
            <div key={l.id} className="t-line">
              <Prompt /> {l.content}
            </div>
          ) : (
            <div key={l.id} className="t-line t-out">
              {l.content}
            </div>
          ),
        )}
        {!interactive && (
          <div className="t-line">
            <Prompt /> {typing}
            <span className="t-caret" aria-hidden="true" />
          </div>
        )}
        {interactive && (
          <label className="t-line t-input-row">
            <Prompt />
            <span className="sr-only">Terminal command</span>
            <input
              ref={inputRef}
              className="t-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              placeholder="help"
              enterKeyHint="send"
            />
          </label>
        )}
      </div>
      {interactive && (
        <div className="term-quick" aria-label="Quick commands">
          {['help', 'skills', 'projects', 'experience', 'contact'].map((c) => (
            <button key={c} type="button" className="mono" onClick={(e) => (e.stopPropagation(), execute(c))}>
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Prompt() {
  return (
    <span className="t-prompt" aria-hidden="true">
      <span className="t-green">{PROMPT_USER}</span>
      <span className="t-dim">:</span>
      <span className="t-cyan">~</span>
      <span className="t-dim">$</span>
    </span>
  )
}
