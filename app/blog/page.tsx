// page.tsx (Server Component with Metadata)
import { Metadata } from 'next'
import BlogPageComponent from '../../components/BlogPageComponent'

export const metadata: Metadata = {
  title: 'Astrology Blogs & Zodiac Guides – Quizz Astrology',
  description:
    'Read expert blogs on astrology, zodiac signs, tarot, and numerology. Get tips, insights, and guidance to understand yourself and your cosmic journey.',
  keywords:
    'astrology, numerology, tarot, spiritual guidance, mystical insights, ancient wisdom, love relationships, spiritual practice',
  openGraph: {
    title: 'Mystical Insights Blog | Ancient Wisdom & Spiritual Guidance',
    description:
      'Explore our collection of mystical insights covering astrology, numerology, tarot, love & relationships, and spiritual practices.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mystical Insights Blog | Ancient Wisdom & Spiritual Guidance',
    description:
      'Explore our collection of mystical insights covering astrology, numerology, tarot, love & relationships, and spiritual practices.',
  },
}

export default function BlogPage() {
  return <BlogPageComponent />
}
