'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Phone, Shield, Clock } from 'lucide-react'

export default function VisaCtaBand() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      className="relative py-20 overflow-hidden bg-[oklch(0.13_0.04_142)]"
      aria-labelledby="cta-heading"
    >
      {/* Background orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-green-primary/15 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-green-bright/10 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label mb-5 justify-center"
          style={{ color: 'var(--green-bright)' }}
        >
          Ready to Travel?
        </motion.p>

        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold text-white mb-5 text-balance font-display"
        >
          Start Your Visa Application Today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Join 120,000+ travelers who trust Yavigo for fast, reliable, and stress-free visa processing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <a
            href="#apply-form"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-primary text-white font-semibold rounded-xl hover:bg-green-dark transition-all shadow-xl shadow-green-primary/30 btn-glow"
            aria-label="Apply for your visa now"
          >
            Apply for Visa Now
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:border-green-primary/60 hover:bg-white/5 transition-all"
            aria-label="Talk to a visa expert"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            Talk to an Expert
          </a>
        </motion.div>

        {/* Trust mini-badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          {[
            { icon: Shield, label: '100% Secure & Encrypted' },
            { icon: Clock, label: 'Response within 2 hours' },
            { icon: ArrowRight, label: 'No hidden fees' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-green-bright" aria-hidden="true" />
              <span className="text-sm text-white/60">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
