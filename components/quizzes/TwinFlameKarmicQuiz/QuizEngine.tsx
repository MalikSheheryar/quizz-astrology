"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Flame, Moon, Eye, Zap, Sparkles } from "lucide-react"

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
      type: "emotion",
      question: "When you first met your partner, what was your immediate feeling?",
      options: [
        { text: "I felt like I'd known them forever", type: "twinFlame", weight: 3 },
        { text: "There was instant, overwhelming attraction", type: "twinFlame", weight: 2 },
        { text: "I felt drawn to them but also nervous", type: "karmic", weight: 2 },
        { text: "It felt familiar but complicated", type: "karmic", weight: 3 },
      ],
    },
    {
      id: 2,
      type: "conflict",
      question: "When you argue with your partner, what typically happens?",
      options: [
        { text: "We fight intensely but always come back stronger", type: "twinFlame", weight: 3 },
        { text: "Arguments feel like we're fighting ourselves", type: "twinFlame", weight: 2 },
        { text: "The same patterns keep repeating", type: "karmic", weight: 3 },
        { text: "It triggers deep wounds from my past", type: "karmic", weight: 2 },
      ],
    },
    {
      id: 3,
      type: "growth",
      question: "How has this relationship changed you?",
      options: [
        { text: "I've discovered parts of myself I never knew existed", type: "twinFlame", weight: 3 },
        { text: "I feel more complete and whole", type: "twinFlame", weight: 2 },
        { text: "I'm learning difficult but necessary lessons", type: "karmic", weight: 3 },
        { text: "I keep facing the same challenges over and over", type: "karmic", weight: 2 },
      ],
    },
    {
      id: 4,
      type: "intuition",
      question: "Choose the symbol that resonates most with your relationship:",
      options: [
        { text: "🔥 Twin flames burning as one", type: "twinFlame", weight: 3 },
        { text: "🌕 Two moons in perfect alignment", type: "twinFlame", weight: 2 },
        { text: "💔 A heart learning to heal", type: "karmic", weight: 3 },
        { text: "🌀 A spiral of repeating patterns", type: "karmic", weight: 2 },
      ],
    },
    {
      id: 5,
      type: "connection",
      question: "How would you describe your spiritual connection?",
      options: [
        { text: "We share the same soul in two bodies", type: "twinFlame", weight: 3 },
        { text: "We can feel each other's emotions from miles away", type: "twinFlame", weight: 2 },
        { text: "There's a deep karmic bond that needs healing", type: "karmic", weight: 3 },
        { text: "We're here to teach each other important lessons", type: "karmic", weight: 2 },
      ],
    },
    {
      id: 6,
      type: "timing",
      question: "How did the timing of meeting feel?",
      options: [
        { text: "Perfect divine timing, exactly when I needed them", type: "twinFlame", weight: 3 },
        { text: "Like the universe conspired to bring us together", type: "twinFlame", weight: 2 },
        { text: "Complicated timing that created challenges", type: "karmic", weight: 3 },
        { text: "It felt like unfinished business from the past", type: "karmic", weight: 2 },
      ],
    },
    {
      id: 7,
      type: "dreams",
      question: "Do you dream about your partner?",
      options: [
        { text: "Yes, vivid dreams that feel like shared experiences", type: "twinFlame", weight: 3 },
        { text: "Sometimes, and they feel prophetic", type: "twinFlame", weight: 2 },
        { text: "I have recurring dreams about past conflicts", type: "karmic", weight: 3 },
        { text: "My dreams often involve healing old wounds", type: "karmic", weight: 2 },
      ],
    },
    {
      id: 8,
      type: "separation",
      question: "When you're apart from your partner, how do you feel?",
      options: [
        { text: "Like a part of my soul is missing", type: "twinFlame", weight: 3 },
        { text: "Physically uncomfortable, like withdrawal", type: "twinFlame", weight: 2 },
        { text: "Relief mixed with longing", type: "karmic", weight: 3 },
        { text: "Anxious about unresolved issues", type: "karmic", weight: 2 },
      ],
    },
    {
      id: 9,
      type: "mirror",
      question: "What do you see when you look at your partner?",
      options: [
        { text: "A reflection of my own soul", type: "twinFlame", weight: 3 },
        { text: "My perfect complement and opposite", type: "twinFlame", weight: 2 },
        { text: "Someone who triggers my deepest fears", type: "karmic", weight: 3 },
        { text: "A teacher showing me what I need to heal", type: "karmic", weight: 2 },
      ],
    },
    {
      id: 10,
      type: "purpose",
      question: "What do you believe is the purpose of this relationship?",
      options: [
        { text: "To experience unconditional love and unity", type: "twinFlame", weight: 3 },
        { text: "To awaken to our highest spiritual potential", type: "twinFlame", weight: 2 },
        { text: "To heal generational patterns and trauma", type: "karmic", weight: 3 },
        { text: "To learn specific lessons my soul needs", type: "karmic", weight: 2 },
      ],
    },
  ]

  const handleAnswerSelect = (answer: any) => {
    setSelectedAnswer(answer)
  }

  const handleNext = () => {
    if (selectedAnswer) {
      const newAnswers = [...answers, selectedAnswer]
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
  const currentQ = questions[currentQuestion]

  const questionVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }

  const getQuestionIcon = (type: string) => {
    switch (type) {
      case "emotion":
        return <Heart className="w-6 h-6 text-pink-400" />
      case "conflict":
        return <Zap className="w-6 h-6 text-orange-400" />
      case "growth":
        return <Sparkles className="w-6 h-6 text-purple-400" />
      case "intuition":
        return <Eye className="w-6 h-6 text-blue-400" />
      case "connection":
        return <Flame className="w-6 h-6 text-red-400" />
      default:
        return <Moon className="w-6 h-6 text-indigo-400" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-medium">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-purple-300">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-orange-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          variants={questionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="bg-slate-800 bg-opacity-90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-500/20"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              {getQuestionIcon(currentQ.type)}
            </motion.div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">{currentQ.question}</h2>

          <div className="grid gap-4 md:gap-6">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                  selectedAnswer === option
                    ? "border-purple-400 bg-purple-500/20 text-white"
                    : "border-purple-500/30 bg-slate-700/50 text-gray-300 hover:border-purple-400/50 hover:bg-purple-500/10"
                }`}
              >
                <span className="text-lg font-medium">{option.text}</span>
              </motion.button>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <motion.button
              onClick={handleNext}
              disabled={!selectedAnswer}
              whileHover={{ scale: selectedAnswer ? 1.05 : 1 }}
              whileTap={{ scale: selectedAnswer ? 0.95 : 1 }}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                selectedAnswer
                  ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "Reveal My Truth"}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default QuizEngine
