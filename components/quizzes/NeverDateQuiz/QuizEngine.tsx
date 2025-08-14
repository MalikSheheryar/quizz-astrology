"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const QuizEngine = ({ onComplete, userData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [progress, setProgress] = useState(0)

  const questions = [
    {
      id: 1,
      type: "image-cards",
      question: "Which text reply drives you absolutely crazy?",
      subtitle: "Your communication triggers reveal compatibility patterns",
      options: [
        {
          id: "seen",
          image: "📱",
          title: "Left on Read",
          subtitle: "Seen ✓✓ but no reply",
          weight: { gemini: 3, aquarius: 2, sagittarius: 2 },
        },
        {
          id: "late",
          image: "⏰",
          title: "3-Day Delay",
          subtitle: "Eventually responds...",
          weight: { pisces: 3, cancer: 2, taurus: 2 },
        },
        {
          id: "essay",
          image: "📝",
          title: "Novel Length",
          subtitle: "Paragraphs upon paragraphs",
          weight: { virgo: 3, scorpio: 2, capricorn: 2 },
        },
        {
          id: "dry",
          image: "🏜️",
          title: "One Word Replies",
          subtitle: '"K" "Sure" "Fine"',
          weight: { capricorn: 3, aquarius: 2, virgo: 2 },
        },
      ],
    },
    {
      id: 2,
      type: "symbol-intuition",
      question: "Which symbol triggers your stress response?",
      subtitle: "Trust your gut reaction",
      options: [
        { id: "hourglass", symbol: "⏳", title: "Time Pressure", weight: { aries: 2, leo: 2, sagittarius: 3 } },
        { id: "fire", symbol: "🔥", title: "Intensity", weight: { cancer: 3, pisces: 2, libra: 2 } },
        { id: "ice", symbol: "🧊", title: "Coldness", weight: { leo: 3, aries: 2, sagittarius: 2 } },
        { id: "tornado", symbol: "🌪️", title: "Chaos", weight: { virgo: 3, capricorn: 3, taurus: 2 } },
        { id: "puzzle", symbol: "🧩", title: "Complexity", weight: { gemini: 2, sagittarius: 3, aries: 2 } },
        { id: "mask", symbol: "🎭", title: "Deception", weight: { scorpio: 3, cancer: 2, pisces: 2 } },
      ],
    },
    {
      id: 3,
      type: "conflict-style",
      question: "When you're upset in a relationship, you...",
      subtitle: "Conflict resolution reveals core incompatibilities",
      options: [
        { id: "talk-now", title: "Need to talk it out immediately", weight: { taurus: 2, capricorn: 2, virgo: 2 } },
        { id: "need-space", title: "Require space to process first", weight: { aries: 3, leo: 2, sagittarius: 2 } },
        { id: "go-silent", title: "Go quiet and withdraw", weight: { gemini: 3, libra: 2, aquarius: 2 } },
        { id: "over-explain", title: "Analyze and explain everything", weight: { pisces: 2, cancer: 2, scorpio: 3 } },
      ],
    },
    {
      id: 4,
      type: "attachment-slider",
      question: "Where do you fall on the attachment spectrum?",
      subtitle: "Slide to your natural tendency",
      leftLabel: "Avoidant (Need Independence)",
      rightLabel: "Anxious (Need Closeness)",
      weights: {
        0: { aquarius: 3, sagittarius: 2, gemini: 2 },
        25: { capricorn: 2, virgo: 2, taurus: 1 },
        50: { libra: 1, leo: 1, aries: 1 },
        75: { pisces: 2, cancer: 2, scorpio: 1 },
        100: { cancer: 3, pisces: 3, scorpio: 2 },
      },
    },
    {
      id: 5,
      type: "dealbreakers",
      question: "Select your absolute dating dealbreakers:",
      subtitle: "Choose all that apply - be honest",
      options: [
        { id: "jealousy", title: "Excessive Jealousy", weight: { scorpio: 3, cancer: 2, pisces: 2 } },
        { id: "flakiness", title: "Chronic Flakiness", weight: { gemini: 3, sagittarius: 2, aquarius: 2 } },
        { id: "stinginess", title: "Being Cheap/Stingy", weight: { capricorn: 2, virgo: 3, taurus: 2 } },
        { id: "intensity", title: "Overwhelming Intensity", weight: { scorpio: 3, aries: 2, leo: 2 } },
        { id: "secretiveness", title: "Being Secretive", weight: { scorpio: 3, pisces: 2, capricorn: 2 } },
        { id: "criticism", title: "Constant Criticism", weight: { virgo: 3, capricorn: 2, scorpio: 2 } },
        { id: "unreliability", title: "Unreliability", weight: { sagittarius: 3, gemini: 2, aquarius: 2 } },
        { id: "possessiveness", title: "Possessiveness", weight: { taurus: 3, scorpio: 2, cancer: 2 } },
      ],
    },
    {
      id: 6,
      type: "date-vibe",
      question: "Which date scenario stresses you out most?",
      subtitle: "Your comfort zone reveals compatibility needs",
      options: [
        {
          id: "crowded-party",
          image: "🎉",
          title: "Crowded Party",
          subtitle: "Loud, chaotic, lots of people",
          weight: { cancer: 3, pisces: 2, virgo: 2 },
        },
        {
          id: "last-minute",
          image: "⚡",
          title: "Spontaneous Adventure",
          subtitle: "No plan, just go with it",
          weight: { virgo: 3, capricorn: 3, taurus: 2 },
        },
        {
          id: "mysterious",
          image: "🎭",
          title: "Mystery Date",
          subtitle: "They won't tell you where",
          weight: { scorpio: 2, capricorn: 2, virgo: 2 },
        },
        {
          id: "routine-dinner",
          image: "🍽️",
          title: "Same Restaurant Again",
          subtitle: "Predictable and routine",
          weight: { sagittarius: 3, gemini: 2, aquarius: 2 },
        },
        {
          id: "deep-therapy",
          image: "💭",
          title: "Deep Soul Talk",
          subtitle: "Heavy emotional sharing",
          weight: { gemini: 3, sagittarius: 2, aquarius: 2 },
        },
      ],
    },
    {
      id: 7,
      type: "pace-preference",
      question: "What's your ideal relationship pace?",
      subtitle: "Timing compatibility is crucial",
      options: [
        {
          id: "fast-burn",
          title: "Fast & Intense",
          subtitle: "All in from day one",
          weight: { taurus: 3, capricorn: 2, virgo: 2 },
        },
        {
          id: "slow-bloom",
          title: "Slow & Steady",
          subtitle: "Build gradually over time",
          weight: { aries: 3, leo: 2, sagittarius: 2 },
        },
        {
          id: "steady-build",
          title: "Consistent Growth",
          subtitle: "Regular, predictable progress",
          weight: { gemini: 2, aquarius: 2, sagittarius: 2 },
        },
        {
          id: "unpredictable",
          title: "Organic & Unpredictable",
          subtitle: "Let it flow naturally",
          weight: { virgo: 2, capricorn: 3, taurus: 2 },
        },
      ],
    },
    {
      id: 8,
      type: "honesty-test",
      question: "How do you feel about white lies in relationships?",
      subtitle: "Honesty standards vary by sign",
      options: [
        { id: "never", title: "Never Acceptable", weight: { scorpio: 2, virgo: 2, capricorn: 2 } },
        { id: "rarely", title: "Only to Spare Feelings", weight: { cancer: 1, pisces: 1, libra: 1 } },
        { id: "sometimes", title: "Sometimes Necessary", weight: { gemini: 2, libra: 2, sagittarius: 1 } },
        { id: "often", title: "Part of Social Grace", weight: { scorpio: 3, cancer: 2, pisces: 2 } },
      ],
    },
  ]

  const totalQuestions = questions.length

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setProgress(((currentQuestion + 1) / totalQuestions) * 100)
    } else {
      onComplete(answers)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
      setProgress((currentQuestion / totalQuestions) * 100)
    }
  }

  const currentQ = questions[currentQuestion]
  const hasAnswer = answers[currentQ.id] !== undefined

  const renderQuestion = () => {
    switch (currentQ.type) {
      case "image-cards":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={option.id}
                onClick={() => handleAnswer(currentQ.id, option.id)}
                className={`p-6 rounded-xl border-2 transition-all text-center w-full ${
                  answers[currentQ.id] === option.id
                    ? "border-yellow-400 bg-yellow-400/20 text-white shadow-lg shadow-yellow-400/25"
                    : "border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <div className="text-4xl mb-3">{option.image}</div>
                <div className="font-semibold text-lg mb-2">{option.title}</div>
                {option.subtitle && <div className="text-sm text-white/70 leading-relaxed">{option.subtitle}</div>}
              </motion.button>
            ))}
          </div>
        )

      case "symbol-intuition":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={option.id}
                onClick={() => handleAnswer(currentQ.id, option.id)}
                className={`p-6 rounded-xl border-2 transition-all text-center ${
                  answers[currentQ.id] === option.id
                    ? "border-yellow-400 bg-yellow-400/20 text-white"
                    : "border-white/20 bg-white/5 text-white/80 hover:border-white/40"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl mb-3">{option.symbol}</div>
                <div className="font-medium text-sm">{option.title}</div>
              </motion.button>
            ))}
          </div>
        )

      case "conflict-style":
      case "pace-preference":
      case "honesty-test":
        return (
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={option.id}
                onClick={() => handleAnswer(currentQ.id, option.id)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  answers[currentQ.id] === option.id
                    ? "border-yellow-400 bg-yellow-400/20 text-white"
                    : "border-white/20 bg-white/5 text-white/80 hover:border-white/40"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="font-medium">{option.title}</div>
                {option.subtitle && <div className="text-sm text-white/60 mt-1">{option.subtitle}</div>}
              </motion.button>
            ))}
          </div>
        )

      case "attachment-slider":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex justify-between text-sm text-white/80 font-medium">
              <span className="text-left max-w-[45%]">{currentQ.leftLabel}</span>
              <span className="text-right max-w-[45%]">{currentQ.rightLabel}</span>
            </div>

            <div className="relative">
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                  style={{ width: `${answers[currentQ.id] || 50}%` }}
                  animate={{ width: `${answers[currentQ.id] || 50}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              <input
                type="range"
                min={0}
                max={100}
                value={answers[currentQ.id] || 50}
                onChange={(e) => handleAnswer(currentQ.id, Number.parseInt(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <motion.div
                className="absolute top-1/2 w-6 h-6 bg-white rounded-full shadow-lg transform -translate-y-1/2 -translate-x-1/2 border-2 border-yellow-400"
                style={{ left: `${answers[currentQ.id] || 50}%` }}
                animate={{ left: `${answers[currentQ.id] || 50}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <div className="text-center">
              <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-white font-medium">
                {answers[currentQ.id] || 50}%
              </span>
            </div>
          </motion.div>
        )

      case "dealbreakers":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentQ.options.map((option, index) => (
                <motion.button
                  key={option.id}
                  onClick={() => {
                    const current = answers[currentQ.id] || []
                    const newSelection = current.includes(option.id)
                      ? current.filter((id) => id !== option.id)
                      : [...current, option.id]
                    handleAnswer(currentQ.id, newSelection)
                  }}
                  className={`relative p-3 rounded-lg border-2 transition-all text-left w-full ${
                    answers[currentQ.id]?.includes(option.id)
                      ? "border-yellow-400 bg-yellow-400/20 text-white"
                      : "border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium">{option.title}</div>
                    </div>

                    {answers[currentQ.id]?.includes(option.id) && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3, type: "spring" }}
                        className="ml-3 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                      >
                        <span className="text-black text-sm">✓</span>
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )

      case "date-vibe":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={option.id}
                onClick={() => handleAnswer(currentQ.id, option.id)}
                className={`p-6 rounded-xl border-2 transition-all text-center w-full ${
                  answers[currentQ.id] === option.id
                    ? "border-yellow-400 bg-yellow-400/20 text-white shadow-lg shadow-yellow-400/25"
                    : "border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <div className="text-4xl mb-3">{option.image}</div>
                <div className="font-semibold text-lg mb-2">{option.title}</div>
                {option.subtitle && <div className="text-sm text-white/70 leading-relaxed">{option.subtitle}</div>}
              </motion.button>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-white/80 font-medium">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <span className="text-white/80 font-medium">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      <motion.div
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{currentQ.question}</h2>
              <p className="text-white/80">{currentQ.subtitle}</p>
            </div>

            {renderQuestion()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/20">
          <motion.button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent bg-white/10 text-white border border-white/30 hover:bg-white/20 hover:border-white/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            whileHover={currentQuestion > 0 ? { scale: 1.02 } : {}}
            whileTap={currentQuestion > 0 ? { scale: 0.98 } : {}}
            transition={{ duration: 0.15 }}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </motion.button>

          <div className="flex gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentQuestion
                    ? "bg-yellow-400 w-6"
                    : index < currentQuestion
                      ? "bg-white/60"
                      : "bg-white/20"
                }`}
              />
            ))}
          </div>

          <motion.button
            onClick={nextQuestion}
            disabled={!hasAnswer && currentQ.type !== "attachment-slider"}
            className="px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            whileHover={hasAnswer || currentQ.type === "attachment-slider" ? { scale: 1.02 } : {}}
            whileTap={hasAnswer || currentQ.type === "attachment-slider" ? { scale: 0.98 } : {}}
            transition={{ duration: 0.15 }}
          >
            {currentQuestion === totalQuestions - 1 ? "Get Results" : "Next"}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default QuizEngine
