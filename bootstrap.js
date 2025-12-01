#!/usr/bin/env node
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectDir = __dirname;
process.chdir(projectDir);

console.log('🚀 Flowchart GDScript Generator - Bootstrap');
console.log('=========================================\n');

// Check if node_modules exists
if (!fs.existsSync(path.join(projectDir, 'node_modules'))) {
  console.log('📦 Installing dependencies...');
  try {
    execSync('npm install --prefer-offline --no-audit', {
      stdio: 'inherit',
      cwd: projectDir
    });
    console.log('✅ Dependencies installed\n');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Dependencies already installed\n');
}

console.log('🎯 Starting development server...\n');
try {
  process.env.NODE_ENV = 'development';
  execSync('npm run dev', {
    stdio: 'inherit',
    cwd: projectDir
  });
} catch (error) {
  console.error('❌ Failed to start dev server:', error.message);
  process.exit(1);
}
