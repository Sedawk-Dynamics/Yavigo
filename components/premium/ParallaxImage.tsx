"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

/**
 * Image with cinematic hover behavior:
 *  - subtle inner parallax on scroll (`scrollParallax`)
 *  - zoom + light-sweep on hover (via group/CSS)
 *
 * Drop inside a `group` parent or set `group={true}` to add it itself.
 */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  aspect = "16/10",
  scrollParallax = 12,
  priority,
  group = true,
}: {
  src: string
  alt: string
  className?: string
  aspect?: string
  /** percent of scroll-distance translation */
  scrollParallax?: number
  priority?: boolean
  group?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`-${scrollParallax}%`, `${scrollParallax}%`])

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${group ? "group/img" : ""} ${className}`}
      style={{ aspectRatio: aspect }}
      data-cursor="view"
      data-cursor-label="View"
    >
      <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover/img:scale-[1.08]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
      {/* Light sweep on hover */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -inset-x-full inset-y-0 -translate-x-full group-hover/img:translate-x-full transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
      </div>
    </div>
  )
}
