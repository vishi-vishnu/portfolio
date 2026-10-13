import { useEffect, useRef } from 'react'

/**
 * Lightweight animated "cluster" background: nodes drift and link up when close,
 * with small packets travelling along some links. Pauses when off-screen or the tab is hidden.
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
    let dpr = 1
    let raf = 0
    let visible = true
    let frame = 0
    let color = '34, 211, 238'
    let color2 = '52, 211, 153'

    type Node = { x: number; y: number; vx: number; vy: number; r: number }
    let nodes: Node[] = []
    const packets: { a: number; b: number; t: number; speed: number }[] = []

    const readColors = () => {
      const light = document.documentElement.getAttribute('data-theme') === 'light'
      color = light ? '14, 116, 144' : '34, 211, 238'
      color2 = light ? '4, 120, 87' : '52, 211, 153'
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(70, Math.max(26, (w * h) / 22000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.8,
      }))
    }

    const LINK = 140

    const draw = () => {
      frame++
      if (frame % 90 === 0) readColors()
      ctx.clearRect(0, 0, w, h)

      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx
          n.y += n.vy
        }
        if (n.x < -20) n.x = w + 20
        if (n.x > w + 20) n.x = -20
        if (n.y < -20) n.y = h + 20
        if (n.y > h + 20) n.y = -20
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${color}, ${(1 - d / LINK) * 0.22})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
            if (!reduce && packets.length < 8 && Math.random() < 0.0008) packets.push({ a: i, b: j, t: 0, speed: 0.008 + Math.random() * 0.01 })
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = `rgba(${color}, 0.55)`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }

      for (let k = packets.length - 1; k >= 0; k--) {
        const p = packets[k]
        p.t += p.speed
        const a = nodes[p.a]
        const b = nodes[p.b]
        if (p.t >= 1 || !a || !b || Math.hypot(a.x - b.x, a.y - b.y) > LINK) {
          packets.splice(k, 1)
          continue
        }
        const x = a.x + (b.x - a.x) * p.t
        const y = a.y + (b.y - a.y) * p.t
        ctx.fillStyle = `rgba(${color2}, 0.95)`
        ctx.shadowColor = `rgba(${color2}, 0.9)`
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(x, y, 2.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      if (!reduce && visible) raf = requestAnimationFrame(draw)
    }

    const startLoop = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(draw)
    }

    readColors()
    resize()
    startLoop()

    const ro = new ResizeObserver(() => {
      resize()
      if (reduce) startLoop()
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting && !document.hidden
      if (visible) startLoop()
    })
    io.observe(canvas)

    const onVis = () => {
      visible = !document.hidden
      if (visible) startLoop()
    }
    document.addEventListener('visibilitychange', onVis)

    const mo = new MutationObserver(() => {
      readColors()
      if (reduce) startLoop()
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
