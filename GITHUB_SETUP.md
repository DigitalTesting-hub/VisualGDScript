# GitHub Setup Instructions

## Quick Start

### Step 1: Download Project
1. In Replit, click **Files** → **Download as zip**
2. Extract the `flowchart-standalone` folder

### Step 2: Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `flowchart-gdscript-generator`
3. Description: `Visual flowchart editor generating production-ready GDScript for Godot 4.4`
4. Choose "Public"
5. **Do NOT** check "Initialize with README"
6. Click "Create repository"

### Step 3: Upload to GitHub (via Terminal)

Open terminal in the `flowchart-standalone` folder and run:

```bash
# Initialize git
git init

# Stage all files
git add .

# Create initial commit
git commit -m "Initial commit: Flowchart GDScript Generator"

# Rename branch to main (if needed)
git branch -M main

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/flowchart-gdscript-generator.git

# Push to GitHub
git push -u origin main
```

**Important:** Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 4: Verify Upload
1. Go to your GitHub repository
2. Confirm all files are there
3. You should see:
   - `client/` folder
   - `server/` folder
   - `shared/` folder
   - `package.json`
   - `render.yaml`
   - `.gitignore`
   - `DEPLOYMENT_GUIDE.md`

---

## What Gets Uploaded

### Files Included (Good)
- ✅ Source code (`client/`, `server/`, `shared/`)
- ✅ Configuration files (`package.json`, `tsconfig.json`, `render.yaml`)
- ✅ Documentation (`*.md` files)
- ✅ Environment template (`.env.example`)

### Files Excluded (Good - handled by .gitignore)
- ❌ `node_modules/` (reinstalled during deployment)
- ❌ `dist/` (rebuilt during deployment)
- ❌ `.env` (security - never commit actual keys)
- ❌ `package-lock.json` (regenerated during deployment)

---

## Future Updates

After initial upload, to push changes:

```bash
# Make changes locally or in Replit
# Then:

git add .
git commit -m "Description of changes"
git push origin main
```

Render will automatically detect the push and redeploy your app.

---

## Important Notes

### Do NOT Commit
- `.env` files with real API keys
- `node_modules/` folder
- `dist/` compiled output
- Build artifacts

### Always Commit
- Source code changes
- `render.yaml` (deployment config)
- `package.json` (dependencies list)
- Documentation

### First Time Only
- Get API keys (Gemini & Groq)
- Set environment variables in Render Dashboard
- No need to commit keys to GitHub

---

## Troubleshooting

### "Permission denied" when pushing?
- Make sure you're using HTTPS URL (not SSH)
- Or set up SSH keys: [GitHub SSH Setup](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

### "fatal: pathspec 'package-lock.json' is ignored"?
- This is expected - it's in `.gitignore`
- You can safely ignore this message

### Can't see your files on GitHub?
- Check if repository is public
- Try refreshing the page
- Verify git push completed successfully (no errors)

---

## Next Steps

1. ✅ Create GitHub repository
2. ✅ Upload code
3. 👉 Follow [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) to deploy to Render
4. 🎉 Share your live app!
