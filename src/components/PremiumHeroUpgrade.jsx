import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from '../animations/ParticleSystem';
import useMagneticInteraction from '../animations/useMagneticInteraction';
import {
  heroContainerVariants,
  headingVariants,
  heroTextVariants,
  buttonVariants,
  statsCardVariants,
  scrollIndicatorVariants,
  bloomGlowVariants,
  canvasScaleVariants,
  cursorVariants,
} from '../animations/heroMotionVariants';

const PremiumHeroUpgrade = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const animationFrameIdRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);

  const TOTAL_FRAMES = 41;
  const FPS = 6;
  const FRAME_INTERVAL = 1000 / FPS;

  // Preload frames with optimized strategy
  useEffect(() => {
    const preloadFrames = async () => {
      try {
        const frames = [];
        const batchSize = 10;

        for (let batchStart = 0; batchStart < TOTAL_FRAMES; batchStart += batchSize) {
          const batchEnd = Math.min(batchStart + batchSize, TOTAL_FRAMES);
          const batchPromises = [];

          for (let i = batchStart + 1; i <= batchEnd; i++) {
            const frameNum = String(i).padStart(3, '0');
            const frameUrl = `/Abhishek-Portfolio/hero-sequence/ezgif-frame-${frameNum}.jpg`;

            const promise = new Promise((resolve) => {
              const img = new Image();
              img.loading = 'eager';
              img.onload = () => {
                frames[i - 1] = img;
                resolve();
              };
              img.onerror = () => {
                console.warn(`Failed to load frame ${frameNum}`);
                resolve();
              };
              img.src = frameUrl;
            });

            batchPromises.push(promise);
          }

          await Promise.all(batchPromises);
        }

        framesRef.current = frames;
        setIsLoaded(true);
        setIsPlaying(true);
        // Reset frame to 0 on load (fresh start)
        currentFrameRef.current = 0;
      } catch (error) {
        console.error('Error preloading frames:', error);
      }
    };

    preloadFrames();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  // Canvas animation loop with cinematic camera effects
  useEffect(() => {
    if (!isLoaded || !isPlaying || framesRef.current.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const animate = (currentTime) => {
      // Stop animation if we've reached the last frame
      if (currentFrameRef.current >= TOTAL_FRAMES - 1) {
        setIsPlaying(false);
        // Draw the last frame and stop
        const lastFrame = framesRef.current[TOTAL_FRAMES - 1];
        if (lastFrame && lastFrame.complete) {
          const img = lastFrame;
          const imgAspect = img.naturalWidth / img.naturalHeight;
          const canvasAspect = canvasWidth / canvasHeight;

          let drawWidth, drawHeight, drawX, drawY;

          if (imgAspect > canvasAspect) {
            drawHeight = canvasHeight;
            drawWidth = drawHeight * imgAspect;
          } else {
            drawWidth = canvasWidth;
            drawHeight = drawWidth / imgAspect;
          }

          drawX = (canvasWidth - drawWidth) / 2;
          drawY = (canvasHeight - drawHeight) / 2;

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'low';
          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        }
        return; // Stop the animation loop
      }

      if (currentTime - lastFrameTimeRef.current >= FRAME_INTERVAL) {
        const currentFrame = framesRef.current[currentFrameRef.current];

        if (currentFrame && currentFrame.complete) {
          const img = currentFrame;
          const imgAspect = img.naturalWidth / img.naturalHeight;
          const canvasAspect = canvasWidth / canvasHeight;

          let drawWidth, drawHeight, drawX, drawY;

          if (imgAspect > canvasAspect) {
            drawHeight = canvasHeight;
            drawWidth = drawHeight * imgAspect;
          } else {
            drawWidth = canvasWidth;
            drawHeight = drawWidth / imgAspect;
          }

          drawX = (canvasWidth - drawWidth) / 2;
          drawY = (canvasHeight - drawHeight) / 2;

          // Handheld micro-movement (very subtle)
          const microMoveX =
            Math.sin(currentFrameRef.current * 0.08) * 1.5;
          const microMoveY =
            Math.cos(currentFrameRef.current * 0.06) * 1.2;

          ctx.save();
          ctx.translate(microMoveX, microMoveY);

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'low';
          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

          ctx.restore();
        }

        // Advance frame (don't loop - will stop when reaching TOTAL_FRAMES)
        currentFrameRef.current = currentFrameRef.current + 1;
        lastFrameTimeRef.current = currentTime;
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isLoaded, isPlaying]);

  // Handle window resize
  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
      }, 300);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero frame-sequence-hero" ref={containerRef}>
      {/* Particle system (subtle dimension) */}
      <ParticleSystem isVisible={isLoaded} />

      {/* Canvas with push-in scale effect (cinematic camera) */}
      <motion.canvas
        ref={canvasRef}
        className="hero-canvas"
        variants={canvasScaleVariants}
        initial="initial"
        animate="animate"
        width={typeof window !== 'undefined' ? window.innerWidth : 1920}
        height={typeof window !== 'undefined' ? window.innerHeight : 1080}
      />

      {/* Dark overlay for readability */}
      <div className="hero-overlay"></div>

      {/* Bloom glow effect (breathing VFX) */}
      <motion.div
        className="hero-bloom-glow"
        variants={bloomGlowVariants}
        animate="animate"
      />

      {/* Main hero content container */}
      <motion.div
        className="hero-content"
        variants={heroContainerVariants}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
      >
        {isLoaded && (
          <>
            {/* Premium heading with typing effect */}
            <motion.div
              variants={headingVariants}
              initial="hidden"
              animate="visible"
              className="hero-heading-wrapper"
            >
              <h1 className="hero-heading">
                Hi, I'm{' '}
                <span className="hero-name">
                  <TypingText
                    text="Abhishek Kumar Yadav"
                    onComplete={() => setTypingComplete(true)}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Subheading with role description */}
            <motion.p
              className="hero-subheading"
              custom={1}
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
            >
              AI/ML Engineer • Full Stack Developer • Builder
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="hero-buttons"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                className="btn btn-secondary"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => scrollToSection('contact')}
              >
                Contact Me
              </motion.button>
            </motion.div>

            {/* Enhanced scroll indicator */}
            <motion.div
              className="scroll-indicator"
              variants={scrollIndicatorVariants}
              animate="animate"
              style={{ marginTop: '50px' }}
            >
              <div className="scroll-dot"></div>
            </motion.div>
          </>
        )}

        {/* Loading state */}
        {!isLoaded && (
          <motion.div
            className="hero-loading"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <p>Loading cinematic experience...</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

/**
 * Typing text component with character-by-character animation
 */
const TypingText = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 80); // 80ms per character for natural typing speed

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [displayedText, text, isComplete, onComplete]);

  return (
    <span>
      {displayedText}
      {!isComplete && (
        <motion.span
          className="typing-cursor"
          variants={cursorVariants}
          animate="animate"
        >
          |
        </motion.span>
      )}
    </span>
  );
};

export default PremiumHeroUpgrade;
