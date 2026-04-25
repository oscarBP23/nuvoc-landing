'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  decay: number
}

export default function ParticleScatter() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none), (max-width: 768px)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0
    let H = 0
    let dpr = 1

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      dpr = window.devicePixelRatio || 1
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const particles: Particle[] = []
    let mouseX = -9999
    let mouseY = -9999
    let prevX = -9999
    let prevY = -9999
    let lastClientX = -9999
    let lastClientY = -9999
    let isDarkBg = true

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      lastClientX = e.clientX
      lastClientY = e.clientY
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const detectDark = (): boolean => {
      if (lastClientX < 0) return true
      const el = document.elementFromPoint(lastClientX, lastClientY)
      let cur: Element | null = el
      while (cur) {
        const bg = getComputedStyle(cur).backgroundColor
        const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
        if (m) {
          const r = +m[1]
          const g = +m[2]
          const b = +m[3]
          const a = m[4] !== undefined ? parseFloat(m[4]) : 1
          if (a > 0.05) {
            const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
            return lum < 128
          }
        }
        cur = cur.parentElement
      }
      return true
    }

    let rafId = 0
    const tick = () => {
      isDarkBg = detectDark()

      ctx.clearRect(0, 0, W, H)

      const dx = mouseX - prevX
      const dy = mouseY - prevY
      const speed = Math.hypot(dx, dy)

      if (speed > 0.3 && mouseX > -9000) {
        const count = Math.min(5, Math.max(1, Math.round(speed / 6)))
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2
          const drift = 0.2 + Math.random() * 0.8
          particles.push({
            x: mouseX + (Math.random() - 0.5) * 6,
            y: mouseY + (Math.random() - 0.5) * 6,
            vx: Math.cos(angle) * drift,
            vy: Math.sin(angle) * drift,
            size: 0.6 + Math.random() * 1.2,
            life: 1,
            decay: 0.005 + Math.random() * 0.008,
          })
        }
      }

      prevX = mouseX
      prevY = mouseY

      if (mouseX > -9000) {
        const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 50)
        if (isDarkBg) {
          grad.addColorStop(0, 'rgba(232,150,10,0.07)')
          grad.addColorStop(1, 'rgba(232,150,10,0)')
        } else {
          grad.addColorStop(0, 'rgba(180,110,5,0.05)')
          grad.addColorStop(1, 'rgba(180,110,5,0)')
        }
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(mouseX, mouseY, 50, 0, Math.PI * 2)
        ctx.fill()
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.99
        p.vy *= 0.99
        p.life -= p.decay

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        const alpha = isDarkBg ? p.life * 0.5 : p.life * 0.45
        ctx.fillStyle = isDarkBg
          ? `rgba(232,150,10,${alpha})`
          : `rgba(160,95,5,${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  )
}
