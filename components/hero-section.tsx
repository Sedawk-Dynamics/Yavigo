"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Search, MapPin, ArrowRight, Star, Shield, Clock, CheckCircle } from "lucide-react"

const popularDestinations = [
  { name: "France", flag: "🇫🇷" },
  { name: "UK", flag: "🇬🇧" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "USA", flag: "🇺🇸" },
  { name: "Dubai", flag: "🇦🇪" },
  { name: "Canada", flag: "🇨🇦" },
]

const trustBadges = [
  { icon: Shield, label: "100% Secure Process" },
  { icon: Clock, label: "48hr Fast Processing" },
  { icon: Star, label: "4.9/5 Customer Rating" },
  { icon: CheckCircle, label: "95% Approval Rate" },
]

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function HeroSection() {
  const [query, setQuery] = useState("")
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"])

  return (
    <section ref={ref} className="relative overflow-hidden bg-white pt-16" id="hero">
      {/* Top green accent line */}
      <div className="absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-primary/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-0">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── Left column ── */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="pb-16 lg:pb-20">
            {/* Section label */}
            <motion.p variants={fadeUp} className="section-label mb-5">
              Trusted by 120,000+ Travelers Worldwide
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl lg:text-6xl font-bold leading-[1.1] text-balance mb-5"
              style={{ color: "var(--heading-color)" }}
            >
              Get Your Visa{" "}
              <br />
              <span className="text-foreground">Fast &amp; Hassle-Free</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-8 max-w-md leading-relaxed">
              Complete visa solutions for 180+ destinations. Fully online, expert support,
              no physical passport submission needed for eligible e-visas.
            </motion.p>

            {/* Search bar */}
            <motion.div
              variants={fadeUp}
              className="flex gap-2 bg-surface-1 border border-border rounded-2xl p-2 shadow-sm max-w-xl mb-6 focus-within:border-green-primary/50 transition-colors"
            >
              <div className="flex-1 flex items-center gap-3 px-3">
                <MapPin className="w-5 h-5 text-green-primary shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Where do you want to go?"
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none py-2"
                />
              </div>
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-green-primary text-white text-sm font-semibold rounded-xl hover:bg-green-dark transition-colors cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  Search
                </motion.span>
              </Link>
            </motion.div>

            {/* Popular tags */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 mb-10">
              <span className="text-xs text-muted-foreground font-medium">Popular:</span>
              {popularDestinations.map((d) => (
                <motion.span
                  key={d.name}
                  whileHover={{ scale: 1.07 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-border text-xs font-medium text-foreground rounded-full hover:border-green-primary hover:text-green-primary transition-all cursor-pointer"
                >
                  {d.flag} {d.name}
                </motion.span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-primary text-white font-semibold rounded-xl hover:bg-green-dark transition-all shadow-md shadow-green-primary/20 cursor-pointer btn-glow"
                >
                  Apply for Visa
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
              <Link href="/services">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white border-2 border-border text-foreground font-semibold rounded-xl hover:border-green-primary hover:text-green-primary transition-all cursor-pointer"
                >
                  Our Services
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Right column — video with floating cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <motion.div style={{ y: imgY }} className="relative h-[580px] rounded-3xl overflow-hidden shadow-2xl shadow-black/10">
              <video
                src="/videos/hero-travel.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            {/* Floating approved card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              className="absolute -left-10 top-1/3 bg-white rounded-2xl shadow-xl border border-border p-4 w-48"
              style={{ animation: "float 4s ease-in-out infinite" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-light rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Visa Approved!</p>
                  <p className="text-xs text-muted-foreground">Schengen · France</p>
                </div>
              </div>
              <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-green-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "95%" }}
                  transition={{ duration: 1.5, delay: 1.4 }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5 font-medium">95% complete</p>
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              className="absolute -right-8 bottom-28 bg-white rounded-2xl shadow-xl border border-border p-4 w-44"
              style={{ animation: "float 4s ease-in-out infinite 2s" }}
            >
              <p className="text-3xl font-bold text-green-primary leading-none mb-1">50K+</p>
              <p className="text-xs text-muted-foreground">Visas Processed</p>
              <div className="flex mt-2 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Trust badges strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="border-t border-border bg-surface-1 mt-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-green-light flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-green-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
