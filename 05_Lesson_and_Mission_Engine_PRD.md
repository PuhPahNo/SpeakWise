# Lesson and Mission Engine PRD

## 1. Module Purpose

The Lesson and Mission Engine creates and runs personalized learning units in Speakwise.

A lesson or mission is the core unit of learning. It combines curriculum skills, user interests, learner memory, vocabulary, correction preferences, voice/text interaction, and gamification framing into a coherent session.

## 2. Product Goals

- Generate personalized lessons that feel built for the learner.
- Keep lessons grounded in the curriculum skill graph.
- Support mission-style, tutor-style, conversation-style, drill-style, and balanced lessons.
- Allow user control over length, topic, difficulty, and modality.
- Save lesson structure and session outcomes for future memory and progress updates.

## 3. Lesson Philosophy

Speakwise lessons should not be generic AI outputs.

Each lesson should be:

- Context-aware
- Level-appropriate
- Skill-targeted
- Interest-personalized
- Interactive
- Correctable
- Memorable
- Connected to future progress

## 4. User Stories

- As a learner, I want Wise to recommend a lesson based on what I need next.
- As a learner, I want to request custom lessons around my interests.
- As a learner, I want to choose lesson length and difficulty.
- As a learner, I want lessons to include speaking, listening, vocabulary, grammar, and practice when appropriate.
- As a learner, I want each lesson to update my progress.
- As Wise, I need to generate lessons using structured curriculum and learner memory.

## 5. Lesson Types

Supported lesson_type values:

- daily_mission
- recovery
- freestyle
- grammar
- vocabulary_review
- speaking_challenge
- listening_challenge
- media
- scenario_roleplay
- progress_check
- placement

## 6. Learning Style Variants

### Mission Mode

- Framed as a challenge or real-world objective
- Uses narrative briefing
- Includes progress/XP language
- Best for users who like gamified learning

### Tutor Mode

- Calm, instructional, traditional
- Focuses on clarity and mastery
- Less game language

### Conversation Mode

- More open-ended speaking
- Correction timing adjusted to flow
- Great for intermediate learners

### Drill Mode

- Practice-heavy
- Less explanation
- Clear scoring and repetition

### Balanced Mode

- Default mix of explanation, practice, speaking, and review

## 7. Lesson Inputs

The engine should generate lessons from:

- User request
- LearnerProfile
- Preferred learning style
- Preferred correction style
- Preferred Wise personality
- Current level
- Target language
- Native language
- Curriculum next skills
- Skill progress
- Vocabulary due for review
- Recent mistakes
- Relevant MemoryNotes
- Interest theme
- Desired duration
- Voice/text mode
- Active streak/comeback context

## 8. Default Lesson Structure

A strong default lesson includes:

1. Wise greeting/context
2. Lesson or mission briefing
3. Warm-up recall
4. Target skill introduction or review
5. Guided example
6. Interactive practice
7. Speaking or listening task
8. Correction and retry
9. Recap
10. Progress/memory update trigger
11. Next recommendation

## 9. Lesson Generation Requirements

Generated lessons must include structured tasks.

Each Lesson contains multiple LessonTasks.

Each task should define:

- task_type
- prompt
- expected_answer if applicable
- answer options if applicable
- target_skill_ids
- vocabulary_item_ids if applicable
- feedback guidance
- metadata
- order_index

The lesson should not be stored as one giant prose blob.

## 10. Lesson Generation Schema

```json
{
  "title": "Roman Trattoria Mission",
  "lessonType": "daily_mission",
  "estimatedDurationMinutes": 12,
  "difficultyLevel": "beginner",
  "interestTheme": "food travel",
  "targetSkillIds": [],
  "briefing": "Today you’ll practice ordering at a restaurant while reviewing masculine and feminine nouns.",
  "tasks": [
    {
      "taskType": "briefing",
      "prompt": "You are at a small trattoria in Rome...",
      "targetSkillIds": [],
      "vocabularyTargets": []
    },
    {
      "taskType": "multiple_choice",
      "prompt": "Which article fits: ___ pasta?",
      "options": ["il", "la", "lo", "gli"],
      "expectedAnswer": {"value": "la"},
      "explanation": "Pasta is feminine singular, so use la.",
      "targetSkillIds": []
    }
  ],
  "recapPlan": "Summarize article agreement and food words practiced."
}
```

## 11. Lesson Start Flow

1. User accepts recommendation or requests custom lesson.
2. Lesson Engine validates inputs.
3. Curriculum service identifies target skills.
4. Memory service provides relevant context.
5. Vocabulary service provides review candidates.
6. AI generates structured lesson.
7. Schema validation runs.
8. Lesson and LessonTasks are saved.
9. LessonStarted event emitted when user begins.
10. Session created.

## 12. Active Lesson State

The engine must know:

- Current lesson
- Current session
- Current task
- Completed tasks
- Skipped tasks
- User responses
- Corrections
- Whether lesson is paused/resumed

## 13. User Control Requirements

Users can say or click:

- Start
- Pause
- Resume
- Skip
- Repeat
- Explain slower
- Make harder
- Make easier
- Switch to text
- Switch to voice
- Change topic
- Add more speaking
- Add more drills
- End lesson

Wise should adapt the lesson when possible without corrupting session state.

## 14. Completion Requirements

At lesson completion:

- Session marked completed
- Summary generated
- User responses finalized
- Correction data saved
- Skill progress update requested
- Vocabulary updates requested
- Memory extraction requested
- Gamification update requested
- Next recommendation generated

## 15. API Requirements

### POST /api/lessons/generate

Generate structured lesson.

### GET /api/lessons/:lessonId

Get lesson and tasks.

### PATCH /api/lessons/:lessonId

Update lesson metadata/status.

### POST /api/lessons/:lessonId/start

Create session and return first task.

### POST /api/lessons/:lessonId/next-task

Advance task state.

### POST /api/lessons/:lessonId/complete

Complete lesson and trigger post-processing.

### POST /api/lessons/freestyle

Generate or start a freestyle session.

## 16. Events Emitted

- LessonGenerated
- LessonStarted
- LessonTaskStarted
- LessonTaskCompleted
- LessonPaused
- LessonResumed
- LessonCompleted
- LessonSkipped
- NextRecommendationCreated

## 17. UI Requirements

### Lesson Player

Must show:

- Lesson title
- Wise voice/text area
- Current task
- Progress indicator
- Response input
- Voice/text toggle
- Skip/repeat/slower controls
- Feedback panel
- Lesson recap at end

### Mission Mode UI

Optional elements:

- Mission briefing
- Objective card
- XP/progress indicator
- Scenario context
- Completion celebration

## 18. Edge Cases

### AI Generates Invalid Lesson

Retry with stricter schema. If still invalid, generate a simpler fallback lesson.

### User Changes Topic Mid-Lesson

Wise may branch into a new freestyle mini-task or offer to save current lesson and switch.

### User Ends Early

Save partial session and generate short recap.

### User Requests Too Advanced Topic

Allow simplified version and explain prerequisite gap.

### No Vocabulary Due

Use lesson vocabulary or introduce new words.

## 19. Non-Goals

This module does not own:

- Voice transcription
- Correction grading logic
- Skill mastery calculations
- Memory persistence logic
- XP/streak calculations
- Media import
- Admin prompt management

## 20. Acceptance Criteria

This module is acceptable when:

- Wise can generate a structured lesson from learner context.
- LessonTasks are saved separately from Lesson.
- User can start, pause, resume, and complete a lesson.
- Lesson can include at least multiple choice, translation, and speaking prompt tasks.
- Completion triggers progress, vocabulary, memory, and gamification updates.
- User can modify difficulty or topic through Wise.
- Invalid AI lesson output is handled safely.


## Agent Build Rules

- Treat the Master PRD and Technical Architecture/Data Contracts PRD as source-of-truth documents.
- Do not rename canonical entities such as User, LearnerProfile, CurriculumSkill, UserSkillProgress, VocabularyItem, Lesson, LessonTask, Session, UserResponse, Correction, MemoryNote, MediaItem, or UserEvent.
- Do not store prompts inside UI components.
- All AI outputs that affect product state must be schema-validated before persistence.
- Voice-first does not mean voice-only. Every flow must have a text fallback.
- Italian is the first target language and English is the first native language, but data structures should not block future language expansion.
- Emit the required events when core user actions occur.
- Keep module ownership clean. Do not duplicate logic that belongs to another module.
