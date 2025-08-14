"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import UserForm from "./UserForm"
import QuizEngine from "./QuizEngine"
import ShortResult from "./ShortResult"
import FullResult from "./FullResult"
import { FloatingParticles } from "./FloatingParticles"

export default function FortuneTellerQuiz() {
  const [currentStep, setCurrentStep] = useState("form")
  const [userData, setUserData] = useState(null)
  const [quizAnswers, setQuizAnswers] = useState([])
  const [results, setResults] = useState(null)
  const [showFullResult, setShowFullResult] = useState(false)

  const handleFormSubmit = (data) => {
    setUserData(data)
    setCurrentStep("quiz")
  }

  const handleQuizComplete = (answers) => {
    setQuizAnswers(answers)

    // Generate mystical fortune based on answers
    const fortune = generateFortune(answers, userData)
    setResults(fortune)
    setCurrentStep("shortResult")
  }

  const handlePaymentSuccess = () => {
    setShowFullResult(true)
    setCurrentStep("fullResult")
  }

  const generateFortune = (answers, userData) => {
    const fortunes = {
      love: [
        "A passionate romance awaits you under the next full moon. Your heart chakra is opening to receive divine love.",
        "Your soulmate is closer than you think. Look for signs in unexpected places - they carry the energy of your destiny.",
        "A karmic relationship from your past will resurface, bringing healing and closure to your romantic journey.",
      ],
      career: [
        "Your creative talents will soon be recognized by someone in a position of power. Trust your intuitive gifts.",
        "A major career transformation is approaching. The universe is aligning opportunities that match your soul's purpose.",
        "Financial abundance flows to you through your spiritual gifts. Your psychic abilities are your greatest asset.",
      ],
      destiny: [
        "You are entering a powerful spiritual awakening phase. Your third eye is opening to receive cosmic wisdom.",
        "The ancestors are guiding you toward your life's true mission. Pay attention to recurring dreams and synchronicities.",
        "A significant life change will occur within the next three lunar cycles. Trust the process of transformation.",
      ],
    }

    const selectedFortune = fortunes[answers[0]] || fortunes.destiny
    const fortuneText = selectedFortune[Math.floor(Math.random() * selectedFortune.length)]

    return {
      mainFortune: fortuneText,
      mysticalSymbol: answers[2] || "moon",
      spiritualGuidance:
        "The crystal ball reveals that your spiritual journey is accelerating. Trust your intuition and embrace the mystical experiences coming your way.",
      fullAnalysis: `Dear ${userData?.name || "Seeker"},

The ancient crystal ball has revealed profound insights about your spiritual path. Your energy signature resonates with powerful mystical frequencies that indicate a time of great transformation.

${fortuneText}

The mystical symbol that appeared in your reading - the ${answers[2] || "moon"} - carries special significance for your journey. This symbol will appear in your life as a sign that you are on the right path.

Your spiritual gifts are awakening, and the universe is preparing you for a higher purpose. The fortune teller's crystal ball shows that within the next lunar cycle, you will experience:

• A significant spiritual awakening or psychic experience
• An important message from your spirit guides
• A chance encounter that changes your perspective
• Recognition of your intuitive abilities by others

The cosmic forces are aligning to support your highest good. Trust in the magic that surrounds you, for you are a chosen vessel for divine wisdom.

Blessed be your journey,
The Mystical Fortune Teller`,
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black relative overflow-hidden">
      <FloatingParticles />

      <AnimatePresence mode="wait">
        {currentStep === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
          >
            <UserForm onSubmit={handleFormSubmit} />
          </motion.div>
        )}

        {currentStep === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
          >
            <QuizEngine userData={userData} onComplete={handleQuizComplete} />
          </motion.div>
        )}

        {currentStep === "shortResult" && (
          <motion.div
            key="shortResult"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <ShortResult userData={userData} results={results} onPaymentSuccess={handlePaymentSuccess} />
          </motion.div>
        )}

        {currentStep === "fullResult" && (
          <motion.div
            key="fullResult"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FullResult userData={userData} results={results} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
