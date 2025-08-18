import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { RealisticAvatarModel } from './RealisticAvatarModel';

interface DetailedClothingModel3DProps {
  type: 'shirt' | 'pants' | 'shoes' | 'blazer' | 'sneakers' | 'tshirt' | 'jacket' | 'accessory';
  color?: string;
  itemName: string;
  brand: string;
  className?: string;
}

function DetailedRealisticMesh({ 
  type, 
  color = '#8B5CF6', 
  itemName, 
  brand 
}: { 
  type: string; 
  color: string; 
  itemName: string; 
  brand: string; 
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [rotating, setRotating] = useState(true);

  useFrame((state) => {
    if (groupRef.current && rotating) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
  });

  return (
    <group
      ref={groupRef}
      onClick={() => setRotating(!rotating)}
      onPointerOver={(e) => {
        if (groupRef.current) {
          groupRef.current.scale.setScalar(1.02);
        }
      }}
      onPointerOut={(e) => {
        if (groupRef.current) {
          groupRef.current.scale.setScalar(1);
        }
      }}
    >
      <RealisticAvatarModel type={type as any} color={color} />
      
      {/* Floating text labels with better positioning */}
      <Text
        position={[0, 2.8, 0]}
        fontSize={0.25}
        color="#8B5CF6"
        anchorX="center"
        anchorY="middle"
        maxWidth={6}
        font="/fonts/inter-bold.woff"
      >
        {itemName}
      </Text>
      
      <Text
        position={[0, 2.4, 0]}
        fontSize={0.15}
        color="#6B7280"
        anchorX="center"
        anchorY="middle"
        maxWidth={6}
      >
        {brand}
      </Text>
    </group>
  );
}

export const DetailedClothingModel3D: React.FC<DetailedClothingModel3DProps> = ({
  type,
  color = '#8B5CF6',
  itemName,
  brand,
  className = '',
}) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        shadows
      >
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.2} 
          castShadow 
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-10, -10, -5]} intensity={0.6} color="#8B5CF6" />
        <pointLight position={[0, 8, 0]} intensity={0.8} color="#ffffff" />
        <spotLight 
          position={[0, 5, 5]} 
          intensity={0.5} 
          angle={0.3} 
          penumbra={1} 
          castShadow
        />
        
        <DetailedRealisticMesh 
          type={type} 
          color={color} 
          itemName={itemName}
          brand={brand}
        />
        
        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={0.3} 
          scale={8} 
          blur={2.5} 
          far={4} 
        />
        
        <Environment preset="studio" />
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate={false}
          maxDistance={8}
          minDistance={2}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 8}
        />
      </Canvas>
    </div>
  );
};