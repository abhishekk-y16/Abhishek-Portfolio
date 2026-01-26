import React from 'react'
import { motion } from 'framer-motion'

export default function Skills() {

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  }

  return (
    <motion.section
      className="skills reveal"
      id="skills"
      role="region"
      aria-labelledby="skills-heading"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      {/* Section Header */}
      <motion.div 
        className="skills-header-premium"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 id="skills-heading">Skills & Technologies</h2>
        <p className="skills-tagline">Tools I use to build fast and ship solutions that work.</p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div 
        className="skills-filter"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Filter buttons hidden - using simplified view */}
      </motion.div>

      {/* Skills Categories Grid */}
      <motion.div 
        className="skills-grid-premium"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >
        {/* Skills moved to About section for comprehensive overview */}
        <motion.div className="skills-message">
          <p>For detailed skills and tech stack, see the <strong>About</strong> section above where I break down what I actually use across languages, frontend, backend, ML/AI, cloud, and tools.</p>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
