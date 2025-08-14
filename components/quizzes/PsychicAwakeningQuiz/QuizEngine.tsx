"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const QuizEngine = ({ userData, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [scores, setScores] = useState({
    clairvoyant: 0,
    clairsentient: 0,
    clairaudient: 0,
    claircognizant: 0,
  })

  const questions = [
    {
      id: 1,
      type: "symbol",
      question: "Choose the symbol you feel most drawn to right now:",
      options: [
        { symbol: "🔮", text: "Crystal Ball", scores: { clairvoyant: 3 } },
        { symbol: "👁️", text: "Third Eye", scores: { clairvoyant: 4 } },
        { symbol: "🌕", text: "Full Moon", scores: { clairsentient: 3 } },
        { symbol: "🌀", text: "Energy Spiral", scores: { claircognizant: 3 } },
        { symbol: "💎", text: "Sacred Crystal", scores: { clairvoyant: 2, clairsentient: 2 } },
        { symbol: "🔥", text: "Spiritual Fire", scores: { claircognizant: 4 } },
        { symbol: "🌊", text: "Flowing Water", scores: { clairsentient: 4 } },
      ],
    },
    {
      id: 2,
      type: "multiple",
      question: "When you enter a new room, you usually:",
      options: [
        { text: "Feel the energy and emotions of people who were there", scores: { clairsentient: 4 } },
        { text: "See flashes of images or colors around the space", scores: { clairvoyant: 4 } },
        { text: "Hear whispers or sounds others don't notice", scores: { clairaudient: 4 } },
        { text: "Just know if something important happened there", scores: { claircognizant: 4 } },
        { text: "Notice nothing unusual", scores: {} },
      ],
    },
    {
      id: 3,
      type: "slider",
      question: "How often do you just know something is going to happen before it does?",
      min: 0,
      max: 10,
      labels: ["Never", "Constantly"],
      scoring: (value) => ({
        claircognizant: Math.floor(value / 2),
        clairvoyant: Math.floor(value / 3),
      }),
    },
    {
      id: 4,
      type: "multiple",
      question: "Your dreams are typically:",
      options: [
        { text: "Vivid and prophetic - they often come true", scores: { clairvoyant: 4, claircognizant: 2 } },
        { text: "Full of symbols and hidden meanings", scores: { clairvoyant: 3, claircognizant: 3 } },
        { text: "Emotionally intense and draining", scores: { clairsentient: 4 } },
        { text: "I hear voices or music clearly", scores: { clairaudient: 4 } },
        { text: "I rarely remember my dreams", scores: {} },
      ],
    },
    {
      id: 5,
      type: "multiple",
      question: "When making important decisions, you rely most on:",
      options: [
        { text: "Gut feelings and intuitive hunches", scores: { clairsentient: 3, claircognizant: 2 } },
        { text: "Visual signs and synchronicities", scores: { clairvoyant: 4 } },
        { text: "Inner voice or guidance you hear", scores: { clairaudient: 4 } },
        { text: "Sudden knowing without explanation", scores: { claircognizant: 4 } },
        { text: "Logic and careful analysis", scores: {} },
      ],
    },
    {
      id: 6,
      type: "multiple",
      question: "Have you ever seen something happen before it occurred?",
      options: [
        { text: "Yes, many times - it's quite common for me", scores: { clairvoyant: 5 } },
        { text: "A few times, usually in dreams", scores: { clairvoyant: 3 } },
        { text: "Once or twice, but I wasn't sure", scores: { clairvoyant: 1 } },
        { text: "No, but I often sense when things will happen", scores: { claircognizant: 3 } },
        { text: "Never", scores: {} },
      ],
    },
    {
      id: 7,
      type: "color",
      question: "Choose the aura color that resonates with your current energy:",
      options: [
        { color: "#9333EA", text: "Deep Purple", scores: { clairvoyant: 3, claircognizant: 2 } },
        { color: "#3B82F6", text: "Electric Blue", scores: { clairaudient: 3, claircognizant: 2 } },
        { color: "#10B981", text: "Healing Green", scores: { clairsentient: 4 } },
        { color: "#F59E0B", text: "Golden Yellow", scores: { claircognizant: 4 } },
        { color: "#EF4444", text: "Passionate Red", scores: { clairsentient: 3 } },
        { color: "#FFFFFF", text: "Pure White", scores: { clairvoyant: 4 } },
      ],
    },
    {
      id: 8,
      type: "multiple",
      question: "When someone is lying to you, you usually:",
      options: [
        { text: "Feel it in your stomach or chest", scores: { clairsentient: 4 } },
        { text: "See their aura change or darken", scores: { clairvoyant: 4 } },
        { text: "Hear a warning voice in your head", scores: { clairaudient: 4 } },
        { text: "Just know they're not telling the truth", scores: { claircognizant: 4 } },
        { text: "Notice their body language", scores: {} },
      ],
    },
  ]

  const handleAnswer = (answer, questionData) => {
    const newAnswers = { ...answers, [currentQuestion]: answer }
    setAnswers(newAnswers)

    // Update scores based on answer
    const newScores = { ...scores }
    if (questionData.type === "slider") {
      const scoreUpdate = questionData.scoring(answer)
      Object.keys(scoreUpdate).forEach((key) => {
        newScores[key] += scoreUpdate[key]
      })
    } else {
      const selectedOption = questionData.options.find((opt) =>
        questionData.type === "symbol"
          ? opt.symbol === answer
          : questionData.type === "color"
            ? opt.color === answer
            : opt.text === answer,
      )
      if (selectedOption && selectedOption.scores) {
        Object.keys(selectedOption.scores).forEach((key) => {
          newScores[key] += selectedOption.scores[key]
        })
      }
    }
    setScores(newScores)

    // Move to next question or complete quiz
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        completeQuiz(newScores, newAnswers)
      }
    }, 1000)
  }

  const completeQuiz = (finalScores, finalAnswers) => {
    const maxScore = Math.max(...Object.values(finalScores))
    const dominantType = Object.keys(finalScores).find((key) => finalScores[key] === maxScore)

    const results = {
      dominantType,
      scores: finalScores,
      answers: finalAnswers,
      totalQuestions: questions.length,
      fullAnalysis: {
        psychicType: dominantType,
        developmentLevel: getResultLevel(finalScores),
        abilities: finalScores,
      },
    }

    onComplete(results)
  }

  const getResultLevel = (scores) => {
    const maxScore = Math.max(...Object.values(scores))
    const totalPossible = 40
    const percentage = (maxScore / totalPossible) * 100

    if (percentage >= 70) return "Highly Developed"
    if (percentage >= 50) return "Naturally Gifted"
    if (percentage >= 30) return "Emerging Abilities"
    return "Awakening Potential"
  }

  const renderQuestion = (questionData) => {
    switch (questionData.type) {
      case "symbol":
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {questionData.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAnswer(option.symbol, questionData)}
                className="flex flex-col items-center p-6 bg-slate-700/50 rounded-2xl border-2 border-purple-400/30 hover:border-yellow-400 transition-all duration-300 group"
              >
                <span className="text-4xl mb-2 group-hover:animate-pulse">{option.symbol}</span>
                <span className="text-white text-sm font-medium">{option.text}</span>
              </motion.button>
            ))}
          </div>
        )

      case "color":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {questionData.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(option.color, questionData)}
                className="flex flex-col items-center p-6 rounded-2xl border-2 border-purple-400/30 hover:border-yellow-400 transition-all duration-300"
                style={{ backgroundColor: `${option.color}20` }}
              >
                <div className="w-16 h-16 rounded-full mb-3 shadow-lg" style={{ backgroundColor: option.color }} />
                <span className="text-white font-medium">{option.text}</span>
              </motion.button>
            ))}
          </div>
        )

      case "slider":
        return (
          <div className="space-y-6">
            <div className="flex justify-between text-purple-200 text-sm">
              <span>{questionData.labels[0]}</span>
              <span>{questionData.labels[1]}</span>
            </div>
            <input
              type="range"
              min={questionData.min}
              max={questionData.max}
              defaultValue={5}
              onChange={(e) => handleAnswer(Number.parseInt(e.target.value), questionData)}
              className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        )

      default:
        return (
          <div className="space-y-4">
            {questionData.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option.text, questionData)}
                className="w-full p-4 text-left bg-slate-700/50 rounded-xl border-2 border-purple-400/30 hover:border-yellow-400 text-white transition-all duration-300"
              >
                {option.text}
              </motion.button>
            ))}
          </div>
        )
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto">
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-500/30">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-purple-200 text-sm">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-yellow-400 text-sm">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-pink-500 to-orange-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
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
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              {questions[currentQuestion].question}
            </h2>
            {renderQuestion(questions[currentQuestion])}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default QuizEngine
