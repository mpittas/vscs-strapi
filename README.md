# VSCS Website

Full-stack website for VSCS — **Next.js** frontend with a **Strapi 5** CMS backend.

| Layer    | Stack                            | Directory  | Dev URL               |
| -------- | -------------------------------- | ---------- | --------------------- |
| Frontend | Next.js 16, React 19, Tailwind 4 | repo root  | http://localhost:3000 |
| Backend  | Strapi 5.47, SQLite (local)      | `backend/` | http://localhost:1337 |

---

## Quick start (Windows & macOS)

**Prerequisites:** [Node.js 20–24](https://nodejs.org/) (22 recommended — see `.nvmrc`) and npm 10+.

```bash
git clone <repository-url>
cd vscs-strapi
npm run setup    # one command: install deps + create env files
npm run dev      # start frontend + backend together
```

Then open:

- **Website:** http://localhost:3000
- **Strapi admin:** http://localhost:1337/admin — create an admin account on first visit

No database install needed — Strapi uses **SQLite** locally.

---

## Prerequisites by OS

### macOS

```bash
brew install fnm          # or: brew install nvm
fnm install 22
fnm use 22

# Required for Strapi's SQLite driver (native module)
xcode-select --install
```

### Windows

1. Install **Node.js 22 LTS** from [nodejs.org](https://nodejs.org/) or [nvm-windows](https://github.com/coreybutler/nvm-windows).
2. If `npm install` fails in `backend/` with a `better-sqlite3` error, install [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) with the **Desktop development with C++** workload.

### Node version managers

| Tool              | macOS / Linux      | Windows                                                   |
| ----------------- | ------------------ | --------------------------------------------------------- |
| fnm               | `brew install fnm` | —                                                         |
| nvm               | `brew install nvm` | [nvm-windows](https://github.com/coreybutler/nvm-windows) |
| Use project version | `fnm use` / `nvm use` | reads `.nvmrc` → Node 22                               |

---

## What `npm run setup` does

Cross-platform script (`scripts/setup.js`):

1. Verifies Node.js 20–24
2. Runs `npm install` in the repo root (frontend)
3. Runs `npm install` in `backend/` (Strapi)
4. Creates `.env.local` from `.env.example` (frontend)
5. Creates `backend/.env` from `backend/.env.example` with generated secrets
6. Syncs `REVALIDATE_SECRET` / `WEBHOOK_TOKEN` between frontend and backend

Safe to re-run — existing env files are never overwritten.

---

## npm scripts

| Command                | Description                         |
| ---------------------- | ----------------------------------- |
| `npm run setup`        | One-step install + env setup        |
| `npm run dev`          | Start frontend and backend together |
| `npm run dev:frontend` | Next.js only                        |
| `npm run dev:backend`  | Strapi only                         |
| `npm run build`        | Build frontend for production       |
| `npm run build:backend`| Build Strapi admin panel            |
| `npm run lint`         | Run ESLint on frontend              |

---

## Environment variables

### Frontend (`.env.local`)

| Variable                          | Required | Default                 | Description                    |
| --------------------------------- | -------- | ----------------------- | ------------------------------ |
| `NEXT_PUBLIC_STRAPI_API_URL`      | No       | `http://localhost:1337` | Strapi API base URL            |
| `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` | No       | —                       | Mapbox token for projects map  |
| `REVALIDATE_SECRET`               | No       | auto-generated on setup | Webhook auth for cache refresh |
| `SMTP_*`                          | No       | —                       | Career form email (optional)   |

### Backend (`backend/.env`)

| Variable              | Required | Default                 | Description             |
| --------------------- | -------- | ----------------------- | ----------------------- |
| `APP_KEYS`            | Yes      | auto-generated on setup | Strapi session keys     |
| `ADMIN_JWT_SECRET`    | Yes      | auto-generated on setup | Admin JWT signing       |
| `API_TOKEN_SALT`      | Yes      | auto-generated on setup | API token salt          |
| `TRANSFER_TOKEN_SALT` | Yes      | auto-generated on setup | Transfer token salt     |
| `ENCRYPTION_KEY`      | Yes      | auto-generated on setup | Encryption key          |
| `FRONTEND_URL`        | No       | `http://localhost:3000` | CORS allowed origin   |
| `WEBHOOK_TOKEN`       | No       | synced with frontend    | Outgoing webhook header |
| `DATABASE_CLIENT`     | No       | `sqlite`                | Set `postgres` for PG   |

Templates: `.env.example` and `backend/.env.example`.

---

## Strapi configuration

After first login to the admin panel:

1. Enable **Public** API permissions for content types the site uses (blog, projects, careers, etc.)
2. Optionally configure a **webhook** for live revalidation — see [STRAPI_SETUP.md](./STRAPI_SETUP.md)

---

## Package versions

Lockfiles (`package-lock.json` in root and `backend/`) ensure reproducible installs.

### Frontend

| Package     | Version |
| ----------- | ------- |
| next        | 16.0.8  |
| react       | 19.2.1  |
| tailwindcss | 4.x     |
| typescript  | 5.x     |

### Backend

| Package        | Version |
| -------------- | ------- |
| @strapi/strapi | 5.47.1  |
| better-sqlite3 | 11.x    |
| pg             | 8.x     |
| node (engines) | 20–24   |

**Updating dependencies**

```bash
# Frontend
npm update

# Backend — Strapi upgrade helper
cd backend && npm run upgrade:dry   # preview
cd backend && npm run upgrade       # apply
```

> Strapi admin UI requires **React 18** — do not upgrade backend React to 19.

---

## Project structure

```
vscs-strapi/
├── src/                 # Next.js app
├── public/              # Static assets
├── backend/             # Strapi CMS
│   ├── config/          # Database, server, CORS
│   ├── src/api/         # Content types
│   └── .tmp/data.db     # SQLite DB (created on first run)
├── scripts/setup.js     # Cross-platform setup
├── .env.example         # Frontend env template
├── .nvmrc               # Node 22
└── STRAPI_SETUP.md      # Strapi & webhook guide
```

---

## Troubleshooting

| Problem | Fix |
| ------- | --- |
| `better-sqlite3` fails on macOS | `xcode-select --install`, then `npm run setup` |
| `better-sqlite3` fails on Windows | Install VS Build Tools (C++), then re-run setup |
| Wrong Node version | `fnm use` or `nvm use` (reads `.nvmrc`) |
| API returns 403 | Enable Public `find` / `findOne` in Strapi admin |
| Images not loading | Check `NEXT_PUBLIC_STRAPI_API_URL` in `.env.local` |
| Port in use | Free ports 3000 / 1337 or change `PORT` in `backend/.env` |

---

## Production

- Deploy frontend (e.g. Vercel) and backend (e.g. Strapi Cloud) separately
- Use **PostgreSQL** in production (`DATABASE_URL` or `DATABASE_CLIENT=postgres`)
- Never commit `.env` or `.env.local`
- See [STRAPI_SETUP.md](./STRAPI_SETUP.md) for webhooks and API permissions
