"use client"
import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import UserForm from "./UserForm"
import QuizEngine from "./QuizEngine"
import ShortResult from "./ShortResult"
import FullResult from "./FullResult"
import { FloatingElements } from "./components"

interface SoulNumberQuizProps {
  quizData?: any
}

const SoulNumberQuiz: React.FC<SoulNumberQuizProps> = ({ quizData }) => {
  const [currentStep, setCurrentStep] = useState("userInfo")
  const [userData, setUserData] = useState({})
  const [quizAnswers, setQuizAnswers] = useState({})
  const [soulNumber, setSoulNumber] = useState<number | null>(null)
  const [showFullReport, setShowFullReport] = useState(false)

  const calculateSoulNumber = (fullName: string) => {
    const vowels = "AEIOU"
    const vowelValues: any = { A: 1, E: 5, I: 9, O: 6, U: 3 }

    let total = 0
    const nameUpper = fullName.toUpperCase().replace(/[^A-Z]/g, "")

    for (const char of nameUpper) {
      if (vowels.includes(char)) {
        total += vowelValues[char]
      }
    }

    while (total > 9 && total !== 11 && total !== 22) {
      total = total
        .toString()
        .split("")
        .reduce((sum, digit) => sum + Number.parseInt(digit), 0)
    }

    return total
  }

  const handleUserInfoComplete = (data: any) => {
    setUserData(data)
    const calculatedSoulNumber = calculateSoulNumber(data.fullName)
    setSoulNumber(calculatedSoulNumber)
    setCurrentStep("quiz")
  }

  const handleQuizComplete = (answers: any) => {
    setQuizAnswers(answers)
    setCurrentStep("result")
  }

  const handleShowFullReport = () => {
    setShowFullReport(true)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-500 to-orange-500">
      <FloatingElements />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-heading">Discover Your Soul Number</h1>
          <p className="text-xl text-white/90 font-body">Unlock the mystical blueprint of your inner essence</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {currentStep === "userInfo" && <UserForm onComplete={handleUserInfoComplete} />}

          {currentStep === "quiz" && (
            <QuizEngine userData={userData} soulNumber={soulNumber} onComplete={handleQuizComplete} />
          )}

          {currentStep === "result" && (
            <div className="space-y-8">
              <ShortResult soulNumber={soulNumber} userData={userData} onShowFullReport={handleShowFullReport} />

              {showFullReport && <FullResult soulNumber={soulNumber} userData={userData} quizAnswers={quizAnswers} />}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SoulNumberQuiz
