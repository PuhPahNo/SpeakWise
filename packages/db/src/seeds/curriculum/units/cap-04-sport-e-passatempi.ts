// Capitolo 4 — Sport e passatempi
// Theme: sports & hobbies. Two new verb conjugation engines (-ere and -ire),
// the modal verbs (dovere/potere/volere), the irregular trio dire/uscire/venire,
// direct-object pronouns, telling the time, and the vocabulary of sport, leisure,
// and weather across Italy’s most athletic regions.
//
// Regional focus: Valle d’Aosta & Trentino-Alto Adige (mountain sports + skiing).
// All content original (copyright-safe).

import { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client';
import type { SeedUnit } from '../types';

const unit: SeedUnit = {
  code: 'cap-04',
  order: 4,
  title: 'Sport e passatempi',
  subtitle: 'Verbs that get you moving, and telling time',
  theme: 'sports',
  level: CEFRLevel.beginner,
  summary:
    'Italy is a nation that plays hard and watches even harder. In this chapter you unlock two new verb ' +
    'conjugation families (-ere and -ire), learn to say what you must, can, and want to do with the ' +
    'modal verbs, meet three wildly useful irregulars (dire, uscire, venire), replace nouns with slick ' +
    'direct-object pronouns, and tell the time precisely — all wrapped around the language of sport, ' +
    'hobbies, and the Italian weather that dictates them.',
  canDo: [
    'Conjugate regular -ere and -ire verbs in the present tense',
    'Say what you want, can, and have to do using modal verbs + infinitive',
    'Use dire, uscire, and venire correctly in context',
    'Replace a direct object with the right pronoun (lo, la, li, le, mi, ti, ci, vi)',
    'Tell the time and say what time an event starts or ends',
    "Talk about the weather and the season using c'è il sole, piove, fa freddo, etc.",
    'Discuss your sports and hobbies and invite someone to join you',
  ],
  culturalNotes: [
    {
      title: 'Calcio: the sport of a nation',
      body:
        'Football (il calcio) is far more than a game in Italy — it is identity, ritual, and conversation. ' +
        'The national team is known as gli Azzurri (the Blues) or la Nazionale, and any strong result ' +
        'dominates every bar, office, and dinner table. The domestic league, Serie A, draws passionate ' +
        'rivalry between clubs: Juventus fans and Inter fans may share a workplace but never a table on ' +
        'match day. Even Italians who rarely watch sport will have a squadra del cuore — a team of the heart.',
    },
    {
      title: 'La Gazzetta dello Sport and the pink pages',
      body:
        'Italy’s most widely read daily newspaper is not a politics or finance paper — it is La Gazzetta ' +
        'dello Sport, printed on its trademark pink (rosa) newsprint since 1896. It organizes the legendary ' +
        "cycling race Il Giro d'Italia each May, threading through the Alps and Dolomites. When Italians say " +
        '"ho letto la Gazzetta", they usually mean sport news, not headlines.',
    },
    {
      title: 'Le Dolomiti: where Italy goes to ski',
      body:
        "Valle d'Aosta and Trentino-Alto Adige are the heartlands of Italian winter sport. Resorts such as " +
        'Courmayeur (beneath Mont Blanc) and the Dolomiti Superski area attract millions of sciatori each ' +
        'season. Italian skiing culture blends fierce competition — Italy has won multiple World Cup titles in ' +
        'sci alpino — with a very civilized après-ski: a grappa or vin brûlé (mulled wine) at the rifugio ' +
        'before heading back down the slope.',
    },
  ],

  // ─── Skills ───────────────────────────────────────────────────────────────
  skills: [
    {
      slug: 'it-regular-ere-verbs-present',
      name: 'Regular -ere verbs in the present tense',
      category: SkillCategory.grammar,
      level: CEFRLevel.beginner,
      description:
        'Verbs whose infinitive ends in -ere follow a single set of endings: -o, -i, -e, -iamo, -ete, ' +
        '-ono. Key verbs in this family include vedere (to see), leggere (to read), prendere (to take), ' +
        'scrivere (to write), chiedere (to ask), chiudere (to close), and mettere (to put).',
      prerequisiteSlugs: ['it-regular-are-verbs-present'],
      examples: [
        {
          target: 'Leggo il giornale ogni mattina.',
          native: 'I read the newspaper every morning.',
          note: 'leggere: leggo, leggi, legge, leggiamo, leggete, leggono',
        },
        {
          target: "Prendi un caffè dopo l'allenamento?",
          native: 'Do you get a coffee after training?',
        },
        {
          target: 'Chiudiamo la palestra alle dieci.',
          native: 'We close the gym at ten.',
        },
        {
          target: 'Metto le scarpe da ginnastica e esco.',
          native: 'I put on my trainers and go out.',
        },
      ],
      commonMistakes: [
        'using the -are ending -iamo for the voi form (the -ere voi form is -ete, not -ate)',
        'writing "vede" for vedono (the loro form always ends in -ono, not -e)',
        'confusing prendere (to take/have) with portare (to bring/carry) — prendere is used for ordering food/drinks',
        'dropping the double consonant in the io form of mettere (metto, not "meto")',
      ],
      recommendedPracticeTypes: [
        TaskType.conjugation,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.error_correction,
      ],
      compatibleThemes: ['sports', 'food', 'travel', 'family', 'culture'],
      teachingNotes:
        'The key teaching moment is the voi form (-ete) — it trips up learners who over-apply the -are ' +
        'pattern. Drill leggere and vedere in sport contexts (leggete i risultati?, vedete la partita?) ' +
        'so the paradigm sticks naturally. Mettere and scrivere are high-frequency across all themes.',
    },
    {
      slug: 'it-regular-ire-verbs-present',
      name: 'Regular -ire verbs in the present tense (two patterns)',
      category: SkillCategory.grammar,
      level: CEFRLevel.beginner,
      description:
        'Italian has two types of regular -ire verb. The plain pattern (dormire, partire, sentire, aprire, ' +
        'offrire) takes -o, -i, -e, -iamo, -ite, -ono. The -isco pattern (capire, finire, preferire, ' +
        'pulire, spedire) inserts -isc- in four forms: capisco, capisci, capisce, capiscono — but ' +
        'capiamo and capite stay without the insert.',
      prerequisiteSlugs: ['it-regular-ere-verbs-present'],
      examples: [
        {
          target: 'Dormo poco durante la stagione sportiva.',
          native: 'I sleep little during the sports season.',
          note: 'plain pattern: dormo, dormi, dorme, dormiamo, dormite, dormono',
        },
        {
          target: 'Parti per le piste questo fine settimana?',
          native: 'Are you leaving for the slopes this weekend?',
        },
        {
          target: "Capisco l'italiano, ma parlo ancora lentamente.",
          native: 'I understand Italian, but I still speak slowly.',
          note: '-isco pattern: capisco, capisci, capisce, capiamo, capite, capiscono',
        },
        {
          target: "Finiamo l'allenamento e poi usciamo.",
          native: 'We finish the training session and then go out.',
        },
      ],
      commonMistakes: [
        'applying the -isco insert to the noi/voi forms (capiamo/capite, never "capiscamo/capiscete")',
        'using the plain pattern for a -isco verb, e.g. "finono" instead of finiscono',
        'confusing sentire (to hear/feel) with sentirsi (reflexive: to feel a certain way)',
        'forgetting that the voi form is -ite, not -ete (dormite, not "dormete")',
      ],
      recommendedPracticeTypes: [
        TaskType.conjugation,
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.error_correction,
      ],
      compatibleThemes: ['sports', 'travel', 'family', 'culture'],
      teachingNotes:
        'Present the two patterns side by side: plain on the left (dormire), -isco on the right (capire). ' +
        'Highlight that the split is only in four forms (io, tu, lui/lei, loro) and that noi/voi stay clean. ' +
        'Preferire is excellent for this chapter — "preferisci sciare o nuotare?" makes the -isco forms feel immediately personal.',
    },
    {
      slug: 'it-modal-verbs',
      name: 'Modal verbs: dovere, potere, volere',
      category: SkillCategory.grammar,
      level: CEFRLevel.beginner,
      description:
        'The three modal verbs express obligation (dovere — must/have to), possibility (potere — can/may), ' +
        'and desire (volere — to want). Each is irregular and is always followed by an infinitive. ' +
        'Dovere: devo, devi, deve, dobbiamo, dovete, devono. ' +
        'Potere: posso, puoi, può, possiamo, potete, possono. ' +
        'Volere: voglio, vuoi, vuole, vogliamo, volete, vogliono.',
      prerequisiteSlugs: ['it-regular-ere-verbs-present', 'it-regular-ire-verbs-present'],
      examples: [
        {
          target: 'Devo allenarmi tre volte a settimana.',
          native: 'I have to train three times a week.',
          note: 'dovere: obligation or strong necessity',
        },
        {
          target: 'Puoi venire alla partita sabato?',
          native: 'Can you come to the match on Saturday?',
          note: 'potere: ability or polite request',
        },
        {
          target: "Voglio imparare a sciare quest'inverno.",
          native: 'I want to learn to ski this winter.',
        },
        {
          target: 'Non possiamo giocare — piove troppo.',
          native: "We can't play — it's raining too hard.",
        },
      ],
      commonMistakes: [
        'forgetting the infinitive after the modal (saying "voglio sport" instead of "voglio fare sport")',
        'using posso for "I know how to" — sapere + infinitive covers that, not potere',
        'confusing devo (I must) and posso (I can): devo expresses obligation, posso expresses possibility',
        'misspelling dobbiamo — learners often write "doviamo"',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.speaking_prompt,
        TaskType.multiple_choice,
      ],
      compatibleThemes: ['sports', 'travel', 'family', 'business'],
      teachingNotes:
        'Drill all three modals together so the contrast is immediate: "devo / posso / voglio uscire". ' +
        'Frame the weekend plan scenario — what do you have to do, what can you do, what do you want to do? ' +
        'Sport contexts (allenamento, partita, sciare) make the modals feel urgent and personal.',
    },
    {
      slug: 'it-dire-uscire-venire',
      name: 'Irregular verbs: dire, uscire, venire',
      category: SkillCategory.grammar,
      level: CEFRLevel.beginner,
      description:
        'Three high-frequency irregular verbs every beginner needs urgently. ' +
        'Dire (to say/tell): dico, dici, dice, diciamo, dite, dicono. ' +
        'Uscire (to go out): esco, esci, esce, usciamo, uscite, escono. ' +
        'Venire (to come): vengo, vieni, viene, veniamo, venite, vengono.',
      prerequisiteSlugs: ['it-modal-verbs'],
      examples: [
        {
          target: 'Cosa dici? Non sento bene.',
          native: "What are you saying? I can't hear well.",
          note: 'dire: dico, dici, dice, diciamo, dite, dicono',
        },
        {
          target: 'Esco alle sei per correre prima del lavoro.',
          native: 'I go out at six to run before work.',
          note: 'uscire: esco, esci, esce, usciamo, uscite, escono',
        },
        {
          target: 'Vieni allo stadio con noi domenica?',
          native: 'Are you coming to the stadium with us on Sunday?',
          note: 'venire: vengo, vieni, viene, veniamo, venite, vengono',
        },
        {
          target: 'Diciamo sempre che vogliamo fare più sport.',
          native: 'We always say we want to do more sport.',
        },
      ],
      commonMistakes: [
        'conjugating uscire as a plain -ire verb ("usco" instead of esco)',
        'using "vengo" correctly but forgetting "vieni" (not "veni") for the tu form',
        'saying "dico di" instead of the correct "dico che" to introduce a reported clause',
        'confusing venire (to come/arrive at a place) with andare (to go away from speaker)',
      ],
      recommendedPracticeTypes: [
        TaskType.conjugation,
        TaskType.fill_blank,
        TaskType.error_correction,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['sports', 'family', 'travel', 'culture'],
      teachingNotes:
        'Teach uscire alongside esco (the io/lui/loro forms drop the c and take esc-). ' +
        'Venire is critical for invitations — "vieni con me?" is one of the most used social phrases. ' +
        'Dire pairs naturally with the reporting theme: "il mio allenatore dice che…".',
    },
    {
      slug: 'it-direct-object-pronouns',
      name: 'Direct object pronouns (lo, la, li, le, mi, ti, ci, vi)',
      category: SkillCategory.grammar,
      level: CEFRLevel.lower_intermediate,
      description:
        'Direct object pronouns replace the noun that receives the action directly. The forms are: ' +
        'mi (me), ti (you), lo (him/it m.), la (her/it f.), ci (us), vi (you pl.), li (them m.), ' +
        'le (them f.). They are placed BEFORE a conjugated verb (lo vedo — I see him/it) or attached ' +
        "to an infinitive (voglio vederlo). Lo and la elide to l' before a vowel (l'ascolto).",
      prerequisiteSlugs: ['it-regular-are-verbs-present', 'it-noun-gender'],
      examples: [
        {
          target: 'Guardi la partita? — Sì, la guardo ogni domenica.',
          native: 'Do you watch the match? — Yes, I watch it every Sunday.',
          note: 'la replaces "la partita" (f.)',
        },
        {
          target: 'Conosci questo calciatore? — No, non lo conosco.',
          native: "Do you know this footballer? — No, I don't know him.",
        },
        {
          target: 'Vuoi ascoltare la musica? — Sì, voglio ascoltarla.',
          native: 'Do you want to listen to music? — Yes, I want to listen to it.',
          note: 'pronoun attaches to infinitive and article drops',
        },
        {
          target: "L'aspetto fuori dallo stadio.",
          native: "I'll wait for him/her outside the stadium.",
          note: "lo/la elide to l' before a vowel",
        },
      ],
      commonMistakes: [
        'placing the pronoun after the conjugated verb (say "lo vedo" not "vedo lo")',
        'confusing lo (m.s.) with le (f.pl.) — le replaces plural feminine nouns',
        'forgetting to elide lo/la to l\' before a vowel (l\'ascolto, not "lo ascolto")',
        'attaching the pronoun to the conjugated verb instead of the infinitive in modal constructions (voglio vederlo, not "lo voglio vedere" — both are possible, but the attached form is cleaner)',
      ],
      recommendedPracticeTypes: [
        TaskType.pronoun_replacement,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.error_correction,
      ],
      compatibleThemes: ['sports', 'film', 'music', 'family'],
      teachingNotes:
        'The placement rule (before conjugated verb OR glued to infinitive) is the core teaching point. ' +
        'Drill with sport vocabulary: "guardi la partita? — sì, la guardo" so the replacement is visible. ' +
        "The lo/la elision before a vowel sounds sophisticated but is not optional — drill with l'ascolto, l'aspetto.",
    },
    {
      slug: 'it-telling-time',
      name: 'Telling the time',
      category: SkillCategory.grammar,
      level: CEFRLevel.lower_intermediate,
      description:
        'Ask and answer "what time is it?" with Che ore sono? / Che ora è? — and state the answer. ' +
        "È l'una for 1:00; sono le due/tre/… for all other hours. Add minutes with e un quarto (15), " +
        'e mezza (30), e venti (20), or meno un quarto (quarter to). Qualify time with di mattina, ' +
        'del pomeriggio, di sera, di notte. Use the 24-hour clock for schedules and timetables.',
      prerequisiteSlugs: ['it-vocab-numbers-1-100'],
      examples: [
        {
          target: 'Che ore sono? — Sono le tre e un quarto.',
          native: "What time is it? — It's quarter past three.",
          note: 'sono le + hour + e + minutes',
        },
        {
          target: 'La partita inizia alle otto di sera.',
          native: 'The match starts at eight in the evening.',
          note: 'alle (a + le) + hour for "at … o\'clock"',
        },
        {
          target: 'È mezzogiorno — andiamo a mangiare.',
          native: "It's noon — let's go eat.",
        },
        {
          target: 'Il treno parte alle 14:30 (le quattordici e trenta).',
          native: 'The train leaves at 14:30.',
          note: '24-hour clock for schedules; spoken as le quattordici e trenta',
        },
      ],
      commonMistakes: [
        'saying "è le due" instead of "sono le due" (è only for l\'una, mezzogiorno, mezzanotte)',
        'translating "at" as a instead of alle (a + le) before clock times',
        'saying "le due e quarantacinque" when meno un quarto is more natural for 1:45',
        'forgetting di before mattina and notte but del before pomeriggio (del pomeriggio, not "di pomeriggio")',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.speaking_prompt,
        TaskType.listening_comprehension,
      ],
      compatibleThemes: ['sports', 'travel', 'family', 'business'],
      teachingNotes:
        "The è/sono split (è l'una, sono le…) is the single most common error and deserves direct drilling first. " +
        'Use sport schedules as the context: partita alle 20:45, allenamento alle 7:00. ' +
        'The 24-hour clock matters for Italian train and event timetables — frame it as a practical survival skill.',
    },
    {
      slug: 'it-vocab-sports-hobbies',
      name: 'Sports and hobbies vocabulary',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.beginner,
      description:
        'The vocabulary for sport and leisure: team sports, individual sports, and pastimes. Note the key ' +
        'structural difference between giocare a + sport (play a game) and fare + sport (do/practice a sport) — ' +
        'both patterns are essential and are not interchangeable.',
      prerequisiteSlugs: ['it-regular-are-verbs-present'],
      examples: [
        {
          target: 'Gioco a calcio il sabato e vado in palestra durante la settimana.',
          native: 'I play football on Saturdays and go to the gym during the week.',
          note: 'giocare a + ball sport',
        },
        {
          target: 'Faccio nuoto due volte a settimana.',
          native: 'I go swimming twice a week.',
          note: 'fare + activity (also: fare ciclismo, fare sci)',
        },
        {
          target: 'Nel tempo libero leggo, dipingo e suono la chitarra.',
          native: 'In my free time I read, paint, and play guitar.',
        },
      ],
      commonMistakes: [
        'using giocare with non-game sports (say "faccio nuoto", not "gioco a nuoto")',
        'omitting the article with fare: "fare il nuoto" and "fare nuoto" are both used, but "fare sport" takes no article',
        'confusing la partita (a specific match/game) and lo sport (the activity in general)',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.fill_blank,
        TaskType.speaking_prompt,
        TaskType.roleplay,
      ],
      compatibleThemes: ['sports', 'travel', 'music', 'family'],
      teachingNotes:
        'Center the lesson on the learner\'s actual sport or hobby — ask "quale sport pratichi?" and use ' +
        'their answer throughout. The giocare a / fare split is the core grammar micro-rule here and recurs for years.',
    },
    {
      slug: 'it-vocab-weather-seasons',
      name: 'Weather and seasons vocabulary',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.beginner,
      description:
        "Talk about the weather with Che tempo fa? and the responses: fa caldo (it's hot), fa freddo " +
        "(it's cold), fa fresco (it's cool), c'è il sole (it's sunny), è nuvoloso (it's cloudy), " +
        "piove (it's raining), nevica (it's snowing), c'è vento (it's windy). " +
        "The four seasons: la primavera (spring), l'estate (summer), l'autunno (autumn), l'inverno (winter).",
      prerequisiteSlugs: ['it-vocab-sports-hobbies'],
      examples: [
        {
          target: 'Che tempo fa oggi? — Fa freddo e nevica.',
          native: "What's the weather like today? — It's cold and it's snowing.",
        },
        {
          target: "D'estate fa molto caldo al sud, ma in montagna fa fresco.",
          native: "In summer it's very hot in the south, but in the mountains it's cool.",
        },
        {
          target: 'Non possiamo sciare — non nevica abbastanza.',
          native: "We can't ski — it's not snowing enough.",
          note: 'weather + modal: natural sport-themed combination',
        },
      ],
      commonMistakes: [
        'saying "è caldo" instead of "fa caldo" for weather (è caldo describes an object, fa caldo the weather)',
        "forgetting the apostrophe in l'estate and l'autunno (both start with a vowel)",
        'using "piove" as a noun ("il piove") — piova/piove are verb forms, the noun is la pioggia',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.fill_blank,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['sports', 'travel', 'family', 'culture'],
      teachingNotes:
        'Link weather directly to sport decisions: "fa freddo → resto a casa o vado a sciare?". ' +
        'The fa caldo/freddo/fresco pattern needs direct drilling — English speakers default to è. ' +
        "Seasons connect well to the regional focus (Valle d'Aosta in winter vs Calabria in estate).",
    },
  ],

  // ─── Lesson templates ─────────────────────────────────────────────────────
  lessonTemplates: [
    {
      slug: 'cap04-ere-ire-engine',
      title: 'The -ere and -ire engine',
      lessonType: LessonType.grammar,
      level: CEFRLevel.beginner,
      summary:
        'Build fluency with both new conjugation families by putting them straight to work in sports ' +
        'and leisure sentences — then notice where the plain -ire and -isco patterns split.',
      objectiveSkillSlugs: ['it-regular-ere-verbs-present', 'it-regular-ire-verbs-present'],
      defaultDurationMinutes: 12,
      compatibleThemes: ['sports', 'travel', 'music'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'The -ere endings vs -are',
          prompt:
            'The -ere endings are almost identical to -are except the voi form: -ete, not -ate. ' +
            'Spot the difference: parlate vs leggete.',
          notes: 'Side-by-side table: -are vs -ere. Two minutes max.',
        },
        {
          taskType: TaskType.conjugation,
          focus: 'Conjugate vedere and leggere',
          prompt: 'Give all six forms of vedere and leggere.',
          exampleAnswer:
            'vedo, vedi, vede, vediamo, vedete, vedono; leggo, leggi, legge, leggiamo, leggete, leggono',
          notes: 'Emphasize the -ete voi form. Use in a sports context: "vedete la partita?"',
        },
        {
          taskType: TaskType.explanation,
          focus: 'Two -ire patterns',
          prompt:
            'Plain: dormire (dormo, dormi, dorme…). -isco: capire (capisco, capisci, capisce, capiamo, capite, capiscono). ' +
            'The insert appears in io, tu, lui/lei, loro — but disappears for noi/voi.',
          notes: 'Highlight the four -isco cells vs two clean cells.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Plain vs -isco in context',
          prompt:
            'Complete: "Marco _____ (partire) domani. Io _____ (capire) l\'italiano ma non lo _____ (parlare) bene."',
          exampleAnswer: 'parte, capisco, parlo',
          notes: 'Mix all three verb families so the learner must choose.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Personalize with your hobbies',
          prompt: 'Say three things you do or read or watch using -ere and -ire verbs.',
          notes:
            'Prompt the learner with their own hobbies from profile (leggi romanzi? senti musica? vedi film?). ' +
            'Accept and reinforce any correct usage.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Lock in the voi difference',
          prompt: 'What is the voi form of leggere? And of dormire?',
          exampleAnswer: 'leggete; dormite',
        },
      ],
    },
    {
      slug: 'cap04-what-you-want-can-must',
      title: 'What you want, can, and must do this weekend',
      lessonType: LessonType.grammar,
      level: CEFRLevel.beginner,
      summary:
        'Master the three modal verbs by planning a real weekend around sport and leisure — saying what ' +
        'you have to do, what you can do if the weather cooperates, and what you really want to do.',
      objectiveSkillSlugs: ['it-modal-verbs', 'it-dire-uscire-venire', 'it-vocab-sports-hobbies'],
      defaultDurationMinutes: 11,
      compatibleThemes: ['sports', 'travel', 'family'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Modals unlock planning',
          prompt:
            'This weekend you have obligations, options, and wishes. Three verbs — dovere, potere, volere — ' +
            'let you express all three.',
          notes: 'Keep it brief; segue immediately into the paradigm.',
        },
        {
          taskType: TaskType.conjugation,
          focus: 'Paradigm spot-check',
          prompt: 'Give io and noi forms for all three modals.',
          exampleAnswer: 'devo / dobbiamo; posso / possiamo; voglio / vogliamo',
          notes: 'Focus on the irregular io/noi forms — these are the tricky cells.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Modal + infinitive in sport context',
          prompt: 'Translate: "I have to train at seven, but I want to watch the match at nine."',
          exampleAnswer: 'Devo allenarmi alle sette, ma voglio guardare la partita alle nove.',
          notes:
            'If the learner has a specific sport, substitute it. Reinforce the infinitive requirement.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Potere + weather',
          prompt:
            'Complete: "Non _____ (potere) sciare oggi — _____ troppo vento e non _____  (nevicare) abbastanza."',
          exampleAnswer: "possiamo, c'è, nevica",
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Your actual weekend plan',
          prompt:
            'Tell me one thing you must do, one you can do, and one you want to do this weekend.',
          notes:
            'Pull from learner profile: sport, hobby, obligation. Accept any correct modal + infinitive structure.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Match the modal to its meaning',
          prompt: 'Which modal expresses obligation? Possibility? Desire?',
          exampleAnswer: 'dovere; potere; volere',
        },
      ],
    },
    {
      slug: 'cap04-make-plans-invite-someone',
      title: 'Make plans and invite a friend',
      lessonType: LessonType.scenario_roleplay,
      level: CEFRLevel.beginner,
      summary:
        'Use the irregular verbs uscire and venire, plus the modals, to extend an invitation and ' +
        'negotiate the details — time, place, and what you’ll do together.',
      objectiveSkillSlugs: [
        'it-dire-uscire-venire',
        'it-modal-verbs',
        'it-telling-time',
        'it-vocab-sports-hobbies',
      ],
      defaultDurationMinutes: 10,
      compatibleThemes: ['sports', 'travel', 'family', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Set the scene',
          prompt:
            "It's Thursday afternoon. You want to invite a friend to a match on Saturday. " +
            "You'll have to check the time, confirm they're free, and settle on a plan.",
          notes: "Personalize the sport/event to the learner's known interests.",
        },
        {
          taskType: TaskType.roleplay,
          focus: 'Extend the invitation with venire',
          prompt: 'Invite a friend: ask if they can come to the game on Saturday.',
          exampleAnswer: 'Vieni alla partita sabato? Possiamo uscire insieme dopo.',
          notes: 'Encourage use of venire + potere + uscire in the same turn.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Confirm the time',
          prompt:
            'Complete the message: "La partita inizia ___ (at) otto di sera. Usciamo ___ (at) sette e mezza?"',
          exampleAnswer: 'alle otto di sera. Usciamo alle sette e mezza.',
          notes: 'Reinforce alle for clock times.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Respond to a counter-offer',
          prompt:
            'Your friend says: "Non posso alle otto — devo cenare con la famiglia. Puoi venire prima?" ' +
            'Which is the most natural reply?',
          exampleAnswer: 'Certo, posso venire alle sei e mezza.',
          notes: 'Three options varying in register and use of modal.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Confirm the plan out loud',
          prompt: "Summarize the plan: when you're meeting, where, and what you'll do.",
          notes: 'Free production. Coach any errors in time expression or modal usage.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Venire vs andare',
          prompt: 'When do you use venire and when andare?',
          notes: 'venire = come (toward speaker/meeting point); andare = go (away from speaker).',
        },
      ],
    },
    {
      slug: 'cap04-sport-and-weather',
      title: 'Your sport, the weather, and direct-object swaps',
      lessonType: LessonType.vocabulary_review,
      level: CEFRLevel.beginner,
      summary:
        'Combine sports/hobbies vocabulary with weather expressions, then practice swapping out ' +
        'direct objects with pronouns to make your Italian sound fluid and natural.',
      objectiveSkillSlugs: [
        'it-vocab-sports-hobbies',
        'it-vocab-weather-seasons',
        'it-direct-object-pronouns',
      ],
      defaultDurationMinutes: 10,
      compatibleThemes: ['sports', 'travel', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Connect weather to sport decisions',
          prompt:
            "Good Italian speakers never repeat the same noun twice. Today you'll swap sport nouns " +
            'for slick pronouns — and let the weather decide what you can actually do.',
          notes: 'If learner is known to ski, use skiing; if they play football, use that.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Weather expressions',
          prompt:
            'Complete: "A gennaio in Val d\'Aosta ___ molto freddo e ___. A luglio al mare ___ caldo e ___ il sole."',
          exampleAnswer: "fa molto freddo e nevica. A luglio al mare fa caldo e c'è il sole.",
        },
        {
          taskType: TaskType.pronoun_replacement,
          focus: 'Replace the direct object',
          prompt:
            'Rewrite replacing the underlined noun with a pronoun: ' +
            '"Guardo [la partita] ogni domenica." / "Conosco [quel calciatore]." / "Ascolto [la musica] mentre corro."',
          exampleAnswer: 'La guardo ogni domenica. / Lo conosco. / La ascolto mentre corro.',
          notes: "Watch the l'ascolto elision on the third one.",
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Fix the pronoun placement',
          prompt: 'Find the error: "Voglio lo comprare il biglietto online."',
          exampleAnswer:
            'Voglio comprarlo online. (pronoun attaches to infinitive, or: lo voglio comprare)',
          notes: 'Both positions are grammatical; attached to infinitive is more elegant.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Talk about your sport using pronouns',
          prompt:
            'Tell me about a sport or hobby you love. Then say whether you watch it, practice it, or both — ' +
            'using the right pronoun each time.',
          notes: "Personalize fully. Coach lo/la agreement with the noun's gender.",
        },
        {
          taskType: TaskType.recap,
          focus: 'Pronoun before verb or after infinitive?',
          prompt: 'Where does the pronoun go in "Voglio guardare la partita"?',
          exampleAnswer:
            'Voglio guardarla (attached to infinitive) or la voglio guardare (before modal)',
        },
      ],
    },
    {
      slug: 'cap04-telling-time-schedules',
      title: 'Che ore sono? — The art of Italian time',
      lessonType: LessonType.grammar,
      level: CEFRLevel.lower_intermediate,
      summary:
        'Master the full Italian clock: è vs sono, quarter/half expressions, time-of-day qualifiers, ' +
        'and the 24-hour clock so you never miss a train or a kick-off again.',
      objectiveSkillSlugs: ['it-telling-time'],
      defaultDurationMinutes: 9,
      compatibleThemes: ['sports', 'travel', 'business', 'family'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'È vs sono — the fundamental split',
          prompt:
            "È l'una (only for 1:00). Sono le due, le tre, … le dodici. " +
            'È mezzogiorno / È mezzanotte for noon and midnight.',
          notes: "Drill the è l'una anomaly directly — it catches everyone.",
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'È or sono?',
          prompt: 'Choose: "_____ le quattro del pomeriggio."',
          exampleAnswer: 'Sono le quattro del pomeriggio.',
          notes: 'Also test: "_____ l\'una di notte." → È l\'una di notte.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Add minutes and qualifiers',
          prompt: 'Write in words: 3:15, 7:30, 8:45 di mattina.',
          exampleAnswer: 'le tre e un quarto; le sette e mezza; le nove meno un quarto di mattina',
          notes:
            'For 8:45, accept "le otto e quarantacinque" but teach meno un quarto as the natural form.',
        },
        {
          taskType: TaskType.listening_comprehension,
          focus: 'Catch a train departure time',
          prompt: 'What time does the train to Milano leave?',
          notes:
            'Audio cue: "Il prossimo treno per Milano parte alle diciassette e trenta." ' +
            'Multiple-choice: 5:30 pm / 7:30 pm / 15:30. Learner must map 17:30 to 5:30 pm.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Your daily sport schedule',
          prompt:
            'Tell me: what time do you usually exercise or watch sport? Use di mattina / del pomeriggio / di sera.',
          notes: 'Personalize. Correct è/sono and alle vs a errors immediately.',
        },
        {
          taskType: TaskType.recap,
          focus: 'The four time-of-day phrases',
          prompt: 'How do you say "in the morning / in the afternoon / in the evening / at night"?',
          exampleAnswer: 'di mattina, del pomeriggio, di sera, di notte',
        },
      ],
    },
  ],

  // ─── Thematic vocabulary bank ─────────────────────────────────────────────
  vocabulary: [
    // Sport
    {
      slug: 'cap04-lo-sport',
      targetText: 'lo sport',
      nativeText: 'sport (general)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'sport',
    },
    {
      slug: 'cap04-il-calcio',
      targetText: 'il calcio',
      nativeText: 'football / soccer',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'sport',
      exampleSentence: 'Il calcio è lo sport più popolare in Italia.',
      exampleTranslation: 'Football is the most popular sport in Italy.',
    },
    {
      slug: 'cap04-il-tennis',
      targetText: 'il tennis',
      nativeText: 'tennis',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'sport',
    },
    {
      slug: 'cap04-il-nuoto',
      targetText: 'il nuoto',
      nativeText: 'swimming',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'sport',
      exampleSentence: 'Faccio nuoto tre volte a settimana.',
      exampleTranslation: 'I go swimming three times a week.',
    },
    {
      slug: 'cap04-la-pallacanestro',
      targetText: 'la pallacanestro',
      nativeText: 'basketball',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'sport',
    },
    {
      slug: 'cap04-la-pallavolo',
      targetText: 'la pallavolo',
      nativeText: 'volleyball',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'sport',
    },
    {
      slug: 'cap04-lo-sci',
      targetText: 'lo sci',
      nativeText: 'skiing',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'sport',
      exampleSentence: "D'inverno andiamo sulle Dolomiti a fare sci.",
      exampleTranslation: 'In winter we go to the Dolomites to ski.',
    },
    {
      slug: 'cap04-il-ciclismo',
      targetText: 'il ciclismo',
      nativeText: 'cycling',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'sport',
    },
    {
      slug: 'cap04-la-ginnastica',
      targetText: 'la ginnastica',
      nativeText: 'gymnastics / exercise',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'sport',
    },
    {
      slug: 'cap04-la-partita',
      targetText: 'la partita',
      nativeText: 'the match / game',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'sport',
      exampleSentence: 'Guardi la partita stasera?',
      exampleTranslation: 'Are you watching the match tonight?',
    },
    {
      slug: 'cap04-la-squadra',
      targetText: 'la squadra',
      nativeText: 'the team',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'sport',
    },
    {
      slug: 'cap04-giocare-a',
      targetText: 'giocare a',
      nativeText: 'to play (a game/sport)',
      partOfSpeech: 'phrase',
      theme: 'sport',
      exampleSentence: 'Gioco a tennis il sabato mattina.',
      exampleTranslation: 'I play tennis on Saturday mornings.',
    },
    {
      slug: 'cap04-nuotare',
      targetText: 'nuotare',
      nativeText: 'to swim',
      partOfSpeech: 'verb',
      theme: 'sport',
    },
    {
      slug: 'cap04-sciare',
      targetText: 'sciare',
      nativeText: 'to ski',
      partOfSpeech: 'verb',
      theme: 'sport',
    },
    {
      slug: 'cap04-correre',
      targetText: 'correre',
      nativeText: 'to run',
      partOfSpeech: 'verb',
      theme: 'sport',
      exampleSentence: 'Corro nel parco ogni mattina.',
      exampleTranslation: 'I run in the park every morning.',
    },
    // Passatempi
    {
      slug: 'cap04-il-passatempo',
      targetText: 'il passatempo',
      nativeText: 'the hobby / pastime',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'passatempi',
    },
    {
      slug: 'cap04-leggere',
      targetText: 'leggere',
      nativeText: 'to read',
      partOfSpeech: 'verb',
      theme: 'passatempi',
    },
    {
      slug: 'cap04-ballare',
      targetText: 'ballare',
      nativeText: 'to dance',
      partOfSpeech: 'verb',
      theme: 'passatempi',
    },
    {
      slug: 'cap04-dipingere',
      targetText: 'dipingere',
      nativeText: 'to paint',
      partOfSpeech: 'verb',
      theme: 'passatempi',
    },
    {
      slug: 'cap04-cucinare',
      targetText: 'cucinare',
      nativeText: 'to cook',
      partOfSpeech: 'verb',
      theme: 'passatempi',
    },
    {
      slug: 'cap04-la-chitarra',
      targetText: 'la chitarra',
      nativeText: 'the guitar',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'passatempi',
      exampleSentence: 'Nel tempo libero suono la chitarra.',
      exampleTranslation: 'In my free time I play guitar.',
    },
    {
      slug: 'cap04-il-tempo-libero',
      targetText: 'il tempo libero',
      nativeText: 'free time / leisure time',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'passatempi',
    },
    // Tempo (weather)
    {
      slug: 'cap04-il-tempo',
      targetText: 'il tempo',
      nativeText: 'the weather (also: time)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'tempo',
      exampleSentence: 'Che tempo fa oggi?',
      exampleTranslation: "What's the weather like today?",
    },
    {
      slug: 'cap04-fa-caldo',
      targetText: 'fa caldo',
      nativeText: "it's hot",
      partOfSpeech: 'phrase',
      theme: 'tempo',
    },
    {
      slug: 'cap04-fa-freddo',
      targetText: 'fa freddo',
      nativeText: "it's cold",
      partOfSpeech: 'phrase',
      theme: 'tempo',
    },
    {
      slug: 'cap04-piove',
      targetText: 'piove',
      nativeText: "it's raining",
      partOfSpeech: 'verb',
      theme: 'tempo',
      exampleSentence: 'Piove, quindi non possiamo giocare a calcio.',
      exampleTranslation: "It's raining, so we can't play football.",
    },
    {
      slug: 'cap04-la-pioggia',
      targetText: 'la pioggia',
      nativeText: 'the rain',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'tempo',
    },
    {
      slug: 'cap04-nevica',
      targetText: 'nevica',
      nativeText: "it's snowing",
      partOfSpeech: 'verb',
      theme: 'tempo',
    },
    {
      slug: 'cap04-la-neve',
      targetText: 'la neve',
      nativeText: 'the snow',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'tempo',
      exampleSentence: "C'è molta neve sulle Dolomiti.",
      exampleTranslation: "There's a lot of snow on the Dolomites.",
    },
    {
      slug: 'cap04-ce-il-sole',
      targetText: "c'è il sole",
      nativeText: "it's sunny",
      partOfSpeech: 'phrase',
      theme: 'tempo',
    },
    {
      slug: 'cap04-e-nuvoloso',
      targetText: 'è nuvoloso',
      nativeText: "it's cloudy",
      partOfSpeech: 'phrase',
      theme: 'tempo',
    },
    {
      slug: 'cap04-ce-vento',
      targetText: "c'è vento",
      nativeText: "it's windy",
      partOfSpeech: 'phrase',
      theme: 'tempo',
    },
    // Stagioni
    {
      slug: 'cap04-la-primavera',
      targetText: 'la primavera',
      nativeText: 'spring',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'stagioni',
    },
    {
      slug: 'cap04-lestate',
      targetText: "l'estate",
      nativeText: 'summer',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'stagioni',
      exampleSentence: "D'estate faccio nuoto e gioco a pallavolo in spiaggia.",
      exampleTranslation: 'In summer I swim and play beach volleyball.',
    },
    {
      slug: 'cap04-lautunno',
      targetText: "l'autunno",
      nativeText: 'autumn / fall',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'stagioni',
    },
    {
      slug: 'cap04-linverno',
      targetText: "l'inverno",
      nativeText: 'winter',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'stagioni',
      exampleSentence: "D'inverno preferisco sciare piuttosto che correre.",
      exampleTranslation: 'In winter I prefer skiing to running.',
    },
  ],
};

export default unit;
