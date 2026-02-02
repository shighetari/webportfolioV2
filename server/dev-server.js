import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { gateway } from 'ai';
import { streamText, convertToModelMessages } from 'ai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3001;

// Check for required environment variables
if (!process.env.AI_GATEWAY_API_KEY) {
  console.error(`
❌ ERROR: Missing AI_GATEWAY_API_KEY environment variable!

The chatbot requires a Vercel AI Gateway API key to function.

To fix this:
1. Get your API key from: https://vercel.com/dashboard/ai
2. Create a .env file in the project root (if it doesn't exist)
3. Add the following line:
   AI_GATEWAY_API_KEY=your_api_key_here

4. Restart the server with: npm run dev:full
  `);
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// Projects API endpoint (mimics Vercel serverless function)
app.get('/api/projects', async (req, res) => {
  try {
    if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
      console.error('❌ Missing Notion configuration');
      return res.status(500).json({ error: 'Notion configuration missing' });
    }

    console.log('📚 Fetching projects from Notion...');

    const response = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Notion API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const results = data.results || [];



    const projects = results.map((page) => {
      const props = page.properties;

      // Helper to safely get property values
      const getText = (prop) => prop?.rich_text?.[0]?.plain_text || '';
      const getTitle = (prop) => prop?.title?.[0]?.plain_text || '';
      const getSelect = (prop) => prop?.select?.name || '';
      const getMultiSelect = (prop) => prop?.multi_select?.map((item) => item.name) || [];
      const getNumber = (prop) => prop?.number || 0;
      const getUrl = (prop) => prop?.url || '';
      const getCheckbox = (prop) => prop?.checkbox || false;
      const getImage = (cover) => {
        if (cover?.type === 'external') return cover.external.url;
        if (cover?.type === 'file') return cover.file.url;
        return '';
      };

      return {
        id: page.id,
        title: getTitle(props['Project Name']),
        description: getText(props.Description),
        imageUrl: getImage(page.cover) || '/project-placeholder.png',
        techStack: getMultiSelect(props['Tech Stack']),
        githubUrl: getUrl(props['GitHub Repo']),
        liveUrl: getUrl(props['Live Demo']),
        category: getSelect(props.Category),
        featured: getCheckbox(props.Featured),
        year: new Date(page.created_time).getFullYear(), // Fallback to created_time year since Year prop is missing
      };
    });

    console.log(`✅ Successfully fetched ${projects.length} projects`);
    res.json(projects);
  } catch (error) {
    console.error('❌ Projects API Error:', error);
    res.status(500).json({
      error: 'Failed to fetch projects',
      details: error.message
    });
  }
});

// Chat API endpoint (mimics Vercel serverless function)
app.post('/api/chat', async (req, res) => {
  try {
    console.log('📨 Received chat request');

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: messages array required' });
    }

    console.log('🤖 Generating response with AI Gateway...');

    // Create streaming response using AI Gateway
    const result = await streamText({
      model: gateway('groq/llama-3.3-70b-versatile'),
      messages: convertToModelMessages(messages),
      system: `You are a helpful AI assistant on Francisco Barrios's portfolio website.

Francisco is a talented Software Engineer, DevOps Engineer, and Security Enthusiast with expertise in:
- Full-stack development (React, TypeScript, Node.js, Python)
- Cloud infrastructure and DevOps (AWS, Docker, Kubernetes)
- Cybersecurity and InfoSec
- AI/ML integration and automation

When visitors ask about Francisco:
- Highlight his diverse technical skills and experience
- Mention his passion for technology, security, and innovative solutions
- Emphasize his ability to wear "many hats" and adapt to different roles
- Note that he's currently available for hire and open to new opportunities
- Be enthusiastic and professional about his capabilities

When asked general questions, be helpful, friendly, and concise. Always maintain a professional yet approachable tone.`,
    });

    // Convert AI SDK Response to Express response using toUIMessageStreamResponse
    const response = result.toUIMessageStreamResponse();

    // Copy headers from AI SDK response to Express response
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Pipe the stream to Express response
    const reader = response.body.getReader();

    async function pump() {
      const { done, value } = await reader.read();
      if (done) {
        res.end();
        console.log('✅ Response sent successfully');
        return;
      }
      res.write(value);
      pump();
    }

    pump();
  } catch (error) {
    console.error('❌ Chat API Error:', error);

    // Provide more helpful error messages
    let errorMessage = error?.message || 'Unknown error occurred';
    let statusCode = 500;

    if (error?.message?.includes('API key')) {
      errorMessage = 'AI Gateway API key is invalid or missing. Please check your .env file.';
      statusCode = 401;
    } else if (error?.message?.includes('network') || error?.message?.includes('ECONNREFUSED')) {
      errorMessage = 'Unable to connect to AI Gateway. Please check your internet connection.';
      statusCode = 503;
    } else if (error?.message?.includes('rate limit')) {
      errorMessage = 'AI Gateway rate limit exceeded. Please try again in a moment.';
      statusCode = 429;
    }

    res.status(statusCode).json({
      error: 'Chat API Error',
      message: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Local dev server is running',
    aiGatewayConfigured: !!process.env.AI_GATEWAY_API_KEY
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 Local API Server Running!

   URL: http://localhost:${PORT}
   Chat endpoint: http://localhost:${PORT}/api/chat
   Health check: http://localhost:${PORT}/api/health

   AI Gateway API Key: ${process.env.AI_GATEWAY_API_KEY ? '✅ Configured' : '❌ Missing'}

   Ready to receive requests from Vite dev server!
  `);
});
