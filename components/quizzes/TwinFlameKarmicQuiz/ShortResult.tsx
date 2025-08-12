'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, Star, Sparkles, Heart } from 'lucide-react'
import PaymentModal from '../../PaymentModal'

interface ShortResultProps {
  userData: any
  result: string
  onShowFullResult: () => void
}

const ShortResult = ({
  userData,
  result,
  onShowFullResult,
}: ShortResultProps) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const getResultContent = () => {
    switch (result) {
      case 'Twin Flame':
        return {
          title: 'Twin Flame Connection',
          icon: <Flame className="w-16 h-16 text-orange-400" />,
          preview:
            'Your souls are two halves of the same divine essence, reunited in this lifetime to experience unconditional love and spiritual awakening. This connection transcends the physical realm and represents the ultimate spiritual partnership.',
          color: 'from-orange-400 to-red-500',
        }
      case 'Karmic Lesson':
        return {
          title: 'Karmic Relationship',
          icon: <Star className="w-16 h-16 text-purple-400" />,
          preview:
            "This relationship is a powerful karmic lesson, bringing you face-to-face with patterns that your soul needs to heal and transform. Through this connection, you're learning to break cycles and evolve spiritually.",
          color: 'from-purple-400 to-pink-500',
        }
      case 'Both – a transformative twin soul connection with karmic roots':
        return {
          title: 'Twin Soul with Karmic Roots',
          icon: <Sparkles className="w-16 h-16 text-pink-400" />,
          preview:
            'Your connection is both a twin soul bond and a karmic healing journey. You share a deep spiritual connection while simultaneously working through important lessons that will elevate both of your souls to higher consciousness.',
          color: 'from-pink-400 to-purple-500',
        }
      default:
        return {
          title: 'Soul Connection',
          icon: <Heart className="w-16 h-16 text-pink-400" />,
          preview:
            'Your relationship holds deep spiritual significance and is guiding you both toward greater understanding and growth.',
          color: 'from-pink-400 to-red-500',
        }
    }
  }

  const content = getResultContent()

  const handleUnlockFull = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    onShowFullResult()
  }

  const getFullAnalysis = () => {
    const analysisMap = {
      'Twin Flame':
        "Your Twin Flame connection represents the ultimate spiritual partnership. This comprehensive reading reveals the deeper layers of your divine union, including the stages of your twin flame journey, the spiritual lessons you're meant to learn together, and guidance for navigating the intense energy of this sacred connection. You'll discover how to maintain balance, overcome challenges, and embrace the transformative power of your twin flame bond.",
      'Karmic Lesson':
        "Your Karmic Relationship is a powerful catalyst for spiritual growth and healing. This detailed analysis explores the specific karmic patterns you're working through together, the soul contracts you've made, and the lessons that will lead to your spiritual evolution. Learn how to break negative cycles, heal past wounds, and transform this relationship into a source of wisdom and growth.",
      'Both – a transformative twin soul connection with karmic roots':
        "Your unique connection combines the intensity of a twin soul bond with the healing power of karmic transformation. This comprehensive reading reveals how to navigate both aspects of your relationship, understanding when you're in twin soul harmony and when you're working through karmic lessons. Discover the divine purpose of your union and how to embrace both the challenges and the profound love that defines your connection.",
    }

    return (
      analysisMap[result as keyof typeof analysisMap] ||
      "Your soul connection holds profound spiritual significance. This detailed reading explores the deeper meaning of your relationship, the spiritual lessons you're learning together, and guidance for nurturing this divine bond."
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        className="bg-slate-800 bg-opacity-90 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-500/20 text-center"
      >
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            type: 'spring',
            stiffness: 200,
          }}
          className="flex justify-center mb-8"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
            className="p-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30"
          >
            {content.icon}
          </motion.div>
        </motion.div>

        {/* Result Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r ${content.color} bg-clip-text text-transparent`}
        >
          {content.title}
        </motion.h1>

        {/* Preview Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto"
        >
          {content.preview}
        </motion.p>

        {/* Teaser Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-lg text-purple-300 mb-2">
            This is just the beginning of your cosmic love story...
          </p>
          <p className="text-gray-400">
            Your full relationship reading contains deeper insights about your
            spiritual connection, healing journey, and the divine purpose of
            your union.
          </p>
        </motion.div>

        {/* Reveal Button */}
        <motion.button
          onClick={handleUnlockFull}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 20px 40px rgba(255, 107, 107, 0.3)',
          }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <motion.span
            animate={{
              textShadow: [
                '0 0 10px rgba(255,255,255,0.5)',
                '0 0 20px rgba(255,255,255,0.8)',
                '0 0 10px rgba(255,255,255,0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            🔮 Get Full Reading - $1.99
          </motion.span>
        </motion.button>
      </motion.div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        quizSlug="twin-flame-karmic-quiz"
        userData={userData}
        results={{ result, content }}
        quizTitle="Twin Flame vs Karmic Quiz"
        fullAnalysis={getFullAnalysis()}
        price={1.99}
      />
    </div>
  )
}

export default ShortResult
