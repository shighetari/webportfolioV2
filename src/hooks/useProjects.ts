import { useState, useEffect } from 'react';
import { Project, fetchProjects } from '../services/projectService';

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                setIsLoading(true);
                const data = await fetchProjects();
                setProjects(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError('Failed to load projects. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        loadProjects();
    }, []);

    return { projects, isLoading, error };
};
