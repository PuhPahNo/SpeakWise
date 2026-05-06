# Correction and Feedback Engine PRD

## 1. Module Purpose

The Correction and Feedback Engine evaluates learner responses, generates corrections, explains mistakes, identifies skill signals, and provides feedback in the learner’s preferred style.

Correction is one of the most important parts of Speakwise because it determines whether the product feels like a real tutor or a generic quiz app.

## 2. Product Goals

- Correct spoken and written Italian accurately.
- Adapt correction timing and tone to the learner’s level and preferences.
- Encourage without being patronizing.
- Explain mistakes clearly.
- Identify recurring mistake patterns.
- Provide progress signals to the Progress module.
- Provide memory candidates to the Memory module when appropriate.

## 3. Correction Philosophy

Default correction pattern:

1. Encourage
2. Correct clearly
3. Explain simply
4. Give another chance
5. Save repeated patterns

Example:

> “Good — your meaning was clear. One correction: because *la* comes before *ho visto*, it becomes *l’*, and the past participle agrees with it. So the natural version is *L’ho vista ieri.* Try saying that again.”

## 4. User Stories

- As a learner, I want corrections that help me improve without discouraging me.
- As a learner, I want the system to correct differently during drills versus free conversation.
- As a learner, I want to ask for stricter or gentler corrections.
- As a learner, I want to retry after a correction.
- As Wise, I need to know whether a mistake should update progress or memory.

## 5. Correction Modes

Supported modes:

- gentle
- direct
- strict
- end_of_task
- major_mistakes_only
- adaptive

### Gentle

- Encouraging first
- Avoids harsh language
- Good for beginners or nervous speakers

### Direct

- Clear and concise
- Minimal encouragement
- Good for users who want efficiency

### Strict

- Corrects more issues
- More grammar detail
- Good for advanced or accuracy-focused users

### End-of-Task

- Lets user finish before feedback
- Good for fluency and roleplay

### Major Mistakes Only

- Corrects only meaning-breaking or target-skill mistakes
- Good for conversation flow

### Adaptive

Default. Chooses based on activity, learner level, severity, and preferences.

## 6. Correction Timing Rules

### Drills

Prefer immediate correction.

### Speaking Conversation

Avoid constant interruption unless strict mode.

### Roleplay

Correct at natural breaks or after the roleplay.

### Pronunciation Tasks

Immediate feedback is acceptable.

### Placement Assessment

Do not over-teach during assessment. Save feedback for summary.

## 7. Correction Types

- grammar
- vocabulary
- pronunciation
- spelling
- word_order
- tone
- comprehension
- fluency
- register
- other

## 8. Severity Levels

### Minor

Does not block meaning.

Example: slight article issue in a sentence where meaning is clear.

### Moderate

Meaning mostly clear, but grammar issue matters.

Example: wrong tense in target skill practice.

### Major

Meaning unclear or incorrect.

Example: wrong verb changes the meaning significantly.

## 9. Evaluation Criteria

The engine should evaluate:

- Correctness
- Meaning preservation
- Grammar accuracy
- Vocabulary usage
- Word order
- Naturalness
- Pronunciation if applicable
- Target skill performance
- Whether the answer satisfies the task
- Whether hints were used

## 10. Correction Output Schema

```json
{
  "isCorrect": false,
  "score": 0.65,
  "encouragement": "Good — your meaning was clear.",
  "correctedAnswer": "L’ho vista ieri.",
  "explanation": "Because the direct object pronoun la comes before ho visto, the participle agrees and becomes vista.",
  "mistakeType": "grammar",
  "severity": "moderate",
  "skillTags": ["direct_object_pronouns", "passato_prossimo_agreement"],
  "vocabularyTags": [],
  "retryPrompt": "Try saying the corrected sentence once more.",
  "shouldUpdateMemory": true,
  "progressSignals": [
    {
      "skillId": "uuid",
      "signal": "incorrect",
      "weight": 0.7
    }
  ]
}
```

## 11. Feedback Requirements

Feedback should include:

- Whether the answer was correct or partially correct
- Correct answer when applicable
- Explanation
- Encouragement when appropriate
- Retry prompt when useful
- Optional deeper explanation

### Voice Feedback

Voice feedback should be short.

Example:

> “Almost. Use *la* because *pasta* is feminine. Try: *La prendo.*”

### Text Feedback

Text feedback can include more detail, examples, and formatting.

## 12. Retry Logic

Offer retry when:

- The task is skill-building
- The mistake is moderate or major
- The user is not in fluency-first mode
- The correction can be practiced immediately

Do not force retry when:

- User is in conversation flow
- User skips
- User asks to move on

## 13. Progress Signals

Corrections should emit skill evidence:

- correct
- incorrect
- partially_correct
- hint_used
- retry_success
- retry_failed

Progress module uses these signals to update mastery.

## 14. Memory Candidate Rules

Suggest memory updates when:

- Mistake repeats
- Mistake is tied to an important skill
- User preference is revealed
- User shows consistent strength
- Pronunciation issue repeats

Do not create memory candidate for every single mistake.

## 15. API Requirements

### POST /api/corrections/evaluate

Evaluates a response.

Request:

```json
{
  "userResponseId": "uuid",
  "correctionMode": "adaptive",
  "activityType": "speaking_prompt"
}
```

Response:

```json
{
  "correction": {},
  "feedbackMessage": "string",
  "progressSignals": [],
  "memoryCandidates": []
}
```

## 16. Events Emitted

- CorrectionCreated
- MistakeDetected
- UserCorrected
- RetryOffered
- RetryCompleted
- SkillEvidenceObserved
- MemoryCandidateCreated

## 17. Edge Cases

### Valid Alternate Answers

Do not mark correct alternatives wrong.

### User Answer Is Semantically Correct But Not Target Skill

Mark partially correct and redirect to target.

### AI Is Uncertain

Say uncertainty clearly.

Example:

> “This may depend on context, but the more natural version here is...”

### Transcription Error

Allow transcript correction before final grading if confidence is low.

### User Challenges Correction

Wise should explain and, if uncertain, soften claim.

## 18. Non-Goals

This module does not own:

- Practice rendering
- Voice transcription
- Skill mastery storage
- Vocabulary scheduling
- Lesson generation
- Long-term memory persistence

## 19. Acceptance Criteria

This module is acceptable when:

- It evaluates written and transcribed spoken responses.
- It returns structured correction output.
- It supports multiple correction modes.
- It adapts correction timing by activity type.
- It produces progress signals.
- It emits MistakeDetected for meaningful mistakes.
- It handles alternate valid answers.
- It offers retry when appropriate.
- It avoids overcorrecting fluency tasks by default.


## Agent Build Rules

- Treat the Master PRD and Technical Architecture/Data Contracts PRD as source-of-truth documents.
- Do not rename canonical entities such as User, LearnerProfile, CurriculumSkill, UserSkillProgress, VocabularyItem, Lesson, LessonTask, Session, UserResponse, Correction, MemoryNote, MediaItem, or UserEvent.
- Do not store prompts inside UI components.
- All AI outputs that affect product state must be schema-validated before persistence.
- Voice-first does not mean voice-only. Every flow must have a text fallback.
- Italian is the first target language and English is the first native language, but data structures should not block future language expansion.
- Emit the required events when core user actions occur.
- Keep module ownership clean. Do not duplicate logic that belongs to another module.
