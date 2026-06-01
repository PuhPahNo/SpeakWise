// Capitolo 15 — Le belle arti
// Theme: fine arts, literature, and archaeology (art + history). The passato
// remoto, ordinal numbers, volerci/metterci, and the gerund — set against
// Italy’s unrivalled artistic heritage.
//
// All content original (copyright-safe).

import { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client';
import type { SeedUnit } from '../types';

const unit: SeedUnit = {
  code: 'cap-15',
  order: 15,
  title: 'Le belle arti',
  subtitle: 'The historic past, the gerund, and Italy’s artistic heritage',
  theme: 'art',
  level: CEFRLevel.upper_intermediate,
  summary:
    'Step inside the world of Italian art, literature, and archaeology. You’ll narrate ' +
    'biographical and historical episodes using the passato remoto — the tense of Dante, Leonardo, ' +
    'and Garibaldi — describe what is happening right now with the gerund and progressive, count ' +
    'centuries and rank works with ordinal numbers, and say precisely how long things take with ' +
    'volerci and metterci. Vocabulary spans paintings, sculpture, and archaeological sites, and ' +
    'cultural notes illuminate the Florentine Renaissance, Dante’s legacy, and the living ' +
    'tradition of Italian dialects.',
  canDo: [
    'Narrate completed actions in the distant past using the passato remoto',
    'Recognise and use key irregular passato remoto forms (fui, feci, vidi, nacque, scrisse)',
    'Use the gerund for the progressive (sto leggendo) and for simultaneous/instrumental actions',
    'Refer to centuries (il Quattrocento, il Rinascimento) and rank things with ordinal numbers',
    'Distinguish volerci (impersonal: ci vuole un’ora) from metterci (personal: ci metto due ore)',
    'Discuss artworks, literature, and archaeological sites with field-specific vocabulary',
  ],
  culturalNotes: [
    {
      title: 'Firenze e il Rinascimento: the cradle of Western art',
      body:
        'Florence — Firenze — was the epicentre of the Rinascimento (Renaissance) in the fifteenth ' +
        'and sixteenth centuries. Under the patronage of the Medici family, artists such as ' +
        'Botticelli, Leonardo da Vinci, and Michelangelo transformed painting, sculpture, and ' +
        'architecture. The Galleria degli Uffizi, opened to the public in 1765, houses one of the ' +
        'greatest collections on earth: Botticelli’s Nascita di Venere, Leonardo’s Annunciazione, ' +
        'and Michelangelo’s Tondo Doni are all under one roof. Michelangelo’s David — technically ' +
        'the work of a sculptor who was also a poet — stands a short walk away in the Galleria ' +
        'dell’Accademia. Visiting the Uffizi requires patience: ci vuole almeno mezza giornata.',
    },
    {
      title: 'Dante: il padre della lingua italiana',
      body:
        'Dante Alighieri (1265–1321) is called the father of the Italian language because the ' +
        'Divina Commedia — written in his native Florentine dialect rather than Latin — gave ' +
        'Italian its literary standard. Before Dante, educated writing was in Latin; after him, ' +
        'the vernacular became a vehicle for serious art and ideas. His influence is visible in ' +
        'everyday Italian: words like lasciate (from Lasciate ogni speranza) and il sommo poeta ' +
        '(the supreme poet, always Dante) are still in common use. Every year on 25 March, ' +
        'the unofficial Dantedì, Italy marks the day scholars believe he began the journey ' +
        'through the Inferno.',
    },
    {
      title: 'Dialetti e lingua standard: Italy’s linguistic mosaic',
      body:
        'Italy was unified politically only in 1861, and for centuries each region — and each ' +
        'city — had its own dialect. Neapolitan, Venetian, Sicilian, and Milanese are not mere ' +
        'accents: they have distinct grammars and vocabularies. The passato remoto, for example, ' +
        'is the everyday past tense in the south and in literary Italian, but in the north and ' +
        'centre speakers prefer the passato prossimo for recent events. Standard Italian — based ' +
        'largely on Tuscan — became the national language through schools, radio, and television ' +
        'over the twentieth century, yet dialects remain vibrant, and many Italians code-switch ' +
        'between dialect and standard depending on the context.',
    },
  ],

  // ─── Skills ───────────────────────────────────────────────────────────────
  skills: [
    {
      slug: 'it-passato-remoto',
      name: 'The passato remoto (historic / literary past)',
      category: SkillCategory.grammar,
      level: CEFRLevel.upper_intermediate,
      description:
        'The passato remoto narrates actions completed in the distant past — in history, biography, ' +
        'literature, and fairy tales. Regular endings: -are → -ai/-asti/-ò/-ammo/-aste/-arono; ' +
        '-ere → -ei/-esti/-é/-emmo/-este/-erono; -ire → -ii/-isti/-ì/-immo/-iste/-irono. ' +
        'Many high-frequency verbs are irregular and must be learned individually.',
      prerequisiteSlugs: ['it-passato-prossimo-avere', 'it-passato-prossimo-essere'],
      examples: [
        {
          target: 'Dante scrisse la Divina Commedia all’inizio del Trecento.',
          native: 'Dante wrote the Divine Comedy at the beginning of the fourteenth century.',
          note: 'scrivere → scrisse (irregular -sse stem)',
        },
        {
          target: 'Michelangelo nacque a Caprese nel 1475 e morì a Roma nel 1564.',
          native: 'Michelangelo was born in Caprese in 1475 and died in Rome in 1564.',
          note: 'nascere → nacque; morire → morì (regular -ire)',
        },
        {
          target: 'I Romani costruirono il Colosseo nel primo secolo dopo Cristo.',
          native: 'The Romans built the Colosseum in the first century AD.',
          note: 'costruire → costruirono (regular -ire with -isc- group, passato remoto is regular)',
        },
        {
          target: 'Quando vidi il David di Michelangelo per la prima volta, rimasi senza parole.',
          native: 'When I saw Michelangelo’s David for the first time, I was left speechless.',
          note: 'vedere → vidi; rimanere → rimasi (both irregular)',
        },
      ],
      commonMistakes: [
        'using passato prossimo when passato remoto is required in formal/literary writing or in southern-style speech',
        'applying regular endings to highly irregular verbs: essere → "essetti" (wrong) → fui/fosti/fu',
        'misforming the -ere irregulars: fare → "facei" (wrong) → feci/facesti/fece',
        'confusing nacque (was born, nascere) with nacqui (I was born) — the vowel change is in the root, not just the ending',
      ],
      recommendedPracticeTypes: [
        TaskType.conjugation,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.error_correction,
      ],
      compatibleThemes: ['history', 'art', 'culture', 'film'],
      teachingNotes:
        'Present the passato remoto as the tense of books, history, and the distant past; ' +
        'contrast it with passato prossimo (recent past, northern/central Italian) to avoid ' +
        'interference. Drill the ten core irregulars (essere, avere, fare, dire, vedere, venire, ' +
        'nascere, scrivere, prendere, dare) as a set — these cover nearly all literary and ' +
        'historical narration. Art-history sentences are ideal practice material because they are ' +
        'intrinsically set in the remote past.',
    },
    {
      slug: 'it-ordinal-numbers',
      name: 'Ordinal numbers (primo, secondo … -esimo)',
      category: SkillCategory.grammar,
      level: CEFRLevel.upper_intermediate,
      description:
        'Ordinal numbers rank or sequence things. The first ten are irregular and must be memorised: ' +
        'primo, secondo, terzo, quarto, quinto, sesto, settimo, ottavo, nono, decimo. From eleven ' +
        'onwards, drop the final vowel of the cardinal and add -esimo (undicesimo, ventesimo, ' +
        'centesimo). Ordinals agree like adjectives in gender and number.',
      prerequisiteSlugs: ['it-vocab-numbers-1-100', 'it-adjectives-agreement'],
      examples: [
        {
          target: 'Il Quattrocento fu il primo grande secolo del Rinascimento italiano.',
          native: 'The fifteenth century was the first great century of the Italian Renaissance.',
          note: 'il Quattrocento = the 1400s; primo agrees with secolo (m. sg.)',
        },
        {
          target: 'Il David è al secondo piano della Galleria dell’Accademia.',
          native: 'The David is on the second floor of the Accademia Gallery.',
        },
        {
          target: 'Dante morì nell’ottocentoventesimo anno dalla nascita di Cristo.',
          native: 'Dante died in the 820th year from the birth of Christ.',
          note: 'compound ordinal: ottocentoventesimo — formed by dropping the final vowel of ottocentoventi then adding -esimo',
        },
        {
          target: 'Questa è la terza visita che faccio agli Uffizi.',
          native: 'This is my third visit to the Uffizi.',
        },
      ],
      commonMistakes: [
        'using cardinal numbers instead of ordinals for floors and centuries (il due piano → il secondo piano)',
        'forgetting agreement: la terza sala, not "il terza sala"',
        'misforming -esimo: undici → "undicesimo" is correct but learners often write "undicisimo" without the elided vowel',
        'confusing il Quattrocento (the 1400s, 15th century) with quattrocento (the number 400) — context and the capital letter distinguish them',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.translation,
      ],
      compatibleThemes: ['history', 'art', 'culture', 'travel'],
      teachingNotes:
        'The century-naming convention (il Quattrocento, il Cinquecento, il Seicento) is the ' +
        'most immediately useful application for art and history contexts — teach it as a cultural ' +
        'shorthand. Tie ordinals to rankings the learner cares about: top-five artworks, first ' +
        'impressions, third room in a museum.',
    },
    {
      slug: 'it-volerci-metterci',
      name: 'Volerci and metterci (expressing how long things take)',
      category: SkillCategory.grammar,
      level: CEFRLevel.upper_intermediate,
      description:
        'Volerci is impersonal and says how long something objectively takes or what is needed: ' +
        'ci vuole un’ora / ci vogliono tre anni. Metterci is personal and says how long a ' +
        'specific person takes to do something: ci metto venti minuti / lui ci ha messo un’ora.',
      prerequisiteSlugs: ['it-ci'],
      examples: [
        {
          target: 'Per restaurare un affresco ci vogliono mesi di lavoro paziente.',
          native: 'Restoring a fresco takes months of patient work.',
          note: 'volerci impersonal: ci vogliono (plural subject: mesi)',
        },
        {
          target: 'Michelangelo ci mise quattro anni a dipingere la Cappella Sistina.',
          native: 'Michelangelo took four years to paint the Sistine Chapel.',
          note: 'metterci personal: soggetto espresso (Michelangelo), passato remoto mettere → mise',
        },
        {
          target: 'Quanto ci vuole per arrivare agli Uffizi a piedi?',
          native: 'How long does it take to get to the Uffizi on foot?',
          note: 'volerci in a question with quanto — singular vuole because no explicit noun yet',
        },
        {
          target: 'Ci metto sempre un po’ a capire le iscrizioni latine.',
          native: 'I always take a little while to understand Latin inscriptions.',
          note: 'metterci with un po’ — ci metto signals the speaker as the agent',
        },
      ],
      commonMistakes: [
        'using volerci for a personal subject: "Io ci vuole un’ora" is wrong — use ci metto un’ora',
        'forgetting to make ci vogliono plural when the subject is plural (ci vuole ore → ci vogliono ore)',
        'omitting ci entirely and saying "vuole un’ora" — the ci is obligatory in both constructions',
        'confusing the past tenses: volerci past → ci è voluto/ci sono voluti; metterci past → ci ho messo/ci ha messo',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.error_correction,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['art', 'travel', 'history', 'culture'],
      teachingNotes:
        'The impersonal/personal contrast is the whole lesson: volerci describes the task, ' +
        'metterci describes the person doing it. Use art-restoration and museum-visit contexts ' +
        'naturally (ci vuole pazienza per capire l’arte; ci metto sempre un’ora agli Uffizi). ' +
        'Drill the plural agreement of ci vogliono — learners default to vuole even for plural nouns.',
    },
    {
      slug: 'it-gerund',
      name: 'The gerund and the progressive (il gerundio)',
      category: SkillCategory.grammar,
      level: CEFRLevel.upper_intermediate,
      description:
        'The gerundio is formed by adding -ando (-are verbs) or -endo (-ere and -ire verbs) to the ' +
        'infinitive stem. Use stare + gerundio for the present/past progressive. As a free-standing ' +
        'clause it expresses simultaneous or instrumental action. Irregulars include facendo, ' +
        'dicendo, bevendo. Pronouns attach to the gerund.',
      prerequisiteSlugs: ['it-regular-are-verbs-present', 'it-regular-ere-verbs-present'],
      examples: [
        {
          target: 'Sto leggendo la biografia di Leonardo da Vinci.',
          native: 'I’m reading the biography of Leonardo da Vinci.',
          note: 'stare + gerundio for the present progressive',
        },
        {
          target: 'Sbagliando si impara.',
          native: 'One learns by making mistakes.',
          note: 'gerund as instrumental clause — a classic Italian proverb',
        },
        {
          target: 'Camminando per le sale degli Uffizi, mi resi conto di quanto fosse grande.',
          native: 'Walking through the rooms of the Uffizi, I realised how grand it was.',
          note: 'simultaneous action: the gerund shares its subject with the main verb',
        },
        {
          target: 'Vedendolo da vicino, il colore dell’affresco è sorprendente.',
          native: 'Seeing it up close, the colour of the fresco is surprising.',
          note: 'pronoun attached to the gerund: vedendo + lo',
        },
      ],
      commonMistakes: [
        'using the gerund with a different subject from the main clause (dangling gerund): "Visitando il museo, la pioggia è iniziata" — la pioggia did not visit the museum',
        'forming the gerund from the infinitive + ando/endo instead of the stem: "avereendo" — correct is avendo',
        'forgetting irregulars: "fareando" → facendo; "direendo" → dicendo; "bereendo" → bevendo',
        'placing a pronoun before the gerund instead of attaching it: "lo vedendo" → vedendolo',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.conjugation,
        TaskType.translation,
        TaskType.error_correction,
      ],
      compatibleThemes: ['art', 'culture', 'travel', 'history'],
      teachingNotes:
        'Introduce stare + gerundio first as a direct translation of the English progressive — ' +
        'high payoff for low effort. Then move to the free-standing gerund (simultaneous / ' +
        'instrumental), which has no exact English equivalent and requires a subject-agreement ' +
        'check. The Sbagliando si impara proverb is a memorable anchor for the instrumental use. ' +
        'Drill pronoun attachment (vedendolo, scrivendola) as a separate micro-task.',
    },
    {
      slug: 'it-vocab-art',
      name: 'The language of art (l’arte e la pittura)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.upper_intermediate,
      description:
        'The vocabulary of paintings, sculpture, and galleries: names for artworks, techniques, ' +
        'and the spaces where they are displayed. Also covers key literary terms — novel, poem, ' +
        'author — for discussing Italy’s rich literary tradition.',
      prerequisiteSlugs: ['it-noun-gender', 'it-definite-articles'],
      examples: [
        {
          target: 'Il capolavoro di Botticelli è conservato agli Uffizi.',
          native: 'Botticelli’s masterpiece is kept at the Uffizi.',
        },
        {
          target: 'La Divina Commedia è il poema più famoso della letteratura italiana.',
          native: 'The Divine Comedy is the most famous poem in Italian literature.',
        },
        {
          target:
            'Lo stile di Caravaggio si riconosce subito per il forte contrasto tra luce e ombra.',
          native:
            'Caravaggio’s style is immediately recognisable for the strong contrast between light and shadow.',
          note: 'stile (m.) — common noun in art discussion',
        },
      ],
      commonMistakes: [
        'confusing il quadro (a framed painting, picture) with il dipinto (a painting considered as art/process) — both are correct but nuanced',
        'using la poesia both for a single poem and for poetry in general — both usages are correct in Italian',
        'misgendering l’affresco (m.) — beginners often treat it as feminine by analogy with la fresca',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.fill_blank,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['art', 'history', 'culture', 'travel'],
      teachingNotes:
        'Group items thematically: visual arts (quadro, dipinto, scultura, affresco, galleria) ' +
        'then literature (romanzo, poesia, poeta, scrittore, capitolo). Use images of actual works ' +
        'to anchor each word — learners remember the painting more readily than an abstract gloss. ' +
        'The word capolavoro (masterpiece) is high-frequency and emotionally satisfying to use.',
    },
    {
      slug: 'it-vocab-artists',
      name: 'Artists, architects, and archaeologists',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.upper_intermediate,
      description:
        'People who create and preserve art: painters, sculptors, architects, and the archaeologists ' +
        'who excavate Italy’s ancient past. Includes key terms for archaeological sites and ' +
        'restoration work.',
      prerequisiteSlugs: ['it-noun-gender', 'it-vocab-art'],
      examples: [
        {
          target:
            'Il pittore usò la tecnica dell’affresco per decorare l’intera volta della cappella.',
          native:
            'The painter used the fresco technique to decorate the entire vault of the chapel.',
        },
        {
          target: 'Gli scavi di Pompei riportarono alla luce reperti straordinari.',
          native: 'The excavations at Pompeii brought extraordinary finds to light.',
          note: 'gli scavi (pl. m.) — archaeological digs',
        },
        {
          target: 'L’architetto progettò il nuovo museo partendo dalle rovine antiche.',
          native: 'The architect designed the new museum starting from the ancient ruins.',
        },
      ],
      commonMistakes: [
        'using lo scultore for a female sculptor — the correct feminine is la scultrice',
        'confusing il reperto (an archaeological find/artefact) with il rapporto (a report) — false-cognate risk',
        'treating antico as equivalent to vecchio — antico implies a specific historical and cultural ancientness, not just age',
      ],
      recommendedPracticeTypes: [TaskType.fill_blank, TaskType.multiple_choice, TaskType.roleplay],
      compatibleThemes: ['art', 'history', 'culture', 'travel'],
      teachingNotes:
        'Introduce the professional titles with both genders prominently (il pittore / la pittrice, ' +
        'lo scultore / la scultrice) — learners often default to masculine forms. The archaeology ' +
        'cluster (scavi, rovine, reperto, restauro) is especially useful for Italy-travel contexts ' +
        'and pairs naturally with the passato remoto when narrating discoveries.',
    },
  ],

  // ─── Lesson templates ─────────────────────────────────────────────────────
  lessonTemplates: [
    {
      slug: 'cap15-passato-remoto-biography',
      title: 'La vita di Leonardo — narrating the distant past',
      lessonType: LessonType.grammar,
      level: CEFRLevel.upper_intermediate,
      summary:
        'Build the passato remoto from first principles and put it straight to work narrating a ' +
        'biographical episode from Leonardo da Vinci’s life. Master the regular paradigms ' +
        'and the ten core irregulars that power historical and literary narration.',
      objectiveSkillSlugs: ['it-passato-remoto'],
      defaultDurationMinutes: 14,
      compatibleThemes: ['art', 'history', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'When to use the passato remoto',
          prompt:
            'The passato remoto is the tense of completed, distant-past actions — history, ' +
            'biography, fairy tales, and formal narrative. In the north and centre of Italy ' +
            'the passato prossimo covers most past contexts in speech; in the south and in ' +
            'writing, the passato remoto dominates. For literature and history, you always need it.',
          notes:
            'Draw the north/south contrast explicitly — learners who have studied Italian in the ' +
            'north may find the passato remoto unfamiliar in conversation. Frame it as the literary ' +
            'and formal register, essential for reading and educated writing.',
        },
        {
          taskType: TaskType.conjugation,
          focus: 'Regular paradigms across all three conjugations',
          prompt:
            'Conjugate three verbs in the passato remoto: parlare (io, lui, loro), ' +
            'credere (tu, noi, voi), and partire (io, lei, noi).',
          exampleAnswer:
            'parlai, parlò, parlarono; credesti, credemmo, credeste; partii, partì, partimmo',
          notes:
            'Emphasise the double-i in -ire verbs (partii, partì) — the written accent distinguishes ' +
            'the third-person singular from the first-person singular without it.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Core irregulars in context',
          prompt:
            'Complete the biography: "Leonardo ___ (nascere) a Vinci nel 1452. Da giovane ___ ' +
            '(andare) a Firenze, dove ___ (vedere) i grandi maestri del Quattrocento. Più tardi ' +
            '___ (fare) esperimenti di volo e ___ (scrivere) migliaia di pagine nei suoi quaderni."',
          exampleAnswer: 'nacque; andò; vide; fece; scrisse',
          notes:
            'All five are irregular. If the learner answers "naccette" or "farei" etc., flag the ' +
            'irregular stems rather than just correcting the ending.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Translate a historical passage',
          prompt:
            'Translate into Italian: "Michelangelo was born in 1475 and died in 1564. He took ' +
            'four years to paint the Sistine Chapel ceiling and said that the work nearly ' +
            'destroyed his eyesight."',
          exampleAnswer:
            'Michelangelo nacque nel 1475 e morì nel 1564. Ci mise quattro anni a dipingere ' +
            'la volta della Cappella Sistina e disse che il lavoro gli rovinò quasi la vista.',
          notes:
            'Reward correct passato remoto throughout. Note that ci mise previews the volerci/' +
            'metterci skill. Accept disse or affermò for "said".',
        },
        {
          taskType: TaskType.recap,
          focus: 'Irregular passato remoto hit-list',
          prompt:
            'Quick fire: give the io and lui/lei forms of essere, fare, vedere, venire, scrivere.',
          exampleAnswer: 'fui/fu; feci/fece; vidi/vide; venni/venne; scrissi/scrisse',
        },
      ],
    },
    {
      slug: 'cap15-gerund-progressive',
      title: 'Sto guardando un Caravaggio — the gerund in action',
      lessonType: LessonType.grammar,
      level: CEFRLevel.upper_intermediate,
      summary:
        'Form the gerundio for all three conjugation classes, use stare + gerundio for the ' +
        'progressive, and practise the free-standing gerund for simultaneous and instrumental ' +
        'actions — with pronouns attached.',
      objectiveSkillSlugs: ['it-gerund'],
      defaultDurationMinutes: 11,
      compatibleThemes: ['art', 'culture', 'travel'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Forming the gerundio and its three uses',
          prompt:
            'The gerundio is built from the stem: -are verbs → -ando (visitare → visitando); ' +
            '-ere and -ire verbs → -endo (leggere → leggendo; capire → capendo). Three uses: ' +
            '(1) stare + gerundio = progressive (Sto visitando il museo); ' +
            '(2) simultaneous action (Passeggiando, pensavo a Dante); ' +
            '(3) instrumental, "by doing" (Studiando si migliora). ' +
            'Irregulars: facendo, dicendo, bevendo.',
          notes:
            'Keep the three uses clearly labelled. Learners often know the progressive instinctively ' +
            'from English but are less confident with the free-standing gerund. Use art-visit contexts.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Build gerunds — including irregulars',
          prompt:
            'Form the gerundio: leggere → ___; fare → ___; scrivere → ___; dire → ___; ' +
            'osservare → ___; bere → ___.',
          exampleAnswer: 'leggendo; facendo; scrivendo; dicendo; osservando; bevendo',
          notes:
            'The three irregulars (fare, dire, bere) come from the short Latin stems fac-/dic-/bev- ' +
            'rather than the infinitive. If the learner writes "fareando" etc., explain the Latin-stem rule.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Progressive and simultaneous use',
          prompt:
            'Translate: "What are you reading? — I’m reading a novel about the Renaissance. ' +
            'Walking through the Uffizi, I realised I knew very little about Florentine painting."',
          exampleAnswer:
            'Cosa stai leggendo? — Sto leggendo un romanzo sul Rinascimento. ' +
            'Camminando per gli Uffizi, mi resi conto di sapere pochissimo sulla pittura fiorentina.',
          notes:
            'The second sentence practises the simultaneous gerund. Accept mi accorsi as an ' +
            'alternative to mi resi conto — both are passato remoto of verbs of realising.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Attach the pronoun to the gerund',
          prompt:
            'Rewrite using a gerund + attached pronoun: ' +
            '"Mentre guardavo il quadro, lo fotografai" → ___ , lo fotografai; ' +
            '"Mentre leggevo la guida, la annotavo tutta" → ___ , la annotavo tutta.',
          exampleAnswer: 'Guardandolo, lo fotografai; Leggendola, la annotavo tutta',
          notes:
            'In each case the direct object pronoun shifts from the separate mentre-clause to ' +
            'attachment on the gerund. Reinforce that the pronoun is appended, not prepended.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Describe what you are doing / learning',
          prompt:
            'Use at least two gerund constructions: say what you are currently doing to improve ' +
            'your Italian, and describe what you were thinking about while doing something today.',
          notes:
            'No single correct answer. Reward stare + gerundio and at least one free-standing gerund. ' +
            'Personalise: if the learner is interested in art, prompt them to imagine walking through ' +
            'a gallery; if music, prompt a concert or rehearsal.',
        },
      ],
    },
    {
      slug: 'cap15-museum-visit-roleplay',
      title: 'Benvenuti agli Uffizi — a guided museum visit',
      lessonType: LessonType.scenario_roleplay,
      level: CEFRLevel.upper_intermediate,
      summary:
        'You are visiting the Uffizi in Florence. Describe a painting, ask the guide questions, ' +
        'use ordinal numbers to navigate the gallery, and say how long the visit takes with ' +
        'volerci and metterci.',
      objectiveSkillSlugs: ['it-vocab-art', 'it-ordinal-numbers', 'it-volerci-metterci'],
      defaultDurationMinutes: 13,
      compatibleThemes: ['art', 'travel', 'history'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Set the scene — la Galleria degli Uffizi',
          prompt:
            'You’re standing at the entrance of the Uffizi in Florence. The gallery has 45 rooms ' +
            'across three floors, and you have three hours. Wise is your personal guide. ' +
            'Let’s start in the second room on the first floor, where Cimabue and Giotto hang.',
          notes:
            'Use real gallery details to ground the lesson. If the learner has been to Florence, ' +
            'ask them to recall it; if not, paint a vivid picture.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Navigate with ordinals',
          prompt:
            'Complete the directions: "Saliamo al ___ piano, entriamo nella ___ sala a destra, ' +
            'e troviamo il Botticelli nella ___-quarta sala."',
          exampleAnswer: 'primo; seconda; ventiquattresima',
          notes:
            'Compound ordinals (ventiquattresima) are the challenge here. Accept ventiquattresimo ' +
            'if the learner writes it — then clarify agreement with sala (f.).',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'Describe a painting',
          prompt:
            'You are standing in front of Botticelli’s Primavera. Describe what you see in ' +
            'at least four sentences: the subject, the style, colours, and your impression. ' +
            'Use at least one gerund (stai guardando / vedendola…).',
          exampleAnswer:
            'Sto guardando la Primavera di Botticelli. Il dipinto raffigura tre donne che ballano e ' +
            'una figura femminile al centro, probabilmente Venere. Lo stile è delicato e i colori ' +
            'sono luminosi. Guardandola da vicino, noto molti dettagli nei fiori e nei vestiti.',
          notes:
            'Reward use of art vocabulary (dipinto, stile, capolavoro), the progressive, and the ' +
            'gerund. Let the learner choose any famous painting they prefer if they find Primavera ' +
            'unfamiliar — personalise to their interest.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Volerci and metterci in the visit',
          prompt:
            'Translate: "How long does it usually take to see the whole Uffizi? ' +
            'Most visitors take about three hours. I always take longer because I stop in front of ' +
            'every painting."',
          exampleAnswer:
            'Quanto ci vuole di solito per vedere tutto gli Uffizi? ' +
            'La maggior parte dei visitatori ci mette circa tre ore. ' +
            'Io ci metto sempre di più perché mi fermo davanti a ogni quadro.',
          notes:
            'The first sentence uses volerci (impersonal); the second and third use metterci ' +
            '(personal: i visitatori / io). Flag the contrast explicitly in feedback.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Gallery vocabulary to keep',
          prompt:
            'Which five words or phrases from today’s visit would you use again on a real trip to Florence?',
        },
      ],
    },
    {
      slug: 'cap15-vocab-art-archaeology',
      title: 'Dal pennello agli scavi — art and archaeology vocabulary',
      lessonType: LessonType.vocabulary_review,
      level: CEFRLevel.upper_intermediate,
      summary:
        'Consolidate the full art-and-archaeology lexicon: visual arts, literary terms, ' +
        'professional titles (with gender), and the vocabulary of archaeological digs and restoration.',
      objectiveSkillSlugs: ['it-vocab-art', 'it-vocab-artists'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['art', 'history', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Two worlds: art studio and excavation site',
          prompt:
            'Italy is both a living gallery and an open-air archaeological park. Today we build ' +
            'vocabulary for both worlds — from the painter’s brushstroke to the archaeologist’s trowel.',
          notes:
            'If the learner has an interest in a specific period (Roman, Renaissance, Baroque), ' +
            'weight examples accordingly.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Art terms in context',
          prompt:
            'Choose the right word: "La Nascita di Venere è ___ (un quadro / un affresco / una scultura) ' +
            'di Botticelli. Il David è ___ (un dipinto / una scultura / un romanzo) di Michelangelo."',
          exampleAnswer: 'un quadro (it is a tempera panel painting, not a fresco); una scultura',
          notes:
            'The first answer is a good teaching moment: the Nascita di Venere is painted on canvas ' +
            'with egg tempera, not a fresco. If the learner says affresco, explain the distinction.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Professional titles — gender agreement',
          prompt:
            'Complete with the correct form: "Artemisia Gentileschi fu una grande ___ (pittore) del ' +
            'Seicento. Francesca è ___ (architetto) e sta restaurando un palazzo cinquecentesco. ' +
            'Il team di ___ (archeologo, pl.) ha scoperto nuovi ___ (reperto, pl.) a Ercolano."',
          exampleAnswer:
            'pittrice; architetta (or architetto — both accepted); archeologi; reperti',
          notes:
            'Architetta is increasingly standard alongside the gender-neutral architetto. ' +
            'Accept both. Pittrice (not pittora) is the form to insist on.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Free production — your favourite work',
          prompt:
            'Describe your favourite painting, sculpture, or book. Use at least four vocabulary ' +
            'items from today, including a professional title and one art-technique term.',
          notes:
            'This is open-ended by design. Personalise to the learner’s stated interests. ' +
            'A learner who loves cinema could describe a famous film poster or discuss a director ' +
            'as an artista / genio.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Key terms consolidated',
          prompt:
            'Give the Italian for: masterpiece, fresco, novel, archaeologist (f.), excavation, restoration.',
          exampleAnswer:
            'il capolavoro; l’affresco; il romanzo; l’archeologa; gli scavi; il restauro',
        },
      ],
    },
    {
      slug: 'cap15-volerci-metterci-drill',
      title: 'Quanto ci vuole? — volerci vs metterci',
      lessonType: LessonType.grammar,
      level: CEFRLevel.upper_intermediate,
      summary:
        'Master the impersonal/personal contrast between volerci and metterci through focused ' +
        'drills, error correction, and a speaking challenge timed to the learner’s daily life.',
      objectiveSkillSlugs: ['it-volerci-metterci'],
      defaultDurationMinutes: 9,
      compatibleThemes: ['art', 'travel', 'culture', 'history'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'The impersonal/personal split',
          prompt:
            'Volerci = how long the TASK takes (impersonal): Ci vuole un anno per restaurare ' +
            'un affresco. Ci vogliono due ore per visitare Pompei. ' +
            'Metterci = how long a PERSON takes (personal): Il team ci ha messo un anno. ' +
            'Io ci metto due ore. The key test: can you replace the subject with "it"? ' +
            'If yes → volerci. If you need a specific person → metterci.',
          notes:
            'The "it takes" / "I take" distinction maps cleanly to English here. Use it as an anchor.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Volerci or metterci?',
          prompt:
            'Choose: "Per imparare l’italiano ___ (ci vuole / ci metto) almeno due anni." ' +
            'And: "Mia sorella ___ (ci vuole / ci mette) un’ora per truccarsi."',
          exampleAnswer: 'ci vogliono (anni = plural); ci mette',
          notes:
            'Note that the first sentence requires ci vogliono not ci vuole because anni is plural.',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Fix the errors',
          prompt:
            'Find and correct: "Per fare il pane ci mette due ore." / ' +
            '"Io ci vuole trenta minuti ad arrivare al lavoro." / ' +
            '"Gli scavi di Pompei ci sono messo cento anni."',
          exampleAnswer:
            'ci vogliono (impersonal task); ci metto (personal subject io); ' +
            'ci sono voluti (past volerci with plural subject: cento anni)',
          notes:
            'Three different error types in one task: wrong verb choice, wrong verb choice again, ' +
            'and incorrect past-tense formation of volerci.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Your own time estimates',
          prompt:
            'Answer three questions using volerci and metterci: ' +
            'How long does it take to visit the Colosseum? How long do you personally take to ' +
            'read a novel? How long did it take to learn to drive?',
          notes:
            'The first uses volerci (general); the second and third use metterci (personal). ' +
            'Reward correct ci vogliono for plural time expressions.',
        },
        {
          taskType: TaskType.recap,
          focus: 'One-sentence rule',
          prompt: 'In one sentence, explain when you use volerci and when you use metterci.',
          exampleAnswer:
            'Volerci is impersonal (the task takes…); metterci is personal (I / he / she takes…).',
        },
      ],
    },
  ],

  // ─── Thematic vocabulary bank ─────────────────────────────────────────────
  vocabulary: [
    // L’arte (visual arts)
    {
      slug: 'cap15-larte',
      targetText: 'l’arte',
      nativeText: 'art (f.; i.e. l’arte, le arti)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'l-arte',
      exampleSentence: 'L’arte italiana è famosa in tutto il mondo.',
      exampleTranslation: 'Italian art is famous throughout the world.',
    },
    {
      slug: 'cap15-il-quadro',
      targetText: 'il quadro',
      nativeText: 'the painting / picture (framed work)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'l-arte',
      exampleSentence: 'Ho comprato un quadro al mercato dell’antiquariato.',
      exampleTranslation: 'I bought a painting at the antique market.',
    },
    {
      slug: 'cap15-il-dipinto',
      targetText: 'il dipinto',
      nativeText: 'the painting (considered as artwork / process)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'l-arte',
    },
    {
      slug: 'cap15-la-pittura',
      targetText: 'la pittura',
      nativeText: 'painting (the art form); also: paint',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'l-arte',
    },
    {
      slug: 'cap15-la-scultura',
      targetText: 'la scultura',
      nativeText: 'the sculpture / sculpting',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'l-arte',
      exampleSentence: 'La scultura rinascimentale raggiunse il suo apice con Michelangelo.',
      exampleTranslation: 'Renaissance sculpture reached its peak with Michelangelo.',
    },
    {
      slug: 'cap15-laffresco',
      targetText: 'l’affresco',
      nativeText: 'the fresco (wall painting on wet plaster)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'l-arte',
      exampleSentence: 'Gli affreschi della Cappella Sistina sono capolavori assoluti.',
      exampleTranslation: 'The frescoes of the Sistine Chapel are absolute masterpieces.',
    },
    {
      slug: 'cap15-la-galleria',
      targetText: 'la galleria',
      nativeText: 'the gallery (art museum / covered arcade)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'l-arte',
      exampleSentence: 'La Galleria degli Uffizi ospita oltre duemila opere.',
      exampleTranslation: 'The Uffizi Gallery houses over two thousand works.',
    },
    {
      slug: 'cap15-il-capolavoro',
      targetText: 'il capolavoro',
      nativeText: 'the masterpiece',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'l-arte',
      exampleSentence: 'Secondo molti critici, la Gioconda è il capolavoro di Leonardo.',
      exampleTranslation: 'According to many critics, the Mona Lisa is Leonardo’s masterpiece.',
    },
    {
      slug: 'cap15-la-mostra',
      targetText: 'la mostra',
      nativeText: 'the exhibition / show',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'l-arte',
    },
    {
      slug: 'cap15-lo-stile',
      targetText: 'lo stile',
      nativeText: 'the style',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'l-arte',
      exampleSentence: 'Lo stile di Caravaggio è dominato dal chiaroscuro.',
      exampleTranslation: 'Caravaggio’s style is dominated by chiaroscuro.',
    },
    // La letteratura (literature)
    {
      slug: 'cap15-il-romanzo',
      targetText: 'il romanzo',
      nativeText: 'the novel',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-letteratura',
      exampleSentence: 'I promessi sposi è il romanzo più letto della letteratura italiana.',
      exampleTranslation: 'The Betrothed is the most widely read novel in Italian literature.',
    },
    {
      slug: 'cap15-la-poesia',
      targetText: 'la poesia',
      nativeText: 'the poem; poetry (in general)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-letteratura',
      exampleSentence: 'Le poesie di Leopardi sono ancora studiate nelle scuole italiane.',
      exampleTranslation: 'Leopardi’s poems are still studied in Italian schools.',
    },
    {
      slug: 'cap15-lo-scrittore',
      targetText: 'lo scrittore / la scrittrice',
      nativeText: 'the writer (m. / f.)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-letteratura',
    },
    {
      slug: 'cap15-il-poeta',
      targetText: 'il poeta / la poetessa',
      nativeText: 'the poet (m. / f.)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-letteratura',
      exampleSentence: 'Dante è considerato il sommo poeta della lingua italiana.',
      exampleTranslation: 'Dante is considered the supreme poet of the Italian language.',
    },
    {
      slug: 'cap15-il-capitolo',
      targetText: 'il capitolo',
      nativeText: 'the chapter',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-letteratura',
    },
    // L’archeologia (archaeology)
    {
      slug: 'cap15-gli-scavi',
      targetText: 'gli scavi',
      nativeText: 'the excavations / archaeological dig (always plural)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'l-archeologia',
      exampleSentence: 'Gli scavi di Ercolano rivelarono una città quasi intatta.',
      exampleTranslation: 'The excavations at Herculaneum revealed a nearly intact city.',
    },
    {
      slug: 'cap15-le-rovine',
      targetText: 'le rovine',
      nativeText: 'the ruins (usually plural)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'l-archeologia',
      exampleSentence: 'Le rovine del Foro Romano attirano milioni di turisti ogni anno.',
      exampleTranslation: 'The ruins of the Roman Forum attract millions of tourists every year.',
    },
    {
      slug: 'cap15-il-reperto',
      targetText: 'il reperto',
      nativeText: 'the archaeological find / artefact',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'l-archeologia',
    },
    {
      slug: 'cap15-antico',
      targetText: 'antico',
      nativeText: 'ancient / antique (implies historical and cultural age)',
      partOfSpeech: 'adj',
      theme: 'l-archeologia',
      exampleSentence: 'Roma è ricca di monumenti antichi.',
      exampleTranslation: 'Rome is full of ancient monuments.',
    },
    {
      slug: 'cap15-il-restauro',
      targetText: 'il restauro',
      nativeText: 'the restoration (of an artwork or building)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'l-archeologia',
      exampleSentence: 'Il restauro del Colosseo è durato molti anni.',
      exampleTranslation: 'The restoration of the Colosseum took many years.',
    },
    // Il/la pittore/pittrice, lo scultore, etc.
    {
      slug: 'cap15-il-pittore',
      targetText: 'il pittore / la pittrice',
      nativeText: 'the painter (m. / f.)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'l-arte',
      exampleSentence: 'Artemisia Gentileschi fu una delle più grandi pittrici del Seicento.',
      exampleTranslation:
        'Artemisia Gentileschi was one of the greatest painters of the seventeenth century.',
    },
    {
      slug: 'cap15-lo-scultore',
      targetText: 'lo scultore / la scultrice',
      nativeText: 'the sculptor (m. / f.)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'l-arte',
    },
    {
      slug: 'cap15-larchitetto',
      targetText: 'l’architetto / l’architetta',
      nativeText: 'the architect (m. / f.)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'l-arte',
    },
    {
      slug: 'cap15-il-genio',
      targetText: 'il genio',
      nativeText: 'the genius',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'l-arte',
      exampleSentence: 'Leonardo da Vinci è spesso descritto come il genio universale.',
      exampleTranslation: 'Leonardo da Vinci is often described as the universal genius.',
    },
    {
      slug: 'cap15-larcheologo',
      targetText: 'l’archeologo / l’archeologa',
      nativeText: 'the archaeologist (m. / f.)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'l-archeologia',
      exampleSentence: 'L’archeologa ha trovato un mosaico romano durante gli scavi.',
      exampleTranslation: 'The archaeologist found a Roman mosaic during the excavations.',
    },
  ],
};

export default unit;
