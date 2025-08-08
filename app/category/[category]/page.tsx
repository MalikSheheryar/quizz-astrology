'use client'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic' // Import dynamic for client-side loading
import { Star, Heart, Hash, Moon, Sun, Sparkles } from 'lucide-react'
import QuizCard from '@/components/quiz-card'
import { FloatingElements } from '@/components/floating-elements'
import { client } from '@/lib/client'
import { QUIZ_CATEGORY_BY_SLUG_QUERY } from '@/lib/queries'
import { QuizCategory } from '@/types/blog'
import { useState, useEffect } from 'react'

// Dynamically import animated elements to avoid framer-motion bundling issues
const MotionDiv = dynamic(
  () => import('@/components/animated-elements').then((mod) => mod.MotionDiv),
  { ssr: false }
)
const MotionH1 = dynamic(
  () => import('@/components/animated-elements').then((mod) => mod.MotionH1),
  { ssr: false }
)
const MotionP = dynamic(
  () => import('@/components/animated-elements').then((mod) => mod.MotionP),
  { ssr: false }
)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function CategoryPage() {
  const params = useParams()
  const categorySlug = params.category as string // Renamed for clarity
  const [categoryData, setCategoryData] = useState<QuizCategory | null>(null)
  const [loading, setLoading] = useState(true)

  // Default category data for fallback (ensure this matches your expected structure)
  // This data will now primarily drive the header content as Sanity will only provide contentDescription
  const defaultCategoryData = {
    astrology: {
      title: 'Astrology Quizzes',
      description:
        'Discover your cosmic personality and celestial influences through the ancient wisdom of the stars',
      icon: Star,
      gradient: 'from-purple-600 via-indigo-600 to-blue-600',
      darkGradient: 'dark:from-purple-800 dark:via-indigo-800 dark:to-blue-800',
      quizzes: [
        {
          id: 1,
          title: "What's Your Zodiac Personality?",
          category: 'Astrology',
          icon: Star,
          description:
            'Discover your true astrological nature and hidden cosmic traits',
        },
        {
          id: 6,
          title: 'Your Moon Sign Revealed',
          category: 'Astrology',
          icon: Moon,
          description:
            'Uncover your emotional and intuitive side through lunar astrology',
        },
      ],
    },
    love: {
      title: 'Love & Emotions',
      description:
        'Explore matters of the heart and discover your romantic destiny through cosmic guidance',
      icon: Heart,
      gradient: 'from-pink-500 via-rose-500 to-red-500',
      darkGradient: 'dark:from-pink-700 dark:via-rose-700 dark:to-red-700',
      quizzes: [
        {
          id: 2,
          title: 'Love Compatibility Test',
          category: 'Love',
          icon: Heart,
          description:
            'Find your perfect romantic match through cosmic alignment',
        },
        {
          id: 7,
          title: 'Your Love Language Quiz',
          category: 'Love',
          icon: Heart,
          description:
            'Discover how you express and receive love most naturally',
        },
      ],
    },
    numerology: {
      title: 'Numerology',
      description:
        'Unlock the sacred power of numbers and discover your divine life path',
      icon: Hash,
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      darkGradient: 'dark:from-emerald-700 dark:via-teal-700 dark:to-cyan-700',
      quizzes: [
        {
          id: 3,
          title: 'Your Life Path Number',
          category: 'Numerology',
          icon: Hash,
          description:
            'Uncover your destiny and purpose through sacred numbers',
        },
        {
          id: 8,
          title: 'Personal Year Number',
          category: 'Numerology',
          icon: Hash,
          description: 'Discover what this year holds for your personal growth',
        },
      ],
    },
    tarot: {
      title: 'Tarot Readings',
      description:
        'Divine wisdom through ancient card symbolism and mystical insights',
      icon: Moon,
      gradient: 'from-indigo-600 via-purple-600 to-violet-600',
      darkGradient:
        'dark:from-indigo-800 dark:via-purple-800 dark:to-violet-800',
      quizzes: [
        {
          id: 4,
          title: 'Daily Tarot Reading',
          category: 'Tarot',
          icon: Moon,
          description: "Get insights and guidance for today's journey ahead",
        },
        {
          id: 9,
          title: 'Your Tarot Birth Card',
          category: 'Tarot',
          icon: Moon,
          description: 'Find your personal tarot card and its deep meaning',
        },
      ],
    },
    spiritual: {
      title: 'Spiritual Guidance',
      description:
        'Connect with your higher self and embark on a transformative spiritual journey',
      icon: Sun,
      gradient: 'from-yellow-500 via-orange-500 to-red-500',
      darkGradient: 'dark:from-yellow-600 dark:via-orange-600 dark:to-red-600',
      quizzes: [
        {
          id: 5,
          title: 'Spiritual Awakening Level',
          category: 'Spiritual',
          icon: Sun,
          description: 'Measure your current level of spiritual consciousness',
        },
        {
          id: 10,
          title: 'Your Spirit Animal Guide',
          category: 'Spiritual',
          icon: Sun,
          description: 'Discover which animal spirit guides your path',
        },
      ],
    },
    compatibility: {
      title: 'Couple Compatibility',
      description:
        'Test your romantic and spiritual connections through cosmic alignment',
      icon: Sparkles,
      gradient: 'from-pink-500 via-purple-500 to-indigo-500',
      darkGradient: 'dark:from-pink-700 dark:via-purple-700 dark:to-indigo-700',
      quizzes: [
        {
          id: 11,
          title: 'Zodiac Compatibility Test',
          category: 'Compatibility',
          icon: Sparkles,
          description: 'See how your signs align for lasting love',
        },
        {
          id: 12,
          title: 'Soul Mate Connection Quiz',
          category: 'Compatibility',
          icon: Sparkles,
          description: "Discover if you've found your spiritual life partner",
        },
      ],
    },
  }

  const currentDefault =
    defaultCategoryData[categorySlug as keyof typeof defaultCategoryData] ||
    defaultCategoryData.astrology

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const data = await client.fetch(QUIZ_CATEGORY_BY_SLUG_QUERY, {
          slug: categorySlug,
        })
        setCategoryData(data)
      } catch (error) {
        console.error('Error fetching category data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (categorySlug) {
      fetchCategoryData()
    }
  }, [categorySlug])

  const Icon = currentDefault.icon

  if (loading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <FloatingElements />
        <div className="text-center">
          <MotionDiv
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Loading category...
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen relative">
        <FloatingElements />

        <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
          {/* Category Header */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mb-16 overflow-hidden"
          >
            <div
              className={`bg-gradient-to-br ${currentDefault.gradient} ${currentDefault.darkGradient} rounded-3xl p-12 text-center shadow-2xl`}
            >
              <div className="absolute inset-0 bg-black/20 dark:bg-black/40 rounded-3xl" />

              {/* Floating background elements */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {[...Array(20)].map((_, i) => (
                  <MotionDiv
                    key={i}
                    className="absolute bg-white/10 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      width: `${Math.random() * 20 + 10}px`,
                      height: `${Math.random() * 20 + 10}px`,
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
                <MotionDiv
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
                  className="mb-8"
                >
                  <div className="relative inline-block">
                    <Icon className="w-20 h-20 mx-auto text-white drop-shadow-2xl float-animation" />
                    <MotionDiv
                      className="absolute -inset-4 bg-white/20 rounded-full blur-xl"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                </MotionDiv>

                <MotionH1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-2xl"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {currentDefault.title}{' '}
                  {/* Now always uses the hardcoded title */}
                </MotionH1>

                {/* Removed the MotionP for brief description from the header */}
              </div>
            </div>
          </MotionDiv>

          {/* Category Content from Sanity (now using the single contentDescription field) */}
          {categoryData?.contentDescription && (
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 dark:border-gray-700/30"
            >
              <p className="prose prose-lg prose-purple dark:prose-invert max-w-none text-[#020817]  leading-relaxed">
                {categoryData.contentDescription}
              </p>
            </MotionDiv>
          )}

          {/* Quizzes Section */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <MotionH1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Available Quizzes
            </MotionH1>

            <MotionDiv
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {currentDefault.quizzes.map((quiz, index) => (
                <MotionDiv
                  key={quiz.id}
                  variants={itemVariants}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <QuizCard quiz={quiz} />
                </MotionDiv>
              ))}
            </MotionDiv>
          </MotionDiv>

          {/* Coming Soon Section */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-12 text-center shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 opacity-5 dark:opacity-10">
                <MotionDiv
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"
                />
              </div>

              <MotionDiv
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <Sparkles className="w-16 h-16 mx-auto text-purple-500 dark:text-purple-400 float-animation" />
              </MotionDiv>

              <MotionH1
                className="text-3xl md:text-4xl font-bold mb-6 gradient-text"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                More Quizzes Coming Soon!
              </MotionH1>

              <MotionP className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                We're constantly adding new quizzes to help you explore your
                spiritual journey. Check back regularly for fresh insights and
                cosmic discoveries.
              </MotionP>

              <MotionDiv
                as="button"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 hover:from-purple-700 hover:via-pink-600 hover:to-indigo-700 text-white font-semibold rounded-full transition-all duration-300 shadow-xl"
              >
                Notify Me
              </MotionDiv>
            </div>
          </MotionDiv>
        </div>
      </div>
    </>
  )
}
