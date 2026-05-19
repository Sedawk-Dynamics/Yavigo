'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  MapPin, Upload, CreditCard, Download,
  ArrowRight, CheckCircle
} from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: MapPin,
    title: 'Select Your Destination & Travel Dates',
    desc: 'Choose your destination country and visa type from our 180+ country database. Set your travel dates and number of travelers.',
    highlights: ['180+ destinations', 'Multiple visa types', 'Group applications'],
    color: 'bg-green-light',
    iconColor: 'text-green-primary',
    borderColor: 'border-green-primary/30',
  },
  {
    number: '02',
    icon: Upload,
    title: 'Upload Your Documents Securely',
    desc: 'Upload your passport, photograph, and required documents through our encrypted portal. No physical submission needed for e-visas.',
    highlights: ['Bank-grade encryption', 'No physical handover', 'Instant verification'],
    color: 'bg-blue-50',
    iconColor: 'text-blue-500',
    borderColor: 'border-blue-200',
  },
  {
    number: '03',
    icon: CreditCard,
    title: 'Make a Secure Payment',
    desc: 'Pay the visa fee and our processing charge through our secure payment gateway. Multiple payment options available.',
    highlights: ['Secure checkout', 'Multiple currencies', 'Fee transparency'],
    color: 'bg-orange-50',
    iconColor: 'text-orange-500',
    borderColor: 'border-orange-200',
  },
  {
    number: '04',
    icon: Download,
    title: 'Receive Your Visa',
    desc: 'Get your e-visa delivered to your inbox within the processing time. Download and print or save digitally — ready to travel!',
    highlights: ['Email delivery', 'Digital & printable', 'Expert review included'],
    color: 'bg-teal-50',
    iconColor: 'text-teal-500',
    borderColor: 'border-teal-200',
  },
]

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function VisaProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 bg-surface-1 overflow-hidden" id="process" aria-labelledby="process-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">
            Application Process
          </motion.p>
          <motion.h2
            id="process-heading"
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold mb-4 text-balance font-display"
          >
            How to Apply for a Visa in{' '}
            <span className="text-green-primary">4 Simple Steps</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our streamlined process takes the complexity out of visa applications. Most applicants complete the entire process in under 30 minutes.
          </motion.p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
          {/* Connector line */}
          <div
            className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-green-primary/25"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.13, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`relative bg-white rounded-2xl border ${step.borderColor} p-6 hover:shadow-lg transition-all group`}
            >
              {/* Number + Icon */}
              <div className="relative flex items-center gap-3 mb-5">
                <div className={`w-14 h-14 rounded-2xl ${step.color} ${step.borderColor} border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <step.icon className={`w-7 h-7 ${step.iconColor}`} aria-hidden="true" />
                </div>
                <span className="text-4xl font-black text-foreground/8 leading-none select-none" aria-hidden="true">
                  {step.number}
                </span>
              </div>

              <h3 className="font-bold text-base mb-2 leading-snug" style={{ color: 'var(--heading-color)' }}>
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{step.desc}</p>

              {/* Highlights */}
              <ul className="space-y-1.5" aria-label={`${step.title} highlights`}>
                {step.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-primary shrink-0" aria-hidden="true" />
                    <span className="text-xs text-muted-foreground">{h}</span>
                  </li>
                ))}
              </ul>

              {/* Arrow (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-2.5 top-14 z-10 w-5 h-5 bg-white border border-green-primary/30 rounded-full items-center justify-center" aria-hidden="true">
                  <ArrowRight className="w-3 h-3 text-green-primary" />
                </div>
              )}
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <a
            href="#apply-form"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-primary text-white font-semibold rounded-xl hover:bg-green-dark transition-all shadow-lg shadow-green-primary/20 btn-glow"
            aria-label="Start your visa application"
          >
            Start Your Application
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <p className="text-xs text-muted-foreground mt-3">
            Takes less than 30 minutes · 95% approval rate · Expert support included
          </p>
        </motion.div>
      </div>
    </section>
  )
}
