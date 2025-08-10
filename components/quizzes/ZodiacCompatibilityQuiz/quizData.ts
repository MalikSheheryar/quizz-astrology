export const quizQuestions = [
  {
    id: 1,
    type: "radio",
    question: "What irritates you most in a relationship?",
    options: [
      { text: "Constant need for attention and drama", value: "leo", icon: "sun" },
      { text: "Unpredictable mood swings", value: "gemini", icon: "zap" },
      { text: "Overly critical and perfectionist behavior", value: "virgo", icon: "star" },
      { text: "Possessive and jealous tendencies", value: "scorpio", icon: "moon" },
    ],
  },
  {
    id: 2,
    type: "image",
    question: "Choose the face expression that annoys you most:",
    options: [
      { text: "Smug confidence", emoji: "😏", value: "leo" },
      { text: "Confused uncertainty", emoji: "😕", value: "pisces" },
      { text: "Cold indifference", emoji: "😐", value: "aquarius" },
      { text: "Fake enthusiasm", emoji: "😃", value: "gemini" },
      { text: "Judgmental stare", emoji: "🙄", value: "virgo" },
      { text: "Angry scowl", emoji: "😠", value: "aries" },
    ],
  },
  {
    id: 3,
    type: "scenario",
    question: "Dating Scenario",
    scenario: "Your partner cancels your dinner plans last minute to hang out with friends. How do you feel?",
    options: [
      { text: "Furious - this shows complete disrespect", value: "aries" },
      { text: "Hurt but try to understand their perspective", value: "cancer" },
      { text: "Annoyed by their poor planning skills", value: "virgo" },
      { text: "Suspicious about their real intentions", value: "scorpio" },
    ],
  },
  {
    id: 4,
    type: "emoji",
    question: "Pick the emoji that represents your biggest relationship fear:",
    options: [
      { emoji: "🎭", value: "gemini" },
      { emoji: "🔥", value: "aries" },
      { emoji: "❄️", value: "aquarius" },
      { emoji: "🌪️", value: "sagittarius" },
      { emoji: "🗡️", value: "scorpio" },
      { emoji: "🎪", value: "leo" },
      { emoji: "⚖️", value: "libra" },
      { emoji: "🐌", value: "taurus" },
    ],
  },
  {
    id: 5,
    type: "swipe",
    question: "Which relationship dynamic would drain you the most?",
    options: [
      {
        title: "The Drama Queen",
        description: "Everything is a crisis, constant emotional rollercoaster",
        emoji: "🎭",
        value: "leo",
      },
      {
        title: "The Ghost",
        description: "Disappears for days, emotionally unavailable",
        emoji: "👻",
        value: "aquarius",
      },
    ],
  },
  {
    id: 6,
    type: "radio",
    question: "What communication style frustrates you most?",
    options: [
      { text: "Passive-aggressive hints instead of direct talk", value: "cancer", icon: "moon" },
      { text: "Overly blunt and tactless comments", value: "sagittarius", icon: "zap" },
      { text: 'Constant criticism disguised as "help"', value: "virgo", icon: "star" },
      { text: "Talking in circles without getting to the point", value: "gemini", icon: "heart" },
    ],
  },
  {
    id: 7,
    type: "scenario",
    question: "Social Situation",
    scenario: "At a party, your partner flirts openly with others in front of you. Your reaction:",
    options: [
      { text: "Confront them immediately and make a scene", value: "aries" },
      { text: "Feel deeply hurt but suffer in silence", value: "cancer" },
      { text: "Analyze their behavior and plan revenge", value: "scorpio" },
      { text: "Flirt with others to make them jealous", value: "leo" },
    ],
  },
  {
    id: 8,
    type: "image",
    question: "Which couple dynamic looks most toxic to you?",
    options: [
      { text: "Constant arguing", emoji: "🤬", value: "aries" },
      { text: "One ignoring the other", emoji: "🙄", value: "aquarius" },
      { text: "Fake smiles hiding tension", emoji: "😬", value: "libra" },
      { text: "Possessive controlling behavior", emoji: "😤", value: "scorpio" },
    ],
  },
  {
    id: 9,
    type: "emoji",
    question: "What energy do you want to avoid in love?",
    options: [
      { emoji: "⚡", value: "aries" },
      { emoji: "🌊", value: "pisces" },
      { emoji: "🔒", value: "scorpio" },
      { emoji: "🎨", value: "gemini" },
      { emoji: "🏔️", value: "capricorn" },
      { emoji: "🎪", value: "sagittarius" },
    ],
  },
  {
    id: 10,
    type: "swipe",
    question: "Choose your relationship nightmare:",
    options: [
      {
        title: "The Controller",
        description: "Wants to manage every aspect of your life",
        emoji: "🎮",
        value: "scorpio",
      },
      {
        title: "The Wanderer",
        description: "Never settles down, always looking for the next adventure",
        emoji: "🏃‍♂️",
        value: "sagittarius",
      },
    ],
  },
]

export const calculateAvoidSign = (answers: Record<string, any>) => {
  const signScores: Record<string, number> = {
    aries: 0,
    taurus: 0,
    gemini: 0,
    cancer: 0,
    leo: 0,
    virgo: 0,
    libra: 0,
    scorpio: 0,
    sagittarius: 0,
    capricorn: 0,
    aquarius: 0,
    pisces: 0,
  }

  // Weight different question types
  const weights = {
    radio: 2,
    scenario: 3,
    swipe: 2,
    image: 1,
    emoji: 1,
  }

  // Process each answer
  Object.values(answers).forEach((answer: any) => {
    if (answer && answer.value) {
      const sign = answer.value.toLowerCase()
      const questionType = getQuestionType(answer)
      const weight = weights[questionType as keyof typeof weights] || 1

      if (signScores.hasOwnProperty(sign)) {
        signScores[sign] += weight
      }
    }
  })

  // Find the sign with the highest score (most avoided)
  let maxScore = 0
  let avoidSign = "Gemini" // Default fallback

  Object.entries(signScores).forEach(([sign, score]) => {
    if (score > maxScore) {
      maxScore = score
      avoidSign = capitalizeFirst(sign)
    }
  })

  // If there's a tie or no clear winner, use compatibility logic
  if (maxScore === 0) {
    return getDefaultAvoidSign()
  }

  return avoidSign
}

const getQuestionType = (answer: any) => {
  // This would need to be enhanced to properly detect question type
  // For now, return a default
  return "radio"
}

const capitalizeFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const getDefaultAvoidSign = () => {
  // Default signs that are commonly incompatible
  const problematicSigns = ["Gemini", "Aries", "Scorpio", "Leo"]
  return problematicSigns[Math.floor(Math.random() * problematicSigns.length)]
}

export const getZodiacTraits = (sign: string) => {
  const traits: Record<string, any> = {
    Aries: {
      negative: ["impulsive", "aggressive", "impatient", "hot-tempered"],
      triggers: ["slow decision making", "passive behavior", "overthinking"],
      compatibility: "low",
      description: "Aries can be overwhelming with their intense energy and need for immediate action.",
    },
    Taurus: {
      negative: ["stubborn", "possessive", "materialistic", "slow to change"],
      triggers: ["sudden changes", "unpredictability", "rushing decisions"],
      compatibility: "medium",
      description: "Taurus can be frustratingly rigid and resistant to necessary changes.",
    },
    Gemini: {
      negative: ["inconsistent", "superficial", "restless", "unreliable"],
      triggers: ["routine", "deep emotional conversations", "commitment pressure"],
      compatibility: "low",
      description: "Gemini's dual nature can make them seem fake and emotionally unavailable.",
    },
    Cancer: {
      negative: ["moody", "clingy", "oversensitive", "manipulative"],
      triggers: ["criticism", "emotional distance", "change in routine"],
      compatibility: "medium",
      description: "Cancer's emotional intensity can become suffocating and draining.",
    },
    Leo: {
      negative: ["egotistical", "dramatic", "attention-seeking", "dominating"],
      triggers: ["being ignored", "criticism", "not being the center of attention"],
      compatibility: "low",
      description: "Leo's constant need for admiration can make relationships feel one-sided.",
    },
    Virgo: {
      negative: ["critical", "perfectionist", "anxious", "nitpicky"],
      triggers: ["messiness", "imperfection", "spontaneity"],
      compatibility: "medium",
      description: "Virgo's critical nature can make partners feel constantly judged.",
    },
    Libra: {
      negative: ["indecisive", "people-pleasing", "superficial", "conflict-avoidant"],
      triggers: ["making decisions", "confrontation", "being alone"],
      compatibility: "medium",
      description: "Libra's inability to make decisions can be frustrating in relationships.",
    },
    Scorpio: {
      negative: ["jealous", "secretive", "vindictive", "controlling"],
      triggers: ["betrayal", "superficiality", "being controlled"],
      compatibility: "low",
      description: "Scorpio's intensity and jealousy can create a toxic relationship dynamic.",
    },
    Sagittarius: {
      negative: ["commitment-phobic", "tactless", "restless", "irresponsible"],
      triggers: ["routine", "commitment pressure", "being tied down"],
      compatibility: "medium",
      description: "Sagittarius' fear of commitment can leave partners feeling insecure.",
    },
    Capricorn: {
      negative: ["cold", "workaholic", "pessimistic", "status-obsessed"],
      triggers: ["laziness", "lack of ambition", "emotional displays"],
      compatibility: "medium",
      description: "Capricorn's emotional distance can make relationships feel businesslike.",
    },
    Aquarius: {
      negative: ["detached", "unpredictable", "aloof", "rebellious"],
      triggers: ["emotional demands", "traditional expectations", "clinginess"],
      compatibility: "low",
      description: "Aquarius' emotional detachment can leave partners feeling unloved.",
    },
    Pisces: {
      negative: ["escapist", "overly emotional", "unrealistic", "victim mentality"],
      triggers: ["harsh reality", "criticism", "logical arguments"],
      compatibility: "medium",
      description: "Pisces' tendency to escape reality can make them unreliable partners.",
    },
  }

  return traits[sign] || traits.Gemini
}

export const getCompatibilityInsight = (userSign: string, avoidSign: string) => {
  const insights: Record<string, string> = {
    [`${userSign}-${avoidSign}`]: `Your ${userSign} nature fundamentally clashes with ${avoidSign}'s core traits, creating inevitable relationship friction.`,
  }

  return (
    insights[`${userSign}-${avoidSign}`] ||
    `As a ${userSign}, you'll find ${avoidSign}'s approach to life and love incompatible with your values and needs.`
  )
}
