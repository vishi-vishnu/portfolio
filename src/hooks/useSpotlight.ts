import type { MouseEvent } from 'react'

/** Mouse-follow glow for cards with the .spotlight class. */
export function spotlightHandler(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}
