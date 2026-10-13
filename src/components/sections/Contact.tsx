import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { LuCheck, LuCopy, LuFileText, LuLoaderCircle, LuMail, LuMapPin, LuSend, LuPhone } from 'react-icons/lu'
import { SiGithub } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa6'
import { profile } from '../../data/profile'
import { fadeUp, inView, stagger } from '../../lib/motion'
import { SectionHeading } from '../ui/SectionHeading'
import './Contact.css'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState<Status>('idle')

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>

    // No form service configured: open the visitor's mail app with the message filled in.
    if (!ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${data.name}`)
      const body = encodeURIComponent(`${data.message}\n\n${data.name}\n${data.email}`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const channels = [
    { icon: FaLinkedinIn, label: 'LinkedIn', value: 'in/vishnu081', href: profile.socials.linkedin },
    { icon: SiGithub, label: 'GitHub', value: 'vishi-vishnu', href: profile.socials.github },
    ...(profile.phone ? [{ icon: LuPhone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` }] : []),
    { icon: LuMapPin, label: 'Location', value: profile.location, href: '' },
  ]

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <SectionHeading
          index="04"
          label="contact"
          center
          title={
            <>
              Let&apos;s build something <span className="gradient-text">reliable</span>
            </>
          }
          subtitle="Hiring for a DevOps, Cloud or Full Stack role? Drop a message or reach me on any channel below."
        />

        <div className="contact-grid">
          <motion.div className="contact-side" variants={stagger(0.08)} {...inView}>
            <motion.div className="email-card card" variants={fadeUp}>
              <span className="email-icon">
                <LuMail />
              </span>
              <div className="email-text">
                <span className="label mono">email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
              <button className="icon-btn" onClick={copyEmail} aria-label={copied ? 'Email copied' : 'Copy email address'}>
                {copied ? <LuCheck /> : <LuCopy />}
              </button>
            </motion.div>

            {channels.map((c) => {
              const Icon = c.icon
              const inner = (
                <>
                  <span className="ch-icon">
                    <Icon />
                  </span>
                  <span className="ch-text">
                    <span className="label mono">{c.label}</span>
                    <span>{c.value}</span>
                  </span>
                </>
              )
              return (
                <motion.div key={c.label} variants={fadeUp}>
                  {c.href ? (
                    <a className="channel card" href={c.href} target="_blank" rel="noopener noreferrer">
                      {inner}
                    </a>
                  ) : (
                    <div className="channel card static">{inner}</div>
                  )}
                </motion.div>
              )
            })}

            <motion.a variants={fadeUp} className="btn btn-ghost contact-resume" href={profile.resume} target="_blank" rel="noopener noreferrer">
              <LuFileText /> Download resume (PDF)
            </motion.a>
          </motion.div>

          <motion.form className="contact-form card" onSubmit={onSubmit} variants={fadeUp} {...inView}>
            <div className="form-bar mono">
              <span className="term-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              POST /api/contact
            </div>
            <div className="form-body">
              <div className="field-row">
                <label className="field">
                  <span>Name</span>
                  <input name="name" required autoComplete="name" placeholder="Your name" />
                </label>
                <label className="field">
                  <span>Email</span>
                  <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
                </label>
              </div>
              <label className="field">
                <span>Message</span>
                <textarea name="message" required rows={6} placeholder="Tell me about the role or project..." />
              </label>
              <button className="btn btn-primary submit" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? <LuLoaderCircle className="spin" /> : <LuSend />}
                {status === 'sending' ? 'Sending...' : 'Send message'}
              </button>
              <p className={`form-status mono ${status}`} role="status" aria-live="polite">
                {status === 'sent' && (ENDPOINT ? '200 OK · Message delivered. I will get back to you soon.' : 'Opening your mail app with the message ready to send.')}
                {status === 'error' && `500 · Could not send. Please email ${profile.email} directly.`}
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
