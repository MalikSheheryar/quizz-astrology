'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import UserForm from './UserForm'
import QuizEngine from './QuizEngine'
import ShortResult from './ShortResult'
import FullResult from './FullResult'
import { ParticleSystem } from './ParticleSystem'
import AudioManager from './AudioManager' // Default import, not named import

export default function EclipsePortalQuiz() {
  const [currentStep, setCurrentStep] = useState('form')
  const [userData, setUserData] = useState(null)
  const [quizAnswers, setQuizAnswers] = useState([])
  const [results, setResults] = useState(null)
  const [showFullResult, setShowFullResult] = useState(false)

  const handleFormSubmit = (data) => {
    setUserData(data)
    setCurrentStep('quiz')
  }

  const handleQuizComplete = (answers) => {
    setQuizAnswers(answers)

    // Generate eclipse destiny based on answers
    const destiny = generateEclipseDestiny(answers, userData)
    setResults(destiny)
    setCurrentStep('shortResult')
  }

  const handlePaymentSuccess = () => {
    setShowFullResult(true)
    setCurrentStep('fullResult')
  }

  const generateEclipseDestiny = (answers, userData) => {
    const runeAnswers = answers.filter((answer) => answer.startsWith('rune_'))
    const selectedRunes = runeAnswers.map((answer) =>
      answer.replace('rune_', '')
    )

    const destinyMessages = {
      sight:
        'The Eclipse reveals that your third eye is awakening. Visions and prophetic dreams will guide your path.',
      love: 'A profound soul connection approaches during the next lunar cycle. Your heart chakra is expanding.',
      power:
        'The Eclipse Portal grants you access to ancient wisdom and spiritual authority. Your time of leadership begins.',
      protection:
        'Powerful guardian spirits surround you. The Eclipse has activated your spiritual shield.',
      guidance:
        'The ancestors speak through the Eclipse Portal. Listen for signs and synchronicities in your daily life.',
      mystery:
        'Hidden knowledge will be revealed to you. The Eclipse has opened doorways to esoteric wisdom.',
      illumination:
        'Your consciousness is expanding beyond earthly limitations. Enlightenment approaches.',
      magic:
        'Your natural magical abilities are awakening. The Eclipse has amplified your manifestation powers.',
    }

    const primaryRune = selectedRunes[0] || 'sight'
    const destinyMessage = destinyMessages[primaryRune]

    return {
      primaryDestiny: destinyMessage,
      selectedRunes: selectedRunes,
      eclipsePhase: 'Total Eclipse',
      cosmicAlignment:
        'The Eclipse Portal has aligned your energy with the cosmic frequencies of transformation and awakening.',
      fullAnalysis: `Dear ${userData?.name || 'Eclipse Seeker'},

The Lunar Eclipse Portal has opened specifically for you, revealing profound insights about your spiritual destiny. As the moon passed through Earth's shadow, it illuminated the hidden aspects of your soul's journey.

${destinyMessage}

The runes you selected during the eclipse ceremony - ${selectedRunes.join(
        ', '
      )} - carry special significance for your path ahead. These ancient symbols will appear in your life as confirmations that you are aligned with your highest destiny.

During this powerful Eclipse Portal reading, the cosmic energies revealed:

🌙 LUNAR ECLIPSE INSIGHTS:
Your soul is undergoing a profound transformation. The eclipse energy is clearing old patterns and making space for your authentic self to emerge.

⭐ COSMIC ALIGNMENT:
The universe is conspiring to support your spiritual evolution. Major life changes are approaching that will align you with your soul's purpose.

🔮 MYSTICAL AWAKENING:
Your psychic abilities are strengthening. Pay attention to intuitive messages, dreams, and synchronicities over the next lunar cycle.

✨ PORTAL ACTIVATION:
The Eclipse Portal has activated dormant spiritual gifts within you. Trust the new abilities and insights that are emerging.

🌟 DESTINY TIMELINE:
Within the next three months, you will experience a significant spiritual breakthrough that changes your perspective on life. The Eclipse Portal has set these events in motion.

The lunar eclipse energy will continue to work through your energy field for the next 6 months, bringing:
• Heightened intuition and psychic experiences
• Meaningful connections with like-minded souls
• Opportunities to step into your spiritual power
• Release of old fears and limiting beliefs

Remember, you have been chosen by the Eclipse Portal for this sacred initiation. Trust the process of transformation, even when the path seems uncertain.

May the eclipse light guide your journey,
The Eclipse Portal Keeper`,
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black relative overflow-hidden">
      <ParticleSystem phase={currentStep} />
      <AudioManager phase={currentStep} />

      <AnimatePresence mode="wait">
        {currentStep === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
          >
            <UserForm onSubmit={handleFormSubmit} />
          </motion.div>
        )}

        {currentStep === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
          >
            <QuizEngine userData={userData} onComplete={handleQuizComplete} />
          </motion.div>
        )}

        {currentStep === 'shortResult' && (
          <motion.div
            key="shortResult"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <ShortResult
              userData={userData}
              results={results}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </motion.div>
        )}

        {currentStep === 'fullResult' && (
          <motion.div
            key="fullResult"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FullResult userData={userData} results={results} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
