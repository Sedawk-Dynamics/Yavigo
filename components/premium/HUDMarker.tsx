"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Section = { id: string; label: string }

/**
 * Floating left-margin HUD marker that updates with the section currently
 * in view. Shows section index, total count, and label. Animates on change.
 *
 * Each section it tracks must have an `id` set in the DOM.
 */
export default function HUDMarker({ sections }: { sections: Section[] }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el)
    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest intersection that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          const idx = sections.findIndex((s) => s.id === visible.target.id)
          if (idx !== -1) setActiveIdx(idx)
        }
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: "-25% 0px -25% 0px" }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // sections array is stable so this effect only needs to run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!mounted) return null

  return (
    <div
      aria-hidden
      className="hidden xl:flex pointer-events-none fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-2 font-mono"
    >
      {/* Section index display */}
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-foreground/70 tabular-nums">
          {String(activeIdx + 1).padStart(2, "0")}
        </span>
        <span className="text-xs text-muted-foreground tabular-nums">
          / {String(sections.length).padStart(2, "0")}
        </span>
      </div>

      {/* Active section label */}
      <div className="relative h-5 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={sections[activeIdx]?.id}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 text-[10px] uppercase tracking-[0.32em] text-foreground/60 whitespace-nowrap"
          >
            {sections[activeIdx]?.label}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Vertical step pips */}
      <div className="flex flex-col gap-1.5 mt-3">
        {sections.map((s, i) => (
          <motion.span
            key={s.id}
            animate={{
              width: i === activeIdx ? 22 : 10,
              backgroundColor:
                i === activeIdx
                  ? "rgba(22, 163, 74, 1)"
                  : "rgba(22, 163, 74, 0.25)",
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="h-0.5 rounded-full"
          />
        ))}
      </div>
    </div>
  )
}
