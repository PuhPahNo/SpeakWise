// Capitolo 18 — La società multiculturale
// Theme: politics / news / culture. Multiculturalism, identity, and values —
// powered by the congiuntivo imperfetto, the congiuntivo trapassato, and the
// full sequence of tenses in the subjunctive. Set against the backdrop of
// Friuli-Venezia Giulia, a historic border crossroads.
//
// All content original (copyright-safe).

import { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client';
import type { SeedUnit } from '../types';

const unit: SeedUnit = {
  code: 'cap-18',
  order: 18,
  title: 'La società multiculturale',
  subtitle: 'The past subjunctive and the sequence of tenses',
  theme: 'politics',
  level: CEFRLevel.advanced,
  summary:
    'Italy has always been a land of movement — of emigration, return, and new arrivals. This chapter ' +
    'takes you to the heart of the Italian subjunctive: the imperfect and pluperfect forms that open up ' +
    'hypothetical worlds and past reflections. You learn to say what you wished were true, what you ' +
    'thought had already happened, and how to build the third conditional. The vocabulary of ' +
    'multiculturalism, identity, and shared values gives you the language to discuss one of the defining ' +
    'conversations of contemporary Italy — respectfully and with nuance.',
  canDo: [
    'Use the congiuntivo imperfetto after past-tense and conditional main clauses',
    'Form and deploy the congiuntivo trapassato for actions prior to a past main clause',
    'Build third-conditional (impossible past) hypotheticals with se + congiuntivo trapassato',
    'Apply the full sequence of tenses to choose the correct subjunctive form in any context',
    'Discuss cultural diversity, integration, and shared values with precise vocabulary',
    'Express nuanced opinions and hypothetical stances on multicultural society in Italian',
  ],
  culturalNotes: [
    {
      title: 'Il Friuli-Venezia Giulia — crocevia di popoli e lingue',
      body:
        'Nestled where Italy, Slovenia, Austria, and Croatia converge, Friuli-Venezia Giulia has ' +
        'been a crossroads of civilisations for millennia. Trieste — once the great imperial port of ' +
        'the Habsburg Empire — remains a place where Italian, Slovenian, and Central European cultures ' +
        'overlap in bookshops, coffee houses, and street names. The region officially recognises ' +
        'Friulian, Slovenian, and German alongside Italian, making it one of the most linguistically ' +
        'plural corners of the country. For Italian learners exploring multiculturalism, Friuli is a ' +
        'living argument that convivenza — peaceful coexistence — is not a modern invention but a ' +
        'centuries-old local practice.',
    },
    {
      title: 'I nuovi italiani — le seconde generazioni',
      body:
        'Italy experienced its first large wave of immigration in the late 1980s and 1990s, arriving ' +
        'later than France, Germany, or the UK. Today, roughly one in ten residents was born abroad, ' +
        'and a new generation — the figli di immigrati, sometimes called "G2" — has grown up speaking ' +
        'perfect Italian, attending Italian schools, and supporting the Azzurri, yet often waiting ' +
        "years for citizenship under Italy's ius soli debate. Writers, athletes, and musicians with " +
        'roots in Senegal, Morocco, China, or the Philippines are reshaping what it means to be ' +
        'Italian, and the term "nuovo italiano" (new Italian) has entered everyday conversation as ' +
        'both a legal aspiration and a cultural reality.',
    },
    {
      title: 'La cucina come specchio della convivenza',
      body:
        "Italian cuisine is often cited as the world's most beloved — yet it has always absorbed " +
        'outside influences. Pasta arrived via Arab traders; tomatoes came from the Americas; espresso ' +
        'as we know it was refined in Central European café culture. Today, in any Italian city, you ' +
        'find kebab shops next to trattorie, Sri Lankan grocery stores beside salumerias, and African ' +
        'and South American street food at weekend markets. Far from diluting Italian food culture, ' +
        'this layering has deepened it: many Italians speak of cibi etnici with the same curiosity ' +
        'and pleasure they bring to a regional dialect or a local wine. The shared table — la tavola ' +
        "condivisa — has long been Italy's most democratic institution.",
    },
  ],

  // ─── Skills ───────────────────────────────────────────────────────────────
  skills: [
    {
      slug: 'it-congiuntivo-imperfetto',
      name: 'Congiuntivo imperfetto (imperfect subjunctive)',
      category: SkillCategory.grammar,
      level: CEFRLevel.advanced,
      description:
        'The imperfect subjunctive expresses doubt, desire, or hypothesis in the past, or an unlikely ' +
        'present condition. Form it from the infinitive stem: -are verbs → -assi, -assi, -asse, -assimo, ' +
        '-aste, -assero (parlassi, parlasse, parlassero); -ere verbs → -essi… (prendessi); -ire verbs → ' +
        '-issi… (dormissi). Key irregulars use their own stems: essere → fossi/fosse/fossero; avere → ' +
        'avessi/avesse; fare → facessi; dare → dessi; stare → stessi; dire → dicessi. Use it after a ' +
        'past-tense main clause (Pensavo che fosse vero) and in improbable or hypothetical si-clauses ' +
        '(Se avessi tempo, verrei).',
      prerequisiteSlugs: ['it-congiuntivo-presente', 'it-imperfetto'],
      examples: [
        {
          target: 'Pensavo che la situazione fosse più complicata.',
          native: 'I thought the situation was more complicated.',
          note: 'Past main clause → imperfect subjunctive (contemporaneous)',
        },
        {
          target: 'Voleva che parlassimo con lei prima della riunione.',
          native: 'She wanted us to speak with her before the meeting.',
          note: '-are verb: parlassimo (noi form)',
        },
        {
          target: 'Se avessi più tempo libero, imparerei il swahili.',
          native: 'If I had more free time, I would learn Swahili.',
          note: 'Hypothetical si-clause: improbable present condition',
        },
        {
          target: 'Era l’unico immigrato che conoscesse la storia del quartiere.',
          native: 'He was the only immigrant who knew the history of the neighbourhood.',
          note: 'Superlative / unique antecedent triggers subjunctive',
        },
      ],
      commonMistakes: [
        'Using the present subjunctive after a past main clause (Pensavo che sia vero → should be fosse)',
        'Confusing -are imperfect subjunctive endings (-assi) with the indicative imperfect (-avo)',
        'Forgetting the double-s in all forms — a single s changes the register entirely',
        'Using the indicative in si-clauses instead of the imperfect subjunctive (Se ho tempo → Se avessi tempo for an unlikely condition)',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.conjugation,
        TaskType.tense_selection,
        TaskType.error_correction,
      ],
      compatibleThemes: ['politics', 'news', 'culture', 'history'],
      teachingNotes:
        'The double-s pattern is the single most reliable form identifier — drill it until it feels ' +
        'automatic. Pair with the present subjunctive immediately so learners see the contrast: what ' +
        'changes is the TENSE of the main clause, not the meaning of the subordinate clause. The ' +
        'essere irregular (fossi/fosse/fossero) is the highest-frequency form and must be prioritised.',
    },
    {
      slug: 'it-congiuntivo-trapassato',
      name: 'Congiuntivo trapassato (pluperfect subjunctive)',
      category: SkillCategory.grammar,
      level: CEFRLevel.advanced,
      description:
        'The pluperfect subjunctive expresses an action prior to a past main clause, or the ' +
        '"if"-part of an impossible third conditional. Form it with the imperfect subjunctive of ' +
        'avere or essere plus the past participle: che avessi parlato (that I had spoken), che fosse ' +
        'andato/a (that he/she had gone). Essere verbs require past-participle agreement as usual. ' +
        'Use 1: prior past action (Credevo che fossero già partiti — I believed they had already left). ' +
        'Use 2: third conditional si-clause (Se avessi saputo, sarei venuto — If I had known, I would have come).',
      prerequisiteSlugs: ['it-congiuntivo-imperfetto', 'it-trapassato'],
      examples: [
        {
          target: 'Credevo che avessero già firmato l’accordo.',
          native: 'I believed they had already signed the agreement.',
          note: 'Prior past action — the signing preceded the believing',
        },
        {
          target: 'Era strano che nessuno avesse parlato dei diritti umani.',
          native: 'It was strange that nobody had spoken about human rights.',
          note: 'Impersonal expression in the past + pluperfect subjunctive',
        },
        {
          target: 'Se avessi saputo della sua storia, ti avrei presentato prima.',
          native: 'If I had known about his/her story, I would have introduced you sooner.',
          note: 'Third conditional: se + pluperfect subjunctive / condizionale passato',
        },
        {
          target: 'Non pensavo che fosse arrivata così tanto tempo fa.',
          native: 'I didn’t think she had arrived such a long time ago.',
          note: 'Essere verb — past participle agrees with the subject (arrivata, f.)',
        },
      ],
      commonMistakes: [
        'Using the passato prossimo indicative instead of the pluperfect subjunctive in subordinate clauses (che sono arrivati → che fossero arrivati)',
        'Forgetting past-participle agreement with essere verbs (che fosse arrivato for a female subject)',
        'Confusing the third conditional with the second: Se sapessi (present unlikely) vs Se avessi saputo (past impossible)',
        'Placing condizionale passato in both halves of the third conditional — the si-clause needs congiuntivo trapassato, not avrei fatto',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.error_correction,
        TaskType.tense_selection,
      ],
      compatibleThemes: ['politics', 'history', 'news', 'culture'],
      teachingNotes:
        'Build on the imperfect subjunctive: "You already know avessi and fosse — now add the past ' +
        'participle and you have the pluperfect." The third conditional is the killer application and ' +
        'the most memorable use; lead with a vivid personal example (Se avessi imparato l’italiano da ' +
        'bambino/a, adesso saresti fluente) before moving to formal or political contexts.',
    },
    {
      slug: 'it-congiuntivo-sequence',
      name: 'Sequence of tenses in the subjunctive (correlazione dei tempi)',
      category: SkillCategory.grammar,
      level: CEFRLevel.advanced,
      description:
        'The tense of the subjunctive is determined by the tense of the main clause and the ' +
        'time relationship between the two clauses. The rule:\n' +
        'MAIN CLAUSE in the PRESENT or FUTURE → use present subjunctive for simultaneous/future actions ' +
        '(Spero che vengano — I hope they come) or past subjunctive for a prior action ' +
        '(Spero che siano venuti — I hope they came/have come).\n' +
        'MAIN CLAUSE in the PAST or CONDITIONAL → use imperfect subjunctive for simultaneous actions ' +
        '(Speravo che venissero — I hoped they would come) or pluperfect subjunctive for a prior action ' +
        '(Speravo che fossero già venuti — I hoped they had already come).',
      prerequisiteSlugs: ['it-congiuntivo-imperfetto', 'it-congiuntivo-passato'],
      examples: [
        {
          target: 'Spero che la comunità accolga i nuovi arrivati.',
          native: 'I hope the community will welcome the newcomers.',
          note: 'Present main clause → present subjunctive (simultaneous)',
        },
        {
          target: 'Spero che abbiano già trovato un alloggio.',
          native: 'I hope they have already found accommodation.',
          note: 'Present main clause → past subjunctive (prior action)',
        },
        {
          target: 'Speravo che la comunità accogliesse i nuovi arrivati.',
          native: 'I hoped the community would welcome the newcomers.',
          note: 'Past main clause → imperfect subjunctive (simultaneous)',
        },
        {
          target: 'Speravo che avessero già trovato un alloggio.',
          native: 'I hoped they had already found accommodation.',
          note: 'Past main clause → pluperfect subjunctive (prior action)',
        },
      ],
      commonMistakes: [
        'Using the present subjunctive after a past main clause — by far the most common error at this level',
        'Choosing the wrong relationship (simultaneous vs prior) between the two clauses',
        'Forgetting that the conditional counts as a "past-type" main clause for sequencing purposes',
        'Applying English logic — English does not change the embedded-clause tense the way Italian does',
      ],
      recommendedPracticeTypes: [
        TaskType.tense_selection,
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.error_correction,
      ],
      compatibleThemes: ['politics', 'news', 'culture', 'history'],
      teachingNotes:
        'Present the four-cell grid visually: rows = main-clause tense (present/future vs past/conditional); ' +
        'columns = time relationship (simultaneous vs prior). Every subjunctive choice maps to one cell. ' +
        'Learners who memorise the grid reduce the cognitive load from "infinite choices" to "four options." ' +
        'The most important cell to nail first is bottom-left (past main + imperfect subj.), because it ' +
        'corrects the #1 error.',
    },
    {
      slug: 'it-vocab-multicultural',
      name: 'La società multiculturale (multicultural society)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.advanced,
      description:
        'The core vocabulary for discussing immigration, integration, diversity, and cultural identity ' +
        'in contemporary Italy — terms you will encounter in newspapers, political debates, and everyday ' +
        'conversation about what it means to share a society.',
      prerequisiteSlugs: ['it-congiuntivo-presente'],
      examples: [
        {
          target: 'L’integrazione richiede impegno da entrambe le parti.',
          native: 'Integration requires commitment from both sides.',
        },
        {
          target: 'Il pregiudizio è spesso il frutto della paura e dell’ignoranza.',
          native: 'Prejudice is often the fruit of fear and ignorance.',
        },
        {
          target: 'La diversità culturale arricchisce la società nel suo insieme.',
          native: 'Cultural diversity enriches society as a whole.',
        },
      ],
      commonMistakes: [
        'Confusing l’immigrato/a (immigrant, someone who arrived) with l’emigrato/a (emigrant, someone who left their country)',
        'Using straniero as an insult when it is simply the neutral word for "foreigner" or "stranger"',
        'Treating accogliere as a simple verb — it is irregular (accolgo, accogli, accoglie, accogliamo, accogliete, accolgono)',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.speaking_prompt,
        TaskType.multiple_choice,
      ],
      compatibleThemes: ['politics', 'news', 'culture', 'history'],
      teachingNotes:
        'Approach this vocabulary with cultural sensitivity — frame terms like pregiudizio and straniero ' +
        'as analytical tools for discussion, not loaded triggers. The immigrato/emigrato distinction is ' +
        'historically resonant for Italians, whose own emigration history (millions left for the Americas ' +
        'and Northern Europe) gives them a particular perspective on the topic.',
    },
    {
      slug: 'it-vocab-values',
      name: 'I valori condivisi (shared values)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.advanced,
      description:
        'The language of civic values, rights, and the ideals that underpin a pluralist society: ' +
        'from solidarity and equality to citizenship and freedom. These terms appear across political ' +
        'speeches, constitutions, and daily life in Italy.',
      prerequisiteSlugs: ['it-vocab-multicultural'],
      examples: [
        {
          target: 'La convivenza pacifica si costruisce sul rispetto reciproco.',
          native: 'Peaceful coexistence is built on mutual respect.',
        },
        {
          target: 'I diritti umani devono essere garantiti a tutti, senza distinzione di origine.',
          native: 'Human rights must be guaranteed to everyone, without distinction of origin.',
        },
        {
          target: 'La cittadinanza è più di un documento: è un senso di appartenenza.',
          native: 'Citizenship is more than a document: it is a sense of belonging.',
        },
      ],
      commonMistakes: [
        'Confusing la libertà (freedom/liberty, abstract) with il permesso (permission, a specific authorisation)',
        'Using uguaglianza and equità interchangeably — uguaglianza is formal equality; equità implies fairness/equity',
        'Forgetting that l’accoglienza is a noun (hospitality/welcome) while accogliere is the verb — they share the root but are different words',
      ],
      recommendedPracticeTypes: [
        TaskType.translation,
        TaskType.speaking_prompt,
        TaskType.fill_blank,
        TaskType.multiple_choice,
      ],
      compatibleThemes: ['politics', 'culture', 'history', 'news'],
      teachingNotes:
        'These are the "big words" of civic discourse — introduce them in pairs of related concepts ' +
        '(rispetto / tolleranza; uguaglianza / solidarietà; pace / convivenza) so learners build a ' +
        'semantic web rather than isolated items. Use the Italian Constitution (Articolo 3 on equality) ' +
        'as an authentic source for context.',
    },
  ],

  // ─── Lesson templates ─────────────────────────────────────────────────────
  lessonTemplates: [
    {
      slug: 'cap18-pensavo-che',
      title: 'Pensavo che… — the imperfect subjunctive after past verbs',
      lessonType: LessonType.grammar,
      level: CEFRLevel.advanced,
      summary:
        'Once you believed something. Now you’re not sure it was true. The imperfect subjunctive is ' +
        'the tense for exactly this kind of past doubt, desire, and reflection — and it unlocks ' +
        'a far more sophisticated register in Italian.',
      objectiveSkillSlugs: ['it-congiuntivo-imperfetto'],
      defaultDurationMinutes: 13,
      compatibleThemes: ['politics', 'news', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Building the imperfect subjunctive',
          prompt:
            'Start from the infinitive, drop the final -e, and add the -assi / -essi / -issi family of endings. ' +
            'The -are verbs change the -a- to match: parlare → parlassi, parlasse, parlassero. ' +
            'The key irregulars are essere (fossi / fosse / fossero), fare (facessi), and dare (dessi) — learn these first.',
          notes:
            'Display both the regular pattern and the essere paradigm side by side. The double-s is ' +
            'the clearest signal that we are in the subjunctive — highlight it visually.',
        },
        {
          taskType: TaskType.conjugation,
          focus: 'Core paradigm: parlare and essere',
          prompt: 'Give all six forms of the imperfect subjunctive for parlare, then for essere.',
          exampleAnswer:
            'parlare: parlassi, parlassi, parlasse, parlassimo, parlaste, parlassero — ' +
            'essere: fossi, fossi, fosse, fossimo, foste, fossero',
          notes:
            'Drill essere separately — it is the most irregular and the most frequent. ' +
            "Personalise: use a sentence about the learner's own background or interests.",
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'After verbs of thinking and believing',
          prompt:
            'Complete each sentence with the imperfect subjunctive: ' +
            '"Pensavo che la riunione ___ (essere) più lunga." / ' +
            '"Credevo che tutti ___ (parlare) italiano."',
          exampleAnswer:
            'Pensavo che la riunione fosse più lunga. / Credevo che tutti parlassero italiano.',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Catch the wrong tense',
          prompt: 'Correct the error: "Il sindaco voleva che i cittadini siano più tolleranti."',
          exampleAnswer:
            'Il sindaco voleva che i cittadini fossero più tolleranti. ' +
            '(Past main clause → imperfect subjunctive, not present subjunctive)',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Your own past beliefs',
          prompt:
            'Think of something you used to believe about another culture or country that turned out ' +
            'to be different from reality. Tell Wise in Italian using Pensavo che… / Credevo che…',
          notes:
            'Keep the tone curious and open — this is a moment for genuine reflection, not a test. ' +
            "Adapt the prompt to the learner's own travel or cultural experiences if known.",
        },
        {
          taskType: TaskType.recap,
          focus: 'The trigger rule',
          prompt:
            'Complete the rule: "After a past-tense main clause, I use the ___ subjunctive for actions ' +
            'happening at the same time."',
          exampleAnswer: 'imperfect (congiuntivo imperfetto)',
        },
      ],
    },
    {
      slug: 'cap18-se-avessi-saputo',
      title: 'Se avessi saputo… — the third conditional',
      lessonType: LessonType.grammar,
      level: CEFRLevel.advanced,
      summary:
        'The third conditional lets you reason about impossible past scenarios — things that cannot ' +
        'be changed. It is built on the pluperfect subjunctive and the past conditional, and it is ' +
        'the most sophisticated hypothetical structure in the language.',
      objectiveSkillSlugs: ['it-congiuntivo-trapassato', 'it-congiuntivo-imperfetto'],
      defaultDurationMinutes: 14,
      compatibleThemes: ['politics', 'history', 'news'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'The formula: se + pluperfect subjunctive / past conditional',
          prompt:
            'Third conditional = impossible past hypothesis. ' +
            'Se + congiuntivo trapassato (avessi fatto, fosse andato/a) → condizionale passato (avrei fatto, sarei andato/a). ' +
            'Example: Se avessi studiato di più, avrei superato l’esame. ' +
            'The si-clause uses the pluperfect subjunctive — never the conditional.',
          notes:
            'Contrast all three conditionals in a single table: first (real future), second (unlikely present), ' +
            'third (impossible past). Learners at this level benefit from seeing the full system at once.',
        },
        {
          taskType: TaskType.conjugation,
          focus: 'Pluperfect subjunctive paradigm',
          prompt:
            'Build the congiuntivo trapassato for io and loro: venire (essere verb), capire (avere verb).',
          exampleAnswer:
            'venire: fossi venuto/a (io), fossero venuti/e (loro) — ' +
            'capire: avessi capito (io), avessero capito (loro)',
          notes: 'Stress the essere agreement — this is a reliable error source.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Impossible past hypotheticals',
          prompt:
            'Translate: "If the government had invested more in integration programmes, the results ' +
            'would have been very different."',
          exampleAnswer:
            'Se il governo avesse investito di più nei programmi di integrazione, i risultati ' +
            'sarebbero stati molto diversi.',
          notes:
            'This is the register of political and historical analysis — exactly what advanced learners need.',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Both halves must match',
          prompt: 'Fix: "Se avrei saputo della manifestazione, sarei venuto." (One error.)',
          exampleAnswer:
            'Se avessi saputo della manifestazione, sarei venuto. ' +
            '(The si-clause takes the congiuntivo trapassato, never the conditional.)',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'Historical what-if',
          prompt:
            'Wise plays a journalist asking: "Se l’Italia avesse avuto una politica di integrazione più ' +
            'generosa vent’anni fa, cosa sarebbe successo secondo te?" Answer in 3–4 sentences.',
          notes:
            "Personalise to the learner's interests: frame around food culture, sport, art, or politics " +
            'depending on their profile. Accept any grammatically correct third conditional.',
        },
        {
          taskType: TaskType.recap,
          focus: 'The forbidden form',
          prompt: 'Which verb form can NEVER appear in the si-clause of a third conditional? Why?',
          exampleAnswer:
            'The conditional (avrei / sarei). The si-clause requires the congiuntivo trapassato. ' +
            'The conditional appears only in the result clause.',
        },
      ],
    },
    {
      slug: 'cap18-sequence-of-tenses',
      title: 'La correlazione dei tempi — matching the clause to the moment',
      lessonType: LessonType.grammar,
      level: CEFRLevel.advanced,
      summary:
        'One of the most nuanced skills in Italian is choosing the right subjunctive tense based ' +
        'on the tense of the main clause and the time relationship between the two events. This lesson ' +
        'maps out the full four-cell grid and drills each quadrant.',
      objectiveSkillSlugs: ['it-congiuntivo-sequence'],
      defaultDurationMinutes: 12,
      compatibleThemes: ['politics', 'news', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'The four-cell grid',
          prompt:
            'Main clause PRESENT/FUTURE + action SIMULTANEOUS → congiuntivo presente (Spero che vengano). ' +
            'Main clause PRESENT/FUTURE + action PRIOR → congiuntivo passato (Spero che siano venuti). ' +
            'Main clause PAST/CONDITIONAL + action SIMULTANEOUS → congiuntivo imperfetto (Speravo che venissero). ' +
            'Main clause PAST/CONDITIONAL + action PRIOR → congiuntivo trapassato (Speravo che fossero già venuti). ' +
            'Memorise the grid — every choice maps to one cell.',
          notes:
            'Display as a literal 2×2 table. The learner should be able to reproduce it from memory by the end.',
        },
        {
          taskType: TaskType.tense_selection,
          focus: 'Present main clause',
          prompt:
            'Select the correct subjunctive: "È importante che tutti ___ (rispettare) le tradizioni altrui." ' +
            'Is the action simultaneous or prior?',
          exampleAnswer:
            'rispettino — present subjunctive (simultaneous with the present main clause).',
        },
        {
          taskType: TaskType.tense_selection,
          focus: 'Past main clause',
          prompt:
            'Select the correct subjunctive: "Era necessario che i giovani ___ (capire) il valore della convivenza." ' +
            'Which cell of the grid?',
          exampleAnswer:
            'capissero — imperfect subjunctive (past main clause, simultaneous action).',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Full sequence in context',
          prompt:
            'Complete both blanks: "Dubito che Marco ___ (arrivare) in tempo adesso — ma ieri pensavo che ' +
            '___ (già partire) la mattina."',
          exampleAnswer:
            'Dubito che Marco arrivi in tempo adesso — ma ieri pensavo che fosse già partito la mattina.',
          notes:
            'Two different cells of the grid in one exercise. Note the essere agreement on partito.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'The conditional counts as "past"',
          prompt:
            'Which is correct after "Sarebbe strano che…"? ' +
            '(A) …vengano ora. (B) …venissero ora.',
          exampleAnswer:
            'B — venissero. The conditional counts as a "past-type" main clause for sequencing.',
          notes:
            'This is the subtlest rule in the grid — the conditional triggering the imperfect subjunctive ' +
            'confuses even advanced learners. Flag it explicitly.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Four cells from memory',
          prompt: 'Cover the grid and state all four combinations: what tense goes in each cell?',
        },
      ],
    },
    {
      slug: 'cap18-tavola-condivisa',
      title: 'La tavola condivisa — a meal across cultures',
      lessonType: LessonType.scenario_roleplay,
      level: CEFRLevel.advanced,
      summary:
        'You are invited to a shared meal — una cena multiculturale — organised by a neighbourhood ' +
        'association in Trieste. Around the table, people from different backgrounds swap stories, ' +
        'recipes, and reflections on what it means to feel at home in Italy. A respectful, curious ' +
        'conversation about food, identity, and belonging.',
      objectiveSkillSlugs: [
        'it-vocab-multicultural',
        'it-vocab-values',
        'it-congiuntivo-imperfetto',
      ],
      defaultDurationMinutes: 13,
      compatibleThemes: ['culture', 'food', 'politics'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Set the scene',
          prompt:
            'You are at a long table in a courtyard in Trieste. Next to you is Amara, originally from ' +
            'Senegal, who has lived in Italy for fifteen years. She asks: "Cosa ti ha sorpreso di più ' +
            'della cultura italiana quando sei arrivato/a?" How do you answer?',
          notes:
            'If the learner is not an immigrant themselves, invite them to imagine the perspective of a ' +
            'friend or to answer from the angle of arriving in a new city or neighbourhood.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Food as a bridge',
          prompt:
            'Tell Amara about a dish from another culture that you love. Use at least one verb of ' +
            'opinion or emotion followed by the subjunctive (Mi piace che… / È bello che… / Trovo ' +
            'straordinario che…).',
          notes:
            "Personalise to the learner's actual culinary preferences if known. This is a low-stakes, " +
            'high-engagement way to activate the subjunctive trigger verbs.',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'A question about identity',
          prompt:
            'Another guest, Marco, says: "Secondo me, per integrarsi davvero bisogna lasciare le proprie ' +
            'tradizioni." Do you agree or disagree? Respond in Italian, using the congiuntivo imperfetto ' +
            'at least once (e.g. Penserei che… / Non credevo che…).',
          exampleAnswer:
            'Non sono del tutto d’accordo. Penserei che si potesse mantenere la propria identità e ' +
            'allo stesso tempo rispettare la cultura del paese in cui si vive. La diversità arricchisce ' +
            'tutti noi.',
          notes:
            'Model nuanced disagreement: "capisco il tuo punto, però…" or "è vero che…, tuttavia…" ' +
            'Keep the tone warm and curious, not combative.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Values vocabulary in context',
          prompt:
            'Complete with the correct word from the values vocabulary cluster: ' +
            '"La ___ (coexistence) tra culture diverse non avviene automaticamente — richiede ___ ' +
            '(respect) e ___ (solidarity) da tutti i lati."',
          exampleAnswer: 'convivenza … rispetto … solidarietà',
        },
        {
          taskType: TaskType.reflection,
          focus: 'Your own takeaway',
          prompt:
            'After this imaginary meal: what one thing would you say you learned or appreciated? ' +
            'Answer in Italian, beginning with "Sono contento/a che questa conversazione…" or ' +
            '"Mi ha colpito che…"',
          notes:
            'Metacognitive close that also produces a natural subjunctive sentence. Praise grammatical ' +
            'risk-taking over accuracy at this stage.',
        },
      ],
    },
    {
      slug: 'cap18-valori-vocab-review',
      title: 'Società e valori — vocabulary review',
      lessonType: LessonType.vocabulary_review,
      level: CEFRLevel.advanced,
      summary:
        'Consolidate the multicultural society and shared values vocabulary across both clusters, ' +
        'with attention to the word pairs that are most easily confused and the terms most likely ' +
        'to appear in advanced Italian reading.',
      objectiveSkillSlugs: ['it-vocab-multicultural', 'it-vocab-values'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['politics', 'news', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Two clusters, one conversation',
          prompt:
            'The vocabulary of multiculturalism (immigrazione, integrazione, diversità…) and the ' +
            'vocabulary of values (rispetto, solidarietà, uguaglianza…) are the language of one of ' +
            "Italy's most important public debates. Let's make sure you own it.",
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'immigrato vs emigrato',
          prompt:
            'Which is correct? "I miei nonni erano ___ italiani che andarono in Argentina negli anni ’50." ' +
            '(A) immigrati (B) emigrati',
          exampleAnswer:
            'B — emigrati. They left Italy, so they emigrated. Immigrati would describe people who arrived in Italy.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Values in a speech',
          prompt:
            'Complete the passage: "Una società giusta si fonda sull’___ (equality), sulla ___ ' +
            '(solidarity), e sul rispetto dei ___ (human rights) di ogni persona."',
          exampleAnswer: 'uguaglianza … solidarietà … diritti umani',
        },
        {
          taskType: TaskType.translation,
          focus: 'Active production',
          prompt:
            'Translate: "The welcome offered to newcomers reflects the values of a community."',
          exampleAnswer:
            'L’accoglienza offerta ai nuovi arrivati riflette i valori di una comunità.',
          notes: 'Note l’accoglienza — the irregular verb accogliere in noun form.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Your own definition',
          prompt:
            'In Italian, define one value from today’s lesson in your own words — without using ' +
            'its dictionary definition. Start with "Per me, [valore] significa…"',
          notes:
            'This forces productive use of paraphrase and circumlocution — a key advanced skill. ' +
            'Accept any fluent definition; focus feedback on vocabulary precision.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Self-quiz',
          prompt:
            'Without looking: give the Italian for "integration", "prejudice", "citizenship", ' +
            '"coexistence", and "human rights".',
          exampleAnswer:
            'l’integrazione, il pregiudizio, la cittadinanza, la convivenza, i diritti umani',
        },
      ],
    },
  ],

  // ─── Thematic vocabulary bank ─────────────────────────────────────────────
  vocabulary: [
    // La società multiculturale
    {
      slug: 'cap18-la-societa',
      targetText: 'la società',
      nativeText: 'society',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'societa-multiculturale',
      exampleSentence: 'Viviamo in una società sempre più multiculturale.',
      exampleTranslation: 'We live in an increasingly multicultural society.',
    },
    {
      slug: 'cap18-limmigrazione',
      targetText: 'l’immigrazione',
      nativeText: 'immigration',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'societa-multiculturale',
      exampleSentence: 'Il dibattito sull’immigrazione domina la politica italiana da decenni.',
      exampleTranslation: 'The immigration debate has dominated Italian politics for decades.',
    },
    {
      slug: 'cap18-limmigrato',
      targetText: 'l’immigrato / l’immigrata',
      nativeText: 'immigrant (male / female)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'societa-multiculturale',
    },
    {
      slug: 'cap18-lemigrato',
      targetText: 'l’emigrato / l’emigrata',
      nativeText: 'emigrant (male / female)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'societa-multiculturale',
      exampleSentence:
        'Milioni di emigrati italiani costruirono nuove vite in America e in Australia.',
      exampleTranslation: 'Millions of Italian emigrants built new lives in America and Australia.',
    },
    {
      slug: 'cap18-lintegrazione',
      targetText: 'l’integrazione',
      nativeText: 'integration',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'societa-multiculturale',
      exampleSentence:
        'L’integrazione scolastica è fondamentale per i bambini di famiglie straniere.',
      exampleTranslation: 'School integration is fundamental for children of foreign families.',
    },
    {
      slug: 'cap18-la-diversita',
      targetText: 'la diversità',
      nativeText: 'diversity',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'societa-multiculturale',
      exampleSentence: 'La diversità culturale è una ricchezza, non un problema.',
      exampleTranslation: 'Cultural diversity is a wealth, not a problem.',
    },
    {
      slug: 'cap18-la-cultura',
      targetText: 'la cultura',
      nativeText: 'culture',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'societa-multiculturale',
    },
    {
      slug: 'cap18-la-tradizione',
      targetText: 'la tradizione',
      nativeText: 'tradition',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'societa-multiculturale',
      exampleSentence: 'Le tradizioni culinarie si trasmettono di generazione in generazione.',
      exampleTranslation: 'Culinary traditions are passed down from generation to generation.',
    },
    {
      slug: 'cap18-la-religione',
      targetText: 'la religione',
      nativeText: 'religion',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'societa-multiculturale',
    },
    {
      slug: 'cap18-la-tolleranza',
      targetText: 'la tolleranza',
      nativeText: 'tolerance',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'societa-multiculturale',
      exampleSentence: 'La tolleranza non basta: ci vuole vera accettazione.',
      exampleTranslation: 'Tolerance is not enough: genuine acceptance is needed.',
    },
    {
      slug: 'cap18-il-pregiudizio',
      targetText: 'il pregiudizio',
      nativeText: 'prejudice',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'societa-multiculturale',
      exampleSentence: 'I pregiudizi si superano attraverso la conoscenza e il contatto diretto.',
      exampleTranslation: 'Prejudices are overcome through knowledge and direct contact.',
    },
    {
      slug: 'cap18-lidentita',
      targetText: 'l’identità',
      nativeText: 'identity',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'societa-multiculturale',
      exampleSentence: 'L’identità culturale è complessa e non si riduce a un solo elemento.',
      exampleTranslation: 'Cultural identity is complex and cannot be reduced to a single element.',
    },
    {
      slug: 'cap18-accogliere',
      targetText: 'accogliere',
      nativeText: 'to welcome / to receive',
      partOfSpeech: 'verb',
      theme: 'societa-multiculturale',
      exampleSentence: 'La città ha accolto i profughi con generosità.',
      exampleTranslation: 'The city welcomed the refugees with generosity.',
    },
    {
      slug: 'cap18-lo-straniero',
      targetText: 'lo straniero / la straniera',
      nativeText: 'the foreigner / stranger',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'societa-multiculturale',
    },
    // I valori
    {
      slug: 'cap18-i-valori',
      targetText: 'i valori',
      nativeText: 'values',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-valori',
      exampleSentence: 'I valori democratici sono il fondamento della convivenza civile.',
      exampleTranslation: 'Democratic values are the foundation of civil coexistence.',
    },
    {
      slug: 'cap18-il-rispetto',
      targetText: 'il rispetto',
      nativeText: 'respect',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-valori',
      exampleSentence: 'Il rispetto reciproco è il punto di partenza di ogni dialogo.',
      exampleTranslation: 'Mutual respect is the starting point of every dialogue.',
    },
    {
      slug: 'cap18-la-solidarieta',
      targetText: 'la solidarietà',
      nativeText: 'solidarity',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-valori',
    },
    {
      slug: 'cap18-la-convivenza',
      targetText: 'la convivenza',
      nativeText: 'coexistence / living together',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-valori',
      exampleSentence: 'La convivenza pacifica richiede impegno quotidiano.',
      exampleTranslation: 'Peaceful coexistence requires daily commitment.',
    },
    {
      slug: 'cap18-i-diritti-umani',
      targetText: 'i diritti umani',
      nativeText: 'human rights',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-valori',
      exampleSentence: 'Il rispetto dei diritti umani non è negoziabile.',
      exampleTranslation: 'Respect for human rights is non-negotiable.',
    },
    {
      slug: 'cap18-la-pace',
      targetText: 'la pace',
      nativeText: 'peace',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-valori',
    },
    {
      slug: 'cap18-la-cittadinanza',
      targetText: 'la cittadinanza',
      nativeText: 'citizenship',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-valori',
      exampleSentence: 'La riforma della cittadinanza è uno dei temi più discussi in Parlamento.',
      exampleTranslation: 'Citizenship reform is one of the most debated topics in Parliament.',
    },
    {
      slug: 'cap18-luguaglianza',
      targetText: 'l’uguaglianza',
      nativeText: 'equality',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-valori',
      exampleSentence:
        'L’uguaglianza davanti alla legge è sancita dall’articolo 3 della Costituzione.',
      exampleTranslation: 'Equality before the law is enshrined in Article 3 of the Constitution.',
    },
    {
      slug: 'cap18-la-comunita',
      targetText: 'la comunità',
      nativeText: 'community',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-valori',
      exampleSentence: 'La comunità somala di Milano è una delle più numerose d’Italia.',
      exampleTranslation: 'The Somali community in Milan is one of the largest in Italy.',
    },
    {
      slug: 'cap18-laccoglienza',
      targetText: 'l’accoglienza',
      nativeText: 'welcome / hospitality (as a value)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-valori',
      exampleSentence: 'L’accoglienza è un valore profondamente radicato nella cultura italiana.',
      exampleTranslation: 'Hospitality is a value deeply rooted in Italian culture.',
    },
    {
      slug: 'cap18-la-liberta',
      targetText: 'la libertà',
      nativeText: 'freedom / liberty',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-valori',
    },
  ],
};

export default unit;
