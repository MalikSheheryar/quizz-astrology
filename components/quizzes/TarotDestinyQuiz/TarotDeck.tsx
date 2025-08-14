"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { tarotCards } from "./tarotData"

const TarotDeck = ({ onCardSelect }) => {
  const [shuffledCards, setShuffledCards] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)

  useEffect(() => {
    // Shuffle and select 12 cards
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5).slice(0, 12)
    setShuffledCards(shuffled)
  }, [])

  const handleCardClick = (card, index) => {
    if (selectedIndex !== null) return

    setSelectedIndex(index)
    setTimeout(() => {
      onCardSelect(card)
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center"
    >
      <div className="mb-8">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold text-white mb-4">
          Choose Your Destiny Card
        </motion.h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Trust your intuition and select the card that calls to your soul
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
        {shuffledCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateY: selectedIndex === index ? 0 : 180,
            }}
            transition={{
              delay: index * 0.1,
              duration: 0.6,
              type: "spring",
            }}
            whileHover={{
              scale: selectedIndex === null ? 1.05 : 1,
              y: selectedIndex === null ? -10 : 0,
            }}
            onClick={() => handleCardClick(card, index)}
            className={`relative cursor-pointer group ${
              selectedIndex !== null && selectedIndex !== index ? "opacity-30" : ""
            }`}
          >
            <div className="relative">
              {/* Card Back */}
              <div
                className={`absolute inset-0 bg-slate-800 rounded-lg border-2 border-yellow-400/30 shadow-lg transition-all duration-300 ${
                  selectedIndex === index ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="w-full h-32 md:h-40 flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-lg">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="text-yellow-400 text-2xl md:text-3xl"
                  >
                    ✨
                  </motion.div>
                </div>
              </div>

              {/* Card Front */}
              <div
                className={`bg-slate-800 rounded-lg border-2 border-yellow-400 shadow-lg transition-all duration-300 ${
                  selectedIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="w-full h-32 md:h-40 p-2 flex flex-col items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg">
                  <div className="text-3xl md:text-4xl mb-2">{card.symbol}</div>
                  <div className="text-white text-xs md:text-sm font-semibold text-center">{card.name}</div>
                </div>
              </div>

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(255, 212, 0, 0.3)",
                    "0 0 40px rgba(147, 51, 234, 0.3)",
                    "0 0 20px rgba(255, 212, 0, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-8 text-white/60 text-sm"
      >
        <p>✨ Each card holds a unique message from the universe ✨</p>
      </motion.div>
    </motion.div>
  )
}

export default TarotDeck
