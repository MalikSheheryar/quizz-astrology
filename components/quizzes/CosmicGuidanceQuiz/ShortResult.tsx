"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, Star, Heart, Eye, Zap, Moon, Sun } from "lucide-react"
import PaymentModal from "../../PaymentModal"

const ShortResult = ({ userData, answers, result, onShowFullResult }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const quizSlug = "cosmic-guidance-quiz"
  const quizTitle = "Cosmic Guidance Quiz"

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getEnergyIcon = (category) => {
    const icons = {
      Release: Moon,
      Awaken: Sun,
      Receive: Heart,
      Transform: Zap,
      Trust: Star,
      Act: Eye,
      Love: Heart,
      Protect: Sparkles,
    }
    return icons[category] || Sparkles
  }

  const IconComponent = getEnergyIcon(result.category)

  const results = {
    category: result.category,
    teaserMessage: result.teaserMessage,
    dominantEnergy: result.dominantEnergy,
    fullAnalysis: result.mainMessage,
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    onShowFullResult()
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      {/* Teaser Message */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
        <div className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/10 mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full flex items-center justify-center"
          >
            <IconComponent className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            The Universe is whispering:
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xl md:text-2xl text-yellow-300 font-medium mb-8 italic"
          >
            "{result.teaserMessage}"
          </motion.p>

          <div className="text-center mb-6">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
              <span className="text-white font-bold text-lg">{result.category}</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-6 border border-purple-500/30 mb-6">
            <div className="flex items-center mb-4">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              <h4 className="text-lg font-semibold text-white">Your Complete Divine Message Awaits</h4>
            </div>
            <p className="text-white/80 mb-4">
              This sacred preview reveals your spiritual path, but your full cosmic guidance contains:
            </p>
            <ul className="text-white/70 text-sm space-y-2 mb-6">
              <li>• Your complete sacred message from the universe</li>
              <li>• Why this message is coming to you now</li>
              <li>• Your next spiritual steps and divine guidance</li>
              <li>• Signs and synchronicities to watch for</li>
              <li>• Your personal sacred affirmation</li>
              <li>• Oracle card reading for your journey</li>
            </ul>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPaymentModal(true)}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              ✨ Reveal My Full Divine Message - $1.99
            </motion.button>
          </div>
        </div>
      </motion.div>

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
    </motion.div>
  )
}

export default ShortResult
