"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const MagicalSymbols = ({ onSymbolClick }) => {
  const [selectedSymbol, setSelectedSymbol] = useState(null)
  const [hoveredSymbol, setHoveredSymbol] = useState(null)

  const symbols = [
    {
      id: "moon",
      icon: "🌙",
      name: "Moon",
      color: "from-blue-400 to-indigo-500",
      glow: "shadow-blue-500/50",
      position: { x: -120, y: -80 },
      meaning: "Intuition and Mystery",
    },
    {
      id: "star",
      icon: "⭐",
      name: "Star",
      color: "from-yellow-400 to-amber-500",
      glow: "shadow-yellow-500/50",
      position: { x: 0, y: -120 },
      meaning: "Hope and Guidance",
    },
    {
      id: "crystal",
      icon: "💎",
      name: "Crystal",
      color: "from-purple-400 to-pink-500",
      glow: "shadow-purple-500/50",
      position: { x: 120, y: -80 },
      meaning: "Power and Transformation",
    },
    {
      id: "wand",
      icon: "🔮",
      name: "Wand",
      color: "from-green-400 to-emerald-500",
      glow: "shadow-green-500/50",
      position: { x: -120, y: 80 },
      meaning: "Magic and Wisdom",
    },
    {
      id: "sparkle",
      icon: "✨",
      name: "Sparkle",
      color: "from-pink-400 to-rose-500",
      glow: "shadow-pink-500/50",
      position: { x: 0, y: 80 },
      meaning: "Joy and Inspiration",
    },
    {
      id: "sun",
      icon: "🌟",
      name: "Sun",
      color: "from-orange-400 to-red-500",
      glow: "shadow-red-500/50",
      position: { x: 120, y: 80 },
      meaning: "Energy and Clarity",
    },
  ]

  const handleSymbolClick = (symbol) => {
    setSelectedSymbol(symbol.id)
    setTimeout(() => {
      onSymbolClick(symbol.id)
    }, 1000)
  }

  return (
    <div className="relative mt-12">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-xl font-mystical text-yellow-300 mb-2">Choose the symbol that calls to your soul</h3>
        <p className="text-purple-300 text-sm">Let your intuition guide you...</p>
      </motion.div>

      <div className="relative flex justify-center items-center h-64">
        {symbols.map((symbol, index) => {
          const IconComponent = symbol.icon
          const isSelected = selectedSymbol === symbol.id
          const isHovered = hoveredSymbol === symbol.id

          return (
            <motion.div
              key={symbol.id}
              className="absolute cursor-pointer"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${symbol.position.x}px), calc(-50% + ${symbol.position.y}px))`,
              }}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{
                opacity: 1,
                scale: isSelected ? 1.5 : isHovered ? 1.2 : 1,
                rotate: 0,
                y: isHovered ? -10 : 0,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.3,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ scale: 1.2, y: -10 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSymbolClick(symbol)}
              onHoverStart={() => setHoveredSymbol(symbol.id)}
              onHoverEnd={() => setHoveredSymbol(null)}
            >
              <motion.div
                className={`w-20 h-20 rounded-full bg-gradient-to-br ${symbol.color} flex items-center justify-center shadow-2xl ${symbol.glow} border-2 border-white/20`}
                animate={{
                  boxShadow: isSelected
                    ? `0 0 40px ${symbol.glow.includes("blue") ? "#3b82f6" : symbol.glow.includes("yellow") ? "#f59e0b" : symbol.glow.includes("purple") ? "#a855f7" : symbol.glow.includes("green") ? "#16a34a" : symbol.glow.includes("pink") ? "#ec4899" : "#ef4444"}`
                    : isHovered
                      ? `0 0 20px ${symbol.glow.includes("blue") ? "#3b82f6" : symbol.glow.includes("yellow") ? "#f59e0b" : symbol.glow.includes("purple") ? "#a855f7" : symbol.glow.includes("green") ? "#16a34a" : symbol.glow.includes("pink") ? "#ec4899" : "#ef4444"}`
                      : "0 0 10px rgba(255,255,255,0.3)",
                  rotate: isSelected ? 360 : 0,
                }}
                transition={{ duration: isSelected ? 2 : 0.3 }}
              >
                <span className="text-white drop-shadow-lg">{IconComponent}</span>
              </motion.div>

              {/* Symbol name */}
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered || isSelected ? 1 : 0.7 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-white font-semibold text-sm">{symbol.name}</p>
                <p className="text-purple-300 text-xs">{symbol.meaning}</p>
              </motion.div>

              {/* Floating particles around symbol */}
              <AnimatePresence>
                {(isHovered || isSelected) && (
                  <>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full"
                        style={{
                          left: "50%",
                          top: "50%",
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: Math.cos((i * 60 * Math.PI) / 180) * 60,
                          y: Math.sin((i * 60 * Math.PI) / 180) * 60,
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}

        {/* Central mystical circle */}
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-purple-500/30 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        >
          <div className="absolute inset-4 border border-purple-400/20 rounded-full" />
          <div className="absolute inset-8 border border-purple-300/10 rounded-full" />
        </motion.div>
      </div>

      {/* Selection feedback */}
      <AnimatePresence>
        {selectedSymbol && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <motion.p
              className="text-yellow-300 font-mystical text-lg"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              The {symbols.find((s) => s.id === selectedSymbol)?.name} has chosen you...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MagicalSymbols
