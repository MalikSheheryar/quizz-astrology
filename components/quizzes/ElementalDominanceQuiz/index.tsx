'use client'
import { useState } from 'react'
import UserForm from './UserForm'
import QuizComponent from './QuizComponent'
import ShortResult from './ShortResult'
import FullResult from './FullResult'
// import { StarField } from "../../shared/components"

const ElementalDominanceQuiz = () => {
  console.log('🚀 Main component rendered')

  const [currentStep, setCurrentStep] = useState('userForm')
  const [userData, setUserData] = useState(null)
  const [quizResults, setQuizResults] = useState(null)
  const [showFullResult, setShowFullResult] = useState(false)

  console.log('📍 Current step:', currentStep)

  // Make sure this function is defined properly
  const handleUserSubmit = (data: any) => {
    console.log('✨ handleUserSubmit called with:', data)
    setUserData(data)
    setCurrentStep('quiz')
  }

  const handleQuizComplete = (results: any) => {
    console.log('🎉 handleQuizComplete called with:', results)
    setQuizResults(results)
    setCurrentStep('result')
  }

  const handleShowFullResult = () => {
    console.log('🔓 handleShowFullResult called')
    setShowFullResult(true)
  }

  // Log what we're about to render
  console.log('🎬 About to render step:', currentStep)
  console.log(
    '📝 Passing handleUserSubmit:',
    typeof handleUserSubmit,
    !!handleUserSubmit
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EA4C89] to-[#FB8C00] text-white relative overflow-hidden">
      {/* Debug indicator */}
      <div className="fixed top-4 left-4 bg-black/80 text-white p-2 rounded z-50 text-xs font-mono">
        Step: {currentStep}
      </div>

      {/* StarField commented out temporarily */}
      {/* <StarField /> */}

      <div className="relative z-10">
        {currentStep === 'userForm' && (
          <div>
            <div className="text-center py-4">
              <p className="text-white/70">🔍 USER FORM ACTIVE</p>
            </div>
            <UserForm onSubmit={handleUserSubmit} />
          </div>
        )}

        {currentStep === 'quiz' && userData && (
          <div>
            <div className="text-center py-4">
              <p className="text-white/70">📝 QUIZ ACTIVE</p>
            </div>
            <QuizComponent
              userData={userData}
              onComplete={handleQuizComplete}
            />
          </div>
        )}

        {currentStep === 'result' && userData && quizResults && (
          <div>
            <div className="text-center py-4">
              <p className="text-white/70">🎯 RESULTS ACTIVE</p>
            </div>
            <>
              {!showFullResult ? (
                <ShortResult
                  userData={userData}
                  results={quizResults}
                  onShowFullResult={handleShowFullResult}
                />
              ) : (
                <FullResult userData={userData} results={quizResults} />
              )}
            </>
          </div>
        )}
      </div>
    </div>
  )
}

export default ElementalDominanceQuiz
