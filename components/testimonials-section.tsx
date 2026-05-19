"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Priya S.",
    country: "India",
    flag: "🇮🇳",
    destination: "Schengen Visa – France",
    rating: 5,
    text: "Application moved through in just under three weeks. The document checklist was clear up front, and the portal was easy to navigate. Communication was timely throughout.",
    initials: "PS",
  },
  {
    name: "Mohammed A.",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    destination: "UK Visitor Visa",
    rating: 5,
    text: "The review step caught a couple of issues with my paperwork before submission. Useful to have a second pair of eyes on the application. Approved on the first attempt.",
    initials: "MA",
  },
  {
    name: "Aisha J.",
    country: "Nigeria",
    flag: "🇳🇬",
    destination: "Dubai Tourist E-Visa",
    rating: 5,
    text: "Dubai e-visa came back within a few business days. The form was straightforward and queries got answered the same day. Would use again for short-stay applications.",
    initials: "AJ",
  },
  {
    name: "Sanjay K.",
    country: "India",
    flag: "🇮🇳",
    destination: "Schengen – Germany",
    rating: 4,
    text: "Process was structured and the document verification step was reassuring. Approval took a little longer than the initial estimate, but the status updates were honest about timing.",
    initials: "SK",
  },
  {
    name: "Li W.",
    country: "China",
    flag: "🇨🇳",
    destination: "UK Business Visa",
    rating: 5,
    text: "Handled a business visa with a non-trivial documentation requirement. The team was patient with the back-and-forth and walked us through what each form actually needed.",
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
