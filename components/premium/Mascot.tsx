"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"

export type MascotExpression = "happy" | "wave" | "excited" | "love" | "blink"

/**
 * Heatblast — a Ben 10 style fire-rock mascot for Yavigo.
 *
 *  - Rocky charcoal head with glowing lava cracks
 *  - 5-flame crown that flickers (per-flame scaleX/scaleY animation loops)
 *  - Glowing orange eyes with brighter inner core; pupils track the cursor
 *  - Periodic blinks (eyes squeeze shut briefly)
 *  - Idle breathing + bobbing
 *  - Click → bounce + lava-spark burst
 *  - Wave expression adds a small ember "hand" swinging at the side
 *  - Excited expression intensifies flames + outer glow
 */
export default function Mascot({
  size = 140,
  expression = "happy",
  trackCursor = true,
  interactive = true,
  className = "",
  onClick,
}: {
  size?: number
  expression?: MascotExpression
  trackCursor?: boolean
  interactive?: boolean
  className?: string
  onClick?: () => void
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const eyeX = useMotionValue(0)
  const eyeY = useMotionValue(0)
  const sX = useSpring(eyeX, { stiffness: 200, damping: 18, mass: 0.4 })
  const sY = useSpring(eyeY, { stiffness: 200, damping: 18, mass: 0.4 })

  const [blinking, setBlinking] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [bursting, setBursting] = useState(0)

  // Cursor tracking
  useEffect(() => {
    if (!trackCursor) return
    function onMove(e: PointerEvent) {
      const el = wrapRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.min(Math.hypot(dx, dy) / 220, 1)
      const angle = Math.atan2(dy, dx)
      const max = 3.5
      eyeX.set(Math.cos(angle) * dist * max)
      eyeY.set(Math.sin(angle) * dist * max)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [trackCursor, eyeX, eyeY])

  // Periodic blinks
  useEffect(() => {
    let timeout: number
    function schedule() {
      const delay = 2400 + Math.random() * 3500
      timeout = window.setTimeout(() => {
        setBlinking(true)
        window.setTimeout(() => setBlinking(false), 140)
        schedule()
      }, delay)
    }
    schedule()
    return () => window.clearTimeout(timeout)
  }, [])

  function handleClick() {
    if (!interactive) return
    setBursting((c) => c + 1)
    onClick?.()
  }

  // Flame intensity by expression
  const flameMultiplier =
    expression === "excited" || expression === "love" ? 1.18 : 1

  // Five flame positions across the crown (relative to head center 100,115)
  const flames = [
    { x: 60, y: 60, size: 28, dur: 0.95 },
    { x: 78, y: 42, size: 36, dur: 1.15 },
    { x: 100, y: 32, size: 44, dur: 0.85 },
    { x: 122, y: 42, size: 36, dur: 1.05 },
    { x: 140, y: 60, size: 28, dur: 1.25 },
  ]

  return (
    <div
      ref={wrapRef}
      className={`relative inline-block select-none ${interactive ? "cursor-pointer" : ""} ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={handleClick}
      data-cursor={interactive ? "link" : undefined}
      data-cursor-label={interactive ? "Yavi" : undefined}
    >
      {/* Idle breathing */}
      <motion.div
        animate={{ y: [0, -4, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full"
      >
        {/* Click bounce */}
        <motion.div
          key={bursting}
          initial={{ scale: 1 }}
          animate={bursting > 0 ? { scale: [1, 1.16, 0.95, 1.04, 1] } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          <svg viewBox="0 0 200 240" className="w-full h-full overflow-visible">
            <defs>
              {/* Rocky body */}
              <radialGradient id="hb-rock" cx="40%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#52220d" />
                <stop offset="55%" stopColor="#2b0e04" />
                <stop offset="100%" stopColor="#0b0301" />
              </radialGradient>
              {/* Lava */}
              <linearGradient id="hb-lava" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff3a6" />
                <stop offset="35%" stopColor="#ffb301" />
                <stop offset="80%" stopColor="#ff5a00" />
                <stop offset="100%" stopColor="#c11400" />
              </linearGradient>
              {/* Flame */}
              <radialGradient id="hb-flame" cx="50%" cy="60%" r="55%">
                <stop offset="0%" stopColor="#fff8d6" />
                <stop offset="25%" stopColor="#ffd54a" />
                <stop offset="55%" stopColor="#ff7b00" />
                <stop offset="85%" stopColor="#ff2a00" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#7c0e00" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="hb-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff8a00" stopOpacity="0.55" />
                <stop offset="65%" stopColor="#ff4400" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ff4400" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="hb-eye" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fffce0" />
                <stop offset="40%" stopColor="#ffd000" />
                <stop offset="100%" stopColor="#ff4400" />
              </radialGradient>
              <filter id="hb-soft" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" />
              </filter>
              <filter id="hb-flame-blur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.2" />
              </filter>
            </defs>

            {/* Ambient flame glow */}
            <motion.ellipse
              cx="100"
              cy="100"
              rx="110"
              ry="115"
              fill="url(#hb-glow)"
              animate={{
                scale: [1, 1.08 * flameMultiplier, 1],
                opacity: [0.75, 1, 0.75],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "100px 100px" }}
            />

            {/* Flame crown — 5 flickering flames */}
            <g filter="url(#hb-flame-blur)">
              {flames.map((f, i) => (
                <motion.g
                  key={i}
                  transform={`translate(${f.x} ${f.y})`}
                  animate={{
                    scaleY: [
                      1 * flameMultiplier,
                      1.25 * flameMultiplier,
                      0.92 * flameMultiplier,
                      1.15 * flameMultiplier,
                      1 * flameMultiplier,
                    ],
                    scaleX: [1, 0.92, 1.08, 0.96, 1],
                  }}
                  transition={{
                    duration: f.dur,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ transformOrigin: "0 28px", transformBox: "fill-box" }}
                >
                  {/* Outer flame */}
                  <path
                    d={`M 0 0 Q -${f.size * 0.5} -${f.size * 0.45} -${f.size * 0.25} -${f.size * 0.9} Q 0 -${f.size * 1.4} ${f.size * 0.25} -${f.size * 0.9} Q ${f.size * 0.5} -${f.size * 0.45} 0 0 Z`}
                    fill="url(#hb-flame)"
                  />
                  {/* Inner flame */}
                  <path
                    d={`M 0 -${f.size * 0.15} Q -${f.size * 0.25} -${f.size * 0.5} -${f.size * 0.1} -${f.size * 0.8} Q 0 -${f.size * 1.05} ${f.size * 0.1} -${f.size * 0.8} Q ${f.size * 0.25} -${f.size * 0.5} 0 -${f.size * 0.15} Z`}
                    fill="#fff5b0"
                    opacity="0.85"
                  />
                </motion.g>
              ))}
            </g>

            {/* Head rock */}
            <g>
              {/* Base shape */}
              <path
                d="M 35 120 Q 38 80 70 70 Q 100 64 130 70 Q 162 80 165 120 Q 168 158 145 175 Q 122 188 100 188 Q 78 188 55 175 Q 32 158 35 120 Z"
                fill="url(#hb-rock)"
              />
              {/* Rocky bumps */}
              <path
                d="M 50 100 Q 56 96 64 100 L 60 110 Z"
                fill="#1c0801"
              />
              <path d="M 140 105 Q 145 100 154 105 L 148 115 Z" fill="#1c0801" />
              <path d="M 75 165 Q 82 160 92 165 L 86 174 Z" fill="#1a0701" />

              {/* Lava cracks (animated subtle glow) */}
              <motion.g
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <path
                  d="M 48 110 Q 60 118 74 116 Q 88 115 95 122 Q 96 130 88 132"
                  fill="none"
                  stroke="url(#hb-lava)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M 152 112 Q 142 120 130 118 Q 118 117 110 123"
                  fill="none"
                  stroke="url(#hb-lava)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M 90 158 Q 100 162 110 158"
                  fill="none"
                  stroke="url(#hb-lava)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M 60 145 Q 68 148 75 145"
                  fill="none"
                  stroke="url(#hb-lava)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M 130 150 Q 138 153 144 150"
                  fill="none"
                  stroke="url(#hb-lava)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </motion.g>
            </g>

            {/* Eyes — glowing lava */}
            <g>
              {/* Halo behind each eye */}
              <circle cx="78" cy="128" r="14" fill="#ff8a00" opacity="0.55" filter="url(#hb-soft)" />
              <circle cx="122" cy="128" r="14" fill="#ff8a00" opacity="0.55" filter="url(#hb-soft)" />

              {/* Left eye */}
              <motion.ellipse
                cx="78"
                cy="128"
                rx="9"
                animate={{ ry: blinking ? 1.2 : 9 }}
                transition={{ duration: 0.12 }}
                fill="url(#hb-eye)"
              />
              <motion.g style={{ x: sX, y: sY }}>
                <circle cx="78" cy="128" r="3.5" fill="#3a0f00" />
                <circle cx="79" cy="126.5" r="1.1" fill="#fff" opacity="0.95" />
              </motion.g>

              {/* Right eye */}
              <motion.ellipse
                cx="122"
                cy="128"
                rx="9"
                animate={{ ry: blinking ? 1.2 : 9 }}
                transition={{ duration: 0.12 }}
                fill="url(#hb-eye)"
              />
              <motion.g style={{ x: sX, y: sY }}>
                <circle cx="122" cy="128" r="3.5" fill="#3a0f00" />
                <circle cx="123" cy="126.5" r="1.1" fill="#fff" opacity="0.95" />
              </motion.g>
            </g>

            {/* Mouth — subtle lava grin */}
            <motion.path
              animate={{
                d:
                  expression === "excited" || (expression === "happy" && hovering)
                    ? "M 80 158 Q 100 178 120 158"
                    : expression === "love"
                    ? "M 82 162 Q 100 174 118 162"
                    : "M 84 162 Q 100 170 116 162",
              }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
              stroke="url(#hb-lava)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />

            {/* Wave / ember side hand */}
            {(expression === "wave" || expression === "excited") && (
              <motion.g
                animate={{ rotate: [-22, 28, -22] }}
                transition={{ duration: 0.95, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "170px 130px" }}
              >
                <ellipse cx="174" cy="100" rx="11" ry="14" fill="url(#hb-flame)" filter="url(#hb-flame-blur)" />
                <circle cx="174" cy="98" r="5" fill="#fff5b0" />
              </motion.g>
            )}

            {/* Hearts (love) */}
            {expression === "love" && (
              <motion.g
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <text x="36" y="58" fontSize="20" fill="#ff5a00">♥</text>
                <text x="158" y="50" fontSize="14" fill="#ff8a00" opacity="0.8">♥</text>
              </motion.g>
            )}
          </svg>
        </motion.div>
      </motion.div>

      {/* Click ember burst */}
      <AnimatePresence>
        {bursting > 0 && (
          <motion.div
            key={bursting}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute inset-0"
            onAnimationComplete={() => setBursting(0)}
          >
            {[...Array(10)].map((_, i) => {
              const angle = (i / 10) * Math.PI * 2
              const r = size * 0.75
              const colors = ["#ffe066", "#ff8a00", "#ff3300", "#fff5b0"]
              return (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos(angle) * r,
                    y: Math.sin(angle) * r - 20,
                    opacity: 0,
                    scale: 0.3,
                  }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
                  style={{
                    background: colors[i % colors.length],
                    boxShadow: `0 0 10px ${colors[i % colors.length]}`,
                    translate: "-50% -50%",
                  }}
                />
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
