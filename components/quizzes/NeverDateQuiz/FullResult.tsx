"use client"
import { motion } from "framer-motion"
import { AlertTriangle, Heart, Shield, Download, Star, Zap, Target } from "lucide-react"

const FullResult = ({ results, userData, quizAnswers }) => {
  const { neverDate, warnings, compatible, userSign } = results

  const greenFlags = [
    "Consistent communication patterns that match your style",
    "Respects your boundaries without needing constant reminders",
    "Shows genuine interest in your thoughts and feelings",
    "Handles conflict in a way that feels safe and productive",
    "Demonstrates reliability in both small and big commitments",
  ]

  const datingTips = {
    aries: "Set clear boundaries early, don't try to slow them down - redirect their energy instead.",
    taurus: "Give them time to process changes, appreciate their loyalty, don't rush physical intimacy.",
    gemini: "Keep conversations stimulating, give them mental space, don't take their need for variety personally.",
    cancer: "Be patient with their emotional cycles, create a safe space for vulnerability, show consistent care.",
    leo: "Give genuine appreciation, don't compete for attention, support their creative expressions.",
    virgo: "Appreciate their attention to detail, don't take criticism personally, show you value their help.",
    libra: "Be patient with their decision-making, create harmony, engage in intellectual discussions.",
    scorpio: "Be honest and direct, respect their need for privacy, don't try to control their intensity.",
    sagittarius: "Give them freedom to explore, join their adventures, don't take their bluntness personally.",
    capricorn: "Respect their goals and ambitions, be reliable, show you can contribute to their success.",
    aquarius: "Give them space to be unique, engage with their ideas, don't be possessive or clingy.",
    pisces: "Be gentle with their sensitivity, appreciate their creativity, provide emotional security.",
  }

  const handleDownloadPDF = () => {
    // PDF download functionality would be implemented here
    console.log("Downloading PDF report...")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Your Complete Compatibility Report</h1>
        <p className="text-white/80">Personalized insights for {userData.fullName}</p>
      </motion.div>

      {/* Main Incompatible Sign */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <motion.div
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start gap-6">
            <div className="text-6xl">{neverDate.emoji}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h2 className="text-2xl font-bold text-white">
                  Never Date: {neverDate.sign.charAt(0).toUpperCase() + neverDate.sign.slice(1)}
                </h2>
              </div>

              <p className="text-white/90 mb-6 leading-relaxed">{neverDate.reason}</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h3 className="font-semibold text-red-300 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Your Triggers
                  </h3>
                  <ul className="text-sm text-white/80 space-y-1">
                    {neverDate.traits.triggers.map((trigger, index) => (
                      <li key={index}>• {trigger}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <h3 className="font-semibold text-orange-300 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Their Patterns
                  </h3>
                  <ul className="text-sm text-white/80 space-y-1">
                    {neverDate.traits.negative.map((trait, index) => (
                      <li key={index}>• {trait}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Secondary Warnings */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <motion.div
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Proceed with Caution</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {warnings.map((warning, index) => (
              <motion.div
                key={warning.sign}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{warning.emoji}</span>
                  <h3 className="font-semibold text-yellow-300">
                    {warning.sign.charAt(0).toUpperCase() + warning.sign.slice(1)}
                  </h3>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">{warning.reason}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Compatible Signs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <motion.div
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold text-white">Your Best Matches Instead</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {compatible.map((match, index) => (
              <motion.div
                key={match.sign}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center"
              >
                <div className="text-4xl mb-2">{match.emoji}</div>
                <h3 className="font-semibold text-green-300 mb-2">
                  {match.sign.charAt(0).toUpperCase() + match.sign.slice(1)}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">{match.reason}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Dating Tips */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <motion.div
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">If You Must Date Them Anyway...</h2>
          </div>

          <div className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-lg mb-6">
            <h3 className="font-semibold text-purple-300 mb-3">
              Survival Guide for {neverDate.sign.charAt(0).toUpperCase() + neverDate.sign.slice(1)}
            </h3>
            <p className="text-white/90 leading-relaxed">{datingTips[neverDate.sign]}</p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Green Flags to Look For (Regardless of Sign)</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {greenFlags.map((flag, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3 p-3 bg-white/5 rounded-lg"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-white/80">{flag}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Download CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <motion.div
          className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-3">Want Even Deeper Insights?</h2>
            <p className="text-white/80">Get a full synastry reading with a professional astrologer</p>
          </div>

          <motion.button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-3 px-6 rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={18} />
            Download Full Report PDF
          </motion.button>

          <p className="text-xs text-white/60 mt-3">
            Personalized birth chart analysis • Relationship compatibility • Timing guidance
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default FullResult
