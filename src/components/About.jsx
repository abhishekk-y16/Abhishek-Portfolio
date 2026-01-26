import React from 'react'
import { motion } from 'framer-motion'

export default function About() {
  // Core Philosophy Pillars
  const philosophyPillars = [
    {
      title: 'Speed',
      description: 'VoxelVerse went from concept to deployed product in 2 days',
      icon: '⚡'
    },
    {
      title: 'Practicality',
      description: 'I build solutions to real problems I face, not hypothetical ones',
      icon: '🎯'
    },
    {
      title: 'Teaching',
      description: 'Leading AWS Cloud Club where people actually build',
      icon: '🏫'
    }
  ]

  // Projects
  const projects = [
    {
      name: 'VoxelVerse',
      subtitle: '3D Voxel Editor with Hand Gestures',
      timeframe: 'Solo • 2 days from research to deployment',
      description: 'Built a 3D voxel editor you control with your hands. No mouse, no keyboard—just MediaPipe hand tracking and gesture recognition. Real-time hand tracking, 10,000+ voxel rendering, 6 gesture types.',
      tech: ['React', 'Three.js', 'MediaPipe', 'TypeScript'],
      icon: '🎮'
    },
    {
      name: 'EleUse',
      subtitle: 'Weather-Based Electricity Demand Forecasting',
      timeframe: 'Solo • Built from research papers + real frustration',
      description: 'Full-stack ML platform that predicts electricity load based on weather patterns. 24-hour forecasting with 20+ engineered features. Deployed and working with live forecasts and confidence intervals.',
      tech: ['Next.js', 'TypeScript', 'Random Forest'],
      icon: '⚡'
    },
    {
      name: 'Expense-AI-Agent',
      subtitle: 'Smart Expense Tracker',
      timeframe: 'Weekend project • Solved my own problem',
      description: 'Send expense messages to a Telegram bot, Gemini API extracts details, logs everything to Excel automatically. Parses natural language, auto-categorizes, tracks daily spending.',
      tech: ['n8n'],
      icon: '💰'
    }
  ]

  // How I Work Principles
  const workPrinciples = [
    {
      title: 'Fast Iteration',
      description: 'Research → deployment in days, not months. I ship, then improve.'
    },
    {
      title: 'Learn by Doing',
      description: 'Didn\'t fully understand Random Forest theory before building EleUse. Built it anyway. Now I understand both the math and the code.'
    },
    {
      title: 'Solve Real Problems',
      description: 'Power cuts led to EleUse. Overspending led to Expense-AI-Agent. I build what I need, then share it.'
    },
    {
      title: 'No Tutorial Hell',
      description: 'Watch enough to understand the concept, then build something different. Building from scratch teaches you to think.'
    }
  ]

  // Skills
  const skills = {
    'Languages': ['Python', 'JavaScript/TypeScript', 'Java'],
    'Frontend': ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    'Backend': ['Node.js', 'Express', 'REST APIs'],
    'ML/AI': ['Random Forest', 'Feature Engineering', 'Gemini API', 'MediaPipe'],
    'Cloud': ['AWS (EC2, S3, Lambda)', 'Infrastructure Deployment'],
    'Tools': ['Git', 'n8n', 'Three.js', 'GSAP']
  }

  // What I Bring
  const whatIBring = [
    'Speed (research → deployment in days, not months)',
    'Practical problem-solving (if it doesn\'t work in reality, it doesn\'t matter)',
    'Teaching ability (50 people trust me to explain complex systems simply)',
    'Builder mentality (stuck? Build something. Confused? Ship something.)'
  ]

  return (
    <motion.section className="about" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      {/* Section Header */}
      <motion.div 
        className="about-header"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>I Build Things Fast, Solve Real Problems</h2>
        <p className="about-tagline">2nd Year CSE • Builder • AWS Cloud Club Captain. I don't wait for perfect conditions—I research, build, test, and ship.</p>
      </motion.div>

      {/* Core Intro */}
      <motion.div 
        className="about-intro-block"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="about-intro-wrapper">
          <div className="about-intro-text-column">
            <p className="about-intro-text">
              I'm a second-year Computer Science student who turns ideas into working code—fast. I learn by doing. Research papers become working ML models. Documentation becomes deployed infrastructure. Problems become shipped projects.
            </p>
            <p className="about-intro-text" style={{ marginTop: '1rem', fontSize: '0.95rem', opacity: 0.85 }}>
              Three things define how I work: <strong>Speed</strong> (VoxelVerse: concept to deployment in 2 days), <strong>Practicality</strong> (I build solutions to real problems I face), and <strong>Teaching</strong> (running a 50-member AWS Cloud Club).
            </p>
          </div>
          <div className="about-image-column">
            <img src="./AbhishekPhoto.jpg" alt="Abhishek Yadav" className="about-profile-image" />
          </div>
        </div>
      </motion.div>

      {/* Philosophy Pillars */}
      <motion.div 
        className="highlights-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="highlights-title">What Actually Defines Me</h3>
        <div className="highlights-grid-new">
          {philosophyPillars.map((pillar, index) => (
            <motion.div
              key={index}
              className="highlight-card-new"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              whileHover={{ 
                y: -6,
                boxShadow: '0 20px 50px rgba(0, 217, 255, 0.2)' 
              }}
            >
              <span className="card-icon">{pillar.icon}</span>
              <h4 className="card-title">{pillar.title}</h4>
              <p className="card-description">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Projects Section */}
      <motion.div 
        className="projects-showcase"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="projects-title">Projects That Matter</h3>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 * index }}
              whileHover={{ 
                y: -8,
                boxShadow: '0 25px 60px rgba(0, 217, 255, 0.15)' 
              }}
            >
              <div className="project-header">
                <span className="project-icon">{project.icon}</span>
                <div>
                  <h4 className="project-name">{project.name}</h4>
                  <p className="project-subtitle">{project.subtitle}</p>
                </div>
              </div>
              <p className="project-timeframe">{project.timeframe}</p>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AWS Cloud Club & Open Source */}
      <motion.div 
        className="leadership-proof"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="proof-title">Impact in Action</h3>
        <div className="proof-timeline">
          <div className="proof-item">
            <span className="proof-bullet">→</span>
            <div className="proof-text">
              <strong>AWS Cloud Club Captain:</strong> 50 active members learning and building with AWS. Started with zero members. Now people ask good questions, run their own sessions, and actually deploy infrastructure—not just attend lectures.
            </div>
          </div>
          <div className="proof-item">
            <span className="proof-bullet">→</span>
            <div className="proof-text">
              <strong>Open Source (GSSoC 2025):</strong> Contributing to real projects with real users. Social commerce platform UI/UX improvements, DApp functionality. Code reviews from experienced maintainers teach more than any tutorial.
            </div>
          </div>
        </div>
      </motion.div>

      {/* How I Work */}
      <motion.div 
        className="work-principles"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        <h3 className="work-title">How I Actually Work</h3>
        <div className="principles-grid">
          {workPrinciples.map((principle, index) => (
            <motion.div
              key={index}
              className="principle-card"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.06 * index }}
            >
              <h4 className="principle-title">{principle.title}</h4>
              <p className="principle-text">{principle.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Skills Grid */}
      <motion.div 
        className="skills-showcase"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h3 className="skills-title">What I Actually Use</h3>
        <div className="skills-list">
          {Object.entries(skills).map(([category, items], index) => (
            <motion.div
              key={index}
              className="skill-category"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
            >
              <h4 className="skill-category-title">{category}</h4>
              <div className="skill-items">
                {items.map((item, i) => (
                  <span key={i} className="skill-item">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* What I Bring + Final CTA */}
      <motion.div 
        className="final-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.55 }}
      >
        <div className="what-i-bring">
          <h3 className="section-subtitle">What I Bring</h3>
          <ul className="bring-list">
            {whatIBring.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="impact-philosophy">
          <h3 className="section-subtitle">Why This Matters</h3>
          <p className="philosophy-text">
            Ratan Tata showed me that success isn't about hoarding wealth—it's about what you do with it. 66% of Tata Sons profits go to society. When I teach 50 people AWS, I'm not just sharing knowledge—I'm multiplying what's possible. The goal isn't to be the smartest person in the room. It's to build things that matter and help others do the same.
          </p>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div 
        className="about-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h3 className="cta-title">Let's Build Something</h3>
        <p className="cta-text">Looking for projects that solve real problems, teams that ship working code, and environments where learning happens by doing.</p>
        <p className="cta-subtext">Reach out if you're building something hard and want teammates who learn by doing. The truth: I'm still learning. I break things. But I ship, iterate, and help others do the same.</p>
      </motion.div>
    </motion.section>
  )
}
