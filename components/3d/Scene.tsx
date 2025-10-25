'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';

interface SceneProps {
  children: React.ReactNode;
  camera?: {
    position?: [number, number, number];
    fov?: number;
  };
  controls?: boolean;
  className?: string;
}

export default function Scene({
  children,
  camera = { position: [0, 0, 5], fov: 75 },
  controls = true,
  className = ''
}: SceneProps) {
  return (
    <Canvas className={className}>
      <PerspectiveCamera makeDefault position={camera.position} fov={camera.fov} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00f0ff" />
      <pointLight position={[10, -10, -5]} intensity={0.5} color="#ff006e" />

      <Suspense fallback={null}>
        {children}
      </Suspense>

      {controls && <OrbitControls enableZoom={false} enablePan={false} />}
    </Canvas>
  );
}
