import React, { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function FloatingOrbs() {
  // Respect reduced motion
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null
  }

  const x = useMotionValue(50)
  const y = useMotionValue(50)
  const sx = useSpring(x, { stiffness: 80, damping: 18 })
  const sy = useSpring(y, { stiffness: 80, damping: 18 })

  useEffect(() => {
    function onMove(e) {
      x.set((e.clientX / window.innerWidth) * 100)
      y.set((e.clientY / window.innerHeight) * 100)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [x, y])

  // Three orbs with different offsets and sizes for subtle parallax
  const orbs = [
    { size: 420, blur: 60, opacity: 0.06, offsetX: -18, offsetY: -12, color: 'rgba(0,217,255,0.08)' },
    { size: 260, blur: 36, opacity: 0.04, offsetX: 22, offsetY: 8, color: 'rgba(0,180,204,0.06)' },
    { size: 120, blur: 20, opacity: 0.045, offsetX: 6, offsetY: 30, color: 'rgba(255,255,255,0.03)' }
  ]

  // Create derived motion values per orb so offsets are applied reactively
  const leftVals = orbs.map((o) => useTransform(sx, (v) => `calc(${v}% + ${o.offsetX}px)`))
  const topVals = orbs.map((o) => useTransform(sy, (v) => `calc(${v}% + ${o.offsetY}px)`))

  return (
    <div className="floating-orbs" aria-hidden>
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="orb"
          style={{
            width: o.size,
            height: o.size,
            left: leftVals[i],
            top: topVals[i],
            background: `radial-gradient(circle at center, ${o.color} 0%, rgba(0,0,0,0) 60%)`,
            filter: `blur(${o.blur}px)`,
            opacity: o.opacity
          }}
        />
      ))}
    </div>
  )
}
