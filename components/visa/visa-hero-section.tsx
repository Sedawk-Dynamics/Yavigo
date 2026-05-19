'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Shield, Clock, Star, CheckCircle, Globe } from 'lucide-react'

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const stats = [
  { icon: CheckCircle, label: '95% Approval Rate' },
  { icon: Clock, label: '48hr Processing' },
  { icon: Shield, label: '100% Secure' },
  { icon: Star, label: '4.9/5 Rating' },
]

export default function VisaHeroSection() {
  return (
    <section
      className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#07130B] pt-16"
      id="visa-hero"
      aria-labelledby="visa-hero-heading"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/visa-hero-bg.jpg"
          alt="World travel destinations"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#07130B] via-[#0B1F12]/95 to-[#12351C]/85" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-green-primary/10 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-20 left-1/4 w-72 h-72 rounded-full bg-green-bright/8 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="section-label mb-5" style={{ color: 'var(--green-bright)' }}>
              Trusted by 120,000+ Travelers Worldwide
            </motion.p>

            <motion.h1
              id="visa-hero-heading"
              variants={fadeUp}
              className="text-5xl lg:text-6xl font-bold leading-[1.1] text-balance mb-6 text-white font-display"
            >
              Visa Assistance,{' '}
              <span className="text-green-bright">Simplified</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-white/70 mb-8 max-w-md leading-relaxed">
              From eligibility checks to document submission — get expert visa assistance for 180+ destinations, fully online, without the hassle.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
              <a
                href="#apply-form"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-primary text-white font-semibold rounded-xl hover:bg-green-dark transition-all shadow-lg shadow-green-primary/30 btn-glow"
                aria-label="Apply for visa now"
              >
                Apply for Visa Now
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#process"
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/20 text-white font-semibold rounded-xl hover:border-green-primary/60 hover:bg-white/5 transition-all"
                aria-label="Learn how it works"
              >
                How It Works
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl"
                >
                  <div className="w-6 h-6 rounded-md bg-green-primary/30 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-green-bright" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-medium text-white/80">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — floating destination cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:grid grid-cols-2 gap-4"
            aria-hidden="true"
          >
            {[
              { country: 'Dubai, UAE', flag: '🇦🇪', time: '3–5 days', status: 'E-Visa', img: '/images/dest-dubai.jpg' },
              { country: 'France', flag: '🇫🇷', time: '10–15 days', status: 'Schengen', img: '/images/dest-paris.jpg' },
              { country: 'United States', flag: '🇺🇸', time: '21–60 days', status: 'B1/B2', img: '/images/dest-usa.jpg' },
              { country: 'Canada', flag: '🇨🇦', time: '14–30 days', status: 'eTA', img: '/images/dest-canada.jpg' },
            ].map((dest, i) => (
              <motion.div
                key={dest.country}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                className="relative h-44 rounded-2xl overflow-hidden group"
                style={{ animation: `float ${4 + i * 0.5}s ease-in-out infinite ${i * 0.5}s` }}
              >
                <Image src={dest.img} alt={dest.country} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-bold">{dest.flag} {dest.country}</p>
                      <p className="text-white/70 text-xs">{dest.time}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-green-primary/90 text-white text-xs font-semibold rounded-lg">{dest.status}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[oklch(0.13_0.04_142)] to-transparent pointer-events-none" />
    </section>
  )
}
