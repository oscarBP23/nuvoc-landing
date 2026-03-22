import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Stats from '@/components/Stats'
import HowItWorks from '@/components/HowItWorks'
import BentoGrid from '@/components/BentoGrid'
import BeforeAfter from '@/components/BeforeAfter'
import Pricing from '@/components/Pricing'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import { DarkToLight, LightToDark } from '@/components/SectionDivider'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        {/* ── Dark hero ── */}
        <Hero />

        {/* ── Dark → Light transition ── */}
        <DarkToLight />

        {/* ── Light body ── */}
        <Marquee />
        <Stats />
        <HowItWorks />
        <BentoGrid />
        <BeforeAfter />
        <Pricing />

        {/* ── Light → Dark transition ── */}
        <LightToDark />

        {/* ── Dark bookend CTA ── */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
