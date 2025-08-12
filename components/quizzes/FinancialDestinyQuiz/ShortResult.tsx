'use client'

import type React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import PaymentModal from '../../PaymentModal'
import {
  calculateLifePath,
  calculateExpression,
  determineArchetype,
  getArchetypeDetails,
} from './utils'
import { Star, Sparkles, Crown } from 'lucide-react'

interface ShortResultProps {
  userData: any
  answers: any[]
  onShowFullResult: () => void
}

const ShortResult: React.FC<ShortResultProps> = ({
  userData,
  answers,
  onShowFullResult,
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const lifePath = calculateLifePath(userData.dateOfBirth)
  const expression = calculateExpression(userData.fullName)
  const archetype = determineArchetype(answers, lifePath, expression)
  const archetypeDetails = getArchetypeDetails(archetype)

  // Create results object for PaymentModal
  const results = {
    lifePath,
    expression,
    archetype,
    archetypeDetails,
    answers,
  }

  const handleUnlockFull = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    onShowFullResult()
  }

  return (
    <>
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700 mb-8">
          <motion.div
            className="mb-6"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="text-white" size={36} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              {userData.fullName}, Your Financial Destiny Awaits!
            </h2>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-xl p-6 mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-center mb-4">
              <span className="text-6xl mr-4">{archetypeDetails.emoji}</span>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  You are {archetypeDetails.name}
                </h3>
                <p className="text-white/80 text-lg">
                  {archetypeDetails.shortDescription}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6 mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Star className="text-yellow-400 mr-2" size={20} />
                <span className="text-white font-medium">Life Path Number</span>
              </div>
              <span className="text-3xl font-bold text-yellow-400">
                {lifePath}
              </span>
            </div>
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Sparkles className="text-emerald-400 mr-2" size={20} />
                <span className="text-white font-medium">
                  Expression Number
                </span>
              </div>
              <span className="text-3xl font-bold text-emerald-400">
                {expression}
              </span>
            </div>
          </motion.div>

          <motion.p
            className="text-white/80 text-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Your cosmic blueprint reveals powerful insights about your natural
            money magnetism, hidden abundance blocks, and the exact pathway to
            activate your wealth potential.
          </motion.p>

          <motion.button
            onClick={handleUnlockFull}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            🔓 Unlock Your Full Financial Destiny Blueprint - $1.99
          </motion.button>
        </div>
      </motion.div>

      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
          quizSlug="financial-destiny-quiz"
          userData={userData}
          results={results}
          quizTitle="Financial Destiny Quiz - Full Report"
          fullAnalysis="Get your complete financial destiny blueprint with detailed insights, money blocks analysis, and wealth activation strategies."
          price={1.99}
        />
      )}
    </>
  )
}

export default ShortResult
