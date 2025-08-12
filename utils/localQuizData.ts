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
  // Spiritual Guidance Quizzes
  {
    _id: 'intuition-score',
    title: '🔮 Intuition Score Quiz',
    description:
      'Discover your mystical connection to inner wisdom and unlock your intuitive abilities through personalized spiritual guidance.',
    type: 'spiritual',
    difficulty: 'Medium',
    duration: 12,
    participants: '19.4K',
    tags: ['intuition', 'psychic', 'spiritual', 'inner wisdom', 'mystical'],
    component: 'IntuitionScoreQuiz',
    slug: 'intuition-score-quiz',
    category: 'spiritual',
    price: 1.99,
  },
  {
    _id: 'chakra-blocked',
    title: '🌈 Chakra Blocked Quiz',
    description:
      'Discover which chakra is blocked in you right now through deep somatic and emotional insights, with personalized healing practices.',
    type: 'spiritual',
    difficulty: 'Medium',
    duration: 10,
    participants: '27.8K',
    tags: ['chakras', 'energy', 'healing', 'spiritual', 'blocked', 'alignment'],
    component: 'ChakraBlockedQuiz',
    slug: 'chakra-blocked-quiz',
    category: 'spiritual',
    price: 1.99,
  },
  // Love & Emotions Quizzes
  {
    _id: 'twin-flame-karmic',
    title: '💫 Twin Flame vs Karmic Quiz',
    description:
      'Discover the spiritual truth about your relationship - is your partner your Twin Flame or a Karmic Lesson? Uncover the cosmic purpose of your connection.',
    type: 'relationship',
    difficulty: 'Medium',
    duration: 15,
    participants: '41.2K',
    tags: [
      'twin flame',
      'karmic',
      'soulmate',
      'spiritual love',
      'relationship purpose',
    ],
    component: 'TwinFlameKarmicQuiz',
    slug: 'twin-flame-karmic-quiz',
    category: 'love',
    price: 1.99,
  },
  {
    _id: 'zodiac-soulmate',
    title: '💖 Zodiac Soulmate Quiz',
    description:
      'Which zodiac sign is your ideal soulmate? Discover your perfect cosmic match through deep personality analysis and astrological compatibility.',
    type: 'compatibility',
    difficulty: 'Medium',
    duration: 12,
    participants: '38.7K',
    tags: [
      'soulmate',
      'zodiac compatibility',
      'love match',
      'astrology',
      'cosmic connection',
    ],
    component: 'ZodiacSoulmateQuiz',
    slug: 'zodiac-soulmate-quiz',
    category: 'love',
    price: 1.99,
  },
  {
    _id: 'love-compatibility-score',
    title: '💕 Love Compatibility Score Quiz',
    description:
      'Discover your cosmic compatibility percentage with your crush through deep emotional and astrological analysis. Get your personalized love score!',
    type: 'compatibility',
    difficulty: 'Medium',
    duration: 10,
    participants: '45.3K',
    tags: [
      'compatibility',
      'love score',
      'crush',
      'relationship',
      'cosmic connection',
    ],
    component: 'LoveCompatibilityQuiz',
    slug: 'love-compatibility-score-quiz',
    category: 'love',
    price: 1.99,
  },
  {
    _id: 'love-prophecy-timing',
    title: '🔮 Love Prophecy Quiz',
    description:
      'When will you meet your next great love? Let the stars reveal your romantic destiny through personalized astrological insights and cosmic timing.',
    type: 'prediction',
    difficulty: 'Medium',
    duration: 15,
    participants: '52.8K',
    tags: [
      'love prophecy',
      'timing',
      'future love',
      'astrological prediction',
      'romantic destiny',
    ],
    component: 'LoveProphecyQuiz',
    slug: 'love-prophecy-timing-quiz',
    category: 'love',
    price: 1.99,
  },
  {
    _id: 'soul-number-quiz',
    title: 'Soul Number Quiz',
    description: "Discover your soul's deepest purpose through numerology",
    type: 'numerology',
    difficulty: 'Medium',
    duration: 10,
    participants: '10K',
    tags: ['numerology', 'soul', 'purpose'],
    component: 'SoulNumberQuiz',
    slug: 'soul-number-quiz',
    category: 'numerology',
    price: 1.99,
  },

  {
    _id: 'luckiest-year-quiz',

    title: 'Luckiest Year Quiz',
    description: 'Find out which year will bring you the most fortune',
    type: 'numerology',
    difficulty: 'Medium',
    duration: 10,
    participants: '8K',
    tags: ['numerology', 'luck', 'future'],
    component: 'LuckiestYearQuiz',
    slug: 'luckiest-year-quiz',
    category: 'numerology',
    price: 1.99,
  },
  // More quizzes will be added here for other categories
  {
    _id: 'soul-mission',
    title: '🌟 Soul Mission Quiz',
    description:
      'Discover your divine life mission and sacred purpose through your birth date and cosmic insights.',
    type: 'spiritual',
    difficulty: 'Medium',
    duration: 15,
    participants: '31.2K',
    tags: [
      'soul mission',
      'life purpose',
      'divine calling',
      'spiritual path',
      'cosmic blueprint',
    ],
    component: 'SoulMissionQuiz',
    slug: 'soul-mission-quiz',
    category: 'numerology',
    price: 1.99,
  },
  {
    _id: 'financial-destiny',
    title: '💰 Financial Destiny Quiz',
    description:
      'Unlock the cosmic secrets of your wealth potential through ancient numerology wisdom and financial astrology.',
    type: 'financial',
    difficulty: 'Medium',
    duration: 18,
    participants: '28.7K',
    tags: [
      'financial destiny',
      'wealth potential',
      'money magnetism',
      'abundance',
      'prosperity',
    ],
    component: 'FinancialDestinyQuiz',
    slug: 'financial-destiny-quiz',
    category: 'numerology',
    price: 1.99,
  },
]

// Filter quizzes by category
export const getQuizzesByCategory = (category: string) => {
  return localQuizzes.filter((quiz) => quiz.category === category)
}

// Get quiz by slug
export const getQuizBySlug = (slug: string) => {
  return localQuizzes.find((quiz) => quiz.slug === slug)
}
