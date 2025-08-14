"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Calendar, Heart } from "lucide-react"

const CoupleForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    userName: "",
    userBirthdate: "",
    partnerName: "",
    partnerBirthdate: "",
    relationshipLength: "",
    relationshipStatus: "",
  })

  const [errors, setErrors] = useState({})

  const relationshipLengths = ["Less than 6 months", "6 months - 1 year", "1-2 years", "2-5 years", "5+ years"]

  const relationshipStatuses = [
    "Dating",
    "In a relationship",
    "Engaged",
    "Married",
    "Long-distance",
    "It's complicated",
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.userName.trim()) newErrors.userName = "Your name is required"
    if (!formData.userBirthdate) newErrors.userBirthdate = "Your birthdate is required"
    if (!formData.partnerName.trim()) newErrors.partnerName = "Partner's name is required"
    if (!formData.partnerBirthdate) newErrors.partnerBirthdate = "Partner's birthdate is required"
    if (!formData.relationshipLength) newErrors.relationshipLength = "Please select relationship length"
    if (!formData.relationshipStatus) newErrors.relationshipStatus = "Please select relationship status"

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
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="bg-slate-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/10"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <motion.div
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Users className="text-pink-400" size={28} />
            <h2 className="text-3xl font-bold text-white">Tell Us About Your Love Story</h2>
          </motion.div>
          <p className="text-white/80">We need your birth details to calculate your cosmic compatibility</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Your Information */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-pink-300 flex items-center gap-2">
              <Heart size={20} /> About You
            </h3>

            <div>
              <label className="block text-white/90 font-medium mb-2">Your Full Name *</label>
              <input
                type="text"
                value={formData.userName}
                onChange={(e) => handleInputChange("userName", e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all"
                placeholder="Enter your full name"
              />
              {errors.userName && <p className="text-red-400 text-sm mt-1">{errors.userName}</p>}
            </div>

            <div>
              <label className="block text-white/90 font-medium mb-2">Your Date of Birth *</label>
              <input
                type="date"
                value={formData.userBirthdate}
                onChange={(e) => handleInputChange("userBirthdate", e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-white/20 rounded-xl text-white focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all"
              />
              {errors.userBirthdate && <p className="text-red-400 text-sm mt-1">{errors.userBirthdate}</p>}
            </div>
          </motion.div>

          {/* Partner Information */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-blue-300 flex items-center gap-2">
              <Calendar size={20} /> About Your Partner
            </h3>

            <div>
              <label className="block text-white/90 font-medium mb-2">Partner's First Name *</label>
              <input
                type="text"
                value={formData.partnerName}
                onChange={(e) => handleInputChange("partnerName", e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                placeholder="Enter partner's name"
              />
              {errors.partnerName && <p className="text-red-400 text-sm mt-1">{errors.partnerName}</p>}
            </div>

            <div>
              <label className="block text-white/90 font-medium mb-2">Partner's Date of Birth *</label>
              <input
                type="date"
                value={formData.partnerBirthdate}
                onChange={(e) => handleInputChange("partnerBirthdate", e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-white/20 rounded-xl text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
              />
              {errors.partnerBirthdate && <p className="text-red-400 text-sm mt-1">{errors.partnerBirthdate}</p>}
            </div>
          </motion.div>

          {/* Relationship Details */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-xl font-semibold text-yellow-300">Your Relationship</h3>

            <div>
              <label className="block text-white/90 font-medium mb-2">How long have you been together? *</label>
              <select
                value={formData.relationshipLength}
                onChange={(e) => handleInputChange("relationshipLength", e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-white/20 rounded-xl text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
              >
                <option value="">Select duration</option>
                {relationshipLengths.map((length) => (
                  <option key={length} value={length}>
                    {length}
                  </option>
                ))}
              </select>
              {errors.relationshipLength && <p className="text-red-400 text-sm mt-1">{errors.relationshipLength}</p>}
            </div>

            <div>
              <label className="block text-white/90 font-medium mb-2">
                What best describes your current relationship? *
              </label>
              <select
                value={formData.relationshipStatus}
                onChange={(e) => handleInputChange("relationshipStatus", e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-white/20 rounded-xl text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
              >
                <option value="">Select status</option>
                {relationshipStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {errors.relationshipStatus && <p className="text-red-400 text-sm mt-1">{errors.relationshipStatus}</p>}
            </div>
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold py-4 px-8 rounded-xl hover:from-pink-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            Begin Your Cosmic Journey ✨
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default CoupleForm
