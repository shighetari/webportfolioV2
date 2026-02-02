import { gateway } from 'ai';
import { streamText, convertToModelMessages } from 'ai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Allow CORS for local development
export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate API key is present
  if (!process.env.AI_GATEWAY_API_KEY) {
    console.error('❌ Missing AI_GATEWAY_API_KEY environment variable');
    return res.status(500).json({
      error: 'Configuration error',
      message: 'AI Gateway API key is not configured. Please contact the site administrator.'
    });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: messages array required' });
    }

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

    // Return the AI SDK UI message stream response for useChat compatibility
    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error('Chat API Error:', error);

    // Provide more helpful error messages
    let errorMessage = error?.message || 'Unknown error occurred';
    let statusCode = 500;

    if (error?.message?.includes('API key') || error?.message?.includes('authentication')) {
      errorMessage = 'AI Gateway authentication failed. Please check your API key configuration.';
      statusCode = 401;
    } else if (error?.message?.includes('network') || error?.message?.includes('ECONNREFUSED')) {
      errorMessage = 'Unable to connect to AI Gateway. Please check your internet connection.';
      statusCode = 503;
    } else if (error?.message?.includes('rate limit') || error?.message?.includes('quota')) {
      errorMessage = 'AI Gateway rate limit exceeded. Please try again in a moment.';
      statusCode = 429;
    } else if (error?.message?.includes('timeout')) {
      errorMessage = 'Request timed out. Please try again.';
      statusCode = 504;
    }

    return res.status(statusCode).json({
      error: 'Chat API Error',
      message: errorMessage
    });
  }
}
