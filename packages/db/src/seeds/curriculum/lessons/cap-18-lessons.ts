// Additional lesson templates for Capitolo 18 — La società multiculturale.
//
// These EXTEND the templates authored inline in units/cap-18-societa-multiculturale.ts.
// Theme: politics / news / culture. Advanced level.
// Grammar focus: congiuntivo imperfetto, congiuntivo trapassato, sequence of tenses,
// impossible-past hypotheticals (se avessi…), and multicultural / values vocabulary.
//
// All content original (copyright-safe). Every in-string apostrophe is the
// curly ' (U+2019); straight quotes delimit strings only.

import { CEFRLevel, LessonType, TaskType } from '@prisma/client';
import type { SeedLessonTemplate } from '../types';

export const unitCode = 'cap-18';

const lessons: SeedLessonTemplate[] = [
  // ─── 1. Per-skill drill: imperfect subjunctive forms ─────────────────────
  {
    slug: 'cap18-drill-imperfect-subjunctive-forms',
    title: 'Parlassi, prendessi, dormissi — building every imperfect subjunctive',
    lessonType: LessonType.grammar,
    level: CEFRLevel.advanced,
    summary:
      'A focused conjugation drill on the imperfect subjunctive across all three verb classes and ' +
      'the highest-frequency irregulars. By the end, the -assi / -essi / -issi pattern should feel ' +
      'automatic.',
    objectiveSkillSlugs: ['it-congiuntivo-imperfetto'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['politics', 'culture', 'news'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The three conjugation families',
        prompt:
          '-are verbs drop -are and add -assi, -assi, -asse, -assimo, -aste, -assero (parlare → parlassi). ' +
          '-ere verbs: -essi, -essi, -esse, -essimo, -este, -essero (prendere → prendessi). ' +
          '-ire verbs: -issi, -issi, -isse, -issimo, -iste, -issero (dormire → dormissi). ' +
          'Irregulars to memorise: essere → fossi/fosse/fossero; avere → avessi/avesse/avessero; ' +
          'fare → facessi; dare → dessi; stare → stessi; dire → dicessi.',
        notes:
          'Present the triple grid side by side so learners see the structural parallel. ' +
          'Highlight the double-s as the one consistent marker of the imperfect subjunctive across all classes.',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'All three classes: regular verbs',
        prompt:
          'Give the io, lui/lei, and loro forms of the imperfect subjunctive for: ' +
          'lavorare (work), leggere (read), capire (understand).',
        exampleAnswer:
          'lavorare: lavorassi, lavorasse, lavorassero — ' +
          'leggere: leggessi, leggesse, leggessero — ' +
          'capire: capissi, capisse, capissero',
        notes: 'Confirm the double-s appears in every form before moving on.',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'High-frequency irregulars',
        prompt: 'Give the io and loro forms of the imperfect subjunctive for: essere, avere, fare.',
        exampleAnswer:
          'essere: fossi / fossero — avere: avessi / avessero — fare: facessi / facessero',
        notes:
          'essere is the top priority; drill it until it comes immediately. ' +
          'Personalise: "Volevo che tu fossi qui" or "Pensava che facessero di meglio."',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'In context: multicultural society',
        prompt:
          'Complete with the correct imperfect subjunctive form: ' +
          '"Il governo voleva che tutti i cittadini ___ (rispettare) le leggi — ' +
          'e che le istituzioni ___ (essere) più vicine alle comunità straniere."',
        exampleAnswer: 'rispettassero … fossero',
        notes: 'Use vocabulary from the chapter; two different verb classes in one exercise.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The double-s rule',
        prompt:
          'What single feature instantly identifies a verb form as the imperfect subjunctive? ' +
          'Give one example from each verb class.',
      },
    ],
  },

  // ─── 2. Per-skill drill: pluperfect subjunctive ───────────────────────────
  {
    slug: 'cap18-drill-pluperfect-subjunctive',
    title: 'Avessi parlato, fosse partita — the pluperfect subjunctive',
    lessonType: LessonType.grammar,
    level: CEFRLevel.advanced,
    summary:
      'The congiuntivo trapassato combines the imperfect subjunctive of avere or essere with a past ' +
      'participle. This drill builds the form from scratch and practises it in the two contexts where ' +
      'it is obligatory: the prior-past subordinate clause and the third conditional.',
    objectiveSkillSlugs: ['it-congiuntivo-trapassato'],
    defaultDurationMinutes: 11,
    compatibleThemes: ['politics', 'history', 'news'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The compound structure',
        prompt:
          'Congiuntivo trapassato = imperfect subjunctive of the auxiliary + past participle. ' +
          'Avere verbs: avessi / avessi / avesse / avessimo / aveste / avessero + participio. ' +
          'Essere verbs: fossi / fossi / fosse / fossimo / foste / fossero + participio (with agreement). ' +
          'Examples: che avessi detto (that I had said) — che fosse arrivata (that she had arrived, f.).',
        notes:
          'Build on what learners already know: "avessi is just the imperfect subjunctive of avere — ' +
          'add the participle and you have the pluperfect." The essere agreement is the most reliable error source.',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'Build the pluperfect from scratch',
        prompt:
          'Give the che io and che loro forms of the congiuntivo trapassato for: ' +
          'capire (avere auxiliary) and arrivare (essere auxiliary, m. pl. for loro).',
        exampleAnswer:
          'capire: che avessi capito (io) / che avessero capito (loro) — ' +
          'arrivare: che fossi arrivato/a (io) / che fossero arrivati (loro)',
        notes: 'Flag the arrivato/a choice — make the learner state both options for io.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Prior past action in a subordinate clause',
        prompt:
          'Complete with the congiuntivo trapassato: ' +
          '"Era sorprendente che nessuno ___ (informare, avere) i residenti prima dell’arrivo degli sfollati."',
        exampleAnswer: 'avesse informato',
      },
      {
        taskType: TaskType.translation,
        focus: 'Impossible past hypothesis',
        prompt:
          'Translate: "If the city had invested in multilingual schools earlier, many misunderstandings ' +
          'would never have arisen."',
        exampleAnswer:
          'Se la città avesse investito prima nelle scuole multilingue, molti malintesi non sarebbero ' +
          'mai sorti.',
        notes:
          'Third conditional structure — confirm the learner uses congiuntivo trapassato in the si-clause.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Prior vs simultaneous',
        prompt:
          'What tells you to use the pluperfect subjunctive rather than the imperfect subjunctive ' +
          'in a subordinate clause with a past main verb?',
        exampleAnswer:
          'When the subordinate action happened BEFORE the main-clause action — not at the same time.',
      },
    ],
  },

  // ─── 3. Per-skill drill: sequence-of-tenses matching ─────────────────────
  {
    slug: 'cap18-drill-sequence-matching',
    title: 'Which cell? — sequence-of-tenses rapid-fire matching',
    lessonType: LessonType.grammar,
    level: CEFRLevel.advanced,
    summary:
      'A fast-paced matching drill across all four cells of the correlazione dei tempi grid. You see ' +
      'a main clause and a time cue, and you choose the right subjunctive tense. Builds the grid as ' +
      'a reflex, not a lookup table.',
    objectiveSkillSlugs: ['it-congiuntivo-sequence'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['politics', 'news', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'The four-cell grid as a decision tree',
        prompt:
          'Step 1: Is the main clause present/future OR past/conditional? ' +
          'Step 2: Is the subordinate action simultaneous OR prior? ' +
          'Answer these two questions and you can always choose the right cell.',
        notes: 'Display the grid visually before beginning the exercises.',
      },
      {
        taskType: TaskType.tense_selection,
        focus: 'Cell 1 — present main / simultaneous',
        prompt:
          'Which form is correct? "È importante che la comunità ___ la propria lingua madre." ' +
          '(A) mantenesse  (B) mantenga',
        exampleAnswer:
          'B — mantenga. Present main clause + simultaneous action → present subjunctive.',
      },
      {
        taskType: TaskType.tense_selection,
        focus: 'Cell 3 — past main / simultaneous',
        prompt:
          'Which form is correct? "Speravo che i bambini ___ insieme a scuola." ' +
          '(A) giocassero  (B) abbiano giocato  (C) giochino',
        exampleAnswer:
          'A — giocassero. Past main clause + simultaneous action → imperfect subjunctive.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Cell 4 — past main / prior',
        prompt:
          'Which is correct? "Non sapevo che quella famiglia ___ già dal Marocco tre anni prima." ' +
          '(A) fosse arrivata  (B) arrivasse  (C) sia arrivata',
        exampleAnswer:
          'A — fosse arrivata. Past main clause + prior action → pluperfect subjunctive. ' +
          'The arrival happened BEFORE the not-knowing.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Mixed grid in one passage',
        prompt:
          'Complete both blanks, choosing the correct tense each time: ' +
          '"Tutti sperano che il dialogo ___ (continuare) — ma ieri sembrava impossibile ' +
          'che le due parti ___ (già trovare) un compromesso."',
        exampleAnswer: 'continui … avessero già trovato',
        notes:
          'Two different cells in a single coherent context. The contrast is the learning target.',
      },
    ],
  },

  // ─── 4. Per-skill drill: hypotheticals "se avessi…" ──────────────────────
  {
    slug: 'cap18-drill-se-avessi-hypotheticals',
    title: 'Se fossi… se avessi… — hypothetical worlds',
    lessonType: LessonType.grammar,
    level: CEFRLevel.advanced,
    summary:
      'A focused drill on both types of si-clause hypothetical: the second conditional (unlikely ' +
      'present: se + imperfect subjunctive / conditional present) and the third conditional ' +
      '(impossible past: se + pluperfect subjunctive / past conditional). The goal is clean, ' +
      'automatic production of both formulas.',
    objectiveSkillSlugs: ['it-congiuntivo-imperfetto', 'it-congiuntivo-trapassato'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['politics', 'culture', 'history'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Second vs third conditional at a glance',
        prompt:
          'Second conditional (unlikely present): ' +
          'Se + congiuntivo imperfetto → condizionale presente. ' +
          '"Se potessi scegliere, vivrei in una città più multiculturale." ' +
          'Third conditional (impossible past): ' +
          'Se + congiuntivo trapassato → condizionale passato. ' +
          '"Se avessi saputo della festa, sarei venuto." ' +
          'The difference is purely temporal: imperfect subj. = now/future; pluperfect subj. = then/past.',
        notes:
          'Contrast the two side by side. Learners who confuse them almost always mix the si-clause forms — ' +
          'the result clause is usually correct.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Second conditional: unlikely present',
        prompt:
          'Complete: "Se ___ (avere) più tempo, ___ (iscriversi) a un corso di lingua araba."',
        exampleAnswer: 'Se avessi più tempo, mi iscriverei a un corso di lingua araba.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Third conditional: impossible past',
        prompt:
          'Complete: "Se la famiglia ___ (ricevere) assistenza all’inizio, l’integrazione ___ ' +
          '(essere) molto più rapida."',
        exampleAnswer:
          'Se la famiglia avesse ricevuto assistenza all’inizio, l’integrazione sarebbe stata molto più rapida.',
        notes: 'Essere in the result clause requires the agreement: stata (f.).',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Your own hypothetical',
        prompt:
          'Say one sentence with "Se fossi…" about an unlikely present scenario in your own life — ' +
          'then say one sentence with "Se avessi…" about something you wish had been different in the past.',
        notes:
          'Personalise to the learner’s interests: travel, career, language learning, family. ' +
          'Accept any grammatically correct pair; give positive reinforcement for attempting both.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Two formulas, one rule',
        prompt:
          'Complete: "In the si-clause of a hypothetical, I NEVER use ___. ' +
          'For an unlikely present I use ___; for an impossible past I use ___."',
        exampleAnswer:
          'I never use the conditional in the si-clause. ' +
          'For unlikely present: congiuntivo imperfetto. ' +
          'For impossible past: congiuntivo trapassato.',
      },
    ],
  },

  // ─── 5. Error-correction clinic ──────────────────────────────────────────
  {
    slug: 'cap18-clinic-subjunctive-sequence-errors',
    title: 'Subjunctive clinic: wrong sequence, wrong tense, wrong si-clause',
    lessonType: LessonType.grammar,
    level: CEFRLevel.advanced,
    summary:
      'A targeted error-correction clinic on the three classic advanced mistakes: using the present ' +
      'subjunctive after a past main clause; putting the conditional in the si-clause; and getting ' +
      'an irregular imperfect subjunctive wrong. Fix the errors and explain why.',
    objectiveSkillSlugs: [
      'it-congiuntivo-sequence',
      'it-congiuntivo-imperfetto',
      'it-congiuntivo-trapassato',
    ],
    defaultDurationMinutes: 11,
    compatibleThemes: ['politics', 'news', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Why these errors persist',
        prompt:
          'Even strong learners make these three mistakes because English does not change the ' +
          'embedded-clause tense the way Italian does — and the conditional in the si-clause ' +
          '"sounds fine" if you translate word by word. You’ll see each error, diagnose it, and ' +
          'fix it. That is how it stops happening.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Error 1 — present subjunctive after a past main clause',
        prompt:
          'Fix and explain: "La professoressa voleva che gli studenti capiscano le differenze culturali."',
        exampleAnswer:
          'La professoressa voleva che gli studenti capissero le differenze culturali. ' +
          '(Past main clause voleva → imperfect subjunctive capissero, not present subjunctive capiscano.)',
        notes:
          'This is the most common error at B2–C1. Stress that the tense of the main clause drives everything.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Error 2 — conditional in the si-clause',
        prompt:
          'Fix and explain: "Se avremmo costruito più ponti tra le comunità, oggi saremmo più uniti."',
        exampleAnswer:
          'Se avessimo costruito più ponti tra le comunità, oggi saremmo più uniti. ' +
          '(The si-clause requires the congiuntivo trapassato — avessimo costruito — never the conditional avremmo.)',
        notes:
          'The result clause (saremmo più uniti) is fine — the error is in the si-clause only. ' +
          'Reinforce: "conditional in the si-clause = always wrong."',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Error 3 — wrong irregular imperfect subjunctive',
        prompt: 'Fix and explain: "Tutti pensavano che il governo dessero una risposta chiara."',
        exampleAnswer:
          'Tutti pensavano che il governo desse una risposta chiara. ' +
          '(dare → imperfect subjunctive: dessi, dessi, desse, dessimo, deste, dessero. ' +
          'The loro form is dessero, but the subject here is il governo (singular) → desse.)',
        notes: 'Two issues in one: the irregular stem AND subject-verb agreement. Flag both.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Personal error audit',
        prompt:
          'Of the three errors you just corrected, which feels closest to a mistake you might make ' +
          'yourself? Why? What will you do to catch it before it comes out?',
        notes:
          'Metacognitive step — learners who identify their personal error patterns improve faster. ' +
          'Accept any honest reflection.',
      },
    ],
  },

  // ─── 6. Scenario roleplay — a conversation about cultural diversity ────────
  {
    slug: 'cap18-roleplay-dialogo-diversita',
    title: 'Un dialogo aperto — speaking about cultural diversity',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.advanced,
    summary:
      'A thoughtful, respectful conversation with a new colleague originally from Nigeria who has ' +
      'lived in Bologna for ten years. You discuss the city, belonging, and what it means to share ' +
      'a community — using the subjunctive to express opinions, doubts, and good-faith questions.',
    objectiveSkillSlugs: ['it-vocab-multicultural', 'it-vocab-values', 'it-congiuntivo-imperfetto'],
    defaultDurationMinutes: 14,
    compatibleThemes: ['culture', 'politics', 'news'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'It’s lunchtime at a university research centre in Bologna. You are eating with Chidi, ' +
          'a colleague who moved from Lagos ten years ago. The conversation turns to the city and ' +
          'to life as a "nuovo italiano." Listen and engage with curiosity and respect.',
        notes:
          'Frame the scenario as collaborative, not interrogative — Wise will play Chidi as warm ' +
          'and reflective, not as someone who needs to explain or defend anything.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Opening the conversation',
        prompt:
          'Chidi says: "Bologna mi ha dato molto — ma ho impiegato anni prima che la città mi ' +
          'sembrasse davvero casa mia." Ask a genuine follow-up question showing you understood ' +
          'his use of the subjunctive (sembrasse).',
        exampleAnswer:
          'Ti capisco. Cosa è cambiato col tempo — cosa ha fatto sì che cominciasse a sentirti ' +
          'davvero a casa?',
        notes:
          'The learner should use or echo the imperfect subjunctive naturally. Accept any warm, ' +
          'grammatically valid follow-up.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Expressing a nuanced opinion',
        prompt:
          'Chidi asks your view: "Secondo te, cosa rende davvero parte di una comunità?" ' +
          'Give your honest opinion in 3–4 sentences, using at least one subjunctive expression ' +
          '(credo che…, è importante che…, penso che…).',
        notes:
          'There is no single right answer — the goal is fluent, respectful expression. ' +
          'Personalise the model answer to the learner’s own values if known.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Handling a difference of view',
        prompt:
          'Chidi says gently: "Io non sono sicuro che la cittadinanza faccia tutta questa differenza ' +
          'nel quotidiano." Respond thoughtfully — agree partly, disagree partly, or ask for more. ' +
          'Use the subjunctive at least once.',
        exampleAnswer:
          'Hai un punto valido — la cittadinanza non cambia come ti trattano le persone in strada. ' +
          'Però penso che dal punto di vista legale faccia ancora molta differenza. Tu cosa intendi ' +
          'esattamente?',
        notes:
          'Model nuanced engagement: "capisco quello che dici, però…" Accept any respectful response.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'After the conversation',
        prompt:
          'In Italian, complete this sentence in your own words: ' +
          '"Dopo questo dialogo, mi rendo conto che…"',
        notes:
          'Open-ended metacognitive close. Any thoughtful Italian sentence is correct. ' +
          'Encourage risk-taking with grammar over stiff, safe responses.',
      },
    ],
  },

  // ─── 7. Scenario roleplay — past regrets / se avessi saputo ──────────────
  {
    slug: 'cap18-roleplay-rimpianti-passati',
    title: 'Rimpianti e riflessioni — se avessi saputo…',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.advanced,
    summary:
      'A late-evening conversation with a friend during which you both reflect on past choices — ' +
      'things you wish you had done differently. The third conditional and the pluperfect subjunctive ' +
      'are the natural language of this reflection.',
    objectiveSkillSlugs: ['it-congiuntivo-trapassato', 'it-congiuntivo-imperfetto'],
    defaultDurationMinutes: 12,
    compatibleThemes: ['culture', 'history', 'politics'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'You’re having dinner with an old friend, Valentina, who has just returned from three years ' +
          'working in a multilingual school in Brussels. The conversation drifts to paths not taken. ' +
          'She says: "Se avessi saputo quant’era importante il multilinguismo, avrei studiato il ' +
          'francese molto prima." Your turn.',
        notes:
          'Frame as a warm, nostalgic conversation — not an exercise. The subjunctive arises naturally ' +
          'because people genuinely use "se avessi saputo / se fossi stato" when reflecting on their lives.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Respond with your own regret or wish',
        prompt:
          'Reply to Valentina and share one thing you wish you had done differently in the past. ' +
          'Use "Se avessi… / Se fossi…" and the past conditional in the result clause.',
        exampleAnswer:
          'Anch’io ho i miei rimpianti. Se avessi vissuto all’estero per almeno un anno da giovane, ' +
          'credo che avrei capito molto meglio come funziona davvero il mondo.',
        notes:
          'Personalise to the learner’s life — travel not taken, language not learned, opportunity missed. ' +
          'The content matters less than the grammatical structure.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Exploring the hypothetical further',
        prompt:
          'Valentina asks: "E se avessi avuto la possibilità di crescere in una famiglia bilingue — ' +
          'cosa pensi che sarebbe stato diverso nella tua vita?" Answer in 2–3 sentences.',
        exampleAnswer:
          'Se fossi cresciuto/a in una famiglia bilingue, avrei sicuramente meno difficoltà adesso ' +
          'con l’accento e la fluidità. E forse avrei avuto più fiducia nel parlare con gli stranieri ' +
          'fin da bambino/a.',
        notes:
          'This deepens the third conditional by inviting a more developed reflection. ' +
          'Accept any response that correctly uses congiuntivo trapassato in the si-clause.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Complete the third conditional sentences',
        prompt:
          'Complete: "Se l’Italia ___ (adottare) politiche di integrazione più forti negli anni ’90, ' +
          'molte seconde generazioni ___ (ottenere) la cittadinanza prima."',
        exampleAnswer:
          'Se l’Italia avesse adottato politiche di integrazione più forti negli anni ’90, ' +
          'molte seconde generazioni avrebbero ottenuto la cittadinanza prima.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The two forms in the two clauses',
        prompt:
          'Without looking: what verb form goes in the se-clause, and what verb form goes in the ' +
          'result clause of the third conditional?',
        exampleAnswer:
          'Se-clause: congiuntivo trapassato (avessi fatto / fossi andato/a). ' +
          'Result clause: condizionale passato (avrei fatto / sarei andato/a).',
      },
    ],
  },

  // ─── 8. Listening challenge ───────────────────────────────────────────────
  {
    slug: 'cap18-listening-intervista-riflessiva',
    title: 'Listening challenge: a reflective interview',
    lessonType: LessonType.listening_challenge,
    level: CEFRLevel.advanced,
    summary:
      'A radio-style interview with a community leader who reflects on her journey, her wishes for ' +
      'the future, and what she would have done differently. Train your ear to catch the subjunctive ' +
      'triggers, the hypothetical structures, and the vocabulary of values and belonging.',
    objectiveSkillSlugs: [
      'it-congiuntivo-imperfetto',
      'it-congiuntivo-trapassato',
      'it-vocab-multicultural',
      'it-vocab-values',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['politics', 'news', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'What to listen for',
        prompt:
          'You will hear a short interview with Sofia, a second-generation Italian-Moroccan community ' +
          'organiser in Palermo. Listen for: (1) subjunctive verbs and their triggers, (2) any ' +
          'hypothetical structures, (3) values vocabulary (rispetto, appartenenza, convivenza…). ' +
          'You will answer questions on all three.',
        notes:
          'Script guideline for the engine: 90–120 seconds, authentic pace, a journalist and Sofia. ' +
          'Include at least one instance of pensavo che + imperfect subjunctive and one of ' +
          'se avessi saputo + past conditional. Vocabulary: appartenenza, convivenza, diritti, integrazione.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Main message',
        prompt:
          'What is the central message of Sofia’s interview? Summarise in 1–2 Italian sentences.',
        notes:
          'Assess overall comprehension first. Accept any accurate paraphrase that uses chapter vocabulary.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Catch the hypothetical',
        prompt:
          'Sofia expresses a past regret using "se avessi saputo…" — what did she say she would have done differently?',
        notes:
          'Engine should script a clear hypothetical: e.g. "Se avessi saputo prima come funzionava ' +
          'il sistema, avrei aiutato molte più famiglie." The multiple-choice options should include ' +
          'one correct and two plausible distractors.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Vocabulary from the interview',
        prompt:
          'Complete from memory: Sofia used three values-vocabulary words. What were they? ' +
          'If unsure, choose from: convivenza / pregiudizio / appartenenza / solidarietà / diversità.',
        notes:
          'Script should include exactly three items from the values cluster. Engine fills in the correct answers ' +
          'based on the script it generates.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Your reaction',
        prompt:
          'Did anything Sofia said surprise you or make you think? Respond in Italian with at least ' +
          'one subjunctive expression: "È interessante che… / Mi ha colpito che… / Non sapevo che…"',
        notes:
          'Encourages authentic engagement and produces a natural subjunctive sentence as a byproduct. ' +
          'No single correct answer — reward any thoughtful response.',
      },
    ],
  },

  // ─── 9. Speaking challenge ────────────────────────────────────────────────
  {
    slug: 'cap18-speaking-cosa-vorrei-fosse-diverso',
    title: 'Cosa vorrei che fosse diverso — speaking with the subjunctive',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.advanced,
    summary:
      'A sustained speaking challenge: talk about something you genuinely wish were different — in ' +
      'your community, your country, or the world — using the imperfect and pluperfect subjunctive ' +
      'as natural tools for expressing desire, regret, and hope. Two to three minutes of connected speech.',
    objectiveSkillSlugs: [
      'it-congiuntivo-imperfetto',
      'it-congiuntivo-trapassato',
      'it-congiuntivo-sequence',
      'it-vocab-values',
    ],
    defaultDurationMinutes: 13,
    compatibleThemes: ['politics', 'culture', 'news'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'What this challenge asks of you',
        prompt:
          'You will speak for about two minutes on a topic that matters to you. There is no script. ' +
          'The goal is to deploy the imperfect and pluperfect subjunctive as part of genuine, connected ' +
          'speech — not to produce perfect sentences one by one, but to express real ideas fluently.',
        notes:
          'Remind the learner that risk-taking with grammar is valued over playing it safe. ' +
          'A courageous mistake is worth more than a cautious silence.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Something you wish were different — now',
        prompt:
          'Talk about one thing you wish were different in the world today. Use "Vorrei che…" ' +
          'or "Sarebbe meglio che…" followed by the imperfect subjunctive at least twice.',
        exampleAnswer:
          'Vorrei che i governi europei lavorassero insieme con più coerenza sui temi dell’immigrazione. ' +
          'Sarebbe meglio che ogni paese avesse politiche più uniformi, così che le famiglie non ' +
          'fossero trattate in modo così diverso a seconda del paese in cui arrivano.',
        notes:
          'Personalise to the learner’s stated interests (politics, environment, education, etc.). ' +
          'Provide a light scaffold if the learner gets stuck: "Prova a iniziare con: Vorrei che…"',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Something you wish had been different — in the past',
        prompt:
          'Now shift to the past. Talk about something you wish had been different — in your own ' +
          'life or in history. Use "Avrei voluto che… / Era un peccato che…" plus the pluperfect ' +
          'subjunctive at least once.',
        exampleAnswer:
          'Era un peccato che la mia scuola non avesse mai avuto studenti di altre nazionalità — ' +
          'avrei voluto che ci fossero state più opportunità di scambio culturale fin da piccolo/a.',
        notes:
          'The pluperfect subjunctive is harder to produce spontaneously — reward any correct attempt ' +
          'even if the surrounding speech is simple.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'A hope for the future, with sequence of tenses',
        prompt:
          'End your monologue with a hope or wish for the future. Use "Spero che…" or ' +
          '"Mi auguro che…" followed by the present subjunctive (for a present/future hope).',
        exampleAnswer:
          'Mi auguro che le nuove generazioni crescano in una società più aperta e più equa — ' +
          'e che vedano la diversità come una forza e non come un problema.',
        notes:
          'This rounds off the sequence-of-tenses contrast: imperfect subj. (past wishes) → ' +
          'pluperfect subj. (past regrets) → present subj. (present/future hopes). ' +
          'The full arc is the lesson.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Grammar in service of meaning',
        prompt:
          'Which of the three prompts felt most natural to you? Which felt most difficult? ' +
          'Answer in Italian if you can.',
        notes:
          'Close on a metacognitive note. The aim is to build a learner who monitors their own production.',
      },
    ],
  },

  // ─── 10. Vocabulary review ────────────────────────────────────────────────
  {
    slug: 'cap18-vocab-review-societa-valori',
    title: 'Vocabolario in azione — società e valori',
    lessonType: LessonType.vocabulary_review,
    level: CEFRLevel.advanced,
    summary:
      'An active review of the full cap-18 vocabulary: multicultural society terms and shared values, ' +
      'including the tricky pairs (immigrato / emigrato; uguaglianza / equità; tolleranza / ' +
      'accettazione), with production exercises that go beyond passive recognition.',
    objectiveSkillSlugs: ['it-vocab-multicultural', 'it-vocab-values'],
    defaultDurationMinutes: 11,
    compatibleThemes: ['politics', 'news', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Active vs passive vocabulary',
        prompt:
          'Recognising a word is one thing; producing it in the right context is another. ' +
          'This review pushes you past recognition — you’ll need to choose, produce, and explain ' +
          'the vocabulary of this chapter.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Tricky pair: tolleranza vs accettazione',
        prompt:
          'Which word fits better? "Non mi basta la ___ — voglio essere davvero parte di questa città." ' +
          '(A) tolleranza  (B) accettazione',
        exampleAnswer:
          'B — accettazione. Tolleranza suggests mere putting-up-with; accettazione implies genuine recognition. ' +
          'The speaker is expressing a desire for the deeper form.',
        notes: 'This is an advanced nuance — praise learners who choose correctly and explain why.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Production: full sentence',
        prompt:
          'Translate into Italian: "Belonging to a community does not depend on paperwork alone — ' +
          'it grows from shared experiences and mutual respect."',
        exampleAnswer:
          'L’appartenenza a una comunità non dipende solo dalla burocrazia — nasce dalle esperienze ' +
          'condivise e dal rispetto reciproco.',
        notes: 'Target appartenenza, condivise, and rispetto reciproco as high-value items.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Values in a paragraph',
        prompt:
          'Complete the passage with words from the chapter: ' +
          '"La ___ (solidarity) è il fondamento di ogni ___ (community) sana. Senza ___ (respect) ' +
          'reciproco, anche la più ricca ___ (diversity) culturale rischia di diventare fonte di conflitto."',
        exampleAnswer: 'solidarietà … comunità … rispetto … diversità',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Your own context',
        prompt:
          'Choose any three words from today’s review and use them in a single, connected sentence ' +
          'about a place you know or a community you belong to.',
        notes:
          'Forces synthesis rather than isolated retrieval. Accept any sentence that uses three ' +
          'chapter-vocabulary items correctly in a coherent, contextualised way.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Self-quiz: ten words cold',
        prompt:
          'Without looking: give the Italian for integration, prejudice, coexistence, hospitality, ' +
          'solidarity, equality, citizenship, belonging, foreigner, human rights.',
        exampleAnswer:
          'l’integrazione, il pregiudizio, la convivenza, l’accoglienza, la solidarietà, ' +
          'l’uguaglianza, la cittadinanza, l’appartenenza, lo straniero, i diritti umani',
      },
    ],
  },

  // ─── 11. Progress check ───────────────────────────────────────────────────
  {
    slug: 'cap18-progress-check',
    title: 'Capitolo 18 — progress check',
    lessonType: LessonType.progress_check,
    level: CEFRLevel.advanced,
    summary:
      'A mixed checkpoint across the full chapter: imperfect subjunctive forms, pluperfect ' +
      'subjunctive, sequence-of-tenses choices, a third conditional, and core vocabulary. ' +
      'See what has solidified and what still needs a second pass.',
    objectiveSkillSlugs: [
      'it-congiuntivo-imperfetto',
      'it-congiuntivo-trapassato',
      'it-congiuntivo-sequence',
      'it-vocab-multicultural',
      'it-vocab-values',
    ],
    defaultDurationMinutes: 14,
    compatibleThemes: ['politics', 'news', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Low-stakes checkpoint',
        prompt:
          'This is a check, not a test. Five questions across the chapter’s grammar and vocabulary. ' +
          'Be honest about what you know and what you don’t — that’s the information that makes the ' +
          'next lesson more useful.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Imperfect subjunctive after a past main clause',
        prompt:
          'Complete: "L’associazione sperava che i nuovi arrivati ___ (trovare) subito una sistemazione."',
        exampleAnswer: 'trovassero',
      },
      {
        taskType: TaskType.tense_selection,
        focus: 'Sequence of tenses: four-cell choice',
        prompt:
          'Which is correct? "È fondamentale che la scuola ___ le diversità culturali." ' +
          '(A) valorizzasse  (B) valorizzi  (C) abbia valorizzato',
        exampleAnswer:
          'B — valorizzi. Present main clause + simultaneous action → present subjunctive.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Third conditional',
        prompt:
          'Complete: "Se il comune ___ (investire) prima nei servizi di mediazione culturale, ' +
          'molti conflitti ___ (evitare, essere)."',
        exampleAnswer:
          'Se il comune avesse investito prima nei servizi di mediazione culturale, ' +
          'molti conflitti sarebbero stati evitati.',
        notes: 'Passive past conditional in the result clause — marks a high-level response.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Mixed grammar + vocabulary',
        prompt:
          'Translate: "It seemed strange to me that nobody had mentioned the issue of citizenship."',
        exampleAnswer:
          'Mi sembrava strano che nessuno avesse menzionato il tema della cittadinanza.',
        notes:
          'Past main clause + prior action → pluperfect subjunctive. Tests both grammar and vocabulary.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assessment',
        prompt:
          'Which of the three grammar topics — congiuntivo imperfetto, congiuntivo trapassato, ' +
          'or correlazione dei tempi — do you feel least confident with? What would help most?',
        notes:
          'Feeds directly into the lesson recommendation engine. Praise the learner for any honest, ' +
          'thoughtful answer regardless of accuracy in earlier tasks.',
      },
    ],
  },
];

export default { unitCode, lessons };
