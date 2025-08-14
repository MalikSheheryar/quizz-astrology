// Zodiac sign calculation and compatibility logic

export const calculateZodiacSign = (birthdate: string): string => {
  const date = new Date(birthdate)
  const month = date.getMonth() + 1
  const day = date.getDate()

  const zodiacSigns = [
    { sign: "Capricorn", start: [12, 22], end: [1, 19] },
    { sign: "Aquarius", start: [1, 20], end: [2, 18] },
    { sign: "Pisces", start: [2, 19], end: [3, 20] },
    { sign: "Aries", start: [3, 21], end: [4, 19] },
    { sign: "Taurus", start: [4, 20], end: [5, 20] },
    { sign: "Gemini", start: [5, 21], end: [6, 20] },
    { sign: "Cancer", start: [6, 21], end: [7, 22] },
    { sign: "Leo", start: [7, 23], end: [8, 22] },
    { sign: "Virgo", start: [8, 23], end: [9, 22] },
    { sign: "Libra", start: [9, 23], end: [10, 22] },
    { sign: "Scorpio", start: [10, 23], end: [11, 21] },
    { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
  ]

  for (const zodiac of zodiacSigns) {
    const [startMonth, startDay] = zodiac.start
    const [endMonth, endDay] = zodiac.end

    if (zodiac.sign === "Capricorn") {
      if ((month === 12 && day >= startDay) || (month === 1 && day <= endDay)) {
        return zodiac.sign
      }
    } else {
      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay) ||
        (month > startMonth && month < endMonth)
      ) {
        return zodiac.sign
      }
    }
  }

  return "Unknown"
}

export const getZodiacElement = (sign: string): string => {
  const elements: Record<string, string> = {
    Aries: "Fire",
    Leo: "Fire",
    Sagittarius: "Fire",
    Taurus: "Earth",
    Virgo: "Earth",
    Capricorn: "Earth",
    Gemini: "Air",
    Libra: "Air",
    Aquarius: "Air",
    Cancer: "Water",
    Scorpio: "Water",
    Pisces: "Water",
  }
  return elements[sign] || "Unknown"
}

export const calculateElementCompatibility = (sign1: string, sign2: string): number => {
  const element1 = getZodiacElement(sign1)
  const element2 = getZodiacElement(sign2)

  const compatibilityMatrix: Record<string, Record<string, number>> = {
    Fire: { Fire: 85, Air: 90, Earth: 60, Water: 55 },
    Air: { Fire: 90, Air: 80, Earth: 55, Water: 65 },
    Earth: { Fire: 60, Air: 55, Earth: 85, Water: 90 },
    Water: { Fire: 55, Air: 65, Earth: 90, Water: 85 },
  }

  return compatibilityMatrix[element1]?.[element2] || 50
}

export const calculateSignCompatibility = (sign1: string, sign2: string): number => {
  const specificCompatibility: Record<string, Record<string, number>> = {
    // Fire signs
    Aries: { Leo: 95, Sagittarius: 92, Gemini: 88, Aquarius: 85, Libra: 82 },
    Leo: { Aries: 95, Sagittarius: 90, Gemini: 85, Libra: 88, Aquarius: 80 },
    Sagittarius: { Aries: 92, Leo: 90, Aquarius: 88, Libra: 85, Gemini: 82 },

    // Earth signs
    Taurus: { Virgo: 92, Capricorn: 90, Cancer: 88, Pisces: 85, Scorpio: 80 },
    Virgo: { Taurus: 92, Capricorn: 88, Cancer: 85, Scorpio: 87, Pisces: 82 },
    Capricorn: { Taurus: 90, Virgo: 88, Scorpio: 85, Pisces: 83, Cancer: 80 },

    // Air signs
    Gemini: { Libra: 90, Aquarius: 88, Aries: 88, Leo: 85, Sagittarius: 82 },
    Libra: { Gemini: 90, Aquarius: 85, Leo: 88, Sagittarius: 85, Aries: 82 },
    Aquarius: { Gemini: 88, Libra: 85, Sagittarius: 88, Aries: 85, Leo: 80 },

    // Water signs
    Cancer: { Scorpio: 92, Pisces: 90, Taurus: 88, Virgo: 85, Capricorn: 80 },
    Scorpio: { Cancer: 92, Pisces: 88, Capricorn: 85, Virgo: 87, Taurus: 80 },
    Pisces: { Cancer: 90, Scorpio: 88, Taurus: 85, Capricorn: 83, Virgo: 82 },
  }

  return (
    specificCompatibility[sign1]?.[sign2] ||
    specificCompatibility[sign2]?.[sign1] ||
    calculateElementCompatibility(sign1, sign2)
  )
}

export const getCompatibilityScore = (
  userSign: string,
  partnerSign: string,
  answers: Record<number, string>,
): number => {
  // Base compatibility from zodiac signs
  const baseScore = calculateSignCompatibility(userSign, partnerSign)

  // Adjust based on quiz answers
  let adjustmentScore = 0

  // Connection feeling adjustment
  if (answers[2]) {
    const connectionScores: Record<string, number> = {
      lost: -5,
      connected: 10,
      pull: 8,
      peaceful: 12,
    }
    adjustmentScore += connectionScores[answers[2]] || 0
  }

  // Love language compatibility
  if (answers[3]) {
    const loveLanguageScores: Record<string, number> = {
      "touch-words": 8,
      "time-acts": 10,
      "gifts-touch": 6,
      "words-time": 9,
    }
    adjustmentScore += loveLanguageScores[answers[3]] || 0
  }

  // Symbol resonance
  if (answers[4]) {
    const symbolScores: Record<string, number> = {
      "sun-moon": 12,
      stars: 10,
      ocean: 8,
      fire: 9,
    }
    adjustmentScore += symbolScores[answers[4]] || 0
  }

  // Intuition level
  if (answers[6]) {
    const intuitionScores: Record<string, number> = {
      instant: 15,
      minutes: 10,
      conversation: 5,
      told: 0,
    }
    adjustmentScore += intuitionScores[answers[6]] || 0
  }

  // Soul connection belief
  if (answers[7]) {
    const soulScores: Record<string, number> = {
      definitely: 15,
      probably: 10,
      maybe: 5,
      unsure: 0,
    }
    adjustmentScore += soulScores[answers[7]] || 0
  }

  // Communication style
  if (answers[8]) {
    const communicationScores: Record<string, number> = {
      passionate: 8,
      space: 10,
      talk: 12,
      emotional: 7,
    }
    adjustmentScore += communicationScores[answers[8]] || 0
  }

  // Calculate final score
  const finalScore = Math.min(100, Math.max(0, baseScore + adjustmentScore))
  return Math.round(finalScore)
}
