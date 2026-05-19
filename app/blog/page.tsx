'use client';

import Navbar from '@/components/navbar';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Complete Guide to Schengen Visa in 2024',
    excerpt: 'Learn everything you need to know about applying for a Schengen visa, including requirements, processing times, and pro tips.',
    image: '/images/blog-1.jpg',
    author: 'Sarah Chen',
    date: 'Mar 15, 2024',
    readTime: '8 min',
    category: 'Visa Guide'
  },
  {
    id: 2,
    title: 'E-Visa vs Manual Visa: Which Should You Choose?',
    excerpt: 'Comparing the differences between electronic visas and traditional visa applications to help you make the right choice.',
    image: '/images/blog-2.jpg',
    author: 'James Wilson',
    date: 'Mar 10, 2024',
    readTime: '6 min',
    category: 'Tips & Tricks'
  },
  {
    id: 3,
    title: 'Top 10 Destinations for First-Time International Travelers',
    excerpt: 'Discover the best destinations for beginners, including visa requirements, safety tips, and cultural insights.',
    image: '/images/blog-3.jpg',
    author: 'Maria Garcia',
    date: 'Mar 5, 2024',
    readTime: '10 min',
    category: 'Travel Tips'
  },
  {
    id: 4,
    title: 'How to Avoid Common Visa Application Mistakes',
    excerpt: 'Learn from the most common visa application errors and how to prevent them to ensure approval on your first try.',
    image: '/images/dest-london.jpg',
    author: 'Alex Kumar',
    date: 'Feb 28, 2024',
    readTime: '7 min',
    category: 'Visa Guide'
  },
  {
    id: 5,
    title: 'Budget Travel Guide: Europe on a Shoestring',
    excerpt: 'Explore Europe without breaking the bank. Complete guide to affordable accommodations, food, and activities.',
    image: '/images/dest-dubai.jpg',
    author: 'Emma Thompson',
    date: 'Feb 20, 2024',
    readTime: '9 min',
    category: 'Travel Tips'
  },
  {
    id: 6,
    title: 'Understanding Travel Insurance for Visa Applications',
    excerpt: 'Why travel insurance matters for your visa application and how to choose the right policy for your needs.',
    image: '/images/dest-schengen.jpg',
    author: 'David Lee',
    date: 'Feb 15, 2024',
    readTime: '5 min',
    category: 'Visa Guide'
  }
];

export default function BlogPage() {
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
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'var(--green-primary)' }}
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
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
          Travel Blog
        </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Expert tips, visa guides, and travel stories to help you plan your next adventure
          </motion.p>
        </motion.div>

        {/* Blog posts grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group bg-surface-2/50 border border-green-primary/20 rounded-2xl overflow-hidden hover:border-green-primary/60 transition-all"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Category tag */}
                <motion.div
                  className="absolute top-4 left-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="px-3 py-1 bg-green-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-green-bright transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta info */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 pb-4 border-b border-green-primary/10">
                  <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </div>
                </div>

                {/* Read more */}
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-green-primary hover:text-green-bright transition-colors"
                >
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Newsletter section */}
        <motion.section
          className="relative py-16 px-8 bg-gradient-to-r from-green-primary/10 via-surface-2/50 to-blue-accent/10 border border-green-primary/20 rounded-3xl overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute inset-0 opacity-20 pointer-events-none"
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 15, repeat: Infinity }}
          />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold text-foreground mb-4"
            >
              Stay Updated with Travel Tips
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground mb-8"
            >
              Subscribe to our newsletter for visa updates, travel guides, and exclusive offers
            </motion.p>

            <motion.form
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-surface-1 border border-green-primary/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:border-green-primary/50 focus:outline-none transition-all"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-green-primary to-green-bright text-primary-foreground font-semibold rounded-lg hover:shadow-lg shadow-green-primary/20 transition-all"
              >
                Subscribe
              </motion.button>
            </motion.form>
          </div>
        </motion.section>
      </div>
      </main>
    </>
  );
}
