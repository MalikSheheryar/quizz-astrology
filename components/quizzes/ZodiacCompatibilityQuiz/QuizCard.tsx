"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Zap, Moon, Sun, Star } from "lucide-react"

interface QuizCardProps {
  question: any
  onAnswer: (questionId: string, option: any) => void
  selectedAnswer?: any
}

const QuizCard: React.FC<QuizCardProps> = ({ question, onAnswer, selectedAnswer }) => {
  const [hoveredOption, setHoveredOption] = useState<number | null>(null)

  const handleOptionClick = (option: any) => {
    onAnswer(question.id, option)
  }

  const getIcon = (type: string) => {
    const icons = {
      heart: Heart,
      zap: Zap,
      moon: Moon,
      sun: Sun,
      star: Star,
    }
    return icons[type as keyof typeof icons] || Star
  }

  const renderQuestion = () => {
    switch (question.type) {
      case "radio":
        return (
          <div className="space-y-4">
            {question.options.map((option: any, index: number) => {
              const Icon = getIcon(option.icon)
              return (
                <motion.button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  onHoverStart={() => setHoveredOption(index)}
                  onHoverEnd={() => setHoveredOption(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                    selectedAnswer?.value === option.value
                      ? "border-purple-500 bg-purple-500/20 text-white"
                      : "border-slate-600 bg-slate-700 text-white hover:border-purple-400 hover:bg-slate-600"
                  }`}
                >
                  <div className="flex items-center">
                    <Icon className="w-6 h-6 mr-4 text-purple-400" />
                    <span className="font-medium">{option.text}</span>
                  </div>
                </motion.button>
              )
            })}
          </div>
        )

      case "image":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {question.options.map((option: any, index: number) => (
              <motion.button
                key={index}
                onClick={() => handleOptionClick(option)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative rounded-2xl overflow-hidden border-4 transition-all duration-300 ${
                  selectedAnswer?.value === option.value
                    ? "border-purple-500 shadow-lg shadow-purple-500/50"
                    : "border-transparent hover:border-purple-400"
                }`}
              >
                <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <span className="text-4xl">{option.emoji}</span>
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-end p-3">
                  <span className="text-white font-medium text-sm">{option.text}</span>
                </div>
              </motion.button>
            ))}
          </div>
        )

      case "emoji":
        return (
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {question.options.map((option: any, index: number) => (
              <motion.button
                key={index}
                onClick={() => handleOptionClick(option)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`aspect-square rounded-2xl border-3 transition-all duration-300 flex items-center justify-center text-6xl ${
                  selectedAnswer?.value === option.value
                    ? "border-purple-500 bg-purple-500/20 shadow-lg"
                    : "border-slate-600 bg-slate-700 hover:border-purple-400 hover:bg-slate-600"
                }`}
              >
                {option.emoji}
              </motion.button>
            ))}
          </div>
        )

      case "scenario":
        return (
          <div className="space-y-4">
            <div className="bg-slate-700 p-6 rounded-2xl mb-6">
              <p className="text-white/90 text-lg leading-relaxed">{question.scenario}</p>
            </div>
            {question.options.map((option: any, index: number) => (
              <motion.button
                key={index}
                onClick={() => handleOptionClick(option)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                  selectedAnswer?.value === option.value
                    ? "border-orange-500 bg-orange-500/20 text-white"
                    : "border-slate-600 bg-slate-700 text-white hover:border-orange-400 hover:bg-slate-600"
                }`}
              >
                <span className="font-medium">{option.text}</span>
              </motion.button>
            ))}
          </div>
        )

      case "swipe":
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-white/80 mb-4">Swipe or click to choose:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {question.options.map((option: any, index: number) => (
                <motion.button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  whileHover={{ scale: 1.03, rotateY: 5 }}
                  whileTap={{ scale: 0.97 }}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    selectedAnswer?.value === option.value
                      ? "border-pink-500 bg-pink-500/20 text-white"
                      : "border-slate-600 bg-slate-700 text-white hover:border-pink-400 hover:bg-slate-600"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{option.emoji}</div>
                    <h4 className="font-bold text-lg mb-2">{option.title}</h4>
                    <p className="text-white/80 text-sm">{option.description}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )

      default:
        return <div className="text-white">Question type not supported</div>
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 p-8 rounded-3xl shadow-2xl border border-purple-500/20"
    >
      <div className="mb-8">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl md:text-3xl font-bold text-white mb-4 leading-relaxed"
        >
          {question.question}
        </motion.h2>
        {question.subtitle && <p className="text-white/70 text-lg">{question.subtitle}</p>}
      </div>
      {renderQuestion()}
    </motion.div>
  )
}

export default QuizCard
