"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Star, Sparkles, TrendingUp, Eye, Heart, Zap } from "lucide-react"
import { calculateLifePath, calculateExpression, determineArchetype, getArchetypeDetails } from "./utils"

interface FullResultProps {
  userData: any
  answers: any[]
}

const FullResult: React.FC<FullResultProps> = ({ userData, answers }) => {
  const lifePath = calculateLifePath(userData.dateOfBirth)
  const expression = calculateExpression(userData.fullName)
  const archetype = determineArchetype(answers, lifePath, expression)
  const archetypeDetails = getArchetypeDetails(archetype)

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center bg-slate-800 rounded-full px-6 py-2 mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles className="text-yellow-400 mr-2" size={20} />
          <span className="text-white font-medium">QuizzAstrology.com</span>
        </motion.div>
        <h1 className="text-4xl font-bold text-white mb-2">Your Complete Financial Destiny Blueprint</h1>
        <p className="text-white/70 text-lg">
          Generated for {userData.fullName} • {new Date(userData.dateOfBirth).toLocaleDateString()}
        </p>
      </div>

      {/* Archetype Section */}
      <motion.div
        className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700 mb-8"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
            <span className="text-3xl">{archetypeDetails.emoji}</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">The {archetypeDetails.name}</h2>
            <p className="text-white/70">{archetypeDetails.shortDescription}</p>
          </div>
        </div>
        <p className="text-white/90 text-lg leading-relaxed">{archetypeDetails.fullDescription}</p>
      </motion.div>

      {/* Numerology Numbers */}
      <motion.div
        className="grid md:grid-cols-2 gap-6 mb-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center mb-4">
            <Star className="text-yellow-400 mr-3" size={24} />
            <h3 className="text-xl font-bold text-white">Life Path Number: {lifePath}</h3>
          </div>
          <p className="text-white/80">{archetypeDetails.lifePathMeaning}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center mb-4">
            <Sparkles className="text-emerald-400 mr-3" size={24} />
            <h3 className="text-xl font-bold text-white">Expression Number: {expression}</h3>
          </div>
          <p className="text-white/80">{archetypeDetails.expressionMeaning}</p>
        </div>
      </motion.div>

      {/* Key Insights */}
      <motion.div
        className="grid md:grid-cols-2 gap-6 mb-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center mb-4">
            <TrendingUp className="text-green-400 mr-3" size={24} />
            <h3 className="text-xl font-bold text-white">Natural Money Energy</h3>
          </div>
          <p className="text-white/80 mb-4">{archetypeDetails.moneyEnergy}</p>
          <ul className="space-y-2">
            {archetypeDetails.strengths.map((strength: string, index: number) => (
              <li key={index} className="flex items-center text-white/70">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                {strength}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center mb-4">
            <Eye className="text-red-400 mr-3" size={24} />
            <h3 className="text-xl font-bold text-white">Hidden Financial Blocks</h3>
          </div>
          <p className="text-white/80 mb-4">{archetypeDetails.blocks}</p>
          <ul className="space-y-2">
            {archetypeDetails.blocksList.map((block: string, index: number) => (
              <li key={index} className="flex items-center text-white/70">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                {block}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Career & Activation */}
      <motion.div
        className="grid md:grid-cols-2 gap-6 mb-8"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center mb-4">
            <Heart className="text-pink-400 mr-3" size={24} />
            <h3 className="text-xl font-bold text-white">Wealth-Aligned Career Paths</h3>
          </div>
          <ul className="space-y-2">
            {archetypeDetails.careerPaths.map((career: string, index: number) => (
              <li key={index} className="flex items-center text-white/80">
                <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                {career}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center mb-4">
            <Zap className="text-yellow-400 mr-3" size={24} />
            <h3 className="text-xl font-bold text-white">Money Flow Activation</h3>
          </div>
          <ul className="space-y-2">
            {archetypeDetails.activation.map((step: string, index: number) => (
              <li key={index} className="flex items-center text-white/80">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Financial Forecast */}
      <motion.div
        className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-purple-500/30 mb-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="text-white" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Your Financial Forecast</h3>
          <p className="text-white/90 text-lg leading-relaxed">{archetypeDetails.forecast}</p>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="bg-slate-800 rounded-2xl p-8 border border-slate-700 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <h3 className="text-2xl font-bold text-white mb-4">Ready to Activate Your Financial Destiny?</h3>
        <p className="text-white/80 mb-6 text-lg">
          Get a personalized numerology + money activation reading with a professional numerologist
        </p>
        <div className="text-[#FFD700] font-semibold font-body">www.quizzastrology.com</div>
      </motion.div>
    </motion.div>
  )
}

export default FullResult
