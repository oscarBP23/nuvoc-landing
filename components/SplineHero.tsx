'use client'

import { lazy, Suspense, memo, useState, useEffect } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

const Placeholder = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background:
        'radial-gradient(ellipse 60% 70% at 70% 50%, rgba(232,150,10,0.07) 0%, transparent 70%), #060607',
    }}
  />
)

// Memoized so parent re-renders (i18n context changes, nav state, etc.)
// never trigger a re-render of the WebGL scene.
const SplineHero = memo(function SplineHero() {
  // Defer mount by 1.5 s — main thread stays free during initial page paint.
  const [show, setShow] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setShow(true), 1500)
    return () => clearTimeout(id)
  }, [])

  if (!show) return <Placeholder />

  return (
    <Suspense fallback={<Placeholder />}>
      {/* Amber placeholder fades out once WebGL scene is ready */}
      {!loaded && <Placeholder />}

      <Spline
        scene="/spline-scene.splinecode"
        onLoad={(app: any) => {
          setLoaded(true)
          try {
            app.setPixelRatio?.(1)
          } catch {}
        }}
        style={{
          width: '100%',
          height: '100%',
          // GPU-composited layer — prevents the browser from repainting the
          // canvas on every frame and isolates it from the React render tree.
          willChange: 'transform',
          // Hide canvas until loaded so there's no flash of empty WebGL
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      />
    </Suspense>
  )
})

export default SplineHero
