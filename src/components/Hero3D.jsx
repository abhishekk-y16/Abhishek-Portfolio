import React, { useEffect, useState, useRef, Suspense } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Stars, Sparkles, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Floating gradient wave meshes in the background
function GradientWaves() {
  const mesh1 = useRef()
  const mesh2 = useRef()
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (mesh1.current) {
      mesh1.current.rotation.x = Math.sin(t * 0.2) * 0.1
      mesh1.current.rotation.y = t * 0.08
      mesh1.current.position.y = Math.sin(t * 0.3) * 0.5
    }
    if (mesh2.current) {
      mesh2.current.rotation.x = Math.cos(t * 0.15) * 0.12
      mesh2.current.rotation.y = -t * 0.06
      mesh2.current.position.y = Math.cos(t * 0.25) * 0.6
    }
  })

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={mesh1} position={[-2, 0, -8]} scale={[6, 6, 6]}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#00d9ff"
            attach="material"
            distort={0.4}
            speed={1.5}
            opacity={0.15}
            transparent
            roughness={0.4}
          />
        </mesh>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
        <mesh ref={mesh2} position={[3, -1, -10]} scale={[5, 5, 5]}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#a7a3b6"
            attach="material"
            distort={0.35}
            speed={1.2}
            opacity={0.12}
            transparent
            roughness={0.5}
          />
        </mesh>
      </Float>
    </group>
  )
}

// Camera that reacts to mouse movement for parallax depth
function ReactiveCamera({ mouseX, mouseY }) {
  const { camera } = useThree()
  
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX * 2, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -mouseY * 1.5, 0.05)
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// Particle field that follows mouse
function ReactiveParticles({ mouseX, mouseY }) {
  const particlesRef = useRef()
  
  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.position.x = THREE.MathUtils.lerp(
        particlesRef.current.position.x, 
        mouseX * 0.5, 
        0.03
      )
      particlesRef.current.position.y = THREE.MathUtils.lerp(
        particlesRef.current.position.y, 
        -mouseY * 0.4, 
        0.03
      )
    }
  })
  
  return (
    <group ref={particlesRef}>
      <Sparkles
        count={180}
        scale={[20, 10, 20]}
        size={2}
        speed={0.3}
        opacity={0.6}
        color="#00d9ff"
      />
    </group>
  )
}

// Main 3D scene component
function Scene3D({ mouseX, mouseY }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#00d9ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a7a3b6" />
      
      <ReactiveCamera mouseX={mouseX} mouseY={mouseY} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ReactiveParticles mouseX={mouseX} mouseY={mouseY} />
      <GradientWaves />
    </>
  )
}

export default function Hero3D() {
  // Typing effect preserved from original
  const [typed, setTyped] = useState('')
  const fullText = 'Hi, I am Abhishek Kumar Yadav'

  useEffect(() => {
    // Robust typing using setInterval + refs to be safe under StrictMode/HMR
    console.log('[Hero3D] typing effect mount (interval)')
    setTyped('')
    const idxRef = { current: 0 }
    const startedRef = { current: false }
    let intervalId = null

    if (!startedRef.current) {
      startedRef.current = true
      intervalId = setInterval(() => {
        const i = idxRef.current
        if (i >= fullText.length) {
          clearInterval(intervalId)
          return
        }
        const ch = fullText.charAt(i)
        console.log(`[Hero3D] typing idx=${i} char='${ch}'`)
        setTyped((s) => s + ch)
        idxRef.current += 1
      }, 45)
    }

    return () => {
      console.log('[Hero3D] typing effect unmount (interval)')
      if (intervalId) clearInterval(intervalId)
      startedRef.current = false
    }
  }, [])

  // debug: log typed value changes to observe actual DOM content during typing
  useEffect(() => {
    console.log('[Hero3D] typedValue =>', typed)
  }, [typed])

  // Mouse tracking for 3D parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  // Transform for text floating effect
  const textX = useTransform(smoothX, [-1, 1], [-15, 15])
  const textY = useTransform(smoothY, [-1, 1], [10, -10])

  function handlePointerMove(e) {
    const x = (e.clientX / window.innerWidth) * 2 - 1
    const y = -(e.clientY / window.innerHeight) * 2 + 1
    mouseX.set(x)
    mouseY.set(y)
  }

  const sectionVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2, ease: [0.2, 0.9, 0.2, 1] } }
  }

  return (
    <motion.section
      className="hero reveal"
      id="hero"
      role="region"
      aria-labelledby="hero-heading"
      variants={sectionVariant}
      initial="hidden"
      animate="visible"
      onPointerMove={handlePointerMove}
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(-45deg, #1d1e22, #262b40, #a7a3b6, #121316)',
        backgroundSize: '400% 400%',
        animation: 'gradientFlow 12s ease infinite'
      }}
    >
      {/* 3D Canvas Layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <Scene3D mouseX={smoothX.get()} mouseY={smoothY.get()} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Layer with floating 3D transforms */}
      <motion.div
        className="hero-content"
        style={{
          position: 'relative',
          zIndex: 1,
          x: textX,
          y: textY
        }}
      >
        <motion.h1
          id="hero-heading"
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: 700,
            letterSpacing: '-0.03em',
            textShadow: '0 8px 32px rgba(0, 217, 255, 0.4), 0 4px 12px rgba(0, 0, 0, 0.6)',
            background: 'linear-gradient(135deg, #00d9ff 0%, #667eea 50%, #f093fb 100%)',
            backgroundSize: '200% auto',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent'
          }}
          animate={{
            y: [0, -8, 0],
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            },
            backgroundPosition: {
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }
          }}
        >
          <span id="typed-text-react">{typed}</span>
          <span style={{ opacity: typed.length < fullText.length ? 1 : 0 }}>|</span>
        </motion.h1>

        <motion.p
          className="subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Aspiring AI/ML Engineer & Backend Web Developer
        </motion.p>

        <motion.a
          whileHover={{
            scale: 1.05,
            boxShadow: '0 12px 40px rgba(0,217,255,0.4)',
            y: -4
          }}
          whileTap={{ scale: 0.98 }}
          animate={{
            boxShadow: [
              '0 4px 20px rgba(0,217,255,0.2)',
              '0 8px 32px rgba(0,217,255,0.4)',
              '0 4px 20px rgba(0,217,255,0.2)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="cta-button"
          href="#contact"
          style={{
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <motion.span
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              transform: 'translateX(-100%)'
            }}
            animate={{
              transform: ['translateX(-100%)', 'translateX(100%)']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          <span style={{ position: 'relative', zIndex: 1 }}>Let's Connect</span>
        </motion.a>
      </motion.div>
    </motion.section>
  )
}
