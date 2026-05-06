Speakwise Technical Architecture and Data Contracts PRD v1

1. Document Purpose

This PRD defines the technical architecture, core data model, API contracts, event contracts, AI orchestration boundaries, and agent build rules for Speakwise.

This document exists to prevent multiple AI coding agents from independently inventing conflicting versions of the same product concepts.

All implementation agents must treat this document as the technical source of truth unless a later architecture document explicitly replaces it.

2. Product Context

Speakwise is a voice-first AI language-learning platform for adults learning Italian.

The core experience is powered by Wise, a personal AI language tutor that remembers the learner, adapts to their goals and interests, guides them through a structured curriculum, and turns learning into personalized interactive sessions.

Initial launch scope:

* Native language: English
* Target language: Italian
* Primary user: self-led adult learner
* Future expansion: tutor-supported rooms, additional languages, richer media, advanced analytics

3. Architecture Principles

3.1 Voice-First, Text-Compatible

Every major learning action must support voice interaction, but no feature may be voice-only.

Text fallback must exist for:

* Onboarding
* Commands
* Lesson interaction
* Practice answers
* Corrections
* Profile editing
* Settings

3.2 Memory-Centric

Learner memory is a first-class product primitive.

The application should not treat AI interactions as isolated chat threads. Every meaningful session should be able to update:

* Learner profile
* Skill progress
* Vocabulary progress
* Mistake patterns
* Preferences
* Session history
* Next recommendations

3.3 Structured Curriculum, Dynamic Content

The curriculum should be structured underneath but personalized on the surface.

The system should maintain a canonical curriculum and skill graph, while Wise dynamically adapts lesson content to the learner’s goals, interests, level, and recent performance.

3.4 AI-Orchestrated, Not AI-Random

AI should not generate product structure from scratch each time.

AI should operate inside product-owned schemas:

* Lesson plan schema
* Mission schema
* Practice task schema
* Correction schema
* Memory update schema
* Progress summary schema

3.5 Modular Ownership

Each module must own a clear domain.

No module should create duplicate versions of:

* User
* LearnerProfile
* CurriculumSkill
* UserSkillProgress
* VocabularyItem
* Lesson
* Session
* UserResponse
* MemoryNote
* MediaItem

3.6 Event-Driven Learning Updates

Major user actions should emit domain events so other systems can update derived state.

Examples:

* LessonCompleted
* PracticeAnswered
* VocabularyReviewed
* MistakeDetected
* MemoryUpdated
* SkillMasteryChanged
* UserMissedPlannedSession

3.7 Agent-Safe Build Discipline

AI coding agents must implement against explicit contracts.

Agents should not infer hidden behavior, rename canonical entities, or create parallel schemas unless the architecture is intentionally revised.

4. Recommended Tech Stack

This stack is recommended for a fast, modern, AI-native web application.

4.1 Frontend

Recommended:

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion for high-polish interaction
* Zustand or TanStack Query for client/server state boundaries

Primary UI style:

* Premium but playful
* Hybrid of Jarvis-style command center and modern learning dashboard
* Voice-first interaction zone
* Clear progress visibility
* Not childish

4.2 Backend

Recommended:

* Next.js API routes/server actions for early simplicity, or separate Node/NestJS backend if scaling complexity warrants it
* TypeScript end-to-end
* REST endpoints initially, with clean service boundaries
* Background jobs for memory processing, review scheduling, and analytics summaries

4.3 Database

Recommended:

* PostgreSQL as primary relational database
* Prisma ORM or Drizzle ORM

Postgres should store canonical application state:

* Users
* Profiles
* Lessons
* Sessions
* Responses
* Vocabulary
* Skills
* Progress
* Settings
* Events

4.4 Vector / Semantic Memory

Recommended:

* pgvector if using Postgres-first architecture
* Or a dedicated vector database later if scale requires it

Vector memory should be used for semantic retrieval of:

* Session summaries
* Memory notes
* Tutor observations
* User preferences
* Recurring mistake patterns
* Relevant prior explanations

Do not use vector memory as the sole source of truth for structured progress.

4.5 Auth

Recommended:

* Clerk, Auth.js, or Supabase Auth

Initial roles:

* learner
* admin

Future roles:

* tutor
* student
* organization_admin

4.6 AI Providers

The architecture should be provider-agnostic.

AI model routing should support:

* General language reasoning
* Structured lesson generation
* Correction and grading
* Memory extraction
* Voice transcription
* Text-to-speech
* Pronunciation analysis if available
* Embeddings

The application should not hard-code prompts directly into UI components.

4.7 Voice Pipeline

Voice system should support:

* Speech-to-text
* Text-to-speech
* Voice activity detection if possible
* Interruptions
* Push-to-talk mode
* Hands-free mode later
* Turn-taking state
* Fallback to text

Early implementation may use browser audio APIs plus hosted AI speech services.

5. System Modules

5.1 Auth and Account Module

Owns:

* Signup
* Login
* User account
* Role
* Session auth
* Account settings

Does not own:

* Learner profile
* Learning preferences
* Curriculum progress

5.2 Onboarding Module

Owns:

* Voice/text onboarding flow
* Native language selection
* Target language selection
* Goal capture
* Interest capture
* Learning style preference
* Wise personality preference
* Initial level selection
* Placement assessment trigger
* Initial learner profile creation

Emits:

* OnboardingStarted
* OnboardingCompleted
* LearnerProfileCreated
* PlacementAssessmentRequested

5.3 Wise AI Tutor Module

Owns:

* AI orchestration
* Conversation state
* System prompt selection
* Tool/function routing
* Lesson recommendations
* Command interpretation
* Tutor response style

Does not own canonical data directly.

Wise reads from and writes through service APIs.

5.4 Learner Memory Module

Owns:

* Memory notes
* Memory extraction
* Memory retrieval
* User-visible learning profile summaries
* Internal tutor observations
* Memory confidence
* Memory visibility

Does not own:

* Raw lesson content
* Raw user responses
* Canonical skill mastery
* Canonical vocabulary status

5.5 Curriculum Module

Owns:

* Curriculum skills
* Skill graph
* Prerequisites
* Suggested order
* CEFR-like level mapping
* Skill categories

Does not own:

* User-specific mastery state
* Lesson sessions

5.6 Progress Module

Owns:

* UserSkillProgress
* Mastery scores
* Review scheduling
* Weak spot calculation
* Progress dashboards
* Progress reports

Consumes:

* PracticeAnswered
* LessonCompleted
* MistakeDetected
* VocabularyReviewed

5.7 Vocabulary Module

Owns:

* Vocabulary items
* Example sentences
* Status
* Mastery score
* Review scheduling
* Tags
* Source lesson references

Consumes:

* VocabularyIntroduced
* VocabularyReviewed
* VocabularyMastered

5.8 Lesson / Mission Engine Module

Owns:

* Lesson generation
* Mission generation
* Lesson state
* Lesson templates
* Lesson structure
* Task sequencing
* Session start/completion

Reads:

* Learner profile
* Curriculum state
* Skill progress
* Vocabulary
* Memory notes
* Preferences

Writes:

* Lesson
* Session
* Practice prompts
* Lesson summaries

5.9 Practice Module

Owns:

* Practice task rendering
* Answer collection
* Task type behavior
* Input validation
* User response records

Task types:

* Multiple choice
* Fill-in-the-blank
* Translation
* Verb conjugation
* Pronoun replacement
* Tense selection
* Error correction
* Speaking prompt
* Listening comprehension
* Roleplay

5.10 Correction and Feedback Module

Owns:

* Grading
* Correct/incorrect determination
* Explanation generation
* Correction timing
* Feedback style
* Mistake tagging

Emits:

* MistakeDetected
* UserCorrected
* SkillEvidenceObserved

5.11 Gamification and Retention Module

Owns:

* XP
* Streaks
* Comeback lessons
* Mission framing
* Unlockable scenarios
* Achievement tracking
* Re-entry prompts

Does not own:

* Actual learning correctness
* Curriculum mastery

5.12 Media Learning Module

Owns:

* Media item metadata
* Transcript ingestion
* Clip-based task generation
* Source attribution
* Rights status
* Media tags

Does not own:

* Core curriculum
* User profile

5.13 Progress Reporting Module

Owns:

* Learner progress dashboard
* Wise-generated progress summaries
* Report cards
* Strength/weakness summary
* Recommended next steps

Reads from:

* Progress Module
* Vocabulary Module
* Memory Module
* Session history

5.14 Admin / Prompt Ops Module

Owns:

* Prompt templates
* Feature flags
* Model settings
* Curriculum admin
* Usage monitoring
* Quality review
* Content controls

6. Core Data Entities

This section defines canonical entity names. Agents must use these names consistently.

6.1 User

Represents an authenticated account.

Fields

* id: UUID
* name: string
* email: string
* role: enum learner | admin | tutor | student | organization_admin
* native_language: string
* target_language: string
* timezone: string nullable
* created_at: timestamp
* updated_at: timestamp
* last_active_at: timestamp nullable

Notes

For initial launch, role will usually be learner.

Future tutor mode may create separate tutor/student roles.

6.2 LearnerProfile

Represents the user’s language-learning identity and preferences.

Fields

* id: UUID
* user_id: UUID foreign key User.id
* current_level: enum complete_beginner | beginner | lower_intermediate | intermediate | upper_intermediate | advanced
* level_confidence: decimal nullable
* goals: text[]
* interests: text[]
* preferred_learning_style: enum mission | tutor | conversation | drill | balanced
* preferred_correction_style: enum gentle | direct | strict | end_of_task | major_mistakes_only | adaptive
* preferred_wise_personality: enum default | friendly_tutor | direct_coach | game_master | premium_assistant | strict_grammar_coach | casual_companion
* preferred_session_length_minutes: integer nullable
* preferred_frequency: string nullable
* motivation_notes: text nullable
* onboarding_completed: boolean
* created_at: timestamp
* updated_at: timestamp

Notes

This is user-visible and editable.

Do not store all raw memory here. Use MemoryNote for specific observations.

6.3 CurriculumSkill

Represents a canonical Italian language skill.

Fields

* id: UUID
* language: string
* name: string
* slug: string unique
* category: enum pronunciation | vocabulary | grammar | speaking | listening | reading | writing | culture | fluency
* level: enum complete_beginner | beginner | lower_intermediate | intermediate | upper_intermediate | advanced
* description: text
* prerequisites: UUID[]
* examples: jsonb
* is_active: boolean
* created_at: timestamp
* updated_at: timestamp

Example Skills

* Italian gender agreement
* Definite articles
* Present tense essere
* Present tense avere
* Direct object pronouns
* Passato prossimo with avere
* Passato prossimo participle agreement
* Imperfetto contrast
* Ordering at a restaurant
* Asking for directions

6.4 UserSkillProgress

Represents user-specific progress against a curriculum skill.

Fields

* id: UUID
* user_id: UUID foreign key User.id
* skill_id: UUID foreign key CurriculumSkill.id
* status: enum not_started | introduced | practicing | needs_review | proficient | mastered
* mastery_score: decimal
* exposure_count: integer
* correct_count: integer
* incorrect_count: integer
* last_practiced_at: timestamp nullable
* next_review_at: timestamp nullable
* mistake_count: integer
* created_at: timestamp
* updated_at: timestamp

Notes

This is the canonical place for skill mastery.

Do not infer mastery only from MemoryNote.

6.5 VocabularyItem

Represents a vocabulary word or phrase for a learner.

Fields

* id: UUID
* user_id: UUID foreign key User.id
* target_text: string
* native_text: string
* part_of_speech: string nullable
* example_sentence: text nullable
* example_translation: text nullable
* status: enum new | learning | review | mastered | archived
* tags: text[]
* source_lesson_id: UUID nullable
* source_session_id: UUID nullable
* mastery_score: decimal
* exposure_count: integer
* correct_count: integer
* incorrect_count: integer
* last_reviewed_at: timestamp nullable
* next_review_at: timestamp nullable
* created_at: timestamp
* updated_at: timestamp

Notes

For Italian launch:

* target_text = Italian word/phrase
* native_text = English translation

Do not name fields italian and english in the database if future language expansion is desired.

6.6 Lesson

Represents a planned or generated learning unit.

Fields

* id: UUID
* user_id: UUID foreign key User.id
* title: string
* lesson_type: enum daily_mission | recovery | freestyle | grammar | vocabulary_review | speaking_challenge | listening_challenge | media | scenario_roleplay | progress_check | placement
* status: enum draft | recommended | active | completed | skipped | archived
* target_skill_ids: UUID[]
* interest_theme: string nullable
* estimated_duration_minutes: integer nullable
* difficulty_level: enum complete_beginner | beginner | lower_intermediate | intermediate | upper_intermediate | advanced
* generation_context: jsonb
* content: jsonb
* created_by: enum wise | user | admin | tutor
* created_at: timestamp
* updated_at: timestamp
* completed_at: timestamp nullable

Notes

Lesson.content must follow a structured schema, not arbitrary prose.

6.7 LessonTask

Represents an individual task inside a lesson.

Fields

* id: UUID
* lesson_id: UUID foreign key Lesson.id
* task_type: enum briefing | explanation | multiple_choice | fill_blank | translation | conjugation | pronoun_replacement | tense_selection | error_correction | speaking_prompt | listening_comprehension | roleplay | recap | media_clip | reflection
* order_index: integer
* prompt: text
* target_skill_ids: UUID[]
* vocabulary_item_ids: UUID[]
* expected_answer: jsonb nullable
* options: jsonb nullable
* metadata: jsonb
* created_at: timestamp
* updated_at: timestamp

6.8 Session

Represents a user’s active or completed run through a lesson, conversation, drill, or freestyle activity.

Fields

* id: UUID
* user_id: UUID foreign key User.id
* lesson_id: UUID nullable foreign key Lesson.id
* session_type: enum onboarding | placement | lesson | freestyle | review | conversation | media | progress_report
* mode: enum voice | text | mixed
* status: enum active | completed | abandoned | errored
* transcript: jsonb nullable
* summary: text nullable
* strengths_observed: text[]
* weaknesses_observed: text[]
* memory_updates_applied: boolean
* started_at: timestamp
* completed_at: timestamp nullable

6.9 UserResponse

Represents a user response to a task or Wise prompt.

Fields

* id: UUID
* session_id: UUID foreign key Session.id
* lesson_task_id: UUID nullable foreign key LessonTask.id
* input_type: enum voice | text | multiple_choice | selection
* user_answer: text
* transcription: text nullable
* corrected_answer: text nullable
* is_correct: boolean nullable
* score: decimal nullable
* feedback: text nullable
* grammar_tags: text[]
* vocabulary_item_ids: UUID[]
* skill_ids: UUID[]
* created_at: timestamp

6.10 Correction

Represents detailed correction output for a user response.

Fields

* id: UUID
* user_response_id: UUID foreign key UserResponse.id
* correction_type: enum grammar | vocabulary | pronunciation | spelling | word_order | tone | comprehension | fluency | other
* severity: enum minor | moderate | major
* original_text: text
* corrected_text: text
* explanation: text
* encouragement: text nullable
* retry_prompt: text nullable
* skill_ids: UUID[]
* created_at: timestamp

6.11 MemoryNote

Represents a learner-specific memory observation used by Wise.

Fields

* id: UUID
* user_id: UUID foreign key User.id
* type: enum preference | goal | interest | strength | weakness | recurring_mistake | tutor_observation | motivation | content_preference | correction_preference | pronunciation_note | session_summary
* content: text
* structured_data: jsonb nullable
* confidence: decimal
* visibility: enum user_visible | internal
* source_session_id: UUID nullable
* source_response_id: UUID nullable
* embedding_id: string nullable
* is_active: boolean
* created_at: timestamp
* updated_at: timestamp

Notes

MemoryNote should not replace structured progress tables.

Use it for tutor-like context and observations.

6.12 MediaItem

Represents content used for media-based lessons.

Fields

* id: UUID
* source_type: enum youtube | uploaded | licensed | ai_generated | article | transcript | other
* source_url: text nullable
* title: string
* language: string
* transcript: text nullable
* duration_seconds: integer nullable
* tags: text[]
* rights_status: enum unknown | user_provided | public | licensed | ai_generated | restricted
* metadata: jsonb
* created_at: timestamp
* updated_at: timestamp

6.13 UserEvent

Represents important product and learning events.

Fields

* id: UUID
* user_id: UUID nullable foreign key User.id
* event_type: string
* payload: jsonb
* created_at: timestamp

Notes

Use UserEvent for analytics and event-driven updates.

Do not rely on UserEvent as the only source of canonical state.

7. Core API Contracts

This section describes REST-style contracts. Exact implementation may use server actions or RPC, but the domain contracts should remain stable.

7.1 Auth / User APIs

GET /api/me

Returns current authenticated user and core learner state.

Response:

{
  "user": {},
  "learnerProfile": {},
  "onboardingCompleted": true
}

PATCH /api/me

Updates basic user account fields.

Allowed updates:

* name
* timezone
* native_language
* target_language

7.2 Onboarding APIs

POST /api/onboarding/start

Creates an onboarding session.

Request:

{
  "mode": "voice"
}

Response:

{
  "sessionId": "uuid",
  "wiseMessage": "Welcome to Speakwise..."
}

POST /api/onboarding/respond

Submits an onboarding response.

Request:

{
  "sessionId": "uuid",
  "inputType": "voice",
  "text": "I want to learn Italian for food travel."
}

Response:

{
  "wiseMessage": "Great. I’ll shape your lessons around restaurants...",
  "extractedProfileUpdates": {},
  "nextStep": "level_assessment"
}

POST /api/onboarding/complete

Finalizes onboarding and creates LearnerProfile.

Response:

{
  "learnerProfile": {},
  "recommendedFirstLesson": {}
}

7.3 Learner Profile APIs

GET /api/profile

Returns user-visible learner profile.

PATCH /api/profile

Updates user-editable profile fields.

Allowed fields:

* goals
* interests
* current_level
* preferred_learning_style
* preferred_correction_style
* preferred_wise_personality
* preferred_session_length_minutes
* preferred_frequency
* motivation_notes

GET /api/profile/summary

Returns Wise-readable profile summary.

7.4 Wise APIs

POST /api/wise/message

General Wise interaction endpoint.

Request:

{
  "mode": "voice",
  "message": "Start today’s lesson",
  "sessionId": "uuid_or_null",
  "context": {
    "screen": "command_center"
  }
}

Response:

{
  "wiseMessage": "Welcome back...",
  "actions": [
    {
      "type": "START_LESSON",
      "lessonId": "uuid"
    }
  ],
  "memoryCandidates": [],
  "audioUrl": "optional"
}

POST /api/wise/recommend-next

Returns next recommended learning action.

Response:

{
  "recommendationType": "daily_mission",
  "lesson": {},
  "reason": "You recently struggled with..."
}

7.5 Lesson APIs

POST /api/lessons/generate

Generates a lesson using learner context.

Request:

{
  "lessonType": "daily_mission",
  "durationMinutes": 12,
  "targetSkillIds": ["uuid"],
  "interestTheme": "food travel",
  "userRequest": "Make this about ordering at a Roman trattoria."
}

Response:

{
  "lesson": {},
  "tasks": []
}

GET /api/lessons/:lessonId

Returns lesson and tasks.

PATCH /api/lessons/:lessonId

Updates lesson status or editable lesson fields.

POST /api/lessons/:lessonId/start

Starts a Session for a lesson.

Response:

{
  "session": {},
  "currentTask": {}
}

POST /api/lessons/:lessonId/complete

Completes lesson and triggers post-session processing.

Response:

{
  "sessionSummary": "...",
  "memoryUpdates": [],
  "progressUpdates": [],
  "nextRecommendation": {}
}

7.6 Practice APIs

POST /api/practice/respond

Submits user response for a lesson task.

Request:

{
  "sessionId": "uuid",
  "lessonTaskId": "uuid",
  "inputType": "voice",
  "answer": "Ho visto la ieri"
}

Response:

{
  "userResponse": {},
  "correction": {},
  "nextTask": {},
  "progressSignals": []
}

7.7 Correction APIs

POST /api/corrections/evaluate

Evaluates a user response.

Request:

{
  "userResponseId": "uuid",
  "correctionMode": "adaptive"
}

Response:

{
  "isCorrect": false,
  "score": 0.65,
  "corrections": [],
  "feedback": "Good — your meaning was clear..."
}

7.8 Vocabulary APIs

GET /api/vocabulary

Returns learner vocabulary.

Query params:

* status
* tag
* dueForReview

POST /api/vocabulary

Creates vocabulary item.

PATCH /api/vocabulary/:vocabId

Updates vocabulary item.

POST /api/vocabulary/:vocabId/review

Records review result.

7.9 Progress APIs

GET /api/progress/skills

Returns user skill progress.

GET /api/progress/dashboard

Returns dashboard summary.

GET /api/progress/report

Generates a Wise-readable/user-readable progress report.

7.10 Memory APIs

GET /api/memory

Returns user-visible memory notes only.

POST /api/memory/extract

Runs memory extraction from session.

POST /api/memory/apply

Applies reviewed or auto-approved memory updates.

PATCH /api/memory/:memoryId

Updates or disables a memory note.

7.11 Media APIs

POST /api/media/import

Imports or registers a media item.

Request:

{
  "sourceType": "youtube",
  "sourceUrl": "https://...",
  "userIntent": "Use this for Italian listening practice."
}

POST /api/media/:mediaId/generate-lesson

Generates a media-based lesson.

8. Event Contracts

Events should be recorded in UserEvent and optionally processed by background workers.

8.1 OnboardingCompleted

Payload:

{
  "profileId": "uuid",
  "nativeLanguage": "English",
  "targetLanguage": "Italian",
  "level": "beginner",
  "goals": [],
  "interests": []
}

8.2 LessonGenerated

Payload:

{
  "lessonId": "uuid",
  "lessonType": "daily_mission",
  "targetSkillIds": [],
  "interestTheme": "food travel"
}

8.3 LessonStarted

Payload:

{
  "lessonId": "uuid",
  "sessionId": "uuid",
  "mode": "voice"
}

8.4 PracticeAnswered

Payload:

{
  "sessionId": "uuid",
  "lessonTaskId": "uuid",
  "userResponseId": "uuid",
  "inputType": "voice",
  "skillIds": [],
  "vocabularyItemIds": []
}

8.5 MistakeDetected

Payload:

{
  "userResponseId": "uuid",
  "correctionId": "uuid",
  "skillIds": [],
  "severity": "moderate",
  "mistakeType": "grammar"
}

8.6 SkillMasteryChanged

Payload:

{
  "skillId": "uuid",
  "oldStatus": "practicing",
  "newStatus": "needs_review",
  "oldMasteryScore": 0.56,
  "newMasteryScore": 0.49
}

8.7 VocabularyReviewed

Payload:

{
  "vocabId": "uuid",
  "result": "incorrect",
  "oldMasteryScore": 0.72,
  "newMasteryScore": 0.61,
  "nextReviewAt": "timestamp"
}

8.8 MemoryUpdated

Payload:

{
  "memoryId": "uuid",
  "type": "recurring_mistake",
  "visibility": "internal",
  "sourceSessionId": "uuid"
}

8.9 SessionCompleted

Payload:

{
  "sessionId": "uuid",
  "lessonId": "uuid",
  "durationSeconds": 720,
  "tasksCompleted": 12,
  "mistakesDetected": 3
}

8.10 ComebackLessonOffered

Payload:

{
  "daysMissed": 1,
  "recommendedDurationMinutes": 4,
  "reason": "missed_planned_session"
}

9. AI Orchestration Architecture

9.1 Wise Request Flow

When the user sends a message or voice command:

1. Capture user input.
2. Transcribe if voice.
3. Send normalized text to Wise orchestration service.
4. Load relevant user context:
    * LearnerProfile
    * Recent sessions
    * Active lesson if any
    * Skill progress
    * Vocabulary due for review
    * Relevant MemoryNotes
    * User settings
5. Classify intent.
6. Decide action:
    * respond conversationally
    * start lesson
    * generate lesson
    * submit practice response
    * explain concept
    * update preference
    * generate report
7. Call required domain service.
8. Generate Wise response.
9. Optionally synthesize audio.
10. Emit events.
11. Return response and actions to frontend.

9.2 Wise Must Use Tools / Services Instead of Direct Database Writes

Wise should not directly mutate canonical tables.

Wise may propose updates, but mutations should happen through:

* Profile service
* Memory service
* Lesson service
* Progress service
* Vocabulary service
* Correction service

9.3 Prompt Template Categories

Prompt templates should be versioned and stored outside UI components.

Recommended categories:

* Wise core system prompt
* Onboarding prompt
* Placement assessment prompt
* Lesson generation prompt
* Practice generation prompt
* Correction prompt
* Memory extraction prompt
* Progress report prompt
* Media lesson prompt
* Comeback lesson prompt
* Freestyle conversation prompt

Each prompt should include:

* version
* purpose
* inputs
* expected output schema
* safety constraints
* examples

10. Structured AI Output Schemas

Agents should enforce structured output for important AI generations.

10.1 LessonGenerationOutput

{
  "title": "string",
  "lessonType": "daily_mission",
  "estimatedDurationMinutes": 12,
  "targetSkills": [],
  "interestTheme": "string",
  "briefing": "string",
  "tasks": [
    {
      "taskType": "multiple_choice",
      "prompt": "string",
      "options": [],
      "expectedAnswer": {},
      "explanation": "string",
      "skillTags": [],
      "vocabularyTargets": []
    }
  ],
  "recapPlan": "string"
}

10.2 CorrectionOutput

{
  "isCorrect": false,
  "score": 0.65,
  "encouragement": "string",
  "correctedAnswer": "string",
  "explanation": "string",
  "mistakeType": "grammar",
  "severity": "moderate",
  "skillTags": [],
  "retryPrompt": "string",
  "shouldUpdateMemory": true
}

10.3 MemoryExtractionOutput

{
  "memoryCandidates": [
    {
      "type": "recurring_mistake",
      "content": "User repeatedly misses past participle agreement with direct object pronouns.",
      "visibility": "internal",
      "confidence": 0.82,
      "structuredData": {}
    }
  ],
  "profileUpdates": {},
  "skillSignals": [],
  "vocabularySignals": []
}

10.4 ProgressReportOutput

{
  "summary": "string",
  "strengths": [],
  "weaknesses": [],
  "skillsMastered": [],
  "skillsNeedingReview": [],
  "vocabularySummary": {},
  "recommendedNextSteps": []
}

11. Memory Update Rules

Memory updates should happen after meaningful sessions, not every trivial message.

Should Create Memory Notes For

* Recurring mistakes
* Strong preferences
* User goals
* User interests
* Correction preferences
* Learning style preferences
* Motivation patterns
* Pronunciation issues
* Significant strengths
* Significant weaknesses

Should Not Create Memory Notes For

* One-off trivial comments
* Sensitive personal information unrelated to learning
* Temporary mood unless relevant and repeated
* Raw transcripts without summarization
* Unsupported assumptions

Memory Confidence

Memory notes should include confidence.

Examples:

* 0.9: user explicitly stated it
* 0.7: repeated behavior across sessions
* 0.5: inferred from one session
* below 0.5: do not store unless reviewed

12. Progress Calculation Guidelines

Progress should be evidence-based.

Inputs

* Correct answers
* Incorrect answers
* Mistake severity
* Task difficulty
* Time since last practice
* Hints used
* Retry success
* Speaking fluency score if available
* Pronunciation score if available

Skill Status Rules

Suggested initial rules:

* not_started: no exposure
* introduced: first exposure
* practicing: some correct evidence but not stable
* needs_review: recent mistakes or decayed review
* proficient: consistently correct across contexts
* mastered: strong performance over time and after spaced review

Do not mark a skill mastered from one correct answer.

13. Spaced Review Guidelines

Vocabulary and grammar should resurface based on performance.

Suggested intervals:

* New item correct: review in 1 day
* Correct again: review in 3 days
* Correct again: review in 7 days
* Correct again: review in 14 days
* Incorrect: review sooner, usually same session or next day

Wise should weave review into lessons naturally.

Example:

“I’ll add three quick review questions from yesterday before we move on.”

14. Frontend Application Structure

Recommended route structure:

/app
  /(auth)
    /login
    /signup
  /(app)
    /command-center
    /onboarding
    /lesson/[lessonId]
    /practice/[sessionId]
    /profile
    /vocabulary
    /progress
    /media
    /settings
/admin
  /prompts
  /curriculum
  /users
  /usage

Recommended component areas:

/components
  /wise
  /voice
  /lesson
  /practice
  /profile
  /progress
  /vocabulary
  /media
  /ui
/lib
  /api
  /auth
  /ai
  /voice
  /events
  /schemas
  /utils
/server
  /services
    /wise
    /profile
    /memory
    /curriculum
    /progress
    /vocabulary
    /lesson
    /practice
    /correction
    /media

15. UI State Rules

The frontend should not own canonical learning state.

Frontend may own:

* Current audio recording state
* Current visible task
* UI animation state
* Temporary form edits
* Optimistic display state

Backend owns:

* Lesson state
* Session state
* User responses
* Corrections
* Memory
* Progress
* Vocabulary

16. Voice State Machine

Voice interactions should follow a clear state machine.

States:

* idle
* listening
* processing_transcription
* thinking
* speaking
* awaiting_user_response
* paused
* error

Transitions:

* user starts speaking: idle -> listening
* user stops speaking: listening -> processing_transcription
* transcription complete: processing_transcription -> thinking
* Wise response ready: thinking -> speaking
* Wise finishes speaking: speaking -> awaiting_user_response
* user interrupts: speaking -> listening
* error: any -> error
* recover: error -> idle

17. Error Handling Principles

Wise and the UI should recover gracefully.

Examples:

Voice Transcription Failure

“I didn’t catch that. Want to try again or type it?”

AI Generation Failure

“I had trouble building that lesson. I can try again with a simpler version.”

Correction Uncertainty

“I’m not fully confident in that correction, but here’s the likely issue…”

Media Import Failure

“I couldn’t access that clip. You can paste a transcript or choose another source.”

18. Security and Privacy Requirements

User Data

Speakwise stores learning data that may feel personal.

Protect:

* User account info
* Voice transcripts
* Session history
* Learning profile
* Memory notes
* Uploaded content

Requirements

* Auth required for all learner data
* Users can view/edit/delete visible profile info
* Users can disable or delete memory notes where appropriate
* Internal memory should avoid unnecessary sensitive information
* Admin access should be restricted
* Logs should avoid storing raw secrets or unnecessary personal data

19. Content Rights Requirements

Media learning must respect source rights.

For initial build:

* Support user-provided links cautiously
* Prefer transcripts or short excerpts where legally permissible
* Mark rights_status clearly
* Do not assume all YouTube content can be reused freely
* AI-generated scenes are safest for demo and early testing
* Licensed content can be added later

20. Admin and Prompt Ops Requirements

Admin must eventually support:

* View prompt templates
* Version prompts
* Enable/disable prompt versions
* Manage curriculum skills
* Review AI output quality
* Monitor usage and cost
* Manage feature flags
* Inspect anonymized failure patterns

Prompt templates should not be hard-coded deeply in feature components.

21. Agent Implementation Rules

These rules are for AI coding agents.

21.1 Do Not Duplicate Core Entities

Do not create alternate tables or types for:

* User
* LearnerProfile
* CurriculumSkill
* UserSkillProgress
* VocabularyItem
* Lesson
* LessonTask
* Session
* UserResponse
* Correction
* MemoryNote
* MediaItem
* UserEvent

21.2 Use Shared Types

All modules must import canonical TypeScript types from shared schema definitions.

Recommended:

/lib/schemas
  user.ts
  profile.ts
  curriculum.ts
  lesson.ts
  session.ts
  vocabulary.ts
  memory.ts
  correction.ts
  media.ts
  events.ts

21.3 Do Not Put Prompts in UI Components

Prompts belong in:

/server/ai/prompts

or a database-backed prompt template system.

21.4 Do Not Let UI Components Mutate Learning State Directly

UI components must call service functions or APIs.

21.5 Keep AI Output Structured

Any AI generation that affects product state must return validated structured output.

Use schema validation.

21.6 Emit Events for Major Actions

When implementing a major action, emit the relevant event.

Examples:

* onboarding completed
* lesson generated
* lesson started
* practice answered
* correction created
* session completed
* memory updated

21.7 Make Voice Optional but First-Class

Do not build text-only flows that cannot later support voice.

21.8 Build for Italian First, Expansion Later

Do not over-generalize every tiny detail, but avoid naming database columns in a way that blocks future languages.

Good:

* target_text
* native_text
* target_language
* native_language

Avoid:

* italian_word
* english_word

22. Recommended Build Sequence for Agents

Even if the intended product is end-to-end, agents should build in dependency order.

Foundation Layer

1. Project setup
2. Auth
3. Database schema
4. Shared types
5. Core service layer
6. Event logging

Intelligence Layer

7. Prompt infrastructure
8. Wise orchestration service
9. Memory service
10. Curriculum seed data
11. Lesson generation schemas
12. Correction schemas

Experience Layer

13. Voice/text command center
14. Voice onboarding
15. Profile editor
16. Lesson player
17. Practice task renderer
18. Correction UI
19. Vocabulary bank
20. Progress dashboard
21. Gamification layer
22. Media learning layer

Expansion Layer

23. Tutor mode
24. Admin prompt ops
25. Advanced analytics
26. Additional languages

23. Acceptance Criteria for Technical Foundation

The technical foundation is acceptable when:

* User can sign up and log in
* User can complete onboarding
* LearnerProfile is created
* Wise can read the profile
* Wise can recommend a lesson
* Lesson can be generated in structured form
* Lesson tasks are saved
* User can start a session
* User can submit at least one response
* Correction can be generated and saved
* Skill progress can be updated
* Vocabulary can be added and reviewed
* MemoryNote can be created from a session
* Events are logged for major actions
* Voice and text modes can route into the same Wise endpoint

24. Open Questions

These should be resolved before final implementation decisions.

1. Which auth provider will be used?
2. Which AI provider(s) will be used for LLM, STT, TTS, and embeddings?
3. Will the first implementation use Next.js API routes only or a separate backend?
4. Will memory extraction be automatic after every completed session or queued for background processing?
5. How strict should admin review be for AI-generated curriculum content?
6. How much of the Italian curriculum will be seeded manually versus generated?
7. What is the first version of voice interruption support?
8. How will media rights be enforced technically?
9. How will cost controls be handled for voice-heavy usage?
10. How will user data deletion/export be handled?

25. Final Summary

This document defines the technical foundation for Speakwise.

The most important architecture decision is that Speakwise is not a collection of disconnected AI features. It is a memory-centric language-learning system built around Wise, structured curriculum, user progress, voice interaction, adaptive correction, and personalized lessons.

Every implementation agent must build against shared entities, shared service boundaries, structured AI outputs, event contracts, and a consistent learner memory model.

The goal is an elite end-to-end experience, but the architecture must stay modular enough that multiple agents can build it without creating fragmented product logic.