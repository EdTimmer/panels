import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MathUtils } from 'three';
import * as THREE from 'three';
import { GUI } from 'lil-gui';
import PanelGroup from './PanelGroup';


// interface Props {
//   isMouseEntered: boolean;
//   isFacingUser: boolean;
//   setIsFacingUser: (isFacingUser: boolean) => void;
//   guiy: string;
// }

function AllPanelsGroup() {
  const allPanelsGroupRef = useRef<Group>(null);

  // Continuously rotate the group around the y-axis
  useFrame(() => {
    if (allPanelsGroupRef.current) {
      allPanelsGroupRef.current.rotation.y -= 0.002;
    }
  });

  return (
    <group ref={allPanelsGroupRef} position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>
      <PanelGroup position={[-6.9, 0, 0]} timeMultiplier={1.0} offset={-1} />
      <PanelGroup position={[-5.2, 0, 0]} timeMultiplier={1.0} offset={0} />
      <PanelGroup position={[-3.5, 0, 0]} timeMultiplier={1.0} offset={1} />
      <PanelGroup position={[-1.7, 0, 0]} timeMultiplier={1.0} offset={2} />
      <PanelGroup position={[0, 0, 0]} timeMultiplier={1.0} offset={3} />
      <PanelGroup position={[1.7, 0, 0]} timeMultiplier={1.0} offset={4} />        
      <PanelGroup position={[3.5, 0, 0]} timeMultiplier={1.0} offset={5} />
      <PanelGroup position={[5.2, 0, 0]} timeMultiplier={1.0} offset={6} />
      <PanelGroup position={[6.9, 0, 0]} timeMultiplier={1.0} offset={7} />
    </group>    
  );
}

export default AllPanelsGroup;
