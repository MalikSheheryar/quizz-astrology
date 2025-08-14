export const getSunSignFromDOB = (
  dateOfBirth: string
): { sign: string; emoji: string } => {
  const date = new Date(dateOfBirth)
  const month = date.getMonth() + 1
  const day = date.getDate()

  const zodiacSigns = [
    { sign: 'capricorn', emoji: '♑', start: [12, 22], end: [1, 19] },
    { sign: 'aquarius', emoji: '♒', start: [1, 20], end: [2, 18] },
    { sign: 'pisces', emoji: '♓', start: [2, 19], end: [3, 20] },
    { sign: 'aries', emoji: '♈', start: [3, 21], end: [4, 19] },
    { sign: 'taurus', emoji: '♉', start: [4, 20], end: [5, 20] },
    { sign: 'gemini', emoji: '♊', start: [5, 21], end: [6, 20] },
    { sign: 'cancer', emoji: '♋', start: [6, 21], end: [7, 22] },
    { sign: 'leo', emoji: '♌', start: [7, 23], end: [8, 22] },
    { sign: 'virgo', emoji: '♍', start: [8, 23], end: [9, 22] },
    { sign: 'libra', emoji: '♎', start: [9, 23], end: [10, 22] },
    { sign: 'scorpio', emoji: '♏', start: [10, 23], end: [11, 21] },
    { sign: 'sagittarius', emoji: '♐', start: [11, 22], end: [12, 21] },
  ]

  for (const zodiac of zodiacSigns) {
    const [startMonth, startDay] = zodiac.start
    const [endMonth, endDay] = zodiac.end

    if (zodiac.sign === 'capricorn') {
      if ((month === 12 && day >= startDay) || (month === 1 && day <= endDay)) {
        return { sign: zodiac.sign, emoji: zodiac.emoji }
      }
    } else {
      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay) ||
        (month > startMonth && month < endMonth)
      ) {
        return { sign: zodiac.sign, emoji: zodiac.emoji }
      }
    }
  }

  return { sign: 'unknown', emoji: '❓' }
}

export const calculateIncompatibility = (
  userSign: { sign: string; emoji: string },
  answers: Record<number, any>
) => {
  const incompatibilityData = {
    aries: {
      neverDate: {
        sign: 'cancer',
        emoji: '♋',
        reason:
          "Cancer's emotional intensity and need for security clashes with your independent, action-oriented nature. Their mood swings will drain your fire energy.",
        traits: {
          triggers: [
            'Emotional manipulation',
            'Passive-aggressive behavior',
            'Constant need for reassurance',
          ],
          negative: [
            'Clingy and possessive',
            'Takes everything personally',
            'Retreats into shell during conflict',
          ],
        },
      },
      warnings: [
        {
          sign: 'capricorn',
          emoji: '♑',
          reason:
            "Too rigid and controlling for your spontaneous spirit. They'll try to manage your every move.",
        },
        {
          sign: 'virgo',
          emoji: '♍',
          reason:
            'Their criticism and perfectionism will slowly chip away at your confidence and enthusiasm.',
        },
      ],
      compatible: [
        { sign: 'leo', emoji: '♌', reason: 'Matches your energy and passion' },
        {
          sign: 'sagittarius',
          emoji: '♐',
          reason: 'Shares your love for adventure',
        },
        {
          sign: 'gemini',
          emoji: '♊',
          reason: 'Keeps up with your dynamic pace',
        },
      ],
    },
    taurus: {
      neverDate: {
        sign: 'aquarius',
        emoji: '♒',
        reason:
          "Aquarius's unpredictability and emotional detachment will leave you feeling insecure and ungrounded. They can't provide the stability you crave.",
        traits: {
          triggers: [
            'Sudden plan changes',
            'Emotional unavailability',
            'Prioritizing friends over relationship',
          ],
          negative: [
            'Commitment-phobic',
            'Intellectualizes emotions',
            'Needs constant mental stimulation',
          ],
        },
      },
      warnings: [
        {
          sign: 'gemini',
          emoji: '♊',
          reason:
            'Too scattered and inconsistent for your need for reliability and routine.',
        },
        {
          sign: 'sagittarius',
          emoji: '♐',
          reason:
            'Their wanderlust and need for freedom conflicts with your desire for security.',
        },
      ],
      compatible: [
        {
          sign: 'virgo',
          emoji: '♍',
          reason: 'Appreciates your practical nature',
        },
        {
          sign: 'capricorn',
          emoji: '♑',
          reason: 'Shares your values of stability',
        },
        { sign: 'cancer', emoji: '♋', reason: 'Provides emotional security' },
      ],
    },
    gemini: {
      neverDate: {
        sign: 'scorpio',
        emoji: '♏',
        reason:
          "Scorpio's intensity and need for deep emotional connection will feel suffocating to your free-spirited nature. Their jealousy will cage your social butterfly wings.",
        traits: {
          triggers: [
            'Possessive behavior',
            'Emotional intensity',
            'Need to know everything',
          ],
          negative: [
            'Jealous and controlling',
            'All-or-nothing mentality',
            'Holds grudges forever',
          ],
        },
      },
      warnings: [
        {
          sign: 'virgo',
          emoji: '♍',
          reason:
            'Their criticism and attention to detail will make you feel judged and restricted.',
        },
        {
          sign: 'pisces',
          emoji: '♓',
          reason:
            'Too emotionally needy and will drain your mental energy with their constant feelings.',
        },
      ],
      compatible: [
        {
          sign: 'libra',
          emoji: '♎',
          reason: 'Matches your social and intellectual nature',
        },
        {
          sign: 'aquarius',
          emoji: '♒',
          reason: 'Gives you freedom to be yourself',
        },
        {
          sign: 'aries',
          emoji: '♈',
          reason: 'Keeps up with your dynamic energy',
        },
      ],
    },
    cancer: {
      neverDate: {
        sign: 'aries',
        emoji: '♈',
        reason:
          "Aries's impulsive and aggressive nature will constantly trigger your emotional sensitivity. Their lack of empathy will leave you feeling unloved and misunderstood.",
        traits: {
          triggers: [
            'Insensitive comments',
            'Rushing decisions',
            'Lack of emotional support',
          ],
          negative: [
            'Selfish and impatient',
            'Dismissive of feelings',
            'Acts without considering consequences',
          ],
        },
      },
      warnings: [
        {
          sign: 'sagittarius',
          emoji: '♐',
          reason:
            'Their blunt honesty and need for freedom will make you feel emotionally abandoned.',
        },
        {
          sign: 'aquarius',
          emoji: '♒',
          reason:
            'Too emotionally detached and will leave you feeling unloved and unappreciated.',
        },
      ],
      compatible: [
        {
          sign: 'scorpio',
          emoji: '♏',
          reason: 'Understands your emotional depth',
        },
        { sign: 'pisces', emoji: '♓', reason: 'Shares your intuitive nature' },
        {
          sign: 'taurus',
          emoji: '♉',
          reason: 'Provides stability and security',
        },
      ],
    },
    leo: {
      neverDate: {
        sign: 'capricorn',
        emoji: '♑',
        reason:
          "Capricorn's serious, work-focused nature will dim your natural radiance. They don't appreciate your need for attention and will make you feel unspecial.",
        traits: {
          triggers: [
            'Being ignored or dismissed',
            'Lack of appreciation',
            'Overly serious attitude',
          ],
          negative: [
            'Workaholic tendencies',
            'Emotionally reserved',
            'Critical of creative expression',
          ],
        },
      },
      warnings: [
        {
          sign: 'scorpio',
          emoji: '♏',
          reason:
            'Their intensity and need to control will clash with your desire to shine and be admired.',
        },
        {
          sign: 'taurus',
          emoji: '♉',
          reason:
            'Too stubborn and set in their ways to appreciate your dramatic flair and creativity.',
        },
      ],
      compatible: [
        {
          sign: 'aries',
          emoji: '♈',
          reason: 'Matches your passionate energy',
        },
        {
          sign: 'sagittarius',
          emoji: '♐',
          reason: 'Appreciates your adventurous spirit',
        },
        { sign: 'gemini', emoji: '♊', reason: 'Enjoys your playful nature' },
      ],
    },
    virgo: {
      neverDate: {
        sign: 'sagittarius',
        emoji: '♐',
        reason:
          "Sagittarius's chaotic, spontaneous lifestyle will trigger your anxiety and need for order. Their lack of attention to detail will drive you crazy.",
        traits: {
          triggers: ['Disorganization', 'Broken promises', 'Reckless behavior'],
          negative: [
            'Commitment issues',
            'Overly optimistic',
            'Ignores practical concerns',
          ],
        },
      },
      warnings: [
        {
          sign: 'gemini',
          emoji: '♊',
          reason:
            'Too scattered and inconsistent for your need for reliability and structure.',
        },
        {
          sign: 'pisces',
          emoji: '♓',
          reason:
            'Their dreamy, impractical nature conflicts with your grounded, analytical approach.',
        },
      ],
      compatible: [
        { sign: 'taurus', emoji: '♉', reason: 'Shares your practical values' },
        {
          sign: 'capricorn',
          emoji: '♑',
          reason: 'Appreciates your attention to detail',
        },
        { sign: 'cancer', emoji: '♋', reason: 'Values your caring nature' },
      ],
    },
    libra: {
      neverDate: {
        sign: 'aries',
        emoji: '♈',
        reason:
          "Aries's aggressive, confrontational style will disrupt your need for harmony and balance. Their impatience with your decision-making process will create constant tension.",
        traits: {
          triggers: [
            'Aggressive behavior',
            'Rushed decisions',
            'Conflict and arguments',
          ],
          negative: [
            'Hot-tempered',
            'Selfish tendencies',
            'Lacks diplomatic skills',
          ],
        },
      },
      warnings: [
        {
          sign: 'cancer',
          emoji: '♋',
          reason:
            'Their emotional intensity and mood swings will disturb your need for peace and equilibrium.',
        },
        {
          sign: 'capricorn',
          emoji: '♑',
          reason:
            'Too serious and work-focused to appreciate your social nature and need for beauty.',
        },
      ],
      compatible: [
        {
          sign: 'gemini',
          emoji: '♊',
          reason: 'Shares your love of communication',
        },
        {
          sign: 'aquarius',
          emoji: '♒',
          reason: 'Appreciates your fair-minded nature',
        },
        { sign: 'leo', emoji: '♌', reason: 'Enjoys your social charm' },
      ],
    },
    scorpio: {
      neverDate: {
        sign: 'gemini',
        emoji: '♊',
        reason:
          "Gemini's superficial, flighty nature will frustrate your need for deep, meaningful connections. Their inability to commit emotionally will leave you feeling betrayed.",
        traits: {
          triggers: [
            'Surface-level conversations',
            'Inconsistency',
            'Emotional unavailability',
          ],
          negative: [
            'Commitment-phobic',
            'Easily distracted',
            'Avoids deep emotions',
          ],
        },
      },
      warnings: [
        {
          sign: 'leo',
          emoji: '♌',
          reason:
            'Their need for attention and admiration will trigger your jealousy and possessive nature.',
        },
        {
          sign: 'aquarius',
          emoji: '♒',
          reason:
            'Too emotionally detached and independent for your need for intense connection.',
        },
      ],
      compatible: [
        {
          sign: 'cancer',
          emoji: '♋',
          reason: 'Matches your emotional intensity',
        },
        { sign: 'pisces', emoji: '♓', reason: 'Understands your depth' },
        { sign: 'capricorn', emoji: '♑', reason: 'Appreciates your loyalty' },
      ],
    },
    sagittarius: {
      neverDate: {
        sign: 'virgo',
        emoji: '♍',
        reason:
          "Virgo's critical, perfectionist nature will crush your optimistic spirit. Their need for routine and order will feel like a prison to your free-spirited soul.",
        traits: {
          triggers: ['Constant criticism', 'Micromanaging', 'Rigid schedules'],
          negative: [
            'Overly critical',
            'Pessimistic outlook',
            'Controlling behavior',
          ],
        },
      },
      warnings: [
        {
          sign: 'taurus',
          emoji: '♉',
          reason:
            'Too possessive and routine-oriented for your need for freedom and adventure.',
        },
        {
          sign: 'cancer',
          emoji: '♋',
          reason:
            'Their emotional neediness and desire for security will feel suffocating to your independent nature.',
        },
      ],
      compatible: [
        {
          sign: 'aries',
          emoji: '♈',
          reason: 'Shares your adventurous spirit',
        },
        { sign: 'leo', emoji: '♌', reason: 'Matches your optimistic energy' },
        {
          sign: 'aquarius',
          emoji: '♒',
          reason: 'Respects your need for freedom',
        },
      ],
    },
    capricorn: {
      neverDate: {
        sign: 'leo',
        emoji: '♌',
        reason:
          "Leo's dramatic, attention-seeking behavior will embarrass your reserved nature. Their need for constant admiration will drain your practical energy.",
        traits: {
          triggers: [
            'Dramatic outbursts',
            'Attention-seeking',
            'Impractical spending',
          ],
          negative: [
            'Ego-driven',
            'Demands constant praise',
            'Overly theatrical',
          ],
        },
      },
      warnings: [
        {
          sign: 'aries',
          emoji: '♈',
          reason:
            'Too impulsive and reckless for your careful, methodical approach to life.',
        },
        {
          sign: 'sagittarius',
          emoji: '♐',
          reason:
            'Their lack of focus and commitment will frustrate your goal-oriented nature.',
        },
      ],
      compatible: [
        { sign: 'taurus', emoji: '♉', reason: 'Shares your practical values' },
        { sign: 'virgo', emoji: '♍', reason: 'Appreciates your work ethic' },
        { sign: 'scorpio', emoji: '♏', reason: 'Respects your determination' },
      ],
    },
    aquarius: {
      neverDate: {
        sign: 'taurus',
        emoji: '♉',
        reason:
          "Taurus's possessive, routine-loving nature will suffocate your need for independence and innovation. Their resistance to change will stifle your progressive spirit.",
        traits: {
          triggers: [
            'Possessive behavior',
            'Resistance to change',
            'Materialistic focus',
          ],
          negative: [
            'Stubborn and inflexible',
            'Overly possessive',
            'Fears innovation',
          ],
        },
      },
      warnings: [
        {
          sign: 'scorpio',
          emoji: '♏',
          reason:
            'Too intense and emotionally demanding for your need for mental freedom and space.',
        },
        {
          sign: 'cancer',
          emoji: '♋',
          reason:
            'Their emotional neediness and desire for security will feel overwhelming to your detached nature.',
        },
      ],
      compatible: [
        {
          sign: 'gemini',
          emoji: '♊',
          reason: 'Shares your intellectual curiosity',
        },
        {
          sign: 'libra',
          emoji: '♎',
          reason: 'Appreciates your humanitarian nature',
        },
        {
          sign: 'sagittarius',
          emoji: '♐',
          reason: 'Respects your independence',
        },
      ],
    },
    pisces: {
      neverDate: {
        sign: 'virgo',
        emoji: '♍',
        reason:
          "Virgo's harsh criticism and analytical nature will crush your sensitive, dreamy spirit. Their practical approach will make you feel misunderstood and unappreciated.",
        traits: {
          triggers: [
            'Harsh criticism',
            'Lack of empathy',
            'Overly logical approach',
          ],
          negative: [
            'Critical and judgmental',
            'Emotionally cold',
            'Dismisses intuition',
          ],
        },
      },
      warnings: [
        {
          sign: 'gemini',
          emoji: '♊',
          reason:
            'Too mentally focused and emotionally detached for your need for deep emotional connection.',
        },
        {
          sign: 'sagittarius',
          emoji: '♐',
          reason:
            'Their blunt honesty and lack of sensitivity will repeatedly hurt your feelings.',
        },
      ],
      compatible: [
        {
          sign: 'cancer',
          emoji: '♋',
          reason: 'Understands your emotional nature',
        },
        { sign: 'scorpio', emoji: '♏', reason: 'Appreciates your depth' },
        {
          sign: 'taurus',
          emoji: '♉',
          reason: 'Provides stability and grounding',
        },
      ],
    },
  }

  // Calculate incompatibility based on user's sign and quiz answers
  const userIncompatibility = incompatibilityData[userSign.sign.toLowerCase()]

  if (!userIncompatibility) {
    // Fallback for unknown signs
    return {
      neverDate: {
        sign: 'unknown',
        emoji: '❓',
        reason: 'Unable to determine incompatibility patterns.',
        traits: { triggers: [], negative: [] },
      },
      warnings: [],
      compatible: [],
      userSign,
    }
  }

  return {
    ...userIncompatibility,
    userSign,
  }
}
