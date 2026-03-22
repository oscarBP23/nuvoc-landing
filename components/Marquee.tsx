'use client'

import { useI18n } from '@/lib/i18n-context'

export default function Marquee() {
  const { t } = useI18n()
  const items = t.marquee

  // Duplicate for seamless loop
  const doubled = [...items, ...items]

  return (
    <div className="relative bg-[#060607] border-y border-white/[0.06] py-4 overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #060607, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #060607, transparent)' }} />

      <div
        className="flex items-center gap-0 whitespace-nowrap"
        style={{ animation: 'marquee 30s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="text-sm font-light tracking-wide text-white/70 px-1">
              {item}
            </span>
            <span
              className="mx-3 w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: '#E8960A', opacity: 0.7 }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
