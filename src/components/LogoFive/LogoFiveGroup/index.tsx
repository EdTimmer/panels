import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MathUtils } from 'three';
import * as THREE from 'three';
import { GUI } from 'lil-gui';
import Cushion from './Cushion';
import CushionCover from './CushionCover';
import { listOfImages } from '../../../utilities/listOfImages';
import Text from './Text';

interface Props {
  isMouseEntered: boolean;
  isFacingUser: boolean;
  setIsFacingUser: (isFacingUser: boolean) => void;
  guiy: string;
}

function LogoFiveGroup({ isMouseEntered, isFacingUser, setIsFacingUser, guiy }: Props) {
  const logoFiveGroupRef = useRef<Group>(null);

  // Set the initial rotation on mount only
  useEffect(() => {
    if (logoFiveGroupRef.current) {
      logoFiveGroupRef.current.rotation.y = isFacingUser ? 0 : Math.PI;
    }
  }, [isFacingUser]);

  useFrame((state, delta) => {
    if (logoFiveGroupRef.current) {
      // Apply a "breathing" effect on the X axis.
      logoFiveGroupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.12;

      // Determine the starting rotation.
      const initialRotation = isFacingUser ? 0 : Math.PI;
      // Set the target rotation: rotate an extra PI when the mouse enters.
      const targetY = isMouseEntered ? initialRotation + Math.PI : initialRotation;
      
      // Incorporate delta into the interpolation factor for frame rate independence.
      const speed = 3; // Adjust this to control the smoothness/speed
      const lerpFactor = 1 - Math.exp(-speed * delta);
      
      // Interpolate the current rotation towards the target rotation.
      logoFiveGroupRef.current.rotation.y = MathUtils.lerp(
        logoFiveGroupRef.current.rotation.y,
        targetY,
        lerpFactor
      );

      // Optionally, snap to target if very close.
      if (Math.abs(logoFiveGroupRef.current.rotation.y - targetY) < 0.001) {
        logoFiveGroupRef.current.rotation.y = targetY;
      }
    }
  });

  // ROTATION GUI REFS
  const rotationFolderRef = useRef<GUI | null>(null);
  const rotationControllersRef = useRef<Record<string, any>>({});

  // TEXT GUI REFS
  const textFolderRef = useRef<GUI | null>(null);
  const textControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [textMaterialProps, setTextMaterialProps] = useState({
    color: '#fff',
    opacity: 1.0,
    roughness: 0.2,       
    metalness: 0.2,
    emissive: '#fff',
    emissiveIntensity: 0.2,
  });

  // CUSHION GUI REFS
  const cushionFolderRef = useRef<GUI | null>(null);
  const cushionControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [cushionMaterialProps, setCushionMaterialProps] = useState({
    color: '#faf3e7',
    opacity: 1.0,
    roughness: 0,     
    metalness: 1.0,
    envMapIntensity: 0.25,
    emissive: '#fff',
    emissiveIntensity: 0,
    envMapImages: listOfImages,
    envMapImage: '/images/silver_6.jpg',
  });

  // CUSHION COVERAGE GUI REFS
  const cushionCoverFolderRef = useRef<GUI | null>(null);
  const cushionCoverControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [cushionCoverMaterialProps, setCushionCoverMaterialProps] = useState({
    color: '#e4e3e3',
    opacity: 0.3,
  });

  useEffect(() => {
    const guiFive = new GUI({
      width: 350,
      title: 'LEFT - THIRD FROM THE TOP'
    });
    // Position the GUI
    guiFive.domElement.style.position = 'absolute';
    guiFive.domElement.style.left = '10px';
    guiFive.domElement.style.top = guiy;

    // ROTATION FOLDER
    const rotationFolder = guiFive.addFolder('Rotation');
    rotationFolderRef.current = rotationFolder;

    const localRotationProps = {
      isFacingUser,
    }

    // add rotation controls for each property with a step increment of Math.PI
    rotationControllersRef.current.isFacingUserController = rotationFolder
      .add(localRotationProps, 'isFacingUser')
      .name('Is Facing User')
      .onChange((isFacingUser: boolean) => {
        setIsFacingUser(isFacingUser);
      });


      // TEXT FOLDER
    const textFolder = guiFive.addFolder('Text');
    textFolderRef.current = textFolder;
    // textFolderRef.current.open();

    const localTextProps = {
      color: textMaterialProps.color,
      opacity: textMaterialProps.opacity,
      roughness: textMaterialProps.roughness,
      metalness: textMaterialProps.metalness,
      emissive: textMaterialProps.emissive,
      emissiveIntensity: textMaterialProps.emissiveIntensity,
    }

    // add controls for each property
    textControllersRef.current.colorController = textFolder
      .addColor(localTextProps, 'color')
      .name('Color')
      .onChange((value: string) => {
        setTextMaterialProps(prev => ({ ...prev, color: value }));
      });

    textControllersRef.current.metalnessController = textFolder
      .add(localTextProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, metalness: value }));
      });

    textControllersRef.current.roughnessController = textFolder
      .add(localTextProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, roughness: value }));
      });

    textControllersRef.current.emissiveController = textFolder
      .addColor(localTextProps, 'emissive')
      .name('Emissive')
      .onChange((value: string) => {
        setTextMaterialProps(prev => ({ ...prev, emissive: value }));
      });

    textControllersRef.current.emissiveIntensityController = textFolder
      .add(localTextProps, 'emissiveIntensity', 0, 1, 0.01)
      .name('Emissive Intensity')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, emissiveIntensity: value }));
      });
    
    textControllersRef.current.opacityController = textFolder
      .add(localTextProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, opacity: value }));
      });


    // CUSHION FOLDER
    const cushionFolder = guiFive.addFolder('Cushion');
    cushionFolderRef.current = cushionFolder;

    const localCushionProps = {
      color: cushionMaterialProps.color,
      opacity: cushionMaterialProps.opacity,
      roughness: cushionMaterialProps.roughness,
      metalness: cushionMaterialProps.metalness,
      envMapIntensity: cushionMaterialProps.envMapIntensity,
      emissive: cushionMaterialProps.emissive,
      emissiveIntensity: cushionMaterialProps.emissiveIntensity,
      envMapImages: cushionMaterialProps.envMapImages,
      envMapImage: cushionMaterialProps.envMapImage,
    }

    // add controls for each property
    cushionControllersRef.current.envMapImageController = cushionFolder
    .add(localCushionProps, 'envMapImage', cushionMaterialProps.envMapImages) // Passing the array creates a dropdown.
    .name('Env Map Image')
    .onChange((selectedImage: string) => {
      // Update your material props with the selected image directly.
      setCushionMaterialProps((prev) => ({ ...prev, envMapImage: selectedImage }));
    });

    cushionControllersRef.current.envMapIntensityController = cushionFolder
      .add(localCushionProps, 'envMapIntensity', 0, 1, 0.01)
      .name('Env Map Intensity')
      .onChange((envMapIntensity: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, envMapIntensity }));
      });


    cushionControllersRef.current.colorController = cushionFolder
      .addColor(localCushionProps, 'color')
      .name('Color')
      .onChange((color: string) => {
        setCushionMaterialProps((prev) => ({ ...prev, color }));
      });
    
    cushionControllersRef.current.metalnessController = cushionFolder
      .add(localCushionProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((metalness: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, metalness }));
      });

    cushionControllersRef.current.roughnessController = cushionFolder
      .add(localCushionProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((roughness: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, roughness }));
      });

    cushionControllersRef.current.emissiveController = cushionFolder
      .addColor(localCushionProps, 'emissive')
      .name('Emissive')
      .onChange((emissive: string) => {
        setCushionMaterialProps((prev) => ({ ...prev, emissive }));
      });

    cushionControllersRef.current.emissiveIntensityController = cushionFolder
      .add(localCushionProps, 'emissiveIntensity', 0, 1, 0.01)
      .name('Emissive Intensity')
      .onChange((emissiveIntensity: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, emissiveIntensity }));
      });
    
    cushionControllersRef.current.opacityController = cushionFolder
      .add(localCushionProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((opacity: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, opacity }));
      });

    // CUSHION COVER FOLDER
    const cushionCoverFolder = guiFive.addFolder('Cushion Cover');
    cushionCoverFolderRef.current = cushionCoverFolder;

    const localCushionCoverProps = {
      color: cushionCoverMaterialProps.color,
      opacity: cushionCoverMaterialProps.opacity,
    }

    // add controls for each property
    cushionCoverControllersRef.current.colorController = cushionCoverFolder
      .addColor(localCushionCoverProps, 'color')
      .name('Color')
      .onChange((color: string) => {
        setCushionCoverMaterialProps((prev) => ({ ...prev, color }));
      });

    cushionCoverControllersRef.current.opacityController = cushionCoverFolder
      .add(localCushionCoverProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((opacity: number) => {
        setCushionCoverMaterialProps((prev) => ({ ...prev, opacity }));
      });
    

    return () => {
      guiFive.destroy();
    }

  }, []);

  return (
    <group position={[0, 0, 0]} scale={[1.0, 1.0, 1.0]} ref={logoFiveGroupRef}>
      <Text text={'DP&I'} position={[0, 0, 0.3]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.5} textMaterialProps={textMaterialProps} />
      <CushionCover size={0.92} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionCoverMaterialProps={cushionCoverMaterialProps} />
      <Cushion size={0.9} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionMaterialProps={cushionMaterialProps} />
    </group>    
  );
}

export default LogoFiveGroup;
