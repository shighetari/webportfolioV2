import React, { useState } from "react";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particlesConfig from "../config/particlesConfig";
import { FaArrowCircleDown } from 'react-icons/fa'; // Font Awesome
import "../assets/scss/_StudyZone.scss";
import BackgroundMusic from "./BackgroundMusic";

const backgrounds = ["gradient1", "gradient2", "gradient3"];

const StudyZone: React.FC = () => {
    const [currentBackground, setCurrentBackground] = useState(backgrounds[0]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [particlesKey, setParticlesKey] = useState<number>(0);

    const resetParticles = () => {
        setParticlesKey(p => p + 1); // Incrementing the key to force re-render
    };

    const particlesInit = async (main: any) => {
        await loadFull(main);
    };

    const handleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleBackgroundChange = (bg: string) => {
        setCurrentBackground(bg);
        setDropdownOpen(false);
    };

    return (
        <div className={`study-zone ${currentBackground}`}>
            <div className="music-player">
                <BackgroundMusic />
            </div>
            {/* <Particles key={particlesKey} id="tsparticles" init={particlesInit} options={particlesConfig} /> */}
            <Particles key={particlesKey} id="tsparticles" init={particlesInit} options={particlesConfig} />
            <button onClick={resetParticles} className="reset-particles-button">Reset Particles</button>
            <div className="background-selector">
                <button onClick={handleDropdown}>
                    Select Background <FaArrowCircleDown />
                </button>
                {dropdownOpen && (
                    <div className="dropdown-menu">
                        {backgrounds.map((bg, index) => (
                            <button key={index} onClick={() => handleBackgroundChange(bg)}>
                                Background {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <h1>Welcome to the Study Zone</h1>
            <Link to="/" className="back-home-button">Home</Link>
        </div>
    );
};

export default StudyZone;
