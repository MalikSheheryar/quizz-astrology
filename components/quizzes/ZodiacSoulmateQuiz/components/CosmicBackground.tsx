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

  const floatingHearts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 2,
  }))

  const orbits = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    size: 200 + i * 150,
    duration: 20 + i * 10,
    opacity: 0.1 - i * 0.02,
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-orange-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />

      {/* Animated Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Hearts */}
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-300/30 text-2xl"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 360],
          }}
          transition={{
            duration: heart.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: heart.delay,
          }}
        >
          💖
        </motion.div>
      ))}

      {/* Orbital Rings */}
      {orbits.map((orbit) => (
        <motion.div
          key={orbit.id}
          className="absolute border border-purple-400/20 rounded-full"
          style={{
            width: `${orbit.size}px`,
            height: `${orbit.size}px`,
            left: "50%",
            top: "50%",
            marginLeft: `-${orbit.size / 2}px`,
            marginTop: `-${orbit.size / 2}px`,
            opacity: orbit.opacity,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: orbit.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}

      {/* Constellation Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="constellationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#915EFF" />
            <stop offset="100%" stopColor="#FF5F6D" />
          </linearGradient>
        </defs>

        {/* Constellation pattern */}
        <motion.path
          d="M100,100 L200,150 L300,120 L400,180 L500,140"
          stroke="url(#constellationGradient)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 3, delay: 1 }}
        />

        <motion.path
          d="M600,200 L700,250 L800,220 L900,280"
          stroke="url(#constellationGradient)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 3, delay: 2 }}
        />

        <motion.path
          d="M150,400 L250,450 L350,420 L450,480 L550,440"
          stroke="url(#constellationGradient)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 3, delay: 3 }}
        />
      </svg>

      {/* Stardust Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-300/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs */}
      <motion.div
        className="absolute w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
        style={{ left: "10%", top: "20%" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-24 h-24 bg-pink-500/10 rounded-full blur-xl"
        style={{ right: "15%", top: "60%" }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute w-20 h-20 bg-orange-500/10 rounded-full blur-xl"
        style={{ left: "70%", bottom: "20%" }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  )
}

export { CosmicBackground }
