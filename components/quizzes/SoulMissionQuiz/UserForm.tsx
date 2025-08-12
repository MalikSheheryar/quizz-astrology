"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "./components"
import { User, Mail, Calendar, MapPin, Clock, Globe } from "lucide-react"

interface UserFormProps {
  onSubmit: (data: any) => void
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    birthDate: "",
    country: "",
    city: "",
    birthTime: "",
  })

  const [errors, setErrors] = useState<any>({})

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required"
    if (!formData.birthDate) newErrors.birthDate = "Birth date is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }))
    }
  }

  const inputFields = [
    { key: "fullName", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "birthDate", label: "Date of Birth", icon: Calendar, type: "date", required: true },
    { key: "country", label: "Country of Birth", icon: Globe, type: "text", required: true },
    { key: "city", label: "City of Birth", icon: MapPin, type: "text", required: false },
    { key: "birthTime", label: "Time of Birth", icon: Clock, type: "time", required: false },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-[#1F2A38] rounded-2xl p-8 shadow-2xl border border-white/10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-4 font-heading">Begin Your Soul Journey</h2>
          <p className="text-white/70 font-body">Share your cosmic details to unlock your divine life mission</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {inputFields.map((field, index) => {
            const Icon = field.icon
            return (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="space-y-2"
              >
                <label className="flex items-center text-white font-medium font-body">
                  <Icon className="w-5 h-5 mr-2 text-[#FFD700]" />
                  {field.label}
                  {field.required && <span className="text-[#FF6B6B] ml-1">*</span>}
                </label>
                <input
                  type={field.type}
                  value={formData[field.key as keyof typeof formData]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all duration-300 font-body ${
                    errors[field.key] ? "border-[#FF6B6B]" : "border-white/20"
                  }`}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
                {errors[field.key] && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[#FF6B6B] text-sm font-body"
                  >
                    {errors[field.key]}
                  </motion.p>
                )}
              </motion.div>
            )
          })}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="pt-6">
            <Button type="submit" className="w-full">
              Reveal My Life Mission
            </Button>
          </motion.div>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-white/50 text-sm mt-6 font-body"
        >
          Your information is sacred and will be used only for your reading
        </motion.p>
      </div>
    </motion.div>
  )
}

export default UserForm
