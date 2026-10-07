import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MarketIntelligenceCore } from './MarketIntelligenceCore';

function ParallaxRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to -1 to +1
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!reducedMotion) {
      // Target camera position
      const targetX = mouse.current.x * 0.8;
      const targetY = mouse.current.y * 0.8;
      
      // Smooth interpolation
      const currentX = camera.position.x;
      const currentY = camera.position.y;
      camera.position.set(
        currentX + (targetX - currentX) * 0.05,
        currentY + (targetY - currentY) * 0.05,
        camera.position.z
      );
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

interface MarketSceneProps {
  className?: string;
  intensity?: number;
  scale?: number;
  opacity?: number;
}

export function MarketScene({
  className = '',
  intensity = 1,
  scale = 1,
  opacity = 1
}: MarketSceneProps) {
  const [reducedMotion, setReducedMotion] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );

  useEffect(() => {
    // Check for user's motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return (
    <div className={`w-full h-full pointer-events-none absolute inset-0 ${className}`}>
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }} 
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
        
        <MarketIntelligenceCore 
          intensity={intensity} 
          scale={scale} 
          opacity={opacity} 
          reducedMotion={reducedMotion} 
        />
        
        <ParallaxRig reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
