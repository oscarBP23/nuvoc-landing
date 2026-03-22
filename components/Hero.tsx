'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/lib/i18n-context'

/* ── Waveform ── */
function Waveform({ recording }: { recording: string }) {
  const bars = [0.3, 0.6, 1, 0.7, 0.4, 0.9, 0.5, 0.8, 0.35]
  const delays = [0, 0.15, 0.3, 0.1, 0.45, 0.2, 0.35, 0.05, 0.25]

  return (
    <div className="inline-flex flex-col items-start gap-3 mb-8">
      <div className="flex items-center gap-2">
        {/* Recording dot */}
        <motion.div
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-2 h-2 rounded-full bg-[#E8960A]"
        />
        <span className="text-xs font-medium tracking-[0.2em] text-[#E8960A]">{recording}</span>
      </div>
      <div className="flex items-center gap-[4px] h-10">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            className="w-[3px] rounded-full bg-[#E8960A]"
            animate={{
              scaleY: [height, height * 0.3, height],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: delays[i],
            }}
            style={{ height: '100%', transformOrigin: 'center' }}
          />
        ))}
      </div>
    </div>
  )
}

/* ── WhatsApp Phone Mockup ── */
function WhatsAppMockup({ phone }: { phone: Record<string, string> }) {
  const [step, setStep] = useState(0)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const sequence = [
      { delay: 800, action: () => setTyping(true) },
      { delay: 1800, action: () => { setTyping(false); setStep(1) } },
      { delay: 2600, action: () => setTyping(true) },
      { delay: 3800, action: () => { setTyping(false); setStep(2) } },
      { delay: 4600, action: () => setTyping(true) },
      { delay: 5800, action: () => { setTyping(false); setStep(3) } },
      { delay: 6800, action: () => { setTyping(true) } },
      { delay: 7800, action: () => { setTyping(false); setStep(4) } },
    ]

    const timers = sequence.map(({ delay, action }) => setTimeout(action, delay))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8, rotateY: -8 }}
      animate={{ opacity: 1, y: 0, rotateX: 8, rotateY: -8 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        animation: 'float 6s ease-in-out infinite',
      }}
      className="relative mx-auto"
    >
      {/* Phone frame */}
      <div
        className="relative w-[280px] sm:w-[300px] rounded-[36px] overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(145deg, #1a1a2e 0%, #0d0d1a 100%)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 40px rgba(232,150,10,0.08), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10" />

        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-7 pb-1">
          <span className="text-[10px] text-white/60 font-medium">9:41</span>
          <div className="flex gap-1 items-center">
            <div className="flex gap-[2px] items-end">
              {[2, 4, 5, 6].map((h, i) => (
                <div key={i} className="w-[3px] bg-white/60 rounded-sm" style={{ height: h }} />
              ))}
            </div>
            <svg className="w-3 h-3 text-white/60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M1.5 8.5a13 13 0 0 1 21 0M5.5 12.5a8 8 0 0 1 13 0M9 16.5a4 4 0 0 1 6 0M12 20.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
            <svg className="w-4 h-3 text-white/60" fill="currentColor" viewBox="0 0 24 10">
              <rect x="0" y="1" width="20" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <rect x="21" y="3" width="2" height="4" rx="1" fill="currentColor" opacity="0.6"/>
              <rect x="1.5" y="2.5" width="14" height="5" rx="1" fill="currentColor"/>
            </svg>
          </div>
        </div>

        {/* WhatsApp header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#128C7E]">
          <div className="w-8 h-8 rounded-full bg-[#E8960A] flex items-center justify-center text-xs font-bold text-black">N</div>
          <div className="flex-1">
            <div className="text-white text-sm font-semibold leading-tight">{phone.label}</div>
            <div className="text-white/70 text-[10px]">en línea</div>
          </div>
          <div className="flex gap-4">
            <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <svg className="w-4 h-4 text-white/80" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
            </svg>
          </div>
        </div>

        {/* Chat area */}
        <div
          className="px-3 py-4 min-h-[340px] flex flex-col gap-2 overflow-hidden"
          style={{ background: '#ECE5DD url("data:image/svg+xml,%3Csvg...%3E") ' }}
        >
          {/* Date chip */}
          <div className="flex justify-center mb-1">
            <span className="text-[10px] text-[#667781] bg-[#fff] px-2 py-0.5 rounded-full shadow-sm">Hoy</span>
          </div>

          {/* Message 1 */}
          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="self-start max-w-[85%]"
              >
                <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 shadow-sm">
                  <p className="text-[11px] text-[#111] leading-tight">{phone.msg1}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[9px] text-[#667781]">{phone.time1}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message 2 */}
          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="self-start max-w-[90%]"
              >
                <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 shadow-sm">
                  <p className="text-[11px] text-[#111] leading-tight">{phone.msg2}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[9px] text-[#667781]">{phone.time2}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message 3 with button */}
          <AnimatePresence>
            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="self-start max-w-[90%]"
              >
                <div className="bg-white rounded-lg rounded-tl-none shadow-sm overflow-hidden">
                  <div className="px-3 py-2">
                    <p className="text-[11px] text-[#111] leading-tight">{phone.msg3}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[9px] text-[#667781]">{phone.time3}</span>
                    </div>
                  </div>
                  <div className="border-t border-[#e0e0e0] px-3 py-2 flex items-center justify-center gap-1">
                    <span className="text-[10px] font-medium text-[#128C7E]">{phone.btn}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Patient reply */}
          <AnimatePresence>
            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="self-end max-w-[80%]"
              >
                <div className="bg-[#DCF8C6] rounded-lg rounded-tr-none px-3 py-2 shadow-sm">
                  <p className="text-[11px] text-[#111] leading-tight">{phone.reply}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[9px] text-[#667781]">{phone.timeReply}</span>
                    <svg className="w-3 h-2" viewBox="0 0 16 11" fill="#34B7F1">
                      <path d="M11 1L5 7L2 4M15 1L9 7" stroke="#34B7F1" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
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
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="self-start"
              >
                <div className="bg-white rounded-lg rounded-tl-none px-3 py-2.5 shadow-sm flex gap-1 items-center">
                  {[0, 0.15, 0.3].map((delay, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[#90949C]"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#f0f0f0] border-t border-[#d0d0d0]">
          <div className="flex-1 bg-white rounded-full px-4 py-1.5">
            <span className="text-[10px] text-[#aaa]">Escribe un mensaje</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-[#128C7E] flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3zm0 0v9m0 0L8 8m4 4l4-4"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-20 rounded-[36px]"
        style={{ background: 'radial-gradient(ellipse at center, #E8960A 0%, transparent 70%)' }}
      />
    </motion.div>
  )
}

/* ── Gradient Mesh Background ── */
function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.06]"
        style={{
          background: 'radial-gradient(ellipse, #E8960A 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <motion.div
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(ellipse, #E8960A 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

/* ── Hero ── */
export default function Hero() {
  const { t } = useI18n()
  const ph = t.hero.phone

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center bg-[#060607] overflow-hidden pt-16">
      <GradientMesh />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">

          {/* Left column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Waveform */}
            <motion.div variants={itemVariants}>
              <Waveform recording={t.hero.recording} />
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.05] tracking-tight text-white mb-6"
            >
              {t.hero.headline1}
              <br />
              <span
                className="font-light"
                style={{ color: '#E8960A' }}
              >
                {t.hero.headlineAccent.replace('.', '')}
              </span>
              <span className="text-white">.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg font-light text-white/80 leading-relaxed max-w-lg mb-8"
            >
              {t.hero.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 mb-5"
            >
              <a
                href="https://app.nuvoc.health"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium bg-[#E8960A] text-black hover:bg-[#F5AA1A] transition-all duration-200 hover:shadow-[0_0_30px_rgba(232,150,10,0.4)]"
              >
                {t.hero.cta1}
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14m-7-7 7 7-7 7"/>
                </svg>
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-light border border-white/20 text-white hover:border-white/50 transition-all duration-200"
              >
                {t.hero.cta2}
              </a>
            </motion.div>

            {/* Micro-copy */}
            <motion.p
              variants={itemVariants}
              className="text-xs font-light text-white/45 tracking-wide"
            >
              {t.hero.micro}
            </motion.p>
          </motion.div>

          {/* Right column — phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <WhatsAppMockup phone={ph as unknown as Record<string, string>} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  )
}
