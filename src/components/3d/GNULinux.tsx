// src/components/GNULinux.tsx
import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Vector3, LoopRepeat } from 'three';

interface GNULinuxProps {
    position?: Vector3 | [number, number, number];
    scale?: Vector3 | [number, number, number];
    rotation?: Vector3 | [number, number, number]; // Add rotation prop
  }
  

  const GNULinux: React.FC<GNULinuxProps> = ({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0] }) => {
  const { scene, animations } = useGLTF('/images/tux.glb');
  const { ref, mixer } = useAnimations(animations, scene);

  useEffect(() => {
    if (mixer && animations.length > 0) {
      const action = mixer.clipAction(animations[0]);
      action.setLoop(LoopRepeat, Infinity);
      action.play();
    }
  }, [mixer, animations]);

  return <primitive object={scene} ref={ref} position={position} scale={scale} rotation={rotation} />;
};

export default GNULinux;
