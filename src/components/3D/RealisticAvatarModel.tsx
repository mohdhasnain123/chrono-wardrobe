import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RealisticAvatarModelProps {
  type: 'shirt' | 'pants' | 'shoes' | 'blazer' | 'sneakers' | 'tshirt' | 'jacket' | 'accessory';
  color?: string;
}

export const RealisticAvatarModel: React.FC<RealisticAvatarModelProps> = ({
  type,
  color = '#8B5CF6',
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Create human body parts
  const createBodyGeometry = () => {
    return {
      head: new THREE.SphereGeometry(0.25, 16, 12),
      torso: new THREE.CylinderGeometry(0.35, 0.4, 1.2, 12),
      leftArm: new THREE.CylinderGeometry(0.08, 0.1, 0.8, 8),
      rightArm: new THREE.CylinderGeometry(0.08, 0.1, 0.8, 8),
      leftLeg: new THREE.CylinderGeometry(0.12, 0.15, 1.0, 8),
      rightLeg: new THREE.CylinderGeometry(0.12, 0.15, 1.0, 8),
      leftFoot: new THREE.BoxGeometry(0.25, 0.1, 0.4),
      rightFoot: new THREE.BoxGeometry(0.25, 0.1, 0.4),
    };
  };

  const bodyParts = useMemo(() => createBodyGeometry(), []);

  // Create clothing geometries
  const createClothingGeometry = () => {
    switch (type) {
      case 'shirt':
      case 'tshirt':
        return {
          torsoClothing: new THREE.CylinderGeometry(0.37, 0.42, 1.22, 12),
          leftSleeve: new THREE.CylinderGeometry(0.09, 0.11, 0.6, 8),
          rightSleeve: new THREE.CylinderGeometry(0.09, 0.11, 0.6, 8),
        };
      
      case 'blazer':
      case 'jacket':
        return {
          torsoClothing: new THREE.CylinderGeometry(0.38, 0.43, 1.24, 12),
          leftSleeve: new THREE.CylinderGeometry(0.1, 0.12, 0.82, 8),
          rightSleeve: new THREE.CylinderGeometry(0.1, 0.12, 0.82, 8),
          collar: new THREE.TorusGeometry(0.28, 0.05, 8, 16, Math.PI),
        };
      
      case 'pants':
        return {
          leftPant: new THREE.CylinderGeometry(0.13, 0.16, 1.02, 8),
          rightPant: new THREE.CylinderGeometry(0.13, 0.16, 1.02, 8),
          waistband: new THREE.TorusGeometry(0.42, 0.03, 8, 16),
        };
      
      case 'shoes':
      case 'sneakers':
        return {
          leftShoe: new THREE.BoxGeometry(0.28, 0.15, 0.45),
          rightShoe: new THREE.BoxGeometry(0.28, 0.15, 0.45),
          leftSole: new THREE.BoxGeometry(0.3, 0.05, 0.47),
          rightSole: new THREE.BoxGeometry(0.3, 0.05, 0.47),
        };
      
      default:
        return {};
    }
  };

  const clothingParts = useMemo(() => createClothingGeometry(), [type]);

  const renderBody = () => (
    <group>
      {/* Head */}
      <mesh position={[0, 1.5, 0]} geometry={bodyParts.head}>
        <meshStandardMaterial color="#FDBCB4" roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Torso */}
      <mesh position={[0, 0.4, 0]} geometry={bodyParts.torso}>
        <meshStandardMaterial color="#FDBCB4" roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.5, 0.6, 0]} rotation={[0, 0, 0.2]} geometry={bodyParts.leftArm}>
        <meshStandardMaterial color="#FDBCB4" roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh position={[0.5, 0.6, 0]} rotation={[0, 0, -0.2]} geometry={bodyParts.rightArm}>
        <meshStandardMaterial color="#FDBCB4" roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.15, -0.7, 0]} geometry={bodyParts.leftLeg}>
        <meshStandardMaterial color="#FDBCB4" roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh position={[0.15, -0.7, 0]} geometry={bodyParts.rightLeg}>
        <meshStandardMaterial color="#FDBCB4" roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Feet */}
      <mesh position={[-0.15, -1.25, 0.1]} geometry={bodyParts.leftFoot}>
        <meshStandardMaterial color="#FDBCB4" roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh position={[0.15, -1.25, 0.1]} geometry={bodyParts.rightFoot}>
        <meshStandardMaterial color="#FDBCB4" roughness={0.7} metalness={0.1} />
      </mesh>
    </group>
  );

  const renderClothing = () => {
    switch (type) {
      case 'shirt':
      case 'tshirt':
        return (
          <group>
            {/* Shirt torso */}
            {'torsoClothing' in clothingParts && (
              <mesh position={[0, 0.4, 0]} geometry={clothingParts.torsoClothing}>
                <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
              </mesh>
            )}
            {/* Sleeves */}
            {'leftSleeve' in clothingParts && (
              <mesh position={[-0.5, 0.6, 0]} rotation={[0, 0, 0.2]} geometry={clothingParts.leftSleeve}>
                <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
              </mesh>
            )}
            {'rightSleeve' in clothingParts && (
              <mesh position={[0.5, 0.6, 0]} rotation={[0, 0, -0.2]} geometry={clothingParts.rightSleeve}>
                <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
              </mesh>
            )}
          </group>
        );
      
      case 'blazer':
      case 'jacket':
        return (
          <group>
            {/* Blazer torso */}
            {'torsoClothing' in clothingParts && (
              <mesh position={[0, 0.4, 0]} geometry={clothingParts.torsoClothing}>
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
              </mesh>
            )}
            {/* Sleeves */}
            {'leftSleeve' in clothingParts && (
              <mesh position={[-0.5, 0.6, 0]} rotation={[0, 0, 0.2]} geometry={clothingParts.leftSleeve}>
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
              </mesh>
            )}
            {'rightSleeve' in clothingParts && (
              <mesh position={[0.5, 0.6, 0]} rotation={[0, 0, -0.2]} geometry={clothingParts.rightSleeve}>
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
              </mesh>
            )}
            {/* Collar */}
            {'collar' in clothingParts && (
              <mesh position={[0, 0.9, 0.15]} rotation={[0.3, 0, 0]} geometry={clothingParts.collar}>
                <meshStandardMaterial color={color} roughness={0.25} metalness={0.25} />
              </mesh>
            )}
            {/* Buttons */}
            {[0.7, 0.5, 0.3, 0.1].map((y, i) => (
              <mesh key={i} position={[0, y, 0.42]}>
                <cylinderGeometry args={[0.02, 0.02, 0.01, 8]} />
                <meshStandardMaterial color="#2a2a2a" roughness={0.1} metalness={0.8} />
              </mesh>
            ))}
          </group>
        );
      
      case 'pants':
        return (
          <group>
            {/* Pants legs */}
            {'leftPant' in clothingParts && (
              <mesh position={[-0.15, -0.7, 0]} geometry={clothingParts.leftPant}>
                <meshStandardMaterial color={color} roughness={0.5} metalness={0.05} />
              </mesh>
            )}
            {'rightPant' in clothingParts && (
              <mesh position={[0.15, -0.7, 0]} geometry={clothingParts.rightPant}>
                <meshStandardMaterial color={color} roughness={0.5} metalness={0.05} />
              </mesh>
            )}
            {/* Waistband */}
            {'waistband' in clothingParts && (
              <mesh position={[0, -0.15, 0]} geometry={clothingParts.waistband}>
                <meshStandardMaterial color="#8B4513" roughness={0.8} metalness={0.1} />
              </mesh>
            )}
          </group>
        );
      
      case 'shoes':
      case 'sneakers':
        return (
          <group>
            {/* Shoes */}
            {'leftShoe' in clothingParts && (
              <mesh position={[-0.15, -1.2, 0.1]} geometry={clothingParts.leftShoe}>
                <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
              </mesh>
            )}
            {'rightShoe' in clothingParts && (
              <mesh position={[0.15, -1.2, 0.1]} geometry={clothingParts.rightShoe}>
                <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
              </mesh>
            )}
            {/* Soles */}
            {'leftSole' in clothingParts && (
              <mesh position={[-0.15, -1.28, 0.1]} geometry={clothingParts.leftSole}>
                <meshStandardMaterial color="#2a2a2a" roughness={0.8} metalness={0.1} />
              </mesh>
            )}
            {'rightSole' in clothingParts && (
              <mesh position={[0.15, -1.28, 0.1]} geometry={clothingParts.rightSole}>
                <meshStandardMaterial color="#2a2a2a" roughness={0.8} metalness={0.1} />
              </mesh>
            )}
          </group>
        );
      
      default:
        return null;
    }
  };

  return (
    <group ref={groupRef} scale={1.2}>
      {renderBody()}
      {renderClothing()}
    </group>
  );
};