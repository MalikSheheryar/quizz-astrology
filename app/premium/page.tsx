'use client'
import { motion } from 'framer-motion'
import {
  Crown,
  Star,
  Zap,
  Diamond,
  Sparkles,
  SnowflakeIcon as Crystal,
  Moon,
} from 'lucide-react'
import Link from 'next/link'
import { FloatingElements } from '@/components/floating-elements'
import { localQuizzes } from '@/utils/localQuizData'

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

// Premium Quiz Card Component
const PremiumQuizCard = ({ quiz }) => {
  const getQuizIcon = (quizId) => {
    switch (quizId) {
      case 'fortune-teller-quiz':
        return Crystal
      case 'eclipse-portal-quiz':
        return Moon
      case 'psychic-awakening-quiz':
        return Zap
      case 'monthly-tarot-quiz':
        return Star
      default:
        return Crown
    }
  }

  const IconComponent = getQuizIcon(quiz._id)

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
      }}
      whileTap={{ scale: 0.95 }}
      className="group relative"
    >
      <Link href={`/category/premium/quiz/${quiz._id}`}>
        <div className="relative bg-gradient-to-br from-yellow-400/20 via-orange-400/20 to-red-400/20 dark:from-yellow-600/20 dark:via-orange-600/20 dark:to-red-600/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-yellow-300/30 dark:border-yellow-600/30 overflow-hidden transition-all duration-500 hover:border-yellow-400/50">
          {/* Premium Badge */}
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              PREMIUM ${quiz.price}
            </div>
          </div>

          {/* Floating background elements */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-yellow-400/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 15 + 10}px`,
                  height: `${Math.random() * 15 + 10}px`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, duration: 0.6, type: 'spring' }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="relative inline-block">
                <IconComponent className="w-16 h-16 text-yellow-500 drop-shadow-lg" />
                <motion.div
                  className="absolute -inset-4 bg-yellow-400/30 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
            </motion.div>

            {/* Title */}
            <h3
              className="text-2xl font-bold mb-4 text-gray-800 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {quiz.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {quiz.description}
            </p>

            {/* Quiz Details */}
            <div className="flex justify-between items-center mb-6 text-sm">
              <span className="bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300">
                ⏱️ {quiz.duration} min
              </span>
              <span className="bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300">
                👥 {quiz.participants}
              </span>
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-6 rounded-full text-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:from-yellow-500 group-hover:to-orange-600">
                Start Premium Reading ✨
              </div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function PremiumQuizzesPage() {
  // Filter premium quizzes by category instead of isPremium
  const premiumQuizzes = localQuizzes.filter(
    (quiz) => quiz.category === 'premium'
  )

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
                    repeat: Number.POSITIVE_INFINITY,
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
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {premiumQuizzes.map((quiz, index) => (
              <motion.div
                key={quiz._id}
                variants={itemVariants}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PremiumQuizCard quiz={quiz} />
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
                true path through our premium insights. Experience mystical
                fortune telling, lunar eclipse portals, psychic awakenings, and
                monthly tarot guidance.
              </p>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-white text-purple-600 font-bold rounded-full text-lg shadow-xl hover:bg-gray-100 transition-all duration-300"
              >
                Start Your Premium Experience
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
