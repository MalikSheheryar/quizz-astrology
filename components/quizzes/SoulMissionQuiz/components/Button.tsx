"use client"

import type React from "react"
import { motion } from "framer-motion"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: "primary" | "secondary" | "ghost"
  className?: string
  type?: "button" | "submit"
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) => {
  const baseClasses =
    "px-6 py-3 rounded-lg font-semibold transition-all duration-300 font-body focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1F2A38]"

  const variants = {
    primary:
      "bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] text-white hover:from-[#FF5252] hover:to-[#FF9800] focus:ring-[#FF6B6B] shadow-lg hover:shadow-xl",
    secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/20 focus:ring-white/50",
    ghost: "text-white hover:bg-white/10 focus:ring-white/50",
  }

  const disabledClasses = "opacity-50 cursor-not-allowed hover:from-[#FF6B6B] hover:to-[#FFA726]"

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${disabled ? disabledClasses : ""}
        ${className}
      `}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button
