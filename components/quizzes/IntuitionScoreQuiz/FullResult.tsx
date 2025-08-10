"use client"
import type React from "react"
import { motion } from "framer-motion"
import { Star, Moon, Sun, Eye, Heart, Zap, ExternalLink, Download } from "lucide-react"
import { getAstrologyElement, getZodiacSign, getSpiritGuide, getScoreInsight } from "./quizData"
import { generateQuizResultPDF } from "@/lib/pdf-generator"

interface FullResultProps {
  userData: any
  score: number
  answers: any[]
}

const FullResult: React.FC<FullResultProps> = ({ userData, score, answers }) => {
  const element = getAstrologyElement(userData.dateOfBirth)
  const zodiacSign = getZodiacSign(userData.dateOfBirth)
  const spiritGuide = getSpiritGuide(score)
  const scoreInsight = getScoreInsight(score, element)

  const getScoreCategory = (score: number) => {
    if (score >= 80)
      return {
        category: "Ultra-Intuitive",
        description: "You possess extraordinary intuitive abilities that border on the mystical.",
        color: "text-purple-400",
        bgColor: "bg-purple-500/20",
        emoji: "🔮",
      }
    if (score >= 65)
      return {
        category: "Strong Intuition",
        description: "Your intuitive abilities are well-developed and highly reliable.",
        color: "text-blue-400",
        bgColor: "bg-blue-500/20",
        emoji: "✨",
      }
    if (score >= 45)
      return {
        category: "Developing Intuition",
        description: "Your intuitive abilities are emerging and can be strengthened with practice.",
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/20",
        emoji: "🌟",
      }
    return {
      category: "Logic-First Thinker",
      description: "You rely primarily on logic and analysis, but intuitive abilities can be developed.",
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      emoji: "🧠",
    }
  }

  const { category, description, color, bgColor, emoji } = getScoreCategory(score)

  const getActionSteps = (score: number) => {
    if (score >= 80)
      return [
        "Practice daily meditation to maintain your connection",
        "Keep a synchronicity journal to track meaningful coincidences",
        "Trust your first instincts in important decisions",
      ]
    if (score >= 65)
      return [
        "Develop a morning mindfulness routine",
        "Practice body scanning to increase sensory awareness",
        "Record and analyze your dreams regularly",
      ]
    if (score >= 45)
      return [
        "Start with 10-minute daily meditation sessions",
        "Practice silent observation exercises in nature",
        "Begin keeping a daily intuition journal",
      ]
    return [
      "Begin with basic breathing exercises and mindfulness",
      "Practice noticing subtle environmental changes",
      "Start questioning your first impressions of people and situations",
    ]
  }

  const getIntuitivePlanet = (element: string) => {
    const planets = {
      Fire: { name: "Mars", description: "enhances your instinctive action-taking abilities" },
      Earth: { name: "Saturn", description: "grounds your intuition in practical wisdom" },
      Air: { name: "Mercury", description: "sharpens your mental intuitive insights" },
      Water: { name: "Neptune", description: "deepens your psychic and emotional sensitivity" },
    }
    return planets[element as keyof typeof planets] || planets.Water
  }

  const actionSteps = getActionSteps(score)
  const intuitivePlanet = getIntuitivePlanet(element)

  const handleDownloadPDF = () => {
    const pdf = generateQuizResultPDF(
      userData,
      { score, category, element, zodiacSign, spiritGuide },
      "Intuition Score Quiz",
      `Your complete intuitive profile reveals a ${category} with a score of ${score}/100. ${description} Your ${element} element nature, combined with your ${zodiacSign} energy, creates a unique intuitive signature guided by ${spiritGuide.name}.`,
    )
    pdf.save(`Intuition_Score_Quiz_Results_${userData.fullName.replace(/\s+/g, "_")}.pdf`)
  }

  return (
    <motion.div
      className="backdrop-blur-md bg-slate-900/65 rounded-3xl p-8 shadow-2xl border border-slate-700/50 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="flex justify-center items-center gap-3 mb-4">
          <Star className="text-yellow-400 w-8 h-8" />
          <h1 className="text-3xl font-bold text-white">Your Complete Intuition Profile</h1>
          <Star className="text-yellow-400 w-8 h-8" />
        </div>
        <p className="text-slate-300 text-lg">
          {userData.fullName} • {zodiacSign} • {element} Element
        </p>
      </motion.div>

      {/* Score Display */}
      <motion.div
        className={`${bgColor} rounded-2xl p-6 mb-8 text-center`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="text-6xl mb-3">{emoji}</div>
        <div className="text-5xl font-bold text-white mb-2">{score}/100</div>
        <h2 className={`text-2xl font-bold ${color} mb-3`}>{category}</h2>
        <p className="text-slate-300 text-lg">{description}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Element Analysis */}
        <motion.div
          className="bg-slate-800/50 rounded-2xl p-6"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sun className="text-orange-400 w-6 h-6" />
            <h3 className="text-xl font-bold text-white">Elemental Influence</h3>
          </div>
          <div className="space-y-3">
            <p className="text-slate-300">
              As a <span className={`${color} font-bold`}>{element}</span> element person, your intuitive style is
              naturally aligned with {element.toLowerCase()} energy.
            </p>
            <p className="text-slate-300">
              Your ruling planet <span className="text-yellow-400 font-bold">{intuitivePlanet.name}</span>{" "}
              {intuitivePlanet.description}.
            </p>
            <p className="text-slate-300">{scoreInsight}</p>
          </div>
        </motion.div>

        {/* Spirit Guide */}
        <motion.div
          className="bg-slate-800/50 rounded-2xl p-6"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Eye className="text-purple-400 w-6 h-6" />
            <h3 className="text-xl font-bold text-white">Your Spirit Guide</h3>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">{spiritGuide.emoji}</div>
            <h4 className="text-lg font-bold text-purple-400 mb-2">{spiritGuide.name}</h4>
            <p className="text-slate-300 text-sm">{spiritGuide.message}</p>
          </div>
        </motion.div>
      </div>

      {/* Action Steps */}
      <motion.div
        className="bg-slate-800/50 rounded-2xl p-6 mt-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Zap className="text-yellow-400 w-6 h-6" />
          <h3 className="text-xl font-bold text-white">3 Steps to Enhance Your Intuition</h3>
        </div>
        <div className="space-y-4">
          {actionSteps.map((step, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-3 p-4 bg-slate-700/50 rounded-xl"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2 + index * 0.2, duration: 0.4 }}
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <p className="text-slate-300 flex-1">{step}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Download PDF Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="text-center mb-8"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownloadPDF}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Download className="w-5 h-5" />
          <span>Download PDF Report</span>
        </motion.button>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="text-center p-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl border border-purple-500/30"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <Heart className="text-pink-400 w-8 h-8 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-3">Ready for a Live Intuitive Reading?</h3>
        <p className="text-slate-300 mb-6">
          Connect with a professional psychic to explore your intuitive gifts deeper and confirm your spiritual path.
        </p>

        <motion.a
          href="https://www.quizzastrology.com/readings"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Book Your Reading Now</span>
          <ExternalLink className="w-5 h-5" />
        </motion.a>

        <div className="mt-6 flex items-center justify-center gap-2">
          <Moon className="text-purple-400 w-5 h-5" />
          <span className="text-slate-400 text-sm">Powered by QuizzAstrology.com</span>
          <Moon className="text-purple-400 w-5 h-5" />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default FullResult
