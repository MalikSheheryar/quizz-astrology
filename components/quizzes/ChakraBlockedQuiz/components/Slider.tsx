"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface SliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  leftLabel?: string
  rightLabel?: string
  showValue?: boolean
  autoAdvance?: boolean
}

const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 1,
  max = 10,
  leftLabel,
  rightLabel,
  showValue = true,
  autoAdvance = false,
}) => {
  const [localValue, setLocalValue] = useState(value)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    if (autoAdvance && hasInteracted) {
      const timer = setTimeout(() => {
        onChange(localValue)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [localValue, hasInteracted, autoAdvance, onChange])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value)
    setLocalValue(newValue)
    setHasInteracted(true)
    if (!autoAdvance) {
      onChange(newValue)
    }
  }

  const percentage = ((localValue - min) / (max - min)) * 100

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={localValue}
          onChange={handleChange}
          className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #FF6B6B 0%, #FFA726 ${percentage}%, rgba(255,255,255,0.1) ${percentage}%, rgba(255,255,255,0.1) 100%)`,
          }}
        />

        {/* Custom thumb */}
        <motion.div
          className="absolute top-1/2 w-6 h-6 bg-white rounded-full shadow-lg transform -translate-y-1/2 pointer-events-none border-2 border-[#FFD700]"
          style={{
            left: `calc(${percentage}% - 12px)`,
          }}
          animate={{
            scale: hasInteracted ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-white/70 text-sm">{leftLabel}</span>
        {showValue && (
          <motion.span
            className="text-[#FFD700] font-semibold text-lg"
            animate={{ scale: hasInteracted ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.2 }}
          >
            {localValue}
          </motion.span>
        )}
        <span className="text-white/70 text-sm">{rightLabel}</span>
      </div>

      {autoAdvance && hasInteracted && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="inline-flex items-center space-x-2 text-[#6EC1E4] text-sm">
            <div className="w-4 h-4 border-2 border-[#6EC1E4] border-t-transparent rounded-full animate-spin" />
            <span>Moving to next question...</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Slider
