"use client"
import { useState } from "react"
import UserForm from "./UserForm"
import QuizEngine from "./QuizEngine"
import ShortResult from "./ShortResult"
import FullResult from "./FullResult"
import { AnimatedBackground } from "../../shared/components"

const TwinFlameKarmicQuiz = () => {
  const [currentStep, setCurrentStep] = useState("userForm")
  const [userData, setUserData] = useState({})
  const [quizAnswers, setQuizAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [showFullResult, setShowFullResult] = useState(false)

  const handleUserSubmit = (data: any) => {
    setUserData(data)
    localStorage.setItem("userFormData", JSON.stringify(data))
    setCurrentStep("quiz")
  }

  const handleQuizComplete = (answers: any) => {
    setQuizAnswers(answers)
    const calculatedResult = calculateResult(answers)
    setResult(calculatedResult)
    setCurrentStep("shortResult")
  }

  const calculateResult = (answers: any[]) => {
    let twinFlameScore = 0
    let karmicScore = 0

    answers.forEach((answer) => {
      if (answer.type === "twinFlame") twinFlameScore += answer.weight
      if (answer.type === "karmic") karmicScore += answer.weight
    })

    if (twinFlameScore > karmicScore + 5) return "Twin Flame"
    if (karmicScore > twinFlameScore + 5) return "Karmic Lesson"
    return "Both – a transformative twin soul connection with karmic roots"
  }

  const handleShowFullResult = () => {
    setShowFullResult(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-orange-500 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <header className="text-center py-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">QuizzAstrology.com</h1>
          <p className="text-xl text-white/90">Is Your Partner Your Twin Flame or a Karmic Lesson?</p>
        </header>

        {currentStep === "userForm" && <UserForm onNext={handleUserSubmit} />}
        {currentStep === "quiz" && <QuizEngine onComplete={handleQuizComplete} />}
        {currentStep === "shortResult" && (
          <ShortResult userData={userData} result={result} onShowFullResult={handleShowFullResult} />
        )}
        {showFullResult && <FullResult userData={userData} result={result} answers={quizAnswers} />}
      </div>
    </div>
  )
}

export default TwinFlameKarmicQuiz
