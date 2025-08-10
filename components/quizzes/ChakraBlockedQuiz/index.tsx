"use client"
import { useState } from "react"
import UserForm from "./UserForm"
import QuizEngine from "./QuizEngine"
import ShortResult from "./ShortResult"
import FullResult from "./FullResult"
import { FloatingElements } from "../../shared/components"

const ChakraBlockedQuiz = () => {
  const [currentStep, setCurrentStep] = useState("intake")
  const [userData, setUserData] = useState({})
  const [quizData, setQuizData] = useState({})
  const [chakraScores, setChakraScores] = useState({
    root: 0,
    sacral: 0,
    solarPlexus: 0,
    heart: 0,
    throat: 0,
    thirdEye: 0,
    crown: 0,
  })
  const [showFullResult, setShowFullResult] = useState(false)

  const handleUserFormComplete = (data: any) => {
    setUserData(data)
    setCurrentStep("quiz")
  }

  const handleQuizComplete = (scores: any, responses: any) => {
    setChakraScores(scores)
    setQuizData(responses)
    setCurrentStep("results")
  }

  const handleShowFullResult = () => {
    setShowFullResult(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EA4C89] to-[#FB8C00] relative overflow-hidden">
      <FloatingElements />
      <div className="relative z-10">
        {currentStep === "intake" && <UserForm onComplete={handleUserFormComplete} />}
        {currentStep === "quiz" && <QuizEngine userData={userData} onComplete={handleQuizComplete} />}
        {currentStep === "results" && (
          <>
            <ShortResult
              userData={userData}
              chakraScores={chakraScores}
              quizData={quizData}
              onShowFullResult={handleShowFullResult}
            />
            {showFullResult && <FullResult userData={userData} chakraScores={chakraScores} quizData={quizData} />}
          </>
        )}
      </div>
    </div>
  )
}

export default ChakraBlockedQuiz
