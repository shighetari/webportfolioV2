# AI Chatbot Documentation

## Overview

The portfolio website features an intelligent AI chatbot powered by the **Vercel AI SDK** and **Vercel AI Gateway** with **Groq's LLaMA 3.3 70B model**. The chatbot provides visitors with information about Francisco Barrios's skills, experience, and availability for hire.

## Architecture

### Technology Stack

- **Frontend**: Vercel AI SDK React (`@ai-sdk/react`)
- **AI Gateway**: Vercel AI Gateway (unified API for multiple providers)
- **AI Provider**: Groq (via AI Gateway)
- **Model**: `groq/llama-3.3-70b-versatile`
- **Transport**: `DefaultChatTransport` for streaming responses
- **API**: Serverless function on Vercel

### Component Structure

```
┌─────────────────────────────────────┐
│         User Interface              │
│  (Assistant.tsx / ChatBox.tsx)      │
└──────────────┬──────────────────────┘
               │
               │ useChat hook
               │
┌──────────────▼──────────────────────┐
│      DefaultChatTransport           │
│      (HTTP POST to /api/chat)       │
└──────────────┬──────────────────────┘
               │
               │ Streaming Response
               │
┌──────────────▼──────────────────────┐
│      Serverless Function            │
│         (api/chat.ts)               │
└──────────────┬──────────────────────┘
               │
               │ Vercel AI Gateway
               │
┌──────────────▼──────────────────────┐
│      Vercel AI Gateway              │
│    (Routes to AI Providers)         │
└──────────────┬──────────────────────┘
               │
               │ Groq API
               │
┌──────────────▼──────────────────────┐
│      LLaMA 3.3 70B Model            │
│         (Groq via AI Gateway)       │
└─────────────────────────────────────┘
```

## Implementation Details

### 1. Chat Components

#### Main Page Chatbot (`src/components/Assistant.tsx`)

**Features:**
- Floating chat bubble in bottom-right corner
- Click to expand/collapse interface
- Help menu with preset questions
- Real-time streaming responses
- Auto-scroll to latest messages
- Dark mode support
- Click-outside-to-close functionality

**Key Code:**
```typescript
const { messages, sendMessage, status, error } = useChat({
  transport: new DefaultChatTransport({
    api: "/api/chat",
  }),
});
```

#### 3D Portfolio Chatbot (`src/components/ChatBox.tsx`)

**Features:**
- Integrated within modal dialog
- Similar functionality to main chatbot
- Optimized for overlay display
- Shares same API endpoint

### 2. API Endpoint (`api/chat.ts`)

**Responsibilities:**
- Receives chat messages from frontend
- Routes requests through Vercel AI Gateway to Groq API
- Handles CORS for development
- Error handling and logging

**Key Configuration:**
```typescript
import { gateway } from 'ai';

const result = streamText({
  model: gateway('groq/llama-3.3-70b-versatile'),
  messages,
  system: `[Custom system prompt]`,
});
```

**Note:** The AI Gateway automatically uses the `AI_GATEWAY_API_KEY` environment variable for authentication.

### 3. System Prompt

The chatbot uses a carefully crafted system prompt to provide accurate, helpful information:

```
You are a helpful AI assistant on Francisco Barrios's portfolio website.

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

When asked general questions, be helpful, friendly, and concise. Always maintain a professional yet approachable tone.
```

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```bash
# Vercel AI Gateway API Key for AI Chatbot
AI_GATEWAY_API_KEY=your_ai_gateway_api_key_here
```

**Getting a Vercel AI Gateway API Key:**
1. Visit [vercel.com/dashboard/ai](https://vercel.com/dashboard/ai)
2. Sign up or log in to your Vercel account
3. Navigate to AI Gateway settings
4. Create a new AI Gateway API key
5. Copy and paste into `.env` file

**Benefits of AI Gateway:**
- Unified API for multiple AI providers (Groq, OpenAI, Anthropic, etc.)
- Automatic failover and load balancing
- Built-in rate limiting and caching
- Cost tracking and analytics
- No need for provider-specific API keys

### Deployment Configuration

In `vercel.json`, ensure the API function is properly configured:

```json
{
  "functions": {
    "api/**/*.ts": {
      "runtime": "@vercel/node@3",
      "maxDuration": 30
    }
  }
}
```

## Features

### Real-Time Streaming

The chatbot streams responses token-by-token, providing:
- **Faster perceived response time**: Users see the beginning of responses immediately
- **Better UX**: Natural conversation flow
- **Efficient resource usage**: No waiting for complete response generation

### State Management

The AI SDK manages chat state automatically:

- **Messages**: Array of conversation history
- **Status**: Current state (`ready`, `submitted`, `streaming`)
- **Error**: Error object if request fails
- **sendMessage()**: Function to send new messages

### Help Menu

Preset questions for quick access:
- "Who are you?"
- "Who is Francisco?"
- "Why should I hire Francisco?"
- "What are Francisco's technical skills?"
- "Tell me about Francisco's experience"

Users can click any question to auto-populate the input field.

## Styling

### Design Philosophy

- **Glassmorphism**: Semi-transparent backgrounds with backdrop blur
- **Smooth Animations**: Fade-in effects for messages, bounce for interactions
- **Gradients**: Modern gradient backgrounds for buttons and user messages
- **Dark Mode**: Fully supported with optimized contrast

### Key SCSS Variables

From `src/assets/scss/_variables.scss`:

```scss
$color-primary: #4f46e5;        // Indigo 600
$color-accent: #a855f7;         // Purple 500
$background-dark: #0f172a;      // Slate 900
$text-dark: #f1f5f9;           // Slate 100
```

### Animations

```scss
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
```

## Customization Guide

### Changing the AI Model

In `api/chat.ts`, modify the model parameter using AI Gateway format:

```typescript
const result = streamText({
  model: gateway('groq/mixtral-8x7b-32768'),  // Alternative Groq model
  // or gateway('groq/llama-3.1-70b-versatile')
  // or gateway('groq/gemma2-9b-it')
  // or gateway('openai/gpt-4')  // Switch to OpenAI
  // or gateway('anthropic/claude-sonnet-4')  // Switch to Anthropic
  messages,
  system: `...`,
});
```

**Model Format:** `gateway('provider/model-name')`
- **Groq models**: `groq/llama-3.3-70b-versatile`, `groq/mixtral-8x7b-32768`
- **OpenAI models**: `openai/gpt-4`, `openai/gpt-4-turbo`, `openai/gpt-3.5-turbo`
- **Anthropic models**: `anthropic/claude-sonnet-4`, `anthropic/claude-opus-4`

### Updating the System Prompt

Edit the `system` parameter in `api/chat.ts`:

```typescript
system: `Your custom prompt here...`,
```

### Adding More Help Questions

In `Assistant.tsx` or `ChatBox.tsx`:

```typescript
const helpOptions = [
  "Who are you?",
  "Who is Francisco?",
  "Your new question here...",
];
```

### Styling Modifications

Edit `src/assets/scss/_Assistant.scss`:

```scss
.assistant-container {
  width: 420px;              // Chat box width
  border-radius: 16px;       // Corner rounding
  // ... other styles
}
```

## Troubleshooting

### Common Issues

#### 1. API Key Not Working

**Symptoms**: Error message "Sorry, something went wrong"

**Solutions**:
- Verify `.env` file exists in project root
- Check API key is correctly copied (no extra spaces)
- Ensure environment variable is named `AI_GATEWAY_API_KEY`
- In Vercel, add the environment variable in project settings
- Verify the API key is from Vercel AI Gateway (starts with `vck_`)

#### 2. No Response from Chatbot

**Symptoms**: Messages send but no response appears

**Solutions**:
- Check browser console for errors
- Verify `/api/chat` endpoint is accessible
- Ensure Vercel deployment includes the `api` folder
- Check Groq API status at [status.groq.com](https://status.groq.com)

#### 3. TypeScript Errors

**Symptoms**: Build fails with TypeScript errors

**Solutions**:
- Run `npm install` to ensure all dependencies are installed
- Check that you're using correct imports:
  - `import { useChat } from "@ai-sdk/react"`
  - `import { DefaultChatTransport } from "ai"`

#### 4. Streaming Not Working

**Symptoms**: Full response appears at once instead of streaming

**Solutions**:
- Ensure `DefaultChatTransport` is being used
- Check that API endpoint uses `result.pipeDataStreamToResponse(res)`
- Verify CORS headers are properly set

### Debug Mode

Enable detailed logging:

```typescript
// In Assistant.tsx or ChatBox.tsx
const { messages, sendMessage, status, error } = useChat({
  transport: new DefaultChatTransport({
    api: "/api/chat",
  }),
  onError: (error) => {
    console.error("Chat error:", error);
    console.log("Error details:", JSON.stringify(error, null, 2));
  },
  onFinish: (message) => {
    console.log("Message received:", message);
  },
});
```

## Performance Optimization

### Best Practices

1. **Token Throttling**: AI SDK automatically throttles updates for smooth UX
2. **Message Caching**: Conversation history is maintained in React state
3. **Lazy Loading**: Chat component only loads when needed
4. **Debouncing**: Input changes are handled efficiently
5. **Error Boundaries**: Graceful error handling prevents crashes

### Monitoring

Track chatbot performance:
- Message response time
- Error rates
- User engagement (messages per session)
- Popular questions

## Security Considerations

### API Key Protection

- ✅ API key stored in environment variables
- ✅ Never exposed to client-side code
- ✅ `.env` excluded from git via `.gitignore`
- ✅ Server-side API calls only

### CORS Configuration

Production setup should restrict origins:

```typescript
res.setHeader('Access-Control-Allow-Origin', 'https://yourdomain.com');
```

### Rate Limiting

Consider implementing rate limiting in production:

```typescript
// Example with simple in-memory rate limiting
const rateLimit = new Map();

// In API handler
const clientId = req.headers['x-forwarded-for'] || 'unknown';
const now = Date.now();
const limit = rateLimit.get(clientId);

if (limit && now - limit < 1000) {
  return res.status(429).json({ error: 'Too many requests' });
}

rateLimit.set(clientId, now);
```

## Future Enhancements

### Planned Features

- [ ] Conversation persistence (save chat history)
- [ ] Voice input/output
- [ ] Multi-language support
- [ ] Sentiment analysis
- [ ] Suggested follow-up questions
- [ ] Export conversation feature
- [ ] Integration with calendar for scheduling
- [ ] Rich media responses (images, links)
- [ ] Context awareness (page-specific responses)
- [ ] Analytics dashboard

### Advanced Customizations

- Custom AI model fine-tuning with portfolio data
- Integration with knowledge base
- Retrieval Augmented Generation (RAG) for document queries
- Function calling for dynamic data
- Multi-modal support (images, PDFs)

## Resources

### Documentation
- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- [Groq Documentation](https://console.groq.com/docs)
- [React Documentation](https://react.dev)

### Community
- [Vercel AI SDK GitHub](https://github.com/vercel/ai)
- [Groq Community](https://groq.com/community)

### Support
For issues specific to this implementation, contact Francisco Barrios.

---

**Last Updated**: October 7, 2025
**Version**: 1.1.0
