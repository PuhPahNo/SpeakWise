// Capitolo 16 — Politica e società
// Theme: politics. The Italian political landscape and the pressing issues of
// society — powered by the congiuntivo presente, its triggers, and the
// congiuntivo passato. Set against the backdrop of Il Lazio and Rome, the seat
// of the Italian state.
//
// All content original (copyright-safe).

import { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client';
import type { SeedUnit } from '../types';

const unit: SeedUnit = {
  code: 'cap-16',
  order: 16,
  title: 'Politica e società',
  subtitle: 'The subjunctive — expressing opinion, doubt, and emotion',
  theme: 'politics',
  level: CEFRLevel.advanced,
  summary:
    'Step into Italian public life: form opinions on government policy, react to social issues, ' +
    'and argue your position with nuance — all powered by the congiuntivo, the grammatical key ' +
    'to expressing doubt, hope, fear, and belief. You will master the present and past subjunctive, ' +
    'learn exactly which verbs and expressions trigger it, and build rich vocabulary for politics, ' +
    'institutions, and the social challenges Italians discuss every day. The chapter is set in ' +
    'Il Lazio, the region where Rome — Italy’s capital and the seat of its government — stands.',
  canDo: [
    'Conjugate regular and common irregular verbs in the congiuntivo presente',
    'Express opinions, doubts, and hopes using penso/credo/spero che + subjunctive',
    'Distinguish between subjunctive triggers (opinion, doubt, emotion) and certainty verbs that take the indicative',
    'Form the congiuntivo passato to describe a past action inside a subjunctive clause',
    'Discuss government institutions, elections, and social issues in Italian',
    'Engage respectfully in a political debate, expressing disagreement without aggression',
  ],
  culturalNotes: [
    {
      title: 'Un sistema multi-partito — Italy’s fragmented political landscape',
      body:
        'Unlike countries with two dominant parties, Italy operates a pronounced multi-party system ' +
        'in which governments are almost always formed by coalitions of three or more parties. ' +
        'Historically the landscape was dominated by the Democrazia Cristiana on the centre-right ' +
        'and the Partito Comunista Italiano on the left, but after the Tangentopoli corruption ' +
        'investigations of the early 1990s the entire party map was redrawn. Today the major forces ' +
        'include the centre-right Fratelli d’Italia and Lega, the centre Partito Democratico, and ' +
        'the populist Movimento 5 Stelle, plus numerous smaller allies. Each coalition partner ' +
        'typically retains its own symbol, manifesto, and ministerial ambitions, making Italian ' +
        'politics famously dynamic — and occasionally chaotic.',
    },
    {
      title: 'Votare la domenica — Sunday voting and the referendum tradition',
      body:
        'Italians vote on Sundays. National elections, regional elections, and referendums are all ' +
        'held on a Sunday (and sometimes continue into Monday morning) to maximise participation. ' +
        'The referendum holds a special place in Italian civic culture: enshrined in the 1948 ' +
        'Constitution, the abrogative referendum allows citizens to repeal existing laws if 500,000 ' +
        'signatures are gathered and a majority of the electorate votes. Notable referendums have ' +
        'decided the fate of the monarchy (1946), the divorce law (1974), and the nuclear energy ' +
        'programme (1987). Turnout has declined in recent decades, but a referendum still mobilises ' +
        'strong civic emotion, and the phrase "Vado a votare domenica" carries real cultural weight.',
    },
    {
      title: 'Il Lazio e Roma — the heart of Italian government',
      body:
        'Il Lazio, the region surrounding Rome, is where the machinery of the Italian state is ' +
        'concentrated. The Palazzo del Quirinale on the Quirinal Hill is the official residence of ' +
        'the Presidente della Repubblica. Parliament meets in two separate buildings: the Camera dei ' +
        'Deputati in Montecitorio and the Senato della Repubblica in Palazzo Madama. The Palazzo ' +
        'Chigi, just off Piazza Colonna, is the seat of the Presidente del Consiglio (prime minister) ' +
        'and the Council of Ministers. For Italians, these addresses are as recognisable as ' +
        '"Downing Street" or "the White House" — a news headline mentioning Chigi or Quirinale ' +
        'instantly signals the highest levels of government.',
    },
  ],

  // ─── Skills ───────────────────────────────────────────────────────────────
  skills: [
    {
      slug: 'it-congiuntivo-presente',
      name: 'Congiuntivo presente (present subjunctive)',
      category: SkillCategory.grammar,
      level: CEFRLevel.advanced,
      description:
        'The present subjunctive is used in subordinate che-clauses after verbs of opinion, doubt, ' +
        'will, and emotion. For -are verbs the endings are -i, -i, -i, -iamo, -iate, -ino (parli, ' +
        'parliamo, parlino). For -ere and -ire verbs: -a, -a, -a, -iamo, -iate, -ano (prenda, prendano; ' +
        'senta, sentano); -isco verbs follow the same pattern (capisca, capiscano). Key irregulars: ' +
        'essere → sia, avere → abbia, fare → faccia, andare → vada, potere → possa, volere → voglia, ' +
        'sapere → sappia, dare → dia, stare → stia, venire → venga, dire → dica, uscire → esca, ' +
        'dovere → debba.',
      prerequisiteSlugs: ['it-regular-are-verbs-present', 'it-modal-verbs'],
      examples: [
        {
          target: 'Penso che il governo debba fare di più per ridurre la disoccupazione.',
          native: 'I think the government must do more to reduce unemployment.',
          note: 'debba — irregular congiuntivo of dovere',
        },
        {
          target: 'È importante che ogni cittadino vada a votare.',
          native: 'It is important that every citizen goes to vote.',
          note: 'vada — irregular congiuntivo of andare',
        },
        {
          target: 'Spero che il parlamento approvi la nuova legge.',
          native: 'I hope that parliament passes the new law.',
          note: 'approvi — regular -are verb in the congiuntivo',
        },
        {
          target: 'Voglio che tu capisca la complessità del problema.',
          native: 'I want you to understand the complexity of the problem.',
          note: 'capisca — -isco verb; note different subject in main and subordinate clause',
        },
      ],
      commonMistakes: [
        'using the indicative after opinion/doubt verbs ("Penso che è vero" → "Penso che sia vero")',
        'applying -are endings to -ere/-ire verbs (prendi instead of prenda)',
        'forgetting that io, tu, and lui/lei share the same ending — context or an explicit pronoun resolves ambiguity',
        'using the congiuntivo when the subject of both clauses is the same — use the infinitive instead ("Voglio andare", not "Voglio che io vada")',
      ],
      recommendedPracticeTypes: [
        TaskType.conjugation,
        TaskType.fill_blank,
        TaskType.error_correction,
        TaskType.translation,
      ],
      compatibleThemes: ['politics', 'news', 'culture', 'business'],
      teachingNotes:
        'Lead with the three identical singular forms (io = tu = lui/lei for all verbs) — this is the ' +
        'defining feature of the congiuntivo and a constant source of confusion. Build a paradigm table ' +
        'for at least one -are and one -ere verb before drilling the irregulars; the irregulars are ' +
        'high-frequency (sia, abbia, faccia, vada) and must be memorised explicitly. Use politics and ' +
        'society sentences throughout so the grammar feels purposeful, not academic.',
    },
    {
      slug: 'it-congiuntivo-triggers',
      name: 'Congiuntivo triggers — opinion, doubt, and certainty',
      category: SkillCategory.grammar,
      level: CEFRLevel.advanced,
      description:
        'The subjunctive is required in a che-clause when the main clause expresses opinion or belief ' +
        '(penso/credo/ritengo che), doubt (dubito/non sono sicuro che), volition (voglio/spero/desidero ' +
        'che), emotion (sono contento/ho paura/mi dispiace che), or an impersonal expression (è ' +
        'importante/è possibile/bisogna/sembra che). By contrast, verbs of certainty take the ' +
        'indicative: so che, è vero che, è certo che, è ovvio che, vedo che.',
      prerequisiteSlugs: ['it-congiuntivo-presente'],
      examples: [
        {
          target: 'Credo che la democrazia sia il miglior sistema di governo.',
          native: 'I believe that democracy is the best system of government.',
          note: 'credo che → subjunctive',
        },
        {
          target: 'So che la costituzione è stata scritta nel 1947.',
          native: 'I know that the constitution was written in 1947.',
          note: 'so che → indicative (certainty)',
        },
        {
          target: 'È possibile che le elezioni si tengano prima del previsto.',
          native: 'It is possible that the elections may be held earlier than expected.',
          note: 'è possibile che → subjunctive',
        },
        {
          target: 'Sono contento che il tasso di disoccupazione stia scendendo.',
          native: 'I am glad that the unemployment rate is falling.',
          note: 'emotion verb → subjunctive',
        },
      ],
      commonMistakes: [
        'using the subjunctive after certainty verbs (so che sia → so che è)',
        'forgetting that sembra che triggers the subjunctive but "è vero che" does not',
        'omitting che — the subjunctive clause always needs the conjunction che',
        'confusing non credo che (subjunctive) with credo che non (also subjunctive — both require it)',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.tense_selection,
        TaskType.fill_blank,
        TaskType.error_correction,
      ],
      compatibleThemes: ['politics', 'news', 'culture', 'history'],
      teachingNotes:
        'The indicative/subjunctive contrast is the core of this skill. Build a two-column chart: ' +
        '"subjunctive side" (penso, credo, dubito, spero, voglio, ho paura, è possibile, bisogna, ' +
        'sembra) vs "indicative side" (so, è vero, è certo, è ovvio, vedo). Drill switching between ' +
        'them: give a certainty sentence and ask the learner to recast it as an opinion — they must ' +
        'shift the mood. Political and news contexts make the examples feel real and high-stakes.',
    },
    {
      slug: 'it-congiuntivo-passato',
      name: 'Congiuntivo passato (past subjunctive)',
      category: SkillCategory.grammar,
      level: CEFRLevel.advanced,
      description:
        'The past subjunctive is used when the action in the che-clause happened before the main ' +
        'verb, which is in the present. It is formed with the congiuntivo presente of avere or essere ' +
        'plus the past participle of the main verb: che abbia parlato (that he has/had spoken), che ' +
        'sia andato/a (that he/she has/had gone). Agreement rules for essere verbs follow the same ' +
        'pattern as the passato prossimo. Typical triggers: Penso che sia già partito; Sono contento ' +
        'che tu abbia vinto; È strano che non abbiano votato.',
      prerequisiteSlugs: ['it-congiuntivo-presente', 'it-passato-prossimo-essere'],
      examples: [
        {
          target: 'Penso che il presidente abbia già firmato la legge.',
          native: 'I think the president has already signed the law.',
          note: 'past action inside a present-tense opinion clause',
        },
        {
          target: 'Sono contenta che il candidato che preferivo abbia vinto le elezioni.',
          native: 'I’m glad that the candidate I preferred won the election.',
          note: 'emotion verb in the main clause; essere verb uses sia + agreement',
        },
        {
          target: 'È strano che nessuno abbia manifestato contro quella legge.',
          native: 'It’s strange that no one protested against that law.',
          note: 'impersonal expression triggers subjunctive for a past event',
        },
      ],
      commonMistakes: [
        'using the congiuntivo presente when a past action is meant (che parli → che abbia parlato)',
        'forgetting participle agreement with essere verbs (che sia andato vs che sia andata)',
        'using the indicative passato prossimo instead of the congiuntivo passato after trigger verbs',
        'confusing the congiuntivo passato with the condizionale passato — both use an auxiliary, but the auxiliaries are in different moods',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.conjugation,
        TaskType.translation,
        TaskType.error_correction,
      ],
      compatibleThemes: ['politics', 'news', 'history', 'culture'],
      teachingNotes:
        'Anchor this in the passato prossimo the learner already knows: "same past participle, but ' +
        'the auxiliary abbia/sia instead of ho/è." The contrast to drill is present vs past subjunctive ' +
        'inside the same trigger sentence: Penso che parli (he is speaking now) vs Penso che abbia ' +
        'parlato (he spoke earlier). News headlines about recent political events are ideal source ' +
        'material — reactions to election results, government decisions, and court rulings all call ' +
        'for this structure naturally.',
    },
    {
      slug: 'it-vocab-politics',
      name: 'Politics and government (la politica)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.advanced,
      description:
        'The essential vocabulary for talking about Italian politics and government: institutions, ' +
        'roles, processes, and the documents that underpin Italian democracy.',
      prerequisiteSlugs: ['it-noun-gender', 'it-definite-articles'],
      examples: [
        {
          target:
            'Il parlamento italiano è bicamerale: Camera dei Deputati e Senato della Repubblica.',
          native:
            'The Italian parliament is bicameral: Chamber of Deputies and Senate of the Republic.',
        },
        {
          target: 'Le elezioni politiche si tengono ogni cinque anni.',
          native: 'General elections are held every five years.',
        },
        {
          target: 'Bisogna che il governo rispetti la costituzione.',
          native: 'The government must respect the constitution.',
          note: 'bisogna che → subjunctive; good review of congiuntivo triggers',
        },
      ],
      commonMistakes: [
        'confusing il presidente (president/chair of any body) with il presidente del consiglio (prime minister)',
        'using la politica (politics in general) when il partito (a specific party) is meant',
        'mis-gendering il/la ministro — both forms exist; la ministra is increasingly preferred for women',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['politics', 'news', 'history', 'culture'],
      teachingNotes:
        'Pair institutions with their physical address in Rome (Quirinale, Chigi, Montecitorio, ' +
        'Palazzo Madama) — the geography makes the vocabulary concrete and memorable. Flag the ' +
        'bicameral system as structurally different from the US and UK; Italian learners who follow ' +
        'international news will appreciate the comparison. High-frequency items (votare, la legge, ' +
        'il governo) should be drilled to automaticity before moving on.',
    },
    {
      slug: 'it-vocab-social-issues',
      name: 'Social issues (i problemi sociali)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.advanced,
      description:
        'Vocabulary for discussing the social challenges that shape Italian political debate: ' +
        'unemployment, poverty, immigration, rights, justice, and protest.',
      prerequisiteSlugs: ['it-noun-gender', 'it-definite-articles'],
      examples: [
        {
          target: 'La disoccupazione giovanile rimane uno dei problemi più gravi del paese.',
          native: 'Youth unemployment remains one of the most serious problems in the country.',
        },
        {
          target: 'Molti cittadini sono scesi in piazza per manifestare contro la nuova tassa.',
          native: 'Many citizens took to the streets to protest against the new tax.',
        },
        {
          target: 'L’uguaglianza e la libertà sono valori fondamentali della costituzione.',
          native: 'Equality and freedom are fundamental values of the constitution.',
        },
      ],
      commonMistakes: [
        'confusing la giustizia (justice, the concept) with il tribunale (court, the institution)',
        'using lo sciopero (strike) when manifestazione (demonstration/march) is meant — distinct actions',
        'treating i diritti as singular — it is always plural in Italian in the sense of "rights"',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.speaking_prompt,
        TaskType.translation,
        TaskType.multiple_choice,
      ],
      compatibleThemes: ['politics', 'news', 'culture', 'history'],
      teachingNotes:
        'Frame vocabulary around a genuine current issue to give the learner a reason to care. ' +
        'Pair nouns with verbs (disoccupazione → essere disoccupato; manifestazione → manifestare; ' +
        'sciopero → scioperare) to build productive word families. Keep the tone balanced — these ' +
        'are topics on which learners hold strong views; Wise should model respectful debate language, ' +
        'not advocate for any political position.',
    },
  ],

  // ─── Lesson templates ─────────────────────────────────────────────────────
  lessonTemplates: [
    {
      slug: 'cap16-present-subjunctive-forms',
      title: 'Penso che… — building the congiuntivo presente',
      lessonType: LessonType.grammar,
      level: CEFRLevel.advanced,
      summary:
        'Learn to form the present subjunctive for regular and key irregular verbs, then put it to ' +
        'work immediately expressing opinions about Italian society.',
      objectiveSkillSlugs: ['it-congiuntivo-presente'],
      defaultDurationMinutes: 13,
      compatibleThemes: ['politics', 'news', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'The paradigm — three sets of endings',
          prompt:
            'For -are verbs: parli, parli, parli, parliamo, parliate, parlino. ' +
            'For -ere/-ire verbs: prenda, prenda, prenda, prendiamo, prendiate, prendano. ' +
            'Key feature: io, tu, and lui/lei share the same form — context or a pronoun resolves ambiguity.',
          notes:
            'Show both paradigms side by side. Highlight the three-way singular identity as the ' +
            'defining quirk — it is unlike any other Italian mood.',
        },
        {
          taskType: TaskType.conjugation,
          focus: 'Regular and irregular forms',
          prompt:
            'Give the lui/lei congiuntivo presente of: parlare, prendere, capire, essere, avere, fare, andare.',
          exampleAnswer: 'parli, prenda, capisca, sia, abbia, faccia, vada',
          notes:
            'These seven cover the patterns the learner will encounter most. Accept minor spelling ' +
            'variations in capire (capisca is correct; flag the -isc- insertion).',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Penso che… in context',
          prompt:
            'Complete with the correct congiuntivo: "Penso che il governo ___ (dovere) ridurre le tasse sul lavoro."',
          exampleAnswer: 'Penso che il governo debba ridurre le tasse sul lavoro.',
          notes: 'Personalise the topic to the learner’s stated interests if known.',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Catch the indicative intrusion',
          prompt:
            'Correct the error: "Sembra che la disoccupazione è diminuita negli ultimi mesi."',
          exampleAnswer: 'Sembra che la disoccupazione sia diminuita negli ultimi mesi.',
          notes: 'The switch from è to sia illustrates trigger + mood in one fix.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Your opinion on a social issue',
          prompt:
            'Share one opinion about a current issue in your country using "Penso che…" or "Credo che…".',
          notes:
            'Accept any grammatically correct congiuntivo. Coach the form, not the opinion. ' +
            'If the learner is interested in politics, they often produce richer sentences here.',
        },
        {
          taskType: TaskType.recap,
          focus: 'The three patterns',
          prompt:
            'What is the lui/lei ending for an -are verb in the congiuntivo? And for an -ere verb?',
          exampleAnswer: '-are → -i (parli); -ere → -a (prenda)',
        },
      ],
    },
    {
      slug: 'cap16-triggers-opinion-vs-certainty',
      title: 'Credo che… vs So che… — mood choice under the microscope',
      lessonType: LessonType.grammar,
      level: CEFRLevel.advanced,
      summary:
        'Master the distinction between subjunctive triggers (opinion, doubt, emotion) and certainty ' +
        'verbs that take the indicative. A skill that marks the difference between upper-intermediate ' +
        'and truly advanced Italian.',
      objectiveSkillSlugs: ['it-congiuntivo-triggers', 'it-congiuntivo-presente'],
      defaultDurationMinutes: 12,
      compatibleThemes: ['politics', 'news', 'history'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Two camps: opinion vs certainty',
          prompt:
            'Subjunctive side: penso, credo, dubito, spero, voglio, ho paura, mi dispiace, sembra, ' +
            'è possibile, bisogna, è importante. Indicative side: so, è vero, è certo, è ovvio, ' +
            'vedo. The difference is epistemological: do you know it for a fact, or do you think/feel it?',
        },
        {
          taskType: TaskType.tense_selection,
          focus: 'Choose the mood',
          prompt:
            'Select indicative or subjunctive: "È ovvio che la corruzione ___ (essere) un problema grave."',
          exampleAnswer: 'È ovvio che la corruzione è un problema grave. (Indicative — certainty)',
          notes:
            'Contrast immediately with: "Sembra che la corruzione sia aumentata." (subjunctive)',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Trigger identification',
          prompt:
            'Which sentence is correct? (a) "So che il presidente sia eletto ogni sette anni." ' +
            '(b) "So che il presidente è eletto ogni sette anni."',
          exampleAnswer: '(b) — so che requires the indicative',
          notes:
            'Make the contrast between sapere (certainty) and credere (opinion) explicit here.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Mixed triggers in a paragraph',
          prompt:
            'Fill in with indicative or subjunctive as appropriate: "So che le elezioni ___ (tenersi) ' +
            'domenica. Spero che la partecipazione ___ (essere) alta. È possibile che i risultati ' +
            '___ (cambiare) gli equilibri politici."',
          exampleAnswer: 'si tengono (indicative); sia alta (subjunctive); cambino (subjunctive)',
        },
        {
          taskType: TaskType.recap,
          focus: 'The rule in your own words',
          prompt: 'Name two verbs that trigger the subjunctive and two that take the indicative.',
        },
      ],
    },
    {
      slug: 'cap16-past-subjunctive-reactions',
      title: 'Sono contento che tu abbia vinto — the past subjunctive',
      lessonType: LessonType.grammar,
      level: CEFRLevel.advanced,
      summary:
        'Learn the congiuntivo passato and use it to react to news: past political events, election ' +
        'results, government decisions. The form you need when the past action sits inside a present ' +
        'opinion or emotion.',
      objectiveSkillSlugs: ['it-congiuntivo-passato'],
      defaultDurationMinutes: 12,
      compatibleThemes: ['politics', 'news', 'history'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Formula: congiuntivo of avere/essere + past participle',
          prompt:
            'The congiuntivo passato = abbia/abbia/abbia/abbiamo/abbiate/abbiano + participio ' +
            'passato, OR sia/sia/sia/siamo/siate/siano + participio passato for essere verbs. ' +
            'Participle agreement rules are identical to the passato prossimo.',
          notes:
            'Side-by-side: Penso che parli (present — he is speaking) vs Penso che abbia parlato ' +
            '(past — he spoke). The time shift is the whole lesson.',
        },
        {
          taskType: TaskType.conjugation,
          focus: 'Build the forms',
          prompt:
            'Give the congiuntivo passato for io and loro: parlare, andare (essere verb), vincere.',
          exampleAnswer:
            'abbia parlato / abbiano parlato; sia andato/a / siano andati/e; abbia vinto / abbiano vinto',
          notes: 'Flag andare: sia + andato must agree with subject gender and number.',
        },
        {
          taskType: TaskType.translation,
          focus: 'React to political news',
          prompt: 'Translate: "I’m surprised that so many people voted for that party."',
          exampleAnswer: 'Sono sorpreso/a che così tante persone abbiano votato per quel partito.',
          notes:
            'Accept gender variants of sorpreso/a. This sentence type — emotional reaction to a ' +
            'past event — is exactly where the congiuntivo passato belongs.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Present vs past subjunctive',
          prompt:
            'Choose present or past congiuntivo: "Non credo che il ministro ___ (fare) quella ' +
            'dichiarazione ieri." vs "Non credo che il ministro ___ (fare) dichiarazioni sensate in generale."',
          exampleAnswer: 'abbia fatto (past — yesterday); faccia (present — in general)',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'React to a headline',
          prompt:
            'Imagine you just read that a new social law has passed in Italy. Express your reaction ' +
            'using at least one "Sono contento/a che…" or "Mi sorprende che…" with the congiuntivo passato.',
          notes:
            'Personalise the hypothetical law to the learner’s stated interests. Fluency matters ' +
            'more than perfect agreement here — coach the auxiliary mood first.',
        },
        {
          taskType: TaskType.recap,
          focus: 'When past, when present?',
          prompt:
            'Complete: "Penso che il governo ___ una buona decisione domani" (future reference) vs ' +
            '"Penso che il governo ___ una buona decisione ieri" (past reference).',
          exampleAnswer: 'prenda (present subjunctive); abbia preso (past subjunctive)',
        },
      ],
    },
    {
      slug: 'cap16-political-debate',
      title: 'Un dibattito civile — a respectful political debate',
      lessonType: LessonType.scenario_roleplay,
      level: CEFRLevel.advanced,
      summary:
        'You are taking part in a structured discussion about a social issue — perhaps immigration ' +
        'policy, unemployment, or civil rights. Express your position, challenge a counter-argument ' +
        'politely, and back down gracefully when a point lands.',
      objectiveSkillSlugs: [
        'it-congiuntivo-presente',
        'it-congiuntivo-triggers',
        'it-vocab-politics',
        'it-vocab-social-issues',
      ],
      defaultDurationMinutes: 15,
      compatibleThemes: ['politics', 'news', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Set the scene',
          prompt:
            'You are on a panel at a university in Rome debating: "Cosa dovrebbe fare lo Stato per ' +
            'ridurre la disoccupazione giovanile?" Every claim you make should use penso/credo/ritengo ' +
            'che + subjunctive. Certainties may use the indicative.',
          notes:
            'Adapt the debate topic to the learner’s stated interests: immigration, climate policy, ' +
            'housing, digital rights. Keep the topic balanced — Wise does not take sides.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Opening statement',
          prompt:
            'Give your position in 3–4 sentences. Use at least one subjunctive trigger verb and ' +
            'one piece of politics/society vocabulary.',
          notes:
            'Praise any correct congiuntivo. Flag indicative intrusions gently. The goal is fluent ' +
            'subjunctive use in spontaneous speech — that is the advanced leap.',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'Polite disagreement',
          prompt:
            'Your opponent says: "Penso che lo Stato spenda già troppo per i sussidi sociali." ' +
            'Disagree respectfully, then support your counter-argument with a subjunctive clause.',
          exampleAnswer:
            'Capisco il tuo punto, ma non credo che i sussidi siano la causa principale del problema. ' +
            'Penso che il vero ostacolo sia la mancanza di formazione professionale.',
          notes:
            'Model debate moves: "Capisco… però…", "È vero che… tuttavia…", "Non sono d’accordo ' +
            'perché…". These phrases mark educated discourse in Italian.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Expressing emotion about a social issue',
          prompt:
            'Complete: "Mi dispiace che così tanti giovani ___ (dovere) emigrare per trovare lavoro."',
          exampleAnswer: 'Mi dispiace che così tanti giovani debbano emigrare per trovare lavoro.',
          notes: 'Emotion verb mi dispiace che triggers the subjunctive; debbano is irregular.',
        },
        {
          taskType: TaskType.reflection,
          focus: 'Takeaway',
          prompt:
            'Which subjunctive phrase from this debate would you use in a real conversation? ' +
            'Write it down in your own words.',
          notes:
            'Metacognitive close. Encourage personalisation — "I would use Penso che… because I ' +
            'often share opinions and I want to sound educated."',
        },
      ],
    },
    {
      slug: 'cap16-vocab-government-society',
      title: 'La politica e i problemi sociali — vocabulary review',
      lessonType: LessonType.vocabulary_review,
      level: CEFRLevel.advanced,
      summary:
        'Consolidate the government and social issues vocabulary across both thematic clusters, ' +
        'with a focus on the word pairs and derivations most common in Italian news and debate.',
      objectiveSkillSlugs: ['it-vocab-politics', 'it-vocab-social-issues'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['politics', 'news', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Two clusters, one political world',
          prompt:
            'Government vocabulary (il parlamento, le elezioni, il partito…) and social issues ' +
            '(la disoccupazione, i diritti, lo sciopero…) overlap constantly in Italian media. ' +
            'Let’s lock them in.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Word families',
          prompt: 'Which verb corresponds to "la manifestazione"?',
          exampleAnswer: 'manifestare',
          notes:
            'Test noun → verb, then reverse: "What noun comes from votare?"  → il voto / le elezioni.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Gapped news headline',
          prompt:
            'Fill in: "I ___ (trade unions) hanno indetto uno ___ (strike) generale per protestare ' +
            'contro la nuova ___ (law) sul lavoro."',
          exampleAnswer:
            'I sindacati hanno indetto uno sciopero generale per protestare contro la nuova legge sul lavoro.',
          notes:
            'Sindacati is not in the core list but appears in context — note it as bonus vocab.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Active production',
          prompt:
            'Translate: "I think that every citizen has the right to vote and that the government must protect freedom."',
          exampleAnswer:
            'Penso che ogni cittadino abbia il diritto di votare e che il governo debba proteggere la libertà.',
          notes: 'Two subjunctive clauses in one sentence — this is the advanced pay-off.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Self-quiz on key items',
          prompt:
            'Without looking: give the Italian for "parliament", "unemployment", "equality", "demonstration", and "tax".',
          exampleAnswer:
            'il parlamento, la disoccupazione, l’uguaglianza, la manifestazione, la tassa',
        },
      ],
    },
  ],

  // ─── Thematic vocabulary bank ─────────────────────────────────────────────
  vocabulary: [
    // La politica — government and politics
    {
      slug: 'cap16-la-politica',
      targetText: 'la politica',
      nativeText: 'politics / political life',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-politica',
      exampleSentence: 'La politica italiana è spesso complessa e frammentata.',
      exampleTranslation: 'Italian politics is often complex and fragmented.',
    },
    {
      slug: 'cap16-lo-stato',
      targetText: 'lo Stato',
      nativeText: 'the State',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-politica',
      exampleSentence: 'È importante che lo Stato garantisca i diritti fondamentali.',
      exampleTranslation: 'It is important that the State guarantees fundamental rights.',
    },
    {
      slug: 'cap16-il-governo',
      targetText: 'il governo',
      nativeText: 'the government',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-politica',
      exampleSentence: 'Il governo ha presentato un nuovo piano per l’occupazione.',
      exampleTranslation: 'The government has presented a new employment plan.',
    },
    {
      slug: 'cap16-il-presidente',
      targetText: 'il/la presidente',
      nativeText: 'the president / chairperson',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-politica',
      exampleSentence: 'Il Presidente della Repubblica risiede al Quirinale.',
      exampleTranslation: 'The President of the Republic resides at the Quirinal.',
    },
    {
      slug: 'cap16-il-ministro',
      targetText: 'il ministro / la ministra',
      nativeText: 'the minister',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-politica',
      exampleSentence: 'La ministra dell’istruzione ha annunciato una riforma scolastica.',
      exampleTranslation: 'The minister of education announced a school reform.',
    },
    {
      slug: 'cap16-il-parlamento',
      targetText: 'il parlamento',
      nativeText: 'parliament',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-politica',
      exampleSentence: 'Il parlamento italiano è composto dalla Camera e dal Senato.',
      exampleTranslation: 'The Italian parliament is made up of the Chamber and the Senate.',
    },
    {
      slug: 'cap16-il-deputato',
      targetText: 'il deputato / la deputata',
      nativeText: 'the member of parliament / deputy',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-politica',
    },
    {
      slug: 'cap16-le-elezioni',
      targetText: 'le elezioni',
      nativeText: 'the elections',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-politica',
      exampleSentence: 'Le elezioni si tengono la domenica in Italia.',
      exampleTranslation: 'Elections are held on Sunday in Italy.',
    },
    {
      slug: 'cap16-votare',
      targetText: 'votare',
      nativeText: 'to vote',
      partOfSpeech: 'verb',
      theme: 'la-politica',
      exampleSentence: 'È importante che tutti i cittadini vadano a votare.',
      exampleTranslation: 'It is important that all citizens go and vote.',
    },
    {
      slug: 'cap16-leletore',
      targetText: 'l’elettore / l’elettrice',
      nativeText: 'the voter / the elector',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-politica',
    },
    {
      slug: 'cap16-il-partito',
      targetText: 'il partito',
      nativeText: 'the (political) party',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-politica',
      exampleSentence: 'In Italia ci sono molti partiti politici di orientamenti diversi.',
      exampleTranslation: 'In Italy there are many political parties of different orientations.',
    },
    {
      slug: 'cap16-la-legge',
      targetText: 'la legge',
      nativeText: 'the law',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-politica',
      exampleSentence: 'Penso che questa legge sia ingiusta e debba essere riformata.',
      exampleTranslation: 'I think this law is unjust and must be reformed.',
    },
    {
      slug: 'cap16-il-cittadino',
      targetText: 'il cittadino / la cittadina',
      nativeText: 'the citizen',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-politica',
    },
    {
      slug: 'cap16-la-democrazia',
      targetText: 'la democrazia',
      nativeText: 'democracy',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-politica',
      exampleSentence: 'Credo che la democrazia richieda la partecipazione attiva dei cittadini.',
      exampleTranslation: 'I believe that democracy requires the active participation of citizens.',
    },
    {
      slug: 'cap16-la-costituzione',
      targetText: 'la costituzione',
      nativeText: 'the constitution',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-politica',
      exampleSentence: 'La Costituzione italiana è entrata in vigore il primo gennaio del 1948.',
      exampleTranslation: 'The Italian Constitution came into force on the first of January 1948.',
    },
    // I problemi sociali — social issues
    {
      slug: 'cap16-i-problemi-sociali',
      targetText: 'i problemi sociali',
      nativeText: 'social problems / social issues',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-problemi-sociali',
    },
    {
      slug: 'cap16-la-disoccupazione',
      targetText: 'la disoccupazione',
      nativeText: 'unemployment',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-problemi-sociali',
      exampleSentence: 'È urgente che il governo affronti la disoccupazione giovanile.',
      exampleTranslation: 'It is urgent that the government tackle youth unemployment.',
    },
    {
      slug: 'cap16-la-poverta',
      targetText: 'la povertà',
      nativeText: 'poverty',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-problemi-sociali',
      exampleSentence: 'Spero che le nuove politiche sociali riducano la povertà.',
      exampleTranslation: 'I hope the new social policies will reduce poverty.',
    },
    {
      slug: 'cap16-limmigrazione',
      targetText: 'l’immigrazione',
      nativeText: 'immigration',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-problemi-sociali',
      exampleSentence: 'Il dibattito sull’immigrazione è al centro della politica italiana.',
      exampleTranslation: 'The immigration debate is at the centre of Italian politics.',
    },
    {
      slug: 'cap16-la-criminalita',
      targetText: 'la criminalità',
      nativeText: 'crime / criminality',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-problemi-sociali',
    },
    {
      slug: 'cap16-i-diritti',
      targetText: 'i diritti',
      nativeText: 'rights',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-problemi-sociali',
      exampleSentence: 'Bisogna che lo Stato tuteli i diritti di tutti i cittadini.',
      exampleTranslation: 'The State must protect the rights of all citizens.',
    },
    {
      slug: 'cap16-la-giustizia',
      targetText: 'la giustizia',
      nativeText: 'justice',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-problemi-sociali',
    },
    {
      slug: 'cap16-la-liberta',
      targetText: 'la libertà',
      nativeText: 'freedom / liberty',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-problemi-sociali',
      exampleSentence: 'La libertà di stampa è fondamentale in una democrazia.',
      exampleTranslation: 'Freedom of the press is fundamental in a democracy.',
    },
    {
      slug: 'cap16-luguaglianza',
      targetText: 'l’uguaglianza',
      nativeText: 'equality',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-problemi-sociali',
      exampleSentence:
        'Penso che l’uguaglianza tra uomini e donne sia ancora un obiettivo da raggiungere.',
      exampleTranslation:
        'I think that equality between men and women is still a goal to be achieved.',
    },
    {
      slug: 'cap16-lo-sciopero',
      targetText: 'lo sciopero',
      nativeText: 'the strike',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-problemi-sociali',
      exampleSentence: 'I lavoratori hanno proclamato uno sciopero di ventiquattro ore.',
      exampleTranslation: 'The workers have called a twenty-four-hour strike.',
    },
    {
      slug: 'cap16-manifestare',
      targetText: 'manifestare',
      nativeText: 'to demonstrate / to protest',
      partOfSpeech: 'verb',
      theme: 'i-problemi-sociali',
      exampleSentence: 'Migliaia di persone hanno manifestato davanti al parlamento.',
      exampleTranslation: 'Thousands of people demonstrated in front of parliament.',
    },
    {
      slug: 'cap16-la-manifestazione',
      targetText: 'la manifestazione',
      nativeText: 'the demonstration / the march',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-problemi-sociali',
    },
    {
      slug: 'cap16-la-tassa',
      targetText: 'la tassa',
      nativeText: 'the tax',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-problemi-sociali',
      exampleSentence: 'Dubito che una riduzione delle tasse risolva il problema della povertà.',
      exampleTranslation: 'I doubt that a tax cut will solve the poverty problem.',
    },
  ],
};

export default unit;
