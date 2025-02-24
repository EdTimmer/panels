// react-three-fiber.d.ts
import * as THREE from 'three'
import { ReactThreeFiber } from '@react-three/fiber'
import NeonMaterial from './NeonMaterial'

declare module '@react-three/fiber' {
  interface ThreeElements {
    neonMaterial: ReactThreeFiber.Node<THREE.ShaderMaterial, typeof NeonMaterial>
  }
}
