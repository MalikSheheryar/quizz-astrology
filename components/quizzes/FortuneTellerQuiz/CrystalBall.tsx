"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CrystalBall({ onReveal, questionNumber }) {
  const [isRevealing, setIsRevealing] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealing(true)
      setTimeout(() => {
        onReveal()
      }, 2000)
    }, 3000)

    return () => clearTimeout(timer)
  }, [onReveal])

  return (
    <div className="relative">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="relative"
      >
        {/* Crystal Ball */}
        <motion.div
          className="w-64 h-64 mx-auto relative"
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {/* Ball Base */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 via-white/20 to-purple-400/30 rounded-full shadow-2xl backdrop-blur-sm border border-white/20" />

          {/* Inner Glow */}
          <motion.div
            className="absolute inset-4 bg-gradient-to-br from-purple-300/40 via-pink-200/30 to-blue-300/40 rounded-full"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Mystical Swirls */}
          <motion.div
            className="absolute inset-8 rounded-full overflow-hidden"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-45" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/30 to-transparent transform -rotate-45" />
          </motion.div>

          {/* Revealing Effect */}
          {isRevealing && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white text-6xl"
              >
                {questionNumber === 1 ? "💕" : questionNumber === 2 ? "⭐" : "🔮"}
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Base Stand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-32 h-8 mx-auto bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-full shadow-lg transform -translate-y-4"
        />
      </motion.div>

      {/* Floating Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-center mt-8"
      >
        <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
          {isRevealing ? "The Vision Appears..." : "Gazing into the Crystal Ball..."}
        </h2>
        <p className="text-purple-200">
          {isRevealing ? "Your destiny is being revealed" : "The mystical energies are gathering"}
        </p>
      </motion.div>
    </div>
  )
}
