// src/components/FoxModel.tsx
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { Vector3 } from 'three';

interface FoxModelProps {
  position?: Vector3 | [number, number, number];
  scale?: Vector3 | [number, number, number];
}

const FoxModel: React.FC<FoxModelProps> = ({ position = [0, 0, 0], scale = [1, 1, 1] }) => {
  const { scene } = useGLTF('/images/fox_in_a_cape.glb');

  return <primitive object={scene} position={position} scale={scale} />;
};

export default FoxModel;
