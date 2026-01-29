# Carto React App

A React + TypeScript + Vite application with Carto integration for mapping and spatial data visualization.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Then edit [.env.local](.env.local) and add your Carto access token:

```
VITE_CARTO_API_TOKEN=your_actual_token
```

**Map ID:** `fe4be3d5-b3f9-46cd-bf6e-d91bc69ea0b9`

### 3. Start Development Server

```bash
npm start
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests with coverage
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Check linting
- `npm run format` - Format code with Prettier

## Environment Files

- `.env.local` - Local development (not committed to git)
- `.env.example` - Example template (committed to git)

## Deployment

For production deployment, set `VITE_CARTO_API_TOKEN` as an environment variable in your hosting platform (Vercel, Netlify, AWS, etc.)

Run `npm run build` to create the production bundle.
