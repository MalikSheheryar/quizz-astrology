"use client"
import { useState } from "react"
import type React from "react"

import { motion } from "framer-motion"
import { Heart, Star, Flame } from "lucide-react"

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
    partnerName: "",
    relationshipDuration: "",
  })

  const [errors, setErrors] = useState<any>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onNext(formData)
    }
  }

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } },
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-slate-800 bg-opacity-90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-500/20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center items-center space-x-4 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Star className="text-purple-400 w-8 h-8" />
            </motion.div>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <Heart className="text-pink-400 w-10 h-10" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Flame className="text-orange-400 w-8 h-8" />
            </motion.div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Is Your Partner Your Twin Flame or a Karmic Lesson?
          </h2>
          <p className="text-gray-300 text-lg">Discover the spiritual truth about your connection</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={inputVariants} whileFocus="focus" className="space-y-2">
            <label className="block text-white font-medium">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-red-400 text-sm">{errors.fullName}</p>}
          </motion.div>

          <motion.div variants={inputVariants} whileFocus="focus" className="space-y-2">
            <label className="block text-white font-medium">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
              placeholder="Enter your email address"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
          </motion.div>

          <motion.div variants={inputVariants} whileFocus="focus" className="space-y-2">
            <label className="block text-white font-medium">Date of Birth *</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
            />
            {errors.dateOfBirth && <p className="text-red-400 text-sm">{errors.dateOfBirth}</p>}
          </motion.div>

          <motion.div variants={inputVariants} whileFocus="focus" className="space-y-2">
            <label className="block text-white font-medium">Country of Birth *</label>
            <input
              type="text"
              name="countryOfBirth"
              value={formData.countryOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
              placeholder="Enter your country of birth"
            />
            {errors.countryOfBirth && <p className="text-red-400 text-sm">{errors.countryOfBirth}</p>}
          </motion.div>

          <motion.div variants={inputVariants} whileFocus="focus" className="space-y-2">
            <label className="block text-white font-medium">City of Birth</label>
            <input
              type="text"
              name="cityOfBirth"
              value={formData.cityOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
              placeholder="Enter your city of birth (optional)"
            />
          </motion.div>

          <motion.div variants={inputVariants} whileFocus="focus" className="space-y-2">
            <label className="block text-white font-medium">Partner's First Name</label>
            <input
              type="text"
              name="partnerName"
              value={formData.partnerName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
              placeholder="Enter your partner's first name (optional)"
            />
          </motion.div>

          <motion.div variants={inputVariants} whileFocus="focus" className="space-y-2">
            <label className="block text-white font-medium">Relationship Duration</label>
            <select
              name="relationshipDuration"
              value={formData.relationshipDuration}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
            >
              <option value="">Select duration (optional)</option>
              <option value="less-than-6-months">Less than 6 months</option>
              <option value="6-months-to-1-year">6 months to 1 year</option>
              <option value="1-to-3-years">1 to 3 years</option>
              <option value="3-to-5-years">3 to 5 years</option>
              <option value="more-than-5-years">More than 5 years</option>
            </select>
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Begin Your Soul Journey
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default UserForm
