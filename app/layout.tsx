import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { I18nProvider } from '@/lib/i18n-context'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NUVOC — Documentación clínica en 30 segundos',
  description:
    'Graba tu voz después de cada consulta. NUVOC genera la nota SOAP y tu paciente recibe su resumen por WhatsApp. Automatización clínica para médicos en Latinoamérica.',
  keywords: ['SOAP notes', 'clinical documentation', 'WhatsApp', 'AI medical', 'LATAM'],
  openGraph: {
    title: 'NUVOC — Tu voz documenta. WhatsApp entrega.',
    description:
      'Habla 30 segundos después de cada consulta. IA genera la nota SOAP, WhatsApp entrega el resumen.',
    url: 'https://nuvoc.health',
    siteName: 'NUVOC',
    locale: 'es_LATAM',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${outfit.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#060607] text-white font-[family-name:var(--font-outfit)] font-extralight antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
