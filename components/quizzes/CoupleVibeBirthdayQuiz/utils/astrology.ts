// Astrology and Numerology Calculation Utilities

const zodiacSigns = {
  aries: {
    element: "Fire",
    dates: [
      [3, 21],
      [4, 19],
    ],
    traits: ["passionate", "energetic", "leadership"],
  },
  taurus: {
    element: "Earth",
    dates: [
      [4, 20],
      [5, 20],
    ],
    traits: ["stable", "sensual", "determined"],
  },
  gemini: {
    element: "Air",
    dates: [
      [5, 21],
      [6, 20],
    ],
    traits: ["communicative", "adaptable", "curious"],
  },
  cancer: {
    element: "Water",
    dates: [
      [6, 21],
      [7, 22],
    ],
    traits: ["nurturing", "emotional", "intuitive"],
  },
  leo: {
    element: "Fire",
    dates: [
      [7, 23],
      [8, 22],
    ],
    traits: ["confident", "creative", "generous"],
  },
  virgo: {
    element: "Earth",
    dates: [
      [8, 23],
      [9, 22],
    ],
    traits: ["analytical", "practical", "helpful"],
  },
  libra: {
    element: "Air",
    dates: [
      [9, 23],
      [10, 22],
    ],
    traits: ["harmonious", "diplomatic", "aesthetic"],
  },
  scorpio: {
    element: "Water",
    dates: [
      [10, 23],
      [11, 21],
    ],
    traits: ["intense", "transformative", "mysterious"],
  },
  sagittarius: {
    element: "Fire",
    dates: [
      [11, 22],
      [12, 21],
    ],
    traits: ["adventurous", "philosophical", "optimistic"],
  },
  capricorn: {
    element: "Earth",
    dates: [
      [12, 22],
      [1, 19],
    ],
    traits: ["ambitious", "disciplined", "practical"],
  },
  aquarius: {
    element: "Air",
    dates: [
      [1, 20],
      [2, 18],
    ],
    traits: ["innovative", "humanitarian", "independent"],
  },
  pisces: {
    element: "Water",
    dates: [
      [2, 19],
      [3, 20],
    ],
    traits: ["intuitive", "compassionate", "artistic"],
  },
}

const coupleArchetypes = {
  "power-duo": {
    name: "The Power Duo",
    shortDescription: "Ambitious, driven, and unstoppable together — you amplify each other's success.",
    compatibilityRange: [4, 5],
    elements: ["Fire-Fire", "Earth-Earth", "Fire-Earth"],
    energyDynamic:
      "You two are a force of nature when you combine your energies. Both driven by success and achievement, you understand each other's ambitions and provide the perfect support system. Your relationship thrives on mutual respect, shared goals, and the excitement of conquering challenges together.",
    energyQuote: "Together we rise, together we conquer, together we shine.",
    strengths: [
      {
        title: "Mutual Ambition",
        description: "You both understand the drive for success and support each other's goals",
      },
      { title: "Leadership Balance", description: "You naturally take turns leading in different areas of life" },
      { title: "Resilience Together", description: "Challenges only make your bond stronger" },
      { title: "Inspiring Growth", description: "You push each other to become the best versions of yourselves" },
    ],
    growthAreas:
      "Remember to make time for relaxation and emotional connection beyond your shared ambitions. Sometimes the drive for success can overshadow the need for intimate, quiet moments together.",
    guidance: [
      "Schedule regular date nights without discussing work or goals",
      "Practice expressing vulnerability and softer emotions",
      "Celebrate small wins together, not just major achievements",
      "Create rituals that honor your emotional bond",
    ],
    uniqueLove:
      "What makes your love special is how you see each other as true equals and partners in every sense. You don't just love each other — you genuinely admire and respect each other's capabilities and dreams.",
    luckyDates: ["New Moon phases", "Sundays", "8th of any month", "During Mercury direct periods"],
    sharedRitual: "Create a monthly 'vision board' session where you plan your shared dreams and goals together",
  },
  "soulmate-healers": {
    name: "The Soulmate Healers",
    shortDescription: "Deeply intuitive and emotionally connected — you heal and nurture each other's souls.",
    compatibilityRange: [4, 5],
    elements: ["Water-Water", "Water-Earth", "Water-Air"],
    energyDynamic:
      "Your connection transcends the physical realm. You have an almost psychic understanding of each other's needs and emotions. Together, you create a safe haven where both souls can heal, grow, and flourish. Your love is transformative and deeply spiritual.",
    energyQuote: "In your eyes, I found my home; in your heart, I found my healing.",
    strengths: [
      { title: "Emotional Intelligence", description: "You both understand and navigate emotions with wisdom" },
      { title: "Intuitive Connection", description: "You often know what the other needs without words" },
      { title: "Healing Presence", description: "You naturally comfort and heal each other's wounds" },
      { title: "Spiritual Growth", description: "Together you explore deeper meanings and spiritual connection" },
    ],
    growthAreas:
      "While your emotional connection is beautiful, remember to maintain your individual identities and interests. Sometimes you may absorb each other's emotions too deeply.",
    guidance: [
      "Practice healthy emotional boundaries",
      "Maintain individual hobbies and friendships",
      "Use grounding techniques when emotions feel overwhelming",
      "Create space for both togetherness and solitude",
    ],
    uniqueLove:
      "Your love is like a gentle river that flows deep and steady. You don't just love each other — you truly see and accept each other's souls, shadows and light alike.",
    luckyDates: ["Full Moon phases", "Fridays", "7th of any month", "During water sign seasons"],
    sharedRitual: "Practice daily gratitude sharing and weekly meditation or spiritual practice together",
  },
  "passion-pair": {
    name: "The Passion Pair",
    shortDescription: "Intense, magnetic, and full of fire — your love burns bright and transforms everything.",
    compatibilityRange: [3, 5],
    elements: ["Fire-Water", "Fire-Fire", "Water-Water"],
    energyDynamic:
      "Your relationship is like a beautiful dance of fire and intensity. The chemistry between you is undeniable, and your emotional connection runs deep. You experience life in vivid colors together, feeling everything intensely and authentically.",
    energyQuote: "We don't just love — we ignite, we transform, we become.",
    strengths: [
      { title: "Magnetic Chemistry", description: "The attraction between you is powerful and lasting" },
      { title: "Emotional Depth", description: "You're not afraid to feel deeply and love intensely" },
      { title: "Transformative Love", description: "Your relationship changes and evolves you both" },
      { title: "Authentic Expression", description: "You can be completely yourselves with each other" },
    ],
    growthAreas:
      "Your intensity is beautiful but can sometimes lead to dramatic conflicts. Learning to channel your passion constructively will strengthen your bond.",
    guidance: [
      "Practice calm communication during disagreements",
      "Channel intense emotions into creative or physical activities",
      "Take cooling-off periods when tensions rise",
      "Celebrate your passion while building stability",
    ],
    uniqueLove:
      "Your love story is one of transformation and rebirth. Together, you've discovered parts of yourselves you never knew existed, and your love continues to evolve and deepen.",
    luckyDates: ["Tuesday evenings", "9th of any month", "During fire sign seasons", "Solar eclipse dates"],
    sharedRitual: "Create a weekly 'passion project' where you work on something creative or meaningful together",
  },
  "magnetic-opposites": {
    name: "The Magnetic Opposites",
    shortDescription: "Different in every way but perfectly balanced — you complete each other beautifully.",
    compatibilityRange: [3, 4],
    elements: ["Fire-Water", "Earth-Air", "Fire-Air", "Earth-Water"],
    energyDynamic:
      "You prove that opposites truly do attract. Where one of you is strong, the other is gentle. Where one is practical, the other is dreamy. Your differences don't divide you — they create a perfect, dynamic balance that makes you both more complete.",
    energyQuote: "In our differences, we find our completeness; in our balance, we find our strength.",
    strengths: [
      { title: "Perfect Balance", description: "Your different strengths complement each other beautifully" },
      { title: "Continuous Learning", description: "You constantly learn and grow from each other's perspectives" },
      { title: "Dynamic Energy", description: "Your relationship never gets boring or stagnant" },
      { title: "Expanded Worldview", description: "Together you see life from multiple angles" },
    ],
    growthAreas:
      "Sometimes your differences can lead to misunderstandings. Focus on appreciating rather than trying to change each other's unique qualities.",
    guidance: [
      "Practice patience when you don't immediately understand each other",
      "Celebrate your differences as strengths, not obstacles",
      "Find common ground in your shared values and dreams",
      "Use your different perspectives to solve problems creatively",
    ],
    uniqueLove:
      "Your love is like a beautiful dance of yin and yang. You've learned that love isn't about finding someone exactly like you — it's about finding someone who makes you more yourself.",
    luckyDates: ["Equinox dates", "Wednesdays", "6th of any month", "During transition seasons"],
    sharedRitual: "Take turns planning surprise dates that reflect each other's interests and preferences",
  },
  dreamers: {
    name: "The Dreamers",
    shortDescription: "Imaginative, intuitive, and magical — you create a world of wonder together.",
    compatibilityRange: [4, 5],
    elements: ["Water-Air", "Air-Air", "Water-Water"],
    energyDynamic:
      "Your relationship exists in a realm of imagination, creativity, and spiritual connection. Together, you dream big and believe in magic. Your love is ethereal, inspiring, and filled with possibility.",
    energyQuote: "Together we dream in colors that don't exist and believe in magic that others can't see.",
    strengths: [
      { title: "Creative Synergy", description: "Your imaginations combine to create beautiful possibilities" },
      { title: "Spiritual Connection", description: "You share a deep understanding of life's mysteries" },
      { title: "Emotional Intuition", description: "You understand each other on an almost psychic level" },
      { title: "Inspiring Vision", description: "Together you envision and work toward beautiful futures" },
    ],
    growthAreas:
      "While your dreams are beautiful, remember to stay grounded in practical reality. Balance your ethereal connection with concrete actions and goals.",
    guidance: [
      "Set practical goals alongside your big dreams",
      "Create routines that keep you grounded",
      "Support each other in turning dreams into reality",
      "Practice mindfulness to stay present together",
    ],
    uniqueLove:
      "Your love is like a fairy tale that you're writing together. You see magic in everyday moments and believe in the impossible, making your relationship a source of wonder and inspiration.",
    luckyDates: ["New Moon phases", "Thursdays", "11th of any month", "During Pisces season"],
    sharedRitual: "Keep a shared dream journal where you record your visions, goals, and magical moments together",
  },
  "balanced-builders": {
    name: "The Balanced Builders",
    shortDescription: "Stable, supportive, and steadily growing — you build a lasting foundation together.",
    compatibilityRange: [4, 5],
    elements: ["Earth-Earth", "Earth-Air", "Earth-Water"],
    energyDynamic:
      "Your relationship is built on solid ground with deep roots and steady growth. You understand that true love is not just passion — it's partnership, commitment, and the daily choice to build something beautiful together.",
    energyQuote: "Love is not just a feeling — it's the foundation we build our dreams upon, brick by brick.",
    strengths: [
      { title: "Solid Foundation", description: "Your relationship is built on trust, respect, and commitment" },
      { title: "Steady Growth", description: "You continuously work on improving yourselves and your relationship" },
      { title: "Practical Partnership", description: "You handle life's challenges as a united team" },
      { title: "Long-term Vision", description: "You plan and build toward a shared future together" },
    ],
    growthAreas:
      "Your stability is wonderful, but don't forget to inject spontaneity and playfulness into your relationship. Sometimes the most solid foundations need a little shake-up to stay vibrant.",
    guidance: [
      "Plan regular spontaneous adventures or surprises",
      "Try new experiences together to keep things fresh",
      "Express appreciation for each other daily",
      "Balance planning with present-moment enjoyment",
    ],
    uniqueLove:
      "Your love is like a mighty oak tree — it grows slowly but surely, with roots so deep that no storm can shake it. You've chosen to love not just with your hearts, but with your actions every single day.",
    luckyDates: ["Saturdays", "4th of any month", "During earth sign seasons", "Anniversary dates"],
    sharedRitual: "Have a monthly 'relationship check-in' where you discuss goals, appreciations, and dreams together",
  },
  "cosmic-mirrors": {
    name: "The Cosmic Mirrors",
    shortDescription: "Eerily similar and deeply connected — you reflect each other's souls perfectly.",
    compatibilityRange: [4, 5],
    elements: ["Same-element pairs", "Air-Air", "Water-Water"],
    energyDynamic:
      "You are like two halves of the same cosmic soul. Your similarities run so deep that you often finish each other's sentences and share the same thoughts. Your connection feels destined, as if the universe conspired to bring you together.",
    energyQuote: "In you, I see myself; in us, I see the universe's perfect design.",
    strengths: [
      { title: "Deep Understanding", description: "You truly 'get' each other in ways others might not" },
      { title: "Effortless Communication", description: "You often communicate without words" },
      { title: "Shared Values", description: "Your core beliefs and values align naturally" },
      { title: "Synchronized Growth", description: "You evolve and change at the same pace" },
    ],
    growthAreas:
      "Your similarity is beautiful but can sometimes create an echo chamber. Make sure to maintain individual interests and challenge each other to grow.",
    guidance: [
      "Cultivate individual hobbies and interests",
      "Seek out new experiences that challenge you both",
      "Practice healthy independence within your togetherness",
      "Encourage each other to explore different perspectives",
    ],
    uniqueLove:
      "Your love is like looking into a cosmic mirror that reflects not just who you are, but who you're meant to become. You've found your perfect match in every sense of the word.",
    luckyDates: [
      "11:11 dates",
      "Mirror dates (12/21, 10/01)",
      "During your birth months",
      "Synchronistic number patterns",
    ],
    sharedRitual: "Practice daily synchronicity awareness — notice and share the meaningful coincidences in your lives",
  },
}

export const getZodiacSign = (birthDate) => {
  const date = new Date(birthDate)
  const month = date.getMonth() + 1
  const day = date.getDate()

  for (const [sign, data] of Object.entries(zodiacSigns)) {
    const [[startMonth, startDay], [endMonth, endDay]] = data.dates

    if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay) ||
      (startMonth > endMonth && month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay)
    ) {
      return { sign: sign.charAt(0).toUpperCase() + sign.slice(1), element: data.element, traits: data.traits }
    }
  }

  return { sign: "Unknown", element: "Unknown", traits: [] }
}

export const calculateLifePath = (birthDate) => {
  const date = new Date(birthDate)
  const dateString =
    date.getFullYear().toString() +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    date.getDate().toString().padStart(2, "0")

  let sum = dateString.split("").reduce((acc, digit) => acc + Number.parseInt(digit), 0)

  while (sum > 9 && sum !== 11 && sum !== 22) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc, digit) => acc + Number.parseInt(digit), 0)
  }

  return sum
}

export const determineArchetype = (yourSign, partnerSign, quizAnswers) => {
  const yourElement = yourSign.element
  const partnerElement = partnerSign.element
  const elementPair = `${yourElement}-${partnerElement}`

  // Score different archetypes based on elements and quiz answers
  const scores = {
    "power-duo": 0,
    "soulmate-healers": 0,
    "passion-pair": 0,
    "magnetic-opposites": 0,
    dreamers: 0,
    "balanced-builders": 0,
    "cosmic-mirrors": 0,
  }

  // Element-based scoring
  if (yourElement === partnerElement) {
    scores["cosmic-mirrors"] += 3
    if (yourElement === "Fire") scores["passion-pair"] += 2
    if (yourElement === "Earth") scores["balanced-builders"] += 2
    if (yourElement === "Water") scores["soulmate-healers"] += 2
    if (yourElement === "Air") scores["dreamers"] += 2
  } else {
    scores["magnetic-opposites"] += 2
    if (
      (yourElement === "Fire" && partnerElement === "Earth") ||
      (yourElement === "Earth" && partnerElement === "Fire")
    ) {
      scores["power-duo"] += 2
    }
    if (
      (yourElement === "Fire" && partnerElement === "Water") ||
      (yourElement === "Water" && partnerElement === "Fire")
    ) {
      scores["passion-pair"] += 2
    }
    if (
      (yourElement === "Water" && partnerElement === "Air") ||
      (yourElement === "Air" && partnerElement === "Water")
    ) {
      scores["dreamers"] += 2
    }
  }

  // Quiz answer-based scoring
  if (quizAnswers.symbol) {
    if (["passion", "fire"].includes(quizAnswers.symbol)) scores["passion-pair"] += 2
    if (["connection", "completion"].includes(quizAnswers.symbol)) scores["soulmate-healers"] += 2
    if (["transformation", "cosmic"].includes(quizAnswers.symbol)) scores["power-duo"] += 1
    if (["magic", "cosmic"].includes(quizAnswers.symbol)) scores["dreamers"] += 2
  }

  if (quizAnswers.frequency) {
    if (["electric", "fiery"].includes(quizAnswers.frequency)) scores["passion-pair"] += 2
    if (["nurturing", "stable"].includes(quizAnswers.frequency)) scores["balanced-builders"] += 2
    if (["mysterious", "expansive"].includes(quizAnswers.frequency)) scores["dreamers"] += 1
  }

  if (quizAnswers.dynamic) {
    if (quizAnswers.dynamic === "complement") scores["magnetic-opposites"] += 2
    if (quizAnswers.dynamic === "similar") scores["cosmic-mirrors"] += 2
    if (quizAnswers.dynamic === "opposites") scores["magnetic-opposites"] += 3
    if (quizAnswers.dynamic === "balance") scores["balanced-builders"] += 2
  }

  if (quizAnswers.connection_type) {
    if (quizAnswers.connection_type === "emotional") scores["soulmate-healers"] += 2
    if (quizAnswers.connection_type === "physical") scores["passion-pair"] += 2
    if (quizAnswers.connection_type === "spiritual") scores["dreamers"] += 2
    if (quizAnswers.connection_type === "balanced") scores["balanced-builders"] += 1
  }

  // Find the highest scoring archetype
  const topArchetype = Object.entries(scores).reduce((a, b) => (scores[a[0]] > scores[b[0]] ? a : b))[0]

  return topArchetype
}

export const calculateCompatibility = (coupleData, quizAnswers) => {
  const yourSign = getZodiacSign(coupleData.yourBirthDate)
  const partnerSign = getZodiacSign(coupleData.partnerBirthDate)
  const yourLifePath = calculateLifePath(coupleData.yourBirthDate)
  const partnerLifePath = calculateLifePath(coupleData.partnerBirthDate)

  const archetype = determineArchetype(yourSign, partnerSign, quizAnswers)
  const archetypeData = coupleArchetypes[archetype]

  // Calculate compatibility score based on multiple factors
  let compatibilityScore = 3 // Base score

  // Element compatibility
  if (yourSign.element === partnerSign.element) {
    compatibilityScore += 1
  } else if (
    (yourSign.element === "Fire" && ["Air", "Fire"].includes(partnerSign.element)) ||
    (yourSign.element === "Earth" && ["Water", "Earth"].includes(partnerSign.element)) ||
    (yourSign.element === "Air" && ["Fire", "Air"].includes(partnerSign.element)) ||
    (yourSign.element === "Water" && ["Earth", "Water"].includes(partnerSign.element))
  ) {
    compatibilityScore += 0.5
  }

  // Life path compatibility
  const lifePathDiff = Math.abs(yourLifePath - partnerLifePath)
  if (lifePathDiff <= 2) compatibilityScore += 0.5

  // Quiz answer bonuses
  if (quizAnswers.emotional_sync >= 7) compatibilityScore += 0.5
  if (quizAnswers.connection_type === "balanced") compatibilityScore += 0.5

  // Ensure score is within archetype range
  const [minScore, maxScore] = archetypeData.compatibilityRange
  compatibilityScore = Math.max(minScore, Math.min(maxScore, Math.round(compatibilityScore)))

  return {
    archetype,
    name: archetypeData.name,
    shortDescription: archetypeData.shortDescription,
    compatibilityScore,
    yourSign: yourSign.sign,
    yourElement: yourSign.element,
    yourLifePath,
    partnerSign: partnerSign.sign,
    partnerElement: partnerSign.element,
    partnerLifePath,
    energyDynamic: archetypeData.energyDynamic,
    energyQuote: archetypeData.energyQuote,
    strengths: archetypeData.strengths,
    growthAreas: archetypeData.growthAreas,
    guidance: archetypeData.guidance,
    uniqueLove: archetypeData.uniqueLove,
    luckyDates: archetypeData.luckyDates,
    sharedRitual: archetypeData.sharedRitual,
  }
}
