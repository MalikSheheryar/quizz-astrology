"use client"
import type React from "react"
import { motion } from "framer-motion"

interface CardProps {
  children: React.ReactNode
  className?: string
}

const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  return (
    <motion.div
      className={`bg-[#1F2A38]/90 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden ${className}`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {/* Subtle aura glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 via-transparent to-[#915EFF]/5 rounded-2xl" />

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/[0.02] rounded-2xl" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

export default Card
