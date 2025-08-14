'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles, CreditCard } from 'lucide-react'
import PaymentModal from '../../PaymentModal'

const ShortResult = ({
  coupleData,
  results,
  onShowFull,
  quizSlug = 'couple-vibe-birthday-quiz',
  quizTitle = 'Couple Vibe Birthday Quiz',
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const getCompatibilityLevel = (score) => {
    if (score >= 85)
      return {
        level: 'Cosmic Soulmates',
        color: 'text-yellow-300',
        emoji: '✨',
      }
    if (score >= 70)
      return { level: 'Celestial Match', color: 'text-pink-300', emoji: '💫' }
    if (score >= 55)
      return { level: 'Growing Union', color: 'text-blue-300', emoji: '🌙' }
    return { level: 'Learning Journey', color: 'text-purple-300', emoji: '🔮' }
  }

  const compatibility = getCompatibilityLevel(results.compatibilityScore)

  const handlePaymentClick = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    onShowFull()
  }

  return (
    <>
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="bg-slate-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/10 text-center"
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            className="text-8xl mb-6"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {compatibility.emoji}
          </motion.div>

          <h2 className="text-4xl font-bold text-white mb-4">
            {coupleData.userName} & {coupleData.partnerName}
          </h2>

          <div className="text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
            {results.compatibilityScore}%
          </div>

          <div className={`text-2xl font-semibold mb-6 ${compatibility.color}`}>
            {compatibility.level}
          </div>

          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Your cosmic connection shows incredible potential! The stars have
            aligned beautifully for your union.
          </p>

          {/* Teaser Content */}
          <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
            <div className="p-4 bg-pink-500/10 border border-pink-500/20 rounded-lg">
              <h3 className="font-semibold text-pink-300 mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Emotional Bond
              </h3>
              <p className="text-sm text-white/80">
                You create a safe emotional space where both hearts can
                flourish...
              </p>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h3 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Communication
              </h3>
              <p className="text-sm text-white/80">
                Your different perspectives create rich, meaningful
                conversations...
              </p>
            </div>
          </div>

          <div className="text-center p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg mb-8">
            <p className="text-white/90 font-medium">
              💫 Want your complete compatibility analysis with detailed
              insights?
            </p>
          </div>

          <motion.button
            onClick={handlePaymentClick}
            className="bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold py-4 px-8 rounded-xl hover:from-pink-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CreditCard className="w-5 h-5" />
            Get Full Report - $1.99
          </motion.button>

          <p className="text-sm text-white/60 mt-3">
            Includes detailed analysis + relationship guidance
          </p>
        </motion.div>
      </motion.div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        quizSlug={quizSlug}
        userData={coupleData}
        results={results}
        quizTitle={quizTitle}
        fullAnalysis={results.energyDynamic || results.fullAnalysis || results}
        price={1.99}
      />
    </>
  )
}

export default ShortResult
