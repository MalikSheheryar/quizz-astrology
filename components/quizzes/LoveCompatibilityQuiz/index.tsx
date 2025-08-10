"use client"
import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import UserForm from "./UserForm"
import QuizEngine from "./QuizEngine"
import ShortResult from "./ShortResult"
import FullResult from "./FullResult"
import FloatingParticles from "./components/FloatingParticles"

interface QuizData {
  _id: string
  title: string
  description: string
  price: number
}

interface LoveCompatibilityQuizProps {
  quizData: QuizData
}

const LoveCompatibilityQuiz: React.FC<LoveCompatibilityQuizProps> = ({ quizData }) => {
  const [currentStep, setCurrentStep] = useState("form")
  const [userData, setUserData] = useState({})
  const [quizAnswers, setQuizAnswers] = useState([])
  const [compatibilityScore, setCompatibilityScore] = useState(null)
  const [showFullResult, setShowFullResult] = useState(false)

  const handleFormComplete = (data: any) => {
    setUserData(data)
    setCurrentStep("quiz")
  }

  const handleQuizComplete = (answers: any, score: any) => {
    setQuizAnswers(answers)
    setCompatibilityScore(score)
    setCurrentStep("results")
  }

  const handleShowFullResult = () => {
    setShowFullResult(true)
  }

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-rose-400 to-orange-400 relative overflow-hidden">
      <FloatingParticles />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {currentStep === "form" && (
            <motion.div
              key="form"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6 }}
              className="w-full max-w-2xl"
            >
              <UserForm onComplete={handleFormComplete} />
            </motion.div>
          )}

          {currentStep === "quiz" && (
            <motion.div
              key="quiz"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6 }}
              className="w-full max-w-4xl"
            >
              <QuizEngine userData={userData} onComplete={handleQuizComplete} />
            </motion.div>
          )}

          {currentStep === "results" && (
            <motion.div
              key="results"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6 }}
              className="w-full max-w-4xl"
            >
              <ShortResult
                userData={userData}
                compatibilityScore={compatibilityScore}
                onShowFull={handleShowFullResult}
                showFullResult={showFullResult}
                quizData={quizData}
              />

              <AnimatePresence>
                {showFullResult && (
                  <FullResult userData={userData} quizAnswers={quizAnswers} compatibilityScore={compatibilityScore} />
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 right-4 z-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-white/80 text-sm font-medium"
        >
          www.quizzastrology.com
        </motion.div>
      </div>
    </div>
  )
}

export default LoveCompatibilityQuiz
