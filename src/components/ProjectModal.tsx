import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { modalVariants, backdropVariants, techItemVariants } from '../utils/animationVariants';
import '../assets/scss/_ProjectModal.scss';

interface ProjectModalProps {
  project: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    techStack: string[];
    githubUrl: string;
    liveUrl: string;
    category?: string;
    featured?: boolean;
    year?: number;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="project-modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="project-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close modal">
              <FaTimes />
            </button>

            <div className="modal-content">
              <div className="modal-image-container">
                <img src={project.imageUrl} alt={project.title} className="modal-image" />
                {project.featured && (
                  <motion.span
                    className="modal-featured-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                  >
                    Featured
                  </motion.span>
                )}
              </div>

              <div className="modal-info">
                <div className="modal-header">
                  <h2>{project.title}</h2>
                  <div className="modal-meta">
                    {project.category && (
                      <span className="modal-category-badge">{project.category}</span>
                    )}
                    {project.year && (
                      <span className="modal-year-badge">{project.year}</span>
                    )}
                  </div>
                </div>

                <p className="modal-description">{project.description}</p>

                <div className="modal-tech-stack">
                  <h3>Technologies Used</h3>
                  <div className="tech-items">
                    {project.techStack.map((tech, index) => (
                      <motion.span
                        key={index}
                        className="tech-item"
                        custom={index}
                        variants={techItemVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="modal-actions">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn github-btn"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub /> View Code
                  </motion.a>
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn live-btn"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(ProjectModal);
