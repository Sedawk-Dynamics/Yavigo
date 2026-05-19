"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Clock, DollarSign, FileCheck } from "lucide-react"

const destinations = [
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    image: "/images/dest-london.jpg",
    visaType: "Standard Visitor Visa",
    processing: "15 working days",
    fee: "From $115",
    tag: "Popular",
    description: "Explore London's iconic landmarks, historic castles and the British countryside.",
  },
  {
    name: "Schengen – Europe",
    flag: "🇪🇺",
    image: "/images/dest-schengen.jpg",
    visaType: "Schengen Visa",
    processing: "10-15 days",
    fee: "From $80",
    tag: "Best Value",
    description: "Access 27 European countries with a single visa — France, Germany, Italy and more.",
  },
  {
    name: "France",
    flag: "🇫🇷",
    image: "/images/dest-paris.jpg",
    visaType: "Schengen Visa",
    processing: "10 days",
    fee: "From $80",
    tag: "Top Pick",
    description: "The Eiffel Tower, Louvre, and the French Riviera await you in the city of love.",
  },
  {
    name: "Dubai, UAE",
    flag: "🇦🇪",
    image: "/images/dest-dubai.jpg",
    visaType: "Tourist E-Visa",
    processing: "3–5 days",
    fee: "From $90",
    tag: "E-Visa",
    description: "World-class architecture, luxury shopping and the Dubai desert experience.",
  },
  {
    name: "United States",
    flag: "🇺🇸",
    image: "/images/dest-usa.jpg",
    visaType: "B1/B2 Tourist Visa",
    processing: "3–5 weeks",
    fee: "From $160",
    tag: "Featured",
    description: "From New York City to the Grand Canyon — America's diversity awaits every traveler.",
  },
]

const tagColors: Record<string, string> = {
  Popular: "bg-primary/20 text-primary",
  "Best Value": "bg-green-dark/30 text-green-bright",
  "Top Pick": "bg-primary/20 text-primary",
  "E-Visa": "bg-accent/15 text-accent",
  Featured: "bg-green-dark/30 text-green-bright",
}

export default function DestinationsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="destinations" className="py-24 lg:py-32 bg-surface-1 border-t border-border relative overflow-hidden">
      {/* bg glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary mb-5 uppercase tracking-wider">
              Popular Destinations
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
              Where Will You{" "}
              <span className="text-primary">Go Next?</span>
            </h2>
          </div>
          <a
            href="#all-destinations"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors shrink-0"
          >
            View all destinations
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Destinations grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Featured large card */}
          {destinations.slice(0, 1).map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onHoverStart={() => setHovered(dest.name)}
              onHoverEnd={() => setHovered(null)}
              className="md:row-span-2 relative group rounded-3xl overflow-hidden cursor-pointer border border-border"
            >
              <div className="relative h-full min-h-[380px]">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />

                {/* Tag */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${tagColors[dest.tag]}`}>
                  {dest.tag}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{dest.flag}</span>
                    <h3 className="text-xl font-bold text-foreground">{dest.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{dest.description}</p>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="flex items-center gap-2 text-xs text-foreground/70">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {dest.processing}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground/70">
                      <DollarSign className="w-3.5 h-3.5 text-primary" />
                      {dest.fee}
                    </div>
                    <div className="col-span-2 flex items-center gap-2 text-xs text-foreground/70">
                      <FileCheck className="w-3.5 h-3.5 text-primary" />
                      {dest.visaType}
                    </div>
                  </div>
                  <motion.a
                    href="#apply"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-accent transition-colors"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Regular cards */}
          {destinations.slice(1).map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: (i + 1) * 0.1 }}
              onHoverStart={() => setHovered(dest.name)}
              onHoverEnd={() => setHovered(null)}
              className="relative group rounded-3xl overflow-hidden cursor-pointer border border-border"
            >
              <div className="relative h-52">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${tagColors[dest.tag]}`}>
                  {dest.tag}
                </div>
              </div>

              <div className="bg-surface-1 group-hover:bg-surface-2 transition-colors p-5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-lg">{dest.flag}</span>
                  <h3 className="text-base font-bold text-foreground">{dest.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{dest.visaType}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-primary" />
                      {dest.processing}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-primary">{dest.fee}</span>
                </div>

                {/* Expand on hover */}
                <AnimatePresence>
                  {hovered === dest.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <motion.a
                        href="#apply"
                        whileTap={{ scale: 0.97 }}
                        className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-accent transition-colors"
                      >
                        Apply for Visa
                        <ArrowRight className="w-4 h-4" />
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
