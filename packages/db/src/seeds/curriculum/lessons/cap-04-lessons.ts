// Additional lesson templates for Capitolo 4 — Sport e passatempi.
//
// These EXTEND the templates authored inline in units/cap-04-*.ts (the index
// merges both). Eleven curated designs: focused drills on -ere/-ire (incl.
// -isco type), modals + infinitive, direct-object pronoun placement, telling
// time; one error-correction clinic; two scenario roleplays; one listening
// challenge; one speaking challenge; one vocabulary review; one progress check.
//
// Rules mirror SPEC.md: original content; every in-string apostrophe is the
// curly ' (U+2019); slugs are globally unique and must not collide with the
// inline template slugs from units/cap-04-sport-e-passatempi.ts.

import { CEFRLevel, LessonType, TaskType } from '@prisma/client';
import type { SeedLessonTemplate } from '../types';

export const unitCode = 'cap-04';

const lessons: SeedLessonTemplate[] = [
  // ── 1. Focused drill: -ere verbs ──────────────────────────────────────────
  {
    slug: 'cap04-drill-ere-verbs',
    title: 'The -ere sprint: vedere, prendere, scrivere',
    lessonType: LessonType.grammar,
    level: CEFRLevel.beginner,
    summary:
      'Fast, focused reps on the three highest-frequency -ere verbs in sport and daily life — ' +
      'locking in the voi form (-ete) and the io form before moving on.',
    objectiveSkillSlugs: ['it-regular-ere-verbs-present'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['sports', 'family', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The -ere paradigm in thirty seconds',
        prompt:
          'The endings are: -o, -i, -e, -iamo, -ete, -ono. The only surprise is the voi form: ' +
          'leggete, vedete, prendete — never -ate.',
        notes:
          'Show a compact two-column table: -are voi vs -ere voi. Keep it under ninety seconds.',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'All six forms of vedere',
        prompt: 'Give all six present-tense forms of vedere.',
        exampleAnswer: 'vedo, vedi, vede, vediamo, vedete, vedono',
        notes: 'Sport hook: "vedete la partita stasera?" — learner hears the voi form in context.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'prendere and scrivere in context',
        prompt:
          'Complete: "Dopo l’allenamento io _____ (prendere) una doccia. ' +
          'Voi _____ (scrivere) i risultati sul tabellone?"',
        exampleAnswer: 'prendo; scrivete',
        notes: 'Mixing io and voi forces the learner to switch endings consciously.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce a full sentence',
        prompt:
          'Translate: "We see the stadium from here. Do you (pl.) read the sports newspaper?"',
        exampleAnswer: 'Vediamo lo stadio da qui. Leggete la Gazzetta dello Sport?',
      },
      {
        taskType: TaskType.recap,
        focus: 'Name the odd ending',
        prompt: 'What is the voi form of leggere, and why is it different from a -are verb?',
        exampleAnswer: 'leggete — -ere verbs use -ete, not -ate, for voi',
      },
    ],
  },

  // ── 2. Focused drill: -ire plain vs -isco ─────────────────────────────────
  {
    slug: 'cap04-drill-ire-isco',
    title: '-isco or plain? dormire vs capire, drilled',
    lessonType: LessonType.grammar,
    level: CEFRLevel.beginner,
    summary:
      'Learn to tell the two -ire patterns apart, understand which forms get the -isc- insert, ' +
      'and build automatic recall for preferire, finire, and capire in sport settings.',
    objectiveSkillSlugs: ['it-regular-ire-verbs-present'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['sports', 'family', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Two patterns side by side',
        prompt:
          'Plain (dormire): dormo, dormi, dorme, dormiamo, dormite, dormono. ' +
          '-isco (capire): capisco, capisci, capisce, capiamo, capite, capiscono. ' +
          'The insert -isc- appears in io, tu, lui/lei, loro — but noi and voi stay clean.',
        notes:
          'Highlight the four inserted cells in one colour, the two clean cells in another. ' +
          'Emphasize: "noi and voi never get the insert — ever."',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Identify the pattern',
        prompt:
          'Which form is correct? "Noi _____ (finire) l’allenamento alle sette." ' +
          'A) finiamo  B) finisciamo  C) finiscamo',
        exampleAnswer: 'A) finiamo',
        notes: 'Option B is the most common over-application of the -isco pattern to noi.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'preferire in a sports choice',
        prompt:
          'Complete: "Tu _____ (preferire) nuotare o correre? Io _____ (preferire) nuotare ' +
          'd’estate e sciare d’inverno."',
        exampleAnswer: 'preferisci; preferisco',
        notes: '"Preferire" is the ideal -isco verb for personalizing sport preferences.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Fix the -isco mistake',
        prompt: 'Find and fix the error: "Noi capiscamo le regole del rugby."',
        exampleAnswer: 'Noi capiamo le regole del rugby.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Use preferire to talk about sport',
        prompt: 'Tell me: which sport do you prefer and what time do you usually finish training?',
        notes:
          'Two -isco targets in one turn: "preferisco" and "finisco". ' +
          'Correct any -isco insert that bleeds into noi/voi.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The golden rule',
        prompt: 'Which persons of a -isco verb get the -isc- insert?',
        exampleAnswer: 'io, tu, lui/lei, loro — not noi or voi',
      },
    ],
  },

  // ── 3. Focused drill: modals + infinitive ─────────────────────────────────
  {
    slug: 'cap04-drill-modals-infinitive',
    title: 'Modal + infinitive: building obligation, ability, desire',
    lessonType: LessonType.grammar,
    level: CEFRLevel.beginner,
    summary:
      'Drill the three modal verbs with a tight focus on the infinitive requirement — ' +
      'because "voglio sport" is never correct and the engine needs to stamp that out early.',
    objectiveSkillSlugs: ['it-modal-verbs'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['sports', 'travel', 'family', 'business'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Modals always govern an infinitive',
        prompt:
          'Every modal verb (dovere, potere, volere) is followed by a bare infinitive — no "di", ' +
          'no article, just the infinitive. "Voglio giocare", not "voglio di giocare".',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Complete with the right modal form',
        prompt:
          'Complete: "Io _____ (dovere) allenarmi domani. Tu _____ (potere) venire allo stadio? ' +
          'Loro _____ (volere) guardare la finale."',
        exampleAnswer: 'devo; puoi; vogliono',
        notes:
          'Three different modals, three different subjects — forces active recall of irregular forms.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Spot the missing infinitive',
        prompt: 'Fix: "Voglio molto sport questo fine settimana."',
        exampleAnswer: 'Voglio fare molto sport questo fine settimana.',
        notes:
          'The #1 modal mistake: treating the modal as a main verb and omitting the infinitive.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce a modal sentence under time pressure',
        prompt:
          'Translate quickly: "She has to leave at six. Can you play tennis on Sunday? ' +
          'We want to watch the race."',
        exampleAnswer:
          'Deve partire alle sei. Puoi giocare a tennis domenica? Vogliamo guardare la gara.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Your week with three modals',
        prompt:
          'Tell me one thing you must do, one thing you can do, and one thing you want to do ' +
          'this week — all three modals, each with an infinitive.',
        notes:
          'Pull from learner profile for the activities. Reward any correct modal + infinitive construction.',
      },
    ],
  },

  // ── 4. Focused drill: direct object pronoun placement ─────────────────────
  {
    slug: 'cap04-drill-dop-placement',
    title: 'lo, la, li, le — pronoun before verb or glued to infinitive',
    lessonType: LessonType.grammar,
    level: CEFRLevel.lower_intermediate,
    summary:
      'Hammer the placement rule for direct object pronouns: before a conjugated verb, ' +
      'attached to an infinitive after a modal, and elided to l’ before a vowel.',
    objectiveSkillSlugs: ['it-direct-object-pronouns'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['sports', 'film', 'music', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Two legal positions, one illegal one',
        prompt:
          'Legal: lo guardo (before conjugated verb). Also legal: voglio guardarlo (glued to infinitive). ' +
          'Illegal: *guardo lo* (after the verb) — Italian pronouns never follow a finite form.',
        notes: 'Contrast with English, where the object follows: "I watch it" vs "lo guardo".',
      },
      {
        taskType: TaskType.pronoun_replacement,
        focus: 'Replace the direct object',
        prompt:
          'Rewrite replacing the bracketed noun with a pronoun: ' +
          '"Ascolto [il podcast] ogni mattina." / ' +
          '"Vediamo [gli allenatori] dopo la partita." / ' +
          '"Vuole comprare [le scarpe da corsa]."',
        exampleAnswer:
          'Lo ascolto ogni mattina. → L’ascolto ogni mattina. / ' +
          'Li vediamo dopo la partita. / ' +
          'Vuole comprarle. (or: le vuole comprare)',
        notes:
          'Three genders/numbers: m.s. (elision), m.pl., f.pl. — covers the full paradigm. ' +
          'Flag the lo → l’ elision on the first one.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Fix the illegal position',
        prompt: 'Fix: "Guardo la sempre." and "Voglio la comprare."',
        exampleAnswer:
          'La guardo sempre. — pronoun must precede the conjugated verb. ' +
          'Voglio comprarla. (or: la voglio comprare) — pronoun glues to infinitive or jumps before modal.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Choose lo / la / li / le',
        prompt:
          'Choose the correct pronoun: "Conosci [il calciatore]? — Sì, _____ conosco bene." / ' +
          '"Hai visto [le partite]? — No, non _____ ho viste."',
        exampleAnswer: 'lo; le',
        notes:
          'Second blank also introduces past-participle agreement with essere — keep the focus on the pronoun choice.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Fluent pronoun use about your sport',
        prompt:
          'Tell me about a match or event you follow. Do you watch it? Do you know the players? ' +
          'Use at least two direct object pronouns.',
        notes:
          'Target lo/la for a sport or team (il calcio → lo seguo; la Nazionale → la seguo). ' +
          'Correct position and gender agreement on the spot.',
      },
    ],
  },

  // ── 5. Error-correction clinic ────────────────────────────────────────────
  {
    slug: 'cap04-clinic-classic-errors',
    title: 'Error clinic: -isco traps, pronoun position, and l’ora',
    lessonType: LessonType.grammar,
    level: CEFRLevel.beginner,
    summary:
      'A targeted clinic on the three error clusters learners always hit in this chapter: ' +
      'bleeding the -isco insert into noi/voi, placing object pronouns after the verb, ' +
      'and using è instead of sono for clock times past one o’clock.',
    objectiveSkillSlugs: [
      'it-regular-ire-verbs-present',
      'it-direct-object-pronouns',
      'it-telling-time',
    ],
    defaultDurationMinutes: 11,
    compatibleThemes: ['sports', 'family', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Three traps, one clinic',
        prompt:
          'Every learner at this level makes the same three slips. I’ll show you the sentences — ' +
          'you spot the problem and fix it. This is how errors stop repeating.',
      },
      {
        taskType: TaskType.error_correction,
        focus: '-isco bleed into noi',
        prompt: 'Fix: "Finiscamo l’allenamento e poi usciamo."',
        exampleAnswer: 'Finiamo l’allenamento e poi usciamo.',
        notes: 'noi and voi never take the -isc- insert — full stop.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Pronoun after conjugated verb',
        prompt: 'Fix: "Aspetto lo fuori dallo stadio."',
        exampleAnswer: 'Lo aspetto fuori dallo stadio.',
        notes: 'Direct object pronouns precede a conjugated verb in Italian.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'è vs sono for clock times',
        prompt: 'Fix: "È le tre e mezza del pomeriggio."',
        exampleAnswer: 'Sono le tre e mezza del pomeriggio.',
        notes: 'è is only correct for l’una, mezzogiorno, and mezzanotte.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Combined repair',
        prompt:
          'Fix all errors: "Capiscate le istruzioni? Chiamate la a casa sua — ' +
          'è le cinque, non è tardi."',
        exampleAnswer: 'Capite le istruzioni? Chiamatela a casa sua — sono le cinque, non è tardi.',
        notes:
          'Three independent errors in one sentence. Engine may present them one at a time if learner is struggling.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Identify your own weak spot',
        prompt: 'Which of the three traps do you think you’re most likely to fall into?',
        notes:
          'Metacognitive moment — learner names their vulnerability. Engine flags it for the next session.',
      },
    ],
  },

  // ── 6. Scenario roleplay: invite to watch a match ─────────────────────────
  {
    slug: 'cap04-roleplay-invite-to-match',
    title: 'Scenario: invite a friend to watch the match',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.beginner,
    summary:
      'Use potere + venire to extend a sports invitation, negotiate a meeting time, ' +
      'and confirm the plan — the classic Italian social exchange, compressed into one scene.',
    objectiveSkillSlugs: [
      'it-modal-verbs',
      'it-dire-uscire-venire',
      'it-telling-time',
      'it-vocab-sports-hobbies',
    ],
    defaultDurationMinutes: 11,
    compatibleThemes: ['sports', 'family', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'It’s Saturday afternoon. The big match starts at 20:45. You want to watch it with a friend. ' +
          'You’ll invite them, confirm the time, and decide where to meet.',
        notes:
          'Substitute the sport to match the learner’s profile (calcio, tennis, ciclismo, etc.).',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Extend the invitation',
        prompt: 'Invite your friend: ask if they can come and tell them the kick-off time.',
        exampleAnswer:
          'Puoi venire a vedere la partita stasera? Inizia alle otto e quarantacinque.',
        notes: 'Encourage potere + venire + telling time in a single turn.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Respond to a counter-offer',
        prompt:
          'Your friend says: "Devo finire di lavorare — posso venire solo alle nove. Va bene?" ' +
          'Respond naturally, accepting or suggesting a compromise.',
        exampleAnswer: 'Nessun problema — vieni quando puoi. Ti aspetto qui.',
        notes: 'Target aspettare with a direct object pronoun in the follow-up coaching.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Confirm the plan in a message',
        prompt:
          'Complete the text message: "Ok, _____ (usciamo/uscite) alle 20:30 e _____ (ti/lo) aspetto ' +
          'davanti al bar. La partita _____ (iniziare, 3rd sg.) alle 20:45."',
        exampleAnswer: 'usciamo; ti aspetto; inizia',
        notes: 'Blends uscire, a direct object pronoun, and a regular -are verb.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Summarize the plan aloud',
        prompt:
          'Say out loud: where you’re meeting, at what time, and what the plan is after the match.',
        notes: 'Free production. Coach any time expression or modal error immediately.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Key phrases from the scene',
        prompt:
          'How do you say "Can you come?" and "I’ll wait for you" using the words from this lesson?',
        exampleAnswer: 'Puoi venire? Ti aspetto.',
      },
    ],
  },

  // ── 7. Scenario roleplay: plan a weekend ─────────────────────────────────
  {
    slug: 'cap04-roleplay-weekend-plans',
    title: 'Scenario: planning the perfect Italian weekend',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.beginner,
    summary:
      'Negotiate a full weekend plan with a friend — mixing modals, weather, sport vocabulary, ' +
      'and time expressions to build a naturalistic planning conversation.',
    objectiveSkillSlugs: [
      'it-modal-verbs',
      'it-vocab-weather-seasons',
      'it-vocab-sports-hobbies',
      'it-telling-time',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['sports', 'travel', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'It’s Friday evening. You and a friend want to plan the weekend together. ' +
          'You have obligations (dovere), options depending on the weather (potere), ' +
          'and wishes (volere). Let’s negotiate.',
        notes: 'Use the learner’s actual city and real weekend activities if known.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'State your obligations and wishes',
        prompt:
          'Tell your friend: what you must do on Saturday morning, and what you want to do ' +
          'on Sunday afternoon.',
        exampleAnswer:
          'Sabato mattina devo allenarmi in palestra — finisco verso le undici. ' +
          'Domenica pomeriggio voglio andare in bicicletta se fa bello.',
        notes: 'Two modals, a time expression, and a weather condition in one turn.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'React to the weather forecast',
        prompt:
          'The forecast says: "Sabato c’è il sole, domenica piove." ' +
          'Which plan makes the most sense? ' +
          'A) Andiamo in bici sabato e restiamo a casa domenica. ' +
          'B) Andiamo in bici domenica — non fa così freddo. ' +
          'C) Dobbiamo sciare sabato.',
        exampleAnswer: 'A) Andiamo in bici sabato e restiamo a casa domenica.',
        notes: 'Tests weather comprehension + modal logic together.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Suggest a Saturday evening activity',
        prompt:
          'Translate: "After training, can we watch the match? It starts at nine in the evening."',
        exampleAnswer:
          'Dopo l’allenamento, possiamo guardare la partita? Inizia alle nove di sera.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Deliver the full weekend plan',
        prompt:
          'Give your friend the complete weekend plan — Saturday and Sunday — using ' +
          'at least two modals and at least two time expressions.',
        notes:
          'Free production. This is the synthesis task. Coach errors in modal forms and time expressions.',
      },
    ],
  },

  // ── 8. Listening challenge ────────────────────────────────────────────────
  {
    slug: 'cap04-listening-time-and-activity',
    title: 'Listening gym: what time? what sport?',
    lessonType: LessonType.listening_challenge,
    level: CEFRLevel.beginner,
    summary:
      'Train your ear on three short dialogues about weekend sport plans. ' +
      'Catch the time each activity starts and what the speakers are doing or watching.',
    objectiveSkillSlugs: ['it-telling-time', 'it-vocab-sports-hobbies', 'it-vocab-weather-seasons'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['sports', 'family', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Ear training goal',
        prompt:
          'Listen for three things in each clip: the activity, the start time, and any weather detail. ' +
          'Don’t worry about every word — anchor on those three targets.',
        notes:
          'Remind learner that spoken Italian contracts times: "alle otto meno un quarto" sounds fast.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Clip 1 — the morning run',
        prompt:
          'What does the speaker plan to do tomorrow morning, and at what time does she want to leave?',
        notes:
          'Script idea: "Domani mattina voglio uscire a correre presto — ' +
          'parto alle sette meno un quarto se non piove." ' +
          'Engine fills the audio script; learner must extract activity (correre) and time (6:45).',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Clip 2 — the match tonight',
        prompt: 'What sport are they watching, and what time does it start?',
        notes:
          'Script idea: two friends decide to watch a basketball game at 20:30. ' +
          '"Sei libero stasera? C’è la partita di pallacanestro — inizia alle otto e mezza."',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Weather affects the plan',
        prompt:
          'In the third clip, why do the speakers change their Sunday plan? ' +
          'A) Non vogliono uscire. B) Piove tutto il giorno. C) La piscina è chiusa.',
        exampleAnswer: 'B) Piove tutto il giorno.',
        notes:
          'Script: "Domenica non possiamo andare in bici — piove tutto il giorno, ' +
          'quindi restiamo a casa e guardiamo il ciclismo in TV."',
      },
      {
        taskType: TaskType.recap,
        focus: 'What helped you catch the times?',
        prompt: 'Which word or phrase in each clip signaled that a time was coming?',
        notes: 'Target: "alle", "inizia", "parto". This metacognitive step transfers the skill.',
      },
    ],
  },

  // ── 9. Speaking challenge ─────────────────────────────────────────────────
  {
    slug: 'cap04-speaking-my-sports-weekend',
    title: 'Speaking challenge: describe your sports life and a typical weekend',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.beginner,
    summary:
      'Extended free speech: describe the sports and hobbies you love, when and how often you ' +
      'do them, what the weather is like where you live, and what a typical weekend looks like.',
    objectiveSkillSlugs: [
      'it-vocab-sports-hobbies',
      'it-vocab-weather-seasons',
      'it-modal-verbs',
      'it-telling-time',
      'it-regular-ere-verbs-present',
      'it-regular-ire-verbs-present',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['sports', 'travel', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Extended free production',
        prompt:
          'You’re going to speak for a while — about what you do, when you do it, and what stops you. ' +
          'There’s no single right answer. Aim for three or four connected sentences per prompt.',
        notes: 'Pull learner’s sport and hobby profile before the session starts.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Your sport and hobbies',
        prompt:
          'Tell me about the sport or hobby you love most. Do you play it, watch it, or both? ' +
          'How often? Use giocare a or fare as appropriate.',
        notes:
          'Key targets: giocare a / fare + sport, frequency (ogni settimana, due volte al mese). ' +
          'Coach giocare-a vs fare confusion immediately.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'The weather in your life',
        prompt:
          'Describe the weather where you live in each season. How does it affect what you do?',
        notes:
          'Targets: fa caldo/freddo, c’è il sole, piove, nevica + seasons. ' +
          'Coach fa vs è errors on weather expressions.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'A typical Saturday',
        prompt:
          'Walk me through a typical Saturday — from what time you wake up to what you do in the evening. ' +
          'Use modal verbs, time expressions, and at least one -ire verb.',
        notes:
          'Synthesis prompt. Log any recurring modal or time-expression error for the error clinic.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assessment',
        prompt: 'Which part of that was most natural? Which part did you have to slow down for?',
        notes: 'Metacognitive close. Use the answer to adapt the next session’s focus.',
      },
    ],
  },

  // ── 10. Vocabulary review ─────────────────────────────────────────────────
  {
    slug: 'cap04-vocab-sports-weather-review',
    title: 'Sports, hobbies, and weather — vocabulary review',
    lessonType: LessonType.vocabulary_review,
    level: CEFRLevel.beginner,
    summary:
      'Consolidate the chapter’s two vocabulary fields — sports/hobbies and weather/seasons — ' +
      'through recall, contextual use, and the giocare a / fare distinction.',
    objectiveSkillSlugs: ['it-vocab-sports-hobbies', 'it-vocab-weather-seasons'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['sports', 'travel', 'culture', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Two fields, one rich topic',
        prompt:
          'Sport and weather are inseparable in Italy. This review runs both fields together — ' +
          'because the best sentences link them: "Non posso correre — piove troppo."',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'giocare a vs fare',
        prompt:
          'Choose the correct form: "_____ nuoto tre volte a settimana." ' +
          'A) Gioco a  B) Faccio  C) Gioco il',
        exampleAnswer: 'B) Faccio',
        notes:
          'nuoto, sci, ciclismo, atletica — all take fare. ' +
          'calcio, tennis, pallacanestro — take giocare a.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Weather in context',
        prompt:
          'Complete with a weather expression: "A Napoli d’estate _____ molto. ' +
          'In Trentino d’inverno _____ spesso e _____ freddo."',
        exampleAnswer: 'fa molto caldo; nevica spesso e fa freddo',
        notes: 'fa caldo/freddo and nevica are the three highest-value weather forms.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Seasons + sport',
        prompt:
          'Translate: "In spring I like to run in the park. In winter we prefer to ski in the mountains."',
        exampleAnswer:
          'In primavera mi piace correre nel parco. D’inverno preferiamo sciare in montagna.',
        notes: 'Introduces in primavera vs d’inverno — both are correct idiomatic forms.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Connect weather to your weekend',
        prompt:
          'Say: what sport can you do where you live in summer? And what must you do differently in winter?',
        notes:
          'Targets potere/dovere + weather + sport vocab in a single turn. ' +
          'Use the learner’s real location if known.',
      },
    ],
  },

  // ── 11. Progress check ────────────────────────────────────────────────────
  {
    slug: 'cap04-progress-check',
    title: 'Chapter checkpoint: Sport e passatempi',
    lessonType: LessonType.progress_check,
    level: CEFRLevel.lower_intermediate,
    summary:
      'A mixed check across the whole chapter — verb conjugations, modal + infinitive, ' +
      'pronoun placement, time expressions, and vocabulary — to surface what is solid ' +
      'and what needs another pass before moving on.',
    objectiveSkillSlugs: [
      'it-regular-ere-verbs-present',
      'it-regular-ire-verbs-present',
      'it-modal-verbs',
      'it-direct-object-pronouns',
      'it-telling-time',
      'it-vocab-sports-hobbies',
      'it-vocab-weather-seasons',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['sports', 'travel', 'family', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Low-stakes checkpoint',
        prompt:
          'A few quick questions to see where you stand after the chapter. ' +
          'No pressure — anything that feels shaky just becomes the target for your next session.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: '-ere and -ire in one sentence',
        prompt:
          'Complete: "Marco _____ (leggere) la Gazzetta e poi _____ (uscire) a correre. ' +
          'Noi _____ (finire) tardi."',
        exampleAnswer: 'legge; esce; finiamo',
        notes: '-ere, irregular uscire, and -isco verb (noi form — no insert).',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Modal + infinitive',
        prompt: 'Choose: "Devono _____ più sport." A) fare  B) di fare  C) fanno',
        exampleAnswer: 'A) fare',
      },
      {
        taskType: TaskType.translation,
        focus: 'Clock time',
        prompt: 'Translate: "The race starts at quarter past eleven in the morning."',
        exampleAnswer: 'La gara inizia alle undici e un quarto di mattina.',
      },
      {
        taskType: TaskType.pronoun_replacement,
        focus: 'Pronoun swap',
        prompt:
          'Rewrite: "Guardo la partita ogni sabato." — replace the direct object with a pronoun.',
        exampleAnswer: 'La guardo ogni sabato.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assessment',
        prompt:
          'Which topic from this chapter — verb conjugations, modals, pronouns, time, or vocabulary — ' +
          'do you want to practise more before moving on?',
        notes: 'Engine logs the answer and surfaces a targeted recovery lesson if needed.',
      },
    ],
  },
];

export default { unitCode, lessons };
