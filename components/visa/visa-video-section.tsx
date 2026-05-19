'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, CheckCircle, Globe, Award, Users } from 'lucide-react'

const floatingStats = [
  { icon: CheckCircle, value: 'B2B', label: 'Partner Network', color: 'bg-green-primary' },
  { icon: Award, value: 'Expert', label: 'Visa & Immigration', color: 'bg-blue-500' },
  { icon: Globe, value: '100+', label: 'Countries', color: 'bg-orange-500' },
]

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function VisaVideoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  function handlePlay() {
    setPlaying(true)
    videoRef.current?.play()
  }

  return (
    <section className="py-24 bg-white overflow-hidden" id="video-section" aria-labelledby="video-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <motion.p variants={fadeUp} className="section-label mb-4">
            See It In Action
          </motion.p>
          <motion.h2
            id="video-heading"
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold mb-4 text-balance font-display"
          >
            See How Easy the Visa Process Is
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Watch how thousands of travelers get their visas approved in minutes — fully online, no queues, no hassle.
          </motion.p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Glow ring */}
          <div
            className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-green-primary/30 via-green-bright/20 to-green-primary/30 blur-xl opacity-60"
            aria-hidden="true"
          />

          {/* Video wrapper */}
          <div className="relative rounded-2xl overflow-hidden bg-[oklch(0.13_0.04_142)] shadow-2xl border border-green-primary/20">
            <video
              ref={videoRef}
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vid%2B2-xZQiBEhjGWWnVhwyeHCQ9L8i4iKwwq.mp4"
              className="w-full aspect-video object-cover"
              loop
              muted
              playsInline
              poster="/images/visa-hero-bg.jpg"
              aria-label="Visa application process walkthrough video"
            />

            {/* Play overlay */}
            {!playing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlay}
                  className="w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center group"
                  aria-label="Play visa process video"
                >
                  <Play className="w-8 h-8 text-green-primary ml-1 group-hover:scale-110 transition-transform" aria-hidden="true" />
                </motion.button>

                {/* Ripple rings */}
                <span className="absolute w-20 h-20 rounded-full bg-white/30 animate-ping pointer-events-none" aria-hidden="true" />
                <span className="absolute w-32 h-32 rounded-full bg-white/10 animate-ping animation-delay-300 pointer-events-none" aria-hidden="true" />
              </div>
            )}

            {/* Top bar UI mockup */}
            <div className="absolute top-0 left-0 right-0 flex items-center gap-2 px-4 py-3 bg-black/60 backdrop-blur-md">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 mx-4 h-6 bg-white/10 rounded-md flex items-center px-3">
                <span className="text-white/50 text-xs font-mono">app.yavigo.com/apply</span>
              </div>
            </div>
          </div>

          {/* Floating stat cards */}
          <div className="absolute -left-14 top-1/3 hidden xl:block">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-xl border border-border p-4 w-44"
              style={{ animation: 'float 4s ease-in-out infinite' }}
            >
              <div className="w-9 h-9 bg-green-light rounded-xl flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-green-primary" aria-hidden="true" />
              </div>
              <p className="text-base font-bold text-foreground leading-tight">B2B Partner</p>
              <p className="text-xs text-muted-foreground">Visa &amp; Immigration</p>
            </motion.div>
          </div>

          <div className="absolute -right-14 bottom-1/3 hidden xl:block">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-2xl shadow-xl border border-border p-4 w-44"
              style={{ animation: 'float 4s ease-in-out infinite 2s' }}
            >
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center mb-2">
                <Award className="w-5 h-5 text-blue-500" aria-hidden="true" />
              </div>
              <p className="text-base font-bold text-foreground leading-tight">Specialist Team</p>
              <p className="text-xs text-muted-foreground">Certified Experts</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-12"
        >
          {floatingStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground leading-none">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
