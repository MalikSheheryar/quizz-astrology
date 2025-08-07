"use client"

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, Heart, Hash, Moon, Sun, Sparkles } from 'lucide-react';
import QuizCard from '@/components/quiz-card';
import { FloatingElements } from '@/components/floating-elements';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;

  const categoryData = {
    astrology: {
      title: 'Astrology Quizzes',
      description: 'Discover your cosmic personality and celestial influences through the ancient wisdom of the stars',
      icon: Star,
      gradient: 'from-purple-600 via-indigo-600 to-blue-600',
      darkGradient: 'dark:from-purple-800 dark:via-indigo-800 dark:to-blue-800',
      quizzes: [
        { id: 1, title: "What's Your Zodiac Personality?", category: "Astrology", icon: Star, description: "Discover your true astrological nature and hidden cosmic traits" },
        { id: 6, title: "Your Moon Sign Revealed", category: "Astrology", icon: Moon, description: "Uncover your emotional and intuitive side through lunar astrology" }
      ]
    },
    love: {
      title: 'Love & Emotions',
      description: 'Explore matters of the heart and discover your romantic destiny through cosmic guidance',
      icon: Heart,
      gradient: 'from-pink-500 via-rose-500 to-red-500',
      darkGradient: 'dark:from-pink-700 dark:via-rose-700 dark:to-red-700',
      quizzes: [
        { id: 2, title: "Love Compatibility Test", category: "Love", icon: Heart, description: "Find your perfect romantic match through cosmic alignment" },
        { id: 7, title: "Your Love Language Quiz", category: "Love", icon: Heart, description: "Discover how you express and receive love most naturally" }
      ]
    },
    numerology: {
      title: 'Numerology',
      description: 'Unlock the sacred power of numbers and discover your divine life path',
      icon: Hash,
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      darkGradient: 'dark:from-emerald-700 dark:via-teal-700 dark:to-cyan-700',
      quizzes: [
        { id: 3, title: "Your Life Path Number", category: "Numerology", icon: Hash, description: "Uncover your destiny and purpose through sacred numbers" },
        { id: 8, title: "Personal Year Number", category: "Numerology", icon: Hash, description: "Discover what this year holds for your personal growth" }
      ]
    },
    tarot: {
      title: 'Tarot Readings',
      description: 'Divine wisdom through ancient card symbolism and mystical insights',
      icon: Moon,
      gradient: 'from-indigo-600 via-purple-600 to-violet-600',
      darkGradient: 'dark:from-indigo-800 dark:via-purple-800 dark:to-violet-800',
      quizzes: [
        { id: 4, title: "Daily Tarot Reading", category: "Tarot", icon: Moon, description: "Get insights and guidance for today's journey ahead" },
        { id: 9, title: "Your Tarot Birth Card", category: "Tarot", icon: Moon, description: "Find your personal tarot card and its deep meaning" }
      ]
    },
    spiritual: {
      title: 'Spiritual Guidance',
      description: 'Connect with your higher self and embark on a transformative spiritual journey',
      icon: Sun,
      gradient: 'from-yellow-500 via-orange-500 to-red-500',
      darkGradient: 'dark:from-yellow-600 dark:via-orange-600 dark:to-red-600',
      quizzes: [
        { id: 5, title: "Spiritual Awakening Level", category: "Spiritual", icon: Sun, description: "Measure your current level of spiritual consciousness" },
        { id: 10, title: "Your Spirit Animal Guide", category: "Spiritual", icon: Sun, description: "Discover which animal spirit guides your path" }
      ]
    },
    compatibility: {
      title: 'Couple Compatibility',
      description: 'Test your romantic and spiritual connections through cosmic alignment',
      icon: Sparkles,
      gradient: 'from-pink-500 via-purple-500 to-indigo-500',
      darkGradient: 'dark:from-pink-700 dark:via-purple-700 dark:to-indigo-700',
      quizzes: [
        { id: 11, title: "Zodiac Compatibility Test", category: "Compatibility", icon: Sparkles, description: "See how your signs align for lasting love" },
        { id: 12, title: "Soul Mate Connection Quiz", category: "Compatibility", icon: Sparkles, description: "Discover if you've found your spiritual life partner" }
      ]
    }
  };

  const currentCategory = categoryData[category as keyof typeof categoryData] || categoryData.astrology;
  const Icon = currentCategory.icon;

  return (
    <div className="min-h-screen relative">
      <FloatingElements />
      
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-16 overflow-hidden"
        >
          <div className={`bg-gradient-to-br ${currentCategory.gradient} ${currentCategory.darkGradient} rounded-3xl p-12 text-center shadow-2xl`}>
            <div className="absolute inset-0 bg-black/20 dark:bg-black/40 rounded-3xl" />
            
            {/* Floating background elements */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white/10 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 20 + 10}px`,
                    height: `${Math.random() * 20 + 10}px`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                className="mb-8"
              >
                <div className="relative inline-block">
                  <Icon className="w-20 h-20 mx-auto text-white drop-shadow-2xl float-animation" />
                  <motion.div
                    className="absolute -inset-4 bg-white/20 rounded-full blur-xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-2xl"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {currentCategory.title}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
              >
                {currentCategory.description}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Quizzes Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Available Quizzes
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {currentCategory.quizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                variants={itemVariants}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <QuizCard quiz={quiz} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-12 text-center shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5 dark:opacity-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"
              />
            </div>
            
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Sparkles className="w-16 h-16 mx-auto text-purple-500 dark:text-purple-400 float-animation" />
            </motion.div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-6 gradient-text" style={{ fontFamily: 'Playfair Display, serif' }}>
              More Quizzes Coming Soon!
            </h3>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              We're constantly adding new quizzes to help you explore your spiritual journey. 
              Check back regularly for fresh insights and cosmic discoveries.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 hover:from-purple-700 hover:via-pink-600 hover:to-indigo-700 text-white font-semibold rounded-full transition-all duration-300 shadow-xl"
            >
              Notify Me
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
