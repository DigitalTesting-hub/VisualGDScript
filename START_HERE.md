# 🚀 START HERE - Render Deployment Guide

Your Flowchart GDScript Generator is ready to deploy! Follow these simple steps.

---

## Step 1️⃣: Download Project

✅ **In Replit:**
1. Click the **Files** icon on the left
2. Right-click the `flowchart-standalone` folder
3. Select **Download as zip**
4. Extract the ZIP to your computer

---

## Step 2️⃣: Upload to GitHub

✅ **In your terminal** (in the `flowchart-standalone` folder):

```bash
# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Flowchart GDScript Generator"

# Rename to main
git branch -M main

# Add GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/flowchart-gdscript-generator.git

# Push to GitHub
git push -u origin main
```

✅ **In GitHub:**
- First create the repository at github.com/new
- Name: `flowchart-gdscript-generator`
- Choose "Public"
- DO NOT initialize with README

---

## Step 3️⃣: Get API Keys (2 minutes)

### Gemini API Key:
1. Go to Google AI Studio (makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key
4. **Save it** - you'll need it in Render

### Groq API Key:
1. Go to Groq Console (console.groq.com/keys)
2. Create an API Key
3. Copy the key
4. **Save it** - you'll need it in Render

---

## Step 4️⃣: Deploy to Render (10 minutes)

1. Go to render.com
2. Sign up with GitHub (click "Sign up with GitHub")
3. Authorize GitHub access
4. Click **"New +"** then **"Web Service"**
5. Select **"Deploy existing repository"**
6. Search for `flowchart-gdscript-generator`
7. Click **"Connect"**

### Configure:
- **Name:** flowchart-gdscript-generator
- **Region:** Oregon
- **Branch:** main
- **Build Command:** npm install && npm run build
- **Start Command:** npm start

### Add Environment Variables:
Click **"Advanced"** and add:

| Key | Value |
|-----|-------|
| NODE_ENV | production |
| PORT | 5000 |
| GEMINI_API_KEY | [paste from step 3] |
| GROQ_API_KEY | [paste from step 3] |

### Deploy:
- Choose **Free** plan
- Click **"Deploy Web Service"**
- Wait 5-10 minutes

---

## Step 5️⃣: Verify It Works

✅ When it says **"Live"**:
1. Click the URL to visit your app
2. You should see the Flowchart editor
3. Try the Block Editor or Flowchart
4. Generate code to test

✅ Test API health:
Visit: your-app-name.onrender.com/api/health

Should show:
```json
{"status":"ok","gemini":true,"groq":true}
```

---

## 🎉 Done!

Your app is live! Share the URL with others.

---

## 📖 Full Documentation

- **DEPLOYMENT_GUIDE.md** - Detailed step-by-step
- **RENDER_DEPLOYMENT_CHECKLIST.md** - Checkbox guide
- **GITHUB_SETUP.md** - GitHub instructions
- **QUICK_START.md** - Local development

---

## ❓ Troubleshooting

### Build Failed?
- Check Render dashboard "Logs"
- Verify render.yaml exists
- Ensure Node.js 18+ locally

### App not working?
- Check environment variables in Render
- Verify API keys are correct
- Look at Render Logs tab

### Need help?
- Visit Render Support
- Check Google AI Docs
- Visit Groq Documentation

---

**You're ready! Start with Step 1.** ✅
