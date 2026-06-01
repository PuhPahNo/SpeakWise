// Capitolo 17 — Il mondo del lavoro
// Theme: business. The world of work and the internet — powered by the
// congiuntivo with conjunctions, further subjunctive triggers, and the
// subjunctive-vs-infinitive choice. Set against the backdrop of Piemonte
// and its industrial heritage.
//
// All content original (copyright-safe).

import { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client';
import type { SeedUnit } from '../types';

const unit: SeedUnit = {
  code: 'cap-17',
  order: 17,
  title: 'Il mondo del lavoro',
  subtitle: 'The subjunctive in context — conjunctions, work, and tech',
  theme: 'business',
  level: CEFRLevel.advanced,
  summary:
    'Enter the professional world in Italian — the interview room, the office, the inbox, and the ' +
    'company intranet. This chapter extends the congiuntivo into its most demanding territory: the ' +
    'conjunctions that demand it (benché, affinché, prima che, purché, a meno che…), the special ' +
    'contexts where it appears after superlatives, indefinite antecedents, and pronouns like ' +
    'chiunque and dovunque — and the decisive test of choosing between subjunctive and infinitive ' +
    'when subjects agree or differ. Workplace and tech vocabulary gives every grammar drill an ' +
    'immediately useful setting, and a journey through Piemonte — from the FIAT dynasty to the ' +
    'co-working spaces of modern Torino — grounds it all in a living Italian region.',
  canDo: [
    'Use benché, sebbene, affinché, prima che, purché, a meno che, and senza che correctly with the subjunctive',
    'Recognise and produce the subjunctive after relative superlatives and after indefinite or negative antecedents',
    'Apply chiunque, qualunque, dovunque, and comunque in natural sentences',
    'Choose confidently between di + infinitive (same subject) and che + subjunctive (different subject)',
    'Handle a job interview in Italian, talking about experience and skills',
    'Discuss technology, the internet, and smart working using authentic vocabulary',
  ],
  culturalNotes: [
    {
      title: 'FIAT and the soul of Torino',
      body:
        'Torino is Italy’s automotive capital — and the cradle of one of Europe’s most storied industrial ' +
        'dynasties. FIAT (Fabbrica Italiana Automobili Torino) was founded there in 1899 by a group of ' +
        'investors that included the young Giovanni Agnelli, whose family would go on to control the company ' +
        'for over a century. At its peak in the 1970s, FIAT employed roughly one in three Piemontese workers, ' +
        'and the enormous Lingotto factory — with its legendary rooftop test track — became an icon of ' +
        'Italian modernism. Today the company, merged into Stellantis, has its legal headquarters in the ' +
        'Netherlands, but its emotional home remains Torino, where the Museo Nazionale dell’Automobile ' +
        '(MAUTO) keeps the legacy alive. The city has reinvented itself around aerospace, food-tech, and ' +
        'startups, but the FIAT story is inseparable from how Italians understand the words lavoro and industria.',
    },
    {
      title: 'Lo smart working all’italiana',
      body:
        'The Italian phrase smart working — borrowed directly from English without translation — exploded ' +
        'into everyday use during the 2020 pandemic and never fully retreated. Italy’s labour code was ' +
        'quickly amended to allow "lavoro agile" (agile work) as a formal contractual arrangement, and ' +
        'surveys consistently show that Italian workers rank flexibility among their top three job criteria. ' +
        'That said, the culture clash is real: Italian workplace life has traditionally been built on ' +
        'physical presence, long shared lunches, and the informal relationships forged in the corridoio ' +
        '(corridor). Many managers over fifty still instinctively equate presence with productivity, ' +
        'leading to ongoing friction between the aspettative (expectations) of younger and older ' +
        'generations. The debate plays out daily on LinkedIn Italia and in the pages of Il Sole 24 Ore.',
    },
    {
      title: 'Il Piemonte — industria, vino, e Alpi',
      body:
        'Piemonte (literally "at the foot of the mountains") borders France and Switzerland and shares ' +
        'much of its historical culture with both. Its dialect, Piemontese, was once a serious literary ' +
        'language, and the region produced Camillo Cavour, the political architect of Italian unification. ' +
        'Beyond industry, Piemonte is the source of some of Italy’s most prestigious wines — Barolo and ' +
        'Barbaresco are made from the native Nebbiolo grape in the Langhe hills south of Alba — and the ' +
        'birthplace of the Slow Food movement, founded in Bra in 1989 by Carlo Petrini as a direct ' +
        'response to a McDonald’s opening near the Spanish Steps in Rome. The region’s combination of ' +
        'high-tech industry, artisan food culture, and alpine landscape makes it a microcosm of what ' +
        'makes Italy simultaneously modern and irreducibly itself.',
    },
  ],

  // ─── Skills ───────────────────────────────────────────────────────────────
  skills: [
    {
      slug: 'it-congiuntivo-conjunctions',
      name: 'Subjunctive conjunctions (benché, affinché, prima che…)',
      category: SkillCategory.grammar,
      level: CEFRLevel.advanced,
      description:
        'A set of conjunctions in Italian always introduce a dependent clause in the subjunctive, ' +
        'regardless of tense or subject. The most important are: benché / sebbene / nonostante ' +
        '(although / even though), affinché / perché [purpose] (so that / in order that), prima che ' +
        '(before), purché / a condizione che (provided that / as long as), senza che (without — ' +
        'someone doing something), a meno che (non) (unless), nel caso (in cui) (in case / in the ' +
        'event that), and come se (as if — followed by imperfetto or trapassato congiuntivo in ' +
        'standard use, though presente is heard colloquially). Learning to recognise these triggers ' +
        'is the clearest path to avoiding the #1 advanced error: using the indicative after them.',
      prerequisiteSlugs: ['it-congiuntivo-presente'],
      examples: [
        {
          target: 'Accetto l’offerta, benché lo stipendio sia inferiore alle mie aspettative.',
          native: 'I accept the offer, although the salary is lower than my expectations.',
          note: 'benché + congiuntivo — the concessive group (benché / sebbene / nonostante)',
        },
        {
          target:
            'Ti mando il curriculum affinché tu possa valutare il mio profilo prima del colloquio.',
          native: 'I’m sending you my CV so that you can evaluate my profile before the interview.',
          note: 'affinché [purpose] + congiuntivo; note perché = "why" (indicative) vs perché = "so that" (subjunctive)',
        },
        {
          target: 'Firma il contratto prima che cambino le condizioni.',
          native: 'Sign the contract before the conditions change.',
          note: 'prima che + congiuntivo — always subjunctive (contrast: prima di + infinitive with same subject)',
        },
        {
          target: 'Posso lavorare da remoto, purché consegni i progetti nei tempi stabiliti.',
          native: 'I can work remotely, provided that I deliver the projects on schedule.',
          note: 'purché (= a condizione che) + congiuntivo — conditional / provisory',
        },
        {
          target: 'Non assumono nessuno a meno che non abbia almeno tre anni di esperienza.',
          native: 'They don’t hire anyone unless they have at least three years of experience.',
          note: 'a meno che (non) + congiuntivo — the non is pleonastic and optional',
        },
      ],
      commonMistakes: [
        'using the indicative after benché/sebbene because the meaning seems straightforward ("although he works hard" → benché lavori, not lavora)',
        'confusing perché + indicative (because / why) with perché + subjunctive (so that / in order that) — the same word, two different conjunctions',
        'omitting the non after a meno che or inserting it elsewhere — a meno che non sia is the standard form',
        'using prima di + subjunctive instead of prima che — prima di takes an infinitive (same subject); prima che takes the subjunctive (different subject or whenever subjects must be named)',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.error_correction,
        TaskType.translation,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['business', 'news', 'politics', 'culture'],
      teachingNotes:
        'Group the conjunctions by function (concessive, purpose, temporal, conditional, negative-conditional) ' +
        'rather than a raw list — the grouping helps learners predict which cluster applies. Always contrast ' +
        'prima che + subjunctive vs prima di + infinitive and perché (because) vs perché (so that) — these ' +
        'two pairs account for a large share of advanced errors. The workplace setting gives every example ' +
        'immediate real-world payoff.',
    },
    {
      slug: 'it-congiuntivo-other-uses',
      name: 'Further subjunctive triggers — superlatives, indefinite antecedents, chiunque',
      category: SkillCategory.grammar,
      level: CEFRLevel.advanced,
      description:
        'Beyond the main triggers (opinion verbs, doubt, emotion, impersonal expressions), the ' +
        'congiuntivo also appears in three additional contexts. First, after a relative superlative: ' +
        'the adjective superlative is the highest-degree form (il più / il meno + adjective), and ' +
        'the relative clause that follows takes the subjunctive because the claim is subjective. ' +
        'Second, after an indefinite or negative antecedent — when the noun being described is ' +
        'hypothetical, desired, or non-existent, the relative clause describing it uses the ' +
        'subjunctive. Third, with the so-called "generalisers" chiunque (whoever / anyone who), ' +
        'qualunque / qualsiasi (whatever / any), dovunque (wherever), and comunque (however / ' +
        'no matter how) — all of which always govern the subjunctive.',
      prerequisiteSlugs: ['it-congiuntivo-presente', 'it-superlatives'],
      examples: [
        {
          target: 'È il collega più competente che io conosca in tutta l’azienda.',
          native: 'He is the most competent colleague I know in the whole company.',
          note: 'relative superlative → congiuntivo in the relative clause',
        },
        {
          target:
            'Cerchiamo un’assistente che parli tre lingue e abbia esperienza nel settore tech.',
          native:
            'We are looking for an assistant who speaks three languages and has experience in the tech sector.',
          note: 'indefinite antecedent (un’assistente that may not yet exist) → congiuntivo',
        },
        {
          target: 'Non c’è nessun dipendente che sappia usare quel software antico.',
          native: 'There is no employee who knows how to use that old software.',
          note: 'negative antecedent (nessun dipendente) → congiuntivo',
        },
        {
          target: 'Chiunque voglia candidarsi deve inviare il curriculum entro venerdì.',
          native: 'Whoever wants to apply must send their CV by Friday.',
          note: 'chiunque always takes the subjunctive',
        },
        {
          target: 'Comunque vada il colloquio, ho fatto del mio meglio.',
          native: 'However the interview goes, I did my best.',
          note: 'comunque (= no matter how) + congiuntivo',
        },
      ],
      commonMistakes: [
        'using the indicative after a relative superlative — "il migliore che conosco" is widely heard but "che conosca" is the standard written and formal form',
        'forgetting the subjunctive when the antecedent noun is indefinite — "cerco qualcuno che può aiutarmi" (wrong) vs "che possa aiutarmi" (correct)',
        'treating chiunque like a relative pronoun and using the indicative (chiunque viene → should be chiunque venga)',
        'confusing qualunque (any / whatever — subjunctive) with quale (which — indicative relative clause)',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.translation,
        TaskType.error_correction,
      ],
      compatibleThemes: ['business', 'culture', 'news', 'politics'],
      teachingNotes:
        'The superlative trigger is easiest to introduce because the learner already knows superlatives ' +
        'from cap-09 — a quick "the relative clause after il più/il meno always uses the subjunctive" rule ' +
        'is immediately generative. The indefinite-antecedent pattern is best drilled through job-seeking ' +
        'scenarios (cerco qualcuno che…) where the hypothetical nature of the candidate is vivid and ' +
        'intuitive. Chiunque/dovunque/comunque can be taught as a closed list of four "wild-card" pronouns ' +
        'that automatically trigger the subjunctive.',
    },
    {
      slug: 'it-congiuntivo-vs-infinito',
      name: 'Subjunctive vs infinitive — same or different subject',
      category: SkillCategory.grammar,
      level: CEFRLevel.advanced,
      description:
        'Italian has a decisive rule for choosing between two structures after opinion verbs, modal ' +
        'expressions, and temporal/purpose conjunctions: when the subject of both the main clause and ' +
        'the dependent clause is THE SAME person, use di + infinitive. When the subjects are DIFFERENT, ' +
        'use che + congiuntivo. This applies to opinion verbs (pensare, credere, sperare, temere), ' +
        'temporal phrases (prima di vs prima che), and purpose phrases (per + infinitive vs affinché / ' +
        'perché + subjunctive). The infinitive construction is shorter and more elegant when the ' +
        'subjects match; the subjunctive construction is obligatory when they differ.',
      prerequisiteSlugs: ['it-congiuntivo-triggers', 'it-infinitive-constructions'],
      examples: [
        {
          target: 'Penso di restare in questa azienda ancora qualche anno.',
          native: 'I think I’ll stay at this company for a few more years.',
          note: 'Same subject (io) → di + infinitive; *Penso che io resti is ungrammatical',
        },
        {
          target: 'Penso che lui resti perché ha appena firmato un nuovo contratto.',
          native: 'I think he’ll stay because he just signed a new contract.',
          note: 'Different subjects (io / lui) → che + congiuntivo',
        },
        {
          target: 'Spero di ricevere una risposta prima di venerdì.',
          native: 'I hope to receive a reply before Friday.',
          note: 'Same subject → sperare di + infinitive',
        },
        {
          target: 'Spero che il direttore legga il mio dossier prima che scada il termine.',
          native: 'I hope the director reads my dossier before the deadline expires.',
          note: 'Different subjects in both clauses → che + congiuntivo AND prima che + congiuntivo',
        },
        {
          target: 'Credo di sapere come funziona il sistema.',
          native: 'I think I know how the system works.',
          note: 'credo di sapere (same subject) — not *credo che io sappia',
        },
      ],
      commonMistakes: [
        'using che + subjunctive even when subjects are identical — "Penso che io vada" should be "Penso di andare"',
        'using di + infinitive when subjects differ — "Spero di lui venga" is wrong; it must be "Spero che lui venga"',
        'forgetting that prima di (same subject) and prima che (different subject) encode exactly this same subject-test',
        'applying the rule to sperare: sperare di + infinitive is correct for same subject, but many learners default to "spero che io…" having just learned the che + subjunctive pattern',
      ],
      recommendedPracticeTypes: [
        TaskType.tense_selection,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.error_correction,
      ],
      compatibleThemes: ['business', 'news', 'culture', 'family'],
      teachingNotes:
        'The single most useful diagnostic is: "Are the two verbs’ subjects the same person?" If yes, ' +
        'collapse to di + infinitive. If no, open to che + congiuntivo. A two-column contrast table ' +
        '(same subject / different subject) with work-related sentences works extremely well here. ' +
        'Emphasise that the same-subject infinitive is not optional — it is the grammatically required ' +
        'form; the subjunctive version with an identical subject is ungrammatical, not just inelegant.',
    },
    {
      slug: 'it-vocab-work',
      name: 'Il mondo del lavoro — work and employment vocabulary',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.advanced,
      description:
        'The vocabulary you need to talk about jobs, the workplace, hiring, and professional life: ' +
        'from writing a curriculum vitae to surviving a job interview and navigating office hierarchies.',
      prerequisiteSlugs: ['it-congiuntivo-presente'],
      examples: [
        {
          target: 'Ho mandato il curriculum a tre aziende questa settimana.',
          native: 'I sent my CV to three companies this week.',
        },
        {
          target:
            'Il colloquio è andato bene: mi hanno offerto il contratto a tempo indeterminato.',
          native: 'The interview went well: they offered me a permanent contract.',
          note: 'contratto a tempo indeterminato (open-ended) vs a tempo determinato (fixed-term)',
        },
        {
          target: 'Lo stagista lavora in ufficio tre giorni alla settimana.',
          native: 'The intern works in the office three days a week.',
        },
      ],
      commonMistakes: [
        'confusing l’impiego (a specific job or post) with il lavoro (work in general) — both translate as "job/work" but are not always interchangeable',
        'using ditta and azienda interchangeably — la ditta leans towards a smaller, often family-owned firm; l’azienda is the more neutral term for any size of company',
        'saying "io sono disoccupato" correctly but then over-applying it — disoccupato is the adjective; you can also say "sono senza lavoro" or "ho perso il lavoro"',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.speaking_prompt,
        TaskType.roleplay,
        TaskType.translation,
      ],
      compatibleThemes: ['business', 'news', 'culture', 'politics'],
      teachingNotes:
        'Pair nouns with their most common verbs (cercare lavoro, fare un colloquio, firmare un contratto, ' +
        'ricevere uno stipendio, assumere / licenziare) so the learner builds verb–noun collocations rather ' +
        'than isolated items. The job-interview scenario in the lesson templates activates almost all of ' +
        'this vocabulary at once — anchor the items to that context.',
    },
    {
      slug: 'it-vocab-computer-internet',
      name: 'Il computer e internet — technology and online vocabulary',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.advanced,
      description:
        'The vocabulary of computers, the internet, and daily digital life — from navigating a website ' +
        'to talking about social media, apps, and working online. Many terms are English loanwords used ' +
        'with Italian articles and grammar.',
      prerequisiteSlugs: ['it-noun-gender'],
      examples: [
        {
          target: 'Devo scaricare il file prima della riunione — la connessione è lenta.',
          native: 'I need to download the file before the meeting — the connection is slow.',
        },
        {
          target: 'Clicca sull’icona e inserisci la password per accedere al sito.',
          native: 'Click on the icon and enter the password to access the site.',
          note: 'cliccare su (to click on) — the preposition su is standard',
        },
        {
          target: 'Il motore di ricerca ha indicizzato migliaia di nuove pagine.',
          native: 'The search engine indexed thousands of new pages.',
        },
      ],
      commonMistakes: [
        'treating internet as feminine — in Italian, internet is invariable and most commonly used without an article or with the masculine (il sito web, not la sito)',
        'using "mandare un’email" correctly but then saying "la mail" — both l’email (f) and la mail are accepted colloquially, but l’email is standard',
        'forgetting that navigare in/su internet are both used — navigare in rete is also common and useful',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.speaking_prompt,
        TaskType.roleplay,
      ],
      compatibleThemes: ['business', 'news', 'culture', 'film'],
      teachingNotes:
        'Many items here are internationalisms (il file, l’app, i social) — teach their Italian gender and ' +
        'the verbs they collocate with, since that is where the real learning lies (scaricare un file, ' +
        'navigare in rete, salvare un documento, cliccare su un link). Use the smart-working cultural note ' +
        'to contextualise the vocabulary in a current, relevant Italian debate.',
    },
  ],

  // ─── Lesson templates ─────────────────────────────────────────────────────
  lessonTemplates: [
    {
      slug: 'cap17-subjunctive-conjunctions',
      title: 'Benché, affinché, prima che — conjunctions that demand the subjunctive',
      lessonType: LessonType.grammar,
      level: CEFRLevel.advanced,
      summary:
        'Work through the full set of subjunctive-triggering conjunctions in a professional context: ' +
        'reading emails, writing job applications, and negotiating contract terms — all using benché, ' +
        'sebbene, affinché, prima che, purché, a meno che, senza che, and nel caso in cui.',
      objectiveSkillSlugs: ['it-congiuntivo-conjunctions'],
      defaultDurationMinutes: 13,
      compatibleThemes: ['business', 'news', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'The five functional groups',
          prompt:
            'Sort the conjunctions by role: concessive (benché, sebbene, nonostante), purpose (affinché, perché), temporal (prima che), conditional (purché, a condizione che), and negative-conditional (a meno che non, senza che). Each group always takes the subjunctive.',
          notes:
            'Present the five groups visually. Immediately contrast perché (because) + indicative with perché (so that) + subjunctive — this is the pair learners get wrong most.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Concessive group — benché / sebbene',
          prompt:
            'Complete with the correct subjunctive form: "Accetto il colloquio, benché la sede ___ (essere) lontana da casa mia."',
          exampleAnswer: 'benché la sede sia lontana da casa mia.',
          notes:
            'Stress that benché cannot be followed by the indicative — contrast with anche se, which does take the indicative and means the same thing colloquially.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Purpose group — affinché',
          prompt:
            'Complete: "Vi mando il dossier affinché voi ___ (potere) valutare la proposta entro lunedì."',
          exampleAnswer: 'affinché voi possiate valutare la proposta entro lunedì.',
          notes:
            'If the learner works in a professional field, substitute a domain-relevant proposal.',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Catch the indicative intrusion',
          prompt:
            'Find and fix the error: "Posso lavorare in smart working, purché consegno i report in tempo."',
          exampleAnswer: 'purché consegni i report in tempo.',
          notes: 'This is the most common real-world error — purché + indicative.',
        },
        {
          taskType: TaskType.translation,
          focus: 'a meno che (non)',
          prompt:
            'Translate: "They won’t extend the contract unless the project finishes on time."',
          exampleAnswer:
            'Non rinnoveranno il contratto a meno che il progetto non finisca in tempo.',
          notes: 'Note the pleonastic non — it is part of the standard written form.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Use three conjunctions spontaneously',
          prompt:
            'Describe a work situation (real or imagined) using at least three different subjunctive conjunctions from this lesson.',
          notes:
            'Personalise to the learner’s own job or field. Correct only subjunctive-form errors here, not word-choice variation.',
        },
      ],
    },
    {
      slug: 'cap17-subjunctive-other-uses',
      title: 'Chiunque, il migliore che… — the subjunctive beyond opinion verbs',
      lessonType: LessonType.grammar,
      level: CEFRLevel.advanced,
      summary:
        'Expand the subjunctive to three further contexts: after relative superlatives (il candidato ' +
        'più qualificato che io abbia mai incontrato), after indefinite or negative antecedents ' +
        '(cerco qualcuno che sappia programmare), and with the generalisers chiunque, qualunque, ' +
        'dovunque, and comunque.',
      objectiveSkillSlugs: ['it-congiuntivo-other-uses'],
      defaultDurationMinutes: 12,
      compatibleThemes: ['business', 'news', 'politics'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Three new trigger zones',
          prompt:
            'A relative superlative (il più / il meno) triggers the subjunctive in the clause that follows. An indefinite or non-existent antecedent does the same. And chiunque / qualunque / dovunque / comunque always govern the subjunctive — no exceptions.',
          notes:
            'Use a job-ad framing: "We are looking for [someone who…]" naturally produces indefinite antecedents.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Relative superlative',
          prompt:
            'Complete: "È l’offerta di lavoro più interessante che io ___ (ricevere) negli ultimi due anni." (Use congiuntivo passato.)',
          exampleAnswer: 'che io abbia ricevuto negli ultimi due anni.',
          notes:
            'Congiuntivo passato (abbia + participio) is the expected form after a superlative.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Indefinite vs definite antecedent',
          prompt:
            'Which sentence is correct? (A) "Ho trovato un collega che sa parlare giapponese." (B) "Cerco un collega che sappia parlare giapponese."',
          exampleAnswer:
            'Both can be correct: (A) uses the indicative because the colleague exists and is known; (B) uses the subjunctive because the colleague is still being sought (indefinite/hypothetical).',
          notes:
            'This contrast is the conceptual heart of the lesson — existence vs hypotheticality.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'chiunque and comunque',
          prompt:
            'Complete: "___ (whoever) si candidi, deve allegare due referenze. ___ (however) vada il processo di selezione, vi daremo un riscontro entro una settimana."',
          exampleAnswer:
            'Chiunque si candidi, deve allegare due referenze. Comunque vada il processo di selezione, vi daremo un riscontro entro una settimana.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Negative antecedent',
          prompt:
            'Translate: "There is no platform that makes remote collaboration completely seamless."',
          exampleAnswer:
            'Non c’è nessuna piattaforma che renda la collaborazione a distanza completamente fluida.',
          notes: 'nessuna piattaforma (negative antecedent) → congiuntivo presente renda.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Three-trigger summary',
          prompt:
            'Without looking: name the three new contexts where the subjunctive appears — and give one example sentence for each.',
        },
      ],
    },
    {
      slug: 'cap17-subjunctive-vs-infinitive',
      title: 'Penso di restare o penso che lui resti?',
      lessonType: LessonType.grammar,
      level: CEFRLevel.advanced,
      summary:
        'Master the most decisive test in advanced Italian grammar: when do you use di + infinitive ' +
        'and when che + subjunctive? The answer is always the same subject test — and once it clicks, ' +
        'it clears up dozens of recurring errors in one stroke.',
      objectiveSkillSlugs: ['it-congiuntivo-vs-infinito'],
      defaultDurationMinutes: 12,
      compatibleThemes: ['business', 'culture', 'news'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'The one-question test',
          prompt:
            'Ask yourself: is the subject of the second verb the same person as the subject of the first? If yes: di + infinitive. If no: che + congiuntivo. This single test resolves the choice every time.',
        },
        {
          taskType: TaskType.tense_selection,
          focus: 'Same vs different subject',
          prompt:
            'Choose the correct structure for each pair: (1) Spero ___ ricevere / che tu riceva una risposta presto. (2) Teme ___ perdere / che perdano il contratto.',
          exampleAnswer:
            '(1) Same subject → Spero di ricevere (I hope to receive — it’s I who will receive); different subject → Spero che tu riceva (I hope you receive). (2) Same subject → Teme di perdere; different → Teme che perdano.',
          notes: 'Use workplace contexts that are relevant to the learner’s professional field.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'prima di vs prima che',
          prompt:
            'Complete with prima di + infinitive or prima che + congiuntivo: "Invia la candidatura ___ scada il termine. / Voglio rivedere il documento ___ inviarlo."',
          exampleAnswer:
            'prima che scada il termine (different subjects: you send, the deadline expires); prima di inviarlo (same subject: I review, I send).',
          notes: 'This pair is the most frequent real-world application of the subject-test rule.',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Fix the mismatch',
          prompt:
            'Correct where necessary: (1) "Credo che io sappia già la risposta." (2) "Spera che ricevere il bonus a fine anno."',
          exampleAnswer:
            '(1) → Credo di sapere già la risposta (same subject; che + congiuntivo with identical subject is ungrammatical). (2) → Spera di ricevere il bonus (same subject; che + infinitive doesn’t work).',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Apply to your own professional situation',
          prompt:
            'Make four sentences about your work life or job goals — two with di + infinitive (same subject) and two with che + congiuntivo (different subject).',
          notes:
            'Personalise prompts to the learner’s actual job or aspirations for maximum engagement.',
        },
        {
          taskType: TaskType.recap,
          focus: 'The subject test in one sentence',
          prompt: 'Explain the di-vs-che rule in your own words, as if teaching it to a friend.',
        },
      ],
    },
    {
      slug: 'cap17-job-interview',
      title: 'Il colloquio di lavoro — a job interview in Italian',
      lessonType: LessonType.scenario_roleplay,
      level: CEFRLevel.advanced,
      summary:
        'You have a video interview for a project-manager role at a Torino tech company. ' +
        'You will present your background, handle tough questions, and negotiate a flexible ' +
        'working arrangement — using subjunctive conjunctions naturally throughout.',
      objectiveSkillSlugs: [
        'it-congiuntivo-conjunctions',
        'it-congiuntivo-vs-infinito',
        'it-vocab-work',
      ],
      defaultDurationMinutes: 15,
      compatibleThemes: ['business', 'news', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Set the scene',
          prompt:
            'It’s Monday morning. The HR director at a Torino startup opens with: "Si presenti: chi è e perché ha risposto a questo annuncio?" The job is yours to win.',
          notes:
            'Personalise the job title and sector to the learner’s real profession or stated interests for maximum relevance.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'The opening pitch',
          prompt:
            'Introduce yourself and explain why you applied — in 4–5 sentences. Use at least one benché or nonostante to acknowledge a potential concern while emphasising your strengths.',
          exampleAnswer:
            'Ho lavorato per cinque anni nel settore digitale, benché il mio percorso di studi fosse in ingegneria. Sono attratto da questa posizione affinché possa contribuire a un progetto davvero innovativo.',
          notes: 'Coach the learner to use concessive conjunctions naturally, not mechanically.',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'Handling a tough question',
          prompt:
            'The interviewer asks: "Ha mai gestito un team interamente da remoto? Quali difficoltà ha incontrato?" Respond using vocabulary from it-vocab-work and at least one subjunctive conjunction.',
          exampleAnswer:
            'Ho coordinato un team distribuito per due anni, purché tutti rispettassero orari di disponibilità comuni. La sfida principale era comunicare in modo chiaro senza incontrarsi di persona.',
          notes:
            'Accept a wide range of answers. Focus error correction on subjunctive forms and vocabulary precision.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Negotiating flexibility',
          prompt:
            'Translate your request: "I’d be happy to come to the office three days a week, provided that I can work from home on Mondays and Fridays."',
          exampleAnswer:
            'Sarei felice di venire in ufficio tre giorni alla settimana, purché possa lavorare da casa il lunedì e il venerdì.',
        },
        {
          taskType: TaskType.reflection,
          focus: 'Post-interview reflection',
          prompt:
            'The interview is over. What would you do differently next time? Use the congiuntivo or the condizionale passato for your reflection.',
          notes:
            'This opens a low-stress fluency channel — learners often produce their best output here.',
        },
      ],
    },
    {
      slug: 'cap17-tech-email',
      title: 'Email, app, e smart working — technology vocabulary in action',
      lessonType: LessonType.vocabulary_review,
      level: CEFRLevel.advanced,
      summary:
        'Consolidate the computer-and-internet vocabulary cluster through a series of realistic ' +
        'digital-workplace micro-tasks: reading a work email, troubleshooting a connection, setting ' +
        'up a shared file, and discussing the pros and cons of remote work.',
      objectiveSkillSlugs: ['it-vocab-computer-internet', 'it-vocab-work'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['business', 'news', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Digital Italian in the workplace',
          prompt:
            'Italian workplaces use a mix of native Italian terms (la rete, la tastiera, il file) and ' +
            'borrowed English ones (lo smart working, la password, i social). Knowing the collocations — ' +
            'the verbs and prepositions each noun takes — is what makes you sound fluent, not just correct.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Verb–noun collocations',
          prompt:
            'Complete each phrase with the correct verb (navigare, scaricare, salvare, cliccare, inviare, accedere): ' +
            '"___ su "Invia"; ___ il documento prima di chiudere; ___ al sito con la tua password; ___ il file allegato."',
          exampleAnswer:
            'Clicca su "Invia"; Salva il documento prima di chiudere; Accedi al sito con la tua password; Scarica il file allegato.',
          notes:
            'These four collocations cover 80% of daily digital-workspace communication in Italian.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Gender and article',
          prompt:
            'Choose the correct form: (A) il sito web / la sito web; (B) l’email / il email; (C) la password / il password.',
          exampleAnswer:
            '(A) il sito web (m); (B) l’email (f) — the standard form; (C) la password (f).',
          notes: 'Gender of borrowed tech nouns is a persistent error source — drill the article.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Describe a tech problem',
          prompt:
            'Translate: "I can’t access the company’s website. The connection is slow and the page won’t load."',
          exampleAnswer:
            'Non riesco ad accedere al sito dell’azienda. La connessione è lenta e la pagina non si carica.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Smart working: pro o contro?',
          prompt:
            'Give your opinion on smart working in 4–5 sentences. Use at least one subjunctive conjunction and two items from the computer-internet vocabulary.',
          notes:
            'Personalise to the learner’s actual work situation. This prompt often sparks genuine debate — let it.',
        },
      ],
    },
  ],

  // ─── Thematic vocabulary bank ─────────────────────────────────────────────
  vocabulary: [
    // Il lavoro — work and employment
    {
      slug: 'cap17-il-lavoro',
      targetText: 'il lavoro',
      nativeText: 'work / job',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-lavoro',
      exampleSentence: 'Cerco lavoro da tre mesi ma è difficile trovare qualcosa di adatto.',
      exampleTranslation:
        'I’ve been looking for work for three months but it’s hard to find something suitable.',
    },
    {
      slug: 'cap17-limpiego',
      targetText: 'l’impiego',
      nativeText: 'a (specific) job / post / employment',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-lavoro',
      exampleSentence: 'Ha trovato un impiego stabile in un’azienda farmaceutica.',
      exampleTranslation: 'She found stable employment at a pharmaceutical company.',
    },
    {
      slug: 'cap17-cercare-lavoro',
      targetText: 'cercare lavoro',
      nativeText: 'to look for work / job-hunt',
      partOfSpeech: 'phrase',
      theme: 'il-lavoro',
    },
    {
      slug: 'cap17-il-colloquio',
      targetText: 'il colloquio',
      nativeText: 'the (job) interview',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-lavoro',
      exampleSentence: 'Il colloquio è previsto per giovedì mattina alle dieci.',
      exampleTranslation: 'The interview is scheduled for Thursday morning at ten.',
    },
    {
      slug: 'cap17-il-curriculum',
      targetText: 'il curriculum (vitae)',
      nativeText: 'the CV / résumé',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-lavoro',
      exampleSentence: 'Aggiorna il curriculum prima di inviare la candidatura.',
      exampleTranslation: 'Update your CV before submitting the application.',
    },
    {
      slug: 'cap17-lazienda',
      targetText: 'l’azienda',
      nativeText: 'the company / firm',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'il-lavoro',
      exampleSentence: 'L’azienda ha aperto una nuova sede a Milano.',
      exampleTranslation: 'The company opened a new office in Milan.',
    },
    {
      slug: 'cap17-il-collega',
      targetText: 'il collega / la collega',
      nativeText: 'the colleague (m/f)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-lavoro',
      exampleSentence: 'I miei colleghi sono molto disponibili a collaborare.',
      exampleTranslation: 'My colleagues are very willing to collaborate.',
    },
    {
      slug: 'cap17-lo-stipendio',
      targetText: 'lo stipendio',
      nativeText: 'the salary / wages',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-lavoro',
      exampleSentence: 'Lo stipendio netto è quello che ricevi dopo le tasse.',
      exampleTranslation: 'Net salary is what you receive after taxes.',
    },
    {
      slug: 'cap17-lufficio',
      targetText: 'l’ufficio',
      nativeText: 'the office',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-lavoro',
    },
    {
      slug: 'cap17-il-dirigente',
      targetText: 'il/la dirigente',
      nativeText: 'the manager / executive',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-lavoro',
      exampleSentence: 'La dirigente ha convocato una riunione straordinaria per le due.',
      exampleTranslation: 'The manager called an extraordinary meeting for two o’clock.',
    },
    {
      slug: 'cap17-assumere',
      targetText: 'assumere',
      nativeText: 'to hire / take on (an employee)',
      partOfSpeech: 'verb',
      theme: 'il-lavoro',
      exampleSentence: 'L’azienda ha deciso di assumere tre nuovi ingegneri.',
      exampleTranslation: 'The company decided to hire three new engineers.',
    },
    {
      slug: 'cap17-licenziare',
      targetText: 'licenziare',
      nativeText: 'to dismiss / fire (an employee)',
      partOfSpeech: 'verb',
      theme: 'il-lavoro',
    },
    {
      slug: 'cap17-il-contratto',
      targetText: 'il contratto',
      nativeText: 'the (work) contract',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-lavoro',
      exampleSentence: 'Ha firmato un contratto a tempo indeterminato dopo il periodo di prova.',
      exampleTranslation: 'She signed a permanent contract after the probationary period.',
    },
    {
      slug: 'cap17-disoccupato',
      targetText: 'disoccupato / disoccupata',
      nativeText: 'unemployed',
      partOfSpeech: 'adj',
      theme: 'il-lavoro',
      exampleSentence: 'È disoccupato da sei mesi e sta cercando attivamente.',
      exampleTranslation: 'He has been unemployed for six months and is actively looking.',
    },
    {
      slug: 'cap17-lo-stagista',
      targetText: 'lo stagista / la stagista',
      nativeText: 'the intern',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'il-lavoro',
    },
    {
      slug: 'cap17-le-competenze',
      targetText: 'le competenze',
      nativeText: 'skills / competencies',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'il-lavoro',
      exampleSentence: 'Il candidato ideale deve avere competenze digitali e comunicative.',
      exampleTranslation: 'The ideal candidate must have digital and communication skills.',
    },
    // Computer e internet
    {
      slug: 'cap17-internet',
      targetText: 'internet',
      nativeText: 'the internet (invariable, no article or with il)',
      partOfSpeech: 'noun',
      theme: 'computer-internet',
      exampleSentence:
        'Lavoro su internet tutto il giorno, ma la connessione in treno è instabile.',
      exampleTranslation:
        'I work on the internet all day, but the connection on the train is unreliable.',
    },
    {
      slug: 'cap17-il-sito-web',
      targetText: 'il sito web',
      nativeText: 'the website',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'computer-internet',
      exampleSentence: 'Il sito web dell’azienda è stato completamente rinnovato.',
      exampleTranslation: 'The company’s website has been completely redesigned.',
    },
    {
      slug: 'cap17-lemail',
      targetText: 'l’email',
      nativeText: 'the email (f)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'computer-internet',
      exampleSentence: 'Ti mando un’email con tutti i dettagli del progetto.',
      exampleTranslation: 'I’ll send you an email with all the project details.',
    },
    {
      slug: 'cap17-la-password',
      targetText: 'la password',
      nativeText: 'the password (f)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'computer-internet',
    },
    {
      slug: 'cap17-il-file',
      targetText: 'il file',
      nativeText: 'the file',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'computer-internet',
      exampleSentence: 'Puoi mandarmi il file in formato PDF?',
      exampleTranslation: 'Can you send me the file in PDF format?',
    },
    {
      slug: 'cap17-scaricare',
      targetText: 'scaricare',
      nativeText: 'to download',
      partOfSpeech: 'verb',
      theme: 'computer-internet',
      exampleSentence: 'Ho scaricato l’app sul telefono questa mattina.',
      exampleTranslation: 'I downloaded the app on my phone this morning.',
    },
    {
      slug: 'cap17-i-social',
      targetText: 'i social (media)',
      nativeText: 'social media',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'computer-internet',
      exampleSentence: 'L’azienda usa i social per comunicare con i clienti.',
      exampleTranslation: 'The company uses social media to communicate with customers.',
    },
    {
      slug: 'cap17-lutente',
      targetText: 'l’utente',
      nativeText: 'the user (m/f, same form)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'computer-internet',
      exampleSentence: 'Gli utenti registrati possono accedere a tutti i contenuti.',
      exampleTranslation: 'Registered users can access all the content.',
    },
    {
      slug: 'cap17-cliccare',
      targetText: 'cliccare (su)',
      nativeText: 'to click (on)',
      partOfSpeech: 'verb',
      theme: 'computer-internet',
      exampleSentence: 'Clicca sull’icona per aprire la cartella.',
      exampleTranslation: 'Click on the icon to open the folder.',
    },
    {
      slug: 'cap17-la-rete',
      targetText: 'la rete',
      nativeText: 'the network / the net / the internet',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'computer-internet',
    },
    {
      slug: 'cap17-lapplicazione',
      targetText: 'l’applicazione / l’app',
      nativeText: 'the app / application',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'computer-internet',
      exampleSentence: 'C’è un’app per gestire le spese dell’azienda in tempo reale.',
      exampleTranslation: 'There’s an app to manage company expenses in real time.',
    },
    {
      slug: 'cap17-il-motore-di-ricerca',
      targetText: 'il motore di ricerca',
      nativeText: 'the search engine',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'computer-internet',
      exampleSentence: 'Ho trovato il loro sito tramite un motore di ricerca.',
      exampleTranslation: 'I found their site through a search engine.',
    },
  ],
};

export default unit;
