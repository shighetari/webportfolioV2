import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchProjects } from './projectService';

describe('projectService', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('fetches projects successfully', async () => {
        const mockProjects = [
            { id: '1', title: 'Test Project', description: 'Test', imageUrl: '', techStack: [], githubUrl: '', liveUrl: '', category: 'All', featured: false, year: 2024 }
        ];

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockProjects),
        });

        const projects = await fetchProjects();
        expect(projects).toEqual(mockProjects);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('throws an error when fetch fails', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error'
        });

        await expect(fetchProjects()).rejects.toThrow('Failed to fetch projects: 500 Internal Server Error');
    });
});
