export const getSpiritualMessage = (category, insights) => {
  const messages = {
    Release: {
      teaserMessage: "It's time to let go and begin again...",
      mainMessage: `Dear ${insights.userName}, the Universe is gently asking you to release what no longer serves your highest good. Like autumn leaves falling to nourish new growth, you are being called to let go of old patterns, relationships, or beliefs that have become heavy burdens on your soul. This is not about loss—it's about making space for miracles to enter your life. Your spirit is ready for a profound transformation, and the first step is releasing your grip on what was, so you can embrace what is meant to be.`,
      whyNow: `The cosmic energies surrounding your birth month of ${getMonthName(insights.birthMonth)} have aligned with your current life circumstances to create this perfect moment of release. Your soul chose this time to shed its old skin because you have grown beyond your previous limitations. The Universe has been preparing you for this moment through recent challenges and shifts in your energy. You're ready to step into a new version of yourself.`,
      nextSteps: `Begin by identifying three things in your life that feel heavy or draining. This could be a relationship, a habit, a fear, or even a physical possession. Create a sacred ritual of release—write them down and burn the paper under the full moon, or simply speak your intention to let go while holding a piece of rose quartz. Trust that as you release, the Universe will fill the empty spaces with blessings beyond your imagination.`,
      signsToWatch: `Watch for synchronicities involving butterflies, doors opening unexpectedly, or people from your past reaching out. You may also notice repeated number sequences like 1111 or 444. Pay attention to dreams about flying, water, or cleaning—these are your soul's way of confirming the release process. New opportunities will appear within 2-3 weeks of your conscious release work.`,
      affirmation: "I release with love and trust that the Universe has something better in store for me.",
      oracleCard: {
        name: "The Phoenix",
        symbol: "🔥",
        message: "From the ashes of what was, you rise renewed and powerful.",
      },
    },
    Awaken: {
      teaserMessage: "Your spiritual gifts are awakening—prepare to see with new eyes...",
      mainMessage: `Beautiful ${insights.userName}, you are experiencing a profound spiritual awakening that will transform how you see yourself and the world around you. Your intuitive abilities are expanding, your connection to the divine is strengthening, and your soul is remembering its true purpose. This awakening may feel overwhelming at times, but know that you are being prepared for a sacred mission that only you can fulfill. The Universe is downloading new wisdom directly into your consciousness, and you are becoming a beacon of light for others who are still finding their way.`,
      whyNow: `Your soul contract included this awakening period, timed perfectly with the cosmic alignments of your birth date. The energy level you're experiencing (${insights.energyLevel}/10) indicates your system is calibrating to higher frequencies. Recent life events have cracked open your heart and mind, allowing divine light to pour in. You've reached a level of spiritual maturity that can handle these expanded perceptions and responsibilities.`,
      nextSteps: `Create a daily spiritual practice that includes meditation, journaling, and time in nature. Start paying attention to your dreams and intuitive hits—keep a notebook by your bed to capture the wisdom that comes through. Consider learning about energy healing, tarot, or other metaphysical arts that call to you. Most importantly, trust the messages you're receiving, even if they don't make logical sense yet.`,
      signsToWatch: `You'll notice increased synchronicities, prophetic dreams, and a heightened sensitivity to energy. Animals may be drawn to you, and you might see auras or feel others' emotions more intensely. Look for repeated encounters with spiritual symbols, books falling open to meaningful passages, or strangers sharing profound insights. Your awakening will accelerate over the next 3-6 months.`,
      affirmation: "I trust my intuition and embrace my expanding spiritual gifts with courage and grace.",
      oracleCard: {
        name: "The Third Eye",
        symbol: "👁️",
        message: "Your inner vision is opening to see the truth beyond the veil.",
      },
    },
    Receive: {
      teaserMessage: "The Universe has gifts waiting for you—open your heart to receive...",
      mainMessage: `Beloved ${insights.userName}, you are entering a beautiful phase of receiving. After a period of giving, striving, and perhaps struggling, the Universe is now ready to shower you with blessings, opportunities, and love. Your soul has learned the lessons of worthiness, and you are now aligned to receive the abundance that has always been your birthright. This is not about luck—this is about divine timing and your readiness to accept the good that life wants to give you. Open your arms, open your heart, and prepare to be amazed by the generosity of the Universe.`,
      whyNow: `The cosmic cycles connected to your birth in ${getMonthName(insights.birthMonth)} have created a powerful receiving portal in your life. Your recent experiences have taught you humility and gratitude, making you a perfect vessel for divine blessings. The Universe has been waiting for you to release the belief that you must earn love and abundance through struggle. You're now ready to receive from a place of knowing your inherent worth.`,
      nextSteps: `Practice saying 'yes' to compliments, help, and opportunities that come your way. Create space in your life—both physically and emotionally—for new blessings to enter. Start a gratitude practice and actively look for gifts the Universe is already giving you. Most importantly, work on your receiving muscles by allowing others to give to you without feeling obligated to immediately give back.`,
      signsToWatch: `Unexpected money, gifts, or opportunities will begin appearing in your life. People will offer help, compliments will flow more freely, and doors will open with surprising ease. You may find lost items, receive unexpected invitations, or discover that problems resolve themselves without your intervention. The number 8 (infinity/abundance) may appear frequently.`,
      affirmation: "I am worthy of all the love, abundance, and joy the Universe wants to give me.",
      oracleCard: {
        name: "The Cornucopia",
        symbol: "🌾",
        message: "Abundance flows to you from expected and unexpected sources.",
      },
    },
    Transform: {
      teaserMessage: "You are becoming who you were always meant to be—embrace the metamorphosis...",
      mainMessage: `Radiant ${insights.userName}, you are in the midst of a profound transformation that is reshaping every aspect of your being. Like a caterpillar dissolving in the chrysalis to become a butterfly, parts of your old self are dissolving to make way for a more authentic, powerful version of you. This process may feel uncomfortable or disorienting, but trust that something magnificent is being born. You are not just changing—you are evolving into your highest potential, aligned with your soul's true purpose and power.`,
      whyNow: `The transformational energies of your birth month ${getMonthName(insights.birthMonth)} are being activated by current planetary alignments and your soul's readiness for evolution. Your energy level of ${insights.energyLevel}/10 indicates your system is processing intense upgrades. Recent challenges have been catalysts, breaking down old structures so new ones can emerge. You've reached a point where staying the same would actually be more difficult than changing.`,
      nextSteps: `Embrace the uncertainty and trust the process, even when you can't see the full picture. Document this transformation through journaling, art, or photography—you'll want to remember this sacred passage. Seek support from others who have undergone similar transformations. Most importantly, be patient and gentle with yourself as you navigate this metamorphosis. Your new self is emerging gradually.`,
      signsToWatch: `You'll notice dramatic shifts in your preferences, relationships, and life direction. Old friendships may naturally fade while new, more aligned connections appear. Your physical appearance may change, and you might feel called to update your wardrobe or living space. Dreams about flying, shape-shifting, or being in unfamiliar but exciting places are common during this phase.`,
      affirmation: "I trust the process of my transformation and embrace becoming my highest self.",
      oracleCard: {
        name: "The Butterfly",
        symbol: "🦋",
        message: "Your metamorphosis is complete—spread your wings and soar.",
      },
    },
    Trust: {
      teaserMessage: "The path ahead requires faith—trust that you are divinely guided...",
      mainMessage: `Dear ${insights.userName}, the Universe is asking you to take a leap of faith and trust in the divine plan that is unfolding in your life. You may not be able to see the full picture yet, but every step you've taken has been preparing you for what's coming next. Your soul knows the way, even when your mind feels uncertain. This is a time to surrender control and allow yourself to be guided by a wisdom greater than your own. Trust that you are exactly where you need to be, and that everything is working out for your highest good.`,
      whyNow: `The spiritual lessons connected to your birth in ${getMonthName(insights.birthMonth)} are culminating in this moment of required trust. Your soul chose this experience to deepen your faith and connection to divine guidance. Recent events have been designed to show you that your own efforts, while important, are not the only force at work in your life. You're being invited into a deeper partnership with the Universe.`,
      nextSteps: `Practice daily surrender through meditation or prayer, releasing your need to control outcomes. Start paying attention to signs and synchronicities—the Universe is constantly communicating with you. When faced with decisions, ask for guidance and then listen for the answer in your heart, through nature, or through the words of others. Take one small step forward each day, trusting that the path will become clearer as you walk it.`,
      signsToWatch: `You'll begin noticing more synchronicities, meaningful coincidences, and perfect timing in your life. Doors will open just when you need them, and help will arrive from unexpected sources. You may receive guidance through dreams, meditation, or sudden knowing. The numbers 333 or 777 may appear frequently, confirming you're on the right path.`,
      affirmation: "I trust in divine timing and know that I am always guided and protected.",
      oracleCard: {
        name: "The North Star",
        symbol: "⭐",
        message: "Even in darkness, divine guidance lights your way forward.",
      },
    },
    Act: {
      teaserMessage: "The time for waiting is over—your moment to act has arrived...",
      mainMessage: `Powerful ${insights.userName}, the Universe is calling you to step into action and claim your power. You have been preparing, learning, and gathering strength for this moment when you would be ready to move forward with confidence and purpose. Your soul is no longer content to wait on the sidelines—it's time to take the leap, make the call, start the project, or have the conversation you've been avoiding. The cosmic winds are at your back, and success is not just possible—it's inevitable when you align your actions with your soul's calling.`,
      whyNow: `The action-oriented energy of your birth month ${getMonthName(insights.birthMonth)} is being amplified by current cosmic conditions. Your energy level of ${insights.energyLevel}/10 shows you have the vitality needed for this next phase. The Universe has been building your confidence and skills through recent experiences, and now you're ready to use them. Waiting longer would actually work against your soul's momentum.`,
      nextSteps: `Identify the one action you've been avoiding or postponing—that's likely your first step. Break it down into smaller, manageable pieces and commit to taking one action each day. Trust your instincts over your fears, and remember that imperfect action is better than perfect inaction. Surround yourself with supportive people who believe in your vision and can offer encouragement when doubt creeps in.`,
      signsToWatch: `Opportunities will present themselves with increasing frequency and urgency. You may feel a sense of restlessness or impatience that won't be satisfied until you take action. People may start asking for your help or expertise, indicating it's time to step into leadership. Red lights turning green, open parking spaces, and smooth travel are signs the Universe is supporting your forward movement.`,
      affirmation: "I have everything I need within me to take inspired action and create positive change.",
      oracleCard: {
        name: "The Warrior",
        symbol: "⚔️",
        message: "Your courage and determination will lead you to victory.",
      },
    },
    Love: {
      teaserMessage: "Love is the answer to every question your heart has been asking...",
      mainMessage: `Beloved ${insights.userName}, you are being called to open your heart wider than ever before and let love be your guiding force. This isn't just about romantic love—this is about recognizing love as the fundamental energy of the Universe and your true nature. You are being invited to love yourself more deeply, to extend compassion to others more freely, and to see love in every experience, even the challenging ones. Your heart is your greatest wisdom teacher, and it's time to let it lead the way in all areas of your life.`,
      whyNow: `The loving vibration of your birth month ${getMonthName(insights.birthMonth)} is being activated by a powerful heart-opening transit in your spiritual journey. Recent experiences have cracked your heart open—not to break it, but to expand its capacity for love. Your soul is ready to embody unconditional love and share this gift with the world. The planet needs your heart's wisdom now more than ever.`,
      nextSteps: `Begin each day by placing your hand on your heart and sending yourself love and appreciation. Practice seeing the divine in everyone you encounter, even those who challenge you. Engage in acts of kindness without expecting anything in return. Most importantly, forgive yourself for past mistakes and embrace your worthiness of love. Consider heart-opening practices like yoga, breathwork, or working with rose quartz.`,
      signsToWatch: `You'll notice more expressions of love coming into your life—unexpected hugs, kind words from strangers, or gestures of appreciation from friends and family. Heart-shaped objects may appear in unusual places, and you might find yourself moved to tears by beauty or kindness. Animals and children may be especially drawn to your energy. Pink or green colors may appear frequently in your environment.`,
      affirmation: "I am love, I give love, I receive love, and I am worthy of infinite love.",
      oracleCard: {
        name: "The Heart Chakra",
        symbol: "💚",
        message: "Your open heart is a healing force for yourself and the world.",
      },
    },
    Protect: {
      teaserMessage: "Your energy is sacred—it's time to honor and protect your spiritual boundaries...",
      mainMessage: `Sacred ${insights.userName}, the Universe is reminding you that your energy is precious and deserves to be protected. You have been giving so much of yourself to others that you may have forgotten to maintain healthy boundaries around your time, energy, and emotional well-being. This is not about becoming closed-off or fearful—it's about honoring your sensitivity as a gift and creating a sacred container for your spiritual growth. You are being called to become the guardian of your own energy, protecting what is sacred while still remaining open to love and connection.`,
      whyNow: `The protective instincts connected to your birth in ${getMonthName(insights.birthMonth)} are being activated because your spiritual sensitivity has increased. Your energy level of ${insights.energyLevel}/10 may reflect depletion from taking on others' emotions or giving beyond your capacity. Your soul is asking you to step into your power as a spiritual being who deserves respect and energetic sovereignty. This protection phase is preparing you for greater service from a place of strength.`,
      nextSteps: `Learn to say 'no' without guilt when something doesn't feel aligned with your highest good. Create physical and energetic boundaries through visualization, crystals, or protective prayers. Spend time alone to reconnect with your own energy and desires. Practice energy clearing techniques like smudging, salt baths, or calling back your energy from people and situations where you've left pieces of yourself.`,
      signsToWatch: `You may feel called to change your environment, end draining relationships, or step back from overwhelming commitments. Protective symbols like shields, circles, or guardian animals may appear in your dreams or daily life. You might feel more sensitive to crowds or negative energy, which is your intuition guiding you toward better boundaries. Trust these protective instincts—they're serving your highest good.`,
      affirmation: "I honor my sensitivity and protect my energy while remaining open to love and light.",
      oracleCard: {
        name: "The Guardian Angel",
        symbol: "👼",
        message: "You are divinely protected and guided in all that you do.",
      },
    },
  }

  return messages[category] || messages["Awaken"]
}

const getMonthName = (monthNumber) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  return months[monthNumber - 1] || "Unknown"
}
