# Quick Start - Local Development

## Prerequisites
- Node.js 18+ installed
- npm or yarn

## Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your Gemini/Groq API keys
```

## Development

```bash
# Start development server
npm run dev
```

Server runs on `http://localhost:5000`

## Build for Production

```bash
# Build the project
npm run build

# Start production server
npm start
```

## Available Scripts

- `npm run dev` - Start development server with live reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema (if using database)

## Project Structure

```
flowchart-standalone/
├── client/           # React frontend
│   └── src/
│       ├── components/  # UI components
│       ├── panels/      # Editor panels
│       └── App.tsx
├── server/           # Express backend
│   ├── index.ts      # Main server file
│   └── generators/   # Code generators
├── shared/           # Shared types & schemas
│   ├── schema.ts     # Flowchart schema
│   └── block-schema.ts  # Block schema
└── dist/             # Built output (generated)
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` or `production` |
| `PORT` | Server port | `5000` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIza...` |
| `GROQ_API_KEY` | Groq API key | `gsk_...` |

## Troubleshooting

**Port already in use:**
```bash
# Use a different port
PORT=3000 npm run dev
```

**API keys not working:**
- Verify keys are correct in `.env`
- Check API quotas in respective dashboards
- Restart server after changing `.env`

**Build fails:**
- Delete `node_modules` and `dist`
- Run `npm install` again
- Check Node.js version: `node --version` (must be 18+)

---

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deployment instructions.
