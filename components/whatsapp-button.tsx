'use client'

import { FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)

  const whatsappNumber = '+911234567890'
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: 0.3,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pulse Background */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: isHovered ? 1.15 : 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Ripple Effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-[#25D366]"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{
          scale: isHovered ? 1.4 : 1,
          opacity: isHovered ? 0 : 0.3,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      />

      {/* Main Button */}
      <motion.div
        className="relative w-14 h-14 rounded-full bg-[#25D366] shadow-2xl flex items-center justify-center cursor-pointer"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        <FaWhatsapp className="w-7 h-7 text-white" />
      </motion.div>

      {/* Tooltip */}
      <motion.div
        className="absolute right-20 bottom-1/2 translate-y-1/2 bg-black text-white px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium shadow-xl pointer-events-none"
        initial={{ opacity: 0, x: 10 }}
        animate={
          isHovered
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: 10 }
        }
        transition={{ duration: 0.2 }}
      >
        WhatsApp Us
        <div className="absolute left-full top-1/2 -translate-y-1/2 w-2 h-2 bg-black rotate-45" />
      </motion.div>
    </motion.a>
  )
}