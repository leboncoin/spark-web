import React, { useEffect, useState } from 'react'

interface Position {
  x: number
  y: number
}

export const RandomFish: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  useEffect(() => {
    const moveFish = () => {
      const newX = Math.random() * (window.innerWidth - 100)
      const newY = Math.random() * (window.innerHeight - 100)
      setPosition({ x: newX, y: newY })
      setDirection(newX > position.x ? 'right' : 'left')
    }

    const interval = setInterval(moveFish, 3000)

    return () => clearInterval(interval)
  }, [position])

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        transform: `scaleX(${direction === 'left' ? -1 : 1})`,
        zIndex: 9999,
        transition: 'all 3s ease-in-out',
      }}
    >
      <img
        src="https://static.vecteezy.com/system/resources/previews/037/446/548/non_2x/goldfish-isolated-on-transparent-background-ornamental-fish-generative-ai-png.png"
        alt="Tropical fish"
        width={240}
        height={120}
        style={{
          objectFit: 'contain',
          filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
        }}
      />
    </div>
  )
}
