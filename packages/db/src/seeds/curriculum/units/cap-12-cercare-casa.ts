// Capitolo 12 — Cercare casa
// Theme: finding a home. Indefinite adjectives and pronouns, negation, the
// formal imperative (Lei), and the full vocabulary of home and furniture.
// Regional focus: La Puglia — the trulli of Alberobello.
//
// All content original (copyright-safe).

import { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client';
import type { SeedUnit } from '../types';

const unit: SeedUnit = {
  code: 'cap-12',
  order: 12,
  title: 'Cercare casa',
  subtitle: 'Indefinites, negatives, the home, and formal commands',
  theme: 'family',
  level: CEFRLevel.intermediate,
  summary:
    'Step inside an Italian apartment and make it your own. You’ll tour a flat with a landlord, ' +
    'describe every room and piece of furniture, and ask where things are using spatial prepositions. ' +
    'Along the way you’ll master the indefinite adjectives (qualche stanza, ogni piano, tutta la casa) ' +
    'and their pronoun counterparts (qualcuno, qualcosa di bello, nessuno), learn the precise rules of ' +
    'Italian double negation (non … niente, non … mai, non … né … né), and practise the formal ' +
    'imperative you need when speaking to a landlord or estate agent — Scusi, mi dica, si accomodi.',
  canDo: [
    'Describe a home and its rooms using qualche, ogni, tutto, and quantifiers',
    'Say what an apartment has and does not have using Italian double negation',
    'Use indefinite pronouns (qualcuno, qualcosa, nessuno, ognuno) in real sentences',
    'Give and follow formal commands when interacting with a landlord or agent',
    'Name the rooms, furniture, and appliances of a home',
    'Locate objects in space using sopra, sotto, accanto a, davanti a, dietro, and tra',
  ],
  culturalNotes: [
    {
      title: 'I giovani e la casa: staying in the nest',
      body:
        'Italy has one of Europe’s highest rates of young adults living with their parents. According ' +
        'to national statistics, more than half of Italians between the ages of 18 and 34 still live at ' +
        'home — a figure far above the EU average. This is not purely an economic phenomenon, though ' +
        'high rents and precarious employment contracts do play a role. Family ties are genuinely valued: ' +
        'the home is the centre of social life, meals are shared, and the idea of moving out simply to ' +
        'assert independence carries less cultural weight than it does in Anglo-American contexts. The ' +
        'affectionate term mammone (mama’s boy) is used more fondly than critically.',
    },
    {
      title: 'I trulli di Alberobello — architecture as identity',
      body:
        'In the Valle d’Itria in Puglia, the town of Alberobello is blanketed by more than 1,500 trulli ' +
        '— conical dry-stone houses with whitewashed walls and grey limestone roofs. Built without mortar ' +
        'so they could theoretically be dismantled to avoid a construction tax, trulli are a UNESCO World ' +
        'Heritage Site and one of the most distinctive forms of vernacular architecture in Italy. Today ' +
        'many trulli have been converted into holiday rentals or small hotels (i trulli residenza), ' +
        'offering a unique chance to spend the night inside living history.',
    },
    {
      title: 'Case museo: homes as cultural monuments',
      body:
        'Italy preserves dozens of case museo — the private homes of artists, writers, and historical ' +
        'figures opened to the public exactly as their occupants left them. The Casa di Giacomo Leopardi ' +
        'in Recanati, Gabriele D’Annunzio’s extraordinary villa Il Vittoriale on Lake Garda, and the ' +
        'painter Giorgio Morandi’s studio-apartment in Bologna all invite visitors not just to see art ' +
        'but to inhabit the mental space in which it was created. Walking through these rooms — il ' +
        'salotto, lo studio, la camera da letto — becomes a lesson in how Italians have always treated ' +
        'the home as a place worth preserving.',
    },
  ],

  // ─── Skills ───────────────────────────────────────────────────────────────
  skills: [
    // 1. Indefinite adjectives
    {
      slug: 'it-indefinite-adjectives',
      name: 'Indefinite adjectives (qualche, alcuni, ogni, tutto, molto…)',
      category: SkillCategory.grammar,
      level: CEFRLevel.intermediate,
      description:
        'Indefinite adjectives modify nouns without specifying a precise quantity. Key forms: ' +
        'qualche (a few/some, always singular noun even when meaning is plural), alcuni/alcune (some, ' +
        'always plural), ogni (every, invariable, always singular), tutto/tutta/tutti/tutte + article ' +
        '(all/the whole), and the variable quantifiers molto, poco, tanto, troppo (agree like adjectives).',
      prerequisiteSlugs: ['it-definite-articles', 'it-adjectives-agreement'],
      examples: [
        {
          target: 'Ho visitato qualche appartamento in centro.',
          native: 'I visited a few apartments downtown.',
          note: 'qualche + singular noun even though the meaning is plural',
        },
        {
          target: 'Alcune stanze hanno il balcone, altre no.',
          native: 'Some rooms have a balcony, others don’t.',
          note: 'alcune (f. pl.) agrees with stanze',
        },
        {
          target: 'Ogni piano ha un ascensore.',
          native: 'Every floor has a lift.',
          note: 'ogni is invariable and always governs a singular noun',
        },
        {
          target: 'Tutta la casa è appena ristrutturata.',
          native: 'The whole house has just been renovated.',
          note: 'tutto + definite article + singular noun',
        },
        {
          target: 'C’è troppo rumore e poca luce.',
          native: 'There is too much noise and too little light.',
          note: 'troppo/poco agree in gender with the noun they modify',
        },
      ],
      commonMistakes: [
        'using qualche with a plural noun (qualche appartamenti — wrong; it must be qualche appartamento)',
        'making ogni agree in gender/number (ogni is invariable: ogni piano, ogni stanza — not ogni piani)',
        'forgetting the article in tutto + noun (tutto casa — wrong; it must be tutta la casa)',
        'treating molto/poco as invariable adverbs when they are adjectives before a noun',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.error_correction,
        TaskType.translation,
      ],
      compatibleThemes: ['family', 'travel', 'culture', 'business'],
      teachingNotes:
        'The qualche + singular trap is the #1 error — drill it with a minimal pair: "qualche stanza" ' +
        'vs "alcune stanze". For tutto, make the article obligatory by drilling "tutto + det + noun" as ' +
        'a three-part template. Quantifiers molto/poco should be practised in pairs (molto rumore, poca ' +
        'luce) so the gender-agreement habit sticks.',
    },

    // 2. Indefinite pronouns
    {
      slug: 'it-indefinite-pronouns',
      name: 'Indefinite pronouns (qualcuno, qualcosa, nessuno, ognuno, tutto, chiunque)',
      category: SkillCategory.grammar,
      level: CEFRLevel.intermediate,
      description:
        'Indefinite pronouns stand alone instead of modifying a noun. Core set: qualcuno (someone), ' +
        'qualcosa (something), ognuno (everyone/each one), tutto (everything), niente/nulla (nothing), ' +
        'nessuno (no one), chiunque (anyone/whoever). Two productive patterns: qualcosa di + adjective ' +
        '(qualcosa di bello — something beautiful) and qualcosa da + infinitive (qualcosa da fare — ' +
        'something to do). These invariable forms contrast with the adjective forms you just learned.',
      prerequisiteSlugs: ['it-indefinite-adjectives'],
      examples: [
        {
          target: 'Qualcuno ha chiamato mentre eri fuori.',
          native: 'Someone called while you were out.',
        },
        {
          target: 'Hai visto qualcosa di interessante all’agenzia?',
          native: 'Did you see anything interesting at the estate agent’s?',
          note: 'qualcosa di + adjective (adjective stays masculine singular)',
        },
        {
          target: 'C’è sempre qualcosa da sistemare in una casa nuova.',
          native: 'There is always something to fix in a new home.',
          note: 'qualcosa da + infinitive',
        },
        {
          target: 'Ognuno ha i propri gusti quando cerca casa.',
          native: 'Everyone has their own taste when looking for a home.',
        },
        {
          target: 'Non ho visto nessuno all’appuntamento.',
          native: 'I didn’t see anyone at the appointment.',
          note: 'nessuno used with non — see the negatives skill for the double-negative rule',
        },
      ],
      commonMistakes: [
        'adding an article to qualcuno or qualcosa (they are pronouns and stand alone)',
        'making the adjective in qualcosa di + adj agree in gender (it always stays masculine singular: qualcosa di bello, not "bella")',
        'using nessuno without non when the verb follows (non è venuto nessuno OR nessuno è venuto — both correct, but not "è venuto nessuno" without non)',
        'confusing tutto (everything, pronoun) with tutta (adjective before a noun)',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.multiple_choice,
        TaskType.error_correction,
      ],
      compatibleThemes: ['family', 'culture', 'travel', 'business'],
      teachingNotes:
        'Lead with the qualcosa di/da templates — they are immediately useful and give learners a ' +
        'productive frame. Nessuno is best taught alongside the negatives skill; cross-reference it ' +
        'here and reinforce there. Chiunque (+ subjunctive eventually) can be introduced passively for ' +
        'recognition at this level.',
    },

    // 3. Italian negation (double negatives)
    {
      slug: 'it-negatives',
      name: 'Italian negation — double negatives (non … niente, nessuno, mai, più…)',
      category: SkillCategory.grammar,
      level: CEFRLevel.intermediate,
      description:
        'Italian uses a double negative structure that is grammatically correct and required (unlike ' +
        'in English). The verb is preceded by non, and a second negative word follows: non … niente/nulla ' +
        '(nothing), non … nessuno (no one), non … mai (never), non … più (no longer), non … ancora ' +
        '(not yet), non … né … né (neither … nor), non … mica (not at all — informal), non … affatto ' +
        '(not at all — emphatic). Exception: when a negative word comes before the verb as subject or ' +
        'topic, non is dropped (Nessuno è venuto; Niente funziona).',
      prerequisiteSlugs: ['it-subject-pronouns'],
      examples: [
        {
          target: 'L’appartamento non ha niente di sbagliato.',
          native: 'The apartment has nothing wrong with it.',
          note: 'non + niente — both are required; this is correct Italian',
        },
        {
          target: 'Non abbiamo ancora firmato il contratto.',
          native: 'We haven’t signed the contract yet.',
          note: 'non … ancora = not yet',
        },
        {
          target: 'Non abitiamo più lì da anni.',
          native: 'We haven’t lived there for years. / We no longer live there.',
          note: 'non … più = no longer',
        },
        {
          target: 'Non c’è né il balcone né il giardino.',
          native: 'There is neither a balcony nor a garden.',
          note: 'non … né … né = neither … nor',
        },
        {
          target: 'Nessuno ha risposto all’annuncio.',
          native: 'No one answered the listing.',
          note: 'nessuno as subject before the verb — non is dropped',
        },
      ],
      commonMistakes: [
        'omitting non when a negative word follows the verb (hai visto nessuno? — wrong; must be non hai visto nessuno?)',
        'using only one negative word and thinking the sentence is already negative (non hai visto = you haven’t seen — but "nessuno" must still follow)',
        'keeping non when nessuno/niente is the pre-verb subject (non nessuno è venuto — wrong; just nessuno è venuto)',
        'confusing non … più (no longer) with non … ancora (not yet) — the two most often swapped',
        'placing mica or affatto before the verb — they follow the verb or come at the end',
      ],
      recommendedPracticeTypes: [
        TaskType.error_correction,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.multiple_choice,
      ],
      compatibleThemes: ['family', 'culture', 'travel', 'business'],
      teachingNotes:
        'Flip the English instinct directly: "two negatives don’t cancel out in Italian — they reinforce." ' +
        'The pre-verb subject exception (Nessuno è venuto) is the only place non disappears; treat it as a ' +
        'named special case rather than letting learners discover it as an exception. Practise non … più ' +
        'and non … ancora as a pair since they are mirror-image concepts learners constantly swap.',
    },

    // 4. Formal imperative (Lei)
    {
      slug: 'it-imperativo-formal',
      name: 'The formal imperative (Lei): Scusi, Mi dica, Si accomodi',
      category: SkillCategory.grammar,
      level: CEFRLevel.upper_intermediate,
      description:
        'The formal imperative uses the Lei present-subjunctive form. For -are verbs it ends in -i ' +
        '(Parli! Aspetti!); for -ere and -ire verbs it ends in -a (Prenda! Venga! Senta!). Key ' +
        'irregulars: sia (be), abbia (have), vada (go), dica (say), faccia (do/make), venga (come). ' +
        'Crucially, object and reflexive pronouns PRECEDE the formal imperative (Mi dica; Le consiglio; ' +
        'Si accomodi) — the opposite of the informal imperative where they attach as suffixes. ' +
        'The very formal plural Loro imperative (Parlino, Prendano) exists but is rare in everyday use.',
      prerequisiteSlugs: ['it-imperativo-informal'],
      examples: [
        {
          target: 'Scusi, può mostrarmi l’appartamento?',
          native: 'Excuse me, can you show me the apartment?',
          note: 'Scusi is the formal imperative of scusare — the everyday polite opener',
        },
        {
          target: 'Prego, si accomodi.',
          native: 'Please, make yourself comfortable / have a seat.',
          note: 'Si + accomodi: the reflexive pronoun precedes the verb form',
        },
        {
          target: 'Mi dica — a che piano è l’appartamento?',
          native: 'Tell me — which floor is the apartment on?',
          note: 'Mi precedes dica (formal imperative of dire)',
        },
        {
          target: 'Prenda pure il contratto e lo legga con calma.',
          native: 'Go ahead and take the contract and read it at your leisure.',
          note: 'Prenda (-ere → -a) and legga — both formal imperatives; pure adds courtesy',
        },
        {
          target: 'Non si preoccupi — l’affitto include le spese.',
          native: 'Don’t worry — the rent includes utilities.',
          note: 'formal negative imperative: non + pronoun + verb',
        },
      ],
      commonMistakes: [
        'attaching the pronoun as a suffix as with the informal imperative (dica-mi — wrong; must be mi dica)',
        'using the present indicative form instead of the subjunctive (lei parla! — wrong; lei parli!)',
        'applying -are endings to -ere/-ire verbs or vice versa (prendi instead of prenda for prendere)',
        'forgetting that common irregulars (dica, faccia, venga, vada, sia, abbia) are subjunctive forms, not guessable from the infinitive stem',
      ],
      recommendedPracticeTypes: [
        TaskType.conjugation,
        TaskType.fill_blank,
        TaskType.roleplay,
        TaskType.error_correction,
      ],
      compatibleThemes: ['family', 'travel', 'business', 'culture'],
      teachingNotes:
        'The pronoun placement rule is the single most important point — drill it as a direct contrast ' +
        'with the informal: "dimmi (informal) vs mi dica (formal)". Anchor the irregular forms to ' +
        'high-frequency phrases the learner will actually use (Scusi, Mi dica, Si accomodi, Venga pure, ' +
        'Non si preoccupi) before abstracting to the full paradigm. The Loro imperative can be mentioned ' +
        'for recognition but need not be drilled at this level.',
    },

    // 5. Home vocabulary
    {
      slug: 'it-vocab-home',
      name: 'La casa — rooms, features, and rental terms',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.intermediate,
      description:
        'The essential vocabulary for describing and renting a home: room names, building features, ' +
        'rental terminology, and the key people involved — the landlord and the tenant.',
      prerequisiteSlugs: ['it-noun-gender', 'it-simple-prepositions'],
      examples: [
        {
          target: 'L’appartamento è al terzo piano con ascensore.',
          native: 'The apartment is on the third floor with a lift.',
        },
        {
          target: 'L’affitto mensile include le spese condominiali.',
          native: 'The monthly rent includes building maintenance fees.',
        },
        {
          target: 'Il proprietario cerca un inquilino serio.',
          native: 'The landlord is looking for a reliable tenant.',
        },
      ],
      commonMistakes: [
        'confusing la camera da letto (bedroom) with la stanza (generic room)',
        'using appartamento and casa interchangeably — casa can mean any dwelling; appartamento is specifically a flat within a building',
        'forgetting that il piano in Italian means both "floor/storey" and "plan" — context resolves the ambiguity',
        'treating monolocale as a compound of two words to translate literally — it simply means "studio flat"',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.fill_blank,
        TaskType.speaking_prompt,
        TaskType.roleplay,
      ],
      compatibleThemes: ['family', 'culture', 'travel', 'business'],
      teachingNotes:
        'Use a floor-plan visual as the anchoring image — label every room so gender sticks with the noun. ' +
        'Introduce rental terms as a mini-dialogue arc (annuncio → visita → contratto → affitto) so they ' +
        'are immediately contextualised. Personalise by asking the learner to describe their own home or ' +
        'their ideal apartment.',
    },

    // 6. Furniture and positions
    {
      slug: 'it-vocab-furniture',
      name: 'I mobili e le posizioni — furniture and spatial prepositions',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.intermediate,
      description:
        'The furniture and objects found in a home, paired with the prepositions and phrases used to ' +
        'locate them in space: sopra (above/on top of), sotto (below/under), accanto a (next to), ' +
        'davanti a (in front of), dietro (behind), in mezzo a (in the middle of), tra/fra (between).',
      prerequisiteSlugs: ['it-vocab-home', 'it-articulated-prepositions'],
      examples: [
        {
          target: 'Il quadro è sopra il divano.',
          native: 'The picture is above the sofa.',
        },
        {
          target: 'Le scarpe sono sotto il letto.',
          native: 'The shoes are under the bed.',
        },
        {
          target: 'Lo scaffale è accanto alla finestra, tra il divano e la lampada.',
          native: 'The bookshelf is next to the window, between the sofa and the lamp.',
          note: 'accanto a + articulated preposition; tra with two reference points',
        },
      ],
      commonMistakes: [
        'using sopra a instead of sopra (sopra alone or sopra + definite article — not sopra a)',
        'forgetting that accanto a and davanti a contract with the article (accanto al letto, davanti alla porta)',
        'placing tra/fra with only one object — they always require two reference points',
        'confusing dietro (behind) with dopo (after, temporal) — they share no meaning overlap in spatial context',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.speaking_prompt,
        TaskType.roleplay,
      ],
      compatibleThemes: ['family', 'culture', 'art'],
      teachingNotes:
        'Use a furnished-room illustration and have the learner describe where every object is. The ' +
        'accanto a / davanti a contraction pattern with articles is new here — contrast with sopra/sotto ' +
        'which do not take a. A quick dictation ("where did you put the keys?") makes the spatial ' +
        'prepositions memorable through real-life scenarios.',
    },
  ],

  // ─── Lesson templates ─────────────────────────────────────────────────────
  lessonTemplates: [
    // 1. Scenario roleplay — visit an apartment with a landlord
    {
      slug: 'cap12-visita-allappartamento',
      title: 'Visita all’appartamento',
      lessonType: LessonType.scenario_roleplay,
      level: CEFRLevel.intermediate,
      summary:
        'You’ve found a promising listing online and arranged a viewing. Interact with the landlord ' +
        'using the formal Lei imperative, ask about every room, find out what the apartment does and ' +
        'doesn’t have, and decide whether to take it.',
      objectiveSkillSlugs: ['it-imperativo-formal', 'it-vocab-home', 'it-negatives'],
      defaultDurationMinutes: 12,
      compatibleThemes: ['family', 'culture', 'travel'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Set the scene',
          prompt:
            'You’ve arranged a viewing of a two-bedroom apartment on the third floor of a building ' +
            'in a Pugliese town. The landlord (il proprietario) greets you at the door. You’ll need ' +
            'to use formal Lei throughout — Scusi, mi dica, si accomodi.',
          notes:
            'Mention one detail from the learner’s ideal home profile if available (e.g. they want ' +
            'a garden, a balcony, or a quiet neighbourhood) to personalise the apartment.',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'Greet formally and ask to see the apartment',
          prompt:
            'The landlord opens the door. Introduce yourself politely, explain why you’ve come, ' +
            'and ask to start the visit.',
          exampleAnswer:
            'Buongiorno, sono [nome]. Ho chiamato ieri per l’appartamento. Posso entrare? — ' +
            'Prego, si accomodi. Mi segua.',
          notes:
            'Coach the learner on si accomodi and mi segua as natural formal-imperative phrases for ' +
            'this situation.',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'Ask about what the apartment has and doesn’t have',
          prompt:
            'As you tour the rooms, ask whether the apartment has a balcony, a washing machine, and ' +
            'a lift. Use both affirmative and negative question forms.',
          exampleAnswer: 'C’è un balcone? / Non c’è l’ascensore? / L’appartamento ha la lavatrice?',
          notes:
            'Elicit at least one negative answer from the landlord (Non c’è il balcone, purtroppo) ' +
            'so the learner hears the target negation pattern in context.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Formal imperative — pronoun placement',
          prompt:
            'Complete with the correct formal imperative form:\n' +
            '(a) ___ pure il contratto. (prendere)\n' +
            '(b) ___ se ha domande. (dirmi)\n' +
            '(c) ___ — il soggiorno è qui a destra. (seguirmi)',
          exampleAnswer: 'Prenda pure il contratto. / Mi dica se ha domande. / Mi segua.',
          notes:
            'Emphasise that the pronoun precedes the verb in the formal imperative (Mi dica, Mi segua).',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Describe your ideal home using indefinite adjectives',
          prompt:
            'Tell the landlord what you are looking for: use qualche, ogni, tutto, and at least one ' +
            'quantifier (molto, poco, troppo).',
          exampleAnswer:
            'Cerco qualche stanza luminosa, con ogni comfort. Non voglio troppo rumore. ' +
            'Preferisco un appartamento dove tutta la luce entra dal balcone.',
          notes:
            'Personalise to the learner’s real living situation or dream home. Prompt for a ' +
            'quantifier if the learner forgets.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Would you take the apartment?',
          prompt:
            'Sum up the visit: what does the apartment have, what doesn’t it have, and what is your ' +
            'decision? Use at least one double negative (non … più / non … ancora / non … niente).',
          notes:
            'This open-ended recap combines negatives, home vocab, and the personal perspective — ' +
            'rich ground for the engine to generate follow-up questions.',
        },
      ],
    },

    // 2. Grammar — indefinite adjectives
    {
      slug: 'cap12-qualche-ogni-tutto',
      title: 'Qualche stanza, ogni piano, tutta la casa',
      lessonType: LessonType.grammar,
      level: CEFRLevel.intermediate,
      summary:
        'Master the five indefinite adjectives — qualche, alcuni/alcune, ogni, tutto + article, and ' +
        'the variable quantifiers — by describing what every room in an Italian home contains.',
      objectiveSkillSlugs: ['it-indefinite-adjectives'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['family', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'The singular trap with qualche',
          prompt:
            '"Qualche" always takes a singular noun even though the meaning is plural. ' +
            '"Ho visitato qualche appartamento" means "I visited a few apartments." ' +
            'Compare: "Ho visitato alcuni appartamenti" — same meaning, plural noun.',
          notes: 'This is the #1 error. Reinforce with a minimal pair before moving on.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'qualche vs alcuni/alcune',
          prompt:
            'Choose qualche or alcuni/alcune:\n' +
            '(a) Ho trovato ___ annunci interessanti online.\n' +
            '(b) C’è ___ problema con il riscaldamento.\n' +
            '(c) ___ camere sono più grandi delle altre.',
          exampleAnswer: 'alcuni annunci; qualche problema; Alcune camere',
          notes:
            'In (b), the singular noun after qualche is the clue. In (c), the plural verb after alcune confirms the choice.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'ogni (invariable) and tutto + article',
          prompt:
            'Complete:\n' +
            '(a) ___ appartamento ha un contatore del gas separato.\n' +
            '(b) ___ casa è stata ristrutturata lo scorso anno.\n' +
            '(c) ___ i mobili sono inclusi nell’affitto.',
          exampleAnswer: 'Ogni appartamento; Tutta la casa; Tutti i mobili',
          notes:
            'In (c), tutti (m. pl.) agrees with mobili. Contrast with (b) tutta la casa (f. sg.).',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Catch quantifier-agreement errors',
          prompt:
            'Fix the errors:\n' +
            '(a) Ho molto spese ogni mese.\n' +
            '(b) C’è poca luce in tutti le stanze.',
          exampleAnswer:
            '(a) Ho molte spese ogni mese. (molte agrees with spese, f. pl.)\n' +
            '(b) C’è poca luce in tutte le stanze. (tutte agrees with stanze, f. pl.)',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Describe your home using all five indefinite forms',
          prompt:
            'Describe your home (real or imaginary) using qualche, alcuni/alcune, ogni, tutto, ' +
            'and at least one of molto/poco/troppo.',
          notes:
            'Personalise to the learner’s actual living situation if known. Encourage at least ' +
            'five sentences to ensure variety across the five forms.',
        },
        {
          taskType: TaskType.recap,
          focus: 'The number rule chart',
          prompt:
            'Which indefinite adjective always takes a singular noun despite a plural meaning? ' +
            'Which is invariable? Which requires a definite article?',
          exampleAnswer: 'qualche (singular noun); ogni (invariable); tutto (requires article)',
        },
      ],
    },

    // 3. Grammar — Italian double negation
    {
      slug: 'cap12-non-niente-non-mai',
      title: 'Non ho ancora firmato — Italian negation',
      lessonType: LessonType.grammar,
      level: CEFRLevel.intermediate,
      summary:
        'Learn the full double-negative system: non + a second negative word after the verb is ' +
        'correct, not redundant. Covers niente/nulla, nessuno, mai, più, ancora, né … né, and the ' +
        'exception when the negative word leads the sentence.',
      objectiveSkillSlugs: ['it-negatives', 'it-indefinite-pronouns'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['family', 'culture', 'business'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Two negatives, one meaning',
          prompt:
            '"Non c’è niente di sbagliato" — both non and niente are required. ' +
            'In Italian, the second negative word reinforces, not cancels, the first. ' +
            'The only exception: when the negative word comes before the verb as a subject ' +
            '(Nessuno è venuto; Niente funziona) — then non is dropped.',
          notes:
            'Draw the contrast in one table: verb-final negation needs non; pre-verb subject negation drops non.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Translate English negatives into Italian double negatives',
          prompt:
            'Translate:\n' +
            '(a) I have never lived in a studio flat.\n' +
            '(b) We no longer need the garage.\n' +
            '(c) She hasn’t signed the lease yet.',
          exampleAnswer:
            '(a) Non ho mai vissuto in un monolocale.\n' +
            '(b) Non abbiamo più bisogno del garage.\n' +
            '(c) Non ha ancora firmato il contratto d’affitto.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Choose the right negative word',
          prompt:
            'Complete with the correct negative (niente, nessuno, mai, più, ancora, né … né):\n' +
            '(a) Non c’è ___ di bello in quell’appartamento.\n' +
            '(b) Non abito ___ in quella città.\n' +
            '(c) Non ho visto ___ all’agenzia oggi.\n' +
            '(d) L’affitto non include ___ il riscaldamento ___ l’acqua calda.',
          exampleAnswer: 'niente; più; nessuno; né … né',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Drop non only when the negative is the subject',
          prompt:
            'Decide if each sentence is correct or needs fixing:\n' +
            '(a) Nessuno non ha risposto all’annuncio.\n' +
            '(b) Non ha telefonato mai il proprietario.',
          exampleAnswer:
            '(a) Wrong — subject negation: Nessuno ha risposto all’annuncio (drop non).\n' +
            '(b) Correct in meaning; more natural word order: Il proprietario non ha mai telefonato.',
          notes:
            'In (b), the sentence is not wrong grammatically but the more natural position of mai is between auxiliary and participle.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Say what your ideal home does NOT have',
          prompt:
            'List three things your ideal apartment does not have, using three different negative ' +
            'words (e.g. non … mai, non … niente, non … né … né).',
          notes:
            'Personalise from the learner’s profile. This is also a natural peg for humour — many ' +
            'learners will want to say "no shared walls with noisy neighbours".',
        },
        {
          taskType: TaskType.recap,
          focus: 'The double-negative rule in one sentence',
          prompt: 'When does Italian drop non in a negative sentence? Give an example.',
          exampleAnswer:
            'Non is dropped when the negative word (nessuno, niente) comes before the verb as the ' +
            'grammatical subject. Example: Nessuno ha chiamato.',
        },
      ],
    },

    // 4. Grammar — formal imperative
    {
      slug: 'cap12-scusi-mi-dica',
      title: 'Scusi, mi dica — the formal imperative with a landlord',
      lessonType: LessonType.grammar,
      level: CEFRLevel.upper_intermediate,
      summary:
        'Form the Lei imperative from the present subjunctive stem, place pronouns before the verb, ' +
        'and use the high-frequency formal phrases every apartment-hunter needs.',
      objectiveSkillSlugs: ['it-imperativo-formal'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['family', 'business', 'travel'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Subjunctive stem → formal imperative',
          prompt:
            '-are verbs: drop -are, add -i (parlare → Parli!; aspettare → Aspetti!).\n' +
            '-ere / -ire verbs: drop the infinitive ending, add -a (prendere → Prenda!; venire → Venga!).\n' +
            'Key irregulars: sia, abbia, vada, dica, faccia, venga.\n' +
            'Pronouns always precede: Mi dica, Si accomodi — never *dica-mi*.',
          notes:
            'The pronoun-placement rule is the key contrast with the informal imperative. ' +
            'Anchor it with the phrase "Mi dica" vs informal "dimmi" as a memorable pair.',
        },
        {
          taskType: TaskType.conjugation,
          focus: 'Form the formal imperative',
          prompt:
            'Give the Lei imperative for:\n' + 'aspettare, leggere, sentire, dire, andare, stare',
          exampleAnswer: 'Aspetti, Legga, Senta, Dica, Vada, Stia',
          notes: 'Stia and Vada are fully irregular — flag them explicitly.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Insert the pronoun before the formal imperative',
          prompt:
            'Rewrite using the formal imperative with the pronoun in the correct position:\n' +
            '(a) (dire a me) ___ come funziona il riscaldamento.\n' +
            '(b) (accomodarsi) Prego, ___ in salotto.\n' +
            '(c) (portare a lei) ___ il contratto domani.',
          exampleAnswer:
            '(a) Mi dica come funziona il riscaldamento.\n' +
            '(b) Prego, si accomodi in salotto.\n' +
            '(c) Le porti il contratto domani.',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Catch pronoun-placement and form errors',
          prompt:
            'Fix the errors:\n' +
            '(a) Dica-mi il prezzo dell’affitto.\n' +
            '(b) Signora, parla più lentamente, per favore.',
          exampleAnswer:
            '(a) Mi dica il prezzo dell’affitto. (pronoun precedes the verb in formal Lei)\n' +
            '(b) Signora, parli più lentamente, per favore. (formal Lei: parli, not parla)',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'Give formal instructions as a landlord',
          prompt:
            'You are the landlord showing your apartment. Give five formal-imperative instructions ' +
            'to the prospective tenant: invite them in, ask them to follow you, tell them to look at ' +
            'the view, ask them to sign the document, and tell them not to worry.',
          exampleAnswer:
            'Si accomodi. / Mi segua. / Guardi che vista! / Firmi qui, per favore. / Non si preoccupi.',
          notes:
            'This task reverses perspective — making the learner give formal commands rather than ' +
            'receive them. Personalise the apartment details based on learner interests.',
        },
      ],
    },

    // 5. Vocabulary review — furnish and locate objects
    {
      slug: 'cap12-arredare-casa',
      title: 'Arredare casa — furniture and where things go',
      lessonType: LessonType.vocabulary_review,
      level: CEFRLevel.intermediate,
      summary:
        'Furnish a room from scratch, place every object in space using sopra, sotto, accanto a, ' +
        'davanti a, dietro, and tra, and practise the vocabulary for appliances and home items.',
      objectiveSkillSlugs: ['it-vocab-furniture', 'it-vocab-home'],
      defaultDurationMinutes: 9,
      compatibleThemes: ['family', 'culture', 'art'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'An empty apartment to furnish',
          prompt:
            'Imagine you’ve just rented a bare apartment. You need to furnish it room by room. ' +
            'Let’s start with the vocabulary, then place each object in its ideal spot.',
          notes:
            'If the learner has mentioned their real home or dream décor style, reference it here ' +
            'to make the exercise feel personal.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Name the furniture',
          prompt:
            'Which item belongs in the camera da letto?\n' +
            'A) il frigorifero  B) il letto  C) il divano  D) la lavatrice',
          exampleAnswer: 'B) il letto',
          notes:
            'Follow up: ask where the other three items do belong (cucina, soggiorno, bagno/cucina).',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Spatial prepositions',
          prompt:
            'Describe the room using the correct preposition:\n' +
            '(a) La lampada è ___ il divano. (next to)\n' +
            '(b) Il quadro è ___ il letto. (above)\n' +
            '(c) Il tappeto è ___ il tavolo e le sedie. (between)\n' +
            '(d) Le scarpe sono ___ il letto. (under)',
          exampleAnswer:
            'accanto al divano; sopra il letto; tra il tavolo e le sedie; sotto il letto',
          notes:
            'Remind the learner that accanto a contracts with the article (accanto al, accanto alla) ' +
            'but sopra and sotto do not require a.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Describe your living room (real or ideal)',
          prompt:
            'Describe your living room using at least six furniture items and four position expressions. ' +
            'Where is every important object in relation to the others?',
          notes:
            'Encourage creative elaboration — colours, materials, whether objects are new or old. ' +
            'Accept imperfect preposition use and gently correct in feedback.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Prepositions that contract vs those that don’t',
          prompt:
            'Which spatial prepositions require a contraction with the definite article, and which don’t?',
          exampleAnswer:
            'accanto a, davanti a, and in mezzo a contract (accanto al letto, davanti alla porta). ' +
            'sopra, sotto, dietro, and tra/fra do not typically take a (sopra il tavolo, tra i mobili).',
        },
      ],
    },
  ],

  // ─── Thematic vocabulary bank ─────────────────────────────────────────────
  vocabulary: [
    // La casa
    {
      slug: 'cap12-la-casa',
      targetText: 'la casa',
      nativeText: 'the house / home',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-casa',
      exampleSentence: 'Cerco una casa in affitto vicino al centro.',
      exampleTranslation: 'I am looking for a house to rent near the centre.',
    },
    {
      slug: 'cap12-lappartamento',
      targetText: 'l’appartamento',
      nativeText: 'the apartment / flat',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-casa',
      exampleSentence: 'L’appartamento è al secondo piano.',
      exampleTranslation: 'The apartment is on the second floor.',
    },
    {
      slug: 'cap12-il-monolocale',
      targetText: 'il monolocale',
      nativeText: 'the studio flat',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-casa',
    },
    {
      slug: 'cap12-la-stanza',
      targetText: 'la stanza',
      nativeText: 'the room',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-casa',
    },
    {
      slug: 'cap12-la-camera-da-letto',
      targetText: 'la camera da letto',
      nativeText: 'the bedroom',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-casa',
      exampleSentence: 'L’appartamento ha due camere da letto.',
      exampleTranslation: 'The apartment has two bedrooms.',
    },
    {
      slug: 'cap12-il-bagno',
      targetText: 'il bagno',
      nativeText: 'the bathroom',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-casa',
    },
    {
      slug: 'cap12-la-cucina',
      targetText: 'la cucina',
      nativeText: 'the kitchen',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-casa',
      exampleSentence: 'La cucina è piccola ma ben attrezzata.',
      exampleTranslation: 'The kitchen is small but well-equipped.',
    },
    {
      slug: 'cap12-il-soggiorno',
      targetText: 'il soggiorno',
      nativeText: 'the living room',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-casa',
    },
    {
      slug: 'cap12-il-balcone',
      targetText: 'il balcone',
      nativeText: 'the balcony',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-casa',
      exampleSentence: 'Dal balcone si vede tutta la città.',
      exampleTranslation: 'From the balcony you can see the whole city.',
    },
    {
      slug: 'cap12-il-giardino',
      targetText: 'il giardino',
      nativeText: 'the garden',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-casa',
    },
    {
      slug: 'cap12-laffitto',
      targetText: 'l’affitto',
      nativeText: 'the rent',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-casa',
      exampleSentence: 'L’affitto mensile è di novecento euro, spese escluse.',
      exampleTranslation: 'The monthly rent is nine hundred euros, utilities not included.',
    },
    {
      slug: 'cap12-affittare',
      targetText: 'affittare',
      nativeText: 'to rent (out)',
      partOfSpeech: 'verb',
      theme: 'la-casa',
      exampleSentence: 'Il proprietario vuole affittare l’appartamento a partire da luglio.',
      exampleTranslation: 'The landlord wants to rent out the apartment starting from July.',
    },
    {
      slug: 'cap12-il-proprietario',
      targetText: 'il proprietario / la proprietaria',
      nativeText: 'the landlord / the landlady',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-casa',
    },
    {
      slug: 'cap12-linquilino',
      targetText: 'l’inquilino / l’inquilina',
      nativeText: 'the tenant',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-casa',
    },
    {
      slug: 'cap12-il-piano',
      targetText: 'il piano',
      nativeText: 'the floor / storey',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-casa',
      exampleSentence: 'L’ufficio è al quinto piano senza ascensore.',
      exampleTranslation: 'The office is on the fifth floor with no lift.',
    },
    {
      slug: 'cap12-lascensore',
      targetText: 'l’ascensore',
      nativeText: 'the lift / elevator',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-casa',
    },
    // I mobili
    {
      slug: 'cap12-i-mobili',
      targetText: 'i mobili',
      nativeText: 'the furniture',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-mobili',
    },
    {
      slug: 'cap12-il-letto',
      targetText: 'il letto',
      nativeText: 'the bed',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-mobili',
      exampleSentence: 'Il letto matrimoniale occupa metà della stanza.',
      exampleTranslation: 'The double bed takes up half of the room.',
    },
    {
      slug: 'cap12-il-divano',
      targetText: 'il divano',
      nativeText: 'the sofa / couch',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-mobili',
    },
    {
      slug: 'cap12-il-tavolo',
      targetText: 'il tavolo',
      nativeText: 'the table',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-mobili',
    },
    {
      slug: 'cap12-la-sedia',
      targetText: 'la sedia',
      nativeText: 'the chair',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-mobili',
    },
    {
      slug: 'cap12-larmadio',
      targetText: 'l’armadio',
      nativeText: 'the wardrobe / closet',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-mobili',
      exampleSentence: 'L’armadio è troppo grande per questa stanza.',
      exampleTranslation: 'The wardrobe is too big for this room.',
    },
    {
      slug: 'cap12-la-lampada',
      targetText: 'la lampada',
      nativeText: 'the lamp',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-mobili',
    },
    {
      slug: 'cap12-lo-scaffale',
      targetText: 'lo scaffale',
      nativeText: 'the shelf / bookcase',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-mobili',
      exampleSentence: 'Ho messo tutti i libri sullo scaffale accanto alla finestra.',
      exampleTranslation: 'I put all the books on the shelf next to the window.',
    },
    {
      slug: 'cap12-il-frigorifero',
      targetText: 'il frigorifero',
      nativeText: 'the refrigerator / fridge',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-mobili',
    },
    {
      slug: 'cap12-la-lavatrice',
      targetText: 'la lavatrice',
      nativeText: 'the washing machine',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-mobili',
      exampleSentence: 'L’appartamento ha la lavatrice in bagno.',
      exampleTranslation: 'The apartment has the washing machine in the bathroom.',
    },
    {
      slug: 'cap12-il-quadro',
      targetText: 'il quadro',
      nativeText: 'the picture / painting (on a wall)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-mobili',
    },
    // Posizioni
    {
      slug: 'cap12-sopra',
      targetText: 'sopra',
      nativeText: 'above / on top of',
      partOfSpeech: 'prep',
      theme: 'posizioni',
      exampleSentence: 'Il quadro è sopra il divano.',
      exampleTranslation: 'The picture is above the sofa.',
    },
    {
      slug: 'cap12-sotto',
      targetText: 'sotto',
      nativeText: 'below / under',
      partOfSpeech: 'prep',
      theme: 'posizioni',
    },
    {
      slug: 'cap12-accanto-a',
      targetText: 'accanto a',
      nativeText: 'next to / beside',
      partOfSpeech: 'prep',
      theme: 'posizioni',
      exampleSentence: 'La lampada è accanto al letto.',
      exampleTranslation: 'The lamp is next to the bed.',
    },
    {
      slug: 'cap12-davanti-a',
      targetText: 'davanti a',
      nativeText: 'in front of',
      partOfSpeech: 'prep',
      theme: 'posizioni',
    },
    {
      slug: 'cap12-dietro',
      targetText: 'dietro',
      nativeText: 'behind',
      partOfSpeech: 'prep',
      theme: 'posizioni',
    },
    {
      slug: 'cap12-in-mezzo-a',
      targetText: 'in mezzo a',
      nativeText: 'in the middle of',
      partOfSpeech: 'prep',
      theme: 'posizioni',
      exampleSentence: 'Il tavolo è in mezzo alla cucina.',
      exampleTranslation: 'The table is in the middle of the kitchen.',
    },
    {
      slug: 'cap12-tra-fra',
      targetText: 'tra / fra',
      nativeText: 'between / among',
      partOfSpeech: 'prep',
      theme: 'posizioni',
      exampleSentence: 'Il divano è tra la finestra e la libreria.',
      exampleTranslation: 'The sofa is between the window and the bookcase.',
    },
  ],
};

export default unit;
