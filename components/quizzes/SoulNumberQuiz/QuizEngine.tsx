"use client"
import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft } from "lucide-react"

interface QuizEngineProps {
  userData: any
  soulNumber: number | null
  onComplete: (answers: any) => void
}

const QuizEngine: React.FC<QuizEngineProps> = ({ userData, soulNumber, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any>({})

  const questions = [
    {
      id: 1,
      type: "multiple",
      question: "What motivates your deepest decisions?",
      options: [
        { value: "intuition", label: "Pure intuition and inner knowing", icon: "🔮" },
        { value: "logic", label: "Careful analysis and logic", icon: "🧠" },
        { value: "heart", label: "What feels right in my heart", icon: "❤️" },
        { value: "purpose", label: "My higher purpose and calling", icon: "✨" },
      ],
    },
    {
      id: 2,
      type: "symbol",
      question: "Pick the symbol that calls to your soul:",
      options: [
        { value: "triangle", label: "Sacred Triangle", icon: "🔺" },
        { value: "crystal", label: "Crystal Ball", icon: "🔮" },
        { value: "spiral", label: "Cosmic Spiral", icon: "🌀" },
        { value: "moon", label: "Crescent Moon", icon: "🌙" },
        { value: "fire", label: "Sacred Fire", icon: "🔥" },
        { value: "tree", label: "Tree of Life", icon: "🌱" },
      ],
    },
    {
      id: 3,
      type: "multiple",
      question: "In moments of confusion, what guides you?",
      options: [
        { value: "meditation", label: "Meditation and stillness", icon: "🧘" },
        { value: "nature", label: "Connection with nature", icon: "🌿" },
        { value: "wisdom", label: "Ancient wisdom and teachings", icon: "📜" },
        { value: "dreams", label: "Dreams and visions", icon: "💭" },
      ],
    },
    {
      id: 4,
      type: "multiple",
      question: "Which spiritual truth resonates most deeply?",
      options: [
        { value: "oneness", label: "We are all connected as one", icon: "🌐" },
        { value: "growth", label: "Life is about constant growth", icon: "📈" },
        { value: "love", label: "Love is the highest frequency", icon: "💖" },
        { value: "wisdom", label: "Wisdom comes through experience", icon: "🦉" },
      ],
    },
    {
      id: 5,
      type: "number",
      question: "Which number makes you feel most aligned?",
      options: [
        { value: "1", label: "1 - Leadership", icon: "1️⃣" },
        { value: "3", label: "3 - Creativity", icon: "3️⃣" },
        { value: "7", label: "7 - Spirituality", icon: "7️⃣" },
        { value: "9", label: "9 - Completion", icon: "9️⃣" },
      ],
    },
    {
      id: 6,
      type: "multiple",
      question: "Your ideal way to spend a weekend?",
      options: [
        { value: "solitude", label: "In peaceful solitude", icon: "🏔️" },
        { value: "learning", label: "Learning something mystical", icon: "📚" },
        { value: "creating", label: "Creating something beautiful", icon: "🎨" },
        { value: "helping", label: "Helping others grow", icon: "🤝" },
      ],
    },
    {
      id: 7,
      type: "multiple",
      question: "What draws you to numerology?",
      options: [
        { value: "patterns", label: "The hidden patterns in life", icon: "🔍" },
        { value: "destiny", label: "Understanding my destiny", icon: "⭐" },
        { value: "self", label: "Deeper self-knowledge", icon: "🪞" },
        { value: "universe", label: "Connection to the universe", icon: "🌌" },
      ],
    },
    {
      id: 8,
      type: "multiple",
      question: "Your greatest strength is:",
      options: [
        { value: "intuition", label: "Powerful intuition", icon: "👁️" },
        { value: "compassion", label: "Deep compassion", icon: "💝" },
        { value: "wisdom", label: "Natural wisdom", icon: "🔱" },
        { value: "creativity", label: "Boundless creativity", icon: "🌈" },
      ],
    },
  ]

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prev: any) => ({ ...prev, [questionId]: answer }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      onComplete(answers)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-slate-800/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white/70 font-body">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-white/70 font-body">Soul Number: {soulNumber}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-red-400 to-orange-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center font-heading">
              {currentQ.question}
            </h2>

            <div
              className={`grid gap-4 ${
                currentQ.type === "symbol" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
              }`}
            >
              {currentQ.options.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswer(currentQ.id, option.value)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 font-body ${
                    answers[currentQ.id] === option.value
                      ? "border-yellow-400 bg-yellow-400/20 text-white"
                      : "border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10"
                  }`}
                >
                  <div className="text-3xl mb-2">{option.icon}</div>
                  <div className="font-medium">{option.label}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <motion.button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center px-6 py-3 bg-white/10 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-all duration-300 font-body"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </motion.button>

          <motion.button
            onClick={nextQuestion}
            disabled={!answers[currentQ.id]}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-red-400 to-orange-400 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 font-body"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
            <ChevronRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default QuizEngine
