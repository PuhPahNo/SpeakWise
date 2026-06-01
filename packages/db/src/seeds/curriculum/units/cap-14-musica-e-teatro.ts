// Capitolo 14 — La musica e il teatro
// Theme: music and theater (performing arts). Relative pronouns, the infinitive
// in its various constructions, nouns ending in -a that are masculine, and
// vocabulary for instruments, genres, opera, and the stage.
//
// All content original (copyright-safe).

import { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client';
import type { SeedUnit } from '../types';

const unit: SeedUnit = {
  code: 'cap-14',
  order: 14,
  title: 'La musica e il teatro',
  subtitle: 'Relative pronouns, the infinitive, and the performing arts',
  theme: 'music',
  level: CEFRLevel.upper_intermediate,
  summary:
    'Step into the world of Italian music and theater: describe a concert or opera you loved, ' +
    'link ideas fluidly with che, cui, and chi, chain verbs together with the right preposition ' +
    '(imparare a suonare, cercare di recitare, finire di provare), and master the tricky class of ' +
    'masculine nouns ending in -a — il programma, il tema, il pianista. The cultural backdrop ' +
    'stretches from the violin workshops of Cremona to the Festival di Sanremo and the glittering ' +
    'stage of La Scala, with a regional spotlight on Liguria.',
  canDo: [
    'Link clauses with che and cui to describe music and performances',
    'Use chi to mean "the one who" or "whoever", and distinguish it from interrogative chi',
    'Chain verbs correctly with the right connective preposition — a, di, or nothing',
    'Use the infinitive as a noun and after prima di / senza',
    'Identify and correctly inflect masculine nouns ending in -a (il programma → i programmi)',
    'Discuss instruments, genres, concerts, and theater roles in Italian',
  ],
  culturalNotes: [
    {
      title: 'La Scala and the world of Italian opera',
      body:
        'Milan’s Teatro alla Scala, inaugurated in 1778, is the most storied opera house in the world. ' +
        'Its stage has heard the premieres of Verdi’s Otello and Falstaff and Puccini’s Madama Butterfly. A first night at La Scala (la prima) is a true cultural event: ' +
        'the audience — the loggionisti in the cheap upper tiers — are notoriously demanding, ' +
        'and even celebrated singers have been booed off the stage. Beyond Milan, opera is woven ' +
        'into everyday Italian life: summer open-air seasons at Verona’s Roman amphitheater draw tens of thousands of fans who might never set foot in a ' +
        'formal opera house. Knowing a few aria titles and the names Verdi and Puccini earns ' +
        'immediate warmth from Italian speakers of every generation.',
    },
    {
      title: 'Cremona and the violin-making tradition',
      body:
        'The small Lombard city of Cremona is the birthplace of the modern violin and home to ' +
        'the world’s most celebrated instrument makers. Antonio Stradivari (1644–1737) crafted roughly ' +
        '1,100 instruments in his workshop on Via Palestro; about 650 survive and sell at auction ' +
        'for millions of euros. Alongside Stradivari, the Amati and Guarneri families shaped the ' +
        'craft across three centuries. Today Cremona hosts the International School of Violin ' +
        'Making (Scuola Internazionale di Liuteria), and some 150 liutai (luthiers) still work in ' +
        'the city, keeping a tradition recognized by UNESCO as Intangible Cultural Heritage. ' +
        'Visiting their workshops — many open to the public — is an unforgettable experience for ' +
        'any music lover.',
    },
    {
      title: 'Il Festival di Sanremo',
      body:
        'Every February, the small Ligurian city of Sanremo becomes the center of the Italian ' +
        'music universe. The Festival della Canzone Italiana — universally known as Sanremo — ' +
        'has run since 1951 and remains the most-watched non-sporting television event in Italy, ' +
        'regularly drawing audiences of ten million or more. Winning Sanremo can launch a ' +
        'career overnight: past winners include Domenico Modugno, whose "Volare" became a global ' +
        'hit in 1958, and in recent years artists like Mahmood and Blanco have broken streaming ' +
        'records the morning after their victory. The festival also serves as Italy’s Eurovision ' +
        'selection, giving it an outsized international footprint. For learners, Sanremo is a ' +
        'goldmine of contemporary Italian lyrics sung slowly and clearly enough to follow.',
    },
  ],

  // ─── Skills ───────────────────────────────────────────────────────────────
  skills: [
    // 1 ─ Relative pronouns: che and cui
    {
      slug: 'it-relative-pronouns',
      name: 'Relative pronouns: che and cui',
      category: SkillCategory.grammar,
      level: CEFRLevel.upper_intermediate,
      description:
        'Che (invariable) introduces a relative clause where the pronoun is the subject or direct ' +
        'object: "il cantante che preferisco". Cui follows a preposition and replaces any noun ' +
        'that is not the subject or direct object: "la chitarra con cui suona", "il film di cui ' +
        'parla". The more formal il quale / la quale / i quali / le quali can replace either, and ' +
        'are especially useful when gender or number helps avoid ambiguity.',
      prerequisiteSlugs: ['it-direct-object-pronouns'],
      examples: [
        {
          target: 'Il violinista che ha suonato ieri era straordinario.',
          native: 'The violinist who played yesterday was extraordinary.',
          note: 'che as subject of the relative clause',
        },
        {
          target: 'La canzone che ascolto ogni giorno si chiama "Azzurro".',
          native: 'The song (that) I listen to every day is called "Azzurro".',
          note: 'che as direct object — never omitted in Italian unlike English "that"',
        },
        {
          target: 'Il compositore di cui ti ho parlato ha vinto il Festival di Sanremo.',
          native: 'The composer I told you about won the Festival di Sanremo.',
          note: 'di cui = about whom / of which; the preposition di comes before cui',
        },
        {
          target: 'L’orchestra con la quale ha collaborato è famosa in tutto il mondo.',
          native: 'The orchestra with which she has collaborated is famous throughout the world.',
          note: 'con la quale — formal alternative to con cui, agreeing with la orchestra',
        },
      ],
      commonMistakes: [
        'using cui without the required preposition ("la ragazza cui parlo" → con cui parlo)',
        'treating che as changeable and writing "chi" or "che" for indirect-object roles — che is only subject/direct-object; cui is required after a preposition',
        'omitting the relative pronoun the English way ("the song I like" → "la canzone che mi piace", never bare)',
        'choosing the wrong article in il quale / la quale (it must agree with the antecedent noun, not the subject of the relative clause)',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.error_correction,
        TaskType.translation,
        TaskType.multiple_choice,
      ],
      compatibleThemes: ['music', 'film', 'art', 'culture'],
      teachingNotes:
        'Teach the two-question test: (1) is the pronoun subject or direct object? → che; ' +
        '(2) does a preposition precede? → preposition + cui. Once learners have that, il quale ' +
        'is simply a formal swap. Personalize examples to music or film the learner already knows.',
    },

    // 2 ─ Chi as relative pronoun
    {
      slug: 'it-chi-relative',
      name: 'Chi as a relative pronoun ("the one who / whoever")',
      category: SkillCategory.grammar,
      level: CEFRLevel.upper_intermediate,
      description:
        'Chi used as a relative pronoun means "the one who", "whoever", or "those who". It ' +
        'always takes a singular verb, even when the meaning is plural: "Chi studia ottiene ' +
        'buoni risultati" (Those who study get good results). In the split construction chi…chi…, ' +
        'it means "some…others…". Do not confuse this with interrogative chi (who?), which asks ' +
        'a question.',
      prerequisiteSlugs: ['it-relative-pronouns'],
      examples: [
        {
          target: 'Chi dorme non piglia pesci.',
          native: 'The early bird catches the worm. (lit. Whoever sleeps catches no fish.)',
          note: 'classic Italian proverb — chi + singular verb non piglia',
        },
        {
          target: 'Chi ama la musica classica trova Cremona magica.',
          native: 'Anyone who loves classical music finds Cremona magical.',
          note: 'chi = whoever / anyone who; singular verb trova',
        },
        {
          target: 'Chi cantava, chi applaudiva: il teatro era in fermento.',
          native: 'Some were singing, others applauding: the theater was buzzing.',
          note: 'chi…chi… = some…others… — always singular verbs',
        },
        {
          target: 'Invita chi vuoi al concerto.',
          native: 'Invite whoever you like to the concert.',
          note: 'chi vuoi = whoever you want; chi is the object of invita',
        },
      ],
      commonMistakes: [
        'using a plural verb after chi: "chi sanno suonare" → chi sa suonare (singular)',
        'confusing relative chi with interrogative chi — "chi viene?" (who is coming?) is a question; "chi viene porta qualcosa" (whoever comes brings something) is relative',
        'writing "coloro che" when chi alone is natural and more idiomatic in spoken Italian',
        'forgetting the chi…chi… split construction and translating "some…others" as alcuni…altri (both are correct, but chi…chi… is more vivid)',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.multiple_choice,
        TaskType.error_correction,
      ],
      compatibleThemes: ['music', 'culture', 'film', 'history'],
      teachingNotes:
        'Anchor chi-relative to a memorable proverb (Chi dorme non piglia pesci) so learners ' +
        'have an immediate hook. Contrast with interrogative chi in a minimal pair ("Chi canta?" ' +
        'vs "Chi canta impara"). The chi…chi… split reads naturally in theater/concert descriptions.',
    },

    // 3 ─ Infinitive constructions
    {
      slug: 'it-infinitive-constructions',
      name: 'Infinitive constructions (verb + prep + infinitive)',
      category: SkillCategory.grammar,
      level: CEFRLevel.upper_intermediate,
      description:
        'Many Italian verbs connect to a following infinitive either directly (modal and motion ' +
        'verbs: voglio cantare, posso suonare), through a (imparare a, cominciare a, riuscire a), ' +
        'or through di (finire di, cercare di, decidere di, smettere di). The prepositions prima ' +
        'di and senza also take an infinitive. The infinitive itself can act as a noun with the ' +
        'masculine singular article: il cantare, nel sentire.',
      prerequisiteSlugs: ['it-modal-verbs'],
      examples: [
        {
          target: 'Voglio imparare a suonare il pianoforte.',
          native: 'I want to learn to play the piano.',
          note: 'volere + bare infinitive; imparare + a + infinitive',
        },
        {
          target: 'Riesce a cantare in tre lingue diverse.',
          native: 'She manages to sing in three different languages.',
          note: 'riuscire + a + infinitive — one of the most common a-verbs',
        },
        {
          target: 'Ho finito di provare la parte — possiamo andare a cena.',
          native: 'I’ve finished rehearsing the part — we can go to dinner.',
          note: 'finire + di + infinitive; andare + a + infinitive',
        },
        {
          target: 'Prima di salire sul palcoscenico, cerca di rilassarti.',
          native: 'Before going on stage, try to relax.',
          note: 'prima di + infinitive; cercare di + infinitive',
        },
        {
          target: 'Il cantare insieme rafforza il senso di comunità.',
          native: 'Singing together strengthens the sense of community.',
          note: 'il + infinitive used as a noun (il cantare = singing)',
        },
      ],
      commonMistakes: [
        'inserting di after modal verbs: "voglio di cantare" → voglio cantare (no preposition)',
        'using di instead of a with imparare, cominciare, riuscire: "imparare di suonare" → imparare a suonare',
        'using a instead of di with finire, cercare, decidere: "finire a suonare" → finire di suonare',
        'translating "without singing" as senza di cantare — senza takes the bare infinitive: senza cantare',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.error_correction,
        TaskType.translation,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['music', 'film', 'sports', 'culture'],
      teachingNotes:
        'Build three labeled columns — NO preposition / a / di — and populate them with the ' +
        'most common verbs in each. Riuscire a is high-frequency and must not be missed. ' +
        'Use the learner’s musical interests: "riesci a suonare la chitarra?", "hai smesso di ' +
        'prendere lezioni?".',
    },

    // 4 ─ Masculine nouns ending in -a
    {
      slug: 'it-nouns-adjectives-in-a',
      name: 'Masculine nouns ending in -a (il problema, il pianista)',
      category: SkillCategory.grammar,
      level: CEFRLevel.upper_intermediate,
      description:
        'A large group of Italian nouns end in -a but are grammatically masculine: il problema ' +
        '(i problemi), il programma (i programmi), il tema (i temi), il sistema (i sistemi), ' +
        'il clima (i climi). Most come from Greek. Nouns in -ista follow a different pattern: ' +
        'they are the same form for masculine and feminine in the singular (il pianista / la ' +
        'pianista) but take gendered plurals (i pianisti / le pianiste).',
      prerequisiteSlugs: ['it-noun-plurals'],
      examples: [
        {
          target: 'Il programma di stasera include tre sinfonie di Beethoven.',
          native: 'Tonight’s program includes three Beethoven symphonies.',
          note: 'il programma — masculine, Greek origin',
        },
        {
          target: 'I temi del concerto erano tutti legati alla natura.',
          native: 'The themes of the concert were all connected to nature.',
          note: 'i temi — masculine plural of il tema',
        },
        {
          target: 'Il pianista suonava con una tecnica perfetta.',
          native: 'The pianist played with perfect technique.',
          note: 'il pianista — -ista noun, masculine singular',
        },
        {
          target: 'Le pianiste di quell’accademia sono tutte bravissime.',
          native: 'The pianists (f.) from that academy are all excellent.',
          note: 'le pianiste — feminine plural of la pianista',
        },
      ],
      commonMistakes: [
        'treating -a ending as proof of feminine gender: "la problema" → il problema',
        'pluralizing Greek -ma nouns as -e instead of -i: "i programme" → i programmi',
        'making -ista nouns agree as feminine plural even when referring to men: "i pianiste" → i pianisti',
        'forgetting that adjectives must agree with the actual grammatical gender: "un problema grave" (m.), not "una problema grave"',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.fill_blank,
        TaskType.error_correction,
        TaskType.translation,
      ],
      compatibleThemes: ['music', 'culture', 'art', 'news'],
      teachingNotes:
        'The Greek -ma pattern (problema, programma, tema, sistema, clima, dramma, poema) is ' +
        'easiest to teach as a fixed list with the mnemonic "Greek roots, masculine rules." ' +
        'The -ista pair is best illustrated with a concrete contrast: "il/la chitarrista" in ' +
        'the singular vs "i chitarristi / le chitarriste" in the plural.',
    },

    // 5 ─ Vocabulary: music
    {
      slug: 'it-vocab-music',
      name: 'Music vocabulary (la musica)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.upper_intermediate,
      description:
        'The essential lexicon for talking about music: genres, performers, instruments, and ' +
        'the concert experience — from buying a ticket to giving a standing ovation.',
      prerequisiteSlugs: ['it-nouns-adjectives-in-a'],
      examples: [
        {
          target: 'La cantautrice ha scritto tutte le canzoni del suo album.',
          native: 'The singer-songwriter wrote all the songs on her album.',
          note: 'la cantautrice — feminine of il cantautore',
        },
        {
          target: 'L’orchestra ha eseguito il concerto senza direttore.',
          native: 'The orchestra performed the concert without a conductor.',
          note: 'eseguire (to perform/execute) is the precise verb for performing a piece',
        },
        {
          target: 'Quale genere musicale preferisci: il jazz, il rock o la musica classica?',
          native: 'What musical genre do you prefer: jazz, rock, or classical music?',
        },
      ],
      commonMistakes: [
        'using cantante when cantautore/cantautrice is more precise for a singer-songwriter',
        'confusing il concerto (the performance event) with il concerto (the musical form: a concerto for violin and orchestra) — context resolves it',
        'forgetting that orchestra takes the feminine article even though it ends in -a: l’orchestra (f.)',
        'calling all players musicisti without distinguishing by instrument: il violinista, il pianista, il chitarrista, il batterista',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.fill_blank,
        TaskType.speaking_prompt,
        TaskType.roleplay,
      ],
      compatibleThemes: ['music', 'culture', 'art', 'film'],
      teachingNotes:
        'Personalize from the first moment: ask what genre the learner listens to and build ' +
        'examples around real artists. Instruments are sticky when tied to a recognizable song ' +
        'or musician. The cantautore tradition is a great cultural hook — De André, Battisti, ' +
        'Dalla — beloved by older Italians and increasingly rediscovered by younger ones.',
    },

    // 6 ─ Vocabulary: theater
    {
      slug: 'it-vocab-theater',
      name: 'Theater vocabulary (il teatro)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.upper_intermediate,
      description:
        'Words for the stage: the venue, the roles on and offstage, the types of performance, ' +
        'and the vocabulary for reacting to what you have seen.',
      prerequisiteSlugs: ['it-vocab-music'],
      examples: [
        {
          target: 'Il regista ha messo in scena la commedia in modo originale.',
          native: 'The director staged the comedy in an original way.',
          note: 'mettere in scena = to stage/put on (a show)',
        },
        {
          target: 'Il pubblico ha applaudito a lungo dopo l’ultimo atto.',
          native: 'The audience applauded for a long time after the final act.',
          note: 'il pubblico is singular in Italian even though it refers to many people',
        },
        {
          target: 'L’attrice ha recitato la parte di Ofelia in modo straziante.',
          native: 'The actress played the role of Ophelia in a heartbreaking way.',
          note: 'recitare la parte / recitare il ruolo = to play the role',
        },
      ],
      commonMistakes: [
        'using un teatro for the art form ("I love theater") — the art form takes no article: amo il teatro; a specific venue takes it: il Teatro La Fenice',
        'confusing il regista (director) with l’attore (actor) — regista is behind the camera/off stage',
        'treating il pubblico as plural and writing "il pubblico erano entusiasti" — il pubblico takes a singular verb: era entusiasta',
        'omitting the reflexive in recitarsi — but recitare (transitive) is the correct verb: ha recitato bene, not "si è recitato bene"',
      ],
      recommendedPracticeTypes: [
        TaskType.roleplay,
        TaskType.fill_blank,
        TaskType.speaking_prompt,
        TaskType.multiple_choice,
      ],
      compatibleThemes: ['music', 'film', 'art', 'culture'],
      teachingNotes:
        'Theater and cinema vocabulary overlap significantly (il regista, la scena, il pubblico) — ' +
        'link to cap-08 film vocabulary the learner already knows. The mettere in scena ' +
        'construction is very high-frequency in cultural journalism and worth drilling separately.',
    },
  ],

  // ─── Lesson templates ─────────────────────────────────────────────────────
  lessonTemplates: [
    // Template 1 — Grammar: relative pronouns
    {
      slug: 'cap14-relative-pronouns-music',
      title: 'La canzone che amo, il teatro di cui parlo',
      lessonType: LessonType.grammar,
      level: CEFRLevel.upper_intermediate,
      summary:
        'Learn to join clauses with che and cui by describing a concert, a song, or an opera ' +
        'you have heard — then meet the formal il quale / la quale alternatives.',
      objectiveSkillSlugs: ['it-relative-pronouns'],
      defaultDurationMinutes: 12,
      compatibleThemes: ['music', 'film', 'art', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Che vs cui — the one decision',
          prompt:
            'Che is invariable and replaces the subject or direct object. Cui replaces anything ' +
            'else — it always follows a preposition. Test: does a preposition naturally come before ' +
            'the pronoun? If yes → cui; if no → che.',
          notes:
            'Show the contrast with one topic sentence: "Il cantante che mi piace" (no prep) vs ' +
            '"Il cantante di cui mi hai parlato" (prep di required). Anchor to the learner’s musical taste.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Choose che or cui',
          prompt:
            'Complete: "L’opera ___ ho visto a Verona era magnifica." / ' +
            '"Il violino con ___ suona è uno Stradivari."',
          exampleAnswer: 'che; cui',
          notes:
            'First: direct object of "ho visto" → che. Second: follows preposition con → cui. ' +
            'If the learner is not into opera, swap to a film or concert genre they mentioned.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Add the preposition before cui',
          prompt:
            'Complete: "Il festival ___ cui ti parlo si tiene a Sanremo ogni febbraio." / ' +
            '"La compositrice ___ cui ammiro di più ha scritto tre sinfonie."',
          exampleAnswer: 'di; che (no prep — direct object of ammiro)',
          notes:
            'Second item is a trap: "ammiro la compositrice" takes no preposition, so the answer is che, not cui.',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Fix the relative pronoun',
          prompt:
            'Find and fix: "Il pianista cui ho incontrato è di Cremona." / ' +
            '"La canzone di che parli è bellissima."',
          exampleAnswer:
            '"Il pianista che ho incontrato" (direct object → che, no prep); ' +
            '"la canzone di cui parli" (prep di → cui)',
        },
        {
          taskType: TaskType.translation,
          focus: 'Translate with il quale',
          prompt:
            'Translate using il quale / la quale: "The orchestra with which Pavarotti sang is still active."',
          exampleAnswer: 'L’orchestra con la quale Pavarotti cantava è ancora attiva.',
          notes:
            'Point out that la quale agrees with la orchestra (f.), not with Pavarotti. ' +
            'Con cui is equally correct — il quale is a style choice here.',
        },
        {
          taskType: TaskType.recap,
          focus: 'The one-question test',
          prompt: 'State the rule: when do you use che and when do you use cui?',
        },
      ],
    },

    // Template 2 — Grammar: infinitive constructions
    {
      slug: 'cap14-infinitive-constructions',
      title: 'Voglio imparare a suonare la chitarra',
      lessonType: LessonType.grammar,
      level: CEFRLevel.upper_intermediate,
      summary:
        'Sort the most common Italian verbs into their three connector categories — bare, a, and ' +
        'di — and practise chaining them in natural sentences about music and learning.',
      objectiveSkillSlugs: ['it-infinitive-constructions'],
      defaultDurationMinutes: 11,
      compatibleThemes: ['music', 'sports', 'culture', 'film'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Three lanes: no prep / a / di',
          prompt:
            'Modals (volere, potere, dovere, sapere) and a handful of others take no preposition. ' +
            'Many verbs of beginning, learning, or succeeding take a. Many verbs of ending, ' +
            'trying, or deciding take di. Two time-adverb phrases take the infinitive directly: ' +
            'prima di + infinitive, senza + infinitive.',
          notes:
            'Give the learner a pocket card with the most common verbs in each lane. ' +
            'Personalize with verbs relevant to music: imparare a, riuscire a, finire di, ' +
            'cercare di, smettere di, decidere di.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Insert the right connector',
          prompt:
            'Complete: "Ho cominciato ___ prendere lezioni di chitarra a sedici anni." / ' +
            '"Non riesco ___ suonare questo passaggio senza sbagliare." / ' +
            '"Ho deciso ___ iscrivermi al conservatorio."',
          exampleAnswer: 'a; a; di',
          notes: 'All three connectors in one set. Remind: riuscire ALWAYS takes a.',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Spot the wrong connector',
          prompt:
            'Fix: "Voglio di diventare cantautore." / "Ha finito a provare." / ' +
            '"Senza di cantare, la cerimonia sarebbe stata triste."',
          exampleAnswer:
            'Voglio diventare (modal = no prep); ha finito di provare (finire + di); ' +
            'senza cantare (senza + bare infinitive)',
        },
        {
          taskType: TaskType.translation,
          focus: 'Infinitive as a noun',
          prompt:
            'Translate: "Singing is one of the most direct ways to connect with others." ' +
            'Use il + infinitive.',
          exampleAnswer:
            'Il cantare è uno dei modi più diretti per entrare in contatto con gli altri.',
          notes:
            'Accept also "cantare è…" (bare infinitive as noun is also grammatical in Italian). ' +
            'But il cantare is the target structure here.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Your musical journey',
          prompt:
            'Tell Wise about a musical activity you have started, tried, or given up — ' +
            'using at least one verb from each connector group (no prep, a, di).',
          notes:
            'Pull from the learner’s interests. A non-musician might talk about playlists, concerts attended, or ' +
            'singing in the shower. All valid contexts for the grammar.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Lane check',
          prompt:
            'For each verb, state which connector it takes: volere, imparare, cercare, riuscire, finire, smettere.',
          exampleAnswer:
            'volere: none; imparare: a; cercare: di; riuscire: a; finire: di; smettere: di',
        },
      ],
    },

    // Template 3 — Scenario: buy concert / theater tickets
    {
      slug: 'cap14-buy-tickets',
      title: 'Due biglietti per questa sera',
      lessonType: LessonType.scenario_roleplay,
      level: CEFRLevel.upper_intermediate,
      summary:
        'Navigate a real ticket-office exchange: ask about available seats, inquire about the ' +
        'performance, and discuss what you have just seen when you come out of the theater.',
      objectiveSkillSlugs: ['it-vocab-theater', 'it-vocab-music', 'it-relative-pronouns'],
      defaultDurationMinutes: 13,
      compatibleThemes: ['music', 'culture', 'art', 'travel'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Setting — la biglietteria',
          prompt:
            'You’re at the box office of a Ligurian theater in Genova. Tonight’s program includes a one-act opera by a young cantautore and a string quartet. ' +
            'You want two seats not too far from the stage. Let’s rehearse.',
          notes:
            'Localize to the learner’s interests: if they prefer jazz or rock, swap the venue to a jazz club in ' +
            'Genova’s old port (il porto antico). Keep the vocabulary the same.',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'At the ticket office',
          prompt:
            'Ask for two tickets, find out where the seats are, check the start time, ' +
            'and ask who is performing tonight.',
          exampleAnswer:
            'Buonasera. Avete ancora biglietti per lo spettacolo di stasera? Vorrei due posti ' +
            'vicino al palcoscenico. A che ora comincia? Chi suona stasera?',
          notes:
            'Wise plays the bigliettaio/a. Reward use of teatro vocabulary and correct questions. ' +
            'If the learner uses a relative pronoun naturally (e.g. "il compositore di cui mi avete ' +
            'parlato") give positive reinforcement.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Reading the program',
          prompt:
            'Complete the program note with the right relative pronoun: ' +
            '"Il quartetto ___ si esibisce stasera è tra i più premiati d’Italia. ' +
            'Il compositore ___ opera viene rappresentata è nato a Genova nel 1985."',
          exampleAnswer: 'che; la cui',
          notes:
            'La cui = the genitive relative (whose) — preview it here as a recognition item. ' +
            'If too advanced, accept "di cui" with a rephrased sentence.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'After the show',
          prompt:
            'Coming out of the theater, tell Wise three things about the performance: ' +
            'what you liked, what you found difficult to follow, and whether you’d recommend it.',
          notes:
            'Target structures: relative pronouns (la scena che mi ha colpito di più…), ' +
            'infinitive constructions (ho cercato di capire le parole…). No single correct answer.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Useful phrases from the box office',
          prompt:
            'Which three phrases from this lesson would you keep for your next theater visit in Italy?',
        },
      ],
    },

    // Template 4 — Vocabulary review: instruments and genres
    {
      slug: 'cap14-instruments-genres',
      title: 'Gli strumenti e i generi musicali',
      lessonType: LessonType.vocabulary_review,
      level: CEFRLevel.upper_intermediate,
      summary:
        'Systematically cover orchestral and popular instruments, musical genres, and the ' +
        'vocabulary for discussing what you play or listen to — including the tricky -ista nouns.',
      objectiveSkillSlugs: ['it-vocab-music', 'it-nouns-adjectives-in-a'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['music', 'culture', 'art'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'From Cremona to Sanremo',
          prompt:
            'Italian music spans centuries: the violins of Stradivari, the operas of Verdi, ' +
            'the cantautori of the 1970s, and the pop acts of Sanremo. Today we build the ' +
            'vocabulary to talk about all of it — and watch out for those -ista nouns.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Masculine -a nouns with instruments',
          prompt:
            'Choose the correct form: "Il (pianista / pianisto) ha eseguito la sonata." / ' +
            '"Le (pianiste / pianisti) dell’accademia si sono esibite ieri."',
          exampleAnswer: 'il pianista; le pianiste',
          notes:
            'First item: masculine singular → il pianista. Second: feminine plural → le pianiste. ' +
            'Emphasize that the article and adjective are the gender signals, not the noun ending.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Name the instrument',
          prompt:
            'Which instrument is described? "È fatto di legno, ha quattro corde e si suona con ' +
            'l’archetto." / "Ha 88 tasti bianchi e neri." / "Produce il ritmo — si suona con le bacchette."',
          exampleAnswer: 'il violino; il pianoforte; la batteria',
          notes:
            'If the learner plays an instrument, add a personalized description of that instrument ' +
            'as a bonus question.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Your musical world',
          prompt:
            'Describe your musical taste to Wise: which genres do you like, which instruments ' +
            'do you find most interesting, and is there an Italian artist you’ve discovered?',
          notes:
            'No grammar target for this item — free production to consolidate vocabulary. ' +
            'Wise should respond with a related Italian artist recommendation if the learner’s genre is known.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Vocabulary consolidation',
          prompt:
            'Give the Italian for: a singer-songwriter, an orchestra, a string quartet, ' +
            'the audience, a genre, and the conductor.',
          exampleAnswer:
            'un/una cantautore/cantautrice; un’orchestra; un quartetto d’archi; il pubblico; un genere; il/la direttore/direttrice d’orchestra',
        },
      ],
    },

    // Template 5 — Chi proverb / mini-lesson
    {
      slug: 'cap14-chi-proverbs',
      title: 'Chi tace acconsente — chi and Italian proverbs',
      lessonType: LessonType.grammar,
      level: CEFRLevel.upper_intermediate,
      summary:
        'Unlock the relative chi through proverbs and real sentences, distinguish it from ' +
        'interrogative chi, and practise the chi…chi… split construction in the context of ' +
        'concert audiences and musical taste.',
      objectiveSkillSlugs: ['it-chi-relative', 'it-relative-pronouns'],
      defaultDurationMinutes: 9,
      compatibleThemes: ['music', 'culture', 'history'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Two lives of chi',
          prompt:
            'Chi as an interrogative asks a question: "Chi ha composto questa sinfonia?" ' +
            'Chi as a relative pronoun means "whoever / the one who / those who" and takes a ' +
            'singular verb even when the sense is plural: "Chi apprezza la musica classica ' +
            'troverà Cremona affascinante."',
          notes:
            'Show the minimal pair side by side. The singular-verb rule is the key teaching point.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Interrogative or relative?',
          prompt:
            'Classify each chi: (a) "Chi ha vinto il Festival di Sanremo quest’anno?" ' +
            '(b) "Chi ama la musica trova sempre un modo per ascoltarla." ' +
            '(c) "Non so chi abbia scritto questo testo."',
          exampleAnswer: '(a) interrogative; (b) relative; (c) interrogative (indirect question)',
          notes:
            '(c) is an indirect interrogative — useful to note but do not drill at length here.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Chi…chi… split construction',
          prompt:
            'Complete with the chi…chi… pattern: "Dopo il concerto, ___ cercava il biglietto ' +
            'dell’autografo, ___ si affrettava verso l’uscita."',
          exampleAnswer: 'chi; chi',
          notes:
            'Both verbs stay singular (cercava, si affrettava). ' +
            'This is a lively construction in Italian journalistic and narrative prose.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Proverb into English, then into Italian',
          prompt:
            'Translate into natural English: "Chi non risica non rosica." ' +
            'Then create your own sentence using chi to describe music lovers.',
          exampleAnswer:
            'Nothing ventured, nothing gained. (lit. Whoever doesn’t risk doesn’t nibble.) ' +
            'Example: Chi ascolta musica ogni giorno vive più serenamente.',
          notes:
            'The proverb is a classic; the free sentence lets learners apply chi creatively. ' +
            'Reward singular verb agreement.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Chi rule in one sentence',
          prompt:
            'Explain the grammatical rule: what does relative chi mean and why does it always ' +
            'take a singular verb?',
        },
      ],
    },
  ],

  // ─── Thematic vocabulary bank ─────────────────────────────────────────────
  vocabulary: [
    // La musica
    {
      slug: 'cap14-la-musica',
      targetText: 'la musica',
      nativeText: 'music',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-musica',
      exampleSentence: 'La musica italiana è apprezzata in tutto il mondo.',
      exampleTranslation: 'Italian music is appreciated all over the world.',
    },
    {
      slug: 'cap14-la-canzone',
      targetText: 'la canzone',
      nativeText: 'the song',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-musica',
      exampleSentence: 'Conosci quella canzone che hanno suonato a Sanremo?',
      exampleTranslation: 'Do you know that song they played at Sanremo?',
    },
    {
      slug: 'cap14-il-cantante',
      targetText: 'il/la cantante',
      nativeText: 'the singer (m./f.)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-musica',
    },
    {
      slug: 'cap14-il-cantautore',
      targetText: 'il cantautore / la cantautrice',
      nativeText: 'the singer-songwriter (m./f.)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-musica',
      exampleSentence: 'Fabrizio De André è il cantautore genovese più amato di tutti i tempi.',
      exampleTranslation:
        'Fabrizio De André is the most beloved Genoese singer-songwriter of all time.',
    },
    {
      slug: 'cap14-il-concerto',
      targetText: 'il concerto',
      nativeText: 'the concert; also: the concerto (musical form)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-musica',
      exampleSentence: 'Il concerto per violino di Mendelssohn è uno dei più eseguiti al mondo.',
      exampleTranslation:
        'Mendelssohn’s violin concerto is one of the most performed in the world.',
    },
    {
      slug: 'cap14-lorchestra',
      targetText: 'l’orchestra',
      nativeText: 'the orchestra (f.)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-musica',
    },
    {
      slug: 'cap14-lopera',
      targetText: 'l’opera',
      nativeText: 'the opera; also: the work (of art)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-musica',
      exampleSentence: 'La Traviata è l’opera di Verdi che preferisco.',
      exampleTranslation: 'La Traviata is the Verdi opera I like best.',
    },
    {
      slug: 'cap14-il-coro',
      targetText: 'il coro',
      nativeText: 'the choir; the chorus',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-musica',
    },
    {
      slug: 'cap14-il-genere',
      targetText: 'il genere',
      nativeText: 'the genre',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-musica',
      exampleSentence: 'Che genere di musica ti piace di più?',
      exampleTranslation: 'What genre of music do you like most?',
    },
    {
      slug: 'cap14-il-compositore',
      targetText: 'il compositore / la compositrice',
      nativeText: 'the composer (m./f.)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-musica',
      exampleSentence: 'Verdi è il compositore italiano più eseguito nelle sale da concerto.',
      exampleTranslation: 'Verdi is the most performed Italian composer in concert halls.',
    },
    // Gli strumenti
    {
      slug: 'cap14-il-violino',
      targetText: 'il violino',
      nativeText: 'the violin',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'gli-strumenti',
      exampleSentence: 'Gli Stradivari sono i violini più preziosi del mondo.',
      exampleTranslation: 'Stradivari instruments are the most precious violins in the world.',
    },
    {
      slug: 'cap14-il-pianoforte',
      targetText: 'il pianoforte',
      nativeText: 'the piano',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'gli-strumenti',
      exampleSentence: 'Ha cominciato a studiare il pianoforte all’età di sei anni.',
      exampleTranslation: 'She started studying the piano at the age of six.',
    },
    {
      slug: 'cap14-la-chitarra',
      targetText: 'la chitarra',
      nativeText: 'the guitar',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'gli-strumenti',
    },
    {
      slug: 'cap14-il-flauto',
      targetText: 'il flauto',
      nativeText: 'the flute',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'gli-strumenti',
    },
    {
      slug: 'cap14-la-batteria',
      targetText: 'la batteria',
      nativeText: 'the drum kit / drums',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'gli-strumenti',
      exampleSentence: 'Il batterista è chi tiene il ritmo dell’intera band.',
      exampleTranslation: 'The drummer is the one who keeps the rhythm of the whole band.',
    },
    {
      slug: 'cap14-il-pianista',
      targetText: 'il pianista / la pianista',
      nativeText: 'the pianist (m./f. — same singular form)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'gli-strumenti',
      exampleSentence: 'I pianisti di quel conservatorio vincono spesso concorsi internazionali.',
      exampleTranslation:
        'The pianists from that conservatory often win international competitions.',
    },
    // Il teatro
    {
      slug: 'cap14-il-teatro',
      targetText: 'il teatro',
      nativeText: 'the theater; theater (the art form)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-teatro',
      exampleSentence: 'Il teatro La Scala è il simbolo dell’opera italiana nel mondo.',
      exampleTranslation: 'La Scala theater is the symbol of Italian opera in the world.',
    },
    {
      slug: 'cap14-lo-spettacolo',
      targetText: 'lo spettacolo',
      nativeText: 'the show / performance / spectacle',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-teatro',
      exampleSentence: 'Lo spettacolo comincia alle venti e trenta — non fare tardi!',
      exampleTranslation: 'The show starts at 8:30 pm — don’t be late!',
    },
    {
      slug: 'cap14-la-commedia',
      targetText: 'la commedia',
      nativeText: 'the comedy; the play',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'il-teatro',
    },
    {
      slug: 'cap14-la-tragedia',
      targetText: 'la tragedia',
      nativeText: 'the tragedy',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'il-teatro',
    },
    {
      slug: 'cap14-lattore',
      targetText: 'l’attore / l’attrice',
      nativeText: 'the actor / the actress',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-teatro',
    },
    {
      slug: 'cap14-il-regista',
      targetText: 'il/la regista',
      nativeText: 'the director (theater or film; same form m./f. singular)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-teatro',
      exampleSentence: 'Il regista che ha messo in scena questa commedia è molto innovativo.',
      exampleTranslation: 'The director who staged this comedy is very innovative.',
    },
    {
      slug: 'cap14-il-palcoscenico',
      targetText: 'il palcoscenico',
      nativeText: 'the stage',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-teatro',
      exampleSentence: 'Prima di salire sul palcoscenico, il tenore ha fatto un respiro profondo.',
      exampleTranslation: 'Before going on stage, the tenor took a deep breath.',
    },
    {
      slug: 'cap14-il-pubblico',
      targetText: 'il pubblico',
      nativeText: 'the audience (singular collective noun)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-teatro',
      exampleSentence: 'Il pubblico era in piedi ad applaudire alla fine dello spettacolo.',
      exampleTranslation: 'The audience was on its feet applauding at the end of the show.',
    },
    {
      slug: 'cap14-lapplauso',
      targetText: 'l’applauso (pl. gli applausi)',
      nativeText: 'the applause / round of applause',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-teatro',
    },
    {
      slug: 'cap14-la-scena',
      targetText: 'la scena',
      nativeText: 'the scene; the stage area',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'il-teatro',
    },
    {
      slug: 'cap14-recitare',
      targetText: 'recitare',
      nativeText: 'to act; to perform; to recite',
      partOfSpeech: 'verb',
      theme: 'il-teatro',
      exampleSentence: 'Recita la parte di Amleto in italiano e in inglese.',
      exampleTranslation: 'He plays the role of Hamlet in Italian and in English.',
    },
    {
      slug: 'cap14-mettere-in-scena',
      targetText: 'mettere in scena',
      nativeText: 'to stage / to put on (a production)',
      partOfSpeech: 'phrase',
      theme: 'il-teatro',
      exampleSentence:
        'La regista ha deciso di mettere in scena una versione moderna della tragedia.',
      exampleTranslation: 'The director decided to stage a modern version of the tragedy.',
    },
  ],
};

export default unit;
