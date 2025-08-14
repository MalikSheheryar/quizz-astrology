"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Sparkles } from "lucide-react"
import { getQuizQuestions, calculateSpiritualResult } from "./quizLogic"

const QuizEngine = ({ userData, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [questions] = useState(getQuizQuestions())
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleAnswerSelect = (answerValue, answerData) => {
    setSelectedAnswer({ value: answerValue, data: answerData })
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    setIsTransitioning(true)

    setTimeout(() => {
      const newAnswers = [...answers, selectedAnswer]
      setAnswers(newAnswers)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        const result = calculateSpiritualResult(newAnswers, userData)
        onComplete(newAnswers, result)
      }

      setIsTransitioning(false)
    }, 500)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const question = questions[currentQuestion]

  const renderQuestion = () => {
    switch (question.type) {
      case "card-selector":
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {question.options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswerSelect(option.value, option)}
                className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
                  selectedAnswer?.value === option.value ? "ring-4 ring-yellow-400 shadow-2xl" : "hover:shadow-xl"
                }`}
              >
                <div className="aspect-square bg-gradient-to-br from-purple-600 to-pink-600 p-6 flex flex-col items-center justify-center text-white">
                  <div className="text-4xl mb-2">{option.icon}</div>
                  <p className="text-sm font-medium text-center">{option.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )

      case "symbol-choice":
        return (
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {question.options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAnswerSelect(option.value, option)}
                className={`aspect-square bg-slate-800/60 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  selectedAnswer?.value === option.value
                    ? "ring-4 ring-cyan-400 bg-cyan-400/20"
                    : "hover:bg-slate-700/60"
                }`}
              >
                <span className="text-4xl">{option.symbol}</span>
              </motion.div>
            ))}
          </div>
        )

      case "emotion-mapping":
        return (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(option.value, option)}
                className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center gap-3 ${
                  selectedAnswer?.value === option.value
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-slate-800/60 text-white/80 hover:bg-slate-700/60"
                }`}
              >
                <span className="text-2xl">{option.icon}</span>
                <div>
                  <p className="font-medium">{option.label}</p>
                  <p className="text-sm opacity-70">{option.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        )

      case "energy-slider":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-white mb-2">{selectedAnswer?.value || 5}</p>
              <p className="text-white/70">
                {selectedAnswer?.value <= 3 ? "Reflection" : selectedAnswer?.value <= 7 ? "Balance" : "Manifestation"}
              </p>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={selectedAnswer?.value || 5}
              onChange={(e) =>
                handleAnswerSelect(Number.parseInt(e.target.value), {
                  value: Number.parseInt(e.target.value),
                  label:
                    Number.parseInt(e.target.value) <= 3
                      ? "Reflection"
                      : Number.parseInt(e.target.value) <= 7
                        ? "Balance"
                        : "Manifestation",
                })
              }
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-white/60">
              <span>Inward</span>
              <span>Outward</span>
            </div>
          </div>
        )

      case "intuition-flash":
        return (
          <div className="text-center space-y-6">
            <p className="text-white/80 text-lg mb-6">Don't think—just choose:</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAnswerSelect(option.value, option)}
                  className={`aspect-square rounded-full text-2xl font-bold transition-all duration-300 ${
                    selectedAnswer?.value === option.value
                      ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-2xl"
                      : "bg-slate-800/60 text-white/80 hover:bg-slate-700/60"
                  }`}
                >
                  {option.number}
                </motion.button>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white/70 text-sm">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-white/70 text-sm">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="bg-gradient-to-r from-yellow-400 to-pink-500 h-2 rounded-full transition-all duration-500"
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        {!isTransitioning && (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10 mb-8"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{question.title}</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">{question.subtitle}</p>
            </div>

            {renderQuestion()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Button */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          disabled={selectedAnswer === null || isTransitioning}
          className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-2 mx-auto ${
            selectedAnswer !== null && !isTransitioning
              ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg hover:shadow-xl"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          {currentQuestion < questions.length - 1 ? "Continue Journey" : "Reveal My Message"}
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default QuizEngine
