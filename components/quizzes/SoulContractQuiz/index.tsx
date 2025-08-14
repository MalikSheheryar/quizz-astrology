"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CoupleForm from "./CoupleForm"
import SoulQuizEngine from "./SoulQuizEngine"
import ShortResult from "./ShortResult"
import FullResult from "./FullResult"
import { FloatingElements } from "./components"
import { Heart, Sparkles } from "lucide-react"

const SoulContractQuiz = () => {
  const [step, setStep] = useState("form") // form, quiz, result
  const [coupleData, setCoupleData] = useState(null)
  const [quizResults, setQuizResults] = useState(null)
  const [showFullResult, setShowFullResult] = useState(false)

  const handleFormComplete = (data) => {
    setCoupleData(data)
    setStep("quiz")
  }

  const handleQuizComplete = (results) => {
    setQuizResults(results)
    setStep("result")
  }

  const handleShowFullResult = () => {
    setShowFullResult(true)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-500 via-orange-400 to-amber-500">
      <FloatingElements />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center py-8"
      >
        <div className="flex items-center justify-center mb-4">
          <Heart className="w-8 h-8 text-yellow-300 mr-2" />
          <h1 className="text-2xl font-bold text-white">QuizzAstrology.com</h1>
          <Sparkles className="w-8 h-8 text-yellow-300 ml-2" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">Are You and Your Partner</h2>
        <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-300 to-purple-400 bg-clip-text text-transparent">
          Soul Contracts or Past Life Lovers?
        </h3>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pb-12">
        <AnimatePresence mode="wait">
          {step === "form" && !showFullResult && <CoupleForm key="form" onComplete={handleFormComplete} />}
          {step === "quiz" && !showFullResult && (
            <SoulQuizEngine key="quiz" coupleData={coupleData} onComplete={handleQuizComplete} />
          )}
          {step === "result" && !showFullResult && (
            <ShortResult
              key="short-result"
              results={quizResults}
              coupleData={coupleData}
              onShowFullResult={handleShowFullResult}
            />
          )}
          {step === "result" && showFullResult && (
            <FullResult key="full-result" coupleData={coupleData} results={quizResults} />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SoulContractQuiz
