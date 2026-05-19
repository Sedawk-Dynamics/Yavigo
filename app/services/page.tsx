'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Globe, Clock, Shield, CheckCircle } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const visaTypes = [
  {
    id: 'schengen',
    name: 'Schengen Visa',
    region: 'Europe',
    icon: '🇪🇺',
    processing: '5-15 days',
    validity: '90 days',
    description: 'Travel to 27 Schengen countries including France, Germany, Italy, and more.',
    features: [
      'Online document submission',
      'No passport submission required',
      'Multiple entry visa available',
      'Fast-track processing',
    ],
  },
  {
    id: 'uk',
    name: 'UK Visa',
    region: 'United Kingdom',
    icon: '🇬🇧',
    processing: '7-20 days',
    validity: '6-12 months',
    description: 'Visit or work in the United Kingdom with our expert visa guidance.',
    features: [
      'Standard & expedited processing',
      'Complete documentation support',
      'BRP collection assistance',
      'Real-time visa status tracking',
    ],
  },
  {
    id: 'dubai',
    name: 'Dubai E-Visa',
    region: 'UAE',
    icon: '🇦🇪',
    processing: '1-2 days',
    validity: '30-90 days',
    description: 'Get your Dubai e-visa in just 48 hours with our streamlined process.',
    features: [
      'Instant e-visa approval',
      'No embassy visit required',
      'Multiple entry option',
      'Lowest processing fee',
    ],
  },
  {
    id: 'usa',
    name: 'USA Visa',
    region: 'United States',
    icon: '🇺🇸',
    processing: '10-30 days',
    validity: '6 months - 10 years',
    description: 'Complete US visa application support for tourism, business, and work.',
    features: [
      'Interview preparation',
      'DS-160 form assistance',
      'Document compilation',
      'Embassy appointment scheduling',
    ],
  },
  {
    id: 'canada',
    name: 'Canada Visa',
    region: 'Canada',
    icon: '🇨🇦',
    processing: '15-30 days',
    validity: '6 months - 3 years',
    description: 'Secure your Canada visa for tourism, study, or work permits.',
    features: [
      'TRV & work permit support',
      'Biometric enrolment guidance',
      'Medical exam arrangement',
      'Express processing available',
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function ServicesPage() {
  return (
    <main className="bg-white">
      <Navbar />

      {/* Hero section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-white via-white to-green-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl lg:text-6xl font-bold text-balance mb-4" style={{ color: 'var(--heading-color)' }}>
              B2B Visa & Immigration Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Comprehensive visa and immigration capabilities for 100+ destinations — built for travel partners and corporates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visa grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visaTypes.map((visa) => (
              <motion.div key={visa.id} variants={itemVariants}>
                <Link href={`/services/${visa.id}`}>
                  <div className="group h-full rounded-2xl border border-border bg-white hover:border-green-primary hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer">
                    {/* Header */}
                    <div className="p-6 border-b border-border bg-gradient-to-r from-green-light to-white">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-4xl">{visa.icon}</span>
                        <ArrowRight className="w-5 h-5 text-green-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{visa.name}</h3>
                      <p className="text-sm text-green-primary font-medium">{visa.region}</p>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-sm text-muted-foreground mb-4">{visa.description}</p>

                      {/* Key details */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="flex items-center gap-2 text-xs">
                          <Clock className="w-4 h-4 text-green-primary shrink-0" />
                          <span className="text-foreground font-medium">{visa.processing}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <CheckCircle className="w-4 h-4 text-green-primary shrink-0" />
                          <span className="text-foreground font-medium">{visa.validity}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <ul className="space-y-2">
                        {visa.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-border bg-surface-1 group-hover:bg-green-light/30 transition-colors">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-primary">
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-primary to-green-bright">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Apply?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Choose your visa type and start your application today. Our experts are here to guide you through every step.
            </p>
            <Link href="/contact">
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-primary font-bold rounded-xl hover:shadow-lg transition-all cursor-pointer">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
