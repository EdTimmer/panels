interface Props {
  position: [number, number, number];
  size: number;
  sphereMaterialProps: {
    color: string;
    metalness: number;
    roughness: number;
    opacity: number;
  };
}

const GreenDotGlass = ({ position, size, sphereMaterialProps }: Props) => {
  return (
    <mesh position={position} scale={[0.3, 0.3, 0.3]} renderOrder={2}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={sphereMaterialProps.color}
        metalness={sphereMaterialProps.metalness}
        roughness={sphereMaterialProps.roughness}
        opacity={sphereMaterialProps.opacity}
        transparent
      />
    </mesh>
  );
};

export default GreenDotGlass;