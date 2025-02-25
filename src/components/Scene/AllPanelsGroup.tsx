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
  const pivotRef = useRef<Group>(null);

  // Continuously rotate the group around the y-axis
  useFrame(() => {
    if (allPanelsGroupRef.current) {
      allPanelsGroupRef.current.rotation.y -= 0.001;
    }
  });

  // Animate the pivot group to rotate continuously about its local x-axis
  // useFrame((state, delta) => {
  //   if (pivotRef.current) {
  //     pivotRef.current.rotation.x += delta  // adjust delta for speed
  //   }
  // })
    // Set your amplitude (20° in radians) and frequency
    const amplitude = 40 * Math.PI / 180  // about 0.349 radians
    const frequency = 0.5  // adjust to make the oscillation faster or slower
  
    // Animate the pivot group with a sine function for oscillation
    // useFrame((state) => {
    //   if (pivotRef.current) {
    //     const time = state.clock.getElapsedTime()
    //     // Oscillate between -amplitude and +amplitude
    //     pivotRef.current.rotation.x = amplitude * Math.sin(time * frequency)
    //   }
    // })

  


  return (
    <group ref={pivotRef} position={[0, -5, 0]}>
      <group ref={allPanelsGroupRef} position={[0, 5, 0]} rotation={[0, Math.PI, 0]}>
        <PanelGroup position={[-6.9, 0, 0]} timeMultiplier={1.0} offset={-1} zoffset={0} />
        <PanelGroup position={[-5.2, 0, 0]} timeMultiplier={1.0} offset={0} zoffset={1} />
        <PanelGroup position={[-3.5, 0, 0]} timeMultiplier={1.0} offset={1} zoffset={2} />
        <PanelGroup position={[-1.7, 0, 0]} timeMultiplier={1.0} offset={2} zoffset={3} />
        <PanelGroup position={[0, 0, 0]} timeMultiplier={1.0} offset={3} zoffset={4} />
        <PanelGroup position={[1.7, 0, 0]} timeMultiplier={1.0} offset={4} zoffset={3} />        
        <PanelGroup position={[3.5, 0, 0]} timeMultiplier={1.0} offset={5} zoffset={2} />
        <PanelGroup position={[5.2, 0, 0]} timeMultiplier={1.0} offset={6} zoffset={1} />
        <PanelGroup position={[6.9, 0, 0]} timeMultiplier={1.0} offset={7} zoffset={0} />
      </group>
    </group>
  );
}

export default AllPanelsGroup;
