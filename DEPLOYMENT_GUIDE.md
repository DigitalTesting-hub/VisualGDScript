# Deployment Guide - Render.com

## Overview
This guide walks you through deploying the Flowchart GDScript Generator to Render.com.

---

## Step 1: Prepare GitHub Repository

### 1.1 Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Create a repository named `flowchart-gdscript-generator`
3. Choose "Public" (for easier deployment)
4. Do NOT initialize with README (you'll push existing code)

### 1.2 Download & Upload to GitHub
From your Replit project:
1. Download the `flowchart-standalone` folder
2. Open terminal in the downloaded folder
3. Run:
```bash
git init
git add .
git commit -m "Initial commit: Flowchart GDScript Generator"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/flowchart-gdscript-generator.git
git push -u origin main
```

**Note:** Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 2: Get API Keys

### 2.1 Gemini API Key (Primary AI Provider)
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key and save it securely

### 2.2 Groq API Key (Fallback Provider)
1. Go to [Groq Console](https://console.groq.com/keys)
2. Sign up or log in
3. Create an API key
4. Copy the key and save it securely

---

## Step 3: Deploy to Render

### 3.1 Connect GitHub to Render
1. Go to [Render.com](https://render.com)
2. Sign up/Login with GitHub account
3. Click "New +" → "Web Service"
4. Select "Deploy existing repository"
5. Search for `flowchart-gdscript-generator`
6. Click "Connect"

### 3.2 Configure Deployment
Fill in the form:

| Field | Value |
|-------|-------|
| **Name** | flowchart-gdscript-generator |
| **Region** | Oregon (or your preference) |
| **Branch** | main |
| **Runtime** | Node |
| **Build Command** | `npm install && npx vite build` |
| **Start Command** | `npm start` |

### 3.3 Add Environment Variables
Click "Advanced" → "Add Environment Variable"

Add these variables:
```
NODE_ENV = production
PORT = 5000
GEMINI_API_KEY = [paste your key from Step 2.1]
GROQ_API_KEY = [paste your key from Step 2.2]
```

### 3.4 Select Plan & Deploy
1. Choose **Free Plan** (or Paid if you want guaranteed uptime)
2. Click "Deploy Web Service"
3. Wait for build to complete (5-10 minutes)

---

## Step 4: Verify Deployment

Once deployment is complete:

1. Visit your Render URL (e.g., `https://flowchart-gdscript-generator.onrender.com`)
2. You should see the Flowchart editor interface
3. Test the health endpoint: 
   ```
   https://your-app.onrender.com/api/health
   ```
   Should return:
   ```json
   {
     "status": "ok",
     "app": "flowchart-gdscript-generator",
     "gemini": true,
     "groq": true
   }
   ```

---

## Step 5: Update Your Application (if needed)

### To push updates to Render:
1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
3. Render will automatically rebuild and redeploy

### To manually trigger rebuild:
In Render Dashboard → Your Service → "Manual Deploy" → "Deploy latest commit"

---

## Troubleshooting

### Build fails with "npm install" error
- Check Node version compatibility (requires Node 18+)
- Ensure `package-lock.json` is committed to GitHub

### App crashes on startup
- Check logs in Render Dashboard → Logs tab
- Verify environment variables are set correctly
- Look for "Cannot find module" errors

### AI generation not working
- Verify API keys are correctly set in Render environment variables
- Check logs for "API rate limit" or authentication errors
- Test both Gemini and Groq APIs independently

### App uses too much memory
- Render free tier has 512MB limit
- Upgrade to Paid plan if needed
- Check for memory leaks in server logs

---

## Performance Notes

### Free Tier Limits
- **Memory:** 512 MB
- **CPU:** Shared
- **Storage:** Ephemeral (temporary)
- **Uptime:** Spins down after 15 min inactivity

### Cold Start
- First request after inactivity may take 10-30 seconds
- Subsequent requests are fast

### For Production
- Upgrade to "Starter Plus" or higher plan
- Enable "Auto-deploy on push" for CI/CD
- Add custom domain (optional)

---

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Google Generative AI API](https://ai.google.dev/)
- [Groq API Documentation](https://console.groq.com/docs)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/nodejs-performance-best-practices/)

---

## Support

If you encounter issues:
1. Check Render Dashboard → Logs tab
2. Review error messages in console
3. Verify all environment variables are set
4. Contact Render support at [render.com/support](https://render.com/support)
