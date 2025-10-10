// ProjectCard.tsx
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { cardVariants, imageVariants, badgePulseVariants } from '../utils/animationVariants';
import TechIcon from './TechIcon';

interface ProjectProps {
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
  };
  onCardClick?: () => void;
  index?: number;
}

const ProjectCard: React.FC<ProjectProps> = ({ project, onCardClick, index = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Intersection Observer for scroll animations
  React.useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`project-card ${project.featured ? 'featured' : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      exit="exit"
      custom={index}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onCardClick}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
    >
      <motion.div
        className="project-image-wrapper"
        variants={imageVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
      >
        <img src={project.imageUrl} alt={project.title} className="project-image" />
        {isHovered && <div className="image-overlay" />}
      </motion.div>

      <div className="project-info" style={{ transform: "translateZ(50px)" }}>
        <div className="project-header">
          <h3>{project.title}</h3>
          {project.featured && (
            <motion.span
              className="featured-badge"
              variants={badgePulseVariants}
              initial="initial"
              animate="animate"
            >
              Featured
            </motion.span>
          )}
        </div>
        {project.category && project.year && (
          <div className="project-meta">
            <span className="category-badge">{project.category}</span>
            <span className="year-badge">{project.year}</span>
          </div>
        )}
        <p>{project.description}</p>
        <div className="tech-stack">
          {project.techStack.slice(0, 8).map((tech, idx) => (
            <TechIcon key={idx} tech={tech} index={idx} showLabel={true} />
          ))}
          {project.techStack.length > 8 && (
            <span className="tech-item more">+{project.techStack.length - 8} more</span>
          )}
        </div>
        <div className="project-links">
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub /> GitHub
          </motion.a>
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaExternalLinkAlt /> Live Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(ProjectCard);
