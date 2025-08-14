"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Calendar, MapPin, Heart } from "lucide-react"

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    countryOfBirth: "",
    cityOfBirth: "",
    datingStatus: "",
  })

  const [errors, setErrors] = useState({})

  const datingOptions = [
    { value: "single", label: "Single", icon: "💫" },
    { value: "seeing-someone", label: "Seeing Someone", icon: "💕" },
    { value: "complicated", label: "It's Complicated", icon: "🌙" },
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.countryOfBirth.trim()) newErrors.countryOfBirth = "Country is required"
    if (!formData.datingStatus) newErrors.datingStatus = "Dating status is required"

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

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
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="inline-block mb-4"
        >
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full flex items-center justify-center text-2xl">
            ♈
          </div>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">What Zodiac Sign Should You Never Date?</h1>
        <p className="text-xl text-white/90">Discover your cosmic dating red flags through astrology & psychology</p>
      </motion.div>

      <motion.div
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <label className="block text-white font-medium mb-2">
                <User className="inline w-4 h-4 mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all ${
                  errors.fullName ? "border-red-400" : "border-white/20"
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <label className="block text-white font-medium mb-2">
                <Mail className="inline w-4 h-4 mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all ${
                  errors.email ? "border-red-400" : "border-white/20"
                }`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <label className="block text-white font-medium mb-2">
              <Calendar className="inline w-4 h-4 mr-2" />
              Date of Birth *
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all ${
                errors.dateOfBirth ? "border-red-400" : "border-white/20"
              }`}
            />
            {errors.dateOfBirth && <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <label className="block text-white font-medium mb-2">
                <MapPin className="inline w-4 h-4 mr-2" />
                Country of Birth *
              </label>
              <input
                type="text"
                value={formData.countryOfBirth}
                onChange={(e) => handleInputChange("countryOfBirth", e.target.value)}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all ${
                  errors.countryOfBirth ? "border-red-400" : "border-white/20"
                }`}
                placeholder="United States"
              />
              {errors.countryOfBirth && <p className="text-red-400 text-sm mt-1">{errors.countryOfBirth}</p>}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <label className="block text-white font-medium mb-2">
                <MapPin className="inline w-4 h-4 mr-2" />
                City of Birth
              </label>
              <input
                type="text"
                value={formData.cityOfBirth}
                onChange={(e) => handleInputChange("cityOfBirth", e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                placeholder="New York (optional)"
              />
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <label className="block text-white font-medium mb-4">
              <Heart className="inline w-4 h-4 mr-2" />
              Current Dating Status *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {datingOptions.map((option, index) => (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => handleInputChange("datingStatus", option.value)}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    formData.datingStatus === option.value
                      ? "border-yellow-400 bg-yellow-400/20 text-white"
                      : "border-white/20 bg-white/5 text-white/80 hover:border-white/40"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className="text-2xl mb-2">{option.icon}</div>
                  <div className="font-medium">{option.label}</div>
                </motion.button>
              ))}
            </div>
            {errors.datingStatus && <p className="text-red-400 text-sm mt-2">{errors.datingStatus}</p>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="pt-4"
          >
            <motion.button
              type="submit"
              className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              Start Your Cosmic Journey ✨
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}

export default UserForm
