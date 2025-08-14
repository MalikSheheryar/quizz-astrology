"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, Heart, Eye, Zap } from "lucide-react"
import PaymentModal from "../../PaymentModal"

const ShortResult = ({ results, coupleData, onShowFullResult }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const handleUnlockFull = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    onShowFullResult()
  }

  const getResultIcon = (type) => {
    switch (type) {
      case "pastLife":
        return <Heart className="w-8 h-8" />
      case "soulContract":
        return <Zap className="w-8 h-8" />
      case "karmicMirror":
        return <Eye className="w-8 h-8" />
      case "twinFlame":
        return <Sparkles className="w-8 h-8" />
      case "spiritualTeacher":
        return <Sparkles className="w-8 h-8" />
      default:
        return <Heart className="w-8 h-8" />
    }
  }

  const getResultTitle = (type) => {
    switch (type) {
      case "pastLife":
        return "Past Life Lovers"
      case "soulContract":
        return "Soul Contract Companions"
      case "karmicMirror":
        return "Karmic Mirror Connection"
      case "twinFlame":
        return "Twin Flame Energy"
      case "spiritualTeacher":
        return "Spiritual Teacher Bond"
      default:
        return "Sacred Connection"
    }
  }

  const getTeaserMessage = (type) => {
    switch (type) {
      case "pastLife":
        return "Your souls have danced together across lifetimes, finding each other again in this sacred moment of eternity."
      case "soulContract":
        return "You entered this life with a divine agreement to support each other's highest growth and evolution."
      case "karmicMirror":
        return "You reflect each other's deepest lessons, healing ancient wounds through the power of love."
      case "twinFlame":
        return "Two halves of the same soul, reunited to create something greater than the sum of your parts."
      case "spiritualTeacher":
        return "One of you serves as a catalyst for the other's spiritual awakening and transformation."
      default:
        return "Your connection transcends the ordinary, touching the realm of the divine."
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto text-center"
    >
      {/* Mystical Animation */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full mb-8 relative"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-white"
        >
          {getResultIcon(results.primary)}
        </motion.div>

        {/* Floating orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.25,
              ease: "easeInOut",
            }}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full"
            style={{
              top: `${20 + Math.sin((i * Math.PI) / 4) * 40}px`,
              left: `${20 + Math.cos((i * Math.PI) / 4) * 40}px`,
            }}
          />
        ))}
      </motion.div>

      {/* Result Card */}
      <div className="bg-slate-800 bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-yellow-300/20 mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white mb-6"
        >
          Your Sacred Connection Revealed
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-6"
        >
          <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-purple-400 bg-clip-text text-transparent mb-4">
            {getResultTitle(results.primary)}
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed">{getTeaserMessage(results.primary)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-xl text-white font-semibold mb-2">Connection Intensity</p>
          <div className="flex items-center justify-center space-x-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
                className={`w-4 h-4 rounded-full ${
                  i < Math.ceil(results.intensity / 20) ? "bg-gradient-to-r from-pink-500 to-orange-400" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Unlock Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUnlockFull}
          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 mx-auto"
        >
          <Sparkles className="w-6 h-6" />
          <span>🔓 Unlock Your Full Soul Contract Reading</span>
          <Sparkles className="w-6 h-6" />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="text-gray-300 mt-4 italic"
        >
          "Our souls remember what our minds are only beginning to understand."
        </motion.p>
      </motion.div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        quizSlug="soul-contract-quiz"
        userData={coupleData}
        results={results}
        quizTitle="Soul Contract Quiz"
        fullAnalysis={getTeaserMessage(results.primary)}
        price={1.99}
      />
    </motion.div>
  )
}

export default ShortResult
