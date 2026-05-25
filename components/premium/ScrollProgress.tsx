"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const x = useSpring(scrollYProgress, { stiffness: 280, damping: 28, mass: 0.6 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: x }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left bg-gradient-to-r from-green-bright via-green-primary to-green-dark"
    />
  )
}
