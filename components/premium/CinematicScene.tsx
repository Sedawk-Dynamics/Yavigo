"use client"

import { ReactNode, useRef } from "react"
import { motion, useInView, useScroll, useTransform, useMotionTemplate } from "framer-motion"

/**
 * Fullscreen-grade scene wrapper that turns a section into a cinematic panel.
 *
 *  - HUD corner brackets that animate in
 *  - Scene index chip ("SCENE 03 / 08") in top-right
 *  - One-time scan-line sweep on first enter
 *  - Scale-in + opacity-in + scroll-linked subtle Y parallax
 *  - Optional blur-to-focus driven by scroll (uses `filter` so reserved for shorter sections)
 *
 * Wrap any existing <section> with this:
 *   <CinematicScene scene="02" name="DESTINATIONS">
 *     <DestinationsShowcase />
 *   </CinematicScene>
 */
export default function CinematicScene({
  children,
  scene,
  name,
  total = 8,
  variant = "light",
  enableBlur = true,
  enableEntrance = true,
  className = "",
}: {
  children: ReactNode
  scene: string
  name: string
  total?: number
  variant?: "light" | "dark"
  enableBlur?: boolean
  /** Disable scale/opacity entrance transforms — required when child uses position: sticky */
  enableEntrance?: boolean
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15%" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  })

  const blurValue = useTransform(scrollYProgress, [0, 1], [12, 0])
  const filter = useMotionTemplate`blur(${blurValue}px)`
  const scale = useTransform(scrollYProgress, [0, 1], [0.985, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0.55, 1])

  const lineColor = variant === "dark" ? "rgba(255,255,255,0.55)" : "oklch(0.42 0.16 142 / 0.55)"
  const accent = variant === "dark" ? "rgba(255,255,255,0.85)" : "oklch(0.58 0.2 142)"
  const labelColor = variant === "dark" ? "rgba(255,255,255,0.7)" : "oklch(0.5 0.02 264)"

  const wrapperStyle: Record<string, unknown> = {}
  if (enableBlur) {
    wrapperStyle.filter = filter
    wrapperStyle.willChange = "filter, transform"
  }
  if (enableEntrance) {
    wrapperStyle.scale = scale
    wrapperStyle.opacity = opacity
  }

  return (
    <motion.div
      ref={ref}
      data-scene={scene}
      style={wrapperStyle}
      className={`relative ${className}`}
    >
      {/* HUD scene chip — top right */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.55 }}
        className="hidden md:flex absolute top-6 right-6 z-20 items-center gap-2.5 px-3 py-1.5 glass rounded-full font-mono text-[10px] tracking-[0.32em] pointer-events-none"
        style={{ color: labelColor }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: accent }} />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: accent }} />
        </span>
        SCENE {scene} / {String(total).padStart(2, "0")} · {name}
      </motion.div>

      {/* HUD corner brackets */}
      {[
        { c: "top-4 left-4", d: ["right", "bottom"] },
        { c: "top-4 right-4", d: ["left", "bottom"] },
        { c: "bottom-4 left-4", d: ["right", "top"] },
        { c: "bottom-4 right-4", d: ["left", "top"] },
      ].map((b, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.25 + i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={`hidden md:block absolute ${b.c} w-7 h-7 z-20 pointer-events-none`}
        >
          <span
            className="absolute top-0 left-0 w-full h-px"
            style={{
              background: lineColor,
              opacity: b.d.includes("top") ? 1 : 0,
            }}
          />
          <span
            className="absolute bottom-0 left-0 w-full h-px"
            style={{
              background: lineColor,
              opacity: b.d.includes("bottom") ? 1 : 0,
            }}
          />
          <span
            className="absolute top-0 left-0 h-full w-px"
            style={{
              background: lineColor,
              opacity: b.d.includes("left") ? 1 : 0,
            }}
          />
          <span
            className="absolute top-0 right-0 h-full w-px"
            style={{
              background: lineColor,
              opacity: b.d.includes("right") ? 1 : 0,
            }}
          />
        </motion.span>
      ))}

      {/* One-time scan line sweep on enter */}
      <motion.div
        aria-hidden
        initial={{ y: "-10%", opacity: 0 }}
        animate={inView ? { y: "110%", opacity: [0, 0.9, 0] } : {}}
        transition={{ delay: 0.45, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute left-0 right-0 top-0 z-[15] h-32"
        style={{
          background: variant === "dark"
            ? "linear-gradient(to bottom, transparent, rgba(255,255,255,0.18), transparent)"
            : "linear-gradient(to bottom, transparent, oklch(0.58 0.2 142 / 0.25), transparent)",
          mixBlendMode: variant === "dark" ? "screen" : "multiply",
        }}
      />

      {children}
    </motion.div>
  )
}
