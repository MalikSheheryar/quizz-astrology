'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Star, Heart, Moon, Sparkles, ArrowRight } from 'lucide-react'
import QuizCard from '@/components/quiz-card'
import BlogCard from '@/components/blog-card'
import { FloatingElements } from '@/components/floating-elements'
import { useRef, useState, useEffect } from 'react'
import { client } from '@/lib/client'
import { LATEST_BLOG_POSTS_QUERY } from '@/lib/queries'
import type { BlogPost } from '@/types/blog'
import { localQuizzes } from '@/utils/localQuizData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loadingBlogPosts, setLoadingBlogPosts] = useState(true)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const posts = await client.fetch(LATEST_BLOG_POSTS_QUERY)
        setBlogPosts(posts)
      } catch (error) {
        console.error('Error fetching latest blog posts:', error)
      } finally {
        setLoadingBlogPosts(false)
      }
    }
    fetchBlogPosts()
  }, [])

  const featuredQuizzes = [
    {
      id: localQuizzes[0]._id,
      title: localQuizzes[0].title,
      category: localQuizzes[0].category,
      icon: Star,
      description: localQuizzes[0].description,
      slug: localQuizzes[0].slug,
      duration: localQuizzes[0].duration,
      participants: localQuizzes[0].participants,
      difficulty: localQuizzes[0].difficulty,
    },
    {
      id: localQuizzes[6]._id,
      title: localQuizzes[6].title,
      category: localQuizzes[6].category,
      icon: Heart,
      description: localQuizzes[6].description,
      slug: localQuizzes[6].slug,
      duration: localQuizzes[6].duration,
      participants: localQuizzes[6].participants,
      difficulty: localQuizzes[6].difficulty,
    },
    {
      id: localQuizzes[18]._id,
      title: localQuizzes[18].title,
      category: localQuizzes[18].category,
      icon: Moon,
      description: localQuizzes[18].description,
      slug: localQuizzes[18].slug,
      duration: localQuizzes[18].duration,
      participants: localQuizzes[18].participants,
      difficulty: localQuizzes[18].difficulty,
    },
  ]

  return (
    <div className="min-h-screen">
      <FloatingElements />
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-32 px-4 text-center overflow-hidden"
      >
        {/* Galaxy Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#2C3E50] via-[#8E44AD] to-[#1B1B1B]"
          style={{ y }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Optimized Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-[#ECF0F1] rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        <div className="relative max-w-6xl mx-auto z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <Sparkles className="w-20 h-20 mx-auto mb-6 text-[#E67E22] drop-shadow-2xl float-animation" />
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-[#E67E22]/20 to-[#E74C3C]/20 rounded-full blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-6xl md:text-8xl font-heading font-bold mb-8 text-[#ECF0F1] drop-shadow-2xl"
          >
            <span className="galaxy-text-gradient">Discover Your</span>
            <br />
            <span className="galaxy-text-gradient">Cosmic Truth</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl md:text-2xl mb-12 text-[#ECF0F1]/90 max-w-4xl mx-auto leading-relaxed drop-shadow-lg font-body"
          >
            Unlock the mysteries of astrology, numerology, love, and tarot
            through personalized quizzes and spiritual guidance
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              href="https://0aa32hqho3n1az8eh7vgz5sy8c.hop.clickbank.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(231, 76, 60, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-4 bg-[#E74C3C] hover:bg-[#C0392B] text-white text-lg font-semibold rounded-full shadow-2xl transition-local duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </Link>
            <Link
              href="https://quizzastrology.com/category/astrology"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-[#2C3E50]/80 backdrop-blur-md border border-[#8E44AD]/30 text-[#ECF0F1] text-lg font-semibold rounded-full hover:bg-[#2C3E50] transition-local duration-300 shadow-xl"
              >
                Explore Quizzes
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
      {/* Featured Quizzes */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 galaxy-text-gradient">
              Featured Quizzes
            </h2>
            <p className="text-xl text-[#ECF0F1]/80 max-w-3xl mx-auto font-body">
              Explore your spiritual path with our most popular and
              transformative quizzes
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {featuredQuizzes.map((quiz, index) => (
              <motion.div key={quiz.id} variants={itemVariants}>
                <QuizCard quiz={quiz} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Clocal to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#8E44AD] via-[#2C3E50] to-[#8E44AD]" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-5xl mx-auto text-center z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-8 text-[#ECF0F1] drop-shadow-lg"
          >
            Ready for Deeper Insights?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl mb-10 text-[#ECF0F1]/90 max-w-3xl mx-auto font-body"
          >
            Want more quizzes or looking for a psychic reading or tarot advice
            for your relationship?
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(231, 76, 60, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-[#E74C3C] hover:bg-[#C0392B] text-white text-lg font-semibold rounded-full transition-local duration-300 shadow-2xl"
          >
            Get Personal Reading
          </motion.button>
        </div>
      </motion.section>
      {/* Blog Section */}
      <section className="py-20 px-4 bg-[#2C3E50]/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 galaxy-text-gradient">
              Mystical Insights
            </h2>
            <p className="text-xl text-[#ECF0F1]/80 max-w-3xl mx-auto font-body">
              Deepen your understanding with our latest spiritual articles and
              cosmic wisdom
            </p>
          </motion.div>
          {loadingBlogPosts ? (
            <div className="text-center py-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}
                className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Loading latest insights...
              </p>
            </div>
          ) : blogPosts.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {blogPosts.map((post, index) => (
                <motion.div key={post._id} variants={itemVariants}>
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                No blog posts found.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Check back soon for new mystical insights!
              </p>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/blog"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#8E44AD] to-[#E67E22] hover:from-[#7D3C98] hover:to-[#D35400] text-white font-semibold rounded-full transition-local duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              View local Articles
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
