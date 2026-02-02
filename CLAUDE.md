# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Francisco's personal portfolio website built with React, TypeScript, and Vite. The project features interactive 3D models, an AI chatbot powered by Vercel AI Gateway, and a creative showcase of professional skills and projects.

## Development Commands

```bash
# Start ONLY Vite dev server (port 5173)
# ⚠️ This will NOT work for the AI chatbot - see below
npm run dev

# Start FULL development environment (Vite + API server)
# ✅ USE THIS for chatbot development (ports 5173 + 3001)
npm run dev:full

# Start ONLY the API server (port 3001)
npm run dev:api

# Test the API server is working
npm run dev:test

# Build for production (runs TypeScript compiler, then Vite build)
npm run build

# Run ESLint checks
npm run lint

# Preview production build locally
npm run preview
```

### ⚠️ Important: AI Chatbot Development

The AI chatbot requires **BOTH** servers running simultaneously:

1. **Vite dev server** (port 5173) - Frontend
2. **Express API server** (port 3001) - Backend API that proxies AI Gateway requests

**Always use `npm run dev:full`** when working on or testing the chatbot. Using only `npm run dev` will cause proxy errors (`ECONNREFUSED`) because the API server won't be running.

**Architecture:**
- Frontend → Vite (localhost:5173)
- Frontend sends chat requests to `/api/chat`
- Vite proxies `/api/*` to localhost:3001
- Express server at port 3001 handles requests with AI Gateway
- AI Gateway routes to Groq/Llama 3.3 70B model

## Docker Commands

```bash
# Build Docker image
docker build -t portfolio .

# Run container (serves on port 5000)
docker run -p 5000:5000 portfolio
```

## Architecture

### Application Structure

- **Entry Point**: `src/main.tsx` → `src/App.tsx`
- **Routing**: React Router with the following routes:
  - `/` - Home page
  - `/portfolio` - ModelViewer (main 3D portfolio showcase)
  - `/study` - StudyZone component
  - `/aboutme` - AboutMe component
  - `/projects` - Projects listing

### Key Directories

- `src/models/` - 3D model components using `@react-three/fiber` and `@react-three/drei` (BMW, Phoenix, Earth, various Linux mascots, etc.)
- `src/components/` - UI components (dialogs, buttons, cards, chat interfaces)
- `src/services/` - API integration layer (AssistantService for OpenAI)
- `src/hooks/` - Custom React hooks (DarkModeContext, useTypewriter)
- `src/data/` - Static data (projectsData.ts)
- `src/config/` - Configuration files (particlesConfig.ts)
- `src/assets/` - Static assets including SCSS stylesheets

### Core Technologies

- **3D Graphics**: `@react-three/fiber` and `@react-three/drei` for Three.js integration
- **Styling**: SASS (`.scss` files in `src/assets/scss/`)
- **State Management**: React Context (DarkModeProvider)
- **Icons**: FontAwesome and react-icons
- **AI Integration**: Vercel AI SDK v5 + AI Gateway with Groq provider

### AI Chatbot Components

The portfolio features **two chatbot components** with different use cases:

1. **Assistant.tsx** - Floating chat widget (bottom-right bubble)
   - Used on: Home page
   - Toggleable interface with fox mascot icon

2. **ChatBox.tsx** - Full-screen chat interface
   - Used on: 3D Portfolio (`/portfolio` route) inside AIDialogBox modal
   - Button-triggered in ModelViewer

**Both components use:**
- `@ai-sdk/react` `useChat` hook
- `DefaultChatTransport` connecting to `/api/chat`
- Same 4 icons: Fox (mascot), Tux (assistant), Kali Linux (user), Arch Linux (input)
- Features: Voice input, message feedback, retry, copy, clear conversation

### Environment Variables

The project uses environment variables for configuration:

**AI Chatbot (Required for chatbot functionality):**
- `AI_GATEWAY_API_KEY` - Vercel AI Gateway API key
  - Get from: https://vercel.com/dashboard/ai
  - Used by both `api/chat.ts` and `server/dev-server.js`
  - **Without this key, the chatbot will not work**

**Legacy (may be unused):**
- `VITE_API_BASE_URL` - Local API base URL
- `VITE_PRODUCTION_API_BASE_URL` - Production API base URL

These should be defined in `.env` file (not tracked in git). See `.env.example` for template.

### 3D Model Integration

3D models are loaded via `useGLTF` from `@react-three/drei`. Models are typically placed in `/public/images/` and loaded using relative paths. The main portfolio showcase (`ModelViewer.tsx`) orchestrates multiple 3D models in a Canvas with OrbitControls.

### Build Output

The Vite build process:
1. Runs TypeScript compiler (`tsc`)
2. Builds optimized bundle to `dist/` directory
3. Docker uses multi-stage build with `serve` to host static files on port 5000

## Code Style

- TypeScript strict mode is enabled
- ESLint configured with TypeScript and React Hooks plugins
- `noUnusedLocals` and `noUnusedParameters` are disabled in tsconfig
- Component exports should follow React Refresh patterns (see `.eslintrc.cjs`)

## Best Practices for Claude Code

### Process Management
- **IMPORTANT**: Always kill/exit all background bash shells and dev servers before submitting final output
- This prevents leaving hanging processes that consume system resources
- Use `KillShell` tool to terminate all background processes started during the session
