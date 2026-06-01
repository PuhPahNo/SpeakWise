// Additional lesson templates for Capitolo 14 — La musica e il teatro.
//
// These EXTEND the five templates authored inline in units/cap-14-musica-e-teatro.ts.
// The index merges both sets. Slugs must not collide with the five inline slugs:
//   cap14-relative-pronouns-music, cap14-infinitive-constructions,
//   cap14-buy-tickets, cap14-instruments-genres, cap14-chi-proverbs
//
// Rules mirror SPEC.md: original content; every in-string apostrophe is the
// curly ' (U+2019); slugs are globally unique; objectives reference real skill
// slugs from this chapter or earlier chapters only.

import { CEFRLevel, LessonType, TaskType } from '@prisma/client';
import type { SeedLessonTemplate } from '../types';

export const unitCode = 'cap-14';

const lessons: SeedLessonTemplate[] = [
  // ── 1 ── Per-skill drill: che vs cui after prepositions ───────────────────
  {
    slug: 'cap14-drill-che-vs-cui',
    title: 'Che o cui? La scelta che conta',
    lessonType: LessonType.grammar,
    level: CEFRLevel.upper_intermediate,
    summary:
      'A focused drill on the single most important decision in Italian relative clauses: ' +
      'che for subject and direct object, cui (always with a preposition) for everything else. ' +
      'Built around music and concert examples.',
    objectiveSkillSlugs: ['it-relative-pronouns'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['music', 'culture', 'art', 'film'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The two-question test',
        prompt:
          'Ask yourself: (1) Is the pronoun the subject or direct object of the relative clause? ' +
          'If yes → che. (2) Does a preposition come before it? ' +
          'If yes → preposition + cui. Example: "Il violinista che ammiro" (direct object of ammiro → che). ' +
          '"Il violinista con cui suono" (con precedes → con cui).',
        notes:
          'Keep the test on screen during the drill items. Swap examples to the learner’s preferred genre if known.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Subject or object? → che',
        prompt:
          'Choose the correct pronoun: ' +
          '"La cantante ___ ha vinto Sanremo è ligure." — che / cui / di cui',
        exampleAnswer: 'che',
        notes:
          'Ha vinto is intransitive here with la cantante as subject of the relative clause — che.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Preposition + cui',
        prompt:
          'Complete each gap with the right preposition + cui: ' +
          '"Il festival ___ ti ho parlato ieri si svolge a Sanremo ogni febbraio." / ' +
          '"La sala da concerto ___ si esibisce il quartetto ha un’acustica straordinaria."',
        exampleAnswer: 'di cui; in cui',
        notes:
          'First: parlare di → di cui. Second: esibirsi in → in cui. ' +
          'If the learner writes "in che", flag it as a common error immediately.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Fix the misused pronoun',
        prompt:
          'Find and correct the error in each sentence: ' +
          '"È il chitarrista cui ho incontrato al conservatorio." / ' +
          '"Il palcoscenico di che si parla è quello della Scala."',
        exampleAnswer:
          '"Il chitarrista che ho incontrato" — direct object of ho incontrato → che, no preposition. / ' +
          '"Il palcoscenico di cui si parla" — di precedes → di cui.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce both in context',
        prompt:
          'Translate: "The composer that I most admire and the orchestra with which she works ' +
          'will perform together next month."',
        exampleAnswer:
          'Il compositore che ammiro di più e l’orchestra con cui lavora si esibiranno insieme il mese prossimo.',
        notes:
          'Two relative pronouns in one sentence. Accept con la quale as a formal variant for con cui.',
      },
      {
        taskType: TaskType.recap,
        focus: 'One-line rule',
        prompt: 'Complete: "Use che when ___, and use cui when ___."',
        exampleAnswer:
          'Use che when the pronoun is the subject or direct object of the relative clause; ' +
          'use cui when a preposition is required before the pronoun.',
      },
    ],
  },

  // ── 2 ── Per-skill drill: chi as "whoever" ────────────────────────────────
  {
    slug: 'cap14-drill-chi-whoever',
    title: 'Chi canta prega due volte — drilling the relative chi',
    lessonType: LessonType.grammar,
    level: CEFRLevel.upper_intermediate,
    summary:
      'Zero in on chi used as a relative pronoun meaning "whoever / the one who / those who", ' +
      'reinforcing the always-singular verb rule and the vivid chi…chi… split construction.',
    objectiveSkillSlugs: ['it-chi-relative'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['music', 'culture', 'history'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Relative chi: the anchor proverb',
        prompt:
          '"Chi canta prega due volte." — Whoever sings prays twice. ' +
          'Notice: chi + singular verb (canta, prega), even though the meaning is "everyone who sings". ' +
          'This never changes, no matter how many people are implied.',
        notes:
          'The proverb is attributed to St. Augustine and well-known in Italy. ' +
          'It makes the grammar memorable.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Singular verb after chi',
        prompt:
          'Complete with the correct verb form: ' +
          '"Chi ___ (amare) la musica classica trova a Cremona un luogo sacro." / ' +
          '"Chi ___ (volere) imparare a suonare deve esercitarsi ogni giorno."',
        exampleAnswer: 'ama; vuole',
        notes:
          'Both verbs are third-person singular. If the learner writes amano / vogliono, ' +
          'correct gently: chi always takes the singular.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'chi…chi… split',
        prompt:
          'Choose the correct sentence: ' +
          '(a) "Chi rideva, chi piangeva: il finale dell’opera ci aveva commosso tutti." ' +
          '(b) "Chi ridevano, chi piangevano: il finale dell’opera ci aveva commosso tutti."',
        exampleAnswer: '(a)',
        notes:
          'Both verbs stay singular in the chi…chi… construction. ' +
          'Option (b) is wrong because the verbs are pluralised.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Translate into Italian using chi',
        prompt:
          'Translate: "Whoever buys a ticket before Friday will get a discount." / ' +
          '"Those who love opera should visit the Arena di Verona at least once."',
        exampleAnswer:
          'Chi compra il biglietto prima di venerdì riceverà uno sconto. / ' +
          'Chi ama l’opera dovrebbe visitare l’Arena di Verona almeno una volta.',
        notes: 'Reward correct singular verbs. Accept dovrebbe or deve for the second sentence.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The non-negotiable rule',
        prompt:
          'Why does chi always take a singular verb, even when the meaning is clearly plural?',
        exampleAnswer:
          'Chi is grammatically singular — it refers to an unspecified individual ' +
          '("the one who"), so the verb is always singular even if many people are implied.',
      },
    ],
  },

  // ── 3 ── Per-skill drill: verb + a/di/bare infinitive sorting ─────────────
  {
    slug: 'cap14-drill-infinitive-prepositions',
    title: 'Nessuna, a, di — smistare i verbi',
    lessonType: LessonType.grammar,
    level: CEFRLevel.upper_intermediate,
    summary:
      'A rapid sorting drill for the three infinitive-connector lanes: verbs that need no ' +
      'preposition, verbs that take a, and verbs that take di. All examples drawn from ' +
      'the world of music and performance.',
    objectiveSkillSlugs: ['it-infinitive-constructions'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['music', 'sports', 'film', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The three lanes',
        prompt:
          'Lane 1 — No preposition: modal verbs (volere, potere, dovere, sapere) and a few others ' +
          '(sentire, lasciare). ' +
          'Lane 2 — a: imparare a, cominciare a, riuscire a, continuare a, mettersi a, aiutare a. ' +
          'Lane 3 — di: cercare di, finire di, decidere di, smettere di, provare di (= provarci — but try di with tentare di / cercare di).',
        notes:
          'Give the learner a written reference. The most tested error pair at this level is ' +
          '"riuscire a" (not di) and "finire di" (not a). Personalise with music verbs.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Insert the right connector (or nothing)',
        prompt:
          'Complete — use a, di, or leave blank: ' +
          '"Devo ___ comprare i biglietti stasera." / ' +
          '"Sto imparando ___ suonare il violino da tre mesi." / ' +
          '"Ha deciso ___ abbandonare la carriera operistica." / ' +
          '"Non riesco ___ raggiungere le note alte."',
        exampleAnswer: '(blank); a; di; a',
        notes:
          'Four connectors in one set: modal bare, imparare a, decidere di, riuscire a. ' +
          'The first blank is the most common trap — remind learners that dovere never takes a preposition.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Spot the correct sentence',
        prompt:
          'Which sentence is correct? ' +
          '(a) "Ha smesso di provare alle dieci." ' +
          '(b) "Ha smesso a provare alle dieci." ' +
          '(c) "Ha smesso provare alle dieci."',
        exampleAnswer: '(a)',
        notes: 'Smettere always takes di + infinitive.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Fix the wrong preposition',
        prompt:
          'Correct the connector in each sentence: ' +
          '"Ho cominciato di cantare nel coro a quindici anni." / ' +
          '"Vuole di diventare un pianista professionista." / ' +
          '"Senza di suonare, non sarebbe felice."',
        exampleAnswer:
          '"Ho cominciato a cantare" (cominciare + a). / ' +
          '"Vuole diventare" (volere = bare infinitive, no preposition). / ' +
          '"Senza suonare" (senza + bare infinitive, no di).',
      },
      {
        taskType: TaskType.recap,
        focus: 'Quick-fire lane check',
        prompt:
          'State which lane each verb belongs to: ' +
          'potere / imparare / smettere / riuscire / dovere / cercare / continuare / finire.',
        exampleAnswer:
          'potere: none; imparare: a; smettere: di; riuscire: a; ' +
          'dovere: none; cercare: di; continuare: a; finire: di.',
      },
    ],
  },

  // ── 4 ── Per-skill drill: -a masculine nouns + plurals ───────────────────
  {
    slug: 'cap14-drill-masculine-a-nouns',
    title: 'Il problema, i problemi — i nomi maschili in -a',
    lessonType: LessonType.grammar,
    level: CEFRLevel.upper_intermediate,
    summary:
      'Master the class of Italian masculine nouns ending in -a — the Greek -ma group and the ' +
      '-ista occupations — with focused article, agreement, and plural drills set in the ' +
      'world of music and the arts.',
    objectiveSkillSlugs: ['it-nouns-adjectives-in-a'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['music', 'culture', 'art', 'news'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Two patterns, one rule',
        prompt:
          'Pattern 1 — Greek -ma nouns: il problema → i problemi, il programma → i programmi, ' +
          'il tema → i temi, il sistema → i sistemi, il clima → i climi, il dramma → i drammi, il poema → i poemi. ' +
          'They are masculine and take masculine plural -i. ' +
          'Pattern 2 — -ista occupations: il/la pianista (same form m./f. singular) → ' +
          'i pianisti (m. plural) / le pianiste (f. plural). ' +
          'Rule of thumb: if the noun ends in -ista and names a person, the article and any adjective reveal the gender.',
        notes:
          'The mnemonic "Greek roots, masculine rules" covers Pattern 1. ' +
          'For Pattern 2, use the contrast il chitarrista / la chitarrista → i chitarristi / le chitarriste.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Article agreement',
        prompt:
          'Choose the correct article + noun: ' +
          '"___ programma di stasera prevede un’ouverture di Rossini." (il / la / lo) / ' +
          '"___ pianista che ha suonato ieri era eccezionale." (il / la — assume male performer)',
        exampleAnswer: 'il programma; il pianista',
        notes:
          'If the learner picks la programma, explain that -ma nouns from Greek are masculine. ' +
          'Adjectives and articles are the gender signal for -ista nouns.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Form the plural',
        prompt:
          'Pluralise: "il tema" → ___; "il chitarrista" (group of men) → ___; ' +
          '"la chitarrista" (group of women) → ___; "il dramma" → ___.',
        exampleAnswer: 'i temi; i chitarristi; le chitarriste; i drammi',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Fix the gender / plural error',
        prompt:
          'Correct the mistakes: ' +
          '"La problema principale è il rumore in sala." / ' +
          '"I pianiste si sono esibite con eleganza." / ' +
          '"I programme della stagione sono già disponibili."',
        exampleAnswer:
          '"Il problema principale" (masculine). / ' +
          '"Le pianiste si sono esibite" (le pianiste = feminine plural). / ' +
          '"I programmi della stagione" (programma → programmi).',
      },
      {
        taskType: TaskType.recap,
        focus: 'Pattern check',
        prompt:
          'What are the two classes of -a masculine nouns in Italian, and how do their plurals differ?',
        exampleAnswer:
          'Greek -ma nouns (il programma, il tema…) form masculine plural in -i (i programmi, i temi). ' +
          '-ista occupation nouns have the same form in the singular for both genders but ' +
          'take gendered plurals: i pianisti (m.) / le pianiste (f.).',
      },
    ],
  },

  // ── 5 ── Error-correction clinic ──────────────────────────────────────────
  {
    slug: 'cap14-clinic-relative-infinitive-gender',
    title: 'Clinica degli errori: pronomi, preposizioni e genere',
    lessonType: LessonType.grammar,
    level: CEFRLevel.upper_intermediate,
    summary:
      'A targeted error clinic on the three classic mistakes of this chapter: using cui without ' +
      'its required preposition, choosing the wrong infinitive connector, and misreading the ' +
      'gender of il problema and other -a masculine nouns.',
    objectiveSkillSlugs: [
      'it-relative-pronouns',
      'it-infinitive-constructions',
      'it-nouns-adjectives-in-a',
    ],
    defaultDurationMinutes: 11,
    compatibleThemes: ['music', 'culture', 'art'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Three classic traps',
        prompt:
          'English speakers reliably fall into three traps in this chapter: ' +
          '(1) writing cui without the preposition it needs, ' +
          '(2) choosing the wrong connector before an infinitive, ' +
          '(3) treating -a nouns as feminine by default. ' +
          'Let’s catch them all.',
        notes:
          'Frame as a diagnostic, not a test. Wise should celebrate each successful correction.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Trap 1 — cui without preposition',
        prompt:
          'Fix each sentence: ' +
          '"La sala cui abbiamo assistito al concerto era straordinaria." / ' +
          '"Il direttore d’orchestra cui ammiriamo arriverà domani."',
        exampleAnswer:
          '"La sala in cui abbiamo assistito al concerto" (in is required — assistere a → in cui). / ' +
          '"Il direttore d’orchestra che ammiriamo" (ammirare is transitive, no preposition → che, not cui).',
        notes:
          'The second item is a reverse trap: learners who over-apply cui must see that a direct object needs che.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Trap 2 — wrong infinitive preposition',
        prompt:
          'Fix: "Spero di riuscire di cantare la parte." / ' +
          '"Ha cominciato di suonare la fisarmonica a otto anni." / ' +
          '"Voglio di iscrivermi al conservatorio."',
        exampleAnswer:
          '"Spero di riuscire a cantare" (riuscire always takes a). / ' +
          '"Ha cominciato a suonare" (cominciare + a). / ' +
          '"Voglio iscrivermi" (volere = bare infinitive).',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Trap 3 — il problema gender',
        prompt:
          'Fix: "La problema tecnica è stata risolta." / ' +
          '"Quello è un grande dramma letteraria." / ' +
          '"La sistema di prenotazione non funziona."',
        exampleAnswer:
          '"Il problema tecnico è stato risolto" (il problema is masculine). / ' +
          '"Quello è un grande dramma letterario" (il dramma is masculine). / ' +
          '"Il sistema di prenotazione non funziona" (il sistema is masculine).',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Apply clean Italian',
        prompt:
          'Describe a concert or performance using: one relative clause with che, one with cui + ' +
          'preposition, and one sentence about what you decided or managed to do (infinitive construction).',
        notes:
          'Personalize to the learner’s interests. Evaluate correctness of the three target structures; ' +
          'vocabulary accuracy is secondary here.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The three-trap summary',
        prompt:
          'State in your own words: (1) when must you put a preposition before cui? ' +
          '(2) Which connector does riuscire always take? ' +
          '(3) What gender is il problema?',
        exampleAnswer:
          '(1) Always — cui must be preceded by a preposition; if there is no preposition, use che instead. ' +
          '(2) Riuscire always takes a. ' +
          '(3) Masculine.',
      },
    ],
  },

  // ── 6 ── Scenario roleplay: buy concert/theater tickets ───────────────────
  {
    slug: 'cap14-roleplay-concerto-jazz',
    title: 'Biglietti per il concerto di jazz',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.upper_intermediate,
    summary:
      'A full theater-going scenario: book tickets by phone for a jazz concert, ask about the ' +
      'musicians performing, pick up the tickets at the box office, and discuss the show ' +
      'afterwards using relative pronouns and infinitive constructions.',
    objectiveSkillSlugs: ['it-vocab-music', 'it-vocab-theater', 'it-relative-pronouns'],
    defaultDurationMinutes: 14,
    compatibleThemes: ['music', 'culture', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Setting — il telefono e la biglietteria',
        prompt:
          'You are calling a jazz club in Bologna to reserve two tickets for Friday night. ' +
          'The club is famous for hosting international performers. ' +
          'After the call you pick up the tickets and chat with the ticket agent about the artist.',
        notes:
          'Adapt the genre to the learner’s taste: if they prefer classical or pop, ' +
          'swap the venue to an orchestral hall or a pop concert arena. Keep the vocabulary the same.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Book by phone',
        prompt:
          'Call the club: reserve two seats, ask who is playing, find out the start time, ' +
          'and confirm the total price.',
        exampleAnswer:
          'Buonasera. Vorrei prenotare due biglietti per il concerto di venerdì. ' +
          'Chi suona quella sera? A che ora comincia lo spettacolo? Quanto costano i biglietti?',
        notes:
          'Wise plays the booking agent. Reward natural question forms and any spontaneous use ' +
          'of relative pronouns (e.g., "il musicista di cui ho letto la recensione").',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Discuss the performer at the box office',
        prompt:
          'Picking up the tickets, the agent mentions the headliner. Ask two things about the ' +
          'artist using relative pronouns: one with che, one with di cui.',
        exampleAnswer:
          'È il pianista che ha vinto il premio a Berlino? / ' +
          'Sì, è proprio lui — il musicista di cui parlano tutti in questo momento.',
        notes: 'Focus on natural use of che and di cui in questions and responses.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'After the concert',
        prompt:
          'The concert is over. Tell Wise: the moment that moved you most, something you tried ' +
          'to understand but found difficult, and whether you’d recommend the show — use at ' +
          'least one infinitive construction.',
        notes:
          'Target structure sample: "Ho cercato di seguire l’improvvisazione, ma era rapidissima." ' +
          'Accept any grammatically correct infinitive construction with cercare di, riuscire a, or finire di.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Language in the wild',
        prompt:
          'Which phrase from this scenario would you keep for your next outing in Italy? ' +
          'Why does it feel useful?',
      },
    ],
  },

  // ── 7 ── Scenario roleplay: recommend music using relative clauses ─────────
  {
    slug: 'cap14-roleplay-recommend-music',
    title: 'Ti consiglio un’artista che devi assolutamente ascoltare',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.upper_intermediate,
    summary:
      'Roleplay a lively conversation where you recommend an Italian artist to a friend, ' +
      'linking descriptions with che, cui, and chi, and explaining why they should listen ' +
      'using infinitive constructions.',
    objectiveSkillSlugs: [
      'it-relative-pronouns',
      'it-chi-relative',
      'it-infinitive-constructions',
      'it-vocab-music',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['music', 'culture', 'film'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'You’re chatting with an Italian friend who wants to discover new music. ' +
          'You want to recommend an artist — Italian or international — and explain what makes them special. ' +
          'Wise plays the curious friend.',
        notes:
          'If the learner has mentioned a favorite artist in earlier sessions, prompt them to use that artist. ' +
          'Otherwise suggest a well-known Italian act: Ludovico Einaudi, Laura Pausini, or Måneskin.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Make the recommendation',
        prompt:
          'Recommend an artist: say who they are, what genre they play, and why you love them — ' +
          'using at least one relative clause with che.',
        exampleAnswer:
          'Ti consiglio Ludovico Einaudi, un pianista italiano che compone musica strumentale ' +
          'bellissima. È un artista che riesce a emozionare senza usare le parole.',
        notes:
          'Encourage the learner to personalise. Reward any correct relative clause, even simple ones.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Describe the music with cui',
        prompt:
          'Your friend asks: "In che contesto ascolti questa musica?" ' +
          'Answer using a relative clause with cui to describe a situation or place.',
        exampleAnswer:
          'È musica con cui mi rilasso la sera, oppure che ascolto nel momento in cui ho bisogno di concentrarmi.',
        notes:
          'Target: con cui (to relax with), nel momento in cui (at the moment when). ' +
          'Accept any preposition + cui construction.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Use chi to describe the audience',
        prompt:
          'Describe the kind of listener who would love this artist, using relative chi. ' +
          'Start your sentence with "Chi…"',
        exampleAnswer:
          'Chi apprezza la musica tranquilla e riflessiva adorerà questo artista. ' +
          'Chi cerca di trovare un po’ di pace nella giornata dovrebbe assolutamente ascoltarlo.',
        notes:
          'Two chi sentences targeted here. Remind: singular verb each time. ' +
          'Wise should enthusiastically agree and ask a follow-up question.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Structures used',
        prompt:
          'Look back at what you said. Identify one sentence with che, one with cui, and one with chi. ' +
          'Could you swap any che for a more formal il quale / la quale?',
      },
    ],
  },

  // ── 8 ── Listening challenge ──────────────────────────────────────────────
  {
    slug: 'cap14-listening-show-review',
    title: 'In ascolto: la recensione dello spettacolo',
    lessonType: LessonType.listening_challenge,
    level: CEFRLevel.upper_intermediate,
    summary:
      'Train your ear on a short, natural-paced Italian review of a concert or theatrical ' +
      'performance. Catch the key opinions, the vocabulary of the stage, and relative pronouns ' +
      'used in flowing journalistic Italian.',
    objectiveSkillSlugs: ['it-vocab-theater', 'it-vocab-music', 'it-relative-pronouns'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['music', 'culture', 'art', 'film'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'What to listen for',
        prompt:
          'You will hear a brief review of a performance — think of it as a short radio segment. ' +
          'Listen for: (1) the type of show being reviewed, (2) the reviewer’s overall verdict, ' +
          '(3) any relative pronouns (che / cui / chi) used. ' +
          'You may hear the clip up to three times.',
        notes:
          'Engine generates a ~60-word review script in fluent Italian including at least one ' +
          'relative clause and two theater/music vocab items. Pace: moderate (not slow learner pace). ' +
          'Example topic: a staging of Rossini’s Il barbiere di Siviglia at the Teatro Carlo Felice in Genova.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'General comprehension',
        prompt:
          'What kind of performance was reviewed, and what did the reviewer think of it overall?',
        notes:
          'Accept a paraphrase. The key is understanding the show type (opera / theater / concert) ' +
          'and sentiment (positive / mixed / negative).',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Catch the relative pronoun',
        prompt:
          'The reviewer used a relative pronoun to describe the lead performer. ' +
          'Which one did you hear: che, di cui, or con cui?',
        exampleAnswer: 'di cui',
        notes:
          'Adapt the correct answer to match whatever pronoun appears in the generated script. ' +
          'The point is active listening for grammatical structure, not just content.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Key vocabulary from the review',
        prompt:
          'Complete the summary sentence from the review: ' +
          '"Il ___ (show/performance) è durato due ore; il ___ (director) ha scelto una scenografia ' +
          'minimalista; il ___ (audience) ha tributato una standing ovation."',
        exampleAnswer: 'spettacolo; regista; pubblico',
        notes:
          'This item tests whether the learner retained key vocabulary items while focused on listening.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Listening strategy',
        prompt:
          'What listening strategy helped you catch the relative pronoun — listening for ' +
          'a preposition beforehand, or recognising che as a "connector" word between two ideas?',
      },
    ],
  },

  // ── 9 ── Speaking challenge ───────────────────────────────────────────────
  {
    slug: 'cap14-speaking-favorite-music',
    title: 'Parla di te: la tua musica preferita',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.upper_intermediate,
    summary:
      'Describe your favorite music and a performer you admire, using relative pronouns ' +
      '(che, cui, chi) to build complex, fluent sentences — a real upper-intermediate speaking task.',
    objectiveSkillSlugs: [
      'it-relative-pronouns',
      'it-chi-relative',
      'it-vocab-music',
      'it-infinitive-constructions',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['music', 'culture', 'art', 'film'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Speaking frame',
        prompt:
          'You are going to give a short, structured talk — two to three minutes in Italian — about ' +
          'your musical world. Think of it as a casual introduction to your taste that you might give ' +
          'to an Italian friend who doesn’t know you yet.',
        notes:
          'Pull any music preferences from the learner’s profile. If unknown, invite them to pick any artist or genre they like.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Introduce your genre with a relative clause',
        prompt:
          'Tell Wise which genre of music you love and describe it using a relative clause with che. ' +
          'Example structure: "Amo [genre], che è un tipo di musica che…"',
        notes:
          'Target: at least one relative clause with che. Wise should provide corrective feedback ' +
          'only on grammar errors, not on content choices.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Describe a performer using di cui',
        prompt:
          'Name a musician or band you admire and say something about them using di cui or con cui. ' +
          'Example: "È un artista di cui ho scoperto la musica per caso…" / ' +
          '"È il gruppo con cui sono cresciuto/a."',
        notes:
          'Target: preposition + cui in a natural context. Accept any grammatically correct preposition + cui.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Use chi to describe music lovers',
        prompt:
          'Describe the kind of person who would love your favourite music using a chi-relative sentence. ' +
          'Start with "Chi…" and use a singular verb.',
        exampleAnswer:
          'Chi apprezza le sonorità elettroniche e i testi poetici apprezzerà sicuramente questo artista.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assessment',
        prompt:
          'Listen back to your speaking. Did you use all three relative structures — che, cui, chi? ' +
          'Which one felt the most natural, and which still needs practice?',
        notes:
          'Wise summarises the structures it heard and gives personalised feedback on fluency and accuracy.',
      },
    ],
  },

  // ── 10 ── Vocabulary review ───────────────────────────────────────────────
  {
    slug: 'cap14-vocab-review-instruments-theater',
    title: 'Ripasso: strumenti, generi e teatro',
    lessonType: LessonType.vocabulary_review,
    level: CEFRLevel.upper_intermediate,
    summary:
      'A comprehensive vocabulary sweep of all three sub-themes: musical instruments and ' +
      'players (including -ista nouns), genres and performance events, and theater roles and ' +
      'actions.',
    objectiveSkillSlugs: ['it-vocab-music', 'it-vocab-theater', 'it-nouns-adjectives-in-a'],
    defaultDurationMinutes: 11,
    compatibleThemes: ['music', 'culture', 'art'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Three vocabulary worlds, one lesson',
        prompt:
          'This review covers: (1) instruments and the people who play them, ' +
          '(2) musical genres and events, (3) the theater — stage, roles, and reactions. ' +
          'Pay special attention to -ista nouns and the difference between article forms.',
        notes:
          'If the learner has a strong preference for one sub-theme, spend more time there ' +
          'and treat the others as recognition review.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Instruments and -ista nouns',
        prompt:
          'Choose the correct form: ' +
          '"Due ___ (violinista, women) hanno vinto il concorso." — violiniste / violinisti / violiniste / violinista. / ' +
          '"Il ___ (chitarrista, male) suona da vent’anni." — chitarrista / chitarristo / chitarristi.',
        exampleAnswer: 'violiniste; chitarrista',
        notes:
          'First item: female plural → le violiniste. Second item: male singular → il chitarrista ' +
          '(-ista stays the same in the singular regardless of gender).',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Genre and event vocabulary',
        prompt:
          'Fill in the missing word: ' +
          '"Puccini è uno dei più famosi ___ di opere italiane." (composers) / ' +
          '"Il ___ è il tipo di spettacolo in cui il testo viene cantato, non parlato." (opera/musical genre) / ' +
          '"Dopo l’ultimo atto, il ___ ha fatto una standing ovation." (audience)',
        exampleAnswer: 'compositori; melodramma (or: opera lirica); pubblico',
        notes:
          'Accept also "compositori d’opera" for the first. Il melodramma is the formal term ' +
          'for opera in Italian; accept opera lirica or opera as equally valid.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Theater roles and actions',
        prompt:
          'Match the description to the word: ' +
          '"Coordina tutto lo spettacolo, sceglie gli attori e decide la scenografia." → ___ / ' +
          '"Entra in scena e recita la parte del protagonista." → ___ / ' +
          '"Applaudire rumorosamente, di solito in piedi." → ___',
        exampleAnswer:
          'il/la regista; l’attore / l’attrice; fare una standing ovation (tributare un applauso scrosciante)',
        notes: 'Accept multiple phrasings for the last item. The key word is applaudire in piedi.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Connect vocab to personal experience',
        prompt:
          'Using at least five vocabulary items from this review, describe a concert, ' +
          'show, or music event you have attended — or one you would like to attend.',
        notes:
          'No grammar target. Free production to consolidate the new lexis. ' +
          'Wise should note each vocabulary item successfully used.',
      },
      {
        taskType: TaskType.recap,
        focus: 'High-value items',
        prompt:
          'Translate quickly into Italian: the stage, the audience, the singer-songwriter, ' +
          'the conductor, the genre, to stage a play, to applaud, the score/program.',
        exampleAnswer:
          'il palcoscenico; il pubblico; il/la cantautore/cantautrice; ' +
          'il/la direttore/direttrice d’orchestra; il genere; mettere in scena; applaudire; il programma.',
      },
    ],
  },

  // ── 11 ── Progress check ──────────────────────────────────────────────────
  {
    slug: 'cap14-progress-check',
    title: 'Verifica: la musica e il teatro',
    lessonType: LessonType.progress_check,
    level: CEFRLevel.upper_intermediate,
    summary:
      'A balanced checkpoint covering all six skills of cap-14: relative pronouns (che, cui, ' +
      'il quale), relative chi, infinitive connectors, -a masculine nouns, music vocabulary, ' +
      'and theater vocabulary.',
    objectiveSkillSlugs: [
      'it-relative-pronouns',
      'it-chi-relative',
      'it-infinitive-constructions',
      'it-nouns-adjectives-in-a',
      'it-vocab-music',
      'it-vocab-theater',
    ],
    defaultDurationMinutes: 14,
    compatibleThemes: ['music', 'culture', 'art'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Low-stakes check',
        prompt:
          'A handful of questions — one per topic — to show you and Wise where you stand ' +
          'after this chapter. No pressure: this is a map, not a grade.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Relative pronouns (che / cui / chi)',
        prompt:
          'Complete: ' +
          '"Il tenore ___ ho sentito ieri sera era magnifico." / ' +
          '"La sala ___ cui si tiene il festival è bellissima." / ' +
          '"___ arriva tardi non trova posto a sedere."',
        exampleAnswer: 'che; in; chi',
        notes:
          'Item 1: direct object → che. Item 2: tenersi in → in cui (fill the preposition). ' +
          'Item 3: relative chi + singular verb trova.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Infinitive connectors',
        prompt:
          'Choose the correct sentence: ' +
          '(a) "Ha cominciato a suonare il violino a sei anni." ' +
          '(b) "Ha cominciato di suonare il violino a sei anni."',
        exampleAnswer: '(a)',
        notes: 'Cominciare always takes a. Option (b) is the most common error.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: '-a masculine nouns',
        prompt:
          'Complete with the correct article and noun: ' +
          '"___ (the program) di domani sera comprende un’opera di Donizetti." / ' +
          '"I ___ (themes) del concerto erano ispirati alla natura."',
        exampleAnswer: 'Il programma; temi',
      },
      {
        taskType: TaskType.translation,
        focus: 'Music and theater vocabulary in context',
        prompt:
          'Translate: "The director who staged this opera chose a minimalist set, ' +
          'and the audience gave a standing ovation."',
        exampleAnswer:
          'Il regista che ha messo in scena quest’opera ha scelto una scenografia minimalista, ' +
          'e il pubblico ha tributato una standing ovation (or: ha applaudito in piedi).',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assessment',
        prompt:
          'Which topic from this chapter do you feel most confident about, and which one ' +
          'would you like to revisit before moving on?',
        notes:
          'Use the learner’s answer to flag specific recovery lessons. ' +
          'If relative pronouns are flagged, suggest cap14-drill-che-vs-cui. ' +
          'If infinitive connectors, suggest cap14-drill-infinitive-prepositions.',
      },
    ],
  },
];

export default { unitCode, lessons };
