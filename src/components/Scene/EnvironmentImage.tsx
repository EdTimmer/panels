import  { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { EquirectangularReflectionMapping, PMREMGenerator } from 'three'
import { useTexture } from '@react-three/drei';
import * as THREE from 'three'

const EnvironmentImage = () => {
  // const texture = useTexture('/images/oil-blue.jpg');
  // const texture = useTexture('/images/bw_8.jpg');
  // const texture = useTexture('/images/img_5.png');
  // const texture = useTexture('/images/landscape_3.jpg');
  // const texture = useTexture('/images/rainbow_1.jpg');
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

    // Clean up if necessary – note that you should dispose of textures only when they’re no longer needed.
    // texture.dispose()
    pmremGenerator.dispose()
  }, [texture, scene, gl])

  // useEffect(() => {
  //   // Make sure the image is loaded
  //   if (!texture.image) return

  //   // Create a CubeTexture using the same image for all 6 faces.
  //   // Note: CubeTexture expects an array of HTMLImageElements.
  //   const cubeTexture = new THREE.CubeTexture([
  //     texture.image,
  //     texture.image,
  //     texture.image,
  //     texture.image,
  //     texture.image,
  //     texture.image
  //   ])
  //   cubeTexture.needsUpdate = true

  //   // Apply the cube texture as the scene environment (and background if desired)
  //   scene.environment = cubeTexture
  //   // scene.background = cubeTexture
  // }, [texture, scene])

  return null
}

export default EnvironmentImage;