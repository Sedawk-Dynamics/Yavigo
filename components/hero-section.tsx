"use client"

import { useRef, useState, useMemo, useEffect } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
  useMotionTemplate,
} from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Search,
  MapPin,
  ArrowRight,
  Star,
  Shield,
  Clock,
  CheckCircle,
  TrendingUp,
  Users,
  Sparkles,
  Globe2,
  Compass,
  Building2,
} from "lucide-react"
import LightRays from "@/components/premium/LightRays"

/* ─────────────────────────── data ─────────────────────────── */

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

// Pins placed on three concentric orbital rings — each has an angle in degrees
// and the ring it belongs to (ring radius determines orbit).
const orbitalPins = [
  { id: "uk", label: "United Kingdom", flag: "🇬🇧", ring: 0, angle: 25 },
  { id: "eu", label: "Schengen", flag: "🇪🇺", ring: 0, angle: 115 },
  { id: "ca", label: "Canada", flag: "🇨🇦", ring: 0, angle: 200 },
  { id: "au", label: "Australia", flag: "🇦🇺", ring: 0, angle: 305 },

  { id: "us", label: "United States", flag: "🇺🇸", ring: 1, angle: 60 },
  { id: "uae", label: "Dubai / UAE", flag: "🇦🇪", ring: 1, angle: 175 },
  { id: "sg", label: "Singapore", flag: "🇸🇬", ring: 1, angle: 290 },

  { id: "in", label: "India", flag: "🇮🇳", ring: 2, angle: 45 },
  { id: "jp", label: "Japan", flag: "🇯🇵", ring: 2, angle: 225 },
]

const rings = [
  { rx: 220, ry: 78, tilt: -14, duration: 60, dir: 1 },
  { rx: 162, ry: 58, tilt: 10, duration: 44, dir: -1 },
  { rx: 108, ry: 38, tilt: -6, duration: 30, dir: 1 },
]

const headlineWords = ["Visa", "&", "Immigration", "Experts"]
const subline = "for Your Business"

/* ─────────────────────────── helpers ─────────────────────────── */

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

/* Magnetic wrapper — child element gently follows the cursor when within the
   wrapper's hit area. Adds depth and craft to CTAs. */
function MagneticWrap({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode
  strength?: number
  className?: string
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 })

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    x.set(dx * strength)
    y.set(dy * strength)
  }
  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <div onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      <motion.div style={{ x: sx, y: sy }} className="inline-block">
        {children}
      </motion.div>
    </div>
  )
}

/* Word-by-word reveal — masked translation for cinematic headline feel */
function HeadlineReveal({
  words,
  delay = 0,
  gradientWord,
}: {
  words: string[]
  delay?: number
  gradientWord?: number
}) {
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="reveal-mask mr-3">
          <motion.span
            initial={{ y: "115%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              delay: delay + i * 0.09,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`inline-block ${i === gradientWord ? "text-shimmer" : ""}`}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </>
  )
}

/* Number ticker that animates from 0 to target on mount */
function CountUp({ to, duration = 1800 }: { to: number; duration?: number }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setV(Math.round(to * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])
  return <>{v.toLocaleString()}</>
}

/* ─────────────────────────── component ─────────────────────────── */

export default function HeroSection() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredPin, setHoveredPin] = useState<string | null>(null)
  const [orbitsPaused, setOrbitsPaused] = useState(false)
  const [liveCount, setLiveCount] = useState(1247)

  const ref = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"])

  // Mouse tracking for visual tilt + spotlight
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const lightX = useMotionValue(50)
  const lightY = useMotionValue(50)
  const springTX = useSpring(tiltX, { stiffness: 110, damping: 18 })
  const springTY = useSpring(tiltY, { stiffness: 110, damping: 18 })
  const springLX = useSpring(lightX, { stiffness: 80, damping: 22 })
  const springLY = useSpring(lightY, { stiffness: 80, damping: 22 })
  const lightBg = useMotionTemplate`radial-gradient(circle at ${springLX}% ${springLY}%, oklch(1 0 0 / 0.55) 0%, transparent 42%)`
  const auroraBg = useMotionTemplate`radial-gradient(circle at ${springLX}% ${springLY}%, oklch(0.78 0.16 142 / 0.22) 0%, transparent 55%)`

  function onVisualMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    tiltX.set(-y * 9)
    tiltY.set(x * 9)
    lightX.set(((e.clientX - r.left) / r.width) * 100)
    lightY.set(((e.clientY - r.top) / r.height) * 100)
  }
  function onVisualLeave() {
    tiltX.set(0)
    tiltY.set(0)
    lightX.set(50)
    lightY.set(50)
  }

  // Section-wide spotlight that follows the cursor across the whole hero
  const sectionLX = useMotionValue(50)
  const sectionLY = useMotionValue(20)
  const sLX = useSpring(sectionLX, { stiffness: 60, damping: 24 })
  const sLY = useSpring(sectionLY, { stiffness: 60, damping: 24 })
  const sectionSpot = useMotionTemplate`radial-gradient(600px 600px at ${sLX}% ${sLY}%, oklch(0.93 0.06 142 / 0.45) 0%, transparent 55%)`

  function onSectionMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    sectionLX.set(((e.clientX - r.left) / r.width) * 100)
    sectionLY.set(((e.clientY - r.top) / r.height) * 100)
  }

  // Live counter
  useEffect(() => {
    const id = setInterval(() => {
      setLiveCount((c) => c + Math.floor(Math.random() * 3))
    }, 2600)
    return () => clearInterval(id)
  }, [])

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
    if (match) router.push(match.route)
    else router.push(`/visa-requirements?q=${encodeURIComponent(q)}`)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      if (filteredSuggestions[activeIndex]) {
        router.push(filteredSuggestions[activeIndex].route)
      } else submitSearch()
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, Math.max(filteredSuggestions.length - 1, 0)))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Escape") setShowSuggestions(false)
  }

  useEffect(() => { setActiveIndex(0) }, [query])

  return (
    <section
      ref={ref}
      onMouseMove={onSectionMove}
      className="relative overflow-hidden bg-white pt-16 grain"
      id="hero"
    >
      {/* Volumetric light rays */}
      <LightRays origin="top-right" intensity={0.85} />

      {/* ── Background layers ─────────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Mesh */}
        <div className="absolute inset-0 mesh-bg opacity-90" />

        {/* Aurora blobs */}
        <div
          className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full blur-3xl animate-aurora"
          style={{ background: "oklch(0.82 0.16 142 / 0.45)" }}
        />
        <div
          className="absolute top-1/3 -right-32 w-[560px] h-[560px] rounded-full blur-3xl animate-aurora-slow"
          style={{ background: "oklch(0.76 0.2 142 / 0.32)" }}
        />
        <div
          className="absolute -bottom-32 left-1/3 w-[480px] h-[480px] rounded-full blur-3xl animate-aurora-reverse"
          style={{ background: "oklch(0.9 0.08 142 / 0.45)" }}
        />

        {/* Cursor-following ambient spotlight */}
        <motion.div className="absolute inset-0" style={{ background: sectionSpot }} />

        {/* Faint dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="oklch(0.42 0.16 142)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>
      </div>

      {/* Top accent line */}
      <div className="absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-primary/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-0">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">

          {/* ── Left column ────────────────────────────────────────── */}
          <div className="pb-16 lg:pb-20">

            {/* Trust pill with avatar stack */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-flex items-center gap-3 mb-7 pl-1.5 pr-4 py-1.5 rounded-full glass"
            >
              <div className="flex -space-x-2">
                {["#16a34a", "#0ea5e9", "#f59e0b", "#8b5cf6"].map((c, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full ring-2 ring-white"
                    style={{ background: `linear-gradient(135deg, ${c}, ${c}dd)` }}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-foreground/80">
                Trusted by <span className="text-green-primary">2,400+</span> travel & corporate partners
              </span>
              <span className="hidden sm:flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </span>
            </motion.div>

            {/* Section label */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="section-label mb-5"
            >
              B2B Visa & Immigration Partner
            </motion.p>

            {/* Headline — masked word-by-word reveal with shimmer on accent */}
            <h1
              className="font-bold leading-[1.04] text-balance mb-6 tracking-tight"
              style={{
                color: "var(--heading-color)",
                fontSize: "clamp(2.6rem, 5.2vw, 4.25rem)",
              }}
            >
              <HeadlineReveal words={headlineWords} delay={0.25} gradientWord={2} />
              <br />
              <span className="reveal-mask">
                <motion.span
                  initial={{ y: "115%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block text-foreground"
                >
                  {subline}
                </motion.span>
              </span>
            </h1>

            {/* Sub copy */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="text-[1.05rem] text-muted-foreground mb-8 max-w-xl leading-relaxed"
            >
              Yavigo partners with travel agencies, corporates, and immigration consultants
              to deliver expert visa and immigration processing across{" "}
              <span className="text-foreground font-semibold">100+ destinations</span> — with
              concierge precision, dedicated specialists, and uncompromising security.
            </motion.p>

            {/* Glass search bar */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="relative max-w-xl mb-6"
            >
              <div className="flex gap-2 glass rounded-2xl p-2 focus-within:ring-2 focus-within:ring-green-primary/30 transition-all">
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
                <MagneticWrap strength={0.18}>
                  <motion.button
                    type="button"
                    onClick={() => submitSearch()}
                    whileTap={{ scale: 0.97 }}
                    className="btn-modern inline-flex items-center gap-2 px-5 py-3 bg-green-primary text-white text-sm font-semibold rounded-xl cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    Search
                  </motion.button>
                </MagneticWrap>
              </div>

              <AnimatePresence>
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 right-0 top-full mt-2 glass rounded-2xl shadow-2xl overflow-hidden z-30"
                    role="listbox"
                  >
                    {filteredSuggestions.map((d, i) => (
                      <li
                        key={d.route}
                        role="option"
                        aria-selected={i === activeIndex}
                        onMouseDown={(e) => { e.preventDefault(); router.push(d.route) }}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={`flex items-center justify-between gap-3 px-4 py-3 cursor-pointer transition-colors ${
                          i === activeIndex ? "bg-green-light" : "hover:bg-white/50"
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
              </AnimatePresence>
            </motion.div>

            {/* Popular chips */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="flex flex-wrap items-center gap-2 mb-10"
            >
              <span className="text-xs text-muted-foreground font-medium">Popular:</span>
              {popularChips.map((d, i) => (
                <Link key={d.name} href={d.route}>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.05, type: "spring", stiffness: 240 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur border border-border text-xs font-medium text-foreground rounded-full hover:border-green-primary hover:text-green-primary hover:shadow-md transition-all cursor-pointer"
                  >
                    {d.name}
                  </motion.span>
                </Link>
              ))}
            </motion.div>

            {/* CTAs — magnetic */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.25 }}
              className="flex flex-wrap gap-3"
            >
              <MagneticWrap strength={0.3}>
                <Link href="/contact">
                  <motion.span
                    whileTap={{ scale: 0.97 }}
                    className="btn-modern glow-green inline-flex items-center gap-2 px-7 py-3.5 bg-green-primary text-white font-semibold rounded-xl cursor-pointer"
                  >
                    Apply for Visa
                    <ArrowRight className="btn-arrow w-4 h-4" />
                  </motion.span>
                </Link>
              </MagneticWrap>
              <MagneticWrap strength={0.22}>
                <Link href="/services">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/80 backdrop-blur border-2 border-border text-foreground font-semibold rounded-xl hover:border-green-primary hover:text-green-primary transition-all cursor-pointer"
                  >
                    Explore Services
                  </motion.span>
                </Link>
              </MagneticWrap>
            </motion.div>

            {/* Mini metrics row */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.4 }}
              className="grid grid-cols-3 gap-6 mt-10 max-w-md"
            >
              {[
                { v: 100, suffix: "+", label: "Destinations" },
                { v: 2400, suffix: "+", label: "Partners" },
                { v: 98, suffix: "%", label: "Approval rate" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="text-2xl font-bold text-foreground tabular-nums leading-none">
                    <CountUp to={m.v} />
                    {m.suffix}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right column — Orbital Atlas ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <motion.div
              ref={visualRef}
              style={{
                y: parallaxY,
                rotateX: springTX,
                rotateY: springTY,
                transformPerspective: 1400,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={onVisualMove}
              onMouseLeave={onVisualLeave}
              className="relative h-[620px] rounded-[28px] overflow-hidden ring-1 ring-black/5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.28),0_8px_24px_-8px_rgba(0,0,0,0.15)]"
            >
              {/* Base gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(140deg, oklch(0.97 0.015 142) 0%, oklch(0.93 0.06 142) 45%, oklch(0.82 0.14 142) 100%)",
                }}
              />

              {/* Cursor-following inner glow */}
              <motion.div className="absolute inset-0 pointer-events-none" style={{ background: lightBg }} />

              {/* Aurora layer in visual */}
              <motion.div className="absolute inset-0 pointer-events-none mix-blend-screen" style={{ background: auroraBg }} />

              {/* Faint topographic curves */}
              <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 520 620" preserveAspectRatio="none" aria-hidden>
                <defs>
                  <linearGradient id="topo" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="oklch(0.42 0.16 142)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="oklch(0.42 0.16 142)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[...Array(8)].map((_, i) => (
                  <path
                    key={i}
                    d={`M -20 ${120 + i * 60} Q 130 ${80 + i * 60} 260 ${130 + i * 60} T 540 ${110 + i * 60}`}
                    fill="none"
                    stroke="url(#topo)"
                    strokeWidth="1"
                  />
                ))}
              </svg>

              {/* Orbital Atlas SVG */}
              <svg
                viewBox="0 0 520 620"
                preserveAspectRatio="xMidYMid meet"
                className="absolute inset-0 w-full h-full"
              >
                <defs>
                  <radialGradient id="orb-core" cx="50%" cy="45%" r="55%">
                    <stop offset="0%" stopColor="oklch(1 0 0)" stopOpacity="0.95" />
                    <stop offset="35%" stopColor="oklch(0.86 0.12 142)" stopOpacity="0.85" />
                    <stop offset="75%" stopColor="oklch(0.58 0.2 142)" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="oklch(0.42 0.16 142)" stopOpacity="0.85" />
                  </radialGradient>
                  <radialGradient id="orb-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="oklch(0.68 0.22 142)" stopOpacity="0.5" />
                    <stop offset="60%" stopColor="oklch(0.68 0.22 142)" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="oklch(0.68 0.22 142)" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="pin-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="oklch(0.68 0.22 142)" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="oklch(0.68 0.22 142)" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="ring-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="oklch(0.42 0.16 142)" stopOpacity="0" />
                    <stop offset="50%" stopColor="oklch(0.58 0.2 142)" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="oklch(0.42 0.16 142)" stopOpacity="0" />
                  </linearGradient>
                  <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" />
                  </filter>
                </defs>

                {/* Outer ambient glow behind orb */}
                <ellipse cx="260" cy="310" rx="220" ry="220" fill="url(#orb-glow)" />

                {/* Center orb */}
                <g>
                  {/* Diffuse glow */}
                  <circle cx="260" cy="310" r="78" fill="url(#orb-glow)" filter="url(#soft)" />
                  {/* Core */}
                  <circle cx="260" cy="310" r="56" fill="url(#orb-core)" />
                  {/* Latitude lines */}
                  {[-40, -20, 0, 20, 40].map((deg) => (
                    <ellipse
                      key={deg}
                      cx="260"
                      cy="310"
                      rx="56"
                      ry={Math.abs(56 * Math.cos((deg * Math.PI) / 180))}
                      fill="none"
                      stroke="oklch(1 0 0 / 0.45)"
                      strokeWidth="0.7"
                    />
                  ))}
                  {/* Longitude lines */}
                  {[0, 30, 60, 90, 120, 150].map((deg) => (
                    <ellipse
                      key={deg}
                      cx="260"
                      cy="310"
                      rx={56 * Math.abs(Math.cos((deg * Math.PI) / 180))}
                      ry="56"
                      fill="none"
                      stroke="oklch(1 0 0 / 0.35)"
                      strokeWidth="0.7"
                    />
                  ))}
                  {/* Specular highlight */}
                  <ellipse cx="244" cy="290" rx="18" ry="10" fill="oklch(1 0 0 / 0.55)" />
                  {/* Pulse waves */}
                  {[0, 1, 2].map((i) => (
                    <motion.circle
                      key={i}
                      cx="260"
                      cy="310"
                      r="56"
                      fill="none"
                      stroke="oklch(0.58 0.2 142)"
                      strokeWidth="1.5"
                      initial={{ opacity: 0.55, scale: 1 }}
                      animate={{ opacity: 0, scale: 2.4 }}
                      transition={{
                        duration: 3.4,
                        delay: i * 1.1,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      style={{ transformOrigin: "260px 310px" }}
                    />
                  ))}
                </g>

                {/* Orbital rings + pins */}
                {rings.map((ring, ringIdx) => (
                  <g key={ringIdx} transform={`translate(260 310) rotate(${ring.tilt})`}>
                    {/* Ring path */}
                    <ellipse
                      cx="0"
                      cy="0"
                      rx={ring.rx}
                      ry={ring.ry}
                      fill="none"
                      stroke="url(#ring-stroke)"
                      strokeWidth="1.2"
                      strokeDasharray="2 6"
                    />
                    {/* Rotating group containing pins */}
                    <motion.g
                      animate={
                        orbitsPaused
                          ? { rotate: 0 }
                          : { rotate: 360 * ring.dir }
                      }
                      transition={{
                        duration: ring.duration,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{ transformOrigin: "0px 0px" }}
                    >
                      {orbitalPins
                        .filter((p) => p.ring === ringIdx)
                        .map((pin) => {
                          const a = (pin.angle * Math.PI) / 180
                          const cx = ring.rx * Math.cos(a)
                          const cy = ring.ry * Math.sin(a)
                          return (
                            <g
                              key={pin.id}
                              transform={`translate(${cx} ${cy})`}
                              onMouseEnter={() => { setHoveredPin(pin.id); setOrbitsPaused(true) }}
                              onMouseLeave={() => { setHoveredPin(null); setOrbitsPaused(false) }}
                              style={{ cursor: "pointer" }}
                            >
                              {/* Counter-tilt so the pin stays upright */}
                              <g transform={`rotate(${-ring.tilt})`}>
                                {/* Glow halo */}
                                <circle r="18" fill="url(#pin-glow)" />
                                {/* Pulse ring */}
                                <motion.circle
                                  r="7"
                                  fill="none"
                                  stroke="oklch(0.58 0.2 142)"
                                  strokeWidth="1.5"
                                  initial={{ opacity: 0.55, scale: 1 }}
                                  animate={{ opacity: 0, scale: 3 }}
                                  transition={{
                                    duration: 2.4,
                                    delay: ringIdx * 0.3 + pin.angle / 200,
                                    repeat: Infinity,
                                    ease: "easeOut",
                                  }}
                                />
                                {/* Pin body */}
                                <motion.circle
                                  r="7"
                                  fill="white"
                                  stroke="oklch(0.58 0.2 142)"
                                  strokeWidth="2"
                                  animate={{ scale: hoveredPin === pin.id ? 1.5 : 1 }}
                                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                                />
                                <circle r="2.5" fill="oklch(0.58 0.2 142)" />
                              </g>
                            </g>
                          )
                        })}
                    </motion.g>
                  </g>
                ))}
              </svg>

              {/* Pin tooltip — DOM overlay so it stays sharp & legible */}
              <AnimatePresence>
                {hoveredPin && (() => {
                  const pin = orbitalPins.find((p) => p.id === hoveredPin)!
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.92 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-6 left-1/2 -translate-x-1/2 glass rounded-2xl px-4 py-2.5 shadow-2xl pointer-events-none"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{pin.flag}</span>
                        <div>
                          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold leading-none">
                            Live · Specialist desk
                          </p>
                          <p className="text-sm font-bold text-foreground leading-tight">
                            {pin.label}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })()}
              </AnimatePresence>

              {/* Top-right compass + live badge */}
              <div className="absolute top-5 right-5 flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 glass rounded-full text-xs font-semibold text-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-bright opacity-60 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-primary" />
                  </span>
                  Live network
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center"
                >
                  <Compass className="w-4 h-4 text-green-primary" />
                </motion.div>
              </div>

              {/* Bottom caption */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 pointer-events-none">
                <div>
                  <p className="text-foreground/55 text-[11px] uppercase tracking-[0.28em] font-semibold mb-2">
                    Yavigo · Global Partner Network
                  </p>
                  <p className="text-foreground text-2xl font-bold leading-tight max-w-sm">
                    Built for the businesses that move the world.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── Floating cards (outside tilt container, so they stay crisp) ── */}

            {/* Live activity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              whileHover={{ x: -4, scale: 1.04 }}
              className="absolute -left-6 top-[14%] glass rounded-2xl p-3.5 w-52 float-a"
            >
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1 flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3 text-green-primary" />
                Applications today
              </p>
              <motion.p
                key={liveCount}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="text-2xl font-bold text-foreground leading-tight tabular-nums"
              >
                {liveCount.toLocaleString()}
              </motion.p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-[11px] text-green-primary font-semibold">▲ 12.4%</span>
                <span className="text-[11px] text-muted-foreground">vs yesterday</span>
              </div>
              {/* Mini sparkline */}
              <svg viewBox="0 0 100 24" className="w-full h-6 mt-2" preserveAspectRatio="none">
                <motion.path
                  d="M 0 18 L 12 14 L 24 16 L 36 10 L 48 12 L 60 6 L 72 8 L 84 4 L 100 2"
                  fill="none"
                  stroke="oklch(0.58 0.2 142)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.6, delay: 1.4, ease: "easeOut" }}
                />
              </svg>
            </motion.div>

            {/* Partner card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.35, type: "spring", stiffness: 200 }}
              whileHover={{ y: -6, scale: 1.04 }}
              className="absolute -right-8 bottom-28 glass rounded-2xl p-4 w-60 float-b"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="relative w-9 h-9 rounded-xl bg-green-light flex items-center justify-center shrink-0">
                  <Building2 className="w-4.5 h-4.5 text-green-primary" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-bright ring-2 ring-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-green-primary leading-tight">B2B Partner Tier</p>
                  <p className="text-[11px] text-muted-foreground">Verified specialist network</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-[11px] text-muted-foreground">4.96 / 5</span>
              </div>
            </motion.div>

            {/* 100+ destinations pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.55, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="absolute left-8 -bottom-4 bg-green-primary text-white rounded-2xl shadow-xl p-3 px-4 flex items-center gap-2.5 float-c glow-green"
            >
              <Sparkles className="w-4 h-4" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/80 font-semibold leading-none">
                  Active in
                </p>
                <p className="text-sm font-bold leading-tight">100+ destinations</p>
              </div>
            </motion.div>

            {/* Compact destination chip cluster (top right of the visual) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7, type: "spring", stiffness: 200 }}
              className="absolute -right-4 top-[8%] flex flex-col gap-2"
            >
              {[
                { flag: "🇪🇺", label: "Schengen", time: "10–15d" },
                { flag: "🇬🇧", label: "UK", time: "15–21d" },
                { flag: "🇦🇪", label: "Dubai", time: "3–5d" },
              ].map((d, i) => (
                <motion.div
                  key={d.label}
                  whileHover={{ x: -4, scale: 1.04 }}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 + i * 0.1 }}
                  className="glass rounded-xl px-3 py-2 flex items-center gap-2.5 shadow-md"
                >
                  <span className="text-base">{d.flag}</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground leading-none">{d.label}</span>
                    <span className="text-[10px] text-muted-foreground leading-none mt-0.5">{d.time}</span>
                  </div>
                  <Globe2 className="w-3 h-3 text-green-primary ml-1" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Trust badges strip ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.5 }}
        className="relative border-t border-border bg-surface-1/70 backdrop-blur-md mt-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            {trustBadges.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + i * 0.08 }}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 group cursor-default"
              >
                <div className="w-8 h-8 rounded-xl bg-green-light flex items-center justify-center shrink-0 group-hover:bg-green-primary group-hover:text-white transition-colors">
                  <Icon className="w-3.5 h-3.5 text-green-primary group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
