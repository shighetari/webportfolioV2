import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./hooks/DarkModeContext";
import Home from "./components/Home";
import StyledLoader from "./components/StyledLoader";
import StudyZone from "./components/StudyZone";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import ModelViewer from "./components/ModelViewer";
import AnbuSolutions from "./components/AnbuSolutions";
import "./assets/scss/_base.scss";

function App() {
  return (
    <DarkModeProvider>
      <Suspense fallback={<StyledLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<ModelViewer />} />
          <Route path="/study" element={<StudyZone />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/anbu" element={<AnbuSolutions />} />
        </Routes>
      </Suspense>
    </DarkModeProvider>
  );
}

export default App;
