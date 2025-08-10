"use client"
import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import QuizCard from "./QuizCard"
import { quizQuestions, calculateAvoidSign } from "./quizData"

interface QuizFlowProps {
  onComplete: (results: any) => void
}

const QuizFlow: React.FC<QuizFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [showTeaser, setShowTeaser] = useState(false)
  const [avoidSign, setAvoidSign] = useState("")

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const nextStep = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Quiz completed, show teaser
      const result = calculateAvoidSign(answers)
      setAvoidSign(result)
      setShowTeaser(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const revealFullResult = () => {
    localStorage.setItem("quizAnswers", JSON.stringify(answers))
    localStorage.setItem("avoidSign", avoidSign)
    onComplete({ answers, avoidSign })
  }

  const currentQuestion = quizQuestions[currentStep]
  const progress = ((currentStep + 1) / quizQuestions.length) * 100

  if (showTeaser) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-800 p-8 rounded-3xl shadow-2xl max-w-lg w-full text-center border border-purple-500/20"
        >
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">🔮 Your Result is Ready!</h2>
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-2xl mb-6">
              <p className="text-2xl font-bold text-white mb-2">You should avoid dating:</p>
              <p className="text-4xl font-bold text-white">{avoidSign}</p>
              <p className="text-lg text-white/90 mt-2">Based on your personality preferences</p>
            </div>
          </motion.div>

          <motion.button
            onClick={revealFullResult}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
          >
            ✨ Unlock Full Compatibility Report - $1.99 ✨
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-white font-medium">
            Question {currentStep + 1} of {quizQuestions.length}
          </span>
          <span className="text-white font-medium">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <QuizCard question={currentQuestion} onAnswer={handleAnswer} selectedAnswer={answers[currentQuestion.id]} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <motion.button
          onClick={prevStep}
          disabled={currentStep === 0}
          whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
          className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
            currentStep === 0
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-slate-700 text-white hover:bg-slate-600"
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </motion.button>

        <motion.button
          onClick={nextStep}
          disabled={!answers[currentQuestion.id]}
          whileHover={{ scale: !answers[currentQuestion.id] ? 1 : 1.05 }}
          className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
            !answers[currentQuestion.id]
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg"
          }`}
        >
          {currentStep === quizQuestions.length - 1 ? "Finish Quiz" : "Next"}
          <ChevronRight className="w-5 h-5 ml-2" />
        </motion.button>
      </div>
    </div>
  )
}

export default QuizFlow
