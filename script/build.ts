/**
 * Build script for Flowchart GDScript Generator
 * Builds the React frontend and prepares for production
 */

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.join(__dirname, '..');

console.log('🔨 Building Flowchart GDScript Generator...\n');

try {
  // Build Vite frontend
  console.log('📦 Building frontend with Vite...');
  execSync('vite build', {
    stdio: 'inherit',
    cwd: projectDir
  });

  // Build server with esbuild
  console.log('\n⚙️  Compiling server...');
  execSync('npx esbuild server/index.ts --bundle --platform=node --target=node18 --format=cjs --outfile=dist/index.cjs --external:express --external:multer --external:@google/genai --external:@neondatabase/serverless --external:drizzle-orm --external:ws --external:passport --external:connect-pg-simple --external:express-session --external:axios', {
    stdio: 'inherit',
    cwd: projectDir
  });
  
  console.log('\n✅ Build complete!');
  process.exit(0);
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
