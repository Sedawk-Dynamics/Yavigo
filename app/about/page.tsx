'use client';

import Navbar from '@/components/navbar';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users, Award, Target, Heart } from 'lucide-react';

export default function AboutPage() {
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
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background via-surface-1 to-background pt-32 pb-20">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'var(--gold)' }}
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl font-bold mb-4"
          >
          <span className="text-green-primary">
            About Yavigo
          </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            We serve happiness by making global travel accessible to everyone
          </motion.p>
        </motion.div>

        {/* Mission section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              At Yavigo, we believe that international travel should be accessible, hassle-free, and enjoyable for everyone. Our mission is to simplify the visa application process and provide comprehensive travel solutions that empower millions of people to explore the world.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We combine cutting-edge technology with expert human support to deliver the most reliable visa and travel services in the industry.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative h-96 rounded-2xl overflow-hidden border border-green-primary/20"
          >
            <Image
              src="/images/dest-paris.jpg"
              alt="About Yavigo"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { icon: Users, stat: '120K+', label: 'Travelers Served' },
            { icon: Award, stat: '95%', label: 'Success Rate' },
            { icon: Target, stat: '180+', label: 'Countries' },
            { icon: Heart, stat: '24/7', label: 'Support' }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="p-6 bg-surface-2/50 border border-green-primary/20 rounded-2xl text-center"
            >
              <item.icon className="w-8 h-8 text-green-primary mx-auto mb-4" />
              <p className="text-3xl font-bold text-green-bright mb-2">{item.stat}</p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Trust & Security',
                desc: 'Your data and documents are protected with enterprise-grade security'
              },
              {
                title: 'Excellence',
                desc: 'We maintain the highest standards in visa processing and customer service'
              },
              {
                title: 'Innovation',
                desc: 'Leveraging technology to make travel simpler and more accessible'
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="p-8 bg-surface-2/50 border border-green-primary/20 rounded-2xl"
              >
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center py-16 px-8 bg-surface-2/50 border border-green-primary/20 rounded-2xl"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 text-foreground">Join Thousands of Happy Travelers</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your visa application today and explore the world with confidence
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-primary to-green-bright text-primary-foreground font-bold rounded-xl shadow-lg shadow-green-primary/30 hover:shadow-xl transition-all"
          >
            Get Started
          </motion.a>
        </motion.div>
      </div>
      </main>
    </>
  );
}
