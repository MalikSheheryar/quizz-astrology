export const calculateFinalScore = (answers: any[], element: string) => {
  let intuitiveScore = 0
  let analyticalScore = 0
  let balancedScore = 0

  answers.forEach((answer) => {
    if (typeof answer === "number") {
      // Handle slider answers
      const question = getQuestionByIndex(answers.indexOf(answer))
      if (question && question.scoreMapping) {
        const scores = question.scoreMapping(answer)
        intuitiveScore += scores.intuitive || 0
        analyticalScore += scores.analytical || 0
        balancedScore += scores.balanced || 0
      }
    } else if (answer && answer.score) {
      intuitiveScore += answer.score.intuitive || 0
      analyticalScore += answer.score.analytical || 0
      balancedScore += answer.score.balanced || 0
    }
  })

  // Base score calculation
  const totalPossibleScore = answers.length * 3 // Max 3 points per question
  const baseScore = (intuitiveScore / totalPossibleScore) * 100

  // Apply elemental modifier
  const elementModifier = getElementModifier(element)
  const finalScore = Math.round(baseScore * elementModifier)

  // Ensure score is within bounds
  return Math.max(0, Math.min(100, finalScore))
}

const getQuestionByIndex = (index: number) => {
  // This would normally reference the questions array from QuizEngine
  // For now, return null as we're calculating after the fact
  return null
}

const getElementModifier = (element: string) => {
  const modifiers = {
    Fire: 1.1, // Fire signs tend to be more intuitive
    Water: 1.15, // Water signs are most intuitive
    Earth: 0.95, // Earth signs are more practical
    Air: 1.05, // Air signs balance intuition and logic
  }
  return modifiers[element as keyof typeof modifiers] || 1.0
}

export const getAstrologyElement = (dateOfBirth: string) => {
  const date = new Date(dateOfBirth)
  const month = date.getMonth() + 1
  const day = date.getDate()

  // Simplified zodiac element mapping
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Fire" // Aries
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Earth" // Taurus
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Air" // Gemini
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Water" // Cancer
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Fire" // Leo
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Earth" // Virgo
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Air" // Libra
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Water" // Scorpio
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Fire" // Sagittarius
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Earth" // Capricorn
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Air" // Aquarius
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Water" // Pisces

  return "Water" // Default
}

export const getZodiacSign = (dateOfBirth: string) => {
  const date = new Date(dateOfBirth)
  const month = date.getMonth() + 1
  const day = date.getDate()

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries ♈"
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus ♉"
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini ♊"
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer ♋"
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo ♌"
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo ♍"
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra ♎"
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio ♏"
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius ♐"
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn ♑"
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius ♒"
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces ♓"

  return "Pisces ♓" // Default
}

export const getSpiritGuide = (score: number) => {
  if (score >= 85) {
    return {
      name: "The Oracle",
      emoji: "🔮",
      message: "You are guided by ancient wisdom and possess the gift of foresight. Trust your visions.",
    }
  }
  if (score >= 70) {
    return {
      name: "The Moon Priestess",
      emoji: "🌙",
      message: "Your intuition flows like moonlight, illuminating hidden truths in the darkness.",
    }
  }
  if (score >= 55) {
    return {
      name: "The Wise Owl",
      emoji: "🦉",
      message: "Your inner wisdom is awakening. Listen carefully to the whispers of your soul.",
    }
  }
  if (score >= 40) {
    return {
      name: "The Growing Seed",
      emoji: "🌱",
      message: "Your intuitive abilities are like a seed ready to bloom. Nurture them with patience.",
    }
  }
  return {
    name: "The Curious Explorer",
    emoji: "🧭",
    message: "Your journey into intuition is just beginning. Every step forward opens new possibilities.",
  }
}

export const getScoreInsight = (score: number, element: string) => {
  const insights = {
    Fire: {
      high: "Your fiery intuition burns bright with passionate insights and bold instincts.",
      medium: "Your fire element gives you quick flashes of intuitive understanding.",
      low: "Channel your fire energy into developing stronger gut instincts.",
    },
    Water: {
      high: "Your water element flows with deep psychic sensitivity and emotional wisdom.",
      medium: "Your intuitive waters run deep, trust the currents of your feelings.",
      low: "Dive deeper into your emotional waters to unlock your intuitive gifts.",
    },
    Earth: {
      high: "Your earth element grounds your intuition in practical wisdom and reliable insights.",
      medium: "Your earthy intuition manifests through practical hunches and body awareness.",
      low: "Connect with nature to awaken your earth-based intuitive abilities.",
    },
    Air: {
      high: "Your air element carries messages on the wind, bringing mental clarity and insight.",
      medium: "Your airy intuition speaks through thoughts, ideas, and mental flashes.",
      low: "Clear your mental space to allow your air element intuition to flow freely.",
    },
  }

  const level = score >= 70 ? "high" : score >= 45 ? "medium" : "low"
  return (
    insights[element as keyof typeof insights]?.[level] || "Your intuitive journey is unique and full of potential."
  )
}
