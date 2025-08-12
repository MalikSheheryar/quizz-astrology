'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Star, Sparkles, ArrowDown } from 'lucide-react'
import PaymentModal from '../../PaymentModal'

interface ShortResultProps {
  userData: any
  soulmate: any
  onShowFullResult: () => void
}

const ShortResult = ({
  userData,
  soulmate,
  onShowFullResult,
}: ShortResultProps) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  if (!soulmate) return null

  const getElementColor = (element: string) => {
    const colors = {
      Fire: 'from-red-500 to-orange-500',
      Earth: 'from-green-500 to-emerald-500',
      Air: 'from-blue-500 to-cyan-500',
      Water: 'from-purple-500 to-indigo-500',
    }
    return (
      colors[element as keyof typeof colors] || 'from-purple-500 to-pink-500'
    )
  }

  const handleUnlockFull = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    onShowFullResult()
  }

  const getFullAnalysis = () => {
    return `Your complete Zodiac Soulmate compatibility analysis reveals the deep cosmic connection between you and ${soulmate.name}. This ${soulmate.element} element sign brings ${soulmate.description} The stars have aligned to show you this perfect match, and your compatibility extends far beyond what you see here. Your full reading includes detailed relationship insights, compatibility percentages, communication styles, and guidance for nurturing this divine connection.`
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-slate-800 bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-500/20 text-center"
      >
        {/* Cosmic Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <Star className="text-yellow-400 w-8 h-8 animate-pulse" />
            <Heart className="text-pink-400 w-10 h-10" />
            <Star className="text-yellow-400 w-8 h-8 animate-pulse" />
          </div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 bg-clip-text text-transparent mb-2">
            Your Cosmic Connection Revealed!
          </h1>

          <p className="text-white/80 text-lg">The stars have spoken... ✨</p>
        </motion.div>

        {/* Soulmate Reveal */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <div
            className={`w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br ${getElementColor(
              soulmate.element
            )} flex items-center justify-center shadow-2xl border-4 border-white/20`}
          >
            <span className="text-6xl text-white font-bold">
              {soulmate.symbol}
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-4xl font-bold text-white mb-4"
          >
            {soulmate.name}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-white/90 mb-2"
          >
            Your ideal soulmate is likely a{' '}
            <span className="font-bold text-purple-300">{soulmate.name}</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-lg text-white/80 italic"
          >
            {soulmate.description}
          </motion.p>
        </motion.div>

        {/* Element Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-8"
        >
          <div
            className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${getElementColor(
              soulmate.element
            )} text-white font-bold text-lg shadow-lg`}
          >
            {soulmate.element} Element
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="space-y-4"
        >
          <p className="text-white/90 text-lg mb-6">
            This is just the beginning of your cosmic journey...
          </p>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUnlockFull}
            className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white font-bold text-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Sparkles className="w-6 h-6" />
            Get Full Reading - $1.99
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </motion.button>

          <p className="text-white/60 text-sm mt-4">
            Discover your complete astrological compatibility analysis
          </p>
        </motion.div>
      </motion.div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        quizSlug="zodiac-soulmate-quiz"
        userData={userData}
        results={soulmate}
        quizTitle="Zodiac Soulmate Quiz"
        fullAnalysis={getFullAnalysis()}
        price={1.99}
      />
    </div>
  )
}

export default ShortResult
