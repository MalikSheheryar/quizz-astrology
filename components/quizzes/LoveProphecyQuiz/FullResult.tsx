"use client"
import type React from "react"
import { motion } from "framer-motion"
import { Heart, Star, Calendar, User, Sparkles, ExternalLink, MapPin, Clock, Download } from "lucide-react"

interface FullResultProps {
  userData: any
  answers: any
}

const FullResult: React.FC<FullResultProps> = ({ userData, answers }) => {
  // Enhanced prediction calculation
  const generateFullReport = () => {
    const birthDate = new Date(userData.dateOfBirth)
    const birthMonth = birthDate.getMonth()
    const birthDay = birthDate.getDate()
    const answerValues = Object.values(answers)

    // Calculate emotional readiness score
    const emotionalReadiness = answerValues.filter((a: any) =>
      ["ready", "open", "healed", "optimistic", "confident"].some((keyword) =>
        a.toString().toLowerCase().includes(keyword),
      ),
    ).length

    // Determine astrological timing
    const currentMonth = new Date().getMonth()
    const predictionMonth = (currentMonth + Math.floor(emotionalReadiness / 2) + 2) % 12

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

    const zodiacSigns = [
      "Aries",
      "Taurus",
      "Gemini",
      "Cancer",
      "Leo",
      "Virgo",
      "Libra",
      "Scorpio",
      "Sagittarius",
      "Capricorn",
      "Aquarius",
      "Pisces",
    ]

    // Generate partner traits based on birth month and answers
    const partnerTraits = [
      "Creative and artistic soul",
      "Deeply intuitive and empathetic",
      "Ambitious and goal-oriented",
      "Adventurous and free-spirited",
      "Intellectual and thoughtful",
      "Warm and nurturing nature",
      "Strong sense of justice and fairness",
      "Mysterious and magnetically attractive",
    ]

    const selectedTraits = partnerTraits.slice(0, 3 + (emotionalReadiness % 3))

    // Lucky dates
    const luckyDates = [
      `${birthDay}th of each month`,
      `Full moon in ${zodiacSigns[birthMonth]}`,
      `Venus retrograde periods`,
      `Your birthday month anniversary`,
    ]

    return {
      timeframe: `${months[predictionMonth]} - ${months[(predictionMonth + 2) % 12]}`,
      month: months[predictionMonth],
      year: new Date().getFullYear() + (predictionMonth < currentMonth ? 1 : 0),
      confidence: Math.min(85 + emotionalReadiness * 3, 97),
      readinessScore: Math.min(emotionalReadiness * 15 + 40, 95),
      partnerSign: zodiacSigns[(birthMonth + 6) % 12],
      partnerTraits: selectedTraits,
      luckyDates: luckyDates.slice(0, 3),
      astrologicalReason: `Venus trine Moon with Jupiter's blessing creates perfect harmony for lasting love`,
      preparation: [
        "Practice self-love and emotional healing",
        "Stay open to unexpected connections",
        "Trust your intuition in romantic matters",
        "Focus on personal growth and authenticity",
      ],
    }
  }

  const report = generateFullReport()

  const handleDownloadPDF = () => {
    // Simulate PDF generation and download
    const pdfData = {
      userData,
      report,
      timestamp: new Date().toISOString(),
    }

    console.log("Generating PDF with data:", pdfData)
    // In a real app, this would generate and download a PDF
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mt-8"
    >
      <motion.div
        className="bg-slate-800 bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-yellow-400/30 relative overflow-hidden"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-400/10 to-transparent rounded-full" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full" />

        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="text-yellow-400"
            >
              <Star size={48} fill="currentColor" />
            </motion.div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Your Complete Love Prophecy</h1>
          <p className="text-gray-300 text-lg">A detailed astrological analysis of your romantic destiny</p>
        </motion.div>

        {/* User Info Summary */}
        <motion.div
          className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-6 mb-8 border border-purple-400/20"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <User className="text-purple-400" size={24} />
            Personal Astrological Profile
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-yellow-400" />
              <span>Born: {new Date(userData.dateOfBirth).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-yellow-400" />
              <span>Location: {userData.countryOfBirth}</span>
            </div>
            {userData.timeOfBirth && (
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-yellow-400" />
                <span>Time: {userData.timeOfBirth}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-pink-400" />
              <span>Status: {userData.relationshipStatus}</span>
            </div>
          </div>
        </motion.div>

        {/* Main Prediction */}
        <motion.div
          className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-2xl p-8 mb-8 border border-yellow-400/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">🔮 Your Love Will Arrive During</h3>
          <div className="text-center mb-6">
            <div className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
              {report.timeframe} {report.year}
            </div>
            <div className="text-yellow-400 font-semibold text-lg">{report.confidence}% Astrological Certainty</div>
          </div>
          <p className="text-gray-300 text-center text-lg leading-relaxed">
            {report.astrologicalReason}. This cosmic alignment creates the perfect conditions for a deep, meaningful
            connection that will transform your life.
          </p>
        </motion.div>

        {/* Readiness Score */}
        <motion.div
          className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-2xl p-6 mb-8 border border-green-400/20"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Heart className="text-green-400" size={24} />
            Your Emotional Readiness Score
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-slate-700 rounded-full h-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-teal-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${report.readinessScore}%` }}
                transition={{ delay: 1.2, duration: 1.5 }}
              />
            </div>
            <span className="text-green-400 font-bold text-xl">{report.readinessScore}%</span>
          </div>
          <p className="text-gray-300 mt-3">
            Your heart is beautifully prepared for lasting love. The universe recognizes your growth and emotional
            maturity.
          </p>
        </motion.div>

        {/* Partner Traits */}
        <motion.div
          className="bg-gradient-to-br from-pink-900/30 to-rose-900/30 rounded-2xl p-6 mb-8 border border-pink-400/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="text-pink-400" size={24} />
            Your Future Love's Astrological Profile
          </h3>
          <div className="mb-4">
            <span className="text-pink-400 font-semibold">Most Compatible Sign: </span>
            <span className="text-white font-bold text-lg">{report.partnerSign}</span>
          </div>
          <div className="space-y-2">
            <p className="text-gray-300 font-medium mb-2">Key Traits:</p>
            {report.partnerTraits.map((trait, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <Star size={16} className="text-pink-400" fill="currentColor" />
                {trait}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Lucky Dates */}
        <motion.div
          className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-2xl p-6 mb-8 border border-purple-400/20"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4 }}
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="text-purple-400" size={24} />
            Your Lucky Love Dates
          </h3>
          <div className="space-y-2">
            {report.luckyDates.map((date, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
              >
                <Sparkles size={16} className="text-purple-400" />
                {date}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Preparation Advice */}
        <motion.div
          className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 rounded-2xl p-6 mb-8 border border-teal-400/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Heart className="text-teal-400" size={24} />
            Preparing for Your Great Love
          </h3>
          <div className="space-y-3">
            {report.preparation.map((advice, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8 + index * 0.1 }}
              >
                <div className="w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center text-slate-800 font-bold text-sm mt-0.5">
                  {index + 1}
                </div>
                <span>{advice}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Download PDF Button */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.button
            onClick={handleDownloadPDF}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            Download Full Prophecy as PDF
          </motion.button>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-2xl p-6 border border-yellow-400/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.0 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Want Even Deeper Insights?</h3>
          <p className="text-gray-300 mb-6">
            Get your complete natal chart reading and compatibility analysis to unlock the full secrets of your romantic
            destiny.
          </p>
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Full Natal Chart Reading
            <ExternalLink size={20} />
          </motion.a>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-8 pt-6 border-t border-slate-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <div className="text-yellow-400 font-bold text-lg mb-2">QuizzAstrology.com</div>
          <p className="text-gray-400 text-sm">
            Your trusted source for personalized astrological insights and cosmic guidance
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default FullResult
