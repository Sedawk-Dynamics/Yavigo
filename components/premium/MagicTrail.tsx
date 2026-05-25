"use client"

import { useEffect, useRef } from "react"

/**
 * Magic-wand cursor trail. Canvas2D particles that emit at the pointer:
 *  - Multi-colored sparkles (green / violet / sky / amber / pink / white)
 *  - 4-pointed star shape with radial alpha falloff
 *  - Drift upward & outward, rotate slowly, fade
 *  - Density scales with cursor speed
 *
 * Tuned to read on both light and dark backgrounds. Respects
 * prefers-reduced-motion and coarse pointers.
 */

const PALETTE = [
  "rgba(34, 197, 94, $A)",   // brand green
  "rgba(110, 231, 183, $A)", // mint
  "rgba(168, 85, 247, $A)",  // violet
  "rgba(56, 189, 248, $A)",  // sky
  "rgba(251, 191, 36, $A)",  // amber
  "rgba(244, 114, 182, $A)", // pink
  "rgba(255, 255, 255, $A)", // white
]

type Sparkle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  max: number
  size: number
  color: string
  rot: number
  rotV: number
}

export default function MagicTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fine = window.matchMedia("(pointer: fine)").matches
    if (reduce || !fine) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let w = 0
    let h = 0
    let raf = 0
    let running = true
    let lastX = -1
    let lastY = -1
    let lastEmit = 0

    const particles: Sparkle[] = []
    const MAX = 140

    function resize() {
      w = window.innerWidth
      h = window.innerHeight
      canvas!.width = Math.floor(w * dpr)
      canvas!.height = Math.floor(h * dpr)
      canvas!.style.width = w + "px"
      canvas!.style.height = h + "px"
      ctx!.setTransform(1, 0, 0, 1, 0, 0)
      ctx!.scale(dpr, dpr)
    }

    function emit(x: number, y: number, count: number) {
      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX) particles.shift()
        const angle = Math.random() * Math.PI * 2
        const speed = 0.4 + Math.random() * 1.4
        particles.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          life: 0,
          max: 55 + Math.random() * 50,
          size: 1.6 + Math.random() * 3.2,
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          rot: Math.random() * Math.PI,
          rotV: (Math.random() - 0.5) * 0.08,
        })
      }
    }

    function drawSparkle(p: Sparkle, alpha: number) {
      const c = p.color.replace("$A", alpha.toFixed(3))
      ctx!.save()
      ctx!.translate(p.x, p.y)
      ctx!.rotate(p.rot)
      // 4-pointed star with elongated arms
      const longArm = p.size * 3
      const shortArm = p.size * 0.45
      ctx!.fillStyle = c
      ctx!.beginPath()
      ctx!.moveTo(0, -longArm)
      ctx!.lineTo(shortArm, 0)
      ctx!.lineTo(0, longArm)
      ctx!.lineTo(-shortArm, 0)
      ctx!.closePath()
      ctx!.fill()
      ctx!.beginPath()
      ctx!.moveTo(-longArm, 0)
      ctx!.lineTo(0, shortArm)
      ctx!.lineTo(longArm, 0)
      ctx!.lineTo(0, -shortArm)
      ctx!.closePath()
      ctx!.fill()
      // Bright core
      ctx!.beginPath()
      ctx!.arc(0, 0, p.size * 0.55, 0, Math.PI * 2)
      ctx!.fillStyle = c.replace(/[\d.]+\)$/, `${Math.min(alpha * 1.4, 1).toFixed(3)})`)
      ctx!.fill()
      ctx!.restore()
    }

    function frame() {
      if (!running) return
      // Trailing fade (very subtle motion blur) rather than full clear — keeps trail soft
      ctx!.clearRect(0, 0, w, h)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        if (p.life > p.max) {
          particles.splice(i, 1)
          continue
        }
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.985
        p.vy *= 0.985
        p.vy += 0.003 // very gentle gravity
        p.rot += p.rotV
        const tNorm = p.life / p.max
        const alpha = (1 - tNorm) * 0.9
        drawSparkle(p, alpha)
      }
      raf = requestAnimationFrame(frame)
    }

    function onMove(e: PointerEvent) {
      const dx = lastX < 0 ? 0 : e.clientX - lastX
      const dy = lastY < 0 ? 0 : e.clientY - lastY
      const dist = Math.hypot(dx, dy)
      const now = performance.now()
      if (now - lastEmit > 24 || dist > 10) {
        // Scale particle count to speed (1..5)
        const count = Math.min(Math.max(Math.floor(dist / 7), 1), 5)
        emit(e.clientX, e.clientY, count)
        lastEmit = now
      }
      lastX = e.clientX
      lastY = e.clientY
    }

    function onDown(e: PointerEvent) {
      // Burst on click for extra magic
      emit(e.clientX, e.clientY, 16)
    }

    function onVis() {
      running = document.visibilityState === "visible"
      if (running && !raf) raf = requestAnimationFrame(frame)
      else if (!running && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    resize()
    raf = requestAnimationFrame(frame)
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })
    document.addEventListener("visibilitychange", onVis)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9994]"
    />
  )
}
