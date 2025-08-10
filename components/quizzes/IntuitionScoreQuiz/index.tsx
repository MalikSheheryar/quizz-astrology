"use client"
import { useState } from "react"
import UserForm from "./UserForm"
import QuizEngine from "./QuizEngine"
import ShortResult from "./ShortResult"
import FullResult from "./FullResult"
import { ParticleBackground } from "../../shared/components"

const IntuitionScoreQuiz = () => {
  const [currentStep, setCurrentStep] = useState("userForm")
  const [userData, setUserData] = useState(null)
  const [quizAnswers, setQuizAnswers] = useState([])
  const [finalScore, setFinalScore] = useState(null)
  const [showFullResult, setShowFullResult] = useState(false)

  const handleUserSubmit = (data: any) => {
    setUserData(data)
    setCurrentStep("quiz")
  }

  const handleQuizComplete = (answers: any, score: number) => {
    setQuizAnswers(answers)
    setFinalScore(score)
    setCurrentStep("result")
  }

  const handleShowFullResult = () => {
    setShowFullResult(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        {currentStep === "userForm" && <UserForm onSubmit={handleUserSubmit} />}
        {currentStep === "quiz" && <QuizEngine userData={userData} onComplete={handleQuizComplete} />}
        {currentStep === "result" && (
          <>
            <ShortResult userData={userData} score={finalScore} onShowFullResult={handleShowFullResult} />
            {showFullResult && <FullResult userData={userData} score={finalScore} answers={quizAnswers} />}
          </>
        )}
      </div>
    </div>
  )
}

export default IntuitionScoreQuiz
