'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/lib/i18n-context'

function NuvocLogo() {
  return (
    <span className="text-xl font-semibold tracking-wider select-none">
      <span style={{ color: '#E8960A' }}>NU</span>
      <span
        style={{
          WebkitTextStroke: '1.5px currentColor',
          WebkitTextFillColor: 'transparent',
          color: 'white',
        }}
      >
        VOC
      </span>
    </span>
  )
}

export default function Navigation() {
  const { t, toggleLang, lang } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: t.nav.howItWorks, href: '#como-funciona' },
    { label: t.nav.pricing, href: '#precios' },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(6,6,7,0.85)] backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <NuvocLogo />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-light text-white/75 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="text-sm font-light px-3 py-1.5 rounded-full border border-white/20 text-white/60 hover:border-[#E8960A] hover:text-[#E8960A] transition-all duration-200"
            >
              {t.nav.langToggle}
            </button>

            {/* CTA */}
            <a
              href="https://app.nuvoc.health"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full text-sm font-medium bg-[#E8960A] text-black hover:bg-[#F5AA1A] transition-all duration-200 hover:shadow-[0_0_20px_rgba(232,150,10,0.4)]"
            >
              {t.nav.cta}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2"
            aria-label="Menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-white origin-center transition-all"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-[1.5px] bg-white"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-white origin-center"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-[rgba(6,6,7,0.96)] backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-light text-white/80 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <button
                  onClick={toggleLang}
                  className="text-sm font-light px-3 py-1.5 rounded-full border border-white/20 text-white/60 hover:border-[#E8960A] hover:text-[#E8960A] transition-all"
                >
                  {t.nav.langToggle}
                </button>
                <a
                  href="https://app.nuvoc.health"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-5 py-2.5 rounded-full text-sm font-medium bg-[#E8960A] text-black hover:bg-[#F5AA1A] transition-all"
                >
                  {t.nav.cta}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
