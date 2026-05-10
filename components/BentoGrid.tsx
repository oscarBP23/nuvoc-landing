'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n-context'

type Card = {
  label: string
  heading: string
  description: string
  image: string
  alt: string
}

const CARDS: Card[] = [
  {
    label: 'GRABACIÓN',
    heading: 'Habla como si le contaras a un colega.',
    description:
      'Al terminar la consulta, presiona el botón NV y describe lo que encontraste. Sin formularios, sin escribir. Tu voz es suficiente.',
    image: '/screenshots/recording.jpg',
    alt: 'Pantalla de grabación de NUVOC mostrando el botón NV durante una consulta',
  },
  {
    label: 'NOTA CLÍNICA',
    heading: 'De tu voz a una nota de evolución estructurada.',
    description:
      'Transcripción automática y nota clínica completa generada por IA — con diagnóstico, plan de tratamiento y signos de alarma. Lista para revisar en segundos.',
    image: '/screenshots/soap-note.jpg',
    alt: 'Nota clínica SOAP generada automáticamente por NUVOC',
  },
  {
    label: 'WHATSAPP',
    heading: 'Tu paciente recibe todo por WhatsApp.',
    description:
      'Resumen clínico, instrucciones de medicamentos, próxima cita — todo llega automáticamente al WhatsApp de tu paciente. Sin apps extra, sin descargas.',
    image: '/screenshots/whatsapp-thread.jpg',
    alt: 'Hilo de WhatsApp con el resumen clínico enviado al paciente',
  },
  {
    label: 'RESUMEN',
    heading: 'Un resumen personalizado que tu paciente entiende.',
    description:
      'Página branded con saludo personalizado, notas de la consulta en lenguaje claro, y confirmación de próxima cita con un solo toque.',
    image: '/screenshots/patient-summary.jpg',
    alt: 'Resumen personalizado del paciente con saludo y próxima cita',
  },
]

function FeatureCard({ card, index }: { card: Card; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Cards at even indices (0, 2) — text on the left, image on the right.
  const reverse = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        {/* Image — first in DOM so it sits on top on mobile */}
        <div className={`flex justify-center ${reverse ? 'lg:order-2 lg:justify-end' : 'lg:order-1 lg:justify-start'}`}>
          <div
            className="relative w-full max-w-[300px] rounded-2xl p-4 sm:p-5 border"
            style={{
              background: '#141418',
              borderColor: 'rgba(232,150,10,0.08)',
              boxShadow:
                '0 30px 80px rgba(0,0,0,0.55), 0 10px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)',
            }}
          >
            <Image
              src={card.image}
              alt={card.alt}
              width={1290}
              height={2634}
              className="w-full h-auto rounded-xl transition-transform duration-500 ease-out hover:scale-[1.02]"
              sizes="(max-width: 1024px) 90vw, 300px"
            />
          </div>
        </div>

        {/* Text */}
        <div className={reverse ? 'lg:order-1' : 'lg:order-2'}>
          <p
            className="text-xs tracking-[0.25em] uppercase mb-5"
            style={{ color: '#E8960A', fontWeight: 400 }}
          >
            {card.label}
          </p>
          <h3
            className="text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[1.15] mb-5"
            style={{ color: '#F0EDE8', fontWeight: 200 }}
          >
            {card.heading}
          </h3>
          <p
            className="text-base sm:text-lg leading-relaxed max-w-md"
            style={{ color: '#AAA7A2', fontWeight: 300 }}
          >
            {card.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function BentoGrid() {
  const { t } = useI18n()
  const b = t.bento

  return (
    <section
      data-nav-dark
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: '#080809' }}
    >
      {/* Soft amber wash, anchored bottom-center, behind everything */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(232,150,10,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 lg:mb-28"
        >
          <p
            className="text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: '#E8960A', fontWeight: 400 }}
          >
            {b.sectionLabel}
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4"
            style={{ color: '#F0EDE8', fontWeight: 200 }}
          >
            {b.title}
          </h2>
          <p
            className="text-base max-w-md mx-auto"
            style={{ color: '#AAA7A2', fontWeight: 300 }}
          >
            {b.subtitle}
          </p>
        </motion.div>

        {/* Alternating cards */}
        <div className="space-y-24 lg:space-y-32">
          {CARDS.map((card, i) => (
            <FeatureCard key={card.label} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
