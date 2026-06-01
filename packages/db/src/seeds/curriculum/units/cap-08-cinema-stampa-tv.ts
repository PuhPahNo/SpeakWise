// Capitolo 8 — Cinema, stampa e TV
// Theme: film / media. The imperfect tense, the imperfect vs. passato
// prossimo contrast, the trapassato prossimo, Italian noun suffixes, and
// the vocabulary of press, cinema, and television.
//
// All content original (copyright-safe).

import { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client';
import type { SeedUnit } from '../types';

const unit: SeedUnit = {
  code: 'cap-08',
  order: 8,
  title: 'Cinema, stampa e TV',
  subtitle: 'The past as backdrop — imperfetto and the media',
  theme: 'film',
  level: CEFRLevel.lower_intermediate,
  summary:
    'Step into the world of Italian film, television, and the press. You’ll learn to paint ' +
    'the past in two colours: the imperfetto for background, habit, and ongoing states, and the ' +
    'passato prossimo for the events that punctuate that backdrop. A third layer — the trapassato ' +
    'prossimo — lets you say what had already happened before something else. Along the way you ' +
    'pick up the media vocabulary to talk about the films and shows you love, and discover the ' +
    'art of Italian suffixes that let one root word express a whole range of nuance.',
  canDo: [
    'Describe how things used to be — routines, feelings, ages, and scenes from the past',
    'Narrate a past story that mixes background (imperfetto) and completed events (passato prossimo)',
    'Use mentre + imperfetto to frame an interruption',
    'Express that one action had already finished before another past action (trapassato prossimo)',
    'Talk about films, TV shows, and the news you follow',
    'Use diminutive, augmentative, and pejorative suffixes to add nuance to nouns',
  ],
  culturalNotes: [
    {
      title: 'Il doppiaggio — Italy’s art of dubbing',
      body:
        'Italy has one of the most sophisticated dubbing industries in the world. Since the 1930s, ' +
        'nearly all foreign films and series have been dubbed into Italian rather than shown with ' +
        'subtitles — a tradition that shaped the nation’s ear for performance and made Italian ' +
        'cinema-going a fully immersive experience in the national language. The voice actors ' +
        '(i doppiatori) are celebrated artists in their own right, and devoted audiences can ' +
        'recognise them as readily as the on-screen stars. This means that Italian learners who ' +
        'watch dubbed content are exposed to clear, careful Italian — a genuine listening resource.',
    },
    {
      title: 'RAI e il canone — the licence fee and public television',
      body:
        'RAI (Radiotelevisione Italiana) is the national public broadcaster, running three TV ' +
        'channels (RAI 1, RAI 2, RAI 3) and multiple radio stations. Its funding comes partly from ' +
        'il canone RAI, an annual licence fee that Italian households pay alongside their electricity ' +
        'bill — a system that has generated lively debate. RAI 3, historically tied to regional and ' +
        'cultural programming, is especially valued for documentary and arts content. The private ' +
        'Mediaset group (founded by Silvio Berlusconi) operates the main commercial networks — ' +
        'Canale 5, Italia 1, and Rete 4 — giving Italy a distinctly polarised broadcast landscape.',
    },
    {
      title: 'Il Veneto — cinema, press, and regional pride',
      body:
        'The Veneto region, whose capital is Venice (Venezia), is home to the world’s oldest ' +
        'film festival: la Mostra Internazionale d’Arte Cinematografica di Venezia, held annually ' +
        'on the Lido since 1932. The Golden Lion (il Leone d’Oro) is one of cinema’s most ' +
        'prestigious prizes. The region also has a strong newspaper tradition: Il Gazzettino, founded ' +
        'in Venice in 1887, remains one of the most-read regional dailies in Italy. When Venetians ' +
        'discuss film or news, they blend standard Italian with traces of the Venetian dialect — ' +
        'a reminder that language and culture are always locally inflected.',
    },
  ],

  // ─── Skills ───────────────────────────────────────────────────────────────
  skills: [
    {
      slug: 'it-imperfetto',
      name: 'Imperfetto (the imperfect tense)',
      category: SkillCategory.grammar,
      level: CEFRLevel.lower_intermediate,
      description:
        'The imperfetto describes past states, ongoing or habitual actions, and the background of a ' +
        'story. Regular stems come from the infinitive minus -re: parl- (parlare), scrivev- (scrivere), ' +
        'dormiv- (dormire). Endings: -avo/-avi/-ava/-avamo/-avate/-avano (-are); -evo…(-ere); ' +
        '-ivo…(-ire). Key irregulars: essere → ero, eri, era, eravamo, eravate, erano; ' +
        'fare → facevo…; dire → dicevo…; bere → bevevo….',
      prerequisiteSlugs: ['it-regular-are-verbs-present'],
      examples: [
        {
          target: 'Da bambino guardavo la TV ogni sera.',
          native: 'As a child I watched TV every evening.',
          note: 'habitual action in the past — used to',
        },
        {
          target: 'Il cielo era nuvoloso e faceva freddo.',
          native: 'The sky was cloudy and it was cold.',
          note: 'past description / weather — essere and fare irregular',
        },
        {
          target: 'Quando avevo dieci anni, leggevo molti fumetti.',
          native: 'When I was ten, I used to read lots of comics.',
          note: 'age in the past always uses avere + imperfetto',
        },
        {
          target: 'Diceva sempre le stesse cose.',
          native: 'He always used to say the same things.',
          note: 'dire → dicevo (irregular stem)',
        },
      ],
      commonMistakes: [
        'using passato prossimo for habitual past actions ("ho guardato la TV ogni sera" instead of "guardavo")',
        'forming the -are stem incorrectly by keeping -re (parlrevo instead of parlavo)',
        'treating essere as regular — always use ero/eri/era, never "essevo"',
        'forgetting the accent shift: eràvamo, eravàte are stressed on different syllables than the regular pattern',
      ],
      recommendedPracticeTypes: [
        TaskType.conjugation,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.tense_selection,
      ],
      compatibleThemes: ['film', 'family', 'history', 'culture'],
      teachingNotes:
        'Anchor the imperfetto to three clear use cases: (1) habitual — "used to / would always"; ' +
        '(2) ongoing state or description — "was/were"; (3) age, time, and weather in the past. ' +
        'Teach irregular stems as a short list and contrast ero/era with the regular pattern immediately. ' +
        'Personalize examples to the learner’s childhood TV, films, or reading habits.',
    },
    {
      slug: 'it-imperfetto-vs-passato-prossimo',
      name: 'Imperfetto vs passato prossimo — choosing the right past tense',
      category: SkillCategory.grammar,
      level: CEFRLevel.lower_intermediate,
      description:
        'The two main past tenses serve different roles. Imperfetto is the canvas: background, ' +
        'ongoing states, habits, and descriptions. Passato prossimo is the brushstroke: a completed, ' +
        'single, or sequenced event. The conjunction mentre (while) + imperfetto sets the scene for ' +
        'an interrupting passato prossimo: "Mentre guardavo il film, è arrivato Marco."',
      prerequisiteSlugs: ['it-imperfetto', 'it-passato-prossimo-avere'],
      examples: [
        {
          target: 'Leggevo il giornale quando ha squillato il telefono.',
          native: 'I was reading the newspaper when the phone rang.',
          note: 'imperfetto = ongoing background; passato prossimo = the interrupting event',
        },
        {
          target: 'Mentre guardavo la serie, mi sono addormentato/a.',
          native: 'While I was watching the series, I fell asleep.',
          note: 'mentre always pairs with the imperfetto for the ongoing action',
        },
        {
          target: 'Da giovane mia nonna abitava a Venezia; poi si è trasferita a Milano.',
          native: 'When young, my grandmother lived in Venice; then she moved to Milan.',
          note: 'abitava = ongoing state; si è trasferita = completed event that changed things',
        },
        {
          target: 'Ieri ho visto un film bellissimo.',
          native: 'Yesterday I saw a great film.',
          note: 'specific completed action — passato prossimo, not imperfetto',
        },
      ],
      commonMistakes: [
        'using passato prossimo for all past actions, including habits and descriptions ("ho abitato" instead of "abitavo")',
        'using imperfetto for completed one-off events ("andavo al cinema ieri" instead of "sono andato/a al cinema ieri")',
        'forgetting that mentre always introduces the imperfetto clause, not the passato prossimo',
        'mixing the two randomly in a narrative without asking: background or completed event?',
      ],
      recommendedPracticeTypes: [
        TaskType.tense_selection,
        TaskType.fill_blank,
        TaskType.error_correction,
        TaskType.translation,
      ],
      compatibleThemes: ['film', 'history', 'family', 'news'],
      teachingNotes:
        'The "film-score" metaphor works well: imperfetto is the music playing in the background; ' +
        'passato prossimo is each plot event. Run the mentre-interruption pattern as a mini-drill: ' +
        'give learners the background and ask them to add a surprise event, or vice versa. ' +
        'Personalize with real films or TV scenes the learner knows.',
    },
    {
      slug: 'it-trapassato',
      name: 'Trapassato prossimo (the past perfect)',
      category: SkillCategory.grammar,
      level: CEFRLevel.lower_intermediate,
      description:
        'The trapassato prossimo ("had done") is formed with the imperfetto of avere or essere plus ' +
        'the past participle: avevo già mangiato (I had already eaten); erano partiti (they had left). ' +
        'It describes an action completed before another action in the past. The same essere/avere ' +
        'choice and agreement rules as the passato prossimo apply.',
      prerequisiteSlugs: ['it-imperfetto', 'it-passato-prossimo-essere'],
      examples: [
        {
          target: 'Quando sono arrivato, il film era già cominciato.',
          native: 'When I arrived, the film had already started.',
          note: 'era cominciato = trapassato — it finished before the arrival',
        },
        {
          target: 'Non ho visto quella serie perché l’avevo già vista.',
          native: 'I didn’t watch that series because I had already seen it.',
          note: 'avevo vista — agreement with la serie (direct object pronoun l’)',
        },
        {
          target: 'I giornalisti erano partiti prima che iniziasse la conferenza.',
          native: 'The journalists had left before the press conference began.',
          note: 'essere verb — erano partiti, agreement with i giornalisti (m. pl.)',
        },
      ],
      commonMistakes: [
        'forming it with the present of avere/essere instead of the imperfetto (ho mangiato → avevo mangiato)',
        'forgetting agreement for essere verbs (erano partito → erano partiti)',
        'using trapassato when only one past action is involved — trapassato needs a second past reference point',
        'confusing avevo visto (trapassato) with ho visto (passato prossimo)',
      ],
      recommendedPracticeTypes: [
        TaskType.conjugation,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.tense_selection,
      ],
      compatibleThemes: ['film', 'history', 'news', 'culture'],
      teachingNotes:
        'Introduce the trapassato as the "flashback tense" — it pushes an event further back in the ' +
        'timeline than the passato prossimo. The già (already) trigger is the quickest teaching hook. ' +
        'Keep the focus on the most common pattern (avere-based) first; bring in essere verbs once the ' +
        'formula is solid. Film plot summaries are ideal practise material.',
    },
    {
      slug: 'it-suffixes',
      name: 'Noun and adjective suffixes (alterati)',
      category: SkillCategory.grammar,
      level: CEFRLevel.lower_intermediate,
      description:
        'Italian adds suffixes directly to a root word (dropping the final vowel) to change its size ' +
        'or emotional colour. Diminutives -ino/-etto (small, cute): giornale → giornalino, ' +
        'casa → casetta. Augmentative -one (big, impressive): libro → librone, notizia → notiziOne ' +
        '(note: feminine base → masculine result). Pejorative -accio/-accia (ugly, bad): ' +
        'parola → parolaccia, tempo → tempaccio. The resulting word is a new noun, not just a modifier.',
      prerequisiteSlugs: ['it-noun-gender'],
      examples: [
        {
          target: 'Quel giornalino fa ridere — è pieno di fumetti.',
          native: 'That little paper is funny — it’s full of comics.',
          note: 'giornale + -ino = small/playful newspaper (diminutive)',
        },
        {
          target: 'Ho comprato un librone di cinema: pesa due chili!',
          native: 'I bought a huge cinema book — it weighs two kilos!',
          note: 'libro + -one = big, imposing book (augmentative)',
        },
        {
          target: 'Che tempaccio! Non esco di casa.',
          native: 'What terrible weather! I’m not going out.',
          note: 'tempo + -accio = awful weather (pejorative)',
        },
        {
          target: 'Non dire parolacce in TV!',
          native: 'Don’t use swear words on TV!',
          note: 'parola + -accia = bad word (pejorative, f.)',
        },
      ],
      commonMistakes: [
        'applying suffixes without dropping the final vowel (casaino → casina, not casaino)',
        'forgetting the gender shift with -one: la notizia → il notiziOne (augmentative is always masculine)',
        'treating suffixed forms as independent dictionary words — they share the root’s meaning',
        'over-using pejorative -accio to mean simply "small" — it implies ugliness or quality, not just size',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.fill_blank,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['film', 'news', 'family', 'culture'],
      teachingNotes:
        'Treat suffixes as a creative tool, not a grammar rule to memorize exhaustively. Drill the ' +
        'three main types with media vocabulary (giornalino, telefonino, giornalaccio) so context ' +
        'reinforces meaning. Highlight the -one gender trap once, clearly. Encourage learners to ' +
        'invent new words with suffixes — it builds confidence and is often correct.',
    },
    {
      slug: 'it-vocab-media',
      name: 'The press and media (la stampa e i media)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.lower_intermediate,
      description:
        'The words for newspapers, magazines, news, and the people and systems behind them: ' +
        'il giornale, la rivista, le notizie, l’articolo, il titolo, il telegiornale, la pubblicità, ' +
        'il/la giornalista, l’abbonamento, la stampa.',
      prerequisiteSlugs: ['it-noun-gender', 'it-definite-articles'],
      examples: [
        {
          target: 'Ho letto un articolo interessante sul giornale di stamattina.',
          native: 'I read an interesting article in this morning’s newspaper.',
        },
        {
          target: 'Il telegiornale delle venti è il più visto in Italia.',
          native: 'The 8 pm news bulletin is the most watched in Italy.',
        },
        {
          target: 'Ho un abbonamento digitale a due riviste di cinema.',
          native: 'I have a digital subscription to two cinema magazines.',
        },
      ],
      commonMistakes: [
        'confusing il giornale (newspaper) with il giornalista (journalist)',
        'using la news as if it were Italian — the correct term is la notizia (pl. le notizie)',
        'saying "la pubblicazione" when "la pubblicità" is the correct word for advertising',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.fill_blank,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['news', 'politics', 'film', 'culture'],
      teachingNotes:
        'Anchor each term to a real Italian outlet the learner might encounter: la Repubblica or ' +
        'Il Corriere della Sera for giornale, Internazionale for rivista, TG1 for telegiornale. ' +
        'The abbonamento item is high-value for real-life use (streaming, digital press). ' +
        'Personalize to the learner’s actual media diet.',
    },
    {
      slug: 'it-vocab-cinema-tv',
      name: 'Cinema and television vocabulary',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.lower_intermediate,
      description:
        'The essential words for talking about film, TV, and radio: il film, il cinema, la televisione, ' +
        'la TV, la radio, il canale, il programma, l’attore/l’attrice, il/la regista, lo schermo, ' +
        'il telecomando, il documentario, la serie, i sottotitoli.',
      prerequisiteSlugs: ['it-noun-gender', 'it-definite-articles'],
      examples: [
        {
          target: 'Hai visto l’ultimo film del regista veneziano?',
          native: 'Have you seen the Venetian director’s latest film?',
        },
        {
          target: 'Cambio canale — non sopporto questa pubblicità.',
          native: 'I’m changing channel — I can’t stand this advert.',
          note: 'il telecomando is the device; cambiare canale is the action',
        },
        {
          target: 'Guardo i documentari con i sottotitoli per migliorare l’italiano.',
          native: 'I watch documentaries with subtitles to improve my Italian.',
        },
      ],
      commonMistakes: [
        'using l’attore for a female actor — the correct form is l’attrice',
        'confusing il programma (a TV programme) with il canale (the channel it airs on)',
        'saying "la serie" is plural — it is actually invariable (una serie, due serie — the form does not change)',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.roleplay,
        TaskType.speaking_prompt,
        TaskType.fill_blank,
      ],
      compatibleThemes: ['film', 'culture', 'news', 'art'],
      teachingNotes:
        'Use the learner’s actual favourite films, series, or directors as anchors. The regista ' +
        '(director) item pairs beautifully with the la Mostra di Venezia cultural note. Encourage ' +
        'learners to describe a scene using imperfetto + passato prossimo alongside this vocabulary ' +
        'to connect grammar and lexis.',
    },
  ],

  // ─── Lesson templates ─────────────────────────────────────────────────────
  lessonTemplates: [
    {
      slug: 'cap08-how-things-used-to-be',
      title: 'Come eravamo — how things used to be',
      lessonType: LessonType.grammar,
      level: CEFRLevel.lower_intermediate,
      summary:
        'Build the imperfetto from scratch and use it to describe your childhood media habits — ' +
        'what you watched, read, and listened to when you were younger.',
      objectiveSkillSlugs: ['it-imperfetto'],
      defaultDurationMinutes: 12,
      compatibleThemes: ['film', 'family', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'The imperfetto formula and its three main jobs',
          prompt:
            'The imperfetto has one stem (infinitive − re) and two sets of endings. ' +
            'It covers three jobs: habitual past ("used to"), ongoing state, and descriptions. ' +
            'Let’s build the paradigm for guardare, vedere, and dormire together.',
          notes:
            'Show the three parallel columns. Flag the irregular stems essere/fare/dire/bere immediately — ' +
            'they are too common to defer. If the learner has named a favourite childhood show, use that verb in the drill.',
        },
        {
          taskType: TaskType.conjugation,
          focus: 'Conjugate in all three conjugation classes',
          prompt: 'Give the imperfetto (io/lui/noi) for: guardare, leggere, dormire.',
          exampleAnswer:
            'guardavo/guardava/guardavamo — leggevo/leggeva/leggevamo — dormivo/dormiva/dormivamo',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Irregular imperfetto: essere, fare, dire',
          prompt:
            'Complete: "Da ragazzo (io) ___ (essere) sempre davanti alla TV; mia sorella ___ (fare) i ' +
            'compiti e mio padre ___ (leggere) il giornale."',
          exampleAnswer: 'ero … faceva … leggeva',
          notes: 'essere irregular — ero, not essevo. fare — faceva, not farava.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Habitual past in context',
          prompt: 'Translate: "When I was young I used to watch cartoons every Saturday morning."',
          exampleAnswer: 'Quando ero piccolo/a guardavo i cartoni animati ogni sabato mattina.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Your own past media habits',
          prompt: 'Describe two or three things you used to watch, read, or listen to as a child.',
          notes:
            'Personalize to the learner’s actual background. Accept approximate Italian and focus ' +
            'feedback on correct imperfetto endings and the irregular stems.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Three jobs, one tense',
          prompt: 'Give one example of the imperfetto for each of its three main uses.',
        },
      ],
    },
    {
      slug: 'cap08-story-with-interruption',
      title: 'Mentre guardavo il film… — a story with an interruption',
      lessonType: LessonType.grammar,
      level: CEFRLevel.lower_intermediate,
      summary:
        'Master the imperfetto-vs-passato-prossimo contrast by narrating a story where ongoing ' +
        'background action meets a sudden event — the classic film-night interruption.',
      objectiveSkillSlugs: ['it-imperfetto-vs-passato-prossimo', 'it-imperfetto'],
      defaultDurationMinutes: 14,
      compatibleThemes: ['film', 'family', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Canvas and brushstroke — the two-past system',
          prompt:
            'Imperfetto is the canvas: background, habit, description. Passato prossimo is the ' +
            'brushstroke: completed events. Mentre + imperfetto sets the scene; passato prossimo ' +
            'delivers the action.',
          notes:
            'A short mini-story works better than an abstract rule. Use a cinema scene: ' +
            '"Mentre guardavo il film, qualcuno si è seduto davanti a me." Walk through the two tenses.',
        },
        {
          taskType: TaskType.tense_selection,
          focus: 'Choose the correct tense',
          prompt:
            'Choose imperfetto or passato prossimo: "Ieri sera (guardare) ___ la TV quando ' +
            '(spegnersi) ___ la luce."',
          exampleAnswer: 'guardavo … si è spenta',
          notes: 'guardare = ongoing background; spegnersi = sudden completed event.',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Catch tense errors in a narrative',
          prompt:
            'Fix the tense errors: "Leggevo il giornale e poi ho finito. Dopo, ho guardavo ' +
            'la TV per un’ora."',
          exampleAnswer: 'Leggevo il giornale e poi ho finito. Dopo, ho guardato la TV per un’ora.',
          notes:
            'First error: "ho guardavo" mixes auxiliary + imperfetto — should be "ho guardato". ' +
            'The first sentence is correct (habit then completed action).',
        },
        {
          taskType: TaskType.translation,
          focus: 'Narrate a real past event',
          prompt:
            'Translate: "I was watching a documentary when my phone rang. I paused the screen and answered."',
          exampleAnswer:
            'Stavo guardando un documentario quando mi ha squillato il telefono. Ho messo in pausa lo schermo e ho risposto.',
          notes:
            'Accept stavo guardando (stare + gerund, natural in speech) or guardavo. Both are correct ' +
            'for the imperfetto background. Focus feedback on the passato prossimo events.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Tell your own interruption story',
          prompt:
            'Tell a real or invented story: you were doing something (imperfetto) when something happened (passato prossimo).',
          notes:
            'Prompt with a topic from the learner’s interests — a sports event, a film screening, ' +
            'cooking dinner. The goal is fluent switching between the two tenses.',
        },
        {
          taskType: TaskType.recap,
          focus: 'The mentre rule',
          prompt: 'Complete: "Mentre + ___ (imperfetto/passato prossimo), + event in ___."',
          exampleAnswer: 'Mentre + imperfetto … event in passato prossimo',
        },
      ],
    },
    {
      slug: 'cap08-had-already-happened',
      title: 'Avevo già visto quel film — the past perfect',
      lessonType: LessonType.grammar,
      level: CEFRLevel.lower_intermediate,
      summary:
        'Add the trapassato prossimo to your toolkit: express that something had already finished ' +
        'before another past action — essential for film plot summaries and telling stories with ' +
        'multiple layers.',
      objectiveSkillSlugs: ['it-trapassato', 'it-imperfetto-vs-passato-prossimo'],
      defaultDurationMinutes: 11,
      compatibleThemes: ['film', 'history', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'The third past tense — one step further back',
          prompt:
            'The trapassato prossimo = imperfetto of avere/essere + past participle. It means "had done." ' +
            'Think of it as an extra flashback: passato prossimo is yesterday; trapassato is the day before yesterday (in narrative terms).',
          notes:
            'A timeline diagram helps: present → passato prossimo → trapassato. The word già (already) ' +
            'is the most reliable signal. Give the avere-based formula first.',
        },
        {
          taskType: TaskType.conjugation,
          focus: 'Build the trapassato with avere',
          prompt: 'Give the trapassato prossimo (io/lei/loro) for: vedere, leggere.',
          exampleAnswer:
            'avevo visto / aveva visto / avevano visto — avevo letto / aveva letto / avevano letto',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Trapassato in a film-plot sentence',
          prompt:
            'Complete: "Quando il protagonista è arrivato al cinema, il film ___ (già cominciare)."',
          exampleAnswer: 'era già cominciato',
          notes:
            'cominciare uses essere (motion/change). era già cominciato — agreement masculine singular.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Contrast trapassato and passato prossimo',
          prompt:
            'Translate: "I didn’t want to read the review because I hadn’t seen the film yet."',
          exampleAnswer: 'Non volevo leggere la recensione perché non avevo ancora visto il film.',
          notes: 'non … ancora = not yet. volevo = imperfetto for an ongoing state of wanting.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Three-tense timeline',
          prompt:
            'Put these events in chronological order using the right tense: buy the ticket / the film had started / you arrived.',
          notes:
            'Model answer: avevo comprato il biglietto; sono arrivato/a; il film era già cominciato.',
        },
      ],
    },
    {
      slug: 'cap08-talk-about-films',
      title: 'Che film consigli? — talk about cinema and TV',
      lessonType: LessonType.scenario_roleplay,
      level: CEFRLevel.lower_intermediate,
      summary:
        'You’re chatting with an Italian friend about films and shows. Recommend something, ' +
        'describe it, ask what they think — using media vocabulary and past tenses throughout.',
      objectiveSkillSlugs: [
        'it-vocab-cinema-tv',
        'it-vocab-media',
        'it-imperfetto-vs-passato-prossimo',
      ],
      defaultDurationMinutes: 10,
      compatibleThemes: ['film', 'culture', 'news'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Set the scene',
          prompt:
            'You’re meeting an Italian friend for coffee. They ask: "Hai guardato qualcosa di bello ultimamente?" ' +
            'Let’s get you ready to answer.',
          notes:
            'Pull the learner’s favourite genre or a specific film/series from their profile if available. ' +
            'This makes the roleplay immediately personal.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Cinema vocabulary in context',
          prompt:
            'Complete: "Ho visto un ___ (documentary) sul regista Fellini. Le immagini sullo ___ (screen) erano bellissime."',
          exampleAnswer: 'documentario … schermo',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'Recommend a film or show',
          prompt:
            'Your friend asks for a recommendation. Tell them: what you watched, what it was about (imperfetto for description), ' +
            'and why you liked it.',
          exampleAnswer:
            'Ho visto una serie italiana. Parlava di una famiglia veneziana negli anni Settanta — era molto intensa. Ti consiglio di guardarla.',
          notes:
            'Encourage use of imperfetto for describing the plot (era, parlava, c’erano) and passato prossimo ' +
            'for completed plot events (ha vinto, è morto/a). Personalize to the learner’s actual taste.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Your media habits now vs before',
          prompt:
            'Compare how you consume media now and when you were younger. Use at least one imperfetto and one passato prossimo.',
          notes:
            'Model: "Da giovane guardavo molto la TV, ma adesso guardo soprattutto le serie in streaming." ' +
            'Praise natural switching between tenses.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Three new media words to keep',
          prompt:
            'Which three words from this lesson will you actually use? Say a sentence with each.',
        },
      ],
    },
    {
      slug: 'cap08-suffixes-mini-lesson',
      title: 'Giornalino, librone, parolaccia — Italian suffixes',
      lessonType: LessonType.vocabulary_review,
      level: CEFRLevel.lower_intermediate,
      summary:
        'A focused mini-lesson on Italian alterati: how to make nouns smaller, bigger, or worse ' +
        'with a single suffix — using media and everyday words as the workshop material.',
      objectiveSkillSlugs: ['it-suffixes'],
      defaultDurationMinutes: 9,
      compatibleThemes: ['film', 'news', 'culture', 'family'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Three suffixes, three meanings',
          prompt:
            'Italian can pack size and emotion into the ending of a word. ' +
            '-ino/-etto = small or cute; -one = big or impressive; -accio/-accia = ugly or bad. ' +
            'Drop the final vowel of the base word before adding the suffix.',
          notes:
            'Contrast giornale → giornalino vs giornalONE vs giornalACCIO. The -one gender switch is the key teaching point.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Identify the suffix meaning',
          prompt:
            'What does "un filmaccio" mean? (a) a great film (b) a short film (c) a terrible film',
          exampleAnswer: '(c) a terrible film',
          notes: '-accio signals something bad or unpleasant.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Form the altered word',
          prompt:
            'Add the correct suffix: "un ___ (big book = libro + -one)", "una ___ (cute little cat = gatto + -ino, f.)", "che ___ (awful weather = tempo + -accio)".',
          exampleAnswer: 'librone … gattina … tempaccio',
          notes:
            'gatto → gattino (m.) but if referring to a female kitten: gattina (f.). tempaccio = tempo + -accio, drop final -o.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Create your own alterati',
          prompt:
            'Choose three nouns you already know and try adding a suffix to each. Say the altered word and explain what it means.',
          notes:
            'Any plausible formation is worth praising. Point out any real Italian words that match what they invented.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Suffix cheat sheet',
          prompt:
            'Give one example of a diminutive, an augmentative, and a pejorative from today’s lesson.',
        },
      ],
    },
  ],

  // ─── Thematic vocabulary bank ─────────────────────────────────────────────
  vocabulary: [
    // Stampa (press)
    {
      slug: 'cap08-il-giornale',
      targetText: 'il giornale',
      nativeText: 'the newspaper',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'stampa',
      exampleSentence: 'Ogni mattina compro il giornale all’edicola.',
      exampleTranslation: 'Every morning I buy the newspaper at the newsstand.',
    },
    {
      slug: 'cap08-la-rivista',
      targetText: 'la rivista',
      nativeText: 'the magazine',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'stampa',
      exampleSentence: 'Ho un abbonamento a una rivista di cinema.',
      exampleTranslation: 'I have a subscription to a cinema magazine.',
    },
    {
      slug: 'cap08-le-notizie',
      targetText: 'le notizie',
      nativeText: 'the news (pl.)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'stampa',
    },
    {
      slug: 'cap08-larticolo',
      targetText: 'l’articolo',
      nativeText: 'the article',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'stampa',
      exampleSentence: 'Ho letto un articolo molto interessante sulla Mostra di Venezia.',
      exampleTranslation: 'I read a very interesting article about the Venice Film Festival.',
    },
    {
      slug: 'cap08-il-titolo',
      targetText: 'il titolo',
      nativeText: 'the headline / title',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'stampa',
    },
    {
      slug: 'cap08-la-stampa',
      targetText: 'la stampa',
      nativeText: 'the press / print media',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'stampa',
      exampleSentence: 'La libertà di stampa è fondamentale in una democrazia.',
      exampleTranslation: 'Press freedom is fundamental in a democracy.',
    },
    {
      slug: 'cap08-il-giornalista',
      targetText: 'il/la giornalista',
      nativeText: 'the journalist',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'stampa',
      exampleSentence: 'La giornalista ha fatto una domanda difficile al ministro.',
      exampleTranslation: 'The journalist asked the minister a difficult question.',
    },
    {
      slug: 'cap08-labbonamento',
      targetText: 'l’abbonamento',
      nativeText: 'the subscription',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'stampa',
    },
    {
      slug: 'cap08-la-pubblicita',
      targetText: 'la pubblicità',
      nativeText: 'the advertisement / advertising',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'stampa',
      exampleSentence: 'Cambio canale durante la pubblicità.',
      exampleTranslation: 'I change channel during the adverts.',
    },
    {
      slug: 'cap08-il-telegiornale',
      targetText: 'il telegiornale',
      nativeText: 'the TV news bulletin',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'stampa',
      exampleSentence: 'Guarda il telegiornale ogni sera alle otto.',
      exampleTranslation: 'He watches the TV news every evening at eight.',
    },
    // Cinema e TV
    {
      slug: 'cap08-il-film',
      targetText: 'il film',
      nativeText: 'the film / movie',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'cinema-tv',
      exampleSentence: 'Hai visto il film di cui parlano tutti?',
      exampleTranslation: 'Have you seen the film everyone is talking about?',
    },
    {
      slug: 'cap08-il-cinema',
      targetText: 'il cinema',
      nativeText: 'the cinema / movie theater',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'cinema-tv',
    },
    {
      slug: 'cap08-la-televisione',
      targetText: 'la televisione / la TV',
      nativeText: 'the television / TV',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'cinema-tv',
      exampleSentence: 'Da bambino passavo troppe ore davanti alla televisione.',
      exampleTranslation: 'As a child I spent too many hours in front of the television.',
    },
    {
      slug: 'cap08-la-radio',
      targetText: 'la radio',
      nativeText: 'the radio',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'cinema-tv',
    },
    {
      slug: 'cap08-il-canale',
      targetText: 'il canale',
      nativeText: 'the channel',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'cinema-tv',
      exampleSentence: 'Su quale canale danno il documentario stasera?',
      exampleTranslation: 'Which channel is showing the documentary tonight?',
    },
    {
      slug: 'cap08-il-programma',
      targetText: 'il programma',
      nativeText: 'the (TV/radio) programme',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'cinema-tv',
    },
    {
      slug: 'cap08-lattore',
      targetText: 'l’attore / l’attrice',
      nativeText: 'the actor / the actress',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'cinema-tv',
      exampleSentence: 'L’attrice ha vinto il Leone d’Oro a Venezia.',
      exampleTranslation: 'The actress won the Golden Lion at Venice.',
    },
    {
      slug: 'cap08-il-regista',
      targetText: 'il/la regista',
      nativeText: 'the (film) director',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'cinema-tv',
      exampleSentence: 'Il regista ha spiegato il significato del film.',
      exampleTranslation: 'The director explained the meaning of the film.',
    },
    {
      slug: 'cap08-lo-schermo',
      targetText: 'lo schermo',
      nativeText: 'the screen',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'cinema-tv',
    },
    {
      slug: 'cap08-il-telecomando',
      targetText: 'il telecomando',
      nativeText: 'the remote control',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'cinema-tv',
      exampleSentence: 'Non trovo il telecomando — è finito sotto il divano.',
      exampleTranslation: 'I can’t find the remote — it ended up under the sofa.',
    },
    {
      slug: 'cap08-il-documentario',
      targetText: 'il documentario',
      nativeText: 'the documentary',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'cinema-tv',
      exampleSentence: 'Ho visto un ottimo documentario sulla storia del doppiaggio italiano.',
      exampleTranslation: 'I watched an excellent documentary on the history of Italian dubbing.',
    },
    {
      slug: 'cap08-la-serie',
      targetText: 'la serie',
      nativeText: 'the series (invariable)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'cinema-tv',
      exampleSentence: 'Ho guardato tutte e tre le serie in un weekend.',
      exampleTranslation: 'I watched all three series in one weekend.',
    },
    {
      slug: 'cap08-i-sottotitoli',
      targetText: 'i sottotitoli',
      nativeText: 'the subtitles',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'cinema-tv',
      exampleSentence:
        'In Italia i film stranieri di solito non hanno i sottotitoli — vengono doppiati.',
      exampleTranslation: 'In Italy foreign films usually don’t have subtitles — they are dubbed.',
    },
    // Alterati (suffixes in context)
    {
      slug: 'cap08-il-giornalino',
      targetText: 'il giornalino',
      nativeText: 'the little paper / comic book (diminutive of giornale)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'alterati',
    },
    {
      slug: 'cap08-il-filmetto',
      targetText: 'il filmetto',
      nativeText: 'the short / minor film (diminutive of film)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'alterati',
    },
    {
      slug: 'cap08-la-parolaccia',
      targetText: 'la parolaccia',
      nativeText: 'the swear word / rude word (pejorative of parola)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'alterati',
      exampleSentence: 'Il film era pieno di parolacce — non adatto ai bambini.',
      exampleTranslation: 'The film was full of swear words — not suitable for children.',
    },
    {
      slug: 'cap08-il-tempaccio',
      targetText: 'il tempaccio',
      nativeText: 'the awful weather (pejorative of tempo)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'alterati',
    },
  ],
};

export default unit;
