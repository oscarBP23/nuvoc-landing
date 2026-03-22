'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/lib/i18n-context'

function StatCard({
  value,
  label,
  delay,
}: {
  value: string
  label: string
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center py-8 px-4"
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#1A1A1A] mb-3"
        style={{ color: '#1A1A1A' }}
      >
        {value}
      </motion.span>
      <span className="text-sm font-light text-[#4A4A4A] max-w-[140px] leading-snug">
        {label}
      </span>
    </motion.div>
  )
}

export default function Stats() {
  const { t } = useI18n()

  return (
    <section className="bg-[#FAFAF8] py-4">
      {/* Section label strip */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-4">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-base sm:text-lg font-light text-[#1A1A1A]/70 max-w-xl mx-auto"
        >
          {t.stats.label}
        </motion.p>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#1A1A1A]/10">
          {t.stats.items.map((stat, i) => (
            <StatCard
              key={i}
              value={stat.value}
              label={stat.label}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
