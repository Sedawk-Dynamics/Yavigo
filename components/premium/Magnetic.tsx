"use client"

import { ReactNode, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

/**
 * Wraps a child element so it gently follows the cursor when hovered.
 * Useful for CTAs, icon buttons, and social links.
 */
export default function Magnetic({
  children,
  strength = 0.3,
  className,
  as = "div",
}: {
  children: ReactNode
  strength?: number
  className?: string
  as?: "div" | "span"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 })

  function onMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  function onLeave() {
    x.set(0)
    y.set(0)
  }

  const Comp: any = as === "span" ? motion.span : motion.div

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ display: "inline-block" }}
    >
      <Comp style={{ x: sx, y: sy, display: "inline-block" }}>{children}</Comp>
    </div>
  )
}
