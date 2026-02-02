// src/components/Zen.tsx
import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Vector3, LoopRepeat } from 'three';

interface ZenProps {
  position?: Vector3 | [number, number, number];
  scale?: Vector3 | [number, number, number];
}

const Zen: React.FC<ZenProps> = ({ position = [0, 0, 0], scale = [1, 1, 1] }) => {
  const { scene, animations } = useGLTF('/images/interdimensional_zen_gallery_space.glb');
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

export default Zen;
