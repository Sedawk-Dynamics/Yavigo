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

export const metadata = {
  title: 'Yavigo – B2B Visa & Immigration Processing for Travel Partners',
  description:
    'Yavigo partners with travel agencies, corporates, and immigration consultants to deliver expert visa and immigration processing. Secure online workflows, dedicated specialists.',
  keywords: 'B2B visa services, immigration services, visa processing partner, e-visa, corporate visa, travel agency visa partner',
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <DestinationsShowcase />
      <ServicesSection />
      <HowItWorksSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <BlogSection />
      <CtaBand />
      <Footer />
    </main>
  )
}
