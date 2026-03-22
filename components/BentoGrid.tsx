'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useI18n } from '@/lib/i18n-context'

/* ── SVG Icons (amber stroke, thin line, round caps) ── */
function WhatsAppIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M23.7 4.3A13.8 13.8 0 0 0 14 .5C6.6.5.5 6.6.5 14c0 2.5.6 4.9 1.9 7L.5 27.5l6.7-1.9A13.6 13.6 0 0 0 14 27.5c7.4 0 13.5-6.1 13.5-13.5 0-3.6-1.4-7-3.8-9.7z" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 17.2c-.4-.2-2.3-1.1-2.6-1.2-.3-.1-.6-.2-.9.2-.3.4-1 1.2-1.3 1.5-.2.3-.5.3-.9.1-.4-.2-1.7-.6-3.2-2-1.2-1-2-2.3-2.2-2.7-.3-.4 0-.6.2-.8l.8-.9c.1-.2.2-.4.3-.6.1-.2 0-.4 0-.6-.1-.2-1-2.3-1.3-3.2-.3-.8-.6-.7-.9-.7h-.8c-.3 0-.7.1-1 .5-.4.4-1.4 1.4-1.4 3.4s1.5 4 1.7 4.2c.2.3 2.9 4.4 7 6.2 1 .4 1.7.7 2.3.9.9.3 1.8.3 2.4.2.7-.1 2.3-1 2.6-1.9.3-.9.3-1.7.2-1.9-.1-.2-.4-.3-.8-.5z" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function LanguageIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="12" stroke="#E8960A" strokeWidth="1.5"/>
      <path d="M14 2C14 2 10 8 10 14s4 12 4 12M14 2c0 0 4 6 4 12s-4 12-4 12M2 14h24" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function MobileIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="7" y="2" width="14" height="24" rx="3" stroke="#E8960A" strokeWidth="1.5"/>
      <circle cx="14" cy="22" r="1" fill="#E8960A"/>
      <line x1="10" y1="6" x2="18" y2="6" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="3" y="6" width="22" height="19" rx="2" stroke="#E8960A" strokeWidth="1.5"/>
      <line x1="3" y1="11" x2="25" y2="11" stroke="#E8960A" strokeWidth="1.5"/>
      <line x1="9" y1="3" x2="9" y2="8" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="19" y1="3" x2="19" y2="8" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="8" y="15" width="3" height="3" rx="0.5" fill="#E8960A" opacity="0.5"/>
      <rect x="13" y="15" width="3" height="3" rx="0.5" fill="#E8960A" opacity="0.5"/>
      <rect x="18" y="15" width="3" height="3" rx="0.5" fill="#E8960A" opacity="0.5"/>
    </svg>
  )
}

function StethoscopeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M7 4v8a7 7 0 0 0 14 0V4" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="7" cy="4" r="2" stroke="#E8960A" strokeWidth="1.5"/>
      <circle cx="21" cy="4" r="2" stroke="#E8960A" strokeWidth="1.5"/>
      <path d="M14 19v4a4 4 0 0 0 4 4" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="22" cy="25" r="2" stroke="#E8960A" strokeWidth="1.5"/>
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 2L4 6v8c0 6.6 4.3 12.8 10 14.9 5.7-2.1 10-8.3 10-14.9V6L14 2z" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 14l3 3 5-5" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function HistoryIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M4 14A10 10 0 1 0 14 4" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4 4v10h10" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 9v5l3 3" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

const iconMap: Record<string, React.ReactNode> = {
  whatsapp: <WhatsAppIcon />,
  language: <LanguageIcon />,
  mobile: <MobileIcon />,
  calendar: <CalendarIcon />,
  stethoscope: <StethoscopeIcon />,
  shield: <ShieldIcon />,
  history: <HistoryIcon />,
}

function BentoCard({
  title,
  description,
  icon,
  wide,
  delay,
}: {
  title: string
  description: string
  icon: string
  wide: boolean
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative bg-white rounded-2xl p-7 border border-[#1A1A1A]/08 hover:border-[#E8960A]/25 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(232,150,10,0.07)] ${
        wide ? 'md:col-span-2' : ''
      }`}
    >
      {/* Icon */}
      <div className="mb-5 group-hover:scale-110 transition-transform duration-300 origin-left">
        {iconMap[icon]}
      </div>

      {/* Title */}
      <h3 className="text-base font-medium text-[#1A1A1A] mb-2 leading-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm font-light text-[#4A4A4A] leading-relaxed">
        {description}
      </p>

      {/* Corner glow on hover */}
      <div className="absolute top-0 right-0 w-20 h-20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(232,150,10,0.08) 0%, transparent 70%)' }}
      />
    </motion.div>
  )
}

export default function BentoGrid() {
  const { t } = useI18n()
  const b = t.bento

  return (
    <section className="bg-[#FAFAF8] py-24 lg:py-32 border-t border-[#1A1A1A]/06">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-medium tracking-[0.25em] text-[#E8960A] mb-4 uppercase">
            {b.sectionLabel}
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] tracking-tight mb-3">
                {b.title}
              </h2>
              <p className="text-base font-light text-[#4A4A4A]">
                {b.subtitle}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {b.features.map((feature, i) => (
            <BentoCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              wide={feature.wide}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
