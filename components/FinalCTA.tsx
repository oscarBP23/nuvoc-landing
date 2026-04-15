'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n-context'

export default function FinalCTA() {
  const { t, lang } = useI18n()
  const f = t.finalCta
  const ctaUrl = 'https://app.nuvoc.health/login.html'

  return (
    <section data-nav-dark className="relative bg-[#060607] py-28 lg:py-40 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(232,150,10,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-6 leading-tight tracking-tight">
            {f.title}
          </h2>
          <p className="text-base sm:text-lg font-light text-white/70 mb-10 leading-relaxed">
            {f.subtitle}
          </p>

          <motion.a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-base font-medium bg-[#E8960A] text-black hover:bg-[#F5AA1A] transition-all duration-200"
            style={{ boxShadow: '0 0 40px rgba(232,150,10,0.3), 0 0 80px rgba(232,150,10,0.1)' }}
          >
            {f.cta}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14m-7-7 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
