import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, MeshWobbleMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface ClothingModel3DProps {
  type: 'shirt' | 'pants' | 'shoes' | 'blazer' | 'sneakers' | 'tshirt' | 'jacket' | 'accessory';
  color?: string;
  animated?: boolean;
  className?: string;
}

function RealisticClothingMesh({ type, color = '#8B5CF6' }: { type: string; color: string }) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  const createShirtGeometry = () => {
    const shape = new THREE.Shape();
    
    // Create realistic shirt silhouette
    shape.moveTo(-0.6, -0.8);
    shape.lineTo(-0.6, 0.3);
    shape.quadraticCurveTo(-0.6, 0.8, -0.3, 0.8);
    shape.lineTo(0.3, 0.8);
    shape.quadraticCurveTo(0.6, 0.8, 0.6, 0.3);
    shape.lineTo(0.6, -0.8);
    shape.lineTo(0.4, -0.8);
    shape.lineTo(0.4, -0.4);
    shape.quadraticCurveTo(0, -0.2, -0.4, -0.4);
    shape.lineTo(-0.4, -0.8);
    shape.lineTo(-0.6, -0.8);

    const extrudeSettings = {
      depth: 0.15,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 2,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  };

  const createBlazerGeometry = () => {
    const shape = new THREE.Shape();
    
    // Blazer with lapels
    shape.moveTo(-0.7, -0.9);
    shape.lineTo(-0.7, 0.2);
    shape.quadraticCurveTo(-0.7, 0.9, -0.2, 0.9);
    shape.lineTo(-0.1, 0.7);
    shape.lineTo(0.1, 0.7);
    shape.lineTo(0.2, 0.9);
    shape.quadraticCurveTo(0.7, 0.9, 0.7, 0.2);
    shape.lineTo(0.7, -0.9);
    shape.lineTo(0.5, -0.9);
    shape.lineTo(0.5, -0.3);
    shape.quadraticCurveTo(0, -0.1, -0.5, -0.3);
    shape.lineTo(-0.5, -0.9);
    shape.lineTo(-0.7, -0.9);

    const extrudeSettings = {
      depth: 0.2,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 3,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  };

  const createPantsGeometry = () => {
    const shape = new THREE.Shape();
    
    // Pants silhouette
    shape.moveTo(-0.5, 0.5);
    shape.lineTo(-0.5, -1.2);
    shape.lineTo(-0.2, -1.2);
    shape.lineTo(-0.2, -0.2);
    shape.lineTo(0.2, -0.2);
    shape.lineTo(0.2, -1.2);
    shape.lineTo(0.5, -1.2);
    shape.lineTo(0.5, 0.5);
    shape.quadraticCurveTo(0, 0.6, -0.5, 0.5);

    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  };

  const createShoeGeometry = () => {
    // Create realistic shoe shape using multiple geometries
    const soleGeometry = new THREE.BoxGeometry(0.6, 0.15, 1.2);
    const upperGeometry = new THREE.SphereGeometry(0.3, 16, 8);
    
    return { sole: soleGeometry, upper: upperGeometry };
  };

  const getRealisticGeometry = () => {
    switch (type) {
      case 'shirt':
      case 'tshirt':
        return (
          <group ref={meshRef}>
            <mesh geometry={createShirtGeometry()}>
              <meshStandardMaterial
                color={color}
                roughness={0.4}
                metalness={0.1}
              />
            </mesh>
            {/* Sleeves */}
            <mesh position={[-0.8, 0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
              <cylinderGeometry args={[0.15, 0.12, 0.8, 12]} />
              <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
            </mesh>
            <mesh position={[0.8, 0.3, 0]} rotation={[0, 0, -Math.PI / 6]}>
              <cylinderGeometry args={[0.15, 0.12, 0.8, 12]} />
              <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
            </mesh>
            {/* Collar */}
            <mesh position={[0, 0.75, 0.08]}>
              <ringGeometry args={[0.25, 0.35, 16]} />
              <meshStandardMaterial color="#ffffff" roughness={0.6} metalness={0.05} />
            </mesh>
          </group>
        );
      
      case 'blazer':
      case 'jacket':
        return (
          <group ref={meshRef}>
            <mesh geometry={createBlazerGeometry()}>
              <meshStandardMaterial
                color={color}
                roughness={0.3}
                metalness={0.2}
              />
            </mesh>
            {/* Sleeves */}
            <mesh position={[-0.9, 0.2, 0]} rotation={[0, 0, Math.PI / 8]}>
              <cylinderGeometry args={[0.18, 0.15, 1, 12]} />
              <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
            </mesh>
            <mesh position={[0.9, 0.2, 0]} rotation={[0, 0, -Math.PI / 8]}>
              <cylinderGeometry args={[0.18, 0.15, 1, 12]} />
              <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
            </mesh>
            {/* Lapels */}
            <mesh position={[-0.25, 0.5, 0.11]} rotation={[0, 0, -0.3]}>
              <boxGeometry args={[0.15, 0.4, 0.02]} />
              <meshStandardMaterial color={color} roughness={0.25} metalness={0.25} />
            </mesh>
            <mesh position={[0.25, 0.5, 0.11]} rotation={[0, 0, 0.3]}>
              <boxGeometry args={[0.15, 0.4, 0.02]} />
              <meshStandardMaterial color={color} roughness={0.25} metalness={0.25} />
            </mesh>
            {/* Buttons */}
            {[0.3, 0.1, -0.1, -0.3].map((y, i) => (
              <mesh key={i} position={[0, y, 0.11]}>
                <cylinderGeometry args={[0.02, 0.02, 0.01, 8]} />
                <meshStandardMaterial color="#2a2a2a" roughness={0.1} metalness={0.8} />
              </mesh>
            ))}
          </group>
        );
      
      case 'pants':
        return (
          <group ref={meshRef}>
            <mesh geometry={createPantsGeometry()}>
              <meshStandardMaterial
                color={color}
                roughness={0.5}
                metalness={0.05}
              />
            </mesh>
            {/* Belt */}
            <mesh position={[0, 0.5, 0]}>
              <torusGeometry args={[0.52, 0.03, 8, 16]} />
              <meshStandardMaterial color="#8B4513" roughness={0.8} metalness={0.1} />
            </mesh>
            {/* Pockets */}
            <mesh position={[-0.35, 0.1, 0.16]}>
              <boxGeometry args={[0.2, 0.15, 0.01]} />
              <meshStandardMaterial color={color} roughness={0.6} metalness={0.03} />
            </mesh>
            <mesh position={[0.35, 0.1, 0.16]}>
              <boxGeometry args={[0.2, 0.15, 0.01]} />
              <meshStandardMaterial color={color} roughness={0.6} metalness={0.03} />
            </mesh>
          </group>
        );
      
      case 'shoes':
      case 'sneakers':
        const { sole, upper } = createShoeGeometry();
        return (
          <group ref={meshRef}>
            {/* Left shoe */}
            <group position={[-0.4, 0, 0]}>
              <mesh position={[0, -0.075, 0]} geometry={sole}>
                <meshStandardMaterial color="#2a2a2a" roughness={0.8} metalness={0.1} />
              </mesh>
              <mesh position={[0, 0.1, -0.2]} scale={[1, 0.8, 1.2]} geometry={upper}>
                <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
              </mesh>
              {/* Laces */}
              {[-0.15, -0.05, 0.05, 0.15].map((z, i) => (
                <mesh key={i} position={[0, 0.2, z]}>
                  <cylinderGeometry args={[0.01, 0.01, 0.1, 6]} />
                  <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
                </mesh>
              ))}
            </group>
            
            {/* Right shoe */}
            <group position={[0.4, 0, 0]}>
              <mesh position={[0, -0.075, 0]} geometry={sole}>
                <meshStandardMaterial color="#2a2a2a" roughness={0.8} metalness={0.1} />
              </mesh>
              <mesh position={[0, 0.1, -0.2]} scale={[1, 0.8, 1.2]} geometry={upper}>
                <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
              </mesh>
              {/* Laces */}
              {[-0.15, -0.05, 0.05, 0.15].map((z, i) => (
                <mesh key={i} position={[0, 0.2, z]}>
                  <cylinderGeometry args={[0.01, 0.01, 0.1, 6]} />
                  <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
                </mesh>
              ))}
            </group>
          </group>
        );
      
      default:
        return (
          <group ref={meshRef}>
            <mesh>
              <dodecahedronGeometry args={[0.8]} />
              <MeshWobbleMaterial color={color} factor={0.1} speed={2} />
            </mesh>
          </group>
        );
    }
  };

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.05 : 1}
    >
      {getRealisticGeometry()}
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