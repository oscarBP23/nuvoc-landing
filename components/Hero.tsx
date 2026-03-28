'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n-context'
import AmberMesh from './AmberMesh'
import { useRef } from 'react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const WA_URL: Record<string, string> = {
  es: 'https://wa.me/50489398293?text=Hola%2C%20quiero%20probar%20NUVOC',
  en: 'https://wa.me/50489398293?text=Hi%2C%20I%20want%20to%20try%20NUVOC',
}

export default function Hero() {
  const { t, lang } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)
  const waUrl = WA_URL[lang]

  return (
    <section
      ref={sectionRef}
      data-nav-dark
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#060607',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* ── Three.js amber mesh — hidden when scrolled out of view to pause WebGL ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '25%',
          width: '75%',
          height: '100%',
          willChange: 'transform',
        }}
      >
        <AmberMesh />
      </div>

      {/* ── Left gradient: ensures text is always readable over the 3D scene ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background:
            'linear-gradient(to right, #060607 0%, #060607 28%, rgba(6,6,7,0.88) 50%, rgba(6,6,7,0.35) 68%, transparent 82%)',
        }}
        aria-hidden
      />

      {/* ── Text content — left ~50%, always above gradient + scene ── */}
      <div
        className="relative z-10 w-full pt-28 pb-20"
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="max-w-7xl mx-auto px-6 lg:px-8"
          style={{ pointerEvents: 'auto' }}
        >
          <div className="max-w-[560px]">

            {/* Phase 1 (0ms): headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0, ease: EASE }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] leading-[1.04] tracking-tight mb-6"
              style={{ color: '#FFFFFF', fontWeight: 200 }}
            >
              {t.hero.headline1}
              <br />
              {/* Two-tone NUVOC brand split: NU amber · VOC near-white */}
              <span style={{ color: '#E8960A', fontWeight: 300 }}>NU</span>
              <span style={{ color: 'rgba(240,237,232,0.95)', fontWeight: 300 }}>VOC</span>
              <span style={{ color: 'rgba(240,237,232,0.95)', fontWeight: 200 }}>
                {' '}{t.hero.headlineAccent.replace('NUVOC ', '')}
              </span>
            </motion.h1>

            {/* Phase 2 (800ms): subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.8, ease: EASE }}
              className="text-base sm:text-lg leading-relaxed max-w-lg mb-10"
              style={{ color: 'rgba(240,237,232,0.82)', fontWeight: 200 }}
            >
              {t.hero.subheadline}
            </motion.p>

            {/* Phase 3 (1400ms): CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 1.4, ease: EASE }}
              className="flex flex-col sm:flex-row gap-3 mb-6"
            >
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-200"
                style={{ background: '#E8960A', color: '#000' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.background = '#F5AA1A'
                  el.style.boxShadow  = '0 0 30px rgba(232,150,10,0.45)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.background = '#E8960A'
                  el.style.boxShadow  = ''
                }}
              >
                {t.hero.cta1}
                <svg
                  className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14m-7-7 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm transition-all duration-200"
                style={{
                  border: '1px solid rgba(255,255,255,0.22)',
                  color: '#FFFFFF',
                  fontWeight: 200,
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.55)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.22)'
                }}
              >
                {t.hero.cta2}
              </a>
            </motion.div>

            {/* Phase 3 (1400ms): micro text */}
            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 1.4, ease: EASE }}
              className="text-xs tracking-wide"
              style={{ color: 'rgba(240,237,232,0.55)', fontWeight: 200 }}
            >
              {t.hero.micro}
            </motion.p>

          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-9"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.28), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
