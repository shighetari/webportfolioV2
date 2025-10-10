# Portfolio Documentation

Welcome to the documentation for Francisco Barrios's Portfolio Website!

## 📚 Documentation Index

### [CHANGELOG.md](./CHANGELOG.md)
**Complete version history and change tracking**

Track all modifications, enhancements, and updates made to the portfolio website. Organized by version with detailed descriptions of features, fixes, and improvements.

**Latest Version**: 1.1.0 (AI Chatbot Enhancement)

---

### [AI_CHATBOT.md](./AI_CHATBOT.md)
**Technical documentation for the AI chatbot feature**

Comprehensive guide covering:
- Architecture and technology stack
- Implementation details
- Configuration and customization
- Troubleshooting and debugging
- Performance optimization
- Security considerations

**Perfect for**: Understanding how the chatbot works and making modifications

---

### [DEPLOYMENT.md](./DEPLOYMENT.md)
**Complete deployment guide for Vercel**

Step-by-step instructions for:
- Quick deployment options
- Environment configuration
- Build process
- Custom domain setup
- Monitoring and maintenance
- Troubleshooting

**Perfect for**: Deploying to production or setting up development environment

---

## 🚀 Quick Start

### For Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd webportfolioV2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env and add your GROQ_API_KEY
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### For Deployment

1. **Read** [DEPLOYMENT.md](./DEPLOYMENT.md)
2. **Configure** environment variables on Vercel
3. **Deploy** with `vercel --prod`

---

## 📋 Documentation Standards

All documentation in this folder follows these principles:

- ✅ **Clear and Concise**: Easy to understand language
- ✅ **Up-to-Date**: Reflects current codebase
- ✅ **Actionable**: Practical examples and code snippets
- ✅ **Searchable**: Well-organized with clear headings
- ✅ **Versioned**: Dated and version-tracked

---

## 🔄 Keeping Documentation Updated

When making changes to the project:

1. **Update CHANGELOG.md**
   - Add entry under appropriate version
   - Categorize as Added, Changed, Removed, or Fixed
   - Include file paths and brief descriptions

2. **Update Technical Docs** (if needed)
   - AI_CHATBOT.md for chatbot changes
   - DEPLOYMENT.md for build/deploy changes

3. **Version Bumps**
   - MAJOR: Breaking changes
   - MINOR: New features
   - PATCH: Bug fixes

---

## 📖 Additional Resources

### Project Files

- `package.json` - Dependencies and scripts
- `vercel.json` - Deployment configuration
- `vite.config.ts` - Build configuration
- `.env.example` - Environment variable template

### External Documentation

- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Groq Documentation](https://console.groq.com/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

## 🤝 Contributing

This is a personal portfolio project, but suggestions are welcome!

If you find issues or have suggestions:
1. Document the issue clearly
2. Include steps to reproduce (if applicable)
3. Suggest potential solutions

---

## 📞 Support

**Project Owner**: Francisco Barrios

For technical questions or issues:
- Review the relevant documentation file
- Check the troubleshooting sections
- Review error logs in development console

---

## 📜 License

This is a personal portfolio project. All rights reserved.

---

## 🗂️ Document Structure

```
docs/
├── README.md           # This file - Documentation index
├── CHANGELOG.md        # Version history and changes
├── AI_CHATBOT.md      # AI chatbot technical documentation
└── DEPLOYMENT.md      # Deployment and configuration guide
```

---

**Last Updated**: October 7, 2025
**Documentation Version**: 1.0
