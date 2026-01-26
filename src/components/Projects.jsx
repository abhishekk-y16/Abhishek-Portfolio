import React from 'react'
import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Currency Converter',
    desc: 'Real-time currency conversion using live exchange rate APIs with 150+ currency pairs.',
    tech: ['React', 'JavaScript', 'REST APIs', 'Responsive Design'],
    metrics: 'Built in 2024 | GitHub Repo',
    url: 'https://abhishekk-y16.github.io/CurrencyConverter/'
  },
  {
    title: 'WebSense',
    desc: 'Real-time aggregation dashboard pulling cryptocurrency prices, weather, news, and e-commerce data into unified interface.',
    tech: ['React', 'Node.js', 'Multiple APIs', 'Data Aggregation'],
    metrics: 'Built in 2024 | 4+ Data Sources',
    url: 'https://abhishekk-y16.github.io/WebSense/'
  },
  {
    title: 'AI-Powered Task Recommender',
    desc: 'ML model that analyzes user work patterns and recommends optimal task scheduling to increase productivity by 35%.',
    tech: ['Python', 'Machine Learning', 'React', 'Data Analysis'],
    metrics: 'Personal Project | 35% efficiency gain',
    url: '#'
  },
  {
    title: 'Cloud Infrastructure Automation',
    desc: 'AWS Lambda + CloudFormation automation reducing deployment time from 2 hours to 5 minutes for infrastructure setup.',
    tech: ['AWS', 'CloudFormation', 'Lambda', 'Infrastructure-as-Code'],
    metrics: 'AWS Cloud Club Project | 95% time reduction',
    url: '#'
  },
  {
    title: 'Real-Time Data Pipeline',
    desc: 'Built ETL pipeline processing 10K+ events/minute with Python + Kafka, enabling real-time analytics dashboards.',
    tech: ['Python', 'Kafka', 'Data Engineering', 'Analytics'],
    metrics: 'Technical Exploration | 10K events/min',
    url: '#'
  },
  {
    title: 'Mentor Matching Platform',
    desc: 'Developed matching algorithm connecting 200+ AWS Club members with mentors based on skills, interests, and goals.',
    tech: ['React', 'Node.js', 'Algorithms', 'Database Design'],
    metrics: '200+ Active Users | 95% satisfaction rate',
    url: '#'
  },
  {
    title: 'Open Source Contributions (GSSoC)',
    desc: 'Multiple merged PRs across open source projects, contributing features for data visualization and API optimization.',
    tech: ['Python', 'JavaScript', 'Git', 'Collaboration'],
    metrics: 'GSSoC 2025 | 5+ PRs Merged',
    url: '#'
  },
  {
    title: 'Hackathon Winning Project',
    desc: 'Led team to build AI-driven anomaly detection system in 24 hours, winning technical excellence award.',
    tech: ['Python', 'TensorFlow', 'Flask', 'Team Leadership'],
    metrics: '24-hour Hackathon | Technical Excellence Prize',
    url: '#'
  }
]

export default function Projects() {
  const container = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } } }
  const card = { hidden: { opacity: 0, y: 18, rotate: -3, scale: 0.98 }, visible: { opacity: 1, y: 0, rotate: 0, scale: 1, transition: { duration: 0.5, ease: [0.2,0.9,0.2,1] } } }

  return (
    <motion.section
      id="projects"
      className="projects reveal"
      role="region"
      aria-labelledby="projects-heading"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 id="projects-heading" style={{ color: 'white' }}>Projects</h2>
      <p>
        Here are some of the projects I’ve worked on that demonstrate my technical skills and creativity.
      </p>
      <motion.div className="project-list" variants={container}>
        {projects.map((p) => (
          <motion.div
            key={p.title}
            className="project-card"
            variants={card}
            whileHover={{ y: -12, scale: 1.02, boxShadow: '0 28px 70px rgba(0,217,255,0.12)' }}
            whileTap={{ scale: 0.995 }}
            onPointerMove={(e) => {
              const el = e.currentTarget
              const r = el.getBoundingClientRect()
              const dx = (e.clientX - (r.left + r.width / 2)) / r.width
              const dy = (e.clientY - (r.top + r.height / 2)) / r.height
              const rotY = dx * 8
              const rotX = -dy * 8
              el.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`
              el.style.transition = 'transform 0.12s ease-out'
            }}
            onPointerLeave={(e) => {
              const el = e.currentTarget
              el.style.transition = 'transform 360ms cubic-bezier(.2,.9,.2,1)'
              el.style.transform = ''
            }}
          >
            <h3 style={{ color: 'white', marginBottom: '8px' }}>{p.title}</h3>
            <p style={{ fontSize: '0.95rem', marginBottom: '12px' }}>{p.desc}</p>
            
            {/* Tech Stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              {p.tech.map((t, i) => (
                <span key={i} style={{
                  fontSize: '0.75rem',
                  padding: '4px 12px',
                  background: 'rgba(0, 217, 255, 0.15)',
                  border: '1px solid rgba(0, 217, 255, 0.3)',
                  borderRadius: '20px',
                  color: '#00d9ff'
                }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Metrics */}
            <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '16px' }}>
              {p.metrics}
            </p>
            
            <a className="project-link shimmer-text" href={p.url} target="_blank" rel="noreferrer">
              {p.title.includes('Open Source') ? 'View Contributions' : 'Learn More'}
            </a>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
