"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"

// Array of vibrant colors for better visibility
const colors = [
  "text-red-500",
  "text-blue-500",
  "text-green-500",
  "text-yellow-500",
  "text-purple-500",
  "text-pink-500",
  "text-indigo-500",
  "text-cyan-500",
  "text-orange-500",
  "text-lime-500",
  "text-emerald-500",
  "text-teal-500",
  "text-violet-500",
  "text-fuchsia-500",
  "text-rose-500",
]

export default function KeyboardDisplay() {
  const [pressedKey, setPressedKey] = useState<string | null>(null)
  const [keyId, setKeyId] = useState(0)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [textColor, setTextColor] = useState("text-white")

  // Speech queue system
  const speechQueue = useRef<string[]>([])
  const isSpeaking = useRef(false)

  // Process the speech queue
  const processSpeechQueue = () => {
    if (speechQueue.current.length === 0 || isSpeaking.current) {
      return
    }

    isSpeaking.current = true
    const text = speechQueue.current.shift() as string
    const utterance = new SpeechSynthesisUtterance(text)

    utterance.onend = () => {
      isSpeaking.current = false
      processSpeechQueue() // Process next item in queue
    }

    utterance.onerror = () => {
      isSpeaking.current = false
      processSpeechQueue() // Process next item in queue even if there's an error
    }

    window.speechSynthesis.speak(utterance)
  }

  // Add to speech queue and process, but limit to max 3 items
  const queueSpeech = (text: string) => {
    // Only add to queue if there are fewer than 3 items
    if (speechQueue.current.length < 3) {
      speechQueue.current.push(text)
      processSpeechQueue()
    }
  }

  // Get a random color from the colors array
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Get the key value
      let key = event.key

      // Handle special keys
      if (key === " ") key = "SPACE"
      else if (key === "Enter") key = "ENTER"
      else if (key === "Backspace") key = "BACKSPACE"
      else if (key === "Escape") key = "ESC"
      else if (key === "ArrowUp") key = "↑"
      else if (key === "ArrowDown") key = "↓"
      else if (key === "ArrowLeft") key = "←"
      else if (key === "ArrowRight") key = "→"
      else if (key === "Tab") key = "TAB"
      else if (key === "Control") key = "CTRL"
      else if (key === "Alt") key = "ALT"
      else if (key === "Shift") key = "SHIFT"
      else if (key.length > 1) return // Skip other special keys

      // Convert to uppercase for display
      key = key.toUpperCase()

      // Prepare speech text
      let speechText = key
      // For special keys, keep the full name for speech
      if (key === "SPACE") speechText = "space"
      else if (key === "ENTER") speechText = "enter"
      else if (key === "BACKSPACE") speechText = "backspace"
      else if (key === "ESC") speechText = "escape"
      else if (key === "↑") speechText = "up"
      else if (key === "↓") speechText = "down"
      else if (key === "←") speechText = "left"
      else if (key === "→") speechText = "right"
      else if (key === "TAB") speechText = "tab"
      else if (key === "CTRL") speechText = "control"
      else if (key === "ALT") speechText = "alt"
      else if (key.length === 1) speechText = key.toLowerCase() // Just say the letter, not "capital A"

      // Generate random position within safe boundaries
      const newX = Math.random() * 70
      const newY = Math.random() * 70 - 10

      // Get a random color
      const newColor = getRandomColor()

      // Add to speech queue instead of speaking directly
      queueSpeech(speechText)

      // Update state with new key, ID, position, and color
      setKeyId((prevId) => prevId + 1)
      setPressedKey(key)
      setPosition({ x: newX, y: newY })
      setTextColor(newColor)
    }

    // Add event listener
    window.addEventListener("keydown", handleKeyDown)

    // Clean up
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.speechSynthesis.cancel()
    }
  }, [])

  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-gray-900">
      <AnimatePresence>
        {pressedKey && (
          <motion.div
            key={keyId}
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8 }}
            className={`absolute text-center text-[400px] font-bold ${textColor}`}
            style={{
              top: `${position.y}%`,
              left: `${position.x}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {pressedKey}
          </motion.div>
        )}
      </AnimatePresence>
      {!pressedKey && <p className="text-2xl text-gray-500">キーを押してね...</p>}
    </div>
  )
}

