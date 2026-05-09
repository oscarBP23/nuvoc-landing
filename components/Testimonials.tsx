"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Testimonial Data ───────────────────────────────────────────
// Only Joselin is live. Add future testimonials here — the component
// auto-shows arrows + dots when there are 2+ entries.

interface Testimonial {
  quote: string;
  highlight: string; // exact substring to render in amber
  name: string;
  role: string;
  initials: string;
  photoUrl?: string; // optional — falls back to initials
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Como odontóloga, siempre prioricé la calidad clínica. Pero había algo que descuidaba sin saberlo: asegurarme de que mi paciente se fuera entendiendo todo. NUVOC llenó ese vacío. Hoy mis atenciones son más completas, y mis pacientes lo sienten.",
    highlight: "NUVOC llenó ese vacío.",
    name: "Dra. Joselin Granados",
    role: "Odontóloga · Clínica Dental Vittali",
    initials: "JG",
    photoUrl: "/testimonials/joselin.jpg",
  },
  // ── Future testimonials ──
  // {
  //   quote: "...",
  //   highlight: "...",
  //   name: "Dr. ...",
  //   role: "Medicina General · San Pedro Sula",
  //   initials: "RM",
  //   photoUrl: "/testimonials/rm.jpg",
  // },
];

// ─── NV Arc Frame ───────────────────────────────────────────────
// Exact geometry from brand kit (160×160 viewBox). Photo floats
// inside the arc with breathing room. shape-rendering crisp on Retina.

function NvArcFrame({
  initials,
  photoUrl,
}: {
  initials: string;
  photoUrl?: string;
}) {
  return (
    <div className="relative shrink-0" style={{ width: 80, height: 80 }}>
      <img
        src="/brand/nuvoc_profile_500.svg"
        alt=""
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Floating photo / initials */}
      <div
        className="absolute overflow-hidden rounded-full flex items-center justify-center"
        style={{
          top: 12,
          left: 12,
          width: 56,
          height: 56,
          background: "#1E1E24",
        }}
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 15%" }}
            loading="lazy"
          />
        ) : (
          <span
            style={{
              fontSize: 18,
              fontWeight: 300,
              color: "#E8960A",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            {initials}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Quote renderer with amber highlight ────────────────────────

function HighlightedQuote({
  quote,
  highlight,
}: {
  quote: string;
  highlight: string;
}) {
  const idx = quote.indexOf(highlight);
  if (idx === -1) {
    return <>{quote}</>;
  }
  const before = quote.slice(0, idx);
  const after = quote.slice(idx + highlight.length);
  return (
    <>
      {before}
      <span style={{ color: "#E8960A" }}>{highlight}</span>
      {after}
    </>
  );
}

// ─── Main Component ─────────────────────────────────────────────

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;
  const showNav = total > 1;

  const goTo = useCallback(
    (i: number) => setCurrent(((i % total) + total) % total),
    [total]
  );

  // Auto-advance every 7 seconds (only when multiple testimonials)
  useEffect(() => {
    if (!showNav) return;
    const timer = setInterval(() => goTo(current + 1), 7000);
    return () => clearInterval(timer);
  }, [current, goTo, showNav]);

  return (
    <section
      className="w-full"
      style={{
        fontFamily: "Outfit, sans-serif",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      {/* Section label */}
      <div className="text-center" style={{ padding: "4rem 2rem 2rem" }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "#6B6865",
            fontWeight: 400,
          }}
        >
          Lo que dicen los médicos
        </span>
      </div>

      {/* Strip */}
      <div
        className="relative"
        style={{
          borderTop: "1px solid #2A2518",
          borderBottom: "1px solid #2A2518",
          minHeight: 200,
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            className="flex gap-6 items-start"
            style={{ padding: "2.25rem 2rem", willChange: "auto" }}
          >
            {/* Quotation mark */}
            <span
              className="shrink-0"
              style={{
                fontSize: 48,
                color: "#E8960A",
                fontFamily: "Georgia, serif",
                lineHeight: 1,
                marginTop: -6,
              }}
            >
              &ldquo;
            </span>

            {/* Quote body */}
            <div className="flex-1" style={{ maxWidth: 720 }}>
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 200,
                  lineHeight: 1.75,
                  color: "#F0EDE8",
                  marginBottom: "1.25rem",
                }}
              >
                <HighlightedQuote
                  quote={testimonials[current].quote}
                  highlight={testimonials[current].highlight}
                />
              </p>

              {/* Author row */}
              <div className="flex items-center gap-3.5">
                <NvArcFrame
                  initials={testimonials[current].initials}
                  photoUrl={testimonials[current].photoUrl}
                />
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 300,
                      color: "#F0EDE8",
                    }}
                  >
                    {testimonials[current].name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: "#888581",
                      marginTop: 2,
                    }}
                  >
                    {testimonials[current].role}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows — only shown with 2+ testimonials */}
        {showNav && (
          <>
            <button
              onClick={() => goTo(current - 1)}
              aria-label="Anterior"
              className="absolute top-1/2 -translate-y-1/2 left-2 flex items-center justify-center cursor-pointer"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: "1px solid #2A2518",
                background: "#0D0D10",
                color: "#E8960A",
                fontSize: 16,
                transition: "border-color 0.25s, background 0.25s",
                zIndex: 2,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#E8960A";
                e.currentTarget.style.background = "#1A1610";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#2A2518";
                e.currentTarget.style.background = "#0D0D10";
              }}
            >
              ‹
            </button>
            <button
              onClick={() => goTo(current + 1)}
              aria-label="Siguiente"
              className="absolute top-1/2 -translate-y-1/2 right-2 flex items-center justify-center cursor-pointer"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: "1px solid #2A2518",
                background: "#0D0D10",
                color: "#E8960A",
                fontSize: 16,
                transition: "border-color 0.25s, background 0.25s",
                zIndex: 2,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#E8960A";
                e.currentTarget.style.background = "#1A1610";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#2A2518";
                e.currentTarget.style.background = "#0D0D10";
              }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dots — only shown with 2+ testimonials */}
      {showNav && (
        <div
          className="flex justify-center gap-2"
          style={{ padding: "1.25rem 0 2rem" }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Testimonio ${i + 1}`}
              className="cursor-pointer"
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                border: "none",
                background: i === current ? "#E8960A" : "#6B6865",
                transform: i === current ? "scale(1.3)" : "scale(1)",
                transition: "background 0.4s, transform 0.4s",
                padding: 0,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
