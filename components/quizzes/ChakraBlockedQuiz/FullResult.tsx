"use client"
import type React from "react"
import { motion } from "framer-motion"
import { Download, ExternalLink } from "lucide-react"
import { Card } from "./components"
import { rankChakras, getChakraInfo, getPersonalizedInsights } from "./utils/chakraLogic"
import { fadeInUp, staggerChildren } from "./utils/motion"
import { generateQuizResultPDF } from "@/lib/pdf-generator"

interface FullResultProps {
  userData: any
  chakraScores: any
  quizData: any
}

const FullResult: React.FC<FullResultProps> = ({ userData, chakraScores, quizData }) => {
  const { primary, secondary } = rankChakras(chakraScores)
  const primaryChakra = getChakraInfo(primary.name)
  const secondaryChakra = getChakraInfo(secondary.name)
  const insights = getPersonalizedInsights(primary.name, quizData, userData)

  const ChakraColumn = () => (
    <div className="flex flex-col items-center space-y-2 mb-8">
      {["crown", "thirdEye", "throat", "heart", "solarPlexus", "sacral", "root"].map((chakra, index) => {
        const isBlocked = chakra === primary.name
        const isSecondary = chakra === secondary.name
        const chakraInfo = getChakraInfo(chakra)

        return (
          <motion.div
            key={chakra}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-500 ${
              isBlocked
                ? `${chakraInfo.bgColor} border-white shadow-lg shadow-${chakraInfo.color}/50`
                : isSecondary
                  ? `${chakraInfo.bgColor} border-white/50 opacity-70`
                  : "bg-white/10 border-white/30"
            }`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
          />
        )
      })}
    </div>
  )

  const handleDownloadPDF = () => {
    const pdf = generateQuizResultPDF(
      userData,
      { primaryChakra: primary.name, secondaryChakra: secondary.name, chakraScores },
      "Chakra Blocked Quiz",
      `Your ${primaryChakra.name} chakra is most blocked right now. ${insights.whyBlocked} This comprehensive report includes personalized healing practices and supportive elements to restore your energy balance.`,
    )
    pdf.save(`Chakra_Blocked_Quiz_Results_${userData.fullName.replace(/\s+/g, "_")}.pdf`)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      {/* Header */}
      <Card>
        <motion.div variants={staggerChildren} initial="hidden" animate="visible" className="text-center">
          <motion.div variants={fadeInUp}>
            <h1 className="text-2xl font-bold text-white mb-2">{userData.fullName}'s Chakra Alignment Report</h1>
            <p className="text-white/70">
              Born: {new Date(userData.dateOfBirth).toLocaleDateString()} • {userData.countryOfBirth}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-6">
            <ChakraColumn />
          </motion.div>
        </motion.div>
      </Card>

      {/* Primary Blocked Chakra */}
      <Card>
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <div className="flex items-start space-x-6">
            <div className={`p-6 rounded-full ${primaryChakra.bgColor} flex-shrink-0`}>
              <span className="text-5xl">{primaryChakra.symbol}</span>
            </div>
            <div className="flex-1">
              <h2 className={`text-3xl font-bold mb-2 ${primaryChakra.textColor}`}>{primaryChakra.name} Chakra</h2>
              <p className="text-white/70 mb-4">
                <strong>Sanskrit:</strong> {primaryChakra.sanskrit} • <strong> Location:</strong>{" "}
                {primaryChakra.location}
              </p>
              <p className="text-white text-lg mb-6">{insights.whyBlocked}</p>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Signs You Likely Notice:</h3>
                <ul className="space-y-2">
                  {insights.signs.map((sign: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-[#FFD700] mt-1">•</span>
                      <span className="text-white/80">{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </Card>

      {/* Quick Practices */}
      <Card>
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <h2 className="text-2xl font-bold text-white mb-6">🌟 Your Personalized Healing Practices</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#FFD700] mb-3">⚡ Quick Reset (5-7 minutes)</h3>
              <ul className="space-y-2 text-white/80">
                {insights.quickPractices.map((practice: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-[#FFD700] mt-1">•</span>
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#915EFF] mb-3">🧘 Daily Ritual (10-15 minutes)</h3>
              <div className="space-y-3 text-white/80">
                <div>
                  <strong className="text-white">Breathwork:</strong> {insights.dailyRitual.breathwork}
                </div>
                <div>
                  <strong className="text-white">Movement:</strong> {insights.dailyRitual.movement}
                </div>
                <div>
                  <strong className="text-white">Journaling:</strong> {insights.dailyRitual.journaling}
                </div>
                <div>
                  <strong className="text-white">Affirmation:</strong> "{insights.dailyRitual.affirmation}"
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Card>

      {/* Supportive Elements */}
      <Card>
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <h2 className="text-2xl font-bold text-white mb-6">🎨 Supportive Elements for Healing</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div
                className={`w-16 h-16 ${primaryChakra.bgColor} rounded-full mx-auto mb-2 flex items-center justify-center`}
              >
                <div className="w-8 h-8 bg-white rounded-full" />
              </div>
              <p className="text-white/80 text-sm">
                <strong>Color:</strong>
                <br />
                {primaryChakra.color}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-2xl">🔮</span>
              </div>
              <p className="text-white/80 text-sm">
                <strong>Crystal:</strong>
                <br />
                {insights.supportive.crystal}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-2xl">🍎</span>
              </div>
              <p className="text-white/80 text-sm">
                <strong>Foods:</strong>
                <br />
                {insights.supportive.foods}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-2xl">🎵</span>
              </div>
              <p className="text-white/80 text-sm">
                <strong>Sound:</strong>
                <br />
                {insights.supportive.sound}
              </p>
            </div>
          </div>
        </motion.div>
      </Card>

      {/* Secondary Chakra */}
      {secondary.score > 0 && (
        <Card>
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`p-3 rounded-full ${secondaryChakra.bgColor}`}>
                <span className="text-2xl">{secondaryChakra.symbol}</span>
              </div>
              <div>
                <h2 className={`text-xl font-bold ${secondaryChakra.textColor}`}>
                  Secondary Imbalance: {secondaryChakra.name}
                </h2>
                <p className="text-white/70">This chakra also needs attention</p>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Quick Support Tips:</h3>
              <ul className="space-y-1 text-white/80">
                {getPersonalizedInsights(secondary.name, quizData, userData)
                  .quickPractices.slice(0, 3)
                  .map((tip: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-[#6EC1E4] mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </motion.div>
        </Card>
      )}

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

      {/* Professional Support CTA */}
      <Card>
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">🌟 Ready to Go Deeper?</h2>
          <p className="text-white/80 mb-6">
            Consider working with a certified chakra practitioner for personalized guidance and energy healing sessions.
          </p>

          <motion.a
            href="https://www.quizzastrology.com/readings"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-3 px-8 bg-gradient-to-r from-[#915EFF] to-[#6EC1E4] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>🔗 Book a 1:1 Chakra Reading</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>

          <p className="text-white/60 text-sm mt-4">
            <em>Disclaimer: This assessment is for educational purposes and is not medical advice.</em>
          </p>
        </motion.div>
      </Card>

      {/* Footer */}
      <div className="text-center py-6">
        <p className="text-white/60">© 2024 QuizzAstrology.com • Discover Your Inner Wisdom</p>
      </div>
    </div>
  )
}

export default FullResult
