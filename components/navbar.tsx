"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone, ChevronDown, ArrowRight } from "lucide-react"

const navLinks = [
  {
    label: "Visa Services",
    href: "/services",
    sub: [
      { label: "Schengen Visa", href: "/services/schengen" },
      { label: "UK Visa", href: "/services/uk" },
      { label: "Dubai E-Visa", href: "/services/dubai" },
      { label: "USA Visa", href: "/services/usa" },
      { label: "Canada Visa", href: "/services/canada" },
    ],
  },
  { label: "Visa Assistance", href: "/visa-requirements" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdown, setDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-border"
            : "bg-white border-b border-border"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/images/yavigo-logo.png"
                alt="Yavigo – We Serve Happiness"
                width={140}
                height={44}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.sub && setDropdown(link.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-green-primary transition-colors rounded-lg hover:bg-green-light"
                  >
                    {link.label}
                    {link.sub && <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${dropdown === link.label ? "rotate-180" : ""}`} />}
                  </Link>
                  <AnimatePresence>
                    {link.sub && dropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-52 bg-white border border-border rounded-2xl shadow-xl shadow-black/10 overflow-hidden"
                      >
                        {link.sub.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:text-green-primary hover:bg-green-light transition-all"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-green-primary shrink-0" />
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a href="tel:+18000000000" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-green-primary transition-colors">
                <Phone className="w-3.5 h-3.5" />
                +1 800 000 0000
              </a>
              <Link href="/contact">
                <motion.span
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-modern inline-flex items-center gap-2 px-5 py-2.5 bg-green-primary text-white text-sm font-semibold rounded-xl cursor-pointer"
                >
                  Apply for Visa
                  <ArrowRight className="btn-arrow w-4 h-4" />
                </motion.span>
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-foreground hover:bg-surface-1 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed inset-0 z-40 bg-white lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col min-h-screen pt-20 px-6 pb-10">
              <nav className="flex flex-col divide-y divide-border">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between py-4 text-lg font-semibold text-foreground hover:text-green-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center px-6 py-4 bg-green-primary text-white text-lg font-semibold rounded-2xl hover:bg-green-dark transition-colors"
                >
                  Apply for Visa
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
