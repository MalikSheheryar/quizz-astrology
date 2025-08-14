"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import UserForm from "./UserForm"
import QuizEngine from "./QuizEngine"
import ShortResult from "./ShortResult"
import FullResult from "./FullResult"
import FloatingSymbols from "./FloatingSymbols"

const PsychicAwakeningQuiz = ({ quizData }) => {
  const [currentStep, setCurrentStep] = useState("userForm")
  const [userData, setUserData] = useState({})
  const [quizResults, setQuizResults] = useState({})

  const handleUserSubmit = (data) => {
    setUserData(data)
    setCurrentStep("quiz")
  }

  const handleQuizComplete = (results) => {
    setQuizResults(results)
    setCurrentStep("shortResult")
  }

  const handleViewFullResult = () => {
    setCurrentStep("fullResult")
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-500 via-purple-600 to-orange-500">
      <FloatingSymbols />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-300 to-purple-400 bg-clip-text text-transparent">
            Do You Have Clairvoyant Powers?
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover your hidden psychic abilities through this mystical journey of self-discovery
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {currentStep === "userForm" && <UserForm key="userForm" onSubmit={handleUserSubmit} />}
          {currentStep === "quiz" && <QuizEngine key="quiz" userData={userData} onComplete={handleQuizComplete} />}
          {currentStep === "shortResult" && (
            <ShortResult
              key="shortResult"
              userData={userData}
              results={quizResults}
              onViewFull={handleViewFullResult}
              quizSlug="psychic-awakening-quiz"
              quizTitle="Psychic Awakening Quiz"
            />
          )}
          {currentStep === "fullResult" && <FullResult key="fullResult" userData={userData} results={quizResults} />}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default PsychicAwakeningQuiz
