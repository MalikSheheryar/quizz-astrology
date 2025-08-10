export const questions = [
  {
    id: 1,
    question: "When faced with a difficult decision, what's your first instinct?",
    options: [
      { text: "Analyze all the facts and data", planet: "Mercury", icon: "🧠" },
      { text: "Follow what feels right in your heart", planet: "Venus", icon: "💖" },
      { text: "Take immediate action", planet: "Mars", icon: "⚡" },
      { text: "Consider the bigger picture", planet: "Jupiter", icon: "🌍" },
    ],
  },
  {
    id: 2,
    question: "How do you handle conflict in relationships?",
    options: [
      { text: "Try to communicate and find compromise", planet: "Mercury", icon: "🗣️" },
      { text: "Seek harmony and avoid confrontation", planet: "Venus", icon: "🕊️" },
      { text: "Stand your ground firmly", planet: "Mars", icon: "🛡️" },
      { text: "Look for the lesson in the situation", planet: "Jupiter", icon: "📚" },
    ],
  },
  {
    id: 3,
    question: "What motivates you most in life?",
    options: [
      { text: "Learning and sharing knowledge", planet: "Mercury", icon: "🎓" },
      { text: "Creating beauty and connection", planet: "Venus", icon: "🎨" },
      { text: "Achieving goals and winning", planet: "Mars", icon: "🏆" },
      { text: "Growing and expanding horizons", planet: "Jupiter", icon: "🚀" },
    ],
  },
  {
    id: 4,
    question: "How do you approach new challenges?",
    options: [
      { text: "Research thoroughly first", planet: "Mercury", icon: "🔍" },
      { text: "Consider how it affects others", planet: "Venus", icon: "👥" },
      { text: "Jump in headfirst", planet: "Mars", icon: "🏃" },
      { text: "See it as an adventure", planet: "Jupiter", icon: "🗺️" },
    ],
  },
  {
    id: 5,
    question: "What's your ideal work environment?",
    options: [
      { text: "Organized and structured", planet: "Saturn", icon: "📋" },
      { text: "Creative and inspiring", planet: "Venus", icon: "✨" },
      { text: "Fast-paced and competitive", planet: "Mars", icon: "⚡" },
      { text: "Innovative and unconventional", planet: "Uranus", icon: "💡" },
    ],
  },
  {
    id: 6,
    question: "How do you make important life decisions?",
    options: [
      { text: "Create pros and cons lists", planet: "Mercury", icon: "📝" },
      { text: "Trust my intuition completely", planet: "Neptune", icon: "🔮" },
      { text: "Act on gut instinct quickly", planet: "Mars", icon: "💨" },
      { text: "Consider long-term consequences", planet: "Saturn", icon: "⏳" },
    ],
  },
  {
    id: 7,
    question: "What attracts you most in others?",
    options: [
      { text: "Intelligence and wit", planet: "Mercury", icon: "🧩" },
      { text: "Kindness and beauty", planet: "Venus", icon: "🌸" },
      { text: "Strength and confidence", planet: "Mars", icon: "💪" },
      { text: "Wisdom and depth", planet: "Jupiter", icon: "🦉" },
    ],
  },
  {
    id: 8,
    question: "How do you handle sudden changes?",
    options: [
      { text: "Adapt quickly and find solutions", planet: "Mercury", icon: "🔄" },
      { text: "Embrace the excitement of change", planet: "Uranus", icon: "🌪️" },
      { text: "Fight against unwanted changes", planet: "Mars", icon: "⚔️" },
      { text: "Go with the flow", planet: "Neptune", icon: "🌊" },
    ],
  },
  {
    id: 9,
    question: "What's your relationship with power?",
    options: [
      { text: "Use it to help and teach others", planet: "Jupiter", icon: "🤝" },
      { text: "Transform situations completely", planet: "Pluto", icon: "🔥" },
      { text: "Lead from the front", planet: "Mars", icon: "👑" },
      { text: "Share power equally", planet: "Venus", icon: "⚖️" },
    ],
  },
  {
    id: 10,
    question: "How do you process emotions?",
    options: [
      { text: "Talk through them logically", planet: "Mercury", icon: "💭" },
      { text: "Feel them deeply and fully", planet: "Neptune", icon: "🌙" },
      { text: "Channel them into action", planet: "Mars", icon: "🎯" },
      { text: "Transform them into wisdom", planet: "Pluto", icon: "🦋" },
    ],
  },
  {
    id: 11,
    question: "What's your approach to rules and authority?",
    options: [
      { text: "Respect structure and hierarchy", planet: "Saturn", icon: "🏛️" },
      { text: "Question everything", planet: "Uranus", icon: "❓" },
      { text: "Challenge when necessary", planet: "Mars", icon: "⚡" },
      { text: "Find creative ways around them", planet: "Neptune", icon: "🎭" },
    ],
  },
  {
    id: 12,
    question: "What drives your personal growth?",
    options: [
      { text: "Constant learning and curiosity", planet: "Mercury", icon: "📖" },
      { text: "Deep spiritual experiences", planet: "Neptune", icon: "🕯️" },
      { text: "Overcoming challenges", planet: "Mars", icon: "🏔️" },
      { text: "Complete transformation", planet: "Pluto", icon: "🌟" },
    ],
  },
  {
    id: 13,
    question: "How do you express creativity?",
    options: [
      { text: "Through words and communication", planet: "Mercury", icon: "✍️" },
      { text: "Through art and beauty", planet: "Venus", icon: "🎨" },
      { text: "Through bold, original ideas", planet: "Uranus", icon: "💫" },
      { text: "Through mystical inspiration", planet: "Neptune", icon: "🌈" },
    ],
  },
  {
    id: 14,
    question: "What's your relationship with time?",
    options: [
      { text: "Every moment is precious", planet: "Saturn", icon: "⏰" },
      { text: "Time is an illusion", planet: "Neptune", icon: "∞" },
      { text: "Act now, think later", planet: "Mars", icon: "⚡" },
      { text: "Perfect timing always exists", planet: "Jupiter", icon: "🎯" },
    ],
  },
  {
    id: 15,
    question: "What's your deepest fear?",
    options: [
      { text: "Being misunderstood", planet: "Mercury", icon: "🤐" },
      { text: "Being unloved", planet: "Venus", icon: "💔" },
      { text: "Being powerless", planet: "Mars", icon: "⛓️" },
      { text: "Losing control completely", planet: "Pluto", icon: "🌀" },
    ],
  },
]

export const planetDescriptions: Record<string, any> = {
  Mercury: {
    title: "Mercury - The Messenger",
    description:
      "You are most influenced by Mercury, the planet of Communication and Quick Thinking. Your decisions are driven by logic, analysis, and the need to understand and share information.",
    traits: ["Analytical thinker", "Great communicator", "Adaptable", "Curious learner"],
    icon: "☿",
    color: "from-[#FFD700] to-[#FFA500]",
    fullAnalysis:
      "Mercury's influence makes you a natural problem-solver who approaches decisions through careful analysis and communication. You excel at gathering information, weighing options, and articulating your thoughts clearly. Your quick wit and adaptability help you navigate complex situations with ease. In relationships, you value intellectual connection and open dialogue. Your decision-making style is methodical yet flexible, allowing you to adjust course when new information emerges.",
  },
  Venus: {
    title: "Venus - The Harmonizer",
    description:
      "You are most influenced by Venus, the planet of Love and Beauty. Your decisions are guided by harmony, relationships, and the pursuit of beauty and balance in life.",
    traits: ["Relationship-focused", "Aesthetic sense", "Diplomatic", "Values harmony"],
    icon: "♀",
    color: "from-[#FF69B4] to-[#FFB6C1]",
    fullAnalysis:
      "Venus guides your decisions through the lens of harmony and beauty. You naturally seek balance in all aspects of life and make choices that enhance relationships and create aesthetic pleasure. Your diplomatic nature helps you find win-win solutions, and you're drawn to decisions that bring people together. In love and partnerships, you're generous and considerate, often putting others' needs alongside your own. Your innate sense of style and beauty influences everything from your living space to your career choices.",
  },
  Mars: {
    title: "Mars - The Warrior",
    description:
      "You are most influenced by Mars, the planet of Action and Courage. Your decisions are driven by passion, determination, and the desire to take immediate action.",
    traits: ["Action-oriented", "Courageous", "Competitive", "Direct approach"],
    icon: "♂",
    color: "from-[#FF4500] to-[#DC143C]",
    fullAnalysis:
      "Mars fuels your decision-making with passion and urgency. You're naturally inclined to take swift action and aren't afraid to face challenges head-on. Your competitive spirit drives you to excel and overcome obstacles that others might find daunting. In conflicts, you prefer direct confrontation over passive approaches. Your leadership style is bold and inspiring, motivating others through your example. You make decisions based on gut instinct and aren't afraid to take calculated risks to achieve your goals.",
  },
  Jupiter: {
    title: "Jupiter - The Wise Teacher",
    description:
      "You are most influenced by Jupiter, the planet of Wisdom and Expansion. Your decisions are guided by optimism, growth, and the bigger picture perspective.",
    traits: ["Optimistic", "Wise counselor", "Growth-minded", "Philosophical"],
    icon: "♃",
    color: "from-[#4169E1] to-[#1E90FF]",
    fullAnalysis:
      "Jupiter's expansive energy influences you to make decisions with a broad, optimistic perspective. You naturally see the potential for growth and learning in every situation. Your philosophical nature leads you to consider the deeper meaning and long-term implications of your choices. You're generous with your knowledge and often serve as a mentor or guide to others. Your decision-making process involves considering multiple perspectives and seeking opportunities that align with your values and vision for personal growth.",
  },
  Saturn: {
    title: "Saturn - The Disciplinarian",
    description:
      "You are most influenced by Saturn, the planet of Structure and Discipline. Your decisions are based on responsibility, long-term planning, and building solid foundations.",
    traits: ["Disciplined", "Responsible", "Strategic planner", "Reliable"],
    icon: "♄",
    color: "from-[#696969] to-[#2F4F4F]",
    fullAnalysis:
      "Saturn's structured influence makes you a master of long-term planning and strategic thinking. Your decisions are carefully considered, with emphasis on building lasting foundations and achieving sustainable success. You understand that worthwhile achievements require patience and persistent effort. Your responsible nature makes you someone others can depend on, and you take commitments seriously. You excel at creating systems and structures that support your goals, and you're willing to delay gratification for greater future rewards.",
  },
  Uranus: {
    title: "Uranus - The Revolutionary",
    description:
      "You are most influenced by Uranus, the planet of Innovation and Change. Your decisions are driven by originality, independence, and the desire to break new ground.",
    traits: ["Innovative", "Independent", "Original thinker", "Change agent"],
    icon: "♅",
    color: "from-[#00CED1] to-[#20B2AA]",
    fullAnalysis:
      "Uranus inspires you to make unconventional decisions that challenge the status quo. Your innovative thinking leads you to solutions others haven't considered, and you're comfortable being different or going against popular opinion. You value freedom and independence highly, making choices that preserve your autonomy. Your decision-making style is intuitive and often sudden, based on flashes of insight. You're naturally drawn to cutting-edge ideas, technology, and progressive movements that promise positive change for humanity.",
  },
  Neptune: {
    title: "Neptune - The Mystic",
    description:
      "You are most influenced by Neptune, the planet of Intuition and Dreams. Your decisions are guided by intuition, creativity, and spiritual insights.",
    traits: ["Intuitive", "Creative", "Spiritual", "Empathetic"],
    icon: "♆",
    color: "from-[#9370DB] to-[#8A2BE2]",
    fullAnalysis:
      "Neptune's mystical influence guides your decisions through intuition and spiritual awareness. You trust your inner voice and often make choices based on feelings and subtle energies rather than purely logical analysis. Your empathetic nature allows you to understand others' needs deeply, influencing your decisions to be compassionate and healing. You're drawn to creative and spiritual pursuits, making choices that align with your higher purpose. Your decision-making process often involves meditation, reflection, or seeking signs from the universe.",
  },
  Pluto: {
    title: "Pluto - The Transformer",
    description:
      "You are most influenced by Pluto, the planet of Power and Transformation. Your decisions are driven by the need for deep change and personal transformation.",
    traits: ["Transformative", "Intense", "Powerful", "Deep thinker"],
    icon: "♇",
    color: "from-[#8B0000] to-[#4B0000]",
    fullAnalysis:
      "Pluto's transformative power influences you to make decisions that create profound change. You're not afraid of intensity or complexity, often choosing paths that others might find too challenging. Your decisions tend to be all-or-nothing, reflecting your deep commitment to authentic transformation. You have a natural ability to see beneath surfaces and understand hidden motivations, which informs your strategic choices. Your decision-making process involves deep psychological insight and a willingness to release what no longer serves your highest evolution.",
  },
}
