import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, MeshWobbleMaterial, Box, Sphere, Cylinder, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface DetailedClothingModel3DProps {
  type: 'shirt' | 'pants' | 'shoes' | 'blazer' | 'sneakers' | 'tshirt' | 'jacket' | 'accessory';
  color?: string;
  itemName: string;
  brand: string;
  className?: string;
}

function DetailedClothingMesh({ 
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
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const getDetailedGeometry = () => {
    switch (type) {
      case 'shirt':
      case 'tshirt':
        return (
          <group ref={groupRef}>
            {/* Main torso */}
            <Box args={[1.4, 1.8, 0.5]} position={[0, 0, 0]}>
              <MeshWobbleMaterial
                color={color}
                factor={0.05}
                speed={1}
                metalness={0.3}
                roughness={0.2}
              />
            </Box>
            {/* Sleeves */}
            <Cylinder args={[0.2, 0.15, 1.2]} position={[-0.9, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
              <MeshWobbleMaterial color={color} factor={0.03} speed={1.2} />
            </Cylinder>
            <Cylinder args={[0.2, 0.15, 1.2]} position={[0.9, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
              <MeshWobbleMaterial color={color} factor={0.03} speed={1.2} />
            </Cylinder>
            {/* Collar */}
            <Box args={[0.8, 0.1, 0.6]} position={[0, 0.85, 0.1]}>
              <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.8} />
            </Box>
            {/* Buttons */}
            {[0.4, 0.1, -0.2, -0.5].map((y, i) => (
              <Sphere key={i} args={[0.03]} position={[0, y, 0.26]}>
                <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
              </Sphere>
            ))}
          </group>
        );
      
      case 'blazer':
      case 'jacket':
        return (
          <group ref={groupRef}>
            {/* Main body */}
            <Box args={[1.5, 2, 0.6]} position={[0, 0, 0]}>
              <MeshWobbleMaterial
                color={color}
                factor={0.02}
                speed={0.8}
                metalness={0.4}
                roughness={0.1}
              />
            </Box>
            {/* Lapels */}
            <Box args={[0.3, 0.8, 0.05]} position={[-0.4, 0.4, 0.31]} rotation={[0, 0, -0.3]}>
              <meshStandardMaterial color={color} metalness={0.2} roughness={0.3} />
            </Box>
            <Box args={[0.3, 0.8, 0.05]} position={[0.4, 0.4, 0.31]} rotation={[0, 0, 0.3]}>
              <meshStandardMaterial color={color} metalness={0.2} roughness={0.3} />
            </Box>
            {/* Sleeves */}
            <Cylinder args={[0.25, 0.2, 1.4]} position={[-1, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
              <MeshWobbleMaterial color={color} factor={0.02} speed={1} />
            </Cylinder>
            <Cylinder args={[0.25, 0.2, 1.4]} position={[1, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
              <MeshWobbleMaterial color={color} factor={0.02} speed={1} />
            </Cylinder>
            {/* Pockets */}
            <Box args={[0.4, 0.3, 0.05]} position={[-0.5, -0.3, 0.31]}>
              <meshStandardMaterial color={color} metalness={0.1} roughness={0.4} />
            </Box>
            <Box args={[0.4, 0.3, 0.05]} position={[0.5, -0.3, 0.31]}>
              <meshStandardMaterial color={color} metalness={0.1} roughness={0.4} />
            </Box>
          </group>
        );
      
      case 'pants':
        return (
          <group ref={groupRef}>
            {/* Waistband */}
            <Cylinder args={[0.8, 0.8, 0.15]} position={[0, 0.6, 0]}>
              <MeshWobbleMaterial color={color} factor={0.03} speed={1} metalness={0.2} roughness={0.3} />
            </Cylinder>
            {/* Left leg */}
            <Cylinder args={[0.35, 0.25, 1.8]} position={[-0.25, -0.3, 0]}>
              <MeshWobbleMaterial color={color} factor={0.02} speed={1.2} />
            </Cylinder>
            {/* Right leg */}
            <Cylinder args={[0.35, 0.25, 1.8]} position={[0.25, -0.3, 0]}>
              <MeshWobbleMaterial color={color} factor={0.02} speed={1.2} />
            </Cylinder>
            {/* Belt loops */}
            {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
              <Box key={i} args={[0.05, 0.1, 0.05]} position={[x, 0.7, 0]}>
                <meshStandardMaterial color="#8B5CF6" metalness={0.3} roughness={0.7} />
              </Box>
            ))}
          </group>
        );
      
      case 'shoes':
      case 'sneakers':
        return (
          <group ref={groupRef}>
            {/* Left shoe sole */}
            <Box args={[0.7, 0.2, 1.2]} position={[-0.5, -0.2, 0]}>
              <meshStandardMaterial color="#2a2a2a" metalness={0.1} roughness={0.8} />
            </Box>
            {/* Left shoe upper */}
            <Box args={[0.6, 0.4, 1]} position={[-0.5, 0.1, -0.1]}>
              <MeshWobbleMaterial color={color} factor={0.03} speed={1.5} metalness={0.3} roughness={0.4} />
            </Box>
            {/* Right shoe sole */}
            <Box args={[0.7, 0.2, 1.2]} position={[0.5, -0.2, 0]}>
              <meshStandardMaterial color="#2a2a2a" metalness={0.1} roughness={0.8} />
            </Box>
            {/* Right shoe upper */}
            <Box args={[0.6, 0.4, 1]} position={[0.5, 0.1, -0.1]}>
              <MeshWobbleMaterial color={color} factor={0.03} speed={1.5} metalness={0.3} roughness={0.4} />
            </Box>
            {/* Laces */}
            {[-0.5, 0.5].map((x, i) => (
              <group key={i}>
                {[-0.2, -0.1, 0, 0.1, 0.2].map((z, j) => (
                  <Sphere key={j} args={[0.02]} position={[x, 0.3, z]}>
                    <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
                  </Sphere>
                ))}
              </group>
            ))}
          </group>
        );
      
      default:
        return (
          <group ref={groupRef}>
            <Box args={[1.2, 1.2, 1.2]}>
              <MeshWobbleMaterial color={color} factor={0.1} speed={2} />
            </Box>
          </group>
        );
    }
  };

  return (
    <group
      onClick={() => setRotating(!rotating)}
      onPointerOver={(e) => {
        if (groupRef.current) {
          groupRef.current.scale.setScalar(1.05);
        }
      }}
      onPointerOut={(e) => {
        if (groupRef.current) {
          groupRef.current.scale.setScalar(1);
        }
      }}
    >
      {getDetailedGeometry()}
      
      {/* Floating text labels */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.3}
        color="#8B5CF6"
        anchorX="center"
        anchorY="middle"
        maxWidth={4}
      >
        {itemName}
      </Text>
      
      <Text
        position={[0, 2.1, 0]}
        fontSize={0.2}
        color="#6B7280"
        anchorX="center"
        anchorY="middle"
        maxWidth={4}
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
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
        <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} />
        
        <DetailedClothingMesh 
          type={type} 
          color={color} 
          itemName={itemName}
          brand={brand}
        />
        
        <Environment preset="studio" />
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate={false}
          maxDistance={10}
          minDistance={3}
        />
      </Canvas>
    </div>
  );
};