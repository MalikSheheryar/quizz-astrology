"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Calendar, MapPin, Heart } from "lucide-react"

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    country: "",
    city: "",
    mood: "",
    intention: "",
  })

  const [errors, setErrors] = useState({})

  const moods = [
    { emoji: "🌟", label: "Inspired", value: "inspired" },
    { emoji: "🌙", label: "Reflective", value: "reflective" },
    { emoji: "🔥", label: "Passionate", value: "passionate" },
    { emoji: "🌊", label: "Flowing", value: "flowing" },
    { emoji: "🌱", label: "Growing", value: "growing" },
    { emoji: "💎", label: "Focused", value: "focused" },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleMoodSelect = (mood) => {
    setFormData((prev) => ({ ...prev, mood }))
    if (errors.mood) {
      setErrors((prev) => ({ ...prev, mood: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"
    if (!formData.mood) newErrors.mood = "Please select your current mood"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-500/20"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Connect with the Universe</h3>
          <p className="text-purple-200">Share your energy to receive your cosmic guidance</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="flex items-center text-white font-medium mb-2">
              <User className="w-5 h-5 mr-2 text-yellow-400" />
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center text-white font-medium mb-2">
              <Mail className="w-5 h-5 mr-2 text-yellow-400" />
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="flex items-center text-white font-medium mb-2">
              <Calendar className="w-5 h-5 mr-2 text-yellow-400" />
              Date of Birth *
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
            />
            {errors.dateOfBirth && <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
          </div>

          {/* Country & City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-white font-medium mb-2">
                <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
                Country *
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                placeholder="Your country"
              />
              {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country}</p>}
            </div>
            <div>
              <label className="flex items-center text-white font-medium mb-2">
                <MapPin className="w-5 h-5 mr-2 text-purple-400" />
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                placeholder="Your city (optional)"
              />
            </div>
          </div>

          {/* Mood Selection */}
          <div>
            <label className="flex items-center text-white font-medium mb-3">
              <Heart className="w-5 h-5 mr-2 text-yellow-400" />
              Your Mood This Month *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {moods.map((mood) => (
                <motion.button
                  key={mood.value}
                  type="button"
                  onClick={() => handleMoodSelect(mood.value)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.mood === mood.value
                      ? "border-yellow-400 bg-yellow-400/20"
                      : "border-purple-400/30 bg-slate-700/30 hover:border-purple-400/50"
                  }`}
                >
                  <div className="text-2xl mb-1">{mood.emoji}</div>
                  <div className="text-white text-sm">{mood.label}</div>
                </motion.button>
              ))}
            </div>
            {errors.mood && <p className="text-red-400 text-sm mt-1">{errors.mood}</p>}
          </div>

          {/* Intention */}
          <div>
            <label className="text-white font-medium mb-2 block">Your Intention for This Month</label>
            <textarea
              name="intention"
              value={formData.intention}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all resize-none"
              placeholder="What do you hope to manifest or focus on this month? (optional)"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Begin Your Cosmic Journey ✨
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default UserForm
