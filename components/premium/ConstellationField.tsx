"use client"

import { useEffect, useRef } from "react"

/**
 * Interactive constellation: a field of soft nodes that draw connecting lines
 * to each other (and to the cursor) when in proximity. Sits absolutely inside
 * a `relative` parent.
 */
export default function ConstellationField({
  nodeColor = "rgba(255, 255, 255, 0.7)",
  lineColor = "rgba(255, 255, 255, 0.35)",
  density = 0.00018,
  maxDist = 130,
  className = "",
}: {
  nodeColor?: string
  lineColor?: string
  density?: number
  maxDist?: number
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let w = 0
    let h = 0
    let mouseX = -10000
    let mouseY = -10000
    let raf: number | null = null
    let running = true

    type N = { x: number; y: number; vx: number; vy: number; r: number }
    let nodes: N[] = []

    function resize() {
      const r = canvas!.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas!.width = Math.floor(w * dpr)
      canvas!.height = Math.floor(h * dpr)
      ctx!.setTransform(1, 0, 0, 1, 0, 0)
      ctx!.scale(dpr, dpr)
      const count = Math.min(Math.max(Math.floor(w * h * density), 12), 60)
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
      }))
    }

    function frame() {
      if (!running) return
      ctx!.clearRect(0, 0, w, h)

      // Move
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      }

      // Lines between nodes
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < maxDist) {
            ctx!.strokeStyle = lineColor.replace(/[\d.]+\)$/, `${((1 - d / maxDist) * 0.4).toFixed(3)})`)
            ctx!.lineWidth = 0.7
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.stroke()
          }
        }
        // Cursor lines
        const dx = a.x - mouseX
        const dy = a.y - mouseY
        const d = Math.hypot(dx, dy)
        if (d < maxDist * 1.5) {
          ctx!.strokeStyle = lineColor.replace(/[\d.]+\)$/, `${((1 - d / (maxDist * 1.5)) * 0.55).toFixed(3)})`)
          ctx!.lineWidth = 0.9
          ctx!.beginPath()
          ctx!.moveTo(a.x, a.y)
          ctx!.lineTo(mouseX, mouseY)
          ctx!.stroke()
        }
      }

      // Nodes
      ctx!.fillStyle = nodeColor
      for (const n of nodes) {
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx!.fill()
      }

      raf = requestAnimationFrame(frame)
    }

    function onMove(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect()
      // Only react when the pointer is within the canvas bounds
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      ) {
        mouseX = -10000
        mouseY = -10000
        return
      }
      mouseX = e.clientX - r.left
      mouseY = e.clientY - r.top
    }
    function onLeave() {
      mouseX = -10000
      mouseY = -10000
    }
    function onVis() {
      running = document.visibilityState === "visible"
      if (running && raf == null) raf = requestAnimationFrame(frame)
      else if (!running && raf != null) {
        cancelAnimationFrame(raf)
        raf = null
      }
    }

    if (!reduce) {
      resize()
      raf = requestAnimationFrame(frame)
    } else {
      resize()
      // single static draw
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = nodeColor
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerleave", onLeave)
    document.addEventListener("visibilitychange", onVis)

    return () => {
      if (raf != null) cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerleave", onLeave)
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [density, maxDist, lineColor, nodeColor])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  )
}
