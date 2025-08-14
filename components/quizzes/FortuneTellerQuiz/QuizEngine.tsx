"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CrystalBall } from "./CrystalBall"
import { MagicalSymbols } from "./MagicalSymbols"

const questions = [
  {
    id: 1,
    question: "What area of your life needs the most mystical guidance?",
    options: [
      { id: "love", text: "Love & Relationships", icon: "💕" },
      { id: "career", text: "Career & Purpose", icon: "⭐" },
      { id: "destiny", text: "Life Path & Destiny", icon: "🔮" },
    ],
  },
  {
    id: 2,
    question: "How strongly do you believe in fate and destiny?",
    options: [
      { id: "strong", text: "Everything is predetermined", icon: "🌟" },
      { id: "moderate", text: "Some things are meant to be", icon: "✨" },
      { id: "weak", text: "We create our own destiny", icon: "🎯" },
    ],
  },
  {
    id: 3,
    question: "Choose the mystical symbol that calls to your soul:",
    options: [
      { id: "moon", text: "Crescent Moon", icon: "🌙" },
      { id: "star", text: "Five-Pointed Star", icon: "⭐" },
      { id: "crystal", text: "Sacred Crystal", icon: "💎" },
    ],
  },
]

export default function QuizEngine({ userData, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showCrystalBall, setShowCrystalBall] = useState(true)

  const handleAnswer = (answerId) => {
    const newAnswers = [...answers, answerId]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowCrystalBall(true)
    } else {
      onComplete(newAnswers)
    }
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <AnimatePresence mode="wait">
          {showCrystalBall && (
            <motion.div
              key="crystal-ball"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <CrystalBall onReveal={() => setShowCrystalBall(false)} questionNumber={currentQuestion + 1} />
            </motion.div>
          )}

          {!showCrystalBall && (
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 shadow-2xl">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <div className="text-purple-300 text-sm mb-2">
                    Question {currentQuestion + 1} of {questions.length}
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-white mb-8"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {currentQ.question}
                  </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentQ.options.map((option, index) => (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(168, 85, 247, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(option.id)}
                      className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-6 text-white hover:border-purple-400/60 transition-all duration-300 group"
                    >
                      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {option.icon}
                      </div>
                      <div className="font-medium">{option.text}</div>
                    </motion.button>
                  ))}
                </div>

                {currentQuestion === questions.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8"
                  >
                    <MagicalSymbols />
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
