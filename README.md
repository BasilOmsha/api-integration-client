# API Integration Client

Frontend client built with React, TypeScript, Vite, Tailwind, and uPlot.

## Prerequisites

- Node.js 20+
- Yarn (or npm/pnpm)

## Setup

1. Install dependencies:

```bash
yarn
```

2. Create your local env and production env file (use the example values as a guide):

```bash
.env.development
.env.production
```


1. Update `.env.development` with your API endpoints:

```env
VITE_API_URL_LOCAL=http://localhost:...
```

4. Start dev server:

```bash
yarn dev
```

## Production env

For production builds, set your deployed API URL based on `example.env.production`:

```env
VITE_API_URL="https://your-deployed-backend-URL"
```

