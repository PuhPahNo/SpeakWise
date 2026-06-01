// Capitolo 2 — Come siamo
// Theme: family / culture. Describing people — their looks, personality,
// nationality, and the colors that surround them — using adjective agreement,
// the verb essere, definite articles, and the showpiece adjective bello.
// Regional focus: La Sicilia.
//
// All content original (copyright-safe).

import { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client';
import type { SeedUnit } from '../types';

const unit: SeedUnit = {
  code: 'cap-02',
  order: 2,
  title: 'Come siamo',
  subtitle: 'Adjectives, essere, and what people are like',
  theme: 'family',
  level: CEFRLevel.complete_beginner,
  summary:
    'Learn to describe the people around you — their height, build, personality, and nationality — ' +
    'using Italian adjectives that flex their endings to match the noun. ' +
    'Master the verb essere, the definite articles, and the beautiful irregularity of bello, ' +
    'while exploring Sicily as the chapter’s cultural canvas.',
  canDo: [
    'Describe a person’s physical appearance and personality in Italian',
    'Make adjectives agree with masculine, feminine, singular, and plural nouns',
    'Conjugate essere and use it to express identity, origin, nationality, and description',
    'Choose the correct definite article (il, lo, l’, la, i, gli, le) before any noun',
    'Use bello before a noun with the correct article-like form',
    'Name at least twelve colors and flag which ones are invariable',
    'State and recognize nationalities in Italian, remembering they are lowercase',
  ],
  culturalNotes: [
    {
      title: 'Grammatical gender has nothing to do with nature',
      body:
        'English speakers sometimes expect Italian noun genders to reflect the "real" sex of ' +
        'a thing — but the connection is largely arbitrary. A car (la macchina) is feminine; ' +
        'a bridge (il ponte) is masculine; a hand (la mano) is feminine despite ending in -o. ' +
        'The language is not making a philosophical statement — gender is simply a grammatical ' +
        'category you store alongside the word itself, and the adjectives that modify the word ' +
        'follow it blindly.',
    },
    {
      title: 'Sicily: three continents in one island',
      body:
        'Sicily (la Sicilia) sits at the center of the Mediterranean and has been shaped by Greeks, ' +
        'Romans, Arabs, Normans, and Spaniards over three millennia. That layering is visible in ' +
        'the architecture of Palermo, where a Norman cathedral stands metres from a mosque-turned-church, ' +
        'and in the language, where dozens of Arabic-origin words survive in everyday Sicilian dialect. ' +
        'Describing Sicily calls for a full palette: the golden wheat fields of the interior, the deep ' +
        'blue sea, the black lava slopes of Etna, the white baroque towns of the Val di Noto.',
    },
    {
      title: 'Describing people warmly — the art of the complimento',
      body:
        'Italians compliment freely and specifically. Rather than a generic "nice," you will hear ' +
        '"simpaticissimo" (very likeable), "un tipo in gamba" (a capable, switched-on person), or ' +
        '"una persona di cuore" (a big-hearted person). Physical compliments tend to focus on the eyes ' +
        '(che begli occhi!) and the smile. Learning a few vivid descriptors early signals warmth ' +
        'and cultural fluency beyond what the grammar alone would suggest.',
    },
  ],

  // ─── Skills ───────────────────────────────────────────────────────────────
  skills: [
    // 1 — essere (taught early: unlocks all description sentences below)
    {
      slug: 'it-essere-present',
      name: 'Present tense of essere (to be)',
      category: SkillCategory.grammar,
      level: CEFRLevel.complete_beginner,
      description:
        'The present-tense forms of essere (to be): sono, sei, è, siamo, siete, sono. ' +
        'Essere expresses identity (È uno studente.), origin (Sono di Palermo.), ' +
        'nationality (Siamo italiani.), and description (Giulia è alta e simpatica.).',
      prerequisiteSlugs: ['it-subject-pronouns'],
      examples: [
        { target: 'Sono americano.', native: 'I am American.', note: 'origin / nationality' },
        {
          target: 'Lei è molto intelligente.',
          native: 'She is very intelligent.',
          note: 'description',
        },
        { target: 'Siamo di Catania.', native: 'We are from Catania.', note: 'city of origin' },
        { target: 'È una persona gentile.', native: 'He / She is a kind person.' },
      ],
      commonMistakes: [
        'confusing sono (I am / they are) — the same form does double duty for 1st and 3rd plural',
        'using avere instead of essere for descriptions (she is tall = è alta, not "ha alta")',
        'forgetting the accent on è (third-person singular) to distinguish it from e (and)',
        'stating the subject pronoun in every sentence — drop io/lui/lei when context is clear',
      ],
      recommendedPracticeTypes: [
        TaskType.conjugation,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['family', 'travel', 'sports', 'culture'],
      teachingNotes:
        'Build the paradigm first, then immediately put it to work with real descriptions of ' +
        'people the learner cares about (a family member, a favorite athlete, a famous actor). ' +
        'The sono ambiguity (I am / they are) resolves from context — flag it early so it does not ' +
        'cause panic. Contrast è/e (written accent = meaning difference) just as dà/da was flagged in cap-00.',
    },

    // 2 — noun gender recap → prerequisite for definite articles
    {
      slug: 'it-definite-articles',
      name: 'Definite articles (il, lo, l’, la, i, gli, le)',
      category: SkillCategory.grammar,
      level: CEFRLevel.complete_beginner,
      description:
        'The word for "the" changes depending on the gender, number, and first sound of the noun that follows. ' +
        'Singular masculine: il (most nouns), lo (before s+consonant, z, gn, ps, x, y), l’ (before a vowel). ' +
        'Singular feminine: la, l’ (before a vowel). ' +
        'Plural masculine: i (most), gli (before s+consonant, z, gn, ps, x, y, or a vowel). ' +
        'Plural feminine: le.',
      prerequisiteSlugs: ['it-noun-gender'],
      examples: [
        {
          target: 'il ragazzo → i ragazzi',
          native: 'the boy → the boys',
          note: 'il / i for regular masculine',
        },
        {
          target: 'lo studente → gli studenti',
          native: 'the student → the students',
          note: 'lo / gli before s+consonant',
        },
        {
          target: 'l’amica → le amiche',
          native: 'the (female) friend → the (female) friends',
          note: 'l’ before vowel, le in plural',
        },
        {
          target: 'la ragazza → le ragazze',
          native: 'the girl → the girls',
          note: 'la / le for regular feminine',
        },
      ],
      commonMistakes: [
        'using il before s+consonant (il studente → should be lo studente)',
        'using i before s+consonant or a vowel in the plural (i studenti → should be gli studenti)',
        'forgetting l’ before masculine and feminine vowel-initial nouns alike',
        'keeping la before a feminine vowel instead of eliding to l’',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.error_correction,
      ],
      compatibleThemes: ['family', 'travel', 'food', 'culture'],
      teachingNotes:
        'The two-step decision is: (1) gender + number, then (2) the sound test for lo/gli vs il/i. ' +
        'A useful mnemonic: "lo/gli follow the uno/uno rule" — same trigger list as the indefinite article. ' +
        'Pair each new vocabulary noun with its definite article from the start so the pattern becomes automatic.',
    },

    // 3 — adjective agreement (core of the chapter)
    {
      slug: 'it-adjectives-agreement',
      name: 'Adjective agreement in gender and number',
      category: SkillCategory.grammar,
      level: CEFRLevel.complete_beginner,
      description:
        'Italian adjectives agree with the noun they describe. ' +
        'Four-ending adjectives (-o/-a/-i/-e): alto becomes alta, alti, alte. ' +
        'Two-ending adjectives (-e/-i): intelligente becomes intelligenti for both genders in the plural. ' +
        'Adjectives usually follow the noun. Mixed-gender groups take the masculine plural. ' +
        'Molto is invariable as an adverb (molto bello) but agrees as an adjective (molti amici).',
      prerequisiteSlugs: ['it-noun-gender', 'it-noun-plurals'],
      examples: [
        {
          target: 'un ragazzo alto / una ragazza alta',
          native: 'a tall boy / a tall girl',
          note: 'four-ending adjective, singular',
        },
        {
          target: 'ragazzi alti / ragazze alte',
          native: 'tall boys / tall girls',
          note: 'four-ending, plural',
        },
        {
          target: 'uno studente intelligente / una studentessa intelligente',
          native: 'an intelligent (male) student / an intelligent (female) student',
          note: 'two-ending adjective: same form for both genders',
        },
        {
          target: 'Marco e Giulia sono simpatici.',
          native: 'Marco and Giulia are likeable.',
          note: 'mixed group → masculine plural',
        },
        {
          target: 'È molto simpatica. / Ha molti amici.',
          native: 'She is very likeable. / She has many friends.',
          note: 'molto invariable as adverb; agrees as adjective',
        },
      ],
      commonMistakes: [
        'making a two-ending adjective agree like a four-ending one (intelligenta is wrong)',
        'placing the adjective before the noun by default, calquing English word order',
        'using the masculine plural for a group of women (a group of women = sono simpatiche)',
        'making molto agree when it is an adverb (very = sempre invariable)',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.error_correction,
        TaskType.translation,
      ],
      compatibleThemes: ['family', 'sports', 'film', 'culture'],
      teachingNotes:
        'Lead with a four-ending adjective (alto) and build the 2×2 grid. Then introduce a ' +
        'two-ending adjective (intelligente) to show the simpler pattern. Drill the mixed-gender ' +
        'masculine-plural rule using groups of people the learner knows. Reserve bello for its own ' +
        'skill. The molto adverb/adjective split is a reliable exam and conversation point.',
    },

    // 4 — bello (depends on definite articles + adjective agreement)
    {
      slug: 'it-bello-adjective',
      name: 'Bello before a noun — the article-like forms',
      category: SkillCategory.grammar,
      level: CEFRLevel.complete_beginner,
      description:
        'When bello (beautiful, lovely) is placed directly before a noun, it takes forms that mirror the ' +
        'definite article, not the standard adjective endings: ' +
        'bel (il), bello (lo), bell’ (l’), bella (la), bei (i), begli (gli), belle (le). ' +
        'After a verb or following the noun, it uses regular forms: bello, bella, belli, belle.',
      prerequisiteSlugs: ['it-definite-articles', 'it-adjectives-agreement'],
      examples: [
        {
          target: 'un bel ragazzo / un bello spettacolo',
          native: 'a handsome boy / a beautiful show',
          note: 'bel before regular m.; bello before s+consonant',
        },
        {
          target: 'una bell’attrice / una bella città',
          native: 'a beautiful actress / a beautiful city',
          note: 'bell’ before f. vowel; bella before f. consonant',
        },
        {
          target: 'dei bei quadri / dei begli occhi',
          native: 'some beautiful paintings / beautiful eyes',
          note: 'bei = plural of bel; begli before vowel or s+cons.',
        },
        {
          target: 'Questo film è bello.',
          native: 'This film is beautiful / great.',
          note: 'after essere: regular form, no article-like rule',
        },
      ],
      commonMistakes: [
        'using bello before a regular masculine noun (bello ragazzo → should be bel ragazzo)',
        'forgetting that the article-like rule only applies before the noun, not predicatively',
        'mixing up bei (plural) and bel (singular)',
        'not eliding bell’ before a vowel-initial noun',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.error_correction,
      ],
      compatibleThemes: ['family', 'art', 'travel', 'film'],
      teachingNotes:
        'Teach by analogy: "bello before a noun = copy the definite article, just replace il with bel, ' +
        'lo with bello, etc." Learners find this elegant once they see the one-to-one mapping. ' +
        'Drill with culturally vivid phrases: begli occhi, bella musica, bel paesaggio. ' +
        'Always contrast the pre-noun form with the predicative form to anchor both.',
    },

    // 5 — spelling-change plurals
    {
      slug: 'it-noun-plurals-special',
      name: 'Spelling-change plurals (-co/-go, -ca/-ga, -io, -cia/-gia)',
      category: SkillCategory.grammar,
      level: CEFRLevel.complete_beginner,
      description:
        'Several noun endings change spelling in the plural to preserve the original sound or follow a pattern. ' +
        '-co/-go → -chi/-ghi when stress falls on the syllable before last (fuoco→fuochi, lago→laghi), ' +
        'but → -ci/-gi for some learned/foreign-origin words (amico→amici, medico→medici). ' +
        '-ca/-ga always → -che/-ghe (banca→banche, bottega→botteghe). ' +
        '-io with one i → -i (negozio→negozi). ' +
        '-cia/-gia → -ce/-ge after a consonant (arancia→arance), -cie/-gie after a vowel (valigia→valige is also acceptable, but camicia→camicie).',
      prerequisiteSlugs: ['it-noun-plurals'],
      examples: [
        {
          target: 'il lago → i laghi',
          native: 'the lake → the lakes',
          note: '-go → -ghi (regular stress)',
        },
        {
          target: 'l’amico → gli amici',
          native: 'the friend → the friends',
          note: '-co → -ci (learned word, irregular stress)',
        },
        {
          target: 'la banca → le banche',
          native: 'the bank → the banks',
          note: '-ca → -che always',
        },
        {
          target: 'il negozio → i negozi',
          native: 'the shop → the shops',
          note: '-io → -i (one i)',
        },
        {
          target: 'l’arancia → le arance',
          native: 'the orange → the oranges',
          note: '-cia after consonant → -ce',
        },
      ],
      commonMistakes: [
        'pluralizing amico as "amicos" or "amichi" — it is amici',
        'adding an extra i to -io nouns (negozii is wrong, negozi is correct)',
        'writing banche as "bancas" or "banca" in plural',
        'confusing the -ci/-gi versus -chi/-ghi split — stress and word origin are the guides',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.error_correction,
      ],
      compatibleThemes: ['family', 'food', 'travel', 'culture'],
      teachingNotes:
        'Present -ca/-ga→-che/-ghe as the most predictable rule (always), then flag the -co/-go split ' +
        'as a learn-the-exception issue. The amico→amici / medico→medici subclass is a short list of ' +
        'common words worth memorizing explicitly. Do not overwhelm — give learners the core rules and ' +
        'flag the exceptions without requiring exhaustive coverage at this stage.',
    },

    // 6 — vocabulary: physical & personality adjectives
    {
      slug: 'it-vocab-descriptions',
      name: 'Describing people: physical and personality adjectives',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.complete_beginner,
      description:
        'The core adjectives for describing how someone looks and what they are like: ' +
        'alto, basso, magro, grasso, giovane, vecchio, bello, brutto, simpatico, antipatico, ' +
        'intelligente, gentile, allegro, timido, bravo.',
      prerequisiteSlugs: ['it-adjectives-agreement'],
      examples: [
        {
          target: 'Mio fratello è alto e simpatico.',
          native: 'My brother is tall and likeable.',
        },
        {
          target: 'La mia professoressa è giovane, intelligente e molto gentile.',
          native: 'My (female) teacher is young, intelligent, and very kind.',
        },
        {
          target: 'È una persona allegra, non è per niente timida.',
          native: 'She is a cheerful person, not at all shy.',
          note: 'per niente = not at all (reinforces a negative)',
        },
      ],
      commonMistakes: [
        'confusing simpatico (likeable, warm) with the English false friend "sympathetic"',
        'using bravo as the only compliment — it primarily means skilled/good at something',
        'forgetting that giovane and intelligente are two-ending (-e/-i), not four-ending',
      ],
      recommendedPracticeTypes: [
        TaskType.speaking_prompt,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.roleplay,
      ],
      compatibleThemes: ['family', 'sports', 'film', 'culture'],
      teachingNotes:
        'Have learners describe a real person they care about — a family member, a favorite athlete, ' +
        'a musician. This makes the vocabulary immediately personal and memorable. ' +
        'Flag simpatico as a false friend (not "sympathetic"), and flag bravo as "good at X" rather than ' +
        'a generic nice-person compliment.',
    },

    // 7 — vocabulary: nationalities
    {
      slug: 'it-vocab-nationalities',
      name: 'Nationalities (nazionalità)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.complete_beginner,
      description:
        'Nationalities in Italian are lowercase adjectives that agree in gender and number: ' +
        'italiano/italiana/italiani/italiane. ' +
        'Nationalities ending in -e (francese, inglese, cinese, giapponese) are two-ending: ' +
        'the plural of both genders is -i (francesi, inglesi).',
      prerequisiteSlugs: ['it-adjectives-agreement', 'it-essere-present'],
      examples: [
        {
          target: 'Sono americano. / Mia madre è americana.',
          native: 'I am American. / My mother is American.',
          note: 'four-ending: -o masc., -a fem.',
        },
        {
          target: 'Marco è francese; anche Sofia è francese.',
          native: 'Marco is French; Sofia is also French.',
          note: 'two-ending: same form m. and f. singular',
        },
        {
          target: 'I miei amici sono spagnoli.',
          native: 'My friends are Spanish.',
          note: 'plural agreement',
        },
      ],
      commonMistakes: [
        'capitalizing nationalities (italiano, not "Italiano")',
        'treating francese/inglese as four-ending (there is no "inglesa" — it is inglese for both)',
        'forgetting agreement: a group of women who are Italian = italiane, not italiani',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['family', 'travel', 'culture', 'sports'],
      teachingNotes:
        'Lead with the learner’s own nationality and those of people they know. ' +
        'Make the lowercase rule memorable by contrasting with English ("I am American" vs "sono americano"). ' +
        'Cluster the -e nationalities together so learners see the two-ending pattern as a group.',
    },

    // 8 — vocabulary: colors
    {
      slug: 'it-vocab-colors',
      name: 'Colors (colori)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.complete_beginner,
      description:
        'The core color adjectives and their agreement patterns. ' +
        'Most colors are standard adjectives and agree: rosso/rossa/rossi/rosse, verde/verdi. ' +
        'Several are invariable (they never change form): blu, rosa, viola, arancione (or arancio in some uses).',
      prerequisiteSlugs: ['it-adjectives-agreement'],
      examples: [
        {
          target: 'una macchina rossa / due macchine rosse',
          native: 'a red car / two red cars',
          note: 'rosso is a standard four-ending adjective',
        },
        {
          target: 'una camicia blu / due camicie blu',
          native: 'a blue shirt / two blue shirts',
          note: 'blu is invariable — no agreement',
        },
        {
          target: 'gli occhi verdi / i capelli neri',
          native: 'green eyes / black hair',
          note: 'body-feature descriptions',
        },
        {
          target: 'Il cielo è azzurro.',
          native: 'The sky is blue (light/azure).',
          note: 'azzurro for sky-blue; blu for navy/deep blue',
        },
      ],
      commonMistakes: [
        'making blu agree (bla, blui — all wrong; it is always blu)',
        'confusing azzurro (sky / light blue) and blu (navy / deep blue)',
        'treating rosa and viola as agreeing adjectives (they are invariable)',
        'applying four-ending rules to verde, which is a two-ending adjective',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['family', 'art', 'sports', 'travel'],
      teachingNotes:
        'Open with a vivid Sicilian scene — the black lava of Etna, the blue sea, the white baroque churches — ' +
        'to give colors an immediate cultural anchor. Invariable colors (blu, rosa, viola, arancione) ' +
        'are the reliable error source; drill them with before-and-after sentences that test whether learners ' +
        'try to add an ending. Connect colors to the learner’s real world (team colors, favorite clothing).',
    },

    // 9 — listening (legacy)
    {
      slug: 'it-listening-everyday',
      name: 'Understanding everyday descriptions',
      category: SkillCategory.listening,
      level: CEFRLevel.complete_beginner,
      description:
        'Develop your ear for short, slow exchanges in which people describe themselves or others — ' +
        'their appearance, personality, origin, and nationality — and respond appropriately.',
      prerequisiteSlugs: ['it-essere-present', 'it-vocab-descriptions'],
      examples: [],
      commonMistakes: [
        'focusing on individual unknown words instead of extracting the overall meaning',
        'missing gender agreement signals (the -a/-o ending of an adjective signals the noun’s gender)',
        'confusing è (is) and e (and) in speech, where the accent is not heard',
      ],
      recommendedPracticeTypes: [
        TaskType.listening_comprehension,
        TaskType.multiple_choice,
        TaskType.fill_blank,
      ],
      compatibleThemes: ['family', 'travel', 'culture', 'sports'],
      teachingNotes:
        'Use short (15–30 second) audio clips of two people describing a mutual friend or family member. ' +
        'First listen for gist (positive or negative description?), then detail (what features are mentioned?). ' +
        'Choose clips that feature natural connected speech so learners hear agreement endings in real rhythm. ' +
        'Personalize by selecting topics aligned with the learner’s interests.',
    },
  ],

  // ─── Lesson templates ─────────────────────────────────────────────────────
  lessonTemplates: [
    {
      slug: 'cap02-essere-portraits',
      title: 'Portrait in words — meet essere',
      lessonType: LessonType.grammar,
      level: CEFRLevel.complete_beginner,
      summary:
        'Build the full essere paradigm and put it straight to work: describe three people ' +
        '(yourself, a friend, a celebrity) using identity, nationality, and adjectives.',
      objectiveSkillSlugs: ['it-essere-present', 'it-adjectives-agreement'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['family', 'culture', 'sports', 'film'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'The essere paradigm',
          prompt:
            'Essere (to be) is irregular. Here are all six forms: sono, sei, è, siamo, siete, sono. ' +
            'Note that sono covers both "I am" and "they are" — context tells you which.',
          notes: 'Display as a small table. Flag the sono ambiguity clearly.',
        },
        {
          taskType: TaskType.conjugation,
          focus: 'Produce the full paradigm',
          prompt: 'Conjugate essere for io, tu, lui, noi, voi, loro.',
          exampleAnswer: 'sono, sei, è, siamo, siete, sono',
          notes: 'Reinforce that the final sono is 3rd plural, not repeated 1st singular.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Describe yourself',
          prompt: 'Translate: "I am American. I am tall and intelligent."',
          exampleAnswer: 'Sono americano/a. Sono alto/a e intelligente.',
          notes: 'Use the learner’s real nationality from their profile. Prompt both m./f. forms.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Adjective agreement with essere',
          prompt: 'Complete: "Marco è molt___ simpatico___. Giulia e Sofia sono allegr___."',
          exampleAnswer: 'molto simpatico (adv, no change); allegre',
          notes: 'Targets the molto-adverb rule and the feminine plural ending.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Describe someone you admire',
          prompt:
            'In two or three sentences, describe a person you admire using essere and two adjectives.',
          notes:
            'Personalize to the learner’s interests — an athlete, a musician, a family member. ' +
            'Encourage them to include nationality.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Lock in the sono ambiguity',
          prompt: 'How do you know whether "sono" means "I am" or "they are" in a sentence?',
        },
      ],
    },
    {
      slug: 'cap02-article-workout',
      title: 'The right "the" — definite articles',
      lessonType: LessonType.grammar,
      level: CEFRLevel.complete_beginner,
      summary:
        'Drill the seven definite article forms by attaching them to nouns you already know, ' +
        'and then see bello in action as the article’s elegant mirror.',
      objectiveSkillSlugs: ['it-definite-articles', 'it-bello-adjective'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['family', 'travel', 'art', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Two decisions: gender, then sound',
          prompt:
            'Step 1 — gender (masculine or feminine?). Step 2 — starting sound of the noun ' +
            '(vowel, s+consonant/z/gn/ps/x/y, or everything else). That gives you the article.',
          notes: 'A small decision tree or table works well here.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Singular articles',
          prompt: 'Insert il, lo, or l’: ___ amico, ___ studente, ___ zaino.',
          exampleAnswer: 'l’amico, lo studente, lo zaino',
          notes: 'Targets l’ (vowel) and lo (z).',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Plural articles',
          prompt:
            'Pluralize with the right article: i/gli: ___ amici, ___ ragazzi, ___ spettacoli.',
          exampleAnswer: 'gli amici, i ragazzi, gli spettacoli',
          notes: 'gli before vowel (spettacoli) vs i before consonant.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'bello mirrors the article',
          prompt: 'Which is correct: "un bel film" or "un bello film"?',
          exampleAnswer: 'un bel film',
          notes: 'Film starts with f, a regular consonant → bel, not bello.',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Spot the article error',
          prompt: 'Fix the sentence: "Il spettacolo è bello."',
          exampleAnswer: 'Lo spettacolo è bello.',
          notes: 'spettacolo begins with sp (s+consonant) → lo, not il.',
        },
        {
          taskType: TaskType.recap,
          focus: 'When does bello become bel?',
          prompt: 'In what position and before what kind of noun does bello shorten to bel?',
        },
      ],
    },
    {
      slug: 'cap02-describing-a-friend',
      title: 'Tell me about your friend',
      lessonType: LessonType.scenario_roleplay,
      level: CEFRLevel.complete_beginner,
      summary:
        'You’re chatting with an Italian pen pal who asks you to describe your best friend. ' +
        'Use physical adjectives, personality adjectives, nationality, and at least one color.',
      objectiveSkillSlugs: [
        'it-vocab-descriptions',
        'it-vocab-nationalities',
        'it-vocab-colors',
        'it-adjectives-agreement',
        'it-essere-present',
      ],
      defaultDurationMinutes: 10,
      compatibleThemes: ['family', 'culture', 'sports', 'film'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Set the scene',
          prompt:
            'You’re messaging your Italian pen pal. They write: "Descrivimi il tuo migliore amico!" ' +
            '(Describe your best friend to me!). Let’s build the reply.',
          notes:
            'Adapt "best friend" to whatever relationship the learner finds natural — a sibling, a teammate, a colleague.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Physical description with agreement',
          prompt:
            'Complete with the correct adjective form: ' +
            '"Il mio amico si chiama Jordan. È alt___ e magr___."',
          exampleAnswer: 'alto e magro (if male); alta e magra (if female)',
          notes: 'Use the name and gender the learner gives; adjust accordingly.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Nationality sentence',
          prompt: 'Translate: "He is American, but his mother is Italian."',
          exampleAnswer: 'È americano, ma sua madre è italiana.',
          notes:
            'No article before a predicate nationality — resist the urge to say "è un americano" in this context.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Personality + color detail',
          prompt:
            'Describe your friend’s personality in two sentences, and mention the color of something they own or wear.',
          exampleAnswer: 'È molto simpatico e allegro. Ha una bicicletta rossa.',
          notes:
            'Let the learner use their real friend’s details. Celebrate creative use of color and adjective agreement.',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'Full spoken description',
          prompt:
            'Now deliver the full description out loud — at least four sentences describing your friend.',
          notes:
            'Prompt for at least: name, one physical adj., one personality adj., nationality (if known), ' +
            'one color somewhere. Gentle correction on agreement endings.',
        },
        {
          taskType: TaskType.reflection,
          focus: 'What stuck?',
          prompt: 'Which adjective or expression do you want to remember most from today?',
        },
      ],
    },
    {
      slug: 'cap02-colors-nationalities-review',
      title: 'Colors and nationalities in the real world',
      lessonType: LessonType.vocabulary_review,
      level: CEFRLevel.complete_beginner,
      summary:
        'Flash-card style reinforcement for colors and nationalities, with focus on the invariable colors ' +
        'and the two-ending nationality adjectives that trip learners up.',
      objectiveSkillSlugs: ['it-vocab-colors', 'it-vocab-nationalities'],
      defaultDurationMinutes: 8,
      compatibleThemes: ['family', 'travel', 'sports', 'art'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Goal',
          prompt:
            'Colors and nationalities sound simple — until agreement catches you. ' +
            'Today we drill the patterns that cause mistakes.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Invariable vs agreeing colors',
          prompt:
            'Which sentence is correct? ' + '(A) Le scarpe sono rosa. (B) Le scarpe sono rose.',
          exampleAnswer: 'A — Le scarpe sono rosa (rosa is invariable)',
          notes: 'Test blu, rosa, viola each once.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Two-ending nationality in context',
          prompt: 'Complete: "Hana è giapponese___. I suoi genitori sono giapponesi___."',
          exampleAnswer: 'giapponese (f. sing., unchanged); giapponesi (pl.)',
          notes: 'Show that the f. singular of a two-ending adj. is identical to the m. singular.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Describe something with a color',
          prompt: 'Name three objects near you right now and give each one a color in Italian.',
          notes:
            'Pull the learner into their real environment. Personalize to interests: ' +
            'sports kit, book cover, car, flags of nations they follow.',
        },
        {
          taskType: TaskType.recap,
          focus: 'The invariable color list',
          prompt:
            'Name at least three Italian colors that never change their ending. Why don’t they agree?',
          notes:
            'Desired answer: blu, rosa, viola (arancione is a bonus). Reason: borrowed/foreign words treated as invariable.',
        },
      ],
    },
    {
      slug: 'cap02-listen-and-identify',
      title: 'Who are they? — listening for descriptions',
      lessonType: LessonType.listening_challenge,
      level: CEFRLevel.complete_beginner,
      summary:
        'Listen to short clips of two Italian speakers describing people, and extract the key details — ' +
        'looks, personality, and nationality — to answer questions.',
      objectiveSkillSlugs: [
        'it-listening-everyday',
        'it-vocab-descriptions',
        'it-vocab-nationalities',
      ],
      defaultDurationMinutes: 9,
      compatibleThemes: ['family', 'culture', 'sports'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Listening strategy',
          prompt:
            'When you hear a description, listen for the adjective endings — they tell you gender. ' +
            'Don’t worry about every word; grab the key descriptors.',
        },
        {
          taskType: TaskType.listening_comprehension,
          focus: 'Gist: positive or negative person?',
          prompt:
            'Listen to the clip. Is this person being described positively, negatively, or mixed?',
          notes:
            'Audio: "Mia sorella è alta e molto simpatica. È francese, studia a Parigi. ' +
            'È bravissima, davvero gentile con tutti." — Clearly positive.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Detail: nationality',
          prompt: 'What nationality is the person described?',
          exampleAnswer: 'francese',
          notes: 'Three options: italiana / francese / spagnola.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Detail: adjectives heard',
          prompt: 'List two adjectives used to describe the person.',
          exampleAnswer: 'simpatica, gentile (or bravissima)',
          notes: 'Accept any two correctly heard adjectives.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Echo and extend',
          prompt:
            'Now describe the same person out loud in your own words, then add one adjective of your own.',
          notes: 'This consolidates listening into production — a key transfer exercise.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Agreement cue in listening',
          prompt:
            'How did the adjective endings help you guess whether the described person was male or female?',
        },
      ],
    },
  ],

  // ─── Thematic vocabulary bank ─────────────────────────────────────────────
  vocabulary: [
    // Descrizioni fisiche e di personalità
    {
      slug: 'cap02-alto',
      targetText: 'alto / alta',
      nativeText: 'tall',
      partOfSpeech: 'adj',
      theme: 'descrizioni',
      exampleSentence: 'Mio padre è alto e magro.',
      exampleTranslation: 'My father is tall and slim.',
    },
    {
      slug: 'cap02-basso',
      targetText: 'basso / bassa',
      nativeText: 'short (in height)',
      partOfSpeech: 'adj',
      theme: 'descrizioni',
    },
    {
      slug: 'cap02-magro',
      targetText: 'magro / magra',
      nativeText: 'slim / thin',
      partOfSpeech: 'adj',
      theme: 'descrizioni',
    },
    {
      slug: 'cap02-grasso',
      targetText: 'grasso / grassa',
      nativeText: 'fat / heavy',
      partOfSpeech: 'adj',
      theme: 'descrizioni',
    },
    {
      slug: 'cap02-giovane',
      targetText: 'giovane',
      nativeText: 'young',
      partOfSpeech: 'adj',
      theme: 'descrizioni',
      exampleSentence: 'È una professoressa giovane e brava.',
      exampleTranslation: 'She is a young and capable teacher.',
    },
    {
      slug: 'cap02-vecchio',
      targetText: 'vecchio / vecchia',
      nativeText: 'old',
      partOfSpeech: 'adj',
      theme: 'descrizioni',
    },
    {
      slug: 'cap02-bello',
      targetText: 'bello / bella',
      nativeText: 'beautiful / handsome / lovely',
      partOfSpeech: 'adj',
      theme: 'descrizioni',
      exampleSentence: 'Che bel paesaggio!',
      exampleTranslation: 'What a beautiful landscape!',
    },
    {
      slug: 'cap02-brutto',
      targetText: 'brutto / brutta',
      nativeText: 'ugly / unpleasant-looking',
      partOfSpeech: 'adj',
      theme: 'descrizioni',
    },
    {
      slug: 'cap02-simpatico',
      targetText: 'simpatico / simpatica',
      nativeText: 'likeable / warm / friendly',
      partOfSpeech: 'adj',
      theme: 'descrizioni',
      exampleSentence: 'Tutti i miei amici sono molto simpatici.',
      exampleTranslation: 'All my friends are very likeable.',
    },
    {
      slug: 'cap02-antipatico',
      targetText: 'antipatico / antipatica',
      nativeText: 'unpleasant / unfriendly',
      partOfSpeech: 'adj',
      theme: 'descrizioni',
    },
    {
      slug: 'cap02-intelligente',
      targetText: 'intelligente',
      nativeText: 'intelligent',
      partOfSpeech: 'adj',
      theme: 'descrizioni',
      exampleSentence: 'È intelligente e molto studiosa.',
      exampleTranslation: 'She is intelligent and very studious.',
    },
    {
      slug: 'cap02-gentile',
      targetText: 'gentile',
      nativeText: 'kind / polite',
      partOfSpeech: 'adj',
      theme: 'descrizioni',
    },
    {
      slug: 'cap02-allegro',
      targetText: 'allegro / allegra',
      nativeText: 'cheerful / lively',
      partOfSpeech: 'adj',
      theme: 'descrizioni',
    },
    {
      slug: 'cap02-timido',
      targetText: 'timido / timida',
      nativeText: 'shy / timid',
      partOfSpeech: 'adj',
      theme: 'descrizioni',
    },
    {
      slug: 'cap02-bravo',
      targetText: 'bravo / brava',
      nativeText: 'good (at something) / capable / skilled',
      partOfSpeech: 'adj',
      theme: 'descrizioni',
      exampleSentence: 'Lei è brava in matematica.',
      exampleTranslation: 'She is good at mathematics.',
    },
    // Nazionalità
    {
      slug: 'cap02-italiano',
      targetText: 'italiano / italiana',
      nativeText: 'Italian',
      partOfSpeech: 'adj',
      theme: 'nazionalità',
      exampleSentence: 'Parli italiano? Sì, sono italiano!',
      exampleTranslation: 'Do you speak Italian? Yes, I am Italian!',
    },
    {
      slug: 'cap02-americano',
      targetText: 'americano / americana',
      nativeText: 'American',
      partOfSpeech: 'adj',
      theme: 'nazionalità',
    },
    {
      slug: 'cap02-francese',
      targetText: 'francese',
      nativeText: 'French',
      partOfSpeech: 'adj',
      theme: 'nazionalità',
      exampleSentence: 'Lei è francese, di Parigi.',
      exampleTranslation: 'She is French, from Paris.',
    },
    {
      slug: 'cap02-tedesco',
      targetText: 'tedesco / tedesca',
      nativeText: 'German',
      partOfSpeech: 'adj',
      theme: 'nazionalità',
    },
    {
      slug: 'cap02-spagnolo',
      targetText: 'spagnolo / spagnola',
      nativeText: 'Spanish',
      partOfSpeech: 'adj',
      theme: 'nazionalità',
    },
    {
      slug: 'cap02-inglese',
      targetText: 'inglese',
      nativeText: 'English / British',
      partOfSpeech: 'adj',
      theme: 'nazionalità',
    },
    {
      slug: 'cap02-cinese',
      targetText: 'cinese',
      nativeText: 'Chinese',
      partOfSpeech: 'adj',
      theme: 'nazionalità',
    },
    {
      slug: 'cap02-giapponese',
      targetText: 'giapponese',
      nativeText: 'Japanese',
      partOfSpeech: 'adj',
      theme: 'nazionalità',
    },
    {
      slug: 'cap02-russo',
      targetText: 'russo / russa',
      nativeText: 'Russian',
      partOfSpeech: 'adj',
      theme: 'nazionalità',
    },
    {
      slug: 'cap02-messicano',
      targetText: 'messicano / messicana',
      nativeText: 'Mexican',
      partOfSpeech: 'adj',
      theme: 'nazionalità',
    },
    // Colori
    {
      slug: 'cap02-rosso',
      targetText: 'rosso / rossa',
      nativeText: 'red',
      partOfSpeech: 'adj',
      theme: 'colori',
      exampleSentence: 'Ha una macchina rossa.',
      exampleTranslation: 'He has a red car.',
    },
    {
      slug: 'cap02-blu',
      targetText: 'blu',
      nativeText: 'blue (deep/navy) — invariable',
      partOfSpeech: 'adj',
      theme: 'colori',
      exampleSentence: 'Porta sempre una giacca blu.',
      exampleTranslation: 'She always wears a blue jacket.',
    },
    {
      slug: 'cap02-verde',
      targetText: 'verde',
      nativeText: 'green',
      partOfSpeech: 'adj',
      theme: 'colori',
    },
    {
      slug: 'cap02-giallo',
      targetText: 'giallo / gialla',
      nativeText: 'yellow',
      partOfSpeech: 'adj',
      theme: 'colori',
    },
    {
      slug: 'cap02-nero',
      targetText: 'nero / nera',
      nativeText: 'black',
      partOfSpeech: 'adj',
      theme: 'colori',
      exampleSentence: 'Il lava dell’Etna è nera.',
      exampleTranslation: 'Etna’s lava is black.',
    },
    {
      slug: 'cap02-bianco',
      targetText: 'bianco / bianca',
      nativeText: 'white',
      partOfSpeech: 'adj',
      theme: 'colori',
    },
    {
      slug: 'cap02-grigio',
      targetText: 'grigio / grigia',
      nativeText: 'grey',
      partOfSpeech: 'adj',
      theme: 'colori',
    },
    {
      slug: 'cap02-marrone',
      targetText: 'marrone',
      nativeText: 'brown',
      partOfSpeech: 'adj',
      theme: 'colori',
    },
    {
      slug: 'cap02-rosa',
      targetText: 'rosa',
      nativeText: 'pink — invariable',
      partOfSpeech: 'adj',
      theme: 'colori',
    },
    {
      slug: 'cap02-viola',
      targetText: 'viola',
      nativeText: 'purple / violet — invariable',
      partOfSpeech: 'adj',
      theme: 'colori',
    },
    {
      slug: 'cap02-arancione',
      targetText: 'arancione',
      nativeText: 'orange — typically invariable',
      partOfSpeech: 'adj',
      theme: 'colori',
    },
    {
      slug: 'cap02-azzurro',
      targetText: 'azzurro / azzurra',
      nativeText: 'light blue / sky blue / azure',
      partOfSpeech: 'adj',
      theme: 'colori',
      exampleSentence: 'Il mare della Sicilia è azzurro.',
      exampleTranslation: 'The sea of Sicily is a bright azure blue.',
    },
  ],
};

export default unit;
