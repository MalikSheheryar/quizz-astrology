"use client"
import { useState } from "react"
import type React from "react"

import { motion } from "framer-motion"
import { Heart, Star, Sparkles } from "lucide-react"

interface UserFormProps {
  onNext: (data: any) => void
}

const UserForm = ({ onNext }: UserFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    countryOfBirth: "",
    cityOfBirth: "",
  })

  const [errors, setErrors] = useState<any>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: any = {}
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.email.includes("@")) newErrors.email = "Please enter a valid email"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.countryOfBirth.trim()) newErrors.countryOfBirth = "Country of birth is required"
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length === 0) {
      onNext(formData)
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-slate-800 bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-500/20"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center gap-3 mb-4"
          >
            <Heart className="text-pink-400 w-8 h-8" />
            <Star className="text-yellow-400 w-6 h-6" />
            <Sparkles className="text-purple-400 w-7 h-7" />
          </motion.div>

          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 bg-clip-text text-transparent mb-3"
          >
            Which Zodiac Sign Is Your Ideal Soulmate?
          </motion.h1>

          <motion.p
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 text-lg"
          >
            Discover your cosmic connection through the stars ✨
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
            <label className="block text-white font-medium mb-2">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
          </motion.div>

          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
            <label className="block text-white font-medium mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </motion.div>

          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
            <label className="block text-white font-medium mb-2">Date of Birth *</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
            />
            {errors.dateOfBirth && <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
          </motion.div>

          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
            <label className="block text-white font-medium mb-2">Country of Birth *</label>
            <input
              type="text"
              name="countryOfBirth"
              value={formData.countryOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              placeholder="Enter your country of birth"
            />
            {errors.countryOfBirth && <p className="text-red-400 text-sm mt-1">{errors.countryOfBirth}</p>}
          </motion.div>

          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.9 }}>
            <label className="block text-white font-medium mb-2">City of Birth (Optional)</label>
            <input
              type="text"
              name="cityOfBirth"
              value={formData.cityOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              placeholder="Enter your city of birth"
            />
          </motion.div>

          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform"
          >
            Begin Your Cosmic Journey 🌟
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default UserForm
