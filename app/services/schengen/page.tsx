'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock, FileText, DollarSign, Globe, CheckCircle2 } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function SchengenVisaPage() {
  const requirements = [
    'Valid passport (minimum 6 months validity)',
    'Completed visa application form',
    'Passport-sized photographs (4x4 cm)',
    'Proof of financial means',
    'Travel insurance (minimum €30,000 cover)',
    'Hotel bookings or invitation letter',
    'Return flight ticket',
    'Bank statements (last 3 months)',
  ]

  const processSteps = [
    { step: 1, title: 'Document Preparation', description: 'Gather and verify all required documents' },
    { step: 2, title: 'Application Submission', description: 'Submit your online application with documents' },
    { step: 3, title: 'Visa Interview', description: 'Schedule and attend embassy interview' },
    { step: 4, title: 'Approval & Delivery', description: 'Receive your Schengen visa' },
  ]

  const faqs = [
    {
      q: 'How long is a Schengen visa valid?',
      a: 'Schengen visas are typically valid for 90 days within 180 days. Multiple entry visas are also available for frequent travelers.',
    },
    {
      q: 'Can I work on a Schengen tourist visa?',
      a: 'No, a tourist Schengen visa is only for tourism, business meetings, or visiting family. Work requires a specific work visa.',
    },
    {
      q: 'What if my visa application is rejected?',
      a: 'We provide full support for appeals and reapplications. Our team will help identify areas for improvement.',
    },
    {
      q: 'Do I need travel insurance for Schengen?',
      a: 'Yes, travel insurance with minimum €30,000 medical coverage is mandatory for all Schengen visa applications.',
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
                Schengen Visa
              </h1>
              <p className="text-xl text-muted-foreground mb-6">Travel across 27 European countries with a single Schengen visa</p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-surface-1 rounded-xl p-4">
                  <Clock className="w-6 h-6 text-green-primary mb-2" />
                  <p className="text-xs text-muted-foreground">Processing</p>
                  <p className="font-bold text-foreground">5-15 days</p>
                </div>
                <div className="bg-surface-1 rounded-xl p-4">
                  <Globe className="w-6 h-6 text-green-primary mb-2" />
                  <p className="text-xs text-muted-foreground">Validity</p>
                  <p className="font-bold text-foreground">90 days</p>
                </div>
                <div className="bg-surface-1 rounded-xl p-4">
                  <DollarSign className="w-6 h-6 text-green-primary mb-2" />
                  <p className="text-xs text-muted-foreground">Fee</p>
                  <p className="font-bold text-foreground">€80</p>
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
              <Image src="/images/dest-schengen.jpg" alt="Schengen Countries" fill className="object-cover" quality={85} />
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
          <h2 className="text-4xl font-bold text-white mb-4">Start Your Application Today</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Our expert team is ready to help you secure your Schengen visa. Apply now and get started on your European adventure.
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
