"use client"

import { motion } from "framer-motion"
import { Shield, Eye, Lock, Database, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C3E50] via-[#8E44AD] to-[#1B1B1B]">
      {/* Background Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-[#ECF0F1] rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Shield className="w-16 h-16 text-[#E67E22] drop-shadow-2xl" />
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-[#E67E22]/20 to-[#E74C3C]/20 rounded-full blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-[#ECF0F1] drop-shadow-2xl">
            <span className="galaxy-text-gradient">Privacy Policy</span>
          </h1>
          <p className="text-xl text-[#ECF0F1]/90 max-w-3xl mx-auto font-body">
            Your cosmic journey is protected. Learn how we safeguard your spiritual discoveries.
          </p>
          <p className="text-sm text-[#ECF0F1]/70 mt-4">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center text-[#E67E22] hover:text-[#E74C3C] transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </motion.div>

        {/* Content */}
        <motion.div className="space-y-12" variants={containerVariants} initial="hidden" animate="visible">
          {/* Information We Collect */}
          <motion.section
            variants={itemVariants}
            className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-[#8E44AD]/30"
          >
            <div className="flex items-center mb-6">
              <Database className="w-8 h-8 text-[#E67E22] mr-4" />
              <h2 className="text-3xl font-heading font-bold text-[#ECF0F1]">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-[#ECF0F1]/90 font-body leading-relaxed">
              <p>
                At CosmicQuizHub, we collect information to provide you with personalized spiritual insights and premium
                quiz experiences:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Personal Information:</strong> Email address, name (if provided), and birth date for
                  astrological calculations
                </li>
                <li>
                  <strong>Quiz Responses:</strong> Your answers to astrology, numerology, tarot, and compatibility
                  quizzes
                </li>
                <li>
                  <strong>Usage Data:</strong> How you interact with our quizzes, time spent, and preferences
                </li>
                <li>
                  <strong>Device Information:</strong> Browser type, IP address, and device identifiers for security and
                  optimization
                </li>
                <li>
                  <strong>Cookies:</strong> To remember your preferences and provide personalized recommendations
                </li>
              </ul>
            </div>
          </motion.section>

          {/* How We Use Information */}
          <motion.section
            variants={itemVariants}
            className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-[#8E44AD]/30"
          >
            <div className="flex items-center mb-6">
              <Eye className="w-8 h-8 text-[#E67E22] mr-4" />
              <h2 className="text-3xl font-heading font-bold text-[#ECF0F1]">How We Use Your Information</h2>
            </div>
            <div className="space-y-4 text-[#ECF0F1]/90 font-body leading-relaxed">
              <p>Your cosmic data helps us enhance your spiritual journey:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Generate personalized astrology, numerology, and tarot readings</li>
                <li>Provide accurate compatibility assessments and love insights</li>
                <li>Send you relevant spiritual content and premium quiz recommendations</li>
                <li>Improve our quiz algorithms and spiritual guidance accuracy</li>
                <li>Communicate about your quiz results and premium offerings</li>
                <li>Ensure platform security and prevent fraudulent activities</li>
              </ul>
            </div>
          </motion.section>

          {/* Information Sharing */}
          <motion.section
            variants={itemVariants}
            className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-[#8E44AD]/30"
          >
            <div className="flex items-center mb-6">
              <Lock className="w-8 h-8 text-[#E67E22] mr-4" />
              <h2 className="text-3xl font-heading font-bold text-[#ECF0F1]">Information Sharing & Protection</h2>
            </div>
            <div className="space-y-4 text-[#ECF0F1]/90 font-body leading-relaxed">
              <p>Your spiritual journey is sacred. We protect your information with cosmic-level security:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>No Sale of Personal Data:</strong> We never sell your personal information to third parties
                </li>
                <li>
                  <strong>Affiliate Partners:</strong> We may share aggregated, non-personal data with our spiritual
                  content partners
                </li>
                <li>
                  <strong>Service Providers:</strong> Trusted partners who help deliver our quiz platform (email
                  services, analytics)
                </li>
                <li>
                  <strong>Legal Requirements:</strong> Only when required by law or to protect our users' safety
                </li>
                <li>
                  <strong>Encryption:</strong> All sensitive data is encrypted and stored securely
                </li>
                <li>
                  <strong>Access Controls:</strong> Strict limits on who can access your personal information
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Your Rights */}
          <motion.section
            variants={itemVariants}
            className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-[#8E44AD]/30"
          >
            <div className="flex items-center mb-6">
              <Mail className="w-8 h-8 text-[#E67E22] mr-4" />
              <h2 className="text-3xl font-heading font-bold text-[#ECF0F1]">Your Rights & Choices</h2>
            </div>
            <div className="space-y-4 text-[#ECF0F1]/90 font-body leading-relaxed">
              <p>You have full control over your cosmic data:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Access:</strong> Request a copy of all personal information we have about you
                </li>
                <li>
                  <strong>Correction:</strong> Update or correct any inaccurate personal information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal data (subject to legal requirements)
                </li>
                <li>
                  <strong>Opt-Out:</strong> Unsubscribe from marketing emails at any time
                </li>
                <li>
                  <strong>Data Portability:</strong> Request your data in a portable format
                </li>
                <li>
                  <strong>Cookie Control:</strong> Manage cookie preferences through your browser settings
                </li>
              </ul>
              <div className="mt-6 p-4 bg-[#8E44AD]/20 rounded-lg border border-[#8E44AD]/30">
                <p className="text-sm">
                  <strong>Contact Us:</strong> For any privacy-related requests, email us at{" "}
                  <a
                    href="mailto:privacy@cosmicquizhub.com"
                    className="text-[#E67E22] hover:text-[#E74C3C] transition-colors"
                  >
                    privacy@cosmicquizhub.com
                  </a>
                </p>
              </div>
            </div>
          </motion.section>

          {/* Cookies & Tracking */}
          <motion.section
            variants={itemVariants}
            className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-[#8E44AD]/30"
          >
            <h2 className="text-3xl font-heading font-bold text-[#ECF0F1] mb-6">Cookies & Tracking</h2>
            <div className="space-y-4 text-[#ECF0F1]/90 font-body leading-relaxed">
              <p>We use cookies and similar technologies to enhance your spiritual experience:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Essential Cookies:</strong> Required for basic site functionality and quiz completion
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how you use our quizzes to improve them
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Remember your settings and personalize your experience
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Show you relevant spiritual content and quiz recommendations
                </li>
              </ul>
              <p className="text-sm mt-4">
                You can control cookies through your browser settings, though some features may not work properly if
                disabled.
              </p>
            </div>
          </motion.section>

          {/* Updates */}
          <motion.section
            variants={itemVariants}
            className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-[#8E44AD]/30"
          >
            <h2 className="text-3xl font-heading font-bold text-[#ECF0F1] mb-6">Policy Updates</h2>
            <div className="space-y-4 text-[#ECF0F1]/90 font-body leading-relaxed">
              <p>
                As our cosmic platform evolves, we may update this Privacy Policy. We'll notify you of significant
                changes through:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email notifications to registered users</li>
                <li>Prominent notices on our website</li>
                <li>Updated "Last Modified" date at the top of this policy</li>
              </ul>
              <p>Continued use of CosmicQuizHub after policy updates constitutes acceptance of the new terms.</p>
            </div>
          </motion.section>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-[#8E44AD]/20 to-[#E67E22]/20 rounded-2xl border border-[#8E44AD]/30"
        >
          <h3 className="text-2xl font-heading font-bold text-[#ECF0F1] mb-4">Questions About Your Privacy?</h3>
          <p className="text-[#ECF0F1]/80 mb-6 font-body">
            We're here to help protect your cosmic journey. Reach out anytime.
          </p>
          <a
            href="mailto:privacy@cosmicquizhub.com"
            className="inline-flex items-center px-8 py-4 bg-[#E74C3C] hover:bg-[#C0392B] text-white font-semibold rounded-full transition-colors duration-300 shadow-xl"
          >
            <Mail className="w-5 h-5 mr-2" />
            Contact Privacy Team
          </a>
        </motion.div>
      </div>
    </div>
  )
}
