"use client"
import { motion } from "framer-motion"
import { Heart, Star, Moon, Sun } from "lucide-react"

const FloatingElements = () => {
  const floatingAnimation = {
    y: [-10, 10, -10],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div className="absolute top-20 left-10 text-[#FFD700] opacity-60" animate={floatingAnimation}>
        <Star size={24} />
      </motion.div>
      <motion.div
        className="absolute top-40 right-20 text-[#915EFF] opacity-60"
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
      >
        <Moon size={32} />
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-20 text-[#6EC1E4] opacity-60"
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
      >
        <Sun size={28} />
      </motion.div>
      <motion.div
        className="absolute top-60 left-1/2 text-[#FFD700] opacity-40"
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 0.5 } }}
      >
        <Heart size={20} />
      </motion.div>
    </div>
  )
}

export default FloatingElements
