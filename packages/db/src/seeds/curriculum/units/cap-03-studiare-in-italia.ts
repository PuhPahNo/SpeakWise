// Capitolo 3 — Studiare in Italia
// Theme: family and university. Regular -are verbs, the four key irregular -are
// verbs (dare/stare/andare/fare), possessive adjectives, the special family
// rule, questo/quello, and the vocabulary of family members and university life.
// Regional focus: L’Umbria.
//
// All content original (copyright-safe).

import { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client';
import type { SeedUnit } from '../types';

const unit: SeedUnit = {
  code: 'cap-03',
  order: 3,
  title: 'Studiare in Italia',
  subtitle: 'Family, university, and the verbs that run daily life',
  theme: 'family',
  level: CEFRLevel.beginner,
  summary:
    'You are living and studying in Italy. Describe your family back home, talk about your university ' +
    'courses, and use the verbs that fill every Italian day — parlare, studiare, mangiare, dare, fare, ' +
    'andare, stare. Along the way you will master possessive adjectives and learn why Italian drops the ' +
    'article before a family member’s name.',
  canDo: [
    'Conjugate regular -are verbs correctly in the present tense for all six persons',
    'Use dare, stare, andare, and fare in context, including their common idioms',
    'Name and describe the members of your immediate and extended family',
    'Use possessive adjectives with the correct article and gender agreement',
    'Apply the article-drop rule with singular, unmodified family nouns',
    'Point things out with questo and quello, choosing the right form before the noun',
  ],
  culturalNotes: [
    {
      title: 'The oldest university in the Western world',
      body:
        'The University of Bologna, founded in 1088, is widely considered the first university in the ' +
        'Western world — centuries before Oxford or the Sorbonne. It attracted students from across ' +
        'medieval Europe to study law, and its model of organized academic life spread throughout the ' +
        'continent. Studying in Italy therefore carries a weight of tradition that few countries can match.',
    },
    {
      title: 'Oral exams and the 30 e lode',
      body:
        'Italian university exams are famously oral (esami orali). A professor questions a student ' +
        'face-to-face for fifteen to forty minutes, then announces a mark on a scale of 18 to 30. A ' +
        'perfect score is 30 e lode — thirty with honors (lode means "praise"). Anything below 18 is a ' +
        'fail and must be retaken. The oral format means that fluency and composure matter as much as ' +
        'knowledge.',
    },
    {
      title: 'The Italian family and the dinner table',
      body:
        'Italian family life is famously close-knit, and multiple generations often share a meal — or ' +
        'even a home — well into adulthood. University students in Italy frequently commute from the ' +
        'family home rather than moving to a dormitory, which keeps family bonds central to daily life. ' +
        'The shared Sunday lunch (il pranzo della domenica) remains a cultural institution even in the ' +
        'most urbanized families.',
    },
  ],

  // ─── Skills ───────────────────────────────────────────────────────────────
  skills: [
    {
      slug: 'it-regular-are-verbs-present',
      name: 'Regular -are verbs in the present tense',
      category: SkillCategory.grammar,
      level: CEFRLevel.beginner,
      description:
        'To conjugate a regular -are verb, drop the -are infinitive ending and add: -o, -i, -a, -iamo, ' +
        '-ate, -ano. Two spelling notes: verbs ending in -care/-gare insert an h before -i to preserve ' +
        'the hard sound (cerco → cerchi, pago → paghi); verbs ending in -ciare/-giare already have the ' +
        'i built in, so they do not double it (mangi, not "mangii").',
      prerequisiteSlugs: ['it-subject-pronouns'],
      examples: [
        {
          target: 'Parlo italiano ogni giorno.',
          native: 'I speak Italian every day.',
          note: 'parlare → parl- + -o',
        },
        {
          target: 'Studiamo alla biblioteca insieme.',
          native: 'We study at the library together.',
          note: 'studiare → studi- + -amo (no double i)',
        },
        {
          target: 'Paghi il caffè tu?',
          native: 'Are you paying for the coffee?',
          note: 'pagare → pagh- before -i (h keeps the hard g)',
        },
        {
          target: 'Mangiate tardi in estate.',
          native: 'You all eat late in summer.',
          note: 'mangiare → mangi- + -ate (single i)',
        },
      ],
      commonMistakes: [
        'omitting the h in cerchi/paghi, producing incorrect soft sounds (cerci, paci)',
        'doubling the i in mangi/studi (writing "mangii" or "studii")',
        'using the -o ending for all persons instead of changing by subject',
        'pronouncing the final -ano as stressed (it is parLAno, not parlaNO)',
      ],
      recommendedPracticeTypes: [
        TaskType.conjugation,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.error_correction,
      ],
      compatibleThemes: ['family', 'food', 'travel', 'business'],
      teachingNotes:
        'Teach the stem + ending frame first with parlare as the model; then immediately introduce the ' +
        'two spelling sub-rules using cercare and mangiare as the canonical examples. Drill all six ' +
        'persons in short sentences before moving to the irregular verbs in the next skill. ' +
        'Point out that -iamo is the only ending where the stress falls differently (parlIAmo).',
    },
    {
      slug: 'it-dare-stare-andare-fare',
      name: 'Dare, stare, andare, and fare — four key irregular -are verbs',
      category: SkillCategory.grammar,
      level: CEFRLevel.beginner,
      description:
        'Four high-frequency -are verbs are fully irregular in the present tense and must be memorized: ' +
        'dare (do/dai/dà/diamo/date/danno), stare (sto/stai/sta/stiamo/state/stanno), andare ' +
        '(vado/vai/va/andiamo/andate/vanno), and fare (faccio/fai/fa/facciamo/fate/fanno). Each verb ' +
        'also anchors essential idioms: fare colazione, fare la spesa, fare una domanda; stare bene/male; ' +
        'andare a + infinitive or place.',
      prerequisiteSlugs: ['it-regular-are-verbs-present'],
      examples: [
        {
          target: 'Faccio colazione alle sette.',
          native: 'I have breakfast at seven.',
          note: 'fare colazione — always fare, never avere',
        },
        {
          target: 'Come stai? — Sto benissimo, grazie!',
          native: 'How are you? — I’m doing great, thanks!',
          note: 'stare bene/male/benissimo for health and mood',
        },
        {
          target: 'Andiamo all’università in bicicletta.',
          native: 'We go to university by bicycle.',
          note: 'andare a + place; andare in + vehicle',
        },
        {
          target: 'Dai, stai attento alla lezione!',
          native: 'Come on, pay attention in class!',
          note: 'dai (come on!) and stare attento — two idioms at once',
        },
      ],
      commonMistakes: [
        'regularizing andare as "ando" instead of vado',
        'using avere colazione instead of fare colazione',
        'confusing fa (he/she does/makes) with the preposition fra',
        'forgetting that stare bene does not use essere (non "sono bene")',
      ],
      recommendedPracticeTypes: [
        TaskType.conjugation,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['family', 'food', 'travel', 'culture'],
      teachingNotes:
        'Separate the paradigm learning from the idioms — build each paradigm then slot in its high-value ' +
        'phrases. The andare a + infinitive construction (Vado a studiare) is a useful productivity ' +
        'pattern that recurs throughout the curriculum; highlight it here. Contrast stare (ongoing state) ' +
        'with essere (identity) so learners understand why "Come stai?" uses stare.',
    },
    {
      slug: 'it-possessive-adjectives',
      name: 'Possessive adjectives (il mio, il tuo, il suo…)',
      category: SkillCategory.grammar,
      level: CEFRLevel.beginner,
      description:
        'Italian possessive adjectives (il mio, il tuo, il suo, il nostro, il vostro, il loro) take the ' +
        'definite article AND agree in gender and number with the thing possessed — not with the owner. ' +
        'Suo means both "his" and "her" (and "its"); it agrees with the possessed noun, not the subject.',
      prerequisiteSlugs: ['it-definite-articles'],
      examples: [
        {
          target: 'la mia borsa',
          native: 'my bag (f)',
          note: 'mia agrees with borsa (f), not the speaker',
        },
        {
          target: 'i miei amici',
          native: 'my friends (m pl)',
          note: 'miei is the masculine plural of mio',
        },
        {
          target: 'il suo professore',
          native: 'his/her professor',
          note: 'suo could mean either; context clarifies',
        },
        {
          target: 'il nostro appartamento, la nostra città',
          native: 'our apartment, our city',
          note: 'nostro agrees with the noun’s gender',
        },
      ],
      commonMistakes: [
        'making suo agree with the owner instead of the possessed noun ("la suo borsa" for a woman’s bag)',
        'omitting the article before possessives (saying "mia borsa" instead of "la mia borsa")',
        'confusing loro (invariable) with the other possessives that change form',
        'using the wrong plural forms: miei/miei, not "mios/mias"',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.error_correction,
        TaskType.translation,
      ],
      compatibleThemes: ['family', 'travel', 'business', 'culture'],
      teachingNotes:
        'Emphasize early: "the possessive agrees with the THING, not the person." A useful test: swap ' +
        'the owner and see that the possessive does not change (il suo libro for Marco’s book OR ' +
        'Maria’s book). Loro is the easiest for production but hardest to spot as invariable — flag it ' +
        'explicitly. The article-drop rule for family members is handled in the next skill.',
    },
    {
      slug: 'it-possessives-family',
      name: 'Possessives with family members (article drop)',
      category: SkillCategory.grammar,
      level: CEFRLevel.beginner,
      description:
        'With a singular, unmodified family noun, Italian drops the definite article: mio padre, tua ' +
        'sorella, suo fratello. The article is kept when the noun is (a) plural — i miei fratelli; ' +
        '(b) modified by an adjective — il mio fratello maggiore; (c) an affectionate or altered form ' +
        '— la mia mamma, il mio papà; or (d) with loro, which always keeps the article — il loro figlio.',
      prerequisiteSlugs: ['it-possessive-adjectives', 'it-vocab-family'],
      examples: [
        {
          target: 'Mio padre è medico.',
          native: 'My father is a doctor.',
          note: 'singular unmodified family noun → no article',
        },
        {
          target: 'I miei genitori abitano a Perugia.',
          native: 'My parents live in Perugia.',
          note: 'plural → article stays',
        },
        {
          target: 'La mia mamma cucina benissimo.',
          native: 'My mom cooks very well.',
          note: 'affectionate form mamma → article stays',
        },
        {
          target: 'Il loro figlio studia ingegneria.',
          native: 'Their son studies engineering.',
          note: 'loro → article always stays',
        },
      ],
      commonMistakes: [
        'keeping the article for singular unmodified family nouns (saying "il mio padre")',
        'dropping the article with plural family nouns ("miei fratelli" instead of i miei fratelli)',
        'forgetting that mamma/papà always keep the article because they are altered forms',
        'treating loro as the same as the other possessives and dropping the article',
      ],
      recommendedPracticeTypes: [
        TaskType.error_correction,
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.translation,
      ],
      compatibleThemes: ['family', 'culture'],
      teachingNotes:
        'Teach this as four clear exceptions that restore the article. The most productive approach is to ' +
        'start with the bare rule (singular unmodified → no article) and then progressively reveal each ' +
        'case that brings the article back. A side-by-side table (padre / mio padre vs. mamma / la mia ' +
        'mamma) is worth generating for each learner. The loro rule is the quickest to memorize.',
    },
    {
      slug: 'it-questo-quello',
      name: 'Demonstratives: questo (this) and quello (that)',
      category: SkillCategory.grammar,
      level: CEFRLevel.beginner,
      description:
        'Questo (this) agrees like a regular -o/-a adjective: questo, questa, questi, queste. Quello ' +
        '(that), when placed before a noun, behaves like the definite article — its form depends on the ' +
        'gender, number, and the first sound of the following word: quel, quello, quell’, quella, quei, ' +
        'quegli, quelle.',
      prerequisiteSlugs: ['it-definite-articles', 'it-noun-gender'],
      examples: [
        {
          target: 'questo corso, questa materia',
          native: 'this course, this subject',
          note: 'questo follows the standard -o/-a pattern',
        },
        {
          target: 'quel professore, quello studente',
          native: 'that professor, that student (m)',
          note: 'quel before consonant; quello before s+cons, z, etc.',
        },
        {
          target: 'quell’esame, quella biblioteca',
          native: 'that exam, that library',
          note: 'quell’ before vowel; quella before consonant (f)',
        },
        {
          target: 'quei corsi, quegli esami, quelle materie',
          native: 'those courses, those exams, those subjects',
          note: 'quei (m pl regular); quegli (m pl before vowel/s+cons); quelle (f pl)',
        },
      ],
      commonMistakes: [
        'using quello everywhere instead of matching the article pattern (saying "quello professore")',
        'confusing quegli and quei (quegli is for vowels and s+cons; quei for other consonants)',
        'treating questo like quello and trying to apply the article-like rule to it',
        'forgetting the apostrophe in quell’ before a vowel',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.error_correction,
      ],
      compatibleThemes: ['family', 'culture', 'travel', 'art'],
      teachingNotes:
        'The key insight is the asymmetry: questo is simple, quello is complex. Teach quello explicitly as ' +
        '"matches the definite article system you already know." Generate a two-column chart side by ' +
        'side with il/lo/l’/la/i/gli/le to make the parallel obvious. University-vocabulary context ' +
        '(quel corso, quell’esame) makes the drill feel immediately useful.',
    },
    {
      slug: 'it-vocab-family',
      name: 'Family vocabulary (la famiglia)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.beginner,
      description:
        'The core family members: il padre, la madre, i genitori, il fratello, la sorella, il figlio, ' +
        'la figlia, il nonno, la nonna, lo zio, la zia, il cugino/la cugina, il marito, la moglie, and ' +
        'il/la nipote (grandchild or nephew/niece). Learn each noun with its article.',
      prerequisiteSlugs: ['it-noun-gender', 'it-definite-articles'],
      examples: [
        { target: 'Ho due sorelle e un fratello.', native: 'I have two sisters and one brother.' },
        {
          target: 'I miei nonni abitano in Umbria.',
          native: 'My grandparents live in Umbria.',
          note: 'nonni = plural of nonno AND collective "grandparents"',
        },
        {
          target: 'Mio zio è professore all’università.',
          native: 'My uncle is a professor at the university.',
        },
      ],
      commonMistakes: [
        'confusing nipote: il nipote = grandson or nephew; la nipote = granddaughter or niece',
        'forgetting that genitori (parents) is plural-only — there is no singular form in this sense',
        'mis-gendering moglie (f) — it ends in -e but is feminine',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.fill_blank,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['family', 'culture'],
      teachingNotes:
        'Anchor every noun to its article (la moglie, not just "moglie"). The nipote ambiguity is ' +
        'particularly confusing for English speakers and worth a dedicated error-correction task. ' +
        'Personalize early: have the learner talk about their own family tree with the real names and ' +
        'relationships they actually have.',
    },
    {
      slug: 'it-vocab-university',
      name: 'University vocabulary (l’università)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.beginner,
      description:
        'The words for academic life: l’università, la facoltà, il corso, la materia, l’esame, il voto, ' +
        'la laurea, la biblioteca, lo studente/la studentessa, il professore/la professoressa. Subjects: ' +
        'la matematica, la storia, le lingue, la medicina, la legge/giurisprudenza, l’economia, ' +
        'l’ingegneria, la chimica.',
      prerequisiteSlugs: ['it-noun-gender', 'it-definite-articles'],
      examples: [
        {
          target: 'Ho un esame di storia domani.',
          native: 'I have a history exam tomorrow.',
          note: 'di + subject name, no article on the subject after di here',
        },
        {
          target: 'La professoressa di lingue spiega benissimo.',
          native: 'The languages professor explains very well.',
        },
        {
          target: 'Vuole una laurea in medicina.',
          native: 'She wants a degree in medicine.',
          note: 'laurea triennale (3-year) or laurea magistrale (5-year) in Italy',
        },
      ],
      commonMistakes: [
        'confusing il corso (a course, a single class) with la facoltà (the faculty / school within the university)',
        'forgetting the feminine studentessa — using studente for all genders',
        'dropping the article before l’università (it takes l’, not la or il)',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.fill_blank,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['family', 'culture', 'history', 'business'],
      teachingNotes:
        'Connect the academic vocabulary to the learner’s own studies or field of interest whenever ' +
        'possible — if they studied or work in medicine, lead with medicina. The gender pairs ' +
        'studente/studentessa and professore/professoressa are worth drilling together so learners ' +
        'internalize the -essa suffix pattern.',
    },
  ],

  // ─── Lesson templates ─────────────────────────────────────────────────────
  lessonTemplates: [
    {
      slug: 'cap03-the-are-engine',
      title: 'The -are engine',
      lessonType: LessonType.grammar,
      level: CEFRLevel.beginner,
      summary:
        'Learn the one pattern that unlocks hundreds of Italian verbs: drop -are, add the six endings — ' +
        'then tackle the two spelling rules for -care/-gare and -ciare/-giare.',
      objectiveSkillSlugs: ['it-regular-are-verbs-present'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['family', 'food', 'travel', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'The stem-plus-ending system',
          prompt:
            'Take parlare, drop -are: you get parl-. Now add -o, -i, -a, -iamo, -ate, -ano. ' +
            'That one pattern handles hundreds of verbs.',
          notes:
            'Keep it visual — show the infinitive, draw a slash after the stem, reveal the endings. ' +
            'Build a mini table in the chat.',
        },
        {
          taskType: TaskType.conjugation,
          focus: 'Conjugate studiare — all six persons',
          prompt: 'Give all six present-tense forms of studiare.',
          exampleAnswer: 'studio, studi, studia, studiamo, studiate, studiano',
          notes:
            'Probe whether the learner writes "studii" for tu — that is the most common mistake here.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'The -care/-gare h rule',
          prompt: 'Complete: "Tu ___ (cercare) lavoro. Io ___ (pagare) il conto."',
          exampleAnswer: 'cerchi, pago',
          notes:
            'The contrast io pago (no h needed) vs tu cerchi (h before i) drives home the rule.',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Spot the double-i mistake',
          prompt: 'Find and fix the error: "Lei mangii la pizza ogni giorno."',
          exampleAnswer: 'Lei mangia la pizza ogni giorno.',
          notes: '-ciare/-giare do not double the i before vowel endings.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Personalized use',
          prompt: 'Translate into Italian: "Do you listen to music while you study?"',
          exampleAnswer: 'Ascolti musica mentre studi?',
          notes:
            'If the learner mentioned a hobby or subject in their profile, replace "music" with it.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Lock in the two spelling rules',
          prompt:
            'Finish these sentences: "Verbs ending in -care/-gare add ___ before -i. ' +
            'Verbs ending in -ciare/-giare ___."',
          notes: 'Expected: add h / do not double the i.',
        },
      ],
    },
    {
      slug: 'cap03-four-rebels',
      title: 'Four rebel -are verbs',
      lessonType: LessonType.grammar,
      level: CEFRLevel.beginner,
      summary:
        'Dare, stare, andare, and fare do not follow the -are pattern — but they power the most useful ' +
        'Italian phrases. Master the forms and the idioms that go with them.',
      objectiveSkillSlugs: ['it-dare-stare-andare-fare'],
      defaultDurationMinutes: 12,
      compatibleThemes: ['family', 'food', 'travel', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Why these four matter',
          prompt:
            'These four verbs are the most irregular -are verbs in Italian — but they power half your ' +
            'daily sentences. Let’s build each paradigm then put it to work.',
        },
        {
          taskType: TaskType.conjugation,
          focus: 'Build andare and fare',
          prompt: 'Conjugate andare and fare for io, tu, lui/lei, noi.',
          exampleAnswer: 'andare: vado, vai, va, andiamo — fare: faccio, fai, fa, facciamo',
          notes: 'vado and faccio are the two first-person surprises; drill them first.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Fare idioms in context',
          prompt:
            'Complete: "Di mattina ___ (fare) colazione in famiglia. Poi mia sorella ___ (fare) ' +
            'la spesa al mercato."',
          exampleAnswer: 'facciamo, fa',
          notes: 'Personalize the morning routine to match the learner’s profile if possible.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Stare bene vs essere',
          prompt: 'Your friend texts: "Come ___?" Which verb? A) sei  B) stai  C) hai',
          exampleAnswer: 'B) stai',
          notes: 'This is the classic beginner confuse-point: "Come stai?" uses stare, not essere.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Andare a + infinitive',
          prompt: 'Translate: "After dinner I’m going to study at the library."',
          exampleAnswer: 'Dopo cena vado a studiare in biblioteca.',
          notes:
            'andare a + inf is a productive frame — encourage the learner to make one sentence about ' +
            'their own plans.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Your daily routine',
          prompt:
            'Use at least one form each of fare, andare, and stare to describe your morning routine.',
          notes:
            'Pull known details (breakfast habits, commute, how the learner is feeling today) from ' +
            'the profile to personalize the prompt.',
        },
      ],
    },
    {
      slug: 'cap03-my-family-tree',
      title: 'Il mio albero genealogico',
      lessonType: LessonType.scenario_roleplay,
      level: CEFRLevel.beginner,
      summary:
        'Introduce your family — where they live, what they do, what they study — using possessives, ' +
        'the family article-drop rule, and this/that demonstratives.',
      objectiveSkillSlugs: [
        'it-vocab-family',
        'it-possessives-family',
        'it-possessive-adjectives',
        'it-questo-quello',
      ],
      defaultDurationMinutes: 12,
      compatibleThemes: ['family', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Set the scene',
          prompt:
            'You’re video-calling a new Italian friend. They ask about your family. ' +
            'Let’s build what you’ll say, one rule at a time.',
          notes: 'Use the learner’s actual family details from their profile wherever available.',
        },
        {
          taskType: TaskType.explanation,
          focus: 'The article-drop rule',
          prompt:
            'Say "mio padre" — no article. Say "i miei fratelli" — article back. ' +
            'Four situations bring the article back: plural, modified, affectionate, loro.',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Spot article mistakes',
          prompt:
            'Fix what’s wrong: "Il mio padre è avvocato. Miei cugini abitano a Roma. ' +
            'La loro figlia studia medicina."',
          exampleAnswer:
            'Mio padre è avvocato. (drop article — singular unmodified) | ' +
            'I miei cugini abitano a Roma. (plural → article stays) | ' +
            'La loro figlia studia medicina. (loro → article always stays — this one was already correct)',
          notes:
            'Three sentences: one wrong article kept, one missing article, one correct to test ' +
            'discrimination.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'questo vs quello',
          prompt:
            'Complete with the correct form: "___ (this) corso è difficile. ' +
            '___ (those) esami sono lunghi. ___ (that) studentessa si chiama Chiara."',
          exampleAnswer: 'Questo corso — Quegli esami — Quella studentessa',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Introduce your family',
          prompt:
            'Tell me three things about different family members: who they are, where they live, ' +
            'and what they do or study.',
          exampleAnswer:
            'Mio fratello abita a Milano e lavora in banca. ' +
            'Mia nonna vive in Umbria. I miei genitori fanno i medici.',
          notes:
            'Use real names and relationships from the learner’s profile. Praise correct article-drop ' +
            'usage explicitly.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Possessives + family rule in one line',
          prompt:
            'Complete the rule: "With singular, unmodified family nouns, Italian ___ the article; ' +
            'with loro or in the plural, Italian ___ the article."',
        },
      ],
    },
    {
      slug: 'cap03-what-do-you-study',
      title: 'Cosa studi? — university life in Umbria',
      lessonType: LessonType.vocabulary_review,
      level: CEFRLevel.beginner,
      summary:
        'Build fluency around university vocabulary — courses, professors, exams, grades — through ' +
        'authentic scenarios set in Perugia and Assisi.',
      objectiveSkillSlugs: ['it-vocab-university', 'it-regular-are-verbs-present'],
      defaultDurationMinutes: 10,
      compatibleThemes: ['family', 'culture', 'history', 'business'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'University life in Umbria',
          prompt:
            'You’re a student at the Università degli Studi di Perugia. Let’s learn the words ' +
            'that fill your days: courses, exams, the library, your professors.',
          notes: 'Reference Perugia as the regional setting for this chapter.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Corso vs materia vs facoltà',
          prompt:
            'Which word means the overall school or faculty within the university, not a single class?',
          exampleAnswer: 'la facoltà',
          notes:
            'Three options: il corso, la materia, la facoltà. The il corso vs la materia distinction ' +
            '(course = the offering, materia = the academic subject) is worth a note.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Talking about your studies',
          prompt:
            'Complete: "Studio ___ (economics) alla facoltà di ___ (business/economics). ' +
            'Ho un ___ (exam) domani e voglio un bel ___ (grade)."',
          exampleAnswer: 'economia, economia, esame, voto',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'What did you/do you study?',
          prompt:
            'Tell me your area of study (or a subject you are curious about) and something you ' +
            'know about it in Italian.',
          notes:
            'Pull the learner’s stated interests or professional background from the profile. ' +
            'If they studied law, use legge/giurisprudenza; if engineering, ingegneria.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Five key university words',
          prompt: 'Give the Italian for: exam, grade, degree, professor (f), library.',
          exampleAnswer: 'esame, voto, laurea, professoressa, biblioteca',
        },
      ],
    },
    {
      slug: 'cap03-progress-check',
      title: 'Sei pronto? — Chapter 3 check-in',
      lessonType: LessonType.progress_check,
      level: CEFRLevel.beginner,
      summary:
        'A lightweight check across all seven chapter-3 skills: -are verb conjugation, the four ' +
        'irregular verbs, possessives, the family article rule, questo/quello, and both vocabulary sets.',
      objectiveSkillSlugs: [
        'it-regular-are-verbs-present',
        'it-dare-stare-andare-fare',
        'it-possessive-adjectives',
        'it-possessives-family',
        'it-questo-quello',
        'it-vocab-family',
        'it-vocab-university',
      ],
      defaultDurationMinutes: 12,
      compatibleThemes: ['family', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'What we are checking',
          prompt:
            'A quick sweep of everything from Capitolo 3. No pressure — this tells Wise exactly ' +
            'what you’ve nailed and what still needs reps.',
        },
        {
          taskType: TaskType.conjugation,
          focus: 'Regular -are and irregular verbs',
          prompt:
            'Give the correct form: "Noi ___ (ascoltare) musica. Voi ___ (fare) colazione tardi. ' +
            'Loro ___ (andare) in biblioteca."',
          exampleAnswer: 'ascoltiamo, fate, vanno',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Possessives + family article rule',
          prompt:
            'Fix all errors: "La mia sorella lavora. Il mio padre è stanco. ' +
            'I miei cugino studiano chimica."',
          exampleAnswer:
            'Mia sorella lavora. (drop il before singular unmodified family noun) | ' +
            'Mio padre è stanco. (same rule) | ' +
            'I miei cugini studiano chimica. (cugini, not cugino — plural)',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'questo and quello',
          prompt:
            'Fill in the correct demonstrative: "___ (this) materia è interessante. ' +
            'Conosci ___ (those, m pl before vowel) esami?"',
          exampleAnswer: 'Questa materia — Quegli esami',
        },
        {
          taskType: TaskType.translation,
          focus: 'Family and university in one paragraph',
          prompt:
            'Translate: "My brother studies economics at the university. ' +
            'His professors give difficult exams. That library is amazing."',
          exampleAnswer:
            'Mio fratello studia economia all’università. ' +
            'I suoi professori danno esami difficili. ' +
            'Quella biblioteca è fantastica.',
        },
        {
          taskType: TaskType.reflection,
          focus: 'Self-assessment',
          prompt:
            'Which skill from this chapter feels most solid? Which one do you want more practice on?',
          notes:
            'Use the answer to flag weak skills for the next session recommendation in the learner’s ' +
            'profile.',
        },
      ],
    },
  ],

  // ─── Thematic vocabulary bank ─────────────────────────────────────────────
  vocabulary: [
    // ── Famiglia ──────────────────────────────────────────────────────────
    {
      slug: 'cap03-il-padre',
      targetText: 'il padre',
      nativeText: 'the father',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'famiglia',
      exampleSentence: 'Mio padre lavora in banca.',
      exampleTranslation: 'My father works in a bank.',
    },
    {
      slug: 'cap03-la-madre',
      targetText: 'la madre',
      nativeText: 'the mother',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'famiglia',
      exampleSentence: 'Mia madre studia storia dell’arte.',
      exampleTranslation: 'My mother studies art history.',
    },
    {
      slug: 'cap03-i-genitori',
      targetText: 'i genitori',
      nativeText: 'the parents',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'famiglia',
      exampleSentence: 'I miei genitori abitano in Umbria.',
      exampleTranslation: 'My parents live in Umbria.',
    },
    {
      slug: 'cap03-il-fratello',
      targetText: 'il fratello',
      nativeText: 'the brother',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'famiglia',
    },
    {
      slug: 'cap03-la-sorella',
      targetText: 'la sorella',
      nativeText: 'the sister',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'famiglia',
    },
    {
      slug: 'cap03-il-figlio',
      targetText: 'il figlio',
      nativeText: 'the son',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'famiglia',
    },
    {
      slug: 'cap03-la-figlia',
      targetText: 'la figlia',
      nativeText: 'the daughter',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'famiglia',
    },
    {
      slug: 'cap03-il-nonno',
      targetText: 'il nonno',
      nativeText: 'the grandfather',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'famiglia',
      exampleSentence: 'Mio nonno ha ottant’anni.',
      exampleTranslation: 'My grandfather is eighty years old.',
    },
    {
      slug: 'cap03-la-nonna',
      targetText: 'la nonna',
      nativeText: 'the grandmother',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'famiglia',
    },
    {
      slug: 'cap03-lo-zio',
      targetText: 'lo zio',
      nativeText: 'the uncle',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'famiglia',
    },
    {
      slug: 'cap03-la-zia',
      targetText: 'la zia',
      nativeText: 'the aunt',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'famiglia',
    },
    {
      slug: 'cap03-il-cugino',
      targetText: 'il cugino / la cugina',
      nativeText: 'the cousin (m/f)',
      partOfSpeech: 'noun',
      gender: 'm/f',
      theme: 'famiglia',
    },
    {
      slug: 'cap03-il-marito',
      targetText: 'il marito',
      nativeText: 'the husband',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'famiglia',
    },
    {
      slug: 'cap03-la-moglie',
      targetText: 'la moglie',
      nativeText: 'the wife',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'famiglia',
      exampleSentence: 'Sua moglie insegna all’università.',
      exampleTranslation: 'His wife teaches at the university.',
    },
    {
      slug: 'cap03-il-nipote',
      targetText: 'il nipote / la nipote',
      nativeText: 'the grandchild / nephew / niece',
      partOfSpeech: 'noun',
      gender: 'm/f',
      theme: 'famiglia',
      exampleSentence: 'La nostra nipote studia lingue.',
      exampleTranslation: 'Our granddaughter / niece studies languages.',
    },
    // ── Università ────────────────────────────────────────────────────────
    {
      slug: 'cap03-luniversita',
      targetText: 'l’università',
      nativeText: 'the university',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'università',
      exampleSentence: 'Studiamo all’università di Perugia.',
      exampleTranslation: 'We study at the University of Perugia.',
    },
    {
      slug: 'cap03-la-facolta',
      targetText: 'la facoltà',
      nativeText: 'the faculty / school (within a university)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'università',
    },
    {
      slug: 'cap03-il-corso',
      targetText: 'il corso',
      nativeText: 'the course / class',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'università',
      exampleSentence: 'Questo corso di storia è molto interessante.',
      exampleTranslation: 'This history course is very interesting.',
    },
    {
      slug: 'cap03-la-materia',
      targetText: 'la materia',
      nativeText: 'the subject / academic discipline',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'università',
    },
    {
      slug: 'cap03-lesame',
      targetText: 'l’esame',
      nativeText: 'the exam',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'università',
      exampleSentence: 'Ho l’esame di chimica venerdì.',
      exampleTranslation: 'I have the chemistry exam on Friday.',
    },
    {
      slug: 'cap03-il-voto',
      targetText: 'il voto',
      nativeText: 'the grade / mark',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'università',
      exampleSentence: 'Ha preso un bel voto all’esame orale.',
      exampleTranslation: 'She got a great mark on the oral exam.',
    },
    {
      slug: 'cap03-la-laurea',
      targetText: 'la laurea',
      nativeText: 'the (university) degree',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'università',
    },
    {
      slug: 'cap03-la-biblioteca',
      targetText: 'la biblioteca',
      nativeText: 'the library',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'università',
      exampleSentence: 'Vado a studiare in biblioteca ogni pomeriggio.',
      exampleTranslation: 'I go to study in the library every afternoon.',
    },
    {
      slug: 'cap03-lo-studente',
      targetText: 'lo studente / la studentessa',
      nativeText: 'the student (m/f)',
      partOfSpeech: 'noun',
      gender: 'm/f',
      theme: 'università',
    },
    {
      slug: 'cap03-il-professore',
      targetText: 'il professore / la professoressa',
      nativeText: 'the professor (m/f)',
      partOfSpeech: 'noun',
      gender: 'm/f',
      theme: 'università',
      exampleSentence: 'La professoressa di economia dà esami molto difficili.',
      exampleTranslation: 'The economics professor gives very difficult exams.',
    },
    {
      slug: 'cap03-la-matematica',
      targetText: 'la matematica',
      nativeText: 'mathematics',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'materie',
    },
    {
      slug: 'cap03-la-storia',
      targetText: 'la storia',
      nativeText: 'history',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'materie',
    },
    {
      slug: 'cap03-lingegneria',
      targetText: 'l’ingegneria',
      nativeText: 'engineering',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'materie',
    },
    {
      slug: 'cap03-la-medicina',
      targetText: 'la medicina',
      nativeText: 'medicine / medical studies',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'materie',
    },
    {
      slug: 'cap03-leconomia',
      targetText: 'l’economia',
      nativeText: 'economics / business',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'materie',
    },
    {
      slug: 'cap03-la-legge',
      targetText: 'la legge / la giurisprudenza',
      nativeText: 'law / jurisprudence',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'materie',
    },
    {
      slug: 'cap03-le-lingue',
      targetText: 'le lingue',
      nativeText: 'languages / linguistics',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'materie',
      exampleSentence: 'Studia le lingue: italiano, francese e spagnolo.',
      exampleTranslation: 'She studies languages: Italian, French, and Spanish.',
    },
    {
      slug: 'cap03-la-chimica',
      targetText: 'la chimica',
      nativeText: 'chemistry',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'materie',
    },
  ],
};

export default unit;
