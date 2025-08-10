'use client'
import type React from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
// import { fadeIn, slideIn } from '../../shared/utils/motion'
import { quizQuestions } from './quizData'

interface QuizComponentProps {
  userData: any
  onComplete: (results: any) => void
}

const fadeIn = (direction: string, delay: number) => ({
  initial: {
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    opacity: 0,
  },
  animate: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: delay,
      ease: 'easeOut',
    },
  },
})

const QuizComponent: React.FC<QuizComponentProps> = ({
  userData,
  onComplete,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleAnswerSelect = (
    questionId: number,
    answerId: string,
    element: string
  ) => {
    console.log('🎯 Answer selected:', { questionId, answerId, element })
    setSelectedAnswer(answerId)
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { answerId, element },
    }))
  }

  const handleNext = () => {
    console.log('➡️ Next button clicked, selectedAnswer:', selectedAnswer)

    if (selectedAnswer !== null) {
      if (currentQuestion < quizQuestions.length - 1) {
        console.log('📍 Moving to next question')
        setCurrentQuestion((prev) => prev + 1)
        setSelectedAnswer(null)
      } else {
        console.log('✅ Quiz complete, calculating results')
        console.log('📊 Current answers:', answers)

        const results = calculateResults()
        console.log('🎉 Calculated results:', results)

        onComplete(results)
      }
    } else {
      console.log('❌ No answer selected')
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
      const prevAnswer = answers[quizQuestions[currentQuestion - 1].id]
      setSelectedAnswer(prevAnswer ? prevAnswer.answerId : null)
    }
  }

  const calculateResults = () => {
    console.log('🧮 Starting calculateResults')
    console.log('📝 All answers:', answers)

    const elementCounts = { fire: 0, water: 0, earth: 0, air: 0 }

    // Make sure we're iterating through all answers
    Object.entries(answers).forEach(([questionId, answer]) => {
      console.log(`Question ${questionId}:`, answer)
      if (answer && answer.element) {
        const element = answer.element as keyof typeof elementCounts
        if (elementCounts.hasOwnProperty(element)) {
          elementCounts[element]++
          console.log(
            `✅ Added to ${element}, new count:`,
            elementCounts[element]
          )
        } else {
          console.log(`❌ Unknown element: ${element}`)
        }
      } else {
        console.log(`⚠️ Invalid answer for question ${questionId}:`, answer)
      }
    })

    console.log('🔢 Final element counts:', elementCounts)

    const total = Object.values(elementCounts).reduce(
      (sum, count) => sum + count,
      0
    )

    console.log('🎯 Total answers counted:', total)

    if (total === 0) {
      console.error('❌ No valid answers found!')
      // Return a default result to prevent breaking
      return {
        elementCounts,
        percentages: { fire: 25, water: 25, earth: 25, air: 25 },
        dominantElement: 'fire',
      }
    }

    const percentages: Record<string, number> = {}
    Object.keys(elementCounts).forEach((element) => {
      percentages[element] = Math.round(
        (elementCounts[element as keyof typeof elementCounts] / total) * 100
      )
    })

    console.log('📊 Calculated percentages:', percentages)

    const dominantElement = Object.keys(elementCounts).reduce((a, b) =>
      elementCounts[a as keyof typeof elementCounts] >
      elementCounts[b as keyof typeof elementCounts]
        ? a
        : b
    )

    console.log('👑 Dominant element:', dominantElement)

    const results = { elementCounts, percentages, dominantElement }
    console.log('🏆 Final results object:', results)

    return results
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const question = quizQuestions[currentQuestion]

  // Debug current question state
  console.log(
    '🎬 Rendering question:',
    currentQuestion + 1,
    'of',
    quizQuestions.length
  )
  console.log('🎯 Current selected answer:', selectedAnswer)
  console.log('📝 Question answers stored:', answers[question?.id])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        {...fadeIn('up', 0.2)}
        className="w-full max-w-4xl bg-[#1F2A38] rounded-3xl p-8 shadow-2xl border border-white/10"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white/70 text-sm">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-white/70 text-sm">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="h-2 bg-gradient-to-r from-[#915EFF] to-[#FF5F6D] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-4xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                exit={{ opacity: 0, x: -100 }}
                className="text-center mb-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {question.question}
                </h2>
                {question.description && (
                  <p className="text-white/70 text-lg">
                    {question.description}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Answers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {question.answers.map((answer, index) => (
            <motion.button
              key={answer.id}
              {...fadeIn('up', 0.1 * index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                handleAnswerSelect(question.id, answer.id, answer.element)
              }
              className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                selectedAnswer === answer.id
                  ? 'border-[#915EFF] bg-[#915EFF]/20 shadow-lg shadow-[#915EFF]/25'
                  : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{answer.icon}</div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {answer.text}
                  </h3>
                  {answer.description && (
                    <p className="text-white/60 text-sm">
                      {answer.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${
              currentQuestion === 0
                ? 'bg-white/10 text-white/30 cursor-not-allowed'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${
              selectedAnswer === null
                ? 'bg-white/10 text-white/30 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] text-white shadow-lg hover:shadow-xl'
            }`}
          >
            <span>
              {currentQuestion === quizQuestions.length - 1
                ? 'See Results'
                : 'Next'}
            </span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default QuizComponent
