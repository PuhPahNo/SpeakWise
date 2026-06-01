// Capitolo 9 — Sentirsi bene
// Theme: the body and health (culture). Body-part vocabulary, describing
// symptoms, and the grammar of comparison — comparatives, superlatives, and
// the stressed pronouns that comparisons demand.
//
// All content original (copyright-safe).

import { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client';
import type { SeedUnit } from '../types';

const unit: SeedUnit = {
  code: 'cap-09',
  order: 9,
  title: 'Sentirsi bene',
  subtitle: 'The body, health, and making comparisons',
  theme: 'culture',
  level: CEFRLevel.intermediate,
  summary:
    'Learn to name every part of the body, describe aches and illnesses at a pharmacy or doctor' +
    '’s office, and compare people, places, and things with confidence. Along the way you acquire ' +
    'the stressed pronouns that power comparisons, the full comparative and superlative system, and ' +
    'the irregular forms — migliore, peggiore, maggiore, minore — that distinguish elegant Italian ' +
    'from textbook Italian.',
  canDo: [
    'Name the major parts of the body and flag the irregular plurals (le braccia, le mani)',
    'Describe common symptoms and illnesses when visiting a pharmacy or doctor',
    'Compare two people, places, or things using più … di, meno … di, and più … che',
    'Express equality with (così) … come and (tanto) … quanto',
    'Form the superlativo relativo (il più … di) and superlativo assoluto (-issimo / molto)',
    'Use the irregular comparative and superlative forms: migliore, peggiore, maggiore, minore',
  ],
  culturalNotes: [
    {
      title: 'La farmacia: the green cross and front-line healthcare',
      body:
        'In Italy the farmacia (pharmacy) is identified by an illuminated green cross and plays a ' +
        'role far beyond dispensing prescriptions. Pharmacists routinely assess minor ailments, ' +
        'recommend over-the-counter treatments, and advise on dosage — acting as an accessible ' +
        'first point of medical contact. Outside normal hours, a rotating on-call pharmacy ' +
        '(farmacia di turno) must stay open, and its address is posted on the door of every ' +
        'closed pharmacy nearby. For urgent after-hours advice, the guardia medica (out-of-hours ' +
        'GP service) is available by phone or in person at no cost to residents.',
    },
    {
      title: 'Il SSN and the Italian public health system',
      body:
        'Italy' +
        '’s Servizio Sanitario Nazionale (SSN) provides universal public healthcare funded by ' +
        'taxation. Every resident registers with a medico di base (GP), who issues referrals and ' +
        'prescriptions — la ricetta — for subsidised medicines. A prescription medicine carries a ' +
        'small co-payment (il ticket), while many preventive services and GP visits are free. The ' +
        'system varies somewhat by region: northern regions like Emilia-Romagna and Lombardia ' +
        'consistently rank among Europe' +
        '’s highest-performing, while some southern regions face longer ' +
        'waiting lists. Tourists and EU citizens with a valid EHIC card are entitled to emergency ' +
        'treatment under the same terms as residents.',
    },
    {
      title: 'Le erboristerie and the tradition of natural remedies',
      body:
        'Alongside the farmacia you will find the erboristeria, a herbalist shop stocked with ' +
        'tisane (herbal teas), essential oils, plant-based supplements, and natural cosmetics. ' +
        'Italians have a long tradition of turning to camomilla for sleep, zenzero e limone for ' +
        'colds, and echinacea for immunity. The erboristeria is not a fringe curiosity: it sits ' +
        'on the high street next to the pharmacy, and many Italians use both. Le Marche — the ' +
        'region explored in this chapter — has a particularly strong herbal tradition, with the ' +
        'Sibillini mountain foothills producing wild-harvested medicinal plants used in local ' +
        'remedies for centuries.',
    },
  ],

  // ─── Skills ───────────────────────────────────────────────────────────────
  skills: [
    {
      slug: 'it-vocab-body',
      name: 'The body (il corpo)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.intermediate,
      description:
        'Names for the main parts of the body, from head to toe. Pay close attention to the ' +
        'two common irregular plurals: il braccio → le braccia and la mano → le mani.',
      prerequisiteSlugs: ['it-noun-gender', 'it-noun-plurals'],
      examples: [
        {
          target: 'Mi fa male la schiena.',
          native: 'My back hurts.',
          note: 'fare male + the body part (indirect construction)',
        },
        {
          target: 'Ha le braccia molto forti.',
          native: 'He has very strong arms.',
          note: 'le braccia — irregular plural of il braccio',
        },
        {
          target: 'Si è lavata le mani prima di mangiare.',
          native: 'She washed her hands before eating.',
          note: 'le mani — irregular plural of la mano',
        },
      ],
      commonMistakes: [
        'making the braccia plural with -i the regular way: "i bracci" is a different word (branches/arms of a structure)',
        'treating mano as a regular -o masculine and writing "i mani" — it is feminine with the plural le mani',
        'forgetting that body parts in Italian often take the definite article, not a possessive: "mi fa male la testa", not "mia testa fa male"',
        'confusing la bocca (mouth) with le labbra (lips) — both are needed and both have irregular plurals',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.fill_blank,
        TaskType.speaking_prompt,
        TaskType.roleplay,
      ],
      compatibleThemes: ['family', 'sports', 'culture', 'health'],
      teachingNotes:
        'Anchor the two irregular plurals — le braccia and le mani — immediately, since they ' +
        'appear in every health and sport context. Teach the fare male + definite article ' +
        'construction alongside the vocabulary; it is far more natural than "ho dolore a". ' +
        'Personalize to athletes: a footballer' +
        '’s ginocchio, a swimmer' +
        '’s spalle.',
    },
    {
      slug: 'it-vocab-health',
      name: 'Health and illness (la salute)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.intermediate,
      description:
        'Vocabulary for feeling well and unwell: describing symptoms to a doctor or pharmacist, ' +
        'naming common illnesses, and understanding what a prescription entails.',
      prerequisiteSlugs: ['it-reflexive-verbs', 'it-vocab-body'],
      examples: [
        {
          target: 'Mi sento male da due giorni — ho la febbre e mal di gola.',
          native: 'I' + '’ve been feeling ill for two days — I have a fever and a sore throat.',
          note: 'sentirsi male + mal di + body part',
        },
        {
          target: 'Il dottore mi ha dato la ricetta per la medicina.',
          native: 'The doctor gave me a prescription for the medicine.',
        },
        {
          target: 'Mi sono ammalata la settimana scorsa ma ora sto guarendo.',
          native: 'I fell ill last week but now I' + '’m recovering.',
          note: 'ammalarsi (to fall ill) and guarire (to recover) — reflexive and -ire verb',
        },
      ],
      commonMistakes: [
        'saying "ho male" instead of the correct "mi fa male" or "ho mal di…" for localized pain',
        'confusing il raffreddore (a cold) with l' +
          '’influenza (flu) — they are distinct illnesses with different severity',
        'using "dottore" for any healthcare worker — il farmacista is the pharmacist, il dottore or il medico is the doctor',
        'omitting the definite article: "ho febbre" is informal; "ho la febbre" is standard',
      ],
      recommendedPracticeTypes: [
        TaskType.roleplay,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['culture', 'family', 'travel'],
      teachingNotes:
        'Teach vocabulary in the context of the farmacia visit (see lesson template) so items ' +
        'are immediately actionable. The mal di testa / gola / stomaco pattern is generative — ' +
        'once learners know it they can describe almost any pain. Contrast il raffreddore ' +
        '(cold, 7-day duration) with l' +
        '’influenza (flu, more severe) because English speakers collapse them.',
    },
    {
      slug: 'it-stressed-pronouns',
      name: 'Stressed pronouns (pronomi tonici)',
      category: SkillCategory.grammar,
      level: CEFRLevel.intermediate,
      description:
        'After a preposition, for contrast or emphasis, and in comparisons, Italian uses a ' +
        'special set of pronouns — the pronomi tonici: me, te, lui/lei, sé, noi, voi, loro. ' +
        'These replace the unstressed object pronouns (mi, ti, lo…) whenever the pronoun ' +
        'follows a preposition or needs to be stressed.',
      prerequisiteSlugs: ['it-direct-object-pronouns', 'it-indirect-object-pronouns'],
      examples: [
        {
          target: 'Questo pacco è per te, non per me.',
          native: 'This package is for you, not for me.',
          note: 'after preposition per — use tonic me/te, not mi/ti',
        },
        {
          target: 'Secondo lui, Ancona è più bella di Pesaro.',
          native: 'According to him, Ancona is more beautiful than Pesaro.',
          note: 'secondo + tonic pronoun',
        },
        {
          target: 'Piace a me, non a lei!',
          native: 'I like it, not her! (lit. It is pleasing to me, not to her)',
          note: 'tonic for contrastive emphasis with piacere',
        },
        {
          target: 'È più alto di me.',
          native: 'He is taller than me.',
          note: 'comparison with di + tonic pronoun',
        },
        {
          target: 'Ha fatto tutto da sé.',
          native: 'She did everything by herself.',
          note: 'sé = reflexive tonic pronoun (3rd person, self-reference)',
        },
      ],
      commonMistakes: [
        'using the subject pronouns io/tu after prepositions ("per io" → per me; "con tu" → con te)',
        'forgetting sé for the third-person reflexive and writing "da lui" when "da sé" is meant',
        'using unstressed mi/ti/gli after a preposition — after a preposition it must be me/te/lui',
        'omitting the accent on sé when writing — without it, se means "if"',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.pronoun_replacement,
        TaskType.error_correction,
        TaskType.translation,
      ],
      compatibleThemes: ['sports', 'family', 'culture', 'travel'],
      teachingNotes:
        'Lead with the preposition trigger: "after any preposition, switch to me/te/lui/lei/' +
        'noi/voi/loro." The comparison use (più … di me) is the most frequent context at this ' +
        'level, so drill it heavily. Sé is worth a dedicated moment — the accent is critical in ' +
        'writing, and the da sé (by oneself) phrase is idiomatic and high-frequency.',
    },
    {
      slug: 'it-comparatives',
      name: 'Comparatives (i comparativi)',
      category: SkillCategory.grammar,
      level: CEFRLevel.intermediate,
      description:
        'Italian expresses "more … than" with più … di (before nouns and pronouns) or più … che ' +
        '(when comparing two adjectives, two verbs, or two nouns referring to the same subject). ' +
        'Equality: (così) … come or (tanto) … quanto. "Less … than": meno … di / che, ' +
        'following the same di/che split.',
      prerequisiteSlugs: ['it-adjectives-agreement', 'it-stressed-pronouns'],
      examples: [
        {
          target: 'Roma è più grande di Ancona.',
          native: 'Rome is bigger than Ancona.',
          note: 'più + adj + di + noun — standard inequality',
        },
        {
          target: 'È più stanco che malato.',
          native: 'He' + '’s more tired than ill.',
          note: 'più … che comparing two adjectives of the same subject',
        },
        {
          target: 'Correre è tanto salutare quanto nuotare.',
          native: 'Running is as healthy as swimming.',
          note: 'equality: tanto … quanto with two infinitives',
        },
        {
          target: 'Ho meno energia di te stamattina.',
          native: 'I have less energy than you this morning.',
          note: 'meno … di + tonic pronoun',
        },
        {
          target: 'In Italia si mangia più frutta che carne.',
          native: 'In Italy people eat more fruit than meat.',
          note: 'più … che comparing two nouns, same subject (si)',
        },
      ],
      commonMistakes: [
        'using di everywhere and forgetting the più/meno … che rule for same-subject double comparisons',
        'translating "than" always as di and writing "più stanco di malato" — two adjectives on the same subject require che',
        'dropping the così or tanto in equality comparisons (both are optional but their omission must not change the structure)',
        'using subject pronouns after di in comparisons ("più alto di io") — requires tonic: più alto di me',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.error_correction,
        TaskType.translation,
        TaskType.multiple_choice,
      ],
      compatibleThemes: ['sports', 'travel', 'food', 'culture'],
      teachingNotes:
        'The di/che split is the main teaching challenge. Build the rule around two tests: ' +
        '(1) are you comparing two different things/people? → di; (2) are you comparing two ' +
        'qualities, actions, or quantities about the SAME subject? → che. Personalize: ' +
        'compare two athletes the learner follows, or two Italian cities.',
    },
    {
      slug: 'it-superlatives',
      name: 'Superlatives (i superlativi)',
      category: SkillCategory.grammar,
      level: CEFRLevel.intermediate,
      description:
        'The superlativo relativo (relative superlative) uses the definite article + più/meno + ' +
        'adjective + di: "la squadra più forte del campionato". The superlativo assoluto (absolute ' +
        'superlative) expresses "extremely": either add -issimo/-issima/-issimi/-issime to the ' +
        'adjective stem, or use molto + adjective.',
      prerequisiteSlugs: ['it-comparatives', 'it-definite-articles'],
      examples: [
        {
          target: 'Il Monte Vettore è il monte più alto delle Marche.',
          native: 'Monte Vettore is the highest mountain in the Marche.',
          note: 'relative superlative: article + più + adj + di',
        },
        {
          target: 'Questo brodo è ottimo — buonissimo!',
          native: 'This broth is excellent — absolutely delicious!',
          note: 'buonissimo = absolute superlative (-issimo)',
        },
        {
          target: 'La corsa è l' + '’attività più salutare che conosca.',
          native: 'Running is the healthiest activity I know.',
          note: 'relative superlative triggers subjunctive (conosca) — previewed, not drilled here',
        },
        {
          target: 'La sala d' + '’attesa era lentissima — ho aspettato moltissimo.',
          native: 'The waiting room was extremely slow — I waited an extremely long time.',
          note: '-issimo on adjective and adverb stem',
        },
      ],
      commonMistakes: [
        'forgetting the definite article in the relative superlative: "è più alta ragazza" → è la ragazza più alta',
        'using di instead of nel/della etc. when "in" is needed: "il migliore d' +
          '’Italia" (correct) vs "il migliore in Italia" (also accepted colloquially)',
        'applying -issimo to irregular adjectives that already have their own superlative (buono → ottimo OR buonissimo, NOT "buonissimissimo")',
        'misforming the -issimo stem for adjectives ending in -co/-go: stanco → stanchissimo (add h), lungo → lunghissimo',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.speaking_prompt,
        TaskType.error_correction,
      ],
      compatibleThemes: ['travel', 'sports', 'food', 'history'],
      teachingNotes:
        'Teach the two superlatives as answering different questions: the relative superlative ' +
        'ranks within a group ("the tallest IN the team"), the absolute superlative intensifies ' +
        'without comparing ("extremely tall"). The -issimo forms are high-frequency in conversation ' +
        'and emotionally vivid — drill them with food and sports adjectives for maximum engagement. ' +
        'Flag the stanchissimo/lunghissimo spelling change as a known trap.',
    },
    {
      slug: 'it-irregular-comparatives',
      name: 'Irregular comparatives and superlatives',
      category: SkillCategory.grammar,
      level: CEFRLevel.intermediate,
      description:
        'Four adjectives have irregular comparative and superlative forms alongside the regular ' +
        'ones: buono → migliore (better) / il migliore (the best) / ottimo (absolute); cattivo → ' +
        'peggiore (worse) / il peggiore (the worst) / pessimo; grande → maggiore (greater, older) / ' +
        'il maggiore / massimo; piccolo → minore (lesser, younger) / il minore / minimo. The ' +
        'adverbs bene and male also go irregular: meglio (better) and peggio (worse).',
      prerequisiteSlugs: ['it-comparatives', 'it-superlatives'],
      examples: [
        {
          target: 'Questa farmacia ha una selezione migliore dell' + '’altra.',
          native: 'This pharmacy has a better selection than the other one.',
          note: 'migliore = comparative of buono (adjective)',
        },
        {
          target: 'Mi sento meglio oggi, grazie.',
          native: 'I feel better today, thank you.',
          note: 'meglio = comparative of bene (adverb)',
        },
        {
          target: 'È il peggior raffreddore che abbia mai avuto.',
          native: 'It' + '’s the worst cold I' + '’ve ever had.',
          note: 'peggiore → peggior before a noun (truncation), il peggiore (relative superlative)',
        },
        {
          target: 'Mia sorella maggiore è medico a Macerata.',
          native: 'My older sister is a doctor in Macerata.',
          note: 'maggiore = older/greater; minore = younger/lesser — common in family contexts',
        },
      ],
      commonMistakes: [
        'mixing the adjective form (migliore) with the adverb form (meglio): "mi sento migliore" is technically possible but unidiomatic — prefer "mi sento meglio"',
        'using più buono when migliore is the standard choice (più buono can refer to taste/character: "questo gelato è più buono" — but migliore is the default comparative)',
        'forgetting that maggiore/minore often replace più grande/più piccolo for people' +
          '’s age and abstract size, not physical dimensions',
        'treating ottimo/pessimo/massimo/minimo as simple -issimo forms — they are suppletive (from Latin) and do not take -issimo',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.fill_blank,
        TaskType.error_correction,
        TaskType.translation,
      ],
      compatibleThemes: ['food', 'sports', 'family', 'culture'],
      teachingNotes:
        'Present all four pairs on a single reference card — buono/cattivo for quality, ' +
        'grande/piccolo for scale — and add the adverbs meglio/peggio immediately. The ' +
        'più buono vs migliore nuance is worth one clear example: "il mio cuoco è più buono ' +
        'del tuo" (character) vs "la sua pizza è migliore" (quality). Keep ottimo/pessimo/massimo/' +
        'minimo as a recognition bonus at this stage.',
    },
  ],

  // ─── Lesson templates ─────────────────────────────────────────────────────
  lessonTemplates: [
    {
      slug: 'cap09-the-body',
      title: 'Head, shoulders, braccia, mani',
      lessonType: LessonType.vocabulary_review,
      level: CEFRLevel.intermediate,
      summary:
        'Systematically name the parts of the body from head to foot, paying special attention ' +
        'to the irregular plurals le braccia and le mani, and practise the fare male construction ' +
        'for expressing pain.',
      objectiveSkillSlugs: ['it-vocab-body'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['family', 'sports', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Why body vocabulary matters',
          prompt:
            'Whether you' +
            '’re at the pharmacy, playing sport, or just chatting with family, knowing the body' +
            '’s parts in Italian is essential. Let' +
            '’s build it from head to toe — and watch out for two irregular plurals.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Irregular plural identification',
          prompt:
            'Which is the correct plural of il braccio: "i bracci" or "le braccia"? And for la mano: "i mani" or "le mani"?',
          exampleAnswer: 'le braccia; le mani',
          notes:
            'Emphasise that braccio shifts from masculine singular to feminine plural — a unique feature. Mano is feminine even in the singular.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Fare male in context',
          prompt:
            'Translate the pain: "My knee hurts" → Mi fa male ___. "My shoulders hurt" → Mi fanno male ___.',
          exampleAnswer: 'il ginocchio; le spalle',
          notes:
            'The verb agrees with the body part (singular fa, plural fanno). If the learner is a runner or athlete, use ginocchio/piedi; if a desk worker, use schiena/collo.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Personalized body-part round',
          prompt:
            'Name five parts of the body you might mention when talking about sport or exercise. Say each with its article.',
          notes:
            'Pull from the learner' +
            '’s sport interest profile. A cyclist might say: le gambe, le ginocchia, le braccia, la schiena, il collo.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Irregular plurals locked in',
          prompt:
            'Quick check: give the plural of il braccio and la mano, with the correct article.',
        },
      ],
    },
    {
      slug: 'cap09-at-the-pharmacy',
      title: 'Buongiorno, non mi sento bene',
      lessonType: LessonType.scenario_roleplay,
      level: CEFRLevel.intermediate,
      summary:
        'You have a cold, a headache, and a mild fever. Walk into a farmacia in Ancona, describe ' +
        'your symptoms to the pharmacist, and leave with the right medicine and advice.',
      objectiveSkillSlugs: ['it-vocab-health', 'it-vocab-body'],
      defaultDurationMinutes: 12,
      compatibleThemes: ['culture', 'travel', 'family'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Set the scene — la farmacia italiana',
          prompt:
            'You' +
            '’re in Le Marche with a bad cold. The green cross of a farmacia is visible up the street. ' +
            'Unlike in many countries, the Italian pharmacist is a highly trained clinician who can ' +
            'recommend treatment directly. Let' +
            '’s prepare what to say.',
          notes:
            'Briefly mention the cassa medica / guardia medica for after-hours situations. If the learner has travel plans to Italy, anchor it to a real region.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Describe your symptoms',
          prompt:
            'Complete: "Ho ___ da ieri sera e mi fa male la ___. Ho anche un po' + '’ di ___."',
          exampleAnswer: 'il raffreddore … testa … febbre',
          notes:
            'Ho la febbre vs ho un po' +
            '’ di febbre — the second is more common for mild temperature. Accept both.',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'Full pharmacy exchange',
          prompt:
            'The pharmacist asks: "Cosa le fa male?" Respond with at least three symptoms, ask for a medicine, and check whether you need a prescription.',
          exampleAnswer:
            'Mi fa male la testa, ho mal di gola e ho la febbre. Ha qualcosa per il raffreddore? Serve la ricetta?',
          notes:
            'Wise plays the pharmacist. Reward correct use of mal di + body part and fare male. If learner knows reflexive verbs well, prompt sentirsi male.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Reading the advice',
          prompt:
            'Translate what the pharmacist says: "Prenda queste pastiglie tre volte al giorno dopo i pasti. Se la febbre non scende, vada dal medico."',
          exampleAnswer:
            'Take these tablets three times a day after meals. If your temperature doesn' +
            '’t come down, go to the doctor.',
          notes:
            'These imperatives (prenda, vada) are formal subjunctive/imperative forms — learners can decode them here without formally studying the subjunctive.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Pharmacy phrase kit',
          prompt:
            'What are the three most useful phrases you' +
            '’d keep from this lesson for a real pharmacy visit?',
        },
      ],
    },
    {
      slug: 'cap09-comparatives-grammar',
      title: 'Più o meno? — the art of comparing',
      lessonType: LessonType.grammar,
      level: CEFRLevel.intermediate,
      summary:
        'Master the di/che split that controls Italian comparatives, practise equality structures, ' +
        'and put stressed pronouns to work in natural comparisons.',
      objectiveSkillSlugs: ['it-comparatives', 'it-stressed-pronouns'],
      defaultDurationMinutes: 12,
      compatibleThemes: ['sports', 'travel', 'food', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'The di/che decision',
          prompt:
            'Italian "more … than" uses di before a noun or pronoun — and che when comparing ' +
            'two adjectives, two verbs, or two nouns about the SAME subject. Here' +
            '’s the test: if you' +
            '’re comparing two DIFFERENT things, use di. If you' +
            '’re comparing two QUALITIES of the same thing, use che.',
          notes:
            'Show a visual contrast: "Roma è più grande di Milano" (two cities → di) vs "Roma è più antica che moderna" (two qualities of Rome → che).',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Di or che?',
          prompt: 'Choose: "Nuotare è più rilassante ___ correre." / "Luca è più veloce ___ me."',
          exampleAnswer: 'che (two verbs, same implied subject); di (two people)',
          notes:
            'Personalize one of the comparisons to a sport or activity the learner has mentioned.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Stressed pronouns in comparisons',
          prompt:
            'Complete with the right tonic pronoun: "Giocate meglio di ___." (us) / "Questo medico è più paziente di ___." (her)',
          exampleAnswer: 'noi; lei',
          notes:
            'Reinforce the rule: after di in a comparison, the subject pronoun io becomes me, tu becomes te, etc.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Equality structures',
          prompt:
            'Translate: "She is just as experienced as her colleague. He eats as much as two people."',
          exampleAnswer: 'È (così) esperta come la sua collega. Mangia tanto quanto due persone.',
          notes:
            'The così and tanto are optional but natural. Accept either (così) … come or (tanto) … quanto.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Personalized comparison round',
          prompt:
            'Compare two athletes, two cities, or two dishes you know — use più … di, più … che, and (tanto) … quanto at least once each.',
          notes:
            'Pull from the learner' +
            '’s interests. A football fan might compare two strikers; a food lover two regional cuisines.',
        },
        {
          taskType: TaskType.recap,
          focus: 'The di/che rule in one sentence',
          prompt: 'Explain in your own words when you use di and when you use che in a comparison.',
        },
      ],
    },
    {
      slug: 'cap09-superlatives-grammar',
      title: 'Il migliore, il peggiore, and -issimo',
      lessonType: LessonType.grammar,
      level: CEFRLevel.intermediate,
      summary:
        'Build both superlative forms from scratch, then layer in the four irregular pairs — ' +
        'migliore/peggiore/maggiore/minore — that distinguish fluent Italian from translated English.',
      objectiveSkillSlugs: ['it-superlatives', 'it-irregular-comparatives', 'it-comparatives'],
      defaultDurationMinutes: 13,
      compatibleThemes: ['travel', 'sports', 'food', 'history'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Two kinds of superlative',
          prompt:
            'The relative superlative ranks something in a group: "la città più bella d' +
            '’Italia". The absolute superlative intensifies without ranking: "bellissima" or "molto bella". ' +
            'Then there are four irregular pairs that Italian speakers prefer over the regular forms.',
          notes:
            'Present the four irregular pairs on one card: buono→migliore/ottimo; cattivo→peggiore/pessimo; grande→maggiore/massimo; piccolo→minore/minimo. Add meglio/peggio as the adverb column.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Relative superlative construction',
          prompt:
            'Restate as a superlative: "Il Monte Vettore è un monte molto alto nelle Marche" → Il Monte Vettore è ___.',
          exampleAnswer: 'il monte più alto delle Marche',
          notes:
            'The preposition di contracts with the article: delle Marche. Check that the article before più matches the noun.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: '-issimo absolute superlatives',
          prompt: 'Form the absolute superlative: stanco → ___; lungo → ___; veloce → ___.',
          exampleAnswer: 'stanchissimo; lunghissimo; velocissimo',
          notes:
            'Stanco and lungo require h insertion. Veloce drops the -e before -issimo. Flag both spelling changes.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Irregular comparative vs regular',
          prompt:
            'Which is more natural? "Questa medicina è più buona di quella" or "questa medicina è migliore di quella"?',
          exampleAnswer:
            'migliore — più buono exists but refers more to taste/character; migliore is the standard quality comparative',
          notes: 'One clear example of the nuance. Keep it brief.',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Catch common superlative errors',
          prompt:
            'Find and fix the errors: "È la più grande città d' +
            '’Italia." / "Mi sento migliore oggi." / "Questo è il più buonissimo caffè."',
          exampleAnswer:
            'Correct — no error; better: "mi sento meglio oggi" (adverb); remove -issimo — migliore IS the superlative, do not double it',
          notes:
            'Three different trap types in one task: relative superlative correctness, adjective/adverb confusion, and double superlative.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Superlative free production',
          prompt:
            'Name the best and worst thing about where you live, the best meal you' +
            '’ve ever had, and the most important decision you' +
            '’ve made this year — using superlatives.',
          notes:
            'No single correct answer. Reward -issimo forms and correct irregular use. Personalize prompts from learner profile.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Irregular hit-list',
          prompt:
            'Quick fire: comparative and absolute superlative of buono, cattivo, grande, piccolo. And the adverbs: comparative of bene and male.',
          exampleAnswer:
            'migliore/ottimo; peggiore/pessimo; maggiore/massimo; minore/minimo; meglio; peggio',
        },
      ],
    },
    {
      slug: 'cap09-stressed-pronouns-drill',
      title: 'It' + '’s for me, not for you — pronomi tonici',
      lessonType: LessonType.grammar,
      level: CEFRLevel.intermediate,
      summary:
        'Lock in the stressed pronouns by learning when they replace unstressed forms — after ' +
        'prepositions, for emphasis, and in comparisons — and practise with contexts drawn from ' +
        'the health theme.',
      objectiveSkillSlugs: ['it-stressed-pronouns'],
      defaultDurationMinutes: 9,
      compatibleThemes: ['family', 'sports', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'When to switch to tonic',
          prompt:
            'The unstressed pronouns (mi, ti, lo, gli…) come before a verb. But after a ' +
            'preposition — or when you want to contrast or emphasize — you need the tonic set: ' +
            'me, te, lui, lei, sé, noi, voi, loro.',
          notes:
            'Three triggers: (1) after a preposition, (2) for contrastive emphasis, (3) in comparisons after di. Show all three quickly.',
        },
        {
          taskType: TaskType.pronoun_replacement,
          focus: 'Replace with the tonic form',
          prompt:
            'Replace the pronoun correctly: "Il dottore ha parlato a me" (already correct); "Questa ricetta è per ti" (fix it); "Viene con io" (fix it).',
          exampleAnswer: 'correct; per te; con me',
          notes:
            'Make the trigger explicit each time: "after per → tonic form; after con → tonic form".',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Sé and da sé',
          prompt:
            'Complete: "Ha guarito da ___." / "Pensa solo a ___." / "L' + '’ha fatto da ___."',
          exampleAnswer: 'sé; sé; sé',
          notes:
            'All three are da sé / a sé — the reflexive tonic. If the learner writes "se" without accent, flag the meaning difference.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Emphasis in health context',
          prompt:
            'Translate: "The medicine is for him, not for me. According to her, I need more rest than him."',
          exampleAnswer:
            'La medicina è per lui, non per me. Secondo lei, ho bisogno di più riposo di lui.',
          notes:
            'Both sentences pack multiple tonic pronouns. Review stressed-pronoun forms after the answer.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Tonic paradigm recall',
          prompt: 'List all six tonic pronouns corresponding to io, tu, lui/lei, noi, voi, loro.',
          exampleAnswer: 'me, te, lui/lei, noi, voi, loro',
        },
      ],
    },
  ],

  // ─── Thematic vocabulary bank ─────────────────────────────────────────────
  vocabulary: [
    // Il corpo (the body)
    {
      slug: 'cap09-la-testa',
      targetText: 'la testa',
      nativeText: 'the head',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'il-corpo',
      exampleSentence: 'Mi fa male la testa — forse ho la febbre.',
      exampleTranslation: 'My head hurts — maybe I have a fever.',
    },
    {
      slug: 'cap09-i-capelli',
      targetText: 'i capelli',
      nativeText: 'the hair (always plural in Italian)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-corpo',
    },
    {
      slug: 'cap09-gli-occhi',
      targetText: 'gli occhi',
      nativeText: 'the eyes (sg. l' + '’occhio)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-corpo',
      exampleSentence: 'Ha gli occhi azzurri e i capelli scuri.',
      exampleTranslation: 'She has blue eyes and dark hair.',
    },
    {
      slug: 'cap09-il-naso',
      targetText: 'il naso',
      nativeText: 'the nose',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-corpo',
    },
    {
      slug: 'cap09-la-bocca',
      targetText: 'la bocca',
      nativeText: 'the mouth',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'il-corpo',
    },
    {
      slug: 'cap09-i-denti',
      targetText: 'i denti',
      nativeText: 'the teeth (sg. il dente)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-corpo',
      exampleSentence: 'Mi fanno male i denti — devo andare dal dentista.',
      exampleTranslation: 'My teeth hurt — I need to go to the dentist.',
    },
    {
      slug: 'cap09-le-orecchie',
      targetText: 'le orecchie',
      nativeText: 'the ears (sg. l' + '’orecchio, m.; pl. also le orecchie, f.)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'il-corpo',
    },
    {
      slug: 'cap09-il-collo',
      targetText: 'il collo',
      nativeText: 'the neck',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-corpo',
    },
    {
      slug: 'cap09-il-braccio',
      targetText: 'il braccio (pl. le braccia)',
      nativeText: 'the arm (pl. the arms — irregular: f. plural)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-corpo',
      exampleSentence: 'Il nuotatore ha le braccia molto allenate.',
      exampleTranslation: 'The swimmer has very well-trained arms.',
    },
    {
      slug: 'cap09-la-mano',
      targetText: 'la mano (pl. le mani)',
      nativeText: 'the hand (pl. the hands — irregular: f. noun, f. plural)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'il-corpo',
      exampleSentence: 'Si è fatta male a una mano cadendo dalla bicicletta.',
      exampleTranslation: 'She hurt one of her hands falling off the bicycle.',
    },
    {
      slug: 'cap09-la-gamba',
      targetText: 'la gamba',
      nativeText: 'the leg',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'il-corpo',
      exampleSentence: 'Dopo la partita mi fanno male le gambe.',
      exampleTranslation: 'After the match my legs ache.',
    },
    {
      slug: 'cap09-il-piede',
      targetText: 'il piede',
      nativeText: 'the foot',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-corpo',
    },
    {
      slug: 'cap09-il-ginocchio',
      targetText: 'il ginocchio (pl. le ginocchia)',
      nativeText: 'the knee (pl. the knees — irregular: f. plural)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-corpo',
    },
    {
      slug: 'cap09-lo-stomaco',
      targetText: 'lo stomaco',
      nativeText: 'the stomach',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-corpo',
      exampleSentence: 'Ho mal di stomaco — non mangio più pesce crudo.',
      exampleTranslation: 'I have a stomach ache — I' + '’m not eating raw fish anymore.',
    },
    {
      slug: 'cap09-la-schiena',
      targetText: 'la schiena',
      nativeText: 'the back',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'il-corpo',
    },
    {
      slug: 'cap09-il-cuore',
      targetText: 'il cuore',
      nativeText: 'the heart',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-corpo',
      exampleSentence: 'Fare sport fa bene al cuore.',
      exampleTranslation: 'Playing sport is good for the heart.',
    },
    // La salute (health)
    {
      slug: 'cap09-la-salute',
      targetText: 'la salute',
      nativeText: 'health (also: "Cheers!" when someone sneezes)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-salute',
      exampleSentence: 'La salute è la cosa più importante della vita.',
      exampleTranslation: 'Health is the most important thing in life.',
    },
    {
      slug: 'cap09-sentirsi-bene',
      targetText: 'sentirsi bene / male',
      nativeText: 'to feel well / unwell',
      partOfSpeech: 'phrase',
      theme: 'la-salute',
      exampleSentence: 'Non mi sento bene — ho la testa pesante.',
      exampleTranslation: 'I don' + '’t feel well — my head feels heavy.',
    },
    {
      slug: 'cap09-la-febbre',
      targetText: 'la febbre',
      nativeText: 'the fever / temperature',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-salute',
      exampleSentence: 'Ho la febbre a 38 — meglio restare a letto.',
      exampleTranslation: 'I have a 38° fever — better stay in bed.',
    },
    {
      slug: 'cap09-il-raffreddore',
      targetText: 'il raffreddore',
      nativeText: 'the cold (illness)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-salute',
    },
    {
      slug: 'cap09-linfluenza',
      targetText: 'l' + '’influenza',
      nativeText: 'the flu',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-salute',
    },
    {
      slug: 'cap09-la-tosse',
      targetText: 'la tosse',
      nativeText: 'the cough',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-salute',
      exampleSentence: 'Ho una tosse terribile da tre giorni.',
      exampleTranslation: 'I' + '’ve had a terrible cough for three days.',
    },
    {
      slug: 'cap09-mal-di-testa',
      targetText: 'il mal di testa / gola / stomaco',
      nativeText: 'headache / sore throat / stomach ache',
      partOfSpeech: 'phrase',
      theme: 'la-salute',
      exampleSentence: 'Ho mal di gola e mal di testa — probabilmente è un raffreddore.',
      exampleTranslation: 'I have a sore throat and a headache — it' + '’s probably a cold.',
    },
    {
      slug: 'cap09-la-farmacia',
      targetText: 'la farmacia',
      nativeText: 'the pharmacy (marked by a green cross)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-salute',
      exampleSentence: 'La farmacia di turno è aperta tutta la notte.',
      exampleTranslation: 'The on-call pharmacy is open all night.',
    },
    {
      slug: 'cap09-il-dottore',
      targetText: 'il dottore / la dottoressa',
      nativeText: 'the doctor (m. / f.)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-salute',
    },
    {
      slug: 'cap09-la-ricetta',
      targetText: 'la ricetta',
      nativeText: 'the prescription (also: recipe)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-salute',
      exampleSentence: 'Serve la ricetta per questa medicina.',
      exampleTranslation: 'You need a prescription for this medicine.',
    },
    {
      slug: 'cap09-la-medicina',
      targetText: 'la medicina',
      nativeText: 'the medicine / medication',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-salute',
    },
    {
      slug: 'cap09-ammalarsi',
      targetText: 'ammalarsi',
      nativeText: 'to fall ill (reflexive)',
      partOfSpeech: 'verb',
      theme: 'la-salute',
      exampleSentence: 'Mi sono ammalato dopo il viaggio in treno.',
      exampleTranslation: 'I fell ill after the train journey.',
    },
    {
      slug: 'cap09-guarire',
      targetText: 'guarire',
      nativeText: 'to recover / to get better',
      partOfSpeech: 'verb',
      theme: 'la-salute',
      exampleSentence: 'Stai guarendo bene — tra due giorni stai meglio.',
      exampleTranslation: 'You' + '’re recovering well — in two days you' + '’ll feel better.',
    },
  ],
};

export default unit;
