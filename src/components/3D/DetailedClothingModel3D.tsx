import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

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
    }
  });

  const createDetailedShirtGeometry = () => {
    const shape = new THREE.Shape();
    
    // More detailed shirt with curved neckline
    shape.moveTo(-0.7, -1);
    shape.lineTo(-0.7, 0.2);
    shape.quadraticCurveTo(-0.7, 0.9, -0.3, 0.9);
    shape.quadraticCurveTo(-0.15, 0.95, 0, 0.8);
    shape.quadraticCurveTo(0.15, 0.95, 0.3, 0.9);
    shape.quadraticCurveTo(0.7, 0.9, 0.7, 0.2);
    shape.lineTo(0.7, -1);
    shape.lineTo(0.5, -1);
    shape.lineTo(0.5, -0.3);
    shape.quadraticCurveTo(0, -0.1, -0.5, -0.3);
    shape.lineTo(-0.5, -1);
    shape.lineTo(-0.7, -1);

    const extrudeSettings = {
      depth: 0.18,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 3,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  };

  const createDetailedBlazerGeometry = () => {
    const shape = new THREE.Shape();
    
    // Professional blazer with structured shoulders
    shape.moveTo(-0.8, -1.1);
    shape.lineTo(-0.8, 0.1);
    shape.quadraticCurveTo(-0.8, 0.9, -0.3, 0.95);
    shape.lineTo(-0.1, 0.8);
    shape.quadraticCurveTo(0, 0.75, 0.1, 0.8);
    shape.lineTo(0.3, 0.95);
    shape.quadraticCurveTo(0.8, 0.9, 0.8, 0.1);
    shape.lineTo(0.8, -1.1);
    shape.lineTo(0.6, -1.1);
    shape.lineTo(0.6, -0.2);
    shape.quadraticCurveTo(0, 0, -0.6, -0.2);
    shape.lineTo(-0.6, -1.1);
    shape.lineTo(-0.8, -1.1);

    const extrudeSettings = {
      depth: 0.25,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 4,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  };

  const createDetailedPantsGeometry = () => {
    const shape = new THREE.Shape();
    
    // Tailored pants with proper fit
    shape.moveTo(-0.6, 0.6);
    shape.quadraticCurveTo(-0.65, 0.65, -0.6, 0.7);
    shape.lineTo(-0.3, 0.7);
    shape.lineTo(-0.3, -1.4);
    shape.lineTo(-0.15, -1.4);
    shape.lineTo(-0.15, -0.1);
    shape.lineTo(0.15, -0.1);
    shape.lineTo(0.15, -1.4);
    shape.lineTo(0.3, -1.4);
    shape.lineTo(0.3, 0.7);
    shape.lineTo(0.6, 0.7);
    shape.quadraticCurveTo(0.65, 0.65, 0.6, 0.6);
    shape.quadraticCurveTo(0, 0.75, -0.6, 0.6);

    const extrudeSettings = {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 3,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  };

  const getDetailedGeometry = () => {
    switch (type) {
      case 'shirt':
      case 'tshirt':
        return (
          <group ref={groupRef}>
            <mesh geometry={createDetailedShirtGeometry()}>
              <meshStandardMaterial
                color={color}
                roughness={0.4}
                metalness={0.1}
              />
            </mesh>
            {/* Detailed sleeves with fabric folds */}
            <mesh position={[-0.9, 0.35, 0]} rotation={[0, 0, Math.PI / 5]}>
              <cylinderGeometry args={[0.16, 0.13, 0.9, 16]} />
              <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
            </mesh>
            <mesh position={[0.9, 0.35, 0]} rotation={[0, 0, -Math.PI / 5]}>
              <cylinderGeometry args={[0.16, 0.13, 0.9, 16]} />
              <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
            </mesh>
            {/* Neckline */}
            <mesh position={[0, 0.8, 0.09]}>
              <torusGeometry args={[0.18, 0.02, 8, 16]} />
              <meshStandardMaterial color="#ffffff" roughness={0.6} metalness={0.05} />
            </mesh>
            {/* Seam details */}
            <mesh position={[0, 0, 0.091]}>
              <boxGeometry args={[0.01, 1.8, 0.005]} />
              <meshStandardMaterial color={color} roughness={0.2} metalness={0.3} />
            </mesh>
          </group>
        );
      
      case 'blazer':
      case 'jacket':
        return (
          <group ref={groupRef}>
            <mesh geometry={createDetailedBlazerGeometry()}>
              <meshStandardMaterial
                color={color}
                roughness={0.25}
                metalness={0.3}
              />
            </mesh>
            {/* Structured sleeves */}
            <mesh position={[-1, 0.25, 0]} rotation={[0, 0, Math.PI / 7]}>
              <cylinderGeometry args={[0.2, 0.17, 1.1, 16]} />
              <meshStandardMaterial color={color} roughness={0.25} metalness={0.3} />
            </mesh>
            <mesh position={[1, 0.25, 0]} rotation={[0, 0, -Math.PI / 7]}>
              <cylinderGeometry args={[0.2, 0.17, 1.1, 16]} />
              <meshStandardMaterial color={color} roughness={0.25} metalness={0.3} />
            </mesh>
            {/* Lapels with detailed shaping */}
            <mesh position={[-0.28, 0.55, 0.13]} rotation={[0, 0, -0.4]}>
              <boxGeometry args={[0.18, 0.5, 0.02]} />
              <meshStandardMaterial color={color} roughness={0.2} metalness={0.35} />
            </mesh>
            <mesh position={[0.28, 0.55, 0.13]} rotation={[0, 0, 0.4]}>
              <boxGeometry args={[0.18, 0.5, 0.02]} />
              <meshStandardMaterial color={color} roughness={0.2} metalness={0.35} />
            </mesh>
            {/* Premium buttons */}
            {[0.4, 0.15, -0.1, -0.35].map((y, i) => (
              <mesh key={i} position={[0, y, 0.13]}>
                <cylinderGeometry args={[0.025, 0.025, 0.015, 12]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.05} metalness={0.9} />
              </mesh>
            ))}
            {/* Breast pocket */}
            <mesh position={[-0.4, 0.3, 0.13]}>
              <boxGeometry args={[0.25, 0.2, 0.005]} />
              <meshStandardMaterial color={color} roughness={0.3} metalness={0.25} />
            </mesh>
            {/* Side pockets */}
            <mesh position={[-0.45, -0.4, 0.13]}>
              <boxGeometry args={[0.3, 0.25, 0.005]} />
              <meshStandardMaterial color={color} roughness={0.3} metalness={0.25} />
            </mesh>
            <mesh position={[0.45, -0.4, 0.13]}>
              <boxGeometry args={[0.3, 0.25, 0.005]} />
              <meshStandardMaterial color={color} roughness={0.3} metalness={0.25} />
            </mesh>
          </group>
        );
      
      case 'pants':
        return (
          <group ref={groupRef}>
            <mesh geometry={createDetailedPantsGeometry()}>
              <meshStandardMaterial
                color={color}
                roughness={0.5}
                metalness={0.05}
              />
            </mesh>
            {/* Premium belt */}
            <mesh position={[0, 0.6, 0]}>
              <torusGeometry args={[0.62, 0.04, 8, 20]} />
              <meshStandardMaterial color="#654321" roughness={0.7} metalness={0.2} />
            </mesh>
            {/* Belt buckle */}
            <mesh position={[0, 0.6, 0.18]}>
              <boxGeometry args={[0.08, 0.06, 0.01]} />
              <meshStandardMaterial color="#c0c0c0" roughness={0.1} metalness={0.9} />
            </mesh>
            {/* Front pockets with realistic depth */}
            <mesh position={[-0.4, 0.15, 0.18]}>
              <boxGeometry args={[0.22, 0.18, 0.005]} />
              <meshStandardMaterial color={color} roughness={0.6} metalness={0.03} />
            </mesh>
            <mesh position={[0.4, 0.15, 0.18]}>
              <boxGeometry args={[0.22, 0.18, 0.005]} />
              <meshStandardMaterial color={color} roughness={0.6} metalness={0.03} />
            </mesh>
            {/* Back pockets */}
            <mesh position={[-0.3, -0.2, -0.18]}>
              <boxGeometry args={[0.18, 0.15, 0.005]} />
              <meshStandardMaterial color={color} roughness={0.6} metalness={0.03} />
            </mesh>
            <mesh position={[0.3, -0.2, -0.18]}>
              <boxGeometry args={[0.18, 0.15, 0.005]} />
              <meshStandardMaterial color={color} roughness={0.6} metalness={0.03} />
            </mesh>
            {/* Seams */}
            <mesh position={[0, 0, 0.176]}>
              <boxGeometry args={[0.008, 2, 0.002]} />
              <meshStandardMaterial color={color} roughness={0.2} metalness={0.4} />
            </mesh>
          </group>
        );
      
      case 'shoes':
      case 'sneakers':
        return (
          <group ref={groupRef}>
            {/* Left shoe */}
            <group position={[-0.45, 0, 0]}>
              {/* Sole with tread pattern */}
              <mesh position={[0, -0.1, 0]}>
                <boxGeometry args={[0.7, 0.2, 1.3]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.05} />
              </mesh>
              {/* Upper shoe body */}
              <mesh position={[0, 0.15, -0.15]} scale={[1.1, 0.9, 1.3]}>
                <sphereGeometry args={[0.32, 20, 16]} />
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
              </mesh>
              {/* Tongue */}
              <mesh position={[0, 0.25, 0.1]}>
                <boxGeometry args={[0.25, 0.15, 0.3]} />
                <meshStandardMaterial color={color} roughness={0.4} metalness={0.15} />
              </mesh>
              {/* Detailed laces */}
              {[-0.2, -0.1, 0, 0.1, 0.2].map((z, i) => (
                <group key={i}>
                  <mesh position={[-0.1, 0.3, z]}>
                    <cylinderGeometry args={[0.008, 0.008, 0.05, 8]} />
                    <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
                  </mesh>
                  <mesh position={[0.1, 0.3, z]}>
                    <cylinderGeometry args={[0.008, 0.008, 0.05, 8]} />
                    <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
                  </mesh>
                </group>
              ))}
              {/* Eyelets */}
              {[-0.2, -0.1, 0, 0.1, 0.2].map((z, i) => (
                <group key={i}>
                  <mesh position={[-0.1, 0.3, z]}>
                    <cylinderGeometry args={[0.015, 0.015, 0.01, 8]} />
                    <meshStandardMaterial color="#c0c0c0" roughness={0.1} metalness={0.8} />
                  </mesh>
                  <mesh position={[0.1, 0.3, z]}>
                    <cylinderGeometry args={[0.015, 0.015, 0.01, 8]} />
                    <meshStandardMaterial color="#c0c0c0" roughness={0.1} metalness={0.8} />
                  </mesh>
                </group>
              ))}
            </group>
            
            {/* Right shoe */}
            <group position={[0.45, 0, 0]}>
              {/* Sole with tread pattern */}
              <mesh position={[0, -0.1, 0]}>
                <boxGeometry args={[0.7, 0.2, 1.3]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.05} />
              </mesh>
              {/* Upper shoe body */}
              <mesh position={[0, 0.15, -0.15]} scale={[1.1, 0.9, 1.3]}>
                <sphereGeometry args={[0.32, 20, 16]} />
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
              </mesh>
              {/* Tongue */}
              <mesh position={[0, 0.25, 0.1]}>
                <boxGeometry args={[0.25, 0.15, 0.3]} />
                <meshStandardMaterial color={color} roughness={0.4} metalness={0.15} />
              </mesh>
              {/* Detailed laces */}
              {[-0.2, -0.1, 0, 0.1, 0.2].map((z, i) => (
                <group key={i}>
                  <mesh position={[-0.1, 0.3, z]}>
                    <cylinderGeometry args={[0.008, 0.008, 0.05, 8]} />
                    <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
                  </mesh>
                  <mesh position={[0.1, 0.3, z]}>
                    <cylinderGeometry args={[0.008, 0.008, 0.05, 8]} />
                    <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
                  </mesh>
                </group>
              ))}
              {/* Eyelets */}
              {[-0.2, -0.1, 0, 0.1, 0.2].map((z, i) => (
                <group key={i}>
                  <mesh position={[-0.1, 0.3, z]}>
                    <cylinderGeometry args={[0.015, 0.015, 0.01, 8]} />
                    <meshStandardMaterial color="#c0c0c0" roughness={0.1} metalness={0.8} />
                  </mesh>
                  <mesh position={[0.1, 0.3, z]}>
                    <cylinderGeometry args={[0.015, 0.015, 0.01, 8]} />
                    <meshStandardMaterial color="#c0c0c0" roughness={0.1} metalness={0.8} />
                  </mesh>
                </group>
              ))}
            </group>
          </group>
        );
      
      default:
        return (
          <group ref={groupRef}>
            <mesh>
              <icosahedronGeometry args={[1, 2]} />
              <meshStandardMaterial
                color={color}
                roughness={0.3}
                metalness={0.4}
                wireframe={false}
              />
            </mesh>
          </group>
        );
    }
  };

  return (
    <group
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
      {getDetailedGeometry()}
      
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