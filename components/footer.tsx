"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react"
import Magnetic from "@/components/premium/Magnetic"
import { RevealText, RevealBlock } from "@/components/premium/RevealText"

const footerLinks = {
  "Visa Services": [
    { label: "E-Visa Processing", href: "/services" },
    { label: "Manual Visa Support", href: "/services" },
    { label: "Visa Requirements", href: "/visa-requirements" },
    { label: "Document Assistance", href: "/services" },
    { label: "Fraud Protection", href: "/services" },
  ],
  "Immigration Services": [
    { label: "Immigration Advisory", href: "/services" },
    { label: "Long-Term Visas", href: "/services" },
    { label: "Corporate Mobility", href: "/services" },
    { label: "Compliance Support", href: "/services" },
  ],
  Resources: [
    { label: "Blog & Guides", href: "/blog" },
    { label: "Visa Requirements", href: "/visa-requirements" },
    { label: "About Us", href: "/about" },
    { label: "FAQs", href: "/contact" },
  ],
  Company: [
    { label: "About Yavigo", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Services", href: "/services" },
    { label: "Partner With Us", href: "/contact" },
  ],
}

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter / X", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
]

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const watermarkRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: watermarkRef, offset: ["start end", "end end"] })
  const watermarkOpacity = useTransform(scrollYProgress, [0, 1], [0.01, 0.06])
  const watermarkY = useTransform(scrollYProgress, [0, 1], ["20%", "0%"])

  return (
    <footer id="contact" ref={watermarkRef} className="relative bg-surface-1 border-t border-border overflow-hidden">
      {/* Aurora */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl animate-aurora"
          style={{ background: "oklch(0.82 0.16 142 / 0.18)" }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl animate-aurora-slow"
          style={{ background: "oklch(0.76 0.2 142 / 0.14)" }}
        />
      </div>

      {/* Top CTA band */}
      <div className="relative border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col lg:flex-row items-center justify-between gap-10"
          >
            <div>
              <RevealText as="h2" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 tracking-tight">
                Start Your Journey Today
              </RevealText>
              <p className="text-muted-foreground text-base sm:text-lg">
                Apply online in minutes. No queues, no hassle — just seamless travel.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Magnetic strength={0.3}>
                <Link href="/contact">
                  <motion.span
                    whileTap={{ scale: 0.97 }}
                    className="liquid-btn flex items-center gap-2 px-8 py-4 text-white font-bold rounded-2xl cursor-pointer glow-green"
                    data-cursor data-cursor-label="Apply"
                  >
                    Apply for Visa
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Link href="/services">
                  <motion.span
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-8 py-4 glass border border-green-primary/30 text-foreground font-semibold rounded-2xl hover:border-green-primary/60 transition-all cursor-pointer"
                  >
                    Explore Services
                  </motion.span>
                </Link>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <RevealBlock>
              <Image
                src="/images/yavigo-logo.png"
                alt="Yavigo"
                width={150}
                height={48}
                style={{ width: "auto", height: "auto" }}
                className="h-12 object-contain brightness-110 mb-6"
              />
              <p className="text-sm text-muted-foreground leading-relaxed mb-7 max-w-xs">
                Your trusted B2B partner for visa and immigration services. We work with travel agencies,
                corporates, and consultancies to deliver seamless visa outcomes.
              </p>

              <ul className="flex flex-col gap-3 mb-7">
                {[
                  { Icon: Phone, text: "+1 800 000 0000" },
                  { Icon: Mail, text: "support@yavigo.com" },
                  { Icon: Globe, text: "www.yavigo.com" },
                ].map(({ Icon, text }) => (
                  <li key={text} className="group flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-default">
                    <div className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center shrink-0 group-hover:border-green-primary/40 group-hover:bg-green-light transition-colors">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="pt-1">{text}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-foreground mb-4">Our Offices</p>
                <ul className="flex flex-col gap-4">
                  {[
                    { country: "Noida, India", addr: "Sector 62, Noida, Uttar Pradesh 201301" },
                    { country: "Netherlands", addr: "Amsterdam, the Netherlands" },
                  ].map((o) => (
                    <li key={o.country} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <div className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span>
                        <span className="block font-semibold text-foreground">{o.country}</span>
                        <span className="block text-xs leading-relaxed">{o.addr}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social icons — magnetic */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <Magnetic key={social.label} strength={0.4}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="group relative w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-br from-green-primary to-green-bright translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      <social.icon className="relative w-4 h-4 group-hover:text-white transition-colors" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </RevealBlock>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links], i) => (
            <RevealBlock key={category} delay={0.15 + i * 0.07} y={20}>
              <h4 className="text-sm font-bold text-foreground mb-5 tracking-wide">{category}</h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 link-underline inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </RevealBlock>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Yavigo. All rights reserved. We serve happiness.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors link-underline">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors link-underline">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors link-underline">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

      {/* Large watermark — scroll-linked */}
      <motion.div
        style={{ opacity: watermarkOpacity, y: watermarkY }}
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="text-[14vw] font-black text-foreground whitespace-nowrap text-center leading-none pb-2 tracking-tighter">
          YAVIGO
        </div>
      </motion.div>
    </footer>
  )
}
