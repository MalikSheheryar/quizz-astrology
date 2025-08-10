"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Sparkles, ChevronDown } from "lucide-react"
import PaymentModal from "../../PaymentModal"

interface ShortResultProps {
  userData: any
  risingSign: string
  onShowFullResult: () => void
}

const ShortResult: React.FC<ShortResultProps> = ({ userData, risingSign, onShowFullResult }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const risingSignData: Record<string, any> = {
    Aries: {
      title: "Aries Rising",
      subtitle: "Bold and Magnetic",
      description: "You radiate confidence and natural leadership energy.",
      color: "from-red-500 to-orange-500",
      icon: "♈",
    },
    Taurus: {
      title: "Taurus Rising",
      subtitle: "Grounded and Sensual",
      description: "You emanate stability and earthy charm.",
      color: "from-green-500 to-emerald-500",
      icon: "♉",
    },
    Gemini: {
      title: "Gemini Rising",
      subtitle: "Curious and Adaptable",
      description: "You sparkle with wit and intellectual energy.",
      color: "from-yellow-500 to-amber-500",
      icon: "♊",
    },
    Cancer: {
      title: "Cancer Rising",
      subtitle: "Nurturing and Intuitive",
      description: "You glow with emotional depth and caring energy.",
      color: "from-blue-400 to-cyan-500",
      icon: "♋",
    },
    Leo: {
      title: "Leo Rising",
      subtitle: "Radiant and Charismatic",
      description: "You shine with natural magnetism and warmth.",
      color: "from-yellow-400 to-orange-500",
      icon: "♌",
    },
    Virgo: {
      title: "Virgo Rising",
      subtitle: "Refined and Analytical",
      description: "You project precision and thoughtful elegance.",
      color: "from-green-400 to-teal-500",
      icon: "♍",
    },
    Libra: {
      title: "Libra Rising",
      subtitle: "Harmonious and Charming",
      description: "You embody grace and natural diplomacy.",
      color: "from-pink-400 to-rose-500",
      icon: "♎",
    },
    Scorpio: {
      title: "Scorpio Rising",
      subtitle: "Mysterious and Intense",
      description: "You radiate depth and transformative power.",
      color: "from-purple-600 to-indigo-600",
      icon: "♏",
    },
    Sagittarius: {
      title: "Sagittarius Rising",
      subtitle: "Adventurous and Optimistic",
      description: "You beam with wanderlust and philosophical wisdom.",
      color: "from-orange-500 to-red-500",
      icon: "♐",
    },
    Capricorn: {
      title: "Capricorn Rising",
      subtitle: "Ambitious and Dignified",
      description: "You project authority and timeless sophistication.",
      color: "from-gray-600 to-slate-700",
      icon: "♑",
    },
    Aquarius: {
      title: "Aquarius Rising",
      subtitle: "Innovative and Unique",
      description: "You radiate originality and humanitarian spirit.",
      color: "from-cyan-500 to-blue-600",
      icon: "♒",
    },
    Pisces: {
      title: "Pisces Rising",
      subtitle: "Dreamy and Compassionate",
      description: "You flow with intuitive wisdom and artistic sensitivity.",
      color: "from-purple-400 to-pink-500",
      icon: "♓",
    },
  }

  const result = risingSignData[risingSign] || risingSignData["Leo"]

  const handleUnlockFull = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    onShowFullResult()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Celebration Animation */}
        <motion.div className="mb-8" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
          <div className="relative">
            <motion.div
              className="absolute -top-4 -left-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </motion.div>
            <motion.div
              className="absolute -top-2 -right-6"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Star className="w-5 h-5 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">🎉 {userData.fullName}, Your Result Is Ready!</h1>
          </div>
        </motion.div>

        {/* Result Card */}
        <motion.div
          className="bg-[#1F2A38] rounded-3xl p-8 shadow-2xl border border-white/10 mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div
            className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${result.color} rounded-full mb-6 text-3xl`}
          >
            {result.icon}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">You are likely a {result.title}</h2>
          <p className={`text-xl font-semibold mb-4 bg-gradient-to-r ${result.color} bg-clip-text text-transparent`}>
            {result.subtitle}
          </p>
          <p className="text-white/80 text-lg leading-relaxed">{result.description}</p>
        </motion.div>

        {/* Unlock Button */}
        <motion.button
          onClick={handleUnlockFull}
          className="group bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center space-x-3">
            <Sparkles className="w-6 h-6" />
            <span>🚀 Unlock Full Rising Sign Report - $1.99</span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>
        </motion.button>

        {/* Teaser Text */}
        <motion.p
          className="text-white/60 text-sm mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Get your complete personality analysis, love insights, and cosmic guidance ✨
        </motion.p>
      </motion.div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        quizSlug="rising-sign-quiz"
        userData={userData}
        results={{ risingSign }}
        quizTitle="Rising Sign Quiz"
        fullAnalysis={`Complete analysis of your ${risingSign} rising sign including personality traits, love compatibility, and life guidance.`}
        price={1.99}
      />
    </div>
  )
}

export default ShortResult
