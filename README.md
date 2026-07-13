# BugForge

A full-stack project and task management application — a lightweight Jira-style workspace for teams to track bugs, manage projects, and ship work faster.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js + Express + TypeScript |
| Database | MongoDB (Mongoose) |
| Auth | JWT (access + refresh tokens) |
| Validation | Zod |
| Logging | Pino |
| Frontend | Next.js 15 (App Router) + React 19 |
| Styling | Tailwind CSS + Radix UI |
| State | TanStack Query v5 + React Hook Form |
| Infra | Docker Compose + Nginx |
| CI/CD | GitHub Actions + pnpm monorepo + Husky |

---

## Project Structure

```
bugforge/
├── apps/
│   ├── api/                  # Express REST API
│   │   ├── src/
│   │   │   ├── controllers/  # Route handlers
│   │   │   ├── middleware/   # Auth, error, access control
│   │   │   ├── models/       # Mongoose models
│   │   │   ├── routes/       # API routes
│   │   │   ├── services/     # Activity & notification services
│   │   │   ├── utils/        # Helpers (tokens, api response, async handler)
│   │   │   ├── validators/   # Zod schemas
│   │   │   └── config/       # DB + env config
│   │   └── tests/            # Vitest unit tests
│   └── web/                  # Next.js frontend
│       ├── app/
│       │   ├── (auth)/       # Login, Register, Forgot Password
│       │   └── (dashboard)/  # Dashboard, Projects, Tasks, Settings
│       ├── components/       # Reusable UI components
│       ├── contexts/         # Auth context
│       ├── services/         # API client
│       └── types/            # Shared TypeScript types
├── nginx/                    # Nginx reverse proxy config
├── docker-compose.yml        # Full stack Docker setup
└── .github/workflows/        # CI pipeline
```

---

## Features

- **Authentication** — Register, login, logout, token refresh, forgot password
- **Projects** — Create, update, delete, archive projects with team members
- **Tasks** — Kanban board with statuses (backlog / todo / in progress / done), priorities, assignees, labels, due dates
- **Comments** — Comment on tasks with real-time activity logging
- **Notifications** — In-app notifications for assignments and comments
- **Dashboard** — Stats overview, assigned tasks, recent activity feed
- **Dark mode** — System-aware theme switching

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- MongoDB (local or Atlas)

### 1. Install pnpm

```bash
npm install -g pnpm --prefix ~/.npm-global
export PATH="$HOME/.npm-global/bin:$PATH"
```

### 2. Clone and install dependencies

```bash
git clone https://github.com/kileshwar23/FSD-ASSIGNMENT.git
cd FSD-ASSIGNMENT
pnpm install
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/bugforge
JWT_ACCESS_SECRET=your-long-random-secret-min-32-chars
JWT_REFRESH_SECRET=your-different-long-random-secret
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=7d
API_PORT=4001
NEXT_PUBLIC_API_URL=http://localhost:4001/api/v1
```

Also create `apps/web/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4001/api/v1
```

### 4. Run in development

Open two terminals:

**Terminal 1 — API:**
```bash
pnpm --filter @bugforge/api dev
```

**Terminal 2 — Web:**
```bash
pnpm --filter @bugforge/web dev
```

- Web: http://localhost:3001
- API: http://localhost:4001/api/v1
- Health check: http://localhost:4001/health

---

## Run with Docker

The easiest way to run everything (MongoDB + API + Web + Nginx) in one command:

```bash
cp .env.example .env
# Edit .env with your secrets
docker compose up --build
```

App opens at: **http://localhost**

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login |
| POST | `/api/v1/auth/refresh` | Refresh access token |
| POST | `/api/v1/auth/logout` | Logout |
| POST | `/api/v1/auth/forgot-password` | Request password reset |
| GET | `/api/v1/auth/me` | Get current user profile |
| PATCH | `/api/v1/auth/me` | Update profile |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/projects` | List user's projects |
| POST | `/api/v1/projects` | Create project |
| GET | `/api/v1/projects/:id` | Get project |
| PATCH | `/api/v1/projects/:id` | Update project |
| DELETE | `/api/v1/projects/:id` | Delete project |
| POST | `/api/v1/projects/:id/archive` | Archive project |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/projects/:id/tasks` | List tasks |
| POST | `/api/v1/projects/:id/tasks` | Create task |
| GET | `/api/v1/tasks/:id` | Get task |
| PATCH | `/api/v1/tasks/:id` | Update task |
| DELETE | `/api/v1/tasks/:id` | Delete task |

### Comments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/tasks/:id/comments` | List comments |
| POST | `/api/v1/tasks/:id/comments` | Add comment |

### Other
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/dashboard` | Dashboard stats |
| GET | `/api/v1/notifications` | List notifications |
| PATCH | `/api/v1/notifications/:id/read` | Mark as read |

---

## Scripts

```bash
pnpm install          # Install all dependencies
pnpm dev              # Run both API and web in parallel
pnpm build            # Build both apps
pnpm lint             # Lint all packages
pnpm typecheck        # TypeScript check all packages
pnpm test             # Run API tests
pnpm format           # Format with Prettier
```

---

## Bugs Fixed

The following issues were identified and resolved from the original codebase:

| # | File | Issue |
|---|------|-------|
| 1 | `auth-controller.ts` | `import { z }` placed at bottom of file — runtime crash |
| 2 | `auth-controller.ts` | Plaintext password logged via Pino — security breach |
| 3 | `auth-controller.ts` | `...input` spread leaked `password` field into DB create |
| 4 | `task-controller.ts` | Raw `req.body` passed to MongoDB with no Zod validation |
| 5 | `middleware/error.ts` | Error handler had 3 params — Express never called it as error handler |
| 6 | `comment-controller.ts` | `createComment` returned HTTP 200 instead of 201 |
| 7 | `project-controller.ts` | `archivedAt: null` filter missed documents where field was never set |
| 8 | `dashboard/page.tsx` | `useEffect` depending on its own state causing infinite render loop |
| 9 | `app-shell.tsx` | `setInterval` with no cleanup — memory leak on every mount |
| 10 | `projects/page.tsx` | `dangerouslySetInnerHTML` on unsanitized user content — XSS vulnerability |
| 11 | `auth-form.tsx` | `signIn` called even when `register` API call failed |
| 12 | `Dockerfile` (both) | Used `npm install` in a pnpm monorepo — Docker builds would fail |
| 13 | `models/user.ts` | Duplicate index on `email` field causing Mongoose warning |

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | required |
| `JWT_ACCESS_SECRET` | Secret for signing access tokens (min 32 chars) | required |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens (min 32 chars) | required |
| `ACCESS_TOKEN_TTL` | Access token expiry | `15m` |
| `REFRESH_TOKEN_TTL` | Refresh token expiry | `7d` |
| `API_PORT` | Port for the Express API | `4000` |
| `NEXT_PUBLIC_API_URL` | Base URL for the frontend API client | required |

---

## License

MIT
