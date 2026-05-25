"use client"

import { motion } from "framer-motion"

/**
 * Volumetric light-ray overlay. Drop inside a `relative` parent.
 * Origin: top-right by default. Soft animated streaks that drift.
 */
export default function LightRays({
  origin = "top-right",
  color = "oklch(0.85 0.18 142 / 0.18)",
  intensity = 1,
}: {
  origin?: "top-right" | "top-left" | "top-center" | "center"
  color?: string
  intensity?: number
}) {
  const transformOrigin =
    origin === "top-right"
      ? "100% 0%"
      : origin === "top-left"
      ? "0% 0%"
      : origin === "top-center"
      ? "50% 0%"
      : "50% 50%"

  const angles = [-22, -12, -4, 4, 12, 22]

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    >
      {angles.map((a, i) => (
        <motion.div
          key={a}
          initial={{ opacity: 0, rotate: a }}
          animate={{ opacity: [0, 0.8, 0.5, 0.8, 0], rotate: [a, a + 2, a] }}
          transition={{
            duration: 8 + i * 1.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2 origin-top w-2 h-[160vh]"
          style={{
            background: `linear-gradient(to bottom, ${color}, transparent 70%)`,
            filter: `blur(${10 + i * 2}px)`,
            transformOrigin,
            opacity: intensity,
          }}
        />
      ))}
    </div>
  )
}
