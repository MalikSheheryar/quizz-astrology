"use client"
import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import UserForm from "./UserForm"
import QuizEngine from "./QuizEngine"
import ShortResult from "./ShortResult"
import FullResult from "./FullResult"
import { Stars, Heart, Sparkles } from "lucide-react"

interface QuizData {
  _id: string
  title: string
  description: string
  price: number
}

interface LoveProphecyQuizProps {
  quizData: QuizData
}

const LoveProphecyQuiz: React.FC<LoveProphecyQuizProps> = ({ quizData }) => {
  const [currentStage, setCurrentStage] = useState("form") // form, quiz, prophecy, fullReport
  const [userData, setUserData] = useState({})
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showFullReport, setShowFullReport] = useState(false)

  const handleUserDataSubmit = (data: any) => {
    setUserData(data)
    setCurrentStage("quiz")
  }

  const handleQuizComplete = (answers: any) => {
    setQuizAnswers(answers)
    setCurrentStage("prophecy")
  }

  const handleUnlockReport = () => {
    setShowFullReport(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-10 left-10 text-yellow-400 opacity-30"
        >
          <Stars size={40} />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-20 right-20 text-purple-400 opacity-40"
        >
          <Sparkles size={35} />
        </motion.div>
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute bottom-20 left-1/4 text-yellow-300 opacity-25"
        >
          <Heart size={30} />
        </motion.div>

        {/* Floating Sparkles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {currentStage === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
            >
              <UserForm onSubmit={handleUserDataSubmit} />
            </motion.div>
          )}
          {currentStage === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
            >
              <QuizEngine userData={userData} onComplete={handleQuizComplete} />
            </motion.div>
          )}
          {currentStage === "prophecy" && (
            <motion.div
              key="prophecy"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <ShortResult
                userData={userData}
                answers={quizAnswers}
                onUnlock={handleUnlockReport}
                showFullReport={showFullReport}
                quizData={quizData}
              />

              <AnimatePresence>
                {showFullReport && <FullResult userData={userData} answers={quizAnswers} />}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Website Logo */}
      <motion.div
        className="absolute top-6 left-6 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-white font-bold text-lg tracking-wide">QuizzAstrology.com</div>
      </motion.div>
    </div>
  )
}

export default LoveProphecyQuiz
