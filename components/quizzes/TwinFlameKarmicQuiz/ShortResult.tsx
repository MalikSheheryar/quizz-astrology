"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Flame, Star, Sparkles, Heart, CreditCard } from "lucide-react"

interface ShortResultProps {
  userData: any
  result: string
  onShowFullResult: () => void
}

const ShortResult = ({ userData, result, onShowFullResult }: ShortResultProps) => {
  const [showPayment, setShowPayment] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const getResultContent = () => {
    switch (result) {
      case "Twin Flame":
        return {
          title: "Twin Flame Connection",
          icon: <Flame className="w-16 h-16 text-orange-400" />,
          preview:
            "Your souls are two halves of the same divine essence, reunited in this lifetime to experience unconditional love and spiritual awakening. This connection transcends the physical realm and represents the ultimate spiritual partnership.",
          color: "from-orange-400 to-red-500",
        }
      case "Karmic Lesson":
        return {
          title: "Karmic Relationship",
          icon: <Star className="w-16 h-16 text-purple-400" />,
          preview:
            "This relationship is a powerful karmic lesson, bringing you face-to-face with patterns that your soul needs to heal and transform. Through this connection, you're learning to break cycles and evolve spiritually.",
          color: "from-purple-400 to-pink-500",
        }
      case "Both – a transformative twin soul connection with karmic roots":
        return {
          title: "Twin Soul with Karmic Roots",
          icon: <Sparkles className="w-16 h-16 text-pink-400" />,
          preview:
            "Your connection is both a twin soul bond and a karmic healing journey. You share a deep spiritual connection while simultaneously working through important lessons that will elevate both of your souls to higher consciousness.",
          color: "from-pink-400 to-purple-500",
        }
      default:
        return {
          title: "Soul Connection",
          icon: <Heart className="w-16 h-16 text-pink-400" />,
          preview:
            "Your relationship holds deep spiritual significance and is guiding you both toward greater understanding and growth.",
          color: "from-pink-400 to-red-500",
        }
    }
  }

  const content = getResultContent()

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
            <p className="text-gray-300">Get your complete Twin Flame vs Karmic analysis</p>
          </div>

          <div className="bg-slate-700/50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-white">Full Relationship Reading</span>
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
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="bg-slate-800 bg-opacity-90 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-500/20 text-center"
      >
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="p-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30"
          >
            {content.icon}
          </motion.div>
        </motion.div>

        {/* Result Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r ${content.color} bg-clip-text text-transparent`}
        >
          {content.title}
        </motion.h1>

        {/* Preview Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto"
        >
          {content.preview}
        </motion.p>

        {/* Teaser Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-lg text-purple-300 mb-2">This is just the beginning of your cosmic love story...</p>
          <p className="text-gray-400">
            Your full relationship reading contains deeper insights about your spiritual connection, healing journey,
            and the divine purpose of your union.
          </p>
        </motion.div>

        {/* Reveal Button */}
        <motion.button
          onClick={() => setShowPayment(true)}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(255, 107, 107, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <motion.span
            animate={{
              textShadow: [
                "0 0 10px rgba(255,255,255,0.5)",
                "0 0 20px rgba(255,255,255,0.8)",
                "0 0 10px rgba(255,255,255,0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            🔮 Get Full Reading - $1.99
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  )
}

export default ShortResult
