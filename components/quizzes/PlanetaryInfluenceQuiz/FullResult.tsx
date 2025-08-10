"use client"
import type React from "react"
import { motion } from "framer-motion"
import { ExternalLink, Star, Sparkles, Download } from "lucide-react"
import { planetDescriptions } from "./quizData"
import { generateQuizResultPDF } from "@/lib/pdf-generator"

interface FullResultProps {
  userData: any
  results: any
}

const FullResult: React.FC<FullResultProps> = ({ userData, results }) => {
  const dominantPlanet = Object.keys(results.planetScores).reduce((a, b) =>
    results.planetScores[a] > results.planetScores[b] ? a : b,
  )
  const planetInfo = planetDescriptions[dominantPlanet]

  const handleDownloadPDF = () => {
    const pdf = generateQuizResultPDF(userData, results, "Planetary Influence Quiz", planetInfo.fullAnalysis)
    pdf.save(`Planetary_Influence_Quiz_Results_${userData.fullName.replace(/\s+/g, "_")}.pdf`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#915EFF] to-[#FF5F6D] rounded-full mb-4"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-2xl font-bold mb-2">www.quizzastrology.com</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Complete Planetary Profile</h2>
      </div>

      {/* User Information */}
      <motion.div
        className="bg-[#1F2A38] rounded-2xl p-6 mb-8 border border-white/10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2 text-[#915EFF]" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
          <div>
            <span className="font-medium">Name:</span> {userData.fullName}
          </div>
          <div>
            <span className="font-medium">Email:</span> {userData.email}
          </div>
          <div>
            <span className="font-medium">Date of Birth:</span> {userData.dateOfBirth}
          </div>
          <div>
            <span className="font-medium">Country:</span> {userData.countryOfBirth}
          </div>
          {userData.cityOfBirth && (
            <div>
              <span className="font-medium">City:</span> {userData.cityOfBirth}
            </div>
          )}
        </div>
      </motion.div>

      {/* Dominant Planet Result */}
      <motion.div
        className="bg-[#1F2A38] rounded-2xl p-8 mb-8 border border-white/10 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="text-6xl mb-4">{planetInfo.icon}</div>
        <h3 className="text-3xl md:text-4xl font-bold mb-2">Your Dominant Planet: {dominantPlanet}</h3>
        <p className="text-white/80 text-lg">{planetInfo.title}</p>
      </motion.div>

      {/* Detailed Analysis */}
      <motion.div
        className="bg-[#1F2A38] rounded-2xl p-6 border border-white/10 mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h4 className="text-xl font-semibold mb-4 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-[#915EFF]" />
          Complete Analysis
        </h4>
        <p className="text-white/80 leading-relaxed text-lg">{planetInfo.fullAnalysis}</p>
      </motion.div>

      {/* Planetary Scores */}
      <motion.div
        className="bg-[#1F2A38] rounded-2xl p-6 border border-white/10 mb-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <h4 className="text-xl font-semibold mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2 text-[#915EFF]" />
          Your Planetary Scores
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(results.planetScores)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .map(([planet, score]) => (
              <div key={planet} className="flex items-center justify-between bg-[#2A3441] p-4 rounded-xl">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{planetDescriptions[planet].icon}</span>
                  <span className="text-white font-medium">{planet}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-20 bg-[#3A4451] rounded-full h-2 mr-3">
                    <div
                      className={`bg-gradient-to-r ${planetDescriptions[planet].color} h-2 rounded-full`}
                      style={{
                        width: `${((score as number) / Math.max(...Object.values(results.planetScores))) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-[#FFA726] font-bold">{score}</span>
                </div>
              </div>
            ))}
        </div>
      </motion.div>

      {/* Download PDF Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="text-center mb-8"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownloadPDF}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Download className="w-5 h-5" />
          <span>Download PDF Report</span>
        </motion.button>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="text-center bg-gradient-to-r from-[#915EFF] to-[#FF5F6D] rounded-2xl p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-white mb-4">🔮 Ready for Your Complete Birth Chart?</h3>
        <p className="text-white/90 mb-6 text-lg">
          This planetary influence quiz is just the beginning. Get a comprehensive birth chart reading from a certified
          astrologer to unlock deeper insights.
        </p>
        <motion.a
          href="#"
          className="inline-flex items-center space-x-2 bg-white text-[#915EFF] px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>👉 Get Full Birth Chart Analysis</span>
          <ExternalLink className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </motion.div>
  )
}

export default FullResult
