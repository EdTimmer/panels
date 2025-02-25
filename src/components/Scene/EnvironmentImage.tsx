import  { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei';
import * as THREE from 'three'

const EnvironmentImage = () => {
  const texture = useTexture('/images/black.jpg');
  const { scene, gl } = useThree()
  
  useEffect(() => {
    // Set the correct color space for sRGB images
    texture.colorSpace = THREE.SRGBColorSpace

    const pmremGenerator = new THREE.PMREMGenerator(gl)
    pmremGenerator.compileEquirectangularShader()
    const envMap = pmremGenerator.fromEquirectangular(texture).texture

    // Set the environment map for the scene
    scene.environment = envMap

    const envMapIntensity = 1
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.envMap = envMap
        child.material.envMapIntensity = envMapIntensity
        child.material.needsUpdate = true
      }
    })
    pmremGenerator.dispose()
  }, [texture, scene, gl])
  return null
}

export default EnvironmentImage;