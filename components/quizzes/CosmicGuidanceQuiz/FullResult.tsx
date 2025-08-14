"use client"

import { motion } from "framer-motion"
import { Sparkles, Star, Heart, Eye, Zap } from "lucide-react"

const FullResult = ({ userData, answers, result }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getEnergyIcon = (category) => {
    const icons = {
      Release: "🌙",
      Awaken: "☀️",
      Receive: "💖",
      Transform: "⚡",
      Trust: "⭐",
      Act: "👁️",
      Love: "💚",
      Protect: "👼",
    }
    return icons[category] || "✨"
  }

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* Header */}
      <div className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10">
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-3xl">{getEnergyIcon(result.category)}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Divine Message for {userData.fullName}</h1>
          <p className="text-white/70">
            Born on {formatDate(userData.dateOfBirth)} in {userData.countryOfBirth}
          </p>
        </div>

        <div className="text-center">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
            <span className="text-white font-bold text-lg">{result.category}</span>
          </div>
        </div>
      </div>

      {/* Main Message */}
      <div className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Heart className="w-6 h-6 text-pink-400" />
          Your Sacred Message
        </h2>
        <div className="prose prose-lg prose-invert max-w-none">
          <p className="text-white/90 text-lg leading-relaxed mb-6">{result.mainMessage}</p>

          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            Why This Message Now
          </h3>
          <p className="text-white/80 mb-6">{result.whyNow}</p>

          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            Your Next Steps
          </h3>
          <p className="text-white/80 mb-6">{result.nextSteps}</p>

          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-400" />
            Signs to Watch For
          </h3>
          <p className="text-white/80 mb-6">{result.signsToWatch}</p>
        </div>
      </div>

      {/* Affirmation */}
      <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-400" />
          Your Sacred Affirmation
        </h2>
        <p className="text-xl text-center text-yellow-300 font-medium italic">"{result.affirmation}"</p>
      </div>

      {/* Oracle Card */}
      <div className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Your Oracle Card of the Day</h2>
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <span className="text-4xl">{result.oracleCard.symbol}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{result.oracleCard.name}</h3>
          <p className="text-white/80 italic">"{result.oracleCard.message}"</p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Want a Private Psychic Reading?</h2>
        <p className="text-white/80 mb-6">
          Connect with a top intuitive for personalized guidance on your spiritual journey
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="inline-block px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Book Your Reading Now 🔮
        </motion.a>
      </div>

      {/* Footer */}
      <div className="text-center py-8">
        <div className="text-white/60 mb-4">
          <p className="text-lg font-medium">www.quizzastrology.com</p>
          <p className="text-sm">Your gateway to cosmic wisdom</p>
        </div>
      </div>
    </motion.div>
  )
}

export default FullResult
