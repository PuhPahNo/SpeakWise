// Additional lesson templates for Capitolo 7 — La vita di tutti i giorni.
//
// These EXTEND the five templates authored inline in units/cap-07-*.ts (the
// index merges both). Existing inline slugs are:
//   cap07-morning-routine, cap07-keeping-in-touch, cap07-speaking-fluently,
//   cap07-dressed-for-the-occasion, cap07-big-numbers
//
// Rules mirror SPEC.md: original content; every in-string apostrophe is the
// curly ' (U+2019); slugs are globally unique and must not collide with the
// five inline slugs above; objectives reference real skill slugs from this or
// an earlier chapter.

import { CEFRLevel, LessonType, TaskType } from '@prisma/client';
import type { SeedLessonTemplate } from '../types';

export const unitCode = 'cap-07';

const lessons: SeedLessonTemplate[] = [
  // ── 1. Reflexive present-tense drill ────────────────────────────────────
  {
    slug: 'cap07-drill-reflexive-present',
    title: 'Mi sveglio, ti svegli — the reflexive present',
    lessonType: LessonType.grammar,
    level: CEFRLevel.lower_intermediate,
    summary:
      'Fast-focus drill on reflexive pronoun placement in the present tense: before the conjugated verb, ' +
      'attached to a modal infinitive, and split across the sentence when a second verb follows.',
    objectiveSkillSlugs: ['it-reflexive-verbs'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['family', 'culture', 'sports'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Two positions for the pronoun',
        prompt:
          'Mi alzo alle sei. — pronoun before the verb. Voglio alzarmi presto. — pronoun attaches to the ' +
          'infinitive. Both positions are correct; only the sentence structure changes.',
        notes: 'Keep it to two crystal-clear examples. Do not yet introduce the passato prossimo.',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'Conjugate alzarsi in full',
        prompt: 'Give all six present-tense forms of alzarsi.',
        exampleAnswer: 'mi alzo, ti alzi, si alza, ci alziamo, vi alzate, si alzano',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Pronoun before the verb',
        prompt:
          'Complete each sentence: 1. Ogni mattina (io) ___ (svegliarsi) alle sette. ' +
          '2. (Voi) ___ (prepararsi) in fretta prima di uscire.',
        exampleAnswer: '1. mi sveglio  2. vi preparate',
      },
      {
        taskType: TaskType.pronoun_replacement,
        focus: 'Move the pronoun to the infinitive',
        prompt: 'Rewrite using a modal: "Ti lavi le mani." → "Devi ___."',
        exampleAnswer: 'Devi lavarti le mani.',
        notes: 'Shows the pronoun migration rule with an everyday verb.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Catch the misplaced pronoun',
        prompt: 'Fix the sentence: "Alzo mi alle sette ogni giorno."',
        exampleAnswer: 'Mi alzo alle sette ogni giorno.',
      },
      {
        taskType: TaskType.recap,
        focus: 'One rule in one sentence',
        prompt:
          'In your own words, where does the reflexive pronoun go in a normal present-tense sentence?',
      },
    ],
  },

  // ── 2. Reflexive passato prossimo + essere agreement drill ───────────────
  {
    slug: 'cap07-drill-reflexive-past',
    title: 'Mi sono alzato/a — reflexive past with essere',
    lessonType: LessonType.grammar,
    level: CEFRLevel.lower_intermediate,
    summary:
      'Reflexive verbs take essere in the passato prossimo and the participle must agree with the subject. ' +
      'Drill all four agreement endings through varied subjects until the pattern is automatic.',
    objectiveSkillSlugs: ['it-reflexive-verbs'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['family', 'culture', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'essere + agreement in the reflexive past',
        prompt:
          'Mi sono alzato. (m. sg.)  Mi sono alzata. (f. sg.)  Ci siamo alzati. (m./mixed pl.)  ' +
          'Ci siamo alzate. (f. pl.) — the participle ending matches the subject every time.',
        notes:
          'Display all four endings in a small table. Contrast with avere verbs to sharpen the distinction.',
      },
      {
        taskType: TaskType.tense_selection,
        focus: 'avere or essere for reflexives?',
        prompt: 'Marco si è ___ (lavare). — which auxiliary must you use, and why?',
        exampleAnswer:
          'essere: si è lavato. Reflexive verbs always take essere in the passato prossimo.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Agree the participle',
        prompt:
          'Complete with the correct form: ' +
          '1. (Mia sorella) Si ___ (vestirsi) in cinque minuti. ' +
          '2. (Io, m.) Mi ___ (addormentarsi) subito. ' +
          '3. (Noi donne) Ci ___ (svegliarsi) tardi.',
        exampleAnswer: '1. si è vestita  2. mi sono addormentato  3. ci siamo svegliate',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce the full past sentence',
        prompt: 'Translate: "They (two men) showered quickly and then got dressed."',
        exampleAnswer: 'Si sono fatti la doccia in fretta e poi si sono vestiti.',
        notes:
          'Plural masculine: fatti, vestiti. Checks compound sentence with two reflexive verbs.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Narrate this morning in the past',
        prompt:
          'Tell me three things you did this morning using reflexive verbs in the passato prossimo.',
        notes:
          'Pull from the learner’s real schedule. Wise should model the first verb, then let the learner continue.',
      },
    ],
  },

  // ── 3. Reciprocal construction drill ─────────────────────────────────────
  {
    slug: 'cap07-drill-reciprocal',
    title: 'Ci vediamo, vi conoscete — the reciprocal drill',
    lessonType: LessonType.grammar,
    level: CEFRLevel.lower_intermediate,
    summary:
      'Targeted practice on ci / vi / si used reciprocally: form sentences in the present and passato ' +
      'prossimo, distinguish reflexive from reciprocal by context, and use essere correctly in the past.',
    objectiveSkillSlugs: ['it-reciprocal-construction', 'it-reflexive-verbs'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['family', 'culture', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Reflexive vs reciprocal — the number clue',
        prompt:
          'Si lava = he/she washes himself/herself (reflexive, singular). ' +
          'Si lavano = they wash themselves OR each other (context decides). ' +
          'Use a clearly mutual verb (vedersi, abbracciarsi) to make the reciprocal meaning unambiguous.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Choose and conjugate',
        prompt:
          'Fill in the reciprocal pronoun + verb: ' +
          '1. Io e Giulia ___ (scriversi) ogni settimana. ' +
          '2. Voi due ___ (conoscersi) da molto tempo?',
        exampleAnswer: '1. ci scriviamo  2. vi conoscete',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce reciprocals in the past',
        prompt: '"We met each other at a wedding." / "They hugged each other at the airport."',
        exampleAnswer: 'Ci siamo conosciuti a un matrimonio. / Si sono abbracciati all’aeroporto.',
        notes: 'Both verbs take essere; participle agrees with subject.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Spot the correct past form',
        prompt:
          'Which sentence is correct? ' +
          'A) Ci abbiamo visti ieri.  B) Ci siamo visti ieri.  C) Ci siamo visto ieri.',
        exampleAnswer:
          'B — Ci siamo visti ieri. Reciprocal past needs essere; visti agrees with noi (masc./mixed).',
      },
      {
        taskType: TaskType.recap,
        focus: 'Why essere?',
        prompt: 'Explain in one sentence why reciprocal verbs take essere in the passato prossimo.',
      },
    ],
  },

  // ── 4. Adverb formation drill ─────────────────────────────────────────────
  {
    slug: 'cap07-drill-adverbs',
    title: '-mente: turning adjectives into adverbs',
    lessonType: LessonType.grammar,
    level: CEFRLevel.lower_intermediate,
    summary:
      'Systematic practice on the three -mente formation patterns plus the irregular short adverbs, ' +
      'with immediate application in complete sentences about daily life.',
    objectiveSkillSlugs: ['it-adverbs'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['family', 'culture', 'business', 'sports'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The three formation patterns',
        prompt:
          'Pattern A (most adjectives): feminine form + -mente — lento → lenta → lentamente. ' +
          'Pattern B (-le / -re endings): drop final -e, then + -mente — facile → facilmente. ' +
          'Pattern C (no -mente): bene, male, spesso, sempre, mai, già, ancora — memorise these.',
        notes: 'Three examples, one per pattern. A small cheat-sheet visual is ideal here.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Generate the adverb',
        prompt:
          'Form the adverb from each adjective: veloce, tranquillo, gentile, probabile, rapido.',
        exampleAnswer: 'velocemente, tranquillamente, gentilmente, probabilmente, rapidamente',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Spot the malformed adverb',
        prompt:
          'Three sentences — find and fix the adverb error in each: ' +
          '1. "Parla lentomente." ' +
          '2. "Arriva facilemente." ' +
          '3. "Canta sempre bello."',
        exampleAnswer:
          '1. lentamente (use feminine base: lenta + mente). ' +
          '2. facilmente (drop the -e before adding -mente). ' +
          '3. bene (bene is the adverb, not bello).',
      },
      {
        taskType: TaskType.translation,
        focus: 'Short adverbs in real sentences',
        prompt:
          '"She always gets up early." / "I have already had breakfast." / "They never go to bed before midnight."',
        exampleAnswer:
          'Si alza sempre presto. / Ho già fatto colazione. / Non vanno mai a letto prima di mezzanotte.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Pattern B in one line',
        prompt: 'Why do we say "regolarmente" and not "regolaramente"?',
      },
    ],
  },

  // ── 5. Big numbers and prices drill ─────────────────────────────────────
  {
    slug: 'cap07-drill-big-numbers',
    title: 'Cento, mille, un milione — number mechanics',
    lessonType: LessonType.grammar,
    level: CEFRLevel.lower_intermediate,
    summary:
      'Rapid-fire drills on Italian numbers above 100: the no-article rule for cento, the mille/mila ' +
      'singular/plural split, and the mandatory di after milione and miliardo.',
    objectiveSkillSlugs: ['it-numbers-above-100'],
    defaultDurationMinutes: 7,
    compatibleThemes: ['business', 'culture', 'history', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Three rules, three examples',
        prompt:
          'Rule 1 — cento takes no article: say "cento euro", never "un cento euro". ' +
          'Rule 2 — mille is singular, mila is plural: mille persone, duemila persone. ' +
          'Rule 3 — milione/miliardo require di before a noun: un milione di euro.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Complete the number phrase',
        prompt:
          'Fill in the blank: ' +
          '1. La borsa costa ___ (850) euro. ' +
          '2. La città ha ___ (3 000) abitanti. ' +
          '3. Hanno vinto ___ (1 000 000) di dollari.',
        exampleAnswer: '1. ottocentocinquanta  2. tremila  3. un milione',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'mille or mila?',
        prompt: 'Which is correct? "Ho percorso duemil___ chilometri."',
        exampleAnswer: 'duemila — mila is the plural form used in compounds of 2 000 and above.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Read numbers aloud',
        prompt: 'Say these numbers in Italian: 1 492, 2 024, 3 500 000.',
        exampleAnswer:
          'millequattrocentonovantadue; duemillaventiquattro; tre milioni e mezzo (tre milioni e cinquecentomila).',
        notes:
          'Accept natural variation. Wise should praise the learner for any correctly composed compound number.',
      },
      {
        taskType: TaskType.recap,
        focus: 'When does di appear?',
        prompt: 'After which number words must you insert di before the noun that follows?',
      },
    ],
  },

  // ── 6. Error-correction clinic ────────────────────────────────────────────
  {
    slug: 'cap07-clinic-reflexive-errors',
    title: 'Clinic: reflexive & reciprocal slip-ups',
    lessonType: LessonType.grammar,
    level: CEFRLevel.lower_intermediate,
    summary:
      'A focused error-correction session on the four most common reflexive and reciprocal mistakes: wrong ' +
      'auxiliary (avere instead of essere), missing participle agreement, misplaced pronoun, and avere-for-essere ' +
      'in reciprocal past sentences.',
    objectiveSkillSlugs: ['it-reflexive-verbs', 'it-reciprocal-construction'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['family', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Why a clinic?',
        prompt:
          'Even advanced learners trip on reflexive essere and agreement. ' +
          'In this session you’ll fix six real-world errors — the kind that appear in written Italian every day.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Wrong auxiliary (avere for essere)',
        prompt: 'Fix: "Stamattina ho alzato alle sette."',
        exampleAnswer: 'Stamattina mi sono alzato alle sette.',
        notes: 'Two errors: missing pronoun AND wrong auxiliary.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Missing participle agreement (feminine subject)',
        prompt: 'Fix: "Lucia si è vestito in fretta."',
        exampleAnswer: 'Lucia si è vestita in fretta.',
        notes: 'Lucia is feminine — vestito must become vestita.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Participle agreement — plural feminine',
        prompt: 'Fix: "Le mie sorelle si sono alzato presto."',
        exampleAnswer: 'Le mie sorelle si sono alzate presto.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Reciprocal past — wrong auxiliary',
        prompt: 'Fix: "Noi ci abbiamo scritti ogni giorno in vacanza."',
        exampleAnswer: 'Noi ci siamo scritti ogni giorno in vacanza.',
        notes: 'Reciprocal past requires essere, same as reflexive.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Apply it clean',
        prompt:
          'Tell me what time you woke up this morning and whether you saw or texted a friend today — no errors.',
        notes: 'Wise should gently correct any relapse into the patterns just practised.',
      },
    ],
  },

  // ── 7. Scenario roleplay — narrate your morning ───────────────────────────
  {
    slug: 'cap07-roleplay-morning-story',
    title: 'Una mattina tipica — live narration',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.lower_intermediate,
    summary:
      'Narrate a full Italian morning from alarm to front door: combine reflexive verbs in the passato ' +
      'prossimo, time expressions, adverbs, and routine vocabulary in one connected story.',
    objectiveSkillSlugs: ['it-reflexive-verbs', 'it-vocab-daily-routine', 'it-adverbs'],
    defaultDurationMinutes: 12,
    compatibleThemes: ['family', 'culture', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'Imagine it’s a Tuesday morning. You have to be somewhere by nine. ' +
          'Wise will ask you questions; you narrate your morning step by step.',
        notes:
          'Personalize to the learner’s context — student, commuter, remote worker. ' +
          'Use details from the learner’s profile if available.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'The alarm',
        prompt:
          'Wise asks: "A che ora ti sei svegliato/a stamattina?" — answer in a full sentence.',
        exampleAnswer: 'Mi sono svegliato/a alle sei e mezza.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Getting ready',
        prompt:
          'Describe what you did next: shower, breakfast, getting dressed — at least three reflexive verbs.',
        exampleAnswer:
          'Mi sono fatto/a la doccia, poi ho fatto colazione al bar. Poi mi sono vestito/a in fretta.',
        notes:
          'Accept any reasonable sequence. Prompt the learner to add an adverb (velocemente, tranquillamente).',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'A small complication',
        prompt:
          'Wise says: "E non hai trovato una cosa importante. Cosa è successo?" — invent a small morning crisis.',
        notes:
          'Encourage creativity. Any past tense verbs are welcome here, not only reflexive. ' +
          'The goal is connected speech.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Debrief',
        prompt: 'Which reflexive verb felt natural? Which one still needs practice?',
      },
    ],
  },

  // ── 8. Scenario roleplay — clothes shopping ───────────────────────────────
  {
    slug: 'cap07-roleplay-clothes-shopping',
    title: 'In un negozio di abbigliamento',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.lower_intermediate,
    summary:
      'Shop for clothes in an Italian boutique: ask for sizes, say what you’d like to try on, negotiate ' +
      'the price using numbers above 100, and decide whether to buy — all in natural Italian.',
    objectiveSkillSlugs: ['it-vocab-clothing', 'it-numbers-above-100', 'it-reflexive-verbs'],
    defaultDurationMinutes: 11,
    compatibleThemes: ['culture', 'business', 'travel', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'You’re in a boutique in central Milan. A shop assistant greets you: "Buongiorno, posso aiutarla?" ' +
          'Your goal: find something to buy, try it on, ask the price, and make a decision.',
        notes:
          'Adjust formality to the learner’s comfort level. Use Lei for authenticity in a boutique.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Ask about an item',
        prompt: 'Point to a jacket on the rail and ask if it’s available in your size.',
        exampleAnswer:
          'Scusi, questa giacca è disponibile anche nella mia taglia? Porto la quarantadue.',
        notes:
          'Introduce taglia (size) and portare as "to take a size" — cultural note: Italian numerical sizes.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Ask to try it on',
        prompt: 'The shop assistant says the jacket is available. Ask to try it on.',
        exampleAnswer: 'Posso provarla?',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'React and ask the price',
        prompt: 'The jacket fits. Express that you like it and ask how much it costs.',
        exampleAnswer: 'Mi piace molto! Quanto costa?',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Decide: buy or not',
        prompt:
          'The price is €320. Either buy it ("La prendo") or say it’s too expensive and suggest a lower price.',
        exampleAnswer: 'Trecentoventi? È un po’ caro. Ne ha uno simile a prezzo ridotto?',
        notes: 'Numbers above 100 in a real transactional context. Reinforce saying prices aloud.',
      },
    ],
  },

  // ── 9. Listening challenge — someone’s daily routine ─────────────────────
  {
    slug: 'cap07-listening-daily-routine',
    title: 'Listening: la giornata di Valentina',
    lessonType: LessonType.listening_challenge,
    level: CEFRLevel.lower_intermediate,
    summary:
      'Listen to Valentina describe her weekday from alarm to dinner — train your ear to catch reflexive ' +
      'verbs, time expressions, and adverbs used at natural speed.',
    objectiveSkillSlugs: ['it-vocab-daily-routine', 'it-reflexive-verbs', 'it-adverbs'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['family', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'What to listen for',
        prompt:
          'You’ll hear Valentina talk about a typical Wednesday. Focus on: (1) the time she does each activity, ' +
          '(2) any adverbs she uses, (3) the reflexive verbs.',
        notes:
          'Engine generates a 90-second monologue in natural Italian — morning routine, commute, lunch break, ' +
          'evening. Include at least svegliarsi, vestirsi, riposarsi, addormentarsi, plus sempre/spesso/già.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Global comprehension — the schedule',
        prompt: 'At what time does Valentina wake up, and what time does she usually go to bed?',
        notes: 'Engine should build the audio so the times are clearly stated.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Catch an adverb',
        prompt: 'Which adverb does Valentina use to describe how she eats lunch?',
        exampleAnswer: 'velocemente — she eats lunch quickly because she only has thirty minutes.',
        notes: 'Options should include velocemente, lentamente, tranquillamente.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Reconstruct a sentence',
        prompt:
          'Complete Valentina’s sentence with the reflexive verb you heard: ' +
          '"Di solito mi ___ alle undici di sera."',
        exampleAnswer: 'addormento',
      },
      {
        taskType: TaskType.recap,
        focus: 'Listening anchor word',
        prompt: 'Which Italian word or phrase first told you when her evening routine began?',
      },
    ],
  },

  // ── 10. Speaking challenge — describe your day and style ──────────────────
  {
    slug: 'cap07-speaking-describe-day-style',
    title: 'Speaking challenge: la tua giornata e il tuo stile',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.lower_intermediate,
    summary:
      'A sustained speaking workout: describe your typical day using reflexive verbs and adverbs, then ' +
      'talk about your personal style and what you’d wear to a specific occasion.',
    objectiveSkillSlugs: [
      'it-reflexive-verbs',
      'it-adverbs',
      'it-vocab-daily-routine',
      'it-vocab-clothing',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['family', 'culture', 'business', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Two topics, one conversation',
        prompt:
          'First you’ll describe your typical weekday — habits, times, reflexive verbs. ' +
          'Then you’ll describe your style: what you like to wear and why. Aim for three or four sentences on each topic.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Your typical day',
        prompt:
          'Describe your usual Monday from morning to evening. Use di solito, sempre or spesso, and at least ' +
          'three reflexive verbs.',
        notes:
          'Wise should ask follow-up questions if the learner stops early: "E il pomeriggio?" or "A che ora ceni?"',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Your personal style',
        prompt:
          'What do you like to wear on a normal day? Describe an outfit you’d choose for a casual Saturday.',
        notes:
          'Encourage indossare / portare / mettersi. If the learner mentions a clothing item not yet covered, ' +
          'Wise should volunteer the Italian word.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'A special occasion',
        prompt:
          'Now describe what you’d wear to an important dinner — and how that’s different from your everyday look.',
        notes:
          'Contrast casual vs formal vocabulary. Tie in la bella figura if the learner hasn’t mentioned it.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assessment',
        prompt:
          'Which part felt most natural — talking about your routine, or talking about clothes?',
      },
    ],
  },

  // ── 11. Vocabulary review — routine + clothing ────────────────────────────
  {
    slug: 'cap07-vocab-review-routine-clothing',
    title: 'Vocabulary round-up: routine e abbigliamento',
    lessonType: LessonType.vocabulary_review,
    level: CEFRLevel.lower_intermediate,
    summary:
      'A structured review of both vocabulary sets from this chapter — daily-routine verbs and clothing ' +
      'nouns — with quick recognition, production, and contextual use tasks.',
    objectiveSkillSlugs: ['it-vocab-daily-routine', 'it-vocab-clothing'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['family', 'culture', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Why review matters',
        prompt:
          'You’ve met a lot of new words this chapter. This session locks in the ones you need most — ' +
          'the routine verbs you’ll use every day and the clothes you’ll talk about in any social setting.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Routine verb recognition',
        prompt:
          'Which verb means "to fall asleep"? ' + 'A) riposarsi  B) addormentarsi  C) dormire',
        exampleAnswer:
          'B — addormentarsi. Dormire means to sleep (state); addormentarsi is the moment of falling asleep.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Clothing nouns with correct article',
        prompt:
          'Insert the correct definite article and clothing noun from the bank ' +
          '(stivali, gonna, maglione, cravatta, scarpe): ' +
          '1. Porta sempre ___ rossi d’inverno. ' +
          '2. Indossa ___ di lana quando fa freddo. ' +
          '3. Ha messo ___ per l’intervista di lavoro.',
        exampleAnswer: '1. gli stivali rossi  2. il maglione  3. la cravatta',
      },
      {
        taskType: TaskType.translation,
        focus: 'Combine both sets',
        prompt:
          'Translate: "She usually gets dressed quickly, puts on her coat, and leaves the house at eight."',
        exampleAnswer:
          'Di solito si veste velocemente, si mette il cappotto e esce di casa alle otto.',
        notes: 'Combines routine verb, adverb, and clothing item in one sentence.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Rapid recall',
        prompt:
          'Name five items of clothing and three daily-routine verbs you’d use before 9 am — as fast as you can.',
        notes:
          'Speed and fluency are the goal; accuracy is secondary here. Wise should note any gaps for a future session.',
      },
    ],
  },

  // ── 12. Progress check ────────────────────────────────────────────────────
  {
    slug: 'cap07-progress-check',
    title: 'Chapter checkpoint: la vita di tutti i giorni',
    lessonType: LessonType.progress_check,
    level: CEFRLevel.lower_intermediate,
    summary:
      'A mixed check across all six skills of this chapter: reflexive verbs (present and past), reciprocal ' +
      'construction, adverb formation, big numbers, daily-routine vocab, and clothing — to see what’s solid ' +
      'and what needs another pass.',
    objectiveSkillSlugs: [
      'it-reflexive-verbs',
      'it-reciprocal-construction',
      'it-adverbs',
      'it-numbers-above-100',
      'it-vocab-daily-routine',
      'it-vocab-clothing',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['family', 'culture', 'travel', 'business'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Low-stakes check',
        prompt:
          'A quick tour of everything you’ve studied this chapter. No pressure — this tells us both where you ' +
          'stand and what to revisit.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Reflexive past — auxiliary + agreement',
        prompt:
          'Complete: "Ieri mattina (io, f.) mi ___ (alzarsi) presto e mi ___ (vestirsi) in dieci minuti."',
        exampleAnswer: 'mi sono alzata, mi sono vestita',
      },
      {
        taskType: TaskType.translation,
        focus: 'Reciprocal in the past',
        prompt: '"We’ve known each other for five years." (two women)',
        exampleAnswer: 'Ci conosciamo da cinque anni. / Ci siamo conosciute cinque anni fa.',
        notes:
          'Accept both present (ongoing state) and passato prossimo (point of meeting). Note the difference.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Adverb formation',
        prompt: 'Write the adverb from: lento, gentile, probabile.',
        exampleAnswer: 'lentamente, gentilmente, probabilmente',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Big-number rule',
        prompt:
          'Which is correct? "Roma ha quasi ___ abitanti." A) tre milione  B) tre milioni di  C) tre mila',
        exampleAnswer: 'B — tre milioni di abitanti.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assess',
        prompt:
          'Which skill from this chapter do you want to revisit most: reflexive verbs, adverbs, numbers, or clothing?',
      },
    ],
  },
];

export default { unitCode, lessons };
