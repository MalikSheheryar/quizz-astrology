"use client"

import { motion } from "framer-motion"

const CardReveal = ({ card, onRevealShort }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="text-center max-w-2xl mx-auto"
    >
      {/* Card Display */}
      <motion.div
        initial={{ rotateY: 180, scale: 0.5 }}
        animate={{ rotateY: 0, scale: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="mb-8"
      >
        <div className="relative inline-block">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 30px rgba(255, 212, 0, 0.5)",
                "0 0 60px rgba(147, 51, 234, 0.5)",
                "0 0 30px rgba(255, 212, 0, 0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            className="bg-slate-800 rounded-2xl border-4 border-yellow-400 p-8 shadow-2xl"
          >
            <div className="w-48 h-72 mx-auto flex flex-col items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-8xl mb-4"
              >
                {card.symbol}
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-white text-xl font-bold text-center"
              >
                {card.name}
              </motion.h3>
            </div>
          </motion.div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Card Information */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10 mb-8"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Your Destiny Card Has Spoken
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-white/80 text-lg leading-relaxed mb-6"
        >
          <p className="mb-4">
            <span className="text-yellow-400 font-semibold">The {card.name}</span> has chosen you for a reason.
          </p>
          <p className="italic">"{card.shortMeaning}"</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-4 border border-purple-500/30"
        >
          <p className="text-white/70 text-sm">✨ This is just the beginning of your cosmic revelation ✨</p>
        </motion.div>
      </motion.div>

      {/* Reveal Button */}
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2 }}>
        <motion.button
          onClick={onRevealShort}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <motion.span
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            🔮 Reveal Your Tarot Prediction 🔮
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Mystical Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="mt-8 flex justify-center items-center space-x-4 text-white/40"
      >
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-yellow-400"></div>
        <span className="text-yellow-400">⭐</span>
        <div className="w-16 h-px bg-gradient-to-r from-yellow-400 to-transparent"></div>
      </motion.div>
    </motion.div>
  )
}

export default CardReveal
