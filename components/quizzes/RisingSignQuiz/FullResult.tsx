"use client"
import type React from "react"
import { motion } from "framer-motion"
import { ExternalLink, Star, Sparkles, Heart, Briefcase, Download } from "lucide-react"
import { generateQuizResultPDF } from "@/lib/pdf-generator"

interface FullResultProps {
  userInfo: any
  quizAnswers: any[]
  risingSign: string
}

const FullResult: React.FC<FullResultProps> = ({ userInfo, quizAnswers, risingSign }) => {
  const risingSignInterpretations: Record<string, any> = {
    Aries: {
      personality:
        "As an Aries Rising, you project an image of confidence, leadership, and dynamic energy. People see you as someone who takes charge and isn't afraid to pioneer new paths. Your first impression is that of a natural leader who radiates enthusiasm and courage.",
      love: "In relationships, you attract partners who appreciate your directness and passion. You're drawn to confident individuals who can match your energy. Your approach to love is bold and straightforward - you know what you want and aren't afraid to pursue it.",
      success:
        "Your success comes through taking initiative and being first to market with new ideas. Leadership roles suit you naturally, and you thrive in competitive environments. Your ability to inspire others and take decisive action opens doors to advancement.",
      advice:
        "Embrace your natural leadership abilities while learning to listen to others' perspectives. Your enthusiasm is infectious, but remember to pace yourself to avoid burnout. Channel your pioneering spirit into meaningful projects that align with your values.",
    },
    Taurus: {
      personality:
        "With Taurus Rising, you emanate stability, reliability, and earthy sensuality. Others perceive you as grounded, practical, and someone they can depend on. Your presence is calming and reassuring, with an appreciation for life's finer pleasures.",
      love: "You attract partners who value loyalty and stability. Your approach to love is steady and sensual, preferring to build relationships on solid foundations. You show love through acts of service and creating comfortable, beautiful environments for your loved ones.",
      success:
        "Your path to success is through persistence, quality work, and building lasting value. You excel in fields related to finance, art, food, or anything that requires patience and attention to detail. Your reliability makes you invaluable in any organization.",
      advice:
        "Trust your instincts about what feels right for you. Your steady approach to life is a strength, but be open to necessary changes. Cultivate your artistic side and don't be afraid to indulge in life's pleasures in moderation.",
    },
    Gemini: {
      personality:
        "Gemini Rising gives you an air of curiosity, wit, and intellectual agility. People see you as communicative, adaptable, and endlessly interesting. Your mind moves quickly, and you have a gift for making connections between seemingly unrelated concepts.",
      love: "You attract partners who appreciate your intelligence and humor. Mental connection is crucial for you in relationships. You need a partner who can engage in stimulating conversations and appreciate your need for variety and intellectual growth.",
      success:
        "Your success comes through communication, networking, and your ability to adapt quickly to changing circumstances. Writing, teaching, media, or any field that involves sharing information suits you well. Your versatility is your greatest professional asset.",
      advice:
        "Focus on developing depth alongside your natural breadth of interests. Your ability to see multiple perspectives is valuable, but learn to commit to projects that truly matter to you. Cultivate patience and follow through on your brilliant ideas.",
    },
    Cancer: {
      personality:
        "Cancer Rising makes you appear nurturing, intuitive, and emotionally intelligent. Others see you as caring, protective, and someone who creates a sense of home wherever you go. Your empathy and emotional depth are immediately apparent to those you meet.",
      love: "You attract partners who appreciate your emotional depth and nurturing nature. You seek security and emotional connection in relationships. Your love is protective and caring, and you excel at creating intimate, comfortable spaces for your relationships to flourish.",
      success:
        "Your success comes through your ability to understand and care for others' needs. Fields like healthcare, education, hospitality, or any service-oriented profession suit you well. Your emotional intelligence helps you navigate workplace dynamics effectively.",
      advice:
        "Trust your intuitive abilities while developing healthy emotional boundaries. Your caring nature is a gift, but remember to care for yourself too. Use your emotional insights to guide others while protecting your own energy.",
    },
    Leo: {
      personality:
        "Leo Rising gives you a radiant, charismatic presence that naturally draws attention. People see you as confident, creative, and generous. You have a natural flair for drama and self-expression, and your warmth makes others feel special in your presence.",
      love: "You attract partners who appreciate your warmth and generosity. You love with your whole heart and enjoy romance, grand gestures, and making your partner feel like royalty. You need a partner who appreciates your need for admiration and creative expression.",
      success:
        "Your path to success involves creative self-expression and inspiring others. Entertainment, arts, leadership roles, or any field where you can shine and be recognized for your unique talents suits you perfectly. Your natural charisma opens many doors.",
      advice:
        "Embrace your natural magnetism while staying humble and generous. Your creative gifts are meant to be shared with the world. Remember that true leadership involves lifting others up, not just being in the spotlight yourself.",
    },
    Virgo: {
      personality:
        "Virgo Rising makes you appear organized, analytical, and helpful. Others see you as someone who pays attention to details and has practical solutions to problems. Your modest, service-oriented approach masks a sharp intelligence and genuine desire to improve things.",
      love: "You attract partners who appreciate your thoughtfulness and reliability. You show love through acts of service and attention to your partner's needs. You prefer relationships built on mutual respect, shared values, and practical compatibility.",
      success:
        "Your success comes through your analytical skills, attention to detail, and desire to be of service. Healthcare, research, editing, organization, or any field requiring precision and improvement suits you well. Your methodical approach ensures quality results.",
      advice:
        "Embrace your perfectionist tendencies while learning to appreciate 'good enough' sometimes. Your analytical mind is a gift, but don't let it prevent you from taking action. Remember that your desire to help others is deeply valuable.",
    },
    Libra: {
      personality:
        "Libra Rising gives you an air of grace, charm, and diplomatic skill. People see you as fair-minded, aesthetically aware, and naturally harmonious. Your ability to see all sides of a situation and create balance makes you a natural mediator and peacemaker.",
      love: "You attract partners who appreciate your charm and desire for harmony. Relationships are central to your identity, and you excel at creating beautiful, balanced partnerships. You seek equality, mutual respect, and aesthetic compatibility in love.",
      success:
        "Your success comes through your diplomatic skills, aesthetic sense, and ability to bring people together. Law, arts, design, counseling, or any field requiring balance and beauty suits you well. Your natural charm helps you build valuable professional relationships.",
      advice:
        "Trust your instincts about fairness and beauty while learning to make decisions independently. Your desire for harmony is admirable, but don't sacrifice your own needs for peace. Develop your artistic talents and use them to create beauty in the world.",
    },
    Scorpio: {
      personality:
        "Scorpio Rising gives you an intense, mysterious presence that others find both intriguing and slightly intimidating. People sense your depth, passion, and transformative power. You have a natural ability to see beneath surfaces and understand hidden motivations.",
      love: "You attract partners who appreciate your intensity and emotional depth. You love with complete devotion and expect the same in return. Trust and emotional intimacy are non-negotiable for you, and you have the power to transform your relationships profoundly.",
      success:
        "Your success comes through your ability to transform, investigate, and work with hidden or taboo subjects. Psychology, research, healing arts, finance, or any field requiring depth and intensity suits you well. Your persistence and insight give you a competitive edge.",
      advice:
        "Embrace your transformative power while learning to trust others gradually. Your intensity is a strength, but remember that not everyone operates at your emotional depth. Use your insights to heal and empower rather than to control or manipulate.",
    },
    Sagittarius: {
      personality:
        "Sagittarius Rising makes you appear adventurous, optimistic, and philosophically minded. Others see you as someone who thinks big, loves to explore, and has a natural wisdom about life. Your enthusiasm for learning and expanding horizons is infectious.",
      love: "You attract partners who share your love of adventure and growth. You need freedom and intellectual stimulation in relationships. Your ideal partner is someone who can join you on your philosophical and physical journeys while respecting your need for independence.",
      success:
        "Your success comes through your ability to see the big picture, teach others, and explore new frontiers. Education, travel, publishing, international business, or any field that allows you to expand minds and horizons suits you perfectly.",
      advice:
        "Embrace your natural wisdom while learning to focus on practical details. Your optimism is inspiring, but balance it with realistic planning. Share your philosophical insights generously, as they can guide others toward greater understanding.",
    },
    Capricorn: {
      personality:
        "Capricorn Rising gives you an aura of authority, responsibility, and timeless sophistication. Others see you as mature, reliable, and naturally suited for leadership positions. Your practical approach to life and respect for tradition commands respect from others.",
      love: "You attract partners who appreciate your stability and long-term vision. You approach love seriously and prefer relationships that have the potential for lasting commitment. You show love through providing security and working toward shared goals.",
      success:
        "Your success comes through your discipline, strategic thinking, and ability to build lasting structures. Business, management, government, or any field requiring long-term planning and responsibility suits you well. Your reputation for reliability opens doors to advancement.",
      advice:
        "Embrace your natural authority while remembering to enjoy the journey, not just the destination. Your disciplined approach to life is admirable, but don't forget to celebrate your achievements along the way. Your wisdom and experience are valuable to others.",
    },
    Aquarius: {
      personality:
        "Aquarius Rising makes you appear innovative, independent, and humanitarian. Others see you as someone who thinks outside the box and cares about making the world a better place. Your unique perspective and progressive ideas set you apart from the crowd.",
      love: "You attract partners who appreciate your uniqueness and share your humanitarian values. You need intellectual freedom and friendship as the foundation of love. Your ideal relationship allows both partners to maintain their individuality while working toward common ideals.",
      success:
        "Your success comes through innovation, technology, and your ability to envision the future. Science, technology, social causes, or any field that involves progressive thinking and humanitarian goals suits you perfectly. Your originality is your greatest professional asset.",
      advice:
        "Embrace your uniqueness while learning to connect emotionally with others. Your vision for the future is valuable, but remember to stay grounded in present realities. Use your innovative ideas to create positive change in the world.",
    },
    Pisces: {
      personality:
        "Pisces Rising gives you a dreamy, compassionate presence that others find deeply appealing. People see you as intuitive, artistic, and emotionally sensitive. Your ability to empathize and understand others on a soul level makes you naturally healing to be around.",
      love: "You attract partners who appreciate your emotional depth and spiritual nature. You love with complete devotion and seek soul-level connections. Your ideal relationship is one where you can merge emotionally and spiritually while maintaining your individual dreams and creativity.",
      success:
        "Your success comes through your creativity, intuition, and ability to heal or inspire others. Arts, healing professions, spirituality, or any field that allows you to use your imagination and compassion suits you well. Your empathy helps you understand what others truly need.",
      advice:
        "Trust your intuitive abilities while developing practical skills to manifest your dreams. Your sensitivity is a gift, but learn to protect your energy from negative influences. Use your artistic and healing gifts to bring more beauty and compassion into the world.",
    },
  }

  const interpretation = risingSignInterpretations[risingSign] || risingSignInterpretations["Leo"]

  const handleDownloadPDF = () => {
    const pdf = generateQuizResultPDF(userInfo, { risingSign }, "Rising Sign Quiz", interpretation.personality)
    pdf.save(`Rising_Sign_Quiz_Results_${userInfo.fullName.replace(/\s+/g, "_")}.pdf`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      {/* Header with Logo */}
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#915EFF] to-[#FF5F6D] rounded-full mb-4"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-2xl font-bold mb-2">www.quizzastrology.com</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Complete Rising Sign Report</h2>
      </div>

      {/* User Information */}
      <motion.div
        className="bg-[#1F2A38] rounded-2xl p-6 mb-8 border border-white/10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2 text-[#915EFF]" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
          <div>
            <span className="font-medium">Name:</span> {userInfo.fullName}
          </div>
          <div>
            <span className="font-medium">Email:</span> {userInfo.email}
          </div>
          <div>
            <span className="font-medium">Date of Birth:</span> {userInfo.dateOfBirth}
          </div>
          <div>
            <span className="font-medium">Country:</span> {userInfo.countryOfBirth}
          </div>
          {userInfo.cityOfBirth && (
            <div>
              <span className="font-medium">City:</span> {userInfo.cityOfBirth}
            </div>
          )}
        </div>
      </motion.div>

      {/* Rising Sign Result */}
      <motion.div
        className="bg-[#1F2A38] rounded-2xl p-8 mb-8 border border-white/10 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="text-6xl mb-4">✨</div>
        <h3 className="text-3xl md:text-4xl font-bold mb-2">Your Rising Sign: {risingSign}</h3>
        <p className="text-white/80 text-lg">Based on your personality assessment</p>
      </motion.div>

      {/* Detailed Interpretations */}
      <div className="space-y-8">
        {/* Personality */}
        <motion.div
          className="bg-[#1F2A38] rounded-2xl p-6 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h4 className="text-xl font-semibold mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-[#915EFF]" />
            Your Personality & First Impressions
          </h4>
          <p className="text-white/80 leading-relaxed">{interpretation.personality}</p>
        </motion.div>

        {/* Love & Relationships */}
        <motion.div
          className="bg-[#1F2A38] rounded-2xl p-6 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h4 className="text-xl font-semibold mb-4 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-[#FF5F6D]" />
            Love & Relationships
          </h4>
          <p className="text-white/80 leading-relaxed">{interpretation.love}</p>
        </motion.div>

        {/* Success & Career */}
        <motion.div
          className="bg-[#1F2A38] rounded-2xl p-6 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <h4 className="text-xl font-semibold mb-4 flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-[#FFA726]" />
            Success & Career Path
          </h4>
          <p className="text-white/80 leading-relaxed">{interpretation.success}</p>
        </motion.div>

        {/* Advice */}
        <motion.div
          className="bg-[#1F2A38] rounded-2xl p-6 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <h4 className="text-xl font-semibold mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-[#915EFF]" />
            Cosmic Guidance & Advice
          </h4>
          <p className="text-white/80 leading-relaxed">{interpretation.advice}</p>
        </motion.div>
      </div>

      {/* Download PDF Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="text-center mb-8"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownloadPDF}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Download className="w-5 h-5" />
          <span>Download PDF Report</span>
        </motion.button>
      </motion.div>

      {/* Quiz Answers Summary */}
      <motion.div
        className="bg-[#1F2A38] rounded-2xl p-6 mt-8 border border-white/10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <h4 className="text-xl font-semibold mb-4">Your Quiz Responses</h4>
        <div className="space-y-3">
          {quizAnswers.map((answer, index) => (
            <div key={index} className="border-b border-white/10 pb-3 last:border-b-0">
              <p className="text-white/90 font-medium mb-1">
                Q{index + 1}: {answer.question}
              </p>
              <p className="text-white/70 text-sm">Your answer: {answer.answer}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <div className="bg-gradient-to-r from-[#915EFF] to-[#FF5F6D] rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">Want Even Deeper Insights?</h3>
          <p className="text-white/90 mb-6">Get a complete birth chart reading from a professional astrologer</p>
          <motion.a
            href="#"
            className="inline-flex items-center space-x-2 bg-white text-[#915EFF] px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>👉 Get Full Birth Chart Analysis</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default FullResult
