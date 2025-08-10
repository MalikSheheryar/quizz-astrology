"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Sparkles, ChevronDown } from "lucide-react"
import PaymentModal from "../../PaymentModal"

interface ResultPageProps {
  userData: any
  results: any
  onShowFullResult: () => void
}

const ResultPage: React.FC<ResultPageProps> = ({ userData, results, onShowFullResult }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const { avoidSign } = results

  const compatibilityData = {
    Aries: { color: "red", compatibility: "low", traits: ["impulsive", "aggressive", "impatient"] },
    Taurus: { color: "green", compatibility: "medium", traits: ["stubborn", "possessive", "slow"] },
    Gemini: { color: "yellow", compatibility: "low", traits: ["inconsistent", "superficial", "restless"] },
    Cancer: { color: "blue", compatibility: "high", traits: ["moody", "clingy", "oversensitive"] },
    Leo: { color: "orange", compatibility: "medium", traits: ["egotistical", "dramatic", "demanding"] },
    Virgo: { color: "brown", compatibility: "high", traits: ["critical", "perfectionist", "anxious"] },
    Libra: { color: "pink", compatibility: "medium", traits: ["indecisive", "superficial", "people-pleasing"] },
    Scorpio: { color: "purple", compatibility: "low", traits: ["jealous", "secretive", "vindictive"] },
    Sagittarius: {
      color: "turquoise",
      compatibility: "medium",
      traits: ["commitment-phobic", "tactless", "restless"],
    },
    Capricorn: { color: "gray", compatibility: "high", traits: ["cold", "workaholic", "pessimistic"] },
    Aquarius: { color: "cyan", compatibility: "low", traits: ["detached", "unpredictable", "aloof"] },
    Pisces: { color: "sea-green", compatibility: "high", traits: ["escapist", "overly emotional", "unrealistic"] },
  }

  const avoidData = compatibilityData[avoidSign as keyof typeof compatibilityData] || compatibilityData.Gemini

  const handleUnlockFull = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    onShowFullResult()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Your Cosmic Compatibility Report</h1>
        <p className="text-xl text-white/80">Hello {userData.fullName}, here's your personalized astrology insight</p>
      </motion.div>

      {/* Main Result Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-800 p-8 rounded-3xl shadow-2xl mb-8 border border-purple-500/20"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-6">
            <AlertTriangle className="w-16 h-16 text-red-500 mr-4" />
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Avoid Dating:</h2>
              <p className="text-5xl font-bold text-red-400">{avoidSign}</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 p-6 rounded-2xl border border-red-500/30 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Why This Mismatch Occurs</h3>
            <p className="text-lg text-white/90 leading-relaxed">
              Based on your quiz responses, your personality and relationship preferences fundamentally clash with{" "}
              {avoidSign}'s {avoidData.traits.join(", ")} tendencies. This combination often leads to misunderstandings,
              emotional friction, and incompatible life goals.
            </p>
          </div>

          {/* Unlock Button */}
          <motion.button
            onClick={handleUnlockFull}
            className="group bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center space-x-3">
              <Sparkles className="w-6 h-6" />
              <span>🚀 Unlock Full Compatibility Analysis - $1.99</span>
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </div>
          </motion.button>

          <p className="text-white/60 text-sm mt-4">
            Get detailed compatibility breakdown, relationship advice, and cosmic guidance ✨
          </p>
        </div>
      </motion.div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        quizSlug="zodiac-compatibility-quiz"
        userData={userData}
        results={results}
        quizTitle="Zodiac Compatibility Quiz"
        fullAnalysis={`Complete analysis of why you should avoid ${avoidSign} in relationships, including detailed compatibility breakdown and relationship guidance.`}
        price={1.99}
      />
    </div>
  )
}

export default ResultPage
