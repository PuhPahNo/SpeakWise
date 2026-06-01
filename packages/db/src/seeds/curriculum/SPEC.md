# Curriculum authoring spec (Prego!-aligned Italian course)

This is the contract every unit file under `units/` follows. The curriculum is
the canonical spine the AI lesson engine generates personalized lessons from, so
density and accuracy matter. Read the two exemplars before authoring:

- `units/cap-00-preliminare.ts`
- `units/cap-01-una-citta-italiana.ts`

## Hard rules

1. **Original content only.** The Prego! textbook defines the chapter SEQUENCE,
   SCOPE, and theme. Never copy its sentences, exercises, or wording. Write
   fresh explanations and examples. This is a copyright requirement.
2. **Shape:** each file `import { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client'`
   and `import type { SeedUnit } from '../types'`, then `const unit: SeedUnit = {…}; export default unit;`.
   Match the exemplar exactly. It must `tsc` clean.
   **APOSTROPHES & QUOTES (critical — this is the #1 source of broken files):**
   - All string values are delimited by straight single quotes `'…'`.
   - Inside a string, write EVERY apostrophe as the Unicode curly apostrophe `’`
     (U+2019), never a straight `'`. This covers Italian elisions/truncations
     (l’amico, d’inverno, un’amica, dov’è, com’è, po’) AND English contractions
     (don’t, it’s, you’re). A straight `'` inside a string ends it early and
     breaks the file.
   - Never use a curly `’` as a string delimiter — delimiters are always straight.
   - Do not nest straight single quotes inside a string; use curly ‘ ’ or " " for
     inner quotes.
3. **Use only valid enum members** (see lists below). No invented task/lesson types.
4. **Slugs are globally unique.**
   - Skill slugs: use the EXACT canonical slug assigned to your chapter in the
     registry below. Do not rename or invent grammar slugs — prerequisites
     across chapters depend on them.
   - Lesson-template slugs: `capNN-<kebab>` (e.g. `cap05-order-a-coffee`).
   - Vocabulary slugs: `capNN-<kebab>` (e.g. `cap05-il-caffe`).
5. **Prerequisites** may reference your own chapter's skills or any skill in an
   EARLIER chapter (lower number). Use the canonical registry for earlier slugs.
   Never forward-reference a later chapter. Keep prereq lists short (0–3) and real.
6. **Preserve assigned legacy slugs** verbatim — they are referenced elsewhere
   in the codebase.

## Quality bar (per skill)

- `description`: 1–3 sentences, learner-facing, concrete.
- `examples`: 2–5 original `{ target, native, note? }`. Italian must be correct
  and idiomatic. Use `note` for a teaching aside.
- `commonMistakes`: 2–4 real errors English speakers make.
- `recommendedPracticeTypes`: 2–4 TaskType values that actually drill it.
- `compatibleThemes`: from the interest-theme list, the ones this skill themes
  into naturally.
- `teachingNotes`: 1–3 sentences of generation guidance for Wise (never shown
  raw to the learner).

## Quality bar (per unit)

- 5–11 skills (grammar + vocabulary + the occasional culture/listening/speaking
  skill), ordered as they should be taught.
- 3–5 `lessonTemplates`: varied `lessonType`, each a 4–6 task arc
  (`taskBlueprint` of `{ taskType, focus, prompt, exampleAnswer?, notes? }`).
  The first task is usually a `briefing` or `explanation`; the last a `recap` or
  `reflection`. `notes` should tell the engine how to personalize to interests.
- 18–28 `vocabulary` items covering the chapter's themes, each with `gender` for
  nouns and a `theme` sub-tag. Add `exampleSentence`/`exampleTranslation` on the
  higher-value items.
- 2–3 `culturalNotes` `{ title, body }` — accurate, specific, original.
- 3–7 `canDo` statements (CEFR "I can…" outcomes, phrased without "I can").

## Enums

- **SkillCategory:** pronunciation, vocabulary, grammar, speaking, listening,
  reading, writing, culture, fluency
- **CEFRLevel:** complete_beginner, beginner, lower_intermediate, intermediate,
  upper_intermediate, advanced
- **LessonType:** daily_mission, recovery, freestyle, grammar, vocabulary_review,
  speaking_challenge, listening_challenge, media, scenario_roleplay,
  progress_check, placement
- **TaskType:** briefing, explanation, multiple_choice, fill_blank, translation,
  conjugation, pronoun_replacement, tense_selection, error_correction,
  speaking_prompt, listening_comprehension, roleplay, recap, media_clip,
  reflection

## Interest themes (for compatibleThemes)

food, travel, politics, history, art, music, film, sports, business, family,
culture, news

## Canonical skill-slug registry

Each chapter's main grammar/skill slugs. Use these EXACT slugs. You may add a
small number of extra vocabulary/culture skills with sensible `it-…` slugs if a
theme needs it, but the grammar slugs below are fixed.

- **cap-00** (done): it-vocab-greetings, it-culture-formal-vs-informal, it-classroom-expressions, it-alphabet, it-pronunciation-vowels, it-pronunciation-c-g, it-pronunciation-digraphs, it-pronunciation-double-consonants, it-pronunciation-stress, it-vocab-numbers-1-100, it-calendar-days-months, it-speaking-self-intro
- **cap-01** (done): it-noun-gender, it-noun-plurals, it-indefinite-articles, it-buono-adjective, it-subject-pronouns, it-avere-present, it-avere-idioms, it-vocab-city-places, it-vocab-transport, it-vocab-directions, it-simple-prepositions
- **cap-02** Come siamo — describing people | theme family/culture | complete_beginner→beginner
  - it-adjectives-agreement, it-essere-present *(legacy)*, it-definite-articles *(legacy)*, it-bello-adjective, it-noun-plurals-special, it-vocab-descriptions, it-vocab-nationalities, it-vocab-colors, it-listening-everyday *(legacy)*
- **cap-03** Studiare in Italia — family & university | theme family | beginner
  - it-regular-are-verbs-present *(legacy)*, it-dare-stare-andare-fare, it-possessive-adjectives, it-possessives-family, it-questo-quello, it-vocab-family, it-vocab-university
- **cap-04** Sport e passatempi | theme sports | beginner→lower_intermediate
  - it-regular-ere-verbs-present *(legacy)*, it-regular-ire-verbs-present *(legacy)*, it-modal-verbs, it-dire-uscire-venire, it-direct-object-pronouns *(legacy)*, it-telling-time, it-vocab-sports-hobbies, it-vocab-weather-seasons
- **cap-05** Caffè e cappuccino | theme food | lower_intermediate
  - it-articulated-prepositions, it-passato-prossimo-avere *(legacy)*, it-passato-prossimo-essere *(legacy)*, it-conoscere-sapere, it-vocab-bar-drinks, it-vocab-breakfast
- **cap-06** Buon appetito! | theme food | lower_intermediate
  - it-indirect-object-pronouns *(legacy)*, it-passato-prossimo-pp-agreement *(legacy)*, it-piacere, it-interrogatives, it-vocab-food-restaurant *(legacy)*, it-vocab-meals-table
- **cap-07** La vita di tutti i giorni — daily life & clothing | theme family/culture | lower_intermediate
  - it-reflexive-verbs, it-reciprocal-construction, it-adverbs, it-numbers-above-100, it-vocab-daily-routine, it-vocab-clothing
- **cap-08** Cinema, stampa e TV | theme film | lower_intermediate→intermediate
  - it-imperfetto *(legacy)*, it-imperfetto-vs-passato-prossimo, it-trapassato, it-suffixes, it-vocab-media, it-vocab-cinema-tv
- **cap-09** Sentirsi bene — health & body | theme culture | intermediate
  - it-stressed-pronouns, it-comparatives, it-superlatives, it-irregular-comparatives, it-vocab-body, it-vocab-health
- **cap-10** Buon viaggio! — travel & holidays | theme travel | intermediate
  - it-future-simple, it-future-special-uses, it-impersonal-si, it-feminine-noun-formation, it-vocab-vacation, it-vocab-holidays
- **cap-11** Spesa e spese — shopping | theme food/business | intermediate
  - it-ne, it-ci, it-double-pronouns, it-imperativo-informal, it-vocab-shops, it-vocab-groceries
- **cap-12** Cercare casa — home | theme family/culture | intermediate→upper_intermediate
  - it-indefinite-adjectives, it-indefinite-pronouns, it-negatives, it-imperativo-formal, it-vocab-home, it-vocab-furniture
- **cap-13** La difesa dell'ambiente | theme news/culture | upper_intermediate
  - it-conditional-present, it-modals-conditional, it-conditional-past, it-possessive-pronouns, it-vocab-environment, it-vocab-traffic
- **cap-14** La musica e il teatro | theme music | upper_intermediate
  - it-relative-pronouns, it-chi-relative, it-infinitive-constructions, it-nouns-adjectives-in-a, it-vocab-music, it-vocab-theater
- **cap-15** Le belle arti — fine arts & literature | theme art/history | upper_intermediate→advanced
  - it-passato-remoto, it-ordinal-numbers, it-volerci-metterci, it-gerund, it-vocab-art, it-vocab-artists
- **cap-16** Politica e società | theme politics | advanced
  - it-congiuntivo-presente, it-congiuntivo-triggers, it-congiuntivo-passato, it-vocab-politics, it-vocab-social-issues
- **cap-17** Il mondo del lavoro — work & internet | theme business | advanced
  - it-congiuntivo-conjunctions, it-congiuntivo-other-uses, it-congiuntivo-vs-infinito, it-vocab-work, it-vocab-computer-internet
- **cap-18** La società multiculturale | theme politics/news | advanced
  - it-congiuntivo-imperfetto, it-congiuntivo-trapassato, it-congiuntivo-sequence, it-vocab-multicultural, it-vocab-values
- **appendix** Advanced structures | theme culture | advanced (code `appendix`, order 19)
  - it-hypotheticals, it-passive-voice, it-causative-fare, it-future-perfect, it-lasciare-perception-verbs, it-article-uses
