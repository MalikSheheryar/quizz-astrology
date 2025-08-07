"use client"

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Share2, Heart } from 'lucide-react';
import { FloatingElements } from '@/components/floating-elements';

export default function BlogPost() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const blogPosts = {
    1: {
      title: "Mercury Retrograde: What It Really Means",
      content: `
        <p>Mercury retrograde has become one of the most talked-about astrological phenomena in modern times, often blamed for everything from technology failures to communication mishaps. But what does this cosmic event really mean, and how can we work with its energy instead of against it?</p>
        
        <h2>Understanding Mercury Retrograde</h2>
        <p>Mercury retrograde occurs when the planet Mercury appears to move backward in its orbit from Earth's perspective. This optical illusion happens three to four times per year, lasting about three weeks each time. During these periods, the areas of life ruled by Mercury - communication, technology, travel, and contracts - may experience disruptions or delays.</p>
        
        <h2>The Spiritual Significance</h2>
        <p>Rather than viewing Mercury retrograde as a time of chaos, ancient astrologers saw it as a period of reflection and review. The prefix "re-" appears frequently during these times: review, revise, reconnect, and restore. It's an invitation to slow down and pay attention to details we might normally overlook.</p>
        
        <h2>How to Navigate Mercury Retrograde</h2>
        <ul>
          <li><strong>Double-check everything:</strong> Read emails twice, confirm appointments, and backup important files</li>
          <li><strong>Practice patience:</strong> Delays and miscommunications are more likely, so build extra time into your schedule</li>
          <li><strong>Reflect and review:</strong> Use this time for introspection and revisiting old projects or relationships</li>
          <li><strong>Avoid major purchases:</strong> Especially electronics and vehicles, which may have hidden problems</li>
        </ul>
        
        <h2>The Silver Lining</h2>
        <p>Mercury retrograde isn't all challenges. This period often brings unexpected reunions, second chances, and opportunities to fix what's been broken. Old friends may reach out, lost items resurface, and solutions to long-standing problems become clear.</p>
        
        <p>Remember, Mercury retrograde is a natural cosmic rhythm that's been occurring for millennia. By understanding its energy and working with it consciously, we can transform potential frustrations into opportunities for growth and deeper understanding.</p>
      `,
      date: "2024-01-15",
      category: "Astrology",
      author: "Luna Starweaver",
      readTime: "5 min read",
      excerpt: "Understanding the cosmic influence on communication and technology during Mercury's backward dance through the zodiac..."
    },
    2: {
      title: "Finding Love Through Numerology",
      content: `
        <p>Love is one of life's greatest mysteries, but numerology offers fascinating insights into romantic compatibility and the path to finding your soulmate. By understanding the numerical vibrations that influence your love life, you can make more conscious choices in relationships.</p>
        
        <h2>Your Love Number</h2>
        <p>Your love number is calculated by reducing your birth date to a single digit. This number reveals your romantic nature, what you need in a partner, and how you express love. Each number from 1-9 has distinct characteristics in love:</p>
        
        <ul>
          <li><strong>1:</strong> Independent lovers who need partners who respect their autonomy</li>
          <li><strong>2:</strong> Cooperative and nurturing, seeking harmony and partnership</li>
          <li><strong>3:</strong> Creative and expressive, needing fun and communication in love</li>
          <li><strong>4:</strong> Stable and loyal, valuing commitment and security</li>
          <li><strong>5:</strong> Freedom-loving and adventurous, requiring variety and excitement</li>
        </ul>
        
        <h2>Compatibility Through Numbers</h2>
        <p>Numerological compatibility isn't just about matching numbers - it's about understanding how different numerical energies complement or challenge each other. Some numbers naturally harmonize, while others create dynamic tension that can lead to growth.</p>
        
        <h2>Finding Your Soulmate</h2>
        <p>Your soulmate's number often appears in significant dates, addresses, or even their birth date. Pay attention to recurring numbers in your life - they may be pointing you toward your destined partner. The universe often uses numerical synchronicities to guide us toward meaningful connections.</p>
        
        <h2>Timing in Love</h2>
        <p>Numerology also reveals the best times for love. Your personal year number influences your romantic opportunities, while certain universal years are more favorable for finding lasting love. Understanding these cycles helps you align with the natural flow of romantic energy.</p>
      `,
      date: "2024-01-12",
      category: "Love & Numerology",
      author: "Marcus Numeris",
      readTime: "7 min read",
      excerpt: "How your birth numbers can guide you to your soulmate and create lasting romantic connections through ancient wisdom..."
    },
    3: {
      title: "Tarot Cards for Beginners: A Complete Guide",
      content: `
        <p>Tarot cards have been used for centuries as a tool for divination, self-reflection, and spiritual guidance. If you're new to tarot, this comprehensive guide will help you begin your journey with confidence and understanding.</p>
        
        <h2>Understanding the Tarot Deck</h2>
        <p>A traditional tarot deck contains 78 cards divided into two main sections: the Major Arcana (22 cards) and the Minor Arcana (56 cards). The Major Arcana represents major life themes and spiritual lessons, while the Minor Arcana deals with everyday situations and emotions.</p>
        
        <h2>Choosing Your First Deck</h2>
        <p>The Rider-Waite-Smith deck is recommended for beginners due to its clear imagery and extensive resources. However, the most important factor is choosing a deck that resonates with you visually and emotionally. Trust your intuition when selecting your cards.</p>
        
        <h2>Basic Card Meanings</h2>
        <p>Start by learning the basic meanings of the Major Arcana cards:</p>
        <ul>
          <li><strong>The Fool:</strong> New beginnings, innocence, spontaneity</li>
          <li><strong>The Magician:</strong> Manifestation, resourcefulness, power</li>
          <li><strong>The High Priestess:</strong> Intuition, sacred knowledge, divine feminine</li>
          <li><strong>The Empress:</strong> Fertility, femininity, beauty, nature</li>
        </ul>
        
        <h2>Simple Spreads for Beginners</h2>
        <p>Start with simple one-card daily draws to build your connection with the cards. Progress to three-card spreads representing past, present, and future, or situation, action, and outcome. These basic spreads provide valuable insights without overwhelming complexity.</p>
        
        <h2>Developing Your Intuition</h2>
        <p>While learning traditional meanings is important, developing your intuitive connection with the cards is equally valuable. Pay attention to your first impressions, the emotions the cards evoke, and any symbols that stand out to you. Your personal relationship with the cards will deepen with practice.</p>
      `,
      date: "2024-01-10",
      category: "Tarot",
      author: "Mystic Rose",
      readTime: "10 min read",
      excerpt: "Start your tarot journey with these essential tips and card meanings..."
    }
  };

  const post = blogPosts[id as keyof typeof blogPosts] || blogPosts[1];

  return (
    <div className="min-h-screen relative">
      <FloatingElements />
      
      <div className="max-w-5xl mx-auto px-4 py-12 relative z-10">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ x: -5, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/blog')}
          className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-12 transition-all duration-300 font-semibold"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Blog
        </motion.button>

        {/* Article */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden"
        >
          <div className="p-12">
            <div className="mb-8">
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold rounded-full shadow-lg mb-6"
              >
                {post.category}
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 leading-tight"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {post.title}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                {post.excerpt}
              </motion.p>
            </div>

            {/* Article Meta */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap items-center gap-6 mb-12 pb-8 border-b border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <User className="w-5 h-5 mr-2" />
                <span className="font-semibold">{post.author}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Clock className="w-5 h-5 mr-2" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-4 ml-auto">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                >
                  <Heart className="w-5 h-5 mr-1" />
                  <span>Like</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                >
                  <Share2 className="w-5 h-5 mr-1" />
                  <span>Share</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Article Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="prose prose-lg prose-purple dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
          
          {/* Bottom gradient line */}
          <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        </motion.article>

        {/* Related Articles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 dark:border-gray-700/30"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            Continue Your Spiritual Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl border border-purple-200/50 dark:border-purple-700/50"
            >
              <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-4">Take Our Quizzes</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Discover more about yourself through our spiritual quizzes</p>
              <motion.button 
                whileHover={{ x: 5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/')}
                className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-all duration-300"
              >
                Explore Quizzes
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl border border-indigo-200/50 dark:border-indigo-700/50"
            >
              <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-4">Get Personal Reading</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Ready for deeper insights and personalized guidance?</p>
              <motion.button 
                whileHover={{ x: 5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition-all duration-300"
              >
                Book Reading
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
