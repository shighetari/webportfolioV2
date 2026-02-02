export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    techStack: string[];
    githubUrl: string;
    liveUrl: string;
    category: string;
    featured: boolean;
    year: number;
}

export const fetchProjects = async (): Promise<Project[]> => {
    // Determine API URL based on environment
    // Use import.meta.env.DEV to check if we are in development mode
    const apiBase = import.meta.env.DEV ? 'http://localhost:3001' : '';

    // In production, the API is likely served relative to the root or handled by Vercel functions
    // If it's Vercel, it might be /api/projects directly.
    // The previous code had `${apiBase}/api/projects`.

    const response = await fetch(`${apiBase}/api/projects`);

    if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
    }

    return response.json();
};
