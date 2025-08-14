'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Eye,
  Heart,
  Zap,
  Shield,
  Star,
  Moon,
  Sun,
} from 'lucide-react'

const defaultRunes = [
  {
    id: 1,
    icon: Eye,
    symbol: '👁️',
    name: 'Sight',
    meaning: 'You walk the path of the Seeker, seeing beyond veils...',
  },
  {
    id: 2,
    icon: Heart,
    symbol: '❤️',
    name: 'Love',
    meaning: 'Your heart holds ancient wisdom of connection...',
  },
  {
    id: 3,
    icon: Zap,
    symbol: '⚡',
    name: 'Power',
    meaning: 'Lightning courses through your destiny...',
  },
  {
    id: 4,
    icon: Shield,
    symbol: '🛡️',
    name: 'Protection',
    meaning: 'You are a guardian of sacred knowledge...',
  },
  {
    id: 5,
    icon: Star,
    symbol: '⭐',
    name: 'Guidance',
    meaning: 'The stars whisper your true purpose...',
  },
  {
    id: 6,
    icon: Moon,
    symbol: '🌙',
    name: 'Mystery',
    meaning: 'Lunar secrets flow through your being...',
  },
  {
    id: 7,
    icon: Sun,
    symbol: '☀️',
    name: 'Illumination',
    meaning: 'Solar fire burns within your soul...',
  },
  {
    id: 8,
    icon: Sparkles,
    symbol: '✨',
    name: 'Magic',
    meaning: 'Ancient magic awakens in your presence...',
  },
]

const RuneSelector = ({ onRuneSelect, selectedRunes, eclipseProgress }) => {
  const [hoveredRune, setHoveredRune] = useState(null)
  const [showInsight, setShowInsight] = useState(null)
  const [runeOpacity, setRuneOpacity] = useState(0)

  useEffect(() => {
    if (eclipseProgress > 30) {
      setRuneOpacity(1)
    }
  }, [eclipseProgress])

  const handleRuneClick = (runeId) => {
    if (
      selectedRunes.length < 4 &&
      !selectedRunes.find((r) => r.id === runeId)
    ) {
      onRuneSelect(runeId)
      setShowInsight(defaultRunes.find((r) => r.id === runeId))
      setTimeout(() => setShowInsight(null), 3000)
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pointer-events-auto">
        {defaultRunes.map((rune, index) => (
          <motion.button
            key={rune.id}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{
              opacity: runeOpacity,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              delay: index * 0.2,
              duration: 0.8,
              type: 'spring',
              stiffness: 100,
            }}
            whileHover={{
              scale: 1.1,
              rotate: 10,
              boxShadow: '0 15px 35px rgba(99, 102, 241, 0.4)',
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleRuneClick(rune.id)}
            className="bg-gradient-to-br from-indigo-600/30 to-purple-600/30 backdrop-blur-sm border border-indigo-400/40 rounded-2xl p-6 text-white hover:border-indigo-400/70 transition-all duration-300 group"
          >
            <motion.div
              animate={{
                y: [0, -5, 0],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 3 + index * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }}
              className="text-center"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {rune.symbol}
              </div>
              <div className="font-bold text-lg mb-1">{rune.name}</div>
              <div className="text-sm text-indigo-200 opacity-80">
                {rune.meaning}
              </div>
            </motion.div>
          </motion.button>
        ))}
      </div>

      {/* Insight Display */}
      {showInsight && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="bg-gradient-to-b from-purple-900 to-indigo-900 p-6 rounded-xl border border-yellow-400 max-w-md mx-4 text-center shadow-2xl">
            <div className="inline-block mb-4">
              {/* Fixed: Extract the icon component to a variable */}
              {(() => {
                const IconComponent = showInsight.icon
                return <IconComponent size={32} className="text-yellow-300" />
              })()}
            </div>
            <p className="text-yellow-300 text-lg font-serif leading-relaxed">
              {showInsight.meaning}
            </p>
          </div>
        </div>
      )}

      {/* Selection Progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: selectedRunes.length > 0 ? 1 : 0 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      >
        <p className="text-yellow-300 text-lg font-serif mb-2">
          Runes Selected: {selectedRunes.length}/4
        </p>
        <div className="flex space-x-2 justify-center">
          {selectedRunes.map((rune) => {
            const IconComponent = rune.icon
            return (
              <motion.div
                key={rune.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black"
              >
                <IconComponent size={16} />
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

export default RuneSelector
