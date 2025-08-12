"use client"

import type React from "react"
import { motion } from "framer-motion"
import { calculateLifePath, getArchetype, getSunSign } from "./utils/calculations"
import { Star, Heart, Zap, Target, Crown, Compass } from "lucide-react"

interface FullResultProps {
  userData: any
  quizAnswers: any
}

const FullResult: React.FC<FullResultProps> = ({ userData, quizAnswers }) => {
  const lifePath = calculateLifePath(userData.birthDate)
  const sunSign = getSunSign(userData.birthDate)
  const archetype = getArchetype(lifePath, quizAnswers)

  const archetypeIcons = {
    "The Visionary": Star,
    "The Healer": Heart,
    "The Creator": Zap,
    "The Guide": Compass,
    "The Warrior": Crown,
    "The Teacher": Target,
  }

  const ArchetypeIcon = archetypeIcons[archetype.name as keyof typeof archetypeIcons] || Star

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-[#1F2A38] rounded-2xl p-8 shadow-2xl border border-white/10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#FFD700] to-[#915EFF] rounded-full flex items-center justify-center">
            <ArchetypeIcon className="w-16 h-16 text-white" />
          </div>

          <h1 className="text-4xl font-bold text-white mb-4 font-heading">
            {userData.fullName}'s Life Mission Blueprint
          </h1>

          <div className="flex justify-center items-center space-x-8 text-white/70 font-body">
            <div>Born: {new Date(userData.birthDate).toLocaleDateString()}</div>
            <div>Life Path: {lifePath}</div>
            <div>Sun Sign: {sunSign}</div>
          </div>
        </motion.div>

        {/* Main Archetype */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-[#FFD700] mb-6 text-center font-heading">{archetype.name}</h2>

          <div className="bg-white/5 rounded-xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 font-heading">Soul Purpose</h3>
            <p className="text-white/80 leading-relaxed mb-6 font-body">{archetype.purpose}</p>
            <p className="text-white/80 leading-relaxed font-body">{archetype.deeperPurpose}</p>
          </div>
        </motion.div>

        {/* Strengths & Lessons */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-[#6EC1E4] mb-4 font-heading">Strengths & Gifts</h3>
            <ul className="space-y-2 text-white/80 font-body">
              {archetype.strengths.map((strength: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#FFD700] mr-2">•</span>
                  {strength}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-[#915EFF] mb-4 font-heading">Lessons to Master</h3>
            <ul className="space-y-2 text-white/80 font-body">
              {archetype.lessons.map((lesson: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#FFD700] mr-2">•</span>
                  {lesson}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Life Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center font-heading">
            How Your Mission Reveals Itself
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-[#FFD700] mb-3 font-heading">Career</h4>
              <p className="text-white/80 font-body">{archetype.career}</p>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-[#6EC1E4] mb-3 font-heading">Love</h4>
              <p className="text-white/80 font-body">{archetype.love}</p>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-[#915EFF] mb-3 font-heading">Spirituality</h4>
              <p className="text-white/80 font-body">{archetype.spirituality}</p>
            </div>
          </div>
        </motion.div>

        {/* Affirmation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-[#FFD700]/10 to-[#915EFF]/10 rounded-xl p-8 mb-12 text-center"
        >
          <h3 className="text-xl font-semibold text-white mb-4 font-heading">Your Sacred Affirmation</h3>
          <p className="text-2xl text-[#FFD700] font-semibold italic font-heading">"{archetype.affirmation}"</p>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-center">
          <p className="text-white/70 mb-6 font-body">
            🔗 Want your complete soul map & life purpose reading by a master numerologist?
          </p>
          <div className="text-[#FFD700] font-semibold font-body">www.quizzastrology.com</div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default FullResult
