// src/components/Environment.tsx
import { useThree, useLoader, extend } from '@react-three/fiber';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import * as THREE from 'three';
extend({ RGBELoader });

const Environment = () => {
  const { scene, gl } = useThree();
//   const texture = useLoader(RGBELoader, '/images/hdrbublesky.hdr');
const texture = useLoader(RGBELoader, '/images/animestyled_hdr.hdr');

  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
  scene.background = texture;

  return null;
};

export default Environment;
