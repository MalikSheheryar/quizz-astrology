'use client'
import { useState } from 'react'
import UserForm from './UserForm'
import QuizEngine from './QuizEngine'
import ShortResult from './ShortResult'
import FullResult from './FullResult'
import { AnimatedBackground } from '../../shared/components'

const RisingSignQuiz = () => {
  const [currentStep, setCurrentStep] = useState('userInfo')
  const [userInfo, setUserInfo] = useState({})
  const [quizAnswers, setQuizAnswers] = useState([])
  const [showFullResult, setShowFullResult] = useState(false)
  const [risingSign, setRisingSign] = useState('')

  const handleUserInfoSubmit = (info: any) => {
    setUserInfo(info)
    setCurrentStep('quiz')
  }

  const handleQuizComplete = (answers: any, calculatedSign: string) => {
    setQuizAnswers(answers)
    setRisingSign(calculatedSign)
    setCurrentStep('result')
  }

  const handleShowFullResult = () => {
    setShowFullResult(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EA4C89] to-[#FB8C00] text-white relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        {currentStep === 'userInfo' && (
          <UserForm onSubmit={handleUserInfoSubmit} />
        )}
        {currentStep === 'quiz' && (
          <QuizEngine onComplete={handleQuizComplete} />
        )}
        {currentStep === 'result' && (
          <>
            <ShortResult
              userData={userInfo}
              risingSign={risingSign}
              onShowFullResult={handleShowFullResult}
            />
            {showFullResult && (
              <FullResult
                userInfo={userInfo}
                quizAnswers={quizAnswers}
                risingSign={risingSign}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default RisingSignQuiz
