'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/lib/i18n-context'
import WebGLMesh from './WebGLMesh'

/* ──────────────────────────────────────────────────────────────────
   Waveform
   ────────────────────────────────────────────────────────────────── */
function Waveform({ recording }: { recording: string }) {
  const bars  = [0.3, 0.6, 1, 0.7, 0.4, 0.9, 0.5, 0.8, 0.35]
  const delays = [0, 0.15, 0.3, 0.1, 0.45, 0.2, 0.35, 0.05, 0.25]

  return (
    <div className="inline-flex flex-col items-start gap-3 mb-8">
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ opacity: [1, 0.15, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-2 h-2 rounded-full"
          style={{ background: '#E8960A' }}
        />
        <span
          className="text-xs font-medium tracking-[0.22em]"
          style={{ color: '#E8960A' }}
        >
          {recording}
        </span>
      </div>
      <div className="flex items-center gap-[4px] h-10">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="w-[3px] rounded-full"
            style={{ height: '100%', background: '#E8960A', transformOrigin: 'center' }}
            animate={{ scaleY: [h, h * 0.25, h] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut', delay: delays[i] }}
          />
        ))}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Dark WhatsApp Phone Mockup — premium rebuild
   ────────────────────────────────────────────────────────────────── */
function WhatsAppMockup({ phone }: { phone: Record<string, string> }) {
  const [step, setStep]     = useState(0)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const seq = [
      { d: 800,  fn: () => setTyping(true) },
      { d: 1900, fn: () => { setTyping(false); setStep(1) } },
      { d: 2700, fn: () => setTyping(true) },
      { d: 4000, fn: () => { setTyping(false); setStep(2) } },
      { d: 4900, fn: () => setTyping(true) },
      { d: 6200, fn: () => { setTyping(false); setStep(3) } },
      { d: 7200, fn: () => setTyping(true) },
      { d: 8200, fn: () => { setTyping(false); setStep(4) } },
    ]
    const timers = seq.map(({ d, fn }) => setTimeout(fn, d))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      style={{
        perspective: '1400px',
        transformStyle: 'preserve-3d',
      }}
      className="relative mx-auto"
    >
      {/* Floating wrapper */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          transform: 'rotateY(-3deg) rotateX(1deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ── Device frame ── */}
        <div
          className="relative w-[272px] sm:w-[290px] rounded-[40px] overflow-hidden"
          style={{
            background: '#111B21',
            border: '8px solid #1A1A1A',
            boxShadow: [
              '0 40px 80px rgba(0,0,0,0.55)',
              '0 20px 40px rgba(0,0,0,0.35)',
              '0 0 60px rgba(232,150,10,0.05)',
              'inset 0 1px 0 rgba(255,255,255,0.05)',
            ].join(', '),
          }}
        >
          {/* Dynamic Island */}
          <div
            className="absolute top-2.5 left-1/2 -translate-x-1/2 z-10 rounded-full"
            style={{
              width: 88,
              height: 26,
              background: '#000',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
            }}
          />

          {/* Status bar */}
          <div
            className="flex items-center justify-between pt-9 pb-1.5 px-5"
            style={{ background: '#111B21' }}
          >
            <span className="text-[10px] font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
              9:41
            </span>
            <div className="flex items-center gap-1.5">
              {/* Signal */}
              <div className="flex items-end gap-[2px]">
                {[3, 5, 7, 9].map((h, i) => (
                  <div
                    key={i}
                    className="w-[3px] rounded-sm"
                    style={{ height: h, background: i < 3 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)' }}
                  />
                ))}
              </div>
              {/* WiFi */}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M7 8.5h.01" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round"/>
                <path d="M4.5 6.5a3.5 3.5 0 0 1 5 0" stroke="rgba(255,255,255,0.9)" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
                <path d="M2 4a7 7 0 0 1 10 0" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
              </svg>
              {/* Battery */}
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
                <rect x="0.5" y="0.5" width="18" height="11" rx="2.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
                <rect x="2" y="2" width="13" height="8" rx="1" fill="rgba(255,255,255,0.9)"/>
                <path d="M19.5 4v4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* WhatsApp header */}
          <div
            className="flex items-center gap-3 px-4 py-2.5"
            style={{ background: '#202C33', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 5l-7 7 7 7" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0"
              style={{ background: '#E8960A' }}
            >
              N
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold truncate" style={{ color: '#E9EDF0' }}>
                {phone.label}
              </div>
              <div className="text-[10px]" style={{ color: '#8696A0' }}>
                en línea
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.8 19.8 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.71 2.8a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.97-.98a2 2 0 0 1 2.1-.45c.9.35 1.84.59 2.8.71A2 2 0 0 1 21.73 16.92z" stroke="rgba(255,255,255,0.65)" strokeWidth="1.6" fill="none"/>
              </svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.65)">
                <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
              </svg>
            </div>
          </div>

          {/* Chat area */}
          <div
            className="px-3 pt-3 pb-2 flex flex-col gap-2 overflow-hidden"
            style={{
              background: '#0B141A',
              minHeight: 300,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.015'/%3E%3C/svg%3E")`,
            }}
          >
            {/* Date chip */}
            <div className="flex justify-center mb-1">
              <span
                className="text-[10px] px-2.5 py-0.5 rounded-full"
                style={{ background: 'rgba(17,27,33,0.85)', color: '#8696A0', backdropFilter: 'blur(4px)' }}
              >
                Hoy
              </span>
            </div>

            {/* Messages — incoming (NUVOC) */}
            <AnimatePresence>
              {step >= 1 && (
                <motion.div
                  key="m1"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                  className="self-start max-w-[87%]"
                >
                  <div
                    className="rounded-lg rounded-tl-none px-3 py-2"
                    style={{
                      background: '#202C33',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    }}
                  >
                    <p className="text-[11px] leading-[1.4]" style={{ color: '#E9EDF0' }}>
                      {phone.msg1}
                    </p>
                    <div className="flex items-center justify-end mt-1">
                      <span className="text-[9px]" style={{ color: '#8696A0' }}>{phone.time1}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  key="m2"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                  className="self-start max-w-[90%]"
                >
                  <div
                    className="rounded-lg rounded-tl-none px-3 py-2"
                    style={{ background: '#202C33', boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                  >
                    <p className="text-[11px] leading-[1.4]" style={{ color: '#E9EDF0' }}>
                      {phone.msg2}
                    </p>
                    <div className="flex items-center justify-end mt-1">
                      <span className="text-[9px]" style={{ color: '#8696A0' }}>{phone.time2}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Message 3 + CTA button */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  key="m3"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                  className="self-start max-w-[90%]"
                >
                  <div
                    className="rounded-lg rounded-tl-none overflow-hidden"
                    style={{ background: '#202C33', boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                  >
                    <div className="px-3 py-2">
                      <p className="text-[11px] leading-[1.4]" style={{ color: '#E9EDF0' }}>
                        {phone.msg3}
                      </p>
                      <div className="flex items-center justify-end mt-1">
                        <span className="text-[9px]" style={{ color: '#8696A0' }}>{phone.time3}</span>
                      </div>
                    </div>
                    <div
                      className="flex items-center justify-center px-3 py-2 gap-1"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <span className="text-[10px] font-medium" style={{ color: '#25D366' }}>
                        {phone.btn}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Patient reply — outgoing */}
            <AnimatePresence>
              {step >= 4 && (
                <motion.div
                  key="m4"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                  className="self-end max-w-[78%]"
                >
                  <div
                    className="rounded-lg rounded-tr-none px-3 py-2"
                    style={{ background: '#005C4B', boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                  >
                    <p className="text-[11px] leading-[1.4]" style={{ color: '#E9EDF0' }}>
                      {phone.reply}
                    </p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[9px]" style={{ color: 'rgba(233,237,240,0.6)' }}>{phone.timeReply}</span>
                      {/* Double blue check */}
                      <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                        <path d="M1 5l3 4L11 1M5 5l3 4 7-8" stroke="#53BDEB" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Typing indicator */}
            <AnimatePresence>
              {typing && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="self-start"
                >
                  <div
                    className="rounded-lg rounded-tl-none px-3.5 py-2.5 flex gap-1 items-center"
                    style={{ background: '#202C33' }}
                  >
                    {[0, 0.16, 0.32].map((delay, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: '#8696A0' }}
                        animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.65, repeat: Infinity, delay, ease: 'easeInOut' }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input bar */}
          <div
            className="flex items-center gap-2 px-3 py-2"
            style={{ background: '#111B21', borderTop: '1px solid rgba(255,255,255,0.04)' }}
          >
            <div
              className="flex-1 rounded-full px-4 py-1.5"
              style={{ background: '#2A3942' }}
            >
              <span className="text-[10px]" style={{ color: '#8696A0' }}>Escribe un mensaje</span>
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: '#00A884' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M2 21l21-9L2 3v7l15 2-15 2z"/>
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ambient glow under device */}
      <div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-20 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(232,150,10,0.2) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
    </motion.div>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Hero section
   ────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const { t } = useI18n()
  const ph = t.hero.phone
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()

  // Parallax: content drifts up at 0.28× scroll speed
  const contentY = useTransform(scrollY, [0, 700], [0, 196])
  // Phone drifts at a slightly different rate for depth
  const phoneY = useTransform(scrollY, [0, 700], [0, 120])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  }

  return (
    <section
      ref={sectionRef}
      data-nav-dark
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ background: '#060607' }}
    >
      {/* WebGL animated gradient mesh */}
      <WebGLMesh />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Content with parallax */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Left column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.div variants={itemVariants}>
              <Waveform recording={t.hero.recording} />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-6"
              style={{ color: '#FFFFFF', fontWeight: 200 }}
            >
              {t.hero.headline1}
              <br />
              <span style={{ color: '#E8960A', fontWeight: 300 }}>
                {t.hero.headlineAccent.replace('.', '')}
              </span>
              <span style={{ color: '#FFFFFF' }}>.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg leading-relaxed max-w-lg mb-8"
              style={{ color: 'rgba(255,255,255,0.78)', fontWeight: 200 }}
            >
              {t.hero.subheadline}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 mb-5">
              <a
                href="https://app.nuvoc.health"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  background: '#E8960A',
                  color: '#000',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.background = '#F5AA1A'
                  el.style.boxShadow = '0 0 30px rgba(232,150,10,0.45)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.background = '#E8960A'
                  el.style.boxShadow = ''
                }}
              >
                {t.hero.cta1}
                <svg
                  className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                  fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                >
                  <path d="M5 12h14m-7-7 7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm transition-all duration-200"
                style={{
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#FFFFFF',
                  fontWeight: 200,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.5)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'
                }}
              >
                {t.hero.cta2}
              </a>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xs tracking-wide"
              style={{ color: 'rgba(255,255,255,0.38)', fontWeight: 200 }}
            >
              {t.hero.micro}
            </motion.p>
          </motion.div>

          {/* Right column — phone mockup with independent parallax */}
          <motion.div style={{ y: phoneY }} className="flex justify-center lg:justify-end">
            <WhatsAppMockup phone={ph as unknown as Record<string, string>} />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-9"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.28), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
