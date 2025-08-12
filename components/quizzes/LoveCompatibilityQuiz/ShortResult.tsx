'use client'
import type React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Star, Sparkles } from 'lucide-react'
import PaymentModal from '../../PaymentModal'

interface ShortResultProps {
  userData: any
  compatibilityScore: any
  onShowFull: () => void
  showFullResult: boolean
  quizData: any
}

const ShortResult: React.FC<ShortResultProps> = ({
  userData,
  compatibilityScore,
  onShowFull,
  showFullResult,
  quizData,
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const getCompatibilityInsight = (score: number) => {
    if (score >= 85)
      return {
        title: 'Cosmic Soulmate Connection',
        description:
          'The stars have aligned! This connection has incredible potential for deep, lasting love.',
        energy: 'Future soulmate energy with divine timing',
        icon: Star,
        color: 'from-purple-500 to-pink-500',
      }
    if (score >= 70)
      return {
        title: 'Magnetic Attraction',
        description:
          'Strong compatibility with beautiful growth potential. This connection could blossom beautifully.',
        energy: 'Meant to grow you both in love',
        icon: Heart,
        color: 'from-pink-500 to-red-500',
      }
    if (score >= 55)
      return {
        title: 'Passionate Spark',
        description:
          'Intense chemistry with some challenges. This connection teaches important lessons about love.',
        energy: 'Hot flame but requires nurturing',
        icon: Sparkles,
        color: 'from-orange-500 to-red-500',
      }
    return {
      title: 'Learning Connection',
      description:
        'This person came into your life to teach you something valuable about yourself and love.',
      energy: 'Meant to teach and transform',
      icon: Sparkles,
      color: 'from-blue-500 to-purple-500',
    }
  }

  const insight = getCompatibilityInsight(compatibilityScore.overall)
  const IconComponent = insight.icon

  const handleUnlockFull = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    onShowFull()
  }

  const getFullAnalysis = () => {
    const crushName = userData.crushName || 'your crush'
    return `Your complete compatibility analysis with ${crushName} reveals a ${
      compatibilityScore.overall
    }% cosmic connection with deep insights into your relationship potential.

${insight.title}: ${insight.description}

Detailed Compatibility Breakdown:
• Emotional Connection: Deep understanding and empathy levels
• Communication Style: How well you express and receive love
• Life Goals Alignment: Shared vision for the future
• Physical Chemistry: Natural attraction and intimacy potential
• Growth Compatibility: How you inspire each other's evolution
• Long-term Potential: Sustainability of this connection

Relationship Guidance:
${
  insight.energy
} - This connection offers unique opportunities for growth and understanding. Your compatibility score indicates ${
      compatibilityScore.overall >= 70
        ? 'strong potential for a lasting relationship'
        : 'valuable lessons about love and connection'
    }.

Personalized advice for nurturing this relationship, understanding each other's needs, and building a strong foundation for lasting love.`
  }

  if (showFullResult) {
    return null // Don't render short result if full result is shown
  }

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Teaser Result */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-slate-800/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${insight.color} rounded-full mb-6`}
          >
            <IconComponent className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {userData.crushName
              ? `You and ${userData.crushName}`
              : 'You and your crush'}{' '}
            score
          </h1>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent mb-4"
          >
            {compatibilityScore.overall}%
          </motion.div>

          <p className="text-xl text-white/90 mb-8">
            in cosmic compatibility. The spark is real! ✨
          </p>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 mb-8 border border-purple-400/30">
            <h3 className="text-xl font-bold text-white mb-3">
              Want Your Complete Love Analysis?
            </h3>
            <p className="text-white/80 mb-4">
              Unlock your full compatibility breakdown, relationship insights,
              and personalized guidance for just ${quizData.price}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-green-400 font-semibold">
                  ✓ Detailed Breakdown
                </div>
                <div className="text-white/70">All 6 compatibility areas</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-green-400 font-semibold">
                  ✓ Growth Insights
                </div>
                <div className="text-white/70">Relationship guidance</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-green-400 font-semibold">
                  ✓ Future Potential
                </div>
                <div className="text-white/70">Long-term compatibility</div>
              </div>
            </div>

            <motion.button
              onClick={handleUnlockFull}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold text-xl px-12 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Sparkles className="w-6 h-6" />
              Unlock Full Analysis - ${quizData.price}
              <Sparkles className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
          quizSlug="compatibility-test"
          userData={userData}
          results={{ compatibilityScore, insight }}
          quizTitle="Compatibility Analysis"
          fullAnalysis={getFullAnalysis()}
          price={quizData.price}
        />
      )}
    </>
  )
}

export default ShortResult
