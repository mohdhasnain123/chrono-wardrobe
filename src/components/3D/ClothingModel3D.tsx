import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { RealisticAvatarModel } from './RealisticAvatarModel';

interface ClothingModel3DProps {
  type: 'shirt' | 'pants' | 'shoes' | 'blazer' | 'sneakers' | 'tshirt' | 'jacket' | 'accessory';
  color?: string;
  animated?: boolean;
  className?: string;
}

function RealisticClothingMesh({ type, color = '#8B5CF6' }: { type: string; color: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.05 : 1}
    >
      <RealisticAvatarModel type={type as any} color={color} />
    </group>
  );
}

export const ClothingModel3D: React.FC<ClothingModel3DProps> = ({
  type,
  color = '#8B5CF6',
  animated = true,
  className = '',
}) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.4} color="#8B5CF6" />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />
        
        <RealisticClothingMesh type={type} color={color} />
        
        <Environment preset="studio" />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={animated}
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
};