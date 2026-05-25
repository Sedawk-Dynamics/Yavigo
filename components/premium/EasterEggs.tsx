"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

/**
 * Hidden interactive surprises:
 *
 *  1. Konami code (↑↑↓↓←→←→ B A) — fires a full-screen green flash
 *     followed by a brief particle burst from the center.
 *
 *  2. Triple-click anywhere within 600ms — toggles a discrete
 *     "DEVELOPER MODE" HUD overlay in the corner that auto-dismisses.
 *
 *  3. After ~14s of zero pointer movement — emits a single soft
 *     light pulse from the cursor's last known position.
 *
 * Respects prefers-reduced-motion (no-ops).
 */

const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
]

export default function EasterEggs() {
  const [flash, setFlash] = useState(false)
  const [hud, setHud] = useState(false)
  const [idlePulse, setIdlePulse] = useState<{ x: number; y: number; key: number } | null>(null)
  const seqRef = useRef<string[]>([])
  const clicksRef = useRef<number[]>([])
  const lastPointerRef = useRef<{ x: number; y: number }>({ x: -1, y: -1 })
  const idleTimerRef = useRef<number | null>(null)
  const idleKeyRef = useRef(0)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    function fireFlash() {
      setFlash(true)
      window.setTimeout(() => setFlash(false), 900)
    }

    function onKey(e: KeyboardEvent) {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key
      seqRef.current.push(k)
      if (seqRef.current.length > KONAMI.length) seqRef.current.shift()
      if (
        seqRef.current.length === KONAMI.length &&
        seqRef.current.every((c, i) => c === KONAMI[i])
      ) {
        seqRef.current = []
        fireFlash()
      }
    }

    function onClick(e: PointerEvent) {
      const now = performance.now()
      clicksRef.current = clicksRef.current.filter((t) => now - t < 600)
      clicksRef.current.push(now)
      if (clicksRef.current.length >= 3) {
        clicksRef.current = []
        setHud((v) => !v)
      }
      lastPointerRef.current = { x: e.clientX, y: e.clientY }
      resetIdle()
    }

    function onMove(e: PointerEvent) {
      lastPointerRef.current = { x: e.clientX, y: e.clientY }
      resetIdle()
    }

    function resetIdle() {
      if (idleTimerRef.current != null) window.clearTimeout(idleTimerRef.current)
      idleTimerRef.current = window.setTimeout(() => {
        const { x, y } = lastPointerRef.current
        if (x < 0 || y < 0) return
        idleKeyRef.current += 1
        setIdlePulse({ x, y, key: idleKeyRef.current })
        window.setTimeout(() => setIdlePulse(null), 1400)
      }, 14000)
    }

    window.addEventListener("keydown", onKey)
    window.addEventListener("pointerdown", onClick)
    window.addEventListener("pointermove", onMove, { passive: true })
    resetIdle()

    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("pointerdown", onClick)
      window.removeEventListener("pointermove", onMove)
      if (idleTimerRef.current != null) window.clearTimeout(idleTimerRef.current)
    }
  }, [])

  // Auto-dismiss HUD after 5s
  useEffect(() => {
    if (!hud) return
    const id = window.setTimeout(() => setHud(false), 5000)
    return () => window.clearTimeout(id)
  }, [hud])

  return (
    <>
      {/* Konami flash + radial burst */}
      <AnimatePresence>
        {flash && (
          <>
            <motion.div
              key="flash"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, times: [0, 0.2, 1], ease: "easeOut" }}
              className="pointer-events-none fixed inset-0 z-[9997]"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, oklch(0.78 0.2 142 / 0.85) 0%, oklch(0.58 0.2 142 / 0.5) 30%, transparent 70%)",
                mixBlendMode: "screen",
              }}
            />
            {/* Burst particles */}
            {[...Array(18)].map((_, i) => {
              const a = (i / 18) * Math.PI * 2
              const r = 320 + Math.random() * 180
              return (
                <motion.span
                  key={`burst-${i}`}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos(a) * r,
                    y: Math.sin(a) * r,
                    opacity: 0,
                    scale: 0.4,
                  }}
                  transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none fixed top-1/2 left-1/2 z-[9997] w-2 h-2 rounded-full"
                  style={{
                    background: "oklch(0.68 0.22 142)",
                    boxShadow: "0 0 12px oklch(0.78 0.2 142)",
                    translateX: "-50%",
                    translateY: "-50%",
                  } as any}
                />
              )
            })}
          </>
        )}
      </AnimatePresence>

      {/* Dev mode HUD */}
      <AnimatePresence>
        {hud && (
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed bottom-6 right-6 z-[9996] glass rounded-2xl px-4 py-3 font-mono text-[11px] text-foreground/80 shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-bright opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-primary" />
              </span>
              <span className="font-bold tracking-[0.3em] uppercase text-[10px]">SCENE_LIVE</span>
            </div>
            <div className="space-y-0.5">
              <p>· cursor: <span className="text-green-primary">active</span></p>
              <p>· scroll: <span className="text-green-primary">smooth</span></p>
              <p>· network: <span className="text-green-primary">online</span></p>
              <p className="opacity-60 text-[10px] mt-1">try: ↑↑↓↓←→←→ b a</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Idle pulse at last cursor position */}
      <AnimatePresence>
        {idlePulse && (
          <motion.span
            key={idlePulse.key}
            initial={{ opacity: 0.55, scale: 0.5 }}
            animate={{ opacity: 0, scale: 6 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="pointer-events-none fixed z-[9995] w-16 h-16 rounded-full border-2"
            style={{
              left: idlePulse.x,
              top: idlePulse.y,
              translate: "-50% -50%",
              borderColor: "oklch(0.58 0.2 142 / 0.7)",
              boxShadow: "0 0 50px oklch(0.58 0.2 142 / 0.5)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
