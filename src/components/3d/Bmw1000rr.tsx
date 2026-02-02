// src/components/Bmw1000rr.tsx
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { Vector3 } from 'three';

interface Bmw1000rrProps {
  position?: Vector3 | [number, number, number];
  scale?: Vector3 | [number, number, number];
}

const Bmw1000rr: React.FC<Bmw1000rrProps> = ({ position = [0, 0, 0], scale = [1, 1, 1] }) => {
  const { scene } = useGLTF('/images/bmw_rr_1000.glb');

  return <primitive object={scene} position={position} scale={scale} />;
};

export default Bmw1000rr;