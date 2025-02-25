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
      {/* <meshStandardMaterial
        metalness={cushionMaterialProps.metalness}
        roughness={cushionMaterialProps.roughness}
        opacity={cushionMaterialProps.opacity}
        envMapIntensity={cushionMaterialProps.envMapIntensity}
        color={cushionMaterialProps.color}
        emissive={cushionMaterialProps.emissive}
        emissiveIntensity={cushionMaterialProps.emissiveIntensity}
        transparent
      /> */}
       <meshPhysicalMaterial
        clearcoat={1}  // Shiny surface effect
        transmission={1}  // Fully transparent
        opacity={0.3}  // Fully opaque but will be transparent due to transmission
        // transparent={true}  // Enable transparency
        roughness={0}  // Smooth like glass
        reflectivity={0.5}  // Adjust reflection intensity
        metalness={0}  // Glass is non-metallic
        ior={1.45}  // 1.45 is typical for glass (Index of Refraction)
        thickness={0.1}  // Controls the refraction and look of thickness
        // attenuationColor="#ffffff"  // The color of the glass when light passes through
        attenuationDistance={0.5}  // Distance at which the glass becomes less transparent
        envMapIntensity={1.0}  // Control the strength of the reflections
        // color="#999999"  // Use a slightly grey color instead of pure white
        // color='black'
        color='#ffa1ef'
      />
    </mesh>
  );
};

export default Panel;