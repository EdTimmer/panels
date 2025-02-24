import React, { useRef } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import NeonMaterial from './NeonMaterial'
import * as THREE from 'three'

// Extend so that <neonMaterial /> is available in JSX
extend({ NeonMaterial })

// Define a type that extends THREE.ShaderMaterial with your custom uniforms
type NeonMaterialType = THREE.ShaderMaterial & {
  uniforms: {
    time: { value: number }
    neonColor: { value: THREE.Color }
  }
}

function NeonSign() {
  const materialRef = useRef<NeonMaterialType>(null)

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh>
      <planeBufferGeometry args={[2, 1]} />
      <neonMaterial ref={materialRef} />
    </mesh>
  )
}