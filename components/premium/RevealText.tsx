"use client"

import { useRef, ReactNode, ElementType } from "react"
import { motion, useInView } from "framer-motion"

/**
 * Word-by-word reveal with masked overflow. Drop around any string.
 *
 * <RevealText as="h2">Where Do You Want to Go?</RevealText>
 *
 * The component splits on whitespace, wraps each word in an overflow-clipped
 * span, and animates each word up from below.
 */
export function RevealText({
  children,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 0.06,
  duration = 0.85,
  once = true,
}: {
  children: string
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
  duration?: number
  once?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once, margin: "-80px" })
  const words = children.split(" ")

  return (
    <Tag className={className} ref={ref as React.Ref<HTMLElement>}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ lineHeight: 1.05 }}
        >
          <motion.span
            initial={{ y: "115%" }}
            animate={inView ? { y: "0%" } : { y: "115%" }}
            transition={{
              delay: delay + i * stagger,
              duration,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {w}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/**
 * Variant that wraps arbitrary children in a masked reveal.
 */
export function RevealBlock({
  children,
  className,
  delay = 0,
  y = 32,
  blur = 14,
  once = true,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  blur?: number
  once?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)`, scale: 0.985 }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : {}}
      transition={{ delay, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
