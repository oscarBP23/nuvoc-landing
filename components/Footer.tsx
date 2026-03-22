'use client'

import { useI18n } from '@/lib/i18n-context'

function NuvocLogo() {
  return (
    <span className="text-lg font-semibold tracking-wider select-none">
      <span style={{ color: '#E8960A' }}>NU</span>
      <span
        style={{
          WebkitTextStroke: '1.5px white',
          WebkitTextFillColor: 'transparent',
          color: 'white',
        }}
      >
        VOC
      </span>
    </span>
  )
}

export default function Footer() {
  const { t } = useI18n()
  const f = t.footer

  return (
    <footer className="bg-[#060607] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <NuvocLogo />
            <p className="text-xs font-light text-white/40 italic">{f.tagline}</p>
          </div>

          {/* Center */}
          <p className="text-xs font-light text-white/30 order-last md:order-none">
            {f.copyright}
          </p>

          {/* Right */}
          <div className="flex items-center gap-6">
            {f.links.map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs font-light text-white/40 hover:text-white/70 transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
