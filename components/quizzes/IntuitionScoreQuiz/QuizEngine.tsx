"use client"
import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Heart, Brain, Zap, Moon, Star } from "lucide-react"
import { calculateFinalScore, getAstrologyElement } from "./quizData"

interface QuizEngineProps {
  userData: any
  onComplete: (answers: any[], score: number) => void
}

const QuizEngine: React.FC<QuizEngineProps> = ({ userData, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null)

  const questions = [
    {
      type: "image-pick",
      question: "Choose the image you feel most drawn to:",
      options: [
        { id: "a", text: "Mystical Forest Portal", icon: "🌲", score: { intuitive: 3, analytical: 0, balanced: 1 } },
        { id: "b", text: "Ancient Eye Symbol", icon: "👁️", score: { intuitive: 2, analytical: 1, balanced: 2 } },
        { id: "c", text: "Geometric Mandala", icon: "🔯", score: { intuitive: 1, analytical: 2, balanced: 3 } },
        { id: "d", text: "Starry Night Sky", icon: "✨", score: { intuitive: 3, analytical: 0, balanced: 1 } },
      ],
    },
    {
      type: "scenario",
      question: "You have a strange feeling before an important meeting. You:",
      options: [
        { id: "a", text: "Ignore it completely", score: { intuitive: 0, analytical: 3, balanced: 1 } },
        { id: "b", text: "Make a mental note", score: { intuitive: 1, analytical: 2, balanced: 3 } },
        { id: "c", text: "Act on it immediately", score: { intuitive: 3, analytical: 0, balanced: 1 } },
        { id: "d", text: "Seek confirmation first", score: { intuitive: 1, analytical: 2, balanced: 2 } },
      ],
    },
    {
      type: "yes-no",
      question: 'Have your "gut feelings" been right more than 80% of the time?',
      options: [
        { id: "yes", text: "Yes", score: { intuitive: 3, analytical: 0, balanced: 1 } },
        { id: "no", text: "No", score: { intuitive: 0, analytical: 3, balanced: 1 } },
        { id: "unsure", text: "Not sure", score: { intuitive: 1, analytical: 1, balanced: 3 } },
      ],
    },
    {
      type: "slider",
      question: "How often do you remember your dreams? (0-10)",
      min: 0,
      max: 10,
      scoreMapping: (value: number) => ({
        intuitive: Math.floor(value / 3),
        analytical: Math.floor((10 - value) / 3),
        balanced: value >= 4 && value <= 7 ? 3 : 1,
      }),
    },
    {
      type: "multiple-choice",
      question: "You notice subtle changes in:",
      options: [
        { id: "a", text: "Room temperature", score: { intuitive: 2, analytical: 1, balanced: 2 } },
        { id: "b", text: "People's moods", score: { intuitive: 3, analytical: 0, balanced: 1 } },
        { id: "c", text: "Your body sensations", score: { intuitive: 3, analytical: 0, balanced: 1 } },
        { id: "d", text: "Lighting changes", score: { intuitive: 1, analytical: 2, balanced: 2 } },
        { id: "e", text: "Nothing specific", score: { intuitive: 0, analytical: 3, balanced: 1 } },
      ],
    },
    {
      type: "scenario",
      question: "When meeting someone for the first time, you:",
      options: [
        { id: "a", text: "Instantly sense their vibe", score: { intuitive: 3, analytical: 0, balanced: 1 } },
        { id: "b", text: "Wait and observe carefully", score: { intuitive: 1, analytical: 2, balanced: 3 } },
        { id: "c", text: "Rely on what they tell you", score: { intuitive: 0, analytical: 3, balanced: 1 } },
        { id: "d", text: "Trust but verify", score: { intuitive: 1, analytical: 2, balanced: 2 } },
      ],
    },
    {
      type: "symbol-pick",
      question: "Which symbol speaks to you most?",
      options: [
        {
          id: "a",
          text: "Third Eye",
          icon: <Eye className="w-12 h-12" />,
          score: { intuitive: 3, analytical: 0, balanced: 1 },
        },
        {
          id: "b",
          text: "Heart",
          icon: <Heart className="w-12 h-12" />,
          score: { intuitive: 2, analytical: 1, balanced: 2 },
        },
        {
          id: "c",
          text: "Brain",
          icon: <Brain className="w-12 h-12" />,
          score: { intuitive: 0, analytical: 3, balanced: 1 },
        },
        {
          id: "d",
          text: "Lightning",
          icon: <Zap className="w-12 h-12" />,
          score: { intuitive: 3, analytical: 0, balanced: 1 },
        },
      ],
    },
    {
      type: "slider",
      question: "Trust gut instinct vs. Check facts (0 = Always gut, 10 = Always facts)",
      min: 0,
      max: 10,
      scoreMapping: (value: number) => ({
        intuitive: Math.floor((10 - value) / 2.5),
        analytical: Math.floor(value / 2.5),
        balanced: value >= 3 && value <= 7 ? 3 : 1,
      }),
    },
    {
      type: "frequency",
      question: "How often do coincidences feel meaningful to you?",
      options: [
        { id: "never", text: "Never", score: { intuitive: 0, analytical: 3, balanced: 1 } },
        { id: "rarely", text: "Rarely", score: { intuitive: 1, analytical: 2, balanced: 2 } },
        { id: "sometimes", text: "Sometimes", score: { intuitive: 2, analytical: 1, balanced: 3 } },
        { id: "often", text: "Often", score: { intuitive: 3, analytical: 0, balanced: 1 } },
        { id: "always", text: "Always", score: { intuitive: 3, analytical: 0, balanced: 1 } },
      ],
    },
    {
      type: "scenario",
      question: "When making important decisions, you typically:",
      options: [
        { id: "a", text: "Go with your first instinct", score: { intuitive: 3, analytical: 0, balanced: 1 } },
        { id: "b", text: "Research thoroughly first", score: { intuitive: 0, analytical: 3, balanced: 1 } },
        { id: "c", text: "Combine both approaches", score: { intuitive: 1, analytical: 1, balanced: 3 } },
        { id: "d", text: "Ask others for advice", score: { intuitive: 1, analytical: 2, balanced: 2 } },
      ],
    },
  ]

  const handleAnswerSelect = (answer: any) => {
    setSelectedAnswer(answer)
  }

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer]
      setAnswers(newAnswers)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        const element = getAstrologyElement(userData.dateOfBirth)
        const finalScore = calculateFinalScore(newAnswers, element)
        onComplete(newAnswers, finalScore)
      }
    }
  }

  const renderQuestion = () => {
    const question = questions[currentQuestion]

    switch (question.type) {
      case "slider":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center mb-8">{question.question}</h2>
            <div className="px-4">
              <input
                type="range"
                min={question.min}
                max={question.max}
                value={selectedAnswer || 5}
                onChange={(e) => handleAnswerSelect(Number.parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-slate-400 mt-2">
                <span>{question.min}</span>
                <span className="text-yellow-400 font-bold">{selectedAnswer || 5}</span>
                <span>{question.max}</span>
              </div>
            </div>
          </div>
        )

      case "symbol-pick":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center mb-8">{question.question}</h2>
            <div className="grid grid-cols-2 gap-4">
              {question.options.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    selectedAnswer?.id === option.id
                      ? "border-yellow-400 bg-yellow-400/20"
                      : "border-slate-600 bg-slate-800/50 hover:border-purple-400"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-purple-400 mb-3 flex justify-center">{option.icon}</div>
                  <p className="text-white font-medium">{option.text}</p>
                </motion.button>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center mb-8">{question.question}</h2>
            <div className="space-y-3">
              {question.options.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                    selectedAnswer?.id === option.id
                      ? "border-yellow-400 bg-yellow-400/20"
                      : "border-slate-600 bg-slate-800/50 hover:border-purple-400"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    {option.icon && <span className="text-2xl mr-3">{option.icon}</span>}
                    <span className="text-white font-medium">{option.text}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="backdrop-blur-md bg-slate-900/65 rounded-3xl p-8 shadow-2xl border border-slate-700/50 max-w-2xl mx-auto w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Moon className="text-purple-400 w-6 h-6" />
              <span className="text-white font-medium">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400 w-5 h-5" />
              <span className="text-slate-300 text-sm">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </span>
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-yellow-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
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
            {renderQuestion()}
          </motion.div>
        </AnimatePresence>

        <motion.button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className={`w-full mt-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
            selectedAnswer !== null
              ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg hover:shadow-xl"
              : "bg-slate-700 text-slate-400 cursor-not-allowed"
          }`}
          whileHover={selectedAnswer !== null ? { scale: 1.02 } : {}}
          whileTap={selectedAnswer !== null ? { scale: 0.98 } : {}}
        >
          {currentQuestion < questions.length - 1 ? "Next Question" : "Reveal My Score"}
        </motion.button>
      </motion.div>
    </div>
  )
}

export default QuizEngine
