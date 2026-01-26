/**
 * Subtle Particle System
 * Minimal, slow-moving particles for dimension (5 total)
 */

import { motion } from 'framer-motion';

// Generate random particle configuration
function generateParticles() {
  return Array.from({ length: 5 }, (_, i) => {
    const startX = Math.random() * 100;
    const startY = 100 + Math.random() * 20;
    const endX = Math.random() * 100;
    const endY = -10 - Math.random() * 20;
    const delay = (i * 1.5) % 8; // Stagger delays
    const duration = 7 + Math.random() * 2;

    return {
      id: i,
      startX,
      startY,
      endX,
      endY,
      delay,
      duration,
      size: 2 + Math.random() * 2, // 2-4px
      opacity: 0.15 + Math.random() * 0.15, // 0.15-0.3
    };
  });
}

const Particle = ({ particle }) => {
  return (
    <motion.div
      className="hero-particle"
      style={{
        position: 'fixed',
        zIndex: 1,
        pointerEvents: 'none',
      }}
      initial={{
        left: `${particle.startX}%`,
        top: `${particle.startY}%`,
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        left: `${particle.endX}%`,
        top: `${particle.endY}%`,
        opacity: [0, particle.opacity, 0],
        scale: [0.8, 1, 0.8],
      }}
      transition={{
        delay: particle.delay,
        duration: particle.duration,
        repeat: Infinity,
        repeatDelay: 2, // Gap between particle cycles
        ease: [0.25, 0.46, 0.45, 0.94], // Gentle easing
      }}
    >
      <div
        style={{
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          borderRadius: '50%',
          background: '#00d9ff',
          boxShadow: '0 0 6px rgba(0, 217, 255, 0.4)',
        }}
      />
    </motion.div>
  );
};

export const ParticleSystem = ({ isVisible = true }) => {
  const particles = generateParticles();

  if (!isVisible) return null;

  return (
    <div className="particle-system">
      {particles.map((particle) => (
        <Particle key={particle.id} particle={particle} />
      ))}
    </div>
  );
};

export default ParticleSystem;
