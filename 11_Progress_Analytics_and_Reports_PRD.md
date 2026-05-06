# Progress Analytics and Reports PRD

## 1. Module Purpose

The Progress Analytics and Reports module helps learners understand how they are improving, where they are struggling, what they have mastered, and what Wise recommends next.

Users should be able to ask, “Wise, how am I doing?” and receive a meaningful answer grounded in actual learning data.

## 2. Product Goals

- Show learner progress clearly.
- Track skill mastery over time.
- Track vocabulary growth and review status.
- Identify recurring weak spots.
- Generate Wise-style progress reports.
- Recommend next learning actions.
- Make progress feel motivating without overclaiming fluency.

## 3. User Stories

- As a learner, I want to see what I’ve mastered.
- As a learner, I want to know what I still need to review.
- As a learner, I want Wise to explain my strengths and weaknesses.
- As a learner, I want to see vocabulary growth.
- As a learner, I want progress reports that feel like a real tutor wrote them.
- As Wise, I need progress data to recommend the next lesson.

## 4. Core Progress Areas

Progress should cover:

- Curriculum skills
- Vocabulary
- Grammar topics
- Speaking practice
- Listening practice
- Correction patterns
- Session consistency
- Mission completion
- Weak spot recovery

## 5. Data Sources

Reads from:

- UserSkillProgress
- VocabularyItem
- Session
- UserResponse
- Correction
- MemoryNote
- Lesson
- UserGamificationState if available

## 6. Progress Dashboard Requirements

Dashboard sections:

1. Current level
2. Skill progress summary
3. Strengths
4. Weaknesses
5. Vocabulary status
6. Recent lessons
7. Review due
8. Speaking/listening activity
9. Recommended next steps
10. Consistency summary

## 7. Skill Progress Requirements

For each skill:

- Name
- Category
- Level
- Status
- Mastery score
- Last practiced
- Next review date
- Correct/incorrect counts
- Recent trend

Statuses:

- not_started
- introduced
- practicing
- needs_review
- proficient
- mastered

## 8. Vocabulary Progress Requirements

Vocabulary summary should include:

- New words
- Learning words
- Review words
- Mastered words
- Due for review
- Hardest words
- Recently mastered words
- Tags/themes

## 9. Weak Spot Detection

Weak spots are based on:

- Repeated mistakes
- Low mastery score
- Recent incorrect answers
- Missed review items
- MemoryNote recurring_mistake
- Correction severity

Weak spots should be specific.

Bad:

> “Grammar”

Good:

> “Past participle agreement with direct object pronouns in passato prossimo.”

## 10. Progress Report Generation

Wise should generate a report when user asks:

- “How am I doing?”
- “What should I work on?”
- “Give me a progress report.”
- “What am I struggling with?”

### Report Should Include

- Short summary
- Strengths
- Weaknesses
- Vocabulary status
- Grammar progress
- Recent improvement
- Recommended next steps
- Suggested lesson

### Example

> “You’re making strong progress with food and travel vocabulary. You’ve mastered 42 words and have 18 still in active review. Your biggest recurring issue is past participle agreement when direct object pronouns come before the verb. I recommend one more short mission on that before we move deeper into imperfetto.”

## 11. Progress Report Schema

```json
{
  "summary": "string",
  "currentLevel": "beginner",
  "strengths": [],
  "weaknesses": [],
  "skillsMastered": [],
  "skillsNeedingReview": [],
  "vocabularySummary": {
    "mastered": 42,
    "learning": 18,
    "dueForReview": 7
  },
  "recentImprovement": [],
  "recommendedNextSteps": [],
  "recommendedLessonRequest": {}
}
```

## 12. Analytics Metrics

Track:

- Lessons completed
- Sessions completed
- Practice tasks completed
- Voice minutes
- Words mastered
- Skills mastered
- Mistakes by skill
- Correction retry success
- Review completion rate
- Comeback lesson completion
- Session consistency

## 13. API Requirements

### GET /api/progress/dashboard

Returns dashboard data.

### GET /api/progress/skills

Returns skill progress.

### GET /api/progress/vocabulary

Returns vocabulary progress summary.

### GET /api/progress/weak-spots

Returns calculated weak spots.

### GET /api/progress/report

Generates Wise-readable/user-readable report.

### POST /api/progress/update-from-response

Service endpoint to update progress after correction.

## 14. Events Consumed

- PracticeAnswered
- CorrectionCreated
- MistakeDetected
- SkillEvidenceObserved
- LessonCompleted
- VocabularyReviewed
- MemoryUpdated

## 15. Events Emitted

- SkillMasteryChanged
- WeakSpotDetected
- WeakSpotImproved
- ProgressReportGenerated
- VocabularyMasteryChanged

## 16. UI Requirements

### Progress Dashboard

Should include:

- Overall progress card
- Skill map/list
- Vocabulary card
- Weak spots card
- Recent wins
- Recommended next lesson
- “Ask Wise for report” button

### Wise Report View

Should show:

- Natural language report
- Supporting metrics
- Recommended actions

## 17. Mastery Calculation Guidelines

Mastery should be evidence-based.

Factors:

- Correctness
- Difficulty
- Hints used
- Retry success
- Time since last practice
- Task variety
- Speaking vs recognition
- Repeated performance

Do not mark mastery from one correct answer.

## 18. Edge Cases

### New User

Show starter progress and encourage first lesson.

### User Freestyles

Count meaningful learning evidence even outside planned lessons.

### User Has Conflicting Signals

Show cautious language.

Example:

> “You recognize this well, but recall is still inconsistent.”

### User Requests Advanced Progress Report

Include more detailed skill breakdown.

## 19. Non-Goals

This module does not own:

- Lesson generation
- Correction generation
- Vocabulary item creation
- Memory extraction
- Gamification XP logic

## 20. Acceptance Criteria

This module is acceptable when:

- Dashboard shows skill, vocabulary, weakness, and lesson progress.
- Wise can generate a grounded progress report.
- Skill mastery updates from correction evidence.
- Weak spots are specific and actionable.
- Vocabulary progress is summarized accurately.
- Recommendations are based on actual learner data.


## Agent Build Rules

- Treat the Master PRD and Technical Architecture/Data Contracts PRD as source-of-truth documents.
- Do not rename canonical entities such as User, LearnerProfile, CurriculumSkill, UserSkillProgress, VocabularyItem, Lesson, LessonTask, Session, UserResponse, Correction, MemoryNote, MediaItem, or UserEvent.
- Do not store prompts inside UI components.
- All AI outputs that affect product state must be schema-validated before persistence.
- Voice-first does not mean voice-only. Every flow must have a text fallback.
- Italian is the first target language and English is the first native language, but data structures should not block future language expansion.
- Emit the required events when core user actions occur.
- Keep module ownership clean. Do not duplicate logic that belongs to another module.
