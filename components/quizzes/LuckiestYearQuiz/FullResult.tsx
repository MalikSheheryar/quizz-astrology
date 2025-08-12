"use client"
import type React from "react"
import { motion } from "framer-motion"
import { Star, TrendingUp, Heart, Sparkles, ExternalLink, X, Download } from "lucide-react"

interface FullResultProps {
  results: any
  onClose: () => void
}

const FullResult: React.FC<FullResultProps> = ({ results, onClose }) => {
  const { luckiestYear, personalYears, userData } = results

  const getYearInsights = (personalYear: number) => {
    const insights: any = {
      1: {
        energy: "New Beginnings",
        opportunities: ["Career launches", "New relationships", "Creative projects"],
        tips: ["Take initiative", "Start new ventures", "Trust your instincts"],
        affirmation: "I am ready to embrace new beginnings and manifest my dreams.",
      },
      2: {
        energy: "Cooperation & Partnership",
        opportunities: ["Business partnerships", "Marriage/commitment", "Team collaborations"],
        tips: ["Focus on relationships", "Practice patience", "Seek harmony"],
        affirmation: "I attract loving partnerships and meaningful connections.",
      },
      3: {
        energy: "Creative Expression",
        opportunities: ["Artistic breakthroughs", "Public speaking", "Social expansion"],
        tips: ["Express creativity", "Communicate openly", "Embrace joy"],
        affirmation: "My creative energy flows freely and brings abundance.",
      },
      4: {
        energy: "Foundation Building",
        opportunities: ["Property investment", "Skill development", "System creation"],
        tips: ["Build systematically", "Focus on details", "Create stability"],
        affirmation: "I build strong foundations for lasting success.",
      },
      5: {
        energy: "Freedom & Adventure",
        opportunities: ["Travel opportunities", "Career changes", "New experiences"],
        tips: ["Embrace change", "Stay flexible", "Explore options"],
        affirmation: "I welcome change and trust my journey of exploration.",
      },
      6: {
        energy: "Love & Responsibility",
        opportunities: ["Family growth", "Home improvements", "Healing work"],
        tips: ["Nurture relationships", "Create beauty", "Serve others"],
        affirmation: "I give and receive love freely, creating harmony around me.",
      },
      7: {
        energy: "Spiritual Growth",
        opportunities: ["Inner wisdom", "Research success", "Spiritual teaching"],
        tips: ["Seek solitude", "Study deeply", "Trust intuition"],
        affirmation: "I trust my inner wisdom and spiritual guidance.",
      },
      8: {
        energy: "Material Success",
        opportunities: ["Financial gains", "Recognition", "Leadership roles"],
        tips: ["Think big", "Take charge", "Manage resources"],
        affirmation: "I am worthy of abundance and success in all forms.",
      },
      9: {
        energy: "Completion & Wisdom",
        opportunities: ["Teaching others", "Humanitarian work", "Artistic mastery"],
        tips: ["Share wisdom", "Let go gracefully", "Serve humanity"],
        affirmation: "I complete cycles with grace and step into my highest wisdom.",
      },
    }
    return insights[personalYear] || insights[1]
  }

  const getTimelineColor = (year: number, isLuckiest: boolean) => {
    if (isLuckiest) return "from-yellow-400 to-orange-500"
    const personalYear = personalYears.find((py: any) => py.year === year)?.personalYear || 1
    if ([1, 3, 5, 8, 9].includes(personalYear)) return "from-green-400 to-blue-500"
    return "from-slate-400 to-slate-600"
  }

  const luckiestYearInsights = getYearInsights(luckiestYear.personalYear)

  const handleDownloadPDF = () => {
    // Simulate PDF download
    const element = document.createElement("a")
    element.href = "data:text/plain;charset=utf-8," + encodeURIComponent("Your Luckiest Year Report - Coming Soon!")
    element.download = `${userData.fullName}-luckiest-year-report.txt`
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
    >
      <div className="min-h-screen py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10 relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-slate-700/50 hover:bg-slate-600/50 rounded-full p-2 text-white/70 hover:text-white transition-all duration-300"
          >
            <X size={24} />
          </button>

          <div className="p-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <div className="flex justify-center mb-4">
                <img src="/placeholder.svg?height=40&width=120" alt="QuizzAstrology" className="h-10" />
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
                Your Complete Numerological Forecast
              </h1>
              <p className="text-white/80 text-lg">
                {userData.fullName} • Born{" "}
                {new Date(userData.dateOfBirth).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </motion.div>

            {/* Luckiest Year Highlight */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl p-6 border border-yellow-400/30 mb-8"
            >
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Star className="text-yellow-400" size={32} />
                  <span className="font-heading text-4xl md:text-5xl font-bold gradient-text">{luckiestYear.year}</span>
                  <Star className="text-yellow-400" size={32} />
                </div>
                <h2 className="font-heading text-2xl font-bold text-white mb-2">Your Peak Luck Year</h2>
                <p className="text-yellow-400 font-semibold text-lg">
                  Personal Year {luckiestYear.personalYear} • {luckiestYearInsights.energy}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp size={20} className="text-yellow-400" />
                    Key Opportunities
                  </h3>
                  <ul className="space-y-2">
                    {luckiestYearInsights.opportunities.map((opportunity: string, index: number) => (
                      <li key={index} className="text-white/90 flex items-center gap-2">
                        <Sparkles size={16} className="text-yellow-400" />
                        {opportunity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Heart size={20} className="text-yellow-400" />
                    Luck Enhancement Tips
                  </h3>
                  <ul className="space-y-2">
                    {luckiestYearInsights.tips.map((tip: string, index: number) => (
                      <li key={index} className="text-white/90 flex items-center gap-2">
                        <Sparkles size={16} className="text-yellow-400" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-2">Your Power Affirmation for {luckiestYear.year}:</h3>
                <p className="text-yellow-300 italic text-lg font-medium">"{luckiestYearInsights.affirmation}"</p>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <h2 className="font-heading text-2xl font-bold text-white mb-6 text-center">
                Your 6-Year Luck Timeline ({new Date().getFullYear()}-2030)
              </h2>

              <div className="space-y-4">
                {personalYears.map((yearData: any, index: number) => {
                  const isLuckiest = yearData.year === luckiestYear.year
                  const insights = getYearInsights(yearData.personalYear)

                  return (
                    <motion.div
                      key={yearData.year}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className={`relative bg-slate-700/30 rounded-xl p-4 border ${
                        isLuckiest ? "border-yellow-400 bg-yellow-400/10" : "border-slate-600"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-full bg-gradient-to-r ${getTimelineColor(
                              yearData.year,
                              isLuckiest,
                            )} flex items-center justify-center font-bold text-white`}
                          >
                            {yearData.personalYear}
                          </div>
                          <div>
                            <h3 className="text-white font-semibold text-lg">{yearData.year}</h3>
                            <p className="text-white/70 text-sm">{insights.energy}</p>
                          </div>
                        </div>
                        {isLuckiest && (
                          <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                            LUCKIEST YEAR
                          </div>
                        )}
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-yellow-400 font-medium">Focus:</span>
                          <p className="text-white/90">{insights.opportunities[0]}</p>
                        </div>
                        <div>
                          <span className="text-yellow-400 font-medium">Energy:</span>
                          <p className="text-white/90">{insights.energy}</p>
                        </div>
                        <div>
                          <span className="text-yellow-400 font-medium">Key Tip:</span>
                          <p className="text-white/90">{insights.tips[0]}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Download PDF */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mb-8 text-center"
            >
              <motion.button
                onClick={handleDownloadPDF}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-heading"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-6 h-6 mr-3" />
                Download PDF Report
              </motion.button>
            </motion.section>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30"
            >
              <h3 className="font-heading text-xl font-bold text-white mb-3">
                Want Your Complete Numerology Life Path Reading?
              </h3>
              <p className="text-white/80 mb-4">
                Unlock deeper insights into your destiny, soul purpose, and karmic lessons
              </p>
              <motion.button
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-400 to-orange-500 hover:from-red-500 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 rounded-xl transition-all duration-300 font-heading"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Your Full Life Path Report
                <ExternalLink size={18} />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default FullResult
