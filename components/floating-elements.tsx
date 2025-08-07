"use client"

import { motion } from 'framer-motion'
import { Star, Sparkles, Heart, Moon, Sun } from 'lucide-react'
import { memo } from 'react'

const floatingElements = [
  { Icon: Star, delay: 0, duration: 4, x: '10%', y: '20%' },
  { Icon: Sparkles, delay: 1, duration: 5, x: '80%', y: '10%' },
  { Icon: Heart, delay: 2, duration: 4.5, x: '15%', y: '70%' },
  { Icon: Moon, delay: 3, duration: 5.5, x: '85%', y: '60%' },
  { Icon: Sun, delay: 4, duration: 4, x: '50%', y: '80%' },
  { Icon: Star, delay: 5, duration: 4.5, x: '70%', y: '30%' },
  { Icon: Sparkles, delay: 6, duration: 5, x: '30%', y: '50%' },
]

export const FloatingElements = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {floatingElements.map((element, index) => {
        const { Icon, delay, duration, x, y } = element
        return (
          <motion.div
            key={index}
            className="absolute text-[#8E44AD]/20"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              y: [0, -15, 0],
              rotate: [0, 180, 0]
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
        )
      })}
    </div>
  )
})

FloatingElements.displayName = 'FloatingElements'
