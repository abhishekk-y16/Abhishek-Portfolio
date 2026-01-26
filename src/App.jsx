import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import AuroraBackground from './components/AuroraBackground'
import MagneticCursor from './components/MagneticCursor'
import SmoothScroll from './components/SmoothScroll'
import PageTransition from './components/PageTransition'
import ScrollProgressLoader from './components/ScrollProgressLoader'
import PremiumHeroUpgrade from './components/PremiumHeroUpgrade'
import FrameSequenceHero from './components/FrameSequenceHero'
import About from './components/About'
import Experience from './components/Experience'
import Testimonials from './components/Testimonials'
import Inspirations from './components/Inspirations'
import Contact from './components/Contact'
import { useEffect } from 'react'
import gsap from './gsap/gsapSetup'

// Loading fallback for Hero
const HeroLoadingFallback = () => (
  <div style={{ 
    height: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: 'linear-gradient(-45deg, #1d1e22, #262b40, #a7a3b6, #121316)',
    backgroundSize: '400% 400%',
    animation: 'gradientFlow 12s ease infinite'
  }}>
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ 
        fontSize: '1.5rem', 
        color: '#00d9ff',
        textAlign: 'center'
      }}
    >
      Loading cinematic experience...
    </motion.div>
  </div>
)

export default function App() {
  useEffect(() => {
    let raf = null
    let animationStartTime = Date.now()
    
    function onScroll() {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const docH = document.documentElement.scrollHeight - window.innerHeight
        const prog = docH > 0 ? window.scrollY / docH : 0
        // subtle overlay opacity tied to scroll (0 - 0.06)
        document.documentElement.style.setProperty('--scroll-overlay', (0.02 + prog * 0.04).toString())
        
        // Synchronized frame animation - calculate which frame to show based on time
        const elapsed = (Date.now() - animationStartTime) / 1000
        const frameProgress = (elapsed % 8) / 8 // 8s cycle
        const forwardFrame = Math.floor(frameProgress * 16) + 1
        // For alternate effect: first half goes 1-16, second half goes 16-1
        const frame = frameProgress < 0.5 
          ? Math.floor((frameProgress * 2) * 16) + 1
          : Math.floor((2 - frameProgress * 2) * 16) + 1
        const clampedFrame = Math.max(1, Math.min(16, frame))
        document.documentElement.style.setProperty('--global-frame', clampedFrame)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // GSAP ScrollTrigger: cinematic scroll reveals with depth and rotation
  useEffect(() => {
    if (!gsap || !gsap.utils) return
    const els = gsap.utils.toArray('.reveal')
    els.forEach((el) => {
      gsap.fromTo(
        el,
        { 
          y: 80, 
          opacity: 0, 
          rotateX: 8,
          scale: 0.95,
          filter: 'blur(4px)'
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5,
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    return () => {
      gsap && gsap.ScrollTrigger && gsap.ScrollTrigger.getAll && gsap.ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <SmoothScroll>
      <div className="app-root">
        <AuroraBackground />
        <MagneticCursor />
        <PageTransition />
        <ScrollProgressLoader />
        <div className="scroll-overlay" aria-hidden />
        <main>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Suspense fallback={<HeroLoadingFallback />}>
              <FrameSequenceHero />
            </Suspense>
            <About />
            <Experience />
            <Testimonials />
            <Inspirations />
            <Contact />
          </motion.div>
        </main>
      </div>
    </SmoothScroll>
  )
}
