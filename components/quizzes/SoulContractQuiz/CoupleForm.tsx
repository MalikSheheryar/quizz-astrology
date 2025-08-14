"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Calendar, MapPin, Heart } from "lucide-react"

const CoupleForm = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    userName: "",
    userBirth: "",
    partnerName: "",
    partnerBirth: "",
    location: "",
    pastLifeFeeling: "",
    intenseMoment: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.userName && formData.userBirth && formData.partnerName && formData.partnerBirth) {
      onComplete(formData)
    }
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-slate-800 bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-yellow-300/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Sacred Connection Details</h3>
          <p className="text-gray-300">Share your soul information to begin this mystical journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-yellow-300 font-semibold mb-2">Your Full Name *</label>
              <input
                type="text"
                value={formData.userName}
                onChange={(e) => handleChange("userName", e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-xl border border-purple-400/30 focus:border-yellow-300 focus:outline-none transition-colors"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="block text-yellow-300 font-semibold mb-2">Your Birth Date *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.userBirth}
                  onChange={(e) => handleChange("userBirth", e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-700 text-white rounded-xl border border-purple-400/30 focus:border-yellow-300 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* Partner Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-yellow-300 font-semibold mb-2">Partner's First Name *</label>
              <input
                type="text"
                value={formData.partnerName}
                onChange={(e) => handleChange("partnerName", e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-xl border border-purple-400/30 focus:border-yellow-300 focus:outline-none transition-colors"
                placeholder="Partner's first name"
                required
              />
            </div>
            <div>
              <label className="block text-yellow-300 font-semibold mb-2">Partner's Birth Date *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.partnerBirth}
                  onChange={(e) => handleChange("partnerBirth", e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-700 text-white rounded-xl border border-purple-400/30 focus:border-yellow-300 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* Optional Fields */}
          <div>
            <label className="block text-yellow-300 font-semibold mb-2">Birth Location (Optional)</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-700 text-white rounded-xl border border-purple-400/30 focus:border-yellow-300 focus:outline-none transition-colors"
                placeholder="City, Country"
              />
            </div>
          </div>

          <div>
            <label className="block text-yellow-300 font-semibold mb-2">
              Have you ever felt like you've known this person in another lifetime?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["Yes", "No", "Unsure"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleChange("pastLifeFeeling", option)}
                  className={`py-3 px-4 rounded-xl border transition-all ${
                    formData.pastLifeFeeling === option
                      ? "bg-gradient-to-r from-pink-500 to-orange-400 border-yellow-300 text-white"
                      : "bg-slate-700 border-purple-400/30 text-gray-300 hover:border-yellow-300/50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-yellow-300 font-semibold mb-2">
              What's the most intense moment you've shared together? (Optional)
            </label>
            <textarea
              value={formData.intenseMoment}
              onChange={(e) => handleChange("intenseMoment", e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-xl border border-purple-400/30 focus:border-yellow-300 focus:outline-none transition-colors h-24 resize-none"
              placeholder="Describe a moment that felt deeply connected or transformative..."
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Heart className="w-5 h-5" />
            <span>Begin Sacred Journey</span>
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

export default CoupleForm
