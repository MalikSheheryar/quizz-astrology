"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Heart, Star, Sparkles } from "lucide-react"

const FloatingParticles: React.FC = () => {
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = []
      const icons = [Heart, Star, Sparkles]
      const colors = ["text-pink-400", "text-purple-400", "text-orange-400", "text-yellow-400"]

      for (let i = 0; i < 15; i++) {
        const IconComponent = icons[Math.floor(Math.random() * icons.length)]
        const color = colors[Math.floor(Math.random() * colors.length)]

        newParticles.push({
          id: i,
          Icon: IconComponent,
          color,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 10,
          duration: Math.random() * 10 + 10,
          delay: Math.random() * 5,
        })
      }

      setParticles(newParticles)
    }

    generateParticles()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => {
        const { Icon, id, color, x, y, size, duration, delay } = particle

        return (
          <motion.div
            key={id}
            className={`absolute ${color} opacity-20`}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: `${size}px`,
              height: `${size}px`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, -15, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration,
              delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Icon className="w-full h-full" />
          </motion.div>
        )
      })}

      {/* Constellation Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <linearGradient id="constellation" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>

        {/* Constellation pattern */}
        <motion.path
          d="M100,200 L300,150 L500,250 L700,180 L900,220"
          stroke="url(#constellation)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />

        <motion.path
          d="M150,400 L350,350 L550,450 L750,380 L950,420"
          stroke="url(#constellation)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 10, delay: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />

        <motion.path
          d="M50,600 L250,550 L450,650 L650,580 L850,620"
          stroke="url(#constellation)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 12, delay: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      </svg>

      {/* Floating Hearts */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-pink-300 opacity-20"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              delay: Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Heart className="w-4 h-4" />
          </motion.div>
        ))}
      </div>

      {/* Orbiting Symbols */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {[...Array(6)].map((_, i) => {
          const angle = i * 60 * (Math.PI / 180)
          const radius = 200 + Math.random() * 100

          return (
            <motion.div
              key={`orbit-${i}`}
              className="absolute text-purple-400 opacity-20"
              style={{
                width: "16px",
                height: "16px",
              }}
              animate={{
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                rotate: 360,
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default FloatingParticles
