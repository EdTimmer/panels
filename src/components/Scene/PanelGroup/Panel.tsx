import { useRef } from 'react';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  size: [number, number, number];
}

const Panel = ({ position, rotation, size }: Props) => {
  const shapeOneRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} renderOrder={1}>
      <boxGeometry args={size} />
       <meshPhysicalMaterial
        clearcoat={1}
        transmission={1}
        opacity={0.3}
        roughness={0}
        reflectivity={0.5}
        metalness={0}
        ior={1.45}
        thickness={0.1}
        attenuationDistance={0.5}
        envMapIntensity={1.0}
        color='#ffa1ef'
      />
    </mesh>
  );
};

export default Panel;