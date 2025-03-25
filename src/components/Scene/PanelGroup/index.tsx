import { useRef, useEffect, useState } from 'react';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { Group, MathUtils } from 'three';
import * as THREE from 'three';
import Panel from './Panel';
import Text from './Text';
import TextLight from './TextLight';
import TextBold from './TextBold';
import TextBack from './TextBack';

interface Props {
  position: [number, number, number];
  timeMultiplier: number;
  offset: number;
  zoffset?: number;
}

function PanelGroup({ position, timeMultiplier, offset, zoffset = 0 }: Props) {
  const panelGroupRef = useRef<Group>(null);

  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseEnter = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsMouseEntered(true);
  }
  const handleMouseLeave = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsMouseEntered(false);
  }

  // Set the initial rotation on mount only
  useEffect(() => {
    // const initialRotation = isFacingUser ? 0 : Math.PI;
    if (panelGroupRef.current) {
      panelGroupRef.current.rotation.y = Math.PI;
    }
  }, []);

  // Define oscillation parameters
  const amplitude = 5   // maximum displacement along z-axis
  const frequency = 0.2   // oscillation speed

  // Update the mesh's position each frame
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (panelGroupRef.current) {
      // Sine function creates a smooth oscillation between -amplitude and +amplitude
      panelGroupRef.current.position.z = amplitude * Math.sin(time * frequency + offset) + zoffset
    }
  })

  useFrame((state, delta) => {
    if (panelGroupRef.current) {
      // Apply a "breathing" effect on the X axis.
      panelGroupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * timeMultiplier + offset) * 0.15;

      // Determine the starting rotation.
      const initialRotation = Math.PI;
      // Set the target rotation: rotate an extra PI when the mouse enters.
      const targetY = isMouseEntered ? initialRotation + Math.PI : initialRotation;
      
      // Incorporate delta into the interpolation factor for frame rate independence.
      const speed = 3; // Adjust this to control the smoothness/speed
      const lerpFactor = 1 - Math.exp(-speed * delta);
      
      // Interpolate the current rotation towards the target rotation.
      panelGroupRef.current.rotation.y = MathUtils.lerp(
        panelGroupRef.current.rotation.y,
        targetY,
        lerpFactor
      );

      // Optionally, snap to target if very close.
      if (Math.abs(panelGroupRef.current.rotation.y - targetY) < 0.001) {
        panelGroupRef.current.rotation.y = targetY;
      }
    }
  });
  
  return (
    <group>      
      <group position={position} scale={[1.0, 1.0, 1.0]} ref={panelGroupRef} onPointerEnter={handleMouseEnter} onPointerLeave={handleMouseLeave}>      
        <Text text={'O'} position={[0, 2.1, 0.01]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.4} />
        <TextBack text={'O'} position={[0, 2.1, -0.01]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.4} />
        <TextBold text={'O'} position={[0, 2.1, 0]} scale={[1.1, 1.1, 1]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.4} />

        <Text text={'R'} position={[0, 1, 0.01]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.4} />
        <TextBack text={'R'} position={[0, 1, -0.01]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.4} />
        <TextBold text={'R'} position={[0, 1, 0]} scale={[1.1, 1.1, 1]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.4} />

        
        <TextLight text={"I"} position={[0, 0, 0.03]} scale={[1, 0.9, 1]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.4} />
        <TextBack text={"I"} position={[0, 0, -0.03]} scale={[1, 0.9, 1]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.4} />
        <TextBold text={"I"} position={[0, 0, 0]} scale={[1.4, 1, 1]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.45} />

       
        <TextLight text={'O'} position={[0, -1, 0.01]} scale={[1, 1, 1]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.4} />
        <TextBack text={'O'} position={[0, -1, -0.01]} scale={[1, 1, 1]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.4} />
        <TextBold text={'O'} position={[0, -1, 0]} scale={[1.1, 1.1, 1]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.4} />

        <Text text={'N'} position={[0, -2.05, 0.01]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.4} />
        <TextBack text={'N'} position={[0, -2.05, -0.01]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.4} />
        <TextBold text={'N'} position={[0, -2.05, 0]} scale={[1.1, 1.1, 1]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.4} />
        <Panel size={[1.4, 5.5, 0.8]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} />
      </group>
    </group>
  );
}

export default PanelGroup;
