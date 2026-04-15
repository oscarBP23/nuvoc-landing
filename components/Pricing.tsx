'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useI18n } from '@/lib/i18n-context'

function CheckSVG({ green }: { green?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
      <path
        d="M2 7.5l3 3.5 7-7"
        stroke={green ? '#E8960A' : '#6B7280'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PricingCard({
  name,
  price,
  period,
  description,
  featured,
  badge,
  cta,
  ctaHref,
  features,
  delay,
}: {
  name: string
  price: string
  period: string
  description: string
  featured: boolean
  badge?: string
  cta: string
  ctaHref: string
  features: readonly string[]
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={featured
        ? { scale: 1.04, transition: { type: 'tween', duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } }
        : { scale: 1.02, y: -4, transition: { type: 'tween', duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } }
      }
      className={`relative flex flex-col rounded-2xl p-8 card-hover ${
        featured
          ? 'bg-[#060607] border-2 border-[#E8960A] shadow-[0_0_60px_rgba(232,150,10,0.15)] scale-[1.02] hover:shadow-[0_0_80px_rgba(232,150,10,0.25)]'
          : 'bg-white border border-[#1A1A1A]/10 hover:border-[#E8960A]/30 hover:shadow-[0_8px_40px_rgba(232,150,10,0.08)]'
      }`}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#E8960A] rounded-full">
          <span className="text-[10px] font-semibold tracking-[0.15em] text-black uppercase">
            {badge}
          </span>
        </div>
      )}

      {/* Plan name */}
      <div className="mb-6">
        <h3
          className={`text-sm font-medium tracking-wide uppercase mb-1 ${
            featured ? 'text-[#E8960A]' : 'text-[#4A4A4A]'
          }`}
        >
          {name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span
            className={`text-4xl sm:text-5xl font-light tracking-tight ${
              featured ? 'text-white' : 'text-[#1A1A1A]'
            }`}
          >
            {price}
          </span>
          {period && (
            <span className={`text-sm font-light ${featured ? 'text-white/60' : 'text-[#6B7280]'}`}>
              {period}
            </span>
          )}
        </div>
        <p className={`mt-2 text-sm font-light leading-relaxed ${featured ? 'text-white/70' : 'text-[#6B7280]'}`}>
          {description}
        </p>
      </div>

      {/* Divider */}
      <div className={`mb-6 h-px ${featured ? 'bg-white/10' : 'bg-[#1A1A1A]/08'}`} />

      {/* Features */}
      <ul className="flex flex-col gap-3 flex-1 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckSVG green={featured} />
            <span
              className={`text-sm font-light ${
                featured ? 'text-white/85' : 'text-[#2D2D2D]'
              }`}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full py-3.5 rounded-full text-sm font-medium text-center transition-all duration-200 ${
          featured
            ? 'bg-[#E8960A] text-black hover:bg-[#F5AA1A] hover:shadow-[0_0_20px_rgba(232,150,10,0.4)]'
            : 'border border-[#1A1A1A]/20 text-[#1A1A1A] hover:border-[#E8960A] hover:text-[#E8960A]'
        }`}
      >
        {cta}
      </a>
    </motion.div>
  )
}

export default function Pricing() {
  const { t, lang } = useI18n()
  const p = t.pricing
  const ctaUrl = 'https://app.nuvoc.health/login.html'

  return (
    <section id="precios" className="bg-[#FAFAF8] py-24 lg:py-32 border-t border-[#1A1A1A]/06">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium tracking-[0.25em] text-[#E8960A] mb-4 uppercase">
            {p.sectionLabel}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] mb-4 tracking-tight">
            {p.title}
          </h2>
          <p className="text-base font-light text-[#4A4A4A]">
            {p.subtitle}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {p.plans.map((plan, i) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              description={plan.description}
              featured={plan.featured}
              badge={'badge' in plan ? (plan as { badge: string }).badge : undefined}
              cta={plan.cta}
              ctaHref={i === p.plans.length - 1 ? 'mailto:oscar@nuvoc.health' : ctaUrl}
              features={plan.features}
              delay={i * 0.12}
            />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center text-xs font-light text-[#6B7280] mt-10"
        >
          Todos los planes incluyen 30 días gratis. Sin tarjeta de crédito requerida.
        </motion.p>
      </div>
    </section>
  )
}
