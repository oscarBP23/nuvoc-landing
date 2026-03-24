'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n-context'

export default function TimeSection() {
  const { t } = useI18n()

  // Split the label so we can color the last word amber
  const words = t.stats.label.split(' ')
  const lastWord = words[words.length - 1]
  const rest = words.slice(0, -1).join(' ')

  return (
    <section
      data-nav-dark
      style={{
        background: '#060607',
        padding: '120px 24px',
        textAlign: 'center',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 200,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            marginBottom: '1.25rem',
          }}
        >
          {rest}{' '}
          <span style={{ color: '#E8960A' }}>{lastWord}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontWeight: 200,
            color: 'rgba(240,237,232,0.6)',
            maxWidth: '560px',
            margin: '0 auto',
          }}
        >
          {t.bento.title}
        </motion.p>
      </div>
    </section>
  )
}
