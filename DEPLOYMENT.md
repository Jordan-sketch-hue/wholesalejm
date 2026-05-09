# 🚀 Deployment Guide - Wholesale Jamaica Platform

## Overview
This guide walks you through deploying the Wholesale Jamaica e-commerce platform to Vercel with full CI/CD setup.

---

## Step 1: Prepare Your Local Repository ✅

Your local repository is already initialized with:
- ✅ 48 files committed
- ✅ Proper `.gitignore` configured
- ✅ Git user configured (dev@wholesalejm.com)
- ✅ Initial commit hash: 9ed1816

**Current state:**
```bash
git status
# On branch master
# nothing to commit, working tree clean
```

---

## Step 2: Create GitHub Repository

### Option A: Using GitHub Web Interface (Easiest)

1. Go to [github.com/new](https://github.com/new)
2. Create a new repository:
   - **Repository name:** `wholesalejm` (or your preference)
   - **Description:** "Premium Jamaican wholesale e-commerce platform"
   - **Visibility:** Public (for Vercel free tier)
   - **DO NOT initialize** with README, .gitignore, or license
3. Click "Create repository"

### Option B: Using GitHub CLI

```bash
# Install GitHub CLI: https://cli.github.com
gh repo create wholesalejm --public --source=. --remote=origin --push
```

---

## Step 3: Push Local Repository to GitHub

After creating the empty repository on GitHub:

```bash
# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/wholesalejm.git

# Verify remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

**Expected output:**
```
Counting objects: 48, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (45/45), done.
Writing objects: 100% (48/48), ...
...
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## Step 4: Create Vercel Account & Deploy

### Step 4a: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com/signup)
2. Sign up with GitHub (recommended for seamless integration)
3. Authorize Vercel to access your GitHub repositories

### Step 4b: Import Your Repository

1. Click "Add New..." → "Project"
2. Select "Import Git Repository"
3. Enter: `https://github.com/YOUR_USERNAME/wholesalejm`
4. Click "Continue"

### Step 4c: Configure Project Settings

**Framework:** Vite (detected automatically)

**Build & Output Settings:**
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

**Environment Variables:**
Click "Environment Variables" and add these:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Frontend
VITE_API_URL=https://your-vercel-deployment.vercel.app/api

# JWT
JWT_SECRET=your_super_secret_jwt_key_generate_one

# OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
APPLE_TEAM_ID=your_apple_team_id

# Payment Gateways
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# WhatsApp
WHATSAPP_BUSINESS_API_KEY=your_whatsapp_api_key
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Production
NODE_ENV=production
FRONTEND_URL=https://your-vercel-deployment.vercel.app
```

### Step 4d: Deploy

1. Click "Deploy"
2. Wait for build to complete (usually 2-3 minutes)
3. Once deployed, you'll receive a live URL like:
   ```
   https://wholesalejm.vercel.app
   ```

---

## Step 5: Verify Deployment

### Check Health Endpoint
```bash
curl https://your-deployment.vercel.app/api/health
```

**Expected response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-20T10:30:00.000Z",
  "environment": "production",
  "database": "configured"
}
```

### Test Live Pages
- **Homepage:** `https://your-deployment.vercel.app/`
- **Login:** `https://your-deployment.vercel.app/auth/login.html`
- **Shop:** `https://your-deployment.vercel.app/shop/cart.html`
- **Admin:** `https://your-deployment.vercel.app/admin/dashboard.html`

---

## Troubleshooting

### Build Failures

**Issue: "Cannot find module"**
- Solution: Check that all dependencies are in `package.json`
- Run locally: `npm install && npm run build`

**Issue: "Environment variable not set"**
- Solution: Go to Vercel Dashboard → Settings → Environment Variables
- Add all required `.env` variables

### MongoDB Connection Issues

**Issue: "MongoDB connection failed"**
- Verify `MONGODB_URI` is correct in Vercel environment
- Check MongoDB IP whitelist allows Vercel's IP ranges
  - Go to MongoDB Atlas → Network Access
  - Add IP: `0.0.0.0/0` (or specific Vercel IPs if available)

### Frontend Not Loading

**Issue: "Cannot find dist/index.html"**
- Ensure build completes successfully
- Check Vercel build logs for errors
- Run `npm run build` locally to debug

---

## Continuous Deployment

### Auto-Deploy on Push

Once connected, Vercel automatically:
1. Detects commits to `main` branch
2. Triggers new build
3. Deploys if build succeeds
4. Updates live URL

### View Deployment History

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. View all deployment history with status

---

## Custom Domain (Optional)

1. Go to Vercel Project Settings → Domains
2. Add your custom domain
3. Choose one:
   - **Vercel nameservers** (easiest)
   - **CNAME record** (for existing domain)
4. Follow on-screen instructions
5. DNS propagation: 24-48 hours

---

## Performance Optimization

### Enable Edge Functions
1. Go to Project Settings → Functions
2. Enable Edge Config
3. Reduces latency worldwide

### Set Up Analytics (Free)
1. Go to Project Settings → Analytics
2. Enable Web Analytics
3. Monitor performance in real-time

---

## Security Checklist

- [ ] All environment variables set in Vercel
- [ ] `.env` file never committed to Git
- [ ] JWT_SECRET is strong (32+ characters)
- [ ] HTTPS enforced (automatic on Vercel)
- [ ] MongoDB IP whitelist configured
- [ ] OAuth credentials from verified apps only
- [ ] Payment API keys are test keys first, then production

---

## Sharing Your Live Site

Once deployed, share the link:
```
🎉 Check out our new Wholesale Jamaica platform:
https://your-deployment.vercel.app

Browse products, create an account, and explore our premium features!
```

---

## Local Development Still Works

You can continue developing locally:

```bash
# Install dependencies
npm install

# Run dev server (frontend + backend)
npm run dev

# Runs on:
# - Frontend: http://localhost:5173
# - Backend: http://localhost:3000
```

Any commits pushed to GitHub will automatically trigger Vercel deployments.

---

**Questions? Need help?**
- Check Vercel docs: https://vercel.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
- GitHub Actions: https://docs.github.com/en/actions

**Happy deploying! 🚀**
