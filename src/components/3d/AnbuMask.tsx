// src/components/AnbuMask.tsx
import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Vector3, LoopRepeat } from 'three';

interface AnbuMaskProps {
    position?: Vector3 | [number, number, number];
    scale?: Vector3 | [number, number, number];
    rotation?: Vector3 | [number, number, number]; // Add rotation prop
  }
  

  const AnbuMask: React.FC<AnbuMaskProps> = ({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0] }) => {
  const { scene, animations } = useGLTF('/images/kakashi_anbu_mask_naruto.glb');
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

export default AnbuMask;
