import { useRef } from 'react';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  size: [number, number];
  scale: [number, number, number];
  onPointerEnter: () => void;
  onPointerLeave: () => void;
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

const Back = ({ position, rotation, size, scale, onPointerEnter, onPointerLeave }: Props) => {
  const shapeOneRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} scale={scale} renderOrder={1} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      {/* <sphereGeometry args={[size, 32, 32]} /> */}
      <planeGeometry args={size} />
      <meshPhysicalMaterial
        color={'red'}
        transmission={0}      // high transmission for translucency
        transparent={true}      
        roughness={0}
        opacity={0}      // adjust as needed for a smoother surface
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Back;