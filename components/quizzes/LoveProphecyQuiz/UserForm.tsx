"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Calendar, Clock, MapPin, Heart } from "lucide-react"

interface UserFormProps {
  onSubmit: (data: any) => void
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    timeOfBirth: "",
    countryOfBirth: "",
    cityOfBirth: "",
    relationshipStatus: "",
    recentBreakup: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const relationshipOptions = [
    "Single",
    "Dating",
    "In a relationship",
    "Married",
    "Divorced",
    "Widowed",
    "It's complicated",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.countryOfBirth.trim()) newErrors.countryOfBirth = "Country is required"
    if (!formData.relationshipStatus) newErrors.relationshipStatus = "Please select your status"
    if (!formData.recentBreakup) newErrors.recentBreakup = "Please answer this question"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        className="bg-slate-800 bg-opacity-90 backdrop-blur-lg rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-yellow-400/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="text-yellow-400"
            >
              <Heart size={48} />
            </motion.div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            When Will You Meet Your Next Great Love?
          </h1>
          <p className="text-gray-300 text-lg">
            Let the stars reveal your romantic destiny through personalized astrological insights
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <label className="block text-white font-medium mb-2 flex items-center gap-2">
                <User size={18} className="text-yellow-400" />
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <label className="block text-white font-medium mb-2 flex items-center gap-2">
                <Mail size={18} className="text-yellow-400" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <label className="block text-white font-medium mb-2 flex items-center gap-2">
                <Calendar size={18} className="text-yellow-400" />
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
              />
              {errors.dateOfBirth && <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <label className="block text-white font-medium mb-2 flex items-center gap-2">
                <Clock size={18} className="text-purple-400" />
                Time of Birth (Optional)
              </label>
              <input
                type="time"
                name="timeOfBirth"
                value={formData.timeOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
              />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
              <label className="block text-white font-medium mb-2 flex items-center gap-2">
                <MapPin size={18} className="text-yellow-400" />
                Country of Birth *
              </label>
              <input
                type="text"
                name="countryOfBirth"
                value={formData.countryOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                placeholder="e.g., United States"
              />
              {errors.countryOfBirth && <p className="text-red-400 text-sm mt-1">{errors.countryOfBirth}</p>}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
              <label className="block text-white font-medium mb-2 flex items-center gap-2">
                <MapPin size={18} className="text-purple-400" />
                City of Birth (Optional)
              </label>
              <input
                type="text"
                name="cityOfBirth"
                value={formData.cityOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                placeholder="e.g., New York"
              />
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
            <label className="block text-white font-medium mb-2">Current Relationship Status *</label>
            <select
              name="relationshipStatus"
              value={formData.relationshipStatus}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
            >
              <option value="">Select your status</option>
              {relationshipOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.relationshipStatus && <p className="text-red-400 text-sm mt-1">{errors.relationshipStatus}</p>}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
            <label className="block text-white font-medium mb-3">Have you recently ended a relationship? *</label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="recentBreakup"
                  value="yes"
                  checked={formData.recentBreakup === "yes"}
                  onChange={handleChange}
                  className="mr-2 text-yellow-400 focus:ring-yellow-400"
                />
                <span className="text-white">Yes</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="recentBreakup"
                  value="no"
                  checked={formData.recentBreakup === "no"}
                  onChange={handleChange}
                  className="mr-2 text-yellow-400 focus:ring-yellow-400"
                />
                <span className="text-white">No</span>
              </label>
            </div>
            {errors.recentBreakup && <p className="text-red-400 text-sm mt-1">{errors.recentBreakup}</p>}
          </motion.div>

          <motion.button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Begin Your Love Prophecy ✨
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default UserForm
