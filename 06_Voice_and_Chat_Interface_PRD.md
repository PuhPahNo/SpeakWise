# Voice and Chat Interface PRD

## 1. Module Purpose

The Voice and Chat Interface module provides the primary user interaction layer for Speakwise.

Speakwise is voice-first, but every interaction must support text fallback. The interface should make Wise feel like a premium Jarvis-style AI tutor while still being practical for lessons, drills, corrections, and progress review.

## 2. Product Goals

- Make voice the primary, magical way to interact with Wise.
- Support full text-mode equivalence.
- Allow natural voice commands across the product.
- Support speaking practice, lesson navigation, and user responses.
- Provide clear state feedback: listening, thinking, speaking, paused, error.
- Avoid making voice feel gimmicky or unreliable.

## 3. User Stories

- As a learner, I want to speak to Wise naturally.
- As a learner, I want to type whenever I do not want to speak.
- As a learner, I want to interrupt Wise if I need to stop or ask a question.
- As a learner, I want Wise to repeat, slow down, or explain differently.
- As a learner, I want to complete speaking tasks and written tasks in one interface.
- As a learner, I want to know whether Wise is listening, processing, or speaking.

## 4. Core Interface Surfaces

Voice and chat appear in:

- Command Center
- Onboarding
- Lesson Player
- Practice screens
- Media lessons
- Profile and settings commands
- Progress reports

## 5. Voice State Machine

States:

- idle
- listening
- processing_transcription
- thinking
- speaking
- awaiting_user_response
- paused
- error

### State Descriptions

**idle:** Wise is ready but not actively listening.

**listening:** Microphone is capturing user speech.

**processing_transcription:** Audio is being converted to text.

**thinking:** Wise or backend services are processing.

**speaking:** Wise is responding aloud.

**awaiting_user_response:** Wise has asked for input.

**paused:** User paused the session.

**error:** Voice or AI interaction failed.

## 6. Voice Interaction Modes

### Push-to-Talk

Initial recommended default.

User holds or taps microphone to speak.

Pros:

- Easier to implement
- Less accidental capture
- Clearer user control

### Hands-Free

Future enhancement.

Wise listens for turn-taking or wake interaction.

### Text Mode

User types into input box.

Text mode must call the same Wise endpoint and support the same commands.

## 7. Core Voice Commands

Required commands:

- “Start today’s lesson.”
- “Continue.”
- “Pause.”
- “Resume.”
- “Repeat that.”
- “Say that slower.”
- “Explain that differently.”
- “Give me a harder version.”
- “Make it easier.”
- “Switch to text mode.”
- “Switch to voice mode.”
- “Quiz me on vocabulary.”
- “Correct me after I finish.”
- “Correct me immediately.”
- “How am I doing?”
- “End lesson.”

## 8. Speech-to-Text Requirements

The STT pipeline should:

- Capture user audio
- Transcribe reliably
- Support English and Italian utterances
- Return confidence if available
- Preserve transcript for session history
- Allow user correction when transcription appears wrong

### Mixed-Language Handling

Learners may mix English and Italian.

The transcription system should not assume only one language per utterance.

## 9. Text-to-Speech Requirements

The TTS pipeline should:

- Speak Wise responses naturally
- Support English and Italian pronunciation
- Allow speed adjustment
- Allow replay
- Allow muting
- Avoid excessively long spoken responses

## 10. Interruption Handling

Users should be able to interrupt Wise while speaking.

Initial acceptable behavior:

- Stop TTS playback
- Capture new user input
- Send new message to Wise with current context

Advanced future behavior:

- Natural real-time barge-in
- Partial response cancellation
- Streaming conversation state

## 11. UI Requirements

### Voice Orb / Assistant Panel

Should indicate:

- idle
- listening
- thinking
- speaking
- paused
- error

### Transcript Panel

Shows:

- User utterances
- Wise responses
- Corrections
- Key lesson instructions

### Input Controls

- Microphone button
- Text input
- Voice/text toggle
- Repeat button
- Pause button
- End lesson button
- Settings shortcut

### Suggested Action Chips

Examples:

- Start lesson
- Review vocabulary
- Slow down
- Try again
- Show explanation
- Continue

## 12. Accessibility Requirements

- Text fallback for all voice interactions
- Captions/transcripts for Wise speech
- Keyboard-accessible controls
- Clear visual state indicators
- No reliance on audio only

## 13. API Requirements

### POST /api/voice/transcribe

Transcribes audio.

### POST /api/voice/synthesize

Generates Wise audio.

### POST /api/wise/message

Receives normalized input from voice or text.

### POST /api/session/:sessionId/audio-event

Optional endpoint for recording voice interaction metadata.

## 14. Data Written

- Session transcript
- UserResponse transcription
- Input mode
- Voice interaction events
- Error events

## 15. Events Emitted

- VoiceRecordingStarted
- VoiceRecordingStopped
- VoiceTranscriptionCompleted
- VoiceTranscriptionFailed
- WiseSpeechStarted
- WiseSpeechStopped
- VoiceModeChanged
- TextModeChanged
- UserInterruptedWise

## 16. Error States

### Microphone Permission Denied

Message:

> “I can’t access your microphone. You can enable it in your browser or continue by typing.”

### Transcription Failed

Message:

> “I didn’t catch that. Want to try again or type it?”

### TTS Failed

Message:

> “I can still show the response in text. Audio is having trouble right now.”

### Network Failure

Message:

> “Connection dropped for a second. Your progress is saved. Try again when you’re ready.”

## 17. Non-Goals

This module does not own:

- Wise reasoning logic
- Lesson generation
- Correction evaluation
- Progress calculations
- Memory extraction
- Full pronunciation scoring

## 18. Acceptance Criteria

This module is acceptable when:

- User can interact with Wise by voice.
- User can interact with Wise by text with equivalent functionality.
- Voice state is clearly visible.
- STT output routes into Wise correctly.
- Wise TTS response can be played and replayed.
- User can switch modes mid-session.
- User can interrupt or stop Wise speech.
- Voice errors degrade gracefully into text mode.


## Agent Build Rules

- Treat the Master PRD and Technical Architecture/Data Contracts PRD as source-of-truth documents.
- Do not rename canonical entities such as User, LearnerProfile, CurriculumSkill, UserSkillProgress, VocabularyItem, Lesson, LessonTask, Session, UserResponse, Correction, MemoryNote, MediaItem, or UserEvent.
- Do not store prompts inside UI components.
- All AI outputs that affect product state must be schema-validated before persistence.
- Voice-first does not mean voice-only. Every flow must have a text fallback.
- Italian is the first target language and English is the first native language, but data structures should not block future language expansion.
- Emit the required events when core user actions occur.
- Keep module ownership clean. Do not duplicate logic that belongs to another module.
