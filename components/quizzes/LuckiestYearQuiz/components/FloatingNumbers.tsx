"use client"
import { motion } from "framer-motion"

export const FloatingNumbers = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const generateRandomPosition = () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
  })

  const generateRandomDelay = () => Math.random() * 5
  const generateRandomDuration = () => 8 + Math.random() * 4

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {numbers.map((number, index) => {
        const position = generateRandomPosition()
        const delay = generateRandomDelay()
        const duration = generateRandomDuration()

        return (
          <motion.div
            key={`${number}-${index}`}
            className="absolute text-6xl md:text-8xl font-bold text-yellow-400/10 select-none"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotate: -180,
            }}
            animate={{
              opacity: [0, 0.3, 0.1, 0.3, 0],
              scale: [0.5, 1.2, 0.8, 1.1, 0.5],
              rotate: [0, 180, 360, 540, 720],
              y: [-20, -40, -20, -50, -20],
              x: [-10, 10, -5, 15, -10],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {number}
          </motion.div>
        )
      })}

      {/* Constellation Effects */}
      {Array.from({ length: 12 }).map((_, index) => {
        const position = generateRandomPosition()
        const delay = generateRandomDelay()

        return (
          <motion.div
            key={`star-${index}`}
            className="absolute w-2 h-2 bg-yellow-400/20 rounded-full"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.5, 1, 0],
              scale: [0, 1.5, 1, 1.2, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              delay: delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        )
      })}

      {/* Mystical Orbs */}
      {Array.from({ length: 6 }).map((_, index) => {
        const position = generateRandomPosition()
        const delay = generateRandomDelay()

        return (
          <motion.div
            key={`orb-${index}`}
            className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-sm"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0.3, 0.6, 0],
              scale: [0, 2, 1.5, 2.2, 0],
              x: [0, 30, -20, 40, 0],
              y: [0, -30, 20, -40, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              delay: delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        )
      })}
    </div>
  )
}
