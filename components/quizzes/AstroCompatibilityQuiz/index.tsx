"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Stars, Moon } from "lucide-react"
import CoupleForm from "./CoupleForm"
import QuizEngine from "./QuizEngine"
import ShortResult from "./ShortResult"
import FullResult from "./FullResult"
import { calculateZodiacSign, getCompatibilityScore } from "./utils/astrology"

const AstroCompatibilityQuiz = () => {
  const [currentStep, setCurrentStep] = useState("form")
  const [coupleData, setCoupleData] = useState(null)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState(null)

  const handleFormSubmit = (data) => {
    const userSign = calculateZodiacSign(data.userBirthdate)
    const partnerSign = calculateZodiacSign(data.partnerBirthdate)

    setCoupleData({
      ...data,
      userSign,
      partnerSign,
    })
    setCurrentStep("quiz")
  }

  const handleQuizComplete = (quizAnswers) => {
    setAnswers(quizAnswers)
    const compatibilityScore = getCompatibilityScore(coupleData.userSign, coupleData.partnerSign, quizAnswers)
    setResults({ compatibilityScore, answers: quizAnswers })
    setCurrentStep("short-result")
  }

  const handleShowFullResult = () => {
    setCurrentStep("full-result")
  }

  const FloatingStars = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-300 opacity-60"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [0.5, 1, 0.5],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          <Stars size={12 + Math.random() * 8} />
        </motion.div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-orange-400 to-amber-500 relative overflow-hidden">
      <FloatingStars />

      {/* Header */}
      <motion.header
        className="text-center py-8 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="flex items-center justify-center gap-3 mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Heart className="text-pink-300" size={32} />
          <h1 className="text-4xl md:text-5xl font-bold text-white">Are You Astro-Compatible?</h1>
          <Moon className="text-blue-300" size={32} />
        </motion.div>
        <p className="text-xl text-white/90 max-w-2xl mx-auto px-4">
          Discover your cosmic connection through the stars
        </p>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 px-4 pb-8">
        <AnimatePresence mode="wait">
          {currentStep === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <CoupleForm onSubmit={handleFormSubmit} />
            </motion.div>
          )}

          {currentStep === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <QuizEngine onComplete={handleQuizComplete} userData={coupleData} />
            </motion.div>
          )}

          {currentStep === "short-result" && (
            <motion.div
              key="short-result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <ShortResult coupleData={coupleData} results={results} onShowFull={handleShowFullResult} />
            </motion.div>
          )}

          {currentStep === "full-result" && (
            <motion.div
              key="full-result"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <FullResult coupleData={coupleData} results={results} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.footer
        className="text-center py-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-white/70">
          Powered by <span className="text-yellow-300 font-semibold">www.quizzastrology.com</span>
        </p>
      </motion.footer>
    </div>
  )
}

export default AstroCompatibilityQuiz
