"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Moon, Sun } from "lucide-react"

interface UserFormProps {
  onSubmit: (data: any) => void
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    countryOfBirth: "",
    cityOfBirth: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="backdrop-blur-md bg-slate-900/65 rounded-3xl p-8 shadow-2xl border border-slate-700/50 max-w-md w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <motion.div
            className="flex justify-center items-center gap-2 mb-4"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Star className="text-yellow-400 w-8 h-8" />
            <Moon className="text-purple-400 w-10 h-10" />
            <Sun className="text-yellow-400 w-8 h-8" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">What Is Your Intuition Score?</h1>
          <p className="text-slate-300 text-lg">Discover your mystical connection to inner wisdom</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 text-white placeholder-slate-400 focus:border-yellow-400 focus:outline-none transition-colors"
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 text-white placeholder-slate-400 focus:border-yellow-400 focus:outline-none transition-colors"
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Date of Birth *</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 text-white focus:border-yellow-400 focus:outline-none transition-colors"
            />
            {errors.dateOfBirth && <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Country of Birth *</label>
            <input
              type="text"
              name="countryOfBirth"
              value={formData.countryOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 text-white placeholder-slate-400 focus:border-yellow-400 focus:outline-none transition-colors"
              placeholder="Enter your country of birth"
            />
            {errors.countryOfBirth && <p className="text-red-400 text-sm mt-1">{errors.countryOfBirth}</p>}
          </div>

          <div>
            <label className="block text-white font-medium mb-2">City of Birth (Optional)</label>
            <input
              type="text"
              name="cityOfBirth"
              value={formData.cityOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 text-white placeholder-slate-400 focus:border-yellow-400 focus:outline-none transition-colors"
              placeholder="Enter your city of birth"
            />
          </div>

          <motion.button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Begin Your Intuition Journey
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default UserForm
