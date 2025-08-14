'use client'
import React, { useState, memo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Star,
  Heart,
  Hash,
  Moon,
  Sun,
  Sparkles,
  BookOpen,
  Crown,
} from 'lucide-react'

const Navbar = memo(() => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const categories = [
    { name: 'Astrology', path: '/category/astrology', icon: Star },
    { name: 'Love & Emotions', path: '/category/love', icon: Heart },
    { name: 'Numerology', path: '/category/numerology', icon: Hash },
    { name: 'Tarot Readings', path: '/category/tarot', icon: Moon },
    { name: 'Spiritual Guidance', path: '/category/spiritual', icon: Sun },
    {
      name: 'Couple Compatibility',
      path: '/category/compatibility',
      icon: Sparkles,
    },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.1 }}
      className="sticky top-0 z-50 bg-[#2C3E50]/95 backdrop-blur-xl border-b border-[#8E44AD]/30 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
              className="relative p-3 bg-gradient-to-br from-[#8E44AD] to-[#E67E22] rounded-xl shadow-lg"
            >
              <Sparkles className="w-7 h-7 text-white" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#8E44AD]/50 to-[#E67E22]/50 rounded-xl blur-md opacity-0 group-hover:opacity-70"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl font-heading font-bold galaxy-text-gradient"
            >
              Quizz Astrology
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-semibold transition-all duration-300 hover:scale-105 ${
                isActive('/')
                  ? 'text-[#E67E22]'
                  : 'text-[#ECF0F1] hover:text-[#E67E22]'
              }`}
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="font-semibold text-[#ECF0F1] hover:text-[#E67E22] transition-all duration-300 flex items-center"
              >
                Quizzes
                <motion.svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </motion.button>
              {/* Fixed dropdown - no gap, instant appearance */}
              <div className="absolute top-full left-0 w-72 bg-[#2C3E50]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#8E44AD]/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-none z-50">
                <div className="p-4">
                  {categories.map((category) => {
                    const Icon = category.icon
                    return (
                      <Link
                        key={category.path}
                        href={category.path}
                        className="flex items-center px-4 py-3 text-[#ECF0F1] hover:bg-[#8E44AD]/20 hover:text-[#E67E22] rounded-xl transition-all duration-200 group/item"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="mr-3 p-2 bg-gradient-to-br from-[#8E44AD] to-[#E67E22] rounded-lg"
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </motion.div>
                        {category.name}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Premium Quizzes Link */}
            <Link
              href="/premium"
              className={`font-semibold transition-all duration-300 flex items-center hover:scale-105 relative ${
                isActive('/premium')
                  ? 'text-[#FFD700]'
                  : 'text-[#ECF0F1] hover:text-[#FFD700]'
              }`}
            >
              <Crown className="w-4 h-4 mr-2" />
              <span className="relative">
                PREMIUM QUIZZES
                <motion.div
                  className="absolute -top-5 -right-7 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-2 py-1 rounded-full font-bold"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  NEW
                </motion.div>
              </span>
            </Link>

            <Link
              href="/blog"
              className={`font-semibold transition-all duration-300 flex items-center hover:scale-105 ${
                isActive('/blog')
                  ? 'text-[#E67E22]'
                  : 'text-[#ECF0F1] hover:text-[#E67E22]'
              }`}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Blog
            </Link>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(231, 76, 60, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[#E74C3C] hover:bg-[#C0392B] text-white font-semibold rounded-full transition-all duration-300 shadow-lg"
            >
              Get Reading
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-[#ECF0F1] hover:bg-[#8E44AD]/20 transition-colors duration-200"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#2C3E50]/95 backdrop-blur-xl border-t border-[#8E44AD]/30"
          >
            <div className="px-4 py-6 space-y-4">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`block py-3 font-semibold transition-colors duration-200 ${
                  isActive('/') ? 'text-[#E67E22]' : 'text-[#ECF0F1]'
                }`}
              >
                Home
              </Link>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-[#ECF0F1]/60 uppercase tracking-wider">
                  Categories
                </p>
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Link
                      key={category.path}
                      href={category.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center py-3 text-[#ECF0F1] hover:text-[#E67E22] transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {category.name}
                    </Link>
                  )
                })}
              </div>

              {/* Premium Quizzes Mobile */}
              <Link
                href="/premium"
                onClick={() => setIsOpen(false)}
                className={`flex items-center py-3 font-semibold transition-colors duration-200 ${
                  isActive('/premium') ? 'text-[#FFD700]' : 'text-[#ECF0F1]'
                }`}
              >
                <Crown className="w-4 h-4 mr-3" />
                <span className="relative">
                  PREMIUM QUIZZES
                  <span className="ml-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                    NEW
                  </span>
                </span>
              </Link>

              <Link
                href="/blog"
                onClick={() => setIsOpen(false)}
                className={`flex items-center py-3 font-semibold transition-colors duration-200 ${
                  isActive('/blog') ? 'text-[#E67E22]' : 'text-[#ECF0F1]'
                }`}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Blog
              </Link>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#E74C3C] hover:bg-[#C0392B] text-white py-4 rounded-xl font-semibold mt-6 shadow-lg"
              >
                Get Reading
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
})

Navbar.displayName = 'Navbar'
export default Navbar
