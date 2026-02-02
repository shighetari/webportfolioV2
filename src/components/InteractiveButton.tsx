import { useRef, useState, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { Mesh, ShaderMaterial, Color } from "three";
import { Text } from "@react-three/drei";


extend({ ShaderMaterial });

const blobVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const blobFragmentShader = `
  uniform float time;
  uniform float hovered;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;

  void main() {
    // Simple time-based animation
    float pulse = sin(time * 2.0) * 0.1 + 0.9;
    pulse = hovered > 0.5 ? pulse + 0.1 : pulse;

    // Mix colors based on hover state
    vec3 color = mix(color1, color2, hovered);
    gl_FragColor = vec4(color * pulse, 1.0);
  }
`;

interface InteractiveButtonProps {
  position: [number, number, number];
  onToggle: (isDialogVisible: boolean) => void;
  isDialogVisible: boolean;
}

const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  position,
  onToggle,
  isDialogVisible,
}) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [isPressed, setPressed] = useState(isDialogVisible);

  useEffect(() => {
    setPressed(isDialogVisible); // Update the internal state when the prop changes
  }, [isDialogVisible]);

  useFrame(({ clock }) => {
    const shaderMaterial = meshRef.current?.material as ShaderMaterial;
    shaderMaterial.uniforms.time.value = clock.getElapsedTime();
  });

  const handleOnClick = () => {
    setPressed(!isPressed);
    onToggle(!isPressed);
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        position={position}
        onClick={handleOnClick}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        {/* <boxGeometry args={[1.2, 0.6, 0.2]} /> */}
        <sphereGeometry args={[0.6, 32, 32]} />
        <shaderMaterial
          attach="material"
          args={[
            {
              uniforms: {
                time: { value: 0 },
                hovered: { value: hovered ? 1 : 0 },
                color1: { value: new Color(isPressed ? "#00FF00" : "#FF6347") },
                color2: { value: new Color("#FFFFFF") },
              },
              vertexShader: blobVertexShader,
              fragmentShader: blobFragmentShader,
              transparent: true,
            },
          ]}
        />
      </mesh>
      <Text
        position={[-2, 2, -1]} // Adjust the position as needed
        fontSize={0.5}
        color="#dbafe0" // Text color
        anchorX="center" // Horizontal center alignment
        anchorY="middle" // Vertical center alignment
      >
        Click Me
      </Text>
    </group>
  );
};

export default InteractiveButton;
