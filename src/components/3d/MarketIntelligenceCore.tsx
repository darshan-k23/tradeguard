import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitRing } from './OrbitRing';
import { ParticleField } from './ParticleField';

function ConnectionLines({ opacity, reducedMotion, stage }: { opacity: number, reducedMotion: boolean, stage?: string }) {
  const ref = useRef<THREE.LineSegments>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);
  
  const [lineGeometry] = useState(() => {
    const points = [];
    for (let i = 0; i < 25; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r1 = 0.8; // inner core
      const r2 = 1.5 + Math.random() * 1.5; // outer rings
      
      points.push(
        new THREE.Vector3(r1 * Math.sin(phi) * Math.cos(theta), r1 * Math.sin(phi) * Math.sin(theta), r1 * Math.cos(phi)),
        new THREE.Vector3(r2 * Math.sin(phi) * Math.cos(theta), r2 * Math.sin(phi) * Math.sin(theta), r2 * Math.cos(phi))
      );
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  });

  useFrame((_, delta) => {
    if (ref.current && !reducedMotion) {
      let speedMultiplier = 1;
      let targetOpacity = 0.15;
      
      if (stage === 'interpret') { targetOpacity = 0.6; speedMultiplier = 1.5; }
      else if (stage === 'validate') { targetOpacity = 0.8; speedMultiplier = 0.5; }
      else if (stage === 'authorize') { targetOpacity = 0.3; speedMultiplier = 0.1; }
      else if (stage === 'execute') { targetOpacity = 0.9; speedMultiplier = 4; }

      ref.current.rotation.y -= delta * 0.03 * speedMultiplier;
      ref.current.rotation.z += delta * 0.01 * speedMultiplier;
      
      if (materialRef.current) {
        materialRef.current.opacity = THREE.MathUtils.lerp(
          materialRef.current.opacity, 
          targetOpacity * opacity, 
          delta * 2
        );
      }
    }
  });

  return (
    <lineSegments ref={ref} geometry={lineGeometry}>
      <lineBasicMaterial ref={materialRef} color="#00f0ff" transparent opacity={0.15 * opacity} depthWrite={false} />
    </lineSegments>
  );
}

interface MarketIntelligenceCoreProps {
  intensity?: number;
  scale?: number;
  opacity?: number;
  reducedMotion?: boolean;
  stage?: string;
  localProgress?: number;
}

export function MarketIntelligenceCore({
  intensity = 1,
  scale = 1,
  opacity = 1,
  reducedMotion = false,
  stage,
  localProgress
}: MarketIntelligenceCoreProps) {
  const coreRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const stateRef = useRef({
    intensity: intensity,
    speed: 1,
    lockScale: scale
  });

  useFrame((state, delta) => {
    if (!reducedMotion) {
      let tInt = intensity;
      let tSpd = 1;
      let tLock = scale;

      if (stage === 'connect') { tInt = 0.5; tSpd = 0.3; }
      else if (stage === 'understand') { tInt = 1.2; tSpd = 1.8; }
      else if (stage === 'interpret') { tInt = 1.5; tSpd = 1.2; }
      else if (stage === 'validate') { tInt = 1.0; tSpd = 0.4; } // structured, constrained
      else if (stage === 'authorize') { 
        tInt = 0.8; tSpd = 0.1; 
        tLock = scale + (localProgress || 0) * 0.3; // focus attention / lock
      } 
      else if (stage === 'execute') { tInt = 2.5; tSpd = 3.0; } // directional execution

      stateRef.current.intensity = THREE.MathUtils.lerp(stateRef.current.intensity, tInt, delta * 2);
      stateRef.current.speed = THREE.MathUtils.lerp(stateRef.current.speed, tSpd, delta * 2);
      stateRef.current.lockScale = THREE.MathUtils.lerp(stateRef.current.lockScale, tLock, delta * 2);

      const time = state.clock.getElapsedTime();
      
      if (coreRef.current) {
        const pulse = 1 + Math.sin(time * 2 * stateRef.current.speed) * 0.03 * stateRef.current.intensity;
        coreRef.current.scale.set(pulse, pulse, pulse);
      }

      if (groupRef.current) {
        groupRef.current.rotation.y += delta * 0.05 * stateRef.current.speed;
        groupRef.current.rotation.x += delta * 0.02 * stateRef.current.speed;
        groupRef.current.scale.setScalar(stateRef.current.lockScale);
        
        if (stage === 'execute') {
           // Subtle directional movement (converging)
           groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 1.5, delta);
        } else {
           groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 0, delta);
        }
      }
    }
  });

  // Calculate safe particle count based on environment
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const particleCount = reducedMotion ? 50 : (isMobile ? 150 : 600);

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* Central Translucent Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.8, 24, 24]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.2 * intensity}
          transparent
          opacity={0.15 * opacity}
          roughness={0.2}
          metalness={0.8}
          depthWrite={false}
          wireframe={true}
        />
      </mesh>

      {/* Inner glowing core */}
      <mesh>
        <sphereGeometry args={[0.4, 12, 12]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.25 * opacity * intensity}
          depthWrite={false}
        />
      </mesh>

      {/* Orbital Rings */}
      <OrbitRing radius={1.5} speed={1.2} rotation={[Math.PI / 4, 0, 0]} color="#00f0ff" opacity={0.3 * opacity} reducedMotion={reducedMotion} />
      <OrbitRing radius={2.2} speed={-0.8} rotation={[0, Math.PI / 3, 0]} color="#a855f7" opacity={0.2 * opacity} reducedMotion={reducedMotion} />
      <OrbitRing radius={2.8} speed={0.5} rotation={[Math.PI / 6, Math.PI / 6, Math.PI / 4]} color="#00ff66" opacity={0.15 * opacity} reducedMotion={reducedMotion} />

      {/* Connection Lines */}
      <ConnectionLines opacity={opacity} reducedMotion={reducedMotion} stage={stage} />

      {/* Particle Field */}
      <ParticleField count={particleCount} radius={3.5} color="#00f0ff" opacity={0.4 * opacity} speed={0.5} reducedMotion={reducedMotion} />
    </group>
  );
}
