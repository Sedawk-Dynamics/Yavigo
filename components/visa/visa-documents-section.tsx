'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FileText, Camera, CreditCard, Plane, Building, Globe, CheckCircle, Info, ChevronDown } from 'lucide-react'

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const docCategories = [
  {
    id: 'identity',
    icon: FileText,
    title: 'Identity Documents',
    color: 'bg-green-light',
    iconColor: 'text-green-primary',
    docs: [
      { name: 'Valid Passport', note: 'Min. 6 months validity beyond travel; 2 blank pages', required: true },
      { name: 'National ID / Birth Certificate', note: 'Original + certified copy', required: false },
      { name: 'Previous Passports', note: 'If any visas from destination country', required: false },
    ],
  },
  {
    id: 'photo',
    icon: Camera,
    title: 'Photograph',
    color: 'bg-blue-50',
    iconColor: 'text-blue-500',
    docs: [
      { name: 'Recent Passport Photo', note: '35mm × 45mm, white background, not older than 3 months', required: true },
      { name: 'Digital Photo', note: 'JPEG format, min 300 DPI for online applications', required: true },
    ],
  },
  {
    id: 'financial',
    icon: CreditCard,
    title: 'Financial Proof',
    color: 'bg-orange-50',
    iconColor: 'text-orange-500',
    docs: [
      { name: 'Bank Statement', note: 'Last 3–6 months showing sufficient funds', required: true },
      { name: 'Salary Slips / Employment Letter', note: 'Last 3 months; on company letterhead', required: true },
      { name: 'Income Tax Returns', note: 'Last 2 years (for some destinations)', required: false },
      { name: 'Sponsor Letter', note: 'If sponsored by third party, with bank proof', required: false },
    ],
  },
  {
    id: 'travel',
    icon: Plane,
    title: 'Travel Documents',
    color: 'bg-teal-50',
    iconColor: 'text-teal-500',
    docs: [
      { name: 'Flight Itinerary', note: 'Confirmed return/onward booking (not necessarily ticketed)', required: true },
      { name: 'Travel Insurance', note: 'Min. €30,000 coverage; mandatory for Schengen', required: false },
      { name: 'Visa Application Form', note: 'Completed and signed; we handle this for you', required: true },
    ],
  },
  {
    id: 'accommodation',
    icon: Building,
    title: 'Accommodation Proof',
    color: 'bg-purple-50',
    iconColor: 'text-purple-500',
    docs: [
      { name: 'Hotel Booking Confirmation', note: 'For entire duration of stay', required: true },
      { name: 'Host Invitation Letter', note: 'If staying with family/friends (notarized)', required: false },
      { name: 'Rental Agreement', note: 'If renting an apartment', required: false },
    ],
  },
  {
    id: 'purpose',
    icon: Globe,
    title: 'Purpose of Visit',
    color: 'bg-pink-50',
    iconColor: 'text-pink-500',
    docs: [
      { name: 'Business Invitation Letter', note: 'On company letterhead with registration details', required: false },
      { name: 'Conference/Event Registration', note: 'Official confirmation from organizer', required: false },
      { name: 'Student Enrolment Letter', note: 'From educational institution', required: false },
      { name: 'Medical Appointment Letter', note: 'From healthcare provider', required: false },
    ],
  },
]

export default function VisaDocumentsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section className="py-24 bg-white" id="documents" aria-labelledby="documents-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">
            Required Documents
          </motion.p>
          <motion.h2
            id="documents-heading"
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold mb-4 text-balance font-display"
          >
            What Documents Do You Need?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Document requirements vary by destination and visa type. Below is a comprehensive guide. Our experts will confirm your specific list during the application process.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {docCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="bg-surface-1 rounded-2xl border border-border overflow-hidden"
            >
              {/* Header — toggle */}
              <button
                onClick={() => setExpanded(expanded === cat.id ? null : cat.id)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-surface-2 transition-colors"
                aria-expanded={expanded === cat.id}
                aria-controls={`doc-panel-${cat.id}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center shrink-0`}>
                    <cat.icon className={`w-5 h-5 ${cat.iconColor}`} aria-hidden="true" />
                  </div>
                  <span className="font-semibold text-foreground text-sm">{cat.title}</span>
                </div>
                <motion.div
                  animate={{ rotate: expanded === cat.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                </motion.div>
              </button>

              {/* Expandable document list */}
              <AnimatePresence initial={false}>
                {expanded === cat.id && (
                  <motion.div
                    id={`doc-panel-${cat.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                    role="region"
                    aria-label={`${cat.title} documents`}
                  >
                    <ul className="px-5 pb-5 space-y-3 border-t border-border">
                      {cat.docs.map((doc, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 pt-3"
                        >
                          <CheckCircle
                            className={`w-4 h-4 shrink-0 mt-0.5 ${doc.required ? 'text-green-primary' : 'text-muted-foreground'}`}
                            aria-label={doc.required ? 'Required' : 'Optional'}
                          />
                          <div>
                            <p className="text-sm font-medium text-foreground">{doc.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{doc.note}</p>
                            <span
                              className={`text-xs font-medium ${doc.required ? 'text-green-primary' : 'text-muted-foreground'}`}
                            >
                              {doc.required ? 'Required' : 'If applicable'}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Info note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-8 flex gap-3 p-5 bg-green-light border border-green-primary/20 rounded-2xl"
          role="note"
        >
          <Info className="w-5 h-5 text-green-primary shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-green-dark mb-1">Our Document Assistance Service</p>
            <p className="text-sm text-green-dark/80 leading-relaxed">
              Not sure if your documents meet the requirements? Our visa experts will review your documents for free before submission, ensuring you have everything needed for a smooth application.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
