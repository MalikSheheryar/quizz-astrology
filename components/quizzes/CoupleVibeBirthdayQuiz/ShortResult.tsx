"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Star, Sparkles } from "lucide-react"
import PaymentModal from "../../PaymentModal"

const ShortResult = ({ coupleData, results, onShowFullResult }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const handleUnlockFull = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    onShowFullResult()
  }

  const archetypeIcons = {
    "power-duo": "⚡",
    "soulmate-healers": "🌟",
    "passion-pair": "🔥",
    "magnetic-opposites": "🧲",
    dreamers: "🌙",
    "balanced-builders": "⚖️",
    "cosmic-mirrors": "🪞",
  }

  const archetypeColors = {
    "power-duo": "from-[#FF6B6B] to-[#FFA726]",
    "soulmate-healers": "from-[#915EFF] to-[#6EC1E4]",
    "passion-pair": "from-[#FF6B6B] to-[#FF1744]",
    "magnetic-opposites": "from-[#6EC1E4] to-[#915EFF]",
    dreamers: "from-[#915EFF] to-[#FFD700]",
    "balanced-builders": "from-[#6EC1E4] to-[#2F9E44]",
    "cosmic-mirrors": "from-[#FFD700] to-[#915EFF]",
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      <motion.div
        className="bg-[#1F2A38] rounded-3xl p-12 shadow-2xl border border-white/10 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-6 right-6 text-[#FFD700] opacity-60"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Sparkles size={24} />
          </motion.div>
          <motion.div
            className="absolute bottom-6 left-6 text-[#6EC1E4] opacity-60"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Star size={20} />
          </motion.div>
        </div>

        {/* Main Content */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-8">
            <motion.div
              className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r ${archetypeColors[results.archetype]} rounded-full mb-6 text-5xl`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              {archetypeIcons[results.archetype]}
            </motion.div>

            <motion.h3
              className="text-3xl font-heading font-bold text-white mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Your Cosmic Connection Revealed!
            </motion.h3>

            <motion.div
              className="text-xl font-body text-[#FFD700] mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {coupleData.yourName} and {coupleData.partnerName} share the
            </motion.div>

            <motion.h2
              className={`text-4xl md:text-5xl font-heading font-bold bg-gradient-to-r ${archetypeColors[results.archetype]} bg-clip-text text-transparent mb-6`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, type: "spring", stiffness: 150 }}
            >
              {results.name}
            </motion.h2>

            <motion.p
              className="text-lg font-body text-white/80 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              {results.shortDescription}
            </motion.p>
          </div>

          {/* Compatibility Score */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <div className="text-white/70 font-body mb-2">Compatibility Score</div>
            <div className="flex items-center justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.7 + i * 0.1 }}
                >
                  <Heart
                    className={`${i < results.compatibilityScore ? "text-[#FF6B6B] fill-current" : "text-white/30"}`}
                    size={24}
                  />
                </motion.div>
              ))}
            </div>
            <div className="text-[#FFD700] font-heading font-bold text-xl mt-2">
              {results.compatibilityScore}/5 Hearts
            </div>
          </motion.div>

          {/* Key Highlights */}
          <motion.div
            className="grid md:grid-cols-2 gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
          >
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="text-[#6EC1E4] font-heading font-semibold mb-1">Your Element</div>
              <div className="text-white font-body">{results.yourElement}</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="text-[#915EFF] font-heading font-semibold mb-1">Partner's Element</div>
              <div className="text-white font-body">{results.partnerElement}</div>
            </div>
          </motion.div>

          {/* Unlock Button */}
          <motion.button
            onClick={handleUnlockFull}
            className="w-full py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] text-white font-heading font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center justify-center">
              🔓 Unlock Your Full Couple Vibe Report
              <Sparkles className="ml-2" size={20} />
            </span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        quizSlug="couple-vibe-birthday-quiz"
        userData={coupleData}
        results={results}
        quizTitle="Couple Vibe Birthday Quiz"
        fullAnalysis={results.energyDynamic}
        price={1.99}
      />
    </div>
  )
}

export default ShortResult
