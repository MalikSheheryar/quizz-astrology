"use client"

import { motion } from "framer-motion"

const CosmicBackground = () => {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 3 + 2,
  }))

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 4,
    duration: Math.random() * 4 + 3,
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-orange-500" />

      {/* Animated Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full opacity-70"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Light Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-yellow-400 to-pink-400 opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Constellation Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="constellation" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#44FFD1" />
          </linearGradient>
        </defs>

        {/* Constellation Pattern */}
        <motion.path
          d="M100,100 L200,150 L300,120 L400,180 L500,140"
          stroke="url(#constellation)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />

        <motion.path
          d="M600,200 L700,250 L800,220 L900,280 L1000,240"
          stroke="url(#constellation)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
        />

        <motion.path
          d="M150,400 L250,450 L350,420 L450,480 L550,440"
          stroke="url(#constellation)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 3, delay: 2, ease: "easeInOut" }}
        />
      </svg>

      {/* Mystical Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-10 blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-10 blur-xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  )
}

export default CosmicBackground
