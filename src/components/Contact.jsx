import React from 'react'
import { motion } from 'framer-motion'

const contacts = [
  { 
    icon: 'uil-envelope', 
    label: 'Email Me', 
    value: 'abhy4647@gmail.com',
    href: 'mailto:abhy4647@gmail.com',
    gradient: 'linear-gradient(135deg, #ea4335, #c5221f)',
    color: '#ea4335'
  },
  { 
    icon: 'uil-linkedin-alt', 
    label: 'LinkedIn', 
    value: 'Abhishek Kumar Yadav',
    href: 'https://www.linkedin.com/in/abhishek-kumar-yadav-064616328/',
    gradient: 'linear-gradient(135deg, #0077b5, #005582)',
    color: '#0077b5'
  },
  { 
    icon: 'uil-github', 
    label: 'GitHub', 
    value: 'abhishekk-y16',
    href: 'https://github.com/abhishekk-y16',
    gradient: 'linear-gradient(135deg, #6e5494, #4a3768)',
    color: '#6e5494'
  },
  { 
    icon: 'uil-instagram', 
    label: 'Instagram', 
    value: '@abhishekk__007',
    href: 'https://instagram.com/abhishekk__007',
    gradient: 'linear-gradient(135deg, #e1306c, #c13584, #833ab4)',
    color: '#e1306c'
  },
  // LeetCode entry removed per request
]

export default function Contact() {
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
      id="contact"
      className="contact reveal"
      role="region"
      aria-labelledby="contact-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="contact-heading">Connect With Me</h2>
          <p className="contact-subtitle">
            Let's collaborate, innovate, and build something amazing together
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <motion.div className="contact-grid" variants={container}>
          {contacts.map((contact, index) => (
            <motion.a
              key={index}
              href={contact.href}
              target="_blank"
              rel="noreferrer"
              className="contact-card"
              variants={card}
              whileHover={{
                y: -12,
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated Gradient Background */}
              <motion.div
                className="contact-card-bg"
                style={{ background: contact.gradient }}
                animate={{
                  opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              {/* Icon Circle */}
              <motion.div
                className="contact-icon-wrapper"
                whileHover={{
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <div
                  className="contact-icon-bg"
                  style={{ background: contact.gradient }}
                />
                <i className={`uil ${contact.icon}`} style={{ color: contact.color }}></i>
              </motion.div>

              {/* Content */}
              <div className="contact-content">
                <h3>{contact.label}</h3>
                <p>{contact.value}</p>
              </div>

              {/* Hover Arrow */}
              <motion.div
                className="contact-arrow"
                initial={{ x: 0, opacity: 0 }}
                whileHover={{ x: 5, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <i className="uil uil-arrow-right"></i>
              </motion.div>

              {/* Shine Effect */}
              <motion.div
                className="contact-shine"
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            </motion.a>
          ))}
        </motion.div>

      </div>
    </motion.section>
  )
}
