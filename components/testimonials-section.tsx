"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    country: "India",
    flag: "🇮🇳",
    destination: "Schengen Visa – France",
    rating: 5,
    text: "Yavigo made my France trip dream come true! The entire process was so smooth. I uploaded my documents online, got regular updates, and received my Schengen visa approval in just 10 days. Absolutely incredible service!",
    initials: "PS",
  },
  {
    name: "Mohammed Al-Rashid",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    destination: "UK Visitor Visa",
    rating: 5,
    text: "I was worried about my UK visa application but the team at Yavigo guided me through every single step. Their expert review caught a mistake in my documents before submission. Got approved on first try!",
    initials: "MA",
  },
  {
    name: "Aisha Johnson",
    country: "Nigeria",
    flag: "🇳🇬",
    destination: "Dubai Tourist E-Visa",
    rating: 5,
    text: "Got my Dubai e-visa approved in 3 days! No embassy visits, no paperwork hassle — everything was digital. Yavigo is truly the future of travel. I've already recommended them to all my friends and family.",
    initials: "AJ",
  },
  {
    name: "Sanjay Kumar",
    country: "India",
    flag: "🇮🇳",
    destination: "Schengen – Germany",
    rating: 5,
    text: "The fraud detection and security features gave me complete peace of mind. My documents were verified, the team was professional, and my German visa was approved faster than I expected. 10/10 experience!",
    initials: "SK",
  },
  {
    name: "Li Wei",
    country: "China",
    flag: "🇨🇳",
    destination: "UK Business Visa",
    rating: 5,
    text: "Excellent service! Yavigo's team handled my complex business visa documentation with expertise. Their 24/7 support answered all my questions promptly. Will definitely use them again for future trips.",
    initials: "LW",
  },
]

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive((a) => (a + 1) % testimonials.length)

  const visible = [
    testimonials[(active + testimonials.length - 1) % testimonials.length],
    testimonials[active],
    testimonials[(active + 1) % testimonials.length],
  ]

  return (
    <section id="testimonials" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(ellipse at 50% 50%, oklch(0.72 0.22 128 / 0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary mb-5 uppercase tracking-wider">
            Client Stories
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground text-balance mb-4">
            What Our Travelers{" "}
            <span className="text-primary">Are Saying</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
            <span className="ml-2 text-sm font-medium text-muted-foreground">4.9/5 from 2,400+ reviews</span>
          </div>
        </motion.div>

        {/* Testimonials carousel */}
        <div className="relative">
          <div className="hidden lg:grid grid-cols-3 gap-5">
            {visible.map((t, i) => (
              <motion.div
                key={`${t.name}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative bg-surface-1 border rounded-3xl p-7 transition-all duration-300 ${
                  i === 1
                    ? "border-primary/40 scale-105 shadow-lg shadow-primary/10"
                    : "border-border opacity-70 hover:opacity-90"
                }`}
              >
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-sm text-foreground/80 leading-relaxed mb-6 line-clamp-4">{t.text}</p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      {t.name}
                      <span>{t.flag}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{t.destination}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile: single card */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="bg-surface-1 border border-primary/40 rounded-3xl p-7"
              >
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-sm text-foreground/80 leading-relaxed mb-6">{testimonials[active].text}</p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonials[active].rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">
                    {testimonials[active].initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      {testimonials[active].name}
                      <span>{testimonials[active].flag}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{testimonials[active].destination}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-surface-2 border border-border hover:border-primary/50 flex items-center justify-center text-foreground hover:text-primary transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === active ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-border hover:bg-primary/50"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-surface-2 border border-border hover:border-primary/50 flex items-center justify-center text-foreground hover:text-primary transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
