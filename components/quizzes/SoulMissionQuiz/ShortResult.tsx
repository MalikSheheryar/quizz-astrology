'use client'

import type React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './components'
import PaymentModal from '../../PaymentModal'
import {
  calculateLifePath,
  getArchetype,
  getSunSign,
} from './utils/calculations'
import { Star, Heart, Zap, Target, Crown, Compass } from 'lucide-react'

interface ShortResultProps {
  userData: any
  quizAnswers: any
  onShowFullResult: () => void
}

const ShortResult: React.FC<ShortResultProps> = ({
  userData,
  quizAnswers,
  onShowFullResult,
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const lifePath = calculateLifePath(userData.birthDate)
  const sunSign = getSunSign(userData.birthDate)
  const archetype = getArchetype(lifePath, quizAnswers)

  // Create results object for PaymentModal
  const results = {
    lifePath,
    sunSign,
    archetype,
    quizAnswers,
  }

  const archetypeIcons = {
    'The Visionary': Star,
    'The Healer': Heart,
    'The Creator': Zap,
    'The Guide': Compass,
    'The Warrior': Crown,
    'The Teacher': Target,
  }

  const ArchetypeIcon =
    archetypeIcons[archetype.name as keyof typeof archetypeIcons] || Star

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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="bg-[#1F2A38] rounded-2xl p-12 shadow-2xl border border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#FFD700] to-[#915EFF] rounded-full flex items-center justify-center">
              <ArchetypeIcon className="w-12 h-12 text-white" />
            </div>

            <h2 className="text-4xl font-bold text-white mb-4 font-heading">
              Your Soul's Mission Revealed
            </h2>

            <div className="text-2xl text-[#FFD700] font-semibold mb-6 font-heading">
              {archetype.name}
            </div>

            <p className="text-xl text-white/80 leading-relaxed font-body">
              {archetype.shortDescription}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button onClick={handleUnlockFull} className="text-lg px-8 py-4">
              Unlock Your Complete Life Mission Blueprint - $1.99
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
          quizSlug="soul-mission-quiz"
          userData={userData}
          results={results}
          quizTitle="Soul Mission Quiz - Full Report"
          fullAnalysis="Get your complete life mission blueprint with detailed insights, career guidance, and spiritual path."
          price={1.99}
        />
      )}
    </>
  )
}

export default ShortResult
