"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"

/**
 * A two-layer cursor:
 *  - tiny dot that tracks exactly
 *  - larger trailing ring that lags & scales on interactive elements
 *
 * On touch / coarse-pointer devices it hides itself.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [variant, setVariant] = useState<"default" | "link" | "drag" | "view">("default")
  const [label, setLabel] = useState<string | null>(null)

  // Tight dot
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  // Trailing ring — lower stiffness for the lag
  const ringX = useSpring(dotX, { stiffness: 320, damping: 28, mass: 0.6 })
  const ringY = useSpring(dotY, { stiffness: 320, damping: 28, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduce) return
    setEnabled(true)

    const onMove = (e: PointerEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null
      if (!t || !t.closest) return
      const interactive = t.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor], [data-tilt]'
      ) as HTMLElement | null
      if (interactive) {
        setHovering(true)
        const cv = interactive.getAttribute("data-cursor")
        const cl = interactive.getAttribute("data-cursor-label")
        if (cv === "view") setVariant("view")
        else if (cv === "drag") setVariant("drag")
        else setVariant("link")
        setLabel(cl)
      } else {
        setHovering(false)
        setVariant("default")
        setLabel(null)
      }
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerover", onOver, { passive: true })
    document.body.classList.add("custom-cursor-on")

    return () => {
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerover", onOver)
      document.body.classList.remove("custom-cursor-on")
    }
  }, [dotX, dotY])

  if (!enabled) return null

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            width: hovering ? (label ? 88 : 56) : 36,
            height: hovering ? (label ? 88 : 56) : 36,
            borderRadius: 999,
            backgroundColor:
              variant === "view" ? "rgba(255,255,255,0.95)" : "transparent",
            borderColor: "rgba(255,255,255,0.85)",
            borderWidth: variant === "view" ? 0 : 1.5,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.5 }}
          className="flex items-center justify-center text-[10px] font-semibold uppercase tracking-[0.18em] text-black"
        >
          <AnimatePresence>
            {label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Tight dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full bg-white mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  )
}
