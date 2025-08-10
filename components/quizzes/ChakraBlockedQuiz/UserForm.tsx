"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, Slider, Chip } from "./components"

interface UserFormProps {
  onComplete: (data: any) => void
}

const UserForm: React.FC<UserFormProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    countryOfBirth: "",
    energyLevel: 5,
    primaryFocus: [],
  })

  const focusOptions = [
    { id: "stress", label: "Stress Relief", color: "bg-red-500" },
    { id: "love", label: "Love & Relationships", color: "bg-pink-500" },
    { id: "purpose", label: "Life Purpose", color: "bg-purple-500" },
    { id: "communication", label: "Communication", color: "bg-blue-500" },
    { id: "creativity", label: "Creativity", color: "bg-orange-500" },
    { id: "confidence", label: "Confidence", color: "bg-yellow-500" },
    { id: "stability", label: "Stability", color: "bg-green-500" },
  ]

  const handleFocusToggle = (focusId: string) => {
    setFormData((prev) => ({
      ...prev,
      primaryFocus: prev.primaryFocus.includes(focusId)
        ? prev.primaryFocus.filter((id) => id !== focusId)
        : [...prev.primaryFocus, focusId],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.fullName && formData.email && formData.dateOfBirth && formData.countryOfBirth) {
      onComplete(formData)
    }
  }

  const isValid = formData.fullName && formData.email && formData.dateOfBirth && formData.countryOfBirth

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">What Chakra Is Blocked in You Right Now?</h2>
            <p className="text-white/80 text-lg">
              Discover your energy blocks through deep somatic and emotional insights
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/90 font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] backdrop-blur-sm"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-white/90 font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] backdrop-blur-sm"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/90 font-medium mb-2">Date of Birth *</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] backdrop-blur-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-white/90 font-medium mb-2">Country of Birth *</label>
                <input
                  type="text"
                  value={formData.countryOfBirth}
                  onChange={(e) => setFormData((prev) => ({ ...prev, countryOfBirth: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] backdrop-blur-sm"
                  placeholder="Country name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white/90 font-medium mb-4">Current Energy Level</label>
              <Slider
                value={formData.energyLevel}
                onChange={(value) => setFormData((prev) => ({ ...prev, energyLevel: value }))}
                min={1}
                max={10}
                leftLabel="Depleted"
                rightLabel="Vibrant"
              />
            </div>

            <div>
              <label className="block text-white/90 font-medium mb-4">
                Primary Focus Areas (select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {focusOptions.map((option) => (
                  <Chip
                    key={option.id}
                    label={option.label}
                    selected={formData.primaryFocus.includes(option.id)}
                    onClick={() => handleFocusToggle(option.id)}
                    className={`${option.color} ${
                      formData.primaryFocus.includes(option.id) ? "ring-2 ring-[#FFD700]" : ""
                    }`}
                  />
                ))}
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={!isValid}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
                isValid
                  ? "bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] hover:shadow-lg hover:shadow-[#FF6B6B]/25 transform hover:scale-105"
                  : "bg-gray-500 cursor-not-allowed opacity-50"
              }`}
              whileHover={isValid ? { scale: 1.02 } : {}}
              whileTap={isValid ? { scale: 0.98 } : {}}
            >
              Begin Your Chakra Assessment
            </motion.button>
          </form>
        </motion.div>
      </Card>
    </div>
  )
}

export default UserForm
