"use client"
import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Rainbow, Leaf, Flame, Sparkles, Zap } from "lucide-react"

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
      id: "intuitionSymbol",
      type: "imageSelector",
      question: "Which symbol feels like a lucky sign for you?",
      description: "Trust your first instinct - your soul knows the answer",
      options: [
        { id: "star", icon: Star, label: "Shining Star", energy: "manifestation" },
        { id: "rainbow", icon: Rainbow, label: "Rainbow Bridge", energy: "transformation" },
        { id: "leaf", icon: Leaf, label: "Growing Leaf", energy: "growth" },
        { id: "flame", icon: Flame, label: "Sacred Flame", energy: "passion" },
        { id: "sparkles", icon: Sparkles, label: "Magic Sparkles", energy: "wonder" },
      ],
    },
    {
      id: "lifePhase",
      type: "multiChoice",
      question: "What do you feel is currently happening in your life?",
      description: "Your current energy cycle influences your lucky timeline",
      options: [
        { id: "opening", label: "New doors are opening", weight: 3 },
        { id: "closing", label: "Old chapters are closing", weight: 2 },
        { id: "waiting", label: "I'm in a waiting period", weight: 1 },
        { id: "flowing", label: "Everything is flowing smoothly", weight: 4 },
        { id: "transforming", label: "Major transformation is happening", weight: 5 },
      ],
    },
    {
      id: "emotionalAlignment",
      type: "multiChoice",
      question: "Which upcoming timeframe feels most aligned to you emotionally?",
      description: "Your intuition knows when luck will peak",
      options: [
        { id: "2025", label: "2025 - Near Future", year: 2025 },
        { id: "2026", label: "2026 - Building Momentum", year: 2026 },
        { id: "2027", label: "2027 - Peak Transformation", year: 2027 },
        { id: "2028", label: "2028 - Harvest Time", year: 2028 },
        { id: "2029-2030", label: "2029-2030 - New Decade Energy", year: 2029 },
      ],
    },
    {
      id: "successPattern",
      type: "multiChoice",
      question: "When things go well in your life, what's usually happening?",
      description: "Understanding your success patterns reveals your lucky cycles",
      options: [
        { id: "newBeginnings", label: "I'm starting something completely new", pattern: "pioneer" },
        { id: "collaboration", label: "I'm working closely with others", pattern: "partnership" },
        { id: "creative", label: "I'm expressing my creativity freely", pattern: "creative" },
        { id: "structured", label: "I have clear structure and discipline", pattern: "builder" },
        { id: "freedom", label: "I have complete freedom to explore", pattern: "explorer" },
      ],
    },
    {
      id: "celebrationMoment",
      type: "multiChoice",
      question: "Which moment would you celebrate most?",
      description: "Your deepest desires shape your luckiest manifestations",
      options: [
        { id: "career", label: "Landing my dream career opportunity", focus: "career" },
        { id: "love", label: "Finding or deepening true love", focus: "relationships" },
        { id: "financial", label: "Achieving financial abundance", focus: "money" },
        { id: "health", label: "Reaching optimal health and vitality", focus: "health" },
        { id: "spiritual", label: "Having a profound spiritual awakening", focus: "spiritual" },
      ],
    },
    {
      id: "colorFrequency",
      type: "colorSelector",
      question: "Which color draws your eye today?",
      description: "Colors carry vibrational frequencies that align with your energy",
      options: [
        { id: "gold", color: "#FFD700", label: "Radiant Gold", frequency: "abundance" },
        { id: "purple", color: "#915EFF", label: "Mystical Purple", frequency: "intuition" },
        { id: "blue", color: "#6EC1E4", label: "Cosmic Blue", frequency: "communication" },
        { id: "green", color: "#10B981", label: "Healing Green", frequency: "growth" },
        { id: "red", color: "#EF4444", label: "Passionate Red", frequency: "action" },
      ],
    },
    {
      id: "energyLevel",
      type: "scale",
      question: "How would you describe your current energy level?",
      description: "Your energy state influences when luck flows most easily",
      scale: {
        min: 1,
        max: 10,
        labels: ["Low Energy", "Moderate Energy", "High Energy"],
      },
    },
    {
      id: "focusArea",
      type: "multiChoice",
      question: "Where do you most want to see positive changes?",
      description: "Your focus area determines which years will bring the most luck",
      options: [
        { id: "career", label: "Career and Professional Growth", domain: "career" },
        { id: "relationships", label: "Love and Relationships", domain: "relationships" },
        { id: "finances", label: "Money and Financial Security", domain: "finances" },
        { id: "health", label: "Health and Wellness", domain: "health" },
        { id: "creativity", label: "Creative Expression and Arts", domain: "creativity" },
        { id: "spirituality", label: "Spiritual Growth and Wisdom", domain: "spirituality" },
      ],
    },
  ]

  const handleAnswer = (questionId: string, answer: any) => {
    const newAnswers = { ...answers, [questionId]: answer }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setProgress(((currentQuestion + 1) / questions.length) * 100)
    } else {
      onComplete(newAnswers)
    }
  }

  const renderQuestion = (question: any) => {
    switch (question.type) {
      case "imageSelector":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {question.options.map((option: any) => {
              const IconComponent = option.icon
              return (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(question.id, option)}
                  className="bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 hover:border-yellow-400 rounded-xl p-6 text-center transition-all duration-300 group"
                >
                  <IconComponent
                    size={48}
                    className="mx-auto mb-3 text-yellow-400 group-hover:text-yellow-300 transition-colors"
                  />
                  <p className="text-white font-medium">{option.label}</p>
                </motion.button>
              )
            })}
          </div>
        )

      case "colorSelector":
        return (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {question.options.map((option: any) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAnswer(question.id, option)}
                className="relative group"
              >
                <div
                  className="w-20 h-20 mx-auto rounded-full border-4 border-white/20 group-hover:border-white/60 transition-all duration-300 shadow-lg"
                  style={{ backgroundColor: option.color }}
                />
                <p className="text-white text-sm mt-2 font-medium">{option.label}</p>
              </motion.button>
            ))}
          </div>
        )

      case "scale":
        return (
          <div className="space-y-6">
            <div className="flex justify-between text-sm text-white/70">
              <span>{question.scale.labels[0]}</span>
              <span>{question.scale.labels[1]}</span>
              <span>{question.scale.labels[2]}</span>
            </div>
            <div className="grid grid-cols-10 gap-2">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                <motion.button
                  key={value}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAnswer(question.id, value)}
                  className="w-12 h-12 bg-slate-700/50 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 border border-slate-600 hover:border-transparent rounded-lg text-white font-semibold transition-all duration-300"
                >
                  {value}
                </motion.button>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-4">
            {question.options.map((option: any) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(question.id, option)}
                className="w-full text-left bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 hover:border-yellow-400 rounded-xl p-4 text-white transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option.label}</span>
                  <Zap className="text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                </div>
              </motion.button>
            ))}
          </div>
        )
    }
  }

  const currentQ = questions[currentQuestion]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white/70 text-sm">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-white/70 text-sm">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">{currentQ.question}</h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">{currentQ.description}</p>
            </div>
            {renderQuestion(currentQ)}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default QuizEngine
