"use client"
import { motion } from "framer-motion"

export function ParticleSystem({ phase }) {
  const getParticleCount = () => {
    switch (phase) {
      case "form":
        return 20
      case "quiz":
        return 35
      case "shortResult":
        return 25
      case "fullResult":
        return 40
      default:
        return 20
    }
  }

  const getParticleColor = () => {
    switch (phase) {
      case "form":
        return "bg-indigo-400/20"
      case "quiz":
        return "bg-purple-400/30"
      case "shortResult":
        return "bg-blue-400/25"
      case "fullResult":
        return "bg-pink-400/30"
      default:
        return "bg-indigo-400/20"
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(getParticleCount())].map((_, i) => (
        <motion.div
          key={`${phase}-${i}`}
          className={`absolute w-1 h-1 ${getParticleColor()} rounded-full`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
            scale: [0, Math.random() * 2 + 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 8,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Eclipse-specific particles */}
      {phase === "quiz" &&
        [...Array(10)].map((_, i) => (
          <motion.div
            key={`eclipse-${i}`}
            className="absolute text-orange-400/60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 15 + 10}px`,
            }}
            animate={{
              rotate: [0, 360],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: Math.random() * 12 + 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 4,
            }}
          >
            🌙
          </motion.div>
        ))}
    </div>
  )
}
