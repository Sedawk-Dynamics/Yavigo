"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  FileText,
  Globe,
  Shield,
  Smartphone,
  Upload,
  ArrowRight,
} from "lucide-react"

const services = [
  {
    icon: FileText,
    number: "01",
    title: "Visa Application Processing",
    description:
      "End-to-end visa processing with expert guidance. We handle everything from documentation to submission, ensuring high approval rates.",
    features: ["Fast processing", "Expert review", "Status tracking"],
    color: "from-green-primary/20 to-transparent",
    href: "#apply",
  },
  {
    icon: Globe,
    number: "02",
    title: "Europe & UK Travel",
    description:
      "Specialized Schengen and UK visa solutions. Our experts know every requirement to get you approved for your European adventure.",
    features: ["Schengen visa", "UK visa", "Multi-entry options"],
    color: "from-green-dark/20 to-transparent",
    href: "#services",
  },
  {
    icon: Shield,
    number: "03",
    title: "Advanced Fraud Detection",
    description:
      "State-of-the-art AI-powered fraud detection protects every application. Secure, verified, and reliable from start to finish.",
    features: ["AI verification", "Document authentication", "Identity protection"],
    color: "from-green-bright/15 to-transparent",
    href: "#security",
  },
  {
    icon: Smartphone,
    number: "04",
    title: "E-Visa & Manual Assistance",
    description:
      "Whether it's a simple e-visa or a complex manual application, our team provides full support for every visa type.",
    features: ["E-visa processing", "Manual applications", "Embassy liaison"],
    color: "from-green-primary/20 to-transparent",
    href: "#apply",
  },
  {
    icon: Upload,
    number: "05",
    title: "Online Document Submission",
    description:
      "Submit all documents online. No need to physically visit or send your passport for eligible e-visas — fully digital process.",
    features: ["Digital uploads", "Secure storage", "No passport delivery needed"],
    color: "from-green-dark/20 to-transparent",
    href: "#apply",
  },
]

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative bg-surface-1 border border-border rounded-3xl p-7 overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary/40"
    >
      {/* Card background glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
      {/* Number */}
      <div className="absolute top-6 right-6 text-5xl font-black text-foreground/5 group-hover:text-foreground/8 transition-colors font-mono select-none">
        {service.number}
      </div>

      {/* Icon */}
      <div className="relative z-10 w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary/25 group-hover:scale-110 transition-all duration-300">
        <service.icon className="w-6 h-6 text-primary" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-foreground mb-3 leading-snug">{service.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{service.description}</p>

        {/* Features */}
        <ul className="flex flex-col gap-1.5 mb-6">
          {service.features.map((feat) => (
            <li key={feat} className="flex items-center gap-2 text-xs text-foreground/70">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              {feat}
            </li>
          ))}
        </ul>

        {/* Link */}
        <a
          href={service.href}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-200"
        >
          Learn more
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" })

  return (
    <section id="services" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />
      <div className="absolute inset-0 opacity-3">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, oklch(0.72 0.22 128 / 0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary mb-5 uppercase tracking-wider">
            Our Services
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground text-balance mb-5">
            Everything You Need for a{" "}
            <span className="text-primary">Smooth Journey</span>
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            From short-stay visas to long-term immigration, Yavigo offers a comprehensive suite of B2B services
            designed for travel partners, corporates, and immigration consultancies.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
