"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { UserCheck, FileUp, ClipboardCheck, CreditCard, Send, BadgeCheck } from "lucide-react"

const steps = [
  {
    icon: UserCheck,
    step: "01",
    title: "Create Your Profile",
    description:
      "Sign up and complete your traveler profile in minutes. We securely store your details for faster applications in the future.",
  },
  {
    icon: FileUp,
    step: "02",
    title: "Upload Your Documents",
    description:
      "Upload required documents directly on our platform. Our AI checks everything automatically for completeness and accuracy.",
  },
  {
    icon: ClipboardCheck,
    step: "03",
    title: "Expert Review",
    description:
      "Our visa specialists review every application manually before submission to ensure the highest approval chances.",
  },
  {
    icon: CreditCard,
    step: "04",
    title: "Pay Securely",
    description:
      "Pay visa fees and service charges securely online. We accept all major cards and digital wallets with no hidden fees.",
  },
  {
    icon: Send,
    step: "05",
    title: "We Submit",
    description:
      "We handle the entire embassy submission process. Track your application status in real-time from your dashboard.",
  },
  {
    icon: BadgeCheck,
    step: "06",
    title: "Receive Your Visa",
    description:
      "Get your e-visa delivered directly to your email, or receive your stamped passport via secure courier for manual visas.",
  },
]

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="process" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      {/* Background radial */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 70% 50%, oklch(0.72 0.22 128 / 0.06) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary mb-5 uppercase tracking-wider">
            How It Works
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground text-balance mb-5">
            Get Your Visa in{" "}
            <span className="text-primary">6 Simple Steps</span>
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Our streamlined process makes visa applications quick and stress-free. From document upload to visa
            delivery — all in one place.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {/* Connecting line for desktop */}
          <div className="absolute top-8 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-border hidden lg:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="relative group"
            >
              <div className="bg-surface-1 border border-border rounded-3xl p-6 h-full hover:border-primary/40 transition-all duration-300">
                {/* Step number + icon row */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    {/* Step badge */}
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-[10px] font-bold">{i + 1}</span>
                    </div>
                  </div>
                  <div className="text-4xl font-black text-foreground/5 font-mono select-none">{step.step}</div>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

                {/* Bottom indicator */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="mt-5 h-0.5 bg-primary/30 rounded-full origin-left"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 relative bg-surface-1 border border-primary/30 rounded-3xl p-10 overflow-hidden text-center"
        >
          {/* Glow bg */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Ready to Start Your Journey?
            </h3>
            <p className="text-muted-foreground mb-7 max-w-lg mx-auto">
              Partner with Yavigo for seamless visa and immigration processing built for your business.
            </p>
            <motion.a
              href="#apply"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl text-lg hover:bg-accent transition-all duration-200 shadow-xl shadow-primary/30"
            >
              Begin Your Application
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
