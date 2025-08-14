"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const SoulQuizEngine = ({ coupleData, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [progress, setProgress] = useState(0)

  const questions = [
    {
      id: "soul_symbol",
      type: "symbol",
      question: "Pick the symbol that resonates most with your bond",
      options: [
        { value: "evil_eye", label: "🧿 Evil Eye", meaning: "Protection" },
        { value: "chain", label: "🔗 Chain", meaning: "Connection" },
        { value: "fire", label: "🔥 Fire", meaning: "Passion" },
        { value: "spiral", label: "🌀 Spiral", meaning: "Evolution" },
        { value: "galaxy", label: "🌌 Galaxy", meaning: "Infinite" },
        { value: "candle", label: "🕯️ Candle", meaning: "Illumination" },
        { value: "wave", label: "🌊 Wave", meaning: "Flow" },
        { value: "moon", label: "🌕 Moon", meaning: "Cycles" },
      ],
    },
    {
      id: "emotion_mirror",
      type: "choice",
      question: "When they feel pain, do you feel it too?",
      options: [
        { value: "always", label: "Yes, always" },
        { value: "sometimes", label: "Sometimes" },
        { value: "rarely", label: "Rarely" },
        { value: "never", label: "Never" },
      ],
    },
    {
      id: "deja_vu",
      type: "choice",
      question: "Have you ever visited a place together that felt strangely familiar?",
      options: [
        { value: "multiple", label: "Multiple times" },
        { value: "once", label: "Once or twice" },
        { value: "maybe", label: "Maybe, unsure" },
        { value: "never", label: "Never" },
      ],
    },
    {
      id: "soul_memory",
      type: "slider",
      question: "How often do you feel this love goes beyond this life?",
      min: 0,
      max: 100,
      labels: ["Never", "Constantly"],
    },
    {
      id: "past_life_visual",
      type: "visual",
      question: "Choose an image that feels like a memory with them",
      options: [
        { value: "temple", icon: "🏛️", label: "Ancient Temple" },
        { value: "ocean", icon: "🌊", label: "Vast Ocean" },
        { value: "desert", icon: "🏜️", label: "Desert Sands" },
        { value: "battlefield", icon: "⚔️", label: "Ancient Battle" },
        { value: "mountain", icon: "⛰️", label: "Sacred Mountain" },
        { value: "ritual", icon: "🔮", label: "Mystical Ritual" },
      ],
    },
    {
      id: "intuition_check",
      type: "choice",
      question: "Have you ever heard or sensed their thoughts before they spoke?",
      options: [
        { value: "frequently", label: "Frequently" },
        { value: "occasionally", label: "Occasionally" },
        { value: "rarely", label: "Rarely" },
        { value: "never", label: "Never" },
      ],
    },
    {
      id: "energetic_conflict",
      type: "choice",
      question: "When you argue, does it feel emotionally heavy or familiar in a strange way?",
      options: [
        { value: "very_heavy", label: "Very heavy and familiar" },
        { value: "somewhat", label: "Somewhat familiar" },
        { value: "normal", label: "Like normal arguments" },
        { value: "light", label: "Light and easily resolved" },
      ],
    },
    {
      id: "spiritual_growth",
      type: "choice",
      question: 'Since meeting them, have you been "forced" to grow, let go, or transform?',
      options: [
        { value: "dramatically", label: "Dramatically transformed" },
        { value: "significantly", label: "Significantly grown" },
        { value: "somewhat", label: "Somewhat changed" },
        { value: "minimal", label: "Minimal change" },
      ],
    },
  ]

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setProgress(((currentQuestion + 1) / questions.length) * 100)
    } else {
      // Calculate results
      const results = calculateSoulConnection(newAnswers, coupleData)
      onComplete(results)
    }
  }

  const calculateSoulConnection = (answers, coupleData) => {
    const scores = {
      pastLife: 0,
      soulContract: 0,
      karmicMirror: 0,
      twinFlame: 0,
      spiritualTeacher: 0,
    }

    // Scoring logic based on answers
    if (answers.soul_symbol?.includes("fire") || answers.soul_symbol?.includes("galaxy")) {
      scores.twinFlame += 2
    }
    if (answers.soul_symbol?.includes("chain") || answers.soul_symbol?.includes("spiral")) {
      scores.soulContract += 2
    }

    if (answers.emotion_mirror === "always") scores.twinFlame += 3
    if (answers.emotion_mirror === "sometimes") scores.karmicMirror += 2

    if (answers.deja_vu === "multiple") scores.pastLife += 3
    if (answers.deja_vu === "once") scores.pastLife += 2

    if (answers.soul_memory > 70) scores.pastLife += 2
    if (answers.soul_memory > 50) scores.soulContract += 1

    if (answers.intuition_check === "frequently") scores.twinFlame += 2
    if (answers.energetic_conflict === "very_heavy") scores.karmicMirror += 3
    if (answers.spiritual_growth === "dramatically") scores.spiritualTeacher += 3

    // Determine primary result
    const maxScore = Math.max(...Object.values(scores))
    const primaryResult = Object.keys(scores).find((key) => scores[key] === maxScore)

    return {
      primary: primaryResult,
      scores,
      intensity: Math.min(100, maxScore * 10),
      answers,
    }
  }

  const renderQuestion = (question) => {
    switch (question.type) {
      case "symbol":
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {question.options.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(question.id, option.value)}
                className="p-6 bg-slate-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400 rounded-xl border border-purple-400/30 hover:border-yellow-300 transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-2">{option.label.split(" ")[0]}</div>
                <div className="text-white font-semibold">{option.meaning}</div>
              </motion.button>
            ))}
          </div>
        )

      case "choice":
        return (
          <div className="space-y-3">
            {question.options.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(question.id, option.value)}
                className="w-full p-4 bg-slate-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400 rounded-xl border border-purple-400/30 hover:border-yellow-300 transition-all duration-300 text-left text-white font-semibold"
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        )

      case "slider":
        return (
          <div className="space-y-6">
            <div className="relative">
              <input
                type="range"
                min={question.min}
                max={question.max}
                defaultValue={50}
                onChange={(e) => handleAnswer(question.id, Number.parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-300 mt-2">
                <span>{question.labels[0]}</span>
                <span>{question.labels[1]}</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(question.id, 50)}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold rounded-xl"
            >
              Continue
            </motion.button>
          </div>
        )

      case "visual":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {question.options.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(question.id, option.value)}
                className="p-6 bg-slate-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400 rounded-xl border border-purple-400/30 hover:border-yellow-300 transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-2">{option.icon}</div>
                <div className="text-white font-semibold">{option.label}</div>
              </motion.button>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  const currentQ = questions[currentQuestion]

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-300 mb-2">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="bg-gradient-to-r from-pink-500 to-orange-400 h-2 rounded-full"
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-slate-800 bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-yellow-300/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center leading-relaxed">
              {currentQ.question}
            </h3>
            {renderQuestion(currentQ)}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default SoulQuizEngine
