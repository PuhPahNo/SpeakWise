// Capitolo 6 — Buon appetito!
// Theme: food & dining. Ordering a full meal, expressing preferences, indirect
// object pronouns, past-participle agreement with direct object pronouns, and
// the question words every diner needs. Regional focus: Emilia-Romagna.
//
// All content original (copyright-safe).

import { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client';
import type { SeedUnit } from '../types';

const unit: SeedUnit = {
  code: 'cap-06',
  order: 6,
  title: 'Buon appetito!',
  subtitle: 'Eating out, what you like, and how to ask',
  theme: 'food',
  level: CEFRLevel.lower_intermediate,
  summary:
    'Sit down at a trattoria in Bologna, work through every course from antipasto to dolce, and ' +
    'settle the bill without stress. Along the way you’ll master the indirect object pronouns ' +
    '(mi, ti, gli, le…), learn how Italian expresses what you like and dislike through the ' +
    'back-to-front verb piacere, handle past-participle agreement when a direct object pronoun ' +
    'precedes the verb, and arm yourself with the essential question words — chi, cosa, dove, ' +
    'quando, come, perché, quanto.',
  canDo: [
    'Order a full Italian meal (antipasto through dessert) and ask for the bill',
    'Say what you like and dislike about food, using piacere and dispiacere correctly',
    'Replace indirect objects with mi, ti, gli, le, ci, vi, gli and place them correctly',
    'Recognize and produce past-participle agreement when a preceding object pronoun is present',
    'Ask and answer questions using the full set of Italian interrogatives',
    'Name the meal courses, the table-setting items, and the key restaurant vocabulary',
  ],
  culturalNotes: [
    {
      title: 'The Italian meal as a slow ritual',
      body:
        'A full Italian meal unfolds in a deliberate sequence: antipasto (starter), primo (first ' +
        'course, usually pasta or risotto), secondo (main, usually meat or fish) with its contorno ' +
        '(side), then dolce (dessert) and caffè. Rushing is considered rude, and splitting courses ' +
        'between diners at the same table is unusual. The evening meal especially is a social event — ' +
        'it can last two to three hours and no one will rush you out.',
    },
    {
      title: 'Emilia-Romagna: la Food Valley',
      body:
        'The region stretching from Bologna to Parma to Modena is home to some of the world’s most ' +
        'tightly guarded food identities. Parmigiano-Reggiano can only be produced in a narrow zone ' +
        'around Parma, Reggio Emilia, and Modena, and each wheel is branded with its origin. The same ' +
        'protected-origin logic applies to Prosciutto di Parma, Aceto Balsamico Tradizionale di Modena, ' +
        'and fresh pasta shapes like tagliatelle and tortellini. Locals will tell you, without irony, ' +
        'that Bologna is the culinary capital of Italy — and they have a strong case.',
    },
    {
      title: 'Il conto and the coperto',
      body:
        'In Italy you must ask for the bill — "Il conto, per favore." The waiter will not bring it ' +
        'until you do; leaving it unsolicited would imply you are being rushed. Many restaurants add a ' +
        'coperto (cover charge) per person — a fee for the bread, the table setting, and the service, ' +
        'printed on the menu. It is not a tip. Tipping (la mancia) is appreciated but not mandatory; ' +
        'rounding up or leaving a few euros is the norm.',
    },
  ],

  // ─── Skills ───────────────────────────────────────────────────────────────
  skills: [
    // 1. Indirect object pronouns (LEGACY slug)
    {
      slug: 'it-indirect-object-pronouns',
      name: 'Indirect object pronouns (mi, ti, gli, le, ci, vi, gli)',
      category: SkillCategory.grammar,
      level: CEFRLevel.lower_intermediate,
      description:
        'Indirect object pronouns replace the phrase "to/for someone": mi (to/for me), ti (to/for you), ' +
        'gli (to/for him), le (to/for her), ci (to/for us), vi (to/for you all), gli (to/for them). ' +
        'They go directly before the conjugated verb — except loro, which in formal writing follows it. ' +
        'Do not confuse them with direct object pronouns: gli parlo means "I speak to him", not "I speak him."',
      prerequisiteSlugs: ['it-direct-object-pronouns'],
      examples: [
        {
          target: 'Gli consiglio la tagliatella al ragù.',
          native: 'I recommend the tagliatelle with ragù to him.',
          note: 'gli = to him, before the verb',
        },
        {
          target: 'Le scrivo il menù.',
          native: 'I write (= show) the menu to her.',
          note: 'le = to her',
        },
        {
          target: 'Ci porta il conto, per favore?',
          native: 'Can you bring us the bill, please?',
          note: 'ci = to us; polite request to the waiter',
        },
        {
          target: 'Ti piace il risotto? — Sì, mi piace molto.',
          native: 'Do you like risotto? — Yes, I like it a lot.',
          note: 'mi/ti are the IOPs inside piacere',
        },
      ],
      commonMistakes: [
        'placing the IOP after the verb (porta mi instead of mi porta)',
        'using gli for her (le is for her; gli is for him and for them)',
        'confusing lo/la (direct object) with gli/le (indirect object): "lo dico" vs "gli dico"',
        'forgetting to use an IOP at all and repeating the full "a lui/a lei" phrase every time',
      ],
      recommendedPracticeTypes: [
        TaskType.pronoun_replacement,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.error_correction,
      ],
      compatibleThemes: ['food', 'family', 'travel', 'business'],
      teachingNotes:
        'Contrast minimal pairs: lo vedo (I see him — direct) vs gli parlo (I speak to him — indirect). ' +
        'The restaurant setting is ideal: drill "ci porta…?", "le consiglio…", "gli dico di…" as fixed frames. ' +
        'Flag the gli = him/them ambiguity and teach context resolution.',
    },

    // 2. Past-participle agreement with preceding DOP (LEGACY slug)
    {
      slug: 'it-passato-prossimo-pp-agreement',
      name: 'Past-participle agreement with direct object pronouns',
      category: SkillCategory.grammar,
      level: CEFRLevel.lower_intermediate,
      description:
        'When avere is the auxiliary and a direct object pronoun (lo, la, li, le) precedes the verb, ' +
        'the past participle must agree in gender and number with that pronoun: l’ho vista (I saw her/it-f), ' +
        'li ho comprati (I bought them-m), le ho mangiate (I ate them-f). No agreement occurs with indirect ' +
        'object pronouns or when no pronoun precedes.',
      prerequisiteSlugs: ['it-passato-prossimo-avere', 'it-direct-object-pronouns'],
      examples: [
        {
          target: 'La pizza? L’ho ordinata.',
          native: 'The pizza? I ordered it.',
          note: 'la → l’ before a vowel; the participle agrees: l’ho vista',
        },
        {
          target: 'I tortellini? Li ho assaggiati stamattina.',
          native: 'The tortellini? I tasted them this morning.',
          note: 'i tortellini → li → assaggiat-i',
        },
        {
          target: 'Le tagliatelle? Le abbiamo già mangiate.',
          native: 'The tagliatelle? We already ate them.',
          note: 'le tagliatelle → le → mangiat-e',
        },
        {
          target: 'Ho mangiato la pasta. (no pronoun → no agreement)',
          native: 'I ate the pasta.',
          note: 'direct object follows the verb: no agreement required',
        },
      ],
      commonMistakes: [
        'forgetting agreement entirely when a pronoun precedes (ho comprato instead of l’ho comprata)',
        'applying agreement when the object follows the verb (ho mangiato*a* la pasta)',
        'agreeing with indirect object pronouns (gli ho parlat-o is correct — no agreement)',
        'mixing up -o / -a / -i / -e endings: li ho comprat-i (masculine plural), le ho comprat-e (feminine plural)',
      ],
      recommendedPracticeTypes: [
        TaskType.pronoun_replacement,
        TaskType.error_correction,
        TaskType.fill_blank,
        TaskType.translation,
      ],
      compatibleThemes: ['food', 'travel', 'family', 'culture'],
      teachingNotes:
        'The key insight: the pronoun "colours" the participle — think of it as agreement migrating ' +
        'forward with the pronoun. Drill with food nouns of all four gender/number combinations so the ' +
        'learner encounters -o, -a, -i, -e endings in natural context. Flag that ne triggers partial ' +
        'agreement (ne ho mangiata una fetta) — defer full treatment to cap-11.',
    },

    // 3. Piacere
    {
      slug: 'it-piacere',
      name: 'Piacere — expressing likes and dislikes',
      category: SkillCategory.grammar,
      level: CEFRLevel.lower_intermediate,
      description:
        'Italian piacere works back-to-front: the thing liked is the grammatical subject, so the verb ' +
        'agrees with it, not with the person. Mi piace la pasta (pasta pleases me → I like pasta); ' +
        'mi piacciono gli gnocchi (gnocchi please me). Use mi piace + infinitive for activities. ' +
        'The past uses essere: la cena mi è piaciuta. Dispiacere and mancare follow the same logic.',
      prerequisiteSlugs: ['it-indirect-object-pronouns'],
      examples: [
        {
          target: 'Mi piace il tiramisù.',
          native: 'I like tiramisù.',
          note: 'singular noun → piace',
        },
        {
          target: 'Mi piacciono i tortellini in brodo.',
          native: 'I like tortellini in broth.',
          note: 'plural noun → piacciono',
        },
        {
          target: 'Mi piace cucinare.',
          native: 'I like to cook.',
          note: 'infinitive always → piace',
        },
        {
          target: 'La bistecca non mi è piaciuta.',
          native: 'I didn’t like the steak.',
          note: 'past: essere + participle agrees with subject (bistecca, f.)',
        },
        {
          target: 'A Marco piace il vino rosso; a lei piacciono i dolci.',
          native: 'Marco likes red wine; she likes sweets.',
          note: 'a + name/pronoun for explicit subject',
        },
      ],
      commonMistakes: [
        'using piace with a plural noun (mi piace*piacciono* i dolci)',
        'using avere as auxiliary in the past (ho piaciuto instead of è piaciuto)',
        'forgetting participle agreement in the past (mi è piaciut-o/a depending on subject)',
        'translating "I like him" literally as "mi piace lui" — correct, but "mi piace" is enough without an explicit pronoun subject',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.speaking_prompt,
        TaskType.error_correction,
      ],
      compatibleThemes: ['food', 'music', 'sports', 'film'],
      teachingNotes:
        'Flip the English mental model: "what is the subject?" is the key question. Use a two-column ' +
        'chart: liked thing (singular/plural) → piace/piacciono. Always drill the past (è piaciuto/a/i/e) ' +
        "alongside the present — it is where essere trips learners most. Personalize using the learner's " +
        'real food and activity preferences from their profile.',
    },

    // 4. Interrogatives
    {
      slug: 'it-interrogatives',
      name: 'Question words (chi, cosa, dove, quando, come, perché, quanto, quale)',
      category: SkillCategory.grammar,
      level: CEFRLevel.lower_intermediate,
      description:
        'The core Italian interrogatives: chi (who), che / che cosa / cosa (what), dove (where), ' +
        'quando (when), come (how), perché (why — and also "because"), quanto/a/i/e (how much/many), ' +
        'quale/quali (which). Questions can keep the subject after the verb or use normal word order. ' +
        'Note the elisions com’è and dov’è.',
      prerequisiteSlugs: ['it-regular-are-verbs-present'],
      examples: [
        {
          target: 'Che cosa prendi? / Cosa prendi? / Che prendi?',
          native: 'What are you having?',
          note: 'all three forms are interchangeable',
        },
        {
          target: 'Com’è il risotto?',
          native: 'What is the risotto like? / How is the risotto?',
          note: 'elision of come + è',
        },
        {
          target: 'Quanto costa il menù degustazione?',
          native: 'How much does the tasting menu cost?',
          note: 'quanto agrees: quant-o with costo (m)',
        },
        {
          target: 'Quale vino consigli con il pesce?',
          native: 'Which wine do you recommend with fish?',
        },
        {
          target: 'Perché non hai ordinato il dolce?',
          native: 'Why didn’t you order dessert?',
        },
      ],
      commonMistakes: [
        'using come without elision before è (come è → com’è)',
        'forgetting that quanto agrees in gender/number (quanta acqua, quanti coperti)',
        'inverting perché (why) and perché (because) — they are the same word with different roles',
        'using che cosa in a relative clause (che cosa ho mangiato → what I ate) — fine; but overusing it in indirect questions',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.roleplay,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['food', 'travel', 'culture', 'business'],
      teachingNotes:
        'Anchor each interrogative to a real restaurant scenario: "Chi ha ordinato la bistecca?", ' +
        '"Quanto costa?", "Com’è la zuppa?" Italian question word order is flexible; start with V2 ' +
        '(interrogative + verb + subject) and let learners hear natural alternatives. Perché as both ' +
        'why and because is a useful doubling to highlight explicitly.',
    },

    // 5. Restaurant vocabulary (LEGACY slug)
    {
      slug: 'it-vocab-food-restaurant',
      name: 'At the restaurant (al ristorante)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.lower_intermediate,
      description:
        'The words and phrases for eating out: venue names, staff, the menu, the sequence of courses, ' +
        'and how to order, pay, and tip. From prenotare (to book) to la mancia (the tip).',
      prerequisiteSlugs: ['it-vocab-greetings'],
      examples: [
        {
          target: 'Vorrei ordinare il primo, per favore.',
          native: 'I’d like to order the first course, please.',
        },
        {
          target: 'Ci porta il conto quando può?',
          native: 'Could you bring us the bill when you can?',
        },
        {
          target: 'Il menù del giorno include il contorno?',
          native: 'Does the daily menu include the side dish?',
        },
      ],
      commonMistakes: [
        'using menu as a verb (menù is always a noun; the verb is ordinare)',
        'confusing il cameriere (waiter) with il cuoco/lo chef (cook)',
        'thinking la mancia is included — it is voluntary',
        'ordering a secondo without realizing it does not include the contorno automatically',
      ],
      recommendedPracticeTypes: [
        TaskType.roleplay,
        TaskType.multiple_choice,
        TaskType.fill_blank,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['food', 'travel', 'culture'],
      teachingNotes:
        'Run the full ordering arc (prenotare → arrivare → scegliere → ordinare → mangiare → pagare) ' +
        'as a scenario drill. Emphasize the course sequence and the coperto vs mancia distinction — both ' +
        "are culturally loaded for English-speaking visitors. Personalize the menu choices to the learner's food preferences.",
    },

    // 6. Meals and table vocabulary
    {
      slug: 'it-vocab-meals-table',
      name: 'Meals and the table (i pasti e la tavola)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.lower_intermediate,
      description:
        'The three main meals (colazione, pranzo, cena) plus the snack (spuntino), and all the ' +
        'items on a set Italian table: plates, glasses, cutlery, condiments, and the phrase a tavola ' +
        "(come to the table / it's served).",
      prerequisiteSlugs: ['it-vocab-food-restaurant'],
      examples: [
        {
          target: 'A tavola, il pranzo è pronto!',
          native: 'Come to the table, lunch is ready!',
          note: 'a tavola = at the table, the heart of Italian dining',
        },
        {
          target: 'Puoi passarmi il sale e il pepe?',
          native: 'Can you pass me the salt and pepper?',
        },
        {
          target: 'La colazione italiana è leggera: un caffè e un cornetto.',
          native: 'The Italian breakfast is light: an espresso and a croissant.',
        },
      ],
      commonMistakes: [
        'confusing il pranzo (lunch) with il pasto (a meal in general)',
        'using forchetta for a spoon (la forchetta is the fork; il cucchiaio is the spoon)',
        'forgetting the article with meal names: a colazione, a pranzo, a cena (no article after a)',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.fill_blank,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['food', 'family', 'culture'],
      teachingNotes:
        'Use a labeled table-setting image as the mental anchor. Drill the "a + meal" preposition pattern ' +
        '(a pranzo, non a il pranzo) since it surprises learners. The colazione contrast — Italian ' +
        'light breakfast vs. English full breakfast — is a natural cultural discussion starter.',
    },
  ],

  // ─── Lesson templates ─────────────────────────────────────────────────────
  lessonTemplates: [
    // 1. Scenario roleplay — order a full meal
    {
      slug: 'cap06-order-at-the-trattoria',
      title: 'Una serata alla trattoria',
      lessonType: LessonType.scenario_roleplay,
      level: CEFRLevel.lower_intermediate,
      summary:
        'You’ve booked a table at a family trattoria in Bologna. Work through the full evening: ' +
        'greet the waiter, ask about the menu, order all three courses, and settle the bill — using ' +
        'indirect object pronouns and the question words as you go.',
      objectiveSkillSlugs: [
        'it-vocab-food-restaurant',
        'it-indirect-object-pronouns',
        'it-interrogatives',
      ],
      defaultDurationMinutes: 12,
      compatibleThemes: ['food', 'travel', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Set the scene',
          prompt:
            'You’re at a trattoria in Bologna for dinner. The waiter (il cameriere) is coming over. ' +
            'You’ll need to ask about the menu, order, and pay — let’s get you through the whole evening.',
          notes:
            'Mention one Emilia-Romagna dish the learner might enjoy based on their food preferences (e.g. tortellini in brodo, tagliatelle al ragù, gnocco fritto).',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'Ask what the waiter recommends and order the primo',
          prompt:
            'Greet the waiter and ask what they recommend for the first course. Then order it.',
          exampleAnswer:
            'Buonasera! Cosa ci consiglia come primo? — Le consiglio le tagliatelle al ragù. — Perfetto, le prendo.',
          notes:
            'Coach the learner to use ci (to us) when asking the waiter, and le/gli when the waiter addresses them. Personalize the recommended dish.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Indirect object pronouns with ordering verbs',
          prompt:
            'Complete: Il cameriere ___ porta il menù. (a noi) / ___ consiglio la bistecca. (a te)',
          exampleAnswer: 'ci porta; ti consiglio',
          notes: 'Confirm pronoun placement before the verb.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Order the secondo and ask a question about it',
          prompt: 'Order a main course and ask how it’s prepared (com’è / come si prepara?).',
          exampleAnswer: 'Vorrei la bistecca, per favore. Com’è cotta di solito?',
          notes: 'Personalize to the learner’s food preferences — offer fish if they prefer.',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'Ask for the bill politely',
          prompt: 'The meal is over. Ask for the bill and confirm whether service is included.',
          exampleAnswer:
            'Ci porta il conto, per favore? Il servizio è incluso? — No, la mancia è a sua discrezione.',
          notes:
            'Reinforce the cultural note: you must request the bill; it won’t arrive unsolicited.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Key phrases to keep',
          prompt:
            'Which three phrases from tonight’s dinner will you reuse every time you eat out in Italy?',
          notes: 'Invite the learner to name their own takeaways before confirming the top picks.',
        },
      ],
    },

    // 2. Grammar — piacere
    {
      slug: 'cap06-mi-piace-mi-piacciono',
      title: 'Mi piace, mi piacciono — what you love about Italian food',
      lessonType: LessonType.grammar,
      level: CEFRLevel.lower_intermediate,
      summary:
        'Crack the back-to-front logic of piacere: the thing liked is always the subject, so the ' +
        'verb follows it. Master the singular/plural split, the infinitive form, and the past.',
      objectiveSkillSlugs: ['it-piacere', 'it-indirect-object-pronouns'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['food', 'music', 'sports'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'The subject switch',
          prompt:
            '"Mi piace la pasta" — pasta is the subject, not you. The verb agrees with pasta, not with mi.',
          notes:
            'Use a visual flip: "I like pasta" (English) → "Pasta pleases me" (Italian logic). ' +
            'This single reframe resolves most piace/piacciono errors.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'piace vs piacciono',
          prompt:
            'Choose piace or piacciono: Mi ___ il risotto. / Mi ___ le lasagne. / Mi ___ cucinare.',
          exampleAnswer: 'piace; piacciono; piace',
          notes: 'Infinitive always triggers piace — confirm that rule explicitly.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Express a strong like and a dislike',
          prompt: 'Translate: "I really like Parmigiano, but I don’t like offal."',
          exampleAnswer: 'Mi piace molto il Parmigiano, ma non mi piacciono le frattaglie.',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Past tense — essere, not avere',
          prompt: 'Fix: "La cena? Ho piaciuto molto."',
          exampleAnswer: 'La cena? Mi è piaciuta molto.',
          notes: 'Two errors: avere instead of essere, and missing agreement (cena → piaciuta).',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Talk about your own food preferences',
          prompt:
            'Tell me two things you like eating and one you dislike, using piacere and dispiacere.',
          notes:
            'Pull from the learner’s food interest profile. Accept piacere / non mi piace / mi dispiace — all are valid.',
        },
        {
          taskType: TaskType.recap,
          focus: 'The two-question rule',
          prompt:
            'Before using piacere, ask yourself: (1) Is the thing singular or plural? (2) Present or past?',
        },
      ],
    },

    // 3. Grammar — indirect object pronouns
    {
      slug: 'cap06-telling-the-waiter',
      title: 'Gli dico, le consiglio — indirect object pronouns at the table',
      lessonType: LessonType.grammar,
      level: CEFRLevel.lower_intermediate,
      summary:
        'Drill mi, ti, gli, le, ci, vi, gli by replacing the "to/for someone" phrase — so you can ' +
        'tell the waiter something, recommend a dish to a friend, and write a message to the chef.',
      objectiveSkillSlugs: ['it-indirect-object-pronouns'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['food', 'family', 'business'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Direct vs indirect: the preposition test',
          prompt:
            'If you can insert "to" or "for" before the person, it’s an indirect object. ' +
            '"I recommend (to) him the pasta" → gli consiglio la pasta.',
          notes:
            'Use the "to/for test" as a quick heuristic. Contrast with a direct object: "I see him" → lo vedo (no "to").',
        },
        {
          taskType: TaskType.pronoun_replacement,
          focus: 'Replace a + person with the correct IOP',
          prompt:
            'Replace the phrase with a pronoun:\n' +
            '(a) Porto il menù a voi. → ___\n' +
            '(b) Consiglio il vino alla signora. → ___\n' +
            '(c) Dico la verità a te. → ___',
          exampleAnswer: 'Vi porto il menù. / Le consiglio il vino. / Ti dico la verità.',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Gli vs le — him vs her',
          prompt:
            'A learner wrote: "Gli ho detto di aspettare" (talking about the waitress). Fix it.',
          exampleAnswer: 'Le ho detto di aspettare.',
          notes: 'Gli is for him (and them); le is for her. This is the most common IOP error.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Produce IOPs in context',
          prompt:
            'Translate: "She writes us the daily specials. He recommends the tiramisù to me."',
          exampleAnswer: 'Ci scrive i piatti del giorno. Mi consiglia il tiramisù.',
        },
        {
          taskType: TaskType.recap,
          focus: 'IOP chart to memorize',
          prompt: 'Fill in: mi, ___, gli, ___, ___, vi, ___.',
          exampleAnswer: 'mi, ti, gli, le, ci, vi, gli',
        },
      ],
    },

    // 4. Grammar — past-participle agreement
    {
      slug: 'cap06-lho-mangiata',
      title: 'L’ho mangiata — past-participle agreement with pronouns',
      lessonType: LessonType.grammar,
      level: CEFRLevel.lower_intermediate,
      summary:
        'When a direct object pronoun precedes the verb in the passato prossimo, the past participle ' +
        'must agree with it in gender and number. This lesson builds the habit through food-themed drills.',
      objectiveSkillSlugs: ['it-passato-prossimo-pp-agreement', 'it-indirect-object-pronouns'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['food', 'travel', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'When does the participle agree?',
          prompt:
            'A preceding direct object pronoun (lo, la, li, le) colours the participle. ' +
            '"La pizza? L’ho ordinata." The pronoun la drags the -a ending onto ordinato.',
          notes:
            'Emphasize "preceding DOP only" — no agreement with IOPs, and no agreement when the ' +
            'direct object follows the verb.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Supply the correct participle ending',
          prompt:
            'Complete with the right ending:\n' +
            '(a) Il caffè? L’ho bevut___.\n' +
            '(b) Le olive? Le ho mangiat___.\n' +
            '(c) I grissini? Li ho finit___.\n' +
            '(d) La torta? L’ho assaggiat___.',
          exampleAnswer: '-o; -e; -i; -a',
          notes:
            'Make the learner identify the gender/number of the pronoun before selecting the ending.',
        },
        {
          taskType: TaskType.pronoun_replacement,
          focus: 'Replace the direct object and adjust the participle',
          prompt:
            'Rewrite using a pronoun:\n' +
            '(a) Ho prenotato il tavolo. → ___\n' +
            '(b) Abbiamo assaggiato le sarde. → ___',
          exampleAnswer: 'L’ho prenotato. / Le abbiamo assaggiate.',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Catch the no-agreement trap',
          prompt: 'Fix if wrong: "Le bistecche? Le ho cucinato stasera."',
          exampleAnswer: 'Le bistecche? Le ho cucinate stasera.',
          notes:
            'le (f. pl.) → cucinate. If the learner asks about "ho cucinato la bistecca" (no pronoun before), confirm that is correct as-is.',
        },
        {
          taskType: TaskType.recap,
          focus: 'The two-step rule',
          prompt:
            'State the rule in your own words: when does a past participle agree, and what does it agree with?',
        },
      ],
    },

    // 5. Vocabulary review — set the table / course names
    {
      slug: 'cap06-a-tavola',
      title: 'A tavola! — setting the table and the Italian courses',
      lessonType: LessonType.vocabulary_review,
      level: CEFRLevel.lower_intermediate,
      summary:
        'Lock in the full meal-course sequence and all the table-setting items — the vocabulary you need ' +
        'before you sit down and after you order.',
      objectiveSkillSlugs: ['it-vocab-meals-table', 'it-vocab-food-restaurant'],
      defaultDurationMinutes: 8,
      compatibleThemes: ['food', 'family', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'The dinner table and the menu structure',
          prompt:
            'Before you order, you need to know the five courses and the items already on the table. ' +
            'Let’s build both mental maps now.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Course sequence',
          prompt: 'Which comes first: il secondo or il primo?',
          exampleAnswer: 'il primo',
          notes: 'Follow up: name all five courses in order.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Table-setting items',
          prompt:
            'Label the items: the fork is la ___, the knife is il ___, the spoon is il ___, ' +
            'the glass is il ___, the napkin is il ___.',
          exampleAnswer: 'forchetta; coltello; cucchiaio; bicchiere; tovagliolo',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Describe a typical meal you enjoy',
          prompt: 'Describe a meal you like using at least four course/table-setting words.',
          notes: 'Personalize using the learner’s favorite cuisine or a memorable meal.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Colazione vs pranzo vs cena',
          prompt:
            'What is the main difference between an Italian colazione and a typical American breakfast?',
          notes: 'Tie to the cultural note on the light Italian breakfast.',
        },
      ],
    },
  ],

  // ─── Thematic vocabulary bank ─────────────────────────────────────────────
  vocabulary: [
    // Al ristorante
    {
      slug: 'cap06-il-ristorante',
      targetText: 'il ristorante',
      nativeText: 'the restaurant',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'al-ristorante',
      exampleSentence: 'Abbiamo prenotato un tavolo al ristorante.',
      exampleTranslation: 'We booked a table at the restaurant.',
    },
    {
      slug: 'cap06-la-trattoria',
      targetText: 'la trattoria',
      nativeText: 'the trattoria (casual family restaurant)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'al-ristorante',
      exampleSentence: 'Preferisco le trattorie ai ristoranti stellati.',
      exampleTranslation: 'I prefer trattorias to Michelin-starred restaurants.',
    },
    {
      slug: 'cap06-il-cameriere',
      targetText: 'il cameriere / la cameriera',
      nativeText: 'the waiter / the waitress',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'al-ristorante',
      exampleSentence: 'Il cameriere ci porta il menù.',
      exampleTranslation: 'The waiter brings us the menu.',
    },
    {
      slug: 'cap06-il-menu',
      targetText: 'il menù',
      nativeText: 'the menu',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'al-ristorante',
    },
    {
      slug: 'cap06-ordinare',
      targetText: 'ordinare',
      nativeText: 'to order',
      partOfSpeech: 'verb',
      theme: 'al-ristorante',
      exampleSentence: 'Cosa vorresti ordinare?',
      exampleTranslation: 'What would you like to order?',
    },
    {
      slug: 'cap06-il-conto',
      targetText: 'il conto',
      nativeText: 'the bill / check',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'al-ristorante',
      exampleSentence: 'Il conto, per favore.',
      exampleTranslation: 'The bill, please.',
    },
    {
      slug: 'cap06-la-mancia',
      targetText: 'la mancia',
      nativeText: 'the tip (gratuity)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'al-ristorante',
    },
    {
      slug: 'cap06-prenotare',
      targetText: 'prenotare',
      nativeText: 'to book / reserve',
      partOfSpeech: 'verb',
      theme: 'al-ristorante',
      exampleSentence: 'Ho prenotato un tavolo per due.',
      exampleTranslation: 'I reserved a table for two.',
    },
    {
      slug: 'cap06-il-coperto',
      targetText: 'il coperto',
      nativeText: 'the cover charge',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'al-ristorante',
    },
    {
      slug: 'cap06-lantipasto',
      targetText: 'l’antipasto',
      nativeText: 'the starter / appetizer',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'al-ristorante',
    },
    {
      slug: 'cap06-il-primo',
      targetText: 'il primo (piatto)',
      nativeText: 'the first course (pasta/risotto/soup)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'al-ristorante',
      exampleSentence: 'Come primo prendo le tagliatelle al ragù.',
      exampleTranslation: 'For my first course I’ll have tagliatelle with ragù.',
    },
    {
      slug: 'cap06-il-secondo',
      targetText: 'il secondo (piatto)',
      nativeText: 'the main course (meat/fish)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'al-ristorante',
    },
    {
      slug: 'cap06-il-contorno',
      targetText: 'il contorno',
      nativeText: 'the side dish',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'al-ristorante',
      exampleSentence: 'Come contorno, prendo le patate arrosto.',
      exampleTranslation: 'As a side dish, I’ll have roast potatoes.',
    },
    {
      slug: 'cap06-il-dolce',
      targetText: 'il dolce',
      nativeText: 'the dessert / sweet',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'al-ristorante',
    },
    {
      slug: 'cap06-cucinare',
      targetText: 'cucinare',
      nativeText: 'to cook',
      partOfSpeech: 'verb',
      theme: 'al-ristorante',
      exampleSentence: 'Mi piace cucinare la pasta fatta in casa.',
      exampleTranslation: 'I like making homemade pasta.',
    },
    {
      slug: 'cap06-mangiare',
      targetText: 'mangiare',
      nativeText: 'to eat',
      partOfSpeech: 'verb',
      theme: 'al-ristorante',
    },
    // I pasti
    {
      slug: 'cap06-la-colazione',
      targetText: 'la colazione',
      nativeText: 'breakfast',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-pasti',
      exampleSentence: 'Faccio colazione al bar con un cornetto.',
      exampleTranslation: 'I have breakfast at the café with a croissant.',
    },
    {
      slug: 'cap06-il-pranzo',
      targetText: 'il pranzo',
      nativeText: 'lunch',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-pasti',
    },
    {
      slug: 'cap06-la-cena',
      targetText: 'la cena',
      nativeText: 'dinner / supper',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-pasti',
      exampleSentence: 'La cena in famiglia dura spesso due ore.',
      exampleTranslation: 'Family dinner often lasts two hours.',
    },
    {
      slug: 'cap06-lo-spuntino',
      targetText: 'lo spuntino',
      nativeText: 'the snack',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-pasti',
    },
    // A tavola
    {
      slug: 'cap06-a-tavola',
      targetText: 'a tavola',
      nativeText: "at the table / dinner's ready!",
      partOfSpeech: 'phrase',
      theme: 'a-tavola',
      exampleSentence: 'A tavola! La minestra si raffredda.',
      exampleTranslation: 'Come eat! The soup is getting cold.',
    },
    {
      slug: 'cap06-il-piatto',
      targetText: 'il piatto',
      nativeText: 'the plate / dish',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'a-tavola',
    },
    {
      slug: 'cap06-il-bicchiere',
      targetText: 'il bicchiere',
      nativeText: 'the glass',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'a-tavola',
      exampleSentence: 'Mi porti un bicchiere d’acqua, per favore?',
      exampleTranslation: 'Could you bring me a glass of water, please?',
    },
    {
      slug: 'cap06-la-forchetta',
      targetText: 'la forchetta',
      nativeText: 'the fork',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'a-tavola',
    },
    {
      slug: 'cap06-il-coltello',
      targetText: 'il coltello',
      nativeText: 'the knife',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'a-tavola',
    },
    {
      slug: 'cap06-il-cucchiaio',
      targetText: 'il cucchiaio',
      nativeText: 'the spoon',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'a-tavola',
    },
    {
      slug: 'cap06-il-tovagliolo',
      targetText: 'il tovagliolo',
      nativeText: 'the napkin',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'a-tavola',
    },
    {
      slug: 'cap06-la-bottiglia',
      targetText: 'la bottiglia',
      nativeText: 'the bottle',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'a-tavola',
      exampleSentence: 'Una bottiglia di vino rosso, per favore.',
      exampleTranslation: 'A bottle of red wine, please.',
    },
    {
      slug: 'cap06-il-sale',
      targetText: 'il sale',
      nativeText: 'the salt',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'a-tavola',
    },
    {
      slug: 'cap06-il-pepe',
      targetText: 'il pepe',
      nativeText: 'the pepper',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'a-tavola',
    },
    {
      slug: 'cap06-lolio',
      targetText: 'l’olio',
      nativeText: 'the oil (olive oil)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'a-tavola',
      exampleSentence: 'Puoi passarmi l’olio e l’aceto?',
      exampleTranslation: 'Can you pass me the oil and vinegar?',
    },
    {
      slug: 'cap06-laceto',
      targetText: 'l’aceto',
      nativeText: 'the vinegar',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'a-tavola',
    },
  ],
};

export default unit;
