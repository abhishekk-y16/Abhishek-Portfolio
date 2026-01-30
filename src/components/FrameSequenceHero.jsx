import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const FrameSequenceHero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const animationFrameIdRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  const directionRef = useRef(1);
  const animationStartedRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [headingText, setHeadingText] = useState('');
  const [subheadingText, setSubheadingText] = useState('');

  const TOTAL_FRAMES = 41;
  const FPS = 6; // 6 FPS = ~6.8 seconds per loop (cinematic slow)
  const FRAME_INTERVAL = 1000 / FPS; // ~166ms per frame
  const fullHeadingText = "Hi, I'm Abhishek Kumar Yadav";
  const fullSubheadingText = "Backend Developer & AI | ML Engineer";

  // Preload all frames with optimized loading strategy
  useEffect(() => {
    const preloadFrames = async () => {
      try {
        const frames = [];
        
        // Create image elements sequentially but load in batches for better performance
        const batchSize = 10;
        for (let batchStart = 0; batchStart < TOTAL_FRAMES; batchStart += batchSize) {
          const batchEnd = Math.min(batchStart + batchSize, TOTAL_FRAMES);
          const batchPromises = [];

          for (let i = batchStart + 1; i <= batchEnd; i++) {
            const frameNum = String(i).padStart(3, '0');
            const frameUrl = `/hero-sequence/ezgif-frame-${frameNum}.jpg`;

            const promise = new Promise((resolve) => {
              const img = new Image();
              img.loading = 'eager';
              img.onload = () => {
                frames[i - 1] = img;
                resolve();
              };
              img.onerror = () => {
                console.warn(`Failed to load frame ${frameNum}`);
                resolve(); // Continue even if one fails
              };
              img.src = frameUrl;
            });

            batchPromises.push(promise);
          }

          // Wait for batch to complete before loading next batch
          await Promise.all(batchPromises);
        }

        framesRef.current = frames;
        console.log(`✅ All ${frames.length} frames loaded!`);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error preloading frames:', error);
      }
    };

    preloadFrames();

    return () => {
      // Cleanup on unmount
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  // Typing animation effect
  useEffect(() => {
    // Heading typing starts at 0.5s
    const headingTimer = setTimeout(() => {
      let index = 0;
      const headingInterval = setInterval(() => {
        if (index <= fullHeadingText.length) {
          setHeadingText(fullHeadingText.substring(0, index));
          index++;
        } else {
          clearInterval(headingInterval);
        }
      }, 80); // 80ms per character
    }, 500);

    // Subheading typing starts at 3.2s
    const subheadingTimer = setTimeout(() => {
      let index = 0;
      const subheadingInterval = setInterval(() => {
        if (index <= fullSubheadingText.length) {
          setSubheadingText(fullSubheadingText.substring(0, index));
          index++;
        } else {
          clearInterval(subheadingInterval);
        }
      }, 40); // 40ms per character
    }, 3200);

    return () => {
      clearTimeout(headingTimer);
      clearTimeout(subheadingTimer);
    };
  }, []);

  // Optimized animation loop - runs once and never stops
  useEffect(() => {

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false }); // Disable alpha for better performance
    if (!ctx) return;

    // Set canvas size once and cache dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Separate function to handle frame advancement with ping-pong reversal
    const advanceFrameAndReverse = () => {
      // Advance frame in current direction
      currentFrameRef.current += directionRef.current;

      // Check boundaries and reverse direction
      // With 41 frames (indices 0-40), valid range is 0 to 40
      if (currentFrameRef.current > TOTAL_FRAMES - 1) {
        // Exceeded maximum frame (41 > 40)
        currentFrameRef.current = TOTAL_FRAMES - 1;
        directionRef.current = -1;
        console.log('⏹️ Frame exceeded 40 - Reversing to backward (-1)');
      } else if (currentFrameRef.current < 0) {
        // Went below minimum frame (-1 < 0)
        currentFrameRef.current = 0;
        directionRef.current = 1;
        console.log('⏮️ Frame below 0 - Reversing to forward (+1)');
      }
    };

    const animate = (currentTime) => {      // Wait until loader is complete
      const heroSection = document.querySelector('.hero')
      if (heroSection && heroSection.getAttribute('data-loading') === 'true') {
        animationFrameIdRef.current = requestAnimationFrame(animate)
        return
      }
      // Wait until frames are loaded before starting animation
      if (!animationStartedRef.current) {
        if (framesRef.current.length === 0) {
          // Frames not loaded yet, keep waiting
          animationFrameIdRef.current = requestAnimationFrame(animate);
          return;
        }
        // Frames loaded, mark animation as started
        animationStartedRef.current = true;
        console.log('🎬 Animation started!');
      }

      if (currentTime - lastFrameTimeRef.current >= FRAME_INTERVAL) {
        // Call the separate function to advance frame and handle reversal
        advanceFrameAndReverse();

        console.log(`📍 Current Frame: ${currentFrameRef.current}, Direction: ${directionRef.current > 0 ? 'FORWARD →' : 'BACKWARD ←'}`);

        // Now draw the current frame
        const currentFrame = framesRef.current[currentFrameRef.current];

        // Draw frame to canvas with optimized rendering
        if (currentFrame) {
          const img = currentFrame;
          const imgAspect = img.naturalWidth / img.naturalHeight;
          const canvasAspect = canvasWidth / canvasHeight;

          let drawWidth, drawHeight, drawX, drawY;

          // Scale to full width
          const scale = 1.0;

          if (imgAspect > canvasAspect) {
            drawHeight = canvasHeight * scale;
            drawWidth = drawHeight * imgAspect;
          } else {
            drawWidth = canvasWidth * scale;
            drawHeight = drawWidth / imgAspect;
          }

          drawX = (canvasWidth - drawWidth) / 2;
          drawY = (canvasHeight - drawHeight) / 2;

          // Use high quality rendering for crisp images
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high'; // High quality for sharp rendering
          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        } else {
          console.warn(`Frame ${currentFrameRef.current} not loaded yet`);
        }

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
  }, []);

  // Handle window resize with debounce
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
      }, 300); // Debounce resize for 300ms
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Scroll to section handlers
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.25,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 1.2, duration: 0.5, ease: 'easeOut' },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section className="hero frame-sequence-hero">
      {/* Canvas for frame animation */}
      <canvas
        ref={canvasRef}
        className="hero-canvas"
        width={typeof window !== 'undefined' ? window.innerWidth : 1920}
        height={typeof window !== 'undefined' ? window.innerHeight : 1080}
      />

      {/* Dark overlay gradient for text readability */}
      <div className="hero-overlay"></div>

      {/* Hero content */}
      <div className="hero-content">
        {/* Main heading with typing animation */}
        <motion.h1 className="hero-heading">
          {headingText}
        </motion.h1>

        {/* Subheading with typing animation */}
        <motion.p className="hero-subheading">
          {subheadingText}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.8, duration: 0.8 }}
        >
          <motion.button
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{ marginTop: '50px' }}
        >
          <div className="scroll-dot"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default FrameSequenceHero;
