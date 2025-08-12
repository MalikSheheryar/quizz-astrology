"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Calendar, MapPin, Globe } from "lucide-react"

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
  })
  const [errors, setErrors] = useState<any>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required"
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

  const inputFields = [
    {
      key: "fullName",
      label: "Full Name",
      type: "text",
      icon: User,
      placeholder: "Enter your complete name",
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      type: "email",
      icon: Mail,
      placeholder: "your@email.com",
      required: true,
    },
    {
      key: "dateOfBirth",
      label: "Date of Birth",
      type: "date",
      icon: Calendar,
      required: true,
    },
    {
      key: "countryOfBirth",
      label: "Country of Birth",
      type: "text",
      icon: Globe,
      placeholder: "Enter your birth country",
      required: true,
    },
    {
      key: "cityOfBirth",
      label: "City of Birth",
      type: "text",
      icon: MapPin,
      placeholder: "Enter your birth city (optional)",
      required: false,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-slate-800/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold text-white">✨</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 font-heading">Begin Your Soul Journey</h2>
          <p className="text-white/70 font-body">Share your cosmic details to unlock your numerological blueprint</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {inputFields.map((field, index) => {
            const Icon = field.icon
            return (
              <motion.div
                key={field.key}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className="space-y-2"
              >
                <label className="block text-white font-medium font-body">
                  {field.label} {field.required && <span className="text-red-400">*</span>}
                </label>
                <div className="relative">
                  <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type={field.type}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 font-body"
                  />
                </div>
                {errors[field.key] && <p className="text-red-400 text-sm font-body">{errors[field.key]}</p>}
              </motion.div>
            )
          })}

          <motion.button
            type="submit"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-red-400 to-orange-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-heading"
          >
            Reveal My Soul Number ✨
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

export default UserForm
