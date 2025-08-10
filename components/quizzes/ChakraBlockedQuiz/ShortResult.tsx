"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "./components"
import { rankChakras, getChakraInfo, getPersonalizedInsights } from "./utils/chakraLogic"
import { fadeInUp } from "./utils/motion"
import PaymentModal from "../../PaymentModal"

interface ShortResultProps {
  userData: any
  chakraScores: any
  quizData: any
  onShowFullResult: () => void
}

const ShortResult: React.FC<ShortResultProps> = ({ userData, chakraScores, quizData, onShowFullResult }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const { primary, secondary } = rankChakras(chakraScores)
  const primaryChakra = getChakraInfo(primary.name)
  const insights = getPersonalizedInsights(primary.name, quizData, userData)

  const ChakraColumn = () => (
    <div className="flex flex-col items-center space-y-2 mb-8">
      {["crown", "thirdEye", "throat", "heart", "solarPlexus", "sacral", "root"].map((chakra, index) => {
        const isBlocked = chakra === primary.name
        const isSecondary = chakra === secondary.name
        const chakraInfo = getChakraInfo(chakra)

        return (
          <motion.div
            key={chakra}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-500 ${
              isBlocked
                ? `${chakraInfo.bgColor} border-white shadow-lg shadow-${chakraInfo.color}/50`
                : isSecondary
                  ? `${chakraInfo.bgColor} border-white/50 opacity-70`
                  : "bg-white/10 border-white/30"
            }`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
          />
        )
      })}
    </div>
  )

  const handleUnlockFull = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    onShowFullResult()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-2xl mx-auto text-center">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <ChakraColumn />

          <div className="mb-8">
            <div className={`inline-block p-4 rounded-full ${primaryChakra.bgColor} mb-4`}>
              <span className="text-4xl">{primaryChakra.symbol}</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">🔮 Your most blocked chakra right now appears to be</h2>
            <div className={`text-4xl font-bold mb-2 ${primaryChakra.textColor}`}>
              {primaryChakra.name} ({primaryChakra.sanskrit})
            </div>
            <p className="text-xl text-white/80 mb-6">{insights.quickInsight}</p>
          </div>

          <motion.button
            onClick={handleUnlockFull}
            className="w-full py-4 px-6 bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] text-white font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-[#FF6B6B]/25 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🌟 Unlock Full Chakra Alignment Plan - $1.99
          </motion.button>
        </motion.div>
      </Card>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        quizSlug="chakra-blocked-quiz"
        userData={userData}
        results={{ primaryChakra: primary.name, chakraScores }}
        quizTitle="Chakra Blocked Quiz"
        fullAnalysis={`Your complete chakra alignment report reveals that your ${primaryChakra.name} chakra is most blocked. This comprehensive analysis includes personalized healing practices, supportive elements, and daily rituals to restore your energy balance.`}
        price={1.99}
      />
    </div>
  )
}

export default ShortResult
