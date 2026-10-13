import { useEffect, useState } from 'react'

/** Types and deletes each word in turn, looping forever. */
export function useTypewriter(words: readonly string[], { enabled = true, typeMs = 70, deleteMs = 40, holdMs = 1800 } = {}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(enabled ? '' : words[0])
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const word = words[index % words.length]
    let delay = deleting ? deleteMs : typeMs
    if (!deleting && text === word) delay = holdMs
    if (deleting && text === '') delay = 300

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => i + 1)
      } else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, index, words, enabled, typeMs, deleteMs, holdMs])

  return enabled ? text : words[0]
}
