# 🚀 Fresh Setup Guide - Flowchart GDScript Generator

**Everything is now fixed and ready to deploy!**

---

## ✅ Step 1: Download Project from Replit

1. In Replit, click **Files** (left sidebar)
2. Right-click `flowchart-standalone` folder
3. Select **"Download as zip"**
4. Extract to your computer
5. **Open Terminal inside the extracted folder**

---

## ✅ Step 2: Create New GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `flowchart-gdscript-generator`
3. Select **Public**
4. **Do NOT** initialize with README
5. Click **Create repository**

---

## ✅ Step 3: Upload to GitHub

In Terminal inside the extracted `flowchart-standalone` folder:

```bash
git init
git add .
git commit -m "Initial commit: Flowchart GDScript Generator"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/flowchart-gdscript-generator.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## ✅ Step 4: Verify GitHub Repository

Go to your GitHub repo and verify these files exist at the **ROOT** level:
- ✅ `render.yaml` (NOT inside a folder)
- ✅ `package.json`
- ✅ `client/` folder
- ✅ `server/` folder
- ✅ `shared/` folder
- ✅ `.env.example`

**If they're inside a `flowchart-standalone` folder, your GitHub structure is WRONG!**

---

## ✅ Step 5: Create Render Service

1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Click **"New +"** → **"Web Service"**
3. Select **"Deploy existing repository"**
4. Search for `flowchart-gdscript-generator` and connect
5. Select branch: `main`

The build and start commands are **already in `render.yaml`** ✅

---

## ✅ Step 6: Add Environment Variables

In Render dashboard, add these environment variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `GEMINI_API_KEY` | Your API key from [ai.google.dev](https://ai.google.dev) |
| `GROQ_API_KEY` | Your API key from [console.groq.com](https://console.groq.com) |
| `PORT` | `5000` |

---

## ✅ Step 7: Deploy

Click **"Deploy Web Service"** and wait for **"Live"** status.

This takes 5-10 minutes. You'll see:
- Building... 🔨
- Deploying... 📦
- Live ✅

---

## ✅ Step 8: Test Your App

1. Click the Render URL when status is **Live**
2. You should see the Flowchart editor with dark theme
3. Try the Block Editor, Flowchart Editor, or AI Generator

---

## 🐛 If Something Goes Wrong

### "Cannot find module 'autoprefixer'"
→ Fixed. The build command now includes `--include=dev`.

### "cd: client: No such file or directory"
→ Fixed. The `render.yaml` is correct. Make sure your GitHub has `client/` at the root, NOT inside a `flowchart-standalone` folder.

### Build still fails on Render
1. Check GitHub structure (files at root level)
2. Check `render.yaml` exists and is at root
3. Delete the Render service and create a new one
4. Re-push to GitHub: `git push origin main`

---

## 📝 Project Structure

```
flowchart-standalone/         (This folder downloads)
├── client/                    (React frontend)
├── server/                    (Express backend)
├── shared/                    (Shared types)
├── package.json
├── render.yaml               (Render config - DO NOT MODIFY)
├── vite.config.ts
├── tsconfig.json
└── .env.example
```

When you upload to GitHub, these files should be at the **ROOT** of your repo, not inside another folder.

---

## 🎯 You're All Set!

Everything is fixed and ready. Just:
1. Download ✅
2. Create GitHub repo ✅
3. Push to GitHub ✅
4. Connect Render ✅
5. Deploy ✅

Good luck! 🚀
