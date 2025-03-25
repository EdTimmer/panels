import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import EnvironmentImage from './EnvironmentImage';
import AllPanelsGroup from './AllPanelsGroup';

const SceneWrapper = () => {
  return (
    <div 
      style={{ width: `100vw`, height: `100vh` }}
    >
      <Canvas gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault fov={20} position={[0, 0, 20]} />
        <ambientLight intensity={1} />
        <AllPanelsGroup />
        <directionalLight position={[-3, 3, 5]} intensity={1} />
        <directionalLight position={[-3, 3, -5]} intensity={1} />

        <directionalLight position={[3, 3, 5]} intensity={1} />
        <directionalLight position={[3, 3, -5]} intensity={1} />

        <directionalLight position={[-3, -3, 5]} intensity={1} />
        <directionalLight position={[-3, -3, -5]} intensity={1} />

        <directionalLight position={[3, -3, 5]} intensity={1} />
        <directionalLight position={[3, -3, -5]} intensity={1} />
        <OrbitControls enableDamping enableZoom={false} />
        <EnvironmentImage />
      </Canvas>
    </div>        
  );
}

export default SceneWrapper;