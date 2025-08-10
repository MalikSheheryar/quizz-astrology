"use client"
import type React from "react"
import { motion } from "framer-motion"
import { Sparkles, Star, Calendar, CreditCard } from "lucide-react"

interface ShortResultProps {
  userData: any
  answers: any
  onUnlock: () => void
  showFullReport: boolean
  quizData: any
}

const ShortResult: React.FC<ShortResultProps> = ({ userData, answers, onUnlock, showFullReport, quizData }) => {
  // Calculate prediction based on answers and birth data
  const calculatePrediction = () => {
    const birthMonth = new Date(userData.dateOfBirth).getMonth()
    const answerValues = Object.values(answers)

    // Simple algorithm to determine timing
    const emotionalReadiness = answerValues.filter((a: any) =>
      ["ready", "open", "healed", "optimistic"].some((keyword) => a.toString().toLowerCase().includes(keyword)),
    ).length

    const currentMonth = new Date().getMonth()
    let predictionMonth = currentMonth + Math.floor(emotionalReadiness / 2) + 2

    if (predictionMonth > 11) predictionMonth -= 12

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    const seasons: Record<number, string> = {
      0: "Winter",
      1: "Winter",
      2: "Spring",
      3: "Spring",
      4: "Spring",
      5: "Summer",
      6: "Summer",
      7: "Summer",
      8: "Fall",
      9: "Fall",
      10: "Fall",
      11: "Winter",
    }

    return {
      timeframe: `${seasons[predictionMonth]} (${months[predictionMonth]} - ${months[(predictionMonth + 2) % 12]})`,
      month: months[predictionMonth],
      season: seasons[predictionMonth],
      confidence: Math.min(85 + emotionalReadiness * 3, 97),
    }
  }

  const prediction = calculatePrediction()

  const handlePayment = async () => {
    // Simulate Stripe payment
    const paymentData = {
      amount: quizData.price * 100, // Convert to cents
      currency: "usd",
      description: `${quizData.title} - Full Prophecy`,
      customer_email: userData.email,
      customer_name: userData.fullName,
      quiz_id: quizData._id,
    }

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show success and reveal full result
      onUnlock()
    } catch (error) {
      console.error("Payment failed:", error)
    }
  }

  if (showFullReport) {
    return null // Don't render short result if full result is shown
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        className="bg-slate-800 bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 max-w-3xl w-full shadow-2xl border border-yellow-400/30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Mystical Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
              }}
              className="relative"
            >
              <Star size={60} className="text-yellow-400" fill="currentColor" />
              <motion.div
                className="absolute inset-0 text-purple-400"
                animate={{ rotate: [-360, 0] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles size={60} />
              </motion.div>
            </motion.div>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">Your Love Prophecy Awaits, {userData.fullName}</h1>
          <p className="text-gray-300 text-lg">The cosmic energies have aligned to reveal your romantic destiny...</p>
        </motion.div>

        {/* Prediction Card */}
        <motion.div
          className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-8 mb-8 border border-yellow-400/20 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Floating elements */}
          <div className="absolute top-4 right-4 text-yellow-400/30">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Star size={24} />
            </motion.div>
          </div>

          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-yellow-400/20 px-4 py-2 rounded-full mb-6"
            >
              <Calendar className="text-yellow-400" size={20} />
              <span className="text-yellow-400 font-semibold">{prediction.confidence}% Cosmic Certainty</span>
            </motion.div>

            <motion.h2
              className="text-3xl font-bold text-white mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              Love will find you during
            </motion.h2>

            <motion.div
              className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 150 }}
            >
              {prediction.timeframe}
            </motion.div>

            <motion.p
              className="text-gray-300 text-lg leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              A time when passion and purpose align perfectly with your soul's journey. The stars indicate this will be
              a transformative period where your heart opens to profound connection and lasting love.
            </motion.p>

            {/* Payment Section */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30">
              <h3 className="text-xl font-bold text-white mb-3">Unlock Your Complete Love Timeline</h3>
              <p className="text-white/80 mb-4">
                Get your full astrological love forecast, partner traits, lucky dates, and preparation guidance for just
                ${quizData.price}
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-green-400 font-semibold">✓ Full Timeline</div>
                  <div className="text-white/70">Detailed love forecast</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-green-400 font-semibold">✓ Partner Profile</div>
                  <div className="text-white/70">Future love's traits</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-green-400 font-semibold">✓ Lucky Dates</div>
                  <div className="text-white/70">Best timing for love</div>
                </div>
              </div>

              <motion.button
                onClick={handlePayment}
                className="w-full group relative px-12 py-6 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold text-xl rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 opacity-0 group-hover:opacity-20"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                />

                <div className="relative flex items-center justify-center gap-3">
                  <CreditCard size={24} />
                  Unlock Full Love Prophecy - ${quizData.price}
                  <Sparkles size={20} />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ShortResult
