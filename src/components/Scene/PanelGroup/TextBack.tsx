import { useEffect, useMemo, useState, useRef } from 'react';
import * as THREE from 'three';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  text: string;
  size: number;
  depth: number;
  scale?: [number, number, number];
}

const TextBack = ({ position, rotation, text, size, depth, scale }: Props) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [font, setFont] = useState<Font | null>(null);    

  useEffect(() => {
    const loader = new FontLoader();
    loader.load('/fonts/comfortaa_light_regular.json', (loadedFont) => {
      setFont(loadedFont);
    });
  }, []);

    // Use `useMemo` to memoize the geometry creation and avoid recreation on every render
    const textGeometry = useMemo(() => {
      if (!font) return null;
  
      const textOptions = {
        font,
        size,
        depth,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelOffset: 0.0,
        bevelSegments: 5,
      };
  
      const geometry = new TextGeometry(text, textOptions);
    
      // Compute the bounding box of the text and center it
      geometry.computeBoundingBox();
      geometry.center();  

      return geometry;
    }, [font]);
  
    if (!font || !textGeometry) return null;

  return (
    <mesh ref={meshRef} geometry={textGeometry} scale={scale || [1, 1, 1]} rotation={rotation} position={position} renderOrder={2}>
      <meshPhysicalMaterial
        color={'#f8fc02'}
        metalness={1}
        roughness={0}
        reflectivity={1}
        clearcoat={1}     
        clearcoatRoughness={0.1}  
        emissive={'#f8fc02'}
        emissiveIntensity={2.5}
      />

    </mesh>
  );
};

export default TextBack;
