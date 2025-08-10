'use client'
import type React from 'react'
import { motion } from 'framer-motion'
import {
  ExternalLink,
  User,
  Calendar,
  Globe,
  MapPin,
  Download,
} from 'lucide-react'
// import { fadeIn, slideIn } from "../../shared/utils/motion"
import { generateQuizResultPDF } from '@/lib/pdf-generator'

// Fixed animation functions
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

const slideIn = (direction: string, delay: number) => ({
  initial: {
    x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: delay,
      ease: 'easeOut',
    },
  },
})

const elementDetails = {
  fire: {
    emoji: '🔥',
    name: 'Fire',
    traits: [
      'Passionate',
      'Energetic',
      'Confident',
      'Spontaneous',
      'Courageous',
    ],
    description:
      'Fire signs are the initiators of the zodiac. You possess natural leadership qualities, boundless energy, and an infectious enthusiasm that draws others to you. Your passionate nature drives you to pursue your goals with determination and vigor.',
    love: 'In relationships, you bring excitement and passion. You love deeply and express your feelings openly. You need a partner who can match your energy and appreciate your spontaneous nature.',
    career:
      'You excel in leadership roles, entrepreneurship, and careers that allow for creativity and independence. Consider fields like business, entertainment, sports, or any role where you can inspire and motivate others.',
    advice:
      "Channel your fiery energy constructively. Practice patience and consider others' perspectives. Your natural leadership is a gift - use it to uplift and inspire those around you.",
    color: '#FF6B6B',
  },
  water: {
    emoji: '💧',
    name: 'Water',
    traits: [
      'Intuitive',
      'Emotional',
      'Compassionate',
      'Imaginative',
      'Nurturing',
    ],
    description:
      'Water signs are the emotional healers of the zodiac. You possess deep intuition, emotional intelligence, and a natural ability to understand and empathize with others. Your sensitivity is your superpower.',
    love: "You love with your whole heart and seek deep, meaningful connections. You're naturally nurturing and create safe spaces for your loved ones to be vulnerable and authentic.",
    career:
      'You thrive in caring professions, creative fields, and roles that involve helping others. Consider careers in counseling, healthcare, arts, social work, or any field where your empathy can make a difference.',
    advice:
      'Trust your intuition - it rarely leads you astray. Set healthy boundaries to protect your sensitive nature. Your emotional depth is a gift that can heal and inspire others.',
    color: '#4ECDC4',
  },
  earth: {
    emoji: '🌍',
    name: 'Earth',
    traits: ['Practical', 'Reliable', 'Patient', 'Hardworking', 'Stable'],
    description:
      'Earth signs are the builders of the zodiac. You possess natural wisdom, practical intelligence, and an unwavering commitment to your goals. Your grounded nature provides stability and security to those around you.',
    love: 'You offer loyalty, stability, and genuine care in relationships. You show love through actions and create lasting, secure partnerships built on trust and mutual respect.',
    career:
      'You excel in fields requiring attention to detail, long-term planning, and practical skills. Consider careers in finance, agriculture, construction, healthcare, or any role where your reliability is valued.',
    advice:
      "Embrace change when it serves your growth. Your practical nature is invaluable, but don't forget to nurture your dreams and aspirations alongside your responsibilities.",
    color: '#95E1D3',
  },
  air: {
    emoji: '🌬️',
    name: 'Air',
    traits: ['Intellectual', 'Communicative', 'Social', 'Curious', 'Adaptable'],
    description:
      'Air signs are the communicators of the zodiac. You possess sharp intellect, excellent communication skills, and a natural curiosity about the world. Your ability to connect ideas and people is remarkable.',
    love: 'You value intellectual connection and stimulating conversation in relationships. You need mental compatibility and freedom to explore ideas with your partner.',
    career:
      'You thrive in roles involving communication, technology, education, or social interaction. Consider careers in media, teaching, technology, writing, or any field where your ideas can reach others.',
    advice:
      'Ground your ideas in practical action. Your brilliant mind generates many possibilities - focus on bringing your best ideas to fruition. Stay connected to your body and emotions.',
    color: '#A8E6CF',
  },
}

interface FullResultProps {
  userData: any
  results: any
}

const FullResult: React.FC<FullResultProps> = ({ userData, results }) => {
  console.log('🎯 FullResult rendering with results:', results)

  // Add safety check
  if (!results || !results.dominantElement) {
    console.error('❌ Invalid results passed to FullResult:', results)
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-white text-center">
          <h2 className="text-2xl mb-4">Error: Invalid Results</h2>
          <p>Results data: {JSON.stringify(results)}</p>
        </div>
      </div>
    )
  }

  const element =
    elementDetails[results.dominantElement as keyof typeof elementDetails]

  if (!element) {
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

  const handleDownloadPDF = () => {
    const fullAnalysis = `${element.description}\n\nLove & Relationships: ${element.love}\n\nCareer & Purpose: ${element.career}\n\nGuidance: ${element.advice}`
    const pdf = generateQuizResultPDF(
      userData,
      results,
      'Elemental Dominance Quiz',
      fullAnalysis
    )
    pdf.save(
      `Elemental_Dominance_Quiz_Results_${userData.fullName.replace(
        /\s+/g,
        '_'
      )}.pdf`
    )
  }

  console.log('✅ About to render FullResult UI')

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Debug info */}
      <div className="fixed top-20 left-4 bg-black/80 text-white p-2 rounded z-50 text-xs font-mono">
        FullResult Active
        <br />
        Element: {results.dominantElement}
        <br />
        Valid: {element ? 'Yes' : 'No'}
      </div>

      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-[#1F2A38] rounded-3xl p-8 shadow-2xl border border-white/10 overflow-hidden"
        >
          {/* Header */}
          <motion.div {...fadeIn('up', 0.2)} className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-4xl">{element.emoji}</div>
              <h2 className="text-3xl font-bold text-white">
                Your Complete {element.name} Element Analysis
              </h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-[#915EFF] to-[#FF5F6D] mx-auto rounded-full"></div>
          </motion.div>

          {/* User Information */}
          <motion.div
            {...slideIn('left', 0.3)}
            className="bg-white/5 rounded-2xl p-6 mb-8"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Your Information</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{userData.fullName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{userData.dateOfBirth}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>{userData.country}</span>
              </div>
              {userData.city && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{userData.city}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Element Description */}
          <motion.div {...slideIn('right', 0.4)} className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Understanding Your {element.name} Nature
            </h3>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              {element.description}
            </p>
            <div className="bg-white/5 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-white mb-3">
                Your Core Traits
              </h4>
              <div className="flex flex-wrap gap-2">
                {element.traits.map((trait, index) => (
                  <motion.span
                    key={trait}
                    {...fadeIn('up', 0.1 * index)}
                    className="px-4 py-2 bg-gradient-to-r from-[#915EFF]/20 to-[#FF5F6D]/20 border border-white/20 rounded-full text-white text-sm"
                  >
                    {trait}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Detailed Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div
              {...slideIn('left', 0.5)}
              className="bg-white/5 rounded-2xl p-6"
            >
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <span>💕</span>
                <span>Love & Relationships</span>
              </h4>
              <p className="text-white/80 leading-relaxed">{element.love}</p>
            </motion.div>
            <motion.div
              {...slideIn('right', 0.5)}
              className="bg-white/5 rounded-2xl p-6"
            >
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <span>💼</span>
                <span>Career & Purpose</span>
              </h4>
              <p className="text-white/80 leading-relaxed">{element.career}</p>
            </motion.div>
          </div>

          {/* Life Advice */}
          <motion.div
            {...fadeIn('up', 0.6)}
            className="bg-gradient-to-r from-[#915EFF]/10 to-[#FF5F6D]/10 border border-white/20 rounded-2xl p-6 mb-8"
          >
            <h4 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <span>✨</span>
              <span>Guidance for Your Journey</span>
            </h4>
            <p className="text-white/80 leading-relaxed text-lg">
              {element.advice}
            </p>
          </motion.div>

          {/* Elemental Scores */}
          <motion.div
            {...fadeIn('up', 0.7)}
            className="bg-white/5 rounded-2xl p-6 mb-8"
          >
            <h4 className="text-xl font-semibold text-white mb-6">
              Your Complete Elemental Profile
            </h4>
            <div className="space-y-4">
              {Object.entries(results.percentages || {})
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .map(([elementKey, percentage]) => {
                  const elementInfo =
                    elementDetails[elementKey as keyof typeof elementDetails]
                  if (!elementInfo) return null

                  return (
                    <div
                      key={elementKey}
                      className="flex items-center space-x-4"
                    >
                      <div className="text-2xl">{elementInfo.emoji}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium capitalize">
                            {elementKey}
                          </span>
                          <span className="text-white/80">{percentage}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <motion.div
                            className="h-2 rounded-full"
                            style={{ backgroundColor: elementInfo.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </motion.div>

          {/* Download PDF Button */}
          <motion.div {...fadeIn('up', 0.8)} className="text-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadPDF}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              <span>Download PDF Report</span>
            </motion.button>
          </motion.div>

          {/* CTA */}
          <motion.div
            {...fadeIn('up', 0.9)}
            className="text-center bg-gradient-to-r from-[#915EFF]/20 to-[#FF5F6D]/20 border border-white/20 rounded-2xl p-8"
          >
            <h4 className="text-2xl font-semibold text-white mb-4">
              Want to Dive Deeper? 🔮
            </h4>
            <p className="text-white/80 mb-6 text-lg">
              Discover your complete natal chart and unlock the secrets of your
              astrological blueprint.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>👉 Get Your Full Natal Chart Analysis</span>
              <ExternalLink className="w-5 h-5" />
            </motion.a>
            <div className="mt-6 text-center">
              <div className="text-white/60 text-sm mb-2">Powered by</div>
              <div className="text-white font-semibold text-lg">
                QuizzAstrology.com
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default FullResult
