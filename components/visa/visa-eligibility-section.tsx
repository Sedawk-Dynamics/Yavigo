'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  CheckCircle, AlertCircle,
  CreditCard, Briefcase, Home, Heart, GraduationCap, Users
} from 'lucide-react'

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const eligibleCategories = [
  { icon: Briefcase, title: 'Business Traveler', desc: 'Attending meetings, conferences, or corporate events abroad.' },
  { icon: Heart, title: 'Tourist / Leisure', desc: 'Vacation, sightseeing, or personal travel to eligible destinations.' },
  { icon: GraduationCap, title: 'Student', desc: 'Enrolling in short courses, language programs, or academic exchange.' },
  { icon: Users, title: 'Family Visit', desc: 'Visiting immediate family members residing in the destination country.' },
  { icon: Home, title: 'Transit Passenger', desc: 'Passing through a country en route to your final destination.' },
  { icon: CreditCard, title: 'Medical Purpose', desc: 'Traveling for medical treatment or accompanying a patient.' },
]

const checklistItems = [
  { status: 'required', label: 'Passport valid for at least 6 months beyond travel dates' },
  { status: 'required', label: 'No prior visa refusals for the destination country (or can explain)' },
  { status: 'required', label: 'Sufficient financial funds to support your stay' },
  { status: 'required', label: 'Clear purpose of travel with supporting documentation' },
  { status: 'optional', label: 'Travel insurance (recommended; mandatory for Schengen)' },
  { status: 'optional', label: 'Confirmed accommodation bookings' },
  { status: 'optional', label: 'Return or onward travel tickets' },
  { status: 'note', label: 'Dual nationality holders may have different requirements' },
]

export default function VisaEligibilitySection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 bg-white" id="eligibility" aria-labelledby="eligibility-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">
            Eligibility Criteria
          </motion.p>
          <motion.h2
            id="eligibility-heading"
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold mb-4 text-balance font-display"
          >
            Who Can Apply?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Visa eligibility depends on your nationality, travel purpose, and destination. Here&apos;s a quick overview to help you understand if you qualify.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — categories */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--heading-color)' }}>
              Eligible Travel Categories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {eligibleCategories.map((cat, i) => (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className="flex items-start gap-3 p-4 bg-surface-1 rounded-2xl border border-border hover:border-green-primary/40 hover:bg-green-light/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-light flex items-center justify-center shrink-0 group-hover:bg-green-primary group-hover:text-white transition-colors">
                    <cat.icon className="w-5 h-5 text-green-primary group-hover:text-white transition-colors" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{cat.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{cat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Note box */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="mt-5 flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl"
              role="note"
            >
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-amber-800 leading-relaxed">
                <strong>Important:</strong> Eligibility varies by nationality and destination. Our visa experts will confirm your specific eligibility during the consultation.
              </p>
            </motion.div>
          </motion.div>

          {/* Right — checklist */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--heading-color)' }}>
              General Eligibility Checklist
            </h3>
            <div className="bg-surface-1 rounded-2xl border border-border overflow-hidden">
              {checklistItems.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 px-5 py-4 ${i < checklistItems.length - 1 ? 'border-b border-border' : ''}`}
                >
                  {item.status === 'required' && (
                    <CheckCircle className="w-5 h-5 text-green-primary shrink-0 mt-0.5" aria-label="Required" />
                  )}
                  {item.status === 'optional' && (
                    <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-label="Optional" />
                  )}
                  {item.status === 'note' && (
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" aria-label="Note" />
                  )}
                  <div>
                    <p className="text-sm text-foreground leading-relaxed">{item.label}</p>
                    <span
                      className={`text-xs font-medium mt-0.5 inline-block ${
                        item.status === 'required'
                          ? 'text-green-primary'
                          : item.status === 'optional'
                          ? 'text-blue-500'
                          : 'text-amber-600'
                      }`}
                    >
                      {item.status === 'required' ? 'Required' : item.status === 'optional' ? 'Recommended' : 'Note'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-4 px-1" aria-label="Checklist legend">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-primary" aria-hidden="true" />
                <span className="text-xs text-muted-foreground">Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" aria-hidden="true" />
                <span className="text-xs text-muted-foreground">Recommended</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" aria-hidden="true" />
                <span className="text-xs text-muted-foreground">Note</span>
              </div>
            </div>

            {/* CTA inside card */}
            <motion.a
              href="#apply-form"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-6 flex items-center justify-center gap-2 w-full py-3.5 bg-green-primary text-white font-semibold rounded-xl hover:bg-green-dark transition-colors shadow-md shadow-green-primary/20"
              aria-label="Check your visa eligibility"
            >
              Check Your Eligibility
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
