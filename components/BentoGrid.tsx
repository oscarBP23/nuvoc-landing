'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useI18n } from '@/lib/i18n-context'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ──────────────────────────────────────────────────────────────────
   CSS keyframes — pulse, ripple, blinking cursor.
   Lives inside this component file so the section stays self-contained.
   ────────────────────────────────────────────────────────────────── */
const KEYFRAMES = `
  @keyframes nv-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.4; transform: scale(1.04); }
  }
  @keyframes nv-ripple {
    0%   { opacity: 0.55; transform: scale(1); }
    100% { opacity: 0;    transform: scale(1.6); }
  }
  @keyframes nv-blink {
    0%, 49%   { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
  .nv-no-scrollbar::-webkit-scrollbar { display: none; }
  .nv-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
`

/* ──────────────────────────────────────────────────────────────────
   PhoneFrame — shared wrapper for the 3 dark mockups.
   Gradient border (top→bottom edge lighting) over a #0A0A0C inner.
   Behind it: a soft amber radial glow, scaled ~120% for ambient float.
   ────────────────────────────────────────────────────────────────── */
function PhoneFrame({
  children,
  glowOpacity = 0.15,
}: {
  children: React.ReactNode
  glowOpacity?: number
}) {
  return (
    <div className="relative w-[260px] h-[540px] lg:w-[280px] lg:h-[580px] mx-auto">
      {/* Ambient amber glow — 140% of phone, centered behind */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: '-20%',
          left: '-20%',
          width: '140%',
          height: '140%',
          background: `radial-gradient(ellipse at center, rgba(232,150,10,${glowOpacity}) 0%, transparent 70%)`,
          filter: 'blur(28px)',
        }}
      />

      {/* Gradient border — padding wrapper holds the gradient,
          inner div paints the actual phone surface. */}
      <div
        className="relative w-full h-full rounded-[2.5rem]"
        style={{
          padding: 1.5,
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
          boxShadow:
            '0 40px 80px rgba(0,0,0,0.55), 0 20px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        <div
          className="relative w-full h-full rounded-[calc(2.5rem-1.5px)] overflow-y-auto overflow-x-hidden nv-no-scrollbar"
          style={{ background: '#0A0A0C' }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Status bar (9:41 + signal/wifi/battery). Solid hex for everything.
   ────────────────────────────────────────────────────────────────── */
function StatusBar() {
  const FG = '#F0EDE8'
  const DIM = '#6B6865'
  return (
    <div className="flex items-center justify-between pt-3 pb-1.5 px-5">
      <span className="text-[11px]" style={{ color: FG, fontWeight: 400 }}>9:41</span>
      <div className="flex items-center gap-1.5">
        {/* signal bars */}
        <div className="flex items-end gap-[2px]">
          {[3, 5, 7, 9].map((h, i) => (
            <div
              key={i}
              className="w-[3px] rounded-sm"
              style={{ height: h, background: i < 3 ? FG : DIM }}
            />
          ))}
        </div>
        {/* wifi */}
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M7 8.5h.01" stroke={FG} strokeWidth="2" strokeLinecap="round" />
          <path d="M4.5 6.5a3.5 3.5 0 0 1 5 0" stroke={FG} strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <path d="M2 4a7 7 0 0 1 10 0" stroke={DIM} strokeWidth="1.4" strokeLinecap="round" fill="none" />
        </svg>
        {/* battery */}
        <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
          <rect x="0.5" y="0.5" width="18" height="11" rx="2.5" stroke={DIM} strokeWidth="1" />
          <rect x="2" y="2" width="13" height="8" rx="1" fill={FG} />
          <path d="M19.5 4v4" stroke={DIM} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}

/* NUVOC top header — used in mockups 1 & 2 */
function NuvocHeader() {
  return (
    <div
      className="flex items-center justify-between px-4 py-2.5"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      <span className="text-[13px]" style={{ fontWeight: 400, letterSpacing: '0.04em' }}>
        <span style={{ color: '#E8960A' }}>NU</span>
        <span style={{ color: '#F0EDE8' }}>VOC</span>
      </span>
      <div className="flex items-center gap-2.5 text-[8.5px] tracking-[0.1em] uppercase" style={{ fontWeight: 400 }}>
        <span style={{ color: '#F0EDE8' }}>● Dr. García</span>
        <span style={{ color: '#888581' }}>Agenda</span>
        <span style={{ color: '#888581' }}>Salir</span>
      </div>
    </div>
  )
}

/* Patient name + Consulta badge — used in mockups 1 & 2 */
function PatientBar() {
  return (
    <div
      className="flex items-center justify-between mx-4 mt-3 px-3 py-2.5 rounded-lg"
      style={{ background: '#141418', border: '1px solid rgba(232,150,10,0.08)' }}
    >
      <span className="text-[11px]" style={{ color: '#F0EDE8', fontWeight: 300 }}>
        María López Hernández
      </span>
      <span
        className="text-[8.5px] px-2 py-0.5 rounded-full tracking-[0.08em]"
        style={{ background: '#1E1E24', color: '#AAA7A2', fontWeight: 400 }}
      >
        Consulta
      </span>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Mockup 1 — Recording (NV pulse + ripple, timer, GRABANDO label)
   ────────────────────────────────────────────────────────────────── */
function RecordingMockup() {
  return (
    <PhoneFrame>
      <StatusBar />
      <NuvocHeader />
      <PatientBar />

      {/* Center NV button */}
      <div className="flex flex-col items-center justify-center pt-12 pb-8 px-6">
        <div className="relative w-[120px] h-[120px]">
          {/* Outer ripple — fades outward */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid #E8960A',
              animation: 'nv-ripple 3s ease-out infinite',
              transformOrigin: 'center',
            }}
          />
          {/* Inner pulsing ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '3px solid #E8960A',
              animation: 'nv-pulse 2s ease-in-out infinite',
              transformOrigin: 'center',
            }}
          />
          {/* Static NV — does not animate */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              style={{
                color: '#E8960A',
                fontWeight: 200,
                fontSize: 36,
                letterSpacing: '0.05em',
              }}
            >
              NV
            </span>
          </div>
        </div>

        {/* Timer */}
        <span style={{ color: '#E8960A', fontWeight: 200, fontSize: 28, marginTop: 22 }}>
          01:24
        </span>

        {/* GRABANDO label */}
        <span
          className="mt-2 tracking-[0.2em] uppercase"
          style={{ color: '#2ECC71', fontWeight: 400, fontSize: 11 }}
        >
          GRABANDO...
        </span>
      </div>

      {/* Volver button */}
      <div className="px-6 pb-6">
        <div
          className="w-full text-center py-2.5 rounded-full"
          style={{
            border: '1px solid #2A2A30',
            color: '#AAA7A2',
            fontWeight: 300,
            fontSize: 12,
          }}
        >
          Volver
        </div>
      </div>
    </PhoneFrame>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Mockup 2 — SOAP note. Typewriter reveals the structured note text.
   ────────────────────────────────────────────────────────────────── */
const NOTE_TEXT = `NOTA CLÍNICA – CONSULTA MEDICINA GENERAL

Fecha: 10 de mayo de 2026
Paciente: María López Hernández
Edad: 34 años
Médico: Dr. García

S (SUBJETIVO)
Motivo de consulta:
Cefalea tensional de cinco días de evolución.`

function SoapNoteMockup({ inView }: { inView: boolean }) {
  const [chars, setChars] = useState(0)

  useEffect(() => {
    if (!inView) return
    // ~30 chars/sec → 33ms per character
    const id = setInterval(() => {
      setChars((c) => {
        if (c >= NOTE_TEXT.length) {
          clearInterval(id)
          return c
        }
        return c + 1
      })
    }, 33)
    return () => clearInterval(id)
  }, [inView])

  const visible = NOTE_TEXT.slice(0, chars)
  const isTyping = chars < NOTE_TEXT.length

  return (
    <PhoneFrame>
      <StatusBar />
      <NuvocHeader />

      {/* Back link */}
      <div className="px-4 mt-3">
        <span
          className="text-[10px] tracking-[0.15em] uppercase"
          style={{ color: '#E8960A', fontWeight: 400 }}
        >
          ← Volver a grabar
        </span>
      </div>

      <PatientBar />

      {/* Scrollable body */}
      <div
        className="px-4 mt-3 pb-4 overflow-y-auto"
        style={{
          maxHeight: 360,
          scrollbarWidth: 'thin',
          scrollbarColor: '#2A2A30 transparent',
        }}
      >
        <p
          className="text-[9px] tracking-[0.22em] uppercase mb-2"
          style={{ color: '#E8960A', fontWeight: 400 }}
        >
          Transcripción
        </p>
        <div
          className="rounded-lg p-3 mb-4"
          style={{ background: '#141418', border: '1px solid rgba(232,150,10,0.06)' }}
        >
          <p className="text-[10px] leading-[1.55]" style={{ color: '#AAA7A2', fontWeight: 300 }}>
            Paciente femenina de 34 años con cefalea tensional de cinco días de evolución, localizada
            en región frontal bilateral. No náuseas ni vómitos. Signos vitales dentro de parámetros
            normales. Se indica paracetamol 500mg cada 8 horas por 5 días.
          </p>
        </div>

        <p
          className="text-[9px] tracking-[0.22em] uppercase mb-2"
          style={{ color: '#E8960A', fontWeight: 400 }}
        >
          Nota clínica
        </p>
        <div
          className="rounded-lg p-3"
          style={{ background: '#141418', border: '1px solid rgba(232,150,10,0.06)' }}
        >
          <pre
            className="whitespace-pre-wrap break-words"
            style={{
              color: '#F0EDE8',
              fontWeight: 300,
              fontSize: 10,
              lineHeight: 1.55,
              fontFamily: 'inherit',
              margin: 0,
            }}
          >
            {visible}
            {isTyping && (
              <span
                className="inline-block align-baseline"
                style={{
                  width: 6,
                  height: 11,
                  marginLeft: 1,
                  background: '#E8960A',
                  animation: 'nv-blink 0.8s steps(2) infinite',
                  verticalAlign: 'text-bottom',
                }}
              />
            )}
          </pre>
        </div>
      </div>
    </PhoneFrame>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Mockup 3 — WhatsApp thread. Bubbles stagger in on scroll-into-view.
   Mirrors the chrome from HowItWorks.WhatsAppMockup.
   ────────────────────────────────────────────────────────────────── */
type Bubble = {
  from: 'nuvoc' | 'patient'
  text: string
  time: string
  cta?: string
}

const BUBBLES: Bubble[] = [
  { from: 'nuvoc',   text: 'Hola María, aquí tu resumen de consulta de hoy 📋', time: '10:32 AM' },
  { from: 'nuvoc',   text: 'Diagnóstico: Cefalea tensional. Paracetamol 500mg cada 8h por 5 días. Evitar pantallas prolongadas.', time: '10:32 AM' },
  { from: 'nuvoc',   text: 'Próxima cita: Jueves 15 de mayo, 9:00 AM. ¿Confirmas asistencia?', time: '10:33 AM', cta: 'Ver resumen completo →' },
  { from: 'patient', text: '¡Muchas gracias doctor! Todo muy claro 🙏', time: '10:34 AM' },
]

function WhatsAppMockup({ inView }: { inView: boolean }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!inView) return
    const timers = BUBBLES.map((_, i) =>
      setTimeout(() => setStep(i + 1), 400 + i * 400),
    )
    return () => timers.forEach(clearTimeout)
  }, [inView])

  return (
    <PhoneFrame>
      <StatusBar />

      {/* WhatsApp header */}
      <div
        className="flex items-center gap-2.5 px-3 py-2.5"
        style={{ background: '#202C33', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 5l-7 7 7 7" stroke="#F0EDE8" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] flex-shrink-0"
          style={{ background: '#E8960A', color: '#0A0A0C', fontWeight: 400 }}
        >
          NV
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12px] truncate" style={{ color: '#F0EDE8', fontWeight: 400 }}>NUVOC</div>
          <div className="text-[9px]" style={{ color: '#8696A0', fontWeight: 300 }}>en línea</div>
        </div>
      </div>

      {/* Chat */}
      <div
        className="px-3 pt-3 pb-3 flex flex-col gap-2"
        style={{ background: '#0B141A', minHeight: 380 }}
      >
        <div className="flex justify-center mb-1">
          <span
            className="text-[9px] px-2 py-0.5 rounded tracking-[0.1em]"
            style={{ background: '#1F2C34', color: '#8696A0', fontWeight: 400 }}
          >
            HOY
          </span>
        </div>

        {BUBBLES.map((b, i) => {
          const out = b.from === 'patient'
          return (
            <AnimatePresence key={i}>
              {step >= i + 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className={`max-w-[88%] ${out ? 'self-end' : 'self-start'}`}
                >
                  <div
                    className={`rounded-lg px-3 py-2 ${out ? 'rounded-tr-none' : 'rounded-tl-none'}`}
                    style={{
                      background: out ? '#005C4B' : '#202C33',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    }}
                  >
                    <p className="text-[10px] leading-[1.45]" style={{ color: '#F0EDE8', fontWeight: 300 }}>
                      {b.text}
                    </p>
                    {b.cta && (
                      <div
                        className="mt-2 pt-2 text-center"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        <span className="text-[10px]" style={{ color: '#53BDEB', fontWeight: 400 }}>
                          {b.cta}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[8px]" style={{ color: '#8696A0', fontWeight: 400 }}>
                        {b.time}
                      </span>
                      {out && (
                        <svg width="14" height="9" viewBox="0 0 16 10" fill="none">
                          <path
                            d="M1 5l3 4L11 1M5 5l3 4 7-8"
                            stroke="#53BDEB"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )
        })}
      </div>

      {/* Input bar */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ background: '#111B21', borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <div className="flex-1 rounded-full px-3.5 py-1.5" style={{ background: '#2A3942' }}>
          <span className="text-[10px]" style={{ color: '#8696A0', fontWeight: 300 }}>
            Escribe un mensaje
          </span>
        </div>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: '#00A884' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#F0EDE8">
            <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
          </svg>
        </div>
      </div>
    </PhoneFrame>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Mockup 4 — Patient summary, light-mode browser. No animation.
   ────────────────────────────────────────────────────────────────── */
function PatientSummaryMockup() {
  return (
    <div className="relative w-full max-w-[280px] lg:max-w-[320px] mx-auto">
      {/* Subtler glow for the light frame */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: 'scale(1.2)',
          background: 'radial-gradient(ellipse at center, rgba(232,150,10,0.10) 0%, transparent 70%)',
          filter: 'blur(28px)',
        }}
      />

      {/* Browser frame */}
      <div
        className="relative rounded-2xl"
        style={{
          padding: 1.5,
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 100%)',
          boxShadow:
            '0 30px 80px rgba(0,0,0,0.45), 0 10px 30px rgba(0,0,0,0.3)',
        }}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: '#F0EDE6' }}
        >
          {/* Top browser bar */}
          <div
            className="flex items-center px-3 py-2 relative"
            style={{ background: '#FAF8F4', borderBottom: '1px solid #E5E0D8' }}
          >
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F56' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FFBD2E' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#27C93F' }} />
            </div>
            <span
              className="absolute left-1/2 -translate-x-1/2 text-[9px]"
              style={{ color: '#777', fontWeight: 400 }}
            >
              app.nuvoc.health/resumen
            </span>
          </div>

          {/* Page body */}
          <div className="px-5 py-5">
            <p
              className="text-[9px] tracking-[0.22em] uppercase mb-2"
              style={{ color: '#555', fontWeight: 400 }}
            >
              Su consulta
            </p>
            <h4
              className="leading-tight mb-1"
              style={{ color: '#1A1A1A', fontWeight: 200, fontSize: 24 }}
            >
              Hola, María<span style={{ color: '#E8960A' }}>.</span>
            </h4>
            <p className="text-[11px] mb-4" style={{ color: '#777', fontWeight: 300 }}>
              10/05/2026
            </p>

            {/* Card 1 — atendido por */}
            <div
              className="rounded-lg p-3 mb-3"
              style={{ background: '#FAF8F4', border: '1px solid #E5E0D8' }}
            >
              <p
                className="text-[8px] tracking-[0.2em] uppercase mb-1"
                style={{ color: '#777', fontWeight: 400 }}
              >
                Atendido por
              </p>
              <p className="text-[12px]" style={{ color: '#1A1A1A', fontWeight: 300 }}>
                Dr. García
              </p>
            </div>

            {/* Card 2 — notas de la consulta */}
            <div
              className="rounded-lg p-3 mb-3"
              style={{ background: '#FAF8F4', border: '1px solid #E5E0D8' }}
            >
              <p
                className="text-[8px] tracking-[0.2em] uppercase mb-2"
                style={{ color: '#777', fontWeight: 400 }}
              >
                Notas de la consulta
              </p>
              <p className="text-[11px] mb-1" style={{ color: '#1A1A1A', fontWeight: 300 }}>
                Hola María,
              </p>
              <p className="text-[10px] leading-[1.55]" style={{ color: '#333', fontWeight: 300 }}>
                Te escribo para resumir tu consulta de hoy. La cefalea que presentas es de tipo
                tensional, muy común y tratable. Te he indicado paracetamol para aliviar el dolor.
              </p>
            </div>

            {/* Card 3 — próxima cita */}
            <div
              className="rounded-lg p-3"
              style={{ background: '#FAF8F4', border: '1px solid #E5E0D8' }}
            >
              <p
                className="text-[8px] tracking-[0.2em] uppercase mb-1"
                style={{ color: '#777', fontWeight: 400 }}
              >
                Tu próxima cita
              </p>
              <p className="text-[11px] mb-3" style={{ color: '#1A1A1A', fontWeight: 300 }}>
                jueves 15 de mayo de 2026 a las 9:00 AM
              </p>
              <div className="flex flex-col gap-2">
                <div
                  className="w-full text-center py-2 rounded-lg text-[10px]"
                  style={{ background: '#F5F0E5', color: '#1A1A1A', fontWeight: 300 }}
                >
                  ✅ Confirmar asistencia
                </div>
                <div
                  className="w-full text-center py-2 rounded-lg text-[10px]"
                  style={{ background: '#F5E5E5', color: '#1A1A1A', fontWeight: 300 }}
                >
                  ❌ No podré asistir
                </div>
              </div>
            </div>

            <p
              className="text-[9px] text-center mt-4"
              style={{ color: '#999', fontWeight: 300 }}
            >
              Hecho por un médico, para médicos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Card meta + alternating layout
   ────────────────────────────────────────────────────────────────── */
type CardMeta = {
  label: string
  heading: string
  description: string
  Mockup: React.FC<{ inView: boolean }>
}

const CARDS: CardMeta[] = [
  {
    label: 'GRABACIÓN',
    heading: 'Habla como si le contaras a un colega.',
    description:
      'Al terminar la consulta, presiona el botón NV y describe lo que encontraste. Sin formularios, sin escribir. Tu voz es suficiente.',
    Mockup: () => <RecordingMockup />,
  },
  {
    label: 'NOTA CLÍNICA',
    heading: 'De tu voz a una nota de evolución estructurada.',
    description:
      'Transcripción automática y nota clínica completa generada por IA — con diagnóstico, plan de tratamiento y signos de alarma. Lista para revisar en segundos.',
    Mockup: SoapNoteMockup,
  },
  {
    label: 'WHATSAPP',
    heading: 'Tu paciente recibe todo por WhatsApp.',
    description:
      'Resumen clínico, instrucciones de medicamentos, próxima cita — todo llega automáticamente al WhatsApp de tu paciente. Sin apps extra, sin descargas.',
    Mockup: WhatsAppMockup,
  },
  {
    label: 'RESUMEN',
    heading: 'Un resumen personalizado que tu paciente entiende.',
    description:
      'Página branded con saludo personalizado, notas de la consulta en lenguaje claro, y confirmación de próxima cita con un solo toque.',
    Mockup: () => <PatientSummaryMockup />,
  },
]

function FeatureCard({ card, index }: { card: CardMeta; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Mockup = card.Mockup

  // Cards at even indices (0, 2) — text on the left, image on the right.
  const reverse = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Mockup — first in DOM so it sits on top on mobile */}
        <div
          className={`flex justify-center ${
            reverse ? 'lg:order-2 lg:justify-end' : 'lg:order-1 lg:justify-start'
          }`}
        >
          <Mockup inView={inView} />
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
      {/* Local keyframes for pulse / ripple / blink — kept inside the file */}
      <style>{KEYFRAMES}</style>

      {/* Soft amber wash, anchored bottom-center */}
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
