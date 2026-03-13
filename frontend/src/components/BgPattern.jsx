import { motion } from "framer-motion"

export default function BgPattern() {
  const emojis = ["💊", "🩺", "💉", "⚕️", "🏥"]
  
  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 0,
      pointerEvents: "none",
      overflow: "hidden"
    }}>
      {Array.from({ length: 60 }).map((_, i) => {
        const emoji = emojis[i % emojis.length]
        const cols = 6
        const col = i % cols
        const row = Math.floor(i / cols)
        const duration = 3 + (i % 5)
        const delay = (i * 0.15) % 3

        return (
          <motion.span
            key={i}
            style={{
              position: "absolute",
              left: `${col * 17 + 5}%`,
              top: `${row * 10 + 3}%`,
              fontSize: "28px",
              opacity: 0.18,
              userSelect: "none",
              display: "inline-block"
            }}
            animate={{
              y: [-6, 6, -6],
              rotate: [0, 15, -15, 0],
              opacity: [0.18, 0.25, 0.18]
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {emoji}
          </motion.span>
        )
      })}
    </div>
  )
}