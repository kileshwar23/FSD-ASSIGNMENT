# BugForge — Engineering Report

**Candidate:** Kileshwar Turkar
**Date:** July 13, 2026
**Repository:** https://github.com/kileshwar23/FSD-ASSIGNMENT

---

## 1. Executive Summary

BugForge is a full-stack project and task management application built as a pnpm monorepo. The codebase was reviewed as a production incident exercise to identify, fix, and document defects.

A complete audit of the backend API, frontend, and infrastructure was performed. **13 issues were found and resolved** — spanning critical security vulnerabilities, runtime crashes, frontend bugs, and broken Docker builds. All fixes were targeted and minimal. No features were removed, no architecture was changed, and the full CI pipeline (lint → typecheck → test → build) passes cleanly after all changes.

**Outcome:** API connected to MongoDB Atlas, both services running, registration and login verified end-to-end.

---

## 2. Issues Found

### Backend

| # | Severity | File | Issue | Impact |
|---|----------|------|-------|--------|
| 1 | 🔴 Critical | `auth-controller.ts` | `import { z }` placed at bottom of file | `PATCH /auth/me` crashes with `ReferenceError` on every call |
| 2 | 🔴 Critical | `auth-controller.ts` | Plaintext password written to Pino log | Every login exposes user credentials in log output permanently |
| 3 | 🔴 Critical | `auth-controller.ts` | `...input` spread passes `password` field into `UserModel.create` | Any future schema addition could silently persist plaintext passwords to the database |
| 4 | 🔴 Critical | `task-controller.ts` | Raw `req.body` passed to MongoDB with no Zod validation | Authenticated user can overwrite any field including `project` and `createdBy`, or inject MongoDB operators |
| 5 | 🔴 Critical | `middleware/error.ts` | Error handler has 3 parameters instead of 4 | Express never invokes it — all unhandled errors cause silent crashes |
| 6 | 🟡 Minor | `comment-controller.ts` | `createComment` returns HTTP `200` instead of `201` | Incorrect REST semantics for resource creation |
| 7 | 🟡 Minor | `project-controller.ts` | `archivedAt: null` filter misses documents where field was never set | Newly created projects do not appear in the project list |
| 8 | 🟡 Minor | `models/user.ts` | Duplicate index on `email` field | Mongoose warning on every server start, pollutes logs |

### Frontend

| # | Severity | File | Issue | Impact |
|---|----------|------|-------|--------|
| 9 | 🔴 Critical | `dashboard/page.tsx` | `useEffect` depending on its own state | Dashboard enters infinite render loop — page is completely unusable |
| 10 | 🔴 Critical | `projects/page.tsx` | `dangerouslySetInnerHTML` on unsanitized user content | Stored XSS — any user can inject scripts that execute in other users' browsers |
| 11 | 🟠 High | `app-shell.tsx` | `setInterval` with no cleanup in `useEffect` | Intervals accumulate on every mount — dozens of concurrent API requests and memory leak |
| 12 | 🟠 High | `auth-form.tsx` | `signIn` called even when registration fails | Shows wrong error message and makes unnecessary API call on register failure |

### Infrastructure

| # | Severity | File | Issue | Impact |
|---|----------|------|-------|--------|
| 13 | 🔴 Critical | `api/Dockerfile`, `web/Dockerfile` | Both use `npm install` in a pnpm monorepo | Docker ignores the lockfile, resolves wrong versions, builds fail entirely |

---

## 3. Fixes Made

| # | Fix Applied | Alternative Considered |
|---|-------------|----------------------|
| 1 | Moved `import { z }` to top of file | No alternative — ES module imports must be at top |
| 2 | Removed `password` from the log object | Pino redaction serializer — rejected, unnecessary complexity |
| 3 | Replaced `...input` with explicit fields `{ name, email, passwordHash }` | `registerSchema.omit({ password: true })` — valid, but explicit fields are clearer |
| 4 | Added `taskSchema.partial().parse(req.body)` validation | Separate `updateTaskSchema` — rejected, `.partial()` is idiomatic and avoids duplication |
| 5 | Added `_next: NextFunction` as the required 4th parameter | Wrapping in a 4-param outer function — rejected as unnecessary indirection |
| 6 | Changed `respond(res, 200, ...)` to `respond(res, 201, ...)` | No alternative needed |
| 7 | Replaced `{ archivedAt: null }` with `$and + $or` to match both `null` and absent field | Setting a schema default of `null` — valid long-term but requires a data migration |
| 8 | Removed the redundant `userSchema.index()` call | No alternative needed |
| 9 | Removed the entire `useState` + `useEffect` block — it served no purpose | No alternative — the code was purely erroneous |
| 10 | Replaced `dangerouslySetInnerHTML` with standard JSX text rendering | DOMPurify sanitization — rejected, descriptions have no HTML requirement |
| 11 | Added `return () => clearInterval(intervalId)` cleanup | TanStack Query `refetchInterval` — better long-term approach, noted as a future improvement |
| 12 | Wrapped register in explicit `if` block to make control flow unambiguous | No structural alternative needed |
| 13 | Updated both Dockerfiles to install pnpm and use `pnpm install --frozen-lockfile` | `corepack enable` — valid but adds complexity in Alpine images |

---

## 4. Verification

### Automated
```
pnpm typecheck   → ✅ 0 errors (api + web)
pnpm build       → ✅ Compiled cleanly (api + web, 9 Next.js routes)
pnpm test        → ✅ 2/2 tests passing
```

### API (curl)
```bash
# Health
curl http://localhost:4001/health
# → {"success":true,"message":"Healthy","data":{"status":"ok"}}

# Register
curl -X POST http://localhost:4001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"password123"}'
# → {"success":true,"message":"Account created","data":{...tokens}}

# Login
curl -X POST http://localhost:4001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
# → {"success":true,"message":"Signed in","data":{...tokens}}
```

### Frontend (manual)
- Registration and login flow work end-to-end at `http://localhost:3001`
- Dashboard loads correctly with no render loop
- Notification polling runs once every 5 seconds with no request accumulation (verified in browser Network tab)
- Project descriptions render as plain text — no HTML injection possible
- Dark mode toggle and navigation work correctly

---

## 5. Remaining Risks

| Risk | Severity | Description |
|------|----------|-------------|
| No rate limiting on auth endpoints | 🔴 High | `POST /auth/login` accepts unlimited attempts — brute force is possible |
| Weak JWT secret defaults in `.env.example` | 🔴 High | Deploying without changing the placeholder secret allows token forgery |
| Refresh token not rotated on use | 🟠 Medium | A stolen refresh token remains valid for 7 days with no detection mechanism |
| No HTTPS in Nginx config | 🟠 Medium | All tokens and credentials transmitted in plaintext over HTTP |
| ObjectId params not validated | 🟡 Low | Invalid IDs return a generic 500 instead of a proper 400 response |

---

## 6. Recommended Improvements

**Security (high priority)**
- Add `express-rate-limit` on all auth endpoints (10 req / 15 min per IP)
- Implement refresh token rotation — issue a new refresh token on every refresh request
- Add `helmet()` middleware for security headers (CSP, HSTS, X-Frame-Options)
- Add SSL termination to the Nginx reverse proxy

**Performance**
- Replace notification polling with Server-Sent Events for real-time updates without the per-user 5-second request overhead
- Add `limit`/`offset` pagination to all list endpoints (`/projects`, `/tasks`, `/notifications`)
- Add compound index `{ assignee: 1, status: 1 }` on `TaskModel` for dashboard query performance

**Code Quality**
- Expand test coverage with integration tests for auth flow, authorization checks, and task CRUD edge cases
- Validate ObjectId route parameters — return `400 Bad Request` for malformed IDs
- Add `x-request-id` tracing through Pino for correlating logs per request

---

*13 issues identified — 13 resolved. No features removed. CI passes.*
