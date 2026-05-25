"use client"

import { ReactNode, useRef } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion"

/**
 * 3D tilt + glare card. Tracks cursor inside the card and:
 *  - rotates it on X/Y axes
 *  - moves a soft specular highlight to the cursor position
 *  - lifts it on hover
 */
export default function TiltCard({
  children,
  intensity = 8,
  glare = true,
  className = "",
  style,
}: {
  children: ReactNode
  intensity?: number
  glare?: boolean
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  // Normalized 0..1
  const nx = useMotionValue(0.5)
  const ny = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(ny, [0, 1], [intensity, -intensity]), {
    stiffness: 220,
    damping: 18,
  })
  const rotateY = useSpring(useTransform(nx, [0, 1], [-intensity, intensity]), {
    stiffness: 220,
    damping: 18,
  })

  const px = useTransform(nx, (v) => `${v * 100}%`)
  const py = useTransform(ny, (v) => `${v * 100}%`)
  const glareBg = useMotionTemplate`radial-gradient(circle at ${px} ${py}, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 45%)`

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    nx.set((e.clientX - r.left) / r.width)
    ny.set((e.clientY - r.top) / r.height)
  }
  function onLeave() {
    nx.set(0.5)
    ny.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      data-tilt
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
        ...style,
      }}
      whileHover={{ z: 30 }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  )
}
