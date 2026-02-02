import { gateway } from 'ai';
import { streamText, convertToModelMessages } from 'ai';

// Configure for Edge Runtime
export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // CORS is handled by vercel.json headers, but we can add them to response if needed.
  // In Edge runtime, req is a standard Request object.

  // Handle preflight if not handled by Vercel rewrites/headers
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  // Validate API key is present
  if (!process.env.AI_GATEWAY_API_KEY) {
    console.error('❌ Missing AI_GATEWAY_API_KEY environment variable');
    return new Response(JSON.stringify({
      error: 'Configuration error',
      message: 'AI Gateway API key is not configured.'
    }), { status: 500 });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid request: messages array required' }), { status: 400 });
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

    // Return the AI SDK UI message stream response (compatible with installed SDK version)
    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error('Chat API Error:', error);

    return new Response(JSON.stringify({
      error: 'Chat API Error',
      message: error?.message || 'Unknown error occurred'
    }), { status: 500 });
  }
}
