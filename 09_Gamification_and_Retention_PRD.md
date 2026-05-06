# Gamification and Retention PRD

## 1. Module Purpose

The Gamification and Retention module makes Speakwise enjoyable, habit-forming, and rewarding without making it childish or manipulative.

Speakwise should feel like premium mission-based mastery: users are building real skill through meaningful progress loops, not collecting empty points.

## 2. Product Goals

- Encourage users to return consistently.
- Make learning feel rewarding and alive.
- Support optional mission framing.
- Avoid guilt-based streak mechanics.
- Use progress, XP, streaks, unlocks, and comeback lessons to motivate.
- Adapt retention style to user preference.

## 3. Gamification Philosophy

Speakwise should be:

- Premium
- Lightly playful
- Mission-oriented when preferred
- Respectful of adult learners
- Progress-focused
- Encouraging
- Flexible

Speakwise should not be:

- Childish
- Overloaded with badges
- Manipulative
- Guilt-driven
- Annoying
- A game at the expense of learning

## 4. User Stories

- As a learner, I want learning to feel motivating and enjoyable.
- As a learner, I want to see progress without feeling like I’m being treated like a child.
- As a learner, I want comeback lessons if I miss practice.
- As a learner, I want lessons framed as missions if I like that style.
- As a learner, I want Wise to encourage me without nagging me.

## 5. Core Mechanics

### 5.1 XP

XP rewards meaningful learning actions.

Examples:

- Complete lesson
- Complete speaking task
- Review vocabulary
- Correct a repeated mistake
- Finish comeback lesson
- Complete media lesson

XP should not imply mastery by itself.

### 5.2 Streaks

Streaks track consistency.

Streak rules should be gentle.

- Practice day counts if user completes meaningful session.
- User can miss and receive comeback prompt.
- Future streak freezes may exist.
- Avoid shame language.

### 5.3 Comeback Lessons

If user misses expected practice, Wise offers a short recovery lesson.

Example:

> “Welcome back. You missed yesterday, so I made a 4-minute recovery lesson. Want to do that first or jump into today’s plan?”

### 5.4 Skill Mastery Visuals

Show progress toward mastery for skills.

States:

- Not started
- Introduced
- Practicing
- Needs review
- Proficient
- Mastered

### 5.5 Unlockable Scenarios

Users unlock richer scenarios as they improve.

Examples:

- Order coffee
- Navigate a market
- Make a dinner reservation
- Discuss a news headline
- Tell a travel story
- Debate an opinion

Unlocks should align with real curriculum progress.

### 5.6 Narrative Arcs

Optional mission mode may use lightweight narrative arcs.

Example food/travel arc:

1. Café greeting
2. Market shopping
3. Trattoria ordering
4. Cooking class
5. Regional food discussion
6. Handling a reservation issue

## 6. User Preference Requirements

Users can choose learning style:

- Mission mode
- Tutor mode
- Conversation mode
- Drill mode
- Balanced mode

Gamification intensity should adapt.

### Mission Mode

More visible missions, XP, objectives, narrative.

### Tutor Mode

Less game language, more progress and mastery.

### Drill Mode

Scores, repetition, speed, accuracy.

### Conversation Mode

Fluency streaks, conversation time, scenario unlocks.

## 7. Retention Nudges

Nudges should be helpful, not annoying.

Potential nudge types:

- Due review reminder
- Comeback lesson prompt
- Goal-based reminder
- Progress milestone
- Weak spot recovery
- New scenario unlocked

Example:

> “You’re one short review away from stabilizing your restaurant vocabulary. Want a 3-minute quiz?”

## 8. Data Model Additions

### UserGamificationState

Suggested fields:

- id
- user_id
- total_xp
- current_streak_days
- longest_streak_days
- last_practice_date
- comeback_lessons_completed
- missions_completed
- scenarios_unlocked
- created_at
- updated_at

### Achievement

Suggested fields:

- id
- slug
- name
- description
- criteria
- is_active

### UserAchievement

Suggested fields:

- id
- user_id
- achievement_id
- earned_at

## 9. API Requirements

### GET /api/gamification/state

Returns user gamification summary.

### POST /api/gamification/award-xp

Awards XP for learning event.

### GET /api/gamification/recommend-comeback

Checks whether comeback lesson should be offered.

### POST /api/gamification/unlock-scenario

Unlocks scenario.

## 10. Events Consumed

- LessonCompleted
- SessionCompleted
- PracticeAnswered
- VocabularyReviewed
- SkillMasteryChanged
- UserMissedPlannedSession

## 11. Events Emitted

- XPAwarded
- StreakUpdated
- ComebackLessonOffered
- ComebackLessonCompleted
- ScenarioUnlocked
- AchievementEarned

## 12. UI Requirements

### Command Center

May show:

- Current streak
- Recommended mission
- XP/progress summary
- Comeback prompt
- Skill progress card

### Lesson Completion

May show:

- XP earned
- Skills practiced
- Vocabulary reviewed
- Weak spot improved
- Next unlock progress

### Progress Dashboard

May show:

- Streak history
- Mastery map
- Mission history
- Achievements

## 13. Comeback Logic

If user misses preferred schedule:

1. Detect missed practice.
2. Offer brief recovery lesson.
3. Make it low-friction.
4. Avoid guilt language.
5. Let user skip.

Example options:

- Start 4-minute recovery
- Jump into today’s lesson
- Ignore and continue

## 14. Edge Cases

### User Does Not Want Gamification

Allow quieter tutor mode with minimal visible XP/streaks.

### User Misses Many Days

Offer reset/re-entry plan, not a guilt prompt.

### User Freestyles Often

Reward meaningful learning activity even outside planned lessons.

### XP Farming

Do not over-reward trivial repeated actions.

## 15. Non-Goals

This module does not own:

- Learning correctness
- Skill mastery calculation
- Lesson generation
- Correction grading
- Memory extraction
- Notification delivery infrastructure beyond event creation

## 16. Acceptance Criteria

This module is acceptable when:

- XP can be awarded for completed learning actions.
- Streaks update without guilt-based messaging.
- Comeback lessons can be offered after missed practice.
- Mission mode can show objectives and rewards.
- Tutor mode can minimize gamified language.
- Unlockable scenarios can be tied to skill progress.
- Gamification consumes learning events rather than inventing its own progress.


## Agent Build Rules

- Treat the Master PRD and Technical Architecture/Data Contracts PRD as source-of-truth documents.
- Do not rename canonical entities such as User, LearnerProfile, CurriculumSkill, UserSkillProgress, VocabularyItem, Lesson, LessonTask, Session, UserResponse, Correction, MemoryNote, MediaItem, or UserEvent.
- Do not store prompts inside UI components.
- All AI outputs that affect product state must be schema-validated before persistence.
- Voice-first does not mean voice-only. Every flow must have a text fallback.
- Italian is the first target language and English is the first native language, but data structures should not block future language expansion.
- Emit the required events when core user actions occur.
- Keep module ownership clean. Do not duplicate logic that belongs to another module.
