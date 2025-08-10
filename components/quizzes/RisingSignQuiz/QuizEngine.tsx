"use client"
import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { quizQuestions, calculateRisingSign } from "./quizData"

interface QuizEngineProps {
  onComplete: (answers: any[], risingSign: string) => void
}

const QuizEngine: React.FC<QuizEngineProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    setIsAnimating(true)
    const newAnswers = [
      ...answers,
      {
        questionId: currentQuestion,
        question: quizQuestions[currentQuestion].question,
        answer: quizQuestions[currentQuestion].answers[selectedAnswer].text,
        value: quizQuestions[currentQuestion].answers[selectedAnswer].value,
      },
    ]

    setAnswers(newAnswers)

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        const risingSign = calculateRisingSign(newAnswers)
        onComplete(newAnswers, risingSign)
      }
      setIsAnimating(false)
    }, 300)
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1)
        setAnswers(answers.slice(0, -1))
        setSelectedAnswer(null)
        setIsAnimating(false)
      }, 300)
    }
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const question = quizQuestions[currentQuestion]

  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto w-full mb-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">What Is Your True Rising Sign?</h1>
          <p className="text-white/80 text-sm">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2 mb-8">
          <motion.div
            className="bg-gradient-to-r from-[#915EFF] to-[#FF5F6D] h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: isAnimating ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isAnimating ? 50 : -50 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1F2A38] rounded-2xl p-6 md:p-8 shadow-2xl border border-white/10"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#915EFF] to-[#FF5F6D] rounded-full mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">{question.question}</h2>
                {question.subtitle && <p className="text-white/70 text-sm">{question.subtitle}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.answers.map((answer, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedAnswer === index
                        ? "border-[#915EFF] bg-gradient-to-r from-[#915EFF]/20 to-[#FF5F6D]/20 shadow-lg"
                        : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start space-x-3">
                      {answer.icon && (
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#915EFF] to-[#FF5F6D] rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">{answer.icon}</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-white font-medium">{answer.text}</p>
                        {answer.description && <p className="text-white/60 text-sm mt-1">{answer.description}</p>}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-4xl mx-auto w-full mt-8">
        <div className="flex justify-between items-center">
          <motion.button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2 px-6 py-3 bg-white/10 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: currentQuestion === 0 ? 1 : 1.05 }}
            whileTap={{ scale: currentQuestion === 0 ? 1 : 0.95 }}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: selectedAnswer === null ? 1 : 1.05 }}
            whileTap={{ scale: selectedAnswer === null ? 1 : 0.95 }}
          >
            <span>{currentQuestion === quizQuestions.length - 1 ? "Get Results" : "Next"}</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default QuizEngine
