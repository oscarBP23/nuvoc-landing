'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useI18n } from '@/lib/i18n-context'

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6.5" stroke="#EF4444" strokeWidth="1"/>
      <path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6.5" stroke="#22C55E" strokeWidth="1"/>
      <path d="M4 7l2 2.5 4-4" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M5 14h18M17 8l6 6-6 6" stroke="#E8960A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function Card({
  label,
  items,
  type,
  delay,
}: {
  label: string
  items: string[]
  type: 'before' | 'after'
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const isBefore = type === 'before'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isBefore ? -24 : 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`flex-1 bg-white rounded-2xl overflow-hidden border ${
        isBefore ? 'border-red-100' : 'border-green-100'
      }`}
    >
      {/* Header */}
      <div
        className={`px-7 py-4 border-b ${
          isBefore
            ? 'bg-red-50 border-red-100'
            : 'bg-green-50 border-green-100'
        }`}
      >
        <span
          className={`text-sm font-medium ${
            isBefore ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {label}
        </span>
      </div>

      {/* Items */}
      <div className="px-7 py-6 flex flex-col gap-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: isBefore ? -12 : 12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-start gap-3"
          >
            <div className="mt-0.5 flex-shrink-0">
              {isBefore ? <XIcon /> : <CheckIcon />}
            </div>
            <span className="text-sm font-light text-[#2D2D2D] leading-relaxed">
              {item}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function BeforeAfter() {
  const { t } = useI18n()
  const ba = t.beforeAfter
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-[#F5F3EF] py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Title */}
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-light text-[#1A1A1A] text-center mb-12 tracking-tight"
        >
          {ba.title}
        </motion.h2>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-5 items-stretch">
          <Card
            label={ba.before.label}
            items={ba.before.items as unknown as string[]}
            type="before"
            delay={0.1}
          />

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center flex-shrink-0 py-4 md:py-0"
          >
            <div className="rotate-90 md:rotate-0 p-3 rounded-full bg-white border border-[#E8960A]/20 shadow-sm">
              <ArrowIcon />
            </div>
          </motion.div>

          <Card
            label={ba.after.label}
            items={ba.after.items as unknown as string[]}
            type="after"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  )
}
