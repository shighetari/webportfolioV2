import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import Navigation from './Navigation';
import ProjectModal from './ProjectModal';
import ViewModeToggle, { ViewMode } from './ViewModeToggle';
import SkeletonCard from './SkeletonCard';
import { useDebounce } from '../hooks/useDebounce';
import { containerVariants, fadeInUpVariants, countVariants } from '../utils/animationVariants';
import { useProjects } from '../hooks/useProjects';
import { Project } from '../services/projectService';
import "../assets/scss/_Projects.scss";

const Projects: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Use custom hook for data fetching
    const { projects: projectsData, isLoading, error } = useProjects();

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const categories = ['All', 'AI/ML', 'DevOps', 'Frontend', 'Backend', 'Fullstack'];

    // Memoized filtered and sorted projects
    const sortedProjects = useMemo(() => {
        const filtered = projectsData.filter(project => {
            const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
            const matchesSearch = project.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                project.techStack.some(tech => tech.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
            return matchesCategory && matchesSearch;
        });

        return [...filtered].sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return (b.year || 0) - (a.year || 0);
        });
    }, [selectedCategory, debouncedSearchTerm, projectsData]);

    const handleCardClick = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProject(null), 300);
    };

    return (
        <>
            <Navigation />
            <div className="projects-container page-with-nav">
                <motion.div
                    className="projects-header"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h1>Projects</h1>
                    <p className="projects-subtitle">
                        {projectsData.length > 0
                            ? `${projectsData.length} projects across AI/ML, DevOps, fullstack, frontend, and backend development`
                            : 'Loading projects...'}
                    </p>

                    <div className="projects-filters">
                        <motion.input
                            type="text"
                            placeholder="Search projects..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            whileFocus={{ scale: 1.01 }}
                        />
                        <div className="category-filters">
                            {categories.map(category => (
                                <motion.button
                                    key={category}
                                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {category}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <div className="projects-controls">
                        <motion.div
                            className="projects-count"
                            variants={countVariants}
                            initial="hidden"
                            animate="visible"
                            key={sortedProjects.length}
                        >
                            Showing {sortedProjects.length} of {projectsData.length} projects
                        </motion.div>
                        <ViewModeToggle currentMode={viewMode} onModeChange={setViewMode} />
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            className={`projects-grid ${viewMode}`}
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {[...Array(6)].map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </motion.div>
                    ) : error ? (
                        <motion.div
                            className="error-message"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <p>{error}</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            className={`projects-grid ${viewMode}`}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            key="projects"
                        >
                            {sortedProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    onCardClick={() => handleCardClick(project)}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isLoading && !error && sortedProjects.length === 0 && (
                    <motion.div
                        className="no-projects"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p>No projects found matching your criteria.</p>
                    </motion.div>
                )}
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default Projects;
