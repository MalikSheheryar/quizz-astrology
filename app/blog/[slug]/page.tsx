'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic' // Import dynamic for client-side loading
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Share2,
  Heart,
} from 'lucide-react'
import { FloatingElements } from '@/components/floating-elements'
import CustomPortableText from '@/components/portable-text'
import { client } from '@/lib/client' // Corrected import path
import { BLOG_POST_BY_SLUG_QUERY } from '@/lib/queries' // Corrected import path and query
import { BlogPost } from '@/types/blog'

// Dynamically import animated elements to avoid framer-motion bundling issues
const MotionDiv = dynamic(
  () => import('@/components/animated-elements').then((mod) => mod.MotionDiv),
  { ssr: false }
)
const MotionH1 = dynamic(
  () => import('@/components/animated-elements').then((mod) => mod.MotionH1),
  { ssr: false }
)
const MotionP = dynamic(
  () => import('@/components/animated-elements').then((mod) => mod.MotionP),
  { ssr: false }
)
const MotionSpan = dynamic(
  () => import('@/components/animated-elements').then((mod) => mod.MotionSpan),
  { ssr: false }
)
const MotionButton = dynamic(
  () =>
    import('@/components/animated-elements').then((mod) => mod.MotionButton),
  { ssr: false }
)
const MotionArticle = dynamic(
  () =>
    import('@/components/animated-elements').then((mod) => mod.MotionArticle),
  { ssr: false }
)

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string // Use slug from params
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Use BLOG_POST_BY_SLUG_QUERY and slug
        const fetchedPost = await client.fetch(BLOG_POST_BY_SLUG_QUERY, {
          slug,
        })
        setPost(fetchedPost)
      } catch (error) {
        console.error('Error fetching blog post:', error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchPost()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <FloatingElements />
        <div className="text-center">
          <MotionDiv
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Loading mystical wisdom...
          </p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <FloatingElements />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Blog post not found
          </h1>
          <button
            onClick={() => router.push('/blog')}
            className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Removed Head component as it's for Server Components in App Router */}
      <div className="min-h-screen relative">
        <FloatingElements />

        <div className="max-w-5xl mx-auto px-4 py-12 relative z-10">
          {/* Back Button */}
          <MotionButton
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
          </MotionButton>

          {/* Article */}
          <MotionArticle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden"
          >
            <div className="p-12">
              <div className="mb-8">
                <MotionSpan
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold rounded-full shadow-lg mb-6"
                >
                  {post.category}
                </MotionSpan>

                <MotionH1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 leading-tight"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {post.title}
                </MotionH1>

                <MotionP
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  {post.excerpt}
                </MotionP>
              </div>

              {/* Article Meta */}
              <MotionDiv
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
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-4 ml-auto">
                  <MotionButton
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                  >
                    <Heart className="w-5 h-5 mr-1" />
                    <span>Like</span>
                  </MotionButton>
                  <MotionButton
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                  >
                    <Share2 className="w-5 h-5 mr-1" />
                    <span>Share</span>
                  </MotionButton>
                </div>
              </MotionDiv>

              {/* Article Content */}
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="prose prose-lg prose-purple dark:prose-invert max-w-none"
              >
                <CustomPortableText value={post.content} />
              </MotionDiv>
            </div>

            {/* Bottom gradient line */}
            <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          </MotionArticle>

          {/* Related Articles */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 dark:border-gray-700/30"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Continue Your Spiritual Journey
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl border border-purple-200/50 dark:border-purple-700/50"
              >
                <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-4">
                  Take Our Quizzes
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Discover more about yourself through our spiritual quizzes
                </p>
                <button
                  onClick={() => router.push('/')}
                  className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-all duration-300"
                >
                  Explore Quizzes
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </MotionDiv>
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl border border-indigo-200/50 dark:border-indigo-700/50"
              >
                <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-4">
                  Get Personal Reading
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Ready for deeper insights and personalized guidance?
                </p>
                <button className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition-all duration-300">
                  Book Reading
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </MotionDiv>
            </div>
          </MotionDiv>
        </div>
      </div>
    </>
  )
}
