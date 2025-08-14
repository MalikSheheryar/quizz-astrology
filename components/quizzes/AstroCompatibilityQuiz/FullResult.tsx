"use client"
import { motion } from "framer-motion"
import { Heart, Sparkles, Sun, Star, Moon, Download } from "lucide-react"

const FullResult = ({ coupleData, results }) => {
  const getCompatibilityLevel = (score) => {
    if (score >= 85) return { level: "Cosmic Soulmates", color: "text-yellow-300", emoji: "✨" }
    if (score >= 70) return { level: "Celestial Match", color: "text-pink-300", emoji: "💫" }
    if (score >= 55) return { level: "Growing Union", color: "text-blue-300", emoji: "🌙" }
    return { level: "Learning Journey", color: "text-purple-300", emoji: "🔮" }
  }

  const getZodiacElement = (sign) => {
    const elements = {
      Aries: "Fire",
      Leo: "Fire",
      Sagittarius: "Fire",
      Taurus: "Earth",
      Virgo: "Earth",
      Capricorn: "Earth",
      Gemini: "Air",
      Libra: "Air",
      Aquarius: "Air",
      Cancer: "Water",
      Scorpio: "Water",
      Pisces: "Water",
    }
    return elements[sign] || "Unknown"
  }

  const compatibility = getCompatibilityLevel(results.compatibilityScore)
  const userElement = getZodiacElement(coupleData.userSign)
  const partnerElement = getZodiacElement(coupleData.partnerSign)

  const generateInsight = () => {
    const insights = {
      "Cosmic Soulmates": {
        main: "Your souls dance in perfect harmony across the cosmos. This is a rare and sacred connection.",
        emotional: "You understand each other on a profound level, often communicating without words.",
        communication: "Your conversations flow like celestial music, creating deeper intimacy.",
        chemistry: "The magnetic pull between you transcends the physical realm.",
        growth: "Together, you elevate each other to new spiritual heights.",
        challenges: "Your main challenge is maintaining individual identity within such unity.",
        guidance: "Trust in your cosmic bond and allow it to guide your earthly journey together.",
      },
      "Celestial Match": {
        main: "The stars have aligned beautifully for your union. You complement each other wonderfully.",
        emotional: "You create a safe emotional space where both hearts can flourish.",
        communication: "Your different perspectives create rich, meaningful conversations.",
        chemistry: "There's a natural magnetism that draws you together repeatedly.",
        growth: "You inspire each other to become the best versions of yourselves.",
        challenges: "Learning to balance togetherness with individual growth.",
        guidance: "Celebrate your differences as they are the source of your strength.",
      },
      "Growing Union": {
        main: "Your connection is like a garden - with care and attention, it blooms beautifully.",
        emotional: "You're learning to understand each other's emotional languages.",
        communication: "Open dialogue is your key to deeper connection.",
        chemistry: "Your attraction grows stronger as you discover more about each other.",
        growth: "This relationship teaches you both valuable lessons about love.",
        challenges: "Patience and understanding during times of growth.",
        guidance: "Focus on building trust and emotional intimacy step by step.",
      },
      "Learning Journey": {
        main: "Every great love story has chapters of growth. You're writing yours together.",
        emotional: "You're discovering new depths of emotional connection.",
        communication: "Learning each other's communication styles takes time and patience.",
        chemistry: "Your bond deepens through shared experiences and understanding.",
        growth: "This relationship is a powerful catalyst for personal development.",
        challenges: "Embracing differences and finding common ground.",
        guidance: "Focus on appreciation, patience, and open-hearted communication.",
      },
    }
    return insights[compatibility.level]
  }

  const insight = generateInsight()

  const handleDownloadPDF = () => {
    // PDF download functionality would be implemented here
    console.log("Downloading PDF report...")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <motion.div
        className="bg-slate-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/10 text-center"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-white mb-4">Complete Astrological Compatibility Report</h2>
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-300">{coupleData.userName}</div>
            <div className="text-lg text-white/80">{coupleData.userSign}</div>
            <div className="text-sm text-white/60">{userElement} Sign</div>
          </div>
          <Heart className="text-red-400" size={32} />
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-300">{coupleData.partnerName}</div>
            <div className="text-lg text-white/80">{coupleData.partnerSign}</div>
            <div className="text-sm text-white/60">{partnerElement} Sign</div>
          </div>
        </div>
        <div className={`text-3xl font-bold ${compatibility.color} mb-2`}>
          {results.compatibilityScore}% - {compatibility.level}
        </div>
      </motion.div>

      {/* Detailed Analysis */}
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { title: "Emotional Compatibility", icon: Heart, content: insight.emotional, color: "pink" },
          { title: "Communication Energy", icon: Sparkles, content: insight.communication, color: "blue" },
          { title: "Physical Chemistry", icon: Sun, content: insight.chemistry, color: "orange" },
          { title: "Growth Potential", icon: Star, content: insight.growth, color: "yellow" },
        ].map((section, index) => (
          <motion.div
            key={section.title}
            className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <section.icon className={`text-${section.color}-400`} size={24} />
              <h3 className="text-xl font-bold text-white">{section.title}</h3>
            </div>
            <p className="text-white/80 leading-relaxed">{section.content}</p>
          </motion.div>
        ))}
      </div>

      {/* Challenges & Guidance */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Moon className="text-purple-400" size={24} />
            <h3 className="text-xl font-bold text-white">Sacred Challenges</h3>
          </div>
          <p className="text-white/80 leading-relaxed">{insight.challenges}</p>
        </motion.div>

        <motion.div
          className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-green-400" size={24} />
            <h3 className="text-xl font-bold text-white">Love Guidance</h3>
          </div>
          <p className="text-white/80 leading-relaxed">{insight.guidance}</p>
        </motion.div>
      </div>

      {/* Affirmation & Download */}
      <motion.div
        className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/10 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6 }}
      >
        <div className="text-4xl mb-4">🌟</div>
        <h3 className="text-2xl font-bold text-white mb-4">Sacred Affirmation</h3>
        <p className="text-xl text-white/90 italic mb-6">
          "Our souls chose each other for a reason, and the stars confirm our divine connection."
        </p>

        <motion.button
          onClick={handleDownloadPDF}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold py-3 px-6 rounded-xl hover:from-pink-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download size={18} />
          Download Full Report PDF
        </motion.button>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="text-center py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <p className="text-white/70">
          Powered by <span className="text-yellow-300 font-semibold">www.quizzastrology.com</span>
        </p>
      </motion.div>
    </motion.div>
  )
}

export default FullResult
