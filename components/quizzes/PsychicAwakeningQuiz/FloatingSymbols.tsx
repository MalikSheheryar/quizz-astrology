"use client"
import { motion } from "framer-motion"
import { Eye, Star, Sparkles, Moon, Sun } from "lucide-react"

const FloatingSymbols = () => {
  const symbols = [
    { Icon: Eye, delay: 0, duration: 8, x: "10%", y: "20%" },
    { Icon: Star, delay: 1, duration: 10, x: "80%", y: "15%" },
    { Icon: Sparkles, delay: 2, duration: 6, x: "15%", y: "70%" },
    { Icon: Moon, delay: 3, duration: 12, x: "85%", y: "60%" },
    { Icon: Sun, delay: 4, duration: 9, x: "50%", y: "10%" },
    { Icon: Eye, delay: 5, duration: 7, x: "20%", y: "80%" },
    { Icon: Sparkles, delay: 6, duration: 11, x: "70%", y: "30%" },
  ]

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 360],
      scale: [0.8, 1.2, 0.8],
      opacity: [0.3, 0.8, 0.3],
    },
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {symbols.map((symbol, index) => {
        const { Icon, delay, duration, x, y } = symbol
        return (
          <motion.div
            key={index}
            className="absolute text-white/20"
            style={{ left: x, top: y }}
            variants={floatingVariants}
            animate="animate"
            transition={{
              duration,
              delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Icon className="w-8 h-8 md:w-12 md:h-12" />
          </motion.div>
        )
      })}

      {/* Floating orbs */}
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={`orb-${index}`}
          className="absolute w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [0.5, 1.5, 0.5],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            delay: index * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Mystical particles */}
      {[...Array(8)].map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-1 h-1 bg-yellow-300 rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: index * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default FloatingSymbols
