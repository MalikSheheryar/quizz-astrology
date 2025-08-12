"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import UserForm from "./UserForm"
import QuizEngine from "./QuizEngine"
import ShortResult from "./ShortResult"
import FullResult from "./FullResult"
import { ConstellationParticles } from "./components"

interface SoulMissionQuizProps {
  quizData?: any
}

const SoulMissionQuiz: React.FC<SoulMissionQuizProps> = ({ quizData }) => {
  const [currentStep, setCurrentStep] = useState("form")
  const [userData, setUserData] = useState({})
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showFullResult, setShowFullResult] = useState(false)

  const handleUserSubmit = (data: any) => {
    setUserData(data)
    setCurrentStep("quiz")
  }

  const handleQuizComplete = (answers: any) => {
    setQuizAnswers(answers)
    setCurrentStep("result")
  }

  const handleShowFullResult = () => {
    setShowFullResult(true)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#EA4C89] to-[#FB8C00]">
      <ConstellationParticles />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-heading">
            Your Birthday Reveals Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#915EFF]">
              Life Mission
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto font-body">
            Discover the sacred cosmic blueprint hidden in your birth date
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {currentStep === "form" && <UserForm key="form" onSubmit={handleUserSubmit} />}
          {currentStep === "quiz" && <QuizEngine key="quiz" userData={userData} onComplete={handleQuizComplete} />}
          {currentStep === "result" && !showFullResult && (
            <ShortResult
              key="short-result"
              userData={userData}
              quizAnswers={quizAnswers}
              onShowFullResult={handleShowFullResult}
            />
          )}
          {currentStep === "result" && showFullResult && (
            <FullResult key="full-result" userData={userData} quizAnswers={quizAnswers} />
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-white/60 text-sm font-body"
        >
          www.quizzastrology.com
        </motion.div>
      </div>
    </div>
  )
}

export default SoulMissionQuiz
