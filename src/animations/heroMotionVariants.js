/**
 * Premium Hero Motion Variants
 * Reusable Framer Motion animation definitions for cinematic hero
 */

// Premium easing functions for top-tier feel
export const premiumEasings = {
  premium: [0.16, 1, 0.3, 1], // Spring-like, smooth with slight overshoot
  smooth: [0.4, 0, 0.2, 1], // Material design standard
  gentle: [0.25, 0.46, 0.45, 0.94], // Subtle, natural
  snappy: [0.34, 1.56, 0.64, 1], // Bouncy, premium feel
};

// Main hero content container - enter with premium spring
export const heroContainerVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: premiumEasings.premium,
    },
  },
};

// Individual text elements with staggered entrance
export const heroTextVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + index * 0.15,
      duration: 0.8,
      ease: premiumEasings.premium,
    },
  }),
};

// Heading specific (larger, bolder entrance)
export const headingVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.2,
      duration: 1,
      ease: premiumEasings.premium,
    },
  },
};

// CTA buttons with premium interaction
export const buttonVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.8,
      duration: 0.8,
      ease: premiumEasings.premium,
    },
  },
  hover: {
    scale: 1.04,
    transition: {
      duration: 0.3,
      ease: premiumEasings.snappy,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

// Stats cards entrance with bounce effect
export const statsCardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.92,
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 1.1 + index * 0.15,
      duration: 0.7,
      ease: premiumEasings.snappy,
    },
  }),
  hover: {
    y: -8,
    transition: {
      duration: 0.3,
      ease: premiumEasings.smooth,
    },
  },
};

// Scroll indicator pulse (enhanced version)
export const scrollIndicatorVariants = {
  animate: {
    y: [0, 12, 0],
    opacity: [0.4, 1, 0.4],
    transition: {
      duration: 2.2,
      repeat: Infinity,
      ease: premiumEasings.gentle,
    },
  },
};

// Bloom glow breathing effect (VFX)
export const bloomGlowVariants = {
  animate: {
    opacity: [0.3, 0.6, 0.3],
    scale: [1, 1.1, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: [0.4, 0, 0.6, 1], // Ease in/out
    },
  },
};

// Canvas scale push-in effect (cinematic camera)
export const canvasScaleVariants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: 1.02,
    transition: {
      duration: 6.8, // Match hero sequence duration
      ease: premiumEasings.gentle,
    },
  },
};

// Light streak flash effect (VFX transition)
export const lightStreakVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: [0, 1, 0],
    transition: {
      duration: 0.8,
      ease: premiumEasings.smooth,
    },
  },
};

// Typing text cursor animation
export const cursorVariants = {
  animate: {
    opacity: [1, 0, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
    },
  },
  fadeOut: {
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
};

// Magnetic card hover (cursor proximity)
export const magneticCardVariants = {
  initial: {
    x: 0,
    y: 0,
  },
  magnetic: (offset) => ({
    x: offset.x,
    y: offset.y,
    transition: {
      x: { type: 'spring', mass: 1, damping: 20, stiffness: 100 },
      y: { type: 'spring', mass: 1, damping: 20, stiffness: 100 },
    },
  }),
  reset: {
    x: 0,
    y: 0,
    transition: {
      type: 'spring',
      mass: 1,
      damping: 20,
      stiffness: 100,
    },
  },
};
