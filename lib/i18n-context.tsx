'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { translations, Lang, Translations } from './i18n'

type I18nContextType = {
  lang: Lang
  t: Translations
  toggleLang: () => void
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es')

  const toggleLang = () => setLang((l) => (l === 'es' ? 'en' : 'es'))

  return (
    <I18nContext value={{ lang, t: translations[lang] as unknown as Translations, toggleLang }}>
      {children}
    </I18nContext>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
