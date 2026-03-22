'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useI18n } from '@/lib/i18n-context'

/* ── Custom SVG Icons (amber stroke, no fill) ── */
function MicIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="13" y="4" width="10" height="18" rx="5" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 18c0 6.075 4.925 11 11 11s11-4.925 11-11" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="18" y1="29" x2="18" y2="33" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="13" y1="33" x2="23" y2="33" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
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

function StepCard({
  number,
  icon,
  time,
  title,
  description,
  delay,
}: {
  number: string
  icon: string
  time: string
  title: string
  description: string
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-2xl p-8 border border-[#1A1A1A]/08 hover:border-[#E8960A]/30 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(232,150,10,0.08)] overflow-hidden"
    >
      {/* Ghost number */}
      <div
        className="absolute -top-4 -right-2 text-[100px] font-semibold leading-none select-none pointer-events-none transition-all duration-300 group-hover:text-[#E8960A]/15"
        style={{ color: '#1A1A1A', opacity: 0.05 }}
      >
        {number}
      </div>

      {/* Icon */}
      <div className="relative z-10 mb-6">
        {iconMap[icon]}
      </div>

      {/* Time badge */}
      <div className="relative z-10 inline-flex items-center gap-1.5 mb-4 px-3 py-1.5 rounded-full bg-[#F5F3EF] text-xs font-light text-[#4A4A4A]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E8960A" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        {time}
      </div>

      {/* Title */}
      <h3 className="relative z-10 text-xl font-medium text-[#1A1A1A] mb-3 leading-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 text-sm font-light text-[#4A4A4A] leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}

export default function HowItWorks() {
  const { t } = useI18n()
  const hw = t.howItWorks

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

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
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
      </div>
    </section>
  )
}
