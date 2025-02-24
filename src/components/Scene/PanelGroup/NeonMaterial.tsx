import { shaderMaterial } from '@react-three/drei'
import glsl from 'babel-plugin-glsl/macro'

const NeonMaterial = shaderMaterial(
  // Uniforms
  { time: 0, neonColor: [0.0, 1.0, 1.0] },
  // Vertex Shader
  glsl`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  glsl`
    uniform float time;
    uniform vec3 neonColor;
    varying vec2 vUv;
    
    void main() {
      // Create a pulsating effect based on time and the horizontal UV coordinate
      float pulse = abs(sin(time * 3.0 + vUv.x * 10.0));
      // Smooth transition for intensity
      float intensity = smoothstep(0.4, 0.5, pulse);
      gl_FragColor = vec4(neonColor * intensity, 1.0);
    }
  `
)

export default NeonMaterial
