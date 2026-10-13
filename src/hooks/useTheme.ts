import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'

const root = () => document.documentElement

function getTheme(): Theme {
  return root().getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

/** Theme lives on <html data-theme>, so every component (navbar, terminal...) stays in sync. */
function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb)
  obs.observe(root(), { attributes: true, attributeFilter: ['data-theme'] })
  return () => obs.disconnect()
}

export function setTheme(theme: Theme) {
  root().setAttribute('data-theme', theme)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#060a13' : '#f5f8fc')
  try {
    localStorage.setItem('theme', theme)
  } catch {
    /* storage can be blocked; theme still works for this visit */
  }
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'dark' as Theme)
  const toggle = useCallback(() => setTheme(getTheme() === 'dark' ? 'light' : 'dark'), [])
  return { theme, setTheme, toggle }
}
