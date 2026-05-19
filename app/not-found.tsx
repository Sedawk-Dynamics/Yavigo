'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-surface-1 to-background flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: 'var(--green-primary)' }}
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="relative z-10 text-center max-w-2xl px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Number */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="text-9xl font-bold text-transparent bg-gradient-to-r from-green-bright via-green-primary to-blue-accent bg-clip-text">
            404
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl font-bold text-foreground mb-4"
        >
          Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground mb-8"
        >
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-primary to-green-bright text-primary-foreground font-bold rounded-xl hover:shadow-lg shadow-green-primary/30 transition-all"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </motion.button>
          </Link>
          <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-surface-2 border-2 border-green-primary/30 text-foreground font-bold rounded-xl hover:border-green-primary/60 transition-all"
            >
              Explore Services
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
