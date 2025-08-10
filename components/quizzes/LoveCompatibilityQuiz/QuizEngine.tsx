"use client"
import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Flame, Droplets, Wind, Mountain, Moon, Star, Zap, ArrowRight, ArrowLeft } from "lucide-react"

interface QuizEngineProps {
  userData: any
  onComplete: (answers: any, score: any) => void
}

const QuizEngine: React.FC<QuizEngineProps> = ({ userData, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null)

  const questions = [
    {
      type: "romantic-scenario",
      question: "Your crush texts you late at night saying 'Can't sleep, thinking of you.' What do you do?",
      options: [
        { text: "Reply immediately with heart emojis", value: "immediate", points: { communication: 8, emotional: 9 } },
        {
          text: "Wait a bit, then send a thoughtful response",
          value: "thoughtful",
          points: { communication: 9, emotional: 7 },
        },
        { text: "Call them instead of texting back", value: "call", points: { communication: 7, emotional: 8 } },
        {
          text: "Send a cute selfie with a sweet message",
          value: "selfie",
          points: { communication: 6, emotional: 9 },
        },
      ],
    },
    {
      type: "symbol-selection",
      question: "Choose the symbol that best represents your connection with your crush:",
      options: [
        { icon: Flame, text: "Fire - Passionate and intense", value: "fire", points: { elemental: 10, romantic: 9 } },
        { icon: Droplets, text: "Water - Deep and emotional", value: "water", points: { elemental: 8, emotional: 10 } },
        { icon: Wind, text: "Air - Intellectual and free", value: "air", points: { elemental: 7, communication: 10 } },
        { icon: Mountain, text: "Earth - Stable and grounding", value: "earth", points: { elemental: 9, romantic: 7 } },
      ],
    },
    {
      type: "emotional-depth",
      question: "After spending time with your crush, you usually feel:",
      options: [
        { text: "Energized and glowing", value: "energized", points: { emotional: 9, compatibility: 8 } },
        { text: "Peaceful and content", value: "peaceful", points: { emotional: 8, compatibility: 9 } },
        { text: "Excited but a bit drained", value: "mixed", points: { emotional: 6, compatibility: 6 } },
        { text: "Confused about your feelings", value: "confused", points: { emotional: 4, compatibility: 5 } },
      ],
    },
    {
      type: "zodiac-vibe",
      question: "Which zodiac energy best describes your crush's vibe?",
      options: [
        { text: "Aries - Bold and adventurous", value: "aries", points: { zodiac: 8, elemental: 9 } },
        { text: "Cancer - Nurturing and intuitive", value: "cancer", points: { zodiac: 9, emotional: 9 } },
        { text: "Libra - Charming and balanced", value: "libra", points: { zodiac: 8, communication: 9 } },
        { text: "Scorpio - Mysterious and magnetic", value: "scorpio", points: { zodiac: 10, romantic: 10 } },
      ],
    },
    {
      type: "intuition",
      question: "Deep down, do you feel this person was sent to:",
      options: [
        { text: "Teach you important life lessons", value: "teach", points: { compatibility: 7, emotional: 8 } },
        { text: "Stay with you for the long haul", value: "stay", points: { compatibility: 10, romantic: 9 } },
        { text: "Reflect your own energy back to you", value: "reflect", points: { compatibility: 8, emotional: 9 } },
        { text: "Challenge you to grow", value: "challenge", points: { compatibility: 6, emotional: 7 } },
      ],
    },
    {
      type: "behavioral",
      question: "You love to be surprised. Your crush:",
      options: [
        {
          text: "Always keeps you guessing in the best way",
          value: "surprising",
          points: { compatibility: 9, romantic: 8 },
        },
        {
          text: "Is predictable but in a comforting way",
          value: "predictable",
          points: { compatibility: 7, emotional: 8 },
        },
        {
          text: "Surprises you sometimes, but not always",
          value: "sometimes",
          points: { compatibility: 6, romantic: 6 },
        },
        { text: "Rarely surprises you", value: "rarely", points: { compatibility: 4, romantic: 4 } },
      ],
    },
    {
      type: "romantic-scenario",
      question: "Your ideal first date with your crush would be:",
      options: [
        { text: "Stargazing with deep conversations", value: "stargazing", points: { romantic: 9, emotional: 8 } },
        { text: "Adventure like hiking or exploring", value: "adventure", points: { compatibility: 8, elemental: 9 } },
        { text: "Cozy dinner at a intimate restaurant", value: "dinner", points: { romantic: 8, communication: 8 } },
        { text: "Fun activity like mini golf or arcade", value: "fun", points: { compatibility: 7, communication: 9 } },
      ],
    },
    {
      type: "emotional-depth",
      question: "When your crush is stressed, your instinct is to:",
      options: [
        { text: "Give them space to process", value: "space", points: { emotional: 8, compatibility: 7 } },
        {
          text: "Offer practical help and solutions",
          value: "practical",
          points: { communication: 9, compatibility: 8 },
        },
        { text: "Be physically present and comforting", value: "comfort", points: { emotional: 9, romantic: 8 } },
        {
          text: "Distract them with fun activities",
          value: "distract",
          points: { communication: 7, compatibility: 6 },
        },
      ],
    },
    {
      type: "symbol-selection",
      question: "Choose the cosmic symbol that represents your relationship potential:",
      options: [
        {
          icon: Star,
          text: "Twin Stars - Destined connection",
          value: "twin-stars",
          points: { zodiac: 10, romantic: 10 },
        },
        { icon: Moon, text: "Moon Phases - Cyclical growth", value: "moon", points: { zodiac: 8, emotional: 9 } },
        {
          icon: Zap,
          text: "Lightning - Electric attraction",
          value: "lightning",
          points: { elemental: 9, romantic: 8 },
        },
        {
          icon: Heart,
          text: "Infinity Heart - Endless love",
          value: "infinity",
          points: { romantic: 10, compatibility: 9 },
        },
      ],
    },
    {
      type: "zodiac-vibe",
      question: "Your crush's communication style is most like:",
      options: [
        { text: "Gemini - Witty and playful", value: "gemini", points: { communication: 10, zodiac: 8 } },
        { text: "Virgo - Thoughtful and detailed", value: "virgo", points: { communication: 8, compatibility: 9 } },
        { text: "Sagittarius - Honest and direct", value: "sagittarius", points: { communication: 9, elemental: 8 } },
        { text: "Pisces - Intuitive and emotional", value: "pisces", points: { communication: 7, emotional: 10 } },
      ],
    },
    {
      type: "romantic-scenario",
      question: "If you could read your crush's mind right now, you'd want to know:",
      options: [
        {
          text: "If they think about you as much as you think about them",
          value: "thoughts",
          points: { romantic: 9, emotional: 8 },
        },
        {
          text: "What their biggest dreams and fears are",
          value: "dreams",
          points: { emotional: 10, compatibility: 8 },
        },
        { text: "If they see a future with you", value: "future", points: { romantic: 10, compatibility: 9 } },
        { text: "What makes them laugh the most", value: "laugh", points: { communication: 9, compatibility: 7 } },
      ],
    },
    {
      type: "behavioral",
      question: "Your crush's energy level compared to yours is:",
      options: [
        {
          text: "Perfectly matched - we sync up naturally",
          value: "matched",
          points: { compatibility: 10, elemental: 9 },
        },
        {
          text: "They're more energetic - they inspire me",
          value: "higher",
          points: { compatibility: 8, elemental: 7 },
        },
        { text: "I'm more energetic - I motivate them", value: "lower", points: { compatibility: 7, elemental: 8 } },
        { text: "We're opposites but it works somehow", value: "opposite", points: { compatibility: 6, elemental: 6 } },
      ],
    },
    {
      type: "intuition",
      question: "When you imagine your perfect relationship, it feels:",
      options: [
        { text: "Like coming home to yourself", value: "home", points: { emotional: 10, compatibility: 9 } },
        { text: "Like an exciting adventure together", value: "adventure", points: { romantic: 9, compatibility: 8 } },
        { text: "Like growing into your best self", value: "growth", points: { emotional: 8, compatibility: 10 } },
        { text: "Like finding your missing piece", value: "complete", points: { romantic: 10, emotional: 9 } },
      ],
    },
    {
      type: "emotional-depth",
      question: "Your crush's way of showing affection is probably:",
      options: [
        { text: "Words of affirmation and sweet texts", value: "words", points: { communication: 10, romantic: 8 } },
        { text: "Physical touch and closeness", value: "touch", points: { romantic: 10, emotional: 8 } },
        {
          text: "Acts of service and thoughtful gestures",
          value: "service",
          points: { compatibility: 9, emotional: 8 },
        },
        { text: "Quality time and undivided attention", value: "time", points: { compatibility: 8, communication: 9 } },
      ],
    },
    {
      type: "romantic-scenario",
      question: "If your crush wrote you a love letter, it would probably:",
      options: [
        { text: "Be poetic and deeply romantic", value: "poetic", points: { romantic: 10, emotional: 9 } },
        { text: "Be honest and from the heart", value: "honest", points: { communication: 9, emotional: 9 } },
        { text: "Be playful with inside jokes", value: "playful", points: { communication: 10, compatibility: 8 } },
        { text: "Be short but incredibly meaningful", value: "meaningful", points: { emotional: 10, romantic: 8 } },
      ],
    },
  ]

  const handleAnswerSelect = (option: any) => {
    setSelectedAnswer(option)
  }

  const handleNext = () => {
    if (selectedAnswer) {
      const newAnswers = [...answers, selectedAnswer]
      setAnswers(newAnswers)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        // Calculate compatibility score
        const score = calculateCompatibilityScore(newAnswers)
        onComplete(newAnswers, score)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1])
      setAnswers(answers.slice(0, -1))
    }
  }

  const calculateCompatibilityScore = (allAnswers: any[]) => {
    const scores = {
      communication: 0,
      emotional: 0,
      romantic: 0,
      compatibility: 0,
      zodiac: 0,
      elemental: 0,
    }

    const counts = {
      communication: 0,
      emotional: 0,
      romantic: 0,
      compatibility: 0,
      zodiac: 0,
      elemental: 0,
    }

    allAnswers.forEach((answer) => {
      Object.keys(answer.points).forEach((category) => {
        scores[category as keyof typeof scores] += answer.points[category]
        counts[category as keyof typeof counts]++
      })
    })

    const averages: Record<string, number> = {}
    Object.keys(scores).forEach((category) => {
      averages[category] =
        counts[category as keyof typeof counts] > 0
          ? Math.round(scores[category as keyof typeof scores] / counts[category as keyof typeof counts])
          : 0
    })

    const overall = Math.round(
      (averages.communication +
        averages.emotional +
        averages.romantic +
        averages.compatibility +
        averages.zodiac +
        averages.elemental) /
        6,
    )

    return {
      overall: Math.min(overall * 10, 100),
      breakdown: {
        communication: Math.min(averages.communication * 10, 100),
        emotional: Math.min(averages.emotional * 10, 100),
        romantic: Math.min(averages.romantic * 10, 100),
        compatibility: Math.min(averages.compatibility * 10, 100),
        zodiac: Math.min(averages.zodiac * 10, 100),
        elemental: Math.min(averages.elemental * 10, 100),
      },
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentQ = questions[currentQuestion]

  return (
    <div className="bg-slate-800/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10 max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-white/80 text-sm">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-white/80 text-sm">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-orange-400 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center leading-relaxed">
            {currentQ.question}
          </h2>

          <div className="grid gap-4">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer?.value === option.value
              const Icon = option.icon

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    isSelected
                      ? "bg-gradient-to-r from-pink-500/20 to-orange-400/20 border-pink-400 shadow-lg"
                      : "bg-white/5 border-white/20 hover:border-white/40 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {Icon && (
                      <div className={`p-3 rounded-full ${isSelected ? "bg-pink-500" : "bg-white/10"}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <span className="text-white text-lg font-medium flex-1">{option.text}</span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center"
                      >
                        <div className="w-3 h-3 bg-white rounded-full" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <motion.button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          whileHover={{ scale: currentQuestion === 0 ? 1 : 1.05 }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
            currentQuestion === 0 ? "text-white/40 cursor-not-allowed" : "text-white hover:bg-white/10"
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          Previous
        </motion.button>

        <motion.button
          onClick={handleNext}
          disabled={!selectedAnswer}
          whileHover={{ scale: !selectedAnswer ? 1 : 1.05 }}
          whileTap={{ scale: !selectedAnswer ? 1 : 0.95 }}
          className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
            selectedAnswer
              ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow-lg hover:shadow-xl"
              : "bg-white/10 text-white/40 cursor-not-allowed"
          }`}
        >
          {currentQuestion === questions.length - 1 ? "Reveal My Score" : "Next"}
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  )
}

export default QuizEngine
