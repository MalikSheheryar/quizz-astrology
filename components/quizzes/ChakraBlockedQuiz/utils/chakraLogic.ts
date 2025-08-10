export const calculateChakraScores = (responses: Record<string, any>, questions: any[]) => {
  const scores = {
    root: 0,
    sacral: 0,
    solarPlexus: 0,
    heart: 0,
    throat: 0,
    thirdEye: 0,
    crown: 0,
  }

  // Process each response
  Object.entries(responses).forEach(([questionId, answer]) => {
    const question = questions.find((q) => q.id === questionId)
    if (!question) return

    if (question.type === "slider") {
      // Handle slider questions with inverse scoring
      Object.entries(question.chakras).forEach(([chakra, scoring]) => {
        if (scoring === "inverse") {
          // Lower slider values = higher blockage score
          const blockageScore = Math.max(0, 10 - answer)
          scores[chakra as keyof typeof scores] += blockageScore
        }
      })
    } else if (question.type === "imageChoice") {
      // Handle image choice questions
      const selectedOption = question.options.find((opt: any) => opt.id === answer)
      if (selectedOption && selectedOption.chakras) {
        Object.entries(selectedOption.chakras).forEach(([chakra, points]) => {
          scores[chakra as keyof typeof scores] += points as number
        })
      }
    } else if (question.type === "chips" && question.multiple) {
      // Handle multiple choice chip questions
      if (Array.isArray(answer)) {
        answer.forEach((selectedId) => {
          const selectedOption = question.options.find((opt: any) => opt.id === selectedId)
          if (selectedOption && selectedOption.chakras) {
            Object.entries(selectedOption.chakras).forEach(([chakra, points]) => {
              scores[chakra as keyof typeof scores] += points as number
            })
          }
        })
      }
    }
  })

  return scores
}

export const rankChakras = (scores: Record<string, number>) => {
  const sortedChakras = Object.entries(scores)
    .map(([name, score]) => ({ name, score }))
    .sort((a, b) => b.score - a.score)

  return {
    primary: sortedChakras[0],
    secondary: sortedChakras[1],
    all: sortedChakras,
  }
}

export const getChakraInfo = (chakraName: string) => {
  const chakraData: Record<string, any> = {
    root: {
      name: "Root",
      sanskrit: "Muladhara",
      location: "Base of spine",
      color: "Red",
      symbol: "🔴",
      bgColor: "bg-red-500/20",
      textColor: "text-red-400",
    },
    sacral: {
      name: "Sacral",
      sanskrit: "Svadhisthana",
      location: "Lower abdomen",
      color: "Orange",
      symbol: "🟠",
      bgColor: "bg-orange-500/20",
      textColor: "text-orange-400",
    },
    solarPlexus: {
      name: "Solar Plexus",
      sanskrit: "Manipura",
      location: "Upper abdomen",
      color: "Yellow",
      symbol: "🟡",
      bgColor: "bg-yellow-500/20",
      textColor: "text-yellow-400",
    },
    heart: {
      name: "Heart",
      sanskrit: "Anahata",
      location: "Center of chest",
      color: "Green",
      symbol: "💚",
      bgColor: "bg-green-500/20",
      textColor: "text-green-400",
    },
    throat: {
      name: "Throat",
      sanskrit: "Vishuddha",
      location: "Throat",
      color: "Blue",
      symbol: "🔵",
      bgColor: "bg-blue-500/20",
      textColor: "text-blue-400",
    },
    thirdEye: {
      name: "Third Eye",
      sanskrit: "Ajna",
      location: "Between eyebrows",
      color: "Indigo",
      symbol: "🟣",
      bgColor: "bg-indigo-500/20",
      textColor: "text-indigo-400",
    },
    crown: {
      name: "Crown",
      sanskrit: "Sahasrara",
      location: "Top of head",
      color: "Violet",
      symbol: "🟪",
      bgColor: "bg-purple-500/20",
      textColor: "text-purple-400",
    },
  }

  return chakraData[chakraName] || chakraData.root
}

export const getPersonalizedInsights = (primaryChakra: string, quizData: any, userData: any) => {
  const insights: Record<string, any> = {
    root: {
      quickInsight: "You're feeling ungrounded and seeking more stability in your foundation.",
      whyBlocked:
        "Your root chakra appears blocked, likely due to recent changes, financial stress, or feeling unsafe in your environment. This chakra governs your sense of security and belonging.",
      signs: [
        "Feeling anxious or worried about basic needs",
        "Difficulty making decisions or taking action",
        "Physical tension in legs, feet, or lower back",
        "Feeling disconnected from your body",
        "Struggling with trust issues",
      ],
      quickPractices: [
        "Stand barefoot on grass or earth for 5 minutes",
        "Practice deep belly breathing while visualizing red light",
        "Do grounding exercises like squats or walking",
      ],
      dailyRitual: {
        breathwork: "4-7-8 breathing technique focusing on the base of your spine",
        movement: "Gentle yoga poses like child's pose and mountain pose",
        journaling: "Write about what makes you feel safe and secure",
        affirmation: "I am safe, I am grounded, I belong here",
      },
      supportive: {
        crystal: "Red Jasper",
        foods: "Root vegetables",
        sound: "LAM mantra",
      },
    },
    sacral: {
      quickInsight: "Your creative and sensual energy feels blocked or suppressed.",
      whyBlocked:
        "Your sacral chakra is blocked, often due to creative blocks, relationship issues, or suppressed emotions. This chakra governs creativity, sexuality, and emotional flow.",
      signs: [
        "Lack of creative inspiration or motivation",
        "Difficulty expressing emotions",
        "Issues with intimacy or sexuality",
        "Feeling emotionally numb or overwhelmed",
        "Lower back or hip pain",
      ],
      quickPractices: [
        "Hip circles and pelvic movements",
        "Creative expression through art or dance",
        "Orange light visualization in lower abdomen",
      ],
      dailyRitual: {
        breathwork: "Circular breathing focusing on the lower belly",
        movement: "Hip-opening yoga poses and flowing movements",
        journaling: "Explore your desires and creative dreams",
        affirmation: "I embrace my creativity and sensuality",
      },
      supportive: {
        crystal: "Carnelian",
        foods: "Orange fruits",
        sound: "VAM mantra",
      },
    },
    solarPlexus: {
      quickInsight: "You're struggling with personal power and confidence.",
      whyBlocked:
        "Your solar plexus chakra is blocked, often due to low self-esteem, control issues, or feeling powerless. This chakra governs personal power, confidence, and decision-making.",
      signs: [
        "Difficulty making decisions",
        "Low self-confidence or self-worth",
        "Digestive issues or stomach problems",
        "Feeling like a victim or powerless",
        "Either overly controlling or completely passive",
      ],
      quickPractices: [
        "Core strengthening exercises",
        "Yellow light visualization in solar plexus",
        "Power poses like warrior pose",
      ],
      dailyRitual: {
        breathwork: "Fire breath (rapid belly breathing)",
        movement: "Core-strengthening yoga and confident postures",
        journaling: "Write about your personal strengths and achievements",
        affirmation: "I am confident, powerful, and worthy",
      },
      supportive: {
        crystal: "Citrine",
        foods: "Yellow foods",
        sound: "RAM mantra",
      },
    },
    heart: {
      quickInsight: "Your heart feels closed or guarded from past hurts.",
      whyBlocked:
        "Your heart chakra is blocked, often due to heartbreak, grief, or fear of vulnerability. This chakra governs love, compassion, and emotional connection.",
      signs: [
        "Difficulty trusting others",
        "Feeling emotionally closed off",
        "Chest tightness or heart palpitations",
        "Struggling with self-love",
        "Either overly giving or completely withdrawn",
      ],
      quickPractices: [
        "Heart-opening stretches and backbends",
        "Green light visualization in chest area",
        "Loving-kindness meditation",
      ],
      dailyRitual: {
        breathwork: "Heart-centered breathing with hands on chest",
        movement: "Heart-opening yoga poses and arm circles",
        journaling: "Write gratitude letters to yourself and others",
        affirmation: "I am worthy of love and I give love freely",
      },
      supportive: {
        crystal: "Rose Quartz",
        foods: "Green leafy vegetables",
        sound: "YAM mantra",
      },
    },
    throat: {
      quickInsight: "You're having trouble expressing your authentic voice.",
      whyBlocked:
        "Your throat chakra is blocked, often due to fear of speaking up, past criticism, or suppressed communication. This chakra governs self-expression and authentic communication.",
      signs: [
        "Difficulty expressing thoughts and feelings",
        "Fear of speaking in public",
        "Throat problems or voice issues",
        "Feeling unheard or misunderstood",
        "Either talking too much or staying silent",
      ],
      quickPractices: [
        "Neck rolls and throat stretches",
        "Blue light visualization in throat area",
        "Humming or chanting",
      ],
      dailyRitual: {
        breathwork: "Ujjayi breath (ocean breath)",
        movement: "Neck and shoulder releases, fish pose",
        journaling: "Write your truth without censoring",
        affirmation: "I speak my truth with confidence and clarity",
      },
      supportive: {
        crystal: "Blue Lace Agate",
        foods: "Blue foods and herbal teas",
        sound: "HAM mantra",
      },
    },
    thirdEye: {
      quickInsight: "Your intuition and inner wisdom feel clouded.",
      whyBlocked:
        "Your third eye chakra is blocked, often due to overthinking, lack of trust in intuition, or mental fog. This chakra governs intuition, wisdom, and spiritual insight.",
      signs: [
        "Difficulty trusting your intuition",
        "Mental fog or confusion",
        "Headaches or eye strain",
        "Feeling disconnected from inner wisdom",
        "Either overly analytical or completely spacey",
      ],
      quickPractices: [
        "Gentle forehead massage",
        "Indigo light visualization between eyebrows",
        "Meditation and mindfulness practices",
      ],
      dailyRitual: {
        breathwork: "Alternate nostril breathing",
        movement: "Forward folds and child's pose",
        journaling: "Record dreams and intuitive insights",
        affirmation: "I trust my inner wisdom and intuition",
      },
      supportive: {
        crystal: "Amethyst",
        foods: "Purple foods and brain-healthy nuts",
        sound: "OM mantra",
      },
    },
    crown: {
      quickInsight: "You feel disconnected from your higher purpose and spirituality.",
      whyBlocked:
        "Your crown chakra is blocked, often due to spiritual disconnection, lack of purpose, or feeling isolated from the divine. This chakra governs spiritual connection and higher consciousness.",
      signs: [
        "Feeling disconnected from purpose",
        "Lack of spiritual connection",
        "Depression or existential crisis",
        "Feeling isolated or alone",
        "Either overly attached to material things or completely detached",
      ],
      quickPractices: ["Crown of head massage", "Violet light visualization at top of head", "Meditation and prayer"],
      dailyRitual: {
        breathwork: "Silent breath awareness meditation",
        movement: "Headstand or legs up the wall pose",
        journaling: "Explore your spiritual beliefs and purpose",
        affirmation: "I am connected to divine wisdom and universal love",
      },
      supportive: {
        crystal: "Clear Quartz",
        foods: "Light, pure foods and fasting",
        sound: "Silence or AUM",
      },
    },
  }

  return insights[primaryChakra] || insights.root
}
