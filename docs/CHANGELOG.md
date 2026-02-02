# Changelog

All notable changes to Francisco Barrios's Portfolio Website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2025-10-07

### 🤖 AI Chatbot Enhancement

#### Added
- **Vercel AI SDK Integration**: Migrated from OpenAI Assistant API to Vercel AI SDK with Groq provider
  - Implemented real-time streaming chat responses
  - Using `llama-3.3-70b-versatile` model for fast, high-quality responses
  - Created serverless API endpoint at `/api/chat.ts`

- **New Dependencies**:
  - `@ai-sdk/react@^2.0.60` - React hooks for AI SDK
  - `@ai-sdk/groq@^2.0.22` - Groq provider for AI SDK
  - `ai@^5.0.60` - Core AI SDK package
  - `@vercel/node@^5.3.26` - Vercel serverless function types

- **Environment Configuration**:
  - `.env` - Environment variables with Groq API key
  - `.env.example` - Template for environment variables
  - `vercel.json` - Vercel deployment configuration

- **System Prompt**: Custom AI personality highlighting Francisco's skills:
  - Software Engineering expertise
  - DevOps and Cloud Infrastructure knowledge
  - Cybersecurity and InfoSec capabilities
  - Full-stack development proficiency
  - Currently available for hire

#### Changed
- **Updated Components**:
  - `src/components/Assistant.tsx` - Migrated to use `useChat` hook from AI SDK
  - `src/components/ChatBox.tsx` - Migrated to use `useChat` hook from AI SDK
  - Both components now support real-time streaming responses
  - Improved error handling and loading states

- **Enhanced Styling** (`src/assets/scss/_Assistant.scss`):
  - Modern glassmorphism design with backdrop blur effects
  - Smooth fade-in animations for new messages
  - Bounce animation for chat toggle button
  - Custom scrollbar with theme-aware colors
  - Improved button interactions with gradient backgrounds
  - Enhanced dark mode support with better contrast
  - Responsive design improvements for mobile devices

#### Removed
- `src/services/AssistantService.ts` - No longer needed with AI SDK

### 🎨 UI/UX Improvements

#### Enhanced Visual Design
- **Chat Toggle Button**:
  - Increased size from 50px to 60px for better visibility
  - Added cubic-bezier easing for smooth scale transforms
  - Implemented bounce animation on hover
  - Enhanced box shadow effects

- **Chat Container**:
  - Glassmorphism design with gradient backgrounds
  - Backdrop blur (10px) for modern aesthetic
  - Improved border styling with theme colors
  - Subtle elevation with layered shadows
  - Smooth entrance animation (fadeInUp)

- **Message Bubbles**:
  - Gradient backgrounds for user messages
  - Enhanced spacing and typography
  - Smooth fade-in animation (0.3s ease)
  - Better icon integration with rounded avatars
  - Improved error message styling

- **Input Area**:
  - Modern rounded corners (12px border-radius)
  - Focus states with glow effect
  - Enhanced button with gradient background
  - Disabled states with visual feedback
  - Better placeholder styling

- **Help Menu**:
  - Gradient button with rotation animation on hover
  - Dropdown with smooth animations
  - Hover effects with translateX movement
  - Better visual hierarchy

#### Dark Mode Enhancements
- Improved glassmorphism for dark backgrounds
- Enhanced contrast for better readability
- Theme-aware scrollbar colors
- Adjusted shadow opacities for depth
- Better border visibility with rgba colors

### 🔧 Technical Improvements

#### API Architecture
- **Serverless Function** (`api/chat.ts`):
  - CORS enabled for cross-origin requests
  - Streaming response support
  - Error handling with user-friendly messages
  - Environment variable configuration
  - Maximum duration: 30 seconds

#### Build Configuration
- **Vercel Configuration** (`vercel.json`):
  - API routes properly configured
  - SPA fallback routing to index.html
  - Serverless function runtime settings
  - CORS headers for API endpoints
  - Build and output directory specifications

#### State Management
- Replaced manual state handling with AI SDK's `useChat` hook
- Automatic message synchronization
- Built-in loading and error states
- Stream status management (ready, submitted, streaming)
- Simplified message structure

### 📁 File Structure Changes

#### Created
```
/api/chat.ts                    # Serverless API endpoint
/vercel.json                    # Vercel deployment config
/.env                          # Environment variables
/.env.example                  # Environment template
/docs/CHANGELOG.md            # This file
```

#### Modified
```
/src/components/Assistant.tsx           # Main page chatbot
/src/components/ChatBox.tsx            # 3D portfolio chatbot
/src/assets/scss/_Assistant.scss       # Enhanced styling
/package.json                          # Updated dependencies
```

#### Removed
```
/src/services/AssistantService.ts      # Deprecated service
```

### 🚀 Deployment Notes

- Project now requires Groq API key in environment variables
- Compatible with Vercel serverless deployment
- API endpoint: `/api/chat` (POST)
- Frontend automatically connects to API via AI SDK transport

### 🐛 Bug Fixes

- Fixed TypeScript errors in chat components
- Resolved import path issues with AI SDK
- Corrected message rendering for streaming responses
- Fixed form submission handling

### ⚡ Performance Improvements

- Streaming responses provide faster perceived performance
- Optimized re-renders with proper React hooks
- Reduced bundle size by removing unused OpenAI SDK code
- Efficient message state management

---

## [1.0.0] - Initial Release

### Added
- Initial portfolio website with React, TypeScript, and Vite
- 3D portfolio showcase using Three.js and React Three Fiber
- Interactive 3D models (various tech icons, projects)
- Dark mode toggle functionality
- Resume viewer and download functionality
- Project showcase section
- Study Zone feature
- About Me page
- Contact form integration
- Responsive design for mobile and desktop
- Background music player
- Particle effects background
- Original AI chatbot (OpenAI Assistant API)
- SCSS styling system with variables
- Docker containerization
- Professional animations and transitions

### Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Styling**: SASS/SCSS
- **Icons**: FontAwesome, React Icons
- **Animations**: Framer Motion
- **Forms**: Formspree
- **Build**: Vite
- **Containerization**: Docker

---

## Future Enhancements

### Planned Features
- [ ] Analytics integration
- [ ] Blog section
- [ ] Testimonials page
- [ ] More interactive 3D elements
- [ ] Performance optimizations
- [ ] SEO improvements
- [ ] Accessibility enhancements (WCAG compliance)
- [ ] Multi-language support
- [ ] Project filtering and search
- [ ] Interactive resume timeline

### Under Consideration
- GraphQL API integration
- Progressive Web App (PWA) features
- Advanced animations with GSAP
- WebGL shader effects
- Voice interaction for chatbot
- Integration with more AI models
- Real-time collaboration features

---

## Notes

### Version Numbering
- **MAJOR** version for incompatible API changes
- **MINOR** version for new features (backwards-compatible)
- **PATCH** version for bug fixes (backwards-compatible)

### Contributing
This is a personal portfolio project, but suggestions and feedback are welcome!

### Support
For issues or questions, please contact Francisco Barrios.
