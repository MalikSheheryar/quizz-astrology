"use client"

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './theme-provider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-gradient-to-r from-[#8E44AD] to-[#E67E22] text-white shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: theme === 'dark' ? 180 : 0 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
    >
      <motion.div
        initial={false}
        animate={{ 
          scale: theme === 'dark' ? 0 : 1,
          opacity: theme === 'dark' ? 0 : 1 
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="w-5 h-5" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ 
          scale: theme === 'dark' ? 1 : 0,
          opacity: theme === 'dark' ? 1 : 0 
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="w-5 h-5" />
      </motion.div>
      <div className="w-5 h-5 opacity-0">
        <Sun className="w-5 h-5" />
      </div>
    </motion.button>
  )
}
