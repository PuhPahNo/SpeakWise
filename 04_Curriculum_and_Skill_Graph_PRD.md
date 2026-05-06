# Curriculum and Skill Graph PRD

## 1. Module Purpose

The Curriculum and Skill Graph module defines the structured learning backbone underneath Speakwise.

Speakwise should feel dynamic and personalized on the surface, but it must teach Italian in a coherent order. The curriculum graph ensures Wise knows what the learner should study, what prerequisites matter, what skills have been introduced, and which skills should come next.

## 2. Product Goals

- Prevent Speakwise from becoming a random AI lesson generator.
- Provide a structured Italian curriculum for English-speaking learners.
- Support skill prerequisites and progression.
- Allow personalization without sacrificing pedagogy.
- Provide target skills to the Lesson/Mission Engine.
- Provide mastery targets to the Progress module.

## 3. Curriculum Philosophy

Speakwise uses a hybrid model:

- **Structured curriculum spine:** defines the correct progression of Italian skills.
- **Dynamic personalization layer:** changes examples, scenarios, vocabulary, media, and practice style based on user interests and goals.

Example:

Same skill: direct object pronouns.

- Food learner: “I ordered the pasta. I ate it.”
- Politics learner: “I watched the debate. I understood it.”
- Travel learner: “I lost the ticket. I found it.”

## 4. User Stories

- As a learner, I want lessons to feel personalized but still progress logically.
- As a learner, I want Wise to know what I should learn next.
- As a learner, I want to freestyle without losing the curriculum thread.
- As Wise, I need to know prerequisites before introducing advanced topics.
- As the platform owner, I need a clear skill graph that can be expanded over time.

## 5. Core Entity: CurriculumSkill

Canonical skill fields:

- id
- language
- name
- slug
- category
- level
- description
- prerequisites
- examples
- is_active

Skill categories:

- pronunciation
- vocabulary
- grammar
- speaking
- listening
- reading
- writing
- culture
- fluency

Levels:

- complete_beginner
- beginner
- lower_intermediate
- intermediate
- upper_intermediate
- advanced

## 6. Initial Italian Curriculum Outline

### Complete Beginner

- Italian alphabet and sounds
- Basic pronunciation rules
- Greetings and introductions
- Polite phrases
- Masculine and feminine nouns
- Singular and plural nouns
- Definite articles
- Indefinite articles
- Subject pronouns
- Present tense essere
- Present tense avere
- Present tense fare
- Basic sentence structure
- Numbers
- Days and time basics

### Beginner

- Regular -are verbs
- Regular -ere verbs
- Regular -ire verbs
- Common irregular verbs
- Adjective agreement
- Negation with non
- Basic questions
- Common prepositions
- Possessives
- Modal verbs: potere, volere, dovere
- Food and restaurant basics
- Travel survival phrases
- Present tense conversation

### Lower Intermediate

- Passato prossimo with avere
- Passato prossimo with essere
- Past participle agreement basics
- Direct object pronouns: lo, la, li, le
- Indirect object pronouns
- Partitive ne
- Ci for place/reference
- Reflexive verbs
- Imperfetto introduction
- Passato prossimo vs imperfetto
- Future tense
- Comparative forms
- Listening for gist
- Basic roleplay fluency

### Intermediate

- Conditional tense
- Imperative
- Combined pronouns
- Gerundio
- Relative pronouns
- More nuanced prepositions
- Subjunctive introduction
- Opinion expressions
- Storytelling in past tenses
- Natural conversation repair phrases
- Idiomatic expressions
- Register: formal vs informal

### Upper Intermediate

- Subjunctive present and past
- Hypothetical constructions
- Advanced connectors
- Passive voice
- Reported speech
- Regional variation awareness
- Debate and opinion fluency
- Media comprehension
- Nuanced tone correction

### Advanced

- Advanced idioms
- Literary and journalistic style
- Dialect and regional exposure
- High-register discussion
- Persuasive speaking
- Cultural nuance
- Humor and sarcasm
- Natural speed listening
- Accent and pronunciation refinement

## 7. Skill Graph Requirements

Each skill should define:

- Name
- Description
- Level
- Category
- Prerequisites
- Suggested next skills
- Example use cases
- Common mistakes
- Recommended practice types
- Compatible interest themes

### Example Skill Object

```json
{
  "name": "Direct object pronouns",
  "slug": "direct-object-pronouns",
  "category": "grammar",
  "level": "lower_intermediate",
  "description": "Use lo, la, li, and le to replace direct objects.",
  "prerequisites": ["present-tense-avere", "basic-object-sentences"],
  "examples": [
    { "target": "Vedo la pasta. La vedo.", "native": "I see the pasta. I see it." }
  ],
  "commonMistakes": ["wrong pronoun gender", "pronoun placement"],
  "recommendedPracticeTypes": ["pronoun_replacement", "translation", "speaking_prompt"]
}
```

## 8. UserSkillProgress Relationship

The curriculum module owns canonical skills. The Progress module owns user-specific progress.

Curriculum should provide:

- Skill metadata
- Prerequisites
- Suggested next skills
- Practice recommendations

Progress should provide:

- Status
- Mastery score
- Review timing
- Evidence from responses

## 9. Recommendation Logic Support

Curriculum should expose functions/services for:

- Get next recommended skills
- Get prerequisite gaps
- Get review skills
- Get compatible skills for user request
- Get skill details for Wise explanation
- Get skill examples personalized by interest theme

### Example

User asks:

> “Teach me how to talk about politics in Italian.”

Curriculum service should help Wise determine:

- User level
- Known skills
- Needed political vocabulary
- Grammar appropriate for level
- Whether opinion phrases are suitable
- Whether subjunctive is too advanced

## 10. Personalization Layer

Curriculum should not hard-code every possible interest example, but it should define skill objectives and allow the Lesson Engine to generate themed content.

Interest themes:

- food
- travel
- politics
- history
- art
- music
- film
- sports
- business
- family
- culture
- news

## 11. API Requirements

### GET /api/curriculum/skills

Returns active skills by language, level, category, or search.

### GET /api/curriculum/skills/:skillId

Returns skill details.

### GET /api/curriculum/next

Returns next recommended skills for a user.

### GET /api/curriculum/prerequisites/:skillId

Returns prerequisite chain.

### POST /api/curriculum/admin/skills

Admin creates skill.

### PATCH /api/curriculum/admin/skills/:skillId

Admin updates skill.

## 12. Seed Data Requirements

Initial implementation should seed enough Italian skills to support:

- Onboarding first lesson
- Food/travel beginner path
- Basic grammar path
- Review and progress dashboard
- First several sessions of beginner learning

Minimum recommended seed:

- 50-75 CurriculumSkill records
- Core prerequisite links
- Examples for each skill
- Common mistakes for key grammar topics
- Recommended practice types

## 13. Admin Requirements

Admin should eventually be able to:

- Create/edit skills
- Activate/deactivate skills
- Manage prerequisites
- Add examples
- Add common mistakes
- Tag compatible lesson types
- Review AI-generated curriculum suggestions

## 14. Events Emitted

- CurriculumSkillCreated
- CurriculumSkillUpdated
- CurriculumPathRequested
- PrerequisiteGapDetected

## 15. Edge Cases

### User Freestyles Into Advanced Topic

Wise should allow exploration but simplify appropriately.

Example:

> “That topic usually uses the subjunctive, but we can practice a beginner version with opinion phrases first.”

### User Skips Prerequisites

Wise should mention missing prerequisites and weave in light review.

### Skill Has Multiple Prerequisites

Recommendation should identify most important missing prerequisite.

### Skill Progress Conflicts With User Self-Assessment

Use evidence-based progress but let user request harder/easier material.

## 16. Non-Goals

This module does not own:

- User-specific mastery calculation
- Lesson generation
- Correction grading
- Vocabulary scheduling
- UI lesson player
- Gamification rewards

## 17. Acceptance Criteria

This module is acceptable when:

- CurriculumSkill records exist for initial Italian path.
- Skills have levels, categories, and prerequisites.
- Wise can request next recommended skills.
- Lesson Engine can request skill metadata.
- Progress module can attach user mastery to skills.
- Admin can seed or update curriculum data.
- User freestyle requests can be mapped to appropriate skills.


## Agent Build Rules

- Treat the Master PRD and Technical Architecture/Data Contracts PRD as source-of-truth documents.
- Do not rename canonical entities such as User, LearnerProfile, CurriculumSkill, UserSkillProgress, VocabularyItem, Lesson, LessonTask, Session, UserResponse, Correction, MemoryNote, MediaItem, or UserEvent.
- Do not store prompts inside UI components.
- All AI outputs that affect product state must be schema-validated before persistence.
- Voice-first does not mean voice-only. Every flow must have a text fallback.
- Italian is the first target language and English is the first native language, but data structures should not block future language expansion.
- Emit the required events when core user actions occur.
- Keep module ownership clean. Do not duplicate logic that belongs to another module.
