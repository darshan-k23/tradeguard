import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function useMouseParallax() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    // Only apply parallax on desktop and if reduced motion is not requested
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 1024) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      x.set(normX);
      y.set(normY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  return { x: springX, y: springY };
}
