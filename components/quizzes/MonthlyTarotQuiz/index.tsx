"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import UserForm from "./UserForm"
import SymbolQuiz from "./SymbolQuiz"
import CardDraw from "./CardDraw"
import ShortResult from "./ShortResult"
import FullReading from "./FullReading"
import ParticleBackground from "./ParticleBackground"

const MonthlyTarotQuiz = ({ quizData }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [userData, setUserData] = useState({})
  const [quizAnswers, setQuizAnswers] = useState({})
  const [selectedCard, setSelectedCard] = useState(null)

  const steps = ["userForm", "symbolQuiz", "cardDraw", "shortResult", "fullReading"]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleUserData = (data) => {
    setUserData(data)
    nextStep()
  }

  const handleQuizComplete = (answers) => {
    setQuizAnswers(answers)
    nextStep()
  }

  const handleCardSelection = (card) => {
    setSelectedCard(card)
    nextStep()
  }

  const handleViewFullResult = () => {
    setCurrentStep(4) // Go to full reading
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-500 via-purple-600 to-orange-500">
      <ParticleBackground />

      {/* Header */}
      <div className="relative z-10 text-center pt-8 pb-4">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 font-heading">What's Your Tarot Card</h1>
          <h2 className="text-2xl md:text-4xl font-light text-yellow-300 mb-8">for This Month?</h2>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="userForm"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <UserForm onSubmit={handleUserData} />
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="symbolQuiz"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <SymbolQuiz onComplete={handleQuizComplete} />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="cardDraw"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <CardDraw onCardSelect={handleCardSelection} quizAnswers={quizAnswers} />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="shortResult"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <ShortResult
                userData={userData}
                selectedCard={selectedCard}
                quizAnswers={quizAnswers}
                onViewFull={handleViewFullResult}
                quizSlug="monthly-tarot-quiz"
                quizTitle="Monthly Tarot Quiz"
              />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="fullReading"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <FullReading userData={userData} selectedCard={selectedCard} quizAnswers={quizAnswers} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MonthlyTarotQuiz
