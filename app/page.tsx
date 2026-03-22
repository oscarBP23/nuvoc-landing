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

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <HowItWorks />
        <BentoGrid />
        <BeforeAfter />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
