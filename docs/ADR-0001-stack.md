# ADR-0001: Locked Stack

**Status:** Accepted
**Date:** 2026-05-06
**Decision-makers:** Claude (PM), Anthony (owner)

## Context

The user (owner) directed: OpenAI for LLM, ElevenLabs likely for TTS, "industry standard" for everything else, Render for hosting, **web only** (no native mobile app — the website itself must work well on mobile browsers), autonomous build, no per-decision sign-off.

This ADR locks every concrete choice so downstream agents (and future Claude sessions) do not relitigate them.

## Decisions

### Languages & Tooling
- **Language:** TypeScript end-to-end. Strict mode on.
- **Package manager:** pnpm (workspaces).
- **Monorepo orchestrator:** Turborepo.
- **Lint + format:** Biome (replaces ESLint + Prettier, single binary, fast).
- **Validation:** Zod for all runtime contracts (API I/O, AI outputs, env).
- **Testing:** Vitest (unit + integration), Playwright (e2e — desktop and mobile viewports).

### Web (the only client)
- **Framework:** Next.js 15 (App Router, RSC, Route Handlers).
- **UI:** React 19, Tailwind CSS 3, shadcn/ui, Framer Motion.
- **Responsive design:** Mobile-first. Tailwind breakpoints `sm` (640px) and up are progressive enhancements; the default styles target a 360px-wide phone viewport. Every interactive element is sized for touch (min 44×44px hit area).
- **State:** TanStack Query for server state, Zustand for client state.
- **Voice in browser:** MediaRecorder + Web Audio API for capture; HTMLAudioElement for playback. Works on mobile Safari and Chrome.
- **PWA-ready:** Manifest + service worker can be added later for "add to home screen" without a native app.

### Backend
- **Surface:** Next.js Route Handlers + Server Actions inside `apps/web`. One Render Web Service to deploy. Splitting into a separate Node service is deferred until traffic justifies it.
- **Server framework:** Next.js (no NestJS/Express layer).
- **Background jobs:** Render Cron Jobs for scheduled work (review reminders, comeback offers, daily report generation). Heavier queues (BullMQ + Redis/Render Key-Value) deferred until needed.

### Database
- **Primary:** PostgreSQL on Render (managed).
- **ORM:** Prisma. Migrations versioned in `packages/db/prisma/migrations`.
- **Vector store:** pgvector extension on the same Postgres instance. Avoids a second vendor for memory embeddings.
- **Connection pooling:** PgBouncer (Render provides) via `DATABASE_URL`; Prisma migrations use `DIRECT_URL`.

### Auth
- **Provider:** Clerk. Plays cleanly with Next.js App Router. Handles email, social, MFA, webhooks for user lifecycle.
- **Session-to-user mapping:** `User.id` is our internal UUID. We map `clerkUserId` → `User.id` in a join column.

### AI Providers
- **LLM:** OpenAI.
  - `gpt-4o-mini` for orchestration, intent classification, light correction.
  - `gpt-4o` for lesson generation, hard correction, memory extraction.
  - Model IDs centralized in `packages/ai/src/models.ts`.
- **STT:** OpenAI `whisper-1` (transcription endpoint). Future option: `gpt-4o-transcribe` if quality wins.
- **TTS:** ElevenLabs. Italian voice for Italian text, English voice for English text. Voice IDs configurable per-environment.
- **Embeddings:** OpenAI `text-embedding-3-small` for memory + skill retrieval. Stored in pgvector.
- **Architecture rule:** all provider calls go through `packages/ai`. No direct `openai` or `elevenlabs` imports in apps or services.

### Observability
- **Errors:** Sentry (browser + server).
- **Product analytics:** PostHog.
- **Logs:** Pino on the server, structured JSON.
- **Cost monitoring:** Per-request metadata (`UserEvent` with `event_type=ai_call`, payload includes `provider`, `model`, `tokens_in`, `tokens_out`, `latency_ms`).

### Deployment
- **Web Service:** Next.js on Render Web Service (Node). Defined in `render.yaml`.
- **Database:** Render PostgreSQL.
- **Cron Jobs:** Render Cron Jobs hitting internal endpoints in the web service.
- **Branching:** trunk (`main`). Render auto-deploys on push to `main`. No staging branch initially; preview environments via Render preview environments later.

## Consequences

### Positive
- Single Render service to operate. Single Postgres. Single LLM vendor. Low operational surface.
- TypeScript end-to-end means shared types between client and server with zero serialization mismatch.
- No App Store / Play Store gatekeepers, no native build pipeline, no second auth surface, no second analytics surface.
- Clerk + Render + OpenAI are all well-documented; new sessions can recover context from public docs.

### Negative / accepted trade-offs
- **Vendor lock-in to OpenAI** for LLM, STT, embeddings. Provider-agnostic abstraction in `packages/ai` lets us swap, but day-1 we are coupled.
- **Single Render region** — no multi-region until needed.
- **Next.js API routes for the backend** — fine until ~50k DAU; will revisit.
- **Clerk** has its own pricing curve; acceptable at launch, will reassess at scale.
- **No native app** — no offline mode, no push notifications, no App Store discoverability. Acceptable for v1; revisit if retention data demands it.
- **No staging environment** — ship gated by feature flags + the A13 eval harness instead.

## Open items deferred (not blockers)
- Italian voice talent decision (specific ElevenLabs voice IDs) — will pick best-rated Italian male+female for Wise.
- Whether to add Redis + BullMQ — defer until first slow background job.
- PWA install prompt + service worker (so the website can be added to the home screen) — defer to retention phase.
- COPPA / GDPR — will write privacy policy at launch readiness.

## References
- `00_PRD_Index_and_Agent_Handoff.md` — agent rules
- `Tech Arch & Data.md` — canonical entities and contracts (this ADR sits underneath it)
- `14_Build_Execution_Plan.md` — phased build order
