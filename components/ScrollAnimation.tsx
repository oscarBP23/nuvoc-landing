'use client'

import { useEffect, useRef, useState } from 'react'
import type { MotionValue } from 'framer-motion'

/* ──────────────────────────────────────────────────────────────────
   Constants
   ────────────────────────────────────────────────────────────────── */
const TOTAL_FRAMES = 40
const LAST_INDEX   = TOTAL_FRAMES - 1

function frameSrc(n: number) {
  return `/hero-frames/ezgif-frame-${String(n).padStart(3, '0')}.jpg`
}

/* ──────────────────────────────────────────────────────────────────
   Props
   ────────────────────────────────────────────────────────────────── */
interface Props {
  /** Framer Motion MotionValue that goes 0 → 1 over the hero scroll range */
  scrollProgress: MotionValue<number>
}

/* ──────────────────────────────────────────────────────────────────
   Object-fit: cover  draw helper
   Scales the source image to fill the canvas, centred, no distortion.
   ────────────────────────────────────────────────────────────────── */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
) {
  if (!img.complete || img.naturalWidth === 0) return

  const iw = img.naturalWidth
  const ih = img.naturalHeight
  const scale = Math.max(cw / iw, ch / ih)
  const dw    = iw * scale
  const dh    = ih * scale
  const dx    = (cw - dw) / 2
  const dy    = (ch - dh) / 2

  ctx.drawImage(img, dx, dy, dw, dh)
}

/* ──────────────────────────────────────────────────────────────────
   ScrollAnimation
   ────────────────────────────────────────────────────────────────── */
export default function ScrollAnimation({ scrollProgress }: Props) {
  const canvasRef     = useRef<HTMLCanvasElement>(null)
  const framesRef     = useRef<HTMLImageElement[]>([])
  const currentIdxRef = useRef(0)
  const rafRef        = useRef(0)
  const ctxRef        = useRef<CanvasRenderingContext2D | null>(null)
  // Device pixel ratio — captured once and updated on resize
  const dprRef        = useRef(1)

  // How many frames have loaded
  const [loadedCount, setLoadedCount] = useState(0)
  // True once the browser confirms this is a narrow viewport (mobile)
  const [isMobile, setIsMobile]       = useState(false)

  /* ── Detect mobile once (client-only) ── */
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  /* ── Preload all 40 frames ── */
  useEffect(() => {
    // Bail on mobile — we'll show a static <img> instead
    if (isMobile) return

    const imgs: HTMLImageElement[] = []

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.decoding = 'async'
      img.src      = frameSrc(i)
      img.onload   = () => {
        setLoadedCount((c) => c + 1)
        // Eagerly render frame 0 the instant it arrives
        if (i === 1) renderIndex(0)
      }
      imgs.push(img)
    }

    framesRef.current = imgs
  }, [isMobile]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Canvas setup + ResizeObserver ── */
  useEffect(() => {
    if (isMobile) return

    const canvas = canvasRef.current
    if (!canvas) return

    ctxRef.current = canvas.getContext('2d', { alpha: false })!

    const syncSize = () => {
      const dpr = window.devicePixelRatio || 1
      const w   = canvas.clientWidth
      const h   = canvas.clientHeight
      const pw  = Math.round(w * dpr)  // physical pixel dimensions
      const ph  = Math.round(h * dpr)
      if (canvas.width !== pw || canvas.height !== ph) {
        dprRef.current = dpr
        canvas.width   = pw
        canvas.height  = ph
        // Redraw current frame at new resolution
        renderIndex(currentIdxRef.current)
      }
    }

    const ro = new ResizeObserver(syncSize)
    ro.observe(canvas)
    syncSize()

    return () => ro.disconnect()
  }, [isMobile]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Stable render helper (reads only refs, never stale) ── */
  function renderIndex(idx: number) {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const canvas = canvasRef.current
      const ctx    = ctxRef.current
      if (!canvas || !ctx) return
      const img = framesRef.current[idx]
      if (!img) return

      // Scale the context by DPR so all drawImage coordinates remain in
      // CSS pixels — this is what gives Retina-sharp output.
      const dpr = dprRef.current
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Pass CSS pixel dimensions, not physical buffer dimensions
      drawCover(ctx, img, canvas.clientWidth, canvas.clientHeight)
    })
  }

  /* ── Subscribe to scroll progress → update frame ── */
  useEffect(() => {
    if (isMobile) return

    // Draw initial position (handles page-load with scroll already applied)
    const initialIdx = Math.round(
      Math.max(0, Math.min(1, scrollProgress.get())) * LAST_INDEX,
    )
    currentIdxRef.current = initialIdx
    renderIndex(initialIdx)

    const unsub = scrollProgress.on('change', (v) => {
      const idx = Math.round(Math.max(0, Math.min(1, v)) * LAST_INDEX)
      if (idx === currentIdxRef.current) return // nothing changed
      currentIdxRef.current = idx
      renderIndex(idx)
    })

    return () => {
      unsub()
      cancelAnimationFrame(rafRef.current)
    }
  }, [isMobile, scrollProgress]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Re-render current frame whenever a new batch of frames loads ──
     This ensures the canvas isn't empty while later frames are decoded.
     We only care about early frames (first 5), which covers the visible
     frame on first paint. */
  useEffect(() => {
    if (loadedCount > 0 && loadedCount <= 5) {
      renderIndex(currentIdxRef.current)
    }
  }, [loadedCount]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ──────────────────────────────────────────────────────────────────
     Mobile: static frame-001, no canvas overhead
     ────────────────────────────────────────────────────────────────── */
  if (isMobile) {
    return (
      <>
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${frameSrc(1)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden
        />
        {/* Bottom fade to hero dark bg */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-[1]"
          style={{
            height: 200,
            background: 'linear-gradient(to bottom, transparent 0%, #060607 100%)',
          }}
          aria-hidden
        />
      </>
    )
  }

  /* ──────────────────────────────────────────────────────────────────
     Desktop: canvas frame player
     ────────────────────────────────────────────────────────────────── */
  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{ display: 'block', background: '#060607' }}
        aria-hidden
      />

      {/* Bottom-edge gradient fade into hero dark background */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-[1]"
        style={{
          height: 220,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(6,6,7,0.85) 60%, #060607 100%)',
        }}
        aria-hidden
      />

      {/* Left-edge vignette — frames have content on the right; darken left for text legibility */}
      <div
        className="absolute inset-y-0 left-0 pointer-events-none z-[1]"
        style={{
          width: '55%',
          background: 'linear-gradient(to right, rgba(6,6,7,0.75) 0%, rgba(6,6,7,0.4) 50%, transparent 100%)',
        }}
        aria-hidden
      />

      {/* Bottom-right watermark cover — radial gradient anchored at the corner
          blends with the bottom-edge fade to bury any frame branding */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none z-[1]"
        style={{
          width: 280,
          height: 140,
          background: 'radial-gradient(ellipse at 100% 100%, #060607 0%, rgba(6,6,7,0.85) 40%, transparent 72%)',
        }}
        aria-hidden
      />

      {/* Loading indicator — shown until first frame renders */}
      {loadedCount === 0 && (
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{ background: '#060607' }}
          aria-hidden
        />
      )}
    </>
  )
}
