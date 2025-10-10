import React from 'react';
import { motion } from 'framer-motion';
import { getTechIcon } from '../utils/techStackIcons';

interface TechIconProps {
  tech: string;
  index?: number;
  showLabel?: boolean;
  className?: string;
}

const TechIcon: React.FC<TechIconProps> = ({
  tech,
  index = 0,
  showLabel = true,
  className = ''
}) => {
  const icon = getTechIcon(tech);

  if (!icon && !showLabel) {
    return null;
  }

  return (
    <motion.span
      className={`tech-icon ${className}`}
      custom={index}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.05,
        duration: 0.3,
        ease: 'backOut',
      }}
      whileHover={{
        scale: 1.1,
        y: -3,
        transition: { duration: 0.2 },
      }}
    >
      {icon && <span className="tech-icon-svg">{icon}</span>}
      {showLabel && <span className="tech-label">{tech}</span>}
    </motion.span>
  );
};

export default React.memo(TechIcon);
