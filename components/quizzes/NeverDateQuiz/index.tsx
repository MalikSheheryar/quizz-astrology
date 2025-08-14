"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import UserForm from "./UserForm"
import QuizEngine from "./QuizEngine"
import ShortResult from "./ShortResult"
import FullResult from "./FullResult"
import { getSunSignFromDOB, calculateIncompatibility } from "./utils/astrology"

const NeverDateQuiz = () => {
  const [currentStep, setCurrentStep] = useState("form")
  const [userData, setUserData] = useState({})
  const [quizAnswers, setQuizAnswers] = useState([])
  const [results, setResults] = useState(null)

  const handleFormSubmit = (data) => {
    const sunSign = getSunSignFromDOB(data.dateOfBirth)
    setUserData({ ...data, sunSign })
    setCurrentStep("quiz")
  }

  const handleQuizComplete = (answers) => {
    setQuizAnswers(answers)
    const incompatibilityResults = calculateIncompatibility(userData.sunSign, answers)
    setResults(incompatibilityResults)
    setCurrentStep("short-result")
  }

  const showFullReport = () => {
    setCurrentStep("full-result")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 relative overflow-hidden">
      {/* Animated Starfield Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {currentStep === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <UserForm onSubmit={handleFormSubmit} />
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
              <QuizEngine onComplete={handleQuizComplete} userData={userData} />
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
              <ShortResult results={results} userData={userData} onShowFull={showFullReport} />
            </motion.div>
          )}

          {currentStep === "full-result" && (
            <motion.div
              key="full-result"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <FullResult results={results} userData={userData} quizAnswers={quizAnswers} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default NeverDateQuiz
