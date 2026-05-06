# Tutor Mode PRD

## 1. Module Purpose

Tutor Mode allows Speakwise to support learners who work with a human language tutor.

Tutor Mode is a future expansion, not the initial strategic center. It should build on the same learner memory, curriculum, vocabulary, lesson, correction, and progress systems used by self-led learners.

## 2. Product Goals

- Let human tutors assign lessons, missions, homework, and drills.
- Give tutors visibility into learner progress.
- Allow Wise to support, not replace, the human tutor.
- Preserve continuity between live tutoring sessions.
- Make between-lesson practice more effective.

## 3. Product Philosophy

Tutor Mode should not position Wise as replacing teachers.

The positioning should be:

> Wise helps tutors make every lesson structured, remembered, practiced, and continued.

## 4. User Roles

### Learner / Student

Completes assignments, practices with Wise, views progress.

### Tutor

Creates assignments, reviews progress, adds notes, guides learning.

### Admin

Manages accounts, feature flags, prompts, and quality controls.

## 5. Core Concepts

### TutorStudentRoom

A shared workspace between one tutor and one learner.

Contains:

- Learner profile summary
- Tutor notes
- Assigned lessons
- Homework
- Lesson recaps
- Vocabulary
- Progress
- Wise recommendations

### Assignment

A tutor-created or Wise-assisted task assigned to learner.

Types:

- Drill
- Lesson
- Speaking task
- Vocabulary review
- Media lesson
- Homework response

## 6. User Stories

### Tutor

- As a tutor, I want to see my student’s progress before a live lesson.
- As a tutor, I want to assign a Wise-generated practice mission.
- As a tutor, I want to add notes after a live lesson.
- As a tutor, I want Wise to suggest what the student should review.
- As a tutor, I want to override or edit AI-generated work.

### Learner

- As a learner, I want to see what my tutor assigned.
- As a learner, I want to complete homework with Wise’s first-pass feedback.
- As a learner, I want my tutor and Wise to stay aligned.

## 7. Tutor Dashboard Requirements

Tutor dashboard should show:

- Student list
- Last activity
- Current level
- Homework status
- Weak spots
- Vocabulary due
- Recent Wise sessions
- Suggested next lesson

## 8. TutorStudentRoom Requirements

Room should show:

- Student profile summary
- Tutor notes
- Recent lesson recaps
- Assigned work
- Completed work
- Vocabulary bank
- Progress report
- Wise recommendations

## 9. Assignment Requirements

Assignment fields:

- id
- room_id
- tutor_id
- student_id
- title
- assignment_type
- instructions
- lesson_id nullable
- due_date nullable
- status
- created_at
- completed_at nullable

Statuses:

- draft
- assigned
- in_progress
- submitted
- reviewed
- archived

## 10. Tutor Review Requirements

Tutors should be able to:

- Review AI corrections
- Add comments
- Override scores/corrections
- Mark assignment reviewed
- Add notes to learner profile
- Request Wise-generated follow-up

## 11. Tutor Notes

Tutor notes can be:

- Private to tutor
- Shared with learner
- Available to Wise

Tutor should control visibility.

## 12. Wise Behavior in Tutor Mode

Wise should know when a learner has a tutor.

Example greeting:

> “Gianpaolo assigned a verb practice lesson for you. It focuses on prendere, mettere, and direct object pronouns. Ready to start?”

Wise should not contradict tutor instructions. If conflict exists, Wise should prioritize explicit tutor assignment while allowing learner questions.

## 13. Data Model Additions

### TutorStudentRoom

- id
- tutor_id
- student_id
- room_name
- status
- created_at
- updated_at

### Assignment

- id
- room_id
- tutor_id
- student_id
- title
- assignment_type
- instructions
- lesson_id
- due_date
- status
- created_at
- completed_at

### TutorNote

- id
- room_id
- tutor_id
- student_id
- content
- visibility
- available_to_wise
- created_at
- updated_at

## 14. API Requirements

### GET /api/tutor/students

Returns tutor’s students.

### GET /api/tutor/rooms/:roomId

Returns room data.

### POST /api/tutor/rooms

Creates room.

### POST /api/tutor/assignments

Creates assignment.

### PATCH /api/tutor/assignments/:assignmentId

Updates assignment.

### POST /api/tutor/assignments/:assignmentId/review

Adds tutor review.

### POST /api/tutor/notes

Creates tutor note.

## 15. Events Emitted

- TutorRoomCreated
- AssignmentCreated
- AssignmentStarted
- AssignmentSubmitted
- AssignmentReviewed
- TutorNoteCreated
- TutorOverrideApplied

## 16. Permissions

- Tutor can view assigned student room data.
- Learner can view their own assignments and shared tutor notes.
- Tutor private notes are not visible to learner.
- Wise can use tutor notes only if available_to_wise is true.

## 17. UI Requirements

### Tutor Dashboard

- Student list
- Status cards
- Alerts
- Create assignment button

### Room Page

- Student profile
- Progress summary
- Assignments
- Tutor notes
- Vocabulary
- Wise recommendation

### Assignment Builder

- Assignment type
- Instructions
- Generate with Wise
- Edit generated content
- Due date
- Assign button

## 18. Non-Goals

Initial Tutor Mode does not require:

- Public tutor marketplace
- Payments
- Scheduling/calendar
- Multi-teacher organizations
- School LMS integration
- Live video calls

## 19. Acceptance Criteria

Tutor Mode is acceptable when:

- Tutor can create a room with a student.
- Tutor can view student progress summary.
- Tutor can assign a lesson or drill.
- Student can complete assigned work.
- Wise recognizes tutor-assigned work.
- Tutor can review completed assignment.
- Tutor notes can be created with visibility controls.


## Agent Build Rules

- Treat the Master PRD and Technical Architecture/Data Contracts PRD as source-of-truth documents.
- Do not rename canonical entities such as User, LearnerProfile, CurriculumSkill, UserSkillProgress, VocabularyItem, Lesson, LessonTask, Session, UserResponse, Correction, MemoryNote, MediaItem, or UserEvent.
- Do not store prompts inside UI components.
- All AI outputs that affect product state must be schema-validated before persistence.
- Voice-first does not mean voice-only. Every flow must have a text fallback.
- Italian is the first target language and English is the first native language, but data structures should not block future language expansion.
- Emit the required events when core user actions occur.
- Keep module ownership clean. Do not duplicate logic that belongs to another module.
