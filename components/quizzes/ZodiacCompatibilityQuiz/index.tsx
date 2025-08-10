'use client'
import { useState } from 'react'
import UserForm from './UserForm'
import QuizFlow from './QuizFlow'
import ResultPage from './ResultPage'
import { AnimatedBackground } from '../../shared/components'

const ZodiacCompatibilityQuiz = () => {
  const [currentStep, setCurrentStep] = useState('userForm')
  const [userData, setUserData] = useState({})
  const [quizResults, setQuizResults] = useState({})
  const [showFullResult, setShowFullResult] = useState(false)

  const handleUserSubmit = (data: any) => {
    setUserData(data)
    localStorage.setItem('userFormData', JSON.stringify(data))
    setCurrentStep('quiz')
  }

  const handleQuizComplete = (results: any) => {
    setQuizResults(results)
    setCurrentStep('result')
  }

  const handleShowFullResult = () => {
    setShowFullResult(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <header className="text-center py-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            QuizzAstrology.com
          </h1>
          <p className="text-xl text-white/90">
            What Zodiac Sign Should You Avoid in Life and Love?
          </p>
        </header>

        {currentStep === 'userForm' && <UserForm onNext={handleUserSubmit} />}
        {currentStep === 'quiz' && <QuizFlow onComplete={handleQuizComplete} />}
        {currentStep === 'result' && (
          <>
            <ResultPage
              userData={userData}
              results={quizResults}
              onShowFullResult={handleShowFullResult}
            />
            {showFullResult && <div>Full result content here</div>}
          </>
        )}
      </div>
    </div>
  )
}

export default ZodiacCompatibilityQuiz
