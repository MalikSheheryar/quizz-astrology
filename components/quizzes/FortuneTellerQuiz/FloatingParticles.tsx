"use client"
import { motion } from "framer-motion"

export function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-purple-300/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 20 + 10}px`,
          }}
          animate={{
            rotate: [0, 360],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: Math.random() * 10 + 8,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 3,
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  )
}
