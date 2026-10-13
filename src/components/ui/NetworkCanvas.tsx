import { useEffect, useRef } from 'react'

/**
 * Calm hero background: small dots drifting very slowly with a soft twinkle.
 * No connecting lines. Pauses when off-screen or when the tab is hidden,
 * and stays still for users who prefer reduced motion.
 */
export function NetworkCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    let palette: string[] = []

    type Dot = { x: number; y: number; vx: number; vy: number; r: number; c: number; phase: number; speed: number }
    let dots: Dot[] = []

    const readColors = () => {
      const light = document.documentElement.getAttribute('data-theme') === 'light'
      palette = light ? ['14, 116, 144', '4, 120, 87', '71, 85, 105'] : ['34, 211, 238', '52, 211, 153', '203, 213, 225']
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(60, Math.max(22, (w * h) / 26000)))
      dots = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.04 + Math.random() * 0.08 // px per frame: very slow
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: Math.random() * 1.3 + 0.6,
          c: Math.random() < 0.5 ? 0 : Math.random() < 0.6 ? 1 : 2,
          phase: Math.random() * Math.PI * 2,
          speed: 0.004 + Math.random() * 0.008,
        }
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const d of dots) {
        if (!reduce) {
          d.x += d.vx
          d.y += d.vy
          d.phase += d.speed
          if (d.x < -10) d.x = w + 10
          if (d.x > w + 10) d.x = -10
          if (d.y < -10) d.y = h + 10
          if (d.y > h + 10) d.y = -10
        }
        const alpha = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(d.phase))
        ctx.fillStyle = `rgba(${palette[d.c]}, ${alpha})`
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw)
    }

    const start = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(draw)
    }

    readColors()
    resize()
    start()

    const ro = new ResizeObserver(() => {
      resize()
      if (reduce) start()
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting && !document.hidden
      if (visible) start()
    })
    io.observe(canvas)

    const onVis = () => {
      visible = !document.hidden
      if (visible) start()
    }
    document.addEventListener('visibilitychange', onVis)

    const mo = new MutationObserver(() => {
      readColors()
      if (reduce) start()
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
