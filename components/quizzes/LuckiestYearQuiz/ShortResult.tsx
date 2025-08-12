'use client'
import type React from 'react'
import { motion } from 'framer-motion'
import { Star, Calendar, Sparkles, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import PaymentModal from '../../PaymentModal'

interface ShortResultProps {
  results: any
  onShowFullReport: () => void
}

const ShortResult: React.FC<ShortResultProps> = ({
  results,
  onShowFullReport,
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [hasUnlockedFull, setHasUnlockedFull] = useState(false)

  const { luckiestYear, userData } = results

  const getYearDescription = (personalYear: number) => {
    const descriptions: any = {
      1: 'New Beginnings & Fresh Starts',
      2: 'Partnership & Cooperation',
      3: 'Creativity & Self-Expression',
      4: 'Foundation Building & Stability',
      5: 'Freedom & Adventure',
      6: 'Love & Responsibility',
      7: 'Spiritual Growth & Introspection',
      8: 'Material Success & Achievement',
      9: 'Completion & Wisdom',
    }
    return descriptions[personalYear] || 'Transformation'
  }

  const getYearMessage = (year: number, personalYear: number) => {
    const messages: any = {
      1: `${year} brings the energy of new beginnings - a perfect time for launching dreams and manifesting your deepest desires.`,
      2: `${year} is your year of meaningful connections and partnerships that will elevate your path to success.`,
      3: `${year} awakens your creative powers and self-expression, bringing joy and artistic fulfillment.`,
      4: `${year} provides the foundation for lasting success through disciplined effort and practical achievements.`,
      5: `${year} opens doors to freedom, adventure, and exciting opportunities for personal expansion.`,
      6: `${year} brings love, family harmony, and the fulfillment of your heart's deepest longings.`,
      7: `${year} is a time of spiritual awakening and inner wisdom that will guide your future decisions.`,
      8: `${year} is your year of material success, recognition, and the achievement of your ambitious goals.`,
      9: `${year} brings completion of important cycles and the wisdom to step into your highest potential.`,
    }
    return (
      messages[personalYear] ||
      `${year} brings powerful transformation and alignment with your true purpose.`
    )
  }

  const getFullAnalysis = () => {
    return `Complete 6-Year Luck Timeline Analysis

Your personalized numerological forecast reveals the cosmic patterns that will shape your destiny from ${new Date().getFullYear()} to ${
      new Date().getFullYear() + 5
    }.

COMPREHENSIVE TIMELINE INCLUDES:
• Year-by-Year Detailed Predictions
• Monthly Lucky Periods & Challenges
• Optimal Timing for Major Decisions
• Love & Relationship Forecasts
• Career & Financial Opportunities
• Health & Wellness Guidance
• Lucky Numbers, Colors & Dates
• Spiritual Growth Milestones

Your luckiest year ${
      luckiestYear.year
    } is just the beginning - discover how to maximize every year's potential and navigate challenges with cosmic wisdom.

This detailed analysis provides specific dates, strategies, and insights to help you align with universal energies for maximum success and fulfillment.`
  }

  const handleUnlockFull = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    setHasUnlockedFull(true)
    onShowFullReport()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/10 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-full blur-xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-full blur-xl" />

        <div className="relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full">
                <Star size={32} className="text-white" />
              </div>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
              Your Celestial Prophecy Revealed
            </h2>
            <p className="text-white/80 text-lg">
              Hello {userData.fullName.split(' ')[0]}, the stars have spoken...
            </p>
          </motion.div>

          {/* Main Result */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl p-6 border border-yellow-400/30 mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Calendar className="text-yellow-400" size={28} />
                <span className="font-heading text-5xl md:text-6xl font-bold gradient-text">
                  {luckiestYear.year}
                </span>
                <Sparkles className="text-yellow-400" size={28} />
              </div>

              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
                Your Luckiest Year
              </h3>

              <div className="bg-slate-700/50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="text-yellow-400" size={20} />
                  <span className="text-yellow-400 font-semibold">
                    Personal Year {luckiestYear.personalYear}
                  </span>
                </div>
                <p className="text-white/90 font-medium">
                  {getYearDescription(luckiestYear.personalYear)}
                </p>
              </div>

              <p className="text-white/90 text-lg leading-relaxed">
                {getYearMessage(luckiestYear.year, luckiestYear.personalYear)}
              </p>
            </div>
          </motion.div>

          {/* Teaser Elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid md:grid-cols-3 gap-4 mb-8"
          >
            <div className="bg-slate-700/30 rounded-xl p-4 text-center">
              <div className="text-yellow-400 font-bold text-2xl mb-1">
                {results.personalYears.length}
              </div>
              <div className="text-white/80 text-sm">Years Analyzed</div>
            </div>
            <div className="bg-slate-700/30 rounded-xl p-4 text-center">
              <div className="text-yellow-400 font-bold text-2xl mb-1">
                {luckiestYear.score}
              </div>
              <div className="text-white/80 text-sm">Luck Score</div>
            </div>
            <div className="bg-slate-700/30 rounded-xl p-4 text-center">
              <div className="text-yellow-400 font-bold text-2xl mb-1">95%</div>
              <div className="text-white/80 text-sm">Accuracy Rate</div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center"
          >
            <p className="text-white/80 mb-6 text-lg">
              This is just the beginning of your cosmic journey...
            </p>

            <motion.button
              onClick={handleUnlockFull}
              className="px-8 py-4 text-lg font-semibold animate-pulse-slow bg-gradient-to-r from-red-400 to-orange-500 hover:from-red-500 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 rounded-xl transition-all duration-300 inline-flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="mr-2" size={20} />
              Unlock Your Full Luck Timeline ($1.99)
              <Sparkles className="ml-2" size={20} />
            </motion.button>

            <p className="text-white/60 text-sm mt-4">
              Discover your complete 6-year numerological forecast
            </p>
          </motion.div>
        </div>

        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
          quizSlug="luck-timeline"
          userData={userData}
          results={results}
          quizTitle="Luck Timeline Analysis"
          fullAnalysis={getFullAnalysis()}
          price={1.99}
        />
      </div>
    </motion.div>
  )
}

export default ShortResult
