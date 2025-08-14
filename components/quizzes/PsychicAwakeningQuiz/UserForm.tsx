"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Calendar, MapPin, Eye } from "lucide-react"

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    countryOfBirth: "",
    cityOfBirth: "",
    psychicExperience: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.countryOfBirth.trim()) newErrors.countryOfBirth = "Country of birth is required"
    if (!formData.psychicExperience) newErrors.psychicExperience = "Please select an option"

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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-500/30">
        <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-full flex items-center justify-center">
            <Eye className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Begin Your Spiritual Journey</h2>
          <p className="text-purple-200">Tell us about yourself to personalize your clairvoyant assessment</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
              <label className="flex items-center text-white font-medium">
                <User className="w-5 h-5 mr-2 text-yellow-400" />
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white placeholder-purple-300 focus:border-yellow-400 focus:outline-none transition-colors"
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-red-400 text-sm">{errors.fullName}</p>}
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
              <label className="flex items-center text-white font-medium">
                <Mail className="w-5 h-5 mr-2 text-yellow-400" />
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white placeholder-purple-300 focus:border-yellow-400 focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
              <label className="flex items-center text-white font-medium">
                <Calendar className="w-5 h-5 mr-2 text-yellow-400" />
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white focus:border-yellow-400 focus:outline-none transition-colors"
              />
              {errors.dateOfBirth && <p className="text-red-400 text-sm">{errors.dateOfBirth}</p>}
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
              <label className="flex items-center text-white font-medium">
                <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
                Country of Birth *
              </label>
              <input
                type="text"
                name="countryOfBirth"
                value={formData.countryOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white placeholder-purple-300 focus:border-yellow-400 focus:outline-none transition-colors"
                placeholder="Enter your country"
              />
              {errors.countryOfBirth && <p className="text-red-400 text-sm">{errors.countryOfBirth}</p>}
            </motion.div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
            <label className="flex items-center text-white font-medium">
              <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
              City of Birth (Optional)
            </label>
            <input
              type="text"
              name="cityOfBirth"
              value={formData.cityOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white placeholder-purple-300 focus:border-yellow-400 focus:outline-none transition-colors"
              placeholder="Enter your city"
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="space-y-4">
            <label className="text-white font-medium text-lg">Have you ever had a psychic experience? *</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Yes", "No", "Not Sure"].map((option) => (
                <motion.label
                  key={option}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.psychicExperience === option
                      ? "border-yellow-400 bg-yellow-400/20 text-yellow-300"
                      : "border-purple-400/30 bg-slate-700/30 text-white hover:border-purple-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="psychicExperience"
                    value={option}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="font-medium">{option}</span>
                </motion.label>
              ))}
            </div>
            {errors.psychicExperience && <p className="text-red-400 text-sm">{errors.psychicExperience}</p>}
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Begin Clairvoyant Assessment
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

export default UserForm
