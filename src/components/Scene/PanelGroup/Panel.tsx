import { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  // size: number;
  size: [number, number, number];
  // scale: [number, number, number];
  cushionMaterialProps: {
    color: string;
    metalness: number;
    roughness: number;
    opacity: number;
    envMapIntensity: number;
    emissive: string;
    emissiveIntensity: number;
    envMapImages: string[];
    envMapImage: string;
  },
}

const Panel = ({ position, rotation, size, cushionMaterialProps }: Props) => {
  const shapeOneRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} renderOrder={1}>
      {/* <sphereGeometry args={[size, 32, 32]} /> */}
      {/* <cylinderGeometry args={[size, size, 5, 32]} /> */}
      <boxGeometry args={size} />
      <meshStandardMaterial
        metalness={cushionMaterialProps.metalness}
        roughness={cushionMaterialProps.roughness}
        opacity={cushionMaterialProps.opacity}
        envMapIntensity={cushionMaterialProps.envMapIntensity}
        color={cushionMaterialProps.color}
        emissive={cushionMaterialProps.emissive}
        emissiveIntensity={cushionMaterialProps.emissiveIntensity}
        transparent
      />
    </mesh>
  );
};

export default Panel;