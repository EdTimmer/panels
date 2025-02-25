import { useRef } from 'react';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  size: [number, number];
  scale: [number, number, number];
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

const Back = ({ position, rotation, size, scale, onPointerEnter, onPointerLeave }: Props) => {
  const shapeOneRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} scale={scale} renderOrder={1} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <boxGeometry args={size} />
      <meshPhysicalMaterial
        color={'red'}
        transmission={0}
        transparent={true}      
        roughness={0}
        opacity={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Back;