"use client"

import { motion } from "framer-motion"
import { ExternalLink, Star, Heart, Zap } from "lucide-react"

const FullResult = ({ userData, selectedCard }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getPersonalizedReading = () => {
    const readings = {
      "The Fool": {
        currentLife:
          "You stand at the threshold of a magnificent new beginning. The universe is aligning to present you with opportunities that will reshape your destiny. Your adventurous spirit and willingness to take calculated risks will be your greatest assets in the coming months.",
        nearFuture:
          "Within the next 3-6 months, expect a significant life change that will require courage and faith. This could manifest as a new career opportunity, relationship, or spiritual awakening. Trust your instincts and embrace the unknown.",
        opportunities:
          "New partnerships, creative ventures, and travel opportunities will present themselves. Your optimistic outlook will attract like-minded individuals who will support your journey.",
        challenges:
          "Avoid impulsive decisions and ensure you have a solid foundation before making major changes. Don't let others' skepticism dampen your enthusiasm.",
        wisdom:
          "The universe rewards those who dare to dream and act upon their visions. Your journey is just beginning, and infinite possibilities await.",
      },
      "The Magician": {
        currentLife:
          "You possess incredible power to manifest your desires into reality. Your skills, talents, and resources are perfectly aligned to create the life you envision. This is a time of great personal power and creative potential.",
        nearFuture:
          "The next 3-6 months will bring opportunities to showcase your abilities and take leadership roles. Your communication skills and ability to inspire others will open doors to success.",
        opportunities:
          "Leadership positions, creative projects, and the ability to influence positive change in your community. Your natural charisma will attract beneficial connections.",
        challenges:
          "Guard against ego and ensure your intentions remain pure. Use your power responsibly and remember that true magic comes from serving others.",
        wisdom:
          "You have all the tools necessary to create your desired reality. Focus your energy, trust in your abilities, and watch as miracles unfold.",
      },
      "The High Priestess": {
        currentLife:
          "Your intuitive abilities are heightened, and you're being called to trust your inner wisdom more deeply. Hidden knowledge and spiritual insights are available to you if you quiet your mind and listen to your soul's guidance.",
        nearFuture:
          "The coming months will bring profound spiritual revelations and psychic experiences. Pay attention to your dreams, synchronicities, and gut feelings as they contain important messages.",
        opportunities:
          "Spiritual development, healing work, and roles that require deep empathy and understanding. Your intuitive gifts will be recognized and valued.",
        challenges:
          "Don't let others dismiss your intuitive insights. Balance your spiritual pursuits with practical responsibilities and avoid becoming too withdrawn from the world.",
        wisdom:
          "The answers you seek lie within. Trust your inner voice and allow your intuition to guide you toward your highest path.",
      },
    }

    return readings[selectedCard.name] || readings["The Fool"]
  }

  const reading = getPersonalizedReading()

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mt-12 max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/90 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-yellow-400/30 mb-8"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Your Complete Tarot Reading</h2>
          <div className="flex items-center justify-center space-x-4 text-white/70">
            <span>{userData.fullName}</span>
            <span>•</span>
            <span>{formatDate(userData.dateOfBirth)}</span>
          </div>
        </div>

        {/* Selected Card Display */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 40px rgba(255, 212, 0, 0.6)",
                "0 0 80px rgba(147, 51, 234, 0.6)",
                "0 0 40px rgba(255, 212, 0, 0.6)",
              ],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            className="bg-slate-700 rounded-xl border-4 border-yellow-400 p-6 shadow-2xl"
          >
            <div className="w-32 h-48 flex flex-col items-center justify-center">
              <div className="text-6xl mb-3">{selectedCard.symbol}</div>
              <h3 className="text-white text-lg font-bold text-center">{selectedCard.name}</h3>
            </div>
          </motion.div>

          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">Your Destiny Card</h3>
            <p className="text-white/80 text-lg italic mb-4">"{selectedCard.shortMeaning}"</p>
            {userData.question && (
              <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30">
                <p className="text-white/70 text-sm mb-2">Your question to the universe:</p>
                <p className="text-white italic">"{userData.question}"</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Reading Sections */}
      <div className="space-y-6">
        {/* Current Life */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/80 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/10"
        >
          <div className="flex items-center mb-4">
            <Heart className="w-6 h-6 text-red-400 mr-3" />
            <h3 className="text-xl font-bold text-white">Your Current Life Chapter</h3>
          </div>
          <p className="text-white/80 leading-relaxed">{reading.currentLife}</p>
        </motion.div>

        {/* Near Future */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800/80 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/10"
        >
          <div className="flex items-center mb-4">
            <Star className="w-6 h-6 text-yellow-400 mr-3" />
            <h3 className="text-xl font-bold text-white">Your Near Future (Next 3-6 Months)</h3>
          </div>
          <p className="text-white/80 leading-relaxed">{reading.nearFuture}</p>
        </motion.div>

        {/* Opportunities & Challenges */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-6 shadow-xl border border-green-500/30"
          >
            <div className="flex items-center mb-4">
              <Zap className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Opportunities</h3>
            </div>
            <p className="text-white/80 leading-relaxed">{reading.opportunities}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-xl p-6 shadow-xl border border-orange-500/30"
          >
            <div className="flex items-center mb-4">
              <Star className="w-6 h-6 text-orange-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Challenges to Navigate</h3>
            </div>
            <p className="text-white/80 leading-relaxed">{reading.challenges}</p>
          </motion.div>
        </div>

        {/* Wisdom */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl p-8 shadow-xl border border-purple-500/30 text-center"
        >
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">Psychic Wisdom for Your Journey</h3>
          <p className="text-white text-lg leading-relaxed italic mb-6">"{reading.wisdom}"</p>

          {userData.question && (
            <div className="bg-white/10 rounded-lg p-4 mb-6">
              <p className="text-yellow-400 font-semibold mb-2">The {selectedCard.name} answers your question:</p>
              <p className="text-white/90">
                The universe has heard your question and responds through this card. The guidance above contains the
                symbolic answer you seek. Trust your intuition to decode the message meant specifically for you.
              </p>
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="bg-slate-800/90 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-yellow-400/30 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Want to Go Deeper?</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            This single card reading has revealed powerful insights, but imagine what a full 3-card spread could unveil
            about your past, present, and future. Connect with a professional clairvoyant for an even deeper dive into
            your destiny.
          </p>

          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="mr-2">🔮</span>
            Get Your Full 3-Card Psychic Reading
            <ExternalLink className="w-5 h-5 ml-2" />
          </motion.a>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-center py-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-yellow-400"></div>
            <span className="mx-4 text-yellow-400 text-xl">✨</span>
            <div className="w-16 h-px bg-gradient-to-r from-yellow-400 to-transparent"></div>
          </div>
          <p className="text-white/60">
            Reading powered by <span className="text-yellow-400 font-semibold">www.quizzastrology.com</span>
          </p>
          <p className="text-white/40 text-sm mt-2">May the stars guide your path to happiness and fulfillment ⭐</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default FullResult
