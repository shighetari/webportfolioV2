// src/components/SciFiLaptop.tsx
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { Vector3 } from 'three';

interface SciFiLaptopProps {
  position?: Vector3 | [number, number, number];
  scale?: Vector3 | [number, number, number];
}

const SciFiLaptop: React.FC<SciFiLaptopProps> = ({ position = [0, 0, 0], scale = [1, 1, 1] }) => {
  const { scene } = useGLTF('/images/hacker_laptop.glb');

  return <primitive object={scene} position={position} scale={scale} />;
};

export default SciFiLaptop;