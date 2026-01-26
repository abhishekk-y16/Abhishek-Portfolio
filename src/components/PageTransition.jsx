import React, { useState, useRef, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

export default function PageTransition() {
  const controls = useAnimation()
  const [visible, setVisible] = useState(false)
  const pendingRef = useRef(null)

  useEffect(() => {
    function onClick(e) {
      const a = e.target.closest('a')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href || !href.startsWith('#')) return

      // intercept hash navigation, play transition, then scroll
      e.preventDefault()
      const targetId = href.slice(1)
      setVisible(true)
      controls.start({ opacity: 1, filter: 'blur(4px)' }).then(() => {
        const el = document.getElementById(targetId)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // hide overlay after short delay
        setTimeout(() => {
          controls.start({ opacity: 0, filter: 'blur(0px)' }).then(() => setVisible(false))
        }, 420)
      })
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [controls])

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, filter: 'blur(0px)' }}
      animate={controls}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: visible ? 'auto' : 'none',
        zIndex: 50,
        background: 'linear-gradient(90deg, rgba(18,18,18,0.0), rgba(2,6,12,0.35))'
      }}
    />
  )
}
