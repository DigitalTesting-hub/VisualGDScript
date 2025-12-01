# Render Build Command Options

## Option 1: Using esbuild directly (Recommended) ⭐

**Build Command:**
```
npm install && npx vite build && npx esbuild server/index.ts --bundle --platform=node --target=node18 --format=cjs --outfile=dist/index.cjs --external:express --external:@google/genai --external:@neondatabase/serverless --external:drizzle-orm --external:ws --external:multer --external:passport --external:connect-pg-simple --external:express-session
```

**Start Command:**
```
npm start
```

**Pros:**
- Direct and explicit
- No custom scripts needed
- Faster build time
- More control over compilation

**Cons:**
- Long command (but copy-paste works)

---

## Option 2: Using render-build.sh script

Save `render-build.sh` and use:

**Build Command:**
```
chmod +x render-build.sh && ./render-build.sh
```

**Start Command:**
```
npm start
```

**Pros:**
- Cleaner render.yaml
- Easier to modify build steps
- Reusable script

**Cons:**
- Requires shell script file

---

## Option 3: Using npm scripts (Simple)

**Update package.json:**
```json
"scripts": {
  "build": "vite build && esbuild server/index.ts --bundle --platform=node --target=node18 --format=cjs --outfile=dist/index.cjs --external:express --external:@google/genai",
  "start": "NODE_ENV=production node dist/index.cjs"
}
```

**Build Command:**
```
npm install && npm run build
```

**Start Command:**
```
npm start
```

**Pros:**
- Cleanest render.yaml
- Standard npm approach
- Easy to maintain

**Cons:**
- Modifies package.json

---

## Recommended: Option 1

Use the esbuild command directly in render.yaml. It's:
- ✅ Clear and explicit
- ✅ Works reliably on Render
- ✅ No additional files needed
- ✅ Standard for Node production builds

---

## What Each Step Does

1. **npm install** - Installs dependencies
2. **vite build** - Builds React frontend → dist/public/
3. **esbuild** - Compiles TypeScript backend → dist/index.cjs
4. **npm start** - Runs dist/index.cjs with NODE_ENV=production

---

## Key Externals

These packages are not bundled (must be in node_modules):
- express
- @google/genai
- @neondatabase/serverless
- drizzle-orm
- ws
- multer
- passport
- connect-pg-simple
- express-session

This keeps the bundle small (~2-3 MB instead of 50+ MB).
