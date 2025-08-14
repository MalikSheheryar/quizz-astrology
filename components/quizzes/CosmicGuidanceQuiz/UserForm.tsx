"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Calendar, Globe, Zap, Heart } from "lucide-react"

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    countryOfBirth: "",
    energyLevel: 5,
    guidance: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = "Your sacred name is required"
    if (!formData.email.trim()) newErrors.email = "Your cosmic connection email is needed"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Your birth date reveals your cosmic blueprint"
    if (!formData.countryOfBirth.trim()) newErrors.countryOfBirth = "Your earthly origin grounds your energy"

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
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full flex items-center justify-center">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Sacred Connection</h2>
          <p className="text-white/70">Share your essence so the Universe can speak directly to your soul</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <label className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              placeholder="Your sacred name"
            />
            {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
          </motion.div>

          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <label className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              placeholder="your.cosmic@email.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </motion.div>

          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
            <label className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date of Birth *
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
            />
            {errors.dateOfBirth && <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
          </motion.div>

          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
            <label className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Country of Birth *
            </label>
            <input
              type="text"
              value={formData.countryOfBirth}
              onChange={(e) => handleChange("countryOfBirth", e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              placeholder="Your earthly origin"
            />
            {errors.countryOfBirth && <p className="text-red-400 text-sm mt-1">{errors.countryOfBirth}</p>}
          </motion.div>

          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
            <label className="block text-white/90 text-sm font-medium mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Current Energy Level: {formData.energyLevel}/10
            </label>
            <div className="relative">
              <input
                type="range"
                min="1"
                max="10"
                value={formData.energyLevel}
                onChange={(e) => handleChange("energyLevel", Number.parseInt(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-white/60 mt-2">
                <span>Calm</span>
                <span>Intense</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
            <label className="block text-white/90 text-sm font-medium mb-2">
              Are you seeking guidance in any area right now? (Optional)
            </label>
            <textarea
              value={formData.guidance}
              onChange={(e) => handleChange("guidance", e.target.value)}
              rows="3"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none"
              placeholder="Share what's on your heart..."
            />
          </motion.div>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
          >
            Begin My Cosmic Journey ✨
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

export default UserForm
