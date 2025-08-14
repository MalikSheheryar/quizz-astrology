"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, Star, Heart } from "lucide-react"
import PaymentModal from "../../PaymentModal"

const ShortResult = ({ userData, selectedCard, onShowFullResult }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const quizSlug = "tarot-destiny-quiz"
  const quizTitle = "Pick a Tarot Card to Reveal Your Future"

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getShortReading = () => {
    const readings = {
      "The Fool":
        "You stand at the threshold of a magnificent new beginning. The universe is aligning to present you with opportunities that will reshape your destiny.",
      "The Magician":
        "You possess incredible power to manifest your desires into reality. Your skills and talents are perfectly aligned to create the life you envision.",
      "The High Priestess":
        "Your intuitive abilities are heightened. Hidden knowledge and spiritual insights are available to you if you trust your inner wisdom.",
      "The Empress":
        "You're entering a period of abundant creativity and nurturing energy. Embrace your feminine power and natural abundance.",
      "The Lovers":
        "Important choices about love and relationships are before you. Your heart is opening to deeper levels of intimacy and understanding.",
      "The Chariot":
        "You're in a powerful position to achieve your goals through determination and focused action. Victory is within reach.",
      Strength:
        "You possess incredible inner strength and the ability to overcome any challenge through patience and compassion.",
      "The Hermit":
        "You're being called to look within for answers and guidance. This is a time for introspection and spiritual seeking.",
      "The Wheel of Fortune":
        "You're at a turning point where destiny and opportunity converge. The wheel of fortune is spinning in your favor.",
      "The Tower":
        "Sudden changes are shaking the foundations of your life, but this destruction is necessary for your growth.",
      "The Star":
        "Hope, healing, and divine guidance are flowing into your life. You're entering a phase of renewal and spiritual connection.",
      "The World":
        "You're approaching the completion of a major life cycle and the achievement of important goals. Success is within your grasp.",
    }
    return readings[selectedCard.name] || readings["The Fool"]
  }

  const results = {
    cardName: selectedCard.name,
    shortReading: getShortReading(),
    element: selectedCard.element,
    keywords: selectedCard.keywords,
    fullAnalysis: getShortReading(),
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    onShowFullResult()
  }

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/90 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-yellow-400/30 mb-8"
      >
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Your Tarot Reading Preview</h2>
          <div className="flex items-center justify-center space-x-4 text-white/70">
            <span>{userData.fullName}</span>
            <span>•</span>
            <span>{formatDate(userData.dateOfBirth)}</span>
          </div>
        </div>

        {/* Selected Card Display */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 40px rgba(255, 212, 0, 0.6)",
                "0 0 80px rgba(147, 51, 234, 0.6)",
                "0 0 40px rgba(255, 212, 0, 0.6)",
              ],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            className="bg-slate-700 rounded-xl border-4 border-yellow-400 p-6 shadow-2xl"
          >
            <div className="w-32 h-48 flex flex-col items-center justify-center">
              <div className="text-6xl mb-3">{selectedCard.symbol}</div>
              <h3 className="text-white text-lg font-bold text-center">{selectedCard.name}</h3>
            </div>
          </motion.div>

          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">Your Destiny Card</h3>
            <p className="text-white/80 text-lg italic mb-4">"{selectedCard.shortMeaning}"</p>
            <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30">
              <p className="text-white/70 text-sm mb-2">Element: {selectedCard.element}</p>
              <p className="text-white/70 text-sm">Keywords: {selectedCard.keywords.join(", ")}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Short Reading */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800/80 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-white/10 mb-8"
      >
        <div className="flex items-center mb-6">
          <Heart className="w-6 h-6 text-red-400 mr-3" />
          <h3 className="text-2xl font-bold text-white">Your Cosmic Message</h3>
        </div>
        <p className="text-white/90 text-lg leading-relaxed mb-6">{getShortReading()}</p>

        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-6 border border-purple-500/30">
          <div className="flex items-center mb-4">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            <h4 className="text-lg font-semibold text-white">Want Your Complete Reading?</h4>
          </div>
          <p className="text-white/80 mb-4">
            This is just a glimpse of what the cards reveal about your destiny. Unlock your full personalized tarot
            reading with:
          </p>
          <ul className="text-white/70 text-sm space-y-2 mb-6">
            <li>• Detailed analysis of your current life chapter</li>
            <li>• Your near future (next 3-6 months) predictions</li>
            <li>• Opportunities and challenges to watch for</li>
            <li>• Psychic wisdom for your spiritual journey</li>
            <li>• Personalized guidance based on your question</li>
          </ul>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPaymentModal(true)}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            🔮 Get My Full Tarot Reading - $1.99
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
    </motion.div>
  )
}

export default ShortResult
