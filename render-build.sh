#!/bin/bash
# Render Build Script
# Builds frontend with Vite and backend with esbuild

set -e

echo "📦 Installing dependencies..."
npm install

echo "🎨 Building frontend with Vite..."
npx vite build

echo "🔨 Compiling backend with esbuild..."
npx esbuild server/index.ts \
  --bundle \
  --platform=node \
  --target=node18 \
  --format=cjs \
  --outfile=dist/index.cjs \
  --external:express \
  --external:@google/genai \
  --external:@neondatabase/serverless \
  --external:drizzle-orm \
  --external:ws \
  --external:multer \
  --external:passport \
  --external:connect-pg-simple \
  --external:express-session

echo "✅ Build complete!"
