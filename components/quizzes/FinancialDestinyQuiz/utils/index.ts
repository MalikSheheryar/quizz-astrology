export const calculateLifePath = (dateOfBirth: string): number => {
  const date = new Date(dateOfBirth)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const reduceToSingle = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num
        .toString()
        .split("")
        .reduce((sum, digit) => sum + Number.parseInt(digit), 0)
    }
    return num
  }

  const total = day + month + year
  return reduceToSingle(total)
}

export const calculateExpression = (fullName: string): number => {
  const letterValues: { [key: string]: number } = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 1,
    K: 2,
    L: 3,
    M: 4,
    N: 5,
    O: 6,
    P: 7,
    Q: 8,
    R: 9,
    S: 1,
    T: 2,
    U: 3,
    V: 4,
    W: 5,
    X: 6,
    Y: 7,
    Z: 8,
  }

  const reduceToSingle = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num
        .toString()
        .split("")
        .reduce((sum, digit) => sum + Number.parseInt(digit), 0)
    }
    return num
  }

  const total = fullName
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .split("")
    .reduce((sum, letter) => {
      return sum + (letterValues[letter] || 0)
    }, 0)

  return reduceToSingle(total)
}

export const determineArchetype = (answers: any[], lifePath: number, expression: number): string => {
  // Simple algorithm to determine archetype based on answers and numbers
  const archetypes = [
    "The Wealth Builder",
    "The Money Magnet",
    "The Abundance Creator",
    "The Financial Visionary",
    "The Prosperity Guide",
  ]

  // Use life path as base
  let archetypeIndex = lifePath % archetypes.length

  // Modify based on quiz answers
  if (answers.length > 0) {
    const firstAnswer = answers[0]?.answer?.value
    if (firstAnswer === "luxury") archetypeIndex = 0
    else if (firstAnswer === "freedom") archetypeIndex = 1
    else if (firstAnswer === "family") archetypeIndex = 2
    else if (firstAnswer === "peace") archetypeIndex = 3
  }

  return archetypes[archetypeIndex]
}

export const getArchetypeDetails = (archetype: string) => {
  const archetypeData: { [key: string]: any } = {
    "The Wealth Builder": {
      name: "Wealth Builder",
      emoji: "🏗️",
      shortDescription: "You build wealth through steady, strategic action and long-term planning.",
      fullDescription:
        "As a Wealth Builder, you have the natural ability to create lasting financial success through disciplined action, strategic planning, and consistent effort. You understand that true wealth is built brick by brick, investment by investment.",
      lifePathMeaning:
        "Your life path emphasizes building solid foundations and creating lasting value through persistent effort.",
      expressionMeaning:
        "Your expression number reveals your natural talent for organizing resources and creating systematic wealth.",
      moneyEnergy:
        "Your money energy is steady and reliable, like a river that consistently flows toward the ocean of abundance.",
      strengths: [
        "Strategic planning abilities",
        "Long-term vision",
        "Disciplined saving habits",
        "Investment mindset",
        "Risk management skills",
      ],
      blocks: "Your main blocks involve impatience with slow progress and fear of taking calculated risks.",
      blocksList: [
        "Impatience with gradual growth",
        "Over-conservative approach",
        "Analysis paralysis",
        "Fear of market volatility",
      ],
      careerPaths: [
        "Real estate development",
        "Investment banking",
        "Financial planning",
        "Business ownership",
        "Asset management",
      ],
      activation: [
        "Set clear 5-year financial goals",
        "Automate your savings and investments",
        "Study successful wealth builders",
        "Take calculated risks",
        "Build multiple income streams",
      ],
      forecast:
        "Your financial future shows steady, consistent growth with major wealth milestones achieved through patient, strategic action. Expect significant financial breakthroughs in your 40s and 50s.",
    },
    "The Money Magnet": {
      name: "Money Magnet",
      emoji: "🧲",
      shortDescription:
        "You naturally attract money and opportunities through your magnetic energy and positive mindset.",
      fullDescription:
        "As a Money Magnet, you have an innate ability to attract financial opportunities and resources. Your positive energy and optimistic outlook create a magnetic field that draws abundance to you.",
      lifePathMeaning:
        "Your life path is about learning to trust your natural magnetism and use it to create abundance.",
      expressionMeaning:
        "Your expression number shows your gift for attracting resources and opportunities through your natural charisma.",
      moneyEnergy: "Your money energy is magnetic and flowing, naturally drawing opportunities and resources to you.",
      strengths: [
        "Natural charisma",
        "Positive mindset",
        "Networking abilities",
        "Opportunity recognition",
        "Manifestation skills",
      ],
      blocks: "Your blocks involve inconsistent energy and difficulty with practical money management.",
      blocksList: [
        "Inconsistent income patterns",
        "Overspending during good times",
        "Lack of financial structure",
        "Difficulty with budgeting",
      ],
      careerPaths: [
        "Sales and marketing",
        "Entertainment industry",
        "Public speaking",
        "Coaching and consulting",
        "Network marketing",
      ],
      activation: [
        "Practice daily gratitude",
        "Visualize your financial goals",
        "Network with successful people",
        "Create consistent money habits",
        "Trust your intuition about opportunities",
      ],
      forecast:
        "Your financial future includes unexpected windfalls and opportunities that come through your network and positive energy. Money flows to you in waves of abundance.",
    },
    "The Abundance Creator": {
      name: "Abundance Creator",
      emoji: "🎨",
      shortDescription: "You create wealth through your creativity, innovation, and unique talents.",
      fullDescription:
        "As an Abundance Creator, you have the gift of turning your creative talents and innovative ideas into profitable ventures. You create value through your unique perspective and artistic abilities.",
      lifePathMeaning:
        "Your life path involves learning to monetize your creativity and trust in the value of your unique gifts.",
      expressionMeaning:
        "Your expression number reveals your ability to create something from nothing and turn ideas into income.",
      moneyEnergy:
        "Your money energy is creative and innovative, flowing through your artistic expression and unique ideas.",
      strengths: [
        "Creative problem-solving",
        "Innovation abilities",
        "Artistic talents",
        "Unique perspective",
        "Value creation skills",
      ],
      blocks: "Your blocks involve undervaluing your creative work and inconsistent income from creative pursuits.",
      blocksList: [
        "Undercharging for creative work",
        "Irregular income patterns",
        "Difficulty with business aspects",
        "Imposter syndrome",
      ],
      careerPaths: [
        "Creative arts and design",
        "Content creation",
        "Innovation consulting",
        "Product development",
        "Creative entrepreneurship",
      ],
      activation: [
        "Value your creative work appropriately",
        "Develop multiple revenue streams",
        "Learn business skills",
        "Build a strong personal brand",
        "Create passive income from your art",
      ],
      forecast:
        "Your financial future involves monetizing your creativity in unexpected ways, with potential for viral success and licensing opportunities that create ongoing passive income.",
    },
    "The Financial Visionary": {
      name: "Financial Visionary",
      emoji: "🔮",
      shortDescription:
        "You see financial opportunities others miss and have intuitive insights about money and investments.",
      fullDescription:
        "As a Financial Visionary, you possess an intuitive understanding of financial markets and trends. You can see opportunities that others miss and have a natural gift for timing and strategic financial decisions.",
      lifePathMeaning:
        "Your life path involves developing and trusting your financial intuition to guide your wealth-building journey.",
      expressionMeaning:
        "Your expression number shows your ability to see beyond current circumstances to future financial possibilities.",
      moneyEnergy:
        "Your money energy is intuitive and forward-thinking, allowing you to sense financial trends and opportunities.",
      strengths: [
        "Financial intuition",
        "Trend recognition",
        "Strategic thinking",
        "Market timing",
        "Visionary planning",
      ],
      blocks: "Your blocks involve doubting your intuition and being too far ahead of current market conditions.",
      blocksList: [
        "Self-doubt about intuitive insights",
        "Being too early on trends",
        "Difficulty explaining your vision",
        "Impatience with others' understanding",
      ],
      careerPaths: [
        "Investment analysis",
        "Financial consulting",
        "Trend forecasting",
        "Venture capital",
        "Financial technology",
      ],
      activation: [
        "Trust your financial intuition",
        "Study market patterns and cycles",
        "Start with small intuitive investments",
        "Document your predictions",
        "Find like-minded investors",
      ],
      forecast:
        "Your financial future includes being ahead of major financial trends, with significant wealth created through early adoption of emerging opportunities and technologies.",
    },
    "The Prosperity Guide": {
      name: "Prosperity Guide",
      emoji: "🌟",
      shortDescription: "You create wealth by helping others achieve financial success and sharing your wisdom.",
      fullDescription:
        "As a Prosperity Guide, your path to wealth involves helping others achieve financial success. You have natural teaching and mentoring abilities that allow you to create prosperity for yourself while guiding others.",
      lifePathMeaning:
        "Your life path emphasizes service to others and creating wealth through helping people achieve their financial goals.",
      expressionMeaning:
        "Your expression number reveals your gift for teaching, guiding, and inspiring others to reach their potential.",
      moneyEnergy: "Your money energy flows through service to others, creating abundance as you help others prosper.",
      strengths: [
        "Teaching abilities",
        "Mentoring skills",
        "Empathy and understanding",
        "Communication talents",
        "Service orientation",
      ],
      blocks: "Your blocks involve undervaluing your guidance and giving away too much for free.",
      blocksList: [
        "Undercharging for advice",
        "Giving away too much for free",
        "Difficulty with self-promotion",
        "Putting others before yourself",
      ],
      careerPaths: [
        "Financial coaching",
        "Business consulting",
        "Educational services",
        "Speaking and training",
        "Online course creation",
      ],
      activation: [
        "Value your expertise appropriately",
        "Create structured programs",
        "Build your authority and credibility",
        "Develop scalable offerings",
        "Practice receiving as well as giving",
      ],
      forecast:
        "Your financial future involves building a successful practice or business helping others, with potential for significant income through courses, coaching, and speaking engagements.",
    },
  }

  return archetypeData[archetype] || archetypeData["The Wealth Builder"]
}
