import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitRing } from './OrbitRing';
import { ParticleField } from './ParticleField';

function ConnectionLines({ opacity, reducedMotion }: { opacity: number, reducedMotion: boolean }) {
  const ref = useRef<THREE.LineSegments>(null);
  
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
      ref.current.rotation.y -= delta * 0.03;
      ref.current.rotation.z += delta * 0.01;
    }
  });

  return (
    <lineSegments ref={ref} geometry={lineGeometry}>
      <lineBasicMaterial color="#00f0ff" transparent opacity={0.15 * opacity} depthWrite={false} />
    </lineSegments>
  );
}

interface MarketIntelligenceCoreProps {
  intensity?: number;
  scale?: number;
  opacity?: number;
  reducedMotion?: boolean;
}

export function MarketIntelligenceCore({
  intensity = 1,
  scale = 1,
  opacity = 1,
  reducedMotion = false
}: MarketIntelligenceCoreProps) {
  const coreRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!reducedMotion) {
      const time = state.clock.getElapsedTime();
      
      if (coreRef.current) {
        // Gentle pulsing effect for the core
        const pulse = 1 + Math.sin(time * 2) * 0.03 * intensity;
        coreRef.current.scale.set(pulse, pulse, pulse);
      }

      if (groupRef.current) {
        // Slow autonomous rotation
        groupRef.current.rotation.y += delta * 0.05;
        groupRef.current.rotation.x += delta * 0.02;
      }
    }
  });

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
      <ConnectionLines opacity={opacity} reducedMotion={reducedMotion} />

      {/* Particle Field */}
      <ParticleField count={800} radius={3.5} color="#00f0ff" opacity={0.4 * opacity} speed={0.5} reducedMotion={reducedMotion} />
    </group>
  );
}
