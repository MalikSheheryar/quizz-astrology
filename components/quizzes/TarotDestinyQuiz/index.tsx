"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import UserForm from "./UserForm"
import TarotDeck from "./TarotDeck"
import CardReveal from "./CardReveal"
import ShortResult from "./ShortResult"
import FullResult from "./FullResult"

const TarotDestinyQuiz = () => {
  const [currentStep, setCurrentStep] = useState("form")
  const [userData, setUserData] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)
  const [showFullReading, setShowFullReading] = useState(false)

  const handleFormSubmit = (data) => {
    setUserData(data)
    setCurrentStep("deck")
  }

  const handleCardSelect = (card) => {
    setSelectedCard(card)
    setCurrentStep("reveal")
  }

  const handleRevealShort = () => {
    setCurrentStep("shortResult")
  }

  const handleShowFullResult = () => {
    setShowFullReading(true)
    setCurrentStep("fullResult")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-orange-500">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-serif">
              Pick a Tarot Card to Reveal Your Future
            </h1>
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-purple-500 rounded"></div>
              <span className="mx-4 text-yellow-400 text-2xl">✨</span>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-yellow-400 rounded"></div>
            </div>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Experience a mystical journey into your destiny with our exclusive tarot reading
            </p>
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {currentStep === "form" && <UserForm onSubmit={handleFormSubmit} />}

            {currentStep === "deck" && <TarotDeck onCardSelect={handleCardSelect} />}

            {currentStep === "reveal" && selectedCard && (
              <CardReveal card={selectedCard} onRevealShort={handleRevealShort} />
            )}

            {currentStep === "shortResult" && (
              <ShortResult userData={userData} selectedCard={selectedCard} onShowFullResult={handleShowFullResult} />
            )}

            {currentStep === "fullResult" && <FullResult userData={userData} selectedCard={selectedCard} />}
          </AnimatePresence>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-12"
          >
            <p className="text-white/60 text-sm">
              Powered by <span className="text-yellow-400 font-semibold">www.quizzastrology.com</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TarotDestinyQuiz
