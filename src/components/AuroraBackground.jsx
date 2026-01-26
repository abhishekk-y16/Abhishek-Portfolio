import React, { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Optimized aurora background - minimal animations for performance
export default function AuroraBackground() {
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)
  
  // Reduced stiffness for less frequent updates
  const springX = useSpring(mouseX, { stiffness: 50, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25 })

  // Respect user's reduced motion preference
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  useEffect(() => {
    if (prefersReduced) return

    let rafId
    function onMove(e) {
      // Throttle mouse updates
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const px = (e.clientX / window.innerWidth) * 100
        const py = (e.clientY / window.innerHeight) * 100
        mouseX.set(px)
        mouseY.set(py)
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [mouseX, mouseY, prefersReduced])

  // Transform motion values to CSS strings
  const left1 = useTransform(springX, v => `${v}%`)
  const top1 = useTransform(springY, v => `${v}%`)
  const left2 = useTransform(springX, v => `${100 - v}%`)
  const top2 = useTransform(springY, v => `${100 - v}%`)

  if (prefersReduced) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(0,217,255,0.05), transparent 60%)',
          opacity: 0.3
        }}
        aria-hidden
      />
    )
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
      aria-hidden
    >
      {/* Primary aurora gradient */}
      <motion.div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          left: left1,
          top: top1,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle at center, rgba(0,217,255,0.12) 0%, rgba(0,180,204,0.06) 30%, transparent 70%)',
          filter: 'blur(50px)',
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Secondary gradient */}
      <motion.div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          left: left2,
          top: top2,
          transform: 'translate(50%, 50%)',
          background: 'radial-gradient(circle at center, rgba(0,200,255,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          mixBlendMode: 'multiply',
          opacity: 0.5
        }}
      />
    </div>
  )
}
