"use client"
import { motion } from "framer-motion"
import { Eye, Heart, Ear, Brain, Star, ExternalLink } from "lucide-react"

const FullResult = ({ userData, results }) => {
  const psychicTypes = {
    clairvoyant: {
      title: "Natural Clairvoyant",
      icon: Eye,
      description:
        "You possess the gift of clear seeing - visions, prophetic dreams, and visual intuition guide your path.",
      color: "from-purple-500 to-blue-500",
      traits: ["Prophetic dreams", "Visual intuition", "Aura perception", "Future glimpses"],
      development: [
        "Practice meditation with candles or crystals",
        "Keep a dream journal by your bedside",
        "Trust the images that flash in your mind",
        "Spend time in nature to enhance your visions",
      ],
      affirmation: "My third eye is open and I trust the visions that guide me to truth.",
    },
    clairsentient: {
      title: "Empathic Intuitive",
      icon: Heart,
      description: "You feel the emotions and energies around you deeply - your heart is your compass to truth.",
      color: "from-pink-500 to-red-500",
      traits: ["Emotional sensitivity", "Energy reading", "Healing presence", "Intuitive knowing"],
      development: [
        "Practice grounding exercises daily",
        "Learn to distinguish your emotions from others",
        "Use protective visualization techniques",
        "Develop healthy energetic boundaries",
      ],
      affirmation: "I trust my heart's wisdom and use my sensitivity as a gift to help others.",
    },
    clairaudient: {
      title: "Divine Messenger",
      icon: Ear,
      description:
        "You hear the whispers of the universe - inner voices, spirit guides, and divine messages reach you.",
      color: "from-blue-500 to-cyan-500",
      traits: ["Inner voice guidance", "Spirit communication", "Musical intuition", "Sound sensitivity"],
      development: [
        "Practice quiet meditation to hear your inner voice",
        "Pay attention to songs that play at meaningful moments",
        "Trust the first words that come to mind",
        "Create a sacred space for spiritual communication",
      ],
      affirmation: "I am open to receiving divine messages and trust the guidance I hear within.",
    },
    claircognizant: {
      title: "Wise Knowing Soul",
      icon: Brain,
      description:
        "You simply know things without explanation - divine downloads and instant understanding flow to you.",
      color: "from-yellow-500 to-orange-500",
      traits: ["Instant knowing", "Divine downloads", "Pattern recognition", "Wisdom beyond years"],
      development: [
        "Trust your first instincts without questioning",
        "Write down sudden insights and inspirations",
        "Practice automatic writing or journaling",
        "Honor your inner knowing even when others doubt",
      ],
      affirmation: "I trust the divine wisdom that flows through me and honor my inner knowing.",
    },
  }

  const getResultLevel = (scores) => {
    const maxScore = Math.max(...Object.values(scores))
    const totalPossible = 40
    const percentage = (maxScore / totalPossible) * 100

    if (percentage >= 70) return "Highly Developed"
    if (percentage >= 50) return "Naturally Gifted"
    if (percentage >= 30) return "Emerging Abilities"
    return "Awakening Potential"
  }

  const currentType = psychicTypes[results.dominantType] || psychicTypes.clairvoyant
  const IconComponent = currentType.icon
  const resultLevel = getResultLevel(results.scores)

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-500/30">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Your Personal Clairvoyant Profile</h1>
          <p className="text-purple-200">
            Generated for {userData.fullName} • {new Date(userData.dateOfBirth).toLocaleDateString()}
          </p>
        </div>

        {/* Main Result */}
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`w-16 h-16 bg-gradient-to-br ${currentType.color} rounded-full flex items-center justify-center`}
            >
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{currentType.title}</h2>
              <p className="text-purple-200">Development Level: {resultLevel}</p>
            </div>
          </div>
          <p className="text-white text-lg leading-relaxed">{currentType.description}</p>
        </div>

        {/* Psychic Abilities Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Your Psychic Traits
            </h3>
            <ul className="space-y-2">
              {currentType.traits.map((trait, index) => (
                <li key={index} className="text-purple-200 flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                  {trait}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Ability Scores</h3>
            {Object.entries(results.scores).map(([type, score]) => (
              <div key={type} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-purple-200 capitalize">{type.replace("clair", "Clair")}</span>
                  <span className="text-yellow-400">{score}/10</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${type === results.dominantType ? "bg-gradient-to-r from-pink-500 to-orange-500" : "bg-purple-400"}`}
                    style={{ width: `${(score / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Development Guide */}
        <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-2xl p-6 mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">How to Develop Your Gifts</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {currentType.development.map((tip, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-black font-bold text-sm">{index + 1}</span>
                </div>
                <p className="text-white">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Affirmation */}
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-6 mb-8 text-center">
          <h3 className="text-xl font-bold text-white mb-4">Your Personal Affirmation</h3>
          <p className="text-lg text-purple-100 italic leading-relaxed">"{currentType.affirmation}"</p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ExternalLink className="w-5 h-5" />
            Book Your Personal Psychic Reading
          </motion.a>
          <p className="text-purple-200 text-sm mt-4">Unlock deeper insights with a live spiritual advisor</p>
        </div>
      </div>
    </motion.div>
  )
}

export default FullResult
