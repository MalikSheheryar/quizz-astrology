"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import PaymentModal from "../../PaymentModal"

const ShortResult = ({ userData, selectedCard, quizAnswers, onViewFull, quizSlug, quizTitle }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    onViewFull()
  }

  const results = {
    selectedCard,
    quizAnswers,
    fullAnalysis: {
      cardName: selectedCard?.name,
      monthlyMeaning: selectedCard?.meaning,
      personalizedInsights: `Your ${selectedCard?.name} card reveals important guidance for this month.`,
    },
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Revealed Card */}
          <motion.div
            initial={{ rotateY: 180 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative mx-auto w-64 h-96 mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl blur-lg opacity-50" />
            <div className="relative w-full h-full bg-slate-800 rounded-3xl border-4 border-yellow-400 overflow-hidden">
              <img
                src={selectedCard?.image || "/placeholder.svg"}
                alt={selectedCard?.name}
                className="w-full h-3/4 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold text-white">{selectedCard?.name}</h3>
              </div>
            </div>
          </motion.div>

          {/* Teaser Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-500/20 mb-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Your Card for This Month is {selectedCard?.name}</h2>
            <p className="text-purple-200 text-lg leading-relaxed">
              The {selectedCard?.name} has chosen you for a reason. This powerful card brings messages of{" "}
              {selectedCard?.meaning} and transformation for your journey ahead.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPaymentModal(true)}
            className="px-12 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <span className="relative z-10 flex items-center">
              <Sparkles className="w-6 h-6 mr-2" />
              Unlock Your Full Monthly Tarot Reading
              <Sparkles className="w-6 h-6 ml-2" />
            </span>
          </motion.button>
        </motion.div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        quizSlug={quizSlug}
        userData={userData}
        results={results}
        quizTitle={quizTitle}
        fullAnalysis={results.fullAnalysis}
        price={1.99}
      />
    </>
  )
}

export default ShortResult
