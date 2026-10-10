import { useMemo } from 'react';
import { motion, MotionValue, useTransform, useReducedMotion } from 'framer-motion';

function Particle({ 
  mouse, 
  x, 
  y, 
  size, 
  speed, 
  opacity,
  prefersReducedMotion
}: { 
  mouse: { x: MotionValue<number>, y: MotionValue<number> }, 
  x: number, 
  y: number, 
  size: number, 
  speed: number, 
  opacity: number,
  prefersReducedMotion: boolean | null
}) {
  const moveX = useTransform(mouse.x, [-1, 1], [-speed, speed]);
  const moveY = useTransform(mouse.y, [-1, 1], [-speed, speed]);

  return (
    <motion.div
      className="absolute rounded-full bg-cyan-400"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        opacity,
        x: prefersReducedMotion ? 0 : moveX,
        y: prefersReducedMotion ? 0 : moveY
      }}
    />
  );
}

export function DepthParticles({ mouse }: { mouse: { x: MotionValue<number>, y: MotionValue<number> } }) {
  const prefersReducedMotion = useReducedMotion();

  // Create deterministic arrays for purity instead of Math.random inside render loop
  const particles = useMemo(() => {
    // Generate a pseudo-random but deterministic array of particles based on index
    // so it doesn't violate React purity rules on subsequent renders
    const pseudoRandom = (seed: number) => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    // If reduced motion is requested, cut particle count by 80% to reduce DOM nodes
    const particleCount = prefersReducedMotion ? 6 : 30;

    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: pseudoRandom(i * 10) * 100,
      y: pseudoRandom(i * 10 + 1) * 100,
      size: pseudoRandom(i * 10 + 2) * 2 + 1,
      speed: pseudoRandom(i * 10 + 3) * 15 + 5,
      opacity: pseudoRandom(i * 10 + 4) * 0.4 + 0.1
    }));
  }, [prefersReducedMotion]);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 hidden md:block overflow-hidden">
      {particles.map(p => (
        <Particle 
          key={p.id}
          mouse={mouse}
          x={p.x}
          y={p.y}
          size={p.size}
          speed={p.speed}
          opacity={p.opacity}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </div>
  );
}
