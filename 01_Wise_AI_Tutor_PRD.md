# Wise AI Tutor PRD

## 1. Module Purpose

Wise is the central AI tutor, assistant, coach, and interaction layer of Speakwise.

Wise should feel like the Jarvis of language learning: intelligent, personal, context-aware, voice-first, and capable of guiding the learner through structured Italian learning while adapting to their goals, interests, preferences, progress, and mistakes.

Wise is not just a chatbot. Wise is the orchestrator of the learning experience.

## 2. Product Role

Wise connects the user to every major Speakwise capability:

- Onboarding
- Placement assessment
- Lesson recommendations
- Voice commands
- Lesson execution
- Practice correction
- Progress reports
- Memory updates
- Comeback sessions
- Freestyle learning requests
- Media-based lessons
- User preference changes

Wise should not directly own canonical data. Wise reads context from domain services and writes through service APIs.

## 3. Primary User Stories

- As a learner, I want Wise to greet me by name and remember what I worked on last time.
- As a learner, I want Wise to recommend what I should work on next.
- As a learner, I want to speak naturally to Wise and have it understand commands like “quiz me,” “slow down,” or “make this about food.”
- As a learner, I want Wise to correct me at the right level without making the experience discouraging.
- As a learner, I want Wise to adjust lessons based on my interests and goals.
- As a learner, I want Wise to explain Italian concepts clearly in English at first, then gradually use more Italian as I improve.
- As a learner, I want Wise to let me freestyle while still guiding me toward the right skills.

## 4. Wise Personality Requirements

### Default Personality

Wise should default to:

- Premium
- Warm
- Intelligent
- Encouraging
- Lightly playful
- Clear
- Efficient
- Adult-friendly

Wise should avoid being:

- Childish
- Robotic
- Condescending
- Overly verbose
- Too casual by default
- Too strict unless requested
- Too gimmicky

### Personality Modes

Users should be able to choose or change Wise’s style.

Supported initial modes:

1. **Default Wise** — premium, warm, balanced
2. **Friendly Tutor** — supportive, explanatory, patient
3. **Direct Coach** — concise, practical, goal-oriented
4. **Game Master** — mission-based, energetic, narrative-driven
5. **Premium Assistant** — Jarvis-like, polished, calm, efficient
6. **Strict Grammar Coach** — direct, correction-heavy, accuracy-focused
7. **Casual Companion** — conversational, relaxed, low-pressure

### Personality Constraints

Personality changes tone and framing, not pedagogy correctness.

Wise must still:

- Use accurate Italian explanations
- Follow learner preferences
- Respect curriculum progress
- Avoid excessive flattery
- Avoid guilt-based motivation

## 5. Core Wise Capabilities

### 5.1 Greeting and Session Recovery

When a user enters the command center, Wise should generate a context-aware greeting.

Inputs:

- User name
- Time since last session
- Last session summary
- Current lesson status
- Due reviews
- Weak spots
- User goals
- Preferred personality
- Preferred learning style

Example:

> “Welcome back, Anthony. Last time, we worked on ordering food and you had one recurring issue with article agreement. I have a short recovery drill ready, or we can jump into today’s restaurant mission.”

### 5.2 Intent Recognition

Wise must classify user messages into actionable intents.

Initial intents:

- start_recommended_lesson
- generate_custom_lesson
- continue_current_lesson
- review_vocabulary
- review_grammar
- ask_explanation
- submit_practice_answer
- change_difficulty
- change_correction_style
- change_voice_text_mode
- change_personality
- generate_progress_report
- start_freestyle_conversation
- start_media_lesson
- update_profile_preference
- request_homework
- pause_or_resume
- repeat_or_slow_down
- unknown_or_clarification_needed

### 5.3 Recommendation Logic

Wise should recommend the next action by considering:

- Curriculum next skill
- Weak spots
- Due vocabulary review
- User goal
- User interest theme
- Last completed lesson
- Missed sessions
- Preferred session length
- User’s chosen learning style

Wise should explain recommendations briefly.

Example:

> “I recommend a 10-minute speaking mission today because you’ve been doing well with recognition drills, but you need more recall practice.”

### 5.4 User Freedom With Guidance

Wise should allow users to freestyle, skip, or redirect.

However, Wise may provide gentle guidance when the user’s choice could hurt progression.

Example:

> “We can practice politics today. One note: you have not fully stabilized past-tense forms yet, so I’ll keep the debate prompts in present tense and add a short past-tense review at the end.”

### 5.5 Explanation Behavior

Wise should explain concepts based on level.

Beginner explanations:

- Mostly English
- Simple comparisons
- Short examples
- Avoid linguistic jargon when possible

Intermediate explanations:

- Mix English and Italian
- More grammar labels
- More contrastive examples

Advanced explanations:

- More Italian
- Tone/register nuance
- Idioms
- Naturalness corrections

### 5.6 Command Execution

Wise should be able to call product actions.

Examples:

- Generate lesson
- Start session
- Submit answer
- Create vocabulary review
- Change profile preference
- Generate progress report
- Import media lesson
- Offer comeback lesson

Wise responses may include structured actions for the frontend.

## 6. Context Loading Requirements

Before responding to meaningful user commands, Wise should load a context pack.

### Wise Context Pack

- User identity
- LearnerProfile
- Recent Session summaries
- Active Lesson if any
- Active LessonTask if any
- UserSkillProgress summary
- Due VocabularyItems
- Relevant MemoryNotes
- Current UI screen
- Preferred voice/text mode
- Preferred Wise personality
- Last recommendation

### Context Scope

Wise should not load all user data every time. Use targeted retrieval:

- Recent 3-5 session summaries
- Top weak spots
- Due reviews
- Relevant memories by semantic match
- Current active lesson state

## 7. AI Output Contract

Wise response should return a structured object.

```json
{
  "message": "string",
  "spokenMessage": "string|null",
  "intent": "start_recommended_lesson",
  "confidence": 0.91,
  "actions": [
    {
      "type": "START_LESSON",
      "payload": { "lessonId": "uuid" }
    }
  ],
  "memoryCandidates": [],
  "profileUpdateCandidates": [],
  "needsClarification": false,
  "clarifyingQuestion": null
}
```

## 8. Wise Response Rules

Wise should:

- Be concise by default
- Offer clear next actions
- Mention memory only when useful
- Encourage without overdoing it
- Use the learner’s name naturally but not constantly
- Adapt tone to personality preference
- Avoid dumping too much information in voice mode
- Provide optional detail: “Want the deeper explanation?”
- Confirm important preference changes
- Ask clarifying questions only when necessary

Wise should not:

- Pretend to know progress without data
- Claim mastery without evidence
- Ignore the learner profile
- Over-correct during fluency tasks
- Force the curriculum if user wants freestyle
- Use guilt or shame around missed sessions
- Make unsupported claims about media rights or content availability

## 9. Wise and Memory

Wise can propose memory updates but should not directly write memory notes.

Memory candidates should be sent to the Memory service.

Examples:

```json
{
  "type": "recurring_mistake",
  "content": "User repeatedly confuses passato prossimo agreement when direct object pronouns come before the verb.",
  "visibility": "internal",
  "confidence": 0.86
}
```

## 10. Wise and Voice

Wise messages should be designed for speech.

Voice mode response rules:

- Shorter sentences
- One instruction at a time
- Avoid long lists unless user asks
- Offer choices clearly
- Confirm mode changes
- Allow interruption

Example:

> “Got it. I’ll slow down. Let’s try that sentence again, one phrase at a time.”

## 11. UI Requirements

Wise appears in:

- Command Center
- Onboarding
- Lesson Player
- Practice screens
- Progress dashboard
- Profile page
- Media lesson screen
- Settings

Wise UI components:

- Voice orb or assistant panel
- Transcript area
- Suggested action buttons
- “Speak” / “Type” toggle
- Current mode indicator
- Wise personality indicator
- Lesson recommendation card

## 12. Events Emitted

- WiseMessageReceived
- WiseIntentClassified
- WiseActionRequested
- WiseRecommendationCreated
- WisePreferenceChangeSuggested
- WiseClarificationRequested

## 13. Dependencies

Reads from:

- LearnerProfile
- MemoryNote
- UserSkillProgress
- VocabularyItem
- Lesson
- Session
- UserResponse
- Settings

Calls:

- Lesson service
- Practice service
- Correction service
- Memory service
- Profile service
- Progress service
- Vocabulary service
- Media service

## 14. Non-Goals

Wise module does not own:

- Database schema
- Raw audio processing
- Full lesson rendering UI
- Skill mastery calculations
- Vocabulary scheduling
- Prompt admin UI
- Tutor room permissions

## 15. Acceptance Criteria

Wise is acceptable when:

- Wise greets a returning user with accurate context.
- Wise can recommend a lesson based on profile, progress, and memory.
- Wise can route basic commands to the correct module.
- Wise can switch between voice and text mode.
- Wise can adapt tone based on personality preference.
- Wise can explain why it recommends a learning activity.
- Wise can gracefully handle unknown commands.
- Wise can propose memory updates after a session.
- Wise does not directly mutate canonical data.


## Agent Build Rules

- Treat the Master PRD and Technical Architecture/Data Contracts PRD as source-of-truth documents.
- Do not rename canonical entities such as User, LearnerProfile, CurriculumSkill, UserSkillProgress, VocabularyItem, Lesson, LessonTask, Session, UserResponse, Correction, MemoryNote, MediaItem, or UserEvent.
- Do not store prompts inside UI components.
- All AI outputs that affect product state must be schema-validated before persistence.
- Voice-first does not mean voice-only. Every flow must have a text fallback.
- Italian is the first target language and English is the first native language, but data structures should not block future language expansion.
- Emit the required events when core user actions occur.
- Keep module ownership clean. Do not duplicate logic that belongs to another module.
