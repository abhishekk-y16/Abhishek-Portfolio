import React from 'react'
import { motion } from 'framer-motion'

export default function Experience() {
  const pillars = [
    {
      id: 1,
      icon: '🚀',
      title: 'Built + Scaled Cloud Programs From Zero',
      date: 'Nov 2025 - Present',
      sentence: 'As AWS Cloud Club Captain, transformed a concept into a 200-member organization that runs 12+ workshops, co-organizes 3+ hackathons annually, and produces 20+ deployable projects.',
      metric: 'Growing from 0 → 200 active members in a single academic year; managing parallel initiatives (workshops, hackathons, mentorship tracks) while maintaining code quality.'
    },
    {
      id: 2,
      icon: '👥',
      title: 'Structured Growth + Ownership',
      date: 'Jan 2025 - Present',
      sentence: 'Designed mentorship pathways where learners become leaders—junior members now run their own workshops, lead hackathon teams, and make architectural decisions without permission-seeking.',
      metric: '200+ members with tangible skill growth; transition rate from "attendee" to "organizer" in under 6 months; team retention stays high because people own outcomes.'
    },
    {
      id: 3,
      icon: '⚡',
      title: 'Constraints = Opportunities',
      
      sentence: 'When timelines tighten (24-48 hour hackathons) or resources shrink (limited budget), I reframe limits as design challenges—forcing clarity, creativity, and focus on what actually matters.',
      metric: 'Obstacles aren\'t roadblocks; they\'re the forge where teams prove capability and build resilience.'
    }
  ]

  const container = { 
    hidden: { opacity: 0 }, 
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      } 
    } 
  }
  
  const pillarCard = { 
    hidden: { opacity: 0, y: 30, scale: 0.95 }, 
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1]
      } 
    } 
  }

  return (
    <motion.section
      className="experience reveal"
      id="experience"
      role="region"
      aria-labelledby="experience-heading"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      {/* Section Header */}
      <motion.div 
        className="experience-header-premium"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 id="experience-heading">Professional Experience</h2>
        <p className="experience-supporting-line">Leading teams. Scaling impact. Shipping results.</p>
      </motion.div>

      {/* Three Pillar Structure */}
      <motion.div 
        className="pillars-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >
        {pillars.map((pillar) => (
          <motion.div
            key={pillar.id}
            className="pillar-card"
            variants={pillarCard}
            whileHover={{ 
              y: -8,
              boxShadow: '0 20px 50px rgba(0, 217, 255, 0.2)',
              transition: { duration: 0.3 }
            }}
          >
            {/* Pillar Icon */}
            <motion.div 
              className="pillar-icon"
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.3 }
              }}
            >
              {pillar.icon}
            </motion.div>

            {/* Pillar Content */}
            <div className="pillar-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h3 className="pillar-title">{pillar.title}</h3>
                <span style={{
                  fontSize: '0.8rem',
                  color: '#00d9ff',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  whiteSpace: 'nowrap'
                }}>
                  {pillar.date}
                </span>
              </div>
              
              <p className="pillar-sentence">
                {pillar.sentence}
              </p>

              <p className="pillar-metric">
                {pillar.metric}
              </p>
            </div>

            {/* Hover Glow */}
            <motion.div 
              className="pillar-glow"
              animate={{ opacity: [0, 0.1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Closing Statement */}
      <motion.div 
        className="experience-closing"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="closing-title">Leadership is multiplication, not addition.</h3>
        <p className="closing-statement">
          I don't just participate in projects—I build systems where others step up, make decisions, and ship work that matters. The outcome: teams that move faster, think deeper, and grow beyond the role they started in.
        </p>
      </motion.div>
    </motion.section>
  )
}
