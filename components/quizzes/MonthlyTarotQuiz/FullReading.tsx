"use client"
import { motion } from "framer-motion"
import { Star, Heart, Briefcase, Eye, Lightbulb, Calendar, ExternalLink } from "lucide-react"

const FullReading = ({ userData, selectedCard, quizAnswers }) => {
  const getPersonalizedReading = () => {
    const readings = {
      "The Magician": {
        monthlyMeaning:
          "This month, you are the master of your destiny. The Magician appears when you have all the tools needed to manifest your desires into reality.",
        lifeEnergy:
          "Your life force is electric and focused. You possess the power to transform ideas into tangible results.",
        love: "In love, you attract what you desire through clear intention. Single? Your magnetic energy draws the right person. Partnered? Deepen intimacy through honest communication.",
        career:
          "Professional opportunities multiply. Your skills and talents are recognized. Take initiative on projects that showcase your unique abilities.",
        innerSelf:
          "You are discovering your true power. Trust your instincts and act with confidence. Your willpower is your greatest asset.",
        hiddenSigns:
          "Look for repeated number sequences, especially 1s. Pay attention to tools or resources that appear unexpectedly in your path.",
        emotionalAdvice:
          "Channel your emotions into creative action. When you feel scattered, return to your core intention and focus your energy there.",
        opportunities:
          "New beginnings in creative projects, leadership roles, or starting something you've been planning. The universe supports bold moves.",
        luckyPeriod: "The first week of this month holds special manifestation power for you.",
      },
      "The Empress": {
        monthlyMeaning:
          "The Empress brings a month of creativity, abundance, and nurturing energy. You are in a phase of beautiful growth and natural flow.",
        lifeEnergy:
          "Your energy is fertile and creative. Like nature in spring, everything you touch has the potential to bloom and flourish.",
        love: "Love flows naturally this month. Existing relationships deepen with tenderness and care. New connections have a soulful, nurturing quality.",
        career:
          "Your work benefits from a collaborative, caring approach. Projects involving beauty, creativity, or helping others are especially favored.",
        innerSelf:
          "Embrace your nurturing side and trust your natural wisdom. You are more intuitive and emotionally intelligent than you realize.",
        hiddenSigns:
          "Notice flowers, gardens, or natural beauty appearing in unexpected places. These are signs of your growing abundance.",
        emotionalAdvice:
          "Allow yourself to feel deeply and express emotions through creative outlets. Your sensitivity is a strength, not a weakness.",
        opportunities:
          "Creative projects, family matters, home improvements, or ventures involving beauty and aesthetics will flourish.",
        luckyPeriod: "Mid-month brings the most fertile energy for new beginnings and creative endeavors.",
      },
      "The Star": {
        monthlyMeaning:
          "The Star illuminates your path with hope and divine guidance. This month is about healing, inspiration, and connecting with your higher purpose.",
        lifeEnergy:
          "Your spiritual energy is heightened. You are a beacon of hope and inspiration for others, even when you don't realize it.",
        love: "Love takes on a spiritual dimension. You attract or deepen connections based on shared values and dreams for the future.",
        career:
          "Your work aligns more closely with your true calling. Opportunities arise that feel meaningful and purposeful.",
        innerSelf:
          "You are healing from past wounds and discovering your authentic self. Trust the process of becoming who you're meant to be.",
        hiddenSigns:
          "Look up at the night sky more often. Stars, wishes, and moments of sudden clarity are your cosmic messages.",
        emotionalAdvice:
          "Practice gratitude and maintain hope, even during challenging moments. Your optimism is a healing force.",
        opportunities:
          "Spiritual growth, healing practices, charitable work, or pursuits that serve a greater purpose are highlighted.",
        luckyPeriod: "The last week of the month brings profound insights and spiritual breakthroughs.",
      },
    }

    return readings[selectedCard?.name] || readings["The Star"]
  }

  const reading = getPersonalizedReading()

  const getPersonalizedMessage = () => {
    const name = userData.fullName?.split(" ")[0] || "Beautiful Soul"
    const mood = userData.mood || "balanced"

    return `Dear ${name}, your ${mood} energy this month aligns perfectly with ${selectedCard?.name}. The universe has chosen this card to guide your journey through the coming weeks. Trust in the cosmic timing of this message.`
  }

  return (
    <div className="max-w-6xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative mx-auto w-48 h-72 mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl blur-lg opacity-40" />
            <div className="relative w-full h-full bg-slate-800 rounded-2xl border-3 border-yellow-400 overflow-hidden">
              <img
                src={selectedCard?.image || "/placeholder.svg"}
                alt={selectedCard?.name}
                className="w-full h-3/4 object-cover"
              />
              <div className="p-3 text-center">
                <h3 className="text-lg font-bold text-white">{selectedCard?.name}</h3>
              </div>
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Your Complete Monthly Reading</h1>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto">{getPersonalizedMessage()}</p>
        </div>

        {/* Reading Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Life Energy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-purple-500/20"
          >
            <div className="flex items-center mb-4">
              <Star className="w-6 h-6 text-yellow-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Life Energy Reading</h3>
            </div>
            <p className="text-purple-100 leading-relaxed">{reading.lifeEnergy}</p>
          </motion.div>

          {/* Love */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-purple-500/20"
          >
            <div className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-pink-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Love & Relationships</h3>
            </div>
            <p className="text-purple-100 leading-relaxed">{reading.love}</p>
          </motion.div>

          {/* Career */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-purple-500/20"
          >
            <div className="flex items-center mb-4">
              <Briefcase className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Career & Success</h3>
            </div>
            <p className="text-purple-100 leading-relaxed">{reading.career}</p>
          </motion.div>

          {/* Inner Self */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-purple-500/20"
          >
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Inner Self Focus</h3>
            </div>
            <p className="text-purple-100 leading-relaxed">{reading.innerSelf}</p>
          </motion.div>

          {/* Hidden Signs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-purple-500/20"
          >
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-indigo-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Hidden Signs to Watch</h3>
            </div>
            <p className="text-purple-100 leading-relaxed">{reading.hiddenSigns}</p>
          </motion.div>

          {/* Opportunities */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-purple-500/20"
          >
            <div className="flex items-center mb-4">
              <Lightbulb className="w-6 h-6 text-yellow-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Opportunities to Embrace</h3>
            </div>
            <p className="text-purple-100 leading-relaxed">{reading.opportunities}</p>
          </motion.div>
        </div>

        {/* Emotional Advice & Lucky Period */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="bg-gradient-to-br from-pink-500/20 to-purple-600/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-pink-400/30"
          >
            <div className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-pink-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Emotional Guidance</h3>
            </div>
            <p className="text-purple-100 leading-relaxed">{reading.emotionalAdvice}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-yellow-400/30"
          >
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-yellow-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Your Lucky Period</h3>
            </div>
            <p className="text-purple-100 leading-relaxed">{reading.luckyPeriod}</p>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center mt-12 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-500/20"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Want Even Deeper Cosmic Guidance?</h3>
          <p className="text-purple-200 mb-6">
            Get a full 3-card psychic reading or monthly forecast from a professional tarot expert
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span>Book Your Personal Reading</span>
            <ExternalLink className="w-5 h-5 ml-2" />
          </motion.a>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="text-center mt-8 pb-8"
        >
          <p className="text-purple-300 text-sm">
            Thank you for connecting with the cosmic energies through QuizzAstrology.com
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default FullReading
