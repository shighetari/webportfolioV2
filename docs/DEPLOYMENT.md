# Deployment Guide

This guide covers deploying Francisco Barrios's Portfolio Website to Vercel with the AI chatbot functionality.

## Prerequisites

Before deploying, ensure you have:

- ✅ Node.js 18+ installed
- ✅ Git repository initialized
- ✅ Vercel account ([sign up here](https://vercel.com/signup))
- ✅ Groq API key ([get one here](https://console.groq.com))
- ✅ Vercel CLI installed (optional but recommended)

## Quick Deploy (Recommended)

### Option 1: Deploy via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect the Vite configuration

3. **Configure Environment Variables**
   - In project settings, add environment variable:
     - **Name**: `AI_GATEWAY_API_KEY`
     - **Value**: Your Vercel AI Gateway API key
     - **Environment**: Production, Preview, Development

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your site is live! 🎉

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Set Environment Variable**
   ```bash
   vercel env add AI_GATEWAY_API_KEY
   # Paste your Vercel AI Gateway API key when prompted
   # Select: Production, Preview, Development
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

5. **Access Your Site**
   ```
   ✅ Production: https://your-project.vercel.app
   ```

## Detailed Setup

### 1. Environment Configuration

#### Local Development

Create `.env` file in project root:

```bash
# Vercel AI Gateway API Key for AI Chatbot
AI_GATEWAY_API_KEY=your_ai_gateway_api_key_here
```

**Important**: Never commit `.env` file to Git!

#### Production Environment

Add environment variables in Vercel:

1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add new variable:
   ```
   Name: AI_GATEWAY_API_KEY
   Value: vck_xxxxxxxxxxxxx
   Scope: Production, Preview, Development
   ```

### 2. Build Configuration

The project uses `vercel.json` for configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "functions": {
    "api/**/*.ts": {
      "runtime": "@vercel/node@3",
      "maxDuration": 30
    }
  }
}
```

**Key Settings:**
- **buildCommand**: Runs TypeScript compilation and Vite build
- **outputDirectory**: Static files output to `dist/`
- **rewrites**: SPA routing and API endpoint configuration
- **functions**: Serverless function configuration (30s max duration)

### 3. Project Structure for Deployment

```
webportfolioV2/
├── api/
│   └── chat.ts              # Serverless API endpoint
├── src/
│   ├── components/          # React components
│   ├── assets/             # Static assets and styles
│   └── ...
├── public/                  # Public static files
├── dist/                   # Build output (auto-generated)
├── docs/                   # Documentation
├── vercel.json             # Vercel configuration
├── .env                    # Local environment (git-ignored)
├── .env.example            # Template for environment vars
└── package.json            # Dependencies and scripts
```

## Build Process

### Local Build Test

Before deploying, test the build locally:

```bash
# Install dependencies
npm install

# Run TypeScript check
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

Access at `http://localhost:4173`

### Vercel Build Process

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **TypeScript Compilation**
   ```bash
   tsc
   ```

3. **Vite Build**
   ```bash
   vite build
   ```
   - Bundles JavaScript
   - Optimizes assets
   - Generates production files in `dist/`

4. **Deploy Serverless Functions**
   - `api/chat.ts` → Deployed as serverless function
   - Automatically configured with Node.js runtime

## Deployment Checklist

### Pre-Deployment

- [ ] All features tested locally
- [ ] No TypeScript errors: `npm run lint`
- [ ] Build successful: `npm run build`
- [ ] Environment variables configured
- [ ] Git repository up to date
- [ ] `.env` file not committed

### Post-Deployment

- [ ] Website loads correctly
- [ ] AI chatbot responds to messages
- [ ] Dark mode toggle works
- [ ] 3D models render properly
- [ ] Forms submit successfully
- [ ] Mobile responsiveness verified
- [ ] Custom domain configured (if applicable)

## Custom Domain Setup

### Adding a Custom Domain

1. **Purchase Domain** (if you don't have one)
   - Recommended: Vercel Domains, Namecheap, Google Domains

2. **Add Domain to Vercel**
   - Project Settings → Domains
   - Enter your domain (e.g., `franciscobarrios.com`)
   - Click "Add"

3. **Configure DNS**

   **Option A: Vercel Nameservers (Recommended)**
   - Vercel will provide nameservers
   - Update at your domain registrar
   - Wait for DNS propagation (up to 48 hours)

   **Option B: A Record**
   - Add A record pointing to `76.76.21.21`
   - Add CNAME for `www` pointing to `cname.vercel-dns.com`

4. **SSL Certificate**
   - Automatically provisioned by Vercel
   - Usually ready within minutes

## Monitoring & Maintenance

### Vercel Analytics

Enable analytics in Vercel dashboard:

1. Project Settings → Analytics
2. Enable Web Analytics
3. View metrics:
   - Page views
   - Top pages
   - Visitor geography
   - Performance metrics

### Performance Monitoring

**Lighthouse Scores** (Target):
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

Run Lighthouse audit:
```bash
npx lighthouse https://your-domain.com --view
```

### Log Monitoring

View real-time logs:

1. Vercel Dashboard → Your Project
2. Click "Logs" or "Runtime Logs"
3. Filter by:
   - Function (`/api/chat`)
   - Status codes
   - Time range

### API Usage Monitoring

**Groq API**:
- Monitor at [console.groq.com](https://console.groq.com)
- Check token usage
- Review API limits
- Monitor rate limits

## Troubleshooting

### Common Deployment Issues

#### 1. Build Fails

**Error**: `TypeScript compilation failed`

**Solution**:
```bash
# Check for type errors locally
npm run lint

# Fix any TypeScript errors
# Then redeploy
```

#### 2. API Endpoint Not Working

**Error**: `404 on /api/chat`

**Checklist**:
- [ ] `api/chat.ts` file exists
- [ ] `vercel.json` has functions configuration
- [ ] File name is exactly `chat.ts` (not `Chat.ts`)

#### 3. Environment Variable Not Working

**Error**: Chatbot shows "Sorry, something went wrong"

**Solution**:
1. Verify environment variable in Vercel settings
2. Ensure variable name is exactly `AI_GATEWAY_API_KEY`
3. Redeploy after adding environment variable

#### 4. Slow Response Times

**Symptoms**: Chatbot takes long to respond

**Solutions**:
- Check Groq API status
- Verify network connectivity
- Consider upgrading Groq plan
- Monitor function execution time in Vercel logs

### Debugging Production Issues

**Enable Debug Logging**:

In `api/chat.ts`, add:

```typescript
console.log('Request received:', {
  method: req.method,
  body: req.body,
  timestamp: new Date().toISOString()
});
```

View logs in Vercel dashboard under "Logs".

## CI/CD Integration

### Automatic Deployments

Vercel automatically deploys:

- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches
- **Pull Request**: Automatic preview deployment

### Deployment Hooks

Configure in Project Settings → Git:

- Auto-deploy on push: ✅ Enabled
- Preview deployments: ✅ Enabled
- Production branch: `main`

## Performance Optimization

### Build Optimizations

Already configured in `vite.config.ts`:

- Code splitting
- Tree shaking
- Asset optimization
- Minification

### Runtime Optimizations

- Serverless function caching
- Edge network distribution
- Automatic asset compression (Brotli, Gzip)
- Image optimization (if using Vercel Image)

## Rollback Strategy

### Rolling Back a Deployment

1. **Via Dashboard**:
   - Deployments → Select previous deployment
   - Click "Promote to Production"

2. **Via CLI**:
   ```bash
   vercel rollback
   ```

### Deployment History

View all deployments:
- Dashboard → Deployments
- See build logs, source code, and preview URLs

## Security Best Practices

### Environment Variables

- ✅ Never commit `.env` files
- ✅ Rotate API keys regularly
- ✅ Use different keys for dev/staging/production
- ✅ Enable environment variable encryption (Vercel)

### CORS Configuration

For production, update `api/chat.ts`:

```typescript
// Restrict to your domain only
res.setHeader('Access-Control-Allow-Origin', 'https://yourdomain.com');
```

### Rate Limiting

Consider implementing:

- Request throttling
- IP-based rate limiting
- API key usage monitoring

## Updating the Deployment

### For Code Changes

```bash
git add .
git commit -m "Your change description"
git push origin main
```

Vercel automatically rebuilds and deploys.

### For Environment Variables

1. Update in Vercel dashboard
2. Trigger redeploy:
   ```bash
   vercel --prod
   ```
   or use "Redeploy" button in Vercel dashboard

### For Dependencies

```bash
npm install <new-package>
git add package.json package-lock.json
git commit -m "Add new dependency"
git push origin main
```

## Cost Estimation

### Vercel (Hobby Plan - Free)

- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Serverless functions (100GB-Hrs)

**Overages**:
- Additional bandwidth: $20/100GB
- Additional function execution: $2/100GB-Hrs

### Groq API (Free Tier)

- ✅ Generous free tier
- ✅ Fast inference times
- ✅ Multiple models available

Check current pricing at [groq.com/pricing](https://groq.com/pricing)

## Advanced Configuration

### Custom Build Command

In `package.json`, modify:

```json
{
  "scripts": {
    "build": "tsc && vite build",
    "build:analyze": "tsc && vite build --mode analyze"
  }
}
```

### Environment-Specific Builds

```bash
# Development
vercel dev

# Preview
vercel

# Production
vercel --prod
```

### Monorepo Support

If using monorepo:

```json
// vercel.json
{
  "buildCommand": "cd ../.. && npm run build",
  "installCommand": "npm install --prefix ../.."
}
```

## Support & Resources

### Documentation

- [Vercel Docs](https://vercel.com/docs)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
- [Groq API Docs](https://console.groq.com/docs)

### Community

- [Vercel Discord](https://vercel.com/discord)
- [Vercel GitHub](https://github.com/vercel/vercel)

### Contact

For project-specific issues, contact Francisco Barrios.

---

**Last Updated**: October 7, 2025
**Version**: 1.1.0

---

## Quick Reference

### Essential Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel --prod

# Check deployment logs
vercel logs

# List deployments
vercel ls
```

### Important Files

- `vercel.json` - Deployment configuration
- `.env` - Local environment variables (git-ignored)
- `.env.example` - Environment variable template
- `api/chat.ts` - Serverless API endpoint
- `package.json` - Dependencies and scripts

### Environment Variables

```bash
AI_GATEWAY_API_KEY=your_ai_gateway_api_key_here
```

### Support Contacts

- **Vercel Support**: support@vercel.com
- **AI Gateway Support**: Via Vercel Dashboard
- **Project Owner**: Francisco Barrios
