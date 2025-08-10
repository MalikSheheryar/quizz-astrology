"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Star, Sparkles, ArrowDown, CreditCard } from "lucide-react"

interface ShortResultProps {
  userData: any
  soulmate: any
  onShowFullResult: () => void
}

const ShortResult = ({ userData, soulmate, onShowFullResult }: ShortResultProps) => {
  const [showPayment, setShowPayment] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  if (!soulmate) return null

  const getElementColor = (element: string) => {
    const colors = {
      Fire: "from-red-500 to-orange-500",
      Earth: "from-green-500 to-emerald-500",
      Air: "from-blue-500 to-cyan-500",
      Water: "from-purple-500 to-indigo-500",
    }
    return colors[element as keyof typeof colors] || "from-purple-500 to-pink-500"
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setShowPayment(false)
      onShowFullResult()
    }, 2000)
  }

  if (showPayment) {
    return (
      <div className="max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-800 bg-opacity-90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-500/20"
        >
          <div className="text-center mb-6">
            <CreditCard className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Unlock Your Full Reading</h3>
            <p className="text-gray-300">Get your complete Zodiac Soulmate compatibility analysis</p>
          </div>

          <div className="bg-slate-700/50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-white">Full Soulmate Reading</span>
              <span className="text-2xl font-bold text-purple-400">$1.99</span>
            </div>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
            />
            <input
              type="text"
              placeholder="Card number"
              className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
              />
              <input
                type="text"
                placeholder="CVC"
                className="px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <motion.button
            onClick={handlePayment}
            disabled={isProcessing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {isProcessing ? "Processing..." : "Complete Purchase"}
          </motion.button>

          <button
            onClick={() => setShowPayment(false)}
            className="w-full mt-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Back to preview
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-slate-800 bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-500/20 text-center"
      >
        {/* Cosmic Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <Star className="text-yellow-400 w-8 h-8 animate-pulse" />
            <Heart className="text-pink-400 w-10 h-10" />
            <Star className="text-yellow-400 w-8 h-8 animate-pulse" />
          </div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 bg-clip-text text-transparent mb-2">
            Your Cosmic Connection Revealed!
          </h1>

          <p className="text-white/80 text-lg">The stars have spoken... ✨</p>
        </motion.div>

        {/* Soulmate Reveal */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div
            className={`w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br ${getElementColor(soulmate.element)} flex items-center justify-center shadow-2xl border-4 border-white/20`}
          >
            <span className="text-6xl text-white font-bold">{soulmate.symbol}</span>
          </div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-4xl font-bold text-white mb-4"
          >
            {soulmate.name}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-white/90 mb-2"
          >
            Your ideal soulmate is likely a <span className="font-bold text-purple-300">{soulmate.name}</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-lg text-white/80 italic"
          >
            {soulmate.description}
          </motion.p>
        </motion.div>

        {/* Element Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-8"
        >
          <div
            className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${getElementColor(soulmate.element)} text-white font-bold text-lg shadow-lg`}
          >
            {soulmate.element} Element
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="space-y-4"
        >
          <p className="text-white/90 text-lg mb-6">This is just the beginning of your cosmic journey...</p>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPayment(true)}
            className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white font-bold text-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Sparkles className="w-6 h-6" />
            Get Full Reading - $1.99
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </motion.button>

          <p className="text-white/60 text-sm mt-4">Discover your complete astrological compatibility analysis</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ShortResult
