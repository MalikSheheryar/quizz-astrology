'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Play, Loader } from 'lucide-react'

interface AudioManagerProps {
  phase: string
}

const AudioManager = ({ phase }: AudioManagerProps) => {
  const [isMuted, setIsMuted] = useState(false)
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  )
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Audio sources for different phases - using free ambient sounds
  const getAudioSource = (phase: string) => {
    const audioSources = {
      intro: 'https://www.soundjay.com/misc/sounds/magic-chime-02.wav',
      interactive: 'https://www.soundjay.com/misc/sounds/magic-spell-01.wav',
      reveal: 'https://www.soundjay.com/misc/sounds/magic-spell-03.wav',
      reading: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      form: 'https://www.soundjay.com/misc/sounds/magic-chime-01.wav',
      quiz: 'https://www.soundjay.com/misc/sounds/magic-spell-02.wav',
      shortResult: 'https://www.soundjay.com/misc/sounds/bell-ringing-01.wav',
      fullResult: 'https://www.soundjay.com/misc/sounds/magic-chime-03.wav',
      default: 'https://www.soundjay.com/misc/sounds/magic-chime-02.wav',
    }

    return (
      audioSources[phase as keyof typeof audioSources] || audioSources.default
    )
  }

  // Fallback to data URLs with base64 encoded short audio snippets
  const createSyntheticAudio = (frequency: number, duration: number = 2) => {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
    oscillator.type = 'sine'

    // Create envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1)
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + duration
    )

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.start()
    oscillator.stop(audioContext.currentTime + duration)

    return oscillator
  }

  const playPhaseAudio = async (phase: string) => {
    if (!isAudioEnabled || isMuted) return

    setIsLoading(true)

    // Stop current audio
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
    }

    try {
      // Try to load and play online audio
      const audioSrc = getAudioSource(phase)
      const audio = new Audio()

      // Set up audio element
      audio.src = audioSrc
      audio.loop = true
      audio.volume = 0.3
      audio.preload = 'auto'

      // Handle successful load
      audio.addEventListener('canplaythrough', () => {
        setIsLoading(false)
        if (!isMuted && isAudioEnabled) {
          audio.play().catch(() => {
            // If online audio fails, create synthetic sound
            createSyntheticFallback(phase)
          })
        }
      })

      // Handle errors - fallback to synthetic audio
      audio.addEventListener('error', () => {
        console.log('Audio file failed to load, using synthetic fallback')
        setIsLoading(false)
        createSyntheticFallback(phase)
      })

      setCurrentAudio(audio)
      audioRef.current = audio
    } catch (error) {
      console.error('Error playing audio:', error)
      setIsLoading(false)
      createSyntheticFallback(phase)
    }
  }

  const createSyntheticFallback = (phase: string) => {
    if (!isAudioEnabled || isMuted) return

    // Create different tones for each phase
    const frequencies = {
      intro: 220, // A3 - mysterious
      interactive: 330, // E4 - engaging
      reveal: 440, // A4 - revelation
      reading: 293, // D4 - contemplative
      form: 196, // G3 - grounding
      quiz: 392, // G4 - alert
      shortResult: 523, // C5 - bright
      fullResult: 587, // D5 - triumphant
      default: 220,
    }

    const freq =
      frequencies[phase as keyof typeof frequencies] || frequencies.default

    // Create a more complex sound with multiple oscillators
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)()

    // Main tone
    const osc1 = audioContext.createOscillator()
    const gain1 = audioContext.createGain()
    osc1.frequency.setValueAtTime(freq, audioContext.currentTime)
    osc1.type = 'sine'
    gain1.gain.setValueAtTime(0.1, audioContext.currentTime)

    // Harmony (fifth)
    const osc2 = audioContext.createOscillator()
    const gain2 = audioContext.createGain()
    osc2.frequency.setValueAtTime(freq * 1.5, audioContext.currentTime)
    osc2.type = 'sine'
    gain2.gain.setValueAtTime(0.05, audioContext.currentTime)

    // Connect and start
    osc1.connect(gain1)
    osc2.connect(gain2)
    gain1.connect(audioContext.destination)
    gain2.connect(audioContext.destination)

    osc1.start()
    osc2.start()

    // Stop after 3 seconds and loop
    const loopSound = () => {
      osc1.stop(audioContext.currentTime + 3)
      osc2.stop(audioContext.currentTime + 3)

      if (!isMuted && isAudioEnabled) {
        setTimeout(() => createSyntheticFallback(phase), 3500)
      }
    }

    loopSound()
  }

  const initializeAudio = async () => {
    setIsAudioEnabled(true)
    console.log('Audio enabled')
  }

  const handleAudioToggle = async () => {
    if (!isAudioEnabled) {
      await initializeAudio()
    } else {
      setIsMuted(!isMuted)

      if (currentAudio) {
        if (!isMuted) {
          // Was muted, now unmuting
          currentAudio.pause()
        } else {
          // Was playing, now muting
          if (currentAudio.paused) {
            currentAudio.play().catch(console.error)
          }
        }
      }
    }
  }

  // Effect for phase changes
  useEffect(() => {
    if (isAudioEnabled) {
      const timer = setTimeout(() => playPhaseAudio(phase), 500)
      return () => clearTimeout(timer)
    }
  }, [phase, isAudioEnabled])

  // Effect for mute changes
  useEffect(() => {
    if (currentAudio) {
      if (isMuted) {
        currentAudio.pause()
      } else if (isAudioEnabled) {
        currentAudio.play().catch(() => {
          // Fallback to synthetic if needed
          createSyntheticFallback(phase)
        })
      }
    }
  }, [isMuted])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause()
        currentAudio.src = ''
      }
    }
  }, [])

  const getPhaseDescription = () => {
    switch (phase) {
      case 'intro':
        return 'Mystical Entry'
      case 'interactive':
        return 'Arcane Energy'
      case 'reveal':
        return 'Portal Opening'
      case 'reading':
        return 'Ancient Wisdom'
      case 'form':
        return 'Ritual Circle'
      case 'quiz':
        return 'Magical Trial'
      case 'shortResult':
        return 'Divination Echo'
      case 'fullResult':
        return 'Prophecy Revealed'
      default:
        return 'Ambient Magic'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute top-4 left-4 z-40"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAudioToggle}
        disabled={isLoading}
        className="flex items-center space-x-2 bg-gradient-to-r from-purple-900/80 to-indigo-900/80 text-white px-4 py-2 rounded-full border border-yellow-400 hover:border-yellow-300 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-yellow-400/20"
      >
        {isLoading ? (
          <Loader size={16} className="animate-spin" />
        ) : !isAudioEnabled ? (
          <Play size={16} />
        ) : isMuted ? (
          <VolumeX size={16} />
        ) : (
          <Volume2 size={16} />
        )}
        <span className="text-xs font-serif tracking-wide">
          {isLoading
            ? 'Loading...'
            : !isAudioEnabled
            ? 'Cast Audio Spell'
            : getPhaseDescription()}
        </span>
      </motion.button>

      {/* Mystical Audio Visualizer */}
      {isAudioEnabled && !isMuted && !isLoading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-3 flex space-x-1 justify-center"
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                height: [2, 4 + Math.random() * 8, 2],
                opacity: [0.3, 1, 0.3],
                backgroundColor: [
                  'rgb(234, 179, 8)', // yellow-500
                  'rgb(147, 51, 234)', // purple-500
                  'rgb(234, 179, 8)', // yellow-500
                ],
              }}
              transition={{
                duration: 0.6 + Math.random() * 0.8,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.08,
                ease: 'easeInOut',
              }}
              className="w-0.5 rounded-full shadow-sm"
              style={{
                minHeight: '2px',
                filter: 'drop-shadow(0 0 2px rgba(234, 179, 8, 0.5))',
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Mystical Status Indicator */}
      {isAudioEnabled && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full border border-white shadow-sm"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-full h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-400"
          />
        </motion.div>
      )}

      {/* Loading Shimmer Effect */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full"
        >
          <motion.div
            animate={{ x: [-100, 100] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="h-full w-8 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"
          />
        </motion.div>
      )}
    </motion.div>
  )
}

export default AudioManager
