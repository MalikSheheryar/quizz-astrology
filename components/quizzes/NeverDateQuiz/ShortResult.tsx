'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Sparkles, CreditCard } from 'lucide-react'
import PaymentModal from '../../PaymentModal'

const ShortResult = ({
  results,
  userData,
  onShowFull,
  quizSlug = 'never-date-quiz',
  quizTitle = 'Never Date Quiz',
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const { neverDate, userSign } = results

  const handlePaymentClick = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    onShowFull()
  }

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Warning Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
              className="mb-6"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            {/* Main Result */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                🚩 Never Date a{' '}
                {neverDate.sign.charAt(0).toUpperCase() +
                  neverDate.sign.slice(1)}
              </h1>

              <div className="text-6xl mb-4">{neverDate.emoji}</div>

              <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                <strong>For you, {userData.fullName?.split(' ')[0]}</strong>:{' '}
                {neverDate.reason}
              </p>
            </motion.div>

            {/* User Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mb-8 p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-center justify-center gap-4 text-white/80">
                <span className="text-2xl">{userSign.emoji}</span>
                <div className="text-left">
                  <div className="font-medium">
                    {userData.fullName} •{' '}
                    {userSign.sign.charAt(0).toUpperCase() +
                      userSign.sign.slice(1)}
                  </div>
                  <div className="text-sm text-white/60">
                    Born{' '}
                    {new Date(userData.dateOfBirth).toLocaleDateString(
                      'en-US',
                      {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      }
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Teaser Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mb-8 space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h3 className="font-semibold text-red-300 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Your Triggers
                  </h3>
                  <ul className="text-sm text-white/80 space-y-1">
                    {neverDate.traits.triggers
                      .slice(0, 2)
                      .map((trigger, index) => (
                        <li key={index}>• {trigger}</li>
                      ))}
                    <li className="text-white/60">• and more...</li>
                  </ul>
                </div>

                <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <h3 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Their Patterns
                  </h3>
                  <ul className="text-sm text-white/80 space-y-1">
                    {neverDate.traits.negative
                      .slice(0, 2)
                      .map((trait, index) => (
                        <li key={index}>• {trait}</li>
                      ))}
                    <li className="text-white/60">• and more...</li>
                  </ul>
                </div>
              </div>

              <div className="text-center p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-white/90 font-medium">
                  💫 Want to see your full compatibility report with 2 more
                  warning signs + your best matches?
                </p>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <motion.button
                onClick={handlePaymentClick}
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-4 px-8 rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CreditCard className="w-5 h-5" />
                🔮 Reveal Full Compatibility Warning - $1.99
              </motion.button>

              <p className="text-sm text-white/60 mt-3">
                Includes your 3 best matches + how to date them anyway
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        quizSlug={quizSlug}
        userData={userData}
        results={results}
        quizTitle={quizTitle}
        fullAnalysis={results.warnings || results.compatible || results}
        price={1.99}
      />
    </>
  )
}

export default ShortResult
