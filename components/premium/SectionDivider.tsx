"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

/**
 * Premium animated divider between sections.
 * - Center pulse node with rings
 * - Animated gradient line that draws on enter
 * - HUD-style coordinate label
 */
export default function SectionDivider({
  label,
  variant = "light",
}: {
  label?: string
  variant?: "light" | "dark"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-20px" })
  const isDark = variant === "dark"
  const lineColor = isDark ? "oklch(1 0 0 / 0.5)" : "oklch(0.42 0.16 142 / 0.55)"
  const accent = isDark ? "oklch(0.78 0.18 142)" : "oklch(0.58 0.2 142)"
  const labelColor = isDark ? "rgba(255,255,255,0.5)" : "oklch(0.5 0.02 264)"

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative flex items-center gap-4">
          {/* Left line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transformOrigin: "right",
              background: `linear-gradient(90deg, transparent, ${lineColor})`,
            }}
            className="flex-1 h-px"
          />

          {/* Center node */}
          <div className="relative flex items-center gap-3 shrink-0">
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={inView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.35, type: "spring", stiffness: 220, damping: 18 }}
              className="relative"
            >
              <span
                className="block w-2.5 h-2.5 rounded-full"
                style={{ background: accent, boxShadow: `0 0 0 4px ${accent}30, 0 0 24px ${accent}` }}
              />
              {/* Pulse rings */}
              {[0, 1].map((i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 3.6, opacity: 0 }}
                  transition={{ duration: 2.6, delay: i * 1.0, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full"
                  style={{ border: `1.5px solid ${accent}` }}
                />
              ))}
            </motion.div>
            {label && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="font-mono text-[10px] uppercase tracking-[0.35em] whitespace-nowrap"
                style={{ color: labelColor }}
              >
                {label}
              </motion.span>
            )}
          </div>

          {/* Right line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transformOrigin: "left",
              background: `linear-gradient(90deg, ${lineColor}, transparent)`,
            }}
            className="flex-1 h-px"
          />
        </div>
      </div>
    </div>
  )
}
