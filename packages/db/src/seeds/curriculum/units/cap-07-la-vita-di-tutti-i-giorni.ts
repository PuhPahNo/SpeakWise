// Capitolo 7 — La vita di tutti i giorni
// Theme: everyday life & clothing (family/culture). Daily routine, getting
// dressed, reflexive and reciprocal verbs, adverb formation, and big numbers.
// Regional focus: Lombardia / Milano.
//
// All content original (copyright-safe).

import { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client';
import type { SeedUnit } from '../types';

const unit: SeedUnit = {
  code: 'cap-07',
  order: 7,
  title: 'La vita di tutti i giorni',
  subtitle: 'Your daily routine, getting dressed, and big numbers',
  theme: 'family',
  level: CEFRLevel.lower_intermediate,
  summary:
    'Walk through a full Italian day — from the alarm clock to the pillow. You’ll master reflexive verbs ' +
    'for morning routines, the reciprocal construction for keeping in touch, adverb formation to add nuance ' +
    'to what you say, and the large numbers you need for prices, years, and Italian city populations. ' +
    'Dressing well (la bella figura) ties the vocabulary strand together and opens a window into Lombard culture.',
  canDo: [
    'Describe your morning and evening routine using reflexive verbs',
    'Talk about what you and a friend do for each other using reciprocal pronouns',
    'Form adverbs from adjectives and use short adverbs naturally in speech',
    'Say prices, years, and large numbers up to the billions',
    'Name the items in your wardrobe and describe what you are wearing',
    'Talk about daily schedule and time of day in natural, connected sentences',
  ],
  culturalNotes: [
    {
      title: 'La bella figura — looking the part',
      body:
        'In Italy — and especially in Lombardia — how you present yourself carries real social weight. ' +
        'La bella figura means making a good impression not only through clothes but through posture, ' +
        'manner, and grooming. Wearing a crumpled shirt to a business meeting or mismatched colours to ' +
        'a dinner party signals indifference to the group. The concept is not vanity; it is considered ' +
        'a form of respect toward the people you are meeting.',
    },
    {
      title: 'Il ritmo della giornata italiana',
      body:
        'The Italian day follows a rhythm that still surprises many visitors. Breakfast (la colazione) is ' +
        'quick and sweet — a cornetto and a cappuccino at the bar. The big meal is pranzo (lunch), ' +
        'traditionally at home around 1 pm, often followed by a brief riposo. Shops in smaller towns ' +
        'close from roughly 1 to 3:30 pm. Cena (dinner) starts late — 8 pm is normal, 9 pm not unusual. ' +
        'Adjusting to this schedule is one of the first joys of living in Italy.',
    },
    {
      title: 'Milano: capitale della moda',
      body:
        'Milan hosts two of the world’s most watched fashion weeks each year, in February and September, ' +
        'drawing buyers and press from every continent. The Quadrilatero della Moda — the four streets ' +
        'of Via Montenapoleone, Via della Spiga, Via Sant’Andrea, and Corso Venezia — is home to the ' +
        'flagships of Armani, Versace, Prada, and dozens of other Italian and international houses. ' +
        'Even for everyday shoppers, Milan sets the tone for what "getting dressed well" looks like across Italy.',
    },
  ],

  // ─── Skills ───────────────────────────────────────────────────────────────
  skills: [
    {
      slug: 'it-reflexive-verbs',
      name: 'Reflexive verbs and pronouns',
      category: SkillCategory.grammar,
      level: CEFRLevel.lower_intermediate,
      description:
        'Reflexive verbs describe actions you do to or for yourself. They use reflexive pronouns ' +
        '(mi, ti, si, ci, vi, si) placed before the conjugated verb or attached to an infinitive. ' +
        'In the passato prossimo, reflexive verbs always take essere as the auxiliary and the past ' +
        'participle agrees with the subject in gender and number.',
      prerequisiteSlugs: ['it-regular-are-verbs-present', 'it-direct-object-pronouns'],
      examples: [
        {
          target: 'Mi sveglio alle sette.',
          native: 'I wake up at seven.',
          note: 'reflexive pronoun before the verb',
        },
        {
          target: 'Devo alzarmi presto domani.',
          native: 'I have to get up early tomorrow.',
          note: 'pronoun attaches to the infinitive after a modal',
        },
        {
          target: 'Stamattina mi sono alzata tardi.',
          native: 'This morning I got up late. (speaker is female)',
          note: 'essere auxiliary + agreement: alzata, not alzato',
        },
        {
          target: 'I bambini si sono vestiti da soli.',
          native: 'The children got dressed by themselves.',
          note: 'plural masculine agreement: vestiti',
        },
      ],
      commonMistakes: [
        'placing the reflexive pronoun after the conjugated verb (mi alzo, never alzo mi)',
        'using avere instead of essere in the passato prossimo (mi sono alzato, not ho alzato)',
        'forgetting participle agreement — mi sono alzato (m.) vs mi sono alzata (f.)',
        'attaching the pronoun to a conjugated form rather than an infinitive (devo alzarmi, not mi devo alzare — both are valid, but learners often misplace it)',
      ],
      recommendedPracticeTypes: [
        TaskType.conjugation,
        TaskType.fill_blank,
        TaskType.pronoun_replacement,
        TaskType.translation,
      ],
      compatibleThemes: ['family', 'culture', 'sports', 'travel'],
      teachingNotes:
        'Lead with the morning routine as a natural story arc — alarm, shower, breakfast, door — so each ' +
        'reflexive verb has an obvious slot. Drill the essere passato prossimo separately from the present ' +
        'to avoid conflating the two patterns. Immediately contrast mi alzo (present) with mi sono alzato/a ' +
        '(past) to make agreement feel urgent and meaningful.',
    },
    {
      slug: 'it-reciprocal-construction',
      name: 'Reciprocal verbs — "each other"',
      category: SkillCategory.grammar,
      level: CEFRLevel.lower_intermediate,
      description:
        'Italian expresses "each other" by using the plural reflexive pronouns ci (noi), vi (voi), and si ' +
        '(loro) with a verb in the plural. The meaning shifts from reflexive to reciprocal by context and ' +
        'number. In the passato prossimo, reciprocal verbs also take essere and the participle agrees ' +
        'with the subject.',
      prerequisiteSlugs: ['it-reflexive-verbs'],
      examples: [
        {
          target: 'Ci vediamo ogni lunedì.',
          native: 'We see each other every Monday.',
        },
        {
          target: 'Si amano da trent’anni.',
          native: 'They have loved each other for thirty years.',
        },
        {
          target: 'Vi scrivete spesso?',
          native: 'Do you two write to each other often?',
        },
        {
          target: 'Ci siamo conosciuti a Milano.',
          native: 'We met (got to know) each other in Milan.',
          note: 'essere auxiliary: conosciuti agrees with noi (mixed or masc.)',
        },
      ],
      commonMistakes: [
        'using avere instead of essere in the past (ci siamo visti, not abbiamo visto)',
        'confusing reflexive (si lava — he washes himself) and reciprocal (si lavano — they wash each other) when number is ambiguous',
        'forgetting agreement in the past (ci siamo viste if two women, ci siamo visti if mixed)',
      ],
      recommendedPracticeTypes: [
        TaskType.translation,
        TaskType.fill_blank,
        TaskType.error_correction,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['family', 'culture', 'travel'],
      teachingNotes:
        'Ground this in real relationship vocabulary — friends who text, couples who meet, colleagues who ' +
        'know each other — so the reciprocal meaning stays concrete. Contrast single-person reflexive (si ' +
        'alza) with reciprocal plural (si alzano tardi entrambi) so learners see the structural overlap. ' +
        'Ci vediamo! also works as a natural farewell phrase.',
    },
    {
      slug: 'it-adverbs',
      name: 'Adverb formation and common adverbs',
      category: SkillCategory.grammar,
      level: CEFRLevel.lower_intermediate,
      description:
        'Most Italian adverbs are formed from the feminine singular adjective plus -mente: lenta → ' +
        'lentamente, vera → veramente. Adjectives ending in -le or -re drop the final -e before ' +
        '-mente: facile → facilmente, regolare → regolarmente. A rich set of common adverbs has no ' +
        '-mente form: bene, male, spesso, sempre, mai, già, ancora, molto, poco, troppo. Adverbs ' +
        'usually follow the verb they modify.',
      prerequisiteSlugs: ['it-adjectives-agreement'],
      examples: [
        {
          target: 'Parla lentamente, per favore.',
          native: 'Please speak slowly.',
          note: 'lento → lenta → lentamente',
        },
        {
          target: 'Vai al lavoro regolarmente?',
          native: 'Do you go to work regularly?',
          note: 'regolare drops -e → regolarmente',
        },
        {
          target: 'Mangio sempre tardi la sera.',
          native: 'I always eat late in the evening.',
          note: 'sempre: no -mente form needed',
        },
        {
          target: 'Parli italiano molto bene!',
          native: 'You speak Italian very well!',
          note: 'molto + bene — two adverbs stacked',
        },
      ],
      commonMistakes: [
        'using the masculine adjective base (lento + mente → "lentamente" is correct, but learners write "lentomente")',
        'forgetting to drop -e before -mente for -le/-re adjectives (facilmente, not "facilemente")',
        'placing the adverb before the verb in imitation of English ("sempre io mangio" instead of "mangio sempre")',
        'confusing molto (adverb: very) with molto (adjective: much/many) — only the adverb is invariable',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.error_correction,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['family', 'culture', 'sports', 'business'],
      teachingNotes:
        'The -mente rule is highly productive; teach it as a "suffix you can stick on any feminine adjective." ' +
        'Contrast the three patterns (regular, -le/-re drop, irregular) with three well-known examples and let ' +
        'learners generate from there. The common short adverbs (spesso, sempre, già, ancora, mai) need ' +
        'memorization — anchor them to routine sentences so they feel natural at once.',
    },
    {
      slug: 'it-numbers-above-100',
      name: 'Numbers above 100 (cento, mille, milioni)',
      category: SkillCategory.grammar,
      level: CEFRLevel.lower_intermediate,
      description:
        'From one hundred to one billion: cento (100) needs no article; duecento, trecento… up to ' +
        'novecento (900). Mille (1 000) becomes mila in the plural (duemila, tremila). Un milione (1 000 000) ' +
        'takes di before a noun; un miliardo (1 000 000 000) works the same way. Use for years, prices, ' +
        'salaries, and Italian city populations.',
      prerequisiteSlugs: ['it-vocab-numbers-1-100'],
      examples: [
        {
          target: 'Questo cappotto costa trecentocinquanta euro.',
          native: 'This coat costs three hundred and fifty euros.',
          note: 'cento compounds written as one word',
        },
        {
          target: 'Milano ha circa un milione e quattrocentomila abitanti.',
          native: 'Milan has about 1,400,000 inhabitants.',
          note: 'milione + di before the noun',
        },
        {
          target: 'Sono nata nel millenovecentonovantadue.',
          native: 'I was born in 1992.',
          note: 'years read as a continuous number',
        },
        {
          target: 'Duemila ventinove',
          native: '2029',
          note: 'mille → mila in duemila; modern years',
        },
      ],
      commonMistakes: [
        'saying "un cento" — cento never takes an article (just cento, not "un cento")',
        'using mila as singular (it is mille for 1 000, mila only in plurals: duemila, tremila)',
        'forgetting di between milione/miliardo and the noun (un milione di euro, not "un milione euro")',
        'reading years digit by digit the English way instead of as a full number (millenovecentoottanta, not "uno-nove-otto-zero")',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.listening_comprehension,
        TaskType.speaking_prompt,
        TaskType.multiple_choice,
      ],
      compatibleThemes: ['business', 'travel', 'history', 'culture'],
      teachingNotes:
        'Anchor every tier to a real-life context: hundreds for clothing prices, thousands for rents and salaries, ' +
        'millions for populations (Roma: quasi tre milioni), years for talking about history and birth years. ' +
        'The cento rule (no article), the mille/mila split, and the milione di + noun phrase are the three ' +
        'productive drills — keep examples concrete and personally relevant.',
    },
    {
      slug: 'it-vocab-daily-routine',
      name: 'Daily routine vocabulary (la routine quotidiana)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.lower_intermediate,
      description:
        'The verbs and time expressions that describe a full day from waking up to falling asleep, ' +
        'combined with the common time-of-day markers: la mattina, il pomeriggio, la sera, di solito, ' +
        'presto, tardi.',
      prerequisiteSlugs: ['it-reflexive-verbs'],
      examples: [
        {
          target: 'Di solito mi faccio la doccia la mattina.',
          native: 'I usually take a shower in the morning.',
        },
        {
          target: 'Dopo cena mi riposo un po’ sul divano.',
          native: 'After dinner I rest a bit on the sofa.',
        },
        {
          target: 'Si addormenta sempre tardi.',
          native: 'He/she always falls asleep late.',
        },
      ],
      commonMistakes: [
        'confusing fare colazione (to have breakfast) with fare la colazione (perfectly fine) and "mangiare la colazione" (rare, slightly unnatural)',
        'translating "in the morning" as "nella mattina" — Italian prefers la mattina or di mattina',
        'using dormire (to sleep) where addormentarsi (to fall asleep) is needed',
      ],
      recommendedPracticeTypes: [TaskType.speaking_prompt, TaskType.fill_blank, TaskType.roleplay],
      compatibleThemes: ['family', 'culture', 'sports'],
      teachingNotes:
        'Have the learner narrate their own real morning as the primary production exercise — pulling in ' +
        'reflexive verb forms and time markers in one go. The di solito + present is the backbone structure; ' +
        'once it is fluent, layer in the passato prossimo to shift to "what happened this morning."',
    },
    {
      slug: 'it-vocab-clothing',
      name: 'Clothing vocabulary (l’abbigliamento)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.lower_intermediate,
      description:
        'Essential clothes and accessories, plus the two verbs for wearing: indossare (to wear, neutral) ' +
        'and portare (to wear / carry, very common). The reflexive mettersi is used for putting something ' +
        'on (mi metto la giacca).',
      prerequisiteSlugs: ['it-noun-gender', 'it-reflexive-verbs'],
      examples: [
        {
          target: 'Indosso sempre jeans e una maglia al lavoro.',
          native: 'I always wear jeans and a sweater to work.',
        },
        {
          target: 'Si mette il cappotto perché fa freddo.',
          native: 'He/she puts on a coat because it’s cold.',
          note: 'mettersi = to put on (reflexive)',
        },
        {
          target: 'Porta una cravatta only per le occasioni formali.',
          native: 'He wears a tie only for formal occasions.',
        },
      ],
      commonMistakes: [
        'using vestire transitive (veste la giacca) instead of indossare/portare or the reflexive vestirsi',
        'confusing la maglia (T-shirt / jersey) with il maglione (thick sweater / jumper)',
        'saying "mettere" without the reflexive for "put on clothes" — it is mettersi (mi metto, not metto la giacca)',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.speaking_prompt,
        TaskType.fill_blank,
        TaskType.roleplay,
      ],
      compatibleThemes: ['family', 'culture', 'travel', 'business'],
      teachingNotes:
        'Pair every clothing item with a context (weather, formality, occasion) so learners encode use as well ' +
        'as label. The indossare / portare / mettersi triad is the main conceptual work — contrast them with ' +
        'three short target sentences. Fashion-interested learners can extend with Milan brand names as ' +
        'cultural colour.',
    },
  ],

  // ─── Lesson templates ─────────────────────────────────────────────────────
  lessonTemplates: [
    {
      slug: 'cap07-morning-routine',
      title: 'Raccontami la tua mattina',
      lessonType: LessonType.grammar,
      level: CEFRLevel.lower_intermediate,
      summary:
        'Build a reflexive-verb story arc from the alarm to leaving the house — present tense first, then ' +
        'shift to the passato prossimo to narrate this morning with essere and participle agreement.',
      objectiveSkillSlugs: ['it-reflexive-verbs', 'it-vocab-daily-routine'],
      defaultDurationMinutes: 12,
      compatibleThemes: ['family', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Set the stage',
          prompt:
            'Today you’ll describe a full morning routine in Italian — first as a habit, then as something that happened today.',
          notes:
            'Keep this warm and personal. Mention a detail from the learner’s profile (early riser, student, commuter) to prime relevant vocabulary.',
        },
        {
          taskType: TaskType.explanation,
          focus: 'Reflexive pronouns: before vs attached',
          prompt:
            'Mi alzo alle sette. / Devo alzarmi presto. — the pronoun moves when an infinitive follows a modal.',
          notes: 'Two side-by-side examples, one present conjugation and one modal + infinitive.',
        },
        {
          taskType: TaskType.conjugation,
          focus: 'Reflexive paradigm for svegliarsi',
          prompt: 'Give all six present-tense forms of svegliarsi.',
          exampleAnswer:
            'mi sveglio, ti svegli, si sveglia, ci svegliamo, vi svegliate, si svegliano',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Passato prossimo with essere + agreement',
          prompt: 'Complete: "Stamattina Maria ___ (alzarsi) tardi e ___ (vestirsi) in fretta."',
          exampleAnswer: 'si è alzata, si è vestita',
          notes:
            'Target feminine subject agreement. If the learner profile is male, engine should also offer a male-subject variant.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Narrate your own morning',
          prompt: 'Describe what you did this morning, using at least three reflexive verbs.',
          notes:
            'Pull from the learner’s real schedule. Wise should prompt: "A che ora ti sei svegliato/a?"',
        },
        {
          taskType: TaskType.recap,
          focus: 'Lock in essere + agreement',
          prompt: 'Why do reflexive verbs use essere, not avere, in the past?',
        },
      ],
    },
    {
      slug: 'cap07-keeping-in-touch',
      title: 'Come ti tieni in contatto?',
      lessonType: LessonType.speaking_challenge,
      level: CEFRLevel.lower_intermediate,
      summary:
        'Shift from "I do" to "we do for each other": reciprocal constructions for seeing, texting, and ' +
        'knowing each other — with the passato prossimo to say when things started.',
      objectiveSkillSlugs: ['it-reciprocal-construction', 'it-reflexive-verbs'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['family', 'culture', 'travel'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'From reflexive to reciprocal',
          prompt:
            'Si alza (reflexive) vs si alzano insieme (could be reflexive OR reciprocal). Number alone is not always enough — context and verb semantics decide.',
          notes:
            'Use a clear reciprocal verb (vedersi, scriversi, conoscersi) to avoid ambiguity at first.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Translate reciprocal sentences',
          prompt: '"We text each other every day." / "They have known each other since childhood."',
          exampleAnswer: 'Ci scriviamo ogni giorno. / Si conoscono dall’infanzia.',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Essere in the past',
          prompt: 'Fix: "Ci abbiamo visti ieri sera al cinema."',
          exampleAnswer: 'Ci siamo visti ieri sera al cinema.',
          notes: 'Reciprocal past needs essere, not avere.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Talk about a real relationship',
          prompt:
            'Tell me about a friend or family member: how do you two keep in touch, and how did you first meet?',
          notes:
            'Engine should invite the learner to use ci vediamo / ci scriviamo / ci siamo conosciuti. Personalize to whether the learner has mentioned family or friends in their profile.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Ci vediamo! as a farewell',
          prompt: 'How can you use "ci vediamo" as a natural way to say goodbye?',
        },
      ],
    },
    {
      slug: 'cap07-speaking-fluently',
      title: 'Parla più naturalmente',
      lessonType: LessonType.grammar,
      level: CEFRLevel.lower_intermediate,
      summary:
        'Adverb formation and the short-adverb toolkit — turning adjectives into -mente words and ' +
        'weaving sempre, spesso, già, ancora, and mai into the sentences you already know.',
      objectiveSkillSlugs: ['it-adverbs'],
      defaultDurationMinutes: 9,
      compatibleThemes: ['family', 'culture', 'sports', 'business'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'The -mente rule in three steps',
          prompt:
            'Step 1 — take the feminine adjective. Step 2 — add -mente. Step 3 — if the adjective ends in -le or -re, drop the final -e first.',
          notes:
            'Rapid-fire three examples: lento→lenta→lentamente / regolare→regolarmente / facile→facilmente.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Generate adverbs from adjectives',
          prompt: 'Form the adverb from: veloce, tranquillo, gentile, probabile.',
          exampleAnswer: 'velocemente, tranquillamente, gentilmente, probabilmente',
        },
        {
          taskType: TaskType.translation,
          focus: 'Short adverbs in context',
          prompt:
            '"I always wake up early." / "Have you already eaten?" / "She has never been to Milan."',
          exampleAnswer:
            'Mi sveglio sempre presto. / Hai già mangiato? / Non è mai stata a Milano.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Add adverbs to your own sentences',
          prompt:
            'Describe your daily routine again — this time add at least two adverbs to make it sound more natural.',
          notes:
            'Encourage spesso, di solito (already known), sempre, and at least one -mente form. Wise should model: “Invece di dire ‘mi sveglio tardi,’ prova ‘mi sveglio spesso tardi.’”',
        },
        {
          taskType: TaskType.recap,
          focus: 'The -le/-re drop',
          prompt: 'Why is it "facilmente" and not "facilemente"?',
        },
      ],
    },
    {
      slug: 'cap07-dressed-for-the-occasion',
      title: 'Vestirsi per l’occasione',
      lessonType: LessonType.vocabulary_review,
      level: CEFRLevel.lower_intermediate,
      summary:
        'Name what’s in your wardrobe, choose an outfit for a specific situation, and use indossare / ' +
        'portare / mettersi correctly — framed around the concept of la bella figura.',
      objectiveSkillSlugs: ['it-vocab-clothing', 'it-reflexive-verbs'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['family', 'culture', 'business', 'travel'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'La bella figura',
          prompt:
            'In Italy what you wear tells people something about who you are. Today you’ll talk about clothes — and when to wear what.',
          notes:
            'Light cultural hook, 1–2 sentences. Connect to the Milan cultural note if this is the learner’s first time hearing it.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'indossare vs portare vs mettersi',
          prompt: 'You’re heading out into the cold. Which sentence is most natural?',
          exampleAnswer: 'Mi metto il cappotto.',
          notes:
            'Options: "Indosso il cappotto." / "Mi metto il cappotto." / "Vesto il cappotto." First two are correct (mark both); third is wrong — explain why.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Gender on clothing nouns',
          prompt:
            'Insert the correct definite article: ___ gonna, ___ pantaloni, ___ stivali, ___ cravatta.',
          exampleAnswer: 'la gonna, i pantaloni, gli stivali, la cravatta',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Describe an outfit',
          prompt:
            'Describe what you are wearing right now, or what you would wear for a dinner in Milan.',
          notes:
            'Personalize: if the learner’s interest is business, prompt a work outfit; if casual, a weekend look.',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'Shopping scenario',
          prompt:
            'You’re in a boutique in the Quadrilatero della Moda. Ask about a price, say what you’d like to try on, and decide whether to buy.',
          exampleAnswer: 'Quanto costa questa giacca? — Posso provarla? — La prendo, grazie.',
          notes: 'Tie in the numbers-above-100 skill for the price.',
        },
      ],
    },
    {
      slug: 'cap07-big-numbers',
      title: 'Prezzi, anni, e popolazioni',
      lessonType: LessonType.vocabulary_review,
      level: CEFRLevel.lower_intermediate,
      summary:
        'Put big numbers to work: price tags in a Milanese boutique, birth years, historical dates, ' +
        'and Italian city populations — mastering cento, mille/mila, and milione di.',
      objectiveSkillSlugs: ['it-numbers-above-100'],
      defaultDurationMinutes: 8,
      compatibleThemes: ['culture', 'history', 'business', 'travel'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Three tiers: hundreds, thousands, millions',
          prompt:
            'Cento needs no article. Mille → mila in compounds. Milione always takes di before the noun.',
          notes: 'One clear example per tier. Avoid information overload — just the three rules.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Write prices in words',
          prompt: 'A jacket costs €485. A pair of shoes costs €1 200. Write both in Italian words.',
          exampleAnswer: 'quattrocentottantacinque euro; milleduecenteuro',
          notes: 'Accept "milleduecento euro" — confirm both spellings.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'mille vs mila vs milione',
          prompt: 'The population of Torino is about 870 000. How do you say this?',
          exampleAnswer: 'ottocentosettantamila',
          notes:
            'Three options: ottocentosettantamila / ottocentosettanta mille / ottocentosettanta milioni.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Say your birth year',
          prompt:
            'Say the year you were born and one other year that matters to you (a trip, a milestone) — in full Italian numbers.',
          notes: 'Use the learner’s birth year from profile if available; otherwise prompt them.',
        },
        {
          taskType: TaskType.recap,
          focus: 'The milione di rule',
          prompt: 'How do you say "two million inhabitants" — and where does the di go?',
        },
      ],
    },
  ],

  // ─── Thematic vocabulary bank ─────────────────────────────────────────────
  vocabulary: [
    // ── Daily routine ─────────────────────────────────────────────────────
    {
      slug: 'cap07-svegliarsi',
      targetText: 'svegliarsi',
      nativeText: 'to wake up',
      partOfSpeech: 'verb',
      theme: 'routine',
      exampleSentence: 'Mi sveglio sempre alle sette.',
      exampleTranslation: 'I always wake up at seven.',
    },
    {
      slug: 'cap07-alzarsi',
      targetText: 'alzarsi',
      nativeText: 'to get up',
      partOfSpeech: 'verb',
      theme: 'routine',
      exampleSentence: 'Si è alzato tardi stamattina.',
      exampleTranslation: 'He got up late this morning.',
    },
    {
      slug: 'cap07-farsi-la-doccia',
      targetText: 'farsi la doccia',
      nativeText: 'to take a shower',
      partOfSpeech: 'phrase',
      theme: 'routine',
      exampleSentence: 'Mi faccio la doccia ogni mattina.',
      exampleTranslation: 'I take a shower every morning.',
    },
    {
      slug: 'cap07-lavarsi-i-denti',
      targetText: 'lavarsi i denti',
      nativeText: 'to brush one’s teeth',
      partOfSpeech: 'phrase',
      theme: 'routine',
    },
    {
      slug: 'cap07-vestirsi',
      targetText: 'vestirsi',
      nativeText: 'to get dressed',
      partOfSpeech: 'verb',
      theme: 'routine',
      exampleSentence: 'Si veste in fretta per non fare tardi.',
      exampleTranslation: 'She gets dressed quickly so as not to be late.',
    },
    {
      slug: 'cap07-fare-colazione',
      targetText: 'fare colazione',
      nativeText: 'to have breakfast',
      partOfSpeech: 'phrase',
      theme: 'routine',
      exampleSentence: 'Facciamo colazione al bar ogni mattina.',
      exampleTranslation: 'We have breakfast at the café every morning.',
    },
    {
      slug: 'cap07-tornare-a-casa',
      targetText: 'tornare a casa',
      nativeText: 'to come / go back home',
      partOfSpeech: 'phrase',
      theme: 'routine',
      exampleSentence: 'Torna a casa verso le sette di sera.',
      exampleTranslation: 'He gets back home around seven in the evening.',
    },
    {
      slug: 'cap07-cenare',
      targetText: 'cenare',
      nativeText: 'to have dinner',
      partOfSpeech: 'verb',
      theme: 'routine',
      exampleSentence: 'In Italia si cena tardi, spesso alle otto o alle nove.',
      exampleTranslation: 'In Italy they eat dinner late, often at eight or nine.',
    },
    {
      slug: 'cap07-riposarsi',
      targetText: 'riposarsi',
      nativeText: 'to rest / take a break',
      partOfSpeech: 'verb',
      theme: 'routine',
    },
    {
      slug: 'cap07-addormentarsi',
      targetText: 'addormentarsi',
      nativeText: 'to fall asleep',
      partOfSpeech: 'verb',
      theme: 'routine',
      exampleSentence: 'Mi addormento sempre sul divano dopo cena.',
      exampleTranslation: 'I always fall asleep on the sofa after dinner.',
    },
    {
      slug: 'cap07-la-mattina',
      targetText: 'la mattina',
      nativeText: 'the morning',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'routine',
    },
    {
      slug: 'cap07-la-sera',
      targetText: 'la sera',
      nativeText: 'the evening',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'routine',
    },
    {
      slug: 'cap07-di-solito',
      targetText: 'di solito',
      nativeText: 'usually',
      partOfSpeech: 'adv',
      theme: 'routine',
      exampleSentence: 'Di solito esco di casa alle otto.',
      exampleTranslation: 'I usually leave the house at eight.',
    },
    // ── Clothing ─────────────────────────────────────────────────────────
    {
      slug: 'cap07-i-vestiti',
      targetText: 'i vestiti / l’abbigliamento',
      nativeText: 'clothes / clothing',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'abbigliamento',
    },
    {
      slug: 'cap07-la-camicia',
      targetText: 'la camicia',
      nativeText: 'the shirt (button-up)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'abbigliamento',
      exampleSentence: 'Porta sempre una camicia bianca al lavoro.',
      exampleTranslation: 'He always wears a white shirt to work.',
    },
    {
      slug: 'cap07-la-maglia',
      targetText: 'la maglia',
      nativeText: 'the T-shirt / jersey',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'abbigliamento',
    },
    {
      slug: 'cap07-il-maglione',
      targetText: 'il maglione',
      nativeText: 'the sweater / jumper',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'abbigliamento',
      exampleSentence: 'D’inverno indosso sempre un maglione di lana.',
      exampleTranslation: 'In winter I always wear a wool sweater.',
    },
    {
      slug: 'cap07-i-pantaloni',
      targetText: 'i pantaloni',
      nativeText: 'the trousers / pants',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'abbigliamento',
    },
    {
      slug: 'cap07-la-gonna',
      targetText: 'la gonna',
      nativeText: 'the skirt',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'abbigliamento',
    },
    {
      slug: 'cap07-il-vestito',
      targetText: 'il vestito',
      nativeText: 'the dress / suit',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'abbigliamento',
      exampleSentence: 'Ha indossato un vestito elegante per la cerimonia.',
      exampleTranslation: 'She wore an elegant dress for the ceremony.',
    },
    {
      slug: 'cap07-le-scarpe',
      targetText: 'le scarpe',
      nativeText: 'the shoes',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'abbigliamento',
    },
    {
      slug: 'cap07-gli-stivali',
      targetText: 'gli stivali',
      nativeText: 'the boots',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'abbigliamento',
    },
    {
      slug: 'cap07-la-giacca',
      targetText: 'la giacca',
      nativeText: 'the jacket / blazer',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'abbigliamento',
      exampleSentence: 'Mi metto la giacca perché fuori fa fresco.',
      exampleTranslation: 'I put on my jacket because it’s cool outside.',
    },
    {
      slug: 'cap07-il-cappotto',
      targetText: 'il cappotto',
      nativeText: 'the overcoat',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'abbigliamento',
    },
    {
      slug: 'cap07-la-cravatta',
      targetText: 'la cravatta',
      nativeText: 'the tie',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'abbigliamento',
    },
    {
      slug: 'cap07-la-sciarpa',
      targetText: 'la sciarpa',
      nativeText: 'the scarf',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'abbigliamento',
      exampleSentence: 'A Milano d’inverno tutti portano la sciarpa.',
      exampleTranslation: 'In Milan in winter everyone wears a scarf.',
    },
    {
      slug: 'cap07-indossare',
      targetText: 'indossare / portare',
      nativeText: 'to wear',
      partOfSpeech: 'verb',
      theme: 'abbigliamento',
    },
    {
      slug: 'cap07-mettersi',
      targetText: 'mettersi',
      nativeText: 'to put on (clothing)',
      partOfSpeech: 'verb',
      theme: 'abbigliamento',
      exampleSentence: 'Non dimenticate di mettervi il cappotto!',
      exampleTranslation: 'Don’t forget to put on your coats!',
    },
  ],
};

export default unit;
