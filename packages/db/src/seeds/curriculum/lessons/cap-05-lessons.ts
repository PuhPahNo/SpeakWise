// Additional lesson templates for Capitolo 5 — Caffè e cappuccino.
//
// These EXTEND the templates authored inline in units/cap-05-*.ts (the index
// merges both). This file is the EXEMPLAR for the lesson-expansion pass: each
// chapter gets a richer menu of curated lesson designs — per-skill drills, an
// error clinic built on the chapter's common mistakes, scenario roleplays in
// different settings, listening/speaking challenges, review, and a checkpoint.
//
// Rules mirror SPEC.md: original content; every in-string apostrophe is the
// curly ' (U+2019); slugs are globally unique and must not collide with the
// inline template slugs; objectives reference real skill slugs from this or an
// earlier chapter.

import { CEFRLevel, LessonType, TaskType } from '@prisma/client';
import type { SeedLessonTemplate } from '../types';

export const unitCode = 'cap-05';

const lessons: SeedLessonTemplate[] = [
  {
    slug: 'cap05-drill-articulated-prepositions',
    title: 'al, del, nel — the contraction drill',
    lessonType: LessonType.grammar,
    level: CEFRLevel.lower_intermediate,
    summary:
      'Lock in preposition + article contractions and the partitive "some" with fast, focused reps — ' +
      'al bar, del caffè, nella tazza.',
    objectiveSkillSlugs: ['it-articulated-prepositions'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['food', 'travel', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The contraction grid',
        prompt: 'a + il = al, di + il = del, in + la = nella. Same logic every time.',
        notes: 'Keep it visual; tie to the bar (al bar, del cornetto).',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Form the contraction',
        prompt: 'Complete: Prendo un caffè ___ (a + il) bar.',
        exampleAnswer: 'al',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Partitive "some"',
        prompt: 'Complete: Vorrei ___ (di + il) pane e ___ (di + la) marmellata.',
        exampleAnswer: 'del pane e della marmellata',
        notes: 'Surface the partitive meaning ("some").',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce a contraction in context',
        prompt: 'Translate: The sugar is on the table.',
        exampleAnswer: 'Lo zucchero è sul tavolo.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The rule in one line',
        prompt: 'How do you turn "in + la" into one word?',
      },
    ],
  },
  {
    slug: 'cap05-pp-avere-irregular-participles',
    title: 'fatto, detto, preso — the irregular past',
    lessonType: LessonType.grammar,
    level: CEFRLevel.lower_intermediate,
    summary:
      'The high-frequency irregular past participles that break the -ato/-uto/-ito pattern, drilled in ' +
      'real sentences about yesterday.',
    objectiveSkillSlugs: ['it-passato-prossimo-avere'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['food', 'travel', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Why these matter',
        prompt:
          'The most common verbs have irregular participles — learn these and most of your past tense works.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Pick the participle',
        prompt: 'Ho ___ (fare) un caffè. — fatto / facuto / fato?',
        exampleAnswer: 'fatto',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Produce from memory',
        prompt: 'Complete: Ieri ho ___ (prendere) il treno e ho ___ (vedere) Maria.',
        exampleAnswer: 'preso, visto',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Use it about your day',
        prompt: 'Say two things you did yesterday using avere + a participle.',
        notes: 'Personalize to the learner; reward any correct irregular participle.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Self-check',
        prompt: 'Which participle still feels shaky?',
      },
    ],
  },
  {
    slug: 'cap05-pp-essere-agreement',
    title: 'sono andato / sono andata — making the past agree',
    lessonType: LessonType.grammar,
    level: CEFRLevel.lower_intermediate,
    summary:
      'When essere is the auxiliary, the participle agrees with the subject. Drill the agreement until it ' +
      'is automatic — è partita, siamo arrivati.',
    objectiveSkillSlugs: ['it-passato-prossimo-essere'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['travel', 'family', 'food'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Agreement with essere',
        prompt: 'With essere, the ending changes with the subject: andato, andata, andati, andate.',
      },
      {
        taskType: TaskType.tense_selection,
        focus: 'avere or essere?',
        prompt: 'Ho mangiato vs sono andato — which verbs take essere?',
        notes: 'Reinforce the motion/change-of-state set.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Agree the participle',
        prompt: 'Complete (speaker is female): Sono ___ (partire) alle otto.',
        exampleAnswer: 'partita',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Catch the missing agreement',
        prompt: 'Fix: Maria è andato a Napoli.',
        exampleAnswer: 'Maria è andata a Napoli.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The essere tell',
        prompt: 'How do you know to change the ending?',
      },
    ],
  },
  {
    slug: 'cap05-clinic-past-tense-mistakes',
    title: 'Past-tense clinic: the four classic slips',
    lessonType: LessonType.grammar,
    level: CEFRLevel.lower_intermediate,
    summary:
      'A targeted error-correction clinic on the mistakes everyone makes with the passato prossimo: wrong ' +
      'auxiliary, missing agreement, wrong participle, and avere-for-essere verbs.',
    objectiveSkillSlugs: ['it-passato-prossimo-avere', 'it-passato-prossimo-essere'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['food', 'travel', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Frame it as a clinic',
        prompt:
          'I will show you sentences with the usual slip-ups. You fix them. This is how the past tense sticks.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Wrong auxiliary',
        prompt: 'Fix: Ho andato al bar.',
        exampleAnswer: 'Sono andato al bar.',
        notes: 'Probes the avere-vs-essere common mistake.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Missing agreement',
        prompt: 'Fix (about two women): Sono arrivato tardi.',
        exampleAnswer: 'Sono arrivate tardi.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Wrong participle',
        prompt: 'Fix: Ho prenduto un cappuccino.',
        exampleAnswer: 'Ho preso un cappuccino.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Apply it clean',
        prompt: 'Tell me where you went and what you had this morning — no slips.',
      },
    ],
  },
  {
    slug: 'cap05-roleplay-aperitivo',
    title: 'Aperitivo with friends',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.lower_intermediate,
    summary:
      'It is 7pm. Order an aperitivo and a snack, ask what the others are having, and recount your day in ' +
      'the past tense — the full bar scene, after dark.',
    objectiveSkillSlugs: [
      'it-vocab-bar-drinks',
      'it-passato-prossimo-avere',
      'it-articulated-prepositions',
    ],
    defaultDurationMinutes: 11,
    compatibleThemes: ['food', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt: 'You meet friends for an aperitivo. Let us order and chat.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Order an aperitivo + snack',
        prompt: 'Order a spritz and something to nibble.',
        exampleAnswer: 'Vorrei uno spritz e delle olive, per favore.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Ask the table',
        prompt: 'Ask a friend what they are drinking.',
        exampleAnswer: 'Tu cosa prendi?',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Recount your day',
        prompt: 'Tell the table one thing you did today (past tense).',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Notice the blend',
        prompt: 'You ordered AND told a story — how did it feel?',
      },
    ],
  },
  {
    slug: 'cap05-listening-at-the-counter',
    title: 'Listening gym: catch the order',
    lessonType: LessonType.listening_challenge,
    level: CEFRLevel.lower_intermediate,
    summary:
      'Three short, natural exchanges at the bar counter. Train your ear to catch the order, the price, and ' +
      'whether it is per qui or da portare via.',
    objectiveSkillSlugs: ['it-vocab-bar-drinks', 'it-vocab-numbers-1-100'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['food', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Ear training',
        prompt: 'Listen for three things: the drink, the price, here-or-to-go.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Catch the order + price',
        prompt: 'What did the customer order and how much was it?',
        notes:
          'Script: barista + customer; include a price like "due e cinquanta". Engine fills the script.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Here or to go',
        prompt: 'Did the customer want it per qui or da portare via?',
        exampleAnswer: 'per qui',
      },
      {
        taskType: TaskType.recap,
        focus: 'Listening anchor',
        prompt: 'Which word told you the price was coming?',
      },
    ],
  },
  {
    slug: 'cap05-checkpoint',
    title: 'Chapter checkpoint: the bar, the past',
    lessonType: LessonType.progress_check,
    level: CEFRLevel.lower_intermediate,
    summary:
      'A quick mixed check across the chapter: contractions, both past auxiliaries, and conoscere vs sapere — ' +
      'see what is solid and what needs another pass.',
    objectiveSkillSlugs: [
      'it-articulated-prepositions',
      'it-passato-prossimo-avere',
      'it-passato-prossimo-essere',
      'it-conoscere-sapere',
    ],
    defaultDurationMinutes: 10,
    compatibleThemes: ['food', 'travel', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Low-stakes check',
        prompt: 'A few quick questions to see where you are. No pressure.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Contraction',
        prompt: 'Vado ___ (a + il) bar.',
        exampleAnswer: 'al',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'conoscere vs sapere',
        prompt: 'Choose: "___ Roma" (I know the city).',
        exampleAnswer: 'Conosco',
      },
      {
        taskType: TaskType.translation,
        focus: 'Mixed past',
        prompt: 'Translate: We went out and had a coffee.',
        exampleAnswer: 'Siamo usciti e abbiamo preso un caffè.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assess',
        prompt: 'Which of the four topics do you want to revisit?',
      },
    ],
  },
];

export default { unitCode, lessons };
