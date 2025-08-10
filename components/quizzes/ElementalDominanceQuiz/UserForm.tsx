'use client'
import type React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Calendar, Globe, MapPin } from 'lucide-react'
// import { fadeIn } from "../../shared/utils/motion"

// TEMPORARY: Define fadeIn locally to avoid import issues
const fadeIn = (direction: string, delay: number) => ({
  initial: {
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    opacity: 0,
  },
  animate: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: delay,
      ease: 'easeOut',
    },
  },
})

interface UserFormProps {
  onSubmit: (data: any) => void
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  console.log('🔍 UserForm component rendered')
  console.log('🔧 onSubmit prop received:', typeof onSubmit, !!onSubmit)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    country: '',
    city: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.email.includes('@'))
      newErrors.email = 'Valid email is required'
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = 'Date of birth is required'
    if (!formData.country.trim()) newErrors.country = 'Country is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('📝 Form submitted with data:', formData)
    console.log('🔧 About to call onSubmit, type:', typeof onSubmit)

    if (!onSubmit) {
      console.error('❌ ERROR: onSubmit prop is missing!')
      alert('Error: onSubmit function not provided')
      return
    }

    if (validateForm()) {
      console.log('✅ Form validation passed, calling onSubmit')
      try {
        onSubmit(formData)
        console.log('✅ onSubmit called successfully')
      } catch (error) {
        console.error('❌ Error calling onSubmit:', error)
      }
    } else {
      console.log('❌ Form validation failed:', errors)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        {...fadeIn('up', 0.2)}
        className="w-full max-w-md bg-[#1F2A38] rounded-3xl p-8 shadow-2xl border border-white/10"
      >
        <div className="text-center mb-8">
          <motion.div {...fadeIn('down', 0.3)} className="text-6xl mb-4">
            🔮
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Discover Your Element
          </h1>
          <p className="text-white/70">
            What Element Is Dominant in Your Chart?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#915EFF] transition-all"
              />
            </div>
            {errors.fullName && (
              <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#915EFF] transition-all"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#915EFF] transition-all"
              />
            </div>
            {errors.dateOfBirth && (
              <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                name="country"
                placeholder="Country of Birth *"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#915EFF] transition-all"
              />
            </div>
            {errors.country && (
              <p className="text-red-400 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                name="city"
                placeholder="City of Birth (Optional)"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#915EFF] transition-all"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FFA726] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Begin Your Journey ✨
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default UserForm
