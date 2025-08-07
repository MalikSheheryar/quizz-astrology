"use client"

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';
import BlogCard from '@/components/blog-card';
import { FloatingElements } from '@/components/floating-elements';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Mercury Retrograde: What It Really Means",
      excerpt: "Understanding the cosmic influence on communication and technology during Mercury's backward dance through the zodiac...",
      date: "2024-01-15",
      category: "Astrology",
      author: "Luna Starweaver",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Finding Love Through Numerology",
      excerpt: "How your birth numbers can guide you to your soulmate and create lasting romantic connections through ancient wisdom...",
      date: "2024-01-12",
      category: "Love & Numerology",
      author: "Marcus Numeris",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Tarot Cards for Beginners: A Complete Guide",
      excerpt: "Start your tarot journey with these essential tips, card meanings, and simple spreads for daily guidance...",
      date: "2024-01-10",
      category: "Tarot",
      author: "Mystic Rose",
      readTime: "10 min read"
    },
    {
      id: 4,
      title: "The Power of Full Moon Rituals",
      excerpt: "Harness lunar energy for manifestation, release, and spiritual growth with these powerful full moon practices...",
      date: "2024-01-08",
      category: "Spiritual Practice",
      author: "Luna Starweaver",
      readTime: "6 min read"
    },
    {
      id: 5,
      title: "Understanding Your Life Path Number",
      excerpt: "Discover how your life path number reveals your soul's purpose and the lessons you're here to learn...",
      date: "2024-01-05",
      category: "Numerology",
      author: "Marcus Numeris",
      readTime: "8 min read"
    },
    {
      id: 6,
      title: "Zodiac Compatibility: Beyond Sun Signs",
      excerpt: "Explore deeper astrological compatibility by examining moon signs, Venus placements, and composite charts...",
      date: "2024-01-03",
      category: "Astrology & Love",
      author: "Celestial Hearts",
      readTime: "9 min read"
    }
  ];

  const categories = [
    "All", "Astrology", "Numerology", "Tarot", "Love & Relationships", "Spiritual Practice"
  ];

  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category.includes(selectedCategory.replace(" & Relationships", "")));

  return (
    <div className="min-h-screen relative">
      <FloatingElements />
      
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="relative overflow-hidden rounded-3xl mb-12">
            <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 dark:from-purple-800 dark:via-indigo-800 dark:to-blue-800 p-16 text-center shadow-2xl">
              <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
              
              {/* Floating background elements */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(25)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bg-white/10 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      width: `${Math.random() * 15 + 5}px`,
                      height: `${Math.random() * 15 + 5}px`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: Math.random() * 4 + 3,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
              
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                  className="mb-8"
                >
                  <div className="relative inline-block">
                    <BookOpen className="w-20 h-20 mx-auto text-white drop-shadow-2xl float-animation" />
                    <motion.div
                      className="absolute -inset-4 bg-white/20 rounded-full blur-xl"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-2xl"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Mystical Insights
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
                >
                  Deepen your understanding of the mystical arts with our expert guidance and ancient wisdom
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 font-semibold rounded-full transition-all duration-300 shadow-lg ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-500/25'
                    : 'bg-white/80 dark:bg-gray-800/80 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/30 backdrop-blur-sm'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600 dark:from-purple-800 dark:via-pink-700 dark:to-indigo-800 p-16 text-center shadow-2xl">
            <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
            
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white/10 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 20 + 10}px`,
                    height: `${Math.random() * 20 + 10}px`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
                Stay Connected to the Cosmos
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                Get weekly insights, cosmic updates, and exclusive spiritual guidance delivered to your inbox
              </p>
              <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                <motion.input
                  type="email"
                  placeholder="Enter your email"
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 4px rgba(255,255,255,0.3)" }}
                  className="flex-1 px-6 py-4 rounded-full text-gray-800 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                />
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-purple-600 hover:bg-gray-100 font-semibold rounded-full transition-all duration-300 shadow-xl"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
