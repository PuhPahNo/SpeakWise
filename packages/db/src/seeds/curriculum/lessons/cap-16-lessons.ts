// Additional lesson templates for Capitolo 16 — Politica e società.
//
// These EXTEND the five templates authored inline in units/cap-16-politica-e-societa.ts.
// The index merges both. This file follows the same rules as the exemplar cap-05-lessons.ts:
// original content; every in-string apostrophe is the curly ' (U+2019); slugs are globally
// unique and must not collide with the inline template slugs from the unit file
// (cap16-present-subjunctive-forms, cap16-triggers-opinion-vs-certainty,
// cap16-past-subjunctive-reactions, cap16-political-debate, cap16-vocab-government-society);
// objectives reference real skill slugs from this or an earlier chapter.

import { CEFRLevel, LessonType, TaskType } from '@prisma/client';
import type { SeedLessonTemplate } from '../types';

export const unitCode = 'cap-16';

const lessons: SeedLessonTemplate[] = [
  // ─── 1. Per-skill drill: regular present subjunctive endings ────────────────
  {
    slug: 'cap16-drill-subjunctive-endings',
    title: 'Parli, prenda, capisca — the three ending sets',
    lessonType: LessonType.grammar,
    level: CEFRLevel.advanced,
    summary:
      'A focused drill on the three regular present-subjunctive paradigms (-are, -ere/-ire, -isco) ' +
      'so the endings become automatic before you tackle the high-frequency irregulars.',
    objectiveSkillSlugs: ['it-congiuntivo-presente'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['politics', 'news', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Three paradigms, one key quirk',
        prompt:
          '-are: parli / parli / parli / parliamo / parliate / parlino. ' +
          '-ere/-ire: prenda / prenda / prenda / prendiamo / prendiate / prendano. ' +
          '-isco: capisca / capisca / capisca / capiamo / capiate / capiscano. ' +
          'The defining quirk: io, tu, and lui/lei always share one identical form — context or a pronoun tells them apart.',
        notes:
          'Show the three grids side by side. Circle the three identical singular forms in each to make the pattern unmissable.',
      },
      {
        taskType: TaskType.conjugation,
        focus: '-are verb in full',
        prompt: 'Conjugate "votare" in the congiuntivo presente for all six persons.',
        exampleAnswer: 'voti / voti / voti / votiamo / votiate / votino',
        notes: 'Votare is thematically perfect for politics; use it as the anchor -are model.',
      },
      {
        taskType: TaskType.conjugation,
        focus: '-ere and -isco verbs',
        prompt:
          'Give the loro form of the congiuntivo presente for: ricevere, decidere, capire, finire.',
        exampleAnswer: 'ricevano / decidano / capiscano / finiscano',
        notes: 'Flag that capire inserts -isc- in the same persons as the indicative.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Paradigm in a political sentence',
        prompt:
          'Complete: "È importante che i deputati ___ (ascoltare) i cittadini e che il parlamento ' +
          '___ (decidere) entro la fine della settimana."',
        exampleAnswer: 'ascoltino / decida',
        notes: 'Two different paradigms in one realistic sentence.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Check the key feature',
        prompt:
          'Without looking: what are the io, tu, and lui/lei congiuntivo forms of "parlare"? ' +
          'Why do all three look the same?',
      },
    ],
  },

  // ─── 2. Per-skill drill: high-frequency irregular subjunctives ───────────────
  {
    slug: 'cap16-drill-irregular-subjunctives',
    title: 'Sia, abbia, faccia, vada — the irreplaceable irregulars',
    lessonType: LessonType.grammar,
    level: CEFRLevel.advanced,
    summary:
      'Drill the nine most essential irregular congiuntivo presente forms until they come out ' +
      'automatically: essere, avere, fare, andare, potere, volere, sapere, venire, dire.',
    objectiveSkillSlugs: ['it-congiuntivo-presente'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['politics', 'news', 'culture', 'business'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Nine forms worth memorising',
        prompt:
          'These verbs are too common to guess from a rule. Learn the lui/lei form first — ' +
          'all six persons follow the same root: essere → sia, avere → abbia, fare → faccia, ' +
          'andare → vada, potere → possa, volere → voglia, sapere → sappia, venire → venga, dire → dica.',
        notes:
          'Present the nine in a quick-reference table. Learner should write them out once before drilling.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Identify the correct irregular form',
        prompt:
          'Penso che il primo ministro ___ in grado di formare un governo. ' +
          'Choose: (a) può  (b) possa  (c) puoi',
        exampleAnswer: '(b) possa — congiuntivo presente of potere',
        notes:
          'Option (a) is indicative, (c) is second-person indicative. Both are common mistakes.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Irregulars in political sentences',
        prompt:
          'Complete each sentence: ' +
          '"Credo che il senato ___ (fare) una votazione domani." ' +
          '"Spero che tutti i candidati ___ (dire) la verità durante il dibattito." ' +
          '"È fondamentale che i giovani ___ (venire) a votare."',
        exampleAnswer: 'faccia / dicano / vengano',
        notes:
          'Three different irregular roots in one pass. Flag the noi/voi/loro distinction: ' +
          'the plural forms lengthen from the singular root (faccia → facciamo/facciate/facciano).',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Wrong irregular form',
        prompt:
          'Fix: "È importante che ogni cittadino sappia i propri diritti." ' +
          'Wait — is it correct or not? Explain.',
        exampleAnswer:
          '"sappia" is correct here. È importante che + subjunctive: sappia (lui/lei) is the right irregular form.',
        notes:
          'Use a "trick" correct sentence occasionally so the learner cannot just auto-correct — ' +
          'they must analyse, not pattern-match.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Produce irregulars spontaneously',
        prompt:
          'Tell me two things you hope the government does — and two things you think citizens should do. ' +
          'Each sentence must contain a different irregular congiuntivo.',
        notes:
          'Target: spero che + vada/faccia/possa/voglia and penso che/è importante che + sappia/venga/dica. ' +
          'Praise each correct irregular warmly.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The nine at speed',
        prompt:
          'Quick fire: give the congiuntivo presente (lui/lei) for essere, avere, fare, andare, potere.',
        exampleAnswer: 'sia / abbia / faccia / vada / possa',
      },
    ],
  },

  // ─── 3. Per-skill drill: subjunctive triggers vs indicative (penso vs so che) ─
  {
    slug: 'cap16-drill-triggers-contrast',
    title: 'Penso che vs So che — choose your mood',
    lessonType: LessonType.grammar,
    level: CEFRLevel.advanced,
    summary:
      'A targeted drill on the binary choice: does this main-clause verb demand the subjunctive ' +
      'or the indicative? Dozens of rapid-fire switches to lock the distinction in.',
    objectiveSkillSlugs: ['it-congiuntivo-triggers', 'it-congiuntivo-presente'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['politics', 'news', 'history'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'The two-camp model',
        prompt:
          'Subjunctive triggers: penso / credo / ritengo / dubito / spero / voglio / ' +
          'ho paura / mi dispiace / sembra / è possibile / bisogna / è importante / è strano. ' +
          'Indicative triggers: so / è vero / è certo / è ovvio / vedo / è chiaro. ' +
          'Test: can you replace the verb with "I believe"? If yes → subjunctive. If "I know" fits → indicative.',
        notes:
          'The "believe vs know" heuristic is imperfect but fast. Introduce it as a first pass, not the full rule.',
      },
      {
        taskType: TaskType.tense_selection,
        focus: 'Rapid mood choice',
        prompt:
          'Choose indicative or subjunctive for each gap: ' +
          '"So che il voto ___ (avere) luogo domenica." ' +
          '"Penso che la partecipazione ___ (essere) bassa quest’anno." ' +
          '"È ovvio che la corruzione ___ (danneggiare) l’economia."',
        exampleAnswer:
          'ha luogo (indicative — so che); sia bassa (subjunctive — penso che); danneggia (indicative — è ovvio che)',
        notes:
          'Three different main-clause types in one item; go through each correction explicitly.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Recast certainty as opinion',
        prompt:
          'Start with: "So che il governo ha approvato la legge." ' +
          'Now rewrite it as: "Credo che il governo ___."',
        exampleAnswer: 'Credo che il governo abbia approvato la legge.',
        notes:
          'The shift from indicative ha approvato to subjunctive abbia approvato in one step. ' +
          'This is congiuntivo passato territory — a natural bridge to the next skill.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Both options are grammatical — which is which?',
        prompt:
          '"È vero che i giovani ___ meno di prima." — è vero che takes: ' +
          '(a) votano  (b) votino',
        exampleAnswer: '(a) votano — indicative after è vero che',
        notes:
          'Many learners hypercorrect and use the subjunctive after è vero che; this item targets that exact trap.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Name your triggers',
        prompt:
          'Without looking: name three verbs that always trigger the subjunctive and two that always take the indicative.',
      },
    ],
  },

  // ─── 4. Per-skill drill: past subjunctive (reacting to news) ────────────────
  {
    slug: 'cap16-drill-past-subjunctive',
    title: 'Abbia vinto, sia partita — forming the past subjunctive',
    lessonType: LessonType.grammar,
    level: CEFRLevel.advanced,
    summary:
      'Build the congiuntivo passato from the ground up — forming auxiliaries abbia/sia, selecting ' +
      'the correct past participle, and applying agreement — then use it to react to political news.',
    objectiveSkillSlugs: ['it-congiuntivo-passato'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['politics', 'news', 'history'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Formula: congiuntivo of avere/essere + participle',
        prompt:
          'Past subjunctive = congiuntivo of the auxiliary + past participle. ' +
          'With avere verbs: che abbia parlato / abbiano parlato. ' +
          'With essere verbs: che sia andato/a / siano andati/e. ' +
          'Agreement works exactly like the passato prossimo — only the auxiliary mood changes.',
        notes:
          'Anchor the formula in what learners already know: same participle, new auxiliary mood.',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'Build the forms',
        prompt:
          'Give the congiuntivo passato for: ' +
          'votare (io, loro) — vincere (lei, noi) — uscire (lui, voi).',
        exampleAnswer:
          'abbia votato / abbiano votato — abbia vinto / abbiamo vinto — sia uscito / siate usciti/e',
        notes:
          'Flag the uscire agreement trap: sia uscito vs sia uscita depending on the referent.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'React to election news',
        prompt:
          'A new prime minister was announced last night. Complete: ' +
          '"Sono sorpreso/a che un candidato così giovane ___ (vincere) le primarie." ' +
          '"Mi fa piacere che il partito di opposizione ___ (ottenere) più seggi."',
        exampleAnswer: 'abbia vinto / abbia ottenuto',
        notes:
          'Two different emotion-verb triggers with the congiuntivo passato. The context is realistic and motivating.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Translate a reaction',
        prompt: 'Translate: "It’s strange that the president hasn’t spoken yet about the new law."',
        exampleAnswer: 'È strano che il presidente non abbia ancora parlato della nuova legge.',
        notes:
          'The negation non + ancora inside the subjunctive clause is a common structure in news commentary.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Present vs past subjunctive contrast',
        prompt:
          'Finish both sentences: ' +
          '"Penso che il ministro ___ una dichiarazione domani." (present — future action) ' +
          '"Penso che il ministro ___ una dichiarazione ieri." (past action)',
        exampleAnswer: 'faccia / abbia fatto',
      },
    ],
  },

  // ─── 5. Error-correction clinic ─────────────────────────────────────────────
  {
    slug: 'cap16-clinic-subjunctive-errors',
    title: 'Congiuntivo clinic: catch the four classic mistakes',
    lessonType: LessonType.grammar,
    level: CEFRLevel.advanced,
    summary:
      'A targeted clinic on the errors every English speaker makes with the Italian subjunctive: ' +
      'indicative after a trigger verb, wrong irregular form, missing present vs past distinction, ' +
      'and subjunctive after a certainty verb.',
    objectiveSkillSlugs: [
      'it-congiuntivo-presente',
      'it-congiuntivo-triggers',
      'it-congiuntivo-passato',
    ],
    defaultDurationMinutes: 11,
    compatibleThemes: ['politics', 'news', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'The four traps',
        prompt:
          'Trap 1 — indicative after a trigger: "Penso che è importante." ' +
          'Trap 2 — wrong irregular: "Credo che vada → vadano (plural)." ' +
          'Trap 3 — present when past is needed: "Sono contento che vinca ieri." ' +
          'Trap 4 — subjunctive after a certainty verb: "So che sia vero." ' +
          'We’ll fix all four.',
        notes: 'Frame as a "clinic", not a test. The goal is pattern recognition, not shame.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Indicative after a trigger verb',
        prompt: 'Fix: "Penso che la situazione economica è migliorata negli ultimi anni."',
        exampleAnswer: 'Penso che la situazione economica sia migliorata negli ultimi anni.',
        notes:
          'The fix requires shifting è to sia — a move from indicative to congiuntivo passato. ' +
          'Explain both the mood shift and why congiuntivo passato is needed (past reference).',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Wrong irregular form',
        prompt:
          'Fix: "È importante che tutti i cittadini vadono a votare." (Hint: check the plural)',
        exampleAnswer: 'È importante che tutti i cittadini vadano a votare.',
        notes:
          '"Vadono" is a hyper-regular error — learners apply regular -ano endings to andare. ' +
          'The correct irregular plural is vadano.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Present subjunctive used for a past event',
        prompt: 'Fix: "Mi sorprende che il candidato vinca le elezioni la settimana scorsa."',
        exampleAnswer: 'Mi sorprende che il candidato abbia vinto le elezioni la settimana scorsa.',
        notes:
          '"La settimana scorsa" signals a past event; the congiuntivo passato (abbia vinto) is required.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Subjunctive after a certainty verb',
        prompt: 'Fix: "È ovvio che la democrazia sia il sistema più diffuso al mondo."',
        exampleAnswer: 'È ovvio che la democrazia è il sistema più diffuso al mondo.',
        notes:
          '"È ovvio che" belongs to the certainty camp — the indicative è is correct. ' +
          'Contrast this immediately with "Sembra che la democrazia sia…" to reinforce the distinction.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Name each trap',
        prompt: 'In one sentence each: describe the four errors this clinic just covered.',
      },
    ],
  },

  // ─── 6. Scenario roleplay: respectful debate ────────────────────────────────
  {
    slug: 'cap16-roleplay-university-forum',
    title: 'Forum universitario — express and defend a position',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.advanced,
    summary:
      'You are at a student forum in Rome. The topic: housing costs for young people. ' +
      'Express your view, respond to a counter-argument with courtesy, and close with a balanced conclusion — ' +
      'all in formal Italian using the congiuntivo.',
    objectiveSkillSlugs: [
      'it-congiuntivo-presente',
      'it-congiuntivo-triggers',
      'it-vocab-politics',
      'it-vocab-social-issues',
    ],
    defaultDurationMinutes: 13,
    compatibleThemes: ['politics', 'news', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Scene and register',
        prompt:
          'You are speaking at a student forum at La Sapienza in Rome. The motion: ' +
          '"I prezzi degli affitti nelle grandi città siano un problema che lo Stato deve affrontare." ' +
          'Speak formally (lei form with the moderator, noi for the group). ' +
          'Use penso/credo/ritengo che + subjunctive to frame every opinion.',
        notes:
          'Adapt the housing topic if the learner has signalled interest in another social issue. ' +
          'Housing, digital access, and healthcare all work well. Keep it balanced.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Opening position',
        prompt:
          'State your position in 3–4 sentences. Include: one opinion trigger + subjunctive, ' +
          'one piece of social-issues vocabulary, and one impersonal expression (è necessario che / bisogna che).',
        notes:
          'Assess: correct congiuntivo use is the priority. Praise fluency and vocabulary range. ' +
          'Gentle correction for any indicative intrusion after a trigger.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Handle a counter-argument politely',
        prompt:
          'Another speaker says: "Penso che il mercato privato debba regolarsi da solo — ' +
          'l’intervento dello Stato crea più problemi di quanti ne risolva." ' +
          'Acknowledge the point, then disagree with a subjunctive clause.',
        exampleAnswer:
          'Capisco che tu abbia questa preoccupazione, ma non credo che il mercato da solo ' +
          'possa garantire prezzi accessibili per tutti. Penso che sia necessario un equilibrio.',
        notes:
          'Model the courtesy moves: "Capisco il tuo punto, tuttavia…", "È vero che… però…". ' +
          'These phrase patterns are hallmarks of educated Italian debate.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Close with a balanced statement',
        prompt:
          'Complete the closing remark: "Sono convinto/a che la questione degli affitti ___ (richiedere) ' +
          'una risposta collettiva e che lo Stato e i privati ___ (dovere) collaborare."',
        exampleAnswer:
          'Sono convinto/a che la questione degli affitti richieda una risposta collettiva ' +
          'e che lo Stato e i privati debbano collaborare.',
        notes: 'Two subjunctives in a single coordinated clause — a target structure at C1 level.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assessment',
        prompt:
          'Which phrase from this roleplay could you use the next time you share an opinion in Italian?',
        notes:
          'Encourage the learner to note one sentence. Personal investment in a phrase boosts retention.',
      },
    ],
  },

  // ─── 7. Scenario roleplay: react to a news headline ─────────────────────────
  {
    slug: 'cap16-roleplay-headline-reaction',
    title: 'Ha visto la notizia? — reacting to a headline',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.advanced,
    summary:
      'An Italian colleague shows you three newspaper headlines. You react to each one using the ' +
      'congiuntivo passato and emotion verbs — the natural language of news commentary in Italian.',
    objectiveSkillSlugs: ['it-congiuntivo-passato', 'it-congiuntivo-triggers', 'it-vocab-politics'],
    defaultDurationMinutes: 12,
    compatibleThemes: ['politics', 'news', 'history'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'The news-reaction pattern',
        prompt:
          'In Italian, reacting to news uses: ' +
          '"Sono contento/a che… abbia/sia…" (glad a past thing happened) ' +
          '"Mi sorprende che… non abbia/sia…" (surprised it didn’t happen) ' +
          '"È strano che… abbiano/siano…" (strange that they did). ' +
          'The action is always in the past → congiuntivo passato.',
        notes:
          'Prime the learner with a brief review of congiuntivo passato auxiliaries before the roleplay tasks.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'React to headline 1',
        prompt:
          'Headline: "Il Parlamento ha approvato una riforma del mercato del lavoro." ' +
          'React in two sentences: one with a positive emotion verb, one with a doubt or caveat.',
        exampleAnswer:
          'Sono contento/a che il parlamento abbia finalmente approvato questa riforma. ' +
          'Tuttavia non sono sicuro/a che la riforma abbia preso in considerazione tutte le categorie.',
        notes: 'Two registers — glad + cautious — in the same response.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'React to headline 2',
        prompt:
          'Headline: "Il tasso di disoccupazione giovanile è salito al ventotto per cento." ' +
          'Express concern and an opinion about what should have happened differently.',
        exampleAnswer:
          'Mi dispiace molto che la situazione sia peggiorata. ' +
          'Penso che il governo avrebbe dovuto investire di più nella formazione professionale.',
        notes:
          'Accept any grammatically correct congiuntivo passato. The conditional "avrebbe dovuto" is a natural extension — note it but do not require it.',
      },
      {
        taskType: TaskType.translation,
        focus: 'React to headline 3',
        prompt:
          'Headline: "Migliaia di cittadini hanno manifestato per i diritti civili." ' +
          'Translate your reaction: "I’m proud that so many people have taken to the streets."',
        exampleAnswer: 'Sono orgoglioso/a che così tante persone siano scese in piazza.',
        notes:
          'Scendere in piazza takes essere — participle agreement applies. ' +
          'orgoglioso/a is a useful emotion adjective worth flagging.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The formula in plain terms',
        prompt:
          'In one sentence: why do we use the congiuntivo passato in news reactions rather than the congiuntivo presente?',
      },
    ],
  },

  // ─── 8. Listening challenge: fact vs opinion ────────────────────────────────
  {
    slug: 'cap16-listening-opinion-clip',
    title: 'È un fatto o un’opinione? — listening for mood signals',
    lessonType: LessonType.listening_challenge,
    level: CEFRLevel.advanced,
    summary:
      'Listen to a short opinion segment — an Italian commentator discusses a social issue. ' +
      'Train your ear to catch the subjunctive triggers and distinguish what the speaker knows ' +
      'for certain from what they believe or hope.',
    objectiveSkillSlugs: ['it-congiuntivo-triggers', 'it-congiuntivo-presente'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['politics', 'news', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'What to listen for',
        prompt:
          'As you listen, note: (1) When does the speaker use penso/credo/spero/sembra? ' +
          '(2) When does the speaker use so/è vero/è chiaro? ' +
          '(3) Does the verb after each trigger sound like an indicative or a subjunctive?',
        notes:
          'The engine should generate a 60–90-second scripted audio clip: a commentator ' +
          'discussing youth employment. Include at least three opinion triggers and two certainty statements.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Catch the main claim',
        prompt:
          'What is the speaker’s main opinion about youth employment? ' +
          'Which verb phrase introduced it — a subjunctive trigger or a certainty verb?',
        notes:
          'Script note: main claim should be introduced with "Penso che" or "Ritengo che" followed by a subjunctive.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Fact or opinion?',
        prompt:
          'The speaker says: "So che il tasso di disoccupazione giovanile è superiore al venti per cento." ' +
          'Is this a fact statement or an opinion? Which mood was used after "so che"?',
        exampleAnswer: 'Fact statement — so che takes the indicative (è), not the subjunctive.',
        notes: 'Contrast with a parallel opinion sentence the speaker also used.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Count the subjunctive triggers',
        prompt: 'How many subjunctive-trigger phrases did you catch in the clip? List them.',
        notes:
          'Script should contain 3–4 triggers. Accept any three. The goal is attunement, not perfection.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Aural pattern recognition',
        prompt:
          'When you hear "sembra che" in Italian news, what do you expect the next verb form to be?',
      },
    ],
  },

  // ─── 9. Speaking challenge: express your view ───────────────────────────────
  {
    slug: 'cap16-speaking-my-view',
    title: 'La mia opinione — speak your mind in Italian',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.advanced,
    summary:
      'Choose a social or civic issue you genuinely care about and express a balanced, reasoned ' +
      'view in Italian — using the congiuntivo throughout. The goal is fluent, confident opinion-giving ' +
      'in a second language, not any particular political stance.',
    objectiveSkillSlugs: [
      'it-congiuntivo-presente',
      'it-congiuntivo-triggers',
      'it-vocab-social-issues',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['politics', 'news', 'culture', 'history'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Your topic, your voice',
        prompt:
          'Pick an issue you care about — it can be local, national, or global. ' +
          'You’ll speak for about two minutes, stating your view and acknowledging another perspective. ' +
          'Wise coaches the language; all positions are equally valid here.',
        notes:
          'Offer a menu of topics if the learner is unsure: housing costs, public transport, digital privacy, ' +
          'education access, or environmental policy. Keep suggestions fully neutral.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'State your position',
        prompt:
          'In 3–5 sentences, explain what you think about the issue. ' +
          'Use at least two different subjunctive triggers (e.g. penso che, è importante che, spero che).',
        notes:
          'Primary coaching target: correct congiuntivo after each trigger. ' +
          'Secondary: vocabulary range (use at least one term from it-vocab-social-issues).',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Acknowledge the other side',
        prompt:
          'Now say one thing that supporters of the opposite view believe. ' +
          'Start with: "Capisco che molte persone pensino che…" or "C’è chi ritiene che…"',
        exampleAnswer:
          'Capisco che molte persone pensino che lo Stato non debba intervenire in questa materia.',
        notes:
          'This structure — acknowledging an opposing view — is a hallmark of advanced Italian discourse. ' +
          'pensino is the congiuntivo of pensare; debba is the irregular congiuntivo of dovere.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Close with a balanced conclusion',
        prompt:
          'End with a sentence that balances both views, using "Tuttavia penso che…" or "Nel complesso, ritengo che…"',
        notes:
          'Target: a well-formed congiuntivo sentence with discourse connectors. ' +
          'Praise any attempt to synthesise — this is C1-level pragmatic competence.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Language check',
        prompt:
          'Which subjunctive form did you find hardest to produce spontaneously? ' +
          'Which trigger phrase felt most natural?',
        notes: 'Metacognitive close. Helps Wise calibrate what to recycle in the next session.',
      },
    ],
  },

  // ─── 10. Vocabulary review: government and social issues ────────────────────
  {
    slug: 'cap16-vocab-review-deep',
    title: 'Dal parlamento alla piazza — vocabulary in depth',
    lessonType: LessonType.vocabulary_review,
    level: CEFRLevel.advanced,
    summary:
      'A deeper pass over the government and social-issues word banks: derivations, collocations, ' +
      'common confusions, and the vocabulary pairs that trip up even advanced learners.',
    objectiveSkillSlugs: ['it-vocab-politics', 'it-vocab-social-issues'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['politics', 'news', 'culture', 'history'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Two clusters, many connections',
        prompt:
          'The politics cluster (parlamento, governo, elezioni, legge, cittadino) and the social-issues ' +
          'cluster (disoccupazione, povertà, diritti, sciopero, manifestazione) overlap in real Italian journalism. ' +
          'Today we focus on word families, collocations, and the tricky pairs.',
        notes:
          'Prime with a quick mental map: institution words vs process words vs value words. ' +
          'This activates schema and makes new collocations stick faster.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Tricky pair: giustizia vs tribunale',
        prompt: '"Il caso è arrivato in ___." — Which fits: la giustizia or il tribunale?',
        exampleAnswer:
          'il tribunale — the court (institution). La giustizia refers to the concept of justice, not the building.',
        notes: 'Follow up: "L’Italia ha un sistema di ___ a tre gradi" → giustizia (the system).',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Verb-noun collocations',
        prompt:
          'Match each verb to its noun: indire / approvare / manifestare / rispettare / ridurre. ' +
          'Nouns: la legge / le elezioni / i diritti / la povertà / contro una decisione.',
        exampleAnswer:
          'indire le elezioni / approvare la legge / manifestare contro una decisione / rispettare i diritti / ridurre la povertà',
        notes: 'Collocation knowledge is a strong predictor of advanced fluency. Spend time here.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Word family: lo sciopero',
        prompt:
          'Translate: "The trade unions decided to call a general strike against the new tax law."',
        exampleAnswer:
          'I sindacati hanno deciso di indire uno sciopero generale contro la nuova legge fiscale.',
        notes:
          'Legge fiscale (tax law) is a useful compound. Fiscale derives from il fisco (revenue authority).',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Use it in context',
        prompt:
          'In two or three sentences, describe what you know about a social issue in your own country — ' +
          'using at least four vocabulary items from this chapter.',
        notes:
          'Personalisation is key. If the learner has mentioned a home country, seed the prompt accordingly.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Fast recall',
        prompt:
          'Give the Italian for: democracy / the vote / poverty / the strike / rights / a demonstration.',
        exampleAnswer:
          'la democrazia / il voto / la povertà / lo sciopero / i diritti / la manifestazione',
      },
    ],
  },

  // ─── 11. Progress check ─────────────────────────────────────────────────────
  {
    slug: 'cap16-progress-check',
    title: 'Capitolo 16 checkpoint — il congiuntivo e la politica',
    lessonType: LessonType.progress_check,
    level: CEFRLevel.advanced,
    summary:
      'A mixed check across the whole chapter: present subjunctive forms (including irregulars), ' +
      'trigger vs indicative choice, past subjunctive, and politics/social-issues vocabulary. ' +
      "See what's solid and what to revisit.",
    objectiveSkillSlugs: [
      'it-congiuntivo-presente',
      'it-congiuntivo-triggers',
      'it-congiuntivo-passato',
      'it-vocab-politics',
      'it-vocab-social-issues',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['politics', 'news', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Low-stakes check',
        prompt:
          "Five quick questions covering the whole chapter. No pressure — the goal is to see what's " +
          'settled and what still needs a revisit.',
        notes: 'Keep the tone encouraging. Frame incorrect answers as data, not failures.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Irregular congiuntivo form',
        prompt:
          '"È importante che il governo ___ una soluzione al problema della disoccupazione." ' +
          'Choose: (a) trova  (b) trovi  (c) trovasse',
        exampleAnswer: '(b) trovi — regular -are congiuntivo presente after è importante che',
        notes:
          '(a) is indicative, (c) is congiuntivo imperfetto (cap-18 territory). This tests both trigger and form.',
      },
      {
        taskType: TaskType.tense_selection,
        focus: 'Trigger vs certainty',
        prompt:
          'Two sentences — choose the correct form for each: ' +
          '"Credo che la democrazia ___ (essere) fragile senza partecipazione." ' +
          '"È certo che la costituzione ___ (entrare) in vigore nel 1948."',
        exampleAnswer: 'sia (subjunctive — credo che); è entrata (indicative — è certo che)',
        notes:
          'Two contrasting triggers in one item. The indicative in the second sentence is the passato prossimo.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Past subjunctive in context',
        prompt:
          'Complete: "Sono contento/a che il candidato che preferivo ___ (vincere) le elezioni."',
        exampleAnswer: 'Sono contento/a che il candidato che preferivo abbia vinto le elezioni.',
        notes:
          'Tests: past reference inside an emotion-verb trigger → congiuntivo passato with avere.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Politics + subjunctive combined',
        prompt:
          'Translate: "I hope the parliament has already approved the law on workers\' rights."',
        exampleAnswer:
          'Spero che il parlamento abbia già approvato la legge sui diritti dei lavoratori.',
        notes:
          'Combines spero che (trigger), congiuntivo passato (abbia approvato), and politics/social vocab.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assessment',
        prompt:
          'Of the three subjunctive skills — forming it, choosing when to use it, and choosing present vs past — ' +
          'which feels most automatic now? Which do you want to practise more?',
        notes: 'Route the learner back to the relevant drill lesson based on their answer.',
      },
    ],
  },
];

export default { unitCode, lessons };
