# Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Vercel Deployment

1. **Go to [Vercel](https://vercel.com)**
2. **Connect GitHub**: Import your GitHub repository `mishwani7/MindScreen-AI`
3. **Configure Environment Variables** (in Vercel Dashboard):
   - `VITE_GITHUB_TOKEN` = Your GitHub Models API key
4. **Deploy**: Vercel will automatically build and deploy

The deployment will be available at: `https://mindscreen-ai.vercel.app`

### 2. Environment Variables Setup

In your Vercel dashboard, add:

```env
VITE_GITHUB_TOKEN=your_github_models_api_key_here
```

Get your GitHub Models API key from: [GitHub Models](https://github.com/marketplace/models)

### 3. AI Configuration

The platform uses **GPT-4o as primary** and **DeepSeek-V3 as backup** for reliability:
- Primary AI: GPT-4o (more stable for production)
- Backup AI: DeepSeek-V3 (automatic fallback)
- Multi-key support for rate limit handling

### 4. Auto-Deploy Setup

✅ Already configured! Every push to `main` branch will automatically deploy.

## Current Status

- ✅ PHQ-9 Depression Screening: **LIVE**
- 🚧 GAD-7 Anxiety Assessment: In development
- 📋 Other screeners: Planned for community contributions

## Post-Deployment Testing

After deployment, test:

1. PHQ-9 screener functionality
2. AI analysis (GPT-4o primary, DeepSeek-V3 backup)
3. PDF report generation
4. Mobile responsiveness
5. Location-based resource recommendations

## Public Repository Strategy

✅ **Make it PUBLIC for community contributions!**

**Benefits of going public:**
- Accept community contributions for new screeners
- Showcase your professional work
- Build open-source credibility
- Get community feedback and improvements
- Help others learn from your implementation

**Contribution Strategy:**
- You continue developing core features
- Community can contribute additional screeners (GAD-7, ASRS, etc.)
- All contributions get reviewed before merging
- You maintain control over the platform vision

---

**Ready to deploy!** 🚀 The platform is production-ready with GPT-4o as primary AI.
