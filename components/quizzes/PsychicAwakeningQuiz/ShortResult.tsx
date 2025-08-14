"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, Heart, Ear, Brain, Sparkles } from "lucide-react"
import PaymentModal from "../../PaymentModal"

const ShortResult = ({ userData, results, onViewFull, quizSlug, quizTitle }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const psychicTypes = {
    clairvoyant: {
      title: "Natural Clairvoyant",
      icon: Eye,
      description:
        "You possess the gift of clear seeing - visions, prophetic dreams, and visual intuition guide your path.",
      color: "from-purple-500 to-blue-500",
    },
    clairsentient: {
      title: "Empathic Intuitive",
      icon: Heart,
      description: "You feel the emotions and energies around you deeply - your heart is your compass to truth.",
      color: "from-pink-500 to-red-500",
    },
    clairaudient: {
      title: "Divine Messenger",
      icon: Ear,
      description:
        "You hear the whispers of the universe - inner voices, spirit guides, and divine messages reach you.",
      color: "from-blue-500 to-cyan-500",
    },
    claircognizant: {
      title: "Wise Knowing Soul",
      icon: Brain,
      description:
        "You simply know things without explanation - divine downloads and instant understanding flow to you.",
      color: "from-yellow-500 to-orange-500",
    },
  }

  const getResultLevel = (scores) => {
    const maxScore = Math.max(...Object.values(scores))
    const totalPossible = 40
    const percentage = (maxScore / totalPossible) * 100

    if (percentage >= 70) return "Highly Developed"
    if (percentage >= 50) return "Naturally Gifted"
    if (percentage >= 30) return "Emerging Abilities"
    return "Awakening Potential"
  }

  const currentType = psychicTypes[results.dominantType] || psychicTypes.clairvoyant
  const IconComponent = currentType.icon
  const resultLevel = getResultLevel(results.scores)

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    onViewFull()
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-500/30">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${currentType.color} rounded-full flex items-center justify-center`}
          >
            <IconComponent className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold text-white mb-4"
          >
            {userData.fullName}, You Are A...
          </motion.h2>

          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className={`text-4xl font-bold mb-4 bg-gradient-to-r ${currentType.color} bg-clip-text text-transparent`}
          >
            {currentType.title}
          </motion.h3>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-xl text-purple-200 mb-6"
          >
            {currentType.description}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-xl p-4 mb-8"
          >
            <p className="text-yellow-300 font-semibold">Psychic Development Level: {resultLevel}</p>
          </motion.div>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPaymentModal(true)}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Unlock Your Full Clairvoyant Profile
            <Sparkles className="w-5 h-5" />
          </motion.button>
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
    </>
  )
}

export default ShortResult
