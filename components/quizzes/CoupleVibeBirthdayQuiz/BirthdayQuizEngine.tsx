"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react"
import { calculateCompatibility } from "./utils/astrology"
import { slideVariants } from "./utils/motion"

const BirthdayQuizEngine = ({ coupleData, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const questions = [
    {
      id: "symbol",
      type: "symbol",
      question: "Choose the symbol that best describes your relationship",
      options: [
        { symbol: "🦋", label: "Transformation", value: "transformation" },
        { symbol: "🔗", label: "Connection", value: "connection" },
        { symbol: "🔥", label: "Passion", value: "passion" },
        { symbol: "🌊", label: "Flow", value: "flow" },
        { symbol: "🌕", label: "Completion", value: "completion" },
        { symbol: "🌟", label: "Magic", value: "magic" },
        { symbol: "🪐", label: "Cosmic", value: "cosmic" },
      ],
    },
    {
      id: "frequency",
      type: "choice",
      question: "Which word describes the energy between you?",
      options: [
        { label: "Electric", value: "electric" },
        { label: "Nurturing", value: "nurturing" },
        { label: "Stable", value: "stable" },
        { label: "Mysterious", value: "mysterious" },
        { label: "Fiery", value: "fiery" },
        { label: "Expansive", value: "expansive" },
      ],
    },
    {
      id: "emotional_sync",
      type: "slider",
      question: "How in-sync are your emotions on a daily basis?",
      min: 1,
      max: 10,
      labels: ["Completely Different", "Perfectly Aligned"],
    },
    {
      id: "growth",
      type: "choice",
      question: "What has changed most since you became a couple?",
      options: [
        { label: "We've become more confident", value: "confidence" },
        { label: "We've learned to communicate better", value: "communication" },
        { label: "We've discovered new parts of ourselves", value: "discovery" },
        { label: "We've become more adventurous", value: "adventure" },
        { label: "We've found inner peace", value: "peace" },
        { label: "We've become more ambitious", value: "ambition" },
      ],
    },
    {
      id: "dynamic",
      type: "choice",
      question: "Which best describes your dynamic?",
      options: [
        { label: "You complement each other perfectly", value: "complement" },
        { label: "You're very similar in most ways", value: "similar" },
        { label: "You're total opposites that attract", value: "opposites" },
        { label: "You balance each other's extremes", value: "balance" },
      ],
    },
    {
      id: "connection_type",
      type: "choice",
      question: "Do you feel more connected emotionally, spiritually, or physically?",
      options: [
        { label: "Emotionally - we understand each other deeply", value: "emotional" },
        { label: "Spiritually - we share the same values and dreams", value: "spiritual" },
        { label: "Physically - we have amazing chemistry", value: "physical" },
        { label: "All three equally", value: "balanced" },
      ],
    },
    {
      id: "future_vision",
      type: "choice",
      question: "When you imagine your future together, what excites you most?",
      options: [
        { label: "Building a beautiful life together", value: "building" },
        { label: "Exploring the world and new experiences", value: "exploring" },
        { label: "Growing spiritually and emotionally", value: "growing" },
        { label: "Creating something meaningful together", value: "creating" },
        { label: "Simply enjoying each other's company", value: "enjoying" },
      ],
    },
  ]

  const handleAnswer = (value) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQuestion].id]: value }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      completeQuiz()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const completeQuiz = async () => {
    setIsLoading(true)

    // Calculate compatibility based on birth dates and quiz answers
    const compatibility = calculateCompatibility(coupleData, answers)

    // Simulate processing time for dramatic effect
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    onComplete(answers, compatibility)
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const hasAnswer = answers[currentQ.id] !== undefined

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          className="bg-[#1F2A38] rounded-3xl p-12 shadow-2xl border border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] rounded-full mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Sparkles className="text-white" size={32} />
          </motion.div>
          <h3 className="text-2xl font-heading font-bold text-white mb-4">Calculating Your Cosmic Compatibility...</h3>
          <p className="text-white/70 font-body">The stars are aligning to reveal your unique couple vibe</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white/70 font-body text-sm">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-white/70 font-body text-sm">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          className="bg-[#1F2A38] rounded-3xl p-8 shadow-2xl border border-white/10"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <h3 className="text-2xl font-heading font-bold text-white mb-8 text-center">{currentQ.question}</h3>

          {/* Symbol Options */}
          {currentQ.type === "symbol" && (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-8">
              {currentQ.options.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    answers[currentQ.id] === option.value
                      ? "border-[#FF6B6B] bg-[#FF6B6B]/10"
                      : "border-white/20 hover:border-white/40"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-4xl mb-2">{option.symbol}</div>
                  <div className="text-white font-body text-sm">{option.label}</div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Choice Options */}
          {currentQ.type === "choice" && (
            <div className="space-y-3 mb-8">
              {currentQ.options.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    answers[currentQ.id] === option.value
                      ? "border-[#FF6B6B] bg-[#FF6B6B]/10 text-white"
                      : "border-white/20 hover:border-white/40 text-white/80 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          )}

          {/* Slider */}
          {currentQ.type === "slider" && (
            <div className="mb-8">
              <div className="flex justify-between text-white/60 font-body text-sm mb-4">
                <span>{currentQ.labels[0]}</span>
                <span>{currentQ.labels[1]}</span>
              </div>
              <input
                type="range"
                min={currentQ.min}
                max={currentQ.max}
                value={answers[currentQ.id] || 5}
                onChange={(e) => handleAnswer(Number.parseInt(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center mt-4">
                <span className="text-2xl font-heading font-bold text-[#FFD700]">{answers[currentQ.id] || 5}/10</span>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <motion.button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className={`flex items-center px-6 py-3 rounded-xl font-body transition-all ${
                currentQuestion === 0 ? "text-white/30 cursor-not-allowed" : "text-white hover:bg-white/10"
              }`}
              whileHover={currentQuestion > 0 ? { scale: 1.05 } : {}}
              whileTap={currentQuestion > 0 ? { scale: 0.95 } : {}}
            >
              <ChevronLeft size={20} className="mr-1" />
              Previous
            </motion.button>

            <motion.button
              onClick={nextQuestion}
              disabled={!hasAnswer}
              className={`flex items-center px-8 py-3 rounded-xl font-heading font-semibold transition-all ${
                hasAnswer
                  ? "bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] text-white hover:shadow-lg"
                  : "bg-white/10 text-white/50 cursor-not-allowed"
              }`}
              whileHover={hasAnswer ? { scale: 1.05 } : {}}
              whileTap={hasAnswer ? { scale: 0.95 } : {}}
            >
              {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
              <ChevronRight size={20} className="ml-1" />
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default BirthdayQuizEngine
