# Flowchart GDScript Generator

A visual flowchart editor that generates production-ready, executable GDScript code for Godot 4.4.

## 🚀 Features

### 1. **Visual Flowchart Editor**
- Drag-and-drop node-based interface
- 27+ node types (Events, Movement, Animation, etc.)
- Context-aware code generation
- AI-powered refinement

### 2. **Scratch-Style Block Editor**
- 70+ blocks across 15 categories
- Visual block sequencing
- 4 separate input event types:
  - Keyboard Input (45+ keys)
  - Mouse Input (10 events)
  - Touch Input (10 gestures)
  - Input Action (20 Godot actions)
- AI-powered code generation and refinement

### 3. **AI Code Generation**
- Dual AI providers: Gemini (primary) + Groq (fallback)
- Smart context-aware prompts
- Production-ready GDScript output
- 100% Godot 4.4 API compliant

## 🎯 Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env and add your API keys
# GEMINI_API_KEY=your_key_here
# GROQ_API_KEY=your_key_here

# Start development server
npm run dev
```

Visit `http://localhost:5000`

### Deployment
- [Deploy to Render](./DEPLOYMENT_GUIDE.md) - Recommended for production
- [GitHub Setup](./GITHUB_SETUP.md) - Upload code to GitHub first
- [Quick Start](./QUICK_START.md) - Local development guide

## 📋 API Keys Required

### Get Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API Key
3. Copy and keep safe

### Get Groq API Key
1. Go to [Groq Console](https://console.groq.com/keys)
2. Create API Key
3. Copy and keep safe

## 🏗️ Architecture

```
Flowchart GDScript Generator
├── Frontend (React)
│   ├── Flowchart Editor (Visual nodes)
│   ├── Block Editor (Scratch-style)
│   └── AI Code Generator
├── Backend (Express.js)
│   ├── Flowchart Generator
│   ├── Block Code Generator
│   └── AI Integration (Gemini + Groq)
└── Shared
    ├── Block Schema (70+ blocks)
    ├── Flowchart Schema (27+ nodes)
    └── Godot Node Database (90+ nodes)
```

## 📚 Key Commands

```bash
npm run dev        # Development server
npm run build      # Production build
npm start          # Start production server
npm run check      # TypeScript type checking
npm run db:push    # Sync database schema
```

## 🔧 Environment Variables

| Variable | Required | Example |
|----------|----------|---------|
| `NODE_ENV` | Yes | `production` or `development` |
| `PORT` | No | `5000` (default) |
| `GEMINI_API_KEY` | Yes | `AIza...` |
| `GROQ_API_KEY` | Yes | `gsk_...` |

## 📖 Documentation

- [Render Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [GitHub Setup](./GITHUB_SETUP.md)
- [Quick Start](./QUICK_START.md)
- [Deployment Checklist](./RENDER_DEPLOYMENT_CHECKLIST.md)

## 🎓 How It Works

### Visual Flowchart
1. Create a flowchart using drag-and-drop nodes
2. Connect nodes to define logic flow
3. Click "Generate" for base GDScript
4. AI refines the code for production quality
5. Copy generated code to your Godot project

### Block Editor
1. Select blocks from 15 categories
2. Arrange blocks in sequence
3. Configure block parameters
4. Click "Generate"
5. AI converts blocks to production GDScript

### AI Code Generation
1. Write a natural language prompt
2. Specify Godot node type
3. AI generates complete GDScript code
4. Copy to your project

## 🌐 Deployed Version

Live demo: **[Your Render URL here]**

## 🤝 Support

- Documentation: See README files in each folder
- Issues: Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#troubleshooting)

## 📄 License

MIT License - Feel free to use and modify

## 🎯 Godot 4.4 Compatibility

- ✅ 100% Official Godot 4.4 API
- ✅ CharacterBody2D/3D support
- ✅ Animation system integration
- ✅ Physics and movement handling
- ✅ Input event mapping
- ✅ Signal system support

---

**Built with:** React, TypeScript, Express.js, TailwindCSS, Radix UI, ReactFlow

**AI Providers:** Google Gemini API + Groq API (Fallback)

**Deployed on:** Render.com

---

**Ready to generate GDScript? Start with the [Block Editor](./client/src/components/panels/block-editor-panel.tsx) or [Flowchart](./client/src/components/panels/flowchart-panel.tsx)!** 🚀
