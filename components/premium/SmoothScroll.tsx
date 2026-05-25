"use client"

import { ReactNode, useEffect } from "react"
import { ReactLenis } from "lenis/react"

export default function SmoothScroll({ children }: { children: ReactNode }) {
  // Respect reduced motion preference — disable Lenis entirely
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches) {
      document.documentElement.classList.add("reduce-motion")
    }
  }, [])

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        duration: 1.25,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  )
}
