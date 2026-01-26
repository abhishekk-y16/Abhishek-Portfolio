/**
 * Magnetic Cursor Interaction Hook
 * Cards subtly pull toward cursor when nearby
 */

import { useEffect, useState, useRef } from 'react';

export const useMagneticInteraction = (ref, maxDistance = 150) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isNear, setIsNear] = useState(false);
  const containerRef = useRef(ref);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const distance = Math.sqrt(
        Math.pow(mouseX - cardCenterX, 2) + Math.pow(mouseY - cardCenterY, 2)
      );

      if (distance < maxDistance) {
        setIsNear(true);

        // Calculate magnetic pull direction and magnitude
        const angle = Math.atan2(mouseY - cardCenterY, mouseX - cardCenterX);
        const pullStrength = (maxDistance - distance) / maxDistance;
        const maxPull = 12; // Max pixel displacement

        const pullX = Math.cos(angle) * pullStrength * maxPull;
        const pullY = Math.sin(angle) * pullStrength * maxPull;

        setOffset({
          x: pullX,
          y: pullY,
        });
      } else {
        setIsNear(false);
        // Smoothly reset to origin with spring physics
        setOffset((prev) => ({
          x: prev.x * 0.85, // Decay
          y: prev.y * 0.85,
        }));
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [maxDistance]);

  return { offset, isNear };
};

export default useMagneticInteraction;
