// src/components/AnbuSolutions.tsx
import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Sparkles, ContactShadows } from "@react-three/drei";
import Navigation from "./Navigation";
import AnbuMask from "../models/AnbuMask";
import { FaExternalLinkAlt, FaEnvelope } from "react-icons/fa";
import "../assets/scss/_AnbuSolutions.scss";

const AnbuSolutions: React.FC = () => {
  return (
    <>
      <Navigation />
      <div className="anbu-solutions page-with-nav">
        <main className="anbu-container">
          {/* Left Content Side */}
          <motion.div
            className="content-side"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-wrapper">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                ANBU Solutions
              </motion.h1>

              <motion.p
                className="tagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Architecting Intelligence.
              </motion.p>

              <motion.p
                className="description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Bridging the gap between bleeding-edge AI research and production-grade enterprise systems.
                We build the software that powers the future.
              </motion.p>

              <motion.div
                className="cta-group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <a
                  href="https://anbu.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-btn"
                >
                  Visit ANBU.ai <FaExternalLinkAlt />
                </a>
                <a
                  href="mailto:francisco@anbu.ai"
                  className="secondary-btn"
                >
                  <FaEnvelope /> Contact
                </a>
              </motion.div>
            </div>

            <motion.div
              className="tech-badges"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span>Generative AI</span>
              <span className="separator">•</span>
              <span>Cloud Architecture</span>
              <span className="separator">•</span>
              <span>System Design</span>
            </motion.div>
          </motion.div>

          {/* Right Visual Side - The Demo */}
          <motion.div
            className="visual-side"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <div className="canvas-wrapper">
              <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <Suspense fallback={null}>
                  <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <AnbuMask scale={[2.8, 2.8, 2.8]} rotation={[0, -0.4, 0]} />
                  </Float>
                  <Environment preset="city" />
                  <Sparkles count={40} scale={8} size={4} speed={0.4} opacity={0.4} color="#a855f7" />
                  <ContactShadows resolution={1024} scale={10} blur={2.5} opacity={0.5} far={10} color="#000000" />
                </Suspense>

                <OrbitControls
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={0.8}
                  minPolarAngle={Math.PI / 4}
                  maxPolarAngle={Math.PI / 1.5}
                />
              </Canvas>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default AnbuSolutions;
