import React from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Team Member, AWS Cloud Club',
    role: 'Workshop Participant',
    text: 'Abhishek transformed our learning experience. His workshops went from attendance-based to outcome-driven. He doesn\'t just teach—he empowers you to build.',
    highlight: 'Leadership'
  },
  {
    name: 'Open Source Collaborator',
    role: 'GSSoC 2025 Mentor',
    text: 'His contributions show deep understanding of system design. Code review feedback is thoughtful. Gets things done without needing hand-holding.',
    highlight: 'Technical Depth'
  },
  {
    name: 'Mentee',
    role: 'Cloud Club Mentee',
    text: 'Started as attendee, now organizing workshops. Abhishek designed a system where people naturally step up. That\'s rare leadership.',
    highlight: 'Mentorship'
  }
]

export default function Testimonials() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  }

  const card = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.2, 0.9, 0.2, 1]
      }
    }
  }

  return (
    <motion.section
      id="testimonials"
      className="testimonials reveal"
      role="region"
      aria-labelledby="testimonials-heading"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 id="testimonials-heading" style={{ color: 'white', marginBottom: '60px' }}>
        What Others Say
      </h2>

      <motion.div className="testimonials-grid" variants={container}>
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="testimonial-card"
            variants={card}
            whileHover={{
              y: -8,
              boxShadow: '0 24px 60px rgba(0, 217, 255, 0.15)'
            }}
          >
            {/* Quote Mark */}
            <div style={{
              fontSize: '2.5rem',
              color: 'rgba(0, 217, 255, 0.3)',
              marginBottom: '12px',
              lineHeight: 1
            }}>
              "
            </div>

            {/* Testimonial Text */}
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '20px',
              fontStyle: 'italic'
            }}>
              {testimonial.text}
            </p>

            {/* Highlight Badge */}
            <div style={{
              display: 'inline-block',
              padding: '6px 14px',
              background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.2), rgba(0, 217, 255, 0.05))',
              border: '1px solid rgba(0, 217, 255, 0.3)',
              borderRadius: '20px',
              fontSize: '0.75rem',
              color: '#00d9ff',
              fontWeight: 600,
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {testimonial.highlight}
            </div>

            {/* Author Info */}
            <div style={{ borderTop: '1px solid rgba(0, 217, 255, 0.1)', paddingTop: '16px' }}>
              <p style={{
                margin: '0 0 4px 0',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#fff'
              }}>
                {testimonial.name}
              </p>
              <p style={{
                margin: 0,
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.6)'
              }}>
                {testimonial.role}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
