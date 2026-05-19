'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Clock, ChevronLeft, ChevronRight } from 'lucide-react'

const destinations = [
  {
    name: 'Dubai, UAE',
    flag: '🇦🇪',
    image: '/images/dest-dubai.jpg',
    visaType: 'E-Visa',
    processingTime: '3–5 days',
    price: 'From $49',
    desc: 'Online tourist & transit visas',
  },
  {
    name: 'France',
    flag: '🇫🇷',
    image: '/images/dest-paris.jpg',
    visaType: 'Schengen Visa',
    processingTime: '10–15 days',
    price: 'From $89',
    desc: 'Schengen zone access — 26 countries',
  },
  {
    name: 'Thailand',
    flag: '🇹🇭',
    image: '/images/dest-thailand.jpg',
    visaType: 'Tourist Visa',
    processingTime: '3–7 days',
    price: 'From $39',
    desc: 'Single & multiple entry available',
  },
  {
    name: 'United Kingdom',
    flag: '🇬🇧',
    image: '/images/dest-london.jpg',
    visaType: 'Standard Visitor',
    processingTime: '15–21 days',
    price: 'From $119',
    desc: 'Short-stay & family visit visas',
  },
  {
    name: 'United States',
    flag: '🇺🇸',
    image: '/images/dest-usa.jpg',
    visaType: 'B1/B2 Visa',
    processingTime: '21–60 days',
    price: 'From $159',
    desc: 'Business & tourist visits',
  },
  {
    name: 'Singapore',
    flag: '🇸🇬',
    image: '/images/dest-singapore.jpg',
    visaType: 'Tourist Visa',
    processingTime: '3–5 days',
    price: 'From $45',
    desc: 'Single & multiple entry options',
  },
  {
    name: 'Canada',
    flag: '🇨🇦',
    image: '/images/dest-canada.jpg',
    visaType: 'eTA / Visa',
    processingTime: '14–30 days',
    price: 'From $99',
    desc: 'Visitor, student & work permits',
  },
  {
    name: 'Australia',
    flag: '🇦🇺',
    image: '/images/dest-australia.jpg',
    visaType: 'ETA Visa',
    processingTime: '7–14 days',
    price: 'From $79',
    desc: 'Electronic travel authority',
  },
]

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

interface VisaDestinationsSectionProps {
  onSelectCountry?: (country: string) => void
}

export default function VisaDestinationsSection({ onSelectCountry }: VisaDestinationsSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const scrollRef = useRef<HTMLDivElement>(null)

  function scrollCards(dir: 'left' | 'right') {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' })
  }

  function handleApply(country: string) {
    if (onSelectCountry) onSelectCountry(country)
    const formEl = document.getElementById('apply-form')
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="py-24 bg-surface-1 overflow-hidden" id="destinations" aria-labelledby="destinations-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <motion.p variants={fadeUp} className="section-label mb-3">
              Popular Destinations
            </motion.p>
            <motion.h2
              id="destinations-heading"
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold text-balance font-display"
            >
              Where Do You Want to Go?
            </motion.h2>
          </div>
          <motion.div variants={fadeUp} className="flex items-center gap-2">
            <button
              onClick={() => scrollCards('left')}
              className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-green-primary hover:border-green-primary/50 transition-all"
              aria-label="Scroll destinations left"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => scrollCards('right')}
              className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-green-primary hover:border-green-primary/50 transition-all"
              aria-label="Scroll destinations right"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </motion.div>
        </motion.div>

        {/* Scrollable card row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth hide-scrollbar"
          role="list"
          aria-label="Available visa destinations"
        >
          {destinations.map((dest, i) => (
            <motion.article
              key={dest.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl overflow-hidden bg-white border border-border shadow-sm hover:shadow-xl transition-all cursor-pointer shrink-0 w-72 snap-start"
              role="listitem"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={`${dest.name} travel destination`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:from-black/70 transition-all duration-300" />

                {/* Flag + type badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xl" role="img" aria-label={`${dest.name} flag`}>{dest.flag}</span>
                  <span className="px-2.5 py-1 bg-white/95 text-green-dark text-xs font-bold rounded-lg">
                    {dest.visaType}
                  </span>
                </div>

                {/* Country name overlay */}
                <div className="absolute bottom-3 left-3">
                  <p className="text-white font-bold text-lg leading-none">{dest.name}</p>
                  <p className="text-white/70 text-xs mt-0.5">{dest.desc}</p>
                </div>

                {/* Apply button — slides up on hover */}
                <motion.div
                  className="absolute bottom-3 right-3 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <button
                    onClick={() => handleApply(dest.name)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-green-primary text-white text-xs font-semibold rounded-xl hover:bg-green-dark transition-colors"
                    aria-label={`Apply for ${dest.name} visa`}
                  >
                    Get E-Visa
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </motion.div>
              </div>

              {/* Card footer */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{dest.processingTime}</span>
                </div>
                <span className="text-sm font-bold text-green-primary">{dest.price}</span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <a
            href="#apply-form"
            className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-green-primary text-green-primary font-semibold rounded-xl hover:bg-green-light transition-all"
            aria-label="View all destinations"
          >
            View All 180+ Destinations
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>


    </section>
  )
}
