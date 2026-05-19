'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const faqs = [
  {
    q: 'How long does the visa application process take?',
    a: 'Processing times vary by destination. E-visas for UAE can be approved in 3–5 days, Schengen visas typically take 10–15 working days, and US visas may require 21–60 days including an interview. We always recommend applying at least 4–6 weeks in advance.',
  },
  {
    q: 'Do I need to submit my original passport?',
    a: 'For e-visas (such as UAE, Thailand, Singapore), no physical passport submission is required — everything is done digitally. For embassy-based visas (Schengen, UK, US), your passport may need to be submitted to the relevant consulate. We guide you through every step.',
  },
  {
    q: 'What happens if my visa is rejected?',
    a: 'A rejection is not the end. Our team will analyze the refusal reason, advise on improvements, and help you reapply with a stronger application. We offer a free refusal analysis consultation for all our clients.',
  },
  {
    q: 'Can Yavigo guarantee visa approval?',
    a: 'No visa agent — including us — can guarantee approval, as the final decision rests with the embassy or immigration authority. However, our 95% approval rate reflects the quality of our application preparation, document review, and expert guidance.',
  },
  {
    q: 'Is it safe to upload my documents online?',
    a: 'Absolutely. We use bank-grade 256-bit SSL encryption for all document uploads and transmissions. Your data is never shared with third parties and is securely deleted after your case is closed in accordance with our privacy policy.',
  },
  {
    q: 'Do you assist with visas for families and groups?',
    a: 'Yes! We handle individual, family, and group visa applications. Our system supports up to 10 travelers per application, and our team can coordinate even larger corporate or tour group applications.',
  },
  {
    q: 'What is your fee structure?',
    a: 'Our service fee is charged separately from the government/embassy visa fee. The service fee covers document review, application preparation, expert consultation, and submission support. We are fully transparent — no hidden charges.',
  },
  {
    q: 'Can I track my application status?',
    a: 'Yes. After submission, you will receive a case reference number and regular email updates on your application status. You can also contact our support team at any time for a real-time update.',
  },
]

export default function VisaFaqSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 bg-surface-1" id="faq" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">
            Frequently Asked Questions
          </motion.p>
          <motion.h2
            id="faq-heading"
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold mb-4 text-balance font-display"
          >
            Your Questions, Answered
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Still unsure? Browse our most common questions below. If you don&apos;t find your answer, our team is always ready to help.
          </motion.p>
        </motion.div>

        <motion.dl
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white rounded-2xl border border-border overflow-hidden"
            >
              <dt>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-surface-1 transition-colors"
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-green-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="font-semibold text-foreground text-sm leading-snug">{faq.q}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0"
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </button>
              </dt>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.dd
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-border pt-4 ml-8">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.dd>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.dl>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-primary text-white font-semibold rounded-xl hover:bg-green-dark transition-colors shadow-md shadow-green-primary/20"
              aria-label="Contact our support team"
            >
              Contact Our Team
            </a>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-surface-1 transition-colors"
              aria-label="Read our visa guides"
            >
              Read Our Visa Guides
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
