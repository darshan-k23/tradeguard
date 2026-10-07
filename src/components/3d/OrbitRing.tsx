import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface OrbitRingProps {
  radius?: number;
  speed?: number;
  rotation?: [number, number, number];
  color?: string;
  opacity?: number;
  reducedMotion?: boolean;
}

export function OrbitRing({
  radius = 2,
  speed = 1,
  rotation = [0, 0, 0],
  color = '#00f0ff',
  opacity = 0.5,
  reducedMotion = false
}: OrbitRingProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && !reducedMotion) {
      groupRef.current.rotation.z += delta * 0.1 * speed;
    }
  });

  return (
    <group ref={groupRef} rotation={rotation}>
      <mesh>
        <torusGeometry args={[radius, 0.005, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
      </mesh>
      {/* Node orbiting on the ring */}
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={opacity + 0.3} depthWrite={false} />
      </mesh>
      {/* Opposite node */}
      <mesh position={[-radius, 0, 0]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={opacity + 0.1} depthWrite={false} />
      </mesh>
    </group>
  );
}
