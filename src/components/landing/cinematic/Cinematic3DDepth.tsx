import { useScroll } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { ParticleField } from '../../3d/ParticleField';
import { OrbitRing } from '../../3d/OrbitRing';

function CameraParallax({ intensity = 1 }: { intensity?: number }) {
  useFrame((state, delta) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 1024) return;
    const targetX = state.pointer.x * intensity;
    const targetY = state.pointer.y * intensity;
    state.camera.position.x += (targetX - state.camera.position.x) * delta * 2;
    state.camera.position.y += (targetY - state.camera.position.y) * delta * 2;
  });
  return null;
}

function CameraFlythrough({ scrollYProgress, startZ, endZ }: { scrollYProgress: any, startZ: number, endZ: number }) {
  useFrame((state) => {
    const p = scrollYProgress.get();
    // Calculate target Z based on scroll progress
    const targetZ = startZ + (endZ - startZ) * p;
    // Smoothly interpolate the camera's Z position
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.1;
  });
  return null;
}

// Background Layer (True 3D Flythrough)
export function CinematicBackground3D({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef as any,
    offset: ["start start", "end end"]
  });
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }} gl={{ alpha: true, antialias: !isMobile }}>
        <CameraParallax intensity={isMobile ? 0 : 1.5} />
        <CameraFlythrough scrollYProgress={scrollYProgress} startZ={15} endZ={-5} />
        
        <fog attach="fog" args={['#000', 2, 25]} />
        <ParticleField count={isMobile ? 100 : 500} radius={15} color="#00f0ff" opacity={isMobile ? 0.05 : 0.15} speed={isMobile ? 0.2 : 0.5} />
        <OrbitRing radius={6} speed={0.2} opacity={isMobile ? 0.05 : 0.1} color="#00f0ff" />
        {!isMobile && <OrbitRing radius={8} speed={-0.15} rotation={[Math.PI / 3, Math.PI / 4, 0]} opacity={0.08} color="#ffb000" />}
        
        {/* Deep Perspective Grid that we fly over */}
        <gridHelper args={[60, 60, '#00f0ff', '#00f0ff']} position={[0, -6, 0]} rotation={[0, 0, 0]} material-opacity={isMobile ? 0.02 : 0.08} material-transparent />
      </Canvas>
    </div>
  );
}

// Foreground Layer (Fast 3D Flythrough)
export function CinematicForeground3D({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef as any,
    offset: ["start start", "end end"]
  });
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) return null; // Save huge performance on mobile

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} gl={{ alpha: true, antialias: false }}>
        <CameraParallax intensity={3.5} />
        <CameraFlythrough scrollYProgress={scrollYProgress} startZ={10} endZ={-15} />
        
        <fog attach="fog" args={['#000', 1, 15]} />
        {/* Very sparse, large particles that cross the camera incredibly fast */}
        <ParticleField count={80} radius={10} color="#00f0ff" opacity={0.5} speed={2} />
      </Canvas>
    </div>
  );
}
