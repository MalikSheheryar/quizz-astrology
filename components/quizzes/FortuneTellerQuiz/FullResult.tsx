"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SnowflakeIcon as Crystal, Download, Share2, Sparkles } from "lucide-react"

export default function FullResult({ userData, results }) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (results?.fullAnalysis) {
      let index = 0
      const text = results.fullAnalysis
      const timer = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1))
          index++
        } else {
          setIsTyping(false)
          clearInterval(timer)
        }
      }, 30)

      return () => clearInterval(timer)
    }
  }, [results])

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([results.fullAnalysis], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${userData?.name || "Your"}_Fortune_Reading.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Fortune Teller Reading",
          text: "I just received an amazing fortune reading! Check out QuizzAstrology for your own mystical insights.",
          url: window.location.origin,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    }
  }

  return (
    <div className="min-h-screen p-4 py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block mb-6">
            <Crystal className="w-24 h-24 text-purple-400 mx-auto" />
            <motion.div
              className="absolute -inset-8 bg-purple-400/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Your Complete Fortune Reading
          </h1>

          <p className="text-purple-200 text-lg">The mystical energies have revealed your destiny, {userData?.name}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 shadow-2xl mb-8"
        >
          <div className="prose prose-invert max-w-none">
            <div className="text-white text-lg leading-relaxed whitespace-pre-line">
              {displayedText}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className="text-purple-400"
                >
                  |
                </motion.span>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Reading
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:from-pink-700 hover:to-rose-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share Experience
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/premium")}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            More Premium Readings
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
