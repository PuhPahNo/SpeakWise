# Admin and Prompt Ops PRD

## 1. Module Purpose

The Admin and Prompt Ops module gives the internal Speakwise team control over prompts, curriculum, feature flags, usage, quality review, and system behavior.

Because Speakwise depends heavily on AI, prompt and model operations must be treated as product infrastructure, not hidden code scattered across components.

## 2. Product Goals

- Centralize prompt templates and versions.
- Allow admins to manage curriculum skills.
- Monitor AI quality and failures.
- Control feature flags.
- Track usage and costs.
- Support safe iteration of Wise behavior.
- Prevent prompt sprawl across the codebase.

## 3. Admin User Stories

- As an admin, I want to view and edit prompt templates.
- As an admin, I want to version prompts and roll back if needed.
- As an admin, I want to manage Italian curriculum skills.
- As an admin, I want to monitor AI usage and costs.
- As an admin, I want to inspect failed lesson generations or correction issues.
- As an admin, I want to enable/disable experimental features.

## 4. Prompt Template Management

Prompt templates should exist for:

- Wise core system prompt
- Onboarding
- Placement assessment
- Lesson generation
- Practice generation
- Correction
- Memory extraction
- Progress report
- Media lesson generation
- Comeback lesson
- Freestyle conversation

## 5. PromptTemplate Entity

Suggested fields:

- id
- name
- slug
- category
- version
- content
- input_schema
- output_schema
- model_config
- status
- created_by
- created_at
- updated_at

Statuses:

- draft
- active
- archived
- testing

## 6. Prompt Versioning Requirements

Admins should be able to:

- Create new prompt version
- Compare versions
- Activate version
- Archive version
- Roll back to prior version
- Add notes/changelog

Prompt changes should be auditable.

## 7. Model Configuration

Prompt templates may specify:

- Model provider
- Model name
- Temperature
- Max tokens
- Structured output schema
- Tool access
- Fallback model

## 8. Curriculum Admin Requirements

Admin can manage CurriculumSkill records:

- Create skill
- Edit skill
- Set level
- Set category
- Add prerequisites
- Add examples
- Add common mistakes
- Activate/deactivate

Admin should be able to seed and refine Italian curriculum.

## 9. Feature Flags

Feature flags should control:

- Voice onboarding
- Hands-free voice
- Media lessons
- Mission mode
- Tutor mode
- Strict correction mode
- Placement assessment
- Progress dashboard
- Experimental prompts

## 10. Usage and Cost Monitoring

Track:

- AI calls by type
- Token usage
- Voice transcription minutes
- TTS characters/minutes
- Embedding calls
- Lesson generations
- Correction evaluations
- Memory extraction runs
- Media imports
- Errors/failures

## 11. Quality Review

Admin should inspect:

- Failed AI generations
- Invalid structured outputs
- User-reported bad corrections
- Low-rated lessons
- Media rights flags
- Prompt version performance

## 12. Admin Screens

### Prompt Library

- List prompt templates
- Category filter
- Active version
- Status
- Edit/open

### Prompt Editor

- Prompt content
- Input schema
- Output schema
- Model config
- Version notes
- Test prompt button

### Curriculum Admin

- Skill list
- Skill editor
- Prerequisite graph view later

### Usage Dashboard

- AI calls
- Cost estimates
- Error rates
- Feature usage

### Quality Review Queue

- Failed generations
- Reported corrections
- Invalid outputs
- Media issues

### Feature Flags

- Flag list
- Enable/disable
- Environment targeting

## 13. API Requirements

### GET /api/admin/prompts

List prompt templates.

### POST /api/admin/prompts

Create prompt template.

### PATCH /api/admin/prompts/:promptId

Update prompt template.

### POST /api/admin/prompts/:promptId/activate

Activate prompt version.

### POST /api/admin/prompts/:promptId/test

Run prompt test.

### GET /api/admin/curriculum/skills

List curriculum skills.

### POST /api/admin/curriculum/skills

Create curriculum skill.

### PATCH /api/admin/curriculum/skills/:skillId

Update curriculum skill.

### GET /api/admin/usage

Usage dashboard data.

### GET /api/admin/quality-queue

Quality review items.

### GET /api/admin/feature-flags

List feature flags.

### PATCH /api/admin/feature-flags/:flagId

Update flag.

## 14. Events Emitted

- PromptTemplateCreated
- PromptTemplateUpdated
- PromptVersionActivated
- PromptVersionRolledBack
- CurriculumSkillCreated
- CurriculumSkillUpdated
- FeatureFlagUpdated
- QualityIssueReviewed

## 15. Security Requirements

- Admin routes require admin role.
- Prompt edits should be auditable.
- Usage logs should avoid exposing unnecessary personal data.
- Admin access should be minimal and controlled.
- Dangerous prompt changes should not go live accidentally.

## 16. Prompt Testing Requirements

Admins should test prompts with sample contexts.

Test results should show:

- Raw model output
- Parsed structured output
- Schema validation success/failure
- Token usage
- Latency
- Estimated cost

## 17. Non-Goals

This module does not own:

- User-facing learning flows
- Wise runtime orchestration itself
- Core database schema design
- Full customer support tooling
- Billing system

## 18. Acceptance Criteria

Admin/Prompt Ops is acceptable when:

- Prompt templates can be stored outside UI components.
- Prompt versions can be activated and archived.
- Admin can manage curriculum skills.
- Feature flags can enable/disable modules.
- Usage metrics can be viewed.
- Failed AI outputs can be reviewed.
- Admin routes are protected.


## Agent Build Rules

- Treat the Master PRD and Technical Architecture/Data Contracts PRD as source-of-truth documents.
- Do not rename canonical entities such as User, LearnerProfile, CurriculumSkill, UserSkillProgress, VocabularyItem, Lesson, LessonTask, Session, UserResponse, Correction, MemoryNote, MediaItem, or UserEvent.
- Do not store prompts inside UI components.
- All AI outputs that affect product state must be schema-validated before persistence.
- Voice-first does not mean voice-only. Every flow must have a text fallback.
- Italian is the first target language and English is the first native language, but data structures should not block future language expansion.
- Emit the required events when core user actions occur.
- Keep module ownership clean. Do not duplicate logic that belongs to another module.
