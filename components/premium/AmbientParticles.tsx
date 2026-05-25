"use client"

import { useEffect, useRef } from "react"

/**
 * Global low-density particle field. Sits behind everything (z-index 0).
 * Performance:
 *  - Pauses when document is hidden
 *  - Caps DPR to 1.5
 *  - Respects prefers-reduced-motion (renders nothing)
 *  - Cursor influences nearby particles (very subtle attraction)
 */
export default function AmbientParticles({
  density = 0.00006,
  color = "rgba(22, 163, 74, 0.55)",
}: {
  density?: number
  color?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let w = 0
    let h = 0
    let mouseX = -10000
    let mouseY = -10000
    let running = true

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; t: number }
    let parts: P[] = []

    function resize() {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + "px"
      canvas.style.height = h + "px"
      ctx.scale(dpr, dpr)
      const count = Math.min(Math.max(Math.floor(w * h * density), 28), 90)
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -Math.random() * 0.22 - 0.04,
        r: Math.random() * 1.6 + 0.4,
        a: Math.random() * 0.6 + 0.2,
        t: Math.random() * Math.PI * 2,
      }))
    }

    function frame() {
      if (!running) return
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        p.t += 0.012
        // gentle wave
        p.x += p.vx + Math.sin(p.t) * 0.08
        p.y += p.vy + Math.cos(p.t * 0.7) * 0.05
        // cursor influence (subtle attraction)
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const d2 = dx * dx + dy * dy
        if (d2 < 22000) {
          const f = 0.0008 * (1 - d2 / 22000)
          p.vx += dx * f
          p.vy += dy * f
        }
        // wrap
        if (p.y < -10) {
          p.y = h + 10
          p.x = Math.random() * w
        }
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10

        ctx.beginPath()
        ctx.fillStyle = color.replace(/[\d.]+\)$/, `${(0.35 + Math.sin(p.t) * 0.15 + p.a * 0.3).toFixed(3)})`)
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      rafRef.current = requestAnimationFrame(frame)
    }

    function onMove(e: PointerEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    function onVis() {
      running = document.visibilityState === "visible"
      if (running && rafRef.current == null) rafRef.current = requestAnimationFrame(frame)
      else if (!running && rafRef.current != null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }

    resize()
    rafRef.current = requestAnimationFrame(frame)
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("visibilitychange", onVis)

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [color, density])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
