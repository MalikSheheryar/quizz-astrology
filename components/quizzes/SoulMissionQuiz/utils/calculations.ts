export const calculateLifePath = (birthDate: string): number => {
  const date = new Date(birthDate)
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

export const getSunSign = (birthDate: string): string => {
  const date = new Date(birthDate)
  const month = date.getMonth() + 1
  const day = date.getDate()

  const signs = [
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

  for (const { sign, start, end } of signs) {
    if ((month === start[0] && day >= start[1]) || (month === end[0] && day <= end[1])) {
      return sign
    }
  }

  return "Capricorn"
}

export const getArchetype = (lifePath: number, quizAnswers: any) => {
  const archetypes = {
    "The Visionary": {
      name: "The Visionary",
      shortDescription: "You are here to see beyond the veil and guide humanity toward a higher future.",
      purpose:
        "Your soul mission is to be a bridge between worlds - the seen and unseen, the present and future. You carry visions of what could be and have the power to inspire others to reach for higher possibilities.",
      deeperPurpose:
        "As a Visionary, you are meant to challenge the status quo and help humanity evolve. Your unique perspective allows you to see solutions others miss and possibilities others fear to imagine.",
      strengths: [
        "Natural intuition and foresight",
        "Ability to inspire and motivate others",
        "Innovative thinking and problem-solving",
        "Strong connection to spiritual realms",
        "Leadership through vision rather than force",
      ],
      lessons: [
        "Learning to ground your visions in practical action",
        "Developing patience with those who can't see your vision",
        "Balancing idealism with realism",
        "Trusting your intuition even when others doubt",
        "Finding the right timing to share your insights",
      ],
      career:
        "You thrive in roles that allow you to innovate, inspire, and create positive change. Consider careers in technology, spiritual guidance, creative arts, social entrepreneurship, or any field where you can pioneer new approaches.",
      love: "In relationships, you need a partner who supports your vision and isn't threatened by your unique perspective. You offer deep spiritual connection and the gift of seeing your partner's highest potential.",
      spirituality:
        "Your spiritual path involves developing your psychic abilities, meditation, and connecting with higher guidance. You may be drawn to ancient wisdom traditions or cutting-edge spiritual practices.",
      affirmation:
        "I trust my vision and have the courage to share it with the world. My unique perspective is a gift that serves the highest good.",
    },
    "The Healer": {
      name: "The Healer",
      shortDescription: "You are here to transform pain into wisdom and help others find wholeness.",
      purpose:
        "Your soul mission is to be a catalyst for healing - whether physical, emotional, mental, or spiritual. You have the gift of seeing what needs to be healed and the compassion to help others through their transformation.",
      deeperPurpose:
        "As a Healer, you understand that true healing goes beyond symptoms to address root causes. You help others not just feel better, but become whole and empowered in their own healing journey.",
      strengths: [
        "Deep empathy and compassion",
        "Natural healing abilities",
        "Ability to see the root of problems",
        "Strong intuitive guidance",
        "Gift for creating safe, sacred spaces",
      ],
      lessons: [
        "Learning to heal yourself first",
        "Setting healthy boundaries with others' pain",
        "Recognizing when to step back and let others heal themselves",
        "Balancing giving with receiving",
        "Trusting the healing process even when progress seems slow",
      ],
      career:
        "You excel in healthcare, therapy, counseling, energy work, or any profession focused on helping others heal and grow. You might also be drawn to teaching, social work, or holistic wellness practices.",
      love: "In relationships, you naturally nurture and support your partner's growth. You need someone who appreciates your caring nature but also encourages you to receive care and support.",
      spirituality:
        "Your spiritual path involves developing your healing gifts, whether through traditional medicine, energy work, or spiritual counseling. You may be called to study various healing modalities.",
      affirmation: "I am a channel for divine healing energy. I heal myself so I can help heal the world.",
    },
    "The Creator": {
      name: "The Creator",
      shortDescription: "You are here to bring new beauty, ideas, and innovations into the world.",
      purpose:
        "Your soul mission is to be a channel for creative expression and to inspire others through your unique artistic vision. You have the power to transform raw materials - whether physical, emotional, or spiritual - into something beautiful and meaningful.",
      deeperPurpose:
        "As a Creator, you understand that creativity is a sacred act that connects you to the divine source of all creation. Your work serves to uplift, inspire, and remind others of the beauty and magic in life.",
      strengths: [
        "Natural artistic and creative abilities",
        "Ability to see beauty in unexpected places",
        "Innovation and original thinking",
        "Emotional depth and sensitivity",
        "Gift for inspiring others through your work",
      ],
      lessons: [
        "Learning to value your creative gifts",
        "Overcoming perfectionism and fear of judgment",
        "Balancing creative passion with practical needs",
        "Sharing your work even when it feels vulnerable",
        "Trusting the creative process and divine timing",
      ],
      career:
        "You thrive in creative fields such as art, music, writing, design, film, or any profession that allows for creative expression. You might also excel in innovation-focused roles in business or technology.",
      love: "In relationships, you need a partner who appreciates and supports your creative nature. You offer deep emotional connection and the gift of seeing and celebrating your partner's unique beauty.",
      spirituality:
        "Your spiritual path involves using creativity as a form of prayer and meditation. You may find the divine through artistic expression, nature, or any practice that connects you to beauty and inspiration.",
      affirmation: "I am a divine creator, and my unique expression brings beauty and joy to the world.",
    },
    "The Guide": {
      name: "The Guide",
      shortDescription: "You are here to help others find their path and navigate life's challenges.",
      purpose:
        "Your soul mission is to be a wise counselor and mentor, helping others discover their own inner wisdom and navigate their spiritual journey. You have the gift of seeing the bigger picture and helping others find their way.",
      deeperPurpose:
        "As a Guide, you serve as a bridge between ancient wisdom and modern understanding. You help others connect with their own inner guidance while providing the support and encouragement they need to trust their path.",
      strengths: [
        "Natural wisdom and insight",
        "Ability to see multiple perspectives",
        "Gift for asking the right questions",
        "Strong listening and counseling skills",
        "Connection to spiritual guidance and ancient wisdom",
      ],
      lessons: [
        "Learning to guide without controlling",
        "Trusting others to find their own answers",
        "Balancing wisdom-sharing with humility",
        "Recognizing when to speak and when to listen",
        "Continuing your own learning and growth",
      ],
      career:
        "You excel as a teacher, counselor, coach, spiritual advisor, or mentor. You might also be drawn to roles in education, psychology, or any field where you can help others grow and develop.",
      love: "In relationships, you naturally support your partner's growth and help them see their potential. You need someone who values wisdom and is committed to their own personal development.",
      spirituality:
        "Your spiritual path involves studying wisdom traditions, developing your intuitive abilities, and learning to channel higher guidance. You may be called to teach or share spiritual insights with others.",
      affirmation: "I trust my inner wisdom and share it lovingly to help others find their path.",
    },
    "The Warrior": {
      name: "The Warrior",
      shortDescription: "You are here to fight for justice, protect the vulnerable, and create positive change.",
      purpose:
        "Your soul mission is to be a champion for truth and justice, using your strength and courage to protect those who cannot protect themselves and to fight for positive change in the world.",
      deeperPurpose:
        "As a Warrior, you understand that true strength comes from love and compassion, not aggression. You fight not to destroy, but to create a better world for all beings.",
      strengths: [
        "Natural courage and determination",
        "Strong sense of justice and fairness",
        "Leadership abilities and charisma",
        "Ability to take action when others hesitate",
        "Protective instincts and loyalty",
      ],
      lessons: [
        "Learning to channel anger and passion constructively",
        "Balancing strength with compassion",
        "Choosing battles wisely and strategically",
        "Working with others rather than going it alone",
        "Finding peaceful solutions when possible",
      ],
      career:
        "You excel in roles that involve advocacy, leadership, law enforcement, military service, activism, or any profession where you can fight for justice and protect others.",
      love: "In relationships, you are fiercely loyal and protective. You need a partner who appreciates your strength but also helps you access your softer, more vulnerable side.",
      spirituality:
        "Your spiritual path involves learning to use your power responsibly and connecting with the warrior traditions that emphasize honor, courage, and service to others.",
      affirmation: "I use my strength and courage to serve the highest good and protect those who need my help.",
    },
    "The Teacher": {
      name: "The Teacher",
      shortDescription: "You are here to share knowledge, inspire learning, and help others grow.",
      purpose:
        "Your soul mission is to be an educator and illuminator, helping others expand their understanding and reach their full potential. You have the gift of making complex concepts accessible and inspiring others to learn and grow.",
      deeperPurpose:
        "As a Teacher, you understand that true education is about awakening the wisdom that already exists within each person. You help others discover their own knowledge and abilities.",
      strengths: [
        "Natural teaching and communication abilities",
        "Patience and understanding with different learning styles",
        "Ability to break down complex concepts",
        "Inspiring and motivating presence",
        "Love of learning and continuous growth",
      ],
      lessons: [
        "Learning to be a student as well as a teacher",
        "Adapting your teaching style to different people",
        "Balancing sharing knowledge with encouraging discovery",
        "Staying humble and open to new perspectives",
        "Recognizing that everyone has something to teach",
      ],
      career:
        "You thrive in education, training, writing, public speaking, or any role where you can share knowledge and help others learn and grow.",
      love: "In relationships, you naturally help your partner learn and grow. You need someone who values learning and is open to the wisdom you have to share.",
      spirituality:
        "Your spiritual path involves continuous learning and sharing wisdom with others. You may be drawn to studying various spiritual traditions and teaching spiritual concepts.",
      affirmation: "I am both teacher and student, sharing wisdom while remaining open to new learning.",
    },
  }

  // Simple algorithm to determine archetype based on life path and quiz answers
  const archetypeKeys = Object.keys(archetypes)
  let selectedArchetype = "The Visionary"

  // Life path influences
  if ([1, 8].includes(lifePath)) selectedArchetype = "The Warrior"
  else if ([2, 6].includes(lifePath)) selectedArchetype = "The Healer"
  else if ([3, 5].includes(lifePath)) selectedArchetype = "The Creator"
  else if ([4, 7].includes(lifePath)) selectedArchetype = "The Guide"
  else if ([9, 11].includes(lifePath)) selectedArchetype = "The Teacher"
  else selectedArchetype = "The Visionary"

  // Quiz answer influences (simplified)
  if (quizAnswers[1] === "crystal" || quizAnswers[1] === "star") selectedArchetype = "The Visionary"
  if (quizAnswers[2] === "peace" || quizAnswers[5] === "helping") selectedArchetype = "The Healer"
  if (quizAnswers[5] === "creating" || quizAnswers[5] === "expressing") selectedArchetype = "The Creator"
  if (quizAnswers[2] === "truth" || quizAnswers[5] === "learning") selectedArchetype = "The Guide"
  if (quizAnswers[2] === "power" || quizAnswers[5] === "leading") selectedArchetype = "The Warrior"

  return archetypes[selectedArchetype as keyof typeof archetypes]
}
