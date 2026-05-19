import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import {
  StatsSection,
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
  title: 'Yavigo - Premium Visa Processing Solutions',
  description:
    'Expert visa processing for 180+ destinations. Fast approvals, secure online process, 95% success rate. Get your visa in 30 seconds with Yavigo.',
  keywords: 'visa application, e-visa, visa processing, passport visa, travel visa',
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsSection />
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
