import { getQuizBySlug, localQuizzes } from '@/utils/localQuizData'
import type { Metadata } from 'next'
import QuizRenderer from '@/components/QuizRenderer'

// Define hardcoded metadata for each quiz slug
const hardcodedQuizMetadata: { [key: string]: Metadata } = {
  'elemental-dominance-quiz': {
    title: 'Elemental Dominance Quiz – Discover Your Element | QuizzAstrology',
    description:
      'Discover which element dominates your astrological chart. Take our free Elemental Dominance quiz and uncover your fire, water, earth, or air nature.',
    keywords: [
      'elemental dominance',
      'astrology elements',
      'fire water earth air',
      'personality quiz',
      'astrological elements',
      'QuizzAstrology',
    ],
    openGraph: {
      title: 'Elemental Dominance Quiz - QuizzAstrology',
      description:
        'Discover which element dominates your astrological chart and personality.',
      url: 'https://quizzastrology.com/category/astrology/quiz/elemental-dominance-quiz',
      siteName: 'QuizzAstrology',
      images: [
        {
          url: '/placeholder.svg?height=630&width=1200',
          width: 1200,
          height: 630,
          alt: 'Elemental Dominance Quiz',
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Elemental Dominance Quiz - QuizzAstrology',
      description:
        'Discover which element dominates your astrological chart and personality.',
      images: ['/placeholder.svg?height=675&width=1200'],
    },
  },
  'planetary-influence-quiz': {
    title:
      'Planetary Influence Quiz – Which Planet Rules You? | QuizzAstrology',
    description:
      'Discover which planet has the strongest influence on your decisions and personality. Take our Planetary Influence quiz and unlock your cosmic guidance.',
    keywords: [
      'planetary influence',
      'astrology planets',
      'cosmic influence',
      'decision making',
      'planetary personality',
      'QuizzAstrology',
    ],
    openGraph: {
      title: 'Planetary Influence Quiz - QuizzAstrology',
      description:
        'Discover which planet influences your decisions and personality most.',
      url: 'https://quizzastrology.com/category/astrology/quiz/planetary-influence-quiz',
      siteName: 'QuizzAstrology',
      images: [
        {
          url: '/placeholder.svg?height=630&width=1200',
          width: 1200,
          height: 630,
          alt: 'Planetary Influence Quiz',
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Planetary Influence Quiz - QuizzAstrology',
      description:
        'Discover which planet influences your decisions and personality most.',
      images: ['/placeholder.svg?height=675&width=1200'],
    },
  },
  'rising-sign-quiz': {
    title: 'Rising Sign Quiz – Discover Your True Ascendant | QuizzAstrology',
    description:
      'Discover your true rising sign through personality-based questions. Learn how others perceive you and unlock your cosmic first impressions.',
    keywords: [
      'rising sign quiz',
      'ascendant sign',
      'personality astrology',
      'first impressions',
      'rising sign calculator',
      'QuizzAstrology',
    ],
    openGraph: {
      title: 'Rising Sign Quiz - QuizzAstrology',
      description:
        'Discover your true rising sign and how others perceive you.',
      url: 'https://quizzastrology.com/category/astrology/quiz/rising-sign-quiz',
      siteName: 'QuizzAstrology',
      images: [
        {
          url: '/placeholder.svg?height=630&width=1200',
          width: 1200,
          height: 630,
          alt: 'Rising Sign Quiz',
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Rising Sign Quiz - QuizzAstrology',
      description:
        'Discover your true rising sign and how others perceive you.',
      images: ['/placeholder.svg?height=675&width=1200'],
    },
  },
  'zodiac-compatibility-quiz': {
    title: 'Zodiac Compatibility Quiz – Which Sign to Avoid | QuizzAstrology',
    description:
      'Find out which zodiac sign you should avoid in love and relationships. Take our compatibility quiz and discover your cosmic red flags.',
    keywords: [
      'zodiac compatibility',
      'astrology compatibility',
      'relationship astrology',
      'zodiac avoid',
      'love compatibility',
      'QuizzAstrology',
    ],
    openGraph: {
      title: 'Zodiac Compatibility Quiz - QuizzAstrology',
      description:
        'Discover which zodiac sign you should avoid in love and relationships.',
      url: 'https://quizzastrology.com/category/astrology/quiz/zodiac-compatibility-quiz',
      siteName: 'QuizzAstrology',
      images: [
        {
          url: '/placeholder.svg?height=630&width=1200',
          width: 1200,
          height: 630,
          alt: 'Zodiac Compatibility Quiz',
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Zodiac Compatibility Quiz - QuizzAstrology',
      description:
        'Discover which zodiac sign you should avoid in love and relationships.',
      images: ['/placeholder.svg?height=675&width=1200'],
    },
  },
}

// Generate static paths for all quizzes
export async function generateStaticParams() {
  return localQuizzes.map((quiz) => ({
    category: quiz.category,
    slug: quiz.slug,
  }))
}

// Generate dynamic metadata for each quiz page
export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string }
}): Promise<Metadata> {
  // ALWAYS prioritize hardcoded metadata first
  const hardcodedMetadata = hardcodedQuizMetadata[params.slug]
  if (hardcodedMetadata) {
    return hardcodedMetadata
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
    openGraph: {
      title: `${quiz.title} - QuizzAstrology`,
      description: quiz.description,
      url: `https://quizzastrology.com/category/${params.category}/quiz/${params.slug}`,
      siteName: 'QuizzAstrology',
      images: [
        {
          url: `/placeholder.svg?height=630&width=1200&query=${encodeURIComponent(
            quiz.title
          )} quiz banner`,
          width: 1200,
          height: 630,
          alt: quiz.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${quiz.title} - QuizzAstrology`,
      description: quiz.description,
      images: [
        `/placeholder.svg?height=675&width=1200&query=${encodeURIComponent(
          quiz.title
        )} quiz twitter card`,
      ],
    },
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
