import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Counts from 0 to `to` once `start` is true. */
export function CountUp({ to, start = true, duration = 1200 }: { to: number; start?: boolean; duration?: number }) {
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? to : 0)

  useEffect(() => {
    if (!start || reduce) return
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, start, reduce, duration])

  return <>{n}</>
}
