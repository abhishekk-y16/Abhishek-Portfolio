import React, { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'

export default function MagneticCursor() {
  // Hide on touch devices and respect reduced motion
  if (typeof window !== 'undefined') {
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return null
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null
  }

  const mx = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const my = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0)
  const sx = useSpring(mx, { stiffness: 50, damping: 10, mass: 0.5 })
  const sy = useSpring(my, { stiffness: 50, damping: 10, mass: 0.5 })
  const [mode, setMode] = useState('default') // 'default' | 'hover' | 'magnetic'
  const [sparkles, setSparkles] = useState([])
  const sparkleId = useRef(0)

  // Generate sparkles as cursor moves - OPTIMIZED: much less frequent
  useEffect(() => {
    let throttleTimeout
    function onMove(e) {
      mx.set(e.clientX)
      my.set(e.clientY)
      
      // Generate sparkle trail with lower probability (was 0.92, now 0.95 = 5% chance instead of 8%)
      if (Math.random() > 0.95) {
        const id = sparkleId.current++
        const newSparkle = {
          id,
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          size: Math.random() * 3 + 1,
          delay: Math.random() * 0.1
        }
        setSparkles(prev => [...prev.slice(-8), newSparkle]) // Reduced from 15 to 8
        
        // Remove sparkle after animation (reduced from 1000ms)
        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== id))
        }, 600)
      }
    }

    function onOver(e) {
      const target = e.target.closest && e.target.closest('a, button, .project-card, .skill, .cta-button, .contact-item')
      if (target) {
        setMode('hover')
        const rect = target.getBoundingClientRect()
        const targetX = rect.left + rect.width / 2
        const targetY = rect.top + rect.height / 2
        
        // Magnetic pull effect - minimal strength for smooth following
        const pullX = (targetX - e.clientX) * 0.05
        const pullY = (targetY - e.clientY) * 0.05
        mx.set(e.clientX + pullX)
        my.set(e.clientY + pullY)
      }
    }

    function onOut(e) {
      const target = e.target.closest && e.target.closest('a, button, .project-card, .skill, .cta-button, .contact-item')
      if (!target) {
        setMode('default')
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver)
    window.addEventListener('pointerout', onOut)
    
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerout', onOut)
      clearTimeout(throttleTimeout)
    }
  }, [mx, my])

  const size = mode === 'hover' ? 48 : 18
  const glowSize = mode === 'hover' ? 140 : 72

  const cursorX = useTransform(sx, v => `${v}px`)
  const cursorY = useTransform(sy, v => `${v}px`)

  return (
    <div className="custom-cursor-root" aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {/* Main cursor dot with breathing animation */}
      <motion.div
        className="cursor-dot"
        style={{
          position: 'absolute',
          left: cursorX,
          top: cursorY,
          width: size,
          height: size,
          transform: 'translate(-50%, -50%)',
          background: mode === 'hover' 
            ? 'radial-gradient(circle, rgba(0,217,255,1) 0%, rgba(0,217,255,0.85) 60%, rgba(0,180,204,0.7) 100%)'
            : 'radial-gradient(circle, rgba(0,217,255,0.95) 0%, rgba(0,217,255,0.75) 100%)',
          borderRadius: '50%',
          border: mode === 'hover' 
            ? '2px solid rgba(0,217,255,0.6)' 
            : '1.5px solid rgba(0,217,255,0.4)',
          boxShadow: mode === 'hover' 
            ? '0 0 24px rgba(0,217,255,0.9), 0 0 48px rgba(0,217,255,0.5), inset 0 0 12px rgba(255,255,255,0.3)'
            : '0 0 16px rgba(0,217,255,0.7), 0 0 32px rgba(0,217,255,0.3), inset 0 0 8px rgba(255,255,255,0.2)',
          pointerEvents: 'none'
        }}
        animate={{
          scale: mode === 'hover' ? [1, 1.1, 1] : 1
        }}
        transition={{
          duration: 1.5,
          repeat: mode === 'hover' ? Infinity : 0,
          ease: 'easeInOut'
        }}
      />
      
      {/* Outer glow */}
      <motion.div
        className="cursor-glow"
        style={{
          position: 'absolute',
          left: cursorX,
          top: cursorY,
          width: glowSize,
          height: glowSize,
          transform: 'translate(-50%, -50%)',
          background: mode === 'hover'
            ? 'radial-gradient(circle at center, rgba(0,217,255,0.35), rgba(0,217,255,0.15) 40%, rgba(0,217,255,0.05) 70%, transparent)'
            : 'radial-gradient(circle at center, rgba(0,217,255,0.25), rgba(0,217,255,0.1) 40%, rgba(0,217,255,0.03) 70%, transparent)',
          filter: 'blur(20px)',
          pointerEvents: 'none'
        }}
      />

      {/* Sparkle particles */}
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          initial={{ opacity: 0, scale: 0, x: sparkle.x, y: sparkle.y }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
            y: sparkle.y - 30
          }}
          transition={{
            duration: 0.8,
            delay: sparkle.delay,
            ease: 'easeOut'
          }}
          style={{
            position: 'absolute',
            width: sparkle.size,
            height: sparkle.size,
            background: 'radial-gradient(circle, rgba(0,217,255,1) 0%, rgba(0,217,255,0.8) 40%, rgba(0,217,255,0) 70%)',
            borderRadius: '50%',
            boxShadow: '0 0 8px rgba(0,217,255,0.8)',
            pointerEvents: 'none'
          }}
        />
      ))}
    </div>
  )
}
