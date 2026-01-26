import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FrameSequenceHeroScroll = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const framesRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  const TOTAL_FRAMES = 41;
  const SCROLL_MULTIPLIER = 40; // Maps 0-1 progress to 0-40 frames

  // Get scroll progress
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end start'],
  });

  // Map scroll progress to frame index
  const frameProgress = useTransform(
    scrollYProgress,
    (value) => Math.min(Math.floor(value * TOTAL_FRAMES), TOTAL_FRAMES - 1)
  );

  // Subscribe to frame changes
  useEffect(() => {
    const unsubscribe = frameProgress.onChange((frame) => {
      setCurrentFrame(frame);
    });
    return unsubscribe;
  }, [frameProgress]);

  // Preload all frames
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
        console.log(`✅ All ${frames.length} frames preloaded for scroll animation!`);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error preloading frames:', error);
      }
    };

    preloadFrames();
  }, []);

  // Draw frame to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isLoaded) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawFrame = () => {
      const img = framesRef.current[currentFrame];

      if (!img) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = canvasWidth / canvasHeight;

      let drawWidth, drawHeight, drawX, drawY;
      const scale = 0.9;

      if (imgAspect > canvasAspect) {
        drawHeight = canvasHeight * scale;
        drawWidth = drawHeight * imgAspect;
      } else {
        drawWidth = canvasWidth * scale;
        drawHeight = drawWidth / imgAspect;
      }

      drawX = (canvasWidth - drawWidth) / 2;
      drawY = (canvasHeight - drawHeight) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };

    drawFrame();
  }, [currentFrame, isLoaded]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Text overlay animations based on scroll progress
  const textOpacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const textOpacity2 = useTransform(scrollYProgress, [0.2, 0.35, 0.45], [0, 1, 0]);
  const textOpacity3 = useTransform(scrollYProgress, [0.4, 0.55, 0.65], [0, 1, 0]);
  const textOpacity4 = useTransform(scrollYProgress, [0.6, 0.75, 0.85], [0, 1, 0]);

  const textY1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 0, 20]);
  const textY2 = useTransform(scrollYProgress, [0.2, 0.35, 0.45], [20, 0, -20]);
  const textY3 = useTransform(scrollYProgress, [0.4, 0.55, 0.65], [20, 0, -20]);
  const textY4 = useTransform(scrollYProgress, [0.6, 0.75, 0.85], [20, 0, -20]);

  return (
    <div ref={scrollContainerRef} className="relative">
      {/* Scroll Container - Creates scroll space */}
      <div style={{ height: '400vh' }} className="relative">
        {/* Sticky Canvas Container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ display: isLoaded ? 'block' : 'none' }}
          />

          {/* Loading State */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-white text-2xl"
              >
                Loading hero sequence...
              </motion.div>
            </div>
          )}

          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30" />

          {/* Text Overlay - Section 1 */}
          <motion.div
            style={{ opacity: textOpacity1, y: textY1 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
              Hi, I'm <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Abhishek</span>
            </h1>
            <p className="text-xl md:text-3xl text-gray-300 drop-shadow-xl">Full Stack Developer</p>
          </motion.div>

          {/* Text Overlay - Section 2 */}
          <motion.div
            style={{ opacity: textOpacity2, y: textY2 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
              AI/ML + Cloud
            </h2>
            <p className="text-lg md:text-2xl text-gray-300 max-w-2xl drop-shadow-xl">
              Building intelligent solutions with cutting-edge technology
            </p>
          </motion.div>

          {/* Text Overlay - Section 3 */}
          <motion.div
            style={{ opacity: textOpacity3, y: textY3 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
              Leadership & Growth
            </h2>
            <p className="text-lg md:text-2xl text-gray-300 max-w-2xl drop-shadow-xl">
              Scaling teams and multiplying impact through mentorship
            </p>
          </motion.div>

          {/* Text Overlay - Section 4 */}
          <motion.div
            style={{ opacity: textOpacity4, y: textY4 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
              Let's Build Together
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300"
            >
              Explore My Work
            </motion.button>
          </motion.div>

          {/* Frame Counter (Debug) */}
          <div className="absolute bottom-8 left-8 text-white text-sm font-mono bg-black/50 px-4 py-2 rounded">
            Frame: {currentFrame} / {TOTAL_FRAMES - 1}
          </div>
        </div>
      </div>

      {/* Content Below Hero */}
      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-6xl mx-auto px-6 py-24"
        >
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Scroll Experience
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            This is scroll-based frame animation combined with text overlays. Scroll down to see the frame progression sync with your scroll position!
          </p>
          <p className="text-gray-400">
            The hero section uses Framer Motion's useScroll hook to map your scroll progress directly to frame playback, creating a seamless interactive experience.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FrameSequenceHeroScroll;
