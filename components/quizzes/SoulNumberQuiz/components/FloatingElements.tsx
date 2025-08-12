"use client"
import { motion } from "framer-motion"

export const FloatingElements = () => {
  const floatingNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22]
  const symbols = ["✨", "🔮", "🌙", "⭐", "💫", "🌟", "✦", "◆", "◇", "○"]

  const getRandomPosition = () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
  })

  const getRandomDelay = () => Math.random() * 5
  const getRandomDuration = () => 15 + Math.random() * 10

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating Numbers */}
      {floatingNumbers.map((number, index) => {
        const position = getRandomPosition()
        return (
          <motion.div
            key={`number-${number}`}
            className="absolute text-white/10 font-bold text-6xl font-heading"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 5, -5, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: getRandomDuration(),
              delay: getRandomDelay(),
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {number}
          </motion.div>
        )
      })}

      {/* Floating Symbols */}
      {symbols.map((symbol, index) => {
        const position = getRandomPosition()
        return (
          <motion.div
            key={`symbol-${index}`}
            className="absolute text-2xl"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))",
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-15, 15, -15],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: getRandomDuration(),
              delay: getRandomDelay(),
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {symbol}
          </motion.div>
        )
      })}

      {/* Geometric Shapes */}
      {[...Array(8)].map((_, index) => {
        const position = getRandomPosition()
        const shapes = ["◆", "◇", "○", "△", "▽", "◈", "◉", "⬟"]
        return (
          <motion.div
            key={`shape-${index}`}
            className="absolute text-white/5 text-4xl"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.5, 1.5, 0.5],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: getRandomDuration() * 2,
              delay: getRandomDelay(),
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {shapes[index % shapes.length]}
          </motion.div>
        )
      })}

      {/* Golden Particles */}
      {[...Array(15)].map((_, index) => {
        const position = getRandomPosition()
        return (
          <motion.div
            key={`particle-${index}`}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              boxShadow: "0 0 6px #FFD700",
            }}
            animate={{
              y: [-50, 50, -50],
              x: [-25, 25, -25],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: getRandomDuration(),
              delay: getRandomDelay(),
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        )
      })}

      {/* Mandala-like Patterns */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 opacity-5"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <div className="w-full h-full border-2 border-white rounded-full relative">
          <div className="absolute inset-4 border border-white rounded-full">
            <div className="absolute inset-4 border border-white rounded-full">
              <div className="absolute inset-2 bg-white rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-24 h-24 opacity-5"
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <div className="w-full h-full border-2 border-white transform rotate-45">
          <div className="absolute inset-2 border border-white">
            <div className="absolute inset-2 border border-white">
              <div className="absolute inset-1 bg-white opacity-20"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
