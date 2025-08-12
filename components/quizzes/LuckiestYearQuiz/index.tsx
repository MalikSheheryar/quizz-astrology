"use client"
import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import UserForm from "./UserForm"
import QuizEngine from "./QuizEngine"
import ShortResult from "./ShortResult"
import FullResult from "./FullResult"
import { FloatingNumbers } from "./components"
import { calculatePersonalYear } from "./utils/numerology"

interface LuckiestYearQuizProps {
  quizData?: any
}

const LuckiestYearQuiz: React.FC<LuckiestYearQuizProps> = ({ quizData }) => {
  const [currentStep, setCurrentStep] = useState("userInfo")
  const [userData, setUserData] = useState<any>(null)
  const [quizAnswers, setQuizAnswers] = useState<any>({})
  const [results, setResults] = useState<any>(null)
  const [showFullReport, setShowFullReport] = useState(false)

  const handleUserInfoSubmit = (data: any) => {
    setUserData(data)
    setCurrentStep("quiz")
  }

  const handleQuizComplete = (answers: any) => {
    setQuizAnswers(answers)

    // Calculate personal years and determine luckiest year
    const currentYear = new Date().getFullYear()
    const personalYears = []

    for (let year = currentYear; year <= 2030; year++) {
      const personalYear = calculatePersonalYear(userData.dateOfBirth, year)
      personalYears.push({ year, personalYear })
    }

    // Determine luckiest year based on numerology and quiz answers
    const luckiestYear = determineLuckiestYear(personalYears, answers)

    setResults({
      luckiestYear,
      personalYears,
      userData,
      quizAnswers: answers,
    })

    setCurrentStep("results")
  }

  const determineLuckiestYear = (personalYears: any[], answers: any) => {
    // Numerology logic: Years 1, 3, 5, 8, 9 are typically luckier
    const luckyNumbers = [1, 3, 5, 8, 9]

    const scoredYears = personalYears.map(({ year, personalYear }) => {
      let score = 0

      // Base numerology score
      if (luckyNumbers.includes(personalYear)) score += 3
      if (personalYear === 1) score += 2 // New beginnings
      if (personalYear === 8) score += 2 // Material success
      if (personalYear === 9) score += 1 // Completion and wisdom

      // Quiz-based adjustments
      if (answers.energyLevel >= 7 && [1, 3, 5].includes(personalYear)) score += 1
      if (answers.focusArea === "career" && personalYear === 8) score += 2
      if (answers.focusArea === "relationships" && [2, 6].includes(personalYear)) score += 1
      if (answers.intuitionSymbol && answers.intuitionSymbol.id === "star" && personalYear === 1) score += 1

      return { year, personalYear, score }
    })

    return scoredYears.reduce((max, current) => (current.score > max.score ? current : max))
  }

  const handleShowFullReport = () => {
    setShowFullReport(true)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-500 to-orange-500">
      <FloatingNumbers />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4 gradient-text">
            Which Year Will Be Your Luckiest?
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover your most fortunate years through ancient numerology wisdom
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {currentStep === "userInfo" && <UserForm key="userInfo" onSubmit={handleUserInfoSubmit} />}

          {currentStep === "quiz" && <QuizEngine key="quiz" userData={userData} onComplete={handleQuizComplete} />}

          {currentStep === "results" && (
            <ShortResult key="results" results={results} onShowFullReport={handleShowFullReport} />
          )}
        </AnimatePresence>

        {showFullReport && <FullResult results={results} onClose={() => setShowFullReport(false)} />}
      </div>
    </div>
  )
}

export default LuckiestYearQuiz
