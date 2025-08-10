"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, Eye, Star } from "lucide-react"
import PaymentModal from "../../PaymentModal"

interface ShortResultProps {
  userData: any
  score: number
  onShowFullResult: () => void
}

const ShortResult: React.FC<ShortResultProps> = ({ userData, score, onShowFullResult }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const getScoreCategory = (score: number) => {
    if (score >= 80) return { category: "Ultra-Intuitive", color: "text-purple-400", emoji: "🔮" }
    if (score >= 65) return { category: "Strong Intuition", color: "text-blue-400", emoji: "✨" }
    if (score >= 45) return { category: "Developing Intuition", color: "text-yellow-400", emoji: "🌟" }
    return { category: "Logic-First Thinker", color: "text-green-400", emoji: "🧠" }
  }

  const { category, color, emoji } = getScoreCategory(score)

  const handleUnlockFull = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    onShowFullResult()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="backdrop-blur-md bg-slate-900/65 rounded-3xl p-8 shadow-2xl border border-slate-700/50 text-center max-w-lg w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6"
        >
          <div className="text-6xl mb-4">{emoji}</div>
          <Sparkles className="text-yellow-400 w-8 h-8 mx-auto mb-4" />
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
          className="mb-6"
        >
          <div className="relative">
            <div className="text-6xl font-bold text-white mb-2">{score}</div>
            <div className="text-lg text-slate-300">out of 100</div>
            <motion.div
              className="absolute -inset-4 rounded-full border-2 border-yellow-400/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className={`text-2xl font-bold ${color} mb-3`}>{category}</h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            ✨ Your intuition score is <span className="text-yellow-400 font-bold">{category.toLowerCase()}</span> — but
            there's so much more you need to know about your mystical abilities...
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-6">
            <Eye className="w-4 h-4" />
            <span>Your personalized cosmic profile awaits</span>
            <Star className="w-4 h-4" />
          </div>

          <motion.button
            onClick={handleUnlockFull}
            className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>🚀 Unlock Full Intuition Profile - $1.99</span>
              <Sparkles className="w-5 h-5" />
            </div>
          </motion.button>

          <p className="text-slate-400 text-xs mt-4">
            Discover your astrological connections, spirit guide, and personalized intuition enhancement practices
          </p>
        </motion.div>
      </motion.div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        quizSlug="intuition-score-quiz"
        userData={userData}
        results={{ score, category }}
        quizTitle="Intuition Score Quiz"
        fullAnalysis={`Your complete intuitive profile reveals a ${category} with a score of ${score}/100. This comprehensive analysis includes your astrological connections, spirit guide, and personalized practices to enhance your mystical abilities.`}
        price={1.99}
      />
    </div>
  )
}

export default ShortResult
