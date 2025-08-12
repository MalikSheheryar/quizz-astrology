"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./components"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface QuizEngineProps {
  userData: any
  onComplete: (answers: any) => void
}

const QuizEngine: React.FC<QuizEngineProps> = ({ userData, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any>({})
  const [progress, setProgress] = useState(0)

  const questions = [
    {
      id: 1,
      type: "symbol",
      question: "Which symbol feels like your soul path?",
      options: [
        { value: "key", label: "🗝️ The Key", description: "Unlocking hidden wisdom" },
        { value: "crystal", label: "🔮 The Crystal", description: "Seeing beyond the veil" },
        { value: "fire", label: "🔥 The Fire", description: "Transforming through passion" },
        { value: "nature", label: "🌿 The Nature", description: "Growing through connection" },
        { value: "star", label: "💫 The Star", description: "Guiding others to light" },
        { value: "earth", label: "🌍 The Earth", description: "Grounding cosmic energy" },
      ],
    },
    {
      id: 2,
      type: "desire",
      question: "What are you secretly most hungry for?",
      options: [
        { value: "power", label: "Power", description: "To influence and lead" },
        { value: "peace", label: "Peace", description: "To find inner harmony" },
        { value: "truth", label: "Truth", description: "To understand reality" },
        { value: "legacy", label: "Legacy", description: "To leave lasting impact" },
        { value: "freedom", label: "Freedom", description: "To break all limitations" },
        { value: "connection", label: "Connection", description: "To unite with others" },
      ],
    },
    {
      id: 3,
      type: "slider",
      question: "On a scale from grounded to visionary, where do you sit?",
      min: 1,
      max: 10,
      labels: ["Deeply Grounded", "Cosmic Visionary"],
    },
    {
      id: 4,
      type: "path",
      question: "Choose the path that feels like your journey",
      options: [
        { value: "mountain", label: "Mountain Path", description: "Steady climb to mastery", image: "🏔️" },
        { value: "spiral", label: "Spiral Staircase", description: "Ascending through cycles", image: "🌀" },
        { value: "forest", label: "Forest Trail", description: "Discovery through nature", image: "🌲" },
        { value: "galaxy", label: "Galaxy Tunnel", description: "Transcending dimensions", image: "🌌" },
      ],
    },
    {
      id: 5,
      type: "energy",
      question: "When you feel most alive, what's usually happening?",
      options: [
        { value: "creating", label: "Creating something new" },
        { value: "helping", label: "Helping others transform" },
        { value: "learning", label: "Learning hidden knowledge" },
        { value: "leading", label: "Leading others forward" },
        { value: "connecting", label: "Connecting with nature/spirit" },
        { value: "expressing", label: "Expressing your truth" },
      ],
    },
    {
      id: 6,
      type: "timeline",
      question: "In what life stage do you believe your mission activates?",
      options: [
        { value: "early", label: "Early Adulthood", description: "The spark ignites young" },
        { value: "midlife", label: "Midlife", description: "Wisdom meets opportunity" },
        { value: "transformation", label: "After Major Transformation", description: "Phoenix rising" },
        { value: "always", label: "It's Always Been Clear", description: "Born knowing" },
      ],
    },
  ]

  const handleAnswer = (questionId: number, answer: any) => {
    setAnswers((prev: any) => ({ ...prev, [questionId]: answer }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setProgress(((currentQuestion + 1) / questions.length) * 100)
    } else {
      onComplete(answers)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
      setProgress(((currentQuestion - 1) / questions.length) * 100)
    }
  }

  const currentQ = questions[currentQuestion]
  const hasAnswer = answers[currentQ.id] !== undefined

  const renderQuestion = () => {
    switch (currentQ.type) {
      case "symbol":
      case "desire":
      case "path":
      case "energy":
      case "timeline":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQ.options?.map((option) => (
              <motion.div
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  answers[currentQ.id] === option.value
                    ? "border-[#FFD700] bg-[#FFD700]/10"
                    : "border-white/20 bg-white/5 hover:border-[#915EFF]"
                }`}
                onClick={() => handleAnswer(currentQ.id, option.value)}
              >
                {option.image && <div className="text-4xl mb-3 text-center">{option.image}</div>}
                <h3 className="text-white font-semibold mb-2 font-heading">{option.label}</h3>
                {option.description && <p className="text-white/70 text-sm font-body">{option.description}</p>}
              </motion.div>
            ))}
          </div>
        )

      case "slider":
        return (
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <input
                type="range"
                min={currentQ.min}
                max={currentQ.max}
                value={answers[currentQ.id] || 5}
                onChange={(e) => handleAnswer(currentQ.id, Number.parseInt(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between mt-4 text-white/70 text-sm font-body">
                <span>{currentQ.labels?.[0]}</span>
                <span>{currentQ.labels?.[1]}</span>
              </div>
              <div className="text-center mt-4">
                <span className="text-[#FFD700] text-2xl font-bold font-heading">{answers[currentQ.id] || 5}</span>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-[#1F2A38] rounded-2xl p-8 shadow-2xl border border-white/10">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/70 text-sm font-body">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-[#FFD700] text-sm font-semibold font-body">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-[#FFD700] to-[#915EFF] h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center font-heading">
              {currentQ.question}
            </h2>

            {renderQuestion()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12">
          <Button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            variant="secondary"
            className="flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button onClick={nextQuestion} disabled={!hasAnswer} className="flex items-center">
            {currentQuestion === questions.length - 1 ? "Reveal Mission" : "Next"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default QuizEngine
