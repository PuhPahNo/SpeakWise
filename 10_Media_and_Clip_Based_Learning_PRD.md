# Media and Clip-Based Learning PRD

## 1. Module Purpose

The Media and Clip-Based Learning module allows Speakwise to turn authentic or generated media into personalized Italian learning activities.

This is a signature feature that helps users learn through content they care about: food, travel, politics, history, music, film, culture, news, and more.

## 2. Product Goals

- Let learners practice with engaging, interest-based content.
- Support clip-based listening, translation, vocabulary, grammar, and speaking tasks.
- Allow Wise to choose the best activity based on learner level and goals.
- Respect content rights and source limitations.
- Provide a path for future licensed content.

## 3. Content Philosophy

Media should support learning, not distract from it.

Wise should use media when it improves engagement, context, listening comprehension, cultural exposure, or vocabulary retention.

Media should be adapted to the learner’s level.

## 4. User Stories

- As a learner, I want to learn Italian through topics I care about.
- As a learner, I want Wise to use short clips, transcripts, or scenes as lesson material.
- As a learner, I want to translate, repeat, discuss, or analyze media at my level.
- As a learner, I want to paste a link and have Wise create a lesson if possible.
- As the platform owner, I want content rights tracked clearly.

## 5. Supported Content Sources

Initial/future source types:

- YouTube link
- User-uploaded transcript
- User-uploaded audio/video later
- AI-generated scene
- Article text
- Podcast transcript
- Licensed clip later
- Public-domain content
- Teacher-uploaded content later

## 6. Rights Status

Every MediaItem must have rights_status:

- unknown
- user_provided
- public
- licensed
- ai_generated
- restricted

Initial safest content:

- AI-generated mini-scenes
- User-provided text/transcripts
- Short excerpts where permitted
- Public-domain materials

Do not assume any YouTube video can be freely reused.

## 7. MediaItem Entity

Canonical fields:

- id
- source_type
- source_url
- title
- language
- transcript
- duration_seconds
- tags
- rights_status
- metadata
- created_at
- updated_at

## 8. Media Lesson Types

Wise can generate different activities from media.

### Listening Comprehension

- Play short audio/clip or Wise-read transcript
- Ask meaning question
- Multiple choice or open answer

### Line Translation

- Present a line
- User translates it
- Wise corrects

### Vocabulary Extraction

- Identify useful words/phrases
- Add selected items to VocabularyItem

### Grammar Spotlight

- Identify a grammar pattern in the clip
- Explain at user level
- Generate follow-up practice

### Repeat / Shadowing

- User repeats a line
- Wise gives pronunciation/naturalness feedback

### Discussion Prompt

- User discusses the scene/topic in Italian at their level

### Cultural Note

- Wise explains relevant cultural context briefly

## 9. Wise Activity Selection

User should not need to choose the exact activity type.

Wise should select based on:

- User level
- User goals
- User interests
- Recent lesson variety
- Target skill
- Media difficulty
- Available transcript/audio
- User preference

Example:

For beginner food learner:

- Use a simple restaurant dialogue
- Ask multiple choice comprehension
- Teach 5 words
- Practice one ordering sentence

For intermediate politics learner:

- Use a news snippet transcript
- Identify opinion phrases
- Discuss the headline
- Practice conditional/subjunctive if appropriate

## 10. Media Import Flow

1. User provides link or text.
2. System checks source type.
3. System extracts metadata if possible.
4. System obtains transcript if permitted/available.
5. rights_status assigned.
6. Wise evaluates suitability.
7. MediaItem saved.
8. User can generate media lesson.

## 11. AI-Generated Scene Flow

If real media is unavailable or risky, Wise can generate a short scene.

Example:

- Italian café dialogue
- Market negotiation
- Political headline discussion
- Hotel check-in problem
- Cooking show-style instruction

AI-generated scenes should be clearly labeled as generated.

## 12. Media Lesson Generation Schema

```json
{
  "mediaId": "uuid",
  "lessonTitle": "Ordering at a Roman Café",
  "targetSkills": [],
  "level": "beginner",
  "activities": [
    {
      "type": "listening_comprehension",
      "prompt": "What does the customer order?",
      "options": ["coffee", "pasta", "wine"],
      "expectedAnswer": "coffee"
    },
    {
      "type": "vocabulary_extraction",
      "items": [
        {"targetText": "un caffè", "nativeText": "a coffee"}
      ]
    }
  ]
}
```

## 13. API Requirements

### POST /api/media/import

Imports/registers media.

### GET /api/media/:mediaId

Returns media metadata and transcript if allowed.

### POST /api/media/:mediaId/generate-lesson

Generates media lesson.

### POST /api/media/generate-scene

Generates AI-created scene.

### POST /api/media/:mediaId/extract-vocabulary

Extracts vocabulary candidates.

## 14. Events Emitted

- MediaImported
- MediaImportFailed
- MediaLessonGenerated
- MediaVocabularyExtracted
- MediaRightsFlagged
- MediaLessonCompleted

## 15. UI Requirements

### Media Page

- Link/text import
- Source preview
- Rights/source status indicator
- Generate lesson button
- Transcript display when available

### Media Lesson Screen

- Clip/transcript area
- Audio replay if available
- Current task
- Vocabulary panel
- Wise explanation panel
- Voice/text response input

## 16. Edge Cases

### No Transcript Available

Offer user to paste transcript or generate AI scene instead.

### Rights Restricted

Do not create lesson from restricted content. Offer alternative.

### Media Too Advanced

Wise simplifies activity or extracts only manageable phrases.

### User Wants Full Movie/Long Video

Use short excerpt/transcript if allowed; do not process entire copyrighted work.

### Source Unavailable

Ask user for transcript or alternate link.

## 17. Non-Goals

This module does not own:

- Core lesson engine
- Correction logic
- Progress calculation
- Full video hosting pipeline
- Licensed content marketplace
- Copyright legal review

## 18. Acceptance Criteria

This module is acceptable when:

- User can provide text or a link as media input.
- MediaItem is created with rights_status.
- Wise can generate a lesson from allowed media/transcript.
- AI-generated scenes can be used as safe fallback.
- Media lessons can include listening, translation, vocabulary, and discussion tasks.
- Extracted vocabulary can be proposed for VocabularyItem creation.
- Restricted/unavailable media is handled gracefully.


## Agent Build Rules

- Treat the Master PRD and Technical Architecture/Data Contracts PRD as source-of-truth documents.
- Do not rename canonical entities such as User, LearnerProfile, CurriculumSkill, UserSkillProgress, VocabularyItem, Lesson, LessonTask, Session, UserResponse, Correction, MemoryNote, MediaItem, or UserEvent.
- Do not store prompts inside UI components.
- All AI outputs that affect product state must be schema-validated before persistence.
- Voice-first does not mean voice-only. Every flow must have a text fallback.
- Italian is the first target language and English is the first native language, but data structures should not block future language expansion.
- Emit the required events when core user actions occur.
- Keep module ownership clean. Do not duplicate logic that belongs to another module.
