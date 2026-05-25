"use client"

import { useEffect } from "react"

/**
 * Global click ripple: when the user clicks anywhere, spawn an expanding
 * ring at the cursor position. Cleans up after the animation completes.
 *
 * Respects prefers-reduced-motion.
 */
export default function ClickRipple() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    function onPointerDown(e: PointerEvent) {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return
      const el = document.createElement("span")
      el.className = "click-ripple-el"
      el.style.left = e.clientX + "px"
      el.style.top = e.clientY + "px"
      document.body.appendChild(el)
      // requestAnimationFrame trigger so initial transform applies cleanly
      requestAnimationFrame(() => el.classList.add("on"))
      window.setTimeout(() => {
        el.remove()
      }, 750)
    }

    window.addEventListener("pointerdown", onPointerDown, { passive: true })
    return () => window.removeEventListener("pointerdown", onPointerDown)
  }, [])

  return null
}
