"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
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

  return (
    <footer id="contact" className="relative bg-surface-1 border-t border-border overflow-hidden">
      {/* Top CTA band */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center justify-between gap-8"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Start Your Journey{" "}
                <span className="text-primary">Today</span>
              </h2>
              <p className="text-muted-foreground">
                Apply online in minutes. No queues, no hassle — just seamless travel.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-green-primary to-green-bright text-primary-foreground font-bold rounded-2xl hover:shadow-lg shadow-green-primary/30 transition-all"
            >
              Apply for Visa
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="/services"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-7 py-3.5 border-2 border-green-primary/30 text-foreground font-semibold rounded-2xl hover:border-green-primary/60 transition-all"
            >
              Explore Services
            </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Image
                src="/images/yavigo-logo.png"
                alt="Yavigo"
                width={150}
                height={48}
                style={{ width: "auto", height: "auto" }}
                className="h-12 object-contain brightness-110 mb-5"
              />
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
                Your trusted B2B partner for visa and immigration services. We work with travel agencies,
                corporates, and consultancies to deliver seamless visa outcomes.
              </p>

              {/* Contact info */}
              <ul className="flex flex-col gap-3 mb-6">
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>+1 800 000 0000</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>support@yavigo.com</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Globe className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>www.yavigo.com</span>
                </li>
              </ul>

              {/* Office locations */}
              <div className="mb-7">
                <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">Our Offices</p>
                <ul className="flex flex-col gap-3">
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>
                      <span className="block font-semibold text-foreground">Noida, India</span>
                      <span className="block text-xs leading-relaxed">Sector 62, Noida, Uttar Pradesh 201301</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>
                      <span className="block font-semibold text-foreground">Netherlands</span>
                      <span className="block text-xs leading-relaxed">Amsterdam, the Netherlands</span>
                    </span>
                  </li>
                </ul>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
            >
              <h4 className="text-sm font-bold text-foreground mb-5">{category}</h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Yavigo. All rights reserved. We serve happiness.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

      {/* Large watermark */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div className="text-[12vw] font-black text-foreground/[0.02] whitespace-nowrap text-center leading-none pb-4">
          YAVIGO
        </div>
      </div>
    </footer>
  )
}
