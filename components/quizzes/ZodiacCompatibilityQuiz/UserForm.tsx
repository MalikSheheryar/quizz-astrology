"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Calendar, Globe, MapPin } from "lucide-react"

interface UserFormProps {
  onNext: (data: any) => void
}

const UserForm: React.FC<UserFormProps> = ({ onNext }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    countryOfBirth: "",
    cityOfBirth: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.countryOfBirth.trim()) newErrors.countryOfBirth = "Country is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onNext(formData)
    }
  }

  const inputFields = [
    { name: "fullName", label: "Full Name", icon: User, type: "text", required: true },
    { name: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { name: "dateOfBirth", label: "Date of Birth", icon: Calendar, type: "date", required: true },
    { name: "countryOfBirth", label: "Country of Birth", icon: Globe, type: "text", required: true },
    { name: "cityOfBirth", label: "City of Birth", icon: MapPin, type: "text", required: false },
  ]

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-800 p-8 rounded-3xl shadow-2xl max-w-md w-full border border-purple-500/20"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white text-center mb-8"
        >
          Tell Us About Yourself
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {inputFields.map((field, index) => {
            const Icon = field.icon
            return (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <label className="block text-white mb-2 font-medium">
                  {field.label} {field.required && <span className="text-red-400">*</span>}
                </label>
                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                  />
                </div>
                {errors[field.name] && <p className="text-red-400 text-sm mt-1">{errors[field.name]}</p>}
              </motion.div>
            )
          })}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Cosmic Journey ✨
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default UserForm
