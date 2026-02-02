import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
        return res.status(500).json({ error: 'Notion configuration missing' });
    }

    try {
        const response = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Notion API returned ${response.status}: ${errorText}`);
        }

        const data = await response.json();

        // Safe type casting for the response
        const results = data.results || [];

        const projects = results.map((page: any) => {
            const props = page.properties;

            // Helper to safely get property values
            const getText = (prop: any) => prop?.rich_text?.[0]?.plain_text || '';
            const getTitle = (prop: any) => prop?.title?.[0]?.plain_text || '';
            const getSelect = (prop: any) => prop?.select?.name || '';
            const getMultiSelect = (prop: any) => prop?.multi_select?.map((item: any) => item.name) || [];
            const getNumber = (prop: any) => prop?.number || 0;
            const getUrl = (prop: any) => prop?.url || '';
            const getCheckbox = (prop: any) => prop?.checkbox || false;
            const getImage = (cover: any) => {
                if (cover?.type === 'external') return cover.external.url;
                if (cover?.type === 'file') return cover.file.url;
                return '';
            };

            return {
                id: page.id,
                title: getTitle(props.Name),
                description: getText(props.Description),
                imageUrl: getImage(page.cover) || props.Image?.files?.[0]?.name || '', // Fallback to Image property if cover is missing
                techStack: getMultiSelect(props.Tags),
                githubUrl: getUrl(props.Github),
                liveUrl: getUrl(props.LiveLink),
                category: getSelect(props.Category),
                featured: getCheckbox(props.Featured),
                year: getNumber(props.Year),
            };
        });

        res.status(200).json(projects);
    } catch (error: any) {
        console.error('Notion API Error:', error);
        res.status(500).json({ error: 'Failed to fetch projects', details: error.message });
    }
}
