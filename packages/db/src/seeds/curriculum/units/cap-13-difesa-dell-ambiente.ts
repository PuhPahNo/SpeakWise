// Capitolo 13 — La difesa dell’ambiente
// Theme: news / culture. The environment, traffic, and the planet — powered by
// the condizionale presente and passato, modals in the conditional, and
// possessive pronouns. Set against the backdrop of Abruzzo and Molise.
//
// All content original (copyright-safe).

import { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client';
import type { SeedUnit } from '../types';

const unit: SeedUnit = {
  code: 'cap-13',
  order: 13,
  title: 'La difesa dell’ambiente',
  subtitle: 'The conditional, politeness, and the planet',
  theme: 'news',
  level: CEFRLevel.upper_intermediate,
  summary:
    'Step into one of the most versatile grammatical tools in Italian — the condizionale — and put it ' +
    'to immediate use: making polite requests at a hotel, giving environmental advice, imagining what ' +
    'you would have done differently. Along the way you build rich vocabulary for ecology, traffic, ' +
    'and sustainable living, and discover why Abruzzo and Molise, with their vast national parks, are ' +
    'the green heart of the Italian peninsula.',
  canDo: [
    'Make polite requests and offers using the condizionale (Vorrei…, Potrebbe…?, Le dispiacerebbe…?)',
    'Give advice and express obligation with dovrei, potrei, and vorrei',
    'Describe hypothetical or desired situations (Sarebbe bello se…)',
    'Say what you would have done using the condizionale passato',
    'Discuss environmental problems and solutions using topic vocabulary',
    'Use possessive pronouns alone, without a following noun (il mio, la tua, il suo…)',
  ],
  culturalNotes: [
    {
      title: 'La raccolta differenziata — Italy’s colour-coded recycling system',
      body:
        'Since the 1990s, Italian municipalities have rolled out raccolta differenziata (separate ' +
        'waste collection), assigning a different coloured bin to each category: organic waste ' +
        '(brown or green), paper and cardboard (blue or white), glass (green), plastic and metal ' +
        '(yellow), and general waste (grey or black). Compliance rates vary dramatically by region: ' +
        'Treviso and Pordenone in the north regularly top 80%, while some southern cities still ' +
        'struggle to reach 30%. Locals take the system seriously — putting the wrong item in the ' +
        'wrong bin can earn you a fine or a stern look from a neighbour.',
    },
    {
      title: 'ZTL — the zones that keep cars out of historic centres',
      body:
        'Virtually every Italian city with a medieval centro storico operates a ZTL (Zona a Traffico ' +
        'Limitato), a restricted-traffic zone where only authorised vehicles — residents, delivery ' +
        'trucks in designated hours, emergency services — may enter. Cameras read licence plates ' +
        'automatically, and a fine of €80–150 arrives in the post weeks later. Tourists who drive ' +
        'a rental car into Florence, Siena, or Lucca without checking the ZTL map are among the most ' +
        'common victims. The zones have measurably reduced smog and noise in city centres, and many ' +
        'cities are expanding them as part of broader pedestrianisation plans.',
    },
    {
      title: 'Abruzzo e Molise — the wild green heart of Italy',
      body:
        'Sandwiched between the Adriatic coast and the Apennine spine, Abruzzo and Molise contain ' +
        'some of the most intact wilderness in Western Europe. The Parco Nazionale d’Abruzzo, ' +
        'Lazio e Molise — founded in 1923 and one of Italy’s oldest protected areas — shelters ' +
        'the Marsican brown bear (orso marsicano), the Apennine wolf, and the Abruzzo chamois, all ' +
        'species that came back from the edge of extinction through decades of conservation work. ' +
        'The region is often called "the greenest in Europe" — roughly one third of Abruzzo is ' +
        'protected parkland. For Italians who care about the environment, a hike through the Maiella ' +
        'or a sighting of an orso marsicano in the wild carries genuine emotional weight.',
    },
  ],

  // ─── Skills ───────────────────────────────────────────────────────────────
  skills: [
    {
      slug: 'it-conditional-present',
      name: 'Condizionale presente (present conditional)',
      category: SkillCategory.grammar,
      level: CEFRLevel.upper_intermediate,
      description:
        'The condizionale presente expresses what would happen or what you would like. It is formed ' +
        'on the same stem as the future tense (the infinitive minus the final -e, with -are verbs ' +
        'changing -a- to -e-) plus the endings -ei, -esti, -ebbe, -emmo, -este, -ebbero. Key irregular ' +
        'stems match the future exactly: sar- (essere), avr- (avere), andr- (andare), far- (fare), ' +
        'verr- (venire), vorr- (volere), potr- (potere), dovr- (dovere), vedr- (vedere), berr- (bere). ' +
        'The three main uses are: politeness (Vorrei un caffè; Potrebbe ripetere?), desire or opinion ' +
        '(Sarebbe bello vivere al mare), and hypothetical outcomes.',
      prerequisiteSlugs: ['it-future-simple'],
      examples: [
        {
          target: 'Vorrei prenotare una camera per due notti.',
          native: 'I’d like to book a room for two nights.',
          note: 'Polite request — far softer than voglio',
        },
        {
          target: 'Sarebbe bello visitare il Parco Nazionale d’Abruzzo.',
          native: 'It would be lovely to visit the Abruzzo National Park.',
          note: 'Desire / wishful thinking',
        },
        {
          target: 'Con meno traffico, la città sarebbe molto più vivibile.',
          native: 'With less traffic, the city would be much more liveable.',
          note: 'Hypothetical outcome',
        },
        {
          target: 'Andrebbero volentieri in vacanza, ma non hanno tempo.',
          native: 'They’d happily go on holiday, but they don’t have time.',
          note: 'Third-person plural irregular stem andr-',
        },
      ],
      commonMistakes: [
        'Using the present indicative for polite requests instead of the conditional (voglio instead of vorrei)',
        'Applying the -are infinitive stem directly without changing -a- to -e- (parlarei → parlerei)',
        'Confusing conditional endings with imperfect endings (they start the same: -ei, but the full sets differ)',
        'Forgetting that irregular stems are shared with the future — learners who know the future already know these stems',
      ],
      recommendedPracticeTypes: [
        TaskType.conjugation,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['travel', 'news', 'culture', 'business', 'politics'],
      teachingNotes:
        'Anchor the stem in the future tense the learner already knows: "same stem, new endings." ' +
        'Lead with the politeness register (Vorrei / Potrebbe?) because it delivers immediate, ' +
        'high-value payoff in real interactions. Then layer in the hypothetical use with environment ' +
        'topics (Sarebbe bello se inquinassimo di meno) without introducing the congiuntivo clause yet.',
    },
    {
      slug: 'it-modals-conditional',
      name: 'Modal verbs in the conditional (dovrei, potrei, vorrei)',
      category: SkillCategory.grammar,
      level: CEFRLevel.upper_intermediate,
      description:
        'The three core modal verbs — dovere, potere, volere — take on precise nuances in the ' +
        'conditional that are essential for polite, diplomatic Italian. Dovrei means "I should / ' +
        'I ought to" (advice or mild obligation). Potrei means "I could / I might" (possibility or ' +
        'a tentative offer). Vorrei means "I would like" (desire or polite request). These three ' +
        'forms are the backbone of tactful Italian in every register — from asking a favour to ' +
        'giving a recommendation.',
      prerequisiteSlugs: ['it-conditional-present', 'it-modal-verbs'],
      examples: [
        {
          target: 'Dovresti usare i mezzi pubblici più spesso.',
          native: 'You should use public transport more often.',
          note: 'dovrei/dovresti for advice',
        },
        {
          target: 'Potremmo andare in bicicletta invece di prendere la macchina.',
          native: 'We could go by bike instead of taking the car.',
          note: 'potremmo for a suggestion / tentative proposal',
        },
        {
          target: 'Vorrebbe ridurre i rifiuti, ma non sa da dove cominciare.',
          native: 'She’d like to reduce waste, but she doesn’t know where to start.',
          note: 'vorrebbe for third-person desire',
        },
        {
          target: 'Potrebbe abbassare il volume, per favore?',
          native: 'Could you turn the volume down, please?',
          note: 'Formal polite request with potere + Lei',
        },
      ],
      commonMistakes: [
        'Overusing the indicative (devo, posso, voglio) in contexts where the conditional is far more polite',
        'Confusing dovrei (I should) with devo (I must) — both exist but carry different levels of obligation',
        'Producing vorrei with the wrong stem (vorrò is future, vorrei is conditional)',
        'Neglecting agreement when the modal is followed by an infinitive — the infinitive does not change',
      ],
      recommendedPracticeTypes: [
        TaskType.translation,
        TaskType.fill_blank,
        TaskType.roleplay,
        TaskType.error_correction,
      ],
      compatibleThemes: ['news', 'politics', 'business', 'travel', 'culture'],
      teachingNotes:
        'Teach these three modals as a politeness register upgrade: "You already know devo/posso/voglio; ' +
        'now learn the softer version for every situation where you want to sound educated and considerate." ' +
        'The environmental theme is a natural setting for dovrei-based advice (Dovremmo riciclare di più; ' +
        'Non dovresti sprecare l’acqua). Roleplay as an environmental consultant or hotel guest to ' +
        'activate the forms immediately.',
    },
    {
      slug: 'it-conditional-past',
      name: 'Condizionale passato (past conditional)',
      category: SkillCategory.grammar,
      level: CEFRLevel.upper_intermediate,
      description:
        'The condizionale passato expresses what would have happened (an unrealised past action) and ' +
        'also serves as the "future in the past" after a reporting verb in the past. It is formed with ' +
        'the condizionale presente of avere or essere plus the past participle of the main verb: avrei ' +
        'fatto (I would have done), sarei andato/a (I would have gone). Agreement rules for essere ' +
        'verbs are the same as in the passato prossimo. As "future in the past": Ha detto che sarebbe ' +
        'arrivato alle otto means "He said he would arrive at eight."',
      prerequisiteSlugs: ['it-conditional-present', 'it-passato-prossimo-essere'],
      examples: [
        {
          target: 'Avrei riciclato la plastica, ma il bidone era pieno.',
          native: 'I would have recycled the plastic, but the bin was full.',
          note: 'Unrealised past action with avere',
        },
        {
          target: 'Con più piste ciclabili, più persone sarebbero andate al lavoro in bici.',
          native: 'With more cycle lanes, more people would have cycled to work.',
          note: 'Essere verb — agreement with the plural subject',
        },
        {
          target: 'Il ministro ha promesso che avrebbe ridotto le emissioni entro cinque anni.',
          native: 'The minister promised he would reduce emissions within five years.',
          note: 'Future in the past after a past reporting verb',
        },
      ],
      commonMistakes: [
        'Using the simple conditional where the past conditional is needed (avrei fatto, not farei)',
        'Forgetting past participle agreement with essere verbs (sarei andato/a, not always "andato")',
        'Confusing "future in the past" with the regular past conditional — both use the same form, context tells them apart',
        'Producing the wrong auxiliary (ho sarebbe instead of sarebbe — the auxiliary is conditional, not indicative)',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.error_correction,
        TaskType.conjugation,
      ],
      compatibleThemes: ['news', 'politics', 'history', 'culture'],
      teachingNotes:
        'Build on the condizionale presente the learner already has: "same idea, but we replace the ' +
        'infinitive with the past participle and add avere/essere in the conditional." The "future in ' +
        'the past" use is high-frequency in news Italian (ha annunciato che avrebbe…) — use real-sounding ' +
        'environmental headlines to contextualise it. Contrast avrei fatto vs farei clearly in a side-by-side.',
    },
    {
      slug: 'it-possessive-pronouns',
      name: 'Possessive pronouns (pronomi possessivi)',
      category: SkillCategory.grammar,
      level: CEFRLevel.upper_intermediate,
      description:
        'Possessive pronouns in Italian have the same forms as the possessive adjectives but stand alone, ' +
        'replacing the noun entirely: il mio, la mia, i miei, le mie (mine); il tuo, la tua… (yours); ' +
        'il suo, la sua… (his/hers/its); il nostro, la nostra… (ours); il vostro, la vostra… (yours pl.); ' +
        'il loro, la loro… (theirs). The article is almost always kept with possessive pronouns (unlike ' +
        'with family nouns in the adjective use). Comparison: La mia macchina è vecchia — la tua è nuova. ' +
        'Predicative use without article: Questo posto è mio. È tuo questo zaino?',
      prerequisiteSlugs: ['it-possessive-adjectives'],
      examples: [
        {
          target: 'La mia bicicletta è rotta; posso usare la tua?',
          native: 'My bike is broken; can I use yours?',
          note: 'La tua stands alone — no noun follows',
        },
        {
          target: 'Il nostro Comune fa la raccolta differenziata. Il vostro?',
          native: 'Our municipality does separate waste collection. Does yours?',
          note: 'Il vostro replaces "il vostro Comune"',
        },
        {
          target: 'Questa bottiglia non è mia — è sua.',
          native: 'This bottle isn’t mine — it’s his/hers.',
          note: 'Predicative use: no article after essere',
        },
        {
          target: 'I miei vicini riciclano; i loro buttano tutto insieme.',
          native: 'My neighbours recycle; theirs throw everything together.',
          note: 'I loro — third-person plural, invariable',
        },
      ],
      commonMistakes: [
        'Dropping the article (la mia becomes mia as a pronoun — incorrect in most contexts)',
        'Confusing il suo (his/hers) with il loro (theirs) — Italian distinguishes them; English "their" vs "his/her" maps to two different pronouns',
        'Adding an article in predicative position after essere (È il mio → È mio when no noun is expressed)',
        'Forgetting that loro is invariable — i loro, la loro, le loro all use the same loro base',
      ],
      recommendedPracticeTypes: [
        TaskType.pronoun_replacement,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.multiple_choice,
      ],
      compatibleThemes: ['family', 'culture', 'news', 'business'],
      teachingNotes:
        'The key insight is that these forms are identical to the adjectives — the learner already ' +
        'knows them — and the only new rule is "keep the article when the pronoun stands alone." ' +
        'Drill the predicative (post-essere, no article) vs free-standing (article retained) contrast. ' +
        'The loro invariability is a small but reliable error source — flag it once and revisit.',
    },
    {
      slug: 'it-vocab-environment',
      name: 'The environment (l’ambiente)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.upper_intermediate,
      description:
        'The core vocabulary for discussing ecology, pollution, recycling, and sustainability: ' +
        'everything you need to read an Italian newspaper headline about climate or take part in a ' +
        'conversation about protecting the planet.',
      prerequisiteSlugs: ['it-noun-gender', 'it-definite-articles'],
      examples: [
        {
          target: 'L’inquinamento atmosferico è peggiorato nelle ultime decadi.',
          native: 'Air pollution has worsened in recent decades.',
        },
        {
          target: 'Dovreste fare la raccolta differenziata ogni giorno.',
          native: 'You should do separate waste collection every day.',
        },
        {
          target: 'Stiamo cercando di ridurre gli sprechi domestici.',
          native: 'We are trying to reduce household waste.',
        },
      ],
      commonMistakes: [
        'Confusing i rifiuti (waste/rubbish) with gli sprechi (wasteful consumption) — both relate to waste but in different senses',
        'Using inquinamento as a verb — the verb is inquinare (to pollute)',
        'Mixing up rinnovabile (renewable) and sostenibile (sustainable) — related but distinct concepts',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.speaking_prompt,
        TaskType.translation,
      ],
      compatibleThemes: ['news', 'politics', 'culture', 'travel'],
      teachingNotes:
        'Pair each noun with a verb where possible (inquinamento → inquinare; riciclaggio → riciclare; ' +
        'protezione → proteggere) so the learner builds word families, not isolated items. Use the ' +
        'Abruzzo national park context to make it vivid: the region’s brown bear comeback is a ' +
        'concrete success story that makes abstract vocabulary emotionally real.',
    },
    {
      slug: 'it-vocab-traffic',
      name: 'Traffic and urban transport (il traffico)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.upper_intermediate,
      description:
        'The vocabulary of city streets, traffic, and the choices Italians make (or are forced to make) ' +
        'between the car and alternatives: from the ingorgo on the autostrada to the pista ciclabile ' +
        'and the ZTL in the centro storico.',
      prerequisiteSlugs: ['it-noun-gender', 'it-definite-articles'],
      examples: [
        {
          target: 'C’è un ingorgo enorme sull’autostrada — meglio prendere i mezzi.',
          native: 'There’s a huge traffic jam on the motorway — better to take public transport.',
        },
        {
          target: 'Non puoi parcheggiare qui: siamo nella ZTL.',
          native: 'You can’t park here: we’re in the restricted-traffic zone.',
        },
        {
          target: 'Lo smog in città potrebbe diminuire se usassimo di più la pista ciclabile.',
          native: 'Smog in the city could decrease if we used the cycle lane more.',
        },
      ],
      commonMistakes: [
        'Confusing l’automobile/la macchina (car) with il camion (lorry/truck) — both are road vehicles but very different',
        'Using benzina for diesel — la benzina is petrol/gasoline; diesel is il gasolio or (colloquially) il diesel',
        'Saying "il semaforo è rosso" correctly but then misgendering it — il semaforo is masculine',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.roleplay,
        TaskType.multiple_choice,
        TaskType.translation,
      ],
      compatibleThemes: ['news', 'travel', 'culture', 'politics'],
      teachingNotes:
        'Frame vocabulary around a real urban problem — the ZTL story and the ingorgo scenario make ' +
        'items memorable. Link to the condizionale: "What would you do if there were no buses?" is a ' +
        'great speaking prompt that activates both the traffic vocab and the conditional grammar.',
    },
  ],

  // ─── Lesson templates ─────────────────────────────────────────────────────
  lessonTemplates: [
    {
      slug: 'cap13-be-polite',
      title: 'Being polite at the hotel — the conditional in action',
      lessonType: LessonType.grammar,
      level: CEFRLevel.upper_intermediate,
      summary:
        'You’ve arrived at a small eco-hotel in the Abruzzo mountains. Every request you make — ' +
        'from asking for an extra towel to suggesting the staff switch to solar energy — is a chance ' +
        'to practise the condizionale presente for politeness.',
      objectiveSkillSlugs: ['it-conditional-present', 'it-modals-conditional'],
      defaultDurationMinutes: 12,
      compatibleThemes: ['travel', 'news', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Stem + new endings',
          prompt:
            'The conditional uses the same stem as the future tense, but different endings: -ei, -esti, -ebbe, -emmo, -este, -ebbero. Let’s build parlare and essere together.',
          notes:
            'Show the stem derivation visually: parlare → parler- → parlerei. Contrast voglio (brusque) with vorrei (warm and polite) immediately — the register difference is the hook.',
        },
        {
          taskType: TaskType.conjugation,
          focus: 'Irregular stems',
          prompt: 'Give the io and Lei (formal) forms of: volere, potere, dovere, essere, avere.',
          exampleAnswer:
            'vorrei / vorrebbe; potrei / potrebbe; dovrei / dovrebbe; sarei / sarebbe; avrei / avrebbe',
          notes:
            'These five cover 90% of polite hotel interactions. Tie each form to a real request.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Polite requests',
          prompt:
            'Soften each request using the conditional: "Voglio una stanza più tranquilla." → "___ una stanza più tranquilla, per favore."',
          exampleAnswer: 'Vorrei una stanza più tranquilla, per favore.',
          notes: 'If the learner is interested in travel, use destinations they’ve mentioned.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Formal requests with Lei',
          prompt: 'Translate: "Could you tell me what time breakfast is served?" (formal)',
          exampleAnswer: 'Potrebbe dirmi a che ora viene servita la colazione?',
          notes:
            'The formal Lei form potrebbe is the single most useful conditional form for Italian travel.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Your own polite request',
          prompt:
            'Make three requests you might genuinely use at an Italian hotel — all in the conditional.',
          notes: 'Accept any grammatically correct condizionale. Focus feedback on stem accuracy.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Politeness upgrade',
          prompt:
            'What’s the difference between "Voglio" and "Vorrei", and when would each sound rude?',
        },
      ],
    },
    {
      slug: 'cap13-environmental-advice',
      title: 'Dovrei, potrei — giving advice about the environment',
      lessonType: LessonType.grammar,
      level: CEFRLevel.upper_intermediate,
      summary:
        'Practice the modal verbs in the conditional to give — and receive — advice about reducing ' +
        'pollution, saving energy, and living more sustainably. The perfect mix of grammar drill and ' +
        'real-world values.',
      objectiveSkillSlugs: ['it-modals-conditional', 'it-vocab-environment'],
      defaultDurationMinutes: 11,
      compatibleThemes: ['news', 'politics', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'The nuance of dovrei vs devo',
          prompt:
            'Devo = I must (obligation). Dovrei = I should (advice, softer, often self-reflective). ' +
            'Potrei = I could (option, suggestion). Vorrei = I’d like (desire). These three will ' +
            'carry you through every environmental debate.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Choose the right modal',
          prompt:
            '"___ riciclare di più — lo so, ma è complicato." Which fits: devo / dovrei / vorrei?',
          exampleAnswer: 'Dovrei riciclare di più — lo so, ma è complicato.',
          notes: 'Dovrei here is self-critical advice, not imposed obligation. That’s the nuance.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Complete the advice',
          prompt:
            'Fill in the correct modal conditional: "Se vuoi ridurre l’inquinamento, ___ (tu / usare) i mezzi pubblici e ___ (tu / evitare) di prendere l’auto ogni giorno."',
          exampleAnswer:
            'dovresti usare i mezzi pubblici e dovresti evitare di prendere l’auto ogni giorno.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Suggestions with potremmo',
          prompt: 'Translate: "We could install solar panels on the roof, couldn’t we?"',
          exampleAnswer: 'Potremmo installare i pannelli solari sul tetto, no?',
          notes: 'The tag question "no?" is common in Italian — note it without drilling it here.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Give real environmental advice',
          prompt:
            'What should your city do to reduce pollution? Give three suggestions using dovrebbe, potrebbe, or vorrebbe.',
          notes:
            'Personalise to the learner’s actual city if known. Accept any grammatically sound conditional. Environmental passion often produces excellent spontaneous output here.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Advice vs obligation',
          prompt: 'When would you use devo and when dovrei? Give one example of each.',
        },
      ],
    },
    {
      slug: 'cap13-what-you-would-have-done',
      title: 'Avrei fatto… — the past conditional',
      lessonType: LessonType.grammar,
      level: CEFRLevel.upper_intermediate,
      summary:
        'Learn to say what you would have done — and what you wish had been done differently — ' +
        'using the condizionale passato. Apply it to personal choices and bigger questions about ' +
        'environmental policy.',
      objectiveSkillSlugs: ['it-conditional-past'],
      defaultDurationMinutes: 11,
      compatibleThemes: ['news', 'history', 'politics'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Formula: conditional of avere/essere + past participle',
          prompt:
            'Think of it as the regular passato prossimo, but with the auxiliary in the conditional: avrei mangiato, sarei andato/a. That’s the whole structure.',
          notes:
            'Contrast side-by-side: ho mangiato (I ate) vs avrei mangiato (I would have eaten). Use the same irregular participles the learner knows from cap-05.',
        },
        {
          taskType: TaskType.conjugation,
          focus: 'Build the paradigm',
          prompt:
            'Give the condizionale passato for io and noi: fare, andare (essere verb), riciclare.',
          exampleAnswer:
            'avrei fatto / avremmo fatto; sarei andato/a / saremmo andati/e; avrei riciclato / avremmo riciclato',
          notes: 'Highlight the essere-verb agreement on andare.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Unrealised past actions',
          prompt:
            'Complete: "Se avessimo avuto più tempo, ___ (noi / fare) la raccolta differenziata meglio." (Use condizionale passato only for now.)',
          exampleAnswer: 'avremmo fatto la raccolta differenziata meglio.',
          notes:
            'The se-clause is in the congiuntivo imperfetto (cap-18) — for now, focus only on the condizionale passato result clause.',
        },
        {
          taskType: TaskType.translation,
          focus: '"Future in the past"',
          prompt:
            'Translate: "The government announced that it would reduce emissions by 30% within a decade."',
          exampleAnswer:
            'Il governo ha annunciato che avrebbe ridotto le emissioni del 30% nel giro di un decennio.',
          notes:
            'This is the "future in the past" use — common in newspapers. Flag it as a distinct pattern.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Personal reflection',
          prompt:
            'Think of one environmental choice from the past week. What would you have done differently?',
          notes:
            'Connect to the learner’s real life — commuting, shopping, food. Low pressure, high fluency.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Past vs present conditional',
          prompt:
            'What’s the difference between "farei" and "avrei fatto"? Give an example of each.',
          exampleAnswer:
            'Farei = I would do (now/future); avrei fatto = I would have done (unrealised past).',
        },
      ],
    },
    {
      slug: 'cap13-planet-debate',
      title: 'Debate: cosa faremmo per proteggere il pianeta?',
      lessonType: LessonType.scenario_roleplay,
      level: CEFRLevel.upper_intermediate,
      summary:
        'You are a panellist on an Italian radio programme debating what individuals, businesses, ' +
        'and governments should do to protect the environment. Use conditional forms, environmental ' +
        'vocabulary, and possessive pronouns to argue your case — and challenge your interlocutor’s ' +
        'views.',
      objectiveSkillSlugs: [
        'it-conditional-present',
        'it-modals-conditional',
        'it-vocab-environment',
        'it-vocab-traffic',
      ],
      defaultDurationMinutes: 14,
      compatibleThemes: ['news', 'politics', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Set the scene',
          prompt:
            'You’re live on Radio Abruzzo. The host asks: "Cosa dovremmo fare per ridurre l’inquinamento nella nostra regione?" You have two minutes. Go.',
          notes:
            'Frame the debate around a real tension the learner cares about — urban congestion, energy transition, wildlife protection. Pick the angle that matches their profile.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Opening statement',
          prompt:
            'Give your position in 3–4 sentences. Use at least one dovrei/dovremmo and one Sarebbe bello/Sarebbe necessario construction.',
          notes:
            'Accept any fluent conditional usage. Coach the register — this should sound considered, not aggressive.',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'Challenge and respond',
          prompt:
            'Your opponent says: "Le automobili sono indispensabili — non potremmo vivere senza." How do you respond using conditional vocabulary?',
          exampleAnswer:
            'Capisco il punto, ma potremmo investire di più nei mezzi pubblici. Senza gli ingorghi, la città sarebbe molto più vivibile.',
          notes:
            'Model polite disagreement — "Capisco… però…" or "È vero che… tuttavia…" are authentic debate moves.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Possessive pronouns in contrast',
          prompt:
            'Complete with the correct possessive pronoun: "La mia proposta è concreta. ___ (yours) invece sembra troppo costosa."',
          exampleAnswer: 'La tua invece sembra troppo costosa.',
          notes:
            'Possessive pronouns are natural in debate: compare proposals, reject theirs, defend yours.',
        },
        {
          taskType: TaskType.reflection,
          focus: 'Takeaway',
          prompt: 'Which Italian phrase from this debate would you actually use in real life? Why?',
          notes: 'Metacognitive close — helps retention and personalises the vocabulary.',
        },
      ],
    },
    {
      slug: 'cap13-vocab-review',
      title: 'L’ambiente e il traffico — vocabulary review',
      lessonType: LessonType.vocabulary_review,
      level: CEFRLevel.upper_intermediate,
      summary:
        'Consolidate the environment and traffic vocabulary across both thematic clusters, with ' +
        'a focus on the word pairs and derivations that are most likely to appear in Italian news.',
      objectiveSkillSlugs: ['it-vocab-environment', 'it-vocab-traffic'],
      defaultDurationMinutes: 9,
      compatibleThemes: ['news', 'culture', 'politics'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Two clusters, one theme',
          prompt:
            'Environment vocabulary (l’inquinamento, il riciclaggio, la natura…) and traffic vocabulary (il traffico, lo smog, la ZTL…) overlap constantly in Italian media. Let’s nail them.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Word families',
          prompt: 'Which verb comes from "il riciclaggio"?',
          exampleAnswer: 'riciclare',
          notes: 'Test the noun → verb direction, then reverse it in follow-up items.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Gapped headline',
          prompt:
            'Fill in: "Secondo il nuovo piano, la città ___ (will reduce) lo ___ e investirà in ___ (renewable energy) entro il 2030."',
          exampleAnswer: 'ridurrà lo smog e investirà in energia rinnovabile entro il 2030.',
          notes:
            'Mix future with vocab to keep the grammar fresh. Accept ridurrà or abbreviated forms.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Active production',
          prompt:
            'Translate: "Many people leave their car at home and use cycle lanes to reduce traffic jams."',
          exampleAnswer:
            'Molte persone lasciano la macchina a casa e usano le piste ciclabili per ridurre gli ingorghi.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Self-quiz on key items',
          prompt:
            'Without looking: give the Italian for "sustainable", "pedestrian", "rubbish / waste", and "traffic light".',
          exampleAnswer: 'sostenibile, il pedone, i rifiuti, il semaforo',
        },
      ],
    },
  ],

  // ─── Thematic vocabulary bank ─────────────────────────────────────────────
  vocabulary: [
    // L’ambiente — environment
    {
      slug: 'cap13-lambiente',
      targetText: 'l’ambiente',
      nativeText: 'the environment',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'l-ambiente',
      exampleSentence: 'Dobbiamo proteggere l’ambiente per le generazioni future.',
      exampleTranslation: 'We must protect the environment for future generations.',
    },
    {
      slug: 'cap13-linquinamento',
      targetText: 'l’inquinamento',
      nativeText: 'the pollution',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'l-ambiente',
      exampleSentence:
        'L’inquinamento atmosferico è una delle cause principali del cambiamento climatico.',
      exampleTranslation: 'Air pollution is one of the main causes of climate change.',
    },
    {
      slug: 'cap13-inquinare',
      targetText: 'inquinare',
      nativeText: 'to pollute',
      partOfSpeech: 'verb',
      theme: 'l-ambiente',
    },
    {
      slug: 'cap13-il-riciclaggio',
      targetText: 'il riciclaggio',
      nativeText: 'recycling',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'l-ambiente',
      exampleSentence: 'Il riciclaggio della carta riduce la deforestazione.',
      exampleTranslation: 'Paper recycling reduces deforestation.',
    },
    {
      slug: 'cap13-riciclare',
      targetText: 'riciclare',
      nativeText: 'to recycle',
      partOfSpeech: 'verb',
      theme: 'l-ambiente',
    },
    {
      slug: 'cap13-i-rifiuti',
      targetText: 'i rifiuti',
      nativeText: 'the waste / rubbish / garbage',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'l-ambiente',
      exampleSentence: 'Dove si mettono i rifiuti organici?',
      exampleTranslation: 'Where do you put organic waste?',
    },
    {
      slug: 'cap13-la-raccolta-differenziata',
      targetText: 'la raccolta differenziata',
      nativeText: 'separate / sorted waste collection',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'l-ambiente',
      exampleSentence: 'Nel nostro quartiere la raccolta differenziata è obbligatoria.',
      exampleTranslation: 'In our neighbourhood sorted waste collection is compulsory.',
    },
    {
      slug: 'cap13-lenergia-rinnovabile',
      targetText: 'l’energia rinnovabile',
      nativeText: 'renewable energy',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'l-ambiente',
      exampleSentence: 'Investire nell’energia rinnovabile è fondamentale per il futuro.',
      exampleTranslation: 'Investing in renewable energy is essential for the future.',
    },
    {
      slug: 'cap13-lenergia-solare',
      targetText: 'l’energia solare',
      nativeText: 'solar energy',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'l-ambiente',
    },
    {
      slug: 'cap13-proteggere',
      targetText: 'proteggere',
      nativeText: 'to protect',
      partOfSpeech: 'verb',
      theme: 'l-ambiente',
      exampleSentence: 'Dobbiamo proteggere la biodiversità del Parco Nazionale.',
      exampleTranslation: 'We must protect the biodiversity of the National Park.',
    },
    {
      slug: 'cap13-la-natura',
      targetText: 'la natura',
      nativeText: 'nature',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'l-ambiente',
    },
    {
      slug: 'cap13-il-cambiamento-climatico',
      targetText: 'il cambiamento climatico',
      nativeText: 'climate change',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'l-ambiente',
      exampleSentence: 'Il cambiamento climatico minaccia gli ecosistemi di tutto il mondo.',
      exampleTranslation: 'Climate change threatens ecosystems all over the world.',
    },
    {
      slug: 'cap13-sprecare',
      targetText: 'sprecare',
      nativeText: 'to waste (resources)',
      partOfSpeech: 'verb',
      theme: 'l-ambiente',
      exampleSentence: 'Non dobbiamo sprecare l’acqua.',
      exampleTranslation: 'We must not waste water.',
    },
    {
      slug: 'cap13-sostenibile',
      targetText: 'sostenibile',
      nativeText: 'sustainable',
      partOfSpeech: 'adj',
      theme: 'l-ambiente',
      exampleSentence: 'Preferiamo uno stile di vita più sostenibile.',
      exampleTranslation: 'We prefer a more sustainable lifestyle.',
    },
    {
      slug: 'cap13-gli-sprechi',
      targetText: 'gli sprechi',
      nativeText: 'wasteful consumption / waste (pl.)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'l-ambiente',
    },
    // Il traffico — traffic
    {
      slug: 'cap13-il-traffico',
      targetText: 'il traffico',
      nativeText: 'traffic',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-traffico',
      exampleSentence: 'Il traffico in centro è insopportabile nelle ore di punta.',
      exampleTranslation: 'Traffic in the centre is unbearable during rush hour.',
    },
    {
      slug: 'cap13-lautomobile',
      targetText: 'l’automobile / la macchina',
      nativeText: 'the car',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'il-traffico',
    },
    {
      slug: 'cap13-la-benzina',
      targetText: 'la benzina',
      nativeText: 'petrol / gasoline',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'il-traffico',
      exampleSentence: 'Il prezzo della benzina è aumentato di nuovo.',
      exampleTranslation: 'The price of petrol has gone up again.',
    },
    {
      slug: 'cap13-lautostrada',
      targetText: 'l’autostrada',
      nativeText: 'the motorway / highway',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'il-traffico',
    },
    {
      slug: 'cap13-lingorgo',
      targetText: 'l’ingorgo',
      nativeText: 'the traffic jam',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-traffico',
      exampleSentence: 'C’è un ingorgo chilometrico sulla tangenziale.',
      exampleTranslation: 'There’s a kilometres-long traffic jam on the ring road.',
    },
    {
      slug: 'cap13-i-mezzi-pubblici',
      targetText: 'i mezzi pubblici',
      nativeText: 'public transport',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-traffico',
      exampleSentence: 'Dovresti prendere i mezzi pubblici invece di guidare.',
      exampleTranslation: 'You should take public transport instead of driving.',
    },
    {
      slug: 'cap13-il-pedone',
      targetText: 'il pedone',
      nativeText: 'the pedestrian',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-traffico',
    },
    {
      slug: 'cap13-la-pista-ciclabile',
      targetText: 'la pista ciclabile',
      nativeText: 'the cycle lane',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'il-traffico',
      exampleSentence: 'Con più piste ciclabili, meno gente userebbe la macchina.',
      exampleTranslation: 'With more cycle lanes, fewer people would use the car.',
    },
    {
      slug: 'cap13-lo-smog',
      targetText: 'lo smog',
      nativeText: 'smog',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-traffico',
    },
    {
      slug: 'cap13-il-semaforo',
      targetText: 'il semaforo',
      nativeText: 'the traffic light',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-traffico',
      exampleSentence: 'Si è fermato al semaforo rosso.',
      exampleTranslation: 'He stopped at the red traffic light.',
    },
    {
      slug: 'cap13-parcheggiare',
      targetText: 'parcheggiare',
      nativeText: 'to park',
      partOfSpeech: 'verb',
      theme: 'il-traffico',
      exampleSentence: 'Non puoi parcheggiare qui — è una zona ZTL.',
      exampleTranslation: 'You can’t park here — it’s a ZTL zone.',
    },
  ],
};

export default unit;
