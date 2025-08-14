"use client"
import { motion } from "framer-motion"
import { Heart, Sparkles, Eye, Zap, Star, Moon, Sun } from "lucide-react"

const FullResult = ({ coupleData, results }) => {
  const getDetailedResult = (type) => {
    switch (type) {
      case "pastLife":
        return {
          title: "Past Life Lovers",
          icon: <Heart className="w-8 h-8" />,
          description:
            "Your souls have traveled through time to find each other again. This connection spans multiple lifetimes, each one deepening your bond and understanding.",
          journey:
            "You may have been lovers in ancient Egypt, companions in medieval times, or star-crossed souls in different eras. Each lifetime taught you lessons about love, loss, and reunion.",
          purpose:
            "To heal old wounds, complete unfinished love stories, and experience the full spectrum of divine love across time and space.",
          growth:
            "Learning to love without attachment, understanding the eternal nature of true connection, and releasing karmic patterns that no longer serve.",
          signs: [
            "Instant recognition upon first meeting",
            "Shared dreams or visions of other times",
            "Unexplained knowledge about each other",
            "Feeling 'home' in their presence",
          ],
          affirmation:
            "Our love transcends time, space, and physical form. We are eternal companions on this sacred journey.",
        }
      case "soulContract":
        return {
          title: "Soul Contract Companions",
          icon: <Zap className="w-8 h-8" />,
          description:
            "Before incarnating, your souls made a sacred agreement to support each other's highest evolution and spiritual growth in this lifetime.",
          journey:
            "You chose each other as perfect mirrors and catalysts for growth. This relationship was planned in the spirit realm to help both souls evolve.",
          purpose:
            "To fulfill specific lessons, heal generational patterns, and support each other's soul mission and life purpose.",
          growth:
            "Developing unconditional love, learning to see the divine in each other, and supporting mutual spiritual evolution.",
          signs: [
            "Meeting at pivotal life moments",
            "Immediate sense of purpose together",
            "Complementary strengths and weaknesses",
            "Shared spiritual interests or awakening",
          ],
          affirmation:
            "We are divine partners, perfectly matched to support each other's highest good and spiritual evolution.",
        }
      case "karmicMirror":
        return {
          title: "Karmic Mirror Connection",
          icon: <Eye className="w-8 h-8" />,
          description:
            "You reflect each other's deepest patterns, wounds, and lessons. This relationship serves as a powerful mirror for healing and transformation.",
          journey:
            "Through conflict and resolution, you help each other see hidden aspects of yourselves and heal ancient wounds carried from past experiences.",
          purpose:
            "To heal karmic patterns, release old wounds, and transform limiting beliefs through the power of conscious relationship.",
          growth:
            "Learning to see triggers as gifts, developing emotional mastery, and transforming pain into wisdom and compassion.",
          signs: [
            "Intense emotional reactions to each other",
            "Repeated patterns or conflicts",
            "Feeling triggered yet drawn to each other",
            "Profound healing through the relationship",
          ],
          affirmation:
            "We are perfect mirrors, reflecting back to each other exactly what we need to see for our healing and growth.",
        }
      case "twinFlame":
        return {
          title: "Twin Flame Energy",
          icon: <Sparkles className="w-8 h-8" />,
          description:
            "You are two aspects of the same soul, split into separate beings to experience love, separation, and ultimate reunion.",
          journey:
            "Your souls originated as one, split to experience duality, and now seek reunion while maintaining individual sovereignty.",
          purpose:
            "To experience the ultimate love story, heal the illusion of separation, and create something greater than the sum of your parts.",
          growth:
            "Balancing unity and individuality, healing the masculine and feminine within, and embodying unconditional love.",
          signs: [
            "Telepathic connection",
            "Synchronized life events",
            "Intense magnetic attraction",
            "Feeling complete yet challenged by each other",
          ],
          affirmation:
            "We are one soul in two bodies, experiencing the sacred dance of separation and union, individuality and oneness.",
        }
      case "spiritualTeacher":
        return {
          title: "Spiritual Teacher Bond",
          icon: <Star className="w-8 h-8" />,
          description:
            "One of you serves as a spiritual catalyst for the other, bringing profound awakening, wisdom, and transformation.",
          journey:
            "This relationship awakens dormant spiritual gifts, expands consciousness, and accelerates spiritual evolution for one or both partners.",
          purpose:
            "To facilitate spiritual awakening, share ancient wisdom, and guide each other toward higher consciousness and purpose.",
          growth:
            "Developing spiritual gifts, expanding consciousness, and learning to serve as vessels for divine love and wisdom.",
          signs: [
            "Spiritual awakening after meeting",
            "One partner seems 'older' spiritually",
            "Profound insights shared together",
            "Accelerated personal growth",
          ],
          affirmation:
            "We are student and teacher, guide and seeker, supporting each other's journey toward enlightenment and service.",
        }
      default:
        return {
          title: "Sacred Connection",
          icon: <Heart className="w-8 h-8" />,
          description: "Your connection transcends ordinary love, touching the realm of the divine and sacred.",
          journey: "Your souls have found each other to experience profound love and spiritual connection.",
          purpose: "To love deeply, grow spiritually, and support each other's highest evolution.",
          growth: "Learning to love unconditionally and see the divine in each other.",
          signs: ["Deep spiritual connection", "Mutual growth and support", "Sense of sacred purpose together"],
          affirmation: "Our love is sacred, our connection divine, our journey together blessed.",
        }
    }
  }

  const result = getDetailedResult(results.primary)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full mb-6">
          <div className="text-white">{result.icon}</div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Your Sacred Soul Reading</h1>
        <div className="text-xl text-gray-300">
          {coupleData.userName} & {coupleData.partnerName}
        </div>
        <div className="text-gray-400 mt-2">
          Born {formatDate(coupleData.userBirth)} & {formatDate(coupleData.partnerBirth)}
        </div>
      </motion.div>

      {/* Main Result */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-slate-800 bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-yellow-300/20 mb-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 to-purple-400 bg-clip-text text-transparent mb-4">
            {result.title}
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">{result.description}</p>
        </div>

        {/* Connection Intensity */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Soul Connection Intensity</h3>
          <div className="flex items-center justify-center space-x-2">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + i * 0.05, duration: 0.3 }}
                className={`w-3 h-8 rounded-full ${
                  i < Math.ceil(results.intensity / 10) ? "bg-gradient-to-t from-pink-500 to-orange-400" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
          <p className="text-yellow-300 font-semibold mt-2">{results.intensity}% Intensity</p>
        </div>
      </motion.div>

      {/* Detailed Sections */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-slate-800 bg-opacity-90 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/20"
        >
          <div className="flex items-center mb-4">
            <Moon className="w-6 h-6 text-yellow-300 mr-3" />
            <h3 className="text-xl font-bold text-white">Your Soul Journey</h3>
          </div>
          <p className="text-gray-300 leading-relaxed">{result.journey}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-slate-800 bg-opacity-90 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/20"
        >
          <div className="flex items-center mb-4">
            <Sun className="w-6 h-6 text-yellow-300 mr-3" />
            <h3 className="text-xl font-bold text-white">Sacred Purpose</h3>
          </div>
          <p className="text-gray-300 leading-relaxed">{result.purpose}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="bg-slate-800 bg-opacity-90 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/20 mb-8"
      >
        <div className="flex items-center mb-4">
          <Sparkles className="w-6 h-6 text-yellow-300 mr-3" />
          <h3 className="text-xl font-bold text-white">Spiritual Growth & Lessons</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">{result.growth}</p>
      </motion.div>

      {/* Signs to Watch For */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="bg-slate-800 bg-opacity-90 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/20 mb-8"
      >
        <div className="flex items-center mb-4">
          <Eye className="w-6 h-6 text-yellow-300 mr-3" />
          <h3 className="text-xl font-bold text-white">Signs & Synchronicities</h3>
        </div>
        <ul className="space-y-2">
          {result.signs.map((sign, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
              className="flex items-center text-gray-300"
            >
              <Star className="w-4 h-4 text-yellow-300 mr-3 flex-shrink-0" />
              {sign}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Affirmation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="bg-gradient-to-r from-pink-500/20 to-orange-400/20 backdrop-blur-sm rounded-2xl p-8 border border-yellow-300/30 text-center mb-8"
      >
        <h3 className="text-2xl font-bold text-white mb-4">Sacred Affirmation</h3>
        <p className="text-xl text-gray-200 italic leading-relaxed">"{result.affirmation}"</p>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <Heart className="w-6 h-6 text-yellow-300 mr-2" />
          <span className="text-xl font-bold text-white">QuizzAstrology.com</span>
          <Sparkles className="w-6 h-6 text-yellow-300 ml-2" />
        </div>
        <p className="text-gray-400 mb-6">May your sacred connection continue to bless and transform you both.</p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          🔗 Explore Couple's Past Life Regression
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default FullResult
