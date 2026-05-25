"use client"

import { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion"

/**
 * Aurora-style atmospheric background layer for any section.
 * Place inside a `relative` parent.
 *
 *   <section className="relative">
 *     <AtmosphericBackground variant="warm" />
 *     ... content ...
 *   </section>
 */
export default function AtmosphericBackground({
  variant = "default",
  withDots = true,
  withSpotlight = true,
  className = "",
}: {
  variant?: "default" | "warm" | "cool" | "dark"
  withDots?: boolean
  withSpotlight?: boolean
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.4])

  // Section spotlight
  const sx = useMotionValue(50)
  const sy = useMotionValue(30)
  const ssx = useSpring(sx, { stiffness: 50, damping: 22 })
  const ssy = useSpring(sy, { stiffness: 50, damping: 22 })
  const spotBg = useMotionTemplate`radial-gradient(560px 560px at ${ssx}% ${ssy}%, oklch(0.92 0.08 142 / 0.45) 0%, transparent 55%)`

  function onMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    sx.set(((e.clientX - r.left) / r.width) * 100)
    sy.set(((e.clientY - r.top) / r.height) * 100)
  }

  const palettes = {
    default: {
      a: "oklch(0.82 0.16 142 / 0.32)",
      b: "oklch(0.76 0.2 142 / 0.22)",
      c: "oklch(0.9 0.08 142 / 0.4)",
    },
    warm: {
      a: "oklch(0.82 0.16 80 / 0.25)",
      b: "oklch(0.78 0.18 60 / 0.22)",
      c: "oklch(0.86 0.12 142 / 0.32)",
    },
    cool: {
      a: "oklch(0.78 0.16 220 / 0.22)",
      b: "oklch(0.74 0.18 240 / 0.18)",
      c: "oklch(0.86 0.12 142 / 0.28)",
    },
    dark: {
      a: "oklch(0.42 0.16 142 / 0.45)",
      b: "oklch(0.32 0.12 142 / 0.4)",
      c: "oklch(0.5 0.18 142 / 0.3)",
    },
  }
  const p = palettes[variant]

  return (
    <motion.div
      ref={ref}
      onMouseMove={withSpotlight ? onMove : undefined}
      aria-hidden
      style={{ opacity }}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      <motion.div
        style={{ y: y1, background: p.a }}
        className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full blur-3xl animate-aurora"
      />
      <motion.div
        style={{ y: y2, background: p.b }}
        className="absolute top-1/3 -right-32 w-[560px] h-[560px] rounded-full blur-3xl animate-aurora-slow"
      />
      <div
        style={{ background: p.c }}
        className="absolute -bottom-40 left-1/3 w-[480px] h-[480px] rounded-full blur-3xl animate-aurora-reverse"
      />

      {withSpotlight && (
        <motion.div className="absolute inset-0 pointer-events-auto" style={{ background: spotBg }} />
      )}

      {withDots && (
        <svg className="absolute inset-0 w-full h-full opacity-[0.16]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`atm-dots-${variant}`} width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="oklch(0.42 0.16 142)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#atm-dots-${variant})`} />
        </svg>
      )}
    </motion.div>
  )
}
