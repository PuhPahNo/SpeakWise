// Additional lesson templates for Capitolo 9 — Sentirsi bene.
//
// These EXTEND the templates authored inline in units/cap-09-sentirsi-bene.ts
// (the index merges both). Per-skill drills, an error clinic, scenario
// roleplays, listening/speaking challenges, a vocabulary review, and a
// progress check — giving learners a full menu of lesson designs for the
// body, health, comparatives, superlatives, and irregular forms.
//
// Rules mirror SPEC.md: original content; every in-string apostrophe is the
// curly ' (U+2019); slugs are globally unique and must not collide with the
// inline template slugs in the unit file.

import { CEFRLevel, LessonType, TaskType } from '@prisma/client';
import type { SeedLessonTemplate } from '../types';

export const unitCode = 'cap-09';

const lessons: SeedLessonTemplate[] = [
  // ── 1. Per-skill drill: stressed pronouns after prepositions ────────────────
  {
    slug: 'cap09-drill-stressed-pronouns-prepositions',
    title: 'After the preposition: me, te, lui…',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'Focused reps on the one trigger that always demands a tonic pronoun: any preposition. ' +
      'Drill per, con, da, secondo, and di (in comparisons) until the switch from mi/ti to me/te ' +
      'is automatic.',
    objectiveSkillSlugs: ['it-stressed-pronouns'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['family', 'culture', 'sports'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The preposition trigger',
        prompt:
          'Simple rule: any time a pronoun follows a preposition, you must switch to the tonic ' +
          'form. Per me, con te, da lui, secondo lei, senza noi — never "per mi" or "con ti".',
        notes: 'Write the full table (me/te/lui/lei/sé/noi/voi/loro) alongside the rule.',
      },
      {
        taskType: TaskType.pronoun_replacement,
        focus: 'Fix the preposition + pronoun',
        prompt:
          'Replace each incorrect form: "Questo è per ti." / "Viene con io." / "Parla sempre di tu."',
        exampleAnswer: 'per te; con me; di te',
        notes: 'Flag the exact preposition each time so the trigger stays salient.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Produce the tonic after various prepositions',
        prompt:
          'Complete: "Senza ___ (you, sg.) non riesco a finire il lavoro." / ' +
          '"Secondo ___ (him), il nuovo farmaco è migliore." / ' +
          '"Ha fatto tutto da ___ (herself)."',
        exampleAnswer: 'te; lui; sé',
        notes: 'The third item targets da sé — flag the accent on sé.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Contrastive emphasis',
        prompt:
          'Fix: "Il regalo è per io, non per tu — capisce?" ' + '(Two errors in one sentence.)',
        exampleAnswer: 'Il regalo è per me, non per te — capisce?',
      },
      {
        taskType: TaskType.recap,
        focus: 'One-line rule',
        prompt:
          'Complete the rule: "After any preposition, replace mi → ___, ti → ___, gli → ___, ' +
          'ci → ___."',
        exampleAnswer: 'me; te; lui (or lei); noi',
      },
    ],
  },

  // ── 2. Per-skill drill: comparatives di vs che ──────────────────────────────
  {
    slug: 'cap09-drill-di-vs-che',
    title: 'Di or che? — the comparison decision',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'The single most common error in Italian comparatives: choosing between di and che. ' +
      'This drill builds the two-question test until the right word comes automatically.',
    objectiveSkillSlugs: ['it-comparatives', 'it-stressed-pronouns'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['sports', 'food', 'travel', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The two-question test',
        prompt:
          'Ask yourself: (1) Am I comparing two DIFFERENT people or things? → use di. ' +
          '(2) Am I comparing two QUALITIES, VERBS, or NOUNS about the SAME subject? → use che. ' +
          '"Roma è più grande di Milano" — two cities → di. ' +
          '"Roma è più antica che moderna" — two qualities of Rome → che.',
        notes: 'A visual side-by-side is very effective here.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Pick di or che',
        prompt:
          'Choose the correct word: ' +
          '"Correre è più faticoso ___ nuotare." / ' +
          '"Luca è più alto ___ suo fratello." / ' +
          '"È più gentile ___ intelligente."',
        exampleAnswer:
          'che (two verbs, same subject); di (two people); che (two adjectives, same subject)',
        notes:
          'Present each as a separate sub-question. Tie the food/sports themes to learner profile.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Equality structures',
        prompt:
          'Complete with (così)…come or (tanto)…quanto: ' +
          '"Questo ristorante è ___ buono ___ quello in piazza." / ' +
          '"Ho dormito ___ poco ___ ieri."',
        exampleAnswer: '(così) buono come; (tanto) poco quanto',
        notes:
          'Remind learners that così and tanto are optional; the structure still works without them.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Translate using di + tonic pronoun',
        prompt: 'Translate: "She runs faster than me. He is more experienced than us."',
        exampleAnswer: 'Corre più velocemente di me. È più esperto di noi.',
        notes: 'Check that tonic pronouns are used after di, not subject pronouns.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Free comparison round',
        prompt:
          'Compare two things you genuinely prefer — two dishes, two cities, two sports. ' +
          'Use di at least once and che at least once.',
        notes:
          'Personalize from learner profile. Reward correct di/che selection and natural tonic pronouns.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Lock in the rule',
        prompt:
          'When do you use di and when do you use che in a comparison? Give one example of each.',
      },
    ],
  },

  // ── 3. Per-skill drill: superlativo assoluto -issimo ───────────────────────
  {
    slug: 'cap09-drill-superlativo-assoluto',
    title: '-issimo! The absolute superlative',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'Italian loves -issimo. Drill the suffix on adjectives and adverbs, handle the spelling ' +
      'traps (stanco → stanchissimo, lungo → lunghissimo), and see how ottimo/pessimo/massimo/' +
      'minimo replace it for the four irregular adjectives.',
    objectiveSkillSlugs: ['it-superlatives', 'it-irregular-comparatives'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['food', 'sports', 'travel', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Building -issimo',
        prompt:
          'Drop the final vowel from the adjective stem, then add -issimo/-issima/-issimi/-issime. ' +
          'Bello → bellissimo. Veloce → velocissimo. ' +
          'Watch out for -co/-go stems: stanco → stanchissimo (add h); lungo → lunghissimo. ' +
          'For buono/cattivo/grande/piccolo, Italian prefers ottimo/pessimo/massimo/minimo instead.',
        notes:
          'Write the h-insertion rule clearly — it is the most common spelling trap at this level.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Form -issimo correctly',
        prompt:
          'Add -issimo: stanco → ___; lungo → ___; simpatico → ___; veloce → ___; facile → ___.',
        exampleAnswer: 'stanchissimo; lunghissimo; simpaticissimo; velocissimo; facilissimo',
        notes: 'Simpatico → simpaticissimo also requires h. Flag it alongside stanchissimo.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Irregular absolute superlatives',
        prompt:
          'Which is the preferred absolute superlative of buono: "buonissimo" or "ottimo"? ' +
          'And for cattivo: "cattivissimo" or "pessimo"?',
        exampleAnswer:
          'ottimo (preferred, especially for quality); pessimo — though buonissimo can refer to taste or character',
        notes:
          'Keep the nuance brief: ottimo/pessimo are the standard educated choices; buonissimo/cattivissimo exist but feel more colloquial.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Use -issimo in real sentences',
        prompt: 'Translate: "The match was extremely exciting. The players were incredibly fast."',
        exampleAnswer: 'La partita era emozionantissima. I giocatori erano velocissimi.',
        notes: 'Accept anche "molto emozionante" but reward -issimo.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Spelling check',
        prompt: 'Give the -issimo form of: lungo, stanco, simpatico, and buono (both options).',
        exampleAnswer: 'lunghissimo; stanchissimo; simpaticissimo; buonissimo / ottimo',
      },
    ],
  },

  // ── 4. Per-skill drill: migliore / peggiore ─────────────────────────────────
  {
    slug: 'cap09-drill-migliore-peggiore',
    title: 'Migliore, peggiore, meglio, peggio',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'The four irregular pairs in daily use: migliore/peggiore (adjective comparatives), ' +
      'il migliore/il peggiore (superlatives), ottimo/pessimo (absolute), and meglio/peggio ' +
      '(adverbs). Clear the confusion between the adjective and adverb forms.',
    objectiveSkillSlugs: ['it-irregular-comparatives', 'it-comparatives'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['food', 'sports', 'family', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The two columns: adjective vs adverb',
        prompt:
          'Adjective (describes a noun): buono → migliore / il migliore / ottimo. ' +
          'Adverb (describes a verb or adjective): bene → meglio. ' +
          'The trap: "mi sento migliore" sounds educated but "mi sento meglio" is the natural, ' +
          'idiomatic form because sentirsi is modified by an adverb of manner.',
        notes: 'The adjective/adverb distinction is the most productive teaching moment here.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'migliore vs meglio',
        prompt:
          'Choose the natural form: ' +
          '"Questo vino è ___ (migliore / meglio) dell’altro." / ' +
          '"Oggi mi sento ___ (migliore / meglio)." / ' +
          '"Ha suonato ___ (migliore / meglio) di ieri."',
        exampleAnswer:
          'migliore (adjective modifying vino); meglio (adverb, sentirsi); meglio (adverb, suonare)',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'maggiore and minore in context',
        prompt:
          'Complete: "Mio fratello ___ (older) studia medicina. Mia sorella ___ (younger) gioca a calcio."',
        exampleAnswer: 'maggiore; minore',
        notes:
          'Maggiore/minore replace più grande/più piccola for age. Remind learners this is the preferred form for family age references.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Spot the irregular form error',
        prompt:
          'Find the error and fix it: ' +
          '"Questo è il più buono caffè di Napoli." / ' +
          '"La situazione è più cattiva di ieri."',
        exampleAnswer:
          'Questo è il miglior caffè di Napoli. (il migliore is the standard superlative) / ' +
          'La situazione è peggiore di ieri. (peggiore replaces più cattivo)',
        notes: 'Both sentences are understandable but non-idiomatic. The goal is elegant Italian.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce the irregular forms',
        prompt:
          'Translate: "This is the best hospital in the region. The weather is worse than yesterday. ' +
          'My older brother feels better today."',
        exampleAnswer:
          'Questo è il miglior ospedale della regione. Il tempo è peggiore di ieri. ' +
          'Mio fratello maggiore sta meglio oggi.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Quick-fire irregular pairs',
        prompt:
          'Give the comparative and absolute superlative (adjective) for: buono, cattivo, grande, piccolo. ' +
          'Then the adverb comparatives for bene and male.',
        exampleAnswer:
          'migliore/ottimo; peggiore/pessimo; maggiore/massimo; minore/minimo; meglio; peggio',
      },
    ],
  },

  // ── 5. Error-correction clinic ──────────────────────────────────────────────
  {
    slug: 'cap09-clinic-comparatives-errors',
    title: 'Comparison clinic: più buono, di/che, and irregular plurals',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'A targeted error-correction session on the three clusters of mistakes every English speaker ' +
      'makes in this chapter: using più buono where migliore is expected, mixing up di and che, ' +
      'and forming the wrong plural for le braccia and le mani.',
    objectiveSkillSlugs: ['it-irregular-comparatives', 'it-comparatives', 'it-vocab-body'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['culture', 'sports', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Clinic framing',
        prompt:
          'These are the exact mistakes that make Italian learners sound like beginners even ' +
          'when their grammar is otherwise solid. Fix them now and they’re gone for good.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'più buono vs migliore',
        prompt:
          'Fix: "Questa è la più buona pizzeria di Roma." / "Il tuo medico è più buono del mio."',
        exampleAnswer: 'Questa è la migliore pizzeria di Roma. / Il tuo medico è migliore del mio.',
        notes:
          'Explain briefly: più buono survives for taste/character ("questo bambino è più buono di ieri"), ' +
          'but migliore is the standard comparative for quality comparisons.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'di vs che confusion',
        prompt:
          'Fix: "Nuotare è più rilassante di correre." (correct or not?) / ' +
          '"È più stanco di malato." (correct or not?)',
        exampleAnswer:
          'Nuotare è più rilassante di correre — WRONG: two verbs on same subject → che. ' +
          'Correct: più rilassante che correre. / ' +
          'È più stanco di malato — WRONG: two adjectives of same subject → che. ' +
          'Correct: più stanco che malato.',
        notes: 'Both items look plausible, which is exactly why the test is effective.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Irregular plural forms',
        prompt: 'Fix: "I bracci del nuotatore sono molto forti." / "Ho i mani sporchi."',
        exampleAnswer:
          'Le braccia del nuotatore sono molto forti. (i bracci = structural arms/branches, not body parts) / ' +
          'Ho le mani sporche. (la mano is feminine; plural le mani; adjective agrees: sporche)',
        notes:
          'Note that "i bracci" is a real word (e.g. i bracci del fiume = the branches of the river) — ' +
          'it is the wrong word for body parts, not simply ungrammatical.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Apply the corrections',
        prompt:
          'Complete with the correct form: ' +
          '"Questo caffè è ___ (migliore / più buono) di quello di ieri." / ' +
          '"Parlare italiano è più utile ___ (di / che) scriverlo."',
        exampleAnswer: 'migliore; che',
      },
      {
        taskType: TaskType.recap,
        focus: 'Three rules in one',
        prompt:
          'Summarize: (1) When do you use migliore instead of più buono? ' +
          '(2) When do you use che instead of di? ' +
          '(3) What is the plural of il braccio and la mano?',
      },
    ],
  },

  // ── 6. Scenario roleplay: pharmacy visit ───────────────────────────────────
  {
    slug: 'cap09-roleplay-farmacia-extended',
    title: 'In farmacia: symptoms, advice, and the receipt',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.intermediate,
    summary:
      'A fuller pharmacy visit: you have had a cough and mild fever for two days and a stiff neck. ' +
      'Describe your symptoms, ask whether you need a prescription, compare this illness to a ' +
      'previous one, and understand the pharmacist’s dosage instructions.',
    objectiveSkillSlugs: [
      'it-vocab-health',
      'it-vocab-body',
      'it-comparatives',
      'it-irregular-comparatives',
    ],
    defaultDurationMinutes: 13,
    compatibleThemes: ['culture', 'travel', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Scene: green cross, rainy Tuesday',
        prompt:
          'It is Tuesday afternoon, it’s raining, and you’ve been ill since Sunday. ' +
          'You step into a farmacia. The pharmacist greets you and asks what is wrong. ' +
          'In this session you’ll describe three symptoms, ask two questions, and decode the advice.',
        notes:
          'If the learner has travel plans, anchor to a real Italian region. Remind them that the ' +
          'farmacista is a clinician — this is a formal but approachable interaction.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Describe three symptoms',
        prompt:
          'The pharmacist says: "Buongiorno, come posso aiutarla?" ' +
          'Respond with three symptoms: a cough, a mild fever, and a stiff neck.',
        exampleAnswer:
          'Ho la tosse da due giorni, un po’ di febbre e mi fa male il collo — è tutto rigido.',
        notes:
          'Reward mal di + body part and the correct verb agreement (mi fa male vs mi fanno male). ' +
          'Accept un po’ di febbre or ho la febbre — both are natural.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Ask whether you need a prescription',
        prompt:
          'The pharmacist recommends a syrup. Ask (a) whether you need a prescription and ' +
          '(b) how many times a day you should take it.',
        exampleAnswer: 'Serve la ricetta? E quante volte al giorno devo prenderlo?',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Compare this illness to a previous one',
        prompt:
          'Complete with the correct comparative: ' +
          '"Questa tosse è ___ (worse than) quella dell’anno scorso. ' +
          'Mi sento ___ (worse) di lunedì ma ___ (better) di ieri."',
        exampleAnswer: 'peggiore di; peggio; meglio',
        notes:
          'Three different forms in one sentence: peggiore (adjective), peggio (adverb), meglio (adverb). ' +
          'This is the natural sequence for someone describing how an illness is developing.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Pharmacy phrase kit',
        prompt:
          'Which three phrases from this session would you keep on a pocket card for a real ' +
          'Italian pharmacy visit?',
      },
    ],
  },

  // ── 7. Scenario roleplay: compare two places ────────────────────────────────
  {
    slug: 'cap09-roleplay-compare-cities',
    title: 'Roma o Milano? — comparing people, places, things',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.intermediate,
    summary:
      'You are talking with an Italian friend who is trying to decide between two cities, two ' +
      'restaurants, or two teams. You compare them using comparatives, equality structures, and ' +
      'superlatives — and include your own opinion with secondo me.',
    objectiveSkillSlugs: [
      'it-comparatives',
      'it-superlatives',
      'it-irregular-comparatives',
      'it-stressed-pronouns',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['travel', 'food', 'sports', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'Your Italian friend is debating two cities — Roma and Napoli — for a weekend trip. ' +
          'They want your take. You’ll compare size, cost, food, and atmosphere, using ' +
          'all the comparison structures from this chapter.',
        notes:
          'The engine can substitute cities, teams, or restaurants to match the learner’s interest profile.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Compare size and transport',
        prompt:
          'Your friend asks: "Secondo te, quale città è più grande?" ' +
          'Compare Roma and Napoli for size and then for transport, using più…di and meno…di.',
        exampleAnswer:
          'Secondo me, Roma è molto più grande di Napoli. Ha anche un sistema di trasporti ' +
          'più esteso, ma Napoli è meno caotica di quello che si pensa.',
        notes: 'Reward secondo me + tonic pronoun and correct use of di.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Compare food scenes',
        prompt:
          'Your friend asks which city has better food. Use migliore/peggiore and equality structures.',
        exampleAnswer:
          'La pizza napoletana è la migliore d’Italia — non c’è discussione! ' +
          'Ma la cucina romana è tanto deliziosa quanto quella napoletana, solo diversa.',
        notes:
          'Reward il/la migliore + di + contracted article and the (tanto)…quanto equality structure.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Give your overall verdict',
        prompt:
          'Give a final recommendation — which city is better for a weekend trip and why. ' +
          'Use almeno un superlativo relativo and one -issimo form.',
        notes:
          'No single correct answer. Reward relative superlative (la città più…) and an -issimo form. ' +
          'If the learner’s profile mentions travel interest, encourage personal experience.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Vocabulary from the comparison',
        prompt:
          'Which Italian comparison words did you use most naturally? Which still felt like a ' +
          'translation from English?',
      },
    ],
  },

  // ── 8. Listening challenge: what hurts? ────────────────────────────────────
  {
    slug: 'cap09-listening-symptoms',
    title: 'Listening gym: what hurts?',
    lessonType: LessonType.listening_challenge,
    level: CEFRLevel.intermediate,
    summary:
      'Three short audio clips of Italian speakers describing how they feel: a footballer after ' +
      'a match, a traveller with a cold, and an older person at the doctor. Train your ear to ' +
      'identify the exact symptom, the body part, and whether it is severe or mild.',
    objectiveSkillSlugs: ['it-vocab-health', 'it-vocab-body'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['culture', 'sports', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Ear training for health vocabulary',
        prompt:
          'You will hear three short descriptions. For each, identify: (1) which body part hurts, ' +
          '(2) the symptom word used, and (3) whether the speaker says it is mild, moderate, or severe.',
        notes:
          'Script themes: (a) footballer post-match — ginocchio and gambe; ' +
          '(b) traveller — raffreddore, mal di gola, febbre; ' +
          '(c) older person at the doctor — schiena, pressione. ' +
          'Engine fills naturalistic dialogue; keep speech rate at near-native with slight clarity.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Clip 1 — the footballer',
        prompt: 'What body parts does the footballer mention, and which hurts the most?',
        exampleAnswer:
          'Le ginocchia and le gambe; the knee hurts more (mi fa malissimo il ginocchio).',
        notes:
          'Script: post-match locker room. Use malissimo and mi fa male to recycle the chapter’s content. ' +
          'Accept any answer that identifies ginocchio as the primary complaint.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Clip 2 — the traveller',
        prompt:
          'The traveller lists three symptoms. What are they, and does she think it is a cold or the flu?',
        exampleAnswer:
          'Mal di gola, febbre (un po’ di febbre), and tosse. She thinks it’s a cold (un raffreddore).',
        notes:
          'Script: short phone call to a friend. Include the il raffreddore vs l’influenza contrast.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Clip 3 — at the doctor',
        prompt:
          'The older patient says the pain in his back is: (a) worse in the morning, ' +
          '(b) worse in the evening, or (c) the same all day?',
        exampleAnswer: '(a) worse in the morning — peggio la mattina',
        notes:
          'Script uses peggio (adverb) naturally, giving learners a listening encounter with the irregular form.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Anchor the vocabulary',
        prompt:
          'From all three clips, list three symptom phrases you could use yourself in a real conversation.',
      },
    ],
  },

  // ── 9. Speaking challenge: compare two things you love ──────────────────────
  {
    slug: 'cap09-speaking-compare-favourites',
    title: 'Speaking challenge: compare two things you love',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.intermediate,
    summary:
      'Free production challenge: compare two things you genuinely care about — two sports, two ' +
      'cuisines, two musicians, two cities — using the full toolkit: più…di, più…che, (così)…come, ' +
      'superlativo relativo, -issimo, and at least one irregular form.',
    objectiveSkillSlugs: [
      'it-comparatives',
      'it-superlatives',
      'it-irregular-comparatives',
      'it-stressed-pronouns',
    ],
    defaultDurationMinutes: 10,
    compatibleThemes: ['sports', 'food', 'music', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Your turn to argue a case',
        prompt:
          'This is a speaking-first session. Pick two things you love — or love to argue about — ' +
          'and compare them in Italian. The goal is fluency, not perfection. I’ll give you ' +
          'feedback on which comparison structures you used and which you missed.',
        notes:
          'Pull from learner profile: if they listed football, use two clubs; if food, two cuisines; ' +
          'if music, two artists. The personalization dramatically increases engagement.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Warm-up: three quick comparisons',
        prompt:
          'Say three quick comparisons — one with più…di, one with più…che, one with (così)…come. ' +
          'They can be about anything.',
        exampleAnswer:
          'Il calcio è più popolare di qualsiasi altro sport in Italia. ' +
          'Giocare è più divertente che guardare. ' +
          'La Serie A è così emozionante come la Premier League.',
        notes: 'Keep this fast. Correct only di/che errors.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Main comparison: make your case',
        prompt:
          'Now give a 6–8 sentence comparison of your two chosen topics. Include at least: ' +
          'one migliore or peggiore, one -issimo form, one superlativo relativo, and one sentence ' +
          'with a tonic pronoun after a preposition.',
        notes:
          'Let the learner speak without interruption. Feedback afterward. Reward variety of structure ' +
          'and genuine communicative intent over grammatical precision.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Describe how you feel about one of them',
        prompt:
          'Tell me how you feel about your favourite of the two — use sentirsi or stare and at ' +
          'least one emotional adjective in the -issimo form.',
        exampleAnswer:
          'Quando guardo la mia squadra vincere mi sento felicissimo — è la cosa migliore del mondo.',
        notes: 'Ties health vocabulary (sentirsi) back into the comparison context.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assess',
        prompt:
          'Which comparison structure came most naturally? Which one did you avoid because you ' +
          'were not sure?',
      },
    ],
  },

  // ── 10. Vocabulary review: body + health ────────────────────────────────────
  {
    slug: 'cap09-vocab-review-body-health',
    title: 'Vocabulary review: il corpo e la salute',
    lessonType: LessonType.vocabulary_review,
    level: CEFRLevel.intermediate,
    summary:
      'A consolidated review of both vocabulary sets: body parts (including irregular plurals) ' +
      'and health and illness terms. Mixes recognition, production, and the fare male construction ' +
      'to lock in the full set before the progress check.',
    objectiveSkillSlugs: ['it-vocab-body', 'it-vocab-health'],
    defaultDurationMinutes: 11,
    compatibleThemes: ['family', 'culture', 'sports', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Why both sets belong together',
        prompt:
          'Body parts and health vocabulary only really work together — you need both to describe ' +
          'a symptom, fill in a medical form, or follow a doctor’s advice. This session reviews ' +
          'the complete set quickly before we test you on the whole chapter.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Irregular plurals recognition',
        prompt:
          'Which is correct? ' +
          '"Ho i bracci stanchi" or "Ho le braccia stanche"? ' +
          '"Mi sono lavato i mani" or "Mi sono lavato le mani"?',
        exampleAnswer:
          'le braccia stanche (feminine plural); le mani (feminine plural, correct article le)',
        notes:
          'Emphasise that both corrections involve feminine plurals — a single pattern to learn.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Health phrase production',
        prompt:
          'Complete these sentences with the correct health term: ' +
          '"Ho ___ da tre giorni e tossisco molto." / ' +
          '"Il medico mi ha scritto la ___ per gli antibiotici." / ' +
          '"Devo andare in ___ — c’è la croce verde lì in fondo."',
        exampleAnswer: 'il raffreddore (or la tosse); ricetta; farmacia',
      },
      {
        taskType: TaskType.translation,
        focus: 'Describe a full set of symptoms',
        prompt:
          'Translate: "I have had a fever since yesterday, my throat hurts a lot, and I feel ' +
          'terrible. I’m going to the pharmacy."',
        exampleAnswer:
          'Ho la febbre da ieri, mi fa molto male la gola e mi sento malissimo. ' +
          'Vado in farmacia.',
        notes: 'Accept mi sento molto male in place of malissimo. Both are correct and natural.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Describe your body in Italian',
        prompt:
          'Name six body parts — include at least one with an irregular plural — and tell me ' +
          'which ones sometimes bother you after exercise.',
        notes:
          'Personalize to the learner’s sport. A runner: gambe, ginocchia, schiena. ' +
          'A swimmer: braccia, spalle, collo. Reward correct article + irregular plural.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Fast vocab round',
        prompt:
          'Give the Italian for: the knee (with irregular plural), to fall ill (reflexive), ' +
          'the prescription, to recover, and the on-call pharmacy.',
        exampleAnswer:
          'il ginocchio / le ginocchia; ammalarsi; la ricetta; guarire; la farmacia di turno',
      },
    ],
  },

  // ── 11. Progress check ──────────────────────────────────────────────────────
  {
    slug: 'cap09-progress-check',
    title: 'Chapter checkpoint: sentirsi bene',
    lessonType: LessonType.progress_check,
    level: CEFRLevel.intermediate,
    summary:
      'A mixed check across all six skills of the chapter: tonic pronouns, di/che comparatives, ' +
      'superlatives (-issimo and relative), irregular forms (migliore/peggiore/meglio), body ' +
      'vocabulary, and health vocabulary. See what is solid and what needs another pass.',
    objectiveSkillSlugs: [
      'it-stressed-pronouns',
      'it-comparatives',
      'it-superlatives',
      'it-irregular-comparatives',
      'it-vocab-body',
      'it-vocab-health',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['culture', 'family', 'travel', 'sports'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Low-stakes diagnostic',
        prompt:
          'This is a quick mixed check — not a test, just a way to see what has stuck and what ' +
          'needs another look. Answer naturally; I’ll flag anything worth revisiting.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Tonic pronoun after preposition',
        prompt: 'Complete: "Il farmacista ha preparato la medicina per ___ (me) e per ___ (her)."',
        exampleAnswer: 'me; lei',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'di vs che',
        prompt: 'Choose: "È più stanco ___ malato." / "Luca è più alto ___ suo padre."',
        exampleAnswer: 'che (two adjectives, same subject); di (two people)',
      },
      {
        taskType: TaskType.fill_blank,
        focus: '-issimo and irregular superlatives',
        prompt:
          'Complete: "Questa clinica è ___ (the best) della città. Il viaggio era stanchissimo — ' +
          'anzi, era ___ (absolutely exhausting) — forma assoluta, not -issimo again."',
        exampleAnswer:
          'la migliore; estenuante (or stanchissimo — accept; the note prompts reflection, not a rule)',
        notes:
          'The second slot is deliberately open-ended — it checks whether the learner can use vocabulary ' +
          'beyond the drilled set. Accept any strong adjective in absolute superlative form.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Health sentence with comparatives',
        prompt: 'Translate: "I feel worse than yesterday. My arms hurt more than my legs."',
        exampleAnswer: 'Mi sento peggio di ieri. Mi fanno più male le braccia che le gambe.',
        notes:
          'Two structures in one: meglio/peggio adverb comparison, and più…che for two body parts ' +
          'belonging to the same subject. Check that le braccia and le gambe have correct feminine articles.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assessment',
        prompt:
          'Which of the six topics in this chapter feels most solid? Which would you like to ' +
          'revisit — comparatives, superlatives, irregular forms, tonic pronouns, body vocab, or health vocab?',
      },
    ],
  },
];

export default { unitCode, lessons };
