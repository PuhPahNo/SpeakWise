# Voice-First Onboarding PRD

## 1. Module Purpose

The Voice-First Onboarding module introduces the learner to Speakwise and Wise, collects the information needed to personalize the learning experience, optionally assesses the learner’s level, and creates the initial LearnerProfile.

Onboarding should feel like a natural conversation with Wise, not a traditional form.

## 2. Product Goals

- Make the first interaction feel magical and personal.
- Establish Wise as the user’s AI tutor.
- Capture the user’s native language, target language, goals, interests, level, preferences, and desired learning style.
- Support voice-first input with full text fallback.
- Create a structured LearnerProfile that can power future lessons.
- Recommend the first lesson immediately after onboarding.

## 3. Initial Scope

Initial language scope:

- Native language: English
- Target language: Italian

Architecture should support future language expansion.

## 4. User Stories

- As a new learner, I want to speak naturally to Wise during setup.
- As a new learner, I want to type instead if I do not want to use voice.
- As a new learner, I want Wise to ask why I’m learning Italian and what I care about.
- As a new learner, I want Wise to estimate my level if I’m not sure.
- As a new learner, I want to review and edit what Wise learned about me before starting.
- As a new learner, I want the first lesson to feel directly connected to my goals.

## 5. Onboarding Flow

### Step 1: Welcome

Wise introduces itself.

Example:

> “Welcome to Speakwise. I’m Wise, your personal Italian tutor. I’ll build your lessons around your goals, interests, mistakes, and progress. We can do this by voice or text. Which do you prefer?”

Required outputs:

- onboarding session created
- input mode selected or defaulted

### Step 2: Native Language

Wise asks what language the learner speaks most comfortably.

Initial default: English.

Store in User.native_language.

### Step 3: Target Language

Wise asks what language the learner wants to learn.

Initial default: Italian.

Store in User.target_language.

### Step 4: Learning Goal

Wise asks why the user wants to learn.

Examples:

- Travel
- Fluency
- Family/heritage
- Work
- Culture
- Food
- Relationships
- School
- Personal challenge

Store in LearnerProfile.goals.

### Step 5: Interests

Wise asks what topics the user enjoys or wants lessons built around.

Examples:

- Food
- Travel
- Politics
- History
- Art
- Music
- Movies
- Sports
- Business
- Literature
- Family
- News
- Culture

Store in LearnerProfile.interests.

### Step 6: Learning Style

Wise asks how the user wants lessons to feel.

Options:

- Mission mode
- Tutor mode
- Conversation mode
- Drill mode
- Balanced mode

Store in LearnerProfile.preferred_learning_style.

### Step 7: Wise Personality

Wise offers personality options.

Options:

- Default Wise
- Friendly Tutor
- Direct Coach
- Game Master
- Premium Assistant
- Strict Grammar Coach
- Casual Companion

Store in LearnerProfile.preferred_wise_personality.

### Step 8: Correction Style

Wise asks how the user wants corrections.

Options:

- Gentle
- Direct
- Strict
- End-of-task
- Major mistakes only
- Adaptive

Recommended default: adaptive.

Store in LearnerProfile.preferred_correction_style.

### Step 9: Session Preference

Wise asks how long sessions should usually be.

Options:

- 5 minutes
- 10 minutes
- 15 minutes
- 30 minutes
- Varies / ask me each time

Store in LearnerProfile.preferred_session_length_minutes or preference note.

### Step 10: Level Selection

Wise asks the user to select their level or choose assessment.

Options:

- Complete beginner
- Beginner
- Lower intermediate
- Intermediate
- Upper intermediate
- Advanced
- Not sure — assess me

If user selects level, store with medium confidence.

If user selects assessment, trigger placement assessment.

### Step 11: Placement Assessment Optional

Wise runs a short conversational assessment.

Assessment should test:

- Basic comprehension
- Simple Italian response
- Vocabulary recognition
- Grammar awareness
- Listening/speaking confidence if voice-enabled

Assessment output:

- Estimated level
- Confidence score
- Recommended starting skill
- Skills likely known
- Skills needing review

### Step 12: Profile Summary and Confirmation

Wise summarizes the learner profile.

Example:

> “Here’s what I have: you’re learning Italian for food-focused travel, you like restaurants, markets, and culture, you prefer a mission-style experience, and you want adaptive corrections. I’ll start you as a beginner and build lessons around practical travel situations while teaching the grammar in the right order. Want to change anything?”

User can confirm or edit.

### Step 13: First Lesson Recommendation

Wise recommends the first lesson.

Example:

> “Your first lesson is a 10-minute Italian food-travel mission: greeting a server, ordering something simple, and recognizing masculine and feminine nouns. Ready to begin?”

## 6. Voice and Text Requirements

### Voice Mode

- User can speak answers.
- System transcribes and displays text for confirmation when useful.
- Wise responds with audio and visible text.
- User can say “switch to text” at any time.

### Text Mode

- Same questions and logic.
- Text input box replaces microphone interaction.
- User can switch back to voice.

## 7. Data Created or Updated

### User

- name
- native_language
- target_language
- timezone if available

### LearnerProfile

- current_level
- level_confidence
- goals
- interests
- preferred_learning_style
- preferred_correction_style
- preferred_wise_personality
- preferred_session_length_minutes
- preferred_frequency
- motivation_notes
- onboarding_completed

### Session

- session_type: onboarding
- mode: voice/text/mixed
- transcript
- summary

### MemoryNote

Potential memory notes:

- explicit goals
- explicit interests
- correction preference
- motivation notes
- content preferences

## 8. API Requirements

### POST /api/onboarding/start

Starts onboarding session.

### POST /api/onboarding/respond

Processes each user response and extracts candidate profile updates.

### POST /api/onboarding/assess-level

Runs optional placement assessment.

### POST /api/onboarding/complete

Creates or finalizes LearnerProfile and recommends first lesson.

## 9. AI Output Schema

```json
{
  "wiseMessage": "string",
  "currentStep": "goals",
  "extractedFields": {
    "goals": [],
    "interests": []
  },
  "confidence": 0.87,
  "needsConfirmation": false,
  "nextStep": "interests",
  "profileUpdateCandidate": {},
  "memoryCandidates": []
}
```

## 10. Placement Assessment Schema

```json
{
  "estimatedLevel": "beginner",
  "confidence": 0.78,
  "knownSkills": [],
  "reviewSkills": [],
  "recommendedStartingSkill": "italian-gender-and-articles",
  "assessmentSummary": "User understands simple greetings but struggles forming full sentences."
}
```

## 11. UI Requirements

### Onboarding Screen

- Wise avatar/orb
- Voice input button
- Text input fallback
- Live transcript
- Current step progress
- Skip or manual edit option
- Summary confirmation card

### Manual Edit Panel

User can edit:

- Native language
- Target language
- Goals
- Interests
- Level
- Wise personality
- Correction style
- Learning style
- Session length

## 12. Events Emitted

- OnboardingStarted
- OnboardingStepCompleted
- PlacementAssessmentStarted
- PlacementAssessmentCompleted
- LearnerProfileCreated
- OnboardingCompleted
- FirstLessonRecommended

## 13. Edge Cases

### User refuses voice

Use text onboarding with no penalty.

### User does not know level

Offer assessment.

### User gives vague goals

Wise asks one clarifying question, then proceeds.

### User gives too many interests

Store all but identify primary interests.

### Speech transcription is wrong

Let user correct transcript.

### User wants a target language other than Italian

If unsupported, say Italian is the current supported launch language and offer waitlist/future language placeholder.

## 14. Non-Goals

This module does not own:

- Full lesson generation logic
- Long-term memory extraction after normal sessions
- Curriculum mastery calculations
- Progress dashboard
- Media import
- Tutor mode

## 15. Acceptance Criteria

Onboarding is acceptable when:

- User can complete onboarding entirely by voice.
- User can complete onboarding entirely by text.
- User can switch between voice and text.
- LearnerProfile is created with required fields.
- Optional placement assessment estimates a level.
- Wise summarizes the profile before completion.
- User can edit profile details before starting.
- First lesson recommendation is generated from profile context.
- Onboarding emits required events.


## Agent Build Rules

- Treat the Master PRD and Technical Architecture/Data Contracts PRD as source-of-truth documents.
- Do not rename canonical entities such as User, LearnerProfile, CurriculumSkill, UserSkillProgress, VocabularyItem, Lesson, LessonTask, Session, UserResponse, Correction, MemoryNote, MediaItem, or UserEvent.
- Do not store prompts inside UI components.
- All AI outputs that affect product state must be schema-validated before persistence.
- Voice-first does not mean voice-only. Every flow must have a text fallback.
- Italian is the first target language and English is the first native language, but data structures should not block future language expansion.
- Emit the required events when core user actions occur.
- Keep module ownership clean. Do not duplicate logic that belongs to another module.
