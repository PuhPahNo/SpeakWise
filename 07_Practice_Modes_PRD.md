# Practice Modes PRD

## 1. Module Purpose

The Practice Modes module defines the interactive task types learners complete inside Speakwise lessons and missions.

Practice is where learning becomes active. This module owns task rendering, user answer collection, interaction rules, and task-specific UI behavior.

## 2. Product Goals

- Support a wide variety of language practice activities.
- Make practice interactive in voice and text modes.
- Provide consistent task schemas for lesson generation.
- Capture user responses in a format that Correction and Progress modules can evaluate.
- Support both quick drills and richer scenario-based activities.

## 3. Practice Philosophy

Practice should be:

- Active
- Personalized
- Level-appropriate
- Varied
- Correctable
- Connected to memory and progress
- Not repetitive in a boring way

Wise should vary practice formats based on user preference, lesson goals, and recent activity.

## 4. Supported Practice Types

### Written / Selection-Based

1. Multiple choice
2. Fill-in-the-blank
3. Italian-to-English translation
4. English-to-Italian translation
5. Verb conjugation
6. Pronoun replacement
7. Tense selection
8. Error correction
9. Paragraph translation
10. Reading comprehension

### Voice-Based

11. Repeat after Wise
12. Answer a spoken question
13. Roleplay scenario
14. Pronunciation challenge
15. Conversation practice
16. Listening comprehension
17. Read aloud
18. Shadowing task

### Scenario-Based

19. Restaurant ordering
20. Hotel check-in
21. Asking for directions
22. Market shopping
23. Travel problem solving
24. Discussing news
25. Talking about family
26. Giving opinions
27. Telling a past story

## 5. Common Task Schema

Every task should use a shared LessonTask model.

Required fields:

- id
- lesson_id
- task_type
- order_index
- prompt
- target_skill_ids
- vocabulary_item_ids
- expected_answer
- options
- metadata

## 6. UserResponse Schema

Every answer should create a UserResponse.

Required fields:

- session_id
- lesson_task_id
- input_type
- user_answer
- transcription if voice
- skill_ids
- vocabulary_item_ids

Correction fields may be added after evaluation.

## 7. Practice Type Requirements

### 7.1 Multiple Choice

Use cases:

- Recognition
- Low-pressure beginner practice
- Grammar selection
- Vocabulary meaning

Requirements:

- 2-4 options by default
- One correct answer unless multi-select specified
- Explanation available after answer
- Voice mode can read options aloud if requested

### 7.2 Fill-in-the-Blank

Use cases:

- Articles
- Verb endings
- Pronouns
- Prepositions

Requirements:

- Show sentence with blank
- Accept text or voice answer
- Support exact and normalized matching
- Correction service handles variants

### 7.3 Translation

Use cases:

- Recall
- Sentence construction
- Grammar integration

Requirements:

- Support target-to-native and native-to-target
- Accept multiple valid answers
- Correction should evaluate meaning and naturalness, not only exact match

### 7.4 Verb Conjugation

Use cases:

- Present tense
- Past tense
- Irregular verbs

Requirements:

- Specify verb, subject, tense
- Accept typed or spoken answer
- Show correct conjugation and explanation

### 7.5 Pronoun Replacement

Use cases:

- Direct object pronouns
- Indirect object pronouns
- Ne/ci

Requirements:

- Show original sentence
- Ask user to replace object with pronoun
- Evaluate pronoun gender/number/placement

### 7.6 Error Correction

Use cases:

- Grammar awareness
- Common mistake repair

Requirements:

- Show incorrect sentence
- User corrects it
- Correction service compares user repair to ideal answer

### 7.7 Speaking Prompt

Use cases:

- Real-world communication
- Fluency
- Recall

Requirements:

- Wise asks a spoken or written prompt
- User responds by voice or text
- Correction mode depends on user preference and task goal

### 7.8 Listening Comprehension

Use cases:

- Understanding spoken Italian
- Media clips
- Wise-generated audio

Requirements:

- Play audio or Wise speech
- Ask comprehension question
- Support replay
- Support slower playback if available

### 7.9 Roleplay

Use cases:

- Restaurant
- Hotel
- Travel
- Debate
- Social situations

Requirements:

- Wise plays role
- User responds naturally
- Session tracks turns
- Correction can happen during or after roleplay

## 8. Difficulty Controls

Practice difficulty may vary by:

- Sentence length
- Vocabulary familiarity
- Grammar complexity
- Presence of hints
- Multiple choice vs free recall
- Speed of audio
- Amount of target language used
- Correction strictness

User can request harder/easier versions.

## 9. Hint System

Hints may include:

- First letter
- Word bank
- Grammar reminder
- Translation clue
- Example sentence
- Slow audio replay
- Remove wrong option

Hints should be logged because they affect progress scoring.

## 10. Practice Flow

1. LessonTask displayed.
2. User answers via voice/text/selection.
3. UserResponse saved.
4. Correction service evaluates.
5. Feedback shown/spoken.
6. Retry offered if appropriate.
7. Events emitted.
8. Next task loaded.

## 11. UI Requirements

Practice UI must support:

- Task prompt
- Voice input
- Text input
- Option buttons
- Audio playback
- Hint button
- Submit/skip buttons
- Feedback panel
- Retry button
- Progress indicator

## 12. Events Emitted

- PracticeTaskDisplayed
- PracticeAnswered
- HintRequested
- PracticeSkipped
- PracticeRetried
- PracticeCompleted

## 13. Dependencies

Reads:

- LessonTask
- Session
- User preferences

Writes:

- UserResponse
- Practice events

Calls:

- Correction service
- Wise service for dynamic prompts
- Lesson service for next task

## 14. Edge Cases

### Multiple Correct Answers

Correction service should handle valid variants.

### Voice Transcription Error

User can correct transcript before grading when needed.

### User Says “I Don’t Know”

Treat as skipped/incorrect depending on task and offer explanation.

### User Gives Answer in Wrong Language

Wise can clarify and offer retry.

### User Requests Explanation Before Answering

Allow explanation, but mark hint used.

## 15. Non-Goals

This module does not own:

- Correction logic
- Progress scoring
- Lesson generation
- Memory extraction
- Voice STT/TTS pipeline
- Gamification rewards

## 16. Acceptance Criteria

This module is acceptable when:

- It can render at least multiple choice, fill blank, translation, speaking prompt, and listening comprehension tasks.
- User responses are saved consistently.
- Voice and text answers both work.
- Hints can be requested and logged.
- Feedback can be displayed after correction.
- Retry behavior is supported.
- PracticeAnswered events are emitted.


## Agent Build Rules

- Treat the Master PRD and Technical Architecture/Data Contracts PRD as source-of-truth documents.
- Do not rename canonical entities such as User, LearnerProfile, CurriculumSkill, UserSkillProgress, VocabularyItem, Lesson, LessonTask, Session, UserResponse, Correction, MemoryNote, MediaItem, or UserEvent.
- Do not store prompts inside UI components.
- All AI outputs that affect product state must be schema-validated before persistence.
- Voice-first does not mean voice-only. Every flow must have a text fallback.
- Italian is the first target language and English is the first native language, but data structures should not block future language expansion.
- Emit the required events when core user actions occur.
- Keep module ownership clean. Do not duplicate logic that belongs to another module.
