"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

const stats = [
  { value: 120000, suffix: "+", label: "Happy Travelers", description: "Visas processed successfully" },
  { value: 50, suffix: "K+", label: "Flights Booked", description: "Domestic & international" },
  { value: 98, suffix: "%", label: "Approval Rate", description: "Across all visa types" },
  { value: 72, suffix: "hrs", label: "Avg. Processing", description: "For eligible e-visas" },
]

function Counter({
  target,
  suffix,
  inView,
}: {
  target: number
  suffix: string
  inView: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 2200
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  const display =
    target >= 1000
      ? count >= 1000
        ? Math.floor(count / 1000).toLocaleString() + "K"
        : count.toLocaleString()
      : count.toLocaleString()

  return (
    <span className="text-5xl sm:text-6xl font-black text-primary font-mono tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  const tickerItems = [
    "Visa Processing",
    "Flight Bookings",
    "E-Visa Services",
    "Schengen Visa",
    "UK Visa",
    "Travel Insurance",
    "Document Support",
    "Fraud Detection",
    "Online Submission",
    "24/7 Support",
  ]

  return (
    <section className="py-0 relative overflow-hidden" ref={ref}>
      {/* Ticker Bar */}
      <div className="bg-primary py-3 overflow-hidden relative">
        <div className="flex items-center ticker-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-3 text-primary-foreground font-semibold text-sm whitespace-nowrap px-6"
            >
              <span className="w-1.5 h-1.5 bg-primary-foreground/60 rounded-full" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="py-24 lg:py-32 bg-surface-1 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary mb-4 uppercase tracking-wider">
              By The Numbers
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
              Trusted by Travelers{" "}
              <span className="text-primary">Worldwide</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="text-center group"
              >
                <div className="relative mb-4">
                  {inView && <Counter target={stat.value} suffix={stat.suffix} inView={inView} />}
                </div>
                <div className="text-base font-bold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>

                {/* Animated underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                  className="mx-auto mt-4 h-0.5 w-16 bg-primary rounded-full origin-left"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
