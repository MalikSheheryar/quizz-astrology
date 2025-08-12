'use client'
import type React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Unlock } from 'lucide-react'
import { useState } from 'react'
import PaymentModal from '../../PaymentModal'

interface ShortResultProps {
  soulNumber: number | null
  userData: any
  onShowFullReport: () => void
}

const ShortResult: React.FC<ShortResultProps> = ({
  soulNumber,
  userData,
  onShowFullReport,
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [hasUnlockedFull, setHasUnlockedFull] = useState(false)

  const getSoulNumberDescription = (number: number | null) => {
    if (!number)
      return {
        title: 'The Seeker',
        description: 'Your soul is on a journey of discovery.',
        element: '✨',
        color: 'from-purple-500 to-pink-500',
      }

    const descriptions: any = {
      1: {
        title: 'The Pioneer of Destiny',
        description:
          'You are a natural-born leader with an unstoppable drive to create and innovate. Your soul craves independence and the freedom to forge new paths.',
        element: '🔥',
        color: 'from-red-500 to-orange-500',
      },
      2: {
        title: 'The Harmonious Peacemaker',
        description:
          'Your soul seeks balance, cooperation, and deep emotional connections. You are the bridge that brings people together in harmony.',
        element: '🌙',
        color: 'from-blue-400 to-purple-500',
      },
      3: {
        title: 'The Creative Visionary',
        description:
          'Your soul is a fountain of creativity and joy. You are here to inspire others through artistic expression and boundless optimism.',
        element: '🌈',
        color: 'from-pink-400 to-yellow-400',
      },
      4: {
        title: 'The Master Builder',
        description:
          'Your soul finds purpose in creating lasting foundations. You bring order, stability, and practical wisdom to everything you touch.',
        element: '🏔️',
        color: 'from-green-500 to-teal-500',
      },
      5: {
        title: 'The Freedom Seeker',
        description:
          "Your soul yearns for adventure, change, and new experiences. You are here to explore life's infinite possibilities with courage.",
        element: '🌪️',
        color: 'from-orange-400 to-red-500',
      },
      6: {
        title: 'The Nurturing Healer',
        description:
          'Your soul is devoted to caring, healing, and creating beautiful spaces for others to thrive. Love and service are your guiding lights.',
        element: '💚',
        color: 'from-green-400 to-emerald-500',
      },
      7: {
        title: 'The Seeker of Truth',
        description:
          "Your soul is on a quest for deeper understanding and spiritual wisdom. You are the mystic who unveils life's hidden mysteries.",
        element: '🔮',
        color: 'from-purple-500 to-indigo-600',
      },
      8: {
        title: 'The Material Master',
        description:
          'Your soul is designed to achieve great things in the material world. You have the power to manifest abundance and lead with authority.',
        element: '👑',
        color: 'from-yellow-500 to-orange-600',
      },
      9: {
        title: 'The Universal Humanitarian',
        description:
          'Your soul carries the wisdom of all numbers. You are here to serve humanity with compassion and bring healing to the world.',
        element: '🌍',
        color: 'from-teal-400 to-blue-600',
      },
      11: {
        title: 'The Intuitive Illuminator',
        description:
          'Your soul is a beacon of spiritual insight and inspiration. You are here to awaken others to higher consciousness and divine truth.',
        element: '✨',
        color: 'from-purple-400 to-pink-500',
      },
      22: {
        title: 'The Master Architect',
        description:
          'Your soul has the power to turn grand visions into reality. You are here to build something lasting that will benefit all of humanity.',
        element: '🏛️',
        color: 'from-indigo-500 to-purple-600',
      },
    }

    return descriptions[number] || descriptions[1]
  }

  const handleUnlockFull = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    setHasUnlockedFull(true)
    onShowFullReport()
  }

  const getFullAnalysis = () => {
    const soulData = getSoulNumberDescription(soulNumber)
    return `Complete Soul Number ${soulNumber} Analysis - ${soulData.title}

Your soul carries the essence of ${soulData.title.toLowerCase()}, with deep spiritual significance that extends far beyond this brief overview.

DETAILED SOUL BLUEPRINT:
• Life Purpose & Mission
• Karmic Lessons & Challenges  
• Hidden Talents & Gifts
• Relationship Compatibility Patterns
• Career & Financial Destiny
• Spiritual Growth Path
• Lucky Numbers & Dates
• Personal Power Activation

This comprehensive analysis reveals the complete blueprint of your soul's journey, including specific guidance for manifesting your highest potential in love, career, and spiritual evolution.`
  }

  const soulData = getSoulNumberDescription(soulNumber)

  const results = {
    soulNumber,
    soulData,
    userData,
    analysis: getFullAnalysis(),
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-slate-800/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div
            className={`w-32 h-32 bg-gradient-to-r ${soulData.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl`}
          >
            <span className="text-6xl font-bold text-white">{soulNumber}</span>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
            className="text-6xl mb-4"
          >
            {soulData.element}
          </motion.div>

          <h2 className="text-4xl font-bold text-white mb-4 font-heading">
            Soul Number {soulNumber}
          </h2>

          <h3 className="text-2xl font-semibold text-yellow-400 mb-6 font-heading">
            {soulData.title}
          </h3>

          <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto font-body">
            {soulData.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-white/70 mb-6 font-body">
            Hello {userData.fullName}, this is just the beginning of your cosmic
            journey...
          </p>

          <motion.button
            onClick={handleUnlockFull}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-400 to-orange-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-heading"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Unlock className="w-6 h-6 mr-3" />
            Unlock Full Soul Blueprint ($1.99)
            <Sparkles className="w-6 h-6 ml-3" />
          </motion.button>
        </motion.div>
      </div>
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        quizSlug="soul-number"
        userData={userData}
        results={results}
        quizTitle="Soul Number Analysis"
        fullAnalysis={getFullAnalysis()}
        price={1.99}
      />
    </motion.div>
  )
}

export default ShortResult
