"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  Globe, Zap, Lock, CheckCircle, ArrowRight, FileText,
  Plane, Shield, HeadphonesIcon, Star, Users, Award,
  Clock, ChevronRight,
} from "lucide-react"

/* ─── shared animation helpers ────────────────────────────── */
const stagger = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: delay } },
})
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}
const fadeLeft = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label mb-4">{children}</p>
}

/* ─── 1. STATS BANNER ───────────────────────────────────────── */
const stats = [
  { value: "50K+", label: "Visas Processed", icon: Globe },
  { value: "180+", label: "Countries Covered", icon: Plane },
  { value: "95%", label: "Approval Rate", icon: Award },
  { value: "24/7", label: "Expert Support", icon: HeadphonesIcon },
  { value: "5★", label: "Customer Rating", icon: Star },
]

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section className="bg-green-primary py-12 overflow-hidden">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
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
  { name: "France", flag: "🇫🇷", image: "/images/dest-paris.jpg", tag: "Schengen Visa", time: "10–15 days" },
  { name: "United Kingdom", flag: "🇬🇧", image: "/images/dest-london.jpg", tag: "UK Visitor Visa", time: "15–21 days" },
  { name: "Dubai, UAE", flag: "🇦🇪", image: "/images/dest-dubai.jpg", tag: "E-Visa", time: "3–5 days" },
  { name: "Netherlands", flag: "🇳🇱", image: "/images/dest-schengen.jpg", tag: "Schengen Visa", time: "10–15 days" },
  { name: "United States", flag: "🇺🇸", image: "/images/dest-usa.jpg", tag: "B1/B2 Visa", time: "21–60 days" },
  { name: "Canada", flag: "🇨🇦", image: "/images/dest-canada.jpg", tag: "eTA / Visa", time: "14–30 days" },
]

export function DestinationsShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-24 bg-white" id="destinations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={stagger()}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Popular Destinations</SectionLabel>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
            Where Do You Want to Go?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
            We provide fast, reliable visa services for the world's most popular destinations.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl overflow-hidden bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer card-lift"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 text-green-dark text-xs font-semibold rounded-lg">
                  {dest.tag}
                </span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground text-sm">{dest.flag} {dest.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {dest.time}
                  </p>
                </div>
                <Link href="/contact">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-primary text-white text-xs font-semibold rounded-lg hover:bg-green-dark transition-colors cursor-pointer">
                    Apply
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-10"
        >
          <Link href="/visa-requirements">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-green-primary text-green-primary font-semibold rounded-xl hover:bg-green-light transition-all cursor-pointer"
            >
              View All Destinations
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── 3. SERVICES GRID ──────────────────────────────────────── */
const services = [
  {
    icon: FileText,
    title: "Visa Application",
    desc: "End-to-end visa processing for 180+ countries. We handle your entire application with precision.",
    color: "bg-green-light",
    iconColor: "text-green-primary",
    href: "/services",
  },
  {
    icon: Plane,
    title: "Flight Booking",
    desc: "Domestic and international flights at competitive rates. Travel smarter with our booking experts.",
    color: "bg-blue-50",
    iconColor: "text-blue-500",
    href: "/services#flights",
  },
  {
    icon: Shield,
    title: "Fraud Detection",
    desc: "Advanced AI-powered fraud screening ensures every application is safe, secure, and legitimate.",
    color: "bg-orange-50",
    iconColor: "text-orange-500",
    href: "/services",
  },
  {
    icon: Globe,
    title: "Europe & UK Visas",
    desc: "Specialists in Schengen, UK Standard, and European Union visitor visas with high success rates.",
    color: "bg-purple-50",
    iconColor: "text-purple-500",
    href: "/services",
  },
  {
    icon: Lock,
    title: "E-Visa Processing",
    desc: "Fully online document submission. No physical passport handover required for eligible visas.",
    color: "bg-teal-50",
    iconColor: "text-teal-500",
    href: "/services",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    desc: "Round-the-clock expert assistance via chat, email, and phone. Your journey is always supported.",
    color: "bg-pink-50",
    iconColor: "text-pink-500",
    href: "/contact",
  },
]

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-24 bg-surface-1" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={stagger()}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp}><SectionLabel>What We Offer</SectionLabel></motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold mb-4">
            Complete Travel Solutions
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
            Everything you need for a seamless international journey — from visa to landing.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.09, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-2xl border border-border p-6 hover:shadow-md transition-all cursor-pointer card-lift"
            >
              <div className={`w-12 h-12 ${svc.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <svc.icon className={`w-6 h-6 ${svc.iconColor}`} />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: "var(--heading-color)" }}>{svc.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{svc.desc}</p>
              <Link href={svc.href}>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-primary hover:text-green-dark transition-colors cursor-pointer">
                  Learn more <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 4. HOW IT WORKS ───────────────────────────────────────── */
const steps = [
  {
    step: "01",
    title: "Choose Destination",
    desc: "Select your destination country and visa type from our comprehensive list of 180+ countries.",
  },
  {
    step: "02",
    title: "Upload Documents",
    desc: "Securely upload your documents online. No need to physically submit your passport for e-visas.",
  },
  {
    step: "03",
    title: "We Process",
    desc: "Our expert team reviews and submits your application with fraud detection and quality checks.",
  },
  {
    step: "04",
    title: "Receive Visa",
    desc: "Get your e-visa delivered to your inbox or we guide you for stamp collection at the embassy.",
  },
]

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-24 bg-white" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={stagger()}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp}><SectionLabel>Simple Process</SectionLabel></motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold mb-4">
            Apply in 4 Easy Steps
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
            From application to approval — our streamlined process makes visa applications effortless.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+32px)] right-[calc(-50%+32px)] h-px border-t-2 border-dashed border-green-primary/30" />
              )}
              <div className="w-16 h-16 rounded-2xl bg-green-light border-2 border-green-primary/20 flex items-center justify-center mx-auto mb-5">
                <span className="text-xl font-bold text-green-primary">{step.step}</span>
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: "var(--heading-color)" }}>{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <Link href="/contact">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-primary text-white font-semibold rounded-xl hover:bg-green-dark transition-all shadow-md shadow-green-primary/20 cursor-pointer btn-glow"
            >
              Start Your Application
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── 5. WHY CHOOSE US ──────────────────────────────────────── */
const reasons = [
  { icon: Zap, title: "Lightning-Fast Approvals", desc: "Most e-visas processed in 48–72 hours with priority queues available." },
  { icon: Shield, title: "Advanced Fraud Protection", desc: "AI-powered fraud detection ensures your application is safe and compliant." },
  { icon: Lock, title: "Fully Online Process", desc: "No need to visit offices. Submit everything digitally from your home." },
  { icon: Users, title: "Dedicated Visa Experts", desc: "Each application is reviewed by certified visa specialists." },
  { icon: Globe, title: "180+ Countries Covered", desc: "From Schengen to Southeast Asia, we cover virtually every destination." },
  { icon: HeadphonesIcon, title: "24/7 Live Support", desc: "Our team is always on standby via chat, phone, or email." },
]

export function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-24 bg-surface-1" id="why-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            ref={ref}
            variants={stagger()}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeUp}><SectionLabel>Why Yavigo</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold mb-5 text-balance">
              The Smarter Way to Get Your Visa
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mb-8 leading-relaxed">
              Yavigo combines technology and human expertise to deliver a world-class visa experience. Inspired by platforms like Atlys and Expedia, built for your peace of mind.
            </motion.p>
            <motion.div variants={stagger(0.1)} className="space-y-4">
              {reasons.slice(0, 4).map((r) => (
                <motion.div key={r.title} variants={fadeUp} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-green-primary/20 flex items-center justify-center shrink-0 shadow-sm">
                    <r.icon className="w-5 h-5 text-green-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{r.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="mt-8">
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-primary text-white font-semibold rounded-xl hover:bg-green-dark transition-all shadow-md shadow-green-primary/20 cursor-pointer"
                >
                  Apply for Visa Now
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — image + extra reasons */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
              <Image src="/images/team.jpg" alt="Our expert team" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3 border border-border">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-green-primary/20 border-2 border-white flex items-center justify-center">
                      <Users className="w-3.5 h-3.5 text-green-primary" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Expert Team</p>
                  <p className="text-xs text-muted-foreground">50+ certified visa specialists</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {reasons.slice(4).map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="bg-white rounded-2xl border border-border p-4 hover:border-green-primary/40 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-green-light flex items-center justify-center mb-3">
                    <r.icon className="w-4.5 h-4.5 text-green-primary" />
                  </div>
                  <p className="font-semibold text-foreground text-sm">{r.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{r.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── 6. TESTIMONIALS ───────────────────────────────────────── */
const testimonials = [
  {
    name: "Sarah M.",
    country: "🇩🇪 Germany",
    rating: 5,
    text: "Got my Schengen visa within 12 days. The process was completely online and the support team was incredibly helpful throughout.",
    role: "Business Traveler",
  },
  {
    name: "James K.",
    country: "🇬🇧 United Kingdom",
    rating: 5,
    text: "Yavigo made our family vacation stress-free. All documents were handled digitally and we received our visas without any hassle.",
    role: "Family Traveler",
  },
  {
    name: "Priya R.",
    country: "🇦🇪 Dubai",
    rating: 5,
    text: "The fastest e-visa I've ever received — approved in under 3 days! Transparent pricing and excellent communication.",
    role: "Frequent Traveler",
  },
  {
    name: "Daniel O.",
    country: "🇺🇸 United States",
    rating: 5,
    text: "I was worried about the US visa process but Yavigo guided me step-by-step. Approved on the first attempt!",
    role: "Student Visa",
  },
]

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-24 bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={stagger()}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp}><SectionLabel>Customer Reviews</SectionLabel></motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold mb-4">
            Travelers Love Yavigo
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
            Don&apos;t just take our word for it — here&apos;s what our 120,000+ happy customers say.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-all card-lift"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-green-light flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-green-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role} · {t.country}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 7. BLOG SECTION ───────────────────────────────────────── */
const posts = [
  {
    image: "/images/blog-1.jpg",
    category: "Visa Tips",
    title: "Everything You Need to Know About the Schengen Visa in 2025",
    excerpt: "A comprehensive guide covering requirements, processing times, and common mistakes to avoid.",
    date: "March 12, 2025",
    readTime: "5 min read",
  },
  {
    image: "/images/blog-2.jpg",
    category: "How-To",
    title: "How to Apply for a UK Standard Visitor Visa Online",
    excerpt: "Step-by-step walkthrough of the UK visa application process from document prep to approval.",
    date: "March 5, 2025",
    readTime: "7 min read",
  },
  {
    image: "/images/blog-3.jpg",
    category: "Travel Guide",
    title: "Top 10 Travel Tips for First-Time International Travelers",
    excerpt: "Essential advice from seasoned travelers to make your first international trip smooth and memorable.",
    date: "February 28, 2025",
    readTime: "4 min read",
  },
]

export function BlogSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-24 bg-surface-1" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={stagger()}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <motion.div variants={fadeUp}><SectionLabel>Travel Blog</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold mb-2">
              Guides &amp; Visa Tips
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-md">
              Expert advice on visa applications, travel planning, and destination guides.
            </motion.p>
          </div>
          <motion.div variants={fadeLeft}>
            <Link href="/blog">
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-green-primary text-green-primary font-semibold rounded-xl hover:bg-green-light transition-all cursor-pointer text-sm"
              >
                View All Posts
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {posts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-md transition-all cursor-pointer card-lift"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-green-primary text-white text-xs font-semibold rounded-lg">
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs text-muted-foreground mb-2">{post.date} · {post.readTime}</p>
                <h3 className="font-bold text-foreground mb-2 leading-snug group-hover:text-green-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                <Link href="/blog">
                  <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-green-primary hover:text-green-dark transition-colors cursor-pointer">
                    Read More <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 8. CTA BAND ───────────────────────────────────────────── */
export function CtaBand() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section className="py-20 bg-green-primary overflow-hidden relative" id="cta">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          variants={stagger()}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.p variants={fadeUp} className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-4">
            Start Today — It&apos;s Free to Apply
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white mb-5 text-balance">
            Your Dream Destination Awaits
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Join 120,000+ travelers who trusted Yavigo for fast, secure, and hassle-free visa services.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-primary font-bold rounded-xl hover:bg-green-light transition-all shadow-lg cursor-pointer"
              >
                Apply for Visa Now
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>
            <Link href="/services">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white/60 text-white font-semibold rounded-xl hover:border-white hover:bg-white/10 transition-all cursor-pointer"
              >
                View All Services
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
