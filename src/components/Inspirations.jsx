import React from 'react'
import { motion } from 'framer-motion'

const items = [
  {
    title: 'Ratan Tata',
    image: './Ratan Tata.jpg',
    text: `A visionary leader who built one of India's most trusted brands through ethical leadership and social responsibility. His legacy proves that business success and compassion go hand-in-hand. From acquiring Jaguar Land Rover to dedicating 66% of Tata Group's profits to society, he redefined what it means to lead with integrity and purpose.`
  },
  {
    title: 'Sundar Pichai',
    image: './Sundar Pichai.jpg',
    text: `From Chennai to CEO of Google—Sundar's journey embodies humility, brilliance, and innovation. Leading transformative projects like Chrome, Android, and AI-driven products, he's shaped how billions access information. His emphasis on collaboration, empathy, and empowering teams makes him a beacon for aspiring technologists worldwide.`
  },
  {
    title: 'Satya Nadella',
    image: './Satya Nadella.jpeg',
    text: `Transformed Microsoft into a $2 trillion cloud-first, AI-powered giant through empathy and growth mindset. His philosophy of "empowering every person" drives innovation in Azure, LinkedIn, GitHub, and OpenAI partnerships. A champion of accessibility and responsible AI, he proves that inclusive leadership creates extraordinary results.`
  }
]

export default function Inspirations() {
  const container = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } } }
  const card = { hidden: { opacity: 0, y: 24, rotate: 4 }, visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.56, ease: [0.2,0.9,0.2,1] } } }

  return (
    <motion.section
      className="inspirations reveal"
      id="inspirations"
      role="region"
      aria-labelledby="inspirations-heading"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 id="inspirations-heading" style={{ color: 'black' }}>Inspirations</h2>
      <motion.div className="inspirations-list" variants={container}>
        {items.map((it) => (
          <motion.div key={it.title} className="inspiration" variants={card} whileHover={{ y: -10, rotate: -0.6 }}>
            {it.image && <img src={it.image} alt={it.title} className="inspiration-image" />}
            <h3>{it.title}</h3>
            <p>{it.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
