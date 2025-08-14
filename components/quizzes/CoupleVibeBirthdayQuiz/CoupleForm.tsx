"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Calendar, User, Globe } from "lucide-react"
import { cardVariants } from "./utils/motion"

const CoupleForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    yourName: "",
    yourBirthDate: "",
    partnerName: "",
    partnerBirthDate: "",
    country: "",
    relationshipLength: "",
    loveMessage: "",
  })

  const [errors, setErrors] = useState({})

  const relationshipOptions = [
    "Less than 6 months",
    "6 months - 1 year",
    "1-2 years",
    "2-5 years",
    "5+ years",
    "Married",
    "Engaged",
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.yourName.trim()) newErrors.yourName = "Your name is required"
    if (!formData.yourBirthDate) newErrors.yourBirthDate = "Your birth date is required"
    if (!formData.partnerName.trim()) newErrors.partnerName = "Partner's name is required"
    if (!formData.partnerBirthDate) newErrors.partnerBirthDate = "Partner's birth date is required"

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
    <motion.div className="max-w-2xl mx-auto" variants={cardVariants} initial="hidden" animate="visible">
      <div className="bg-[#1F2A38] rounded-3xl p-8 shadow-2xl border border-white/10">
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] rounded-full mb-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="text-white" size={24} />
          </motion.div>
          <h3 className="text-2xl font-heading font-bold text-white mb-2">Tell Us About Your Love Story</h3>
          <p className="text-white/70 font-body">Share your birth details to unlock your cosmic compatibility</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Your Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-heading font-semibold text-[#FFD700] flex items-center">
              <User className="mr-2" size={20} />
              About You
            </h4>

            <div>
              <label className="block text-white font-body mb-2">Your Full Name *</label>
              <input
                type="text"
                name="yourName"
                value={formData.yourName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
              {errors.yourName && <p className="text-red-400 text-sm mt-1">{errors.yourName}</p>}
            </div>

            <div>
              <label className="block text-white font-body mb-2 flex items-center">
                <Calendar className="mr-2" size={16} />
                Your Date of Birth *
              </label>
              <input
                type="date"
                name="yourBirthDate"
                value={formData.yourBirthDate}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all"
              />
              {errors.yourBirthDate && <p className="text-red-400 text-sm mt-1">{errors.yourBirthDate}</p>}
            </div>
          </div>

          {/* Partner Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-heading font-semibold text-[#6EC1E4] flex items-center">
              <Heart className="mr-2" size={20} />
              About Your Partner
            </h4>

            <div>
              <label className="block text-white font-body mb-2">Partner's First Name *</label>
              <input
                type="text"
                name="partnerName"
                value={formData.partnerName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#6EC1E4] focus:border-transparent transition-all"
                placeholder="Enter partner's name"
              />
              {errors.partnerName && <p className="text-red-400 text-sm mt-1">{errors.partnerName}</p>}
            </div>

            <div>
              <label className="block text-white font-body mb-2 flex items-center">
                <Calendar className="mr-2" size={16} />
                Partner's Date of Birth *
              </label>
              <input
                type="date"
                name="partnerBirthDate"
                value={formData.partnerBirthDate}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#6EC1E4] focus:border-transparent transition-all"
              />
              {errors.partnerBirthDate && <p className="text-red-400 text-sm mt-1">{errors.partnerBirthDate}</p>}
            </div>
          </div>

          {/* Optional Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-heading font-semibold text-[#915EFF]">Optional Details</h4>

            <div>
              <label className="block text-white font-body mb-2 flex items-center">
                <Globe className="mr-2" size={16} />
                Country of Birth
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#915EFF] focus:border-transparent transition-all"
                placeholder="Enter country (optional)"
              />
            </div>

            <div>
              <label className="block text-white font-body mb-2">How long have you been together?</label>
              <select
                name="relationshipLength"
                value={formData.relationshipLength}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#915EFF] focus:border-transparent transition-all"
              >
                <option value="" className="bg-[#1F2A38]">
                  Select duration
                </option>
                {relationshipOptions.map((option) => (
                  <option key={option} value={option} className="bg-[#1F2A38]">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-body mb-2">What do you love most about them?</label>
              <textarea
                name="loveMessage"
                value={formData.loveMessage}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#915EFF] focus:border-transparent transition-all resize-none"
                placeholder="Share what makes them special (optional)"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] text-white font-heading font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Begin Your Cosmic Journey ✨
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

export default CoupleForm
