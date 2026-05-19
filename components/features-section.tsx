"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle2, Zap, Lock, HeadphonesIcon, Globe2, Award } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Processing",
    description: "Most e-visas processed within 72 hours. Track your application status in real-time through your dashboard.",
  },
  {
    icon: Lock,
    title: "Bank-Grade Security",
    description: "Your documents and personal data are protected with 256-bit encryption and advanced fraud detection AI.",
  },
  {
    icon: Globe2,
    title: "150+ Countries Covered",
    description: "We handle visa processing for over 150 countries including Schengen, UK, USA, UAE, and many more.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Expert Support",
    description: "Our visa experts are available around the clock to answer your questions and guide you through the process.",
  },
  {
    icon: Award,
    title: "98% Approval Rate",
    description: "Our thorough document review and expert guidance delivers industry-leading visa approval rates.",
  },
  {
    icon: CheckCircle2,
    title: "No Hidden Fees",
    description: "Transparent pricing with no surprise charges. Know exactly what you pay before you begin.",
  },
]

const advantages = [
  "Fully online – no embassy queues",
  "No passport delivery for e-visas",
  "Real-time application tracking",
  "Dedicated case manager",
  "Same-day processing available",
  "Secure document vault",
]

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const leftRef = useRef<HTMLDivElement>(null)
  const leftInView = useInView(leftRef, { once: true, margin: "-80px" })

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section: Why Yavigo */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: text */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -40 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary mb-5 uppercase tracking-wider">
              Why Yavigo
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground text-balance mb-6">
              The Smarter Way to{" "}
              <span className="text-primary">Get Your Visa</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Inspired by leading platforms like Atlys and Expedia, Yavigo combines cutting-edge technology with
              human expertise to deliver the most seamless visa and travel experience available.
            </p>

            {/* Advantages list */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {advantages.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={leftInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.5 }}
                  className="flex items-center gap-3 text-sm text-foreground/80"
                >
                  <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-primary" />
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              href="#apply"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 mt-10 px-7 py-3.5 bg-primary text-primary-foreground font-bold rounded-2xl hover:bg-accent transition-all duration-200 shadow-lg shadow-primary/25"
            >
              Start Your Application
            </motion.a>
          </motion.div>

          {/* Right: visual bento box */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Big card */}
              <div className="col-span-2 bg-surface-1 border border-border rounded-3xl p-6 flex items-center gap-5 hover:border-primary/40 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/25 transition-colors">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground mb-1">Fraud Detection AI</div>
                  <div className="text-sm text-muted-foreground">
                    Every application is verified by our proprietary fraud detection system for maximum security.
                  </div>
                </div>
              </div>

              {/* Small cards */}
              <div className="bg-surface-1 border border-border rounded-3xl p-5 hover:border-primary/40 transition-colors group">
                <div className="text-3xl font-black text-primary font-mono mb-2">98%</div>
                <div className="text-sm font-semibold text-foreground mb-1">Approval Rate</div>
                <div className="text-xs text-muted-foreground">Industry leading</div>
              </div>
              <div className="bg-surface-1 border border-border rounded-3xl p-5 hover:border-primary/40 transition-colors group">
                <div className="text-3xl font-black text-primary font-mono mb-2">72h</div>
                <div className="text-sm font-semibold text-foreground mb-1">Fast Processing</div>
                <div className="text-xs text-muted-foreground">For eligible e-visas</div>
              </div>

              {/* E-visa card */}
              <div className="col-span-2 bg-surface-2 border border-border rounded-3xl p-6 group hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-foreground">Online Submission</span>
                  <span className="px-2.5 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">E-Visa</span>
                </div>
                <div className="text-xs text-muted-foreground mb-4">
                  No need to physically submit your passport — complete the entire process online for eligible visas.
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-surface-3 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={leftInView ? { width: "92%" } : {}}
                      transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                  <span className="text-xs font-bold text-primary">92%</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Applications processed online</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature cards grid */}
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary mb-4 uppercase tracking-wider">
              Platform Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Built for the Modern Traveler
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group flex gap-4 bg-surface-1 border border-border rounded-2xl p-5 hover:border-primary/40 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/25 transition-colors mt-0.5">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1.5">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
