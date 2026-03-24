'use client'

import { useEffect, useRef } from 'react'

const COUNT    = 90
const MAX_DIST = 150
const CURSOR_R = 180

interface P {
  x: number; y: number
  vx: number; vy: number
  bvx: number; bvy: number
  r: number; o: number; ph: number
}

export default function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse     = useRef({ x: -9999, y: -9999 })
  const rafRef    = useRef(0)

  useEffect(() => {
    if (!canvasRef.current) return
    // Capture as non-nullable so nested functions retain the narrowed type
    const canvas: HTMLCanvasElement = canvasRef.current
    const ctx = canvas.getContext('2d')!

    let W = 0
    let H = 0
    let pts: P[] = []

    function resize() {
      W = window.innerWidth
      H = window.innerHeight
      const dpr = window.devicePixelRatio || 1
      canvas.width  = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      canvas.style.width  = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function init() {
      resize()
      pts = Array.from({ length: COUNT }, () => ({
        x:   Math.random() * W,
        y:   Math.random() * H,
        vx:  (Math.random() - 0.5) * 0.4,
        vy:  (Math.random() - 0.5) * 0.4,
        bvx: (Math.random() - 0.5) * 0.4,
        bvy: (Math.random() - 0.5) * 0.4,
        r:   Math.random() * 1.4 + 0.6,
        o:   Math.random() * 0.12 + 0.03,
        ph:  Math.random() * Math.PI * 2,
      }))
    }

    let lt = 0
    function tick(t: number) {
      const dt = Math.min((t - lt) / 16, 2.5)
      lt = t

      ctx.clearRect(0, 0, W, H)

      const mx = mouse.current.x
      const my = mouse.current.y

      for (const p of pts) {
        p.ph += 0.003 * dt

        const dx = mx - p.x
        const dy = my - p.y
        const d2 = dx * dx + dy * dy

        if (d2 < CURSOR_R * CURSOR_R && d2 > 0) {
          const d = Math.sqrt(d2)
          const f = (1 - d / CURSOR_R) * 0.05
          p.vx += (dx / d) * f * dt
          p.vy += (dy / d) * f * dt
        }

        const wave = Math.sin(p.ph) * 0.12
        p.vx += (p.bvx - p.vx) * 0.03 * dt
        p.vy += (p.bvy + wave - p.vy) * 0.03 * dt
        p.vx *= 0.97
        p.vy *= 0.97
        p.x  += p.vx * dt
        p.y  += p.vy * dt

        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(232,150,10,${p.o})`
        ctx.fill()
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < MAX_DIST * MAX_DIST) {
            const alpha = (1 - Math.sqrt(d2) / MAX_DIST) * 0.035
            ctx.strokeStyle = `rgba(232,150,10,${alpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    init()
    rafRef.current = requestAnimationFrame(tick)

    const onMove  = (e: MouseEvent)  => { mouse.current = { x: e.clientX, y: e.clientY } }
    const onTouch = (e: TouchEvent)  => {
      mouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden
    />
  )
}
