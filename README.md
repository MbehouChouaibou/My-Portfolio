# My Portfolio

Personal portfolio built with React, TypeScript, Tailwind, and Framer Motion.

## What is included
- Responsive UI for desktop, tablet, and phone layouts.
- Real contact form delivery through a backend API + SMTP.
- Single-container production runtime (`frontend + API` in one Node server).
- CI pipeline + production deployment workflow + feature preview image workflow.

## Tech stack
- Frontend: React + Vite + TypeScript + Tailwind
- Backend: Express + Nodemailer
- Container: Docker
- CI/CD: GitHub Actions

## Local development
1. Copy environment template:
```bash
cp .env.example .env
```
2. Fill SMTP values in `.env`.
3. Run API server:
```bash
npm run dev:server
```
4. Run frontend in another terminal:
```bash
npm run dev
```
5. Open `http://localhost:5173`.

The Vite dev server proxies `/api/*` to `http://localhost:8787`.

## Real contact message setup
Set these variables in `.env`:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL` (or reuse `SMTP_USER`)
- `CORS_ORIGIN`
- `VITE_API_BASE_URL` (optional)
  - Local dev: `http://localhost:8787`
  - Production: leave empty so frontend uses same-origin `/api/contact`

Contact form endpoint:
- `POST /api/contact`

Health check:
- `GET /api/health`

## Production (without Docker)
```bash
npm ci
npm run build
npm run start
```
Server runs on `PORT` (default `8787`) and serves both API + built frontend.

## Docker
Build and run:
```bash
docker build -t my-portfolio .
docker run --env-file .env -p 8787:8787 my-portfolio
```

Or:
```bash
docker compose up -d --build
```

## GitHub Actions automation
Workflows included:
- `.github/workflows/ci.yml`
  - Runs lint + build on push/PR.
- `.github/workflows/deploy.yml`
  - Builds and pushes Docker image to `ghcr.io/<owner>/<repo>` on `main`.
  - Optional Render deploy hook trigger via secret.
- `.github/workflows/feature-preview.yml`
  - Builds/pushes PR-tagged Docker images for feature branches.

### Required secrets for deployment
- `RENDER_DEPLOY_HOOK_URL` (optional; only if you use Render auto deploy hook)

### Using the pushed image
Example image tags:
- `ghcr.io/<owner>/<repo>:latest`
- `ghcr.io/<owner>/<repo>:sha-<commit>`
- `ghcr.io/<owner>/<repo>:pr-<number>`

## Suggested production target
Any platform that supports Docker images:
- Render
- Railway
- Fly.io
- DigitalOcean App Platform
- VM with Docker + reverse proxy
# My-Portfolio
