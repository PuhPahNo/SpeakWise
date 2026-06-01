// Appendix — Strutture avanzate
// Theme: culture. The constructions that mark fluent, native-like Italian:
// the periodo ipotetico, the passive voice, causative fare, the future perfect,
// lasciare and perception verbs with infinitives, and idiomatic article use.
//
// All content original (copyright-safe).

import { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client';
import type { SeedUnit } from '../types';

const unit: SeedUnit = {
  code: 'appendix',
  order: 19,
  title: 'Strutture avanzate',
  subtitle: 'The constructions that make your Italian fluent',
  theme: 'culture',
  level: CEFRLevel.advanced,
  summary:
    'This appendix pulls together the structures that separate competent Italian from truly fluent, ' +
    'native-like Italian: the three types of conditional clauses (real, possible, and impossible), ' +
    'the passive voice and its elegant si passivante alternative, the causative fare that lets you ' +
    'get things done through others, the future perfect for completed actions and confident guesses, ' +
    'lasciare and perception verbs with infinitives, and the fine-grained rules of the definite ' +
    'article that trip up even advanced learners. Master these and your Italian will start to sound ' +
    'like it belongs.',
  canDo: [
    'Build all three types of conditional sentence and never use the conditional directly after se',
    'Form the passive with essere, venire, and andare, and choose the si passivante where it sounds more natural',
    'Use causative fare to have things done and farsi to have things done to yourself',
    'Form and use the futuro anteriore to say what will have happened and to express probability about the recent past',
    'Use lasciare and perception verbs (vedere, sentire, guardare, ascoltare) with an infinitive and place pronouns correctly',
    'Apply the definite article with body parts, languages, titles, days of the week, and general abstract nouns like a native speaker',
  ],
  culturalNotes: [
    {
      title: 'When structures signal fluency',
      body:
        'Italian linguists sometimes distinguish between chi sa l’italiano (who knows Italian) and chi ' +
        'parla l’italiano (who speaks it). The structures in this appendix — the ipotetico impossibile, ' +
        'the si passivante, causative fare, and the futuro anteriore — rarely appear in phrasebook Italian, ' +
        'yet they are the unremarkable daily currency of educated native speakers. When a learner uses ' +
        'Se avessi saputo, non sarei venuto or Qui si accettano solo contanti without hesitation, ' +
        'Italians notice — and the conversation immediately shifts to a higher register of mutual respect.',
    },
    {
      title: 'The si passivante: elegance in signage and journalism',
      body:
        'Walk through any Italian city and you will see the si passivante everywhere: Si prega di non ' +
        'fumare, Si accettano carte di credito, Si affitta, Si vende. Italian newspapers rely on it ' +
        'equally: Si prevede un calo dei consumi; Si discute di una possibile riforma. The construction ' +
        'is preferred over the essere passive in impersonal or institutional contexts because it sounds ' +
        'less bureaucratic and more direct. Learners who default to è fatto / è venduto in every ' +
        'passive context betray a grammar-book education; learning when to reach for si instead is ' +
        'the mark of genuine fluency.',
    },
    {
      title: 'Register and the definite article',
      body:
        'The Italian definite article carries subtle social information. Saying parlo italiano (no ' +
        'article) is neutral and natural in conversation, while studio l’italiano implies a more ' +
        'deliberate academic relationship with the language — both are correct, but the choice is felt. ' +
        'Similarly, referring to a person by title in the third person (la professoressa Conti, il ' +
        'dottor Ferraris) with the article is polite and formal; dropping the article when addressing ' +
        'someone directly (Professoressa Conti, buongiorno) is equally correct but different in ' +
        'function. These distinctions are invisible in most textbooks yet instantly audible to any ' +
        'Italian ear.',
    },
  ],

  // ─── Skills ───────────────────────────────────────────────────────────────
  skills: [
    {
      slug: 'it-hypotheticals',
      name: 'Periodo ipotetico — all three types',
      category: SkillCategory.grammar,
      level: CEFRLevel.advanced,
      description:
        'Italian has three conditional constructions. (1) REAL: se + presente indicativo, result in ' +
        'presente or futuro (Se piove, resto a casa; Se studierai, passerai). (2) POSSIBLE: se + ' +
        'congiuntivo imperfetto, result in condizionale presente (Se avessi tempo, viaggerei di più). ' +
        '(3) IMPOSSIBLE/PAST: se + congiuntivo trapassato, result in condizionale passato (Se avessi ' +
        'saputo la notizia, sarei venuto subito). The iron rule: never use the condizionale directly ' +
        'after se — ever.',
      prerequisiteSlugs: [
        'it-congiuntivo-imperfetto',
        'it-conditional-present',
        'it-congiuntivo-trapassato',
      ],
      examples: [
        {
          target: 'Se piove domani, prendiamo l’ombrello.',
          native: 'If it rains tomorrow, we’ll take the umbrella.',
          note: 'Real: present in both clauses — a likely, open condition',
        },
        {
          target: 'Se avessi più soldi, comprerei una casa in Toscana.',
          native: 'If I had more money, I would buy a house in Tuscany.',
          note: 'Possible: congiuntivo imperfetto + condizionale presente — unlikely but imaginable',
        },
        {
          target: 'Se avesse studiato di più, avrebbe superato l’esame.',
          native: 'If she had studied more, she would have passed the exam.',
          note: 'Impossible: congiuntivo trapassato + condizionale passato — the chance is gone',
        },
        {
          target: 'Se potessi scegliere, vivrei in riva al mare.',
          native: 'If I could choose, I would live by the sea.',
          note: 'Possible type — potere in the congiuntivo imperfetto',
        },
      ],
      commonMistakes: [
        'Using the condizionale directly after se (Se vorrei → wrong; Se volessi is correct)',
        'Mixing up the possible and impossible types — the tense of the se-clause is the key signal',
        'Using the future in the se-clause of a real conditional in formal writing (colloquial Italian does this, but careful written Italian avoids it)',
        'Forgetting past-participle agreement in the condizionale passato with essere verbs (sarebbe andata, not "sarebbe andato" for a female subject)',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.tense_selection,
        TaskType.translation,
        TaskType.error_correction,
      ],
      compatibleThemes: ['culture', 'travel', 'news', 'politics', 'history'],
      teachingNotes:
        'Teach the three types as a spectrum from real to hypothetical to regret. The "never ' +
        'condizionale after se" rule should be introduced as an absolute — make it memorable. ' +
        'For the impossible type, anchor it in personal regret (Se avessi saputo…) because emotion ' +
        'makes the tense sequence stick. Always contrast the possible and impossible side by side.',
    },
    {
      slug: 'it-passive-voice',
      name: 'La forma passiva — the passive voice',
      category: SkillCategory.grammar,
      level: CEFRLevel.advanced,
      description:
        'Italian forms the passive with essere + past participle (agreeing with the subject) optionally ' +
        'followed by da + agent: La cena è preparata da Marco. In simple (non-compound) tenses, venire ' +
        'can replace essere for a more dynamic sense: Il ponte viene costruito ogni primavera. The ' +
        'auxiliary andare expresses necessity or obligation: Va fatto subito (It must be done at once); ' +
        'Va rispettata la legge. The si passivante (si + 3rd person verb) is the common, elegant ' +
        'alternative: Si parlano molte lingue qui; Qui si vendono biglietti; Si prega di non fumare.',
      prerequisiteSlugs: ['it-passato-prossimo-essere'],
      examples: [
        {
          target: 'La lettera è stata scritta da uno studente straniero.',
          native: 'The letter was written by a foreign student.',
          note: 'Passato prossimo passive with essere — participle agrees with la lettera (f sg)',
        },
        {
          target: 'Il rapporto viene pubblicato ogni anno.',
          native: 'The report is published every year.',
          note: 'Venire replaces essere in a simple present — dynamic, process-like sense',
        },
        {
          target: 'Va consegnato il modulo entro venerdì.',
          native: 'The form must be handed in by Friday.',
          note: 'Andare passive expressing obligation',
        },
        {
          target: 'In questo bar si servono colazioni fino alle undici.',
          native: 'Breakfast is served in this bar until eleven.',
          note: 'Si passivante — subject is colazioni (pl), so verb is plural',
        },
      ],
      commonMistakes: [
        'Forgetting participle agreement in the essere passive (la porta è aperta, not "la porta è aperto")',
        'Using venire in compound tenses — venire passive is only for simple tenses (use essere for the passato prossimo)',
        'Confusing andare + participle (obligation) with essere + participle (plain passive)',
        'Using a singular verb with a plural si passivante subject (si vende biglietti → si vendono biglietti)',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.error_correction,
        TaskType.multiple_choice,
      ],
      compatibleThemes: ['culture', 'news', 'history', 'politics', 'business'],
      teachingNotes:
        'Sequence: essere passive first (as a transformation of the active), then venire as a stylistic ' +
        'option in simple tenses only, then andare for obligation, then si passivante as the most ' +
        'colloquially natural form. Reinforce the si passivante with real signage examples — learners ' +
        'often discover they have already seen this structure without recognising it.',
    },
    {
      slug: 'it-causative-fare',
      name: 'Il causativo con fare — making and having things done',
      category: SkillCategory.grammar,
      level: CEFRLevel.advanced,
      description:
        'The causative is formed with fare + infinitive and means "to have/make someone do something" ' +
        'or "to have something done". When the infinitive has its own object, the person caused to act ' +
        'takes an indirect object: Il professore fa scrivere un tema agli studenti. When there is no ' +
        'other object, the person can be a direct object: La faccio ridere. Reflexive farsi means to ' +
        'have something done to oneself: Mi faccio tagliare i capelli dal barbiere. Pronoun placement ' +
        'follows the standard clitic rules: they precede the conjugated fare (or attach to an infinitive ' +
        'or gerund), and gliela faccio vedere means "I’ll show it to him/her."',
      prerequisiteSlugs: ['it-infinitive-constructions'],
      examples: [
        {
          target: 'Faccio riparare la macchina dal meccanico.',
          native: 'I’m having the car repaired by the mechanic.',
          note: 'Fare + infinitive: the agent (mechanic) introduced by da',
        },
        {
          target: 'Il regista fa recitare una scena agli attori ogni mattina.',
          native: 'The director has the actors perform a scene every morning.',
          note: 'Two objects: la scena (direct), agli attori (indirect with a)',
        },
        {
          target: 'Mi sono fatto consegnare il pacco a casa.',
          native: 'I had the parcel delivered to my home.',
          note: 'Farsi: causative applied to oneself; passato prossimo with essere',
        },
        {
          target: 'Gliela faccio vedere domani.',
          native: 'I’ll show it to him/her tomorrow.',
          note: 'Double pronoun before fare: gli + la → gliela',
        },
      ],
      commonMistakes: [
        'Putting the caused agent as a direct object when there is already another direct object (use a + person, not a bare noun)',
        'Using fare + past participle instead of fare + infinitive',
        'Misplacing clitics — they go before fare in conjugated forms, never between fare and the infinitive',
        'Forgetting the reflexive auxiliary essere in farsi in compound tenses (mi sono fatto tagliare, not "ho fatto tagliare a me")',
      ],
      recommendedPracticeTypes: [
        TaskType.translation,
        TaskType.pronoun_replacement,
        TaskType.fill_blank,
        TaskType.error_correction,
      ],
      compatibleThemes: ['culture', 'business', 'family', 'travel'],
      teachingNotes:
        'Anchor the structure in practical, real-world scenarios: the barbiere, the meccanico, ' +
        'the sarto (tailor). These make the grammar immediately useful and memorable. The hardest ' +
        'part is the direct/indirect object split when two objects are present — drill it with ' +
        'minimal pairs. Introduce the reflexive farsi as a natural extension: "you are having ' +
        'something done to yourself."',
    },
    {
      slug: 'it-future-perfect',
      name: 'Il futuro anteriore — the future perfect',
      category: SkillCategory.grammar,
      level: CEFRLevel.advanced,
      description:
        'The futuro anteriore is formed with the futuro semplice of avere or essere plus the past ' +
        'participle of the main verb: avrò finito (I will have finished), sarò partito/a (I will have ' +
        'left). Its primary use is "will have done" in time clauses: Quando avrai finito, usciremo ' +
        '(When you have finished, we’ll go out). It also expresses confident probability about the ' +
        'recent past — a common and characteristically Italian use: Sarà già arrivato (He has probably ' +
        'already arrived); Avrà avuto un contrattempo (She must have had a delay).',
      prerequisiteSlugs: ['it-future-simple', 'it-passato-prossimo-avere'],
      examples: [
        {
          target: 'Quando avrò finito il lavoro, ti chiamo.',
          native: 'When I have finished work, I’ll call you.',
          note: 'Future perfect in a quando-clause; Italian requires the future where English uses the present',
        },
        {
          target: 'Entro domani sera avremo consegnato il progetto.',
          native: 'By tomorrow evening we will have submitted the project.',
          note: 'Deadline use with entro — very common in business Italian',
        },
        {
          target: 'Non risponde — sarà ancora in riunione.',
          native: 'He’s not answering — he must still be in a meeting.',
          note: 'Probability about the present; futuro semplice of essere here (not futuro anteriore)',
        },
        {
          target: 'Avranno già visto il film, immagino.',
          native: 'They’ve probably already seen the film, I imagine.',
          note: 'Probability about the recent past — futuro anteriore of vedere',
        },
      ],
      commonMistakes: [
        'Omitting the future perfect after quando and non appena — English uses the simple present, Italian requires the future (perfect or simple depending on the meaning)',
        'Confusing the probability use of the futuro semplice (sara stanco = he is probably tired) with the futuro anteriore (sarà stato stanco = he was probably tired)',
        'Forgetting past-participle agreement when the auxiliary is essere (sarà già partita, not "sarà già partito" for a female subject)',
        'Using the passato prossimo instead of the futuro anteriore in hypothetical quando-clauses',
      ],
      recommendedPracticeTypes: [
        TaskType.tense_selection,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.multiple_choice,
      ],
      compatibleThemes: ['culture', 'business', 'travel', 'news'],
      teachingNotes:
        'Two distinct uses need separate instruction slots: (1) the temporal "will have done" in ' +
        'quando/non appena/dopo che clauses — contrast directly with English because the structures ' +
        'diverge; (2) the probability reading, which is one of the most characteristically Italian ' +
        'uses of the future and often delights learners once they recognise it in speech and writing.',
    },
    {
      slug: 'it-lasciare-perception-verbs',
      name: 'Lasciare + infinitive and verbs of perception',
      category: SkillCategory.grammar,
      level: CEFRLevel.advanced,
      description:
        'Lasciare + infinitive means "to let/allow someone to do something": Lascialo parlare (Let ' +
        'him speak); Mi lasci spiegare (Let me explain). Verbs of perception — vedere, sentire, ' +
        'guardare, ascoltare — also take a direct infinitive construction: Ho visto Maria uscire (I ' +
        'saw Maria leave); Ti ho sentito cantare (I heard you sing). In both constructions, clitics ' +
        'precede the conjugated verb: Lo lascio parlare; L’ho vista uscire (agreement with the ' +
        'preceding direct object). The infinitive can also come before its own subject: Ho sentito ' +
        'suonare il violino a qualcuno — word order is flexible but the infinitive must follow the ' +
        'conjugated verb.',
      prerequisiteSlugs: ['it-infinitive-constructions', 'it-direct-object-pronouns'],
      examples: [
        {
          target: 'Lascialo finire il discorso senza interromperlo.',
          native: 'Let him finish the speech without interrupting him.',
          note: 'Lasciare + infinitive: lo is the clitic object of lasciare',
        },
        {
          target: 'L’ho vista entrare nel negozio.',
          native: 'I saw her go into the shop.',
          note: 'Vedere + infinitive: la → l’ before ho; agreement l’ho vista',
        },
        {
          target: 'Ti ho sentito suonare la chitarra stanotte.',
          native: 'I heard you playing the guitar last night.',
          note: 'Sentire + infinitive: ti is the clitic; no agreement needed with avere here',
        },
        {
          target: 'Non mi lasciano parlare in riunione.',
          native: 'They don’t let me speak in meetings.',
          note: 'Mi is the clitic object before lasciano; infinitive follows directly',
        },
      ],
      commonMistakes: [
        'Placing the clitic after the infinitive rather than before the conjugated verb (Lascialo vs "Lascia-lo")',
        'Using the gerund instead of the infinitive after perception verbs (Ho visto Maria uscendo → Ho visto Maria uscire)',
        'Forgetting past-participle agreement when a preceding direct-object clitic is present with avere (L’ho vista, not "l’ho visto" for a female)',
        'Confusing fare + infinitive (causative: you cause the action) with lasciare + infinitive (permissive: you allow the action)',
      ],
      recommendedPracticeTypes: [
        TaskType.pronoun_replacement,
        TaskType.translation,
        TaskType.error_correction,
        TaskType.fill_blank,
      ],
      compatibleThemes: ['culture', 'film', 'music', 'family'],
      teachingNotes:
        'The perception-verb construction is especially useful in narrative and description — ' +
        'ideal for film and music themes. Drill clitic placement relentlessly: it is the highest- ' +
        'frequency error. Contrast lasciare (allow) with fare (make/have) explicitly so learners ' +
        'choose the right verb for their meaning. Agreement with l’ho vista/sentita etc. is a ' +
        'secondary but important polish point.',
    },
    {
      slug: 'it-article-uses',
      name: 'Usi speciali dell’articolo determinativo',
      category: SkillCategory.grammar,
      level: CEFRLevel.advanced,
      description:
        'The definite article in Italian has several idiomatic uses that differ from English and must ' +
        'be learned case by case. (1) Abstract and general nouns always take the article: La pazienza ' +
        'è una virtù; Il tempo è denaro. (2) Languages: the article is used after studiare/imparare ' +
        '(studio l’italiano) but typically dropped after parlare (parlo italiano) and after in (in ' +
        'italiano). (3) Body parts and clothing use the article instead of a possessive: Mi lavo le ' +
        'mani; Mettiti la giacca. (4) Habitual days: il lunedì, la domenica (= on Mondays, on Sundays). ' +
        '(5) Countries, regions, large islands: l’Italia, la Toscana, la Sicilia — but no article with ' +
        'a + city. (6) Titles in the third person: il signor Rossi, la dottoressa Bianchi — but no ' +
        'article when addressing the person directly.',
      prerequisiteSlugs: ['it-definite-articles'],
      examples: [
        {
          target: 'La libertà è il bene più prezioso.',
          native: 'Freedom is the most precious thing.',
          note: 'Abstract noun as a general concept — article required',
        },
        {
          target: 'Studio il francese, ma parlo già italiano.',
          native: 'I’m studying French, but I already speak Italian.',
          note: 'Article with studiare; typically no article after parlare',
        },
        {
          target: 'Si è messa la sciarpa prima di uscire.',
          native: 'She put on her scarf before going out.',
          note: 'Clothing with the article instead of the possessive',
        },
        {
          target: 'Il dottor Ferri arriva il martedì e il giovedì.',
          native: 'Dr Ferri arrives on Tuesdays and Thursdays.',
          note: 'Article with title (3rd person) and habitual days',
        },
      ],
      commonMistakes: [
        'Dropping the article before abstract nouns used generically (La pazienza è importante, not "Pazienza è importante")',
        'Using the article after parlare + language in neutral contexts (parlo italiano, not "parlo l’italiano")',
        'Using a possessive with body parts and clothing instead of the article + reflexive verb (mi lavo le mani, not "lavo le mie mani")',
        'Omitting the article before days to express habitual action (il lunedì, not bare "lunedì" for a recurring habit)',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.error_correction,
        TaskType.translation,
      ],
      compatibleThemes: ['culture', 'family', 'travel', 'business', 'history'],
      teachingNotes:
        'Teach each sub-rule with its own mnemonic example. The body-parts rule is especially ' +
        'high-value because it recurs constantly in daily life and the reflexive-verb + article ' +
        'pattern feels alien to English speakers. The language rule (article after studiare/imparare, ' +
        'none after parlare) is subtle and worth a dedicated contrast exercise. Titles without the ' +
        'article in direct address is a politeness point that impresses native speakers.',
    },
  ],

  // ─── Lesson templates ─────────────────────────────────────────────────────
  lessonTemplates: [
    {
      slug: 'cap19-dreams-and-regrets',
      title: 'Dreams and regrets — the three if-clauses',
      lessonType: LessonType.grammar,
      level: CEFRLevel.advanced,
      summary:
        'Work through the three types of the periodo ipotetico by exploring what you would do if your ' +
        'life were different, and what you would have done if the past had gone another way. Real ' +
        'conditions, hypothetical wishes, and impossible regrets all in one lesson.',
      objectiveSkillSlugs: ['it-hypotheticals'],
      defaultDurationMinutes: 14,
      compatibleThemes: ['culture', 'travel', 'history'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Three types at a glance',
          prompt:
            'The type of conditional depends on how likely or real the condition is. ' +
            'Real (possible fact): se + present, result in present or future. ' +
            'Possible (unlikely dream): se + congiuntivo imperfetto, result in condizionale presente. ' +
            'Impossible (past regret): se + congiuntivo trapassato, result in condizionale passato. ' +
            'The single non-negotiable rule: the condizionale never follows se directly.',
          notes:
            'Show all three side by side with parallel content — e.g. the same person thinking about ' +
            'travelling to Italy — so the learner sees the structural contrast, not just isolated examples.',
        },
        {
          taskType: TaskType.tense_selection,
          focus: 'Identify the type',
          prompt:
            'Which type is this sentence? "Se fossi rimasto a Napoli, non avrei conosciuto mia moglie." ' +
            'Choose: real / possible / impossible.',
          exampleAnswer: 'Impossible (past regret): congiuntivo trapassato + condizionale passato.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Complete the possible conditional',
          prompt:
            'Fill in: "Se ___ (io / avere) più tempo libero, ___ (io / imparare) a suonare il pianoforte."',
          exampleAnswer: 'Se avessi più tempo libero, imparerei a suonare il pianoforte.',
          notes:
            'Personalise the activity in the result clause to something the learner has mentioned they enjoy.',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Spot the rule violation',
          prompt:
            'Correct this sentence: "Se vorrei vivere in Italia, comprerei subito un appartamento a Firenze."',
          exampleAnswer:
            'Se volessi vivere in Italia, comprerei subito un appartamento a Firenze. ' +
            '(condizionale vorrei cannot follow se — congiuntivo imperfetto volessi is required)',
        },
        {
          taskType: TaskType.translation,
          focus: 'Express a past regret',
          prompt: 'Translate: "If I had known she was coming, I would have prepared dinner."',
          exampleAnswer: 'Se avessi saputo che veniva, avrei preparato la cena.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Your own hypothetical',
          prompt:
            'Say one thing you would do if your life were different (possible type) and one thing you ' +
            'wish you had done differently (impossible type). Use complete Italian sentences.',
          notes:
            'This is a high-value fluency prompt — accept any grammatically correct period ipotetico. ' +
            'Coach the congiuntivo tense above all else; the condizionale is usually easier.',
        },
        {
          taskType: TaskType.recap,
          focus: 'The golden rule',
          prompt: 'Complete this sentence: "After se, you never use ___."',
          exampleAnswer: 'After se, you never use the condizionale (neither presente nor passato).',
        },
      ],
    },
    {
      slug: 'cap19-passive-and-si',
      title: 'La passiva e il si passivante — how things get made',
      lessonType: LessonType.grammar,
      level: CEFRLevel.advanced,
      summary:
        'Describe how things are produced, built, and required — using the essere passive, the venire ' +
        'alternative, the obligatory andare construction, and the ubiquitous si passivante. See why ' +
        'Italians reach for si rather than essere in signage, journalism, and everyday speech.',
      objectiveSkillSlugs: ['it-passive-voice'],
      defaultDurationMinutes: 13,
      compatibleThemes: ['culture', 'news', 'history', 'business'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Four ways to be passive',
          prompt:
            'In Italian you have four tools: essere + participio (plain passive), venire + participio ' +
            '(simple tenses only, more dynamic), andare + participio (obligation), and si + terza persona ' +
            '(most natural in speech and signage). All four are in active use — your job is to match ' +
            'the right one to the context.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Choose essere or venire',
          prompt:
            'Decide which passive is more natural: "La cattedrale ___ (costruire) nel 1200" — passato ' +
            'prossimo (event) or "Il museo ___ (restaurare) ogni estate" — presente (repeated process)?',
          exampleAnswer:
            'La cattedrale è stata costruita nel 1200 (essere for the passato prossimo event). ' +
            'Il museo viene restaurato ogni estate (venire for the recurring simple-present process).',
          notes:
            'Underline that venire cannot appear in compound tenses — this is the single most ' +
            'reliable error trigger for this structure.',
        },
        {
          taskType: TaskType.translation,
          focus: 'The andare obligation passive',
          prompt: 'Translate: "The rules must be respected." (Use andare.)',
          exampleAnswer: 'Le regole vanno rispettate.',
          notes: 'Note the agreement: le regole is feminine plural → rispettate.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Si passivante with number agreement',
          prompt:
            'Rewrite using si: "In questo negozio vendono prodotti biologici" → "In questo negozio ___."',
          exampleAnswer: 'In questo negozio si vendono prodotti biologici.',
          notes:
            'Emphasise the verb must agree with the notional subject (prodotti biologici is plural).',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Catch the venire mistake',
          prompt:
            'Correct: "Il contratto è venuto firmato ieri." Why is this wrong and what is the correction?',
          exampleAnswer:
            'Il contratto è stato firmato ieri. Venire cannot be used in compound tenses; ' +
            'essere is required.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Choosing the right passive',
          prompt:
            'When would you choose si instead of the essere passive? Give one real-world example.',
          notes:
            'Accept any plausible answer. Good answers mention signage, impersonal announcements, ' +
            'or journalistic prose.',
        },
      ],
    },
    {
      slug: 'cap19-causative-fare',
      title: 'Faccio fare — getting things done',
      lessonType: LessonType.grammar,
      level: CEFRLevel.advanced,
      summary:
        'Master causative fare for real-life Italian delegation and service: taking the car to the ' +
        'mechanic, having your hair cut, arranging a delivery. Includes farsi and the tricky pronoun ' +
        'placement rules.',
      objectiveSkillSlugs: ['it-causative-fare'],
      defaultDurationMinutes: 12,
      compatibleThemes: ['culture', 'business', 'family'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Fare + infinitive: the formula',
          prompt:
            'Fare + infinitive = "have/make someone do something" or "have something done". When the ' +
            'infinitive already has its own direct object, the caused person becomes an indirect object ' +
            '(a + person). Clitics always attach before the conjugated fare, not between fare and the ' +
            'infinitive. Farsi means you are the beneficiary.',
          notes:
            'Use the barbiere and meccanico examples immediately — they are the canonical illustrations ' +
            'that every Italian tutor uses and learners remember.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Basic causative',
          prompt:
            'Translate: "She has her car repaired every year." (Name the agent: il meccanico.)',
          exampleAnswer: 'Fa riparare la macchina dal meccanico ogni anno.',
          notes: 'Emphasise dal meccanico with da — same as the agente in the essere passive.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Two objects — direct vs indirect',
          prompt: 'Complete: "Il professore ___ scrivere un riassunto ___ studenti." (fa / agli)',
          exampleAnswer: 'Il professore fa scrivere un riassunto agli studenti.',
          notes:
            'Un riassunto is the direct object of scrivere; agli studenti is the caused agent — ' +
            'indirect because there is already a direct object.',
        },
        {
          taskType: TaskType.pronoun_replacement,
          focus: 'Clitic placement',
          prompt: 'Replace the objects with pronouns: "Faccio vedere il documento a Marco." → ___',
          exampleAnswer:
            'Glielo faccio vedere. (gli replaces a Marco, lo replaces il documento; gli + lo → glielo before fare)',
          notes:
            'This double-pronoun combination is the hardest step — drill it with two or three ' +
            'examples before moving on.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Farsi in the passato prossimo',
          prompt: 'Translate: "I got my hair cut at the new barbershop downtown."',
          exampleAnswer: 'Mi sono fatto/a tagliare i capelli nel nuovo barbiere in centro.',
          notes:
            'Remind the learner that farsi uses essere as auxiliary — agreement with the subject ' +
            'required (fatto vs fatta).',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Real delegation',
          prompt:
            'Tell Wise two things you have had done recently, or would have done, by someone else — ' +
            'one with farsi and one with fare + agent.',
          notes:
            'Personalise to the learner’s context: home repairs, professional services, errands. ' +
            'Accept any structurally correct causative.',
        },
      ],
    },
    {
      slug: 'cap19-future-perfect-drill',
      title: 'Avrò finito — the future perfect in time and probability',
      lessonType: LessonType.grammar,
      level: CEFRLevel.advanced,
      summary:
        'The futuro anteriore has two personalities: a logical sequencer in time clauses (when you ' +
        'have finished…) and a confident guesser about the present and recent past (he’s probably ' +
        'arrived already). Drill both.',
      objectiveSkillSlugs: ['it-future-perfect'],
      defaultDurationMinutes: 11,
      compatibleThemes: ['culture', 'business', 'news'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Formation and two uses',
          prompt:
            'Futuro anteriore = futuro semplice of avere/essere + participio passato. ' +
            'Use 1: completed future action in a quando/non appena/dopo che clause — ' +
            'Italian requires this where English uses the simple present or present perfect. ' +
            'Use 2: confident probability about the recent past — Sarà già partito means ' +
            '"He has probably already left."',
          notes:
            'Native speakers use the probability reading constantly in speech. Flag it as ' +
            'one of the most characteristically Italian uses of a future tense.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Quando-clause sequencing',
          prompt:
            'Complete: "Quando ___ (tu / finire) di leggere il contratto, firmalo e rispediscilo."',
          exampleAnswer: 'Quando avrai finito di leggere il contratto, firmalo e rispediscilo.',
          notes:
            'The English equivalent uses the simple present "when you finish/have finished" — ' +
            'contrast this directly to make the Italian requirement memorable.',
        },
        {
          taskType: TaskType.tense_selection,
          focus: 'Futuro anteriore or futuro semplice?',
          prompt: 'Which tense? "Non risponde al telefono — (essere) ancora in riunione."',
          exampleAnswer:
            'Futuro semplice: Sarà ancora in riunione. (Probability about the present — no completed action, so no futuro anteriore needed here.)',
          notes:
            'This is the precise distinction — futuro semplice for present-state probability, ' +
            'futuro anteriore for past-action probability. Contrast: Sarà in riunione (is probably ' +
            'in a meeting) vs Sarà arrivato (has probably already arrived).',
        },
        {
          taskType: TaskType.translation,
          focus: 'Deadline with entro',
          prompt: 'Translate: "By the time you read this, I will already have left for Rome."',
          exampleAnswer: 'Quando leggerai questo, sarò già partito/a per Roma.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Probability guesses',
          prompt:
            'Make three guesses about what three different people you know have probably done today. ' +
            'Use the futuro anteriore.',
          exampleAnswer:
            'Mia sorella avrà già finito il lavoro. Il mio collega sarà andato in palestra. ' +
            'I miei genitori avranno pranzato insieme.',
          notes:
            'This activates both the avere and essere paradigms naturally. Accept grammatically ' +
            'sound attempts; coach agreement on essere verbs.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Two uses, one tense',
          prompt:
            'Give one sentence using the futuro anteriore for sequencing and one for probability.',
        },
      ],
    },
    {
      slug: 'cap19-fluency-roleplay',
      title: 'Una conversazione da madrelingua — putting it all together',
      lessonType: LessonType.scenario_roleplay,
      level: CEFRLevel.advanced,
      summary:
        'A polished, fluent conversation at a dinner party in Rome. Draw on all six structures from ' +
        'this appendix: conditionals, the passive, causative fare, the futuro anteriore, lasciare and ' +
        'perception verbs, and native-sounding article use. This is B2/C1 Italian in a single lesson.',
      objectiveSkillSlugs: [
        'it-hypotheticals',
        'it-passive-voice',
        'it-causative-fare',
        'it-future-perfect',
        'it-lasciare-perception-verbs',
        'it-article-uses',
      ],
      defaultDurationMinutes: 16,
      compatibleThemes: ['culture', 'food', 'art', 'history'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Scene-setting',
          prompt:
            'You are a guest at a dinner party in Trastevere. Your host — a retired professor — is a ' +
            'fascinating conversationalist who moves effortlessly between culture, food, politics, and ' +
            'personal history. Your goal: sound like a fluent speaker, not a textbook. Every answer ' +
            'should feel natural, not performed.',
          notes:
            'Personalize the topic areas to what the learner cares about — art, film, food, sport. ' +
            'The professor character can be adapted accordingly.',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'A conditional in conversation',
          prompt:
            'Il professore chiede: "Se potesse vivere in qualsiasi città italiana, dove andrebbe?" ' +
            'Rispondi con una frase completa usando il periodo ipotetico del possibile.',
          exampleAnswer:
            'Se potessi scegliere, vivrei a Bologna — è una città universitaria piena di vita, ' +
            'e la cucina emiliana è insuperabile.',
          notes:
            'The possible conditional is the natural register for this social question. ' +
            'Coach the congiuntivo imperfetto potessi — it is the most common error here.',
        },
        {
          taskType: TaskType.translation,
          focus: 'The si passivante in natural speech',
          prompt:
            'Your host says: "In questa zona si mangiano le migliori carbonare di Roma." ' +
            'Translate and then produce a similar sentence about food from your home city.',
          exampleAnswer:
            'Translation: "In this neighbourhood, the best carbonaras in Rome are eaten." ' +
            'Example: In questa città si preparano ottimi piatti a base di pesce.',
          notes:
            'Push the learner to produce the si passivante productively, not just recognise it.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Causative fare and lasciare',
          prompt:
            'Il professore racconta di aver fatto restaurare un quadro antico. Racconta tu un’esperienza ' +
            'simile — reale o immaginaria — in cui hai fatto fare qualcosa oppure hai lasciato qualcuno ' +
            'fare qualcosa. Usa almeno un pronome doppio.',
          exampleAnswer:
            'Ho fatto riparare il tetto da un artigiano locale — glielo ho spiegato io personalmente ' +
            'come volevo che fosse. E ho lasciato mio figlio scegliere i colori della sua stanza.',
          notes:
            'This combines causative fare and lasciare in a single speaking turn. Accept any fluent ' +
            'attempt; coach pronoun placement and auxiliary essere for farsi.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Article precision',
          prompt:
            'Complete with the definite article where required, or leave blank: ' +
            '"___ professore Marchetti studia ___ storia dell’arte e parla ___ tedesco perfettamente. ' +
            'Si sveglia ___ lunedì alle sei e va a ___ messa ___ domenica."',
          exampleAnswer:
            'Il professore Marchetti studia la storia dell’arte e parla tedesco perfettamente. ' +
            'Si sveglia il lunedì alle sei e va a messa la domenica.',
          notes:
            'Covers: title + surname (article), general abstract noun (article), language after ' +
            'parlare (no article), habitual day (article). The messa case is a fixed expression ' +
            'without article — note it as an idiom.',
        },
        {
          taskType: TaskType.reflection,
          focus: 'What sounded most Italian?',
          prompt:
            'Which one structure from this conversation — conditional, passive, causative, futuro ' +
            'anteriore, perception verb, or article — do you feel most confident using now? ' +
            'Which one do you want to practise more?',
          notes:
            'Metacognitive close. The learner’s honest self-assessment here guides which skill ' +
            'the engine should prioritise in the next review session.',
        },
      ],
    },
  ],

  // ─── Thematic vocabulary bank ─────────────────────────────────────────────
  vocabulary: [
    {
      slug: 'cap19-il-barbiere',
      targetText: 'il barbiere',
      nativeText: 'the barber',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'strutture',
      exampleSentence: 'Mi faccio tagliare i capelli dal barbiere ogni mese.',
      exampleTranslation: 'I have my hair cut by the barber every month.',
    },
    {
      slug: 'cap19-il-meccanico',
      targetText: 'il meccanico',
      nativeText: 'the mechanic',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'strutture',
      exampleSentence: 'Ho fatto riparare la macchina dal meccanico.',
      exampleTranslation: 'I had the car repaired by the mechanic.',
    },
    {
      slug: 'cap19-la-lingua',
      targetText: 'la lingua',
      nativeText: 'the language / tongue',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'strutture',
      exampleSentence: 'Studio la lingua italiana da tre anni.',
      exampleTranslation: 'I have been studying the Italian language for three years.',
    },
    {
      slug: 'cap19-la-virtu',
      targetText: 'la virtù',
      nativeText: 'virtue',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'strutture',
      exampleSentence: 'La pazienza è una virtù difficile da coltivare.',
      exampleTranslation: 'Patience is a virtue that is hard to cultivate.',
    },
    {
      slug: 'cap19-costruire',
      targetText: 'costruire',
      nativeText: 'to build / to construct',
      partOfSpeech: 'verb',
      theme: 'strutture',
      exampleSentence: 'Il ponte viene costruito da una ditta tedesca.',
      exampleTranslation: 'The bridge is being built by a German company.',
    },
    {
      slug: 'cap19-riparare',
      targetText: 'riparare',
      nativeText: 'to repair / to fix',
      partOfSpeech: 'verb',
      theme: 'strutture',
      exampleSentence: 'Faccio riparare il tetto prima dell’inverno.',
      exampleTranslation: 'I’m having the roof repaired before winter.',
    },
    {
      slug: 'cap19-la-pazienza',
      targetText: 'la pazienza',
      nativeText: 'patience',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'strutture',
      exampleSentence: 'La pazienza è fondamentale per imparare una lingua straniera.',
      exampleTranslation: 'Patience is fundamental for learning a foreign language.',
    },
    {
      slug: 'cap19-consegnare',
      targetText: 'consegnare',
      nativeText: 'to deliver / to hand in',
      partOfSpeech: 'verb',
      theme: 'strutture',
      exampleSentence: 'Il progetto va consegnato entro venerdì.',
      exampleTranslation: 'The project must be handed in by Friday.',
    },
    {
      slug: 'cap19-il-contratto',
      targetText: 'il contratto',
      nativeText: 'the contract',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'strutture',
      exampleSentence: 'Il contratto viene firmato di solito davanti a un notaio.',
      exampleTranslation: 'The contract is usually signed in front of a notary.',
    },
    {
      slug: 'cap19-il-sarto',
      targetText: 'il sarto / la sarta',
      nativeText: 'the tailor',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'strutture',
      exampleSentence: 'Mi sono fatta cucire un abito su misura dalla sarta.',
      exampleTranslation: 'I had a made-to-measure dress sewn by the tailor.',
    },
    {
      slug: 'cap19-il-rimpianto',
      targetText: 'il rimpianto',
      nativeText: 'the regret',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'strutture',
      exampleSentence: 'Se avessi studiato di più, non avrei questo rimpianto.',
      exampleTranslation: 'If I had studied harder, I wouldn’t have this regret.',
    },
    {
      slug: 'cap19-il-contrattempo',
      targetText: 'il contrattempo',
      nativeText: 'the setback / mishap / delay',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'strutture',
      exampleSentence: 'Sarà arrivata in ritardo — avrà avuto un contrattempo.',
      exampleTranslation: 'She must have arrived late — she probably had a setback.',
    },
  ],
};

export default unit;
