'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle, Phone, User, Mail, MapPin, Calendar, Users, Upload, Loader2 } from 'lucide-react'

const COUNTRIES = [
  'Dubai, UAE', 'France', 'United Kingdom', 'Thailand', 'United States',
  'Canada', 'Singapore', 'Australia', 'Germany', 'Italy', 'Netherlands',
  'Spain', 'Turkey', 'Malaysia', 'Vietnam', 'Switzerland',
]

const VISA_TYPES: Record<string, string[]> = {
  'Dubai, UAE': ['Tourist Visa (30 days)', 'Tourist Visa (90 days)', 'Transit Visa', 'Business Visa'],
  'France': ['Short-Stay Schengen (Type C)', 'Long-Stay (Type D)', 'Transit'],
  'United Kingdom': ['Standard Visitor Visa', 'Business Visa', 'Family Visit', 'Transit Without Visa'],
  'United States': ['B1 (Business)', 'B2 (Tourist)', 'B1/B2 Combined', 'C1/D Transit'],
  'Canada': ['Visitor Visa', 'eTA', 'Super Visa (Parents)', 'Business Visa'],
  default: ['Tourist Visa', 'Business Visa', 'Transit Visa', 'Family Visit'],
}

const steps = ['Destination', 'Personal Info', 'Travel Details', 'Review']

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function VisaFormSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [currentStep, setCurrentStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    country: '',
    visaType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    travelDate: '',
    returnDate: '',
    travelers: '1',
    notes: '',
  })

  function update(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const visaOptions = VISA_TYPES[form.country] || VISA_TYPES.default

  function next() {
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1)
  }

  function back() {
    if (currentStep > 0) setCurrentStep((s) => s - 1)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1600))
    setSubmitting(false)
    setSubmitted(true)
  }

  const progress = ((currentStep) / (steps.length - 1)) * 100

  return (
    <section className="py-24 bg-surface-1 overflow-hidden" id="apply-form" aria-labelledby="form-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="section-label mb-3">Apply Now</p>
          <h2
            id="form-heading"
            className="text-4xl sm:text-5xl font-bold mb-4 text-balance font-display"
          >
            Apply for Your Visa
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Complete the form below and our visa experts will reach out within 2 hours with a personalised action plan.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-white rounded-3xl border border-border shadow-xl shadow-black/5 overflow-hidden"
        >
          {submitted ? (
            /* Success state */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 text-center"
            >
              <div className="w-20 h-20 bg-green-light rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-primary" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--heading-color)' }}>
                Application Received!
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
                Thank you, {form.firstName}! Our visa experts will review your request and contact you at <strong>{form.email}</strong> within 2 hours with next steps.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => { setSubmitted(false); setCurrentStep(0); setForm({ country: '', visaType: '', firstName: '', lastName: '', email: '', phone: '', nationality: '', travelDate: '', returnDate: '', travelers: '1', notes: '' }) }}
                  className="px-6 py-3 bg-green-primary text-white font-semibold rounded-xl hover:bg-green-dark transition-colors"
                >
                  Start Another Application
                </button>
                <a href="/contact" className="px-6 py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-surface-1 transition-colors">
                  Contact Support
                </a>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Progress bar */}
              <div className="bg-surface-1 border-b border-border px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-3">
                  {steps.map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          i < currentStep
                            ? 'bg-green-primary text-white'
                            : i === currentStep
                            ? 'bg-green-primary text-white ring-4 ring-green-primary/20'
                            : 'bg-surface-2 text-muted-foreground border border-border'
                        }`}
                        aria-current={i === currentStep ? 'step' : undefined}
                      >
                        {i < currentStep ? <CheckCircle className="w-4 h-4" aria-hidden="true" /> : i + 1}
                      </div>
                      <span
                        className={`hidden sm:block text-xs font-medium transition-colors ${
                          i === currentStep ? 'text-green-primary' : i < currentStep ? 'text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {step}
                      </span>
                      {i < steps.length - 1 && (
                        <div className="hidden sm:block w-12 lg:w-20 h-px bg-border mx-2" aria-hidden="true" />
                      )}
                    </div>
                  ))}
                </div>
                {/* Progress line */}
                <div className="h-1 bg-surface-2 rounded-full overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
                  <motion.div
                    className="h-full bg-green-primary rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="p-6 sm:p-8 min-h-80">
                  <AnimatePresence mode="wait">
                    {/* STEP 0 — Destination */}
                    {currentStep === 0 && (
                      <motion.div
                        key="step0"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, x: -16 }}
                        className="space-y-5"
                      >
                        <h3 className="font-bold text-lg" style={{ color: 'var(--heading-color)' }}>
                          Where are you traveling to?
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="country" className="block text-sm font-medium text-foreground mb-1.5">
                              Destination Country <span className="text-destructive" aria-label="required">*</span>
                            </label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                              <select
                                id="country"
                                value={form.country}
                                onChange={(e) => { update('country', e.target.value); update('visaType', '') }}
                                className="w-full pl-9 pr-4 py-3 bg-surface-1 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary transition-all appearance-none"
                                required
                                aria-required="true"
                              >
                                <option value="">Select destination</option>
                                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                              </select>
                            </div>
                          </div>
                          <div>
                            <label htmlFor="visaType" className="block text-sm font-medium text-foreground mb-1.5">
                              Visa Type <span className="text-destructive" aria-label="required">*</span>
                            </label>
                            <select
                              id="visaType"
                              value={form.visaType}
                              onChange={(e) => update('visaType', e.target.value)}
                              className="w-full px-4 py-3 bg-surface-1 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary transition-all appearance-none"
                              required
                              disabled={!form.country}
                              aria-required="true"
                            >
                              <option value="">Select visa type</option>
                              {visaOptions.map((v) => <option key={v} value={v}>{v}</option>)}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="travelers" className="block text-sm font-medium text-foreground mb-1.5">
                            Number of Travelers
                          </label>
                          <div className="relative">
                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                            <select
                              id="travelers"
                              value={form.travelers}
                              onChange={(e) => update('travelers', e.target.value)}
                              className="w-full pl-9 pr-4 py-3 bg-surface-1 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary transition-all appearance-none max-w-xs"
                            >
                              {[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n} value={n}>{n} traveler{n > 1 ? 's' : ''}</option>)}
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 1 — Personal Info */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, x: -16 }}
                        className="space-y-5"
                      >
                        <h3 className="font-bold text-lg" style={{ color: 'var(--heading-color)' }}>
                          Your personal details
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {[
                            { key: 'firstName', label: 'First Name', icon: User, placeholder: 'John', type: 'text' },
                            { key: 'lastName', label: 'Last Name', icon: User, placeholder: 'Doe', type: 'text' },
                          ].map((field) => (
                            <div key={field.key}>
                              <label htmlFor={field.key} className="block text-sm font-medium text-foreground mb-1.5">
                                {field.label} <span className="text-destructive" aria-label="required">*</span>
                              </label>
                              <div className="relative">
                                <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                                <input
                                  id={field.key}
                                  type={field.type}
                                  value={(form as any)[field.key]}
                                  onChange={(e) => update(field.key, e.target.value)}
                                  placeholder={field.placeholder}
                                  className="w-full pl-9 pr-4 py-3 bg-surface-1 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary transition-all"
                                  required
                                  aria-required="true"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                              Email Address <span className="text-destructive" aria-label="required">*</span>
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                              <input
                                id="email"
                                type="email"
                                value={form.email}
                                onChange={(e) => update('email', e.target.value)}
                                placeholder="john@example.com"
                                className="w-full pl-9 pr-4 py-3 bg-surface-1 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary transition-all"
                                required
                                aria-required="true"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                              Phone Number
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                              <input
                                id="phone"
                                type="tel"
                                value={form.phone}
                                onChange={(e) => update('phone', e.target.value)}
                                placeholder="+1 234 567 8900"
                                className="w-full pl-9 pr-4 py-3 bg-surface-1 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary transition-all"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="nationality" className="block text-sm font-medium text-foreground mb-1.5">
                            Nationality / Passport Country <span className="text-destructive" aria-label="required">*</span>
                          </label>
                          <input
                            id="nationality"
                            type="text"
                            value={form.nationality}
                            onChange={(e) => update('nationality', e.target.value)}
                            placeholder="e.g. Indian, British, American"
                            className="w-full px-4 py-3 bg-surface-1 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary transition-all"
                            required
                            aria-required="true"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2 — Travel Details */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, x: -16 }}
                        className="space-y-5"
                      >
                        <h3 className="font-bold text-lg" style={{ color: 'var(--heading-color)' }}>
                          Travel dates & additional info
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="travelDate" className="block text-sm font-medium text-foreground mb-1.5">
                              Travel Date <span className="text-destructive" aria-label="required">*</span>
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                              <input
                                id="travelDate"
                                type="date"
                                value={form.travelDate}
                                onChange={(e) => update('travelDate', e.target.value)}
                                className="w-full pl-9 pr-4 py-3 bg-surface-1 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary transition-all"
                                required
                                aria-required="true"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="returnDate" className="block text-sm font-medium text-foreground mb-1.5">
                              Return Date
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                              <input
                                id="returnDate"
                                type="date"
                                value={form.returnDate}
                                onChange={(e) => update('returnDate', e.target.value)}
                                className="w-full pl-9 pr-4 py-3 bg-surface-1 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary transition-all"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-1.5">
                            Additional Notes
                          </label>
                          <textarea
                            id="notes"
                            value={form.notes}
                            onChange={(e) => update('notes', e.target.value)}
                            placeholder="Any specific requirements, previous visa refusals, or questions for our team..."
                            rows={4}
                            className="w-full px-4 py-3 bg-surface-1 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary transition-all resize-none"
                          />
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-green-light/50 border border-green-primary/20 rounded-xl">
                          <Upload className="w-5 h-5 text-green-primary shrink-0 mt-0.5" aria-hidden="true" />
                          <p className="text-sm text-green-dark">
                            <strong>Document upload:</strong> After submission, our team will send you a secure upload link to share your passport and supporting documents.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3 — Review */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, x: -16 }}
                        className="space-y-4"
                      >
                        <h3 className="font-bold text-lg" style={{ color: 'var(--heading-color)' }}>
                          Review your application
                        </h3>
                        <div className="bg-surface-1 rounded-2xl border border-border divide-y divide-border overflow-hidden">
                          {[
                            { label: 'Destination', value: form.country || '—' },
                            { label: 'Visa Type', value: form.visaType || '—' },
                            { label: 'Travelers', value: `${form.travelers} traveler${Number(form.travelers) > 1 ? 's' : ''}` },
                            { label: 'Name', value: `${form.firstName} ${form.lastName}`.trim() || '—' },
                            { label: 'Email', value: form.email || '—' },
                            { label: 'Phone', value: form.phone || '—' },
                            { label: 'Nationality', value: form.nationality || '—' },
                            { label: 'Travel Date', value: form.travelDate || '—' },
                            { label: 'Return Date', value: form.returnDate || '—' },
                          ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between px-5 py-3">
                              <span className="text-xs text-muted-foreground font-medium">{item.label}</span>
                              <span className="text-sm text-foreground font-medium text-right max-w-[60%]">{item.value}</span>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          By submitting, you agree to our{' '}
                          <a href="#" className="text-green-primary hover:underline">Terms of Service</a>
                          {' '}and{' '}
                          <a href="#" className="text-green-primary hover:underline">Privacy Policy</a>.
                          Our team will contact you within 2 hours.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between gap-4 px-6 sm:px-8 py-5 bg-surface-1 border-t border-border">
                  <button
                    type="button"
                    onClick={back}
                    className={`flex items-center gap-2 px-5 py-2.5 border border-border text-foreground font-medium rounded-xl hover:bg-surface-2 transition-colors text-sm ${currentStep === 0 ? 'invisible' : ''}`}
                    aria-label="Go to previous step"
                  >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    Back
                  </button>

                  {currentStep < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={next}
                      className="flex items-center gap-2 px-6 py-2.5 bg-green-primary text-white font-semibold rounded-xl hover:bg-green-dark transition-colors text-sm ml-auto"
                      aria-label="Go to next step"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex items-center gap-2 px-6 py-2.5 bg-green-primary text-white font-semibold rounded-xl hover:bg-green-dark transition-colors text-sm ml-auto disabled:opacity-70 btn-glow"
                      aria-label="Submit visa application"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <CheckCircle className="w-4 h-4" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </motion.div>

        {/* Support note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6"
        >
          <span className="text-sm text-muted-foreground">Prefer to speak with an expert?</span>
          <a
            href="/contact"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-primary hover:text-green-dark transition-colors"
            aria-label="Talk to a visa expert"
          >
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            Talk to a Visa Expert
          </a>
        </motion.div>
      </div>
    </section>
  )
}
