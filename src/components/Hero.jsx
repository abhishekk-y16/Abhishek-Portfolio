import React, { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import gsap from '../gsap/gsapSetup'

export default function Hero() {
  const [typed, setTyped] = useState('')
  const fullText = 'Hi, I\'m Abhishek Kumar Yadav'
  const typingStartedRef = useRef(false)

  // Typing effect - listens for hero-loaded event
  useEffect(() => {
    const startTyping = () => {
      if (typingStartedRef.current) return
      typingStartedRef.current = true

      let charIndex = 0
      setTyped('')

      const typeInterval = setInterval(() => {
        if (charIndex < fullText.length) {
          setTyped(fullText.substring(0, charIndex + 1))
          charIndex++
        } else {
          clearInterval(typeInterval)
        }
      }, 45)

      return () => clearInterval(typeInterval)
    }

    // Listen for event from loader
    window.addEventListener('hero-loaded', startTyping)

    // Fallback timer in case loader doesn't trigger
    const fallbackTimer = setTimeout(() => {
      if (!typingStartedRef.current) {
        startTyping()
      }
    }, 4500)

    return () => {
      window.removeEventListener('hero-loaded', startTyping)
      clearTimeout(fallbackTimer)
    }
  }, [])

  // Pointer interaction effects
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const sx = useSpring(mvX, { stiffness: 140, damping: 30 })
  const sy = useSpring(mvY, { stiffness: 140, damping: 30 })
  const transform = useTransform([sx, sy], (x, y) => `translate(${x * 18}px, ${y * -10}px)`)

  const headingRef = useRef(null)
  const heroRef = useRef(null)

  function handlePointerMove(e) {
    const el = heroRef.current || e.currentTarget
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height
    mvX.set(dx)
    mvY.set(dy)

    if (headingRef.current && gsap) {
      const rotY = dx * 12
      const rotX = -dy * 10
      const tx = dx * 16
      const ty = dy * -12
      gsap.to(headingRef.current, {
        x: tx,
        y: ty,
        rotationY: rotY,
        rotationX: rotX,
        duration: 0.6,
        ease: 'power3.out',
        transformPerspective: 900,
        overwrite: true
      })
    }
  }

  function handlePointerLeave() {
    mvX.set(0)
    mvY.set(0)
    if (headingRef.current && gsap) {
      gsap.to(headingRef.current, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
    }
  }

  const sectionVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.section
      className="hero reveal"
      id="hero"
      role="region"
      aria-labelledby="hero-heading"
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div ref={heroRef} className="hero-content">
        <motion.h1
          ref={headingRef}
          id="hero-heading"
          style={{
            fontFamily: 'Arial, Helvetica, sans-serif',
            transform,
            background: 'linear-gradient(135deg, #00d9ff 0%, #667eea 50%, #f093fb 100%)',
            backgroundSize: '200% auto',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: '#00d9ff',
            filter: 'drop-shadow(0 4px 12px rgba(0, 217, 255, 0.3))',
            fontSize: '3rem',
            fontWeight: 700,
            margin: '0 0 20px 0'
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            backgroundPosition: {
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }
          }}
        >
          <span id="typed-text-react">{typed}</span>
        </motion.h1>
        <motion.p
          className="subtitle"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Backend Developer & AI | ML Engineer
        </motion.p>
      </div>
    </motion.section>
  )
}
