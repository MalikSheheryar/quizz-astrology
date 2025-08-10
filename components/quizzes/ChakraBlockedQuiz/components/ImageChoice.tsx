"use client"
import type React from "react"
import { motion } from "framer-motion"

interface ImageChoiceProps {
  image: string
  label: string
  selected: boolean
  onClick: () => void
  className?: string
}

const ImageChoice: React.FC<ImageChoiceProps> = ({ image, label, selected, onClick, className = "" }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative p-6 bg-white/5 border-2 rounded-xl transition-all duration-300 hover:bg-white/10 group ${
        selected
          ? "border-[#FFD700] bg-[#FFD700]/10 shadow-lg shadow-[#FFD700]/25"
          : "border-white/20 hover:border-white/40"
      } ${className}`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Selection indicator */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-[#FFD700] rounded-full flex items-center justify-center"
        >
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      )}

      {/* Image/Emoji */}
      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{image}</div>

      {/* Label */}
      <div
        className={`text-sm font-medium transition-colors duration-300 ${
          selected ? "text-[#FFD700]" : "text-white/80 group-hover:text-white"
        }`}
      >
        {label}
      </div>

      {/* Subtle glow effect */}
      <div
        className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
          selected
            ? "bg-gradient-to-br from-[#FFD700]/10 to-[#915EFF]/10 opacity-100"
            : "bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100"
        }`}
      />
    </motion.button>
  )
}

export default ImageChoice
