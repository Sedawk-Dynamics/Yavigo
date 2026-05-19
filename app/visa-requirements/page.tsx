'use client'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import VisaHeroSection from '@/components/visa/visa-hero-section'
import VisaVideoSection from '@/components/visa/visa-video-section'
import VisaDestinationsSection from '@/components/visa/visa-destinations-section'
import VisaEligibilitySection from '@/components/visa/visa-eligibility-section'
import VisaProcessSection from '@/components/visa/visa-process-section'
import VisaDocumentsSection from '@/components/visa/visa-documents-section'
import VisaFormSection from '@/components/visa/visa-form-section'
import VisaFaqSection from '@/components/visa/visa-faq-section'
import VisaCtaBand from '@/components/visa/visa-cta-band'

export default function VisaRequirementsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <VisaHeroSection />
        <VisaVideoSection />
        <VisaDestinationsSection />
        <VisaEligibilitySection />
        <VisaProcessSection />
        <VisaDocumentsSection />
        <VisaFormSection />
        <VisaFaqSection />
        <VisaCtaBand />
      </main>
      <Footer />
    </>
  )
}
