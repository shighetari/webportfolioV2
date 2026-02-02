// src/components/WorldOne.tsx
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { Vector3 } from 'three';

interface WorldOneProps {
  position?: Vector3 | [number, number, number];
  scale?: Vector3 | [number, number, number];
}

const WorldOne: React.FC<WorldOneProps> = ({ position = [0, 0, 0], scale = [1, 1, 1] }) => {
  const { scene } = useGLTF('/images/hdranimeart.glb');

  return <primitive object={scene} position={position} scale={scale} />;
};

export default WorldOne;