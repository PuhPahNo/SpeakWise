// Capitolo 10 — Buon viaggio!
// Theme: travel and Italian holidays. The future tense (regular and irregular),
// special uses of the future (probability and subordinate clauses after quando/
// appena/se), the impersonal si, feminine noun formation, and the vocabulary
// of vacations and festività italiane.
//
// All content original (copyright-safe).

import { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client';
import type { SeedUnit } from '../types';

const unit: SeedUnit = {
  code: 'cap-10',
  order: 10,
  title: 'Buon viaggio!',
  subtitle: 'The future tense, vacations, and Italian holidays',
  theme: 'travel',
  level: CEFRLevel.intermediate,
  summary:
    'Pack your bags and plan the trip you’ve always wanted to take. In this chapter you master the ' +
    'Italian future tense — regular and irregular — and learn to use it not just for plans but also ' +
    'to make educated guesses and to talk about what will happen once certain conditions are met. ' +
    'Along the way you discover how Italian describes what "one does" through the elegant impersonal ' +
    'si, form feminine professional titles with confidence, and build a rich vocabulary for holidays, ' +
    'celebrations, and the great Italian tradition of ferragosto.',
  canDo: [
    'Talk about future plans, trips, and travel arrangements',
    'Book a hotel, buy a ticket, and handle practical travel situations in Italian',
    'Use the future tense to speculate or make an educated guess',
    'Describe how things are generally done in Italy using the impersonal si',
    'Talk about Italian holidays, traditions, and how they are celebrated',
    'Form feminine professional titles correctly',
  ],
  culturalNotes: [
    {
      title: 'La Befana — the gift-bringer of January 6',
      body:
        'While much of the world celebrates gift-giving at Christmas, Italian children know that the ' +
        'real loot arrives on the night of January 5, brought by la Befana — a friendly old woman who ' +
        'flies on a broomstick and fills stockings hung by the fireplace. Good children get candy and ' +
        'small gifts; naughty ones find a lump of black coal (carbone) or, in the modern sweet version, ' +
        'edible sugar coal. January 6 is l’Epifania, a national public holiday; the popular rhyme goes ' +
        '"L’Epifania tutte le feste porta via" — the Epiphany takes all the holidays away — meaning ' +
        'the festive season officially ends that day.',
    },
    {
      title: 'Ferragosto e le ferie d’agosto',
      body:
        'August 15 is Ferragosto, Italy’s most sacred summer holiday, rooted in the ancient Roman ' +
        'Feriae Augusti (Emperor Augustus’s harvest rest). Today it anchors a mass national vacation: ' +
        'most Italians take their ferie (paid annual leave) in August, and in many towns shops, ' +
        'restaurants, and offices post "Chiuso per ferie" signs for two to four weeks. Beach resorts — ' +
        'especially on the Adriatic and Tyrrhenian coasts — are packed to capacity, while major cities ' +
        'like Rome and Milan can feel eerily quiet. Visitors arriving in early August should expect ' +
        'reduced services and book accommodation well in advance.',
    },
    {
      title: 'La Sardegna — wild coasts and ancient culture',
      body:
        'Sardinia (la Sardegna) is Italy’s second-largest island and one of its most distinctive ' +
        'travel destinations. Its coastline — especially the Costa Smeralda in the northeast — offers ' +
        'some of the clearest, most turquoise water in the Mediterranean. Inland, the island preserves ' +
        'nearly 7,000 nuraghi: Bronze Age stone towers found nowhere else on earth. Sardinian is not ' +
        'merely an Italian dialect but a separate Romance language, and the island has its own food ' +
        'traditions — pane carasau (crispy flatbread), bottarga (dried mullet roe), and culurgiones ' +
        '(stuffed pasta). A trip to Sardinia rewards travelers who go beyond the beach.',
    },
  ],

  // ─── Skills ───────────────────────────────────────────────────────────────
  skills: [
    {
      slug: 'it-future-simple',
      name: 'The future tense — futuro semplice',
      category: SkillCategory.grammar,
      level: CEFRLevel.intermediate,
      description:
        'The Italian simple future is formed by adding one set of endings to a slightly modified ' +
        'infinitive stem. For -are and -ere verbs the endings are -ò, -ai, -à, -emo, -ete, -anno; ' +
        '-are verbs change the stem vowel (parlare → parlerò). For -ire verbs the pattern is the same ' +
        'with the -ire stem intact (partirò). Spelling rules: verbs ending in -care/-gare add h to ' +
        'keep the hard sound (cercare → cercherò; pagare → pagherò); verbs ending in -ciare/-giare ' +
        'drop the i (cominciare → comincerò; mangiare → mangerò). Many high-frequency verbs have ' +
        'irregular stems: essere → sarò, avere → avrò, andare → andrò, fare → farò, venire → verrò, ' +
        'dovere → dovrò, potere → potrò, volere → vorrò, vedere → vedrò, bere → berrò, ' +
        'rimanere → rimarrò.',
      prerequisiteSlugs: ['it-regular-are-verbs-present', 'it-avere-present'],
      examples: [
        {
          target: 'L’anno prossimo andrò in Sardegna.',
          native: 'Next year I will go to Sardinia.',
          note: 'andare has the irregular stem andr-',
        },
        {
          target: 'Partiranno alle sette di mattina.',
          native: 'They will leave at seven in the morning.',
          note: 'regular -ire verb: partire → partir- + -anno',
        },
        {
          target: 'Cercheremo un albergo vicino al mare.',
          native: 'We will look for a hotel near the sea.',
          note: 'cercare adds h: cercher- to preserve the hard c',
        },
        {
          target: 'Comincerò a studiare l’italiano più seriamente.',
          native: 'I will start studying Italian more seriously.',
          note: 'cominciare drops the i: comincerò',
        },
        {
          target: 'Sarà una vacanza incredibile!',
          native: 'It will be an incredible holiday!',
          note: 'essere → sarò / sarà (irregular)',
        },
      ],
      commonMistakes: [
        'using the present tense for future plans when the future tense is expected (Domani vado → fine in speech, but domani andrò is more precise)',
        'forgetting the h-insertion for -care/-gare verbs (pagherò, not "pagerò")',
        'applying the -are ending rules to -ere verbs (venderò is correct; "venderò" already has a, but learners sometimes mistakenly write "venderà" for the io form)',
        'mixing up irregular stems — especially confusing venire→verrò with vedere→vedrò',
      ],
      recommendedPracticeTypes: [
        TaskType.conjugation,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.error_correction,
      ],
      compatibleThemes: ['travel', 'business', 'family', 'culture'],
      teachingNotes:
        'Teach regular endings first as a single paradigm shared by all three conjugations (with ' +
        'the stem tweak for -are). Then deliver the irregular stems as a short "high-frequency list" — ' +
        'essere, avere, andare, fare, venire cover the vast majority of future usage. Personalize ' +
        'to the learner’s actual travel plans or life goals so the future tense immediately feels useful.',
    },
    {
      slug: 'it-future-special-uses',
      name: 'Special uses of the future — probability and subordinate clauses',
      category: SkillCategory.grammar,
      level: CEFRLevel.intermediate,
      description:
        'Beyond plans, the Italian future has two important special uses. First, the "futuro di ' +
        'probabilità": using the future to express a present conjecture — Saranno le otto (it must ' +
        'be about eight o’clock); Quanti anni avrà? (how old do you think he is?). Second, Italian ' +
        'uses the future — not the present — in subordinate clauses introduced by quando (when), ' +
        'appena (as soon as), se (if), and finché (until) when the main clause is also future: ' +
        'Quando arriverò, ti chiamerò (when I arrive, I’ll call you).',
      prerequisiteSlugs: ['it-future-simple'],
      examples: [
        {
          target: 'Saranno le tre del pomeriggio.',
          native: 'It must be about three in the afternoon.',
          note: 'futuro di probabilità — a present guess, not a future fact',
        },
        {
          target: 'Quanti anni avrà quella signora? — Avrà sessant’anni.',
          native: 'How old do you think that woman is? — She must be about sixty.',
          note: 'both question and answer use the future of probability',
        },
        {
          target: 'Appena arrivo a Roma, ti mando un messaggio.',
          native: 'As soon as I arrive in Rome, I’ll send you a message.',
          note: 'spoken Italian often uses present here; formal/written Italian uses future: appena arriverò',
        },
        {
          target: 'Se avremo tempo, visiteremo il Colosseo.',
          native: 'If we have time, we’ll visit the Colosseum.',
          note: 'future in both the se-clause and the main clause',
        },
      ],
      commonMistakes: [
        'translating "when I arrive" word-for-word with the present (quando arrivo) when speaking formally — the future is required in written and careful speech',
        'using the futuro di probabilità as a straightforward future instead of a conjecture (it marks uncertainty/estimation, not a plan)',
        'confusing se + future (a real condition) with the conditional construction (se + imperfetto + condizionale) which comes later',
      ],
      recommendedPracticeTypes: [
        TaskType.tense_selection,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.multiple_choice,
      ],
      compatibleThemes: ['travel', 'culture', 'news', 'family'],
      teachingNotes:
        'Teach the two uses separately. The futuro di probabilità is a fun, immediately usable trick — ' +
        'use age-guessing or time-guessing scenarios. For the quando/appena/se future, show the ' +
        'contrast with English ("when I ARRIVE" in English uses the present; Italian needs the future) ' +
        'because this is the main trip-up point.',
    },
    {
      slug: 'it-impersonal-si',
      name: 'The impersonal si — talking about what "one does"',
      category: SkillCategory.grammar,
      level: CEFRLevel.intermediate,
      description:
        'The impersonal si + third-person singular verb is Italian’s elegant way to say "one does," ' +
        '"people do," or "you do (in general)": In Italia si mangia bene (people eat well in Italy); ' +
        'Come si dice…? (how do you say…?). The verb is always third-person singular — unless the ' +
        'noun it governs is plural, in which case the verb becomes plural: Si vendono i biglietti qui ' +
        '(tickets are sold here). With reflexive verbs, use ci si to avoid two si in a row: ' +
        'Ci si alza presto in campagna (one gets up early in the country).',
      prerequisiteSlugs: ['it-reflexive-verbs'],
      examples: [
        {
          target: 'In Italia si mangia bene e si dorme dopo pranzo.',
          native: 'In Italy people eat well and take a nap after lunch.',
          note: 'si + 3rd-person singular covers generalizations about Italian life',
        },
        {
          target: 'Come si dice "suitcase" in italiano?',
          native: 'How do you say "suitcase" in Italian?',
          note: 'the most immediately useful pattern — learn it as a fixed phrase',
        },
        {
          target: 'Si vendono biglietti del treno qui?',
          native: 'Are train tickets sold here? / Do they sell train tickets here?',
          note: 'plural subject (biglietti) → plural verb (si vendono)',
        },
        {
          target: 'Ci si alza presto per prendere il traghetto delle sei.',
          native: 'One gets up early to catch the six o’clock ferry.',
          note: 'ci si (not si si) before a reflexive verb',
        },
      ],
      commonMistakes: [
        'using si with a plural verb when the subject is singular (si mangia bene, never "si mangiano bene" for a general statement without a plural noun)',
        'forgetting to make the verb plural when a definite plural noun follows (Si vendono le valigie / Si vende la valigia)',
        'writing si si instead of ci si before reflexive verbs',
        'confusing impersonal si with the reflexive si of a specific subject',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.error_correction,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['travel', 'food', 'culture', 'history'],
      teachingNotes:
        'Open with "Come si dice…?" — it’s already in the learner’s head as a classroom phrase, so ' +
        'they immediately grasp impersonal si. Then expand to travel and food generalizations: ' +
        'si prenota, si paga, si mangia. The plural agreement rule (Si vendono i biglietti) is the ' +
        'main stumbling block — present it as a separate mini-rule after the core pattern is solid.',
    },
    {
      slug: 'it-feminine-noun-formation',
      name: 'Forming feminine nouns and professional titles',
      category: SkillCategory.grammar,
      level: CEFRLevel.intermediate,
      description:
        'Italian derives feminine nouns from masculine ones by changing the ending. The main patterns: ' +
        '-o → -a (ragazzo → ragazza; turista is already invariable for gender). Nouns ending in -e ' +
        'often add a suffix: -e → -essa (studente → studentessa; professore → professoressa; ' +
        'dottore → dottoressa). Nouns ending in -tore form the feminine in -trice: attore → attrice; ' +
        'scrittore → scrittrice; direttore → direttrice. Some titles are invariable and gender is ' +
        'shown only by the article: il/la giornalista, l’architetto/l’architetta.',
      prerequisiteSlugs: ['it-noun-gender'],
      examples: [
        {
          target: 'il professore → la professoressa',
          native: 'the (male) teacher → the (female) teacher',
          note: '-ore + -essa pattern',
        },
        {
          target: 'l’attore → l’attrice',
          native: 'the (male) actor → the (female) actress',
          note: '-tore → -trice pattern',
        },
        {
          target: 'il dottore → la dottoressa',
          native: 'the doctor (m) → the doctor (f)',
          note: 'extremely common in everyday Italian — worth memorizing as a pair',
        },
        {
          target: 'il/la giornalista',
          native: 'the journalist (same form for both genders)',
          note: '-ista nouns are invariable; gender shows in the article',
        },
      ],
      commonMistakes: [
        'applying -a to all masculine nouns (*la professora instead of la professoressa)',
        'forgetting that -tore words become -trice, not -*tora (l’attrice, not "*l’attora")',
        'treating all -ista nouns as feminine because they end in -a (il turista, il dentista — these are masculine when referring to a man)',
        'using the same form for dottore and dottoressa interchangeably in formal contexts where the distinction matters',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.error_correction,
        TaskType.translation,
      ],
      compatibleThemes: ['culture', 'business', 'family', 'travel'],
      teachingNotes:
        'Teach the three patterns as a short chart: -o/-a (default), -ore/-essa, -tore/-trice. ' +
        'Anchor each with high-frequency words the learner already knows. The -ista invariable group ' +
        'makes a good memorable exception. Travel context works well: la turista, la guida, ' +
        'la professoressa di italiano.',
    },
    {
      slug: 'it-vocab-vacation',
      name: 'Vacation vocabulary (le vacanze)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.intermediate,
      description:
        'The essential words for planning and taking a trip: from booking a room and packing a suitcase ' +
        'to choosing between beach, mountains, and countryside — and everything in between.',
      prerequisiteSlugs: ['it-noun-gender', 'it-simple-prepositions'],
      examples: [
        {
          target: 'Ho prenotato un albergo vicino alla spiaggia.',
          native: 'I booked a hotel near the beach.',
        },
        {
          target: 'Quest’estate andremo in montagna invece che al mare.',
          native: 'This summer we’ll go to the mountains instead of the seaside.',
        },
        {
          target: 'Non dimenticare il passaporto e la valigia!',
          native: 'Don’t forget your passport and your suitcase!',
        },
      ],
      commonMistakes: [
        'confusing il viaggio (the journey/trip) with la vacanza (the holiday/vacation)',
        'using il turismo instead of il/la turista when referring to a person',
        'saying "fare un volo" — the natural phrase is prendere un volo or volare',
      ],
      recommendedPracticeTypes: [
        TaskType.roleplay,
        TaskType.fill_blank,
        TaskType.speaking_prompt,
        TaskType.multiple_choice,
      ],
      compatibleThemes: ['travel', 'culture', 'sports', 'family'],
      teachingNotes:
        'Build around a realistic travel planning scenario: destination → accommodation → transport → ' +
        'packing. Personalize to wherever the learner actually wants to go in Italy. The contrasts ' +
        'al mare vs in montagna vs in campagna reward explicit attention.',
    },
    {
      slug: 'it-vocab-holidays',
      name: 'Italian holidays and celebrations (le feste)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.intermediate,
      description:
        'The names of Italy’s main public holidays and private celebrations — from Christmas and ' +
        'Easter to birthdays and New Year’s — along with the vocabulary for marking them: gifts, ' +
        'wishes, fireworks, and time off.',
      prerequisiteSlugs: ['it-noun-gender'],
      examples: [
        {
          target: 'Tanti auguri di buon Natale e felice Anno Nuovo!',
          native: 'Merry Christmas and Happy New Year!',
          note: 'auguri (wishes) is plural in set phrases',
        },
        {
          target: 'A Ferragosto tutti vanno al mare o in montagna.',
          native: 'At Ferragosto everyone goes to the beach or to the mountains.',
        },
        {
          target: 'La sera del 31 dicembre si guardano i fuochi d’artificio.',
          native: 'On the evening of December 31 people watch the fireworks.',
          note: 'impersonal si in a holiday context',
        },
      ],
      commonMistakes: [
        'saying "Buon compleanno" for every occasion — auguri is the more general "best wishes" used for birthdays, Easter, name-days, and more',
        'confusing la Befana (the character) with l’Epifania (the religious feast day — same date, different register)',
        'omitting the article before holiday names: il Natale, la Pasqua, il Capodanno',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.speaking_prompt,
        TaskType.roleplay,
        TaskType.fill_blank,
      ],
      compatibleThemes: ['culture', 'family', 'food', 'travel'],
      teachingNotes:
        'Frame around the Italian calendar year so the vocabulary has an anchor: January (Capodanno, ' +
        'Befana), spring (Pasqua), summer (Ferragosto, ferie), winter (Natale). Birthday vocabulary ' +
        'is universally relevant regardless of interests — lead with compleanno and auguri. Tie the ' +
        'holiday names to the cultural notes on Befana and Ferragosto.',
    },
  ],

  // ─── Lesson templates ─────────────────────────────────────────────────────
  lessonTemplates: [
    {
      slug: 'cap10-plan-a-trip',
      title: 'Plan your dream Italian trip',
      lessonType: LessonType.grammar,
      level: CEFRLevel.intermediate,
      summary:
        'Build and drill the Italian future tense from the ground up — regular endings, spelling ' +
        'rules, and the key irregular stems — by planning a real trip to Italy together.',
      objectiveSkillSlugs: ['it-future-simple', 'it-vocab-vacation'],
      defaultDurationMinutes: 12,
      compatibleThemes: ['travel', 'culture', 'family'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'The future tense formula',
          prompt:
            'The future drops the final -e of the infinitive (or changes -are to -er-) and adds ' +
            'the same endings for all verbs: -ò, -ai, -à, -emo, -ete, -anno. The irregular stems ' +
            'are a short list worth memorizing — start with essere, avere, andare, fare, venire.',
          notes:
            'Show the regular paradigm first (parlare → parlerò, vendere → venderò, partire → ' +
            'partirò). Then present the irregular stems as a punch-card list. If the learner has a ' +
            'specific Italian destination in mind, use it throughout.',
        },
        {
          taskType: TaskType.conjugation,
          focus: 'Regular future: all persons',
          prompt: 'Conjugate prenotare (to book) in the future for all six persons.',
          exampleAnswer: 'prenoterò, prenoterài, prenoterà, prenoteremo, prenoterète, prenoterànno',
          notes: 'Stress the accent on -ò (io) and -à (lui/lei) — learners drop them.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Irregular stems in context',
          prompt:
            'Complete with the correct future form: "L’estate prossima (noi) ___ (andare) in ' +
            'Sardegna e ___ (fare) una gita in barca."',
          exampleAnswer: 'andremo … faremo',
          notes: 'andare → andr- and fare → far- are two of the highest-frequency irregulars.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Spelling rules: -care/-gare and -ciare/-giare',
          prompt:
            'Complete: "Prima ___ (cercare) un albergo, poi ___ (pagare) la prenotazione online."',
          exampleAnswer: 'cercherò … pagherò',
          notes: 'h-insertion to preserve the hard c/g. Compare with comincerò from -ciare.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Your real travel plans',
          prompt:
            'Describe your ideal Italian trip in three or four future-tense sentences. Where will ' +
            'you go? What will you do? How will you get there?',
          notes:
            'Encourage at least one irregular stem and one travel vocabulary item. Accept minor ' +
            'errors gracefully — fluency is the goal at this stage.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Lock in the irregular stems',
          prompt:
            'Quick fire: give the io form of the future for essere, avere, andare, venire, fare.',
          exampleAnswer: 'sarò, avrò, andrò, verrò, farò',
        },
      ],
    },
    {
      slug: 'cap10-book-a-hotel',
      title: 'Prenota l’albergo — book a hotel in Italian',
      lessonType: LessonType.scenario_roleplay,
      level: CEFRLevel.intermediate,
      summary:
        'You’re planning a trip to Sardinia. Call the hotel, check availability, ask about the room ' +
        'and services, and confirm your reservation — using the future tense and travel vocabulary ' +
        'throughout.',
      objectiveSkillSlugs: ['it-vocab-vacation', 'it-future-simple'],
      defaultDurationMinutes: 11,
      compatibleThemes: ['travel', 'business', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Set the scene',
          prompt:
            'You’ve decided to spend a week on the Costa Smeralda in Sardinia. You found a hotel ' +
            'online and now you’re calling to book. Let’s work through the call.',
          notes:
            'If the learner has a different Italian destination in mind, substitute accordingly. ' +
            'Mention that in Italy hotel receptionists (il/la receptionist or l’addetta alla ' +
            'reception) expect polite formal address (Lei).',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'Ask about availability',
          prompt:
            'Greet the receptionist and ask if a double room is available for the week of August 10.',
          exampleAnswer:
            'Buongiorno, vorrei prenotare una camera matrimoniale per la settimana del 10 agosto. ' +
            'C’è disponibilità?',
          notes: 'Encourage use of vorrei (conditional) as the polite request form.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Future tense in the confirmation',
          prompt: 'Translate: "We will arrive on Sunday evening and we will need a parking space."',
          exampleAnswer: 'Arriveremo domenica sera e avremo bisogno di un posto auto.',
          notes: 'arrivare (regular future) and avere bisogno (avremo — irregular stem).',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Vocabulary: room types',
          prompt:
            'You want a room with a sea view for two people. Which phrase do you use: "una camera ' +
            'singola con vista mare" or "una camera doppia con vista mare"?',
          exampleAnswer: 'una camera doppia con vista mare',
          notes: 'singola = single; doppia/matrimoniale = double (with two beds / one large bed).',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Close the booking',
          prompt:
            'Confirm your reservation: state your name, spell it out, give your arrival and ' +
            'departure dates, and ask for the hotel’s email address to receive the confirmation.',
          notes:
            'Spelling out names (come si scrive…?) is a realistic and high-value skill. Accept ' +
            'any reasonable Italian — reward complete communication over perfect grammar.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Travel phrases to keep',
          prompt: 'Name three phrases from this lesson you could use on your next Italian trip.',
        },
      ],
    },
    {
      slug: 'cap10-impersonal-si-italy',
      title: 'Come si fa in Italia — how things are done',
      lessonType: LessonType.grammar,
      level: CEFRLevel.intermediate,
      summary:
        'Master the impersonal si to describe Italian customs, travel procedures, and general truths — ' +
        'the construction that lets you talk about "what people do" without naming anyone specific.',
      objectiveSkillSlugs: ['it-impersonal-si'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['travel', 'culture', 'food', 'history'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'The impersonal si formula',
          prompt:
            'Si + 3rd-person singular = "one does / people do / you do (in general)." If a plural ' +
            'noun follows as the object-turned-subject, the verb goes plural. With reflexives, ' +
            'replace si with ci si.',
          notes:
            'Ground it immediately in phrases the learner might already half-know: Come si dice…? ' +
            'Si prega di non fotografare. Then expand to travel and food generalizations.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Singular vs plural agreement',
          prompt:
            'Complete: "In questo museo non ___ (fotografare). Al botteghino ___ (vendere) i ' +
            'biglietti per la visita guidata."',
          exampleAnswer: 'si fotografa … si vendono',
          notes: 'fotografare → singular (no following noun); biglietti → plural verb.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Describe Italian customs',
          prompt:
            'Translate using si: "In Italy people eat late, and coffee is drunk standing at the ' +
            'counter."',
          exampleAnswer: 'In Italia si mangia tardi e il caffè si beve al banco.',
          notes:
            'Two different si constructions in the same sentence. Point out the naturalness of ' +
            'si + mangiare for "people eat" and si beve for "it is drunk / people drink."',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Spot the agreement error',
          prompt: 'Correct: "Si compra i biglietti del treno online."',
          exampleAnswer: 'Si comprano i biglietti del treno online.',
          notes: 'biglietti (plural) requires si comprano.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Generalize about your own country',
          prompt:
            'Use si to describe two or three customs or general truths about your country — then ' +
            'one thing that surprises you about Italian customs.',
          notes:
            'Cross-cultural contrast cements the structure. Encourage at least one ci si construction ' +
            'if the learner is ready.',
        },
        {
          taskType: TaskType.recap,
          focus: 'The three si rules',
          prompt:
            'Summarize: when does si take a singular verb? A plural verb? When do you use ci si?',
        },
      ],
    },
    {
      slug: 'cap10-italian-holidays',
      title: 'Auguri! — Italian holidays and how they’re celebrated',
      lessonType: LessonType.vocabulary_review,
      level: CEFRLevel.intermediate,
      summary:
        'Explore Italy’s festive calendar from the Befana in January through Ferragosto in August ' +
        'to Christmas and New Year — learning the vocabulary of celebration along the way.',
      objectiveSkillSlugs: ['it-vocab-holidays', 'it-impersonal-si'],
      defaultDurationMinutes: 9,
      compatibleThemes: ['culture', 'family', 'food', 'travel'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'The Italian festive calendar',
          prompt:
            'Italy’s public holidays mark both religious occasions and national identity. Let’s ' +
            'tour the year and learn the vocabulary that goes with each celebration.',
          notes:
            'Show a visual timeline if possible. Mention the Befana (Jan 6), Pasqua (spring), ' +
            'Ferragosto (Aug 15), and Natale (Dec 25) as the four anchors.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Match the holiday to its description',
          prompt:
            'Which holiday involves a gift-bringer on a broomstick who fills children’s stockings?',
          exampleAnswer: 'la Befana (l’Epifania, January 6)',
          notes: 'Contrast briefly with Babbo Natale (Father Christmas on Dec 25).',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Holiday vocabulary in context',
          prompt:
            'Complete: "A Capodanno ___ (si guardare) i fuochi d’artificio e ci ___ (si scambiarsi) ' +
            'gli auguri di felice Anno Nuovo."',
          exampleAnswer: 'si guardano … ci si scambia',
          notes: 'plural noun → si guardano; reflexive ci si scambia.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Send holiday wishes',
          prompt: 'Translate: "Happy Easter! I hope you’re spending it with your family."',
          exampleAnswer: 'Buona Pasqua! Spero che tu la passi con la famiglia.',
          notes:
            'Buona Pasqua is the standard greeting. Spero che + subjunctive is a preview of later chapters — accept any reasonable attempt.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Your own traditions',
          prompt:
            'Which Italian holiday sounds most interesting to you? Describe how you celebrate a ' +
            'comparable holiday in your own culture — using si where appropriate.',
          notes:
            'Personalize freely. Reward use of impersonal si in the description of traditions.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Name the festa',
          prompt: 'What is Ferragosto, when is it, and why do shops close?',
          notes: 'Ties vocabulary to the cultural note on Ferragosto.',
        },
      ],
    },
    {
      slug: 'cap10-future-probability',
      title: 'Sarà stanco… — guessing with the future',
      lessonType: LessonType.grammar,
      level: CEFRLevel.intermediate,
      summary:
        'Discover the Italian "future of probability" — using the future tense to express a present ' +
        'conjecture — and practise the future in subordinate clauses with quando, appena, and se.',
      objectiveSkillSlugs: ['it-future-special-uses'],
      defaultDurationMinutes: 9,
      compatibleThemes: ['travel', 'culture', 'family', 'news'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Two special uses in one lesson',
          prompt:
            'Use 1: guess about NOW with the future (Saranno le dieci = it must be about ten). ' +
            'Use 2: after quando/appena/se in future sentences, Italian uses the future in BOTH ' +
            'clauses — not the present as English does.',
          notes:
            'Contrast with English: "It must be ten" (modal guess) vs Italian future. Then contrast ' +
            '"When I arrive, I’ll call" — English uses present in the when-clause; Italian uses future.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Spot the futuro di probabilità',
          prompt:
            'Which sentence is a present conjecture, not a future plan? (a) "Domani starò meglio." ' +
            '(b) "Sarà stanco dopo quel viaggio di sedici ore."',
          exampleAnswer: '(b) — sarà stanco is a guess about NOW (he must be tired)',
          notes: 'Key: context + no time adverb pointing to the future → probability reading.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Quando / appena + future',
          prompt:
            'Complete: "Quando ___ (arrivare, noi) a Cagliari, ___ (cercare) un ristorante. ' +
            'Appena ___ (prenotare, io), ti manderò un messaggio."',
          exampleAnswer: 'arriveremo … cercheremo … avrò prenotato',
          notes:
            'The third blank is technically future perfect (avrò prenotato) — accept simple future ' +
            '(prenoterò) at this level and note the more precise form as a bonus.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Guessing in conversation',
          prompt:
            'Translate: "How old do you think the guide is? — She must be about thirty-five."',
          exampleAnswer: 'Quanti anni avrà la guida? — Avrà trentacinque anni.',
          notes: 'Classic futuro di probabilità age-guessing dialogue.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Make a travel plan with conditions',
          prompt:
            'Tell Wise what you’ll do on your Italian trip when you arrive, as soon as the hotel ' +
            'is booked, and if the weather is good.',
          notes:
            'Elicits quando, appena, se + future naturally. Personalize to the learner’s destination.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Test the two uses',
          prompt:
            'Give one example of the futuro di probabilità and one sentence with quando + future.',
        },
      ],
    },
  ],

  // ─── Thematic vocabulary bank ─────────────────────────────────────────────
  vocabulary: [
    // Le vacanze
    {
      slug: 'cap10-le-vacanze',
      targetText: 'le vacanze',
      nativeText: 'the holidays / vacation',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'le-vacanze',
      exampleSentence: 'Quest’estate farò le vacanze in Sardegna.',
      exampleTranslation: 'This summer I’ll take my holiday in Sardinia.',
    },
    {
      slug: 'cap10-il-viaggio',
      targetText: 'il viaggio',
      nativeText: 'the trip / journey',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'le-vacanze',
      exampleSentence: 'Il viaggio in treno da Milano a Roma dura quasi tre ore.',
      exampleTranslation: 'The train journey from Milan to Rome takes almost three hours.',
    },
    {
      slug: 'cap10-viaggiare',
      targetText: 'viaggiare',
      nativeText: 'to travel',
      partOfSpeech: 'verb',
      theme: 'le-vacanze',
    },
    {
      slug: 'cap10-la-spiaggia',
      targetText: 'la spiaggia',
      nativeText: 'the beach',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'le-vacanze',
      exampleSentence: 'Le spiagge della Costa Smeralda hanno un’acqua straordinaria.',
      exampleTranslation: 'The beaches of the Costa Smeralda have extraordinary water.',
    },
    {
      slug: 'cap10-il-mare',
      targetText: 'il mare',
      nativeText: 'the sea',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'le-vacanze',
      exampleSentence: 'Preferisci il mare o la montagna?',
      exampleTranslation: 'Do you prefer the sea or the mountains?',
    },
    {
      slug: 'cap10-la-montagna',
      targetText: 'la montagna',
      nativeText: 'the mountain / mountains',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'le-vacanze',
    },
    {
      slug: 'cap10-la-campagna',
      targetText: 'la campagna',
      nativeText: 'the countryside',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'le-vacanze',
    },
    {
      slug: 'cap10-lalbergo',
      targetText: 'l’albergo',
      nativeText: 'the hotel',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'le-vacanze',
      exampleSentence: 'Ho prenotato un albergo a quattro stelle vicino al centro.',
      exampleTranslation: 'I booked a four-star hotel near the city centre.',
    },
    {
      slug: 'cap10-prenotare',
      targetText: 'prenotare',
      nativeText: 'to book / reserve',
      partOfSpeech: 'verb',
      theme: 'le-vacanze',
    },
    {
      slug: 'cap10-la-prenotazione',
      targetText: 'la prenotazione',
      nativeText: 'the reservation / booking',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'le-vacanze',
      exampleSentence: 'Ho confermato la prenotazione via email.',
      exampleTranslation: 'I confirmed the reservation by email.',
    },
    {
      slug: 'cap10-la-valigia',
      targetText: 'la valigia',
      nativeText: 'the suitcase',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'le-vacanze',
    },
    {
      slug: 'cap10-il-passaporto',
      targetText: 'il passaporto',
      nativeText: 'the passport',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'le-vacanze',
      exampleSentence: 'Non dimenticare il passaporto prima di partire!',
      exampleTranslation: 'Don’t forget your passport before you leave!',
    },
    {
      slug: 'cap10-il-volo',
      targetText: 'il volo',
      nativeText: 'the flight',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'le-vacanze',
      exampleSentence: 'Il volo per Cagliari parte alle sette di mattina.',
      exampleTranslation: 'The flight to Cagliari departs at seven in the morning.',
    },
    {
      slug: 'cap10-partire',
      targetText: 'partire',
      nativeText: 'to leave / depart',
      partOfSpeech: 'verb',
      theme: 'le-vacanze',
    },
    {
      slug: 'cap10-la-gita',
      targetText: 'la gita',
      nativeText: 'the day trip / excursion',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'le-vacanze',
      exampleSentence: 'Faremo una gita in barca lungo la costa.',
      exampleTranslation: 'We’ll take a boat excursion along the coast.',
    },
    {
      slug: 'cap10-il-turista',
      targetText: 'il/la turista',
      nativeText: 'the tourist (m/f)',
      partOfSpeech: 'noun',
      gender: 'm/f',
      theme: 'le-vacanze',
      exampleSentence: 'D’estate la città è piena di turisti.',
      exampleTranslation: 'In summer the city is full of tourists.',
    },
    {
      slug: 'cap10-allestero',
      targetText: 'all’estero',
      nativeText: 'abroad / overseas',
      partOfSpeech: 'phrase',
      theme: 'le-vacanze',
      exampleSentence: 'Non sono mai andato all’estero prima d’ora.',
      exampleTranslation: 'I’ve never been abroad before.',
    },
    // Le feste
    {
      slug: 'cap10-la-festa',
      targetText: 'la festa',
      nativeText: 'the holiday / party / celebration',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'le-feste',
      exampleSentence: 'La festa più attesa dell’anno è il Natale.',
      exampleTranslation: 'The most eagerly awaited holiday of the year is Christmas.',
    },
    {
      slug: 'cap10-festeggiare',
      targetText: 'festeggiare',
      nativeText: 'to celebrate',
      partOfSpeech: 'verb',
      theme: 'le-feste',
    },
    {
      slug: 'cap10-il-natale',
      targetText: 'il Natale',
      nativeText: 'Christmas',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'le-feste',
    },
    {
      slug: 'cap10-il-capodanno',
      targetText: 'il Capodanno',
      nativeText: 'New Year’s Day / New Year’s Eve',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'le-feste',
      exampleSentence: 'A Capodanno si brinda con lo spumante.',
      exampleTranslation: 'On New Year’s people toast with sparkling wine.',
    },
    {
      slug: 'cap10-lepifania',
      targetText: 'l’Epifania / la Befana',
      nativeText: 'the Epiphany / the Befana (January 6)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'le-feste',
      exampleSentence: 'La Befana porta i doni ai bambini la notte del 5 gennaio.',
      exampleTranslation: 'The Befana brings gifts to children on the night of January 5.',
    },
    {
      slug: 'cap10-la-pasqua',
      targetText: 'la Pasqua',
      nativeText: 'Easter',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'le-feste',
    },
    {
      slug: 'cap10-il-ferragosto',
      targetText: 'il Ferragosto',
      nativeText: 'Ferragosto (August 15 national holiday)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'le-feste',
      exampleSentence: 'A Ferragosto molti negozi sono chiusi per ferie.',
      exampleTranslation: 'At Ferragosto many shops are closed for the summer holiday.',
    },
    {
      slug: 'cap10-il-compleanno',
      targetText: 'il compleanno',
      nativeText: 'the birthday',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'le-feste',
      exampleSentence: 'Tanti auguri per il tuo compleanno!',
      exampleTranslation: 'Best wishes for your birthday!',
    },
    {
      slug: 'cap10-gli-auguri',
      targetText: 'gli auguri',
      nativeText: 'the wishes / greetings (best wishes)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'le-feste',
    },
    {
      slug: 'cap10-il-regalo',
      targetText: 'il regalo',
      nativeText: 'the gift / present',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'le-feste',
      exampleSentence: 'Ho già comprato i regali di Natale per tutta la famiglia.',
      exampleTranslation: 'I’ve already bought Christmas gifts for the whole family.',
    },
    {
      slug: 'cap10-i-fuochi-dartificio',
      targetText: 'i fuochi d’artificio',
      nativeText: 'the fireworks',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'le-feste',
    },
    {
      slug: 'cap10-le-ferie',
      targetText: 'le ferie',
      nativeText: 'the annual leave / paid holiday time',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'le-feste',
      exampleSentence: 'In agosto tutti prendono le ferie e la città si svuota.',
      exampleTranslation: 'In August everyone takes their annual leave and the city empties out.',
    },
  ],
};

export default unit;
