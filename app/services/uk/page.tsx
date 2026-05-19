'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock, FileText, DollarSign, Globe, CheckCircle2 } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function UKVisaPage() {
  const requirements = [
    'Valid passport (minimum 6 months validity beyond stay)',
    'Biometric residence permit (if applicable)',
    'Completed visa application form (TRV)',
    'Passport-sized photographs',
    'Proof of financial means',
    'Accommodation booking or invitation letter',
    'Return flight ticket',
    'Travel insurance',
    'Criminal record clearance',
  ]

  const processSteps = [
    { step: 1, title: 'Create Account', description: 'Register on UK visa portal' },
    { step: 2, title: 'Fill DS-160', description: 'Complete online form & pay fee' },
    { step: 3, title: 'Book Appointment', description: 'Schedule biometrics & interview' },
    { step: 4, title: 'Receive Visa', description: 'Passport returned with visa' },
  ]

  const faqs = [
    {
      q: 'How long can I stay on a Standard Visitor Visa?',
      a: 'Standard Visitor Visas allow stays of up to 6 months. Extensions are possible but must be requested before your visa expires.',
    },
    {
      q: 'Can I work on a UK Visitor Visa?',
      a: 'No, you cannot work on a Visitor Visa. You need a specific Work Visa or Skilled Worker Visa. We can help you apply for those.',
    },
    {
      q: 'What is the current processing time?',
      a: 'Standard processing takes 3 weeks. Priority service (1-2 weeks) and Super Priority (24-48 hours) options are available.',
    },
    {
      q: 'Do I need travel insurance for UK visa?',
      a: 'While not mandatory, travel insurance is highly recommended and shows financial responsibility to immigration officers.',
    },
  ]

  return (
    <main className="bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-white via-white to-green-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="inline-flex items-center gap-2 text-green-primary font-medium mb-6 hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="section-label mb-4">VISA SERVICES</p>
              <h1 className="text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--heading-color)' }}>
                UK Visa
              </h1>
              <p className="text-xl text-muted-foreground mb-6">Visit, work, or study in the United Kingdom</p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-surface-1 rounded-xl p-4">
                  <Clock className="w-6 h-6 text-green-primary mb-2" />
                  <p className="text-xs text-muted-foreground">Processing</p>
                  <p className="font-bold text-foreground">7-20 days</p>
                </div>
                <div className="bg-surface-1 rounded-xl p-4">
                  <Globe className="w-6 h-6 text-green-primary mb-2" />
                  <p className="text-xs text-muted-foreground">Validity</p>
                  <p className="font-bold text-foreground">6-12 months</p>
                </div>
                <div className="bg-surface-1 rounded-xl p-4">
                  <DollarSign className="w-6 h-6 text-green-primary mb-2" />
                  <p className="text-xs text-muted-foreground">Fee</p>
                  <p className="font-bold text-foreground">£100</p>
                </div>
              </div>

              <Link href="/contact">
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 px-8 py-4 bg-green-primary text-white font-bold rounded-xl hover:bg-green-dark transition-colors cursor-pointer">
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative h-96 rounded-2xl overflow-hidden">
              <Image src="/images/dest-london.jpg" alt="UK" fill className="object-cover" quality={85} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12" style={{ color: 'var(--heading-color)' }}>
            Document Requirements
          </h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="grid md:grid-cols-2 gap-6">
            {requirements.map((req, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex gap-3 p-4 rounded-xl bg-surface-1 border border-border hover:border-green-primary transition-colors">
                <CheckCircle2 className="w-5 h-5 text-green-primary shrink-0 mt-0.5" />
                <p className="text-foreground">{req}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-surface-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12" style={{ color: 'var(--heading-color)' }}>
            Application Process
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            {processSteps.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative">
                <div className="bg-white rounded-xl p-6 border border-border h-full">
                  <div className="w-10 h-10 rounded-full bg-green-primary text-white font-bold flex items-center justify-center mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {i < processSteps.length - 1 && <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-green-primary/30" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: 'var(--heading-color)' }}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.details key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group rounded-xl border border-border bg-white hover:border-green-primary transition-colors">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-foreground">
                  {faq.q}
                  <span className="text-green-primary group-open:rotate-180 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 text-muted-foreground border-t border-border">{faq.a}</div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-primary to-green-bright">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready for Your UK Adventure?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Apply for your UK visa today with our comprehensive support and expert guidance throughout the process.
          </p>
          <Link href="/contact">
            <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-primary font-bold rounded-xl hover:shadow-lg transition-all cursor-pointer">
              Apply for Visa
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
