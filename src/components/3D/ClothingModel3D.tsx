import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, MeshWobbleMaterial, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface ClothingModel3DProps {
  type: 'shirt' | 'pants' | 'shoes' | 'blazer' | 'sneakers' | 'tshirt' | 'jacket' | 'accessory';
  color?: string;
  animated?: boolean;
  className?: string;
}

function AnimatedClothingMesh({ type, color = '#8B5CF6' }: { type: string; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const getGeometry = () => {
    switch (type) {
      case 'shirt':
      case 'tshirt':
      case 'blazer':
      case 'jacket':
        return (
          <group>
            {/* Torso */}
            <Box ref={meshRef} args={[1.2, 1.5, 0.4]} position={[0, 0, 0]}>
              <MeshWobbleMaterial
                color={color}
                factor={0.1}
                speed={2}
                metalness={0.2}
                roughness={0.1}
              />
            </Box>
            {/* Sleeves */}
            <Box args={[0.3, 1, 0.3]} position={[-0.8, 0.2, 0]}>
              <MeshWobbleMaterial color={color} factor={0.05} speed={1.5} />
            </Box>
            <Box args={[0.3, 1, 0.3]} position={[0.8, 0.2, 0]}>
              <MeshWobbleMaterial color={color} factor={0.05} speed={1.5} />
            </Box>
          </group>
        );
      
      case 'pants':
        return (
          <group>
            {/* Waist */}
            <Box ref={meshRef} args={[1, 0.3, 0.4]} position={[0, 0.5, 0]}>
              <MeshWobbleMaterial color={color} factor={0.1} speed={2} />
            </Box>
            {/* Left leg */}
            <Box args={[0.4, 1.2, 0.4]} position={[-0.3, -0.3, 0]}>
              <MeshWobbleMaterial color={color} factor={0.05} speed={1.5} />
            </Box>
            {/* Right leg */}
            <Box args={[0.4, 1.2, 0.4]} position={[0.3, -0.3, 0]}>
              <MeshWobbleMaterial color={color} factor={0.05} speed={1.5} />
            </Box>
          </group>
        );
      
      case 'shoes':
      case 'sneakers':
        return (
          <group>
            {/* Left shoe */}
            <Box ref={meshRef} args={[0.6, 0.3, 1]} position={[-0.4, 0, 0]}>
              <MeshWobbleMaterial color={color} factor={0.1} speed={2} />
            </Box>
            {/* Right shoe */}
            <Box args={[0.6, 0.3, 1]} position={[0.4, 0, 0]}>
              <MeshWobbleMaterial color={color} factor={0.1} speed={2} />
            </Box>
            {/* Laces/Details */}
            <Sphere args={[0.05]} position={[-0.4, 0.2, 0.3]}>
              <meshStandardMaterial color="#ffffff" />
            </Sphere>
            <Sphere args={[0.05]} position={[0.4, 0.2, 0.3]}>
              <meshStandardMaterial color="#ffffff" />
            </Sphere>
          </group>
        );
      
      default:
        return (
          <Box ref={meshRef} args={[1, 1, 1]}>
            <MeshWobbleMaterial color={color} factor={0.2} speed={2} />
          </Box>
        );
    }
  };

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      {getGeometry()}
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
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8B5CF6" />
        
        {animated ? (
          <AnimatedClothingMesh type={type} color={color} />
        ) : (
          <Box args={[1, 1, 1]}>
            <meshStandardMaterial color={color} />
          </Box>
        )}
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={animated}
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
};