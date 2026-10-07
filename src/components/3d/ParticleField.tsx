import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  radius?: number;
  color?: string;
  opacity?: number;
  speed?: number;
  reducedMotion?: boolean;
}

export function ParticleField({
  count = 1000,
  radius = 3,
  color = '#00f0ff',
  opacity = 0.3,
  speed = 1,
  reducedMotion = false
}: ParticleFieldProps) {
  const ref = useRef<THREE.Points>(null);

  const [sphere] = useState(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  });

  useFrame((_, delta) => {
    if (ref.current && !reducedMotion) {
      ref.current.rotation.x -= delta * 0.02 * speed;
      ref.current.rotation.y -= delta * 0.03 * speed;
    }
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={opacity}
      />
    </Points>
  );
}
