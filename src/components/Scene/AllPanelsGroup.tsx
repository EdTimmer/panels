import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import PanelGroup from './PanelGroup';

function AllPanelsGroup() {
  const allPanelsGroupRef = useRef<Group>(null);
  const pivotRef = useRef<Group>(null);

  // Continuously rotate the group around the y-axis
  useFrame(() => {
    if (allPanelsGroupRef.current) {
      allPanelsGroupRef.current.rotation.y -= 0.001;
    }
  });

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
