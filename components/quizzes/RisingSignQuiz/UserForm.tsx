"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

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
    if (!formData.email.includes("@")) newErrors.email = "Please enter a valid email"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.countryOfBirth.trim()) newErrors.countryOfBirth = "Country of birth is required"

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
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#915EFF] to-[#FF5F6D] rounded-full mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Discover Your Rising Sign
          </h1>
          <p className="text-white/80 text-sm">Tell us about yourself to unlock your cosmic personality</p>
        </div>

        {/* Form Card */}
        <motion.div
          className="bg-[#1F2A38] rounded-2xl p-6 shadow-2xl border border-white/10"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#915EFF] focus:border-transparent transition-all duration-300"
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#915EFF] focus:border-transparent transition-all duration-300"
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Date of Birth *</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#915EFF] focus:border-transparent transition-all duration-300"
              />
              {errors.dateOfBirth && <p className="text-red-400 text-xs mt-1">{errors.dateOfBirth}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Country of Birth *</label>
              <input
                type="text"
                name="countryOfBirth"
                value={formData.countryOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#915EFF] focus:border-transparent transition-all duration-300"
                placeholder="Enter your country of birth"
              />
              {errors.countryOfBirth && <p className="text-red-400 text-xs mt-1">{errors.countryOfBirth}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">City of Birth (Optional)</label>
              <input
                type="text"
                name="cityOfBirth"
                value={formData.cityOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#915EFF] focus:border-transparent transition-all duration-300"
                placeholder="Enter your city of birth"
              />
            </div>

            <motion.button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Begin Your Cosmic Journey ✨
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default UserForm
