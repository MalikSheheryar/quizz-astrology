"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function MoonPhase({ onPhaseSelect, questionNumber }) {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [isEclipsing, setIsEclipsing] = useState(false)

  const phases = ["new", "waxing", "full", "waning", "eclipse"]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhase((prev) => {
        if (prev < phases.length - 2) {
          return prev + 1
        } else {
          setIsEclipsing(true)
          setTimeout(() => {
            onPhaseSelect()
          }, 3000)
          return prev
        }
      })
    }, 1500)

    return () => clearInterval(timer)
  }, [onPhaseSelect])

  const getMoonStyle = (phase) => {
    switch (phase) {
      case "new":
        return "bg-gray-800 border-gray-600"
      case "waxing":
        return "bg-gradient-to-r from-gray-800 via-gray-300 to-white border-gray-400"
      case "full":
        return "bg-white border-gray-200"
      case "waning":
        return "bg-gradient-to-r from-white via-gray-300 to-gray-800 border-gray-400"
      case "eclipse":
        return "bg-gradient-to-br from-red-900 via-orange-800 to-black border-red-600"
      default:
        return "bg-gray-800 border-gray-600"
    }
  }

  return (
    <div className="relative">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="relative"
      >
        {/* Moon */}
        <motion.div
          className={`w-64 h-64 mx-auto rounded-full border-4 ${getMoonStyle(phases[currentPhase])} shadow-2xl relative overflow-hidden`}
          animate={{
            boxShadow: isEclipsing
              ? [
                  "0 0 50px rgba(239, 68, 68, 0.5)",
                  "0 0 100px rgba(239, 68, 68, 0.8)",
                  "0 0 50px rgba(239, 68, 68, 0.5)",
                ]
              : [
                  "0 0 30px rgba(255, 255, 255, 0.3)",
                  "0 0 60px rgba(255, 255, 255, 0.5)",
                  "0 0 30px rgba(255, 255, 255, 0.3)",
                ],
          }}
          transition={{
            boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
          }}
        >
          {/* Eclipse Shadow Effect */}
          {isEclipsing && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-black/80 to-transparent"
            />
          )}

          {/* Moon Craters */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-gray-600 rounded-full opacity-30" />
            <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-gray-700 rounded-full opacity-20" />
            <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-gray-500 rounded-full opacity-40" />
          </div>
        </motion.div>

        {/* Eclipse Glow */}
        {isEclipsing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-orange-500/30 to-yellow-500/20 rounded-full blur-3xl"
          />
        )}
      </motion.div>

      {/* Phase Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center mt-8"
      >
        <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
          {isEclipsing
            ? "Eclipse Portal Opening..."
            : `${phases[currentPhase].charAt(0).toUpperCase() + phases[currentPhase].slice(1)} Moon Phase`}
        </h2>
        <p className="text-indigo-200">
          {isEclipsing ? "The cosmic gateway is revealing itself" : "The lunar energies are aligning for your reading"}
        </p>
      </motion.div>
    </div>
  )
}
