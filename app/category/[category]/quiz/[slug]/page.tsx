import { getQuizBySlug, localQuizzes } from '@/utils/localQuizData'
import type { Metadata } from 'next'
import QuizRenderer from '@/components/QuizRenderer'

const quizSeoData: {
  [key: string]: { title: string; description: string; keywords: string[] }
} = {
  'elemental-dominance-quiz': {
    title: 'Elemental Dominance Quiz – Discover Your Astrological Element',
    description:
      'Find out which element rules your zodiac chart and shapes your personality, decisions, and life path in this fun and insightful astrology quiz.',
    keywords: [
      'elemental dominance',
      'astrology elements',
      'fire water earth air',
      'personality quiz',
      'astrological elements',
      'QuizzAstrology',
    ],
  },
  'planetary-influence-quiz': {
    title: 'Planetary Influence Quiz – Which Planet Guides You?',
    description:
      'Discover the planet with the strongest influence on your decisions, emotions, and destiny. Unlock deep insights into your astrological personality.',
    keywords: [
      'planetary influence',
      'astrology planets',
      'cosmic influence',
      'decision making',
      'planetary personality',
      'QuizzAstrology',
    ],
  },
  'rising-sign-quiz': {
    title: 'Rising Sign Quiz – Reveal How Others See You',
    description:
      'Discover your true rising sign with personality-based questions that reveal first impressions and how others perceive your energy.',
    keywords: [
      'rising sign quiz',
      'ascendant sign',
      'personality astrology',
      'first impressions',
      'rising sign calculator',
      'QuizzAstrology',
    ],
  },
  'zodiac-compatibility-quiz': {
    title: 'Compatibility Quiz – Find Your Perfect Match',
    description:
      'Find out which zodiac signs are most and least compatible with you in love and friendship based on your personality and relationship style.',
    keywords: [
      'zodiac compatibility',
      'astrology compatibility',
      'relationship astrology',
      'zodiac avoid',
      'love compatibility',
      'QuizzAstrology',
    ],
  },
  'intuition-score-quiz': {
    title: 'Intuition Score Quiz – Unlock Your Inner Wisdom',
    description:
      'Discover your mystical connection to intuition and gain personalized guidance to strengthen your spiritual awareness and decision-making abilities.',
    keywords: [
      'intuition quiz',
      'psychic abilities',
      'spiritual guidance',
      'inner wisdom',
      'mystical connection',
      'QuizzAstrology',
    ],
  },
  'chakra-blocked-quiz': {
    title: 'Chakra Blocked Quiz – Identify & Heal Energy Blocks',
    description:
      'Find out which chakra is blocked and learn how to restore balance through personalized healing practices and emotional insights.',
    keywords: [
      'chakra quiz',
      'blocked chakra',
      'energy healing',
      'spiritual healing',
      'chakra alignment',
      'QuizzAstrology',
    ],
  },
  'twin-flame-karmic-quiz': {
    title: 'Twin Flame vs Karmic Quiz – Discover Your True Connection',
    description:
      'Find out if your partner is your Twin Flame or a Karmic lesson. Reveal the cosmic purpose of your relationship through this deep spiritual quiz.',
    keywords: [
      'twin flame quiz',
      'karmic relationship',
      'soulmate connection',
      'spiritual love',
      'relationship purpose',
      'QuizzAstrology',
    ],
  },
  'zodiac-soulmate-quiz': {
    title: ' Zodiac Soulmate Quiz – Find Your Perfect Match',
    description:
      'Discover which zodiac sign is your ideal soulmate. Get deep astrological insights and find your true cosmic match with this fun and accurate quiz.',
    keywords: [
      'zodiac soulmate',
      'astrology compatibility',
      'perfect match',
      'love astrology',
      'cosmic connection',
      'QuizzAstrology',
    ],
  },
  'love-compatibility-score-quiz': {
    title: 'Love Compatibility Score Quiz – Your Relationship Rating',
    description:
      'Get your personalized love score based on emotional and astrological analysis. See how compatible you are with your crush or partner.',
    keywords: [
      'love compatibility',
      'compatibility score',
      'crush analysis',
      'relationship astrology',
      'cosmic love match',
      'QuizzAstrology',
    ],
  },
  'love-prophecy-timing-quiz': {
    title: 'Love Prophecy Quiz – When Will You Find Love?',
    description:
      'Discover when and how you’ll meet your next great love. Let the stars reveal your romantic destiny with this astrology-based love prediction quiz.',
    keywords: [
      'love prophecy',
      'soulmate timing',
      'romantic destiny',
      'love prediction',
      'astrological timing',
      'QuizzAstrology',
    ],
  },
  'couple-vibe-birthday-quiz': {
    title: ' Couple Vibe Birthday Quiz – Discover Your Love Archetype',
    description:
      'Find your unique couple archetype through astrology and numerology based on birthdays. Uncover relationship dynamics and cosmic compatibility.',
    keywords: [
      'couple compatibility',
      'birthday astrology',
      'relationship vibe',
      'cosmic connection',
      'numerology compatibility',
      'QuizzAstrology',
    ],
  },
  'soul-contract-quiz': {
    title: 'Soul Contract Quiz – Are You Past Life Lovers?',
    description:
      'Discover the spiritual truth of your connection. Find out if you and your partner share a soul contract or past life bond',
    keywords: [
      'soul contracts',
      'past life lovers',
      'spiritual connection',
      'karmic relationships',
      'sacred bonds',
      'QuizzAstrology',
    ],
  },
  'soul-number-quiz': {
    title: 'Soul Number Quiz – Reveal Your Life Purpose',
    description:
      'Discover your soul’s deepest purpose and hidden traits through the power of numerology in this insightful personality quiz.',
    keywords: [
      'soul number',
      'numerology quiz',
      'life purpose',
      'spiritual numerology',
      'soul mission',
      'QuizzAstrology',
    ],
  },
  'luckiest-year-quiz': {
    title: 'Luckiest Year Quiz – Find Your Year of Fortune',
    description:
      'Learn which year will bring you the most luck, success, and opportunities using numerology and cosmic insights.',
    keywords: [
      'luckiest year',
      'fortune prediction',
      'numerology luck',
      'cosmic timing',
      'lucky periods',
      'QuizzAstrology',
    ],
  },
  'soul-mission-quiz': {
    title: 'Soul Mission Quiz – Discover Your Sacred Path',
    description:
      'Find your divine life mission and spiritual calling based on your birth date and cosmic numerology analysis.',
    keywords: [
      'soul mission',
      'life purpose',
      'divine calling',
      'spiritual path',
      'cosmic blueprint',
      'QuizzAstrology',
    ],
  },
  'financial-destiny-quiz': {
    title: 'Financial Destiny Quiz – Uncover Your Wealth Path',
    description:
      'Reveal your financial potential and money-making strengths using ancient numerology wisdom and financial astrology.',
    keywords: [
      'financial destiny',
      'wealth potential',
      'money magnetism',
      'abundance numerology',
      'prosperity astrology',
      'QuizzAstrology',
    ],
  },
  'astro-compatibility-quiz': {
    title: 'Astro Compatibility Quiz – Are You Star-Matched?',
    description:
      'Explore your cosmic connection through astrology. See if you and your partner are truly astro-compatible with a deep relationship analysis.',
    keywords: [
      'astro compatibility',
      'cosmic connection',
      'relationship astrology',
      'zodiac compatibility',
      'love match astrology',
      'QuizzAstrology',
    ],
  },
  'never-date-quiz': {
    title: ' Never Date Quiz – Avoid Your Worst Zodiac Match',
    description:
      'Discover the zodiac signs you should avoid for love and friendship. Learn your relationship red flags through astrology and psychology.',
    keywords: [
      'dating red flags',
      'zodiac incompatibility',
      'relationship warnings',
      'astrology dating',
      'compatibility analysis',
      'QuizzAstrology',
    ],
  },
  'tarot-destiny-quiz': {
    title: 'Tarot Card Reading Quiz – Reveal Your Future',
    description:
      'Choose a tarot card and uncover messages for your love, career, and spiritual journey. Discover what destiny has in store for you today.',
    keywords: [
      'tarot reading',
      'future prediction',
      'mystical guidance',
      'destiny reveal',
      'tarot cards',
      'QuizzAstrology',
    ],
  },
  'cosmic-guidance-quiz': {
    title: ' Cosmic Guidance Quiz – Unlock Your Spiritual Path',
    description:
      'Receive divine messages from the universe. Connect with celestial energies to discover your life purpose and highest potential.',
    keywords: [
      'cosmic guidance',
      'spiritual awakening',
      'divine messages',
      'universe connection',
      'celestial energy',
      'QuizzAstrology',
    ],
  },
  'psychic-awakening-quiz': {
    title: 'Psychic Awakening Quiz – Discover Your Hidden Gifts',
    description:
      'Unlock your psychic abilities and intuitive potential. Explore clairvoyance, telepathy, and other supernatural talents waiting to be awakened.',
    keywords: [
      'psychic abilities',
      'intuitive awakening',
      'supernatural gifts',
      'clairvoyance',
      'spiritual development',
      'QuizzAstrology',
    ],
  },
  'monthly-tarot-quiz': {
    title: 'Monthly Tarot Reading – Your Personalized Forecast',
    description:
      'Get your tarot card reading for the month ahead. Receive detailed insights about love, career, and personal growth with cosmic guidance.',
    keywords: [
      'monthly tarot',
      'tarot guidance',
      'personalized reading',
      'cosmic insights',
      'monthly forecast',
      'QuizzAstrology',
    ],
  },
  'fortune-teller-quiz': {
    title: 'Premium Fortune Teller Quiz – Crystal Ball Reading',
    description:
      'Experience an exclusive crystal ball reading with mystical fortune telling. Gain profound insights into your destiny, future, and hidden truths.',
    keywords: [
      'crystal ball reading',
      'fortune telling',
      'mystical insights',
      'destiny reading',
      'premium fortune',
      'QuizzAstrology',
    ],
  },
  'eclipse-portal-quiz': {
    title: 'Eclipse Portal Reading – Discover Your Cosmic Destiny',
    description:
      'Step through the lunar eclipse portal to unlock celestial secrets, spiritual wisdom, and transformative guidance from the universe.',
    keywords: [
      'eclipse portal',
      'cosmic destiny',
      'lunar guidance',
      'celestial secrets',
      'transformative reading',
      'QuizzAstrology',
    ],
  },
}

// Generate static paths for all quizzes
export async function generateStaticParams() {
  return localQuizzes.map((quiz) => ({
    category: quiz.category,
    slug: quiz.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string }
}): Promise<Metadata> {
  // Check for SEO data first
  const seoData = quizSeoData[params.slug]
  if (seoData) {
    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
    }
  }

  // Fallback: Find quiz by slug
  const quiz = getQuizBySlug(params.slug)
  if (!quiz) {
    return {
      title: 'Quiz Not Found',
      description: 'The requested quiz could not be found.',
    }
  }

  // Generic fallback using quiz data
  return {
    title: `${quiz.title} - QuizzAstrology`,
    description: quiz.description,
    keywords: [
      ...quiz.tags,
      quiz.type,
      quiz.difficulty,
      'quiz',
      'astrology',
      'QuizzAstrology',
    ],
  }
}

const IndividualQuizPage = ({
  params,
}: {
  params: { category: string; slug: string }
}) => {
  return (
    <div className="min-h-screen">
      <QuizRenderer slug={params.slug} />
    </div>
  )
}

export default IndividualQuizPage
