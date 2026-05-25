import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import {
  DestinationsShowcase,
  ServicesSection,
  HowItWorksSection,
  WhyChooseUs,
  TestimonialsSection,
  BlogSection,
  CtaBand,
} from '@/components/homepage-sections'
import Footer from '@/components/footer'
import SectionDivider from '@/components/premium/SectionDivider'
import HUDMarker from '@/components/premium/HUDMarker'
import CinematicScene from '@/components/premium/CinematicScene'

export const metadata = {
  title: 'Yavigo – B2B Visa & Immigration Processing for Travel Partners',
  description:
    'Yavigo partners with travel agencies, corporates, and immigration consultants to deliver expert visa and immigration processing. Secure online workflows, dedicated specialists.',
  keywords: 'B2B visa services, immigration services, visa processing partner, e-visa, corporate visa, travel agency visa partner',
}

const homeSections = [
  { id: 'hero', label: 'Yavigo · Live Network' },
  { id: 'destinations', label: 'Popular Destinations' },
  { id: 'services', label: 'Visa & Immigration Services' },
  { id: 'process', label: 'How It Works' },
  { id: 'why-us', label: 'Why Yavigo' },
  { id: 'testimonials', label: 'Customer Reviews' },
  { id: 'blog', label: 'Guides & Visa Tips' },
  { id: 'cta', label: 'Apply for Visa' },
]

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <HUDMarker sections={homeSections} />

      <CinematicScene scene="01" name="LIVE NETWORK" enableBlur={false}>
        <HeroSection />
      </CinematicScene>

      <SectionDivider label="01 → 02 · TRANSITION" />

      <CinematicScene scene="02" name="DESTINATIONS" enableBlur={false} enableEntrance={false} variant="dark">
        <DestinationsShowcase />
      </CinematicScene>

      <SectionDivider label="02 → 03 · TRANSITION" />

      <CinematicScene scene="03" name="SERVICES">
        <ServicesSection />
      </CinematicScene>

      <SectionDivider label="03 → 04 · TRANSITION" />

      <CinematicScene scene="04" name="PROCESS">
        <HowItWorksSection />
      </CinematicScene>

      <SectionDivider label="04 → 05 · TRANSITION" />

      <CinematicScene scene="05" name="WHY YAVIGO">
        <WhyChooseUs />
      </CinematicScene>

      <SectionDivider label="05 → 06 · TRANSITION" />

      <CinematicScene scene="06" name="REVIEWS">
        <TestimonialsSection />
      </CinematicScene>

      <SectionDivider label="06 → 07 · TRANSITION" />

      <CinematicScene scene="07" name="GUIDES">
        <BlogSection />
      </CinematicScene>

      <CinematicScene scene="08" name="APPLY · CALL TO ACTION" variant="dark">
        <CtaBand />
      </CinematicScene>

      <Footer />
    </main>
  )
}
