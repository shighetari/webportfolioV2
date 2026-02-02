/* Styles */
import "../assets/scss/_components.scss";
import "../assets/scss/_base.scss";
import "../assets/scss/_layout.scss";
/* ~~~~~ */
import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { LoopRepeat } from "three";
import SceneText from "./SceneText";
import InteractiveButton from "./InteractiveButton";
import Environment from "./3d/Environment";
import FoxModel from "./3d/FoxModel";
import DialogBox from "./DialogBox";
import WorldOne from "./3d/WorldOne";
import Bmw1000rr from "./3d/Bmw1000rr";
import SciFiLaptop from "./3d/SciFiLaptop";
import Butterfly from "./3d/Butterfly";
import * as THREE from "three";
import Phoenix from "./3d/Phoenix";
// import Zen from './Zen'; //creates weird floating blackspace bug
import FlyingBook from "./3d/FlyingBook";
import AsianShip from "./3d/AsianShip";
import ITIcons from "./ITIcons";
import MobyDocker from "./3d/MobyDocker";
import WebDevLaptop from "./3d/WebDevLaptop";
import HelloWorldPython from "./3d/HelloWorldPython";
import KaliLinux from "./3d/KaliLinux";
import Earth from "./3d/Earth";
import HoHo from "./3d/HoHo";
import AnbuMask from "./3d/AnbuMask";
import AnimatedButton from "./AnimatedButton";
import BackgroundMusic from "./BackgroundMusic";
import ContactButton from "./ContactButton";
import ArchLinux from "./3d/ArchLinux";
import GNULinux from "./3d/GNULinux";
import HdriAnimeJungle from "./3d/HdriAnimeJungle";
import MechaWep from "./3d/mechaWep";
// import Mew from "./3d/Mew";
import { ChatBox } from "./ChatBox";
import { AIDialogBox } from "./AIDialogBox";


function Model() {
  const { scene, animations } = useGLTF(
    "/images/sci-fi_uniform_girl_and_animation.glb"
  );
  const { ref, mixer } = useAnimations(animations, scene);

  useEffect(() => {
    if (mixer && animations.length > 0) {
      const action = mixer.clipAction(animations[0]);
      action.setLoop(LoopRepeat, Infinity);
      action.play();
    }
  }, [mixer, animations]);

  //reminder to turn this origin verision into a component to follow the established pattern
  return (
    <primitive
      object={scene}
      ref={ref}
      scale={[0.06, 0.06, 0.06]}
      position={[1, 0.3, 1]}
    />
  );
}

export default function ModelViewer() {
  //Camera Controlls
  const orbitRef = useRef(null);
  const [isDialogVisible, setDialogVisible] = useState(false);

  const onToggle = () => {
    setDialogVisible(!isDialogVisible);
  };

  const animateCameraPosition = (targetPosition: any, duration = 4000) => {
    const controls = orbitRef.current as any;
    if (controls) {
      const startPosition = new THREE.Vector3().copy(controls.object.position);
      const endPosition = new THREE.Vector3(...targetPosition);
      const startTime = Date.now();

      const animate = () => {
        const currentTime = Date.now();
        const elapsed = (currentTime - startTime) / duration;

        if (elapsed < 1) {
          const nextPosition = new THREE.Vector3().lerpVectors(
            startPosition,
            endPosition,
            elapsed
          );
          controls.object.position.copy(nextPosition);
          controls.update();
          requestAnimationFrame(animate);
        } else {
          controls.object.position.copy(endPosition);
          controls.update();
        }
      };

      animate();
    }
  };

  const resetCamera = () => {
    const controls: any = orbitRef.current;
    if (controls) {
      const newCameraPosition = new THREE.Vector3(4, 3, 5); // Replace with desired position
      const newTarget = new THREE.Vector3(0, 0, 0); // Replace with desired target

      // Set the target first
      controls.target.copy(newTarget);

      // Then animate the camera to the new position
      animateCameraPosition(newCameraPosition.toArray());

      // Ensure the controls are updated after the target change
      controls.update();
    }
  };

  const navigateToHome = () => {
    window.location.href = "/";
  }

  // Button misc
  const onToggleContact = () => {
    if (isDialogVisible) {
      // Start the fade-out animation
      const dialogBox = document.querySelector(".dialog-box");
      if (dialogBox) {
        dialogBox.classList.remove("visible");
      }
      // Wait for the animation to finish before hiding the dialog box
      setTimeout(() => {
        setDialogVisible(false);
      }, 300); // The timeout should match the CSS transition duration
    } else {
      // Show the dialog box
      setDialogVisible(true);
    }
  };

  /* AI Chatbot state logic */

  const [isChatVisible, setChatVisible] = useState(false);

  const toggleChatDialog = () => {
    setChatVisible(!isChatVisible);
  };

  return (
    <div className="model-viewer">
      <div className="canvas-container">
        <Canvas camera={{ position: [4, 3, 5], fov: 100 }}>
          <Environment />
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Model />
            <OrbitControls ref={orbitRef} />
            <SceneText
              content="Welcome to My Portfolio"
              position={[0.5, 3.5, 1.3]}
            />
            <InteractiveButton
              position={[-2, 0.5, -1]}
              onToggle={onToggle}
              isDialogVisible={isDialogVisible}
            />
            <FoxModel position={[2, 1, 1]} scale={[1.5, 1.5, 1.5]} />
            <Bmw1000rr position={[2, 0.9, 1]} scale={[0.08, 0.08, 0.08]} />
            <WorldOne position={[-4, 0, 2]} scale={[15, 15, 15]} />
            <SciFiLaptop position={[-5, 0, 2]} scale={[0.001, 0.001, 0.001]} />
            <Butterfly position={[5, 5, 0]} scale={[0.5, 0.5, 0.5]} />
            <Phoenix position={[12, 17, 2]} scale={[0.005, 0.005, 0.005]} />
            {/* <Zen position={[1.6, 0.4, 0]} scale={[.5, .5, .5]}/> */}
            <FlyingBook position={[3, 2, 2]} scale={[0.001, 0.001, 0.001]} />
            <AsianShip position={[0, -20, 20]} scale={[10, 10, 10]} />
            <ITIcons
              position={[2, 1, -9]}
              scale={[0.5, 0.5, 0.5]}
              rotation={[1, 4.8, 0]}
            />
            <MobyDocker
              position={[10, -4, 20]}
              scale={[2, 2, 2]}
              rotation={[0, 0, 0]}
            />
            <WebDevLaptop
              position={[-2, -0.5, 1]}
              scale={[0.3, 0.3, 0.3]}
              rotation={[0, 0, 0]}
            />
            <HelloWorldPython
              position={[5, 3, -1]}
              scale={[0.3, 0.3, 0.3]}
              rotation={[0, 0, 0]}
            />
            <KaliLinux
              position={[-9, 3, 1]}
              scale={[0.1, 0.1, 0.1]}
              rotation={[0, 1, 0]}
            />
            <Earth
              position={[11, -9, 10]}
              scale={[200, 200, 200]}
              rotation={[0, 0, 0]}
            />
            <HoHo
              position={[0, 30, 0]}
              scale={[0.3, 0.3, 0.3]}
              rotation={[0, 0, 0]}
            />
            <AnbuMask
              position={[3.1, 0, 0]}
              scale={[0.01, 0.01, 0.01]}
              rotation={[1, 0, 0]}
            />
            <ArchLinux position={[1, 10, 30]} scale={[1, 1, 1]} />
            <GNULinux position={[1, 20, -30]} scale={[0.3, 0.3, 0.3]} />
            <HdriAnimeJungle position={[1, 1, 1]} scale={[120, 120, 120]} />
            <MechaWep
              position={[-300, 1, 100]}
              scale={[200, 200, 200]}
              rotation={[0, 1, 0]}
            />
            {/* <Mew
              position={[200, 400, 500]}
              scale={[1000, 1000, 1000]}
              rotation={[0, 2, 0]}
            /> */}
          </Suspense>

          <DialogBox onClose={onToggleContact} isVisible={isDialogVisible} />
          {/* {isDialogVisible && <DialogBox onClose={onToggleContact} isVisible={isDialogVisible} />} */}
        </Canvas>
      </div>
      <div className="overlay-ui">

        <AnimatedButton label="Reset Camera" onClick={resetCamera} />
        <AnimatedButton label="Dev Alpha 1.0" onClick={undefined} />
        <AnimatedButton label="AI Assistant" onClick={toggleChatDialog} />
        <AnimatedButton label="Go Back" onClick={navigateToHome} />
        <BackgroundMusic />
        <ContactButton onClick={onToggleContact} />
        <AIDialogBox isVisible={isChatVisible} onClose={toggleChatDialog}>
          <ChatBox />
        </AIDialogBox>
      </div>
    </div>
  );
}
