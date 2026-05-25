"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, useMotionValueEvent, AnimatePresence, type MotionValue } from "framer-motion"
import Link from "next/link"
import {
  Globe, Zap, Lock, CheckCircle, ArrowRight, FileText,
  Shield, HeadphonesIcon, Star, Users, Award, Quote,
  Clock, ChevronRight, ArrowUpRight, Sparkles, MousePointer2,
} from "lucide-react"
import Magnetic from "@/components/premium/Magnetic"
import TiltCard from "@/components/premium/TiltCard"
import ParallaxImage from "@/components/premium/ParallaxImage"
import { RevealText, RevealBlock } from "@/components/premium/RevealText"
import AtmosphericBackground from "@/components/premium/AtmosphericBackground"
import ConstellationField from "@/components/premium/ConstellationField"
import LightRays from "@/components/premium/LightRays"
import WindReveal from "@/components/premium/WindReveal"

/* ─── shared animation helpers ────────────────────────────── */
const stagger = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: delay } },
})
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label mb-4">{children}</p>
}

/* Spotlight hook — sets CSS vars --mx / --my on hover (used by .spotlight-card) */
function useSpotlight() {
  const ref = useRef<HTMLDivElement>(null)
  function onMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - r.left}px`)
    el.style.setProperty("--my", `${e.clientY - r.top}px`)
  }
  return { ref, onMove }
}

/* ─── 1. STATS BANNER ───────────────────────────────────────── */
const stats = [
  { value: "B2B", label: "Partner Network", icon: Users },
  { value: "Global", label: "Countries Covered", icon: Globe },
  { value: "Expert", label: "Visa & Immigration", icon: Award },
  { value: "Trusted", label: "Specialist Support", icon: HeadphonesIcon },
  { value: "5★", label: "Partner Rating", icon: Star },
]

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section className="bg-green-primary py-12 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className="text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-2">
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-white leading-none mb-0.5">{s.value}</p>
              <p className="text-xs text-white/80 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 2. DESTINATIONS SHOWCASE ──────────────────────────────── */
const destinations = [
  { name: "France", flag: "🇫🇷", image: "/images/dest-paris.jpg", tag: "Schengen Visa", time: "10–15 days", code: "PAR" },
  { name: "United Kingdom", flag: "🇬🇧", image: "/images/dest-london.jpg", tag: "UK Visitor Visa", time: "15–21 days", code: "LDN" },
  { name: "Dubai, UAE", flag: "🇦🇪", image: "/images/dest-dubai.jpg", tag: "E-Visa", time: "3–5 days", code: "DXB" },
  { name: "Netherlands", flag: "🇳🇱", image: "/images/dest-schengen.jpg", tag: "Schengen Visa", time: "10–15 days", code: "AMS" },
  { name: "United States", flag: "🇺🇸", image: "/images/dest-usa.jpg", tag: "B1/B2 Visa", time: "21–60 days", code: "NYC" },
  { name: "Canada", flag: "🇨🇦", image: "/images/dest-canada.jpg", tag: "eTA / Visa", time: "14–30 days", code: "YYZ" },
]

type Destination = (typeof destinations)[number]
const PANELS = destinations.length

function DestinationPanel({
  dest,
  index,
  progress,
}: {
  dest: Destination
  index: number
  progress: MotionValue<number>
}) {
  // Each panel is "centered" when scrollYProgress equals index / (PANELS - 1)
  const start = Math.max(0, (index - 1) / (PANELS - 1))
  const center = index / (PANELS - 1)
  const end = Math.min(1, (index + 1) / (PANELS - 1))

  // Multi-axis zoom system
  const panelScale = useTransform(progress, [start, center, end], [0.78, 1, 0.78])
  const panelOpacity = useTransform(progress, [start, center, end], [0.4, 1, 0.4])
  const blurPx = useTransform(progress, [start, center, end], [8, 0, 8])
  const panelFilter = useMotionTemplate`blur(${blurPx}px)`

  // Ken Burns on background image
  const imgScale = useTransform(progress, [start, center, end], [1.5, 1.02, 1.5])

  // Title vertical parallax + opacity ramp
  const titleY = useTransform(progress, [start, center, end], [140, 0, -140])
  const ctaOpacity = useTransform(progress, [center - (end - center) * 0.5, center, center + (end - center) * 0.5], [0, 1, 0])
  const ctaY = useTransform(progress, [start, center, end], [40, 0, -40])

  return (
    <motion.div
      style={{ scale: panelScale, opacity: panelOpacity, filter: panelFilter, willChange: "transform, filter, opacity" }}
      className="relative shrink-0 w-screen h-screen flex items-center justify-center px-6 md:px-16 lg:px-24"
    >
      {/* Ken Burns background image */}
      <motion.div style={{ scale: imgScale }} className="absolute inset-0">
        <Image src={dest.image} alt={dest.name} fill priority={index < 2} className="object-cover" sizes="100vw" />
      </motion.div>

      {/* Layered vignettes */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-black/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

      {/* Soft halo behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 55%, oklch(0.58 0.2 142 / 0.18) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full">
        <motion.div style={{ y: titleY }}>
          {/* Coordinate header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/40" />
            <p className="font-mono text-[10px] tracking-[0.4em] text-white/80">
              {String(index + 1).padStart(2, "0")} / {String(PANELS).padStart(2, "0")} · {dest.code}
            </p>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/40" />
          </div>

          {/* Flag + tag */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="text-6xl md:text-7xl drop-shadow-2xl">{dest.flag}</span>
            <span className="px-4 py-2 glass-dark rounded-full text-white text-xs md:text-sm font-semibold tracking-wider">
              {dest.tag}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.95] tracking-tight text-center mb-6 drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            {dest.name}
          </h3>

          {/* Meta */}
          <div className="flex items-center justify-center gap-6 mb-10 text-white/90">
            <span className="flex items-center gap-2 text-sm md:text-base">
              <Clock className="w-4 h-4 text-green-bright" />
              {dest.time}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="text-sm md:text-base">Specialist desk · Live</span>
          </div>

          {/* CTAs */}
          <motion.div style={{ opacity: ctaOpacity, y: ctaY }} className="flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.32}>
              <Link href="/contact" data-cursor data-cursor-label="Apply">
                <span className="liquid-btn inline-flex items-center gap-2 px-8 py-4 text-white font-bold rounded-2xl glow-green text-base md:text-lg cursor-pointer">
                  Apply for {dest.name.split(",")[0]}
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link href="/visa-requirements">
                <span className="inline-flex items-center gap-2 px-8 py-4 glass-dark border border-white/20 text-white font-semibold rounded-2xl cursor-pointer hover:bg-white/15 transition-colors">
                  View Requirements
                </span>
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function DestinationsHUD({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>
}) {
  const [currentIdx, setCurrentIdx] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(Math.max(Math.round(v * (PANELS - 1)), 0), PANELS - 1)
    setCurrentIdx(idx)
  })

  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <>
      {/* Top-left section heading */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-30 pointer-events-none">
        <p className="font-mono text-[10px] md:text-xs tracking-[0.35em] text-white/70 mb-2">
          YAVIGO · GLOBAL ATLAS
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight max-w-md drop-shadow-lg">
          Where Do You Want to Go?
        </h2>
      </div>

      {/* Top-right panel counter */}
      <div className="absolute top-6 right-6 md:top-10 md:right-10 z-30 pointer-events-none">
        <div className="glass-dark rounded-2xl px-4 py-3 flex items-end gap-2 font-mono">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={currentIdx}
              initial={{ y: 18, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -18, opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl font-bold text-white tabular-nums leading-none"
            >
              {String(currentIdx + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
          <span className="text-xs text-white/50 tabular-nums leading-none pb-1">
            / {String(PANELS).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Bottom: progress bar + panel chips + hint */}
      <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 z-30">
        {/* Panel chip strip */}
        <div className="hidden md:flex items-center gap-1.5 mb-4 pointer-events-none">
          {destinations.map((d, i) => (
            <motion.div
              key={d.name}
              animate={{
                width: i === currentIdx ? 80 : 28,
                opacity: i === currentIdx ? 1 : 0.4,
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-8 rounded-full glass-dark border border-white/15 overflow-hidden flex items-center justify-center"
            >
              <AnimatePresence>
                {i === currentIdx && (
                  <motion.span
                    key="label"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35 }}
                    className="text-[10px] font-mono tracking-[0.2em] text-white whitespace-nowrap"
                  >
                    {d.code}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="relative h-px bg-white/15 rounded-full overflow-hidden">
          <motion.div
            style={{ scaleX: progressScaleX, transformOrigin: "left" }}
            className="absolute inset-0 bg-gradient-to-r from-green-primary via-green-bright to-green-primary"
          />
        </div>

        {/* Scroll hint */}
        <div className="flex items-center justify-between mt-3 text-white/55 font-mono text-[10px] tracking-[0.32em]">
          <span className="flex items-center gap-2">
            <MousePointer2 className="w-3 h-3 -rotate-90" />
            SCROLL TO EXPLORE
          </span>
          <span className="hidden md:inline">YAVIGO · DESTINATIONS · 2025</span>
        </div>
      </div>
    </>
  )
}

export function DestinationsShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  // Smooth the horizontal translation
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -(PANELS - 1) * 100])
  const smoothX = useSpring(rawX, { stiffness: 90, damping: 26, mass: 0.5 })
  const trackX = useTransform(smoothX, (v) => `${v}vw`)

  return (
    <section
      ref={ref}
      id="destinations"
      className="relative bg-black"
      style={{ height: `${PANELS * 100}vh` }}
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Base ambient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.12_0.04_142)] via-black to-[oklch(0.12_0.04_142)]" />

        {/* Aurora wash */}
        <div
          className="absolute -top-1/3 -left-1/4 w-[60vw] h-[60vw] rounded-full blur-3xl opacity-50 animate-aurora"
          style={{ background: "oklch(0.42 0.16 142 / 0.45)" }}
        />
        <div
          className="absolute -bottom-1/3 -right-1/4 w-[60vw] h-[60vw] rounded-full blur-3xl opacity-40 animate-aurora-slow"
          style={{ background: "oklch(0.32 0.12 142 / 0.5)" }}
        />

        {/* Horizontal track */}
        <motion.div style={{ x: trackX }} className="flex h-full will-change-transform">
          {destinations.map((dest, i) => (
            <DestinationPanel key={dest.name} dest={dest} index={i} progress={scrollYProgress} />
          ))}
        </motion.div>

        {/* HUD */}
        <DestinationsHUD scrollYProgress={scrollYProgress} />
      </div>
    </section>
  )
}

/* ─── 3. SERVICES GRID ──────────────────────────────────────── */
const services = [
  { icon: FileText, title: "Visa Application", desc: "End-to-end visa processing for 100+ countries. We handle your entire application with precision.", accent: "oklch(0.58 0.2 142)", tint: "oklch(0.93 0.06 142)" },
  { icon: Users, title: "Immigration Services", desc: "Long-term visas, residency, and corporate mobility — handled by certified immigration specialists.", accent: "oklch(0.55 0.16 220)", tint: "oklch(0.93 0.06 220)" },
  { icon: Shield, title: "Fraud Detection", desc: "AI-powered fraud screening ensures every application is safe, secure, and legitimate.", accent: "oklch(0.65 0.18 60)", tint: "oklch(0.94 0.06 60)" },
  { icon: Globe, title: "Europe & UK Visas", desc: "Specialists in Schengen, UK Standard, and European Union visitor visas with high success rates.", accent: "oklch(0.55 0.2 280)", tint: "oklch(0.94 0.06 280)" },
  { icon: Lock, title: "E-Visa Processing", desc: "Fully online document submission. No physical passport handover required for eligible visas.", accent: "oklch(0.55 0.16 180)", tint: "oklch(0.93 0.06 180)" },
  { icon: HeadphonesIcon, title: "Dedicated Partner Support", desc: "Specialist account managers for travel agencies, corporates, and consultancies.", accent: "oklch(0.62 0.2 340)", tint: "oklch(0.94 0.06 340)" },
]

type Service = (typeof services)[number]

function ServiceCard({ svc, index }: { svc: Service; index: number }) {
  const spot = useSpotlight()
  return (
    <WindReveal delay={index * 0.08} className="rounded-3xl">
      <TiltCard intensity={5} className="rounded-3xl">
        <div
          ref={spot.ref}
          onMouseMove={spot.onMove}
          className="spotlight-card group h-full bg-white rounded-3xl border border-border p-7 hover:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.18)] transition-all duration-500 cursor-pointer"
        >
          <div className="relative inline-block mb-5">
            <motion.div
              whileHover={{ rotate: -6, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className="relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm"
              style={{
                background: `linear-gradient(135deg, ${svc.tint}, white)`,
                boxShadow: `0 8px 24px -8px ${svc.accent}`,
              }}
            >
              <svc.icon className="w-6 h-6" style={{ color: svc.accent }} />
              <span
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{ background: svc.accent, zIndex: -1 }}
              />
            </motion.div>
          </div>

          <h3 className="font-bold text-xl mb-2.5 tracking-tight" style={{ color: "var(--heading-color)" }}>
            {svc.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">{svc.desc}</p>

          <Link href="/services" className="link-underline">
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-primary group-hover:text-green-dark transition-colors">
              Learn more <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <span
            className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
            style={{ background: `linear-gradient(90deg, ${svc.accent}, transparent)` }}
          />
        </div>
      </TiltCard>
    </WindReveal>
  )
}

export function ServicesSection() {
  return (
    <section className="relative py-28 bg-surface-1 overflow-hidden" id="services">
      <AtmosphericBackground variant="cool" withDots withSpotlight />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBlock className="text-center mb-16">
          <SectionLabel>What We Offer</SectionLabel>
          <RevealText as="h2" className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-balance tracking-tight">
            B2B Visa & Immigration Services
          </RevealText>
          <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
            Specialist visa and immigration capabilities built for travel partners, corporates, and consultancies.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((svc, i) => (
            <ServiceCard key={svc.title} svc={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 4. HOW IT WORKS ───────────────────────────────────────── */
const steps = [
  { step: "01", title: "Choose Destination", desc: "Select your destination country and visa type from our list of 100+ countries." },
  { step: "02", title: "Upload Documents", desc: "Securely upload your documents online. No need to physically submit your passport for e-visas." },
  { step: "03", title: "We Process", desc: "Our expert team reviews and submits your application with fraud detection and quality checks." },
  { step: "04", title: "Receive Visa", desc: "Get your e-visa delivered to your inbox or we guide you for stamp collection at the embassy." },
]

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const connectorProgress = useTransform(scrollYProgress, [0.2, 0.7], [0, 1])
  const connectorWidth = useTransform(connectorProgress, (v) => `${v * 100}%`)

  return (
    <section ref={ref} className="relative py-28 bg-white overflow-hidden" id="process">
      <AtmosphericBackground variant="warm" withDots withSpotlight={false} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBlock className="text-center mb-20">
          <SectionLabel>Simple Process</SectionLabel>
          <RevealText as="h2" className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            Apply in 4 Easy Steps
          </RevealText>
          <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
            From application to approval — our streamlined process makes visa applications effortless.
          </p>
        </RevealBlock>

        <div className="relative">
          {/* Scroll-driven connector line */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-border" />
          <motion.div
            style={{ width: connectorWidth }}
            className="hidden lg:block absolute top-10 left-[12.5%] h-px bg-gradient-to-r from-green-primary via-green-bright to-green-primary"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, i) => (
              <RevealBlock key={step.step} delay={i * 0.12} y={36}>
                <div className="relative text-center group">
                  {/* Circle */}
                  <div className="relative inline-block mb-6">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 240, damping: 16 }}
                      className="relative w-20 h-20 rounded-3xl bg-white border border-green-primary/20 flex items-center justify-center mx-auto shadow-[0_12px_30px_-10px_rgba(22,163,74,0.35)] ambient-ring"
                    >
                      <span className="text-2xl font-bold text-green-primary tabular-nums">{step.step}</span>
                    </motion.div>
                    {/* Pulse */}
                    <motion.span
                      initial={{ opacity: 0.55, scale: 1 }}
                      animate={inView ? { opacity: 0, scale: 2.4 } : {}}
                      transition={{ duration: 2.6, delay: 0.4 + i * 0.2, repeat: Infinity, ease: "easeOut" }}
                      className="absolute inset-0 rounded-3xl border-2 border-green-primary"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-2 tracking-tight" style={{ color: "var(--heading-color)" }}>{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>

        <RevealBlock className="text-center mt-16" delay={0.4}>
          <Magnetic strength={0.32}>
            <Link href="/contact">
              <motion.span
                whileTap={{ scale: 0.97 }}
                className="liquid-btn inline-flex items-center gap-2 px-9 py-4 text-white font-semibold rounded-2xl cursor-pointer glow-green"
                data-cursor data-cursor-label="Start"
              >
                Start Your Application
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </Magnetic>
        </RevealBlock>
      </div>
    </section>
  )
}

/* ─── 5. WHY CHOOSE US ──────────────────────────────────────── */
const reasons = [
  { icon: Zap, title: "Lightning-Fast Approvals", desc: "Most e-visas processed in 48–72 hours with priority queues available." },
  { icon: Shield, title: "Advanced Fraud Protection", desc: "AI-powered fraud detection ensures every application is safe and compliant." },
  { icon: Lock, title: "Fully Online Workflow", desc: "Submit everything digitally — no embassy queues for partner applications." },
  { icon: Users, title: "Dedicated Visa & Immigration Experts", desc: "Every application is reviewed by certified visa and immigration specialists." },
  { icon: Globe, title: "100+ Countries Covered", desc: "From Schengen to Southeast Asia, we cover virtually every destination." },
  { icon: HeadphonesIcon, title: "Dedicated Partner Support", desc: "Specialist account managers for travel and corporate partners." },
]

type Reason = (typeof reasons)[number]

function ReasonCard({ reason, index }: { reason: Reason; index: number }) {
  const spot = useSpotlight()
  return (
    <WindReveal delay={0.25 + index * 0.1} leafCount={5} className="rounded-2xl">
      <TiltCard intensity={4} className="rounded-2xl">
        <div
          ref={spot.ref}
          onMouseMove={spot.onMove}
          className="spotlight-card group bg-white rounded-2xl border border-border p-5 hover:border-green-primary/40 transition-colors h-full"
        >
          <div className="w-10 h-10 rounded-xl bg-green-light flex items-center justify-center mb-3 group-hover:bg-green-primary transition-colors duration-500">
            <reason.icon className="w-4.5 h-4.5 text-green-primary group-hover:text-white transition-colors" />
          </div>
          <p className="font-semibold text-foreground text-sm leading-tight">{reason.title}</p>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{reason.desc}</p>
        </div>
      </TiltCard>
    </WindReveal>
  )
}

export function WhyChooseUs() {
  return (
    <section className="relative py-28 bg-surface-1 overflow-hidden" id="why-us">
      <AtmosphericBackground variant="default" withDots withSpotlight />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <RevealBlock>
              <SectionLabel>Why Yavigo</SectionLabel>
              <RevealText as="h2" className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance tracking-tight">
                The Smarter Way to Get Your Visa
              </RevealText>
              <p className="text-muted-foreground mb-10 leading-relaxed text-base sm:text-lg">
                Yavigo combines technology and human expertise to deliver a world-class visa experience —
                built for your peace of mind.
              </p>
            </RevealBlock>

            <div className="space-y-5">
              {reasons.slice(0, 4).map((r, i) => (
                <RevealBlock key={r.title} delay={i * 0.08} y={20}>
                  <motion.div
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="flex items-start gap-4 group cursor-default"
                  >
                    <div className="relative w-12 h-12 rounded-2xl bg-white border border-green-primary/20 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-green-primary group-hover:border-green-primary transition-colors duration-500">
                      <r.icon className="w-5 h-5 text-green-primary group-hover:text-white transition-colors" />
                      <span className="absolute -inset-2 rounded-2xl bg-green-primary opacity-0 group-hover:opacity-25 blur-md transition-opacity duration-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{r.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{r.desc}</p>
                    </div>
                  </motion.div>
                </RevealBlock>
              ))}
            </div>

            <RevealBlock className="mt-10" delay={0.4}>
              <Magnetic strength={0.3}>
                <Link href="/contact">
                  <motion.span
                    whileTap={{ scale: 0.97 }}
                    className="liquid-btn inline-flex items-center gap-2 px-8 py-3.5 text-white font-semibold rounded-2xl cursor-pointer glow-green"
                    data-cursor data-cursor-label="Apply"
                  >
                    Apply for Visa Now
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </Magnetic>
            </RevealBlock>
          </div>

          {/* Right */}
          <RevealBlock delay={0.15}>
            <TiltCard intensity={5} className="rounded-3xl">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.28)]">
                <ParallaxImage
                  src="/images/team.jpg"
                  alt="Our expert team"
                  aspect="4/3"
                  scrollParallax={10}
                />
                {/* Glass overlay card */}
                <div className="absolute bottom-5 left-5 right-5 glass rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-green-primary to-green-bright border-2 border-white flex items-center justify-center text-white">
                        <Users className="w-4 h-4" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Expert Team</p>
                    <p className="text-xs text-muted-foreground">50+ certified visa & immigration specialists</p>
                  </div>
                </div>
              </div>
            </TiltCard>

            <div className="grid grid-cols-2 gap-4 mt-5">
              {reasons.slice(4).map((r, i) => (
                <ReasonCard key={r.title} reason={r} index={i} />
              ))}
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  )
}

/* ─── 6. TESTIMONIALS ───────────────────────────────────────── */
const testimonials = [
  { name: "Sarah M.", country: "🇩🇪 Germany", rating: 5, text: "Schengen application came through in under three weeks. The document checklist was clear up front — no last-minute surprises.", role: "Schengen visa" },
  { name: "James K.", country: "🇬🇧 United Kingdom", rating: 5, text: "We applied for visas for the four of us through Yavigo. The portal made it easy to track everything. Two weeks end to end.", role: "UK visitor visa" },
  { name: "Priya R.", country: "🇦🇪 Dubai", rating: 5, text: "Got the Dubai e-visa within a few business days. The form was straightforward and someone replied to my email queries the same day.", role: "UAE e-visa" },
  { name: "Daniel O.", country: "🇺🇸 United States", rating: 4, text: "Yavigo helped me prep the DS-160 and walked me through interview prep. Their guidance made the difference.", role: "US B1/B2 visa" },
]

export function TestimonialsSection() {
  return (
    <section className="relative py-28 bg-white overflow-hidden" id="testimonials">
      <AtmosphericBackground variant="default" withDots withSpotlight={false} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBlock className="text-center mb-16">
          <SectionLabel>Customer Reviews</SectionLabel>
          <RevealText as="h2" className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            Travelers Love Yavigo
          </RevealText>
          <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
            Don&apos;t just take our word for it — hear from the partners and applicants we serve.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <WindReveal key={t.name} delay={i * 0.1} leafCount={5} className="rounded-3xl h-full">
              <TiltCard intensity={5} className="rounded-3xl h-full">
                <div className="relative bg-white border border-border rounded-3xl p-7 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.14)] transition-shadow duration-500 h-full overflow-hidden">
                  <Quote className="absolute -top-2 -right-2 w-24 h-24 text-green-light" strokeWidth={1} />
                  <div className="relative">
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(t.rating)].map((_, j) => (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + j * 0.05, type: "spring", stiffness: 240 }}
                        >
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-sm text-foreground/85 leading-relaxed mb-6">&quot;{t.text}&quot;</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-primary to-green-bright flex items-center justify-center shrink-0 text-white font-bold">
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role} · {t.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </WindReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 7. BLOG SECTION ───────────────────────────────────────── */
const posts = [
  { image: "/images/blog-1.jpg", category: "Visa Tips", title: "Everything You Need to Know About the Schengen Visa in 2025", excerpt: "A comprehensive guide covering requirements, processing times, and common mistakes to avoid.", date: "Mar 12, 2025", readTime: "5 min read" },
  { image: "/images/blog-2.jpg", category: "How-To", title: "How to Apply for a UK Standard Visitor Visa Online", excerpt: "Step-by-step walkthrough of the UK visa application process from document prep to approval.", date: "Mar 5, 2025", readTime: "7 min read" },
  { image: "/images/blog-3.jpg", category: "Travel Guide", title: "Top 10 Travel Tips for First-Time International Travelers", excerpt: "Essential advice from seasoned travelers to make your first international trip smooth and memorable.", date: "Feb 28, 2025", readTime: "4 min read" },
]

export function BlogSection() {
  return (
    <section className="relative py-28 bg-surface-1 overflow-hidden" id="blog">
      <AtmosphericBackground variant="cool" withDots withSpotlight />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBlock className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <SectionLabel>Travel Blog</SectionLabel>
            <RevealText as="h2" className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 tracking-tight">
              Guides & Visa Tips
            </RevealText>
            <p className="text-muted-foreground max-w-md text-base sm:text-lg">
              Expert advice on visa applications, travel planning, and destination guides.
            </p>
          </div>
          <Magnetic strength={0.25}>
            <Link href="/blog">
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 glass rounded-2xl text-green-primary font-semibold hover:text-green-dark transition-colors cursor-pointer text-sm"
              >
                View All Posts
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </Magnetic>
        </RevealBlock>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <WindReveal key={post.title} delay={i * 0.1} leafCount={6} className="rounded-3xl">
              <TiltCard intensity={5} className="rounded-3xl">
                <Link href="/blog">
                  <div className="group/post bg-white rounded-3xl border border-border overflow-hidden hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.16)] transition-all duration-500 cursor-pointer">
                    <ParallaxImage
                      src={post.image}
                      alt={post.title}
                      aspect="16/10"
                      scrollParallax={6}
                    />
                    {/* Category pill on top of image */}
                    <span className="absolute top-4 left-4 px-3 py-1 glass-dark text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>

                    <div className="p-6">
                      <p className="text-xs text-muted-foreground mb-3 flex items-center gap-3">
                        <span>{post.date}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                        <span>{post.readTime}</span>
                      </p>
                      <h3 className="font-bold text-lg text-foreground mb-3 leading-snug group-hover/post:text-green-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-5">{post.excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-primary group-hover/post:text-green-dark transition-colors link-underline">
                        Read More <ChevronRight className="w-4 h-4 transition-transform group-hover/post:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </WindReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 8. CTA BAND ───────────────────────────────────────────── */
export function CtaBand() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"])

  return (
    <section
      ref={ref}
      className="relative py-28 overflow-hidden"
      id="cta"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.42 0.16 142) 0%, oklch(0.5 0.18 142) 50%, oklch(0.58 0.2 142) 100%)",
      }}
    >
      {/* Animated atmospheric blobs */}
      <motion.div
        style={{ y: blob1Y }}
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-3xl"
      >
        <div className="w-full h-full rounded-full" style={{ background: "oklch(0.68 0.22 142 / 0.45)" }} />
      </motion.div>
      <motion.div
        style={{ y: blob2Y }}
        className="absolute -bottom-32 -right-32 w-[700px] h-[700px] rounded-full blur-3xl"
      >
        <div className="w-full h-full rounded-full" style={{ background: "oklch(0.78 0.18 142 / 0.35)" }} />
      </motion.div>

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Interactive constellation reacting to cursor */}
      <ConstellationField
        nodeColor="rgba(255, 255, 255, 0.85)"
        lineColor="rgba(255, 255, 255, 0.45)"
        maxDist={150}
        density={0.00012}
      />

      {/* Volumetric light rays */}
      <LightRays origin="top-center" intensity={0.6} color="oklch(0.95 0.12 142 / 0.18)" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <RevealBlock>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/80 text-sm font-semibold uppercase tracking-[0.3em] mb-5 inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Start Today — It&apos;s Free to Apply
          </motion.p>
          <RevealText as="h2" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance tracking-tight">
            Your Dream Destination Awaits
          </RevealText>
          <p className="text-white/85 text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Partner with Yavigo for fast, secure, and reliable visa and immigration processing built for your business.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Magnetic strength={0.3}>
              <Link href="/contact">
                <motion.span
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-9 py-4 bg-white text-green-primary font-bold rounded-2xl hover:bg-green-light transition-all shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] cursor-pointer"
                  data-cursor data-cursor-label="Apply"
                >
                  Apply for Visa Now
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link href="/services">
                <motion.span
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-9 py-4 bg-transparent border-2 border-white/50 text-white font-semibold rounded-2xl hover:border-white hover:bg-white/10 transition-all cursor-pointer backdrop-blur-sm"
                >
                  View All Services
                </motion.span>
              </Link>
            </Magnetic>
          </div>
        </RevealBlock>
      </div>
    </section>
  )
}
