'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MoonPhase } from './MoonPhase'
import RuneSelector from './RuneSelector'

const questions = [
  {
    id: 1,
    question:
      'As you approach the Eclipse Portal, which lunar phase calls to your soul?',
    type: 'moon_phase',
    options: [
      { id: 'new_moon', text: 'New Moon - New Beginnings', phase: 'new' },
      {
        id: 'waxing_moon',
        text: 'Waxing Moon - Growth & Manifestation',
        phase: 'waxing',
      },
      {
        id: 'full_moon',
        text: 'Full Moon - Peak Power & Illumination',
        phase: 'full',
      },
      {
        id: 'waning_moon',
        text: 'Waning Moon - Release & Wisdom',
        phase: 'waning',
      },
    ],
  },
  {
    id: 2,
    question:
      'The Eclipse Portal opens, revealing ancient runes. Choose the first rune that resonates with your spirit:',
    type: 'rune_selection',
    runes: [
      {
        id: 'rune_sight',
        symbol: '👁️',
        name: 'Sight',
        meaning: 'Vision & Prophecy',
      },
      {
        id: 'rune_love',
        symbol: '💖',
        name: 'Love',
        meaning: 'Heart Connection',
      },
      {
        id: 'rune_power',
        symbol: '⚡',
        name: 'Power',
        meaning: 'Spiritual Authority',
      },
      {
        id: 'rune_protection',
        symbol: '🛡️',
        name: 'Protection',
        meaning: 'Divine Shield',
      },
    ],
  },
  {
    id: 3,
    question:
      'As the eclipse reaches totality, another set of runes appears. Select your second guiding rune:',
    type: 'rune_selection',
    runes: [
      {
        id: 'rune_guidance',
        symbol: '🧭',
        name: 'Guidance',
        meaning: 'Divine Direction',
      },
      {
        id: 'rune_mystery',
        symbol: '🔮',
        name: 'Mystery',
        meaning: 'Hidden Knowledge',
      },
      {
        id: 'rune_illumination',
        symbol: '💡',
        name: 'Illumination',
        meaning: 'Enlightenment',
      },
      {
        id: 'rune_magic',
        symbol: '✨',
        name: 'Magic',
        meaning: 'Manifestation Power',
      },
    ],
  },
  {
    id: 4,
    question:
      'The Eclipse Portal is closing. Choose your final rune to seal your destiny:',
    type: 'rune_selection',
    runes: [
      {
        id: 'rune_transformation',
        symbol: '🦋',
        name: 'Transformation',
        meaning: 'Metamorphosis',
      },
      {
        id: 'rune_wisdom',
        symbol: '🦉',
        name: 'Wisdom',
        meaning: 'Ancient Knowledge',
      },
      {
        id: 'rune_healing',
        symbol: '🌿',
        name: 'Healing',
        meaning: 'Restoration',
      },
      {
        id: 'rune_destiny',
        symbol: '⭐',
        name: 'Destiny',
        meaning: 'Soul Purpose',
      },
    ],
  },
]

export default function QuizEngine({ userData, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showMoonPhase, setShowMoonPhase] = useState(true)

  const handleAnswer = (answerId) => {
    const newAnswers = [...answers, answerId]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowMoonPhase(questions[currentQuestion + 1].type === 'moon_phase')
    } else {
      onComplete(newAnswers)
    }
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <AnimatePresence mode="wait">
          {showMoonPhase && currentQ.type === 'moon_phase' && (
            <motion.div
              key="moon-phase"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <MoonPhase
                onPhaseSelect={() => setShowMoonPhase(false)}
                questionNumber={currentQuestion + 1}
              />
            </motion.div>
          )}

          {!showMoonPhase && (
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-indigo-500/30 shadow-2xl">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <div className="text-indigo-300 text-sm mb-2">
                    Eclipse Phase {currentQuestion + 1} of {questions.length}
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-white mb-8"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {currentQ.question}
                  </h2>
                </motion.div>

                {currentQ.type === 'moon_phase' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQ.options.map((option, index) => (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)',
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAnswer(option.id)}
                        className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border border-indigo-400/30 rounded-2xl p-6 text-white hover:border-indigo-400/60 transition-all duration-300"
                      >
                        <div className="font-medium">{option.text}</div>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <RuneSelector
                    runes={currentQ.runes}
                    onRuneSelect={handleAnswer}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
