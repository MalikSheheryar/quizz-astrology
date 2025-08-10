"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Flame, Mountain, Star } from "lucide-react"

interface QuizEngineProps {
  onComplete: (answers: any[]) => void
}

const QuizEngine = ({ onComplete }: QuizEngineProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null)

  const questions = [
    {
      id: 1,
      type: "visual",
      question: "Which couple's vibe feels most like your dream relationship?",
      options: [
        {
          text: "Passionate adventures and spontaneous getaways",
          icon: Flame,
          scores: { aries: 3, leo: 2, sagittarius: 3 },
        },
        { text: "Cozy nights in with deep conversations", icon: Heart, scores: { cancer: 3, scorpio: 2, pisces: 3 } },
        {
          text: "Intellectual debates and cultural experiences",
          icon: Star,
          scores: { gemini: 3, libra: 2, aquarius: 3 },
        },
        { text: "Building a stable future together", icon: Mountain, scores: { taurus: 3, virgo: 2, capricorn: 3 } },
      ],
    },
    {
      id: 2,
      type: "symbol",
      question: "Choose the symbol that attracts your soul",
      options: [
        { text: "💎 Diamond - Eternal and unbreakable", scores: { taurus: 2, leo: 3, capricorn: 2 } },
        { text: "🌊 Ocean - Deep and mysterious", scores: { cancer: 3, scorpio: 3, pisces: 2 } },
        { text: "🔥 Fire - Passionate and transformative", scores: { aries: 3, leo: 2, sagittarius: 3 } },
        { text: "🌌 Galaxy - Infinite and inspiring", scores: { gemini: 2, aquarius: 3, pisces: 2 } },
      ],
    },
    {
      id: 3,
      type: "emotional",
      question: "How do you feel when someone disagrees with you deeply?",
      options: [
        { text: "I get fired up and want to debate it out", scores: { aries: 3, leo: 2, scorpio: 2 } },
        { text: "I try to find common ground and compromise", scores: { libra: 3, pisces: 2, cancer: 2 } },
        { text: "I need time alone to process my feelings", scores: { virgo: 2, capricorn: 2, scorpio: 3 } },
        { text: "I'm curious about their perspective", scores: { gemini: 3, aquarius: 3, sagittarius: 2 } },
      ],
    },
    {
      id: 4,
      type: "elemental",
      question: "You're most drawn to people who feel like...",
      options: [
        { text: "🔥 Fire - Electric energy that ignites your passion", scores: { aries: 3, leo: 3, sagittarius: 3 } },
        {
          text: "🌍 Earth - Grounding presence that makes you feel safe",
          scores: { taurus: 3, virgo: 3, capricorn: 3 },
        },
        {
          text: "🌬️ Air - Intellectual stimulation that expands your mind",
          scores: { gemini: 3, libra: 3, aquarius: 3 },
        },
        { text: "💧 Water - Emotional depth that touches your soul", scores: { cancer: 3, scorpio: 3, pisces: 3 } },
      ],
    },
    {
      id: 5,
      type: "scenario",
      question: "Your ideal first date would be...",
      options: [
        { text: "Rock climbing or an adventure sport", scores: { aries: 3, sagittarius: 2, leo: 1 } },
        { text: "A wine tasting at a beautiful vineyard", scores: { taurus: 3, libra: 2, cancer: 1 } },
        { text: "A stimulating art gallery opening", scores: { gemini: 2, aquarius: 3, libra: 2 } },
        { text: "Stargazing on a quiet beach", scores: { pisces: 3, cancer: 2, scorpio: 2 } },
      ],
    },
    {
      id: 6,
      type: "intuitive",
      question: "When you walk into a room, you're drawn to the person who...",
      options: [
        { text: "Commands attention with their confident presence", scores: { leo: 3, aries: 2, capricorn: 1 } },
        { text: "Has a mysterious, magnetic aura", scores: { scorpio: 3, pisces: 2, cancer: 1 } },
        { text: "Is engaged in fascinating conversation", scores: { gemini: 3, aquarius: 2, libra: 2 } },
        { text: "Radiates warmth and kindness", scores: { cancer: 3, taurus: 2, virgo: 2 } },
      ],
    },
    {
      id: 7,
      type: "cosmic",
      question: "If your love story was written in the stars, which plot would it follow?",
      options: [
        { text: "Epic adventure across galaxies", scores: { sagittarius: 3, aries: 2, aquarius: 1 } },
        { text: "Destined souls finding each other across lifetimes", scores: { scorpio: 3, pisces: 3, cancer: 2 } },
        { text: "Two minds creating a beautiful new world", scores: { aquarius: 3, gemini: 2, libra: 2 } },
        { text: "Growing together like intertwined trees", scores: { taurus: 3, virgo: 2, capricorn: 2 } },
      ],
    },
    {
      id: 8,
      type: "emotional",
      question: "What makes you feel most loved?",
      options: [
        { text: "Grand romantic gestures and surprises", scores: { leo: 3, aries: 2, libra: 1 } },
        { text: "Consistent daily acts of care", scores: { virgo: 3, taurus: 3, cancer: 2 } },
        { text: "Deep emotional understanding without words", scores: { scorpio: 3, pisces: 3, cancer: 2 } },
        { text: "Intellectual connection and shared dreams", scores: { aquarius: 3, gemini: 2, sagittarius: 1 } },
      ],
    },
    {
      id: 9,
      type: "lifestyle",
      question: "Your ideal weekend together involves...",
      options: [
        { text: "Exploring a new city or trying extreme sports", scores: { aries: 3, sagittarius: 3, gemini: 1 } },
        { text: "Cooking together and hosting friends", scores: { taurus: 2, cancer: 3, libra: 2 } },
        { text: "Attending cultural events and deep discussions", scores: { aquarius: 3, libra: 2, virgo: 1 } },
        { text: "Quiet intimacy and spiritual connection", scores: { pisces: 3, scorpio: 3, cancer: 2 } },
      ],
    },
    {
      id: 10,
      type: "values",
      question: "In a relationship, what matters most to you?",
      options: [
        { text: "Passion and excitement that never fades", scores: { aries: 3, leo: 2, scorpio: 2 } },
        { text: "Loyalty and unwavering commitment", scores: { taurus: 3, cancer: 3, capricorn: 2 } },
        { text: "Mental stimulation and growth together", scores: { gemini: 3, aquarius: 3, virgo: 1 } },
        { text: "Emotional depth and spiritual connection", scores: { scorpio: 3, pisces: 3, cancer: 2 } },
      ],
    },
  ]

  const handleAnswerSelect = (option: any) => {
    setSelectedAnswer(option)
  }

  const handleNext = () => {
    if (selectedAnswer) {
      const newAnswers = [...answers, { questionId: questions[currentQuestion].id, ...selectedAnswer }]
      setAnswers(newAnswers)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        onComplete(newAnswers)
      }
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="max-w-3xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-slate-800 bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-500/20"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/70 text-sm">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-white/70 text-sm">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-8 text-center leading-relaxed">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-4 mb-8">
              {questions[currentQuestion].options.map((option, index) => {
                const IconComponent = option.icon
                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedAnswer === option
                        ? "border-purple-400 bg-purple-500/20 shadow-lg"
                        : "border-slate-600 bg-slate-700/30 hover:border-purple-400/50 hover:bg-purple-500/10"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {IconComponent && <IconComponent className="text-purple-400 w-6 h-6" />}
                      <span className="text-white text-lg">{option.text}</span>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={!selectedAnswer}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                selectedAnswer
                  ? "bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white shadow-lg hover:shadow-xl"
                  : "bg-slate-600 text-slate-400 cursor-not-allowed"
              }`}
            >
              {currentQuestion === questions.length - 1 ? "Reveal My Soulmate ✨" : "Next Question →"}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default QuizEngine
