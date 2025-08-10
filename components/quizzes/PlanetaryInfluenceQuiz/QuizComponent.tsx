"use client"
import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Star } from "lucide-react"
import { questions } from "./quizData"

interface QuizComponentProps {
  onComplete: (results: any) => void
}

const QuizComponent: React.FC<QuizComponentProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])
  const [planetScores, setPlanetScores] = useState({
    Mercury: 0,
    Venus: 0,
    Mars: 0,
    Jupiter: 0,
    Saturn: 0,
    Uranus: 0,
    Neptune: 0,
    Pluto: 0,
  })

  const handleAnswer = (selectedOption: any) => {
    const newAnswers = [...answers, selectedOption]
    setAnswers(newAnswers)

    setPlanetScores((prev) => ({
      ...prev,
      [selectedOption.planet]: prev[selectedOption.planet] + 1,
    }))

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const updatedScores = {
        ...planetScores,
        [selectedOption.planet]: planetScores[selectedOption.planet] + 1,
      }
      const dominantPlanet = Object.keys(updatedScores).reduce((a, b) => (updatedScores[a] > updatedScores[b] ? a : b))

      onComplete({
        answers: newAnswers,
        planetScores: updatedScores,
        dominantPlanet,
      })
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1F2A38] rounded-3xl p-8 shadow-2xl border border-[#915EFF]/30 max-w-2xl w-full"
      >
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#915EFF] font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div className="flex items-center text-[#FFA726]">
              <Star className="w-4 h-4 mr-1" />
              <span className="text-sm">{Math.round(progress)}%</span>
            </div>
          </div>
          <div className="w-full bg-[#2A3441] rounded-full h-2 mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-[#915EFF] to-[#FF5F6D] h-2 rounded-full"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-8 leading-relaxed">
              {questions[currentQuestion].question}
            </h2>

            <div className="grid gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option)}
                  className="bg-[#2A3441] hover:bg-[#3A4451] text-white p-4 rounded-xl border border-[#915EFF]/20 hover:border-[#915EFF]/50 transition-all duration-300 text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-4">{option.icon}</span>
                      <span className="font-medium">{option.text}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#915EFF] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default QuizComponent
