"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Star } from "lucide-react"

const CardDraw = ({ onCardSelect, quizAnswers }) => {
  const [isShuffling, setIsShuffling] = useState(true)
  const [selectedCardIndex, setSelectedCardIndex] = useState(null)
  const [showCards, setShowCards] = useState(false)

  const tarotCards = [
    {
      name: "The Magician",
      image: "/placeholder.svg?height=500&width=300&text=The+Magician",
      meaning: "manifestation",
      element: "fire",
      keywords: ["power", "skill", "concentration", "action"],
    },
    {
      name: "The Empress",
      image: "/placeholder.svg?height=500&width=300&text=The+Empress",
      meaning: "creativity",
      element: "earth",
      keywords: ["fertility", "femininity", "beauty", "nature"],
    },
    {
      name: "The Star",
      image: "/placeholder.svg?height=500&width=300&text=The+Star",
      meaning: "hope",
      element: "air",
      keywords: ["guidance", "inspiration", "spirituality", "serenity"],
    },
    {
      name: "The Moon",
      image: "/placeholder.svg?height=500&width=300&text=The+Moon",
      meaning: "intuition",
      element: "water",
      keywords: ["illusion", "fear", "anxiety", "subconscious"],
    },
    {
      name: "The Hermit",
      image: "/placeholder.svg?height=500&width=300&text=The+Hermit",
      meaning: "introspection",
      element: "earth",
      keywords: ["soul searching", "seeking truth", "inner guidance"],
    },
    {
      name: "The Tower",
      image: "/placeholder.svg?height=500&width=300&text=The+Tower",
      meaning: "transformation",
      element: "fire",
      keywords: ["sudden change", "upheaval", "chaos", "revelation"],
    },
    {
      name: "The Sun",
      image: "/placeholder.svg?height=500&width=300&text=The+Sun",
      meaning: "joy",
      element: "fire",
      keywords: ["happiness", "success", "vitality", "enlightenment"],
    },
    {
      name: "The Lovers",
      image: "/placeholder.svg?height=500&width=300&text=The+Lovers",
      meaning: "relationships",
      element: "air",
      keywords: ["love", "harmony", "relationships", "values"],
    },
    {
      name: "The World",
      image: "/placeholder.svg?height=500&width=300&text=The+World",
      meaning: "completion",
      element: "earth",
      keywords: ["accomplishment", "integration", "travel", "fulfillment"],
    },
    {
      name: "The High Priestess",
      image: "/placeholder.svg?height=500&width=300&text=The+High+Priestess",
      meaning: "wisdom",
      element: "water",
      keywords: ["intuition", "sacred knowledge", "divine feminine"],
    },
    {
      name: "Judgment",
      image: "/placeholder.svg?height=500&width=300&text=Judgment",
      meaning: "rebirth",
      element: "fire",
      keywords: ["judgement", "rebirth", "inner calling", "absolution"],
    },
    {
      name: "Strength",
      image: "/placeholder.svg?height=500&width=300&text=Strength",
      meaning: "courage",
      element: "fire",
      keywords: ["strength", "courage", "patience", "control"],
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShuffling(false)
      setShowCards(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleCardSelect = (cardIndex) => {
    setSelectedCardIndex(cardIndex)

    setTimeout(() => {
      onCardSelect(tarotCards[cardIndex])
    }, 1500)
  }

  if (isShuffling) {
    return (
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-purple-500/20"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-32 h-32 mx-auto mb-8"
          >
            <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          <h3 className="text-3xl font-bold text-white mb-4">The Universe is Shuffling Your Cards</h3>
          <p className="text-purple-200 text-lg">Aligning cosmic energies with your spiritual essence...</p>

          <div className="flex justify-center space-x-2 mt-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                className="w-3 h-3 bg-yellow-400 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Card for This Month</h3>
        <p className="text-purple-200 text-lg">Trust your intuition. One card holds your cosmic message.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <AnimatePresence>
          {showCards &&
            tarotCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: 180 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCardSelect(index)}
                className="cursor-pointer group"
              >
                <div className="relative">
                  {/* Card Back */}
                  <motion.div
                    className="w-full h-48 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl border-2 border-purple-500/30 group-hover:border-yellow-400/50 transition-all duration-300 flex items-center justify-center relative overflow-hidden"
                    animate={selectedCardIndex === index ? { rotateY: 180, scale: 1.2 } : {}}
                    transition={{ duration: 0.8 }}
                  >
                    {/* Mystical Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500" />
                    </div>

                    {/* Center Symbol */}
                    <div className="relative z-10">
                      <Star className="w-12 h-12 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
                    </div>

                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  </motion.div>

                  {/* Selection Glow */}
                  {selectedCardIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1.1 }}
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur-lg -z-10"
                    />
                  )}
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {selectedCardIndex !== null && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-12">
          <div className="text-2xl text-yellow-400 font-bold">Your card is being revealed...</div>
        </motion.div>
      )}
    </div>
  )
}

export default CardDraw
