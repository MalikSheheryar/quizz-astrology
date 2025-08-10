"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Calendar, Globe, MapPin } from "lucide-react"

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.fullName && formData.email && formData.dateOfBirth && formData.countryOfBirth) {
      onSubmit(formData)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-[#1F2A38] rounded-3xl p-8 shadow-2xl border border-[#915EFF]/30 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Cosmic Quiz
          </motion.h1>
          <p className="text-[#915EFF] text-lg font-medium">What Planet Influences Your Decisions?</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <User className="absolute left-3 top-3 text-[#915EFF] w-5 h-5" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full bg-[#2A3441] text-white pl-12 pr-4 py-3 rounded-xl border border-[#915EFF]/20 focus:border-[#915EFF] focus:outline-none transition-colors"
            />
          </motion.div>

          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <Mail className="absolute left-3 top-3 text-[#915EFF] w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full bg-[#2A3441] text-white pl-12 pr-4 py-3 rounded-xl border border-[#915EFF]/20 focus:border-[#915EFF] focus:outline-none transition-colors"
            />
          </motion.div>

          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <Calendar className="absolute left-3 top-3 text-[#915EFF] w-5 h-5" />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
              className="w-full bg-[#2A3441] text-white pl-12 pr-4 py-3 rounded-xl border border-[#915EFF]/20 focus:border-[#915EFF] focus:outline-none transition-colors"
            />
          </motion.div>

          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <Globe className="absolute left-3 top-3 text-[#915EFF] w-5 h-5" />
            <input
              type="text"
              name="countryOfBirth"
              placeholder="Country of Birth *"
              value={formData.countryOfBirth}
              onChange={handleInputChange}
              required
              className="w-full bg-[#2A3441] text-white pl-12 pr-4 py-3 rounded-xl border border-[#915EFF]/20 focus:border-[#915EFF] focus:outline-none transition-colors"
            />
          </motion.div>

          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="relative"
          >
            <MapPin className="absolute left-3 top-3 text-[#915EFF] w-5 h-5" />
            <input
              type="text"
              name="cityOfBirth"
              placeholder="City of Birth (Optional)"
              value={formData.cityOfBirth}
              onChange={handleInputChange}
              className="w-full bg-[#2A3441] text-white pl-12 pr-4 py-3 rounded-xl border border-[#915EFF]/20 focus:border-[#915EFF] focus:outline-none transition-colors"
            />
          </motion.div>

          <motion.button
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Begin Cosmic Journey ✨
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default UserForm
