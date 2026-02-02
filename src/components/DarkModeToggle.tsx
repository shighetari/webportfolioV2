// src/components/DarkModeToggle.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../hooks/DarkModeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import '../assets/scss/_DarkModeToggle.scss';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    toggleDarkMode();
  };

  return (
    <div className="dark-mode-toggle-container">
      <motion.button
        onClick={handleToggle}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`dark-mode-toggle ${darkMode ? 'dark' : 'light'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <AnimatePresence mode="wait">
          {darkMode ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -180, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 180, scale: 0 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
              className="icon-wrapper"
            >
              <FaMoon />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: 180, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -180, scale: 0 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
              className="icon-wrapper"
            >
              <FaSun />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ripple effect on click */}
        <motion.div
          className="ripple"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="tooltip"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DarkModeToggle;
