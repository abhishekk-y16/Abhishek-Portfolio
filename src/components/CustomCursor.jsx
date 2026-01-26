import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  // Hide on touch devices and respect reduced motion
  if (typeof window !== 'undefined') {
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return null
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null
  }

  const mx = useMotionValue(window.innerWidth / 2)
  const my = useMotionValue(window.innerHeight / 2)
  const sx = useSpring(mx, { stiffness: 140, damping: 28 })
  const sy = useSpring(my, { stiffness: 140, damping: 28 })
  const [mode, setMode] = useState('default') // 'default' | 'hover' | 'focus'

  useEffect(() => {
    function onMove(e) {
      mx.set(e.clientX)
      my.set(e.clientY)
      // dispatch a lightweight event for other components to listen to if needed
      window.dispatchEvent(new CustomEvent('app:cursormove', { detail: { x: e.clientX, y: e.clientY } }))
    }

    function onOver(e) {
      const t = e.target.closest && e.target.closest('a, button, .project-card, .skill, .cta-button')
      if (t) setMode('hover')
    }
    function onOut(e) {
      const t = e.target.closest && e.target.closest('a, button, .project-card, .skill, .cta-button')
      if (!t) setMode('default')
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerover', onOver)
    window.addEventListener('pointerout', onOut)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerout', onOut)
    }
  }, [mx, my])

  const size = mode === 'hover' ? 36 : 16
  const glowSize = mode === 'hover' ? 120 : 64

  return (
    <div className="custom-cursor-root" aria-hidden>
      <motion.div className="cursor-dot" style={{ left: sx, top: sy, width: size, height: size }} />
      <motion.div className="cursor-glow" style={{ left: sx, top: sy, width: glowSize, height: glowSize }} />
    </div>
  )
}
