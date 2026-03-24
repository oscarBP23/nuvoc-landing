'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useI18n } from '@/lib/i18n-context'

const BUBBLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ── Custom SVG Icons (amber stroke) ── */
function MicIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="13" y="4" width="10" height="18" rx="5" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 18c0 6.075 4.925 11 11 11s11-4.925 11-11" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="18" y1="29" x2="18" y2="33" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="13" y1="33" x2="23" y2="33" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M9 4h12l8 8v22a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 4v8h8" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="12" y1="19" x2="24" y2="19" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="24" x2="24" y2="24" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="14" x2="17" y2="14" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M31 18c0 7.18-5.82 13-13 13a12.93 12.93 0 0 1-6.1-1.52L5 32l2.52-6.9A12.93 12.93 0 0 1 5 18C5 10.82 10.82 5 18 5s13 5.82 13 13z" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="18" r="1.2" fill="#E8960A"/>
      <circle cx="18" cy="18" r="1.2" fill="#E8960A"/>
      <circle cx="24" cy="18" r="1.2" fill="#E8960A"/>
    </svg>
  )
}

const iconMap: Record<string, React.ReactNode> = {
  mic: <MicIcon />,
  document: <DocumentIcon />,
  chat: <ChatIcon />,
}

/* ──────────────────────────────────────────────────────────────────
   WhatsApp Phone Mockup — moved from Hero, triggered on scroll-into-view
   ────────────────────────────────────────────────────────────────── */
function WhatsAppMockup({ phone }: { phone: Record<string, string> }) {
  const [step, setStep]     = useState(0)
  const [typing, setTyping] = useState(false)
  const wrapRef             = useRef<HTMLDivElement>(null)
  const inView              = useInView(wrapRef, { once: true, margin: '-80px' })

  // Sequence starts once the phone scrolls into view
  useEffect(() => {
    if (!inView) return
    const seq = [
      { d: 500,  fn: () => setTyping(true) },
      { d: 1600, fn: () => { setTyping(false); setStep(1) } },
      { d: 2400, fn: () => setTyping(true) },
      { d: 3700, fn: () => { setTyping(false); setStep(2) } },
      { d: 4600, fn: () => setTyping(true) },
      { d: 5900, fn: () => { setTyping(false); setStep(3) } },
      { d: 6900, fn: () => setTyping(true) },
      { d: 7900, fn: () => { setTyping(false); setStep(4) } },
    ]
    const timers = seq.map(({ d, fn }) => setTimeout(fn, d))
    return () => timers.forEach(clearTimeout)
  }, [inView])

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.3, ease: BUBBLE_EASE }}
      style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
      className="relative mx-auto"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transform: 'rotateY(-3deg) rotateX(1deg)', transformStyle: 'preserve-3d' }}
      >
        {/* Device frame */}
        <div
          className="relative w-[272px] sm:w-[290px] rounded-[40px] overflow-hidden"
          style={{
            background: '#111B21',
            border: '8px solid #1A1A1A',
            boxShadow: [
              '0 40px 80px rgba(0,0,0,0.55)',
              '0 20px 40px rgba(0,0,0,0.35)',
              '0 0 60px rgba(232,150,10,0.06)',
              'inset 0 1px 0 rgba(255,255,255,0.05)',
            ].join(', '),
          }}
        >
          {/* Dynamic Island */}
          <div
            className="absolute top-2.5 left-1/2 -translate-x-1/2 z-10 rounded-full"
            style={{ width: 88, height: 26, background: '#000', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)' }}
          />

          {/* Status bar */}
          <div className="flex items-center justify-between pt-9 pb-1.5 px-5" style={{ background: '#111B21' }}>
            <span className="text-[10px] font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>9:41</span>
            <div className="flex items-center gap-1.5">
              <div className="flex items-end gap-[2px]">
                {[3, 5, 7, 9].map((h, i) => (
                  <div key={i} className="w-[3px] rounded-sm"
                    style={{ height: h, background: i < 3 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)' }} />
                ))}
              </div>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M7 8.5h.01" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round"/>
                <path d="M4.5 6.5a3.5 3.5 0 0 1 5 0" stroke="rgba(255,255,255,0.9)" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
                <path d="M2 4a7 7 0 0 1 10 0" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
              </svg>
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
                <rect x="0.5" y="0.5" width="18" height="11" rx="2.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
                <rect x="2" y="2" width="13" height="8" rx="1" fill="rgba(255,255,255,0.9)"/>
                <path d="M19.5 4v4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* WA header */}
          <div className="flex items-center gap-3 px-4 py-2.5"
            style={{ background: '#202C33', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 5l-7 7 7 7" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0"
              style={{ background: '#E8960A' }}>N</div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold truncate" style={{ color: '#E9EDF0' }}>{phone.label}</div>
              <div className="text-[10px]" style={{ color: '#8696A0' }}>en línea</div>
            </div>
            <div className="flex items-center gap-3.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.8 19.8 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.71 2.8a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.97-.98a2 2 0 0 1 2.1-.45c.9.35 1.84.59 2.8.71A2 2 0 0 1 21.73 16.92z"
                  stroke="rgba(255,255,255,0.65)" strokeWidth="1.6" fill="none"/>
              </svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.65)">
                <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
              </svg>
            </div>
          </div>

          {/* Chat */}
          <div className="px-3 pt-3 pb-2 flex flex-col gap-2 overflow-hidden"
            style={{ background: '#0B141A', minHeight: 300 }}>
            <div className="flex justify-center mb-1">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full"
                style={{ background: 'rgba(17,27,33,0.85)', color: '#8696A0' }}>Hoy</span>
            </div>

            {([
              { key: 'm1', step: 1, text: phone.msg1, time: phone.time1, out: false },
              { key: 'm2', step: 2, text: phone.msg2, time: phone.time2, out: false },
            ] as const).map(({ key, step: s, text, time, out }) => (
              <AnimatePresence key={key}>
                {step >= s && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: BUBBLE_EASE }}
                    className={`max-w-[88%] ${out ? 'self-end' : 'self-start'}`}
                  >
                    <div className="rounded-lg rounded-tl-none px-3 py-2"
                      style={{ background: '#202C33', boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                      <p className="text-[11px] leading-[1.4]" style={{ color: '#E9EDF0' }}>{text}</p>
                      <div className="flex justify-end mt-1">
                        <span className="text-[9px]" style={{ color: '#8696A0' }}>{time}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}

            {/* Msg 3 + CTA */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: BUBBLE_EASE }} className="self-start max-w-[90%]">
                  <div className="rounded-lg rounded-tl-none overflow-hidden"
                    style={{ background: '#202C33', boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                    <div className="px-3 py-2">
                      <p className="text-[11px] leading-[1.4]" style={{ color: '#E9EDF0' }}>{phone.msg3}</p>
                      <div className="flex justify-end mt-1">
                        <span className="text-[9px]" style={{ color: '#8696A0' }}>{phone.time3}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center px-3 py-2"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <span className="text-[10px] font-medium" style={{ color: '#25D366' }}>{phone.btn}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Patient reply */}
            <AnimatePresence>
              {step >= 4 && (
                <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: BUBBLE_EASE }} className="self-end max-w-[78%]">
                  <div className="rounded-lg rounded-tr-none px-3 py-2"
                    style={{ background: '#005C4B', boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                    <p className="text-[11px] leading-[1.4]" style={{ color: '#E9EDF0' }}>{phone.reply}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[9px]" style={{ color: 'rgba(233,237,240,0.6)' }}>{phone.timeReply}</span>
                      <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                        <path d="M1 5l3 4L11 1M5 5l3 4 7-8" stroke="#53BDEB" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Typing dots */}
            <AnimatePresence>
              {typing && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.2 }} className="self-start">
                  <div className="rounded-lg rounded-tl-none px-3.5 py-2.5 flex gap-1 items-center"
                    style={{ background: '#202C33' }}>
                    {[0, 0.16, 0.32].map((d, i) => (
                      <motion.div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: '#8696A0' }}
                        animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.65, repeat: Infinity, delay: d, ease: 'easeInOut' }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input bar */}
          <div className="flex items-center gap-2 px-3 py-2"
            style={{ background: '#111B21', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <div className="flex-1 rounded-full px-4 py-1.5" style={{ background: '#2A3942' }}>
              <span className="text-[10px]" style={{ color: '#8696A0' }}>Escribe un mensaje</span>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: '#00A884' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M2 21l21-9L2 3v7l15 2-15 2z"/>
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ambient glow */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-20 pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse at center, rgba(232,150,10,0.18) 0%, transparent 70%)', filter: 'blur(20px)' }} />
    </motion.div>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Step card
   ────────────────────────────────────────────────────────────────── */
function StepCard({
  number, icon, time, title, description, delay,
}: {
  number: string; icon: string; time: string
  title: string; description: string; delay: number
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { type: 'tween', duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } }}
      className="group relative bg-white rounded-2xl p-7 border border-[#1A1A1A]/08 hover:border-[#E8960A]/30 card-hover hover:shadow-[0_8px_40px_rgba(232,150,10,0.10)] overflow-hidden"
    >
      {/* Ghost number */}
      <div
        className="absolute -top-4 -right-2 text-[100px] font-semibold leading-none select-none pointer-events-none transition-all duration-300 group-hover:text-[#E8960A]/15"
        style={{ color: '#1A1A1A', opacity: 0.05 }}
      >
        {number}
      </div>

      <div className="relative z-10 flex items-start gap-5">
        {/* Icon */}
        <div className="flex-shrink-0 mt-1">{iconMap[icon]}</div>

        <div className="flex-1">
          {/* Time badge */}
          <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1.5 rounded-full bg-[#F5F3EF] text-xs font-light text-[#4A4A4A]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E8960A" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {time}
          </div>

          {/* Title */}
          <h3 className="text-lg font-medium text-[#1A1A1A] mb-2 leading-tight">{title}</h3>

          {/* Description */}
          <p className="text-sm font-light text-[#4A4A4A] leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

/* ──────────────────────────────────────────────────────────────────
   HowItWorks — 2-column: step cards left, phone mockup right
   ────────────────────────────────────────────────────────────────── */
export default function HowItWorks() {
  const { t } = useI18n()
  const hw = t.howItWorks
  const ph = t.hero.phone as unknown as Record<string, string>

  return (
    <section id="como-funciona" className="bg-[#FAFAF8] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium tracking-[0.25em] text-[#E8960A] mb-4 uppercase">
            {hw.sectionLabel}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] mb-4 tracking-tight">
            {hw.title}
          </h2>
          <p className="text-base font-light text-[#4A4A4A] max-w-md mx-auto">
            {hw.subtitle}
          </p>
        </motion.div>

        {/* Two-column: steps on left, phone on right */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: step cards stacked vertically */}
          <div className="flex flex-col gap-5">
            {hw.steps.map((step, i) => (
              <StepCard
                key={step.number}
                number={step.number}
                icon={step.icon}
                time={step.time}
                title={step.title}
                description={step.description}
                delay={i * 0.12}
              />
            ))}
          </div>

          {/* Right: WhatsApp phone mockup — the payoff of the 3-step flow */}
          <div className="flex justify-center lg:justify-end">
            <WhatsAppMockup phone={ph} />
          </div>

        </div>
      </div>
    </section>
  )
}
