'use client'
import type React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
// import { Sparkles } from 'lucide-react'
// import { fadeIn, scaleIn } from '../../shared/utils/motion'
import PaymentModal from '../../PaymentModal'

// Fixed fadeIn function that matches framer-motion expectations
const fadeIn = (direction: string, delay: number) => ({
  initial: {
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    opacity: 0,
  },
  animate: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: delay,
      ease: 'easeOut',
    },
  },
})

const elementData = {
  fire: {
    emoji: '🔥',
    name: 'Fire',
    shortDescription: 'Passionate, Dynamic, Leader',
    color: '#FF6B6B',
  },
  water: {
    emoji: '💧',
    name: 'Water',
    shortDescription: 'Intuitive, Compassionate, Deep',
    color: '#4ECDC4',
  },
  earth: {
    emoji: '🌍',
    name: 'Earth',
    shortDescription: 'Grounded, Practical, Reliable',
    color: '#95E1D3',
  },
  air: {
    emoji: '🌬️',
    name: 'Air',
    shortDescription: 'Intellectual, Communicative, Free',
    color: '#A8E6CF',
  },
}

interface ShortResultProps {
  userData: any
  results: any
  onShowFullResult: () => void
}

const ShortResult: React.FC<ShortResultProps> = ({
  userData,
  results,
  onShowFullResult,
}) => {
  console.log('🎯 ShortResult rendering with results:', results)
  console.log('📊 Results structure:', JSON.stringify(results, null, 2))

  const [showPaymentModal, setShowPaymentModal] = useState(false)

  // Add safety check
  if (!results || !results.dominantElement) {
    console.error('❌ Invalid results passed to ShortResult:', results)
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-white text-center">
          <h2 className="text-2xl mb-4">Error: Invalid Results</h2>
          <p>Results data: {JSON.stringify(results)}</p>
        </div>
      </div>
    )
  }

  const dominantElement =
    elementData[results.dominantElement as keyof typeof elementData]

  if (!dominantElement) {
    console.error('❌ Invalid dominant element:', results.dominantElement)
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-white text-center">
          <h2 className="text-2xl mb-4">Error: Unknown Element</h2>
          <p>Dominant element: {results.dominantElement}</p>
        </div>
      </div>
    )
  }

  const handleUnlockFull = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    onShowFullResult()
  }

  const getFullAnalysis = () => {
    const elementDetails = {
      fire: "Fire signs are the initiators of the zodiac. You possess natural leadership qualities, boundless energy, and an infectious enthusiasm that draws others to you. Your passionate nature drives you to pursue your goals with determination and vigor. In relationships, you bring excitement and passion. You love deeply and express your feelings openly. You need a partner who can match your energy and appreciate your spontaneous nature. You excel in leadership roles, entrepreneurship, and careers that allow for creativity and independence. Channel your fiery energy constructively. Practice patience and consider others' perspectives. Your natural leadership is a gift - use it to uplift and inspire those around you.",
      water:
        "Water signs are the emotional healers of the zodiac. You possess deep intuition, emotional intelligence, and a natural ability to understand and empathize with others. Your sensitivity is your superpower. You love with your whole heart and seek deep, meaningful connections. You're naturally nurturing and create safe spaces for your loved ones to be vulnerable and authentic. You thrive in caring professions, creative fields, and roles that involve helping others. Trust your intuition - it rarely leads you astray. Set healthy boundaries to protect your sensitive nature. Your emotional depth is a gift that can heal and inspire others.",
      earth:
        "Earth signs are the builders of the zodiac. You possess natural wisdom, practical intelligence, and an unwavering commitment to your goals. Your grounded nature provides stability and security to those around you. You offer loyalty, stability, and genuine care in relationships. You show love through actions and create lasting, secure partnerships built on trust and mutual respect. You excel in fields requiring attention to detail, long-term planning, and practical skills. Embrace change when it serves your growth. Your practical nature is invaluable, but don't forget to nurture your dreams and aspirations alongside your responsibilities.",
      air: 'Air signs are the communicators of the zodiac. You possess sharp intellect, excellent communication skills, and a natural curiosity about the world. Your ability to connect ideas and people is remarkable. You value intellectual connection and stimulating conversation in relationships. You need mental compatibility and freedom to explore ideas with your partner. You thrive in roles involving communication, technology, education, or social interaction. Ground your ideas in practical action. Your brilliant mind generates many possibilities - focus on bringing your best ideas to fruition. Stay connected to your body and emotions.',
    }
    return elementDetails[
      results.dominantElement as keyof typeof elementDetails
    ]
  }

  console.log('✅ About to render ShortResult UI')

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Debug info */}
      <div className="fixed top-20 left-4 bg-black/80 text-white p-2 rounded z-50 text-xs font-mono">
        ShortResult Active
        <br />
        Element: {results.dominantElement}
        <br />
        Valid: {dominantElement ? 'Yes' : 'No'}
      </div>

      <div className="w-full max-w-2xl">
        <motion.div
          {...fadeIn('up', 0.2)}
          className="bg-[#1F2A38] rounded-3xl p-8 shadow-2xl border border-white/10 text-center mb-8"
        >
          <motion.div {...fadeIn('up', 0.3)} className="text-8xl mb-6">
            {dominantElement.emoji}
          </motion.div>

          <motion.h1
            {...fadeIn('up', 0.4)}
            className="text-4xl font-bold text-white mb-4"
          >
            Your Dominant Element
          </motion.h1>

          <motion.div {...fadeIn('up', 0.5)} className="mb-6">
            <h2
              className="text-6xl font-bold mb-2"
              style={{ color: dominantElement.color }}
            >
              {dominantElement.name}
            </h2>
            <p className="text-xl text-white/80">
              {dominantElement.shortDescription}
            </p>
          </motion.div>

          <motion.div
            {...fadeIn('up', 0.6)}
            className="bg-white/10 rounded-2xl p-6 mb-8"
          >
            <h3 className="text-white font-semibold mb-4">
              Your Elemental Balance
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(results.percentages || {}).map(
                ([element, percentage]) => {
                  const elementInfo =
                    elementData[element as keyof typeof elementData]
                  if (!elementInfo) return null

                  return (
                    <div key={element} className="text-center">
                      <div className="text-2xl mb-1">{elementInfo.emoji}</div>
                      <div className="text-white font-semibold">
                        {percentage}%
                      </div>
                      <div className="text-white/60 text-sm capitalize">
                        {element}
                      </div>
                    </div>
                  )
                }
              )}
            </div>
          </motion.div>

          <motion.p
            {...fadeIn('up', 0.7)}
            className="text-white/70 mb-8 text-lg"
          >
            You are strongly influenced by the {dominantElement.name} Element —{' '}
            {dominantElement.shortDescription}.
          </motion.p>

          <motion.button
            {...fadeIn('up', 0.8)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUnlockFull}
            className="bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <span>Unlock Full Elemental Breakdown - $1.99</span>
          </motion.button>
        </motion.div>

        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
          quizSlug="elemental-dominance-quiz"
          userData={userData}
          results={results}
          quizTitle="Elemental Dominance Quiz"
          fullAnalysis={getFullAnalysis()}
          price={1.99}
        />
      </div>
    </div>
  )
}

export default ShortResult
