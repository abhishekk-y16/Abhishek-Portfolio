import React, { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Lightweight cursor reactive background: a radial gradient that follows cursor with spring
export default function CursorBackground() {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 })

  // Respect user's reduced motion preference
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    return null
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    function onMove(e) {
      // Use viewport-relative coordinates so the background follows the cursor across the page
      const px = (e.clientX / window.innerWidth) * 100
      const py = (e.clientY / window.innerHeight) * 100
      mouseX.set(px)
      mouseY.set(py)
    }

    // Listen on window so pointer events do not need to be enabled on the visual layer
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [mouseX, mouseY])

  // derive string-based motion values for left/top using useTransform
  const left = useTransform(springX, (v) => `${v}%`)
  const top = useTransform(springY, (v) => `${v}%`)

  return (
    <div ref={containerRef} className="cursor-bg-wrapper" aria-hidden>
      <motion.div
        className="cursor-gradient"
        style={{
          left,
          top
        }}
      />
      <motion.div
        className="cursor-glow"
        style={{
          left,
          top
        }}
      />
    </div>
  )
}
