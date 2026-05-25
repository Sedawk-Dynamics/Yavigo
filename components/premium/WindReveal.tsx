"use client"

import { ReactNode, useMemo, useRef } from "react"
import { motion, useInView } from "framer-motion"

/**
 * Magical wind/leaf reveal wrapper.
 *
 * On enter:
 *  - A blur-streak sweeps across the card from left to right
 *  - 5–7 leaves blow across, tumbling, with motion-blurred drop shadows
 *  - Inner content fades up + un-blurs to reveal
 *
 * Fires once per card. Use for premium "Harry Potter reveal" feel.
 */
export default function WindReveal({
  children,
  className = "",
  delay = 0,
  leafCount = 6,
  direction = "ltr",
}: {
  children: ReactNode
  className?: string
  delay?: number
  leafCount?: number
  direction?: "ltr" | "rtl"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-12%" })

  // Stable random leaf params per mount
  const leaves = useMemo(() => {
    return Array.from({ length: leafCount }, (_, i) => ({
      delayLocal: delay + i * 0.05 + Math.random() * 0.05,
      yPct: 20 + Math.random() * 60, // vertical % anchor
      driftY: -10 - Math.random() * 18,
      rotStart: Math.random() * 360,
      rotEnd: Math.random() * 720 + 180,
      size: 10 + Math.random() * 12,
      hue: 100 + Math.random() * 60, // green to yellow-green
      sat: 50 + Math.random() * 20,
      lit: 30 + Math.random() * 22,
      opacity: 0.7 + Math.random() * 0.3,
    }))
  }, [leafCount, delay])

  const startX = direction === "ltr" ? "-12%" : "112%"
  const endX = direction === "ltr" ? "112%" : "-12%"

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Inner content with focus-pull reveal */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)", scale: 0.97 }}
        animate={inView ? { opacity: 1, filter: "blur(0px)", scale: 1 } : {}}
        transition={{ delay: delay + 0.4, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>

      {/* Magical reveal overlay — fires once on enter */}
      {inView && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]">
          {/* Wind streak / blur sheen */}
          <motion.div
            initial={{ x: startX, opacity: 0 }}
            animate={{
              x: endX,
              opacity: [0, 0.85, 0.6, 0],
            }}
            transition={{
              delay,
              duration: 1.05,
              ease: [0.22, 1, 0.36, 1],
              times: [0, 0.2, 0.6, 1],
            }}
            className="absolute inset-y-0 -inset-x-1/4 w-1/2 will-change-transform"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, oklch(0.85 0.16 142 / 0.18) 35%, oklch(0.95 0.05 142 / 0.32) 50%, oklch(0.85 0.16 142 / 0.18) 65%, transparent 100%)",
              filter: "blur(8px)",
            }}
          />

          {/* Sparkle trail riding the wind */}
          {[...Array(10)].map((_, i) => (
            <motion.span
              key={`sp-${i}`}
              initial={{
                x: startX,
                y: `${20 + Math.random() * 60}%`,
                opacity: 0,
                scale: 0.4,
              }}
              animate={{
                x: endX,
                opacity: [0, 1, 1, 0],
                scale: [0.4, 1, 0.9, 0.3],
              }}
              transition={{
                delay: delay + i * 0.04 + Math.random() * 0.05,
                duration: 1 + Math.random() * 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background:
                  i % 3 === 0
                    ? "oklch(0.85 0.22 142)"
                    : i % 3 === 1
                    ? "oklch(0.95 0.15 90)"
                    : "white",
                boxShadow: "0 0 8px currentColor",
                color:
                  i % 3 === 0
                    ? "oklch(0.85 0.22 142)"
                    : i % 3 === 1
                    ? "oklch(0.95 0.15 90)"
                    : "white",
              }}
            />
          ))}

          {/* Leaves */}
          {leaves.map((l, i) => {
            const color = `hsl(${l.hue}deg ${l.sat}% ${l.lit}%)`
            const shadow = `hsl(${l.hue}deg ${l.sat}% ${l.lit - 15}%)`
            return (
              <motion.svg
                key={`leaf-${i}`}
                initial={{
                  x: startX,
                  y: `${l.yPct}%`,
                  rotate: l.rotStart,
                  opacity: 0,
                }}
                animate={{
                  x: endX,
                  y: `${l.yPct + l.driftY}%`,
                  rotate: l.rotEnd,
                  opacity: [0, l.opacity, l.opacity, 0],
                }}
                transition={{
                  delay: l.delayLocal,
                  duration: 1.05 + Math.random() * 0.25,
                  ease: [0.22, 1, 0.36, 1],
                  times: [0, 0.15, 0.75, 1],
                }}
                width={l.size}
                height={l.size * 1.4}
                viewBox="0 0 20 28"
                className="absolute will-change-transform"
                style={{ filter: `drop-shadow(0 2px 4px ${shadow}90)` }}
              >
                <defs>
                  <linearGradient id={`leaf-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.95" />
                    <stop offset="100%" stopColor={shadow} stopOpacity="0.95" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10 1 Q 19 7 19 15 Q 19 24 10 27 Q 1 24 1 15 Q 1 7 10 1 Z"
                  fill={`url(#leaf-grad-${i})`}
                />
                <path
                  d="M 10 3 L 10 25"
                  stroke={shadow}
                  strokeWidth="0.6"
                  strokeOpacity="0.7"
                />
                <path
                  d="M 10 10 Q 6 11 4 13"
                  stroke={shadow}
                  strokeWidth="0.5"
                  strokeOpacity="0.5"
                  fill="none"
                />
                <path
                  d="M 10 10 Q 14 11 16 13"
                  stroke={shadow}
                  strokeWidth="0.5"
                  strokeOpacity="0.5"
                  fill="none"
                />
              </motion.svg>
            )
          })}
        </div>
      )}
    </div>
  )
}
