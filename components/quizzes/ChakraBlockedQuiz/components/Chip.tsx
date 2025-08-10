"use client"
import type React from "react"
import { motion } from "framer-motion"

interface ChipProps {
  label: string
  selected: boolean
  onClick: () => void
  className?: string
}

const Chip: React.FC<ChipProps> = ({ label, selected, onClick, className = "" }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 border-2 ${
        selected
          ? "bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] text-white border-[#FFD700] shadow-lg shadow-[#FF6B6B]/25"
          : "bg-white/5 text-white/80 border-white/20 hover:bg-white/10 hover:border-white/40 hover:text-white"
      } ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Selection indicator */}
      <div className="flex items-center justify-center space-x-2">
        {selected && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-4 h-4 flex items-center justify-center"
          >
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>
        )}
        <span>{label}</span>
      </div>

      {/* Subtle shimmer effect */}
      <div
        className={`absolute inset-0 rounded-lg transition-opacity duration-500 ${
          selected
            ? "bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-100 animate-pulse"
            : "opacity-0"
        }`}
      />
    </motion.button>
  )
}

export default Chip
