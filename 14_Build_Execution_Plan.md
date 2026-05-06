# Speakwise Build Execution Plan

## 1. Document Purpose

This document is the **operational playbook** for turning the Speakwise PRD package (Master PRD, Technical Architecture & Data Contracts PRD, and module PRDs `01` through `13`) into shipped software using a fleet of AI coding agents.

The Master PRD answers *what* we are building.
The Technical Architecture PRD answers *how it fits together*.
This document answers *who builds what, in what order, and under what rules*.

It is the source of truth for:

- Which agent owns which module PRD
- The sequence and parallelism of builds
- Hand-off contracts between phases
- The Pragmatic Programmer techniques every agent must follow
- Definition-of-done gates that block a phase from advancing

If anything in this document conflicts with the Master PRD or Technical Architecture PRD, the latter two win and this document must be updated.

## 2. Build Philosophy

### 2.1 Tracer Bullets, Not Big Bang

We do not build all 13 modules in isolation and integrate at the end. We build a **thin vertical slice** end-to-end as early as possible — a single learner can sign in, talk to Wise, complete one lesson task, get one correction, and have one memory note persisted — then thicken each layer.

### 2.2 Memory-Centric From Day One

Per the Critical Integration Principle in `00_PRD_Index_and_Agent_Handoff.md`, every meaningful interaction must strengthen the learner profile, curriculum progress, vocabulary state, memory notes, and recommendations. No agent ships a feature that produces orphan output.

### 2.3 Schemas Before Behavior

For every module, the data contracts and event contracts land first, are reviewed, and only then does behavior get implemented against them. AI outputs that affect product state must be schema-validated before persistence (Architecture Principle 3.4).

### 2.4 One Agent, One Module, One PR Stream

Each agent owns exactly one module PRD at a time. Cross-module work goes through an explicit hand-off, not a side-channel edit.

## 3. Agent Roster

We use named agent roles, not anonymous "agent 1 / agent 2," so ownership is legible in commits, PRs, and incident logs.

| Agent | Owns | Primary PRD |
|---|---|---|
| **A0 — Architect** | Repo scaffolding, shared schemas, CI, deploy pipeline, cross-cutting types | Tech Arch & Data |
| **A1 — Wise Core** | Wise orchestration layer, prompt routing, persona | `01_Wise_AI_Tutor_PRD.md` |
| **A2 — Onboarding** | Voice-first onboarding & placement | `02_Voice_First_Onboarding_PRD.md` |
| **A3 — Memory** | Learner profile, memory notes, profile API | `03_Learner_Memory_and_Profile_PRD.md` |
| **A4 — Curriculum** | Skill graph, curriculum spine, progress tracking | `04_Curriculum_and_Skill_Graph_PRD.md` |
| **A5 — Lessons** | Lesson/mission engine, session lifecycle | `05_Lesson_and_Mission_Engine_PRD.md` |
| **A6 — Interface** | Voice + chat UI, STT/TTS plumbing, text fallback | `06_Voice_and_Chat_Interface_PRD.md` |
| **A7 — Practice** | Practice modes, drill loops | `07_Practice_Modes_PRD.md` |
| **A8 — Correction** | Correction & feedback engine | `08_Correction_and_Feedback_Engine_PRD.md` |
| **A9 — Retention** | Gamification, streaks, comeback flows | `09_Gamification_and_Retention_PRD.md` |
| **A10 — Media** | Media + clip-based learning | `10_Media_and_Clip_Based_Learning_PRD.md` |
| **A11 — Analytics** | Progress analytics & reports | `11_Progress_Analytics_and_Reports_PRD.md` |
| **A12 — Tutor Mode** | Human-tutor-supported rooms (deferred) | `12_Tutor_Mode_PRD.md` |
| **A13 — AdminOps** | Admin console, prompt ops, eval harness | `13_Admin_and_Prompt_Ops_PRD.md` |

A0 (Architect) is special: it is always running. Every other agent reads from A0's outputs and submits hand-off artifacts back to A0 for review at phase boundaries.

## 4. Phased Build Sequence

The dependency order from the Index is preserved. This document adds **parallelism, gates, and tracer-slice deliverables**.

### Phase 0 — Foundations (A0 only, serial)

Goal: a runnable skeleton with shared types, auth stub, persistence, event bus, and CI.

Deliverables:
- Monorepo scaffolding, lint, type-check, test runner, CI green on empty
- Canonical entity types from Tech Arch §5: `User`, `LearnerProfile`, `CurriculumSkill`, `UserSkillProgress`, `VocabularyItem`, `Lesson`, `LessonTask`, `Session`, `UserResponse`, `Correction`, `MemoryNote`, `MediaItem`, `UserEvent`
- Event bus stub with the `UserEvent` envelope
- Schema-validation helper (`zod` or equivalent) wired in
- AI client wrapper with prompt-template loader (no prompts inline in UI)
- Deploy target reachable, healthcheck endpoint live

**Gate to Phase 1:** A0 publishes a `CONTRACTS.md` snapshot. No other agent starts until this exists.

### Phase 1 — Memory & Curriculum Spine (A3 + A4 in parallel)

Goal: the system has somewhere to remember things and a curriculum to teach.

- A3 builds `LearnerProfile`, `MemoryNote`, profile read/write APIs, profile events.
- A4 builds `CurriculumSkill` graph, `UserSkillProgress`, the seed Italian curriculum content, skill-lookup APIs.

Both consume A0's canonical types. They do **not** call each other yet — A1 wires them together in Phase 2.

**Gate to Phase 2:** Both modules pass schema-contract tests against A0's `CONTRACTS.md`. Seed data loads in CI.

### Phase 2 — Wise Orchestrator + Tracer Slice (A1 leads, A6 + A5 thin)

Goal: end-to-end *thin* slice — a user opens the app, says hello, Wise greets them, returns one lesson task, accepts one response, persists a memory note.

- A1 builds Wise's prompt routing, persona, and the orchestrator that reads from A3/A4.
- A6 ships a *minimum* voice + text interface: STT in, TTS out, text fallback works.
- A5 ships *one* lesson template and one task type so the slice has something to play.

This is the tracer bullet. It is intentionally narrow. Do not thicken until the bullet hits the target.

**Gate to Phase 3:** A demo recording shows: cold start → greeting → one task → one persisted memory note visible in A3's store → one progress increment in A4's store.

### Phase 3 — Core Learning Loop (A2, A5-thicken, A7, A8 in parallel)

Once the tracer slice works, four agents thicken the loop concurrently:

- A2 — Onboarding & placement (writes into A3's profile)
- A5 — Full lesson/mission engine (uses A4's skill graph, hands tasks to A6, results to A8)
- A7 — Practice modes (drills, spaced repetition, listening, speaking)
- A8 — Correction & feedback engine (consumes `UserResponse`, emits `Correction`)

Each agent integrates against the live Wise orchestrator from Phase 2 — not against a mock.

**Gate to Phase 4:** A learner can be onboarded from zero, complete a multi-task mission, receive level-appropriate corrections, and resume the next day with continuity.

### Phase 4 — Retention & Expansion (A9, A11, A10, A13 in parallel; A12 deferred)

- A9 — Streaks, XP, comeback flows
- A11 — Progress analytics & weekly reports
- A10 — Media / clip-based learning
- A13 — Admin console + prompt-ops eval harness

A12 (Tutor Mode) is explicitly deferred. The data model from Tech Arch already supports it; the UI and workflow ship later.

**Gate to launch readiness:** A13's eval harness runs against the live system and passes the per-module acceptance criteria from each PRD.

## 5. Parallelism Rules

An agent may run in parallel with another agent if **all** of the following are true:

1. They do not write to the same canonical entity definitions.
2. Their PRDs do not name each other as a hard dependency in §"APIs consumed."
3. The contracts they need are already published in A0's `CONTRACTS.md`.

If any of those is false, the agent waits or coordinates through A0.

## 6. Pragmatic Programmer Rules — Mandatory For Every Agent

Every agent must follow these. Code review (human or A0) rejects work that violates them.

### 6.1 DRY — Don't Repeat Yourself
One canonical definition per concept. If you find yourself writing the same `LearnerProfile` shape in two files, stop and import it from A0's shared types. The Architecture PRD's "Do not rename canonical entities" rule is DRY enforcement.

### 6.2 Orthogonality
Modules change independently. A change to A8 (corrections) must not force a change in A4 (curriculum). If it does, the seam is wrong — escalate to A0.

### 6.3 Tracer Bullets
Phase 2 is the tracer bullet. After Phase 2, every new feature should also be built as the thinnest possible end-to-end version first, then thickened. No agent disappears for two weeks and returns with a 5,000-line PR.

### 6.4 Prototype to Learn, Then Throw Away
For risky areas (real-time voice latency, AI grading reliability, prompt regression), build a throwaway spike, learn from it, then write the real implementation. Do not promote a spike to production by accident.

### 6.5 Design by Contract
Every public function and every AI output has a schema. Inputs validated at the boundary, outputs validated before persistence. The Tech Arch PRD §3.4 makes this binding.

### 6.6 Crash Early
A schema validation failure on an AI output is not a "log a warning and continue" event. It throws, the request fails, the user gets a graceful retry, and the failure is recorded as a `UserEvent` for A13's eval harness.

### 6.7 Assertive Programming
Invariants are checked, not assumed. If a `Session` reaches the correction engine without a linked `LearnerProfile`, that is an assertion failure, not a defensive `if (profile) { ... }`.

### 6.8 Decoupling & the Law of Demeter
Wise (A1) does not reach through `session.user.profile.preferences.tone`. It asks A3 for the profile and A3 returns what Wise needs. No deep object archaeology across module boundaries.

### 6.9 Refactor, Don't Rewrite
If A5 needs a change in A4's skill graph, A4 refactors. A5 does not fork the type. The Index's "Do not duplicate logic that belongs to another module" rule is the refactor-don't-rewrite rule.

### 6.10 Test Ruthlessly, Especially the Seams
Every module ships with:
- Unit tests for pure logic
- Schema-contract tests against A0's types
- One integration test that exercises the seam to at least one other module
- One eval test for any AI-generated output (prompt + golden output, run by A13's harness)

### 6.11 Don't Program by Coincidence
If something works and you don't know why, you do not ship it. Especially true for prompt engineering: a prompt that "seems to give good output" without a documented eval is not done.

### 6.12 Fix the Problem, Not the Blame
A failing eval is not "the model's fault." It is a prompt, schema, or context-assembly bug owned by the agent whose module produced the input.

### 6.13 Good-Enough Software
The first cut of every module hits the PRD's acceptance criteria, no more. Polish is a separate, scoped pass after Phase 4.

### 6.14 The Broken Window Theory
If you see a TODO, a stale comment, a swallowed error, or a duplicated type while working in a file, fix it or file it. Do not leave it for the next agent.

## 7. Hand-Off Protocol Between Agents

When agent X finishes a module that agent Y depends on:

1. X publishes the module's API surface (types, endpoints, events emitted, events consumed) into a `HANDOFF.md` in the module folder.
2. X writes a one-page integration example showing the happy path Y will follow.
3. X tags A0 for a contract review. A0 either accepts and merges into `CONTRACTS.md` or sends it back.
4. Only after merge into `CONTRACTS.md` may Y begin integration work against X.

Verbal "it's ready" is not a hand-off.

## 8. Definition of Done — Per Module

A module PRD is "done" only when **all** of the following are true:

- All acceptance criteria in its PRD §"Acceptance criteria" pass
- Schema-contract tests green against A0's `CONTRACTS.md`
- Integration test against at least one neighbor module green
- Eval harness (A13) green for any AI-generated output
- `HANDOFF.md` published and merged into `CONTRACTS.md`
- The module's emitted `UserEvent`s are visible in A11's analytics
- No prompts live inside UI components (Architecture rule)
- Voice path AND text fallback both work (Architecture rule)

## 9. Risks This Plan Actively Mitigates

| Risk | Mitigation in this plan |
|---|---|
| Agents inventing parallel definitions of `LearnerProfile` | A0 owns canonical types; §6.1 DRY rule |
| AI features producing data the rest of the system cannot read | §2.3 schemas-first; §6.5 Design by Contract |
| Late-stage integration explosion | §2.1 tracer bullet in Phase 2 |
| Prompts duplicated across UI components | A0 prompt-template loader; Architecture rule |
| "Voice-only" features with no text fallback | §8 Definition of Done gate |
| Drift between what AI generates and what gets persisted | §6.6 Crash Early on schema validation; A13 eval harness |
| Module scope creep | §3 one agent / one module / one PR stream |

## 10. What This Plan Deliberately Does Not Do

- It does not assign calendar dates. Estimates belong in the project tracker, not in source-of-truth docs.
- It does not pick the LLM, the STT/TTS vendor, or the database. Those live in the Technical Architecture PRD.
- It does not replace the per-module PRDs. Each agent still reads its assigned PRD top-to-bottom before writing code.
- It does not authorize any agent to modify the Master PRD or Technical Architecture PRD. Those are read-only inputs to this build.
