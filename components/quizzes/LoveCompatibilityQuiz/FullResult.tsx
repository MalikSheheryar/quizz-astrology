"use client"
import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  Star,
  Sparkles,
  Flame,
  Droplets,
  Wind,
  Mountain,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Download,
} from "lucide-react"

interface FullResultProps {
  userData: any
  quizAnswers: any[]
  compatibilityScore: any
}

const FullResult: React.FC<FullResultProps> = ({ userData, quizAnswers, compatibilityScore }) => {
  const [showAnswers, setShowAnswers] = useState(false)

  const getCompatibilityInsight = (score: number) => {
    if (score >= 85)
      return {
        title: "Cosmic Soulmate Connection",
        description: "The stars have aligned! This connection has incredible potential for deep, lasting love.",
        energy: "Future soulmate energy with divine timing",
        icon: Star,
        color: "from-purple-500 to-pink-500",
      }
    if (score >= 70)
      return {
        title: "Magnetic Attraction",
        description: "Strong compatibility with beautiful growth potential. This connection could blossom beautifully.",
        energy: "Meant to grow you both in love",
        icon: Heart,
        color: "from-pink-500 to-red-500",
      }
    if (score >= 55)
      return {
        title: "Passionate Spark",
        description: "Intense chemistry with some challenges. This connection teaches important lessons about love.",
        energy: "Hot flame but requires nurturing",
        icon: Flame,
        color: "from-orange-500 to-red-500",
      }
    return {
      title: "Learning Connection",
      description: "This person came into your life to teach you something valuable about yourself and love.",
      energy: "Meant to teach and transform",
      icon: Sparkles,
      color: "from-blue-500 to-purple-500",
    }
  }

  const insight = getCompatibilityInsight(compatibilityScore.overall)
  const IconComponent = insight.icon

  const getElementalMatch = (score: number) => {
    if (score >= 80) return { element: "Fire", description: "Passionate and dynamic energy", icon: Flame }
    if (score >= 60) return { element: "Water", description: "Deep emotional connection", icon: Droplets }
    if (score >= 40) return { element: "Air", description: "Intellectual and communicative", icon: Wind }
    return { element: "Earth", description: "Stable and grounding", icon: Mountain }
  }

  const elementalMatch = getElementalMatch(compatibilityScore.breakdown.elemental)
  const ElementIcon = elementalMatch.icon

  const handleDownloadPDF = () => {
    // Simulate PDF generation and download
    const pdfData = {
      userData,
      compatibilityScore,
      insight,
      elementalMatch,
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
        className="bg-slate-800/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-500/30 relative overflow-hidden"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-400/10 to-transparent rounded-full" />
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
              className="text-pink-400"
            >
              <Heart size={48} fill="currentColor" />
            </motion.div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Your Complete Love Compatibility Report</h1>
          <p className="text-gray-300 text-lg">
            A detailed analysis of your romantic connection with {userData.crushName || "your crush"}
          </p>
        </motion.div>

        {/* User Info Summary */}
        <motion.div
          className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-6 mb-8 border border-purple-400/20"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Star className="text-purple-400" size={24} />
            Personal Profile
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <span className="text-purple-400">Name:</span> {userData.fullName}
            </div>
            <div>
              <span className="text-purple-400">Birth Date:</span> {new Date(userData.dateOfBirth).toLocaleDateString()}
            </div>
            <div>
              <span className="text-purple-400">Location:</span> {userData.countryOfBirth}
            </div>
            {userData.crushName && (
              <div>
                <span className="text-purple-400">Crush:</span> {userData.crushName}
              </div>
            )}
          </div>
        </motion.div>

        {/* Main Compatibility Analysis */}
        <motion.div
          className="bg-gradient-to-br from-pink-900/30 to-orange-900/30 rounded-2xl p-8 mb-8 border border-pink-400/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">{insight.title}</h3>

          <p className="text-white/90 text-lg text-center mb-8">{insight.description}</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Object.entries(compatibilityScore.breakdown).map(([category, score]) => {
              const categoryNames: Record<string, string> = {
                communication: "Communication Harmony",
                emotional: "Emotional Frequency",
                romantic: "Romantic Chemistry",
                compatibility: "Overall Compatibility",
                zodiac: "Zodiac Affinity",
                elemental: "Elemental Alignment",
              }

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * Object.keys(compatibilityScore.breakdown).indexOf(category) }}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="text-white font-semibold mb-3">{categoryNames[category]}</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-white/20 rounded-full h-3">
                      <motion.div
                        className="bg-gradient-to-r from-pink-500 to-orange-400 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                      />
                    </div>
                    <span className="text-white font-bold text-lg">{score}%</span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30">
            <div className="flex items-center gap-4 mb-4">
              <ElementIcon className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="text-white font-bold text-lg">Your Elemental Match: {elementalMatch.element}</h3>
                <p className="text-white/80">{elementalMatch.description}</p>
              </div>
            </div>
            <p className="text-white/90 text-center font-medium">✨ {insight.energy} ✨</p>
          </div>
        </motion.div>

        {/* Connection Insights */}
        <motion.div
          className="bg-gradient-to-r from-teal-900/30 to-cyan-900/30 rounded-2xl p-8 mb-8 border border-teal-400/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Your Connection's Potential</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-green-400 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Strengths
              </h3>
              <div className="space-y-2">
                {compatibilityScore.breakdown.communication >= 70 && (
                  <p className="text-white/90">• Excellent communication flow</p>
                )}
                {compatibilityScore.breakdown.emotional >= 70 && (
                  <p className="text-white/90">• Deep emotional understanding</p>
                )}
                {compatibilityScore.breakdown.romantic >= 70 && (
                  <p className="text-white/90">• Strong romantic chemistry</p>
                )}
                {compatibilityScore.breakdown.zodiac >= 70 && <p className="text-white/90">• Astrological harmony</p>}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-yellow-400 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Growth Areas
              </h3>
              <div className="space-y-2">
                {compatibilityScore.breakdown.communication < 70 && (
                  <p className="text-white/90">• Focus on open communication</p>
                )}
                {compatibilityScore.breakdown.emotional < 70 && (
                  <p className="text-white/90">• Build emotional intimacy</p>
                )}
                {compatibilityScore.breakdown.compatibility < 70 && (
                  <p className="text-white/90">• Explore shared interests</p>
                )}
                <p className="text-white/90">• Trust the timing of your connection</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Answers Recap */}
        <motion.div
          className="bg-slate-700/50 rounded-2xl p-6 mb-8 border border-slate-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="w-full flex items-center justify-between text-white font-bold text-xl mb-4"
          >
            <span>Your Quiz Responses</span>
            {showAnswers ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>

          <AnimatePresence>
            {showAnswers && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                {quizAnswers.map((answer, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-white/90">
                      <span className="font-semibold text-pink-400">Q{index + 1}:</span> {answer.text}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Download PDF Button */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.button
            onClick={handleDownloadPDF}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            Download Full Report as PDF
          </motion.button>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl p-8 border border-purple-400/30 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Want Even Deeper Insights?</h2>
          <p className="text-white/90 mb-6">
            Get a full synastry chart or soulmate prediction by a professional astrologer
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ExternalLink className="w-5 h-5" />
            Book Professional Reading
          </motion.a>
        </motion.div>

        {/* Website Credit */}
        <motion.div
          className="text-center mt-8 pt-6 border-t border-slate-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <p className="text-white/60 text-lg font-medium">✨ www.quizzastrology.com ✨</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default FullResult
