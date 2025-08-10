'use client'
import type React from 'react'
import { Suspense, lazy } from 'react'
import { getQuizBySlug } from '@/utils/localQuizData'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface QuizRendererProps {
  slug: string
}

// Map quiz component names to their lazy-loaded components
const quizComponents: {
  [key: string]: React.LazyExoticComponent<React.ComponentType<any>>
} = {
  ElementalDominanceQuiz: lazy(
    () => import('./quizzes/ElementalDominanceQuiz')
  ),
  PlanetaryInfluenceQuiz: lazy(
    () => import('./quizzes/PlanetaryInfluenceQuiz')
  ),
  RisingSignQuiz: lazy(() => import('./quizzes/RisingSignQuiz')),
  ZodiacCompatibilityQuiz: lazy(
    () => import('./quizzes/ZodiacCompatibilityQuiz')
  ),
  IntuitionScoreQuiz: lazy(() => import('./quizzes/IntuitionScoreQuiz')),
  ChakraBlockedQuiz: lazy(() => import('./quizzes/ChakraBlockedQuiz')),
  TwinFlameKarmicQuiz: lazy(() => import('./quizzes/TwinFlameKarmicQuiz')),
  ZodiacSoulmateQuiz: lazy(() => import('./quizzes/ZodiacSoulmateQuiz')),
  LoveCompatibilityQuiz: lazy(() => import('./quizzes/LoveCompatibilityQuiz')),
  LoveProphecyQuiz: lazy(() => import('./quizzes/LoveProphecyQuiz')),
  // Add more quiz components here as you create them
}

const QuizRenderer: React.FC<QuizRendererProps> = ({ slug }) => {
  const router = useRouter()

  // Find quiz by slug
  const quiz = getQuizBySlug(slug)

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-400 mb-4">
            Quiz Not Found
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            The quiz you are looking for does not exist.
          </p>
          <Button
            onClick={() => router.push('/')}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </div>
      </div>
    )
  }

  const QuizComponent = quizComponents[quiz.component]

  if (!QuizComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-400 mb-4">
            Quiz Component Missing
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            The component for this quiz is not implemented yet.
          </p>
          <Button
            onClick={() => router.push('/')}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center text-purple-300">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p>Loading Quiz...</p>
            </div>
          </div>
        }
      >
        <QuizComponent quizData={quiz} />
      </Suspense>
    </div>
  )
}

export default QuizRenderer
