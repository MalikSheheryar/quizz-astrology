"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"
import CoupleForm from "./CoupleForm"
import BirthdayQuizEngine from "./BirthdayQuizEngine"
import ShortResult from "./ShortResult"
import FullResult from "./FullResult"
import { FloatingElements } from "./components"
import { pageTransition } from "./utils/motion"

const CoupleVibeBirthdayQuiz = () => {
  const [currentStep, setCurrentStep] = useState("form")
  const [coupleData, setCoupleData] = useState(null)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [compatibilityResult, setCompatibilityResult] = useState(null)
  const [showFullResult, setShowFullResult] = useState(false)

  const handleFormSubmit = (data) => {
    setCoupleData(data)
    setCurrentStep("quiz")
  }

  const handleQuizComplete = (answers, result) => {
    setQuizAnswers(answers)
    setCompatibilityResult(result)
    setCurrentStep("result")
  }

  const handleShowFullResult = () => {
    setShowFullResult(true)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#EA4C89] to-[#FB8C00]">
      <FloatingElements />

      {/* Header */}
      <motion.header
        className="text-center py-8 px-4 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center mb-4">
          <Heart className="text-[#FFD700] mr-2" size={32} />
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">QuizzAstrology.com</h1>
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-white mb-2">
          Your Couple Vibe Based on Your Birthdays
        </h2>
        <p className="text-white/80 font-body max-w-2xl mx-auto">
          Discover your cosmic compatibility through astrology and numerology
        </p>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8 relative z-10">
        <AnimatePresence mode="wait">
          {currentStep === "form" && (
            <motion.div key="form" variants={pageTransition} initial="initial" animate="animate" exit="exit">
              <CoupleForm onSubmit={handleFormSubmit} />
            </motion.div>
          )}

          {currentStep === "quiz" && (
            <motion.div key="quiz" variants={pageTransition} initial="initial" animate="animate" exit="exit">
              <BirthdayQuizEngine coupleData={coupleData} onComplete={handleQuizComplete} />
            </motion.div>
          )}

          {currentStep === "result" && !showFullResult && (
            <motion.div key="short-result" variants={pageTransition} initial="initial" animate="animate" exit="exit">
              <ShortResult
                coupleData={coupleData}
                results={compatibilityResult}
                onShowFullResult={handleShowFullResult}
              />
            </motion.div>
          )}

          {currentStep === "result" && showFullResult && (
            <motion.div key="full-result" variants={pageTransition} initial="initial" animate="animate" exit="exit">
              <FullResult coupleData={coupleData} quizAnswers={quizAnswers} result={compatibilityResult} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CoupleVibeBirthdayQuiz
