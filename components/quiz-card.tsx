'use client'
import { motion } from 'framer-motion'
import type React from 'react'

import { Clock, Users, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface QuizCardProps {
  quiz: {
    id: string | number
    title: string
    category: string
    icon: any
    description: string
    slug?: string
    duration?: number
    participants?: string
    difficulty?: string
    price?: number
  }
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const Icon = quiz.icon

  // Determine the link based on whether it's a new quiz (has slug) or old quiz (has numeric id)
  const quizLink = quiz.slug
    ? `/category/${quiz.category.toLowerCase()}/quiz/${quiz.slug}`
    : `/quiz/${quiz.id}`

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="group relative w-full h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={quizLink} className="block h-full">
        <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl sm:rounded-4xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl border border-white/30 dark:border-gray-700/40 transition-all duration-700 overflow-hidden h-full min-h-[280px] sm:min-h-[320px] md:min-h-[350px] flex flex-col">
          {/* Enhanced background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 via-pink-500/6 to-indigo-500/8 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-3xl sm:rounded-4xl" />

          {/* More dynamic floating elements */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl sm:rounded-4xl">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full ${
                  i % 2 === 0
                    ? 'bg-gradient-to-br from-purple-400/15 to-pink-400/10'
                    : 'bg-gradient-to-br from-blue-400/10 to-indigo-400/15'
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 40 + 15}px`,
                  height: `${Math.random() * 40 + 15}px`,
                }}
                animate={{
                  y: [0, -15, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.1, 0.6, 0.1],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: Math.random() * 5 + 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 3,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Subtle border glow effect */}
          <div className="absolute inset-0 rounded-3xl sm:rounded-4xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm -z-10" />

          <div className="relative z-10 flex flex-col h-full">
            {/* Header with Icon and Price */}
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.15 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="relative flex-shrink-0"
              >
                <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 rounded-xl sm:rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:shadow-purple-500/25">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl blur-lg opacity-0 group-hover:opacity-60"
                  whileHover={{ scale: 1.3 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>

              {quiz.price && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg flex-shrink-0 ml-2"
                >
                  ${quiz.price}
                </motion.div>
              )}
            </div>

            {/* Title - Responsive font sizes */}
            <motion.h3
              className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-500 leading-tight line-clamp-2"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              {quiz.title}
            </motion.h3>

            {/* Description - Responsive and flexible */}
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed line-clamp-3 sm:line-clamp-4 flex-grow">
              {quiz.description}
            </p>

            {/* Quiz Stats - Responsive layout */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {quiz.duration && (
                <motion.div
                  className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: 'rgba(147, 51, 234, 0.1)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="font-medium">{quiz.duration}m</span>
                </motion.div>
              )}

              {quiz.participants && (
                <motion.div
                  className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: 'rgba(147, 51, 234, 0.1)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="font-medium">{quiz.participants}</span>
                </motion.div>
              )}

              {quiz.difficulty && (
                <motion.div
                  className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: 'rgba(147, 51, 234, 0.1)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="font-medium capitalize">
                    {quiz.difficulty}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Enhanced CTA Button */}
            <motion.div
              whileHover={{ x: 8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between text-purple-600 dark:text-purple-400 font-semibold group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-all duration-500 bg-purple-50 dark:bg-purple-900/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 mt-auto"
            >
              <span className="text-sm sm:text-base font-bold">Take Quiz</span>
              <motion.div
                whileHover={{ x: 4, rotate: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-purple-600 dark:bg-purple-500 text-white p-2 rounded-lg group-hover:bg-purple-700 dark:group-hover:bg-purple-400 transition-colors duration-300"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
            </motion.div>
          </div>

          {/* Shimmer effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
            initial={{ x: '-100%' }}
            whileHover={{ x: '200%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </div>
      </Link>
    </motion.div>
  )
}

export default QuizCard
