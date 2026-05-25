"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Mascot, { MascotExpression } from "@/components/premium/Mascot"

type Phase = "loading" | "companion"

const greetings = [
  "Welcome to Yavigo",
  "Hello, traveler 👋",
  "Your visa journey begins here",
  "Ready when you are",
]

const tips = [
  "Hey traveler! 👋 I'm Yavi — your visa buddy.",
  "Need help with a visa? Just ask.",
  "Try scrolling — every section is a new scene.",
  "Hover the destinations — they zoom in 3D.",
  "Psst… try the Konami code: ↑↑↓↓←→←→ B A",
  "Triple-click anywhere for a hidden HUD.",
  "Each card here was crafted by hand. Enjoy.",
  "We process visas for 100+ countries.",
]

export default function WelcomeExperience() {
  const [phase, setPhase] = useState<Phase>("loading")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Skip full welcome on repeat session
    if (sessionStorage.getItem("yavigo-welcomed") === "1") {
      setPhase("companion")
      return
    }
    sessionStorage.setItem("yavigo-welcomed", "1")
    const t = window.setTimeout(() => setPhase("companion"), 3200)
    return () => window.clearTimeout(t)
  }, [])

  if (!mounted) return null

  return (
    <>
      <AnimatePresence>
        {phase === "loading" && <LoadingOverlay key="loading-overlay" onSkip={() => setPhase("companion")} />}
      </AnimatePresence>
      {phase === "companion" && <MascotCompanion />}
    </>
  )
}

/* ─────────────── Loading overlay ─────────────── */

function LoadingOverlay({ onSkip }: { onSkip: () => void }) {
  const [progress, setProgress] = useState(0)
  const [greetingIdx, setGreetingIdx] = useState(0)
  const [exp, setExp] = useState<MascotExpression>("wave")

  // Animate progress 0 → 100 over ~2.4s with ease-out
  useEffect(() => {
    const start = performance.now()
    const DURATION = 2400
    let raf = 0
    function tick(now: number) {
      const t = Math.min((now - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - t, 2.2)
      setProgress(Math.round(eased * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Rotate greeting text
  useEffect(() => {
    const id = window.setInterval(() => {
      setGreetingIdx((i) => (i + 1) % greetings.length)
    }, 900)
    return () => window.clearInterval(id)
  }, [])

  // Switch expression near the end
  useEffect(() => {
    const id = window.setTimeout(() => setExp("excited"), 1800)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        clipPath: "circle(0% at 50% 50%)",
      }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ clipPath: "circle(150% at 50% 50%)" }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.22 0.08 142) 0%, oklch(0.06 0.02 142) 70%)",
        }}
      />

      {/* Aurora blobs */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-3xl animate-aurora"
        style={{ background: "oklch(0.48 0.2 142 / 0.45)" }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-[700px] h-[700px] rounded-full blur-3xl animate-aurora-slow"
        style={{ background: "oklch(0.55 0.22 142 / 0.4)" }}
      />

      {/* Dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="welcome-dots" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="oklch(0.82 0.18 142)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#welcome-dots)" />
      </svg>

      {/* HUD corner brackets */}
      {["top-6 left-6", "top-6 right-6", "bottom-6 left-6", "bottom-6 right-6"].map((p, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 + i * 0.08, duration: 0.45 }}
          className={`absolute ${p} w-8 h-8 pointer-events-none`}
        >
          {p.includes("top") && <span className="absolute top-0 left-0 right-0 h-px bg-white/40" />}
          {p.includes("bottom") && <span className="absolute bottom-0 left-0 right-0 h-px bg-white/40" />}
          {p.includes("left") && <span className="absolute top-0 bottom-0 left-0 w-px bg-white/40" />}
          {p.includes("right") && <span className="absolute top-0 bottom-0 right-0 w-px bg-white/40" />}
        </motion.span>
      ))}

      {/* Top HUD */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-10 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.4em] text-white/55"
      >
        YAVIGO · BOOTING SCENE 00
      </motion.div>

      {/* Content stack */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Mascot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 180, damping: 16 }}
        >
          <Mascot size={200} expression={exp} interactive={false} />
        </motion.div>

        {/* Cycling greeting */}
        <div className="relative h-14 mt-8 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.h1
              key={greetingIdx}
              initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -50, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight whitespace-nowrap"
            >
              {greetings[greetingIdx]}
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/65 text-sm md:text-base mt-1 max-w-md"
        >
          Preparing 100+ destinations, secure workflows, and your dedicated specialist desk…
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 w-72 max-w-[80vw]"
        >
          <div className="relative h-[2px] bg-white/15 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-primary via-green-bright to-green-primary"
            />
            {/* Moving sheen */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
          <div className="flex justify-between mt-3 font-mono text-[10px] tracking-[0.3em] text-white/55">
            <span>BOOTING ENVIRONMENT</span>
            <span className="tabular-nums">{progress.toString().padStart(3, "0")}%</span>
          </div>
        </motion.div>

        {/* Skip button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={onSkip}
          className="mt-10 text-[11px] font-mono tracking-[0.3em] text-white/40 hover:text-white/80 transition-colors"
          data-cursor="link"
        >
          SKIP →
        </motion.button>
      </div>

      {/* Bottom HUD */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-8 left-0 right-0 flex justify-between px-10 font-mono text-[9px] tracking-[0.3em] text-white/35"
      >
        <span>SYS · LIVE NETWORK</span>
        <span>YAVIGO · WE SERVE HAPPINESS</span>
        <span>v2025</span>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────── Persistent companion ─────────────── */

function MascotCompanion() {
  const [open, setOpen] = useState(false)
  const [tipIdx, setTipIdx] = useState(0)
  const [exp, setExp] = useState<MascotExpression>("happy")

  // After mount, auto-greet once
  useEffect(() => {
    const id = window.setTimeout(() => {
      setOpen(true)
      const close = window.setTimeout(() => setOpen(false), 5000)
      return () => window.clearTimeout(close)
    }, 1400)
    return () => window.clearTimeout(id)
  }, [])

  // Random tip auto-show every ~45s
  useEffect(() => {
    const id = window.setInterval(() => {
      setTipIdx((i) => (i + 1) % tips.length)
      setOpen(true)
      window.setTimeout(() => setOpen(false), 5500)
    }, 45000)
    return () => window.clearInterval(id)
  }, [])

  function handleClick() {
    setTipIdx((i) => (i + 1) % tips.length)
    setOpen(true)
    setExp("excited")
    window.setTimeout(() => setExp("happy"), 1100)
    window.setTimeout(() => setOpen(false), 5500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 180, damping: 16 }}
      className="fixed bottom-5 left-5 z-[9990] flex items-end gap-3 pointer-events-none"
    >
      {/* Mascot button */}
      <div className="pointer-events-auto">
        <Mascot size={70} expression={exp} onClick={handleClick} />
      </div>

      {/* Chat bubble */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -12, scale: 0.85, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -12, scale: 0.85, filter: "blur(6px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative glass rounded-2xl px-4 py-3 shadow-2xl max-w-[260px] pointer-events-auto"
          >
            {/* Speech bubble tail */}
            <span
              className="absolute -left-1.5 bottom-4 w-3 h-3 rotate-45 glass"
              style={{ borderTopLeftRadius: 2 }}
            />
            <p className="text-sm font-semibold text-foreground leading-snug relative">
              {tips[tipIdx]}
            </p>
            <p className="text-[10px] text-muted-foreground font-mono tracking-[0.2em] mt-1.5">
              — YAVI · TRAVEL BUDDY
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
