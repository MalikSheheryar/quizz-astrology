"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import React, { memo } from 'react';

interface QuizCardProps {
  quiz: {
    id: number;
    title: string;
    category: string;
    icon: React.ElementType;
    description: string;
  };
}

const QuizCard: React.FC<QuizCardProps> = memo(({ quiz }) => {
  const Icon = quiz.icon;
  
  return (
    <motion.div
      whileHover={{ 
        y: -12, 
        scale: 1.02,
      }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      className="group relative h-full gpu-accelerated"
    >
      {/* Glowing background effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-[#8E44AD] via-[#E67E22] to-[#E74C3C] rounded-2xl blur opacity-0 group-hover:opacity-60 transition duration-500"
        whileHover={{ scale: 1.02 }}
      />
      
      {/* Main card */}
      <div className="relative h-full bg-[#2C3E50]/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-[#8E44AD]/20 overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute top-4 right-4 opacity-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <Icon className="w-24 h-24 text-[#8E44AD]" />
          </motion.div>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <motion.div
              className="relative p-4 bg-gradient-to-br from-[#8E44AD] to-[#E67E22] rounded-xl shadow-lg mr-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Icon className="w-8 h-8 text-white" />
              </motion.div>
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#8E44AD]/50 to-[#E67E22]/50 rounded-xl blur-md opacity-0 group-hover:opacity-70"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            
            <span className="px-4 py-2 bg-[#8E44AD]/20 text-[#ECF0F1] text-sm font-semibold rounded-full border border-[#8E44AD]/30">
              {quiz.category}
            </span>
          </div>
          
          <h3 className="text-2xl font-heading font-bold mb-4 text-[#ECF0F1] group-hover:text-[#E67E22] transition-colors duration-300">
            {quiz.title}
          </h3>
          
          <p className="text-[#ECF0F1]/80 mb-8 leading-relaxed">
            {quiz.description}
          </p>
          
          <Link
            href={`/quiz/${quiz.id}`}
            className="inline-flex items-center text-[#E67E22] hover:text-[#E74C3C] font-semibold transition-all duration-300 group/link"
          >
            <span className="mr-2">Take Quiz</span>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Link>
        </div>
        
        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8E44AD] via-[#E67E22] to-[#E74C3C]" />
      </div>
    </motion.div>
  );
});

QuizCard.displayName = 'QuizCard';

export default QuizCard;
