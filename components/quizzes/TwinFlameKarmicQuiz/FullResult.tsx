"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Flame, Moon, Eye, Zap, Sparkles, Star, ChevronDown, ChevronUp, Download } from "lucide-react"

interface FullResultProps {
  userData: any
  result: string
  answers: any[]
}

const FullResult = ({ userData, result, answers }: FullResultProps) => {
  const [showAnswers, setShowAnswers] = useState(false)

  const getDetailedReport = () => {
    switch (result) {
      case "Twin Flame":
        return {
          title: "Twin Flame Connection",
          subtitle: "Two Souls, One Divine Essence",
          icon: <Flame className="w-20 h-20 text-orange-400" />,
          color: "from-orange-400 to-red-500",
          energeticSignature:
            "Your connection carries the highest vibrational frequency of divine love. You and your partner are literally two halves of the same soul, experiencing separation to understand the beauty of reunion. This connection transcends physical attraction and enters the realm of spiritual recognition.",
          whyIntense:
            "The intensity you feel comes from your soul recognizing itself in another body. Every interaction is magnified because you're not just connecting with another person – you're connecting with your own divine essence reflected back to you. This creates an almost overwhelming sense of familiarity and belonging.",
          commonBehaviors: [
            "Instant recognition and deep knowing upon first meeting",
            "Telepathic communication and shared dreams",
            "Intense periods of separation followed by magnetic reunion",
            "Accelerated spiritual growth and awakening",
            "Synchronicities and divine timing in your relationship",
            "Feeling incomplete when apart, complete when together",
          ],
          howToGrow:
            "Focus on individual healing and self-love, as your twin flame mirrors your own spiritual development. Practice unconditional love without attachment to outcomes. Trust the divine timing of your union and use separation periods for inner work. Remember that your ultimate goal is not just romantic union, but spiritual ascension together.",
          destiny:
            "This connection is eternal and meant to last beyond this lifetime. Your purpose together is to anchor divine love on Earth and inspire others through your union. You're here to demonstrate what unconditional love looks like in human form.",
        }
      case "Karmic Lesson":
        return {
          title: "Karmic Relationship",
          subtitle: "Soul Contracts and Sacred Lessons",
          icon: <Star className="w-20 h-20 text-purple-400" />,
          color: "from-purple-400 to-pink-500",
          energeticSignature:
            "Your connection carries the energy of unfinished business and soul contracts. This relationship has been divinely orchestrated to help both of you heal, grow, and break generational patterns. The intensity comes from your souls recognizing the important work that needs to be done together.",
          whyIntense:
            "The intensity stems from your soul's urgent need to learn and heal. This person triggers your deepest wounds not to hurt you, but to bring them to the surface for healing. Every challenge is an opportunity for profound transformation and spiritual evolution.",
          commonBehaviors: [
            "Repeating patterns and cycles that need breaking",
            "Intense emotional triggers and healing opportunities",
            "Feeling both drawn to and resistant to the relationship",
            "Learning to set boundaries and practice self-love",
            "Experiencing rapid personal growth through challenges",
            "Feeling like you're meant to teach each other something important",
          ],
          howToGrow:
            "Embrace the lessons this relationship offers without resistance. Practice forgiveness – both of yourself and your partner. Focus on breaking old patterns and creating new, healthier ways of relating. Use this connection as a mirror to understand what needs healing within yourself.",
          destiny:
            "This relationship may be temporary or long-term, depending on how quickly you both learn and integrate the lessons. The goal is mutual healing and growth. Once the karmic debt is cleared and lessons are learned, you may naturally grow apart or transform into a different type of connection.",
        }
      case "Both – a transformative twin soul connection with karmic roots":
        return {
          title: "Twin Soul with Karmic Roots",
          subtitle: "Divine Love Meets Sacred Healing",
          icon: <Sparkles className="w-20 h-20 text-pink-400" />,
          color: "from-pink-400 to-purple-500",
          energeticSignature:
            "Your connection is a rare and powerful combination of twin soul recognition and karmic healing. You share a deep spiritual bond while simultaneously working through important lessons from past lifetimes. This creates a uniquely intense and transformative relationship experience.",
          whyIntense:
            "The intensity comes from two sources: the soul recognition of your twin flame connection and the urgent need to heal karmic patterns. You're experiencing both the bliss of divine love and the challenge of spiritual growth simultaneously, creating a roller coaster of emotions and experiences.",
          commonBehaviors: [
            "Periods of intense connection alternating with challenging lessons",
            "Deep spiritual recognition mixed with triggering patterns",
            "Accelerated healing and growth through your connection",
            "Feeling both blessed and challenged by the relationship",
            "Experiencing divine synchronicities alongside karmic tests",
            "Knowing you're meant to be together while working through obstacles",
          ],
          howToGrow:
            "Balance your twin soul connection with conscious karmic healing. Celebrate your divine bond while actively working on the lessons this relationship brings. Practice patience with the process and trust that both the love and the challenges serve your highest good. Focus on healing together rather than separately.",
          destiny:
            "This is a lifelong journey of love and transformation. Your relationship is meant to evolve from karmic healing into pure twin flame union. You're here to demonstrate that love can conquer all obstacles and that relationships can be both healing and transcendent.",
        }
      default:
        return {
          title: "Soul Connection",
          subtitle: "A Sacred Bond",
          icon: <Heart className="w-20 h-20 text-pink-400" />,
          color: "from-pink-400 to-red-500",
          energeticSignature: "Your connection holds deep spiritual significance.",
          whyIntense: "This relationship brings important growth opportunities.",
          commonBehaviors: ["Deep connection and mutual growth"],
          howToGrow: "Focus on love, understanding, and spiritual development together.",
          destiny: "Your path together is one of mutual support and evolution.",
        }
    }
  }

  const report = getDetailedReport()

  const handleDownloadPDF = () => {
    // Simulate PDF download
    const element = document.createElement("a")
    element.href = "#"
    element.download = `${userData.fullName}-twin-flame-reading.pdf`
    element.click()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header with User Info */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-slate-800 bg-opacity-90 backdrop-blur-lg rounded-3xl p-6 md:p-8 mb-8 shadow-2xl border border-purple-500/20"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Cosmic Love Reading for {userData.fullName}
          </h1>
          <p className="text-purple-300">
            Born {new Date(userData.dateOfBirth).toLocaleDateString()} in {userData.countryOfBirth}
          </p>
          {userData.partnerName && <p className="text-gray-300 mt-2">Connection with {userData.partnerName}</p>}
        </div>

        <div className="flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30"
          >
            {report.icon}
          </motion.div>
        </div>
      </motion.div>

      {/* Main Result */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="bg-slate-800 bg-opacity-90 backdrop-blur-lg rounded-3xl p-8 md:p-12 mb-8 shadow-2xl border border-purple-500/20 text-center"
      >
        <h2
          className={`text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r ${report.color} bg-clip-text text-transparent`}
        >
          {report.title}
        </h2>
        <p className="text-2xl text-purple-300 mb-8">{report.subtitle}</p>
      </motion.div>

      {/* Detailed Analysis */}
      <div className="space-y-8">
        {/* Energetic Signature */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-slate-800 bg-opacity-90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-500/20"
        >
          <div className="flex items-center mb-6">
            <Eye className="w-8 h-8 text-blue-400 mr-4" />
            <h3 className="text-2xl font-bold text-white">Energetic Signature</h3>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">{report.energeticSignature}</p>
        </motion.div>

        {/* Why It Feels Intense */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-slate-800 bg-opacity-90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-500/20"
        >
          <div className="flex items-center mb-6">
            <Zap className="w-8 h-8 text-orange-400 mr-4" />
            <h3 className="text-2xl font-bold text-white">Why This Connection Feels So Intense</h3>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">{report.whyIntense}</p>
        </motion.div>

        {/* Common Behaviors */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-slate-800 bg-opacity-90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-500/20"
        >
          <div className="flex items-center mb-6">
            <Heart className="w-8 h-8 text-pink-400 mr-4" />
            <h3 className="text-2xl font-bold text-white">Common Patterns in This Connection</h3>
          </div>
          <ul className="space-y-3">
            {report.commonBehaviors.map((behavior, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                className="flex items-start text-gray-300"
              >
                <Star className="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-lg">{behavior}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* How to Grow */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="bg-slate-800 bg-opacity-90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-500/20"
        >
          <div className="flex items-center mb-6">
            <Sparkles className="w-8 h-8 text-purple-400 mr-4" />
            <h3 className="text-2xl font-bold text-white">How to Grow and Evolve Together</h3>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">{report.howToGrow}</p>
        </motion.div>

        {/* Destiny */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="bg-slate-800 bg-opacity-90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-500/20"
        >
          <div className="flex items-center mb-6">
            <Moon className="w-8 h-8 text-indigo-400 mr-4" />
            <h3 className="text-2xl font-bold text-white">Your Relationship Destiny</h3>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">{report.destiny}</p>
        </motion.div>

        {/* Download PDF */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="bg-slate-800 bg-opacity-90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-500/20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Save Your Reading</h3>
          <p className="text-gray-300 mb-6">Download your complete Twin Flame analysis as a PDF</p>
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

        {/* Answers Summary (Collapsible) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="bg-slate-800 bg-opacity-90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-500/20"
        >
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-2xl font-bold text-white">Your Quiz Responses</h3>
            {showAnswers ? (
              <ChevronUp className="w-6 h-6 text-purple-400" />
            ) : (
              <ChevronDown className="w-6 h-6 text-purple-400" />
            )}
          </button>

          {showAnswers && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6 space-y-4"
            >
              {answers.map((answer, index) => (
                <div key={index} className="p-4 bg-slate-700/50 rounded-xl">
                  <p className="text-purple-300 font-medium mb-2">Question {index + 1}</p>
                  <p className="text-gray-300">{answer.text}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Weight: {answer.weight} ({answer.type})
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-center py-8"
        >
          <p className="text-purple-300 text-lg font-medium mb-2">QuizzAstrology.com</p>
          <p className="text-gray-400">Discover the cosmic truth about your relationships</p>
        </motion.div>
      </div>
    </div>
  )
}

export default FullResult
