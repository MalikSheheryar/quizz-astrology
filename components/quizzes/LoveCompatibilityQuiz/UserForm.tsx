"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Star, Sparkles } from "lucide-react"

interface UserFormProps {
  onComplete: (data: any) => void
}

const UserForm: React.FC<UserFormProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    countryOfBirth: "",
    cityOfBirth: "",
    crushName: "",
    knownDuration: "",
    everDated: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.countryOfBirth.trim()) newErrors.countryOfBirth = "Country is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onComplete(formData)
    }
  }

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: "0 0 20px rgba(255, 107, 107, 0.3)" },
    blur: { scale: 1, boxShadow: "0 0 0px rgba(255, 107, 107, 0)" },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-slate-800/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10"
    >
      <div className="text-center mb-8">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full mb-4"
        >
          <Heart className="w-8 h-8 text-white" />
        </motion.div>

        <h1 className="text-4xl font-bold text-white mb-2">Your Love Compatibility Score</h1>
        <p className="text-white/80 text-lg">with Your Crush ✨</p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="text-white/70">Discover your cosmic connection</span>
          <Sparkles className="w-5 h-5 text-purple-400" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={inputVariants} whileFocus="focus" className="space-y-2">
            <label className="text-white font-medium">Full Name *</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400 transition-all duration-300"
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-red-400 text-sm">{errors.fullName}</p>}
          </motion.div>

          <motion.div variants={inputVariants} whileFocus="focus" className="space-y-2">
            <label className="text-white font-medium">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400 transition-all duration-300"
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={inputVariants} whileFocus="focus" className="space-y-2">
            <label className="text-white font-medium">Date of Birth *</label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-pink-400 transition-all duration-300"
            />
            {errors.dateOfBirth && <p className="text-red-400 text-sm">{errors.dateOfBirth}</p>}
          </motion.div>

          <motion.div variants={inputVariants} whileFocus="focus" className="space-y-2">
            <label className="text-white font-medium">Country of Birth *</label>
            <input
              type="text"
              value={formData.countryOfBirth}
              onChange={(e) => handleInputChange("countryOfBirth", e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400 transition-all duration-300"
              placeholder="United States"
            />
            {errors.countryOfBirth && <p className="text-red-400 text-sm">{errors.countryOfBirth}</p>}
          </motion.div>
        </div>

        <motion.div variants={inputVariants} whileFocus="focus" className="space-y-2">
          <label className="text-white font-medium">City of Birth (Optional)</label>
          <input
            type="text"
            value={formData.cityOfBirth}
            onChange={(e) => handleInputChange("cityOfBirth", e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400 transition-all duration-300"
            placeholder="New York"
          />
        </motion.div>

        <motion.div variants={inputVariants} whileFocus="focus" className="space-y-2">
          <label className="text-white font-medium">Crush's First Name (Optional but encouraged)</label>
          <input
            type="text"
            value={formData.crushName}
            onChange={(e) => handleInputChange("crushName", e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400 transition-all duration-300"
            placeholder="Their first name"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-white font-medium">How long have you known your crush?</label>
            <select
              value={formData.knownDuration}
              onChange={(e) => handleInputChange("knownDuration", e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-pink-400 transition-all duration-300"
            >
              <option value="" className="bg-slate-800">
                Select duration
              </option>
              <option value="less-than-month" className="bg-slate-800">
                Less than a month
              </option>
              <option value="1-6-months" className="bg-slate-800">
                1-6 months
              </option>
              <option value="6-months-1-year" className="bg-slate-800">
                6 months - 1 year
              </option>
              <option value="1-2-years" className="bg-slate-800">
                1-2 years
              </option>
              <option value="more-than-2-years" className="bg-slate-800">
                More than 2 years
              </option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-white font-medium">Have you ever dated them?</label>
            <select
              value={formData.everDated}
              onChange={(e) => handleInputChange("everDated", e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-pink-400 transition-all duration-300"
            >
              <option value="" className="bg-slate-800">
                Select answer
              </option>
              <option value="yes" className="bg-slate-800">
                Yes
              </option>
              <option value="no" className="bg-slate-800">
                No
              </option>
              <option value="complicated" className="bg-slate-800">
                It's complicated
              </option>
            </select>
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Start Your Love Journey
          <Heart className="w-5 h-5" />
        </motion.button>
      </form>
    </motion.div>
  )
}

export default UserForm
