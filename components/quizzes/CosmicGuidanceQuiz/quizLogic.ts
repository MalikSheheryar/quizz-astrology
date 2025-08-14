import { getSpiritualMessage } from "./spiritualMessages"

export const getQuizQuestions = () => {
  return [
    {
      type: "card-selector",
      title: "Choose the image that resonates most right now",
      subtitle: "Trust your first instinct—your soul knows the way",
      options: [
        { value: "light", label: "Divine Light", icon: "✨", energy: "awakening" },
        { value: "forest", label: "Sacred Forest", icon: "🌲", energy: "grounding" },
        { value: "stars", label: "Cosmic Stars", icon: "⭐", energy: "expansion" },
        { value: "mirror", label: "Soul Mirror", icon: "🪞", energy: "reflection" },
        { value: "storm", label: "Cleansing Storm", icon: "⛈️", energy: "transformation" },
        { value: "fire", label: "Sacred Fire", icon: "🔥", energy: "passion" },
        { value: "waterfall", label: "Healing Waters", icon: "💧", energy: "flow" },
        { value: "eclipse", label: "Mystical Eclipse", icon: "🌑", energy: "mystery" },
      ],
    },
    {
      type: "symbol-choice",
      title: "Pick a symbol that represents your current state",
      subtitle: "Let the ancient wisdom speak through you",
      options: [
        { value: "spiral", symbol: "🌀", energy: "transformation" },
        { value: "moon", symbol: "🌕", energy: "intuition" },
        { value: "fire", symbol: "🔥", energy: "passion" },
        { value: "wave", symbol: "🌊", energy: "flow" },
        { value: "eye", symbol: "🧿", energy: "protection" },
        { value: "leaf", symbol: "🌿", energy: "growth" },
        { value: "crystal", symbol: "💎", energy: "clarity" },
        { value: "feather", symbol: "🪶", energy: "freedom" },
      ],
    },
    {
      type: "emotion-mapping",
      title: "Which emotion has been strongest for you this week?",
      subtitle: "Your emotions are messengers from your soul",
      options: [
        {
          value: "peace",
          label: "Deep Peace",
          icon: "🕊️",
          description: "A sense of calm and centeredness",
          energy: "balance",
        },
        {
          value: "frustration",
          label: "Sacred Frustration",
          icon: "⚡",
          description: "Energy seeking new direction",
          energy: "change",
        },
        {
          value: "passion",
          label: "Divine Passion",
          icon: "❤️",
          description: "Fire burning within your heart",
          energy: "action",
        },
        {
          value: "uncertainty",
          label: "Holy Uncertainty",
          icon: "🌫️",
          description: "Standing at the threshold of change",
          energy: "trust",
        },
        { value: "joy", label: "Pure Joy", icon: "☀️", description: "Light radiating from within", energy: "gratitude" },
        {
          value: "reflection",
          label: "Sacred Reflection",
          icon: "🌙",
          description: "Looking inward for answers",
          energy: "wisdom",
        },
      ],
    },
    {
      type: "card-selector",
      title: "What vision feels like your soul's message?",
      subtitle: "Your higher self is showing you the way forward",
      options: [
        { value: "door", label: "Open Door", icon: "🚪", energy: "opportunity" },
        { value: "sunrise", label: "Rising Sun", icon: "🌅", energy: "new-beginning" },
        { value: "fullmoon", label: "Full Moon", icon: "🌕", energy: "completion" },
        { value: "shadow", label: "Shadow Figure", icon: "👤", energy: "integration" },
        { value: "heart", label: "Glowing Heart", icon: "💖", energy: "love" },
        { value: "mountain", label: "Sacred Mountain", icon: "⛰️", energy: "achievement" },
        { value: "ocean", label: "Infinite Ocean", icon: "🌊", energy: "depth" },
        { value: "bridge", label: "Golden Bridge", icon: "🌉", energy: "transition" },
      ],
    },
    {
      type: "energy-slider",
      title: "Are you being pulled inward or outward right now?",
      subtitle: "Feel the direction of your spiritual energy",
      options: [],
    },
  ]
}

export const calculateSpiritualResult = (answers, userData) => {
  // Analyze energy patterns from answers
  const energyMap = {}

  answers.forEach((answer) => {
    if (answer.data && answer.data.energy) {
      const energy = answer.data.energy
      energyMap[energy] = (energyMap[energy] || 0) + 1
    }
  })

  // Find dominant energy pattern
  const dominantEnergy = Object.keys(energyMap).reduce((a, b) => (energyMap[a] > energyMap[b] ? a : b))

  // Consider birth date for additional insight
  const birthDate = new Date(userData.dateOfBirth)
  const birthMonth = birthDate.getMonth() + 1
  const birthDay = birthDate.getDate()

  // Map energy to spiritual category
  const categoryMap = {
    transformation: "Transform",
    awakening: "Awaken",
    reflection: "Receive",
    trust: "Trust",
    action: "Act",
    love: "Love",
    change: "Release",
    protection: "Protect",
  }

  const category = categoryMap[dominantEnergy] || "Awaken"

  // Get personalized spiritual message
  const message = getSpiritualMessage(category, {
    dominantEnergy,
    energyMap,
    birthMonth,
    birthDay,
    userName: userData.fullName,
    energyLevel: userData.energyLevel,
    guidance: userData.guidance,
  })

  return {
    category,
    dominantEnergy,
    ...message,
  }
}
