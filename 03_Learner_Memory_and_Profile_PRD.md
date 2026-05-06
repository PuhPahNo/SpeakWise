# Learner Memory and Profile PRD

## 1. Module Purpose

The Learner Memory and Profile module is the long-term personalization layer of Speakwise.

It stores who the learner is, what they want, how they prefer to learn, what they have studied, what they struggle with, what they are strong at, and what Wise should remember when teaching them in the future.

This module is one of the core moats of Speakwise.

## 2. Product Goals

- Make Wise feel like it truly remembers the learner.
- Maintain a user-visible learning profile that the learner can inspect and edit.
- Maintain internal tutor observations that improve future lessons.
- Support structured profile fields and flexible memory notes.
- Avoid storing unnecessary, sensitive, or manipulative personal data.
- Provide relevant memory retrieval to Wise, lesson generation, correction, and progress reporting.

## 3. Memory Philosophy

Speakwise memory should be learning-focused.

Wise should remember information that improves tutoring quality, such as:

- Goals
- Interests
- Preferences
- Strengths
- Weaknesses
- Recurring mistakes
- Preferred correction style
- Motivation patterns
- Content preferences
- Pronunciation issues
- Session summaries

Wise should not store random personal details that do not improve language learning.

## 4. User Stories

- As a learner, I want Wise to remember what I worked on yesterday, last week, and last month.
- As a learner, I want Wise to remember my interests and build lessons around them.
- As a learner, I want to see and edit my learning profile.
- As a learner, I want to know my strengths and weaknesses.
- As a learner, I want Wise to remember recurring mistakes so future lessons help me fix them.
- As a learner, I want control over what the system remembers about me.

## 5. Core Entities

### LearnerProfile

User-visible structured profile.

Owns:

- Level
- Goals
- Interests
- Learning style
- Correction style
- Wise personality
- Preferred session length
- Frequency preference
- Motivation notes

### MemoryNote

Flexible memory observations.

Types:

- preference
- goal
- interest
- strength
- weakness
- recurring_mistake
- tutor_observation
- motivation
- content_preference
- correction_preference
- pronunciation_note
- session_summary

### Related But Not Owned

This module reads but does not own:

- UserSkillProgress
- VocabularyItem
- Session
- Correction
- Lesson

## 6. User-Visible Profile Requirements

The Learning Profile page should show:

- Name
- Native language
- Target language
- Current level
- Level confidence
- Goals
- Interests
- Preferred learning style
- Preferred correction style
- Preferred Wise personality
- Preferred session length
- Frequency preference
- Strengths
- Weaknesses
- Active vocabulary summary
- Mastered vocabulary summary
- Recent lessons
- Recommended next steps

### Editable Fields

User can edit:

- Goals
- Interests
- Level
- Learning style
- Correction style
- Wise personality
- Session length
- Frequency preference
- Motivation notes

### Read-Only / Generated Fields

Generated from progress systems:

- Strengths
- Weaknesses
- Vocabulary counts
- Skill progress
- Recent lessons
- Recommended next steps

## 7. Internal Memory Requirements

Internal memory is used by Wise to tutor better.

Examples:

- “User responds well to short explanations followed by immediate practice.”
- “User often avoids speaking tasks unless framed as low-pressure.”
- “User repeatedly confuses direct object pronoun agreement in passato prossimo.”
- “User enjoys food and travel examples more than abstract grammar examples.”

Internal memory should not be displayed raw by default, but users should have a way to inspect/delete memories if needed in privacy settings.

## 8. Memory Creation Rules

Create memory notes when:

- User explicitly states a durable preference.
- User explicitly states a goal or interest.
- A mistake repeats across multiple tasks or sessions.
- A strength appears consistently.
- A correction preference is observed or stated.
- A motivation pattern is useful for future tutoring.
- A session summary is needed for continuity.

Do not create memory notes when:

- The information is trivial or one-off.
- The information is sensitive and unrelated to learning.
- The system is guessing with low confidence.
- The information already exists with no meaningful update.
- The detail belongs in structured progress tables instead.

## 9. Memory Confidence Rules

Suggested confidence scores:

- 0.95: user explicitly confirmed
- 0.85: user explicitly stated
- 0.75: observed multiple times
- 0.60: inferred from one session with moderate evidence
- below 0.50: do not store automatically

## 10. Memory Visibility Rules

### user_visible

Use for:

- Goals
- Interests
- Strong preferences
- Major strengths
- Major weaknesses
- Session summaries that the user may want to see

### internal

Use for:

- Tutor observations
- Subtle motivation patterns
- Learning behavior patterns
- Detailed recurring mistake notes
- Correction strategy notes

## 11. Memory Retrieval Requirements

Wise should retrieve relevant memory based on task context.

### Retrieval Inputs

- User command
- Current lesson topic
- Target skill
- Current task type
- Recent mistakes
- Interest theme
- User level
- Session type

### Retrieval Output

A compact memory context pack.

Example:

```json
{
  "relevantGoals": [],
  "relevantInterests": [],
  "relevantPreferences": [],
  "recurringMistakes": [],
  "recentSessionSummaries": [],
  "tutorObservations": []
}
```

## 12. Memory Extraction Flow

After a meaningful session:

1. Session completes.
2. Memory extraction service reads transcript, responses, corrections, and summary.
3. AI proposes memory candidates.
4. Service validates candidates.
5. Duplicates are merged or updated.
6. Low-confidence candidates are discarded or queued for review.
7. Approved memory notes are saved.
8. MemoryUpdated events are emitted.

## 13. Profile Summary for Wise

The module should expose a Wise-readable profile summary.

Example:

```json
{
  "level": "beginner",
  "goals": ["food-focused travel in Italy"],
  "interests": ["restaurants", "markets", "culture"],
  "preferredStyle": "mission",
  "correctionStyle": "adaptive",
  "strengths": ["food vocabulary recognition"],
  "weaknesses": ["past participle agreement"],
  "recentFocus": ["definite articles", "ordering politely"],
  "wiseGuidance": "Use food/travel examples and keep explanations short."
}
```

## 14. API Requirements

### GET /api/profile

Returns user-visible profile.

### PATCH /api/profile

Updates editable profile fields.

### GET /api/profile/summary

Returns compact Wise-readable profile summary.

### GET /api/memory

Returns user-visible memory notes.

### GET /api/memory/internal-context

Service-only endpoint for Wise context retrieval.

### POST /api/memory/extract

Extracts memory candidates from session.

### POST /api/memory/apply

Applies validated memory candidates.

### PATCH /api/memory/:memoryId

Updates, hides, or disables memory note.

## 15. AI Output Schema: Memory Extraction

```json
{
  "memoryCandidates": [
    {
      "type": "recurring_mistake",
      "content": "User repeatedly forgets past participle agreement when direct object pronouns precede passato prossimo.",
      "visibility": "internal",
      "confidence": 0.86,
      "structuredData": {
        "skillTags": ["passato_prossimo", "direct_object_pronouns"]
      }
    }
  ],
  "profileUpdateCandidates": {
    "interestsToAdd": [],
    "preferencesToUpdate": []
  }
}
```

## 16. UI Requirements

### Learning Profile Page

Sections:

- Overview
- Goals
- Interests
- Learning preferences
- Wise personality
- Strengths
- Weaknesses
- Vocabulary summary
- Grammar progress summary
- Recent activity
- Recommended next steps

### Memory Controls

Users should be able to:

- Edit profile fields
- Remove an interest
- Add a goal
- Change correction style
- View user-visible memory notes
- Delete or disable certain memories

## 17. Events Emitted

- LearnerProfileCreated
- LearnerProfileUpdated
- MemoryCandidateCreated
- MemoryUpdated
- MemoryDisabled
- ProfileSummaryGenerated

## 18. Edge Cases

### Conflicting Memories

If user previously preferred strict correction but now asks for gentle correction, update preference and mark older note inactive.

### Duplicate Memories

Merge with existing memory and update confidence instead of creating duplicates.

### Sensitive Memory

Discard unless explicitly relevant to learning and user-confirmed.

### User Deletes Memory

Do not re-create the same memory immediately unless user explicitly restates it later.

## 19. Non-Goals

This module does not own:

- Auth
- Lesson generation
- Correction generation
- Skill mastery calculations
- Vocabulary scheduling
- Gamification rewards
- Voice transcription

## 20. Acceptance Criteria

This module is acceptable when:

- LearnerProfile can be created, viewed, and edited.
- Wise can retrieve a compact profile summary.
- Memory extraction can propose structured memory candidates after sessions.
- Memory notes can be saved with type, confidence, visibility, and source.
- Duplicate memory notes are merged or suppressed.
- User-visible memories can be viewed or disabled.
- Internal notes are available to Wise but not shown raw by default.
- Memory does not replace structured progress tracking.


## Agent Build Rules

- Treat the Master PRD and Technical Architecture/Data Contracts PRD as source-of-truth documents.
- Do not rename canonical entities such as User, LearnerProfile, CurriculumSkill, UserSkillProgress, VocabularyItem, Lesson, LessonTask, Session, UserResponse, Correction, MemoryNote, MediaItem, or UserEvent.
- Do not store prompts inside UI components.
- All AI outputs that affect product state must be schema-validated before persistence.
- Voice-first does not mean voice-only. Every flow must have a text fallback.
- Italian is the first target language and English is the first native language, but data structures should not block future language expansion.
- Emit the required events when core user actions occur.
- Keep module ownership clean. Do not duplicate logic that belongs to another module.
