'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sparkles, Crown } from 'lucide-react'
import PaymentModal from '../../PaymentModal'

export default function ShortResult({ userData, results, onPaymentSuccess }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    onPaymentSuccess()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-indigo-500/30 shadow-2xl text-center">
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <Moon className="w-20 h-20 text-indigo-400 mx-auto" />
              <motion.div
                className="absolute -inset-6 bg-indigo-400/30 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl font-bold text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Your Eclipse Portal Has Opened
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-indigo-200 mb-8"
          >
            Dear {userData?.name}, the lunar eclipse has revealed your
            destiny...
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl p-6 mb-8 border border-indigo-400/30"
          >
            <div className="text-4xl mb-4">🌙</div>
            <p className="text-white text-lg leading-relaxed">
              {results?.primaryDestiny}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mb-8"
          >
            <p className="text-indigo-200 mb-6">
              Your complete Eclipse Portal reading reveals the full cosmic
              alignment and your spiritual transformation timeline:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                '🌙 Complete lunar eclipse analysis',
                '🔮 Detailed rune interpretations',
                '⭐ Cosmic timing predictions',
                '✨ Spiritual awakening guidance',
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center text-indigo-200"
                >
                  <span className="mr-2">{feature.split(' ')[0]}</span>
                  <span>{feature.split(' ').slice(1).join(' ')}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 15px 35px rgba(99, 102, 241, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPaymentModal(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
          >
            <Crown className="w-5 h-5" />
            Unlock Complete Eclipse Reading - $6.99
            <Sparkles className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        quizSlug="eclipse-portal-quiz"
        userData={userData}
        results={results}
        quizTitle="Eclipse Portal Reading"
        fullAnalysis={results?.fullAnalysis}
        price={6.99}
      />
    </div>
  )
}
