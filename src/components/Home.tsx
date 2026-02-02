// src/components/Home.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBook,
  FaLightbulb,
  FaUser,
  FaProjectDiagram,
  FaEnvelope,
  FaWindowClose,
  FaRedhat,
  FaCat,
  FaCheckCircle,
} from "react-icons/fa"; // Importing icons
import DarkModeToggle from "./DarkModeToggle";
import SEO from "./SEO";
import "../assets/scss/_Home.scss";
import "../assets/scss/_Resume.scss";
import "../assets/scss/_ResumeSelection.scss";
import useTypewriter from "../hooks/useTypewriter";

const Resume = React.lazy(() => import("./Resume"));
const ContactDialog = React.lazy(() => import("./ContactDialog"));
const Assistant = React.lazy(() => import("./Assistant"));

const Home = () => {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  // const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // This function toggles the state of the Assistant component
  // const toggleAssistant = () => {
  //   setIsAssistantOpen(!isAssistantOpen);
  // };

  const toggleContactDialog = () => {
    setIsContactDialogOpen(!isContactDialogOpen);
  };

  const toggleSection = (section: any) => {
    setActiveSection(activeSection !== section ? section : "");
  };

  const [showResumeModal, setShowResumeModal] = useState(false);
  const toggleResumeModal = () => {
    setShowResumeModal(!showResumeModal);
  };

  const jobTitles = [
    "Software Engineer",
    "DevOps Engineer",
    "InfoSec Enthusiast",
    "Cat lover",
    "AI Enthusiast",
    "Full-Stack Developer",
    "Cloud Engineer",
    "Friend",
    "Tech Enthusiast",
    "Security Professional",
  ];
  const typewriterText = useTypewriter(jobTitles);

  return (
    <div>
      <SEO />
      <main className="home">
        <DarkModeToggle />
        <section className="intro-section">
          <h1>Welcome to My Web Portfolio</h1>
          <h2>Francisco Barrios</h2>
          <p className="dynamic-title">| {typewriterText} |</p>{" "}
          <div className="availability-status">
            <FaCheckCircle className="status-icon" />
            <span>Available for Hire - Open to New Opportunities</span>
          </div>
          <p className="multi-hats">
            one man, many hats <FaRedhat />
          </p>
          <div className="action-buttons">
            <a
              href="/resume1.pdf"
              download="Francisco_Barrios_Resume.pdf"
              className="enter-portfolio-btn download-resume-btn"
            >
              <FaBook /> Download Resume
            </a>
            <button onClick={toggleResumeModal}>
              <FaBook /> View Resume
            </button>
            {showResumeModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <React.Suspense fallback={<div className="modal-loading">Loading resume…</div>}>
                    <Resume />
                  </React.Suspense>
                  <button className="close-modal" onClick={toggleResumeModal}>
                    <FaWindowClose /> <> Close </>
                  </button>
                </div>
              </div>
            )}

            <Link to="/aboutme" className="enter-portfolio-btn">
              <FaUser /> About Me
            </Link>
            <Link to="/projects" className="enter-portfolio-btn">
              <FaProjectDiagram /> Projects
            </Link>
            <Link to="/anbu" className="enter-portfolio-btn featured-link">
              <FaLightbulb /> ANBU Solutions
            </Link>
            <Link to="/study" className="enter-portfolio-btn">
              <FaCat /> Study Zone
            </Link>
            <button onClick={toggleContactDialog} className="contact-btn">
              <FaEnvelope /> Contact
            </button>
            {isContactDialogOpen && (
              <React.Suspense fallback={null}>
                <ContactDialog isOpen={isContactDialogOpen} onClose={toggleContactDialog} />
              </React.Suspense>
            )}
            <Link to="/portfolio" className="enter-portfolio-btn">
              <FaLightbulb /> 3D Portfolio
            </Link>
          </div>
        </section>
        {/* {activeSection === "skills" && <Assistant />} */}
      </main>
      <React.Suspense fallback={null}>
        <Assistant />
      </React.Suspense>
    </div>
  );
};

export default Home;
