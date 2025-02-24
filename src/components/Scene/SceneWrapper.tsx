import { Canvas } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import PanelGroup from './PanelGroup';
import EnvironmentImage from './EnvironmentImage';

interface Props {
  guiy: string;
}

const SceneWrapper = ({guiy}: Props) => {
  return (
    <div 
      style={{ width: `900px`, height: `800px`, cursor: `pointer` }}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      <Canvas gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault fov={20} position={[0, 0, 20]} />
        {/* <OrthographicCamera makeDefault position={[0, 0, 20]} zoom={80} /> */}
        <ambientLight intensity={1} />
        <PanelGroup position={[-3, 0, 0]} guiy={guiy} />
        <PanelGroup position={[-1.5, 0, 0]} guiy={guiy} />
        <PanelGroup position={[0, 0, 0]} guiy={guiy} />
        <PanelGroup position={[1.5, 0, 0]} guiy={guiy} />        
        <PanelGroup position={[3, 0, 0]} guiy={guiy} />
        <directionalLight position={[0, 4, 15]} intensity={1} />
        <directionalLight position={[0, -4, 15]} intensity={1} />
        <directionalLight position={[0, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, 5]} intensity={1} />
        <directionalLight position={[5, -5, 5]} intensity={1} />
        <OrbitControls enableDamping enableZoom={false} />
        {/* <Environment background files="/images/img_4.png" /> */}
        <EnvironmentImage />
      </Canvas>
    </div>        
  );
}

export default SceneWrapper;