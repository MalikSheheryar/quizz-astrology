"use client"
import { useState } from "react"
import UserForm from "./UserForm"
import QuizComponent from "./QuizComponent"
import ShortResult from "./ShortResult"
import FullResult from "./FullResult"
import { AnimatedBackground } from "../../shared/components"

const PlanetaryInfluenceQuiz = () => {
  const [currentStep, setCurrentStep] = useState("userForm")
  const [userData, setUserData] = useState(null)
  const [quizResults, setQuizResults] = useState(null)
  const [showFullResult, setShowFullResult] = useState(false)

  const handleUserSubmit = (data: any) => {
    setUserData(data)
    setCurrentStep("quiz")
  }

  const handleQuizComplete = (results: any) => {
    setQuizResults(results)
    setCurrentStep("result")
  }

  const handleShowFullResult = () => {
    setShowFullResult(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EA4C89] to-[#FB8C00] relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        {currentStep === "userForm" && <UserForm onSubmit={handleUserSubmit} />}
        {currentStep === "quiz" && <QuizComponent onComplete={handleQuizComplete} />}
        {currentStep === "result" && (
          <>
            <ShortResult userData={userData} results={quizResults} onShowFullResult={handleShowFullResult} />
            {showFullResult && <FullResult userData={userData} results={quizResults} />}
          </>
        )}
      </div>
    </div>
  )
}

export default PlanetaryInfluenceQuiz
