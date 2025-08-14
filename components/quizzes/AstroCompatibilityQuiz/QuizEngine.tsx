"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Star } from "lucide-react"

const QuizEngine = ({ onComplete, userData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})

  const questions = [
    {
      id: 1,
      type: "zodiac-pair",
      question: "Choose the zodiac pair that feels most like your energy together:",
      options: [
        { value: "fire-air", label: "🔥 Fire & Air - Passionate & Free", signs: "Leo & Gemini" },
        { value: "earth-water", label: "🌍 Earth & Water - Grounded & Deep", signs: "Taurus & Cancer" },
        { value: "fire-fire", label: "⚡ Fire & Fire - Intense & Dynamic", signs: "Aries & Sagittarius" },
        { value: "water-water", label: "🌊 Water & Water - Intuitive & Emotional", signs: "Pisces & Scorpio" },
      ],
    },
    {
      id: 2,
      type: "connection",
      question: "When you're apart, how does your energy feel?",
      options: [
        { value: "lost", label: "Lost without them" },
        { value: "connected", label: "Independent but connected" },
        { value: "pull", label: "Constant magnetic pull" },
        { value: "peaceful", label: "Peaceful and trusting" },
      ],
    },
    {
      id: 3,
      type: "love-language",
      question: "What's your dominant love language vs. theirs?",
      options: [
        { value: "touch-words", label: "💝 Touch & Words of Affirmation" },
        { value: "time-acts", label: "⏰ Quality Time & Acts of Service" },
        { value: "gifts-touch", label: "🎁 Gifts & Physical Touch" },
        { value: "words-time", label: "💬 Words & Quality Time" },
      ],
    },
    {
      id: 4,
      type: "symbol",
      question: "Pick the symbol that resonates with your bond:",
      options: [
        { value: "sun-moon", label: "☀️🌙 Sun & Moon - Complementary Forces" },
        { value: "stars", label: "⭐ Twin Stars - Equal Brilliance" },
        { value: "ocean", label: "🌊 Ocean Waves - Flowing Together" },
        { value: "fire", label: "🔥 Sacred Fire - Passionate Unity" },
      ],
    },
    {
      id: 5,
      type: "energy-match",
      question: "Who's the sun and who's the moon in your connection?",
      options: [
        { value: "you-sun", label: "You're the Sun, they're the Moon" },
        { value: "they-sun", label: "They're the Sun, you're the Moon" },
        { value: "both-sun", label: "You're both blazing Suns" },
        { value: "both-moon", label: "You're both mystical Moons" },
      ],
    },
    {
      id: 6,
      type: "intuition",
      question: "When your partner is upset, how quickly do you feel it?",
      options: [
        { value: "instant", label: "Instantly, like a psychic connection" },
        { value: "minutes", label: "Within minutes of being together" },
        { value: "conversation", label: "When we start talking" },
        { value: "told", label: "When they tell me directly" },
      ],
    },
    {
      id: 7,
      type: "soul-connection",
      question: "Do you feel your connection existed before this lifetime?",
      options: [
        { value: "definitely", label: "Absolutely - we're soulmates" },
        { value: "probably", label: "Probably - it feels ancient" },
        { value: "maybe", label: "Maybe - there's something familiar" },
        { value: "unsure", label: "Unsure - focused on this life" },
      ],
    },
    {
      id: 8,
      type: "communication",
      question: "When you argue, what do you both tend to do?",
      options: [
        { value: "passionate", label: "🔥 Get passionate then resolve quickly" },
        { value: "space", label: "🌙 Take space then come back stronger" },
        { value: "talk", label: "💬 Talk it through immediately" },
        { value: "emotional", label: "💧 Get emotional but stay connected" },
      ],
    },
  ]

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswerSelect = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onComplete(newAnswers)
    }
  }

  const getQuestionIcon = (type) => {
    const icons = {
      "zodiac-pair": "♈",
      connection: "💫",
      "love-language": "💝",
      symbol: "🔮",
      "energy-match": "☯️",
      intuition: "🧿",
      "soul-connection": "🌌",
      communication: "💬",
    }
    return icons[type] || "⭐"
  }

  const currentQ = questions[currentQuestion]

  return (
    <motion.div
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Progress Bar */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/80 text-sm">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-white/80 text-sm">{Math.round(progressPercentage)}% Complete</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 to-orange-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Question Card */}
      <motion.div
        className="bg-slate-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/10"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {/* Question Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-6xl mb-4">{getQuestionIcon(currentQ.type)}</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{currentQ.question}</h2>
        </motion.div>

        {/* Options */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={`${currentQ.id}-${option.value}`}
                onClick={() => handleAnswerSelect(currentQ.id, option.value)}
                className="w-full p-6 bg-slate-700/50 hover:bg-slate-600/60 border border-white/10 hover:border-white/30 rounded-2xl text-left transition-all duration-300 group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-white font-semibold text-lg mb-1">{option.label}</div>
                    {option.signs && <div className="text-white/60 text-sm">{option.signs}</div>}
                  </div>
                  <ChevronRight className="text-white/40 group-hover:text-white/80 transition-colors ml-4" size={24} />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="flex justify-center mt-8 space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            >
              <Star className="text-yellow-300" size={12} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default QuizEngine
