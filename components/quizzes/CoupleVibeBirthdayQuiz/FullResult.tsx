"use client"
import { motion } from "framer-motion"
import { Heart, Star, Calendar, Users, Sparkles, ExternalLink, Copy } from "lucide-react"
import { cardVariants, staggerChildren } from "./utils/motion"

const FullResult = ({ coupleData, quizAnswers, result }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Our Couple Vibe Report",
        text: `${coupleData.yourName} and ${coupleData.partnerName} are ${result.name}!`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const archetypeIcons = {
    "power-duo": "⚡",
    "soulmate-healers": "🌟",
    "passion-pair": "🔥",
    "magnetic-opposites": "🧲",
    dreamers: "🌙",
    "balanced-builders": "⚖️",
    "cosmic-mirrors": "🪞",
  }

  const archetypeColors = {
    "power-duo": "from-[#FF6B6B] to-[#FFA726]",
    "soulmate-healers": "from-[#915EFF] to-[#6EC1E4]",
    "passion-pair": "from-[#FF6B6B] to-[#FF1744]",
    "magnetic-opposites": "from-[#6EC1E4] to-[#915EFF]",
    dreamers: "from-[#915EFF] to-[#FFD700]",
    "balanced-builders": "from-[#6EC1E4] to-[#2F9E44]",
    "cosmic-mirrors": "from-[#FFD700] to-[#915EFF]",
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <motion.div className="text-center mb-12" variants={cardVariants} initial="hidden" animate="visible">
        <div className="flex items-center justify-center mb-4">
          <Heart className="text-[#FFD700] mr-2" size={32} />
          <h1 className="text-2xl font-heading font-bold text-white">QuizzAstrology.com</h1>
        </div>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
          Your Complete Couple Vibe Report
        </h2>
      </motion.div>

      {/* Couple Info Card */}
      <motion.div
        className="bg-[#1F2A38] rounded-3xl p-8 shadow-2xl border border-white/10"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-8">
          <motion.div
            className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${archetypeColors[result.archetype]} rounded-full mb-4 text-4xl`}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {archetypeIcons[result.archetype]}
          </motion.div>
          <h3
            className={`text-3xl font-heading font-bold bg-gradient-to-r ${archetypeColors[result.archetype]} bg-clip-text text-transparent mb-2`}
          >
            {result.name}
          </h3>
          <p className="text-white/70 font-body text-lg">
            {coupleData.yourName} & {coupleData.partnerName}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center mb-4">
              <Calendar className="text-[#6EC1E4] mr-2" size={20} />
              <h4 className="font-heading font-semibold text-white">Your Cosmic Profile</h4>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-white/70 font-body">Name: </span>
                <span className="text-white font-body">{coupleData.yourName}</span>
              </div>
              <div>
                <span className="text-white/70 font-body">Birth Date: </span>
                <span className="text-white font-body">{new Date(coupleData.yourBirthDate).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-white/70 font-body">Zodiac Sign: </span>
                <span className="text-[#6EC1E4] font-body font-semibold">{result.yourSign}</span>
              </div>
              <div>
                <span className="text-white/70 font-body">Element: </span>
                <span className="text-[#6EC1E4] font-body font-semibold">{result.yourElement}</span>
              </div>
              <div>
                <span className="text-white/70 font-body">Life Path: </span>
                <span className="text-[#6EC1E4] font-body font-semibold">{result.yourLifePath}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center mb-4">
              <Heart className="text-[#915EFF] mr-2" size={20} />
              <h4 className="font-heading font-semibold text-white">Partner's Cosmic Profile</h4>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-white/70 font-body">Name: </span>
                <span className="text-white font-body">{coupleData.partnerName}</span>
              </div>
              <div>
                <span className="text-white/70 font-body">Birth Date: </span>
                <span className="text-white font-body">
                  {new Date(coupleData.partnerBirthDate).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="text-white/70 font-body">Zodiac Sign: </span>
                <span className="text-[#915EFF] font-body font-semibold">{result.partnerSign}</span>
              </div>
              <div>
                <span className="text-white/70 font-body">Element: </span>
                <span className="text-[#915EFF] font-body font-semibold">{result.partnerElement}</span>
              </div>
              <div>
                <span className="text-white/70 font-body">Life Path: </span>
                <span className="text-[#915EFF] font-body font-semibold">{result.partnerLifePath}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compatibility Score */}
        <div className="text-center mb-8">
          <h4 className="text-xl font-heading font-semibold text-white mb-4">Compatibility Score</h4>
          <div className="flex items-center justify-center space-x-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Heart
                  className={`${i < result.compatibilityScore ? "text-[#FF6B6B] fill-current" : "text-white/30"}`}
                  size={32}
                />
              </motion.div>
            ))}
          </div>
          <p className="text-[#FFD700] font-heading font-bold text-2xl">{result.compatibilityScore}/5 Hearts</p>
        </div>
      </motion.div>

      {/* Detailed Analysis */}
      <motion.div className="space-y-6" variants={staggerChildren} initial="hidden" animate="visible">
        {/* Shared Energy Dynamic */}
        <motion.div className="bg-[#1F2A38] rounded-3xl p-8 shadow-2xl border border-white/10" variants={cardVariants}>
          <div className="flex items-center mb-6">
            <Sparkles className="text-[#FFD700] mr-3" size={24} />
            <h3 className="text-2xl font-heading font-bold text-white">Your Shared Energy Dynamic</h3>
          </div>
          <p className="text-white/80 font-body text-lg leading-relaxed mb-4">{result.energyDynamic}</p>
          <div className="bg-gradient-to-r from-[#FFD700]/10 to-[#915EFF]/10 rounded-2xl p-4 border border-[#FFD700]/20">
            <p className="text-[#FFD700] font-body italic">"{result.energyQuote}"</p>
          </div>
        </motion.div>

        {/* Strengths as a Couple */}
        <motion.div className="bg-[#1F2A38] rounded-3xl p-8 shadow-2xl border border-white/10" variants={cardVariants}>
          <div className="flex items-center mb-6">
            <Star className="text-[#6EC1E4] mr-3" size={24} />
            <h3 className="text-2xl font-heading font-bold text-white">Your Strengths as a Couple</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {result.strengths.map((strength, index) => (
              <motion.div
                key={index}
                className="bg-white/5 rounded-xl p-4 border border-white/10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start">
                  <div className="text-[#6EC1E4] mr-3 mt-1">✨</div>
                  <div>
                    <h4 className="font-heading font-semibold text-white mb-1">{strength.title}</h4>
                    <p className="text-white/70 font-body text-sm">{strength.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Growth Areas */}
        <motion.div className="bg-[#1F2A38] rounded-3xl p-8 shadow-2xl border border-white/10" variants={cardVariants}>
          <div className="flex items-center mb-6">
            <Users className="text-[#915EFF] mr-3" size={24} />
            <h3 className="text-2xl font-heading font-bold text-white">Areas for Growth & Harmony</h3>
          </div>
          <p className="text-white/80 font-body text-lg leading-relaxed mb-6">{result.growthAreas}</p>
          <div className="bg-gradient-to-r from-[#915EFF]/10 to-[#6EC1E4]/10 rounded-2xl p-6 border border-[#915EFF]/20">
            <h4 className="font-heading font-semibold text-[#915EFF] mb-3">Cosmic Guidance for Your Journey:</h4>
            <ul className="space-y-2">
              {result.guidance.map((tip, index) => (
                <li key={index} className="text-white/80 font-body flex items-start">
                  <span className="text-[#915EFF] mr-2">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* What Makes Your Love Unique */}
        <motion.div className="bg-[#1F2A38] rounded-3xl p-8 shadow-2xl border border-white/10" variants={cardVariants}>
          <div className="flex items-center mb-6">
            <Heart className="text-[#FF6B6B] mr-3" size={24} />
            <h3 className="text-2xl font-heading font-bold text-white">What Makes Your Love Unique</h3>
          </div>
          <p className="text-white/80 font-body text-lg leading-relaxed mb-6">{result.uniqueLove}</p>
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] rounded-2xl p-6">
              <h4 className="font-heading font-bold text-white text-xl mb-2">Your Love Affirmation</h4>
              <p className="text-white font-body text-lg italic">
                "Our connection is written in the stars — and shaped by our shared journey."
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bonus Section */}
        <motion.div className="bg-[#1F2A38] rounded-3xl p-8 shadow-2xl border border-white/10" variants={cardVariants}>
          <div className="flex items-center mb-6">
            <Sparkles className="text-[#FFD700] mr-3" size={24} />
            <h3 className="text-2xl font-heading font-bold text-white">Cosmic Bonus for Your Journey</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="font-heading font-semibold text-[#FFD700] mb-3">Lucky Couple Dates</h4>
              <div className="space-y-2">
                {result.luckyDates.map((date, index) => (
                  <div key={index} className="text-white/80 font-body">
                    <span className="text-[#FFD700]">•</span> {date}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="font-heading font-semibold text-[#6EC1E4] mb-3">Ideal Shared Ritual</h4>
              <p className="text-white/80 font-body">{result.sharedRitual}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="bg-[#1F2A38] rounded-3xl p-8 shadow-2xl border border-white/10 text-center"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-2xl font-heading font-bold text-white mb-4">
          Want to Dive Deeper Into Your Cosmic Connection?
        </h3>
        <p className="text-white/70 font-body mb-6">
          Discover your complete birth chart compatibility and soulmate forecast
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={handleShare}
            className="flex items-center justify-center px-6 py-3 bg-white/10 text-white font-heading font-semibold rounded-xl hover:bg-white/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Copy className="mr-2" size={20} />
            Share Your Report
          </motion.button>
          <motion.a
            href="#"
            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] text-white font-heading font-semibold rounded-xl hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="mr-2" size={20} />
            Get Full Birth Chart Reading
          </motion.a>
        </div>
      </motion.div>
    </div>
  )
}

export default FullResult
