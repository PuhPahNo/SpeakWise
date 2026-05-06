# Speakwise PRD Package Index and Agent Handoff

## Purpose

This folder contains the remaining module PRDs for Speakwise. These documents are designed so multiple AI coding agents can build different parts of the product without creating conflicting architecture, duplicate schemas, or inconsistent product behavior.

These module PRDs assume two source-of-truth documents already exist:

1. **Speakwise Master PRD v1**
2. **Speakwise Technical Architecture and Data Contracts PRD v1**

Agents must read those two documents before implementing any module in this package.

## Product Summary

Speakwise is a voice-first, gamified AI language-learning platform for adults learning Italian. The core experience is powered by **Wise**, a personal AI tutor that remembers the learner, adapts to their goals and interests, guides them through a structured curriculum, and turns language learning into personalized interactive sessions.

Initial launch scope:

- Native language: English
- Target language: Italian
- Primary audience: self-led adult learners
- Interface: voice-first with full text fallback
- AI tutor name: Wise
- Tone: premium but playful
- Learning model: structured curriculum spine plus dynamic interest-based personalization

## Included Module PRDs

1. `01_Wise_AI_Tutor_PRD.md`
2. `02_Voice_First_Onboarding_PRD.md`
3. `03_Learner_Memory_and_Profile_PRD.md`
4. `04_Curriculum_and_Skill_Graph_PRD.md`
5. `05_Lesson_and_Mission_Engine_PRD.md`
6. `06_Voice_and_Chat_Interface_PRD.md`
7. `07_Practice_Modes_PRD.md`
8. `08_Correction_and_Feedback_Engine_PRD.md`
9. `09_Gamification_and_Retention_PRD.md`
10. `10_Media_and_Clip_Based_Learning_PRD.md`
11. `11_Progress_Analytics_and_Reports_PRD.md`
12. `12_Tutor_Mode_PRD.md`
13. `13_Admin_and_Prompt_Ops_PRD.md`

## Recommended Build Dependency Order

### Foundation

1. Technical Architecture/Data Contracts
2. Wise AI Tutor service boundaries
3. Learner Memory + Profile
4. Curriculum + Skill Graph

### Core Learning Experience

5. Voice-First Onboarding
6. Voice + Chat Interface
7. Lesson / Mission Engine
8. Practice Modes
9. Correction + Feedback Engine

### Retention and Expansion

10. Gamification + Retention
11. Progress Analytics + Reports
12. Media / Clip-Based Learning
13. Admin / Prompt Ops
14. Tutor Mode

## Agent Assignment Model

Each agent should be assigned exactly one module PRD at a time. Agents may read other PRDs as dependencies but should not implement outside their assigned module unless explicitly instructed.

Every implementation plan should identify:

- Files to create or modify
- Data entities used
- APIs consumed
- APIs exposed
- Events emitted
- Events consumed
- Prompt templates required
- Test cases required
- Acceptance criteria mapping

## Critical Integration Principle

Speakwise is not a set of disconnected AI features. It is a memory-centric learning system. Every meaningful lesson, response, correction, and session should strengthen the learner profile, curriculum progress, vocabulary state, memory notes, and future recommendations.


## Agent Build Rules

- Treat the Master PRD and Technical Architecture/Data Contracts PRD as source-of-truth documents.
- Do not rename canonical entities such as User, LearnerProfile, CurriculumSkill, UserSkillProgress, VocabularyItem, Lesson, LessonTask, Session, UserResponse, Correction, MemoryNote, MediaItem, or UserEvent.
- Do not store prompts inside UI components.
- All AI outputs that affect product state must be schema-validated before persistence.
- Voice-first does not mean voice-only. Every flow must have a text fallback.
- Italian is the first target language and English is the first native language, but data structures should not block future language expansion.
- Emit the required events when core user actions occur.
- Keep module ownership clean. Do not duplicate logic that belongs to another module.
