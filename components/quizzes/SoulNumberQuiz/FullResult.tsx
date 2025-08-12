"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, ExternalLink, Heart, Briefcase, Sparkles, Moon, Download } from "lucide-react"

interface FullResultProps {
  soulNumber: number | null
  userData: any
  quizAnswers: any
}

const FullResult: React.FC<FullResultProps> = ({ soulNumber, userData, quizAnswers }) => {
  const [showAnswers, setShowAnswers] = useState(false)

  const getFullSoulProfile = (number: number | null) => {
    if (!number)
      return {
        purpose: "To discover your true path through exploration and learning.",
        innerDrives: ["Self-discovery", "Learning and growth", "Finding purpose", "Connecting with others"],
        shadowSide: "May feel lost or uncertain about direction at times.",
        careerPath: "Explorer, Student, Guide, Helper",
        lovePath: "You need a partner who supports your journey of self-discovery.",
        spiritualPath: "Your path involves finding your unique purpose and gifts.",
        affirmation: "I am on the perfect path of discovery and growth.",
      }

    const profiles: any = {
      1: {
        purpose:
          "To lead, innovate, and pioneer new paths for humanity. You are here to break barriers and create original solutions.",
        innerDrives: [
          "Independence and self-reliance",
          "Creating something from nothing",
          "Being first and setting trends",
          "Achieving personal excellence",
        ],
        shadowSide:
          "Can become overly aggressive, impatient with others, or isolated in pursuit of goals. May struggle with collaboration.",
        careerPath: "Entrepreneur, CEO, Inventor, Pioneer, Independent Consultant, Creative Director",
        lovePath:
          "You need a partner who respects your independence while providing emotional support. Avoid controlling relationships.",
        spiritualPath:
          "Your spiritual growth comes through learning to balance personal ambition with service to others.",
        affirmation: "I am a powerful creator, and I use my leadership to uplift and inspire others.",
      },
      2: {
        purpose: "To bring harmony, cooperation, and emotional healing to relationships and communities.",
        innerDrives: [
          "Creating peace and balance",
          "Supporting others' success",
          "Building meaningful connections",
          "Mediating conflicts with wisdom",
        ],
        shadowSide:
          "May become overly dependent on others' approval, avoid confrontation, or lose personal identity in relationships.",
        careerPath: "Counselor, Diplomat, Team Leader, Social Worker, Therapist, Collaborative Artist",
        lovePath: "You thrive in partnerships built on mutual respect, emotional intimacy, and shared goals.",
        spiritualPath: "Your spiritual journey involves learning to value yourself as much as you value others.",
        affirmation: "I create harmony in my world while honoring my own needs and boundaries.",
      },
      3: {
        purpose: "To inspire joy, creativity, and optimism through artistic expression and communication.",
        innerDrives: [
          "Creative self-expression",
          "Bringing joy to others",
          "Communicating ideas beautifully",
          "Celebrating life's beauty",
        ],
        shadowSide:
          "Can scatter energy across too many projects, become superficial, or use humor to avoid deeper emotions.",
        careerPath: "Artist, Writer, Performer, Teacher, Marketing Creative, Entertainment Industry",
        lovePath:
          "You need a partner who appreciates your creativity and gives you space to express your vibrant personality.",
        spiritualPath: "Your spiritual growth comes through using your gifts to heal and uplift others.",
        affirmation: "My creative expression is a gift to the world, and I share it with joy and confidence.",
      },
      4: {
        purpose:
          "To build solid foundations, create lasting systems, and bring order to chaos through practical wisdom.",
        innerDrives: [
          "Creating stability and security",
          "Building something lasting",
          "Organizing and systematizing",
          "Serving through practical help",
        ],
        shadowSide:
          "May become rigid, overly cautious, or resistant to necessary changes. Can be overly critical of imperfection.",
        careerPath: "Project Manager, Engineer, Architect, Financial Planner, Operations Director, Craftsperson",
        lovePath: "You value loyalty, commitment, and building a secure future together with your partner.",
        spiritualPath: "Your spiritual path involves learning to balance structure with flexibility and trust.",
        affirmation: "I build my life on solid foundations while remaining open to growth and change.",
      },
      5: {
        purpose: "To explore life's possibilities, promote freedom, and help others break free from limitations.",
        innerDrives: [
          "Adventure and new experiences",
          "Personal freedom and variety",
          "Learning through exploration",
          "Inspiring others to take risks",
        ],
        shadowSide:
          "Can become restless, irresponsible, or avoid commitment. May struggle with routine and discipline.",
        careerPath: "Travel Industry, Sales, Marketing, Journalism, Adventure Guide, Freelance Professional",
        lovePath: "You need a partner who shares your love of adventure and gives you freedom to explore.",
        spiritualPath:
          "Your spiritual growth comes through learning that true freedom includes responsibility to others.",
        affirmation: "I embrace life's adventures while staying grounded in love and commitment.",
      },
      6: {
        purpose: "To nurture, heal, and create beautiful, harmonious environments where others can thrive.",
        innerDrives: [
          "Caring for family and community",
          "Creating beauty and comfort",
          "Healing and nurturing others",
          "Taking responsibility for loved ones",
        ],
        shadowSide: "May become overly controlling, martyristic, or neglect personal needs while caring for others.",
        careerPath: "Healthcare, Education, Interior Design, Family Services, Hospitality, Healing Arts",
        lovePath: "You are devoted and nurturing, seeking a partner who appreciates your caring nature.",
        spiritualPath: "Your spiritual journey involves learning to receive love as freely as you give it.",
        affirmation: "I nurture others from a place of self-love and abundance, not sacrifice.",
      },
      7: {
        purpose: "To seek truth, develop spiritual wisdom, and help others understand life's deeper mysteries.",
        innerDrives: [
          "Understanding life's mysteries",
          "Developing intuition and wisdom",
          "Seeking spiritual truth",
          "Analyzing and researching deeply",
        ],
        shadowSide: "Can become isolated, overly analytical, or disconnected from practical reality and emotions.",
        careerPath: "Researcher, Spiritual Teacher, Analyst, Scientist, Philosopher, Mystic, Therapist",
        lovePath: "You need a partner who respects your need for solitude and shares your interest in deeper meaning.",
        spiritualPath: "Your spiritual path is about integrating wisdom with compassionate action in the world.",
        affirmation: "I trust my inner wisdom and share my insights to help others find their truth.",
      },
      8: {
        purpose: "To achieve material success and use your power and resources to create positive change in the world.",
        innerDrives: [
          "Achieving material success",
          "Building wealth and influence",
          "Leading large organizations",
          "Creating lasting impact",
        ],
        shadowSide: "May become overly focused on money and status, or abuse power for personal gain.",
        careerPath: "Executive, Business Owner, Investment Banker, Real Estate Developer, Corporate Leader",
        lovePath: "You need a partner who supports your ambitions while helping you stay connected to your heart.",
        spiritualPath: "Your spiritual growth comes through using your material success to serve higher purposes.",
        affirmation: "I use my power and resources to create abundance and opportunity for others.",
      },
      9: {
        purpose: "To serve humanity with wisdom and compassion, helping to heal and transform the world.",
        innerDrives: [
          "Serving the greater good",
          "Healing and transforming",
          "Teaching universal wisdom",
          "Completing important cycles",
        ],
        shadowSide:
          "May become overly idealistic, emotionally overwhelmed by world problems, or neglect personal needs.",
        careerPath: "Humanitarian, Healer, Teacher, Artist, Non-profit Leader, Global Activist",
        lovePath: "You seek a partner who shares your humanitarian values and supports your service to others.",
        spiritualPath:
          "Your spiritual path involves balancing service to others with self-care and personal fulfillment.",
        affirmation: "I serve the world with wisdom and compassion while honoring my own needs.",
      },
      11: {
        purpose: "To inspire and illuminate others through spiritual insight, intuition, and visionary leadership.",
        innerDrives: [
          "Inspiring spiritual awakening",
          "Channeling divine wisdom",
          "Illuminating truth for others",
          "Leading through inspiration",
        ],
        shadowSide:
          "Can become overwhelmed by psychic sensitivity, overly idealistic, or struggle with practical matters.",
        careerPath: "Spiritual Teacher, Intuitive Healer, Visionary Leader, Inspirational Speaker, Psychic",
        lovePath: "You need a spiritually aware partner who can ground your high sensitivity with practical love.",
        spiritualPath: "Your path involves learning to channel your spiritual gifts while staying grounded in reality.",
        affirmation: "I am a channel for divine light and wisdom, inspiring others to awaken to their truth.",
      },
      22: {
        purpose:
          "To manifest grand visions that benefit humanity through practical application of spiritual principles.",
        innerDrives: [
          "Building something monumental",
          "Combining vision with practicality",
          "Serving humanity on a large scale",
          "Creating lasting positive change",
        ],
        shadowSide: "May feel overwhelmed by the magnitude of their mission or become frustrated with slow progress.",
        careerPath: "Visionary Leader, Social Entrepreneur, Master Builder, Global Changemaker, Spiritual Architect",
        lovePath: "You need a partner who understands your mission and supports your grand vision for the future.",
        spiritualPath: "Your spiritual journey involves learning to trust divine timing while taking inspired action.",
        affirmation: "I am a master builder, creating lasting positive change for the benefit of all humanity.",
      },
    }

    return profiles[number] || profiles[1]
  }

  const profile = getFullSoulProfile(soulNumber)

  const handleDownloadPDF = () => {
    // Simulate PDF download
    const element = document.createElement("a")
    element.href = "data:text/plain;charset=utf-8," + encodeURIComponent("Your Soul Number Report - Coming Soon!")
    element.download = `${userData.fullName}-soul-number-report.txt`
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto mt-8"
    >
      <div className="bg-slate-800/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <img
              src="/placeholder.svg?height=64&width=64"
              alt="QuizzAstrology Logo"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="text-2xl font-bold text-white font-heading">QuizzAstrology.com</h3>
              <p className="text-white/70 font-body">Your Complete Soul Blueprint</p>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4 font-heading">
            {userData.fullName}'s Soul Number {soulNumber} Report
          </h1>

          <div className="flex items-center justify-center space-x-8 text-white/70 font-body">
            <span>Born: {userData.dateOfBirth}</span>
            <span>•</span>
            <span>{userData.countryOfBirth}</span>
          </div>
        </motion.div>

        {/* Soul Purpose */}
        <motion.section
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center mb-6">
            <Sparkles className="w-8 h-8 text-yellow-400 mr-3" />
            <h2 className="text-3xl font-bold text-white font-heading">Your Soul Purpose</h2>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <p className="text-xl text-white/90 leading-relaxed font-body">{profile.purpose}</p>
          </div>
        </motion.section>

        {/* Inner Drives */}
        <motion.section
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center mb-6">
            <Heart className="w-8 h-8 text-red-400 mr-3" />
            <h2 className="text-3xl font-bold text-white font-heading">Your Inner Drives</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {profile.innerDrives.map((drive: string, index: number) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <p className="text-white/90 font-body">• {drive}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Shadow Side */}
        <motion.section
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center mb-6">
            <Moon className="w-8 h-8 text-purple-400 mr-3" />
            <h2 className="text-3xl font-bold text-white font-heading">Shadow Side to Embrace</h2>
          </div>
          <div className="bg-purple-900/20 rounded-2xl p-6 border border-purple-400/20">
            <p className="text-white/90 leading-relaxed font-body">{profile.shadowSide}</p>
          </div>
        </motion.section>

        {/* Life Paths */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.0 }}>
            <div className="flex items-center mb-4">
              <Briefcase className="w-6 h-6 text-green-400 mr-2" />
              <h3 className="text-xl font-bold text-white font-heading">Career Path</h3>
            </div>
            <div className="bg-green-900/20 rounded-xl p-4 border border-green-400/20">
              <p className="text-white/90 font-body">{profile.careerPath}</p>
            </div>
          </motion.section>

          <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.1 }}>
            <div className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-pink-400 mr-2" />
              <h3 className="text-xl font-bold text-white font-heading">Love Path</h3>
            </div>
            <div className="bg-pink-900/20 rounded-xl p-4 border border-pink-400/20">
              <p className="text-white/90 font-body">{profile.lovePath}</p>
            </div>
          </motion.section>

          <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2 }}>
            <div className="flex items-center mb-4">
              <Sparkles className="w-6 h-6 text-yellow-400 mr-2" />
              <h3 className="text-xl font-bold text-white font-heading">Spiritual Path</h3>
            </div>
            <div className="bg-yellow-900/20 rounded-xl p-4 border border-yellow-400/20">
              <p className="text-white/90 font-body">{profile.spiritualPath}</p>
            </div>
          </motion.section>
        </div>

        {/* Personal Affirmation */}
        <motion.section
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-6 font-heading">Your Soul Affirmation</h2>
          <div className="bg-gradient-to-r from-red-400/20 to-orange-400/20 rounded-2xl p-8 border border-orange-400/30 text-center">
            <p className="text-2xl text-white font-semibold italic font-body">"{profile.affirmation}"</p>
          </div>
        </motion.section>

        {/* Quiz Answers Recap */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mb-12"
        >
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="flex items-center justify-between w-full p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 font-body"
          >
            <span className="text-white font-semibold">View Your Quiz Answers</span>
            {showAnswers ? (
              <ChevronUp className="w-5 h-5 text-white" />
            ) : (
              <ChevronDown className="w-5 h-5 text-white" />
            )}
          </button>

          {showAnswers && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10"
            >
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(quizAnswers).map(([questionId, answer]) => (
                  <div key={questionId} className="text-white/80 font-body">
                    <span className="text-yellow-400">Q{questionId}:</span> {String(answer)}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.section>

        {/* Download PDF */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mb-12 text-center"
        >
          <motion.button
            onClick={handleDownloadPDF}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-heading"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-6 h-6 mr-3" />
            Download PDF Report
          </motion.button>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 border border-purple-400/20">
            <h3 className="text-2xl font-bold text-white mb-4 font-heading">🔮 Want Your Complete Numerology Chart?</h3>
            <p className="text-white/80 mb-6 font-body">
              Discover your Life Path, Destiny, Expression numbers and more!
            </p>
            <motion.a
              href="#"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-heading"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Full Chart Reading
              <ExternalLink className="w-5 h-5 ml-2" />
            </motion.a>
          </div>
        </motion.section>
      </div>
    </motion.div>
  )
}

export default FullResult
