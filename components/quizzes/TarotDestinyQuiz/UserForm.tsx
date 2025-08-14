"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Calendar, MapPin, MessageCircle } from "lucide-react"

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    countryOfBirth: "",
    cityOfBirth: "",
    question: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.countryOfBirth.trim()) newErrors.countryOfBirth = "Country of birth is required"

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData)
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10">
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full flex items-center justify-center"
          >
            <span className="text-2xl">🔮</span>
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">Connect with the Universe</h2>
          <p className="text-white/70">Share your details to receive a personalized reading</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                <User className="inline w-4 h-4 mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                <Mail className="inline w-4 h-4 mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                <Calendar className="inline w-4 h-4 mr-2" />
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-white/20 rounded-lg text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
              />
              {errors.dateOfBirth && <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                <MapPin className="inline w-4 h-4 mr-2" />
                Country of Birth *
              </label>
              <input
                type="text"
                name="countryOfBirth"
                value={formData.countryOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                placeholder="Enter your country"
              />
              {errors.countryOfBirth && <p className="text-red-400 text-sm mt-1">{errors.countryOfBirth}</p>}
            </div>
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              <MapPin className="inline w-4 h-4 mr-2" />
              City of Birth (Optional)
            </label>
            <input
              type="text"
              name="cityOfBirth"
              value={formData.cityOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
              placeholder="Enter your city"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              <MessageCircle className="inline w-4 h-4 mr-2" />
              Ask the Universe a Question (Optional)
            </label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 bg-slate-700/50 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all resize-none"
              placeholder="What would you like to know about your future?"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Begin My Tarot Reading ✨
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

export default UserForm
