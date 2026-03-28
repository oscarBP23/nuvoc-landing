'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/lib/i18n-context'

/* ──────────────────────────────────────────────────────────────────
   Logo — crisp Outfit rendering, no webkit-text-stroke tricks
   ────────────────────────────────────────────────────────────────── */
function NuvocLogo({ light }: { light: boolean }) {
  return (
    <span
      className="select-none inline-flex items-baseline"
      style={{
        letterSpacing: '0.12em',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
      {/* NU — amber, weight 400 */}
      <span
        style={{
          color: '#E8960A',
          fontWeight: 400,
          fontSize: '1.2rem',
          lineHeight: 1,
        }}
      >
        NU
      </span>
      {/* VOC — weight 200, context-aware color, smooth transition */}
      <span
        style={{
          color: light ? '#2D2D2D' : 'rgba(240,237,232,0.88)',
          fontWeight: 200,
          fontSize: '1.2rem',
          lineHeight: 1,
          transition: 'color 300ms ease',
        }}
      >
        VOC
      </span>
    </span>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Nav — tracks dark vs. light section via data-nav-dark attributes
   ────────────────────────────────────────────────────────────────── */
export default function Navigation() {
  const { t, lang, toggleLang } = useI18n()
  const waUrl = lang === 'es'
    ? 'https://wa.me/50489398293?text=Hola%2C%20quiero%20probar%20NUVOC'
    : 'https://wa.me/50489398293?text=Hi%2C%20I%20want%20to%20try%20NUVOC'
  const [mobileOpen, setMobileOpen] = useState(false)
  // light = true  → over a light background section
  const [light, setLight] = useState(false)
  // scrolled = true → has left the very top (for bg blur)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const NAV_H = 64

    const update = () => {
      const y = window.scrollY + NAV_H + 1
      setScrolled(window.scrollY > 20)

      // All sections with data-nav-dark are dark-themed
      const darkEls = document.querySelectorAll<HTMLElement>('[data-nav-dark]')
      let onDark = window.scrollY < NAV_H // top of page = dark hero

      darkEls.forEach((el) => {
        const top = el.offsetTop
        const bottom = top + el.offsetHeight
        if (y >= top && y < bottom) onDark = true
      })

      setLight(!onDark)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  const navLinks = [
    { label: t.nav.howItWorks, href: '#como-funciona' },
    { label: t.nav.pricing, href: '#precios' },
  ]

  /* ── nav background based on light/dark + scroll ── */
  const navBg = light
    ? scrolled
      ? 'rgba(255,255,255,0.92)'
      : 'rgba(255,255,255,0.0)'
    : scrolled
    ? 'rgba(6,6,7,0.88)'
    : 'rgba(6,6,7,0.0)'

  const borderBottom = light
    ? scrolled ? 'rgba(0,0,0,0.08)' : 'transparent'
    : scrolled ? 'rgba(255,255,255,0.06)' : 'transparent'

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: navBg,
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: `1px solid ${borderBottom}`,
        transition: 'background 300ms ease, border-color 300ms ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <NuvocLogo light={light} />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-light transition-colors duration-200"
                style={{
                  color: light ? 'rgba(26,26,26,0.7)' : 'rgba(255,255,255,0.72)',
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = light ? '#1A1A1A' : '#FFFFFF')
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = light
                    ? 'rgba(26,26,26,0.7)'
                    : 'rgba(255,255,255,0.72)')
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="text-sm font-light px-3 py-1.5 rounded-full transition-all duration-200"
              style={{
                border: `1px solid ${light ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'}`,
                color: light ? 'rgba(26,26,26,0.6)' : 'rgba(255,255,255,0.6)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.borderColor = '#E8960A'
                el.style.color = '#E8960A'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.borderColor = light ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'
                el.style.color = light ? 'rgba(26,26,26,0.6)' : 'rgba(255,255,255,0.6)'
              }}
            >
              {t.nav.langToggle}
            </button>

            <a
              href={waUrl}
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
            {[
              mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 },
              { opacity: mobileOpen ? 0 : 1 },
              mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 },
            ].map((anim, i) => (
              <motion.span
                key={i}
                animate={anim}
                className="block w-5 h-[1.5px] origin-center"
                style={{ background: light ? '#1A1A1A' : '#FFFFFF' }}
              />
            ))}
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
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="md:hidden overflow-hidden"
            style={{
              background: light ? 'rgba(255,255,255,0.96)' : 'rgba(6,6,7,0.96)',
              backdropFilter: 'blur(20px)',
              borderBottom: `1px solid ${light ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)'}`,
            }}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-light"
                  style={{ color: light ? 'rgba(26,26,26,0.8)' : 'rgba(255,255,255,0.8)' }}
                >
                  {link.label}
                </a>
              ))}
              <div
                className="flex items-center gap-3 pt-2"
                style={{
                  borderTop: `1px solid ${light ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
                }}
              >
                <button
                  onClick={toggleLang}
                  className="text-sm font-light px-3 py-1.5 rounded-full border transition-all"
                  style={{
                    borderColor: light ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
                    color: light ? 'rgba(26,26,26,0.6)' : 'rgba(255,255,255,0.6)',
                  }}
                >
                  {t.nav.langToggle}
                </button>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-5 py-2.5 rounded-full text-sm font-medium bg-[#E8960A] text-black"
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
