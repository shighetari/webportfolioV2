import React from 'react';
import { motion } from 'framer-motion';
import { skeletonVariants } from '../utils/animationVariants';

const SkeletonCard: React.FC = () => {
  return (
    <motion.div
      className="skeleton-card"
      variants={skeletonVariants}
      initial="initial"
      animate="animate"
    >
      <div className="skeleton-image" />
      <div className="skeleton-content">
        <div className="skeleton-title" />
        <div className="skeleton-meta">
          <div className="skeleton-badge" />
          <div className="skeleton-badge" />
        </div>
        <div className="skeleton-description">
          <div className="skeleton-line" />
          <div className="skeleton-line" />
          <div className="skeleton-line short" />
        </div>
        <div className="skeleton-tech">
          <div className="skeleton-tech-item" />
          <div className="skeleton-tech-item" />
          <div className="skeleton-tech-item" />
          <div className="skeleton-tech-item" />
        </div>
        <div className="skeleton-buttons">
          <div className="skeleton-button" />
          <div className="skeleton-button" />
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(SkeletonCard);
