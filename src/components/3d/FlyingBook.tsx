// src/components/FlyingBook.tsx
import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Vector3, LoopRepeat } from 'three';

interface FlyingBookProps {
  position?: Vector3 | [number, number, number];
  scale?: Vector3 | [number, number, number];
}

const FlyingBook: React.FC<FlyingBookProps> = ({ position = [0, 0, 0], scale = [1, 1, 1] }) => {
  const { scene, animations } = useGLTF('/images/flying_magic_book.glb');
  const { ref, mixer } = useAnimations(animations, scene);

  useEffect(() => {
    if (mixer && animations.length > 0) {
      const action = mixer.clipAction(animations[0]);
      action.setLoop(LoopRepeat, Infinity);
      action.play();
    }
  }, [mixer, animations]);

  return <primitive object={scene} ref={ref} position={position} scale={scale} />;
};

export default FlyingBook;
