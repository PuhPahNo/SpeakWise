// Additional lesson templates for Capitolo 10 — Buon viaggio!
//
// These EXTEND the templates authored inline in units/cap-10-*.ts (the index
// merges both). Per the lesson-expansion spec: per-skill drills for every main
// grammar point, an error clinic, scenario roleplays, a listening challenge,
// speaking challenges, a vocabulary review, and a progress check.
//
// Rules mirror SPEC.md: original content; every in-string apostrophe is the
// curly ' (U+2019); slugs are globally unique and must not collide with the
// five inline template slugs (cap10-plan-a-trip, cap10-book-a-hotel,
// cap10-impersonal-si-italy, cap10-italian-holidays, cap10-future-probability).

import { CEFRLevel, LessonType, TaskType } from '@prisma/client';
import type { SeedLessonTemplate } from '../types';

export const unitCode = 'cap-10';

const lessons: SeedLessonTemplate[] = [
  // ── 1. Per-skill drill: regular future endings ───────────────────────────
  {
    slug: 'cap10-drill-future-regular',
    title: 'Future endings — the regular paradigm',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'Build the futuro semplice from scratch: the shared ending set (-ò, -ai, -à, -emo, -ete, ' +
      '-anno), the stem tweak for -are verbs, and the h-insertion for -care/-gare. Fast reps ' +
      'across all three conjugations.',
    objectiveSkillSlugs: ['it-future-simple'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['travel', 'culture', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'One ending set, three conjugations',
        prompt:
          'Every Italian future uses the same six endings: -ò, -ai, -à, -emo, -ete, -anno. The ' +
          'only tweak: -are verbs change the stem vowel (parlare → parler-). The -ere and -ire ' +
          'stems stay intact (vendere → vender-; partire → partir-).',
        notes: 'Display a three-column table: parlare / vendere / partire conjugated in full.',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'Three conjugations side by side',
        prompt:
          'Give the futuro semplice for all six persons of viaggiare (-are), scrivere (-ere), ' +
          'and dormire (-ire).',
        exampleAnswer:
          'viaggerò / viaggerai / viaggerà / viaggeremo / viaggerete / viaggeranno — ' +
          'scriverò / scriverai / scriverà / scriveremo / scriverete / scriveranno — ' +
          'dormirò / dormirai / dormirà / dormiremo / dormirete / dormiranno',
        notes:
          'viaggiare drops the i (viaggerò). Highlight this alongside cercare/pagare ' +
          'as the two main spelling-rule groups.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Spelling rules: h-insertion and i-drop',
        prompt:
          'Complete: "Prima ___ (cercare, io) un volo economico, poi ___ (pagare, noi) con ' +
          'la carta. Se piove ___ (cominciare, tu) a esplorare i musei."',
        exampleAnswer: 'cercherò … pagheremo … comincerai',
        notes:
          'cercare → cercherò (h-insertion); pagare → pagheremo (h-insertion); ' +
          'cominciare → comincerai (i-drop).',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce a future sentence about a trip',
        prompt: 'Translate: "Next summer we will leave on Friday and arrive in Naples by evening."',
        exampleAnswer: 'La prossima estate partiremo venerdì e arriveremo a Napoli entro sera.',
        notes: 'partire and arrivare are regular; reward correct accent placement.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Stem-change summary',
        prompt:
          'How does the stem change for -are verbs in the future? What happens to -care/-gare ' +
          'and -ciare/-giare verbs?',
      },
    ],
  },

  // ── 2. Per-skill drill: irregular future stems ───────────────────────────
  {
    slug: 'cap10-drill-future-irregular',
    title: 'sarò, avrò, andrò — mastering the irregular stems',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'The ten high-frequency irregular future stems — essere, avere, andare, fare, venire, ' +
      'dovere, potere, volere, vedere, rimanere — drilled through translation, conjugation, ' +
      'and gap-fill until automatic.',
    objectiveSkillSlugs: ['it-future-simple'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['travel', 'business', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'The "must-know" list',
        prompt:
          'Ten verbs make up most of Italian future speech. Their stems are not guessable from ' +
          'the infinitive — they must be memorized. Good news: once you know the stem, the ' +
          'endings are the same as always.',
        notes:
          'Present as a two-column list: infinitive → stem (essere→sar-, avere→avr-, ' +
          'andare→andr-, fare→far-, venire→verr-, dovere→dovr-, potere→potr-, volere→vorr-, ' +
          'vedere→vedr-, rimanere→rimarr-).',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'Six persons of three key verbs',
        prompt: 'Conjugate essere, andare, and venire in the futuro semplice for all six persons.',
        exampleAnswer:
          'sarò / sarai / sarà / saremo / sarete / saranno — ' +
          'andrò / andrai / andrà / andremo / andrete / andranno — ' +
          'verrò / verrai / verrà / verremo / verrete / verranno',
        notes: 'venire doubles the r: verr-. Learners often forget this.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Irregular stems in a travel narrative',
        prompt:
          'Complete: "L’anno prossimo ___ (essere, io) in Italia per tre settimane. ' +
          '___ (dovere, noi) prenotare presto perché i posti ___ (finire) in fretta. ' +
          'Mia sorella ___ (venire) con me e ___ (volere) vedere il Colosseo."',
        exampleAnswer: 'sarò … dovremo … finiranno … verrà … vorrà',
        notes: 'finire is regular (finiranno); the others all use irregular stems.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Modal futures in context',
        prompt:
          'Translate: "We won’t be able to stay more than a week, but we’ll see as much as we can."',
        exampleAnswer: 'Non potremo restare più di una settimana, ma vedremo quanto più possibile.',
        notes: 'potremo (potere→potr-) and vedremo (vedere→vedr-).',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Your Italian plans — irregular stems required',
        prompt:
          'Tell Wise three things you will do on an Italian holiday, using at least two ' +
          'irregular future stems.',
        notes: 'Reward any correct irregular stem. Gently correct regularized forms like "averò".',
      },
      {
        taskType: TaskType.recap,
        focus: 'Quick-fire stems',
        prompt:
          'Give the io form of the futuro semplice for: essere, avere, fare, venire, rimanere.',
        exampleAnswer: 'sarò, avrò, farò, verrò, rimarrò',
      },
    ],
  },

  // ── 3. Per-skill drill: future of probability ────────────────────────────
  {
    slug: 'cap10-drill-future-probability',
    title: 'Sarà stanco — the future as a present guess',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'The futuro di probabilità in focused practice: use the future tense to express a current ' +
      'conjecture about age, time, location, or reason — the Italian equivalent of English ' +
      '"must be" or "probably is".',
    objectiveSkillSlugs: ['it-future-special-uses'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['travel', 'culture', 'family', 'news'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'A future verb for a present guess',
        prompt:
          'When the context is NOW and you’re estimating — not planning — Italian uses the future. ' +
          'Saranno le dieci = it must be about ten (right now). Avrà trent’anni = she’s probably ' +
          'thirty. No special marker needed; context + the absence of a future time phrase signals ' +
          'probability.',
        notes:
          'Contrast: "Domani sarà stanco" (future plan/prediction) vs "Sarà stanco dopo quel volo" ' +
          '(present conjecture). The time phrase is the tell.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Plan vs probability',
        prompt:
          'Which sentence uses the future of probability? ' +
          '(a) "Domani arriveranno alle tre." ' +
          '(b) "Arriveranno già — sono le tre passate."',
        exampleAnswer: '(b) — no future time marker; it is a present guess that they have arrived',
        notes: 'Help learners read context clues rather than just the verb form.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Express a present conjecture',
        prompt:
          'Translate using the futuro di probabilità: ' +
          '"The luggage must be on the other carousel." ' +
          '"Those tourists are probably from Canada."',
        exampleAnswer: 'Il bagaglio sarà sull’altro nastro. — Quei turisti saranno canadesi.',
        notes: 'Both sentences describe the present, hence the future of probability.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Guess about the photo',
        prompt:
          'Wise shows you a photo of a street scene in an Italian city. Make three guesses using ' +
          'the future: where it is, what time of day it is, and how old the building in the ' +
          'background might be.',
        notes: 'Elicit sarà, saranno, avrà. Accept reasonable guesses in any future form.',
      },
      {
        taskType: TaskType.recap,
        focus: 'How do you know it is probability, not a plan?',
        prompt:
          'What signals that a future-tense sentence expresses a present probability rather than ' +
          'a future event?',
      },
    ],
  },

  // ── 4. Per-skill drill: quando/appena/se + future ────────────────────────
  {
    slug: 'cap10-drill-future-conjunctions',
    title: 'Quando arriverò… — the future in both clauses',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'Drill the rule that trips English speakers most: in Italian, when the main clause is in the ' +
      'future, subordinate clauses introduced by quando, appena, se, and finché also require the ' +
      'future — never the present.',
    objectiveSkillSlugs: ['it-future-special-uses'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['travel', 'family', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The English-Italian gap',
        prompt:
          'English: "When I ARRIVE, I’ll call you." Italian: "Quando ARRIVERÒ, ti chiamerò." ' +
          'English uses the present after "when"; Italian demands the future in both clauses. ' +
          'Same pattern after appena (as soon as), se (if + real condition), and finché (until).',
        notes:
          'Write the parallel on the screen: English present / Italian future. Warn learners ' +
          'this is one of the most persistent intermediate-level errors.',
      },
      {
        taskType: TaskType.tense_selection,
        focus: 'Future or present in the quando-clause?',
        prompt:
          'Choose the correct form for formal written Italian: ' +
          '"Quando (arrivo / arriviamo / arriveremo) a Venezia, prendiamo / prenderemo il vaporetto."',
        exampleAnswer: 'Quando arriveremo a Venezia, prenderemo il vaporetto.',
        notes:
          'Both clauses future. In casual speech the present is common; stress formal/written here.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Four conjunctions — fill both verbs',
        prompt:
          'Complete: "Appena ___ (atterrare, il volo), ti ___ (mandare, io) un messaggio. ' +
          'Se ___ (avere, noi) tempo, ___ (visitare) Pompei. ' +
          'Finché non ___ (arrivare, i bagagli) non ___ (potere, io) uscire dall’aeroporto."',
        exampleAnswer: 'atterrerà … manderò … avremo … visiteremo … arriveranno … potrò',
        notes:
          'atterrare is regular; avremo is irregular (avere→avr-); potrò is irregular (potere→potr-).',
      },
      {
        taskType: TaskType.translation,
        focus: 'Full sentence production',
        prompt:
          'Translate: "As soon as we book the tickets, we will let everyone know. ' +
          'If the hotel is full, we will look for a B&B."',
        exampleAnswer:
          'Appena prenoteremo i biglietti, lo diremo a tutti. ' +
          'Se l’albergo sarà al completo, cercheremo un B&B.',
        notes: 'diremo is irregular (dire→dir-). Point it out if the learner stumbles.',
      },
      {
        taskType: TaskType.recap,
        focus: 'State the rule',
        prompt:
          'After quando, appena, se, and finché — which tense does Italian use when the main ' +
          'clause is in the future?',
      },
    ],
  },

  // ── 5. Per-skill drill: impersonal si ────────────────────────────────────
  {
    slug: 'cap10-drill-impersonal-si',
    title: 'Si parla italiano qui — the impersonal si in depth',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'Targeted reps on the three rules of impersonal si: singular verb for general statements, ' +
      'plural verb when a plural noun follows, and ci si before reflexive verbs.',
    objectiveSkillSlugs: ['it-impersonal-si'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['travel', 'food', 'culture', 'history'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Three rules for si',
        prompt:
          'Rule 1: si + singular verb for general statements (si mangia, si parla). ' +
          'Rule 2: si + plural verb when a plural noun is the logical subject (si vendono i biglietti). ' +
          'Rule 3: ci si + reflexive verb to avoid si si (ci si alza presto).',
        notes:
          'Use a three-row table. Learners confuse Rules 1 and 2; give a clear pivot example: ' +
          '"si mangia" vs "si mangiano le tagliatelle".',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Singular vs plural agreement',
        prompt:
          'Complete: "In questo mercato ___ (vendere) le spezie a ottimo prezzo. ' +
          'A pranzo ___ (mangiare) bene e non ___ (spendere) molto. ' +
          'La sera ___ (alzarsi) tardi per andare ai concerti."',
        exampleAnswer: 'si vendono … si mangia … si spende … ci si alza',
        notes:
          'le spezie → si vendono; no explicit noun → si mangia / si spende; reflexive → ci si alza.',
      },
      {
        taskType: TaskType.pronoun_replacement,
        focus: 'Rewrite using impersonal si',
        prompt:
          'Rewrite as impersonal si: ' +
          '"Le persone parlano italiano in tutta Italia." ' +
          '"I turisti visitano il Colosseo ogni giorno."',
        exampleAnswer: 'In tutta Italia si parla italiano. — Il Colosseo si visita ogni giorno.',
        notes:
          'parlare: no plural noun → si parla. visitare: direct object becomes implicit → si visita.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Describe Italian customs',
        prompt:
          'Translate: "In Sardinia one eats seafood and fresh bread. At the market, local cheeses ' +
          'are sold at good prices. People get up early to go to the beach."',
        exampleAnswer:
          'In Sardegna si mangia il pesce e il pane fresco. Al mercato si vendono i formaggi ' +
          'locali a buon prezzo. Ci si alza presto per andare in spiaggia.',
        notes: 'Three rules in one translation exercise.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Rule check',
        prompt:
          'When does si take a plural verb? How do you handle a reflexive verb with impersonal si?',
      },
    ],
  },

  // ── 6. Per-skill drill: feminine noun formation ──────────────────────────
  {
    slug: 'cap10-drill-feminine-nouns',
    title: 'L’attrice, la professoressa — forming feminine titles',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'The three core patterns for deriving Italian feminine professional titles: -o → -a, ' +
      '-ore → -essa, -tore → -trice. Plus the invariable -ista group and the article-only strategy.',
    objectiveSkillSlugs: ['it-feminine-noun-formation'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['culture', 'business', 'travel', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Three patterns + one exception group',
        prompt:
          'Pattern 1: -o → -a (ragazzo → ragazza; impiegato → impiegata). ' +
          'Pattern 2: -ore → -essa (professore → professoressa; dottore → dottoressa; ' +
          'studente → studentessa). ' +
          'Pattern 3: -tore → -trice (attore → attrice; scrittore → scrittrice; ' +
          'direttore → direttrice). ' +
          'Invariable: -ista forms use only the article (il/la giornalista; il/la turista).',
        notes: 'A short chart on screen cements the three patterns at a glance.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Derive the feminine form',
        prompt:
          'Give the feminine form: ' +
          'il professore → ___; l’attore → ___; lo scrittore → ___; il dottore → ___; ' +
          'il turista → ___.',
        exampleAnswer: 'la professoressa; l’attrice; la scrittrice; la dottoressa; la turista',
        notes: 'turista is invariable — the form stays the same, only the article changes.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Spot the correct feminine form',
        prompt: 'Which is correct? (a) la direttora (b) la direttrice (c) la direttoressa',
        exampleAnswer: '(b) la direttrice — direttore ends in -tore, so the feminine is -trice',
        notes: 'Common error: applying -a or -essa to -tore words.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Fix the wrong feminine',
        prompt:
          'Correct the errors: ' +
          '"La professora di storia è bravissima. ' +
          'La scrittora ha vinto un premio importante. ' +
          'Ho parlato con la dentistessa."',
        exampleAnswer:
          'La professoressa di storia è bravissima. ' +
          'La scrittrice ha vinto un premio importante. ' +
          'Ho parlato con la dentista.',
        notes:
          'professora → professoressa (-ore pattern); scrittora → scrittrice (-tore pattern); ' +
          'dentistessa → dentista (-ista is invariable).',
      },
      {
        taskType: TaskType.recap,
        focus: 'Pattern check',
        prompt: 'How do you form the feminine of a word ending in -tore? In -ore? In -ista?',
      },
    ],
  },

  // ── 7. Error-correction clinic: irregular stems + si agreement ───────────
  {
    slug: 'cap10-clinic-future-and-si',
    title: 'Clinic: irregular stems and si agreement errors',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'A targeted error-correction clinic on the two most common mistakes in this chapter: ' +
      'regularizing an irregular future stem (averò, volerò, venerò) and mismatching impersonal ' +
      'si with its verb (si vendono vs si vende; si si instead of ci si).',
    objectiveSkillSlugs: ['it-future-simple', 'it-impersonal-si'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['travel', 'culture', 'food'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'The two slippery zones',
        prompt:
          'Zone 1: Irregular future stems. The temptation is to regularize — "averò" instead of ' +
          'avrò, "venerò" instead of verrò. Zone 2: si agreement. Learners either use singular ' +
          'when plural is needed, or write si si for reflexives.',
        notes: 'Frame as a clinic: spot the error, understand why it is wrong, rewrite clean.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Irregular stem errors',
        prompt:
          'Fix all errors: ' +
          '"L’anno prossimo averò più tempo per viaggiare. ' +
          'Mia cugina venerà a trovarci in agosto. ' +
          'Dovremo partire presto se voleremo arrivare in tempo."',
        exampleAnswer:
          'L’anno prossimo avrò più tempo per viaggiare. ' +
          'Mia cugina verrà a trovarci in agosto. ' +
          'Dovremo partire presto se vorremo arrivare in tempo.',
        notes:
          'averò → avrò; venerà → verrà (venire doubles the r); voleremo → vorremo (volere→vorr-).',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'si agreement errors',
        prompt:
          'Fix all errors: ' +
          '"In aeroporto si vende i giornali internazionali. ' +
          'La mattina si si alza presto per prendere il vaporetto. ' +
          'In Italia si mangia bene i piatti regionali."',
        exampleAnswer:
          'In aeroporto si vendono i giornali internazionali. ' +
          'La mattina ci si alza presto per prendere il vaporetto. ' +
          'In Italia si mangiano bene i piatti regionali.',
        notes:
          'i giornali → si vendono; si si → ci si (reflexive); i piatti regionali → si mangiano.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Rewrite both correctly',
        prompt:
          'Complete with the correct future form and the correct si construction: ' +
          '"Quando ___ (arrivare, noi) a Roma, ___ (potere) visitare il Vaticano. ' +
          'In fila ___ (aspettare) — si ___ (fare) sempre così in Italia."',
        exampleAnswer: 'arriveremo … potremo … si aspetta … si fa',
        notes: 'arrivare and aspettare are regular; potere → potremo (irregular).',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Produce it clean',
        prompt:
          'Describe one travel plan using two irregular future stems and one impersonal si — ' +
          'no errors.',
        notes: 'Reward accuracy; gently flag any slips back to the clinic findings.',
      },
    ],
  },

  // ── 8. Scenario roleplay: book a flight and plan a holiday ───────────────
  {
    slug: 'cap10-roleplay-flight-and-trip',
    title: 'Prenota il volo e pianifica il viaggio',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.intermediate,
    summary:
      'A two-part roleplay: first you call a travel agency to book a flight and arrange travel ' +
      'documents; then you meet a friend to plan the full holiday itinerary — using the future ' +
      'tense and travel vocabulary throughout.',
    objectiveSkillSlugs: ['it-future-simple', 'it-vocab-vacation', 'it-impersonal-si'],
    defaultDurationMinutes: 13,
    compatibleThemes: ['travel', 'business', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Two scenes, one trip',
        prompt:
          'Scene 1: You call a travel agency (l’agenzia di viaggi) to book a return flight to ' +
          'Sicily. Scene 2: You call your friend Marco to plan what you’ll do when you get there. ' +
          'Future tense throughout.',
        notes:
          'Personalize to the learner’s preferred Italian destination if not Sicily. ' +
          'Wise plays both the travel agent and Marco.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Book the flight',
        prompt:
          'Call the agency. Say you want a return flight to Palermo for two people departing ' +
          'on July 14. Ask about the price and whether the flight is direct.',
        exampleAnswer:
          'Buongiorno, vorrei prenotare un volo di andata e ritorno per Palermo per due persone. ' +
          'Partiremmo il 14 luglio. Quanto costa e il volo è diretto?',
        notes:
          'Encourage vorrei (polite conditional) for the request; future for the departure date.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Confirm travel documents',
        prompt:
          'The agent asks for your name, passport number, and email. Respond and confirm you will ' +
          'pay by credit card.',
        exampleAnswer:
          'Mi chiamo [nome]. Il numero del passaporto è [numero]. La mia email è [email]. ' +
          'Pagherò con la carta di credito.',
        notes: 'pagherò — h-insertion. Point out if the learner writes "pagerò".',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Plan the itinerary with a friend',
        prompt:
          "Call Marco. Tell him you've booked the flights. Suggest two things you will do and " +
          'ask what he wants to see.',
        exampleAnswer:
          'Marco, ho prenotato i voli! Arriveremo il 14 luglio. Andremo a vedere i templi di ' +
          'Agrigento e faremo una gita alle isole Eolie. Tu cosa vorrai visitare?',
        notes:
          'andremo/faremo — irregular stems. vorrai — volere irregular. Reward any correct future.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Describe the trip to someone who can’t come',
        prompt:
          'Your colleague can’t join the trip. In two or three sentences describe what you and ' +
          'Marco will do, see, and eat — using at least one impersonal si.',
        notes:
          'Natural opportunity for "si mangia bene lì" or "si visita il mercato". ' +
          'Reward fluency over perfection.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Travel language check',
        prompt:
          'Which phrases from the two scenes would you use in a real Italian travel situation?',
      },
    ],
  },

  // ── 9. Scenario roleplay: plan a holiday trip with a friend ──────────────
  {
    slug: 'cap10-roleplay-holiday-plans',
    title: 'Dove andiamo quest’estate? — planning a holiday with a friend',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.intermediate,
    summary:
      'You and your Italian friend Giulia are deciding where to spend the summer holidays. ' +
      'Negotiate destinations, weigh up options, and settle on a plan — using the future tense, ' +
      'holiday vocabulary, and the future of probability for gentle persuasion.',
    objectiveSkillSlugs: ['it-future-simple', 'it-future-special-uses', 'it-vocab-vacation'],
    defaultDurationMinutes: 12,
    compatibleThemes: ['travel', 'culture', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'You and Giulia are texting about summer holidays. You want the mountains; she wants ' +
          'the beach. Wise plays Giulia. Negotiate and reach a plan both of you like.',
        notes:
          'Personalize: if the learner has expressed preferences earlier, give those to Giulia ' +
          'as the opposing view to create natural negotiation.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Propose your holiday idea',
        prompt:
          'Tell Giulia you’d like to rent a mountain chalet in Trentino for a week. Say when ' +
          'you’d go and why you prefer the mountains.',
        exampleAnswer:
          'Giulia, l’estate prossima vorrei affittare uno chalet in Trentino per una settimana. ' +
          'Andremo a fine luglio — farà meno caldo e potremo fare escursioni.',
        notes: 'andremo, farà, potremo — irregular stems in natural use.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Counter-propose and use the future of probability',
        prompt:
          'Giulia says the mountains will probably be too cold and suggests the Amalfi coast. ' +
          'Use the futuro di probabilità to acknowledge her point and suggest a compromise.',
        exampleAnswer:
          'Hai ragione, in montagna farà fresco — ma staremo bene così! ' +
          'Se preferisci il mare, potremmo fare tre giorni in Trentino e poi scendere in Campania.',
        notes:
          'farà fresco = futuro di probabilità (present guess about mountain weather). ' +
          'potremmo is conditional — accept it as a bonus construction.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Confirm the plan with quando and se',
        prompt:
          'Translate the compromise plan: "When we arrive in Trentino, we will hire bikes. ' +
          'If the weather is good, we will also do a boat trip on Lake Garda."',
        exampleAnswer:
          'Quando arriveremo in Trentino, noleggeremo le bici. ' +
          'Se il tempo sarà bello, faremo anche una gita in barca sul Lago di Garda.',
        notes: 'quando + future in both clauses; se + future.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Finalise and summarise',
        prompt:
          'Summarise the agreed holiday plan to Giulia in three to four future-tense sentences, ' +
          'including transport, accommodation, and one activity.',
        notes: 'Encourage at least two irregular stems and one travel vocabulary item.',
      },
    ],
  },

  // ── 10. Listening challenge ───────────────────────────────────────────────
  {
    slug: 'cap10-listening-travel-plans',
    title: 'Listening gym: travel plans and an announcement',
    lessonType: LessonType.listening_challenge,
    level: CEFRLevel.intermediate,
    summary:
      'Train your ear on two audio scenes: a conversation between friends planning a summer trip, ' +
      'and a gate announcement at an Italian airport. Pick out future-tense verbs, destination ' +
      'names, and key travel details.',
    objectiveSkillSlugs: ['it-vocab-vacation', 'it-future-simple'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['travel', 'culture', 'news'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'What to listen for',
        prompt:
          'Scene 1: two friends discuss their summer plans — listen for where they are going, ' +
          'how they are travelling, and when they leave. ' +
          'Scene 2: airport announcement — listen for the flight number, destination, and gate.',
        notes:
          'Script scene 1: Chiara and Luca talk for 60-70 words using andremo, prenderemo, ' +
          'partiremo, saremo. Script scene 2: 30-word gate announcement with standard Italian ' +
          'airport phrasing.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Scene 1 — where, how, when',
        prompt:
          'Where are Chiara and Luca going this summer, how will they travel, and on which date?',
        exampleAnswer:
          'They are going to Calabria. They will take the train from Milan and change in Naples. ' +
          'They leave on August 7.',
        notes: 'Engine fills in the detail from the script. Accept paraphrased answers.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Scene 1 — accommodation detail',
        prompt:
          'What type of accommodation have they booked? ' +
          '(a) a hotel (b) an agriturismo (c) a beach hostel',
        exampleAnswer:
          '(b) an agriturismo — Luca says "Ho trovato un bell’agriturismo vicino al mare."',
        notes: 'Rewards close listening to a specific vocabulary item.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Scene 2 — the gate announcement',
        prompt: 'What is the flight number, the destination city, and the boarding gate?',
        notes:
          'Script: "Attenzione: si comunicano le informazioni relative al volo AZ 742 per Catania. ' +
          'I passeggeri sono pregati di recarsi all’imbarco presso il gate 14. Il volo partirà ' +
          'tra venti minuti." Engine uses this or a similar standard announcement.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Key phrases from the airport',
        prompt:
          'What does "si è pregati di" mean, and which impersonal si rule does the announcement use?',
      },
    ],
  },

  // ── 11. Speaking challenge: dream trip ───────────────────────────────────
  {
    slug: 'cap10-speaking-dream-trip',
    title: 'Il tuo viaggio dei sogni — describe your dream trip',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.intermediate,
    summary:
      'Describe your dream Italian trip in the future tense: where you will go, what you will ' +
      'see and do, where you will stay, and what the weather will probably be like. A fluency ' +
      'challenge that draws on every grammar point in the chapter.',
    objectiveSkillSlugs: [
      'it-future-simple',
      'it-future-special-uses',
      'it-vocab-vacation',
      'it-impersonal-si',
    ],
    defaultDurationMinutes: 10,
    compatibleThemes: ['travel', 'culture', 'history', 'art'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'The speaking mission',
        prompt:
          'You’re going to describe your ideal Italian trip to Wise — real or imaginary. ' +
          'Aim for six to eight sentences using the future tense. Wise will ask follow-up questions.',
        notes: 'Let the learner choose any Italian destination. Prompt for specifics if too vague.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Destination and transport',
        prompt:
          'Where in Italy will you go, and how will you get there? Give at least two future-tense ' +
          'sentences.',
        notes:
          'Reward irregular stems (andrò, prenderò, volerò). Accept one slip without interrupting.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Accommodation and activities',
        prompt:
          'Where will you stay and what will you do? Use quando or appena in at least one sentence.',
        notes:
          'Elicits quando arriverò / appena troverò l’hotel. Watch for quando + present (the common error).',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'A conjecture about the trip',
        prompt:
          'Make one futuro di probabilità guess about your trip — the weather, the prices, ' +
          'or the crowds.',
        exampleAnswer: 'Farà caldo in luglio — le spiagge saranno probabilmente affollate.',
        notes: 'Reward any future used as a probability marker without a future time adverb.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assess',
        prompt:
          'Which future-tense form felt most natural? Which irregular stem are you still shaky on?',
      },
    ],
  },

  // ── 12. Speaking challenge: an Italian holiday ───────────────────────────
  {
    slug: 'cap10-speaking-italian-holiday',
    title: 'Una festa italiana — speak about a holiday you’d like to experience',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.intermediate,
    summary:
      'Choose an Italian holiday from the chapter’s festive calendar and describe in Italian how ' +
      'you would experience it — what you will do, what people generally do (impersonal si), ' +
      'and what it means to you personally.',
    objectiveSkillSlugs: ['it-vocab-holidays', 'it-impersonal-si', 'it-future-simple'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['culture', 'family', 'food', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Pick your festa',
        prompt:
          'Choose one Italian holiday: Natale, Capodanno, la Befana, Pasqua, or Ferragosto. ' +
          'You’ll describe how you’d experience it in Italy — mixing the future tense with ' +
          'impersonal si to contrast what you’ll do with what people generally do.',
        notes:
          'Guide the learner to choose based on their interests (food → Natale/Pasqua, travel → Ferragosto).',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Describe the holiday in general',
        prompt:
          'Use impersonal si to describe two or three things that people typically do on your ' +
          'chosen holiday in Italy.',
        exampleAnswer:
          'A Natale in Italia si scambiano i regali in famiglia, si mangia un pranzo lungo con ' +
          'molte portate e la sera si va alla Messa di mezzanotte.',
        notes: 'Three impersonal si in one short paragraph — model fluency, not perfection.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Your own future plans for the holiday',
        prompt:
          'Now say what YOU will specifically do if you spend that holiday in Italy. Use at least ' +
          'two future-tense verbs and quando or se.',
        notes:
          'Learner shifts from si (general) to first person (personal plan). Watch the tense switch.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Compare with your own culture',
        prompt:
          'Is there a similar celebration in your culture? How is it alike or different? Describe ' +
          'your tradition using si if you can.',
        notes:
          'Cross-cultural reflection deepens the vocabulary. Impersonal si for "nella mia cultura ' +
          'si fa…" is a natural, high-value transfer.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Language and culture together',
        prompt:
          'What’s one new Italian cultural fact about the holiday you didn’t know before, and one ' +
          'Italian phrase you’ll definitely remember?',
      },
    ],
  },

  // ── 13. Vocabulary review ─────────────────────────────────────────────────
  {
    slug: 'cap10-vocab-review-travel-holidays',
    title: 'Vocabolario in viaggio — vacation and holidays review',
    lessonType: LessonType.vocabulary_review,
    level: CEFRLevel.intermediate,
    summary:
      'A structured review of the chapter’s two vocabulary banks — le vacanze and le feste — ' +
      'through matching, gap-fill, and mini-translation, so the words stick before the final ' +
      'progress check.',
    objectiveSkillSlugs: ['it-vocab-vacation', 'it-vocab-holidays'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['travel', 'culture', 'family', 'food'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Two vocabulary sets',
        prompt:
          'We’ll review the travel vocabulary (la valigia, prenotare, il volo, la gita, ' +
          'all’estero…) and the holiday vocabulary (auguri, festeggiare, il Ferragosto, ' +
          'la Befana, i fuochi d’artificio…).',
        notes:
          'Display the full word list at the start. Learners can reference it during the first ' +
          'two tasks, then close it for the last two.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Match the definition',
        prompt:
          'Which word means "a day trip or short excursion"? ' +
          '(a) il viaggio (b) la gita (c) le ferie',
        exampleAnswer: '(b) la gita',
        notes:
          'Contrast la gita (short outing) vs il viaggio (a longer journey) vs le ferie (annual leave).',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Travel vocabulary in context',
        prompt:
          'Complete: "Ho ___ (to book) un albergo vicino alla ___ (beach). Non dimenticare il ' +
          '___ (passport) e la ___ (suitcase)! Il ___ (flight) parte alle sei e mezza."',
        exampleAnswer: 'prenotato … spiaggia … passaporto … valigia … volo',
        notes: 'prenotare → ho prenotato (passato prossimo review from earlier chapters).',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Holiday vocabulary in context',
        prompt:
          'Complete: "A Capodanno si fanno gli ___ (best wishes) e si guardano i ___ ' +
          '(fireworks). A Ferragosto molti italiani vanno in ___ (vacation). ' +
          'La ___ (Befana) porta i regali il 6 gennaio."',
        exampleAnswer: 'auguri … fuochi d’artificio … vacanza … Befana',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce from English',
        prompt:
          'Translate: "This year we will celebrate Easter abroad. We will look for a hotel near ' +
          'the sea and we will take a day trip to the nearest island."',
        exampleAnswer:
          'Quest’anno festeggeremo la Pasqua all’estero. Cercheremo un albergo vicino al mare ' +
          'e faremo una gita all’isola più vicina.',
        notes: 'festeggeremo (note the gg), cercheremo (h-insertion), faremo (irregular).',
      },
      {
        taskType: TaskType.recap,
        focus: 'Three words to keep',
        prompt: 'Pick three vocabulary items from this review that you want to use in real life.',
      },
    ],
  },

  // ── 14. Progress check ────────────────────────────────────────────────────
  {
    slug: 'cap10-progress-check',
    title: 'Capitolo 10 — checkpoint: travel, future, si',
    lessonType: LessonType.progress_check,
    level: CEFRLevel.intermediate,
    summary:
      'A mixed chapter checkpoint across all main topics: regular and irregular future stems, ' +
      'future of probability, quando + future, impersonal si (singular and plural), feminine ' +
      'noun formation, and chapter vocabulary — to reveal what is solid and what needs revision.',
    objectiveSkillSlugs: [
      'it-future-simple',
      'it-future-special-uses',
      'it-impersonal-si',
      'it-feminine-noun-formation',
      'it-vocab-vacation',
      'it-vocab-holidays',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['travel', 'culture', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Low-stakes check-in',
        prompt:
          'Let’s see where you are after Chapter 10. A few quick questions across all the topics — ' +
          'no pressure. The goal is to find out what to practise next.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Regular and irregular futures',
        prompt:
          'Complete: "___ (partire, noi) sabato mattina e ___ (arrivare) a Firenze nel pomeriggio. ' +
          'Lì ___ (essere, ci) una guida che ci aspetterà."',
        exampleAnswer: 'Partiremo … arriveremo … ci sarà',
        notes: 'partire and arrivare regular; essere → sarà (irregular).',
      },
      {
        taskType: TaskType.tense_selection,
        focus: 'Future of probability or future plan?',
        prompt:
          'Label each as (P) plan or (G) guess: ' +
          '(a) "Domani avremo bisogno di un ombrello." ' +
          '(b) "Quei signori saranno americani — parlano con quell’accento."',
        exampleAnswer:
          '(a) P — tomorrow is a plan/prediction; (b) G — guessing about who they are NOW',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Quando + future both clauses',
        prompt:
          'Complete: "Quando ___ (finire) le ferie, ___ (riprendere, io) a lavorare. ' +
          'Se ___ (fare) bel tempo lunedì, ___ (fare, noi) un’escursione."',
        exampleAnswer: 'finiranno … riprenderò … farà … faremo',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Impersonal si agreement',
        prompt:
          'Which is correct? ' +
          '(a) "Si vende i biglietti qui." ' +
          '(b) "Si vendono i biglietti qui." ' +
          '(c) "Si vendono il biglietto qui."',
        exampleAnswer:
          '(b) — i biglietti (plural) → si vendono (plural verb); the noun stays as the subject.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Feminine noun formation',
        prompt: 'Give the feminine: il direttore → ___; l’attore → ___; il turista → ___.',
        exampleAnswer: 'la direttrice; l’attrice; la turista',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assessment',
        prompt:
          'Which of the six topic areas — regular futures, irregular stems, probability future, ' +
          'quando/se clauses, impersonal si, feminine formation — do you want to revisit?',
      },
    ],
  },
];

export default { unitCode, lessons };
