'use client';

import Scene from './Scene';
import FloatingCube from './FloatingCube';
import FloatingTorus from './FloatingTorus';
import ParticleField from './ParticleField';

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Scene camera={{ position: [0, 0, 8], fov: 75 }} controls={false}>
        <ParticleField count={1500} color="#00f0ff" />

        {/* Floating cube - moved to left side */}
        <FloatingCube position={[-4, 0, -1]} size={1.2} color="#00f0ff" wireframe={false} speed={0.5} />

        {/* Torus (donut) - moved to right side */}
        <FloatingTorus position={[4, 0, -1]} color="#ff006e" speed={0.3} />

        {/* Additional cubes - repositioned around the edges */}
        <FloatingCube position={[-5, 2, -2]} size={0.8} color="#8b5cf6" wireframe={true} speed={0.7} />
        <FloatingCube position={[5, -2, -2]} size={0.6} color="#00ff87" wireframe={true} speed={0.6} />

        {/* Small accent cubes - positioned at corners */}
        <FloatingCube position={[-4, -3, -3]} size={0.4} color="#ff006e" wireframe={false} speed={1} />
        <FloatingCube position={[4, 3, -3]} size={0.4} color="#00f0ff" wireframe={false} speed={0.8} />
      </Scene>
    </div>
  );
}
