'use client'

import { motion } from 'framer-motion'
import {
  AlertCircle,
  Star,
  Heart,
  SnowflakeIcon as Crystal,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react'
import Link from 'next/link'

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Disclaimer() {
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
              <AlertCircle className="w-16 h-16 text-[#E67E22] drop-shadow-2xl" />
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-[#E67E22]/20 to-[#E74C3C]/20 rounded-full blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-[#ECF0F1] drop-shadow-2xl">
            <span className="galaxy-text-gradient">Disclaimer</span>
          </h1>
          <p className="text-xl text-[#ECF0F1]/90 max-w-3xl mx-auto font-body">
            Important information about your cosmic journey and spiritual
            discoveries.
          </p>
          <p className="text-sm text-[#ECF0F1]/70 mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
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
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* General Disclaimer */}
          <motion.section
            variants={itemVariants}
            className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-[#8E44AD]/30"
          >
            <div className="flex items-center mb-6">
              <AlertCircle className="w-8 h-8 text-[#E67E22] mr-4" />
              <h2 className="text-3xl font-heading font-bold text-[#ECF0F1]">
                General Disclaimer
              </h2>
            </div>
            <div className="space-y-4 text-[#ECF0F1]/90 font-body leading-relaxed">
              <p>
                The information on CosmicQuizHub is provided on an "as is"
                basis. To the fullest extent permitted by law, this Company:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Excludes all representations and warranties relating to this
                  website and its contents
                </li>
                <li>
                  Does not guarantee the accuracy, completeness, or reliability
                  of spiritual interpretations
                </li>
                <li>
                  Excludes all liability for damages arising out of or in
                  connection with your use of this website
                </li>
                <li>
                  Provides content for entertainment and self-reflection
                  purposes only
                </li>
              </ul>
              <div className="p-4 bg-[#E74C3C]/20 rounded-lg border border-[#E74C3C]/30 mt-6">
                <p className="text-sm font-semibold">
                  ⚠️ This disclaimer applies to all quizzes, spiritual content,
                  and guidance provided on our platform.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Astrology Disclaimer */}
          <motion.section
            variants={itemVariants}
            className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-[#8E44AD]/30"
          >
            <div className="flex items-center mb-6">
              <Star className="w-8 h-8 text-[#E67E22] mr-4" />
              <h2 className="text-3xl font-heading font-bold text-[#ECF0F1]">
                Astrology & Horoscope Disclaimer
              </h2>
            </div>
            <div className="space-y-4 text-[#ECF0F1]/90 font-body leading-relaxed">
              <p>
                Our astrology quizzes and horoscope content are based on
                traditional astrological principles and are intended for
                entertainment purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Not Scientific:</strong> Astrology is not
                  scientifically proven and should not be relied upon for major
                  life decisions
                </li>
                <li>
                  <strong>General Interpretations:</strong> Results are based on
                  general astrological principles, not personalized readings
                </li>
                <li>
                  <strong>Individual Variation:</strong> Personal experiences
                  may vary significantly from astrological interpretations
                </li>
                <li>
                  <strong>Entertainment Value:</strong> Use our astrology
                  content for fun, self-reflection, and entertainment
                </li>
                <li>
                  <strong>Professional Advice:</strong> Consult qualified
                  professionals for important life, career, or relationship
                  decisions
                </li>
              </ul>
              <div className="p-4 bg-[#8E44AD]/20 rounded-lg border border-[#8E44AD]/30 mt-6">
                <p className="text-sm">
                  <strong>Remember:</strong> The stars may guide, but you create
                  your own destiny through your choices and actions.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Love & Relationship Disclaimer */}
          <motion.section
            variants={itemVariants}
            className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-[#8E44AD]/30"
          >
            <div className="flex items-center mb-6">
              <Heart className="w-8 h-8 text-[#E67E22] mr-4" />
              <h2 className="text-3xl font-heading font-bold text-[#ECF0F1]">
                Love & Relationship Disclaimer
              </h2>
            </div>
            <div className="space-y-4 text-[#ECF0F1]/90 font-body leading-relaxed">
              <p>
                Our love compatibility and relationship quizzes are designed for
                entertainment and self-discovery:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Not Relationship Counseling:</strong> Quiz results
                  cannot replace professional relationship therapy or counseling
                </li>
                <li>
                  <strong>General Compatibility:</strong> Results are based on
                  general patterns, not specific relationship dynamics
                </li>
                <li>
                  <strong>Personal Responsibility:</strong> You are responsible
                  for your relationship decisions and communications
                </li>
                <li>
                  <strong>Individual Differences:</strong> Every relationship is
                  unique and complex beyond what quizzes can capture
                </li>
                <li>
                  <strong>Seek Professional Help:</strong> For serious
                  relationship issues, consult qualified therapists or
                  counselors
                </li>
              </ul>
              <div className="p-4 bg-[#E67E22]/20 rounded-lg border border-[#E67E22]/30 mt-6">
                <p className="text-sm">
                  <strong>Love Reminder:</strong> True compatibility comes from
                  communication, understanding, and mutual respect - not just
                  quiz results.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Tarot & Spiritual Disclaimer */}
          <motion.section
            variants={itemVariants}
            className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-[#8E44AD]/30"
          >
            <div className="flex items-center mb-6">
              <Crystal className="w-8 h-8 text-[#E67E22] mr-4" />
              <h2 className="text-3xl font-heading font-bold text-[#ECF0F1]">
                Tarot & Spiritual Guidance Disclaimer
              </h2>
            </div>
            <div className="space-y-4 text-[#ECF0F1]/90 font-body leading-relaxed">
              <p>
                Our tarot readings and spiritual guidance are provided for
                entertainment and personal reflection:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Symbolic Interpretation:</strong> Tarot cards are
                  symbolic tools for self-reflection, not literal predictions
                </li>
                <li>
                  <strong>Personal Intuition:</strong> Trust your own intuition
                  and judgment above any reading or interpretation
                </li>
                <li>
                  <strong>Not Fortune Telling:</strong> We do not claim to
                  predict the future or provide supernatural insights
                </li>
                <li>
                  <strong>Spiritual Exploration:</strong> Use our content as a
                  tool for personal growth and spiritual exploration
                </li>
                <li>
                  <strong>Free Will:</strong> You have the power to shape your
                  future through your choices and actions
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Medical & Mental Health Disclaimer */}
          <motion.section
            variants={itemVariants}
            className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-[#8E44AD]/30"
          >
            <h2 className="text-3xl font-heading font-bold text-[#ECF0F1] mb-6">
              Medical & Mental Health Disclaimer
            </h2>
            <div className="space-y-4 text-[#ECF0F1]/90 font-body leading-relaxed">
              <p>
                <strong>Important:</strong> CosmicQuizHub does not provide
                medical, psychological, or mental health advice:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Our quizzes are not diagnostic tools and cannot identify
                  medical or psychological conditions
                </li>
                <li>
                  Quiz results should never replace professional medical or
                  mental health treatment
                </li>
                <li>
                  If you're experiencing mental health concerns, please consult
                  qualified healthcare professionals
                </li>
                <li>
                  In case of emergency or crisis, contact emergency services or
                  crisis hotlines immediately
                </li>
                <li>
                  Our spiritual content is complementary to, not a replacement
                  for, professional care
                </li>
              </ul>
              <div className="p-4 bg-[#E74C3C]/20 rounded-lg border border-[#E74C3C]/30 mt-6">
                <p className="text-sm font-semibold">
                  🚨 If you're in crisis, please contact emergency services
                  (911) or a mental health crisis hotline immediately.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Affiliate & Commercial Disclaimer */}
          <motion.section
            variants={itemVariants}
            className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-[#8E44AD]/30"
          >
            <h2 className="text-3xl font-heading font-bold text-[#ECF0F1] mb-6">
              Affiliate & Commercial Disclaimer
            </h2>
            <div className="space-y-4 text-[#ECF0F1]/90 font-body leading-relaxed">
              <p>
                CosmicQuizHub participates in affiliate marketing programs and
                may receive compensation:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Affiliate Links:</strong> Some links on our site are
                  affiliate links that may earn us a commission
                </li>
                <li>
                  <strong>Product Recommendations:</strong> We only recommend
                  products and services we believe may benefit our users
                </li>
                <li>
                  <strong>Third-Party Content:</strong> Premium content may be
                  provided by third-party partners with their own terms
                </li>
                <li>
                  <strong>No Guarantees:</strong> We cannot guarantee the
                  quality or results of third-party products or services
                </li>
                <li>
                  <strong>Your Choice:</strong> You are never required to
                  purchase anything to use our free content
                </li>
              </ul>
              <div className="p-4 bg-[#8E44AD]/20 rounded-lg border border-[#8E44AD]/30 mt-6">
                <p className="text-sm">
                  <strong>Transparency:</strong> We clearly disclose affiliate
                  relationships and always prioritize providing value to our
                  cosmic community.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Accuracy & Updates */}
          <motion.section
            variants={itemVariants}
            className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-[#8E44AD]/30"
          >
            <h2 className="text-3xl font-heading font-bold text-[#ECF0F1] mb-6">
              Content Accuracy & Updates
            </h2>
            <div className="space-y-4 text-[#ECF0F1]/90 font-body leading-relaxed">
              <p>
                While we strive to provide meaningful and engaging content,
                please note:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Content may contain errors, omissions, or become outdated over
                  time
                </li>
                <li>
                  We reserve the right to modify or update content without
                  notice
                </li>
                <li>
                  Quiz algorithms and interpretations may be updated to improve
                  user experience
                </li>
                <li>
                  External links may become inactive or redirect to different
                  content
                </li>
                <li>
                  We are not responsible for the accuracy of third-party content
                  or websites
                </li>
              </ul>
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
          <h3 className="text-2xl font-heading font-bold text-[#ECF0F1] mb-4">
            Questions About Our Disclaimer?
          </h3>
          <p className="text-[#ECF0F1]/80 mb-6 font-body">
            We're here to clarify any concerns about your cosmic journey with
            us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@cosmicquizhub.com"
              className="inline-flex items-center px-6 py-3 bg-[#E74C3C] hover:bg-[#C0392B] text-white font-semibold rounded-full transition-colors duration-300 shadow-xl"
            >
              Contact Support
            </a>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-[#8E44AD] hover:bg-[#7D3C98] text-white font-semibold rounded-full transition-colors duration-300 shadow-xl"
            >
              Explore Quizzes
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
