"use client"
import { motion } from "framer-motion"
import { Heart, Sparkles, Eye, Zap, Star } from "lucide-react"

const FloatingElements = () => {
  const elements = [
    { icon: Heart, delay: 0, duration: 8, x: "10%", y: "20%" },
    { icon: Sparkles, delay: 1, duration: 10, x: "80%", y: "15%" },
    { icon: Eye, delay: 2, duration: 12, x: "15%", y: "70%" },
    { icon: Zap, delay: 3, duration: 9, x: "85%", y: "75%" },
    { icon: Star, delay: 4, duration: 11, x: "50%", y: "10%" },
    { icon: Heart, delay: 5, duration: 13, x: "20%", y: "50%" },
    { icon: Sparkles, delay: 6, duration: 7, x: "75%", y: "45%" },
    { icon: Star, delay: 7, duration: 14, x: "40%", y: "80%" },
  ]

  const orbs = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: i * 0.5,
    duration: 15 + (i % 5),
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 8,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating Icons */}
      {elements.map((element, index) => {
        const IconComponent = element.icon
        return (
          <motion.div
            key={`icon-${index}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0.3, 0.8, 0],
              scale: [0, 1, 0.8, 1.2, 0],
              y: [0, -20, 0, -30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute"
            style={{
              left: element.x,
              top: element.y,
            }}
          >
            <IconComponent className="w-6 h-6 text-yellow-300/40" />
          </motion.div>
        )
      })}

      {/* Floating Orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={`orb-${orb.id}`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.8, 0.4, 0.9, 0],
            x: [0, 50, -30, 40, 0],
            y: [0, -40, 20, -60, 0],
            scale: [0.5, 1, 0.7, 1.2, 0.5],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-gradient-to-r from-pink-400/30 to-purple-400/30 blur-sm"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
          }}
        />
      ))}

      {/* Cosmic Threads */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="thread-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {[...Array(6)].map((_, i) => (
          <motion.path
            key={`thread-${i}`}
            d={`M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100}`}
            stroke="url(#thread-gradient)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0.5, 1, 0],
              opacity: [0, 0.6, 0.3, 0.8, 0],
            }}
            transition={{
              duration: 20 + i * 2,
              delay: i * 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Chakra Energy Circles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`chakra-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.4, 0.2, 0.6, 0],
            scale: [0, 2, 1, 3, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 25 + i * 3,
            delay: i * 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute rounded-full border border-yellow-300/20"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + i * 15}%`,
            width: "100px",
            height: "100px",
          }}
        />
      ))}

      {/* Particle Field */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, -100],
            x: [0, Math.random() * 50 - 25],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          }}
          className="absolute w-1 h-1 bg-yellow-300/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: "100%",
          }}
        />
      ))}
    </div>
  )
}

export default FloatingElements
