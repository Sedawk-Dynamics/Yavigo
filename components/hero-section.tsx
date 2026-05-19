"use client"

import { useRef, useState, useMemo, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, MapPin, ArrowRight, Star, Shield, Clock, CheckCircle, Globe } from "lucide-react"

type Destination = {
  name: string
  flag: string
  route: string
  aliases: string[]
}

const destinations: Destination[] = [
  { name: "Schengen / Europe", flag: "🇪🇺", route: "/services/schengen", aliases: ["schengen", "europe", "france", "germany", "italy", "spain", "netherlands", "holland", "paris", "berlin", "rome", "madrid", "amsterdam"] },
  { name: "United Kingdom", flag: "🇬🇧", route: "/services/uk", aliases: ["uk", "united kingdom", "britain", "england", "london", "scotland", "ireland"] },
  { name: "Dubai / UAE", flag: "🇦🇪", route: "/services/dubai", aliases: ["dubai", "uae", "united arab emirates", "abu dhabi"] },
  { name: "United States", flag: "🇺🇸", route: "/services/usa", aliases: ["usa", "us", "united states", "america", "new york", "california"] },
  { name: "Canada", flag: "🇨🇦", route: "/services/canada", aliases: ["canada", "toronto", "vancouver", "montreal"] },
]

const popularChips = [
  { name: "France", route: "/services/schengen" },
  { name: "UK", route: "/services/uk" },
  { name: "Germany", route: "/services/schengen" },
  { name: "USA", route: "/services/usa" },
  { name: "Dubai", route: "/services/dubai" },
  { name: "Canada", route: "/services/canada" },
]

const trustBadges = [
  { icon: Shield, label: "100% Secure Process" },
  { icon: Clock, label: "Fast Processing" },
  { icon: Star, label: "Trusted by Partners" },
  { icon: CheckCircle, label: "Specialist Expertise" },
]

function findMatch(query: string): Destination | null {
  const q = query.trim().toLowerCase()
  if (!q) return null
  for (const d of destinations) {
    if (d.aliases.some((a) => a === q)) return d
  }
  for (const d of destinations) {
    if (d.aliases.some((a) => a.includes(q) || q.includes(a))) return d
  }
  return null
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function HeroSection() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"])

  // Mouse-tracked tilt for the video container
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const springX = useSpring(tiltX, { stiffness: 120, damping: 18 })
  const springY = useSpring(tiltY, { stiffness: 120, damping: 18 })

  function handleVideoMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    tiltX.set(-y * 6)
    tiltY.set(x * 6)
  }

  function handleVideoMouseLeave() {
    tiltX.set(0)
    tiltY.set(0)
  }

  const filteredSuggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return [] as Destination[]
    return destinations.filter((d) =>
      d.name.toLowerCase().includes(q) || d.aliases.some((a) => a.includes(q))
    ).slice(0, 5)
  }, [query])

  function submitSearch(explicit?: string) {
    const q = (explicit ?? query).trim()
    if (!q) {
      router.push("/visa-requirements")
      return
    }
    const match = findMatch(q)
    if (match) {
      router.push(match.route)
    } else {
      router.push(`/visa-requirements?q=${encodeURIComponent(q)}`)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      if (filteredSuggestions[activeIndex]) {
        router.push(filteredSuggestions[activeIndex].route)
      } else {
        submitSearch()
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, Math.max(filteredSuggestions.length - 1, 0)))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  // Reset highlighted suggestion when the list changes
  useEffect(() => {
    setActiveIndex(0)
  }, [query])

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
              B2B Visa & Immigration Partner
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl lg:text-6xl font-bold leading-[1.1] text-balance mb-5"
              style={{ color: "var(--heading-color)" }}
            >
              Visa & Immigration Experts{" "}
              <br />
              <span className="text-foreground">for Your Business</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-8 max-w-md leading-relaxed">
              Yavigo partners with travel agencies, corporates, and immigration consultants
              to deliver expert visa and immigration processing across 100+ destinations.
            </motion.p>

            {/* Search bar */}
            <motion.div variants={fadeUp} className="relative max-w-xl mb-6">
              <div className="flex gap-2 bg-surface-1 border border-border rounded-2xl p-2 shadow-sm focus-within:border-green-primary/50 focus-within:shadow-md transition-all">
                <div className="flex-1 flex items-center gap-3 px-3">
                  <MapPin className="w-5 h-5 text-green-primary shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true) }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search a destination — e.g. UK, Schengen, Dubai"
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none py-2"
                    aria-label="Search destinations"
                  />
                </div>
                <motion.button
                  type="button"
                  onClick={() => submitSearch()}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-modern inline-flex items-center gap-2 px-5 py-3 bg-green-primary text-white text-sm font-semibold rounded-xl cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  Search
                </motion.button>
              </div>

              {showSuggestions && filteredSuggestions.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 right-0 top-full mt-2 bg-white border border-border rounded-2xl shadow-lg overflow-hidden z-30"
                  role="listbox"
                >
                  {filteredSuggestions.map((d, i) => (
                    <li
                      key={d.route}
                      role="option"
                      aria-selected={i === activeIndex}
                      onMouseDown={(e) => { e.preventDefault(); router.push(d.route) }}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex items-center justify-between gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
                        i === activeIndex ? "bg-green-light" : "hover:bg-surface-1"
                      }`}
                    >
                      <span className="flex items-center gap-2 text-sm text-foreground">
                        <span className="text-base">{d.flag}</span>
                        {d.name}
                      </span>
                      <ArrowRight className="w-4 h-4 text-green-primary" />
                    </li>
                  ))}
                </motion.ul>
              )}
            </motion.div>

            {/* Popular tags */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 mb-10">
              <span className="text-xs text-muted-foreground font-medium">Popular:</span>
              {popularChips.map((d) => (
                <Link key={d.name} href={d.route}>
                  <motion.span
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-border text-xs font-medium text-foreground rounded-full hover:border-green-primary hover:text-green-primary transition-all cursor-pointer"
                  >
                    {d.name}
                  </motion.span>
                </Link>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link href="/contact">
                <motion.span
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-modern inline-flex items-center gap-2 px-7 py-3.5 bg-green-primary text-white font-semibold rounded-xl cursor-pointer"
                >
                  Apply for Visa
                  <ArrowRight className="btn-arrow w-4 h-4" />
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

          {/* ── Right column — interactive video with tilt + floating partner card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <motion.div
              style={{ y: imgY, rotateX: springX, rotateY: springY, transformPerspective: 1200 }}
              onMouseMove={handleVideoMouseMove}
              onMouseLeave={handleVideoMouseLeave}
              className="relative h-[580px] rounded-3xl overflow-hidden shadow-2xl shadow-black/20 ring-1 ring-black/5"
            >
              <video
                src="/videos/hero-travel.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Cinematic overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-black/15 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Caption */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 pointer-events-none">
                <div>
                  <p className="text-white/90 text-xs uppercase tracking-[0.25em] font-semibold mb-2">Yavigo Partner Network</p>
                  <p className="text-white text-2xl font-bold leading-tight max-w-sm">
                    Built for the businesses that move the world.
                  </p>
                </div>
                <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/15 backdrop-blur-md text-white text-xs font-medium rounded-full ring-1 ring-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-bright animate-pulse" />
                  Live
                </span>
              </div>
            </motion.div>

            {/* Floating partner card — interactive */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="absolute -right-8 bottom-24 bg-white rounded-2xl shadow-xl border border-border p-4 w-52 cursor-default"
              style={{ animation: "float 4s ease-in-out infinite 2s" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-green-light flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4 text-green-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-green-primary leading-tight">Trusted B2B Partner</p>
                  <p className="text-[11px] text-muted-foreground">Global specialist network</p>
                </div>
              </div>
              <div className="flex mt-1 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </motion.div>

            {/* Floating live partners indicator */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
              whileHover={{ x: -2, scale: 1.04 }}
              className="absolute -left-6 top-1/4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-border p-3 w-44"
              style={{ animation: "float 4s ease-in-out infinite" }}
            >
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Now active</p>
              <p className="text-sm font-bold text-foreground leading-tight">Partner network online</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-bright opacity-60 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-primary" />
                </span>
                <span className="text-xs text-muted-foreground">Specialists available</span>
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
