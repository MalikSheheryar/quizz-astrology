"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const ParticleBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const particles = []
    const particleCount = 50

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.opacity = Math.random() * 0.5 + 0.2
        this.color = this.getRandomColor()
      }

      getRandomColor() {
        const colors = [
          "rgba(255, 215, 0, ", // Gold
          "rgba(145, 94, 255, ", // Purple
          "rgba(255, 107, 107, ", // Pink
          "rgba(255, 167, 38, ", // Orange
          "rgba(255, 255, 255, ", // White
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height

        // Pulsing effect
        this.opacity += Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.01
        this.opacity = Math.max(0.1, Math.min(0.7, this.opacity))
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color + this.opacity + ")"
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = this.color + "0.3)"
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <>
      {/* Canvas for particles */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />

      {/* Additional floating elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + i * 8}%`,
            }}
          />
        ))}

        {/* Floating stars */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-yellow-300 text-xs opacity-40"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + i * 7}%`,
            }}
          >
            ✨
          </motion.div>
        ))}

        {/* Mystical orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-400/20"
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -30, 20, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 1.2,
            }}
            style={{
              right: `${5 + i * 15}%`,
              top: `${15 + i * 12}%`,
            }}
          />
        ))}
      </div>
    </>
  )
}

export default ParticleBackground
