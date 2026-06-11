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
npm run setup    # one command: install deps + restore env secrets
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

## Environment variables

Standard layout — each app reads its own env file natively, no sync step:

| File | App | Committed? |
| ---- | --- | ---------- |
| `.env.local` | Next.js (dev) | No |
| `.env.production` | Next.js (local prod builds) | No |
| `backend/.env` | Strapi | No |
| `.env.example`, `backend/.env.example` | Templates | Yes |
| `env.enc.json` | Encrypted copy of all secrets | **Yes** |
| `.env.key` | Encryption key | **No — copy manually between machines** |

### Frontend vars (`.env.local`)

| Variable | Description |
| -------- | ----------- |
| `NEXT_PUBLIC_STRAPI_API_URL` | Strapi API URL |
| `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` | Mapbox token |
| `REVALIDATE_SECRET` | Webhook cache refresh secret |
| `SMTP_*` | Website form email (apply, contact, consultation) |

### Backend vars (`backend/.env`)

| Variable | Description |
| -------- | ----------- |
| `APP_KEYS`, `ADMIN_JWT_SECRET`, … | Strapi secrets |
| `FRONTEND_URL` | CORS origin |
| `WEBHOOK_TOKEN` | Must match `REVALIDATE_SECRET` |
| `DATABASE_*` | Optional PostgreSQL config |

---

## Moving secrets between machines

Secrets travel as an **encrypted file in git** (`env.enc.json`) plus a **key file** (`.env.key`) that you copy once, out-of-band.

**On the machine that has the secrets:**

```bash
npm run env:push      # encrypts .env files -> env.enc.json, generates .env.key on first run
git add env.enc.json
git commit -m "Update env secrets"
git push
```

**On the new machine (one-time):**

1. Copy `.env.key` to the project root (AirDrop, USB, password manager — **not** git/email/chat)
2. Then:

```bash
git clone <repo-url> && cd vscs-strapi
# place .env.key here
npm run setup         # installs deps + decrypts env automatically
npm run dev
```

**Daily:** `git pull && npm install` — `postinstall` re-imports env automatically if missing.

**After editing any env file:** re-run `npm run env:push` and commit `env.enc.json`.

> This is the same pattern tools like [dotenvx](https://dotenvx.com) and SOPS use: ciphertext in git, key out-of-band. Larger teams typically move to a secrets manager (Doppler, Infisical, 1Password CLI) so secrets never touch the repo at all — worth considering if more people join the project.

---

## npm scripts

| Command | Description |
| ------- | ----------- |
| `npm run setup` | Install deps + restore env secrets |
| `npm run env:push` | Encrypt `.env` files → `env.enc.json` (commit it) |
| `npm run env:pull` | Restore `.env` files (add `-- --force` to overwrite) |
| `npm run dev` | Start frontend and backend together |
| `npm run dev:frontend` | Next.js only |
| `npm run dev:backend` | Strapi only |
| `npm run build` | Build frontend |
| `npm run build:backend` | Build Strapi admin |
| `npm run lint` | ESLint |

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
├── backend/             # Strapi CMS (backend/.env lives here)
├── scripts/
│   ├── setup.js         # One-step install
│   └── env.js           # env:push / env:pull (encrypt/decrypt)
├── .env.local           # Frontend secrets (gitignored)
├── .env.key             # Encryption key (gitignored, copy between machines)
├── env.enc.json         # Encrypted secrets (committed)
└── STRAPI_SETUP.md
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
| Port in use | Change `PORT` in `backend/.env` |
| Env files missing after clone | Copy `.env.key` from your other machine, run `npm run env:pull` |

---

## Production

- Deploy frontend (e.g. Vercel) and backend (e.g. Strapi Cloud) separately
- Use **PostgreSQL** in production (`DATABASE_URL` or `DATABASE_CLIENT=postgres`)
- Never commit `.env.local`, `backend/.env`, or `.env.key`
- Production secrets go in Vercel / Strapi Cloud dashboards
- See [STRAPI_SETUP.md](./STRAPI_SETUP.md) for webhooks and API permissions
