"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react"

const posts = [
  {
    title: "Complete Guide to Schengen Visa: Requirements, Fees & Tips for 2025",
    excerpt:
      "Everything you need to know about applying for a Schengen visa — from required documents and fees to the best countries to apply through.",
    image: "/images/blog-1.jpg",
    category: "Visa Guide",
    date: "Mar 15, 2025",
    readTime: "8 min read",
    href: "#blog",
  },
  {
    title: "E-Visa vs Manual Visa: Which One Should You Choose?",
    excerpt:
      "Understanding the differences between e-visa and manual visa applications to help you choose the best option for your travel destination.",
    image: "/images/blog-2.jpg",
    category: "Travel Tips",
    date: "Mar 10, 2025",
    readTime: "5 min read",
    href: "#blog",
  },
  {
    title: "UK Visa Refusal? Here Are the Top Reasons and How to Avoid Them",
    excerpt:
      "Learn about the most common reasons for UK visa refusals and what you can do to strengthen your application and improve approval chances.",
    image: "/images/blog-3.jpg",
    category: "UK Visa",
    date: "Mar 5, 2025",
    readTime: "6 min read",
    href: "#blog",
  },
]

const categoryColors: Record<string, string> = {
  "Visa Guide": "bg-primary/20 text-primary",
  "Travel Tips": "bg-green-dark/30 text-green-bright",
  "UK Visa": "bg-accent/15 text-accent",
}

export default function BlogSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="blog" className="py-24 lg:py-32 bg-surface-1 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(ellipse at 30% 70%, oklch(0.72 0.22 128 / 0.05) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary mb-5 uppercase tracking-wider">
              Travel Blog
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
              Visa Tips &{" "}
              <span className="text-primary">Travel Guides</span>
            </h2>
          </div>
          <a
            href="#blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors shrink-0"
          >
            View all posts
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group bg-background border border-border rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <a href={post.href} className="block relative h-52 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                {/* Category badge */}
                <div
                  className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${categoryColors[post.category] ?? "bg-primary/20 text-primary"}`}
                >
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                </div>
              </a>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <a href={post.href}>
                  <h3 className="text-base font-bold text-foreground leading-snug mb-2.5 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </a>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>

                <a
                  href={post.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-200"
                >
                  Read more
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-surface-1 border border-border rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 justify-between"
        >
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">
              Stay Updated with Travel News
            </h3>
            <p className="text-sm text-muted-foreground">
              Get the latest visa updates, travel guides, and exclusive deals straight to your inbox.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-64 px-4 py-3 bg-surface-2 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60 transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:bg-accent transition-colors shrink-0"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
