"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react"

interface QuizEngineProps {
  userData: any
  onComplete: (answers: any) => void
}

const QuizEngine: React.FC<QuizEngineProps> = ({ userData, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null)

  const questions = [
    {
      type: "image",
      question: "Which image represents your vision of wealth?",
      options: [
        { id: "luxury", text: "Luxury Home & Cars", emoji: "🏰", value: "luxury" },
        { id: "freedom", text: "Freedom & Travel", emoji: "✈️", value: "freedom" },
        { id: "family", text: "Family Abundance", emoji: "👨‍👩‍👧‍👦", value: "family" },
        { id: "peace", text: "Simple Peace", emoji: "🧘‍♀️", value: "peace" },
      ],
    },
    {
      type: "symbol",
      question: "Pick the symbol that matches your money energy",
      options: [
        { id: "crystal", text: "Crystal Ball", emoji: "🔮", value: "intuitive" },
        { id: "briefcase", text: "Briefcase", emoji: "💼", value: "business" },
        { id: "wave", text: "Ocean Wave", emoji: "🌊", value: "flowing" },
        { id: "mountain", text: "Mountain", emoji: "🏔️", value: "steady" },
        { id: "rocket", text: "Rocket", emoji: "🚀", value: "explosive" },
        { id: "coins", text: "Gold Coins", emoji: "💰", value: "traditional" },
      ],
    },
    {
      type: "scenario",
      question: "If you received $50,000 unexpectedly, what would you do first?",
      options: [
        { id: "invest", text: "Invest it immediately", value: "investor" },
        { id: "save", text: "Put it in savings", value: "saver" },
        { id: "spend", text: "Buy something I've wanted", value: "spender" },
        { id: "give", text: "Share with family/charity", value: "giver" },
        { id: "plan", text: "Make a detailed plan", value: "planner" },
      ],
    },
    {
      type: "intuition",
      question: "Choose a card that represents your current financial state",
      options: [
        { id: "locked", text: "Locked Vault", emoji: "🔒", value: "blocked" },
        { id: "flowing", text: "Overflowing Coins", emoji: "💰", value: "abundant" },
        { id: "growing", text: "Seeds Growing", emoji: "🌱", value: "growing" },
        { id: "storm", text: "Storm Clouds", emoji: "⛈️", value: "turbulent" },
      ],
    },
    {
      type: "number",
      question: "Which number do you feel drawn to today?",
      options: [
        { id: "1", text: "1 - Leadership", value: "1" },
        { id: "2", text: "2 - Partnership", value: "2" },
        { id: "3", text: "3 - Creativity", value: "3" },
        { id: "4", text: "4 - Stability", value: "4" },
        { id: "5", text: "5 - Freedom", value: "5" },
        { id: "6", text: "6 - Nurturing", value: "6" },
        { id: "7", text: "7 - Spirituality", value: "7" },
        { id: "8", text: "8 - Material Success", value: "8" },
        { id: "9", text: "9 - Completion", value: "9" },
      ],
    },
    {
      type: "feeling",
      question: "When you spend money, how do you usually feel?",
      options: [
        { id: "guilt", text: "Guilty", value: "guilt" },
        { id: "power", text: "Powerful", value: "power" },
        { id: "joy", text: "Joyful", value: "joy" },
        { id: "anxiety", text: "Anxious", value: "anxiety" },
        { id: "confidence", text: "Confident", value: "confidence" },
        { id: "neutral", text: "Neutral", value: "neutral" },
      ],
    },
    {
      type: "career",
      question: "What type of work energizes you most?",
      options: [
        { id: "creative", text: "Creative & Artistic", value: "creative" },
        { id: "analytical", text: "Analytical & Strategic", value: "analytical" },
        { id: "helping", text: "Helping Others", value: "service" },
        { id: "leading", text: "Leading & Managing", value: "leadership" },
        { id: "building", text: "Building & Creating", value: "builder" },
      ],
    },
    {
      type: "timing",
      question: "When do you feel most financially confident?",
      options: [
        { id: "morning", text: "Early Morning", value: "morning" },
        { id: "afternoon", text: "Afternoon", value: "afternoon" },
        { id: "evening", text: "Evening", value: "evening" },
        { id: "night", text: "Late Night", value: "night" },
      ],
    },
  ]

  const handleAnswerSelect = (answer: any) => {
    setSelectedAnswer(answer)
  }

  const handleNext = () => {
    if (selectedAnswer) {
      const newAnswers = [...answers, { question: currentQuestion, answer: selectedAnswer }]
      setAnswers(newAnswers)
      setSelectedAnswer(null)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        onComplete(newAnswers)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1]?.answer || null)
      setAnswers(answers.slice(0, -1))
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentQ = questions[currentQuestion]

  return (
    <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="text-center mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{currentQ.question}</h3>
            <p className="text-white/70">Choose the option that resonates most with you</p>
          </motion.div>

          {/* Options */}
          <div
            className={`grid gap-4 ${
              currentQ.options.length <= 4
                ? "grid-cols-1 md:grid-cols-2"
                : currentQ.options.length <= 6
                  ? "grid-cols-2 md:grid-cols-3"
                  : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            }`}
          >
            {currentQ.options.map((option, index) => (
              <motion.button
                key={option.id}
                onClick={() => handleAnswerSelect(option)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedAnswer?.id === option.id
                    ? "border-yellow-400 bg-yellow-400/10 text-white"
                    : "border-slate-600 bg-slate-700 text-white/80 hover:border-slate-500 hover:bg-slate-600"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  {option.emoji && <span className="text-2xl mr-3">{option.emoji}</span>}
                  <span className="font-medium">{option.text}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <motion.button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          whileHover={{ scale: currentQuestion === 0 ? 1 : 1.05 }}
          whileTap={{ scale: currentQuestion === 0 ? 1 : 0.95 }}
        >
          <ChevronLeft className="mr-2" size={20} />
          Previous
        </motion.button>

        <motion.button
          onClick={handleNext}
          disabled={!selectedAnswer}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg hover:from-pink-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
          whileHover={{ scale: !selectedAnswer ? 1 : 1.05 }}
          whileTap={{ scale: !selectedAnswer ? 1 : 0.95 }}
        >
          {currentQuestion === questions.length - 1 ? "Complete Quiz" : "Next"}
          <ChevronRight className="ml-2" size={20} />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default QuizEngine
