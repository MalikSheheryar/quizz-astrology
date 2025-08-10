export interface LocalQuiz {
  _id: string
  title: string
  description: string
  type: string
  difficulty: string
  duration: number
  participants: string
  tags: string[]
  component: string
  slug: string
  category: string
  price: number // Price in dollars for full result
}

export const localQuizzes: LocalQuiz[] = [
  // Astrology Quizzes
  {
    _id: 'elemental-dominance',
    title: '🔮 Elemental Dominance Quiz',
    description:
      'Discover which element dominates your astrological chart and influences your personality, decisions, and life path.',
    type: 'personality',
    difficulty: 'Medium',
    duration: 12,
    participants: '24.8K',
    tags: [
      'elements',
      'personality',
      'astrology',
      'fire',
      'water',
      'earth',
      'air',
    ],
    component: 'ElementalDominanceQuiz',
    slug: 'elemental-dominance-quiz',
    category: 'astrology',
    price: 1.99,
  },
  {
    _id: 'planetary-influence',
    title: '🪐 Planetary Influence Quiz',
    description:
      'Discover which planet has the strongest influence on your decision-making process and life choices.',
    type: 'personality',
    difficulty: 'Medium',
    duration: 10,
    participants: '18.3K',
    tags: ['planets', 'decisions', 'astrology', 'influence', 'cosmic'],
    component: 'PlanetaryInfluenceQuiz',
    slug: 'planetary-influence-quiz',
    category: 'astrology',
    price: 1.99,
  },
  {
    _id: 'rising-sign',
    title: '✨ Rising Sign Quiz',
    description:
      'Discover your true rising sign through personality-based questions that reveal how others perceive you and your natural first impressions.',
    type: 'personality',
    difficulty: 'Medium',
    duration: 8,
    participants: '15.7K',
    tags: [
      'rising sign',
      'ascendant',
      'personality',
      'first impressions',
      'astrology',
    ],
    component: 'RisingSignQuiz',
    slug: 'rising-sign-quiz',
    category: 'astrology',
    price: 1.99,
  },
  {
    _id: 'zodiac-compatibility',
    title: '💔 Zodiac Compatibility Quiz',
    description:
      'Find out which zodiac sign you should avoid in love and life based on your personality traits and relationship preferences.',
    type: 'compatibility',
    difficulty: 'Medium',
    duration: 15,
    participants: '32.1K',
    tags: ['compatibility', 'relationships', 'avoid', 'zodiac', 'love'],
    component: 'ZodiacCompatibilityQuiz',
    slug: 'zodiac-compatibility-quiz',
    category: 'astrology',
    price: 1.99,
  },
  // More quizzes will be added here for other categories
]

// Filter quizzes by category
export const getQuizzesByCategory = (category: string) => {
  return localQuizzes.filter((quiz) => quiz.category === category)
}

// Get quiz by slug
export const getQuizBySlug = (slug: string) => {
  return localQuizzes.find((quiz) => quiz.slug === slug)
}
