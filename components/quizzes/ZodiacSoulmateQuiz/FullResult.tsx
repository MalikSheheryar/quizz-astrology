"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Star, Users, Target, Sparkles, ChevronDown, ChevronUp, Download } from "lucide-react"

interface FullResultProps {
  userData: any
  soulmate: any
  quizAnswers: any[]
}

const FullResult = ({ userData, soulmate, quizAnswers }: FullResultProps) => {
  const [showAnswers, setShowAnswers] = useState(false)

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

  const getCompatibilityData = () => {
    const allSigns = [
      { name: "Aries", symbol: "♈", element: "Fire" },
      { name: "Taurus", symbol: "♉", element: "Earth" },
      { name: "Gemini", symbol: "♊", element: "Air" },
      { name: "Cancer", symbol: "♋", element: "Water" },
      { name: "Leo", symbol: "♌", element: "Fire" },
      { name: "Virgo", symbol: "♍", element: "Earth" },
      { name: "Libra", symbol: "♎", element: "Air" },
      { name: "Scorpio", symbol: "♏", element: "Water" },
      { name: "Sagittarius", symbol: "♐", element: "Fire" },
      { name: "Capricorn", symbol: "♑", element: "Earth" },
      { name: "Aquarius", symbol: "♒", element: "Air" },
      { name: "Pisces", symbol: "♓", element: "Water" },
    ]

    return allSigns.map((sign) => {
      let compatibility = "medium"
      if (sign.name === soulmate.name) {
        compatibility = "high"
      } else if (sign.element === soulmate.element) {
        compatibility = "high"
      } else if (
        (soulmate.element === "Fire" && sign.element === "Air") ||
        (soulmate.element === "Earth" && sign.element === "Water") ||
        (soulmate.element === "Air" && sign.element === "Fire") ||
        (soulmate.element === "Water" && sign.element === "Earth")
      ) {
        compatibility = "high"
      } else if (
        (soulmate.element === "Fire" && sign.element === "Water") ||
        (soulmate.element === "Earth" && sign.element === "Air") ||
        (soulmate.element === "Air" && sign.element === "Earth") ||
        (soulmate.element === "Water" && sign.element === "Fire")
      ) {
        compatibility = "low"
      }
      return { ...sign, compatibility }
    })
  }

  const getCompatibilityColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getDetailedDescription = () => {
    const descriptions: any = {
      Aries: {
        emotional:
          "Your Aries soulmate matches your need for excitement and spontaneity. They bring passionate energy that ignites your adventurous spirit.",
        strengths: "Dynamic partnership, mutual motivation, shared adventures, passionate connection",
        relationship: "A fiery, action-packed romance filled with new experiences and mutual growth",
        balance: "Their boldness complements your energy, creating a power couple dynamic",
      },
      Taurus: {
        emotional:
          "Your Taurus soulmate provides the stability and sensuality your soul craves. They offer unwavering loyalty and grounding presence.",
        strengths: "Emotional security, sensual connection, practical support, long-term commitment",
        relationship: "A deeply rooted, sensual partnership built on trust and shared values",
        balance: "Their steadiness balances your energy, creating a harmonious and secure foundation",
      },
      Gemini: {
        emotional:
          "Your Gemini soulmate stimulates your mind and keeps life interesting. They match your curiosity and love for intellectual connection.",
        strengths: "Mental stimulation, versatile communication, shared curiosity, adaptability",
        relationship: "A mentally stimulating partnership filled with conversation and discovery",
        balance: "Their wit and versatility complement your intellectual needs perfectly",
      },
      Cancer: {
        emotional:
          "Your Cancer soulmate nurtures your emotional depths and creates a safe haven for your heart. They understand your need for emotional security.",
        strengths: "Emotional intimacy, nurturing care, intuitive understanding, family-oriented",
        relationship: "A deeply emotional, nurturing partnership focused on creating a loving home",
        balance: "Their emotional intelligence balances your needs, creating profound intimacy",
      },
      Leo: {
        emotional:
          "Your Leo soulmate brings warmth, confidence, and celebration to your life. They match your need for passion and recognition.",
        strengths: "Mutual admiration, creative expression, generous love, shared confidence",
        relationship: "A dramatic, passionate romance filled with grand gestures and mutual celebration",
        balance: "Their confidence and warmth amplify your own radiance and self-expression",
      },
      Virgo: {
        emotional:
          "Your Virgo soulmate provides thoughtful care and practical support. They show love through consistent, meaningful actions.",
        strengths: "Practical support, attention to detail, health-conscious, reliable partnership",
        relationship: "A grounded, service-oriented partnership focused on mutual improvement",
        balance: "Their practical nature complements your needs, creating stability and growth",
      },
      Libra: {
        emotional:
          "Your Libra soulmate brings harmony, beauty, and balance to your relationship. They share your appreciation for partnership and aesthetics.",
        strengths: "Harmonious communication, aesthetic appreciation, diplomatic balance, romantic idealism",
        relationship: "A beautifully balanced partnership focused on harmony and mutual respect",
        balance: "Their diplomatic nature creates perfect equilibrium in your relationship dynamic",
      },
      Scorpio: {
        emotional:
          "Your Scorpio soulmate matches your intensity and desire for deep transformation. They understand your need for profound emotional connection.",
        strengths: "Emotional depth, transformative growth, passionate loyalty, intuitive bond",
        relationship: "An intensely transformative partnership that evolves both souls profoundly",
        balance: "Their depth and intensity create the profound connection your soul seeks",
      },
      Sagittarius: {
        emotional:
          "Your Sagittarius soulmate shares your love for adventure and philosophical growth. They inspire your quest for meaning and expansion.",
        strengths: "Shared adventures, philosophical discussions, optimistic outlook, freedom-loving",
        relationship: "An adventurous, growth-oriented partnership focused on exploration and wisdom",
        balance: "Their adventurous spirit matches your need for expansion and discovery",
      },
      Capricorn: {
        emotional:
          "Your Capricorn soulmate provides structure and ambition that supports your goals. They offer steady progress toward shared dreams.",
        strengths: "Goal-oriented partnership, practical achievement, long-term planning, mutual respect",
        relationship: "A mature, achievement-focused partnership built on mutual respect and shared goals",
        balance: "Their ambition and structure provide the foundation for your shared success",
      },
      Aquarius: {
        emotional:
          "Your Aquarius soulmate stimulates your innovative thinking and humanitarian ideals. They share your vision for a better future.",
        strengths: "Intellectual connection, humanitarian goals, innovative thinking, friendship foundation",
        relationship: "A forward-thinking partnership focused on innovation and making a difference",
        balance: "Their visionary nature aligns with your ideals, creating an inspiring partnership",
      },
      Pisces: {
        emotional:
          "Your Pisces soulmate connects with your spiritual and emotional depths. They understand your need for transcendent, soul-level connection.",
        strengths: "Spiritual connection, emotional empathy, creative inspiration, intuitive understanding",
        relationship: "A spiritually connected, emotionally profound partnership that transcends the ordinary",
        balance: "Their spiritual depth creates the transcendent connection your soul yearns for",
      },
    }
    return descriptions[soulmate.name] || descriptions.Cancer
  }

  const compatibilityData = getCompatibilityData()
  const detailedDescription = getDetailedDescription()

  const handleDownloadPDF = () => {
    // Simulate PDF download
    const element = document.createElement("a")
    element.href = "#"
    element.download = `${userData.fullName}-soulmate-reading.pdf`
    element.click()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-slate-800 bg-opacity-95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-500/30"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="flex justify-center items-center gap-3 mb-4"
          >
            <Heart className="text-pink-400 w-8 h-8" />
            <Sparkles className="text-purple-400 w-10 h-10" />
            <Heart className="text-pink-400 w-8 h-8" />
          </motion.div>

          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 bg-clip-text text-transparent mb-2">
            Your Complete Soulmate Analysis
          </h2>

          <div className="text-white/60 text-sm">
            <p>Analysis for {userData.fullName}</p>
            <p>
              Born: {userData.dateOfBirth} in {userData.countryOfBirth}
            </p>
            {userData.cityOfBirth && <p>City: {userData.cityOfBirth}</p>}
          </div>
        </div>

        {/* Detailed Soulmate Analysis */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-8">
          <div className="bg-slate-700/50 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${getElementColor(soulmate.element)} flex items-center justify-center text-2xl font-bold text-white`}
              >
                {soulmate.symbol}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{soulmate.name}</h3>
                <p className="text-purple-300">{soulmate.element} Element</p>
              </div>
            </div>

            <div className="space-y-4 text-white/90">
              <div>
                <h4 className="font-bold text-purple-300 mb-2 flex items-center gap-2">
                  <Heart className="w-5 h-5" /> Why This Sign Matches Your Emotional Frequency
                </h4>
                <p className="leading-relaxed">{detailedDescription.emotional}</p>
              </div>

              <div>
                <h4 className="font-bold text-purple-300 mb-2 flex items-center gap-2">
                  <Star className="w-5 h-5" /> Strengths in Love and Intimacy
                </h4>
                <p className="leading-relaxed">{detailedDescription.strengths}</p>
              </div>

              <div>
                <h4 className="font-bold text-purple-300 mb-2 flex items-center gap-2">
                  <Users className="w-5 h-5" /> Your Relationship Dynamic
                </h4>
                <p className="leading-relaxed">{detailedDescription.relationship}</p>
              </div>

              <div>
                <h4 className="font-bold text-purple-300 mb-2 flex items-center gap-2">
                  <Target className="w-5 h-5" /> How They Balance Your Chart
                </h4>
                <p className="leading-relaxed">{detailedDescription.balance}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Compatibility Chart */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Complete Zodiac Compatibility Chart</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {compatibilityData.map((sign, index) => (
              <motion.div
                key={sign.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                className={`bg-slate-700/50 rounded-xl p-4 text-center border-2 ${
                  sign.name === soulmate.name ? "border-purple-400 bg-purple-500/20" : "border-slate-600"
                }`}
              >
                <div className="text-2xl mb-2">{sign.symbol}</div>
                <div className="text-white font-medium text-sm mb-2">{sign.name}</div>
                <div className={`w-full h-2 rounded-full ${getCompatibilityColor(sign.compatibility)}`} />
                <div className="text-xs text-white/60 mt-1 capitalize">{sign.compatibility}</div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full" />
              <span className="text-white/80">High Compatibility</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full" />
              <span className="text-white/80">Medium Compatibility</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full" />
              <span className="text-white/80">Challenging</span>
            </div>
          </div>
        </motion.div>

        {/* Download PDF */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Save Your Reading</h3>
          <p className="text-gray-300 mb-6">Download your complete Soulmate analysis as a PDF</p>
          <motion.button
            onClick={handleDownloadPDF}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF Report
          </motion.button>
        </motion.div>

        {/* Quiz Answers Summary */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mb-8">
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="w-full bg-slate-700/50 rounded-xl p-4 text-white hover:bg-slate-700/70 transition-all duration-300 flex items-center justify-between"
          >
            <span className="font-medium">View Your Quiz Responses</span>
            {showAnswers ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {showAnswers && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 bg-slate-700/30 rounded-xl p-6"
            >
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {quizAnswers.map((answer, index) => (
                  <div key={index} className="text-white/80 text-sm">
                    <span className="font-medium text-purple-300">Q{answer.questionId}:</span> {answer.text}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-white/60 text-sm mb-2">Powered by</p>
          <div className="text-purple-300 font-bold text-lg">www.quizzastrology.com</div>
        </div>
      </motion.div>
    </div>
  )
}

export default FullResult
