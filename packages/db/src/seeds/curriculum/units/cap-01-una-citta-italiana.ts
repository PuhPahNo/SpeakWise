// Capitolo 1 — Una città italiana
// Theme: an Italian city / getting around (travel). Places, transport, and
// directions, powered by the grammar of nouns, the indefinite article, the
// verb avere, subject pronouns, and the idioms built on avere.
//
// All content original (copyright-safe).

import { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client';
import type { SeedUnit } from '../types';

const unit: SeedUnit = {
  code: 'cap-01',
  order: 1,
  title: 'Una città italiana',
  subtitle: 'Places, transport, and finding your way',
  theme: 'travel',
  level: CEFRLevel.complete_beginner,
  summary:
    'Step into an Italian city. Name the places around you, get from the station to the piazza by ' +
    'train, bus, or on foot, and ask for directions — while picking up the grammatical machinery that ' +
    'underlies all of it: noun gender and number, the indefinite article, and the essential verb avere.',
  canDo: [
    'Name the key places in a town and the ways to get around it',
    'Ask for and follow simple directions',
    'Identify a noun’s gender and form its plural',
    'Use un / uno / una / un’ correctly before a noun',
    'Conjugate avere in the present and use it to say what you have',
    'Express states with avere idioms (I’m hungry, I’m in a hurry)',
  ],
  culturalNotes: [
    {
      title: 'The piazza is the living room',
      body:
        'The central piazza is where an Italian town gathers — for the passeggiata (evening stroll), ' +
        'a coffee, the market, or just to see and be seen. Streets and life radiate out from it.',
    },
    {
      title: 'Stamp before you board',
      body:
        'On many regional trains and buses you must validate (convalidare) your paper ticket in a ' +
        'small machine before boarding. An unstamped ticket can be treated as no ticket at all.',
    },
  ],

  // ─── Skills ───────────────────────────────────────────────────────────────
  skills: [
    {
      slug: 'it-noun-gender',
      name: 'Noun gender (masculine and feminine)',
      category: SkillCategory.grammar,
      level: CEFRLevel.complete_beginner,
      description:
        'Every Italian noun is either masculine or feminine. Most nouns ending in -o are masculine and ' +
        'most ending in -a are feminine; nouns ending in -e can be either and must be learned with their gender.',
      prerequisiteSlugs: [],
      examples: [
        { target: 'il libro', native: 'the book (m)' },
        { target: 'la casa', native: 'the house (f)' },
        {
          target: 'la stazione',
          native: 'the station (f)',
          note: '-e noun, gender must be memorized',
        },
      ],
      commonMistakes: [
        'assuming every -e noun is masculine',
        'guessing gender from the English meaning instead of the ending',
        'mismatching the article to the noun’s gender',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.fill_blank,
        TaskType.error_correction,
      ],
      compatibleThemes: ['travel', 'food', 'family', 'culture'],
      teachingNotes:
        'Teach gender as a property you store WITH the noun (learn “la stazione”, never bare “stazione”). ' +
        'The -o/-a heuristic is reliable; the -e nouns are the ones to flag and drill.',
    },
    {
      slug: 'it-noun-plurals',
      name: 'Forming plurals (number)',
      category: SkillCategory.grammar,
      level: CEFRLevel.complete_beginner,
      description:
        'Italian forms plurals by changing the final vowel, not by adding -s: -o → -i, -a → -e, and ' +
        '-e → -i for both genders.',
      prerequisiteSlugs: ['it-noun-gender'],
      examples: [
        { target: 'libro → libri', native: 'book → books' },
        { target: 'casa → case', native: 'house → houses' },
        { target: 'stazione → stazioni', native: 'station → stations' },
      ],
      commonMistakes: [
        'adding -s the English way (libros)',
        'turning -a feminines into -i instead of -e (cases → should be case)',
        'forgetting that -e nouns of both genders go to -i',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.conjugation,
      ],
      compatibleThemes: ['travel', 'food', 'family', 'culture'],
      teachingNotes:
        'Anchor the three patterns to the three endings. Watch for the trap that -a→-e looks like a ' +
        'singular -e noun. Defer spelling-change plurals (-co/-go, -ca/-ga) to a later unit.',
    },
    {
      slug: 'it-indefinite-articles',
      name: 'Indefinite articles (un, uno, una, un’)',
      category: SkillCategory.grammar,
      level: CEFRLevel.complete_beginner,
      description:
        'The word for "a / an": un and uno for masculine nouns, una and un’ for feminine — chosen by ' +
        'gender and the sound that starts the following noun.',
      prerequisiteSlugs: ['it-noun-gender'],
      examples: [
        { target: 'un treno', native: 'a train (m)' },
        { target: 'uno stadio', native: 'a stadium (m, before s+consonant)' },
        { target: 'una piazza / un’amica', native: 'a square / a friend (f)' },
      ],
      commonMistakes: [
        'using un instead of uno before s+consonant, z, gn, ps (uno zaino, not “un zaino”)',
        'dropping the apostrophe in un’ before a feminine vowel (un’ora)',
        'adding the apostrophe to masculine un before a vowel (it is “un amico”, no apostrophe)',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.error_correction,
      ],
      compatibleThemes: ['travel', 'food', 'business', 'culture'],
      teachingNotes:
        'Two decisions: gender, then the sound test for uno (s+cons, z, gn, ps, x, y). The apostrophe is ' +
        'feminine-only (un’ = una elided). Drill the uno cases — learners default to un.',
    },
    {
      slug: 'it-buono-adjective',
      name: 'The adjective buono before a noun',
      category: SkillCategory.grammar,
      level: CEFRLevel.beginner,
      description:
        'When buono (good) comes before a singular noun, it behaves like the indefinite article: ' +
        'buon, buono, buona, buon’ — matching the same sound rules as un/uno/una/un’.',
      prerequisiteSlugs: ['it-indefinite-articles'],
      examples: [
        { target: 'un buon caffè', native: 'a good coffee' },
        { target: 'un buono studente', native: 'a good student (before s+consonant)' },
        { target: 'una buona idea / un buon’amica', native: 'a good idea / a good friend (f)' },
      ],
      commonMistakes: [
        'using buono everywhere instead of the shortened buon before most masculine nouns',
        'forgetting buono mirrors the uno sound rule (buono studente)',
      ],
      recommendedPracticeTypes: [TaskType.fill_blank, TaskType.multiple_choice],
      compatibleThemes: ['food', 'travel', 'culture'],
      teachingNotes:
        'Teach by analogy to the article the learner just met: “buono follows the un/uno rule.” That ' +
        'single hook does most of the work. Contrast un buon caffè vs un buono spuntino.',
    },
    {
      slug: 'it-subject-pronouns',
      name: 'Subject pronouns (io, tu, lui/lei, noi, voi, loro)',
      category: SkillCategory.grammar,
      level: CEFRLevel.complete_beginner,
      description:
        'The Italian subject pronouns — and the key fact that they are usually dropped, because the verb ' +
        'ending already tells you who the subject is.',
      prerequisiteSlugs: [],
      examples: [
        { target: 'io, tu, lui/lei, noi, voi, loro', native: 'I, you, he/she, we, you (pl), they' },
        { target: 'Sono io.', native: 'It’s me.', note: 'pronoun kept for emphasis' },
        { target: '(Io) ho una macchina.', native: 'I have a car.', note: 'io normally dropped' },
      ],
      commonMistakes: [
        'stating io/tu in every sentence the English way',
        'using lui/lei as objects (they are subject pronouns)',
        'confusing voi (you all) with loro (they)',
      ],
      recommendedPracticeTypes: [TaskType.multiple_choice, TaskType.fill_blank],
      compatibleThemes: ['family', 'travel', 'business', 'culture'],
      teachingNotes:
        'Lead with the “drop the pronoun” habit — over-stating io is the #1 beginner tell. Keep pronouns ' +
        'for contrast/emphasis only. Tie each pronoun to its verb ending as you introduce avere.',
    },
    {
      slug: 'it-avere-present',
      name: 'Present tense of avere (to have)',
      category: SkillCategory.grammar,
      level: CEFRLevel.complete_beginner,
      description:
        'The present-tense forms of avere (to have): ho, hai, ha, abbiamo, avete, hanno. Note the silent ' +
        'h in the first three forms.',
      prerequisiteSlugs: ['it-subject-pronouns'],
      examples: [
        { target: 'Ho una bicicletta.', native: 'I have a bicycle.' },
        { target: 'Hai un biglietto?', native: 'Do you have a ticket?' },
        { target: 'Abbiamo tempo.', native: 'We have time.' },
      ],
      commonMistakes: [
        'pronouncing the silent h (ho is “oh”, not “ho”)',
        'writing the forms without the h (o, ai, a)',
        'confusing ha (has) with a (to/at)',
      ],
      recommendedPracticeTypes: [TaskType.conjugation, TaskType.fill_blank, TaskType.translation],
      compatibleThemes: ['travel', 'family', 'food', 'business'],
      teachingNotes:
        'The silent h is the whole lesson on spelling; the ha/a and hai/ai homophones are why it exists. ' +
        'Build the paradigm, then immediately use it for possession (ho un…, hai un…?).',
    },
    {
      slug: 'it-avere-idioms',
      name: 'Idiomatic expressions with avere',
      category: SkillCategory.grammar,
      level: CEFRLevel.beginner,
      description:
        'Many states that English expresses with "to be" use avere in Italian: ho fame (I’m hungry), ' +
        'ho sete, ho caldo/freddo, ho fretta, ho sonno, ho … anni (I’m … years old).',
      prerequisiteSlugs: ['it-avere-present'],
      examples: [
        { target: 'Ho fame!', native: 'I’m hungry!', note: 'literally “I have hunger”' },
        { target: 'Ho fretta, scusa.', native: 'I’m in a hurry, sorry.' },
        { target: 'Ho venticinque anni.', native: 'I’m twenty-five years old.' },
      ],
      commonMistakes: [
        'using essere (sono fame) instead of avere',
        'forgetting avere for age (it is ho … anni, not sono … anni)',
        'adding an article (ho la fame) — the idioms take no article',
      ],
      recommendedPracticeTypes: [
        TaskType.translation,
        TaskType.multiple_choice,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['food', 'travel', 'family', 'sports'],
      teachingNotes:
        'Frame as a fixed list where Italian “has” a feeling. The age idiom and the no-article rule are ' +
        'the two reliable error sources — drill them. Great for quick, high-frequency speaking reps.',
    },
    {
      slug: 'it-vocab-city-places',
      name: 'Places in the city (luoghi)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.complete_beginner,
      description:
        'The buildings and public places that make up a town: the square, the station, the museum, the ' +
        'bank, the market, the church, the hotel, and more.',
      prerequisiteSlugs: ['it-noun-gender'],
      examples: [
        { target: 'la piazza', native: 'the square' },
        { target: 'la stazione', native: 'the (train) station' },
        { target: 'C’è un museo in centro?', native: 'Is there a museum downtown?' },
      ],
      commonMistakes: [
        'mis-gendering -e places (la stazione, not “il stazione”)',
        'confusing il centro (downtown) with the English “center” in other senses',
      ],
      recommendedPracticeTypes: [TaskType.multiple_choice, TaskType.fill_blank, TaskType.roleplay],
      compatibleThemes: ['travel', 'culture', 'history', 'art'],
      teachingNotes:
        'Pair every place with its article so gender sticks. Use a mental map of a town center; later ' +
        'these anchor c’è/ci sono and direction-giving.',
    },
    {
      slug: 'it-vocab-transport',
      name: 'Means of transport (mezzi di trasporto)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.complete_beginner,
      description:
        'How you get around: the train, bus, car, bicycle, metro, plane — and the key contrast between ' +
        'in (in/by a vehicle) and a piedi (on foot).',
      prerequisiteSlugs: ['it-noun-gender'],
      examples: [
        { target: 'in treno / in autobus', native: 'by train / by bus' },
        { target: 'a piedi', native: 'on foot' },
        { target: 'Prendo la metropolitana.', native: 'I take the metro.' },
      ],
      commonMistakes: [
        'using a instead of in for vehicles (it is in treno, but a piedi)',
        'confusing andare in (go by) with prendere (take/catch) a vehicle',
      ],
      recommendedPracticeTypes: [TaskType.multiple_choice, TaskType.fill_blank, TaskType.roleplay],
      compatibleThemes: ['travel', 'sports', 'business'],
      teachingNotes:
        'Teach the in + vehicle vs a piedi pattern as a fixed frame now; the full preposition logic comes ' +
        'later. Make it concrete: how does the learner actually commute or travel?',
    },
    {
      slug: 'it-vocab-directions',
      name: 'Asking for and giving directions (indicazioni)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.beginner,
      description:
        'How to ask where something is and understand the answer: dov’è…?, a destra/sinistra, sempre ' +
        'dritto, vicino/lontano, qui/lì.',
      prerequisiteSlugs: ['it-vocab-city-places'],
      examples: [
        { target: 'Dov’è la stazione?', native: 'Where is the station?' },
        { target: 'Sempre dritto, poi a destra.', native: 'Straight ahead, then to the right.' },
        { target: 'È qui vicino.', native: 'It’s nearby.' },
      ],
      commonMistakes: [
        'confusing destra (right) and sinistra (left)',
        'saying diritto/dritto inconsistently (both occur; pick one)',
        'forgetting the elision in dov’è',
      ],
      recommendedPracticeTypes: [
        TaskType.roleplay,
        TaskType.listening_comprehension,
        TaskType.multiple_choice,
      ],
      compatibleThemes: ['travel', 'culture'],
      teachingNotes:
        'Run it as a live map exercise. Listening comes first (follow directions), then production (give ' +
        'them). Tie to the city-places vocab so destinations are familiar.',
    },
    {
      slug: 'it-simple-prepositions',
      name: 'Simple prepositions (a, in, di, da, con, su, per, tra/fra)',
      category: SkillCategory.grammar,
      level: CEFRLevel.beginner,
      description:
        'The basic prepositions and their core uses: a (to/at a city), in (in/by), di (of/from), da ' +
        '(from/at someone’s), con (with), su (on), per (for), tra/fra (between/among, in [time]).',
      prerequisiteSlugs: ['it-vocab-city-places'],
      examples: [
        {
          target: 'a Roma, in Italia',
          native: 'to/in Rome, in Italy',
          note: 'a + city, in + country',
        },
        { target: 'Sono di Napoli.', native: 'I’m from Naples.' },
        { target: 'Parto tra due ore.', native: 'I leave in two hours.' },
      ],
      commonMistakes: [
        'swapping a and in for places (a + city, in + country/region)',
        'using da vs di for “from” incorrectly (di origin vs da starting point)',
        'translating “for [time]” with per instead of using the right structure',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.translation,
      ],
      compatibleThemes: ['travel', 'business', 'family', 'culture'],
      teachingNotes:
        'Introduce only core meanings now (especially a città / in paese). These recur constantly; the ' +
        'articulated forms (al, nel, dal) come in Capitolo 5 — flag that this is the simple version.',
    },
  ],

  // ─── Lesson templates ─────────────────────────────────────────────────────
  lessonTemplates: [
    {
      slug: 'cap01-find-your-way',
      title: 'Find your way to the piazza',
      lessonType: LessonType.scenario_roleplay,
      level: CEFRLevel.complete_beginner,
      summary:
        'You’re standing outside the station and need to reach the main square. Ask a passer-by, follow ' +
        'the directions, and confirm you understood.',
      objectiveSkillSlugs: ['it-vocab-directions', 'it-vocab-city-places'],
      defaultDurationMinutes: 9,
      compatibleThemes: ['travel', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Set the scene',
          prompt: 'You just arrived by train and want to find the piazza. Let’s ask for help.',
        },
        {
          taskType: TaskType.listening_comprehension,
          focus: 'Follow spoken directions',
          prompt: 'Listen and pick where you end up.',
          notes:
            'Audio: “Sempre dritto, poi la seconda a destra. La piazza è lì.” Two map options.',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'Ask where a place is',
          prompt: 'Stop someone and ask where the station / museum / pharmacy is.',
          exampleAnswer: 'Scusi, dov’è la stazione?',
          notes: 'Personalize the destination to the learner’s interest (museo d’arte, stadio…).',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Left vs right under pressure',
          prompt: 'They said “a sinistra.” Which way do you turn?',
          exampleAnswer: 'left',
        },
        {
          taskType: TaskType.recap,
          focus: 'Direction phrases to keep',
          prompt: 'Which phrase will you reuse on your next trip?',
        },
      ],
    },
    {
      slug: 'cap01-a-or-an',
      title: 'A train, a square, a good coffee',
      lessonType: LessonType.grammar,
      level: CEFRLevel.complete_beginner,
      summary:
        'Master un / uno / una / un’ by labeling the places and things of a city — and meet buono, which ' +
        'plays by the same rules.',
      objectiveSkillSlugs: ['it-indefinite-articles', 'it-noun-gender', 'it-buono-adjective'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['travel', 'food', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Gender then sound',
          prompt: 'Pick the article in two steps: gender first, then the sound test for uno.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Choose un vs uno',
          prompt: 'Insert the article: ___ stadio, ___ treno.',
          exampleAnswer: 'uno stadio, un treno',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Feminine un’ vs una',
          prompt: 'Insert the article: ___ piazza, ___ amica.',
          exampleAnswer: 'una piazza, un’amica',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'buono follows the same rule',
          prompt: 'Which is right: “un buon caffè” or “un buono caffè”?',
          exampleAnswer: 'un buon caffè',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Catch the apostrophe trap',
          prompt: 'Fix: “un’amico arriva.”',
          exampleAnswer: 'un amico arriva (masculine takes no apostrophe)',
        },
        {
          taskType: TaskType.recap,
          focus: 'The uno trigger list',
          prompt: 'When do you use uno instead of un?',
        },
      ],
    },
    {
      slug: 'cap01-i-have',
      title: 'Ho fame! — living with avere',
      lessonType: LessonType.grammar,
      level: CEFRLevel.complete_beginner,
      summary:
        'Conjugate avere and put it straight to work — saying what you have and using the avere idioms ' +
        'for hunger, hurry, and age.',
      objectiveSkillSlugs: ['it-avere-present', 'it-avere-idioms', 'it-subject-pronouns'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['food', 'travel', 'family'],
      taskBlueprint: [
        {
          taskType: TaskType.conjugation,
          focus: 'Build the paradigm',
          prompt: 'Conjugate avere for io, tu, noi.',
          exampleAnswer: 'ho, hai, abbiamo',
        },
        {
          taskType: TaskType.translation,
          focus: 'Say what you have',
          prompt: 'Translate: “Do you have a ticket?”',
          exampleAnswer: 'Hai un biglietto?',
        },
        {
          taskType: TaskType.translation,
          focus: 'avere for states',
          prompt: 'Translate: “I’m hungry and I’m in a hurry.”',
          exampleAnswer: 'Ho fame e ho fretta.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'avere vs essere for age',
          prompt: 'How do you say “I’m 30”?',
          exampleAnswer: 'Ho trent’anni.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Use it for real',
          prompt: 'Say your age and one thing you have with you right now.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Why avere, not essere',
          prompt: 'Name two states Italian expresses with avere.',
        },
      ],
    },
    {
      slug: 'cap01-getting-around',
      title: 'Getting around town',
      lessonType: LessonType.vocabulary_review,
      level: CEFRLevel.beginner,
      summary:
        'Combine transport vocabulary with the simple prepositions to describe how you travel: in treno, ' +
        'a piedi, a Roma, in Italia.',
      objectiveSkillSlugs: ['it-vocab-transport', 'it-simple-prepositions'],
      defaultDurationMinutes: 9,
      compatibleThemes: ['travel', 'business', 'sports'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Goal',
          prompt: 'Describe a trip across town and beyond using the right preposition.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'in + vehicle vs a piedi',
          prompt: 'Complete: Vado al lavoro ___ autobus, ma al bar vado ___ piedi.',
          exampleAnswer: 'in autobus, a piedi',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'a city vs in country',
          prompt: 'Complete: Abito ___ Milano, ___ Italia.',
          exampleAnswer: 'a Milano, in Italia',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Describe your commute',
          prompt: 'How do you usually get around your city?',
        },
        {
          taskType: TaskType.recap,
          focus: 'The a/in split',
          prompt: 'When is it a and when is it in for places?',
        },
      ],
    },
  ],

  // ─── Thematic vocabulary bank ─────────────────────────────────────────────
  vocabulary: [
    // Luoghi
    {
      slug: 'cap01-la-citta',
      targetText: 'la città',
      nativeText: 'the city / town',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'luoghi',
    },
    {
      slug: 'cap01-la-piazza',
      targetText: 'la piazza',
      nativeText: 'the square',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'luoghi',
      exampleSentence: 'La piazza è in centro.',
      exampleTranslation: 'The square is downtown.',
    },
    {
      slug: 'cap01-la-stazione',
      targetText: 'la stazione',
      nativeText: 'the (train) station',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'luoghi',
    },
    {
      slug: 'cap01-laeroporto',
      targetText: 'l’aeroporto',
      nativeText: 'the airport',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'luoghi',
    },
    {
      slug: 'cap01-il-museo',
      targetText: 'il museo',
      nativeText: 'the museum',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'luoghi',
    },
    {
      slug: 'cap01-la-banca',
      targetText: 'la banca',
      nativeText: 'the bank',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'luoghi',
    },
    {
      slug: 'cap01-il-negozio',
      targetText: 'il negozio',
      nativeText: 'the shop',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'luoghi',
    },
    {
      slug: 'cap01-il-mercato',
      targetText: 'il mercato',
      nativeText: 'the market',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'luoghi',
    },
    {
      slug: 'cap01-la-chiesa',
      targetText: 'la chiesa',
      nativeText: 'the church',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'luoghi',
    },
    {
      slug: 'cap01-lospedale',
      targetText: 'l’ospedale',
      nativeText: 'the hospital',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'luoghi',
    },
    {
      slug: 'cap01-lalbergo',
      targetText: 'l’albergo',
      nativeText: 'the hotel',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'luoghi',
    },
    {
      slug: 'cap01-il-centro',
      targetText: 'il centro',
      nativeText: 'the city center / downtown',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'luoghi',
    },
    // Mezzi di trasporto
    {
      slug: 'cap01-il-treno',
      targetText: 'il treno',
      nativeText: 'the train',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'trasporto',
    },
    {
      slug: 'cap01-lautobus',
      targetText: 'l’autobus',
      nativeText: 'the bus',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'trasporto',
    },
    {
      slug: 'cap01-la-macchina',
      targetText: 'la macchina',
      nativeText: 'the car',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'trasporto',
    },
    {
      slug: 'cap01-la-bicicletta',
      targetText: 'la bicicletta',
      nativeText: 'the bicycle',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'trasporto',
    },
    {
      slug: 'cap01-la-metropolitana',
      targetText: 'la metropolitana',
      nativeText: 'the metro / subway',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'trasporto',
    },
    {
      slug: 'cap01-laereo',
      targetText: 'l’aereo',
      nativeText: 'the airplane',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'trasporto',
    },
    {
      slug: 'cap01-a-piedi',
      targetText: 'a piedi',
      nativeText: 'on foot',
      partOfSpeech: 'phrase',
      theme: 'trasporto',
    },
    // Indicazioni
    {
      slug: 'cap01-dove',
      targetText: 'dov’è…?',
      nativeText: 'where is…?',
      partOfSpeech: 'phrase',
      theme: 'indicazioni',
    },
    {
      slug: 'cap01-a-destra',
      targetText: 'a destra',
      nativeText: 'to/on the right',
      partOfSpeech: 'phrase',
      theme: 'indicazioni',
    },
    {
      slug: 'cap01-a-sinistra',
      targetText: 'a sinistra',
      nativeText: 'to/on the left',
      partOfSpeech: 'phrase',
      theme: 'indicazioni',
    },
    {
      slug: 'cap01-sempre-dritto',
      targetText: 'sempre dritto',
      nativeText: 'straight ahead',
      partOfSpeech: 'phrase',
      theme: 'indicazioni',
    },
    {
      slug: 'cap01-vicino',
      targetText: 'vicino',
      nativeText: 'near / nearby',
      partOfSpeech: 'adv',
      theme: 'indicazioni',
    },
    {
      slug: 'cap01-lontano',
      targetText: 'lontano',
      nativeText: 'far',
      partOfSpeech: 'adv',
      theme: 'indicazioni',
    },
    // In viaggio
    {
      slug: 'cap01-il-biglietto',
      targetText: 'il biglietto',
      nativeText: 'the ticket',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'in-viaggio',
      exampleSentence: 'Hai il biglietto?',
      exampleTranslation: 'Do you have the ticket?',
    },
    {
      slug: 'cap01-la-valigia',
      targetText: 'la valigia',
      nativeText: 'the suitcase',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'in-viaggio',
    },
    {
      slug: 'cap01-la-mappa',
      targetText: 'la mappa',
      nativeText: 'the map',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'in-viaggio',
    },
  ],
};

export default unit;
