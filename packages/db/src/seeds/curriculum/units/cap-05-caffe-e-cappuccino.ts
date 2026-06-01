// Capitolo 5 — Caffè e cappuccino
// Theme: the Italian bar / café (food). Articulated prepositions, passato
// prossimo with both auxiliaries, and the conoscere / sapere distinction —
// all set inside the ritual of the Italian bar.
//
// All content original (copyright-safe).

import { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client';
import type { SeedUnit } from '../types';

const unit: SeedUnit = {
  code: 'cap-05',
  order: 5,
  title: 'Caffè e cappuccino',
  subtitle: 'At the bar — and your first past tense',
  theme: 'food',
  level: CEFRLevel.lower_intermediate,
  summary:
    'Walk into the most Italian of institutions — the bar — and order, pay, and chat with confidence. ' +
    'Along the way you acquire two essential tools: articulated prepositions (al bar, del caffè, ' +
    'nel centro) and the passato prossimo, so you can recount what you ate, drank, and where you ' +
    'went yesterday. You also learn to distinguish knowing a person from knowing a fact.',
  canDo: [
    'Order coffee, a pastry, or a drink at an Italian bar and pay at the cassa',
    'Use articulated prepositions (al, del, nel, sul…) correctly in speech and writing',
    'Say what you did, ate, and drank using passato prossimo with avere',
    'Recount where you went and what happened using passato prossimo with essere',
    'Distinguish conoscere (acquainted with) from sapere (know a fact / know how to)',
    'Describe a typical Italian breakfast and contrast it with your own',
  ],
  culturalNotes: [
    {
      title: 'Pay at the cassa first',
      body:
        'In many Italian bars — especially in southern Italy and Naples — you walk to the cassa ' +
        '(cash register), pay, and hand your scontrino (receipt) to the barista. Ordering directly at ' +
        'the counter without paying first can cause confusion, and a polite barista will simply redirect ' +
        'you to the cassa. The system keeps lines short and the espresso flowing.',
    },
    {
      title: 'Standing at the banco — and why cappuccino stops at noon',
      body:
        'Italians typically drink their espresso standing at the banco (counter), which is faster and ' +
        'often slightly cheaper than sitting at a table. Cappuccino is a morning drink: the warm milk ' +
        'is considered too heavy after a meal, and ordering one in the afternoon or after dinner will ' +
        'mark you immediately as a tourist. In Naples, the local espresso — made with a darker roast ' +
        'and a touch of chicory — is so prized that a caffè sospeso (a "suspended coffee" paid in ' +
        'advance for a stranger) is a living tradition of generosity.',
    },
    {
      title: 'L’aperitivo: the pre-dinner ritual',
      body:
        'From around 6 pm, bars across Italy shift into aperitivo mode. Order a Campari, Aperol spritz, ' +
        'or Negroni and you will often receive a small spread of crostini, olive, and stuzzichini at no ' +
        'extra cost — especially in Milan and Bologna. The aperitivo hour is social, not about getting ' +
        'drunk: it is the warm-up to dinner, a way to decompress after work, and a chance to see friends ' +
        'before the meal.',
    },
  ],

  // ─── Skills ───────────────────────────────────────────────────────────────
  skills: [
    {
      slug: 'it-articulated-prepositions',
      name: 'Articulated prepositions (preposizioni articolate)',
      category: SkillCategory.grammar,
      level: CEFRLevel.lower_intermediate,
      description:
        'When the prepositions a, di, da, in, and su come directly before a definite article, they ' +
        'fuse into a single contracted form — al bar, dello zucchero, dalla stazione, nel centro, ' +
        'sul tavolo. The prepositions con and per do not normally contract. The di + article ' +
        'combination also serves as the partitive: del pane means "some bread".',
      prerequisiteSlugs: ['it-definite-articles', 'it-simple-prepositions'],
      examples: [
        {
          target: 'Vado al bar ogni mattina.',
          native: 'I go to the bar every morning.',
          note: 'a + il → al',
        },
        {
          target: 'Vuoi del cappuccino?',
          native: 'Do you want some cappuccino?',
          note: 'di + il → del (partitive "some")',
        },
        {
          target: 'Il libro è sul tavolo, vicino alla tazza.',
          native: 'The book is on the table, near the cup.',
          note: 'su + il → sul; a + la → alla',
        },
        {
          target: 'Arriva dalla stazione alle otto.',
          native: 'She arrives from the station at eight.',
          note: 'da + la → dalla; a + le → alle',
        },
        {
          target: 'Ho preso un cornetto dallo scaffale.',
          native: 'I took a croissant from the shelf.',
          note: 'da + lo → dallo (s+consonant trigger)',
        },
      ],
      commonMistakes: [
        'forgetting to contract at all and writing "a il bar" instead of "al bar"',
        'using the wrong trigger form — writing "del stadio" instead of "dello stadio" (s+cons)',
        'contracting con or per (corretto: con il caffè, NOT "col caffè" in formal registers — col exists colloquially but is not expected at this level)',
        'omitting the partitive and writing "Voglio pane" when "del pane" is more natural',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.error_correction,
        TaskType.multiple_choice,
      ],
      compatibleThemes: ['food', 'travel', 'family', 'culture'],
      teachingNotes:
        'Teach the contraction as a sound rule, not a memorized list: the preposition and article ' +
        'simply blend to avoid the clash of two short words. Build the table by preposition, always ' +
        'drilling the uno/uno-trigger cases (allo, dello, dallo, nello, sullo) because they surprise ' +
        'learners most. Introduce the partitive (del / della / dei / degli / delle) as a bonus use of ' +
        'the same contraction — it makes the forms feel well-used from the first lesson.',
    },
    {
      slug: 'it-passato-prossimo-avere',
      name: 'Passato prossimo with avere',
      category: SkillCategory.grammar,
      level: CEFRLevel.lower_intermediate,
      description:
        'The passato prossimo is Italian’s main past tense for completed actions: present of avere + ' +
        'past participle. Regular past participles: -are verbs → -ato (mangiare → mangiato), -ere ' +
        'verbs → -uto (vendere → venduto), -ire verbs → -ito (dormire → dormito). Key irregular ' +
        'past participles to learn by heart: fatto (fare), detto (dire), letto (leggere), scritto ' +
        '(scrivere), visto (vedere), preso (prendere), messo (mettere), chiuso (chiudere), bevuto ' +
        '(bere), aperto (aprire), offerto (offrire), chiesto (chiedere), risposto (rispondere).',
      prerequisiteSlugs: ['it-avere-present', 'it-regular-are-verbs-present'],
      examples: [
        {
          target: 'Ho preso un caffè al banco.',
          native: 'I had a coffee at the counter.',
          note: 'prendere → preso (irregular)',
        },
        {
          target: 'Abbiamo mangiato due cornetti stamattina.',
          native: 'We ate two croissants this morning.',
          note: 'mangiare → mangiato (regular -are)',
        },
        {
          target: 'Hai letto il menù?',
          native: 'Did you read the menu?',
          note: 'leggere → letto (irregular)',
        },
        {
          target: 'Il barista ha offerto un caffè sospeso.',
          native: 'The barista offered a suspended coffee.',
          note: 'offrire → offerto (irregular)',
        },
      ],
      commonMistakes: [
        'using the infinitive instead of the past participle (ho mangiare → ho mangiato)',
        'applying -uto to -are verbs (ho mangiuto → ho mangiato)',
        'forgetting irregular forms — especially bevuto (not "bevito"), fatto (not "facito"), visto (not "veduto" in modern usage)',
        'making the past participle agree with the subject when avere is the auxiliary — agreement only applies with certain direct object pronouns, not here',
      ],
      recommendedPracticeTypes: [
        TaskType.conjugation,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.error_correction,
      ],
      compatibleThemes: ['food', 'travel', 'family', 'culture'],
      teachingNotes:
        'Anchor irregular past participles in the bar setting: ho preso, ho bevuto, ho fatto — these ' +
        'three cover 80% of bar conversations. Teach the regulars first as a systematic pattern, then ' +
        'introduce the irregulars as a short "must-know" list. Keep direct-object agreement with ' +
        'pronouns out of scope for this chapter — that is cap-06.',
    },
    {
      slug: 'it-passato-prossimo-essere',
      name: 'Passato prossimo with essere (+ agreement)',
      category: SkillCategory.grammar,
      level: CEFRLevel.lower_intermediate,
      description:
        'Some verbs form the passato prossimo with essere instead of avere. When they do, the past ' +
        'participle must agree with the subject in gender and number, just like an adjective: è andato ' +
        '(m. sg.), è andata (f. sg.), sono andati (m. pl.), sono andate (f. pl.). Essere verbs are ' +
        'mainly verbs of motion, change of state, and staying: andare, venire, arrivare, partire, ' +
        'uscire, entrare, tornare, nascere, morire, diventare, stare, essere, restare, cadere, piacere.',
      prerequisiteSlugs: ['it-passato-prossimo-avere', 'it-essere-present'],
      examples: [
        {
          target: 'Marco è andato al bar, ma Sara è rimasta a casa.',
          native: 'Marco went to the bar, but Sara stayed home.',
          note: 'agreement: -o for Marco, -a for Sara',
        },
        {
          target: 'Siamo usciti alle otto e siamo arrivati tardi.',
          native: 'We (m./mixed) left at eight and arrived late.',
          note: '-i for mixed-gender plural',
        },
        {
          target: 'Le ragazze sono entrate nel bar e si sono sedute al banco.',
          native: 'The girls went into the bar and sat at the counter.',
          note: '-e for all-female plural',
        },
      ],
      commonMistakes: [
        'using avere with motion verbs (ho andato → sono andato)',
        'forgetting agreement and leaving the participle in the default -o form regardless of subject',
        'treating uscire as regular (-uto) — it is uscito',
        'confusing stare (stato) with essere (also stato) — both use essere and both give stato',
      ],
      recommendedPracticeTypes: [
        TaskType.conjugation,
        TaskType.fill_blank,
        TaskType.error_correction,
        TaskType.translation,
      ],
      compatibleThemes: ['travel', 'food', 'family', 'culture'],
      teachingNotes:
        'Teach the essere list as a coherent semantic group: "you can visualize the movement or the ' +
        'change." Agreement is the non-negotiable feature — drill it with mixed-gender scenarios and ' +
        'pairs (Marco è andato / Maria è andata). Contrast directly with avere to prevent cross-talk.',
    },
    {
      slug: 'it-conoscere-sapere',
      name: 'Conoscere vs sapere',
      category: SkillCategory.grammar,
      level: CEFRLevel.lower_intermediate,
      description:
        'Both verbs translate as "to know" but cover different territory. Conoscere means to be ' +
        'personally acquainted with a person or place: conosco Roma, conosco Marco. Sapere means to ' +
        'know a fact or piece of information, and sapere + infinitive means to know how to do ' +
        'something: so nuotare, sai dov’è il bar? In the passato prossimo, both shift meaning: ' +
        'ho conosciuto = I met (someone for the first time); ho saputo = I found out (a piece of news).',
      prerequisiteSlugs: ['it-regular-are-verbs-present', 'it-passato-prossimo-avere'],
      examples: [
        {
          target: 'Conosco un ottimo bar in centro.',
          native: 'I know a great bar downtown.',
          note: 'conoscere = acquainted with a place',
        },
        {
          target: 'Sai fare il risotto?',
          native: 'Do you know how to make risotto?',
          note: 'sapere + infinitive = know how to',
        },
        {
          target: 'Ho conosciuto la barista ieri.',
          native: 'I met the barista yesterday.',
          note: 'passato prossimo shifts meaning: first meeting',
        },
        {
          target: 'Ho saputo che il bar è chiuso oggi.',
          native: 'I found out that the bar is closed today.',
          note: 'passato prossimo: newly discovered information',
        },
      ],
      commonMistakes: [
        'using sapere for personal acquaintance (so Marco → conosco Marco)',
        'using conoscere for facts (conosco che… → so che…)',
        'forgetting that sapere before an infinitive means "know how to" (so cucinare ≠ I know cooking)',
        'ignoring the passato prossimo meaning shift — "l’ho conosciuto" means I met him, not just that I know him',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['food', 'travel', 'family', 'culture'],
      teachingNotes:
        'The cleanest mnemonic: conoscere = faces and places (personal, experiential), sapere = facts ' +
        'and skills (propositional). Test with three question types: "Do you know + a person?" ' +
        '(conoscere), "Do you know + a fact/that…?" (sapere), "Do you know how to…?" (sapere + inf). ' +
        'The passato prossimo semantic shift is high-value and rewarding — teach it once clearly.',
    },
    {
      slug: 'it-vocab-bar-drinks',
      name: 'Drinks and snacks at the Italian bar',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.lower_intermediate,
      description:
        'The drinks and light bites you will order at a bar: coffees (espresso, cappuccino, macchiato), ' +
        'soft drinks, water, juice, beer, wine, aperitivo, and the savoury and sweet snacks that go ' +
        'with them.',
      prerequisiteSlugs: ['it-noun-gender', 'it-definite-articles'],
      examples: [
        { target: 'Un espresso, per favore.', native: 'An espresso, please.' },
        {
          target: 'Prendo un tramezzino e un’acqua minerale gassata.',
          native: 'I’ll have a sandwich and a sparkling mineral water.',
        },
        {
          target: 'Per l’aperitivo prendo uno Spritz.',
          native: 'For aperitivo I’ll have a Spritz.',
        },
      ],
      commonMistakes: [
        'ordering "un caffè americano" when you want an espresso-style coffee — un caffè means espresso by default',
        'using espresso when caffè is the natural word at the bar counter',
        'mixing up gassata (sparkling) and naturale (still) when ordering water',
      ],
      recommendedPracticeTypes: [
        TaskType.roleplay,
        TaskType.multiple_choice,
        TaskType.speaking_prompt,
        TaskType.fill_blank,
      ],
      compatibleThemes: ['food', 'travel', 'culture'],
      teachingNotes:
        'Frame vocabulary in the ordering sequence: greet → say what you want → mention how ' +
        '(al banco/al tavolo) → pay at the cassa. Link each drink to its social moment (espresso = ' +
        'quick stop, cappuccino = breakfast, Spritz = aperitivo). Personalize to the learner’s actual ' +
        'coffee or drink habits.',
    },
    {
      slug: 'it-vocab-breakfast',
      name: 'Breakfast (la colazione)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.lower_intermediate,
      description:
        'The vocabulary of the Italian morning meal: fare colazione, the typical items on the table ' +
        '(latte, burro, marmellata, biscotti, pane tostato, cornetto), and the contrast with other ' +
        'breakfast cultures.',
      prerequisiteSlugs: ['it-noun-gender', 'it-definite-articles'],
      examples: [
        {
          target: 'Di solito faccio colazione al bar con un cappuccino e un cornetto.',
          native: 'I usually have breakfast at the bar with a cappuccino and a croissant.',
        },
        {
          target: 'Vuoi del latte o del succo d’arancia?',
          native: 'Do you want some milk or some orange juice?',
          note: 'partitive del/della in action',
        },
        {
          target: 'Ho mangiato del pane tostato con la marmellata.',
          native: 'I ate some toast with jam.',
        },
      ],
      commonMistakes: [
        'saying "fare la colazione" — the article is dropped in the idiom: fare colazione',
        'calling the Italian bar croissant a "croissant" — the Italian word is cornetto (or brioche in the south)',
        'confusing il latte (milk) with il lattè (a latte-style drink) — in Italy, asking for un latte at a bar will get you a glass of cold milk',
      ],
      recommendedPracticeTypes: [
        TaskType.speaking_prompt,
        TaskType.fill_blank,
        TaskType.roleplay,
        TaskType.translation,
      ],
      compatibleThemes: ['food', 'family', 'culture'],
      teachingNotes:
        'Contrast Italian breakfast culture (light, sweet, quick, at the bar) with the learner’s own ' +
        'breakfast habits — the contrast makes vocabulary stick. The cornetto/brioche regional variant ' +
        'is a good Napoli cultural hook. Weave in the partitive del/della/dei so students practise ' +
        'articulated prepositions in a natural context.',
    },
  ],

  // ─── Lesson templates ─────────────────────────────────────────────────────
  lessonTemplates: [
    {
      slug: 'cap05-order-a-coffee',
      title: 'Order, pay, and chat at the bar',
      lessonType: LessonType.scenario_roleplay,
      level: CEFRLevel.lower_intermediate,
      summary:
        'You step into a Neapolitan bar on a Tuesday morning. Pay at the cassa, order at the banco, ' +
        'and have a short exchange with the barista — deploying articulated prepositions as you go.',
      objectiveSkillSlugs: ['it-articulated-prepositions', 'it-vocab-bar-drinks'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['food', 'travel', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Set the scene and the goal',
          prompt:
            'You’re in Naples. Before you order, you need to pay at the cassa. Let’s get through the full ritual.',
          notes:
            'Briefly explain the cassa system to set expectations. If the learner’s profile shows an interest in travel or food, anchor the bar to a real Italian city they want to visit.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Choose the correct articulated preposition',
          prompt: 'You want to go to the bar. Which is correct: "Vado a il bar" or "Vado al bar"?',
          exampleAnswer: 'Vado al bar.',
          notes:
            'Explain the a + il → al contraction. Contrast with "Vado alla stazione" for variety.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Partitive — ask for "some"',
          prompt: 'Order some mineral water: "Vorrei ___ acqua minerale naturale, per favore."',
          exampleAnswer: 'dell’',
          notes:
            'di + l’ before feminine vowel → dell’. Praise the learner for using a new pattern.',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'Full bar ordering sequence',
          prompt: 'Pay at the cassa, then order a coffee and a pastry at the counter.',
          exampleAnswer: 'Buongiorno! Un caffè e un cornetto, per favore. … Grazie, arrivederci!',
          notes:
            'Personalize the pastry to the learner’s preference (cornetto, brioche, pasta…). Reward correct use of al banco and alla cassa.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Lock in the contraction pattern',
          prompt: 'What does a + il become, and when do you use dello instead of del?',
          notes: 'One takeaway per point. Keep it short.',
        },
      ],
    },
    {
      slug: 'cap05-preposizioni-articolate',
      title: 'Articulated prepositions — the full picture',
      lessonType: LessonType.grammar,
      level: CEFRLevel.lower_intermediate,
      summary:
        'Build the full contraction table for a, di, da, in, and su, then put every form to work in ' +
        'food and travel sentences — including the partitive.',
      objectiveSkillSlugs: ['it-articulated-prepositions'],
      defaultDurationMinutes: 12,
      compatibleThemes: ['food', 'travel', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'The contraction logic',
          prompt:
            'Think of the preposition and article as two magnets that snap together. Here’s the full table for a, di, da, in, su.',
          notes:
            'Present the table visually if possible. Highlight the uno-trigger forms in a different colour: allo, dello, dallo, nello, sullo.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'a + article',
          prompt: 'Complete: Torno ___ ufficio (m. sg.) e poi vado ___ stadio (m. s+cons).',
          exampleAnswer: 'all’ufficio — allo stadio',
          notes: 'The a + l’ elision before vowel is a small win; flag it.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'di as partitive',
          prompt: 'Ask for some bread and some pastries: "Vorrei ___ pane e ___ paste."',
          exampleAnswer: 'del pane, delle paste',
          notes: 'Paste (plural feminine) → delle. Make the partitive feel natural, not extra.',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Catch the un-contracted form',
          prompt: 'Fix: "Il cornetto è su il tavolo vicino a la finestra."',
          exampleAnswer: 'Il cornetto è sul tavolo vicino alla finestra.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Production under mild pressure',
          prompt: 'Translate: "She came from the station and sat near the bar counter."',
          exampleAnswer: 'È venuta dalla stazione e si è seduta vicino al banco.',
          notes: 'This surfaces da + la and a + il simultaneously.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Self-quiz',
          prompt: 'Without looking, give the contracted form of: in + gli, su + le, da + lo.',
          exampleAnswer: 'negli, sulle, dallo',
        },
      ],
    },
    {
      slug: 'cap05-what-you-did-yesterday',
      title: 'What did you eat yesterday?',
      lessonType: LessonType.grammar,
      level: CEFRLevel.lower_intermediate,
      summary:
        'Build the passato prossimo with avere from scratch, starting with what you had for breakfast ' +
        'and building to a full account of yesterday morning — with all the irregulars you need at a ' +
        'café.',
      objectiveSkillSlugs: [
        'it-passato-prossimo-avere',
        'it-vocab-bar-drinks',
        'it-vocab-breakfast',
      ],
      defaultDurationMinutes: 12,
      compatibleThemes: ['food', 'family', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'The formula: avere + past participle',
          prompt:
            'The passato prossimo has two parts: the right form of avere, and the past participle of the main verb. Let’s build it together.',
          notes:
            'Lead with the three regular patterns (-ato, -uto, -ito), then list the key irregulars for the café context: preso, bevuto, mangiato, fatto, detto.',
        },
        {
          taskType: TaskType.conjugation,
          focus: 'Regular past participles',
          prompt:
            'Give the passato prossimo (io) for: mangiare, bere (→ bevuto), prendere (→ preso).',
          exampleAnswer: 'ho mangiato, ho bevuto, ho preso',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Put it in a sentence',
          prompt:
            'Complete: "Stamattina (io) ___ (fare) colazione al bar e ___ (bere) un cappuccino."',
          exampleAnswer: 'ho fatto … ho bevuto',
          notes: 'Fare → fatto and bere → bevuto are the two key irregulars for this chapter.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Full sentence production',
          prompt: 'Translate: "Did you order a croissant and a coffee this morning?"',
          exampleAnswer: 'Hai ordinato un cornetto e un caffè stamattina?',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Describe your real morning',
          prompt: 'What did you eat and drink this morning? Give two or three sentences.',
          notes:
            'Pull from the learner’s real breakfast context if known. Accept approximate Italian and focus feedback on auxiliary + participle accuracy.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Irregular hit-list',
          prompt: 'Quick fire: past participle of fare, bere, prendere, vedere, aprire.',
          exampleAnswer: 'fatto, bevuto, preso, visto, aperto',
        },
      ],
    },
    {
      slug: 'cap05-where-did-you-go',
      title: 'Where did you go? — essere in the past',
      lessonType: LessonType.grammar,
      level: CEFRLevel.lower_intermediate,
      summary:
        'Learn why some verbs — all the motion and change-of-state verbs — take essere in the passato ' +
        'prossimo, and master the agreement rule that comes with them.',
      objectiveSkillSlugs: ['it-passato-prossimo-essere', 'it-articulated-prepositions'],
      defaultDurationMinutes: 11,
      compatibleThemes: ['travel', 'food', 'family'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Essere verbs and why the participle agrees',
          prompt:
            'A handful of verbs use essere as their auxiliary — mostly verbs of motion and change. When they do, the past participle acts like an adjective: it changes ending to match the subject.',
          notes:
            'Contrast visually: "ho mangiato" (avere, no change) vs "sono andato/a" (essere, changes). The motion/change-of-state mnemonic is enough for now.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Pick the right auxiliary',
          prompt: 'Which auxiliary do you need? "Ieri Marco ___ uscito presto." (ha / è)',
          exampleAnswer: 'è',
          notes: 'Uscire is a classic essere verb. Explain once, then move to agreement.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Agreement in context',
          prompt:
            'Choose the ending: "Giulia è arrivat___ dal bar; poi i ragazzi sono arrivat___ dopo."',
          exampleAnswer: 'arrivata … arrivati',
          notes:
            'Giulia (f. sg.) → -a; i ragazzi (m. pl.) → -i. Side-by-side contrast is powerful.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Recount a mini-itinerary',
          prompt:
            'Translate: "Yesterday I went to the bar, I had a coffee, and then I came back home."',
          exampleAnswer:
            'Ieri sono andato/a al bar, ho preso un caffè, e poi sono tornato/a a casa.',
          notes:
            'This sentence contains both auxiliaries naturally. Note the mixed auxiliary usage without making it feel overwhelming.',
        },
        {
          taskType: TaskType.recap,
          focus: 'The essere list',
          prompt: 'Name five verbs that take essere in the passato prossimo.',
          notes: 'Any correct five from the essere list count. Praise specificity.',
        },
      ],
    },
    {
      slug: 'cap05-conoscere-vs-sapere',
      title: 'Do you know this city? Do you know how to make coffee?',
      lessonType: LessonType.grammar,
      level: CEFRLevel.lower_intermediate,
      summary:
        'Separate two "know" verbs that confuse English speakers — conoscere (acquainted with people ' +
        'and places) vs sapere (facts and skills) — and use both in the passato prossimo for their ' +
        'shifted meanings.',
      objectiveSkillSlugs: ['it-conoscere-sapere'],
      defaultDurationMinutes: 9,
      compatibleThemes: ['food', 'travel', 'culture', 'family'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Faces and places vs facts and skills',
          prompt:
            'Conoscere is for people and places you’re personally acquainted with. Sapere is for facts, news, and skills (sapere + infinitive).',
          notes:
            'One clear diagram or contrast table is worth a paragraph of explanation. Include the passato prossimo meaning shift briefly.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Choose the right verb',
          prompt: 'Which is correct: "Conosco / So dov’è il bar"?',
          exampleAnswer: 'So dov’è il bar.',
          notes: 'Knowing a fact (the location) = sapere.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Production in mini-dialogue',
          prompt:
            'Fill in: "— ___ (tu) Roma? — Sì, la ___ bene. — E ___ dove si fa il miglior caffè?"',
          exampleAnswer: 'Conosci … conosco … sai',
          notes:
            'Three rapid-fire choices test the boundary. The third is sapere because it asks for a fact.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Passato prossimo meaning shift',
          prompt: 'Translate: "I met the barista yesterday and I found out the bar opens at six."',
          exampleAnswer: 'Ieri ho conosciuto il barista e ho saputo che il bar apre alle sei.',
          notes:
            'Both verbs in the passato prossimo, both with shifted meaning. Point it out once.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Personalize both verbs',
          prompt:
            'Say one person or place you know (conoscere), and one fact or skill you know (sapere).',
          notes:
            'Use the learner’s real world: a city they’ve visited, a language skill, a person. Free production is the goal.',
        },
        {
          taskType: TaskType.reflection,
          focus: 'Check your intuition',
          prompt:
            'In your own language, is there a distinction like conoscere vs sapere, or does one word cover both?',
          notes:
            'Metacognitive reflection helps retention. No right answer — just notice the contrast.',
        },
      ],
    },
  ],

  // ─── Thematic vocabulary bank ─────────────────────────────────────────────
  vocabulary: [
    // Bevande (drinks)
    {
      slug: 'cap05-il-caffe',
      targetText: 'il caffè',
      nativeText: 'the coffee / espresso',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'bevande',
      exampleSentence: 'Un caffè, per favore — al banco.',
      exampleTranslation: 'An espresso, please — at the counter.',
    },
    {
      slug: 'cap05-lespresso',
      targetText: 'l’espresso',
      nativeText: 'the espresso',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'bevande',
    },
    {
      slug: 'cap05-il-cappuccino',
      targetText: 'il cappuccino',
      nativeText: 'the cappuccino',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'bevande',
      exampleSentence: 'Il cappuccino si beve la mattina, non dopo pranzo.',
      exampleTranslation: 'Cappuccino is drunk in the morning, not after lunch.',
    },
    {
      slug: 'cap05-il-macchiato',
      targetText: 'il macchiato',
      nativeText: 'the macchiato (espresso with a dash of milk)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'bevande',
    },
    {
      slug: 'cap05-il-te',
      targetText: 'il tè',
      nativeText: 'the tea',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'bevande',
    },
    {
      slug: 'cap05-lacqua-minerale',
      targetText: 'l’acqua minerale',
      nativeText: 'the mineral water',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'bevande',
      exampleSentence: 'Acqua minerale gassata o naturale?',
      exampleTranslation: 'Sparkling or still mineral water?',
    },
    {
      slug: 'cap05-la-spremuta',
      targetText: 'la spremuta',
      nativeText: 'the freshly squeezed juice',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'bevande',
      exampleSentence: 'Ho preso una spremuta d’arancia stamattina.',
      exampleTranslation: 'I had a freshly squeezed orange juice this morning.',
    },
    {
      slug: 'cap05-il-succo-darancia',
      targetText: 'il succo d’arancia',
      nativeText: 'the orange juice (packaged)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'bevande',
    },
    {
      slug: 'cap05-la-birra',
      targetText: 'la birra',
      nativeText: 'the beer',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'bevande',
    },
    {
      slug: 'cap05-il-vino',
      targetText: 'il vino',
      nativeText: 'the wine',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'bevande',
    },
    {
      slug: 'cap05-laperivo',
      targetText: 'l’aperitivo',
      nativeText: 'the aperitif / pre-dinner drink',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'bevande',
      exampleSentence: 'Andiamo a prendere un aperitivo alle sette?',
      exampleTranslation: 'Shall we go for an aperitivo at seven?',
    },
    // Al bar (snacks and bar items)
    {
      slug: 'cap05-il-cornetto',
      targetText: 'il cornetto',
      nativeText: 'the croissant / Italian breakfast pastry',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'al-bar',
      exampleSentence: 'Ho mangiato un cornetto alla crema al bar.',
      exampleTranslation: 'I ate a cream-filled croissant at the bar.',
    },
    {
      slug: 'cap05-il-tramezzino',
      targetText: 'il tramezzino',
      nativeText: 'the crustless sandwich (bar staple)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'al-bar',
    },
    {
      slug: 'cap05-il-panino',
      targetText: 'il panino',
      nativeText: 'the sandwich roll',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'al-bar',
      exampleSentence: 'Hai preso un panino al prosciutto?',
      exampleTranslation: 'Did you have a ham sandwich?',
    },
    {
      slug: 'cap05-lo-spuntino',
      targetText: 'lo spuntino',
      nativeText: 'the snack',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'al-bar',
    },
    {
      slug: 'cap05-la-pasta',
      targetText: 'la pasta',
      nativeText: 'the pastry (at a bar)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'al-bar',
      exampleSentence: 'In questo bar le paste sono sempre fresche.',
      exampleTranslation: 'In this bar the pastries are always fresh.',
    },
    {
      slug: 'cap05-il-banco',
      targetText: 'il banco',
      nativeText: 'the counter (at a bar)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'al-bar',
      exampleSentence: 'Gli italiani bevono il caffè al banco.',
      exampleTranslation: 'Italians drink their coffee at the counter.',
    },
    {
      slug: 'cap05-la-cassa',
      targetText: 'la cassa',
      nativeText: 'the cash register / cashier',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'al-bar',
      exampleSentence: 'Prima si paga alla cassa.',
      exampleTranslation: 'You pay at the cashier first.',
    },
    {
      slug: 'cap05-lo-scontrino',
      targetText: 'lo scontrino',
      nativeText: 'the receipt',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'al-bar',
    },
    // Colazione (breakfast)
    {
      slug: 'cap05-la-colazione',
      targetText: 'la colazione',
      nativeText: 'breakfast',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'colazione',
      exampleSentence: 'Ogni mattina faccio colazione in dieci minuti.',
      exampleTranslation: 'Every morning I have breakfast in ten minutes.',
    },
    {
      slug: 'cap05-fare-colazione',
      targetText: 'fare colazione',
      nativeText: 'to have breakfast (idiom)',
      partOfSpeech: 'phrase',
      theme: 'colazione',
    },
    {
      slug: 'cap05-il-latte',
      targetText: 'il latte',
      nativeText: 'the milk',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'colazione',
    },
    {
      slug: 'cap05-il-burro',
      targetText: 'il burro',
      nativeText: 'the butter',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'colazione',
    },
    {
      slug: 'cap05-la-marmellata',
      targetText: 'la marmellata',
      nativeText: 'the jam',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'colazione',
      exampleSentence: 'Ho spalmato la marmellata sul pane tostato.',
      exampleTranslation: 'I spread the jam on the toast.',
    },
    {
      slug: 'cap05-i-biscotti',
      targetText: 'i biscotti',
      nativeText: 'the biscuits / cookies',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'colazione',
    },
    {
      slug: 'cap05-il-pane-tostato',
      targetText: 'il pane tostato',
      nativeText: 'the toast',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'colazione',
    },
    {
      slug: 'cap05-lo-zucchero',
      targetText: 'lo zucchero',
      nativeText: 'the sugar',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'colazione',
      exampleSentence: 'Vuoi dello zucchero nel caffè?',
      exampleTranslation: 'Do you want some sugar in your coffee?',
    },
    {
      slug: 'cap05-il-miele',
      targetText: 'il miele',
      nativeText: 'the honey',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'colazione',
    },
    {
      slug: 'cap05-luovo',
      targetText: 'l’uovo (pl. le uova)',
      nativeText: 'the egg (pl. the eggs)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'colazione',
      exampleSentence: 'Le uova sono irregolari: singolare maschile, plurale femminile.',
      exampleTranslation: 'Eggs are irregular: masculine singular, feminine plural.',
    },
  ],
};

export default unit;
