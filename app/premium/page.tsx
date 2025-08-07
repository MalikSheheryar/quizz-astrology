'use client'
import { motion } from 'framer-motion'
import { Crown, Star, Zap, Diamond, Gem, Sparkles } from 'lucide-react'
import QuizCard from '@/components/quiz-card'
import { FloatingElements } from '@/components/floating-elements'

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

export default function PremiumQuizzesPage() {
  // Premium quizzes data - you can add your 5 premium quizzes here
  const premiumQuizzes = [
    {
      id: 101,
      title: 'Ultimate Soul Purpose Reading',
      category: 'Premium',
      icon: Crown,
      description:
        'Discover your deepest life purpose through advanced cosmic analysis',
      isPremium: true,
    },
    {
      id: 102,
      title: 'Advanced Twin Flame Connection',
      category: 'Premium',
      icon: Diamond,
      description:
        'Explore the mystical bond of twin flames and soul connections',
      isPremium: true,
    },
    {
      id: 103,
      title: 'Master Numerology Blueprint',
      category: 'Premium',
      icon: Gem,
      description:
        'Complete numerological analysis of your life path and destiny',
      isPremium: true,
    },
    {
      id: 104,
      title: 'Elite Astral Projection Guide',
      category: 'Premium',
      icon: Zap,
      description: 'Learn to navigate the astral realm with expert guidance',
      isPremium: true,
    },
    {
      id: 105,
      title: 'Divine Chakra Mastery',
      category: 'Premium',
      icon: Star,
      description: 'Master all seven chakras for complete spiritual alignment',
      isPremium: true,
    },
  ]

  return (
    <div className="min-h-screen relative">
      <FloatingElements />

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-16 overflow-hidden"
        >
          <div className="bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 dark:from-yellow-600 dark:via-orange-600 dark:to-red-600 rounded-3xl p-12 text-center shadow-2xl">
            <div className="absolute inset-0 bg-black/20 dark:bg-black/40 rounded-3xl" />

            {/* Floating background elements */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 25 + 15}px`,
                    height: `${Math.random() * 25 + 15}px`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 4,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
                className="mb-8"
              >
                <div className="relative inline-block">
                  <Crown className="w-24 h-24 mx-auto text-white drop-shadow-2xl" />
                  <motion.div
                    className="absolute -inset-6 bg-white/30 rounded-full blur-xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.9, 0.5],
                      rotate: [0, 180, 360],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                PREMIUM QUIZZES
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-6"
              >
                <span className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-bold text-lg border border-white/30">
                  ✨ EXCLUSIVE CONTENT ✨
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-lg"
              >
                Unlock the deepest mysteries of your spiritual journey with our
                exclusive premium quizzes. These advanced readings provide
                profound insights that go beyond ordinary divination.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Premium Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Crown,
                title: 'Exclusive Access',
                desc: 'Premium content not available anywhere else',
              },
              {
                icon: Zap,
                title: 'Advanced Insights',
                desc: 'Deeper analysis and personalized guidance',
              },
              {
                icon: Sparkles,
                title: 'Expert Crafted',
                desc: 'Created by master spiritual advisors',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 text-center shadow-xl border border-white/20 dark:border-gray-700/30"
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-xl font-bold mb-3 gradient-text">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Premium Quizzes Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Exclusive Premium Collection
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {premiumQuizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                variants={itemVariants}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <QuizCard quiz={quiz} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Upgrade CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600 rounded-3xl p-12 text-center shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-black/20 rounded-3xl" />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <Diamond className="w-16 h-16 mx-auto text-white" />
              </motion.div>

              <h3
                className="text-3xl md:text-4xl font-bold mb-6 text-white"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Ready to Unlock Your Premium Journey?
              </h3>

              <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of spiritual seekers who have discovered their
                true path through our premium insights.
              </p>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-white text-purple-600 font-bold rounded-full text-lg shadow-xl hover:bg-gray-100 transition-all duration-300"
              >
                Upgrade to Premium
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
