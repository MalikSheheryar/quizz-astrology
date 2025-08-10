'use client'
import { useState } from 'react'
import UserForm from './UserForm'
import QuizEngine from './QuizEngine'
import ShortResult from './ShortResult'
import FullResult from './FullResult'
import { CosmicBackground } from './components'

const ZodiacSoulmateQuiz = () => {
  const [currentStep, setCurrentStep] = useState('userForm')
  const [userData, setUserData] = useState({})
  const [quizAnswers, setQuizAnswers] = useState([])
  const [soulmate, setSoulmate] = useState(null)
  const [showFullResult, setShowFullResult] = useState(false)

  const handleUserSubmit = (data: any) => {
    setUserData(data)
    localStorage.setItem('userFormData', JSON.stringify(data))
    setCurrentStep('quiz')
  }

  const handleQuizComplete = (answers: any) => {
    setQuizAnswers(answers)
    const calculatedSoulmate = calculateSoulmate(answers)
    setSoulmate(calculatedSoulmate)
    setCurrentStep('shortResult')
  }

  const calculateSoulmate = (answers: any[]) => {
    const scores = {
      aries: 0,
      taurus: 0,
      gemini: 0,
      cancer: 0,
      leo: 0,
      virgo: 0,
      libra: 0,
      scorpio: 0,
      sagittarius: 0,
      capricorn: 0,
      aquarius: 0,
      pisces: 0,
    }

    answers.forEach((answer) => {
      if (answer.scores) {
        Object.keys(answer.scores).forEach((sign) => {
          scores[sign as keyof typeof scores] += answer.scores[sign]
        })
      }
    })

    const topSign = Object.keys(scores).reduce((a, b) =>
      scores[a as keyof typeof scores] > scores[b as keyof typeof scores]
        ? a
        : b
    )

    return getSignDetails(topSign)
  }

  const getSignDetails = (sign: string) => {
    const signData: any = {
      aries: {
        name: 'Aries',
        element: 'Fire',
        symbol: '♈',
        description: 'passionate and adventurous',
      },
      taurus: {
        name: 'Taurus',
        element: 'Earth',
        symbol: '♉',
        description: 'loyal and sensual',
      },
      gemini: {
        name: 'Gemini',
        element: 'Air',
        symbol: '♊',
        description: 'witty and intellectually stimulating',
      },
      cancer: {
        name: 'Cancer',
        element: 'Water',
        symbol: '♋',
        description: 'gentle, nurturing, and your emotional mirror',
      },
      leo: {
        name: 'Leo',
        element: 'Fire',
        symbol: '♌',
        description: 'confident and magnetically charming',
      },
      virgo: {
        name: 'Virgo',
        element: 'Earth',
        symbol: '♍',
        description: 'thoughtful and deeply caring',
      },
      libra: {
        name: 'Libra',
        element: 'Air',
        symbol: '♎',
        description: 'harmonious and romantically devoted',
      },
      scorpio: {
        name: 'Scorpio',
        element: 'Water',
        symbol: '♏',
        description: 'intense and transformatively passionate',
      },
      sagittarius: {
        name: 'Sagittarius',
        element: 'Fire',
        symbol: '♐',
        description: 'free-spirited and inspiring',
      },
      capricorn: {
        name: 'Capricorn',
        element: 'Earth',
        symbol: '♑',
        description: 'ambitious and steadfastly loyal',
      },
      aquarius: {
        name: 'Aquarius',
        element: 'Air',
        symbol: '♒',
        description: 'innovative and intellectually fascinating',
      },
      pisces: {
        name: 'Pisces',
        element: 'Water',
        symbol: '♓',
        description: 'dreamy and spiritually connected',
      },
    }
    return signData[sign]
  }

  const handleShowFullResult = () => {
    setShowFullResult(true)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      <div className="relative z-10">
        <header className="text-center py-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            QuizzAstrology.com
          </h1>
          <p className="text-xl text-white/90">
            Which Zodiac Sign Is Your Ideal Soulmate?
          </p>
        </header>

        {currentStep === 'userForm' && <UserForm onNext={handleUserSubmit} />}
        {currentStep === 'quiz' && (
          <QuizEngine onComplete={handleQuizComplete} />
        )}
        {currentStep === 'shortResult' && (
          <ShortResult
            userData={userData}
            soulmate={soulmate}
            onShowFullResult={handleShowFullResult}
          />
        )}
        {showFullResult && (
          <FullResult
            userData={userData}
            soulmate={soulmate}
            quizAnswers={quizAnswers}
          />
        )}
      </div>
    </div>
  )
}

export default ZodiacSoulmateQuiz
