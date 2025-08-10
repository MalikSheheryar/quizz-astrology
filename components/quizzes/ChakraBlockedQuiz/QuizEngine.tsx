"use client"
import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, Slider, ImageChoice, Chip } from "./components"
import { calculateChakraScores } from "./utils/chakraLogic"
import { slideVariants } from "./utils/motion"

interface QuizEngineProps {
  userData: any
  onComplete: (scores: any, responses: any) => void
}

const QuizEngine: React.FC<QuizEngineProps> = ({ userData, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [isAnimating, setIsAnimating] = useState(false)

  const questions = [
    {
      id: "bodyTension",
      type: "imageChoice",
      question: "Where do you carry tension most in your body?",
      subtitle: "Trust your first instinct and choose the area that feels most relevant",
      options: [
        { id: "legs", label: "Legs & Feet", image: "🦵", chakras: { root: 3 } },
        { id: "hips", label: "Hips & Lower Back", image: "🍑", chakras: { sacral: 3, root: 1 } },
        { id: "belly", label: "Belly & Core", image: "🤰", chakras: { solarPlexus: 3 } },
        { id: "chest", label: "Chest & Heart", image: "💗", chakras: { heart: 3 } },
        { id: "throat", label: "Throat & Jaw", image: "🗣️", chakras: { throat: 3 } },
        { id: "head", label: "Forehead & Eyes", image: "🧠", chakras: { thirdEye: 3 } },
        { id: "crown", label: "Top of Head", image: "👑", chakras: { crown: 3 } },
      ],
    },
    {
      id: "emotionalState",
      type: "slider",
      question: "Lately, I feel...",
      subtitle: "Move the slider to reflect your current emotional landscape",
      leftLabel: "Unsafe & Unstable",
      rightLabel: "Secure & Grounded",
      chakras: { root: "inverse" },
    },
    {
      id: "creativityFlow",
      type: "slider",
      question: "My creative and sensual energy feels...",
      subtitle: "This includes creativity, pleasure, and intimate connections",
      leftLabel: "Blocked & Numb",
      rightLabel: "Flowing & Alive",
      chakras: { sacral: "inverse" },
    },
    {
      id: "personalPower",
      type: "slider",
      question: "When it comes to decisions and personal power...",
      subtitle: "How do you feel about your ability to take action and make choices?",
      leftLabel: "Powerless & Indecisive",
      rightLabel: "Confident & Decisive",
      chakras: { solarPlexus: "inverse" },
    },
    {
      id: "heartConnection",
      type: "slider",
      question: "My heart feels...",
      subtitle: "Consider your capacity for love, compassion, and emotional connection",
      leftLabel: "Closed & Guarded",
      rightLabel: "Open & Loving",
      chakras: { heart: "inverse" },
    },
    {
      id: "voiceExpression",
      type: "chips",
      question: "Which is hardest for you to say lately?",
      subtitle: "Choose all that feel challenging for you right now",
      multiple: true,
      options: [
        { id: "no", label: "No", chakras: { throat: 2, solarPlexus: 1 } },
        { id: "help", label: "I need help", chakras: { throat: 2, heart: 1 } },
        { id: "love", label: "I love you", chakras: { heart: 2, throat: 1 } },
        { id: "dontknow", label: "I don't know", chakras: { thirdEye: 2, throat: 1 } },
        { id: "boundary", label: "This is my boundary", chakras: { throat: 3, solarPlexus: 1 } },
        { id: "truth", label: "My truth", chakras: { throat: 3 } },
      ],
    },
    {
      id: "intuitionClarity",
      type: "slider",
      question: "My inner knowing and intuition feels...",
      subtitle: "How clear and trustworthy does your inner guidance feel?",
      leftLabel: "Foggy & Doubtful",
      rightLabel: "Clear & Trustworthy",
      chakras: { thirdEye: "inverse" },
    },
    {
      id: "spiritualConnection",
      type: "slider",
      question: "My connection to something greater feels...",
      subtitle: "This could be spirituality, purpose, or universal connection",
      leftLabel: "Disconnected & Lost",
      rightLabel: "Connected & Guided",
      chakras: { crown: "inverse" },
    },
    {
      id: "conflictResponse",
      type: "imageChoice",
      question: "When conflict or stress hits, you tend to...",
      subtitle: "Choose the response that feels most like your automatic reaction",
      options: [
        { id: "freeze", label: "Freeze & Withdraw", image: "🥶", chakras: { root: 2, throat: 1 } },
        { id: "please", label: "People-Please", image: "😅", chakras: { heart: 2, solarPlexus: 1 } },
        { id: "control", label: "Over-Control", image: "😤", chakras: { solarPlexus: 2, heart: 1 } },
        { id: "shutdown", label: "Shut Down Emotionally", image: "😶", chakras: { heart: 2, throat: 1 } },
        { id: "overshare", label: "Overshare or Vent", image: "😵", chakras: { throat: 2, thirdEye: 1 } },
        { id: "avoid", label: "Avoid Decisions", image: "🙈", chakras: { thirdEye: 2, solarPlexus: 1 } },
      ],
    },
    {
      id: "joyConnection",
      type: "imageChoice",
      question: "What image feels most like joy to you right now?",
      subtitle: "Choose the one that makes your energy feel lighter",
      options: [
        { id: "water", label: "Flowing Water", image: "🌊", chakras: { sacral: -2, heart: -1 } },
        { id: "fire", label: "Warm Fire", image: "🔥", chakras: { solarPlexus: -2, root: -1 } },
        { id: "nature", label: "Peaceful Nature", image: "🌿", chakras: { heart: -2, crown: -1 } },
        { id: "art", label: "Creative Expression", image: "🎨", chakras: { sacral: -2, throat: -1 } },
        { id: "connection", label: "Deep Connection", image: "🤝", chakras: { heart: -2, crown: -1 } },
        { id: "silence", label: "Sacred Silence", image: "🧘", chakras: { crown: -2, thirdEye: -1 } },
      ],
    },
  ]

  const handleAnswer = (questionId: string, answer: any) => {
    setResponses((prev) => ({ ...prev, [questionId]: answer }))

    if (currentQuestion < questions.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1)
        setIsAnimating(false)
      }, 300)
    } else {
      // Quiz complete
      const finalResponses = { ...responses, [questionId]: answer }
      const scores = calculateChakraScores(finalResponses, questions)
      onComplete(scores, finalResponses)
    }
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <Card className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-white/70 text-sm">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-[#FFD700] text-sm font-medium">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <motion.div
            className="h-2 bg-gradient-to-r from-[#FFD700] to-[#915EFF] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={isAnimating ? "pointer-events-none" : ""}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{currentQ.question}</h2>
            {currentQ.subtitle && <p className="text-white/70 text-lg">{currentQ.subtitle}</p>}
          </div>

          <div className="space-y-6">
            {currentQ.type === "slider" && (
              <Slider
                value={responses[currentQ.id] || 5}
                onChange={(value) => handleAnswer(currentQ.id, value)}
                min={1}
                max={10}
                leftLabel={currentQ.leftLabel}
                rightLabel={currentQ.rightLabel}
                showValue={false}
                autoAdvance={true}
              />
            )}

            {currentQ.type === "imageChoice" && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {currentQ.options.map((option) => (
                  <ImageChoice
                    key={option.id}
                    image={option.image}
                    label={option.label}
                    selected={responses[currentQ.id] === option.id}
                    onClick={() => handleAnswer(currentQ.id, option.id)}
                  />
                ))}
              </div>
            )}

            {currentQ.type === "chips" && (
              <div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {currentQ.options.map((option) => {
                    const selected = currentQ.multiple
                      ? (responses[currentQ.id] || []).includes(option.id)
                      : responses[currentQ.id] === option.id

                    return (
                      <Chip
                        key={option.id}
                        label={option.label}
                        selected={selected}
                        onClick={() => {
                          if (currentQ.multiple) {
                            const current = responses[currentQ.id] || []
                            const updated = current.includes(option.id)
                              ? current.filter((id: string) => id !== option.id)
                              : [...current, option.id]
                            setResponses((prev) => ({ ...prev, [currentQ.id]: updated }))
                          } else {
                            handleAnswer(currentQ.id, option.id)
                          }
                        }}
                      />
                    )
                  })}
                </div>

                {currentQ.multiple && (
                  <motion.button
                    onClick={() => handleAnswer(currentQ.id, responses[currentQ.id] || [])}
                    className="w-full py-3 px-6 bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue
                  </motion.button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </Card>
  )
}

export default QuizEngine
