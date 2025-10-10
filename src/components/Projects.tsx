import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import Navigation from './Navigation';
import ProjectModal from './ProjectModal';
import ViewModeToggle, { ViewMode } from './ViewModeToggle';
import SkeletonCard from './SkeletonCard';
import { useDebounce } from '../hooks/useDebounce';
import { containerVariants, fadeInUpVariants, countVariants } from '../utils/animationVariants';
import "../assets/scss/_Projects.scss";

const projectsData = [
  {
    id: 1,
    title: "ANBU AI - Enterprise AI Integration Platform",
    description: "AI platform that integrates LLMs into existing business workflows. Cut implementation time from months to weeks, processing 10K+ daily requests with 99.9% uptime.",
    imageUrl: "projects/anbu-ai.png",
    techStack: ["Next.js", "TypeScript", "OpenAI API", "Pinecone", "PostgreSQL", "Docker", "Kubernetes", "AWS", "Redis"],
    githubUrl: "https://github.com/anbu-solutions/ai-platform",
    liveUrl: "https://anbu.ai",
    category: "AI/ML",
    featured: true,
    year: 2024
  },
  {
    id: 2,
    title: "Intelligent Document Processing System",
    description: "AI document processor using computer vision and NLP. 96% classification accuracy, 85% reduction in manual processing time.",
    imageUrl: "projects/document-ai.png",
    techStack: ["Python", "FastAPI", "TensorFlow", "PyTorch", "Tesseract OCR", "spaCy", "MongoDB", "Celery", "Redis"],
    githubUrl: "https://github.com/shighetari/document-processing-ai",
    liveUrl: "https://docs-ai-demo.anbu.ai",
    category: "AI/ML",
    featured: true,
    year: 2024
  },
  {
    id: 6,
    title: "DevOps CI/CD Pipeline Automation",
    description: "Automated CI/CD with Infrastructure as Code. 2 hours → 8 minutes deployment time, 99.9% reliability.",
    imageUrl: "projects/devops-pipeline.png",
    techStack: ["GitLab CI", "Docker", "Kubernetes", "Terraform", "Ansible", "Prometheus", "Grafana", "ArgoCD", "Vault"],
    githubUrl: "https://github.com/shighetari/cicd-automation",
    liveUrl: "https://devops.anbu.ai",
    category: "DevOps",
    featured: true,
    year: 2024
  },
  {
    id: 10,
    title: "Conway's Game of Life Simulator",
    description: "Interactive Conway's Game of Life with React and Canvas API. Responsive design with play/pause and random generation.",
    imageUrl: "projects/pink.JPG",
    techStack: ["React", "Redux", "Canvas API"],
    githubUrl: "https://github.com/shighetari/ConwaysGOL",
    liveUrl: "https://conways-gol.vercel.app/",
    category: "Frontend",
    year: 2020
  },
  {
    id: 11,
    title: "Secret Family Recipes API",
    description: "RESTful API for recipe sharing with JWT auth and comprehensive security middleware. Full API documentation included.",
    imageUrl: "projects/secretfamilyanimeai.png",
    techStack: ["Node.js", "Express.js", "PostgreSQL", "knex", "Jest", "bcrypt", "JWT"],
    githubUrl: "https://github.com/secret-family-recipes-bw/back-end",
    liveUrl: "https://secret-family-recipes-2-api.herokuapp.com/",
    category: "Backend",
    year: 2020
  },
  {
    id: 12,
    title: "Ecosoap Backend Developer",
    description: "Backend for sustainable soap recycling platform. Optimized database operations and server logic for global impact.",
    imageUrl: "projects/ecosoap.avif",
    techStack: ["React", "Redux", "Node.js", "Express.js", "PostgreSQL", "Stripe", "Cloudinary", "Heroku"],
    githubUrl: "https://github.com/BloomTech-Labs/Labs27-A-Ecosoap-FE",
    liveUrl: "https://www.youtube.com/watch?v=ST1ois1TUYs",
    category: "Fullstack",
    year: 2020
  }
];

const Projects: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
    }, [selectedCategory, debouncedSearchTerm]);

    // Simulate loading when filters change
    React.useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(timer);
    }, [selectedCategory, debouncedSearchTerm]);

    const handleCardClick = (project: typeof projectsData[0]) => {
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
                        {projectsData.length} projects across AI/ML, DevOps, fullstack, frontend, and backend development
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

                {!isLoading && sortedProjects.length === 0 && (
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
