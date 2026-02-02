// src/components/Resume.tsx
import React from "react";
import { FaFilePdf, FaDownload, FaEye } from "react-icons/fa";
import "../assets/scss/_Resume.scss";

const Resume = () => {
  const resumeUrl = "/resumes/Francisco_Barrios_resume.pdf";
  const resumeTitle = "Francisco Barrios";

  return (
    <div className="resume-container">
      <div className="resume-card">
        <div className="resume-icon">
          <FaFilePdf />
        </div>
        <div className="resume-info">
          <h3>{resumeTitle}</h3>
          <p>Professional Resume for Software Engineering</p>
        </div>
        <div className="resume-actions">
          {/* Button to view the resume */}
          <button
            className="action-button view"
            onClick={() => window.open(resumeUrl, "_blank")}
            aria-label="View Resume"
          >
            <FaEye /> View
          </button>
          {/* Anchor tag styled as a button for downloading the resume */}
          <a
            href={resumeUrl}
            download="Francisco_Barrios_resume.pdf"
            className="action-button download"
            aria-label="Download Resume"
          >
            <FaDownload /> Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default Resume;