import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollProgressLoader() {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const mouseXRef = useRef(0)
  const hasStartedRef = useRef(false)
  const totalFrames = 16

  // Track mouse movement for interactive frame control
  useEffect(() => {
    if (!isVisible) return

    const handleMouseMove = (e) => {
      mouseXRef.current = e.clientX
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isVisible])

  useEffect(() => {
    const heroSection = document.querySelector('.hero')
    if (!heroSection) {
      setIsVisible(false)
      return
    }

    const heroRect = heroSection.getBoundingClientRect()
    const isHeroInView = heroRect.top < window.innerHeight && heroRect.bottom > 0

    if (!isHeroInView) {
      setIsVisible(false)
      return
    }

    setIsVisible(true)
    heroSection.style.visibility = 'hidden'
    heroSection.style.opacity = '0'
    heroSection.style.transition = 'none'
    heroSection.setAttribute('data-loading', 'true')

    const loadTimer = setTimeout(() => {
      if (hasStartedRef.current) return
      hasStartedRef.current = true

      let startTime = Date.now()
      const duration = 8000

      const animateProgress = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min((elapsed / duration), 1)
        
        // Show only 0, 25, 50, 75, 100 percentages
        let percentValue = 0
        if (progress < 0.25) percentValue = 0
        else if (progress < 0.5) percentValue = 25
        else if (progress < 0.75) percentValue = 50
        else if (progress < 1) percentValue = 75
        else percentValue = 100
        
        // Cursor-based frame position only (0 to 15 based on cursor X position)
        const cursorProgress = Math.min(Math.max(mouseXRef.current / window.innerWidth, 0), 1)
        const frameIndex = Math.round(cursorProgress * (totalFrames - 1))
        
        setCurrentFrame(frameIndex)
        setPercentage(percentValue)

        if (progress < 1) {
          requestAnimationFrame(animateProgress)
        } else {
          setCurrentFrame(totalFrames - 1)
          setPercentage(100)

          setTimeout(() => {
            setIsVisible(false)
            const hero = document.querySelector('.hero')
            if (hero) {
              hero.removeAttribute('data-loading')
              hero.style.visibility = 'visible'
              hero.style.transition = 'none'
              hero.style.transform = 'translateX(100%)'
              hero.style.opacity = '0'
              void hero.offsetHeight
              hero.style.transition = 'all 0.6s ease-out'
              hero.style.transform = 'translateX(0)'
              hero.style.opacity = '1'
              setTimeout(() => {
                window.dispatchEvent(new Event('hero-loaded'))
              }, 100)
            }
          }, 300)
        }
      }

      requestAnimationFrame(animateProgress)
    }, 300)

    return () => {
      clearTimeout(loadTimer)
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="loading-frame-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="loading-frame-wrapper">
            <img
              src={`${import.meta.env.BASE_URL}Loading%20Sequence/ezgif-frame-${String(currentFrame + 1).padStart(3, '0')}.png`}
              alt="Loading"
              className="loading-frame-image"
            />
            <div className="loading-percentage">
              {percentage}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
