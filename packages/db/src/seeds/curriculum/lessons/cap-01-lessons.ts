// Additional lesson templates for Capitolo 1 — Una città italiana.
//
// These EXTEND the templates authored inline in units/cap-01-una-citta-italiana.ts
// (the index merges both). They provide a richer menu of curated lesson designs:
// per-skill drills, an error clinic on the chapter’s common mistakes, scenario
// roleplays, listening and speaking challenges, a vocabulary review, and a
// progress check.
//
// Rules mirror SPEC.md: original content; every in-string apostrophe is the
// curly ' (U+2019); slugs are globally unique and do not collide with the inline
// template slugs (cap01-find-your-way, cap01-a-or-an, cap01-i-have,
// cap01-getting-around).

import { CEFRLevel, LessonType, TaskType } from '@prisma/client';
import type { SeedLessonTemplate } from '../types';

export const unitCode = 'cap-01';

const lessons: SeedLessonTemplate[] = [
  // ─── 1. Article drill — focused single-skill ────────────────────────────────
  {
    slug: 'cap01-article-drill',
    title: 'un, uno, una, un’ — the fast-track drill',
    lessonType: LessonType.grammar,
    level: CEFRLevel.complete_beginner,
    summary:
      'A focused, fast drill on choosing the right indefinite article. Gender first, ' +
      'then the sound test — until the choice is automatic.',
    objectiveSkillSlugs: ['it-indefinite-articles', 'it-noun-gender'],
    defaultDurationMinutes: 7,
    compatibleThemes: ['travel', 'food', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Two-step rule',
        prompt:
          'Step 1: is the noun masculine or feminine? Step 2: what sound does it start with? ' +
          'Together those two facts give you the right article every time.',
        notes: 'Keep it brief — learners already met this rule; this is the rep-heavy drill.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Masculine: un vs uno',
        prompt: 'Insert the article: ___ zaino, ___ museo, ___ autobus.',
        exampleAnswer: 'uno zaino, un museo, un autobus',
        notes: 'Highlight that zaino starts with z → uno.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Feminine: una vs un’',
        prompt: 'Insert the article: ___ stazione, ___ amica, ___ valigia.',
        exampleAnswer: 'una stazione, un’amica, una valigia',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Pick the correct form',
        prompt: 'Which is correct: "un ospedale" or "uno ospedale"?',
        exampleAnswer: 'un ospedale',
        notes: 'Ospedale starts with a vowel but is masculine — takes un, no apostrophe.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Spot the error',
        prompt: 'Fix: Ho un’amico e un’albergo in centro.',
        exampleAnswer: 'Ho un amico e un albergo in centro.',
        notes: 'Both nouns are masculine — no apostrophe.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The uno trigger list',
        prompt: 'Name the sounds that trigger uno instead of un.',
      },
    ],
  },

  // ─── 2. Avere conjugation drill — focused single-skill ───────────────────────
  {
    slug: 'cap01-avere-conjugation-drill',
    title: 'ho, hai, ha… — the avere conjugation drill',
    lessonType: LessonType.grammar,
    level: CEFRLevel.complete_beginner,
    summary:
      'Build the full present-tense paradigm of avere from scratch and lock in the silent-h ' +
      'spelling before any mistakes take root.',
    objectiveSkillSlugs: ['it-avere-present', 'it-subject-pronouns'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['travel', 'family', 'business'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The paradigm + the silent h',
        prompt:
          'Avere: ho, hai, ha, abbiamo, avete, hanno. The h in ho/hai/ha is silent and exists ' +
          'only to distinguish them from the preposition a and the conjunction e.',
        notes: 'Draw attention to the ha/a homophone — this is the spelling trap.',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'Complete the paradigm',
        prompt: 'Give the avere form for: voi, lui, io, loro.',
        exampleAnswer: 'avete, ha, ho, hanno',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Choose the right form',
        prompt: 'Complete: Maria ___ un biglietto. Noi ___ fame. Tu ___ fretta?',
        exampleAnswer: 'ha, abbiamo, hai',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Catch the missing h',
        prompt: 'Fix: Io o una mappa e lei a un passaporto.',
        exampleAnswer: 'Io ho una mappa e lei ha un passaporto.',
        notes: 'The h distinguishes the verb from the particle.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Why the h?',
        prompt: 'Why does Italian spell "ho" with an h when the h is silent?',
      },
    ],
  },

  // ─── 3. Avere idioms speaking drill — focused single-skill ──────────────────
  {
    slug: 'cap01-avere-idioms-speaking',
    title: 'Ho fame, ho fretta — avere idioms out loud',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.beginner,
    summary:
      'Produce the avere idioms at speed — hunger, thirst, heat, cold, hurry, sleepiness, age — ' +
      'and say them about yourself in real time.',
    objectiveSkillSlugs: ['it-avere-idioms', 'it-avere-present'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['food', 'travel', 'family', 'sports'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'The avere-idiom set',
        prompt:
          'Italian uses avere — not essere — to express feelings and states: ho fame, ho sete, ' +
          'ho caldo, ho freddo, ho fretta, ho sonno, ho … anni.',
        notes: 'Post the list; the learner will try to cover it and speak from memory.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Map English states to avere',
        prompt: 'Translate: "She is thirsty and they are sleepy."',
        exampleAnswer: 'Ha sete e hanno sonno.',
        notes: 'Forces 3rd-person forms, not just io.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Say it about right now',
        prompt: 'Use at least two avere idioms to describe how you feel at this exact moment.',
        notes: 'Any true statement counts — reward spontaneity over polish.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Age + one state',
        prompt: 'Tell me your age and one physical state you often have in the morning.',
        exampleAnswer: 'Ho ventisei anni. Di solito ho sonno.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'The essere trap',
        prompt: 'Which avere idiom are you most tempted to say with essere instead?',
      },
    ],
  },

  // ─── 4. Plurals drill — focused single-skill ─────────────────────────────────
  {
    slug: 'cap01-plurals-drill',
    title: 'libri, case, stazioni — plurals without the -s',
    lessonType: LessonType.grammar,
    level: CEFRLevel.complete_beginner,
    summary:
      'Italian plurals change the final vowel, never add -s. Drill the three patterns ' +
      '(-o→-i, -a→-e, -e→-i) until the English habit is gone.',
    objectiveSkillSlugs: ['it-noun-plurals', 'it-noun-gender'],
    defaultDurationMinutes: 7,
    compatibleThemes: ['travel', 'food', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The three patterns',
        prompt:
          'Masculine -o nouns go to -i (treno → treni). ' +
          'Feminine -a nouns go to -e (piazza → piazze). ' +
          'Both genders of -e nouns go to -i (stazione → stazioni).',
        notes: 'Warn that -a→-e looks like a singular -e noun — this is the #1 confusion point.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Form the plural',
        prompt: 'Pluralize: museo, chiesa, biglietto, stazione.',
        exampleAnswer: 'musei, chiese, biglietti, stazioni',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Avoid the -s trap',
        prompt: 'What is the plural of "autobus"?',
        exampleAnswer: 'autobus',
        notes: 'Nouns ending in a consonant or an accented vowel are invariable in Italian.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Fix the English plural',
        prompt: 'Fix: Ho due bigliettis e tre mappes.',
        exampleAnswer: 'Ho due biglietti e tre mappe.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The pattern grid',
        prompt: 'What does a feminine -a noun become in the plural?',
      },
    ],
  },

  // ─── 5. Prepositions a/in drill — focused single-skill ───────────────────────
  {
    slug: 'cap01-prepositions-a-in-drill',
    title: 'a Roma, in Italia — the a vs in drill',
    lessonType: LessonType.grammar,
    level: CEFRLevel.beginner,
    summary:
      'Lock in the single most important preposition rule for travel talk: a before cities, ' +
      'in before countries and regions — and extend it to the in + vehicle pattern.',
    objectiveSkillSlugs: ['it-simple-prepositions', 'it-vocab-city-places', 'it-vocab-transport'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['travel', 'business', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'a + city / in + country',
        prompt:
          'Use a before a city name (a Firenze, a New York). Use in before a country or ' +
          'region (in Italia, in Toscana). The same in also covers vehicles: in treno, in macchina.',
        notes: 'Flag the a piedi exception — on foot uses a, not in.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'City vs country',
        prompt: 'Complete: Vado ___ Venezia ___ agosto. Vivo ___ Spagna.',
        exampleAnswer: 'a Venezia, in agosto → a Venezia ad agosto. Vivo in Spagna.',
        notes: 'Note: a + vowel can become ad for euphony. Accept both a/ad for this exercise.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'in + vehicle vs a piedi',
        prompt: 'Complete: Arrivo ___ treno, poi vado ___ piedi fino all’albergo.',
        exampleAnswer: 'in treno, a piedi',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce in context',
        prompt: 'Translate: "I’m going to Milan by bus."',
        exampleAnswer: 'Vado a Milano in autobus.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The rule in one line',
        prompt: 'When do you use a and when do you use in for place names?',
      },
    ],
  },

  // ─── 6. Error clinic — common chapter mistakes ───────────────────────────────
  {
    slug: 'cap01-error-clinic',
    title: 'Error clinic: un vs uno, a città vs in paese, the silent h',
    lessonType: LessonType.grammar,
    level: CEFRLevel.complete_beginner,
    summary:
      'A targeted error-correction clinic on the three most common slips in this chapter: ' +
      'choosing un vs uno, mixing up a città / in paese, and writing avere without its silent h.',
    objectiveSkillSlugs: ['it-indefinite-articles', 'it-simple-prepositions', 'it-avere-present'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['travel', 'culture', 'food'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Clinic frame',
        prompt:
          'I’ll show you sentences with the mistakes beginners make most often in this chapter. ' +
          'You spot and fix them — this is how the rules become second nature.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'un vs uno before s+consonant',
        prompt: 'Fix: Prendo un stadio di calcio con un studente.',
        exampleAnswer: 'Prendo uno stadio di calcio con uno studente.',
        notes:
          'Stadio and studente both start with s + consonant → uno. ' +
          'Note: "prendere uno stadio" is unlikely in real life; the focus is the article.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'a città vs in paese / a paese',
        prompt: 'Fix: Abito in Roma e lavoro a Italia.',
        exampleAnswer: 'Abito a Roma e lavoro in Italia.',
        notes: 'Roma is a city → a. Italia is a country → in.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Silent h in avere',
        prompt: 'Fix: Io o fame e Marco a sete.',
        exampleAnswer: 'Io ho fame e Marco ha sete.',
        notes: 'The h distinguishes ho/ha from the preposition/conjunction.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'un’ apostrophe on masculine nouns',
        prompt: 'Fix: Cerco un’albergo e un’autobus per il centro.',
        exampleAnswer: 'Cerco un albergo e un autobus per il centro.',
        notes: 'Albergo and autobus are masculine — no apostrophe on un.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-rank',
        prompt: 'Which of the three error types feels most likely to trip you up again?',
      },
    ],
  },

  // ─── 7. Scenario roleplay — ask directions to the museum ─────────────────────
  {
    slug: 'cap01-roleplay-ask-directions',
    title: 'Scusi, dov’è il museo? — asking for directions',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.beginner,
    summary:
      'You’re in a new city and need to find the museum. Stop a passerby, ask politely, ' +
      'understand the answer, and confirm you’re on the right track.',
    objectiveSkillSlugs: ['it-vocab-directions', 'it-vocab-city-places', 'it-simple-prepositions'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['travel', 'art', 'history', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'You just stepped off the bus in a town you’ve never visited. You want to reach the ' +
          'museum. Let’s stop someone and ask.',
        notes:
          'Personalize the destination to the learner’s interest (museo d’arte, stadio, mercato…).',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Stop someone politely',
        prompt: 'Get a stranger’s attention and ask where the museum is.',
        exampleAnswer: 'Scusi, dov’è il museo?',
        notes: 'Prompt for the formal scusi rather than the casual senti.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Understand the directions',
        prompt:
          'The passerby says: "Sempre dritto, poi la prima a sinistra. Il museo è vicino alla chiesa." ' +
          'Which turn do you take?',
        exampleAnswer: 'First left.',
        notes: 'Engine can vary the route; test comprehension of sinistra/destra and ordinals.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Confirm and thank',
        prompt: 'Check you understood and thank the person.',
        exampleAnswer: 'Quindi a sinistra, vicino alla chiesa? Grazie mille!',
      },
      {
        taskType: TaskType.recap,
        focus: 'Phrases to save',
        prompt: 'Which phrase from this exchange will be most useful on a real trip?',
      },
    ],
  },

  // ─── 8. Scenario roleplay — buy a train ticket ───────────────────────────────
  {
    slug: 'cap01-roleplay-buy-train-ticket',
    title: 'Un biglietto per Roma, per favore',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.complete_beginner,
    summary:
      'Buy a train ticket at the station. Ask for the right destination, say how many tickets ' +
      'you need, and confirm the platform.',
    objectiveSkillSlugs: [
      'it-vocab-transport',
      'it-vocab-city-places',
      'it-avere-present',
      'it-vocab-numbers-1-100',
    ],
    defaultDurationMinutes: 11,
    compatibleThemes: ['travel', 'business'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'You’re at the ticket window in la stazione. You want to buy a ticket to Rome. ' +
          'The clerk will ask questions — stay calm and use what you know.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Request the ticket',
        prompt: 'Ask for one ticket to Rome.',
        exampleAnswer: 'Un biglietto per Roma, per favore.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Answer the clerk’s questions',
        prompt: 'The clerk asks: "Solo andata o andata e ritorno?" — what do you say?',
        exampleAnswer: 'Solo andata, grazie.',
        notes: 'Introduce andata and ritorno as new travel lexis in context.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Confirm you have the ticket',
        prompt: 'Translate: "Do you have a ticket for the 10 o’clock train?"',
        exampleAnswer: 'Ha un biglietto per il treno delle dieci?',
        notes: 'Uses ha (3rd-person avere) in a real question.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Which platform?',
        prompt: 'The clerk says "Binario tre." Which number is that?',
        exampleAnswer: 'Three.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Confidence check',
        prompt: 'Would you feel ready to do this at a real Italian ticket window?',
      },
    ],
  },

  // ─── 9. Scenario roleplay — check into a hotel ───────────────────────────────
  {
    slug: 'cap01-roleplay-hotel-checkin',
    title: 'Buonasera, ho una prenotazione',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.complete_beginner,
    summary:
      'Check into a hotel: confirm your reservation, say what you have (passport, bags), ' +
      'and ask for a simple piece of information about the hotel.',
    objectiveSkillSlugs: [
      'it-avere-present',
      'it-vocab-city-places',
      'it-vocab-greetings',
      'it-indefinite-articles',
    ],
    defaultDurationMinutes: 10,
    compatibleThemes: ['travel', 'culture', 'business'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'You arrive at l’albergo after a long journey. The receptionist greets you. ' +
          'Use avere to confirm your reservation and produce a natural check-in exchange.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Announce yourself',
        prompt: 'Greet the receptionist and say you have a reservation.',
        exampleAnswer: 'Buonasera. Ho una prenotazione a nome mio.',
        notes: 'Introduce "a nome mio" (in my name) as a useful fixed phrase.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Hand over the passport',
        prompt: 'The receptionist says "Il passaporto, per favore." Respond.',
        exampleAnswer: 'Eccolo. Ho anche la valigia da lasciare qui?',
      },
      {
        taskType: TaskType.translation,
        focus: 'Ask where the restaurant is',
        prompt: 'Translate: "Do you have a restaurant in the hotel?"',
        exampleAnswer: 'Avete un ristorante in albergo?',
        notes: 'Uses the avete (voi) form — a great avere payoff in this context.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Which form did you use most?',
        prompt: 'Did you use ho, hai, ha, or avete most often? Why?',
      },
    ],
  },

  // ─── 10. Listening challenge — follow directions ──────────────────────────────
  {
    slug: 'cap01-listening-follow-directions',
    title: 'Listening gym: follow the route',
    lessonType: LessonType.listening_challenge,
    level: CEFRLevel.beginner,
    summary:
      'Train your ear on natural spoken Italian directions. Three short routes — no map, ' +
      'just words. Figure out where you end up.',
    objectiveSkillSlugs: ['it-vocab-directions', 'it-vocab-city-places'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['travel', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Ear training set-up',
        prompt:
          'Someone will give you spoken directions. No map visible at first — listen, hold the ' +
          'route in your head, then answer where you end up.',
        notes: 'Engine: generate three ~25-word direction clips; vary the destination each time.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Route 1: landmark destination',
        prompt:
          'Directions: "Vai sempre dritto per due isolati, poi gira a destra. La banca è lì a sinistra." ' +
          'Where do you arrive?',
        exampleAnswer: 'The bank, on the left.',
        notes: 'Introduce "isola" (block) passively — context makes it guessable.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Route 2: near or far?',
        prompt:
          'Directions: "Prendi la prima a sinistra, poi la seconda a destra. La stazione è vicino.' +
          '" Is it nearby or far?',
        exampleAnswer: 'Nearby — vicino.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Catch the key turn',
        prompt: 'You hear: "…poi gira a sinistra al semaforo." Which way do you turn at the light?',
        exampleAnswer: 'Left.',
        notes: 'Introduce "semaforo" (traffic light) in context.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Listening anchor',
        prompt: 'Which direction word is hardest to catch when spoken at normal speed?',
      },
    ],
  },

  // ─── 11. Speaking challenge — describe getting around your city ───────────────
  {
    slug: 'cap01-speaking-my-city',
    title: 'Speaking challenge: getting around my city',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.beginner,
    summary:
      'Describe how you navigate your own city — the transport you use, the places you visit, ' +
      'and how you’d direct someone from the station to your home.',
    objectiveSkillSlugs: [
      'it-vocab-city-places',
      'it-vocab-transport',
      'it-vocab-directions',
      'it-simple-prepositions',
    ],
    defaultDurationMinutes: 10,
    compatibleThemes: ['travel', 'culture', 'family', 'business'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Your city, in Italian',
        prompt:
          'Today you’ll talk about your own city or town. Use the vocabulary and prepositions ' +
          'from this chapter — transport, places, directions.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Name three places you visit regularly',
        prompt: 'Describe three places in your city that you go to often.',
        exampleAnswer: 'Vado spesso al mercato, in biblioteca e in palestra.',
        notes: 'Personalize destinations to learner’s interests.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'How you get around',
        prompt: 'Tell me how you usually travel around your city. Which transport do you use?',
        exampleAnswer: 'Di solito vado in metro o a piedi. Non ho la macchina.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Give directions from the station',
        prompt:
          'Imagine I’m at the station in your city. Tell me how to reach your favorite café or place.',
        notes: 'Push for a sinistra/destra + poi structure; reward any correct direction phrase.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Language gap check',
        prompt: 'Was there a word you wanted but didn’t have? Describe it in Italian if you can.',
      },
    ],
  },

  // ─── 12. Vocabulary review ───────────────────────────────────────────────────
  {
    slug: 'cap01-vocab-review',
    title: 'City vocab review: places, transport, directions',
    lessonType: LessonType.vocabulary_review,
    level: CEFRLevel.complete_beginner,
    summary:
      'A rapid-fire review of the chapter’s three vocabulary clusters — city places, means of ' +
      'transport, and direction phrases — with gender and usage checks.',
    objectiveSkillSlugs: ['it-vocab-city-places', 'it-vocab-transport', 'it-vocab-directions'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['travel', 'culture', 'history'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Review goal',
        prompt:
          'A quick pass over all three vocab clusters from this chapter. Aim for fluent ' +
          'recall — you should be able to produce the word and its gender without thinking.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Recall city places with correct gender',
        prompt: 'Which is correct: "il stazione" or "la stazione"?',
        exampleAnswer: 'la stazione',
        notes: 'Reinforce the -ione feminine pattern.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Transport words in context',
        prompt: 'Complete: Prendo ___ (the metro) e poi vado ___ (on foot) fino alla piazza.',
        exampleAnswer: 'la metropolitana, a piedi',
      },
      {
        taskType: TaskType.translation,
        focus: 'Direction phrases active recall',
        prompt: 'Translate: "Turn left at the corner, then straight ahead."',
        exampleAnswer: 'Gira a sinistra all’angolo, poi sempre dritto.',
        notes: 'Introduce "angolo" (corner) passively in context.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'c’è vs there-isn’t',
        prompt: 'How do you ask if there is a pharmacy nearby?',
        exampleAnswer: 'C’è una farmacia qui vicino?',
        notes: 'Reinforces c’è from cap-01 city-places skill.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Self-flag',
        prompt:
          'Which vocabulary cluster — places, transport, or directions — needs the most revision?',
      },
    ],
  },

  // ─── 13. Progress check ──────────────────────────────────────────────────────
  {
    slug: 'cap01-progress-check',
    title: 'Chapter checkpoint: Una città italiana',
    lessonType: LessonType.progress_check,
    level: CEFRLevel.complete_beginner,
    summary:
      'A mixed check across the whole chapter — noun gender, indefinite articles, avere ' +
      'conjugation, avere idioms, and prepositions — to see what’s solid and what needs another pass.',
    objectiveSkillSlugs: [
      'it-noun-gender',
      'it-noun-plurals',
      'it-indefinite-articles',
      'it-avere-present',
      'it-avere-idioms',
      'it-simple-prepositions',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['travel', 'culture', 'food'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Low-stakes checkpoint',
        prompt:
          'A short, varied check to see how the chapter’s grammar and vocabulary have settled. ' +
          'No pressure — the goal is to spot what to revisit.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Indefinite article + plural',
        prompt: 'Insert the article and give the plural: ___ stazione → ___ .',
        exampleAnswer: 'una stazione → stazioni',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'avere paradigm check',
        prompt: 'Conjugate avere for: tu, lei, noi, loro.',
        exampleAnswer: 'hai, ha, abbiamo, hanno',
      },
      {
        taskType: TaskType.translation,
        focus: 'avere idiom in context',
        prompt: 'Translate: "We are hungry and they are in a hurry."',
        exampleAnswer: 'Abbiamo fame e loro hanno fretta.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Preposition: a or in?',
        prompt: 'Which is correct: "Abito ___ Napoli."',
        exampleAnswer: 'a Napoli',
        notes: 'Napoli is a city → a.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Chapter self-assessment',
        prompt: 'Which skill from this chapter do you feel most confident about? Which least?',
      },
    ],
  },
];

export default { unitCode, lessons };
