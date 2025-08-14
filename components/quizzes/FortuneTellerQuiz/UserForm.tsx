"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { SnowflakeIcon as Crystal, Sparkles } from "lucide-react"

export default function UserForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    question: "",
    email: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full"
      >
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 shadow-2xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
            className="text-center mb-8"
          >
            <div className="relative inline-block">
              <Crystal className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <motion.div
                className="absolute -inset-4 bg-purple-400/30 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
              Fortune Teller Reading
            </h1>
            <p className="text-purple-200">The crystal ball awaits your energy...</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <label className="block text-purple-200 mb-2 font-medium">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-purple-400/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                placeholder="Enter your mystical name..."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <label className="block text-purple-200 mb-2 font-medium">Birth Date</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-purple-400/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <label className="block text-purple-200 mb-2 font-medium">Your Burning Question</label>
              <textarea
                name="question"
                value={formData.question}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-purple-400/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 resize-none"
                placeholder="What does your soul seek to know?"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <label className="block text-purple-200 mb-2 font-medium">Email (for your reading)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-purple-400/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                placeholder="your@email.com"
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(168, 85, 247, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Begin Fortune Reading
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
