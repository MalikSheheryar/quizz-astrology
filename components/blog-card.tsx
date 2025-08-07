"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import React, { memo } from 'react';

interface BlogCardProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    category: string;
  };
}

const BlogCard: React.FC<BlogCardProps> = memo(({ post }) => {
  return (
    <motion.article
      whileHover={{ 
        y: -12, 
        scale: 1.02,
      }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      className="group relative h-full gpu-accelerated"
    >
      {/* Glowing background effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-[#E67E22] via-[#8E44AD] to-[#E74C3C] rounded-2xl blur opacity-0 group-hover:opacity-60 transition duration-500"
        whileHover={{ scale: 1.02 }}
      />
      
      {/* Main card */}
      <div className="relative h-full bg-[#2C3E50]/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-[#8E44AD]/20 overflow-hidden">
        {/* Floating background pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-full h-full bg-gradient-to-br from-[#8E44AD] to-[#E67E22] rounded-full"
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-sm text-[#ECF0F1]/60">
              <motion.div
                animate={{ y: [-1, 1, -1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Calendar className="w-4 h-4 mr-2" />
              </motion.div>
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <Clock className="w-4 h-4 text-[#ECF0F1]/40" />
          </div>
          
          <span className="inline-block w-fit px-3 py-1 bg-[#E67E22]/20 text-[#E67E22] text-xs font-semibold rounded-full border border-[#E67E22]/30 mb-4">
            {post.category}
          </span>
          
          <h3 className="text-2xl font-heading font-bold mb-4 text-[#ECF0F1] group-hover:text-[#E67E22] transition-colors duration-300 flex-grow">
            {post.title}
          </h3>
          
          <p className="text-[#ECF0F1]/80 mb-8 leading-relaxed flex-grow">
            {post.excerpt}
          </p>
          
          <Link
            href={`/blog/${post.id}`}
            className="inline-flex items-center text-[#E67E22] hover:text-[#E74C3C] font-semibold transition-all duration-300 group/link mt-auto"
          >
            <span className="mr-2">Read More</span>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Link>
        </div>
        
        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E67E22] via-[#8E44AD] to-[#E74C3C]" />
      </div>
    </motion.article>
  );
});

BlogCard.displayName = 'BlogCard';

export default BlogCard;
