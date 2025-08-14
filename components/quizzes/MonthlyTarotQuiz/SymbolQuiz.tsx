"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

const SymbolQuiz = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})

  const questions = [
    {
      id: "energy_symbol",
      question: "Pick the symbol that reflects your current energy",
      type: "symbol",
      options: [
        { symbol: "🌕", label: "Full Moon", value: "fullmoon", meaning: "completion" },
        { symbol: "🔥", label: "Fire", value: "fire", meaning: "passion" },
        { symbol: "🌀", label: "Spiral", value: "spiral", meaning: "transformation" },
        { symbol: "💎", label: "Diamond", value: "diamond", meaning: "clarity" },
        { symbol: "🌲", label: "Tree", value: "tree", meaning: "growth" },
        { symbol: "🌊", label: "Wave", value: "wave", meaning: "flow" },
        { symbol: "🌙", label: "Crescent", value: "crescent", meaning: "intuition" },
        { symbol: "🪞", label: "Mirror", value: "mirror", meaning: "reflection" },
      ],
    },
    {
      id: "color_vibration",
      question: "What color are you drawn to today?",
      type: "color",
      options: [
        { color: "#FFD700", label: "Gold", value: "gold", meaning: "abundance" },
        { color: "#1a1a1a", label: "Black", value: "black", meaning: "mystery" },
        { color: "#4B0082", label: "Indigo", value: "indigo", meaning: "wisdom" },
        { color: "#50C878", label: "Emerald", value: "emerald", meaning: "healing" },
        { color: "#E0115F", label: "Ruby", value: "ruby", meaning: "passion" },
        { color: "#C0C0C0", label: "Silver", value: "silver", meaning: "intuition" },
      ],
    },
    {
      id: "monthly_theme",
      question: "What's your hidden theme for this month?",
      type: "theme",
      options: [
        { label: "Growth", value: "growth", icon: "🌱" },
        { label: "Rebirth", value: "rebirth", icon: "🦋" },
        { label: "Mystery", value: "mystery", icon: "🔮" },
        { label: "Truth", value: "truth", icon: "🗝️" },
        { label: "Change", value: "change", icon: "⚡" },
        { label: "Manifestation", value: "manifestation", icon: "✨" },
      ],
    },
    {
      id: "energy_need",
      question: "What do you need more of this month?",
      type: "need",
      options: [
        { label: "Courage", value: "courage", icon: "🦁" },
        { label: "Rest", value: "rest", icon: "🌙" },
        { label: "Focus", value: "focus", icon: "🎯" },
        { label: "Love", value: "love", icon: "💖" },
        { label: "Alignment", value: "alignment", icon: "⚖️" },
        { label: "Guidance", value: "guidance", icon: "🧭" },
      ],
    },
    {
      id: "inner_world",
      question: "Choose the image that mirrors your inner world",
      type: "image",
      options: [
        {
          image: "/placeholder.svg?height=200&width=300&text=Clouds",
          label: "Clouds",
          value: "clouds",
        },
        {
          image: "/placeholder.svg?height=200&width=300&text=Keys",
          label: "Keys",
          value: "keys",
        },
        {
          image: "/placeholder.svg?height=200&width=300&text=Eyes",
          label: "Eyes",
          value: "eyes",
        },
        {
          image: "/placeholder.svg?height=200&width=300&text=Mountains",
          label: "Mountains",
          value: "mountains",
        },
        {
          image: "/placeholder.svg?height=200&width=300&text=Rivers",
          label: "Rivers",
          value: "rivers",
        },
        {
          image: "/placeholder.svg?height=200&width=300&text=Light+Tunnel",
          label: "Light Tunnel",
          value: "tunnel",
        },
      ],
    },
  ]

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 500)
    } else {
      setTimeout(() => {
        onComplete(newAnswers)
      }, 500)
    }
  }

  const question = questions[currentQuestion]

  return (
    <div className="max-w-4xl mx-auto px-6">
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
        className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-500/20"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-purple-300 text-sm">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{question.question}</h3>
          <p className="text-purple-200">Trust your intuition and choose what calls to you</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {question.options.map((option, index) => (
            <motion.button
              key={option.value}
              onClick={() => handleAnswer(question.id, option)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative p-6 bg-slate-700/50 hover:bg-slate-600/50 border border-purple-400/30 hover:border-yellow-400/50 rounded-2xl transition-all duration-300 cursor-pointer"
            >
              {question.type === "symbol" && (
                <>
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{option.symbol}</div>
                  <div className="text-white font-medium">{option.label}</div>
                </>
              )}

              {question.type === "color" && (
                <>
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-3 border-4 border-white/20 group-hover:border-white/40 transition-all"
                    style={{ backgroundColor: option.color }}
                  />
                  <div className="text-white font-medium">{option.label}</div>
                </>
              )}

              {(question.type === "theme" || question.type === "need") && (
                <>
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{option.icon}</div>
                  <div className="text-white font-medium">{option.label}</div>
                </>
              )}

              {question.type === "image" && (
                <>
                  <div className="relative overflow-hidden rounded-xl mb-3">
                    <img
                      src={option.image || "/placeholder.svg"}
                      alt={option.label}
                      className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="text-white font-medium">{option.label}</div>
                </>
              )}

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/0 to-orange-500/0 group-hover:from-yellow-400/10 group-hover:to-orange-500/10 transition-all duration-300" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default SymbolQuiz
