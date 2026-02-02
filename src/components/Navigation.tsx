import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaBriefcase, FaGraduationCap, FaCode, FaRocket } from 'react-icons/fa';
import DarkModeToggle from './DarkModeToggle';
import '../assets/scss/_Navigation.scss';

interface NavigationProps {
  variant?: 'default' | 'minimal';
  showDarkModeToggle?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ variant = 'default', showDarkModeToggle = true }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/aboutme', label: 'About', icon: <FaUser /> },
    { path: '/projects', label: 'Projects', icon: <FaBriefcase /> },
    { path: '/anbu', label: 'ANBU', icon: <FaRocket /> },
    { path: '/portfolio', label: 'Portfolio', icon: <FaCode /> },
    { path: '/study', label: 'Study', icon: <FaGraduationCap /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`main-navigation ${variant}`}>
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.path} className={isActive(item.path) ? 'active' : ''}>
            <Link to={item.path} className="nav-link">
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      {showDarkModeToggle && (
        <div className="nav-dark-mode-toggle">
          <DarkModeToggle />
        </div>
      )}
    </nav>
  );
};

export default Navigation;
