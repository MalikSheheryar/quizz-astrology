"use client"
import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, Heart, Star, Moon, Sun } from "lucide-react"
import { quizQuestions } from "./quizData"

interface QuizEngineProps {
  userData: any
  onComplete: (answers: any) => void
}

const QuizEngine: React.FC<QuizEngineProps> = ({ userData, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedAnswer, setSelectedAnswer] = useState("")

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId)
  }

  const handleNext = () => {
    if (selectedAnswer) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion]: selectedAnswer,
      }))

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
        setSelectedAnswer("")
      } else {
        const finalAnswers = {
          ...answers,
          [currentQuestion]: selectedAnswer,
        }
        onComplete(finalAnswers)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
      setSelectedAnswer(answers[currentQuestion - 1] || "")
    }
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const question = quizQuestions[currentQuestion]

  const getQuestionIcon = (type: string) => {
    switch (type) {
      case "emotion":
        return <Heart className="text-pink-400" size={24} />
      case "astrology":
        return <Star className="text-yellow-400" size={24} />
      case "intuition":
        return <Moon className="text-purple-400" size={24} />
      case "timing":
        return <Sun className="text-orange-400" size={24} />
      default:
        return <Heart className="text-pink-400" size={24} />
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        className="bg-slate-800 bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 max-w-4xl w-full shadow-2xl border border-yellow-400/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-300 text-sm">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-yellow-400 font-medium">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"
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
            {/* Question Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {getQuestionIcon(question.type)}
                </motion.div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4 leading-tight">{question.question}</h2>
              {question.subtitle && <p className="text-gray-300 text-lg">{question.subtitle}</p>}
            </div>

            {/* Answer Options */}
            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    selectedAnswer === option.id
                      ? "border-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-400/20"
                      : "border-slate-600 bg-slate-700/50 hover:border-yellow-400/50 hover:bg-slate-700"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4">
                    {option.icon && <span className="text-2xl mt-1">{option.icon}</span>}
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-2">{option.text}</h3>
                      {option.description && <p className="text-gray-400 text-sm">{option.description}</p>}
                    </div>
                    {selectedAnswer === option.id && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-yellow-400">
                        <Star size={20} fill="currentColor" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Slider for intuition questions */}
            {question.type === "slider" && (
              <div className="mb-8">
                <div className="flex justify-between text-gray-400 text-sm mb-2">
                  <span>Not at all</span>
                  <span>Extremely</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={selectedAnswer || 5}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center mt-2">
                  <span className="text-yellow-400 font-bold text-xl">{selectedAnswer || 5}/10</span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <motion.button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              currentQuestion === 0
                ? "text-gray-500 cursor-not-allowed"
                : "text-white hover:bg-slate-700 hover:scale-105"
            }`}
            whileHover={currentQuestion > 0 ? { scale: 1.05 } : {}}
            whileTap={currentQuestion > 0 ? { scale: 0.95 } : {}}
          >
            <ChevronLeft size={20} />
            Previous
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all ${
              selectedAnswer
                ? "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg hover:scale-105"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
            whileHover={selectedAnswer ? { scale: 1.05 } : {}}
            whileTap={selectedAnswer ? { scale: 0.95 } : {}}
          >
            {currentQuestion === quizQuestions.length - 1 ? "Reveal My Destiny" : "Next"}
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default QuizEngine
