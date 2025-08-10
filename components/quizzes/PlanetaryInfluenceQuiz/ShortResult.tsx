'use client'
import type React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ChevronDown } from 'lucide-react'
import { planetDescriptions } from './quizData'
import PaymentModal from '../../PaymentModal'

interface ShortResultProps {
  userData: any
  results: any
  onShowFullResult: () => void
}

const ShortResult: React.FC<ShortResultProps> = ({
  userData,
  results,
  onShowFullResult,
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const dominantPlanet = Object.keys(results.planetScores).reduce((a, b) =>
    results.planetScores[a] > results.planetScores[b] ? a : b
  )
  const planetInfo = planetDescriptions[dominantPlanet]

  const handleUnlockFull = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    onShowFullResult()
  }

  return (
    <div className="min-h-screen p-4">
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-[#1F2A38] rounded-3xl p-8 shadow-2xl border border-[#915EFF]/30 max-w-2xl w-full text-center"
        >
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div
              className={`text-8xl mb-4 bg-gradient-to-r ${planetInfo.color} bg-clip-text text-transparent`}
            >
              {planetInfo.icon}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {userData.fullName}, Your Results Are In!
            </h1>
            <div className="flex items-center justify-center text-[#915EFF] mb-4">
              <Sparkles className="w-5 h-5 mr-2" />
              <span className="text-lg font-medium">
                Cosmic Analysis Complete
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <div
              className={`bg-gradient-to-r ${planetInfo.color} p-6 rounded-2xl mb-6`}
            >
              <h2 className="text-2xl font-bold text-white mb-3">
                {planetInfo.title}
              </h2>
              <p className="text-white/90 text-lg leading-relaxed">
                {planetInfo.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {planetInfo.traits.map((trait, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-[#2A3441] text-white py-3 px-4 rounded-xl border border-[#915EFF]/20"
                >
                  <span className="font-medium">{trait}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <motion.button
              onClick={handleUnlockFull}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center w-full bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
            >
              <span className="mr-2">🚀 Unlock Full Results - $1.99</span>
              <ChevronDown className="w-5 h-5" />
            </motion.button>
            <p className="text-white/60 text-sm">
              Discover your complete planetary profile below
            </p>
          </motion.div>
        </motion.div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        quizSlug="planetary-influence-quiz"
        userData={userData}
        results={results}
        quizTitle="Planetary Influence Quiz"
        fullAnalysis={planetInfo.fullAnalysis}
        price={1.99}
      />
    </div>
  )
}

export default ShortResult
