import React from 'react';
import { motion } from 'framer-motion';
import { BsFillGrid3X3GapFill, BsList, BsGridFill } from 'react-icons/bs';

export type ViewMode = 'grid' | 'list' | 'compact';

interface ViewModeToggleProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ currentMode, onModeChange }) => {
  const modes: { mode: ViewMode; icon: React.ReactElement; label: string }[] = [
    { mode: 'grid', icon: <BsFillGrid3X3GapFill />, label: 'Grid' },
    { mode: 'list', icon: <BsList />, label: 'List' },
    { mode: 'compact', icon: <BsGridFill />, label: 'Compact' },
  ];

  return (
    <div className="view-mode-toggle">
      {modes.map(({ mode, icon, label }) => (
        <motion.button
          key={mode}
          className={`view-mode-btn ${currentMode === mode ? 'active' : ''}`}
          onClick={() => onModeChange(mode)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Switch to ${label} view`}
          title={`${label} view`}
        >
          {icon}
        </motion.button>
      ))}
    </div>
  );
};

export default React.memo(ViewModeToggle);
