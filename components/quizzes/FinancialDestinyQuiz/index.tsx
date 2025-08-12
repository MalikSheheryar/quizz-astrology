"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import UserInfoForm from "./UserInfoForm"
import QuizEngine from "./QuizEngine"
import ShortResult from "./ShortResult"
import FullResult from "./FullResult"
import { Sparkles, Star } from "lucide-react"

interface FinancialDestinyQuizProps {
  quizData?: any
}

const FinancialDestinyQuiz: React.FC<FinancialDestinyQuizProps> = ({ quizData }) => {
  const [currentStep, setCurrentStep] = useState("info")
  const [userData, setUserData] = useState({})
  const [quizAnswers, setQuizAnswers] = useState([])
  const [showFullResult, setShowFullResult] = useState(false)

  const handleUserInfo = (data: any) => {
    setUserData(data)
    setCurrentStep("quiz")
  }

  const handleQuizComplete = (answers: any) => {
    setQuizAnswers(answers)
    setCurrentStep("results")
  }

  const handleShowFullResult = () => {
    setShowFullResult(true)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-500 to-orange-500">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-yellow-400 text-2xl"
          animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        >
          💰
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-emerald-400 text-xl"
          animate={{ y: [10, -10, 10], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-20 text-yellow-400 text-3xl"
          animate={{ y: [-15, 15, -15], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
        >
          🔮
        </motion.div>
      </div>

      {/* Header */}
      <motion.header
        className="text-center py-8 px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="text-yellow-400 mr-2" size={32} />
          <h1 className="text-4xl md:text-5xl font-bold text-white font-heading">QuizzAstrology.com</h1>
          <Star className="text-yellow-400 ml-2" size={32} />
        </div>
        <motion.h2
          className="text-2xl md:text-3xl font-semibold text-white mb-2"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          What Numerology Says About Your Financial Destiny
        </motion.h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Unlock the cosmic secrets of your wealth potential through ancient numerology wisdom
        </p>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <AnimatePresence mode="wait">
          {currentStep === "info" && <UserInfoForm onSubmit={handleUserInfo} />}
          {currentStep === "quiz" && <QuizEngine userData={userData} onComplete={handleQuizComplete} />}
          {currentStep === "results" && !showFullResult && (
            <ShortResult userData={userData} answers={quizAnswers} onShowFullResult={handleShowFullResult} />
          )}
          {currentStep === "results" && showFullResult && <FullResult userData={userData} answers={quizAnswers} />}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default FinancialDestinyQuiz
