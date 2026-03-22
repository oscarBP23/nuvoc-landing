'use client'

import { useI18n } from '@/lib/i18n-context'

export default function Marquee() {
  const { t } = useI18n()
  const items = t.marquee
  const doubled = [...items, ...items]

  return (
    <div
      className="relative overflow-hidden py-4"
      style={{
        background: '#FAFAF8',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #FAFAF8, transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #FAFAF8, transparent)' }}
      />

      <div
        className="flex items-center whitespace-nowrap"
        style={{ animation: 'marquee 32s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span
              className="text-sm tracking-wide px-1"
              style={{ color: 'rgba(26,26,26,0.55)', fontWeight: 200 }}
            >
              {item}
            </span>
            <span
              className="mx-3 w-[5px] h-[5px] rounded-full flex-shrink-0"
              style={{ background: '#E8960A', opacity: 0.6 }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
