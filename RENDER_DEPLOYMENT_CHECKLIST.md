# Render Deployment Checklist

Complete these steps in order. Estimated time: **20-30 minutes**

---

## ✅ Phase 1: Prepare Your Project (5 minutes)

### 1.1 Download from Replit
- [ ] Go to Replit project files
- [ ] Download `flowchart-standalone` folder as ZIP
- [ ] Extract the ZIP file to your computer
- [ ] Navigate into `flowchart-standalone` folder in terminal

### 1.2 Verify Project Contents
- [ ] Check that these folders exist:
  - `client/` (React frontend)
  - `server/` (Express backend)
  - `shared/` (Shared types)
- [ ] Check that these files exist:
  - `package.json`
  - `render.yaml`
  - `.env.example`
  - `DEPLOYMENT_GUIDE.md`

### 1.3 Prepare Git
- [ ] Open terminal in `flowchart-standalone` folder
- [ ] Run: `git init` (if not already a git repo)
- [ ] Verify git is working: `git status`

---

## ✅ Phase 2: Create GitHub Repository (10 minutes)

### 2.1 Create Repository
- [ ] Go to [github.com/new](https://github.com/new)
- [ ] Repository name: `flowchart-gdscript-generator`
- [ ] Make it "Public"
- [ ] **DO NOT** check "Initialize with README"
- [ ] Click "Create repository"

### 2.2 Get GitHub URL
- [ ] Copy the repository URL (should look like: `https://github.com/YOUR_USERNAME/flowchart-gdscript-generator.git`)
- [ ] Save it for next step

### 2.3 Upload Code to GitHub
In your terminal, run:

```bash
# Stage all files
git add .

# Create commit
git commit -m "Initial commit: Flowchart GDScript Generator"

# Rename to main branch
git branch -M main

# Add remote (replace URL with your URL)
git remote add origin https://github.com/YOUR_USERNAME/flowchart-gdscript-generator.git

# Push to GitHub
git push -u origin main
```

- [ ] Wait for push to complete (no errors)
- [ ] Go to your GitHub repository and verify all files are there

---

## ✅ Phase 3: Get API Keys (5 minutes)

### 3.1 Get Gemini API Key
- [ ] Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
- [ ] Click "Create API Key" (or "Get API Key")
- [ ] Copy the key
- [ ] Save somewhere safe (you'll need it in Render)
- [ ] **DO NOT** share or commit this key

### 3.2 Get Groq API Key (Fallback Provider)
- [ ] Go to [Groq Console](https://console.groq.com/keys)
- [ ] Sign up/Login
- [ ] Create an API Key
- [ ] Copy the key
- [ ] Save somewhere safe
- [ ] **DO NOT** share or commit this key

---

## ✅ Phase 4: Deploy to Render (10 minutes)

### 4.1 Connect to Render
- [ ] Go to [Render.com](https://render.com)
- [ ] Sign up/Login using GitHub (click "Sign up with GitHub")
- [ ] Authorize GitHub access
- [ ] Click "New +" button
- [ ] Select "Web Service"
- [ ] Select "Deploy existing repository"

### 4.2 Select GitHub Repository
- [ ] Search for `flowchart-gdscript-generator`
- [ ] Click "Connect" next to your repository
- [ ] Authorize Render to access your GitHub

### 4.3 Configure Deployment Settings

Fill in the form with these values:

```
Name: flowchart-gdscript-generator
Environment: Node
Region: Oregon (or your preference)
Branch: main
Runtime: Node
Build Command: npm install && npx vite build
Start Command: npm start
```

- [ ] Copy the above values into the Render form

### 4.4 Add Environment Variables
- [ ] Click "Advanced" (if not visible)
- [ ] Click "Add Environment Variable" four times
- [ ] Add these variables:

```
1. Key: NODE_ENV        → Value: production
2. Key: PORT            → Value: 5000
3. Key: GEMINI_API_KEY  → Value: [paste from 3.1]
4. Key: GROQ_API_KEY    → Value: [paste from 3.2]
```

- [ ] Verify all 4 variables are added
- [ ] **DO NOT** commit these keys to GitHub (Render handles them securely)

### 4.5 Deploy
- [ ] Choose plan: **Free** (good for testing) or **Paid** (for production)
- [ ] Click "Deploy Web Service"
- [ ] Wait for build to complete (you'll see a log)
- [ ] Status should change to "Live" (5-10 minutes)

---

## ✅ Phase 5: Verify Deployment (5 minutes)

### 5.1 Access Your App
- [ ] When status says "Live", click the URL at the top
- [ ] You should see the Flowchart GDScript Generator interface
- [ ] If you see a blank page, wait 30 seconds and refresh

### 5.2 Test Health Endpoint
- [ ] In your browser, go to: `https://your-app-name.onrender.com/api/health`
- [ ] You should see:
```json
{
  "status": "ok",
  "app": "flowchart-gdscript-generator",
  "gemini": true,
  "groq": true
}
```

### 5.3 Test Block Editor
- [ ] Click "Block Editor" in the left sidebar
- [ ] Try adding a block (click a block type)
- [ ] Click "Generate" button
- [ ] You should see generated GDScript code

### 5.4 Verify Logs (if issues)
- [ ] In Render dashboard, go to your service
- [ ] Click "Logs" tab
- [ ] Look for errors (red text)
- [ ] If all green, deployment is successful!

---

## ✅ Phase 6: Share & Update (Optional)

### 6.1 Share Your App
- [ ] Copy your Render URL (e.g., `https://flowchart-gdscript-generator.onrender.com`)
- [ ] Share with friends/teammates
- [ ] Tell them to try the Block Editor and Flowchart

### 6.2 Make Updates
To push new code to your deployed app:

```bash
# Make changes locally in Replit or text editor
# Then:

git add .
git commit -m "Description of changes"
git push origin main

# Render will automatically redeploy (watch the Render dashboard)
```

- [ ] Render will automatically detect the push
- [ ] Watch the "Logs" tab for rebuild
- [ ] Your app will update automatically

---

## 🎉 You're Done!

Your Flowchart GDScript Generator is now live on Render!

**Your live URL:** `https://flowchart-gdscript-generator.onrender.com`
(Replace with your actual Render URL)

### Next Steps
1. ✅ Share with others
2. ✅ Add custom domain (optional, in Render settings)
3. ✅ Upgrade to paid plan if needed (free tier spins down after inactivity)
4. ✅ Monitor app health in Render dashboard

### Troubleshooting

**App shows "Build Failed"?**
- Check Render dashboard "Logs" tab
- Look for error messages
- Verify `render.yaml` is in root of project
- Common issue: Node.js version - should be 18+

**App crashes immediately?**
- Check environment variables are set
- Verify `npm start` command works locally
- Check server logs for errors

**API keys not working?**
- Double-check you copied keys correctly
- Verify keys are active in Google AI Studio / Groq console
- Try regenerating a key
- Check API quotas aren't exceeded

**Need help?**
- [Render Support](https://render.com/support)
- [Google AI Documentation](https://ai.google.dev/)
- [Groq API Docs](https://console.groq.com/docs)

---

**Deployment Date:** December 1, 2025
**Status:** ✅ Production Ready
