// Italian curriculum seed — A1 (complete_beginner / beginner) and A2 (lower_intermediate)
// to start. Skill graph follows CEFR. To be expanded by a native Italian
// reviewer per ADR-0001 / Tech Arch §24 open question 6.

import { CEFRLevel, SkillCategory } from '@prisma/client';

export interface SeedSkill {
  slug: string;
  name: string;
  category: SkillCategory;
  level: CEFRLevel;
  description: string;
  prerequisiteSlugs: string[];
  examples: Array<{ target: string; native: string; note?: string }>;
}

export const italianCurriculumSeed: SeedSkill[] = [
  // ─── Pronunciation foundations ─────────────────────────────────────────
  {
    slug: 'it-pronunciation-vowels',
    name: 'Italian vowel sounds',
    category: SkillCategory.pronunciation,
    level: CEFRLevel.complete_beginner,
    description:
      'Five pure Italian vowel sounds: a, e, i, o, u. Always pronounced consistently regardless of position.',
    prerequisiteSlugs: [],
    examples: [
      { target: 'casa', native: 'house' },
      { target: 'pane', native: 'bread' },
      { target: 'vino', native: 'wine' },
    ],
  },
  {
    slug: 'it-pronunciation-double-consonants',
    name: 'Double consonants',
    category: SkillCategory.pronunciation,
    level: CEFRLevel.beginner,
    description: 'Italian double consonants are held longer and change meaning.',
    prerequisiteSlugs: ['it-pronunciation-vowels'],
    examples: [
      { target: 'pala vs palla', native: 'shovel vs ball' },
      { target: 'capello vs cappello', native: 'hair vs hat' },
    ],
  },
  // ─── Articles & gender ─────────────────────────────────────────────────
  {
    slug: 'it-noun-gender',
    name: 'Noun gender (masculine and feminine)',
    category: SkillCategory.grammar,
    level: CEFRLevel.complete_beginner,
    description:
      'All Italian nouns are masculine or feminine. Most masculine nouns end in -o, most feminine in -a, and many in -e can be either.',
    prerequisiteSlugs: [],
    examples: [
      { target: 'il libro', native: 'the book (m)' },
      { target: 'la casa', native: 'the house (f)' },
      { target: "l'amore", native: 'the love (m)' },
    ],
  },
  {
    slug: 'it-definite-articles',
    name: 'Definite articles (il, lo, la, l’, i, gli, le)',
    category: SkillCategory.grammar,
    level: CEFRLevel.complete_beginner,
    description:
      'Definite article forms vary by gender, number, and the first letter of the following noun.',
    prerequisiteSlugs: ['it-noun-gender'],
    examples: [
      { target: 'il ragazzo', native: 'the boy' },
      { target: 'lo studente', native: 'the student' },
      { target: 'gli amici', native: 'the friends' },
    ],
  },
  {
    slug: 'it-indefinite-articles',
    name: 'Indefinite articles (un, uno, una, un’)',
    category: SkillCategory.grammar,
    level: CEFRLevel.complete_beginner,
    description: 'Indefinite article forms based on gender and following sounds.',
    prerequisiteSlugs: ['it-noun-gender'],
    examples: [
      { target: 'un libro', native: 'a book' },
      { target: 'uno zaino', native: 'a backpack' },
      { target: 'una mela', native: 'an apple' },
    ],
  },
  // ─── Core verbs ────────────────────────────────────────────────────────
  {
    slug: 'it-essere-present',
    name: 'Present tense of essere (to be)',
    category: SkillCategory.grammar,
    level: CEFRLevel.complete_beginner,
    description: 'Conjugation of essere in present indicative: sono, sei, è, siamo, siete, sono.',
    prerequisiteSlugs: [],
    examples: [
      { target: 'Io sono americano.', native: 'I am American.' },
      { target: 'Tu sei italiana?', native: 'Are you Italian?' },
      { target: 'Siamo a Roma.', native: 'We are in Rome.' },
    ],
  },
  {
    slug: 'it-avere-present',
    name: 'Present tense of avere (to have)',
    category: SkillCategory.grammar,
    level: CEFRLevel.complete_beginner,
    description: 'Conjugation of avere in present indicative: ho, hai, ha, abbiamo, avete, hanno.',
    prerequisiteSlugs: [],
    examples: [
      { target: 'Ho fame.', native: 'I am hungry.' },
      { target: 'Hai un fratello?', native: 'Do you have a brother?' },
      { target: 'Abbiamo tempo.', native: 'We have time.' },
    ],
  },
  {
    slug: 'it-regular-are-verbs-present',
    name: 'Regular -are verbs in present',
    category: SkillCategory.grammar,
    level: CEFRLevel.beginner,
    description: 'Pattern for regular -are verbs (parlare, mangiare, lavorare).',
    prerequisiteSlugs: ['it-essere-present'],
    examples: [
      { target: 'Io parlo italiano.', native: 'I speak Italian.' },
      { target: 'Lui mangia la pizza.', native: 'He eats the pizza.' },
    ],
  },
  {
    slug: 'it-regular-ere-verbs-present',
    name: 'Regular -ere verbs in present',
    category: SkillCategory.grammar,
    level: CEFRLevel.beginner,
    description: 'Pattern for regular -ere verbs (vedere, leggere, prendere).',
    prerequisiteSlugs: ['it-regular-are-verbs-present'],
    examples: [
      { target: 'Leggo un libro.', native: 'I am reading a book.' },
      { target: 'Prendiamo il treno.', native: 'We take the train.' },
    ],
  },
  {
    slug: 'it-regular-ire-verbs-present',
    name: 'Regular -ire verbs in present',
    category: SkillCategory.grammar,
    level: CEFRLevel.beginner,
    description: 'Pattern for regular -ire verbs and -isco variant.',
    prerequisiteSlugs: ['it-regular-ere-verbs-present'],
    examples: [
      { target: 'Dormo presto.', native: 'I sleep early.' },
      { target: 'Capisco un poco.', native: 'I understand a little.' },
    ],
  },
  // ─── Pronouns ──────────────────────────────────────────────────────────
  {
    slug: 'it-subject-pronouns',
    name: 'Subject pronouns (io, tu, lui/lei, noi, voi, loro)',
    category: SkillCategory.grammar,
    level: CEFRLevel.complete_beginner,
    description:
      'Italian subject pronouns are usually omitted because the verb ending shows the subject.',
    prerequisiteSlugs: [],
    examples: [{ target: 'Sono io.', native: 'It’s me.' }],
  },
  {
    slug: 'it-direct-object-pronouns',
    name: 'Direct object pronouns (mi, ti, lo, la, ci, vi, li, le)',
    category: SkillCategory.grammar,
    level: CEFRLevel.lower_intermediate,
    description: 'Replace direct objects to avoid repetition; usually placed before the verb.',
    prerequisiteSlugs: ['it-regular-are-verbs-present', 'it-noun-gender'],
    examples: [
      { target: 'Lo vedo.', native: 'I see him/it.' },
      { target: 'La mangio.', native: 'I eat it (f).' },
    ],
  },
  {
    slug: 'it-indirect-object-pronouns',
    name: 'Indirect object pronouns (mi, ti, gli, le, ci, vi, gli)',
    category: SkillCategory.grammar,
    level: CEFRLevel.lower_intermediate,
    description: 'Replace indirect objects (a + person).',
    prerequisiteSlugs: ['it-direct-object-pronouns'],
    examples: [
      { target: 'Le parlo domani.', native: 'I will speak to her tomorrow.' },
      { target: 'Ci scrive una lettera.', native: 'He writes us a letter.' },
    ],
  },
  // ─── Past tenses ───────────────────────────────────────────────────────
  {
    slug: 'it-passato-prossimo-avere',
    name: 'Passato prossimo with avere',
    category: SkillCategory.grammar,
    level: CEFRLevel.lower_intermediate,
    description:
      'Past tense formed with avere + past participle. Used for completed actions in the past.',
    prerequisiteSlugs: ['it-avere-present', 'it-regular-are-verbs-present'],
    examples: [
      { target: 'Ho mangiato la pizza.', native: 'I ate the pizza.' },
      { target: 'Abbiamo visto il film.', native: 'We saw the film.' },
    ],
  },
  {
    slug: 'it-passato-prossimo-essere',
    name: 'Passato prossimo with essere',
    category: SkillCategory.grammar,
    level: CEFRLevel.lower_intermediate,
    description:
      'Movement, change-of-state, and reflexive verbs use essere as auxiliary. Past participle agrees with subject.',
    prerequisiteSlugs: ['it-passato-prossimo-avere'],
    examples: [
      { target: 'Sono andato a Roma.', native: 'I went to Rome.' },
      { target: 'È nata in Italia.', native: 'She was born in Italy.' },
    ],
  },
  {
    slug: 'it-passato-prossimo-pp-agreement',
    name: 'Past participle agreement with direct object pronouns',
    category: SkillCategory.grammar,
    level: CEFRLevel.intermediate,
    description:
      'When a direct object pronoun precedes a passato prossimo with avere, the past participle agrees in gender and number.',
    prerequisiteSlugs: ['it-passato-prossimo-avere', 'it-direct-object-pronouns'],
    examples: [
      { target: 'L’ho vista ieri.', native: 'I saw her yesterday.' },
      { target: 'Le ho comprate al mercato.', native: 'I bought them (f) at the market.' },
    ],
  },
  {
    slug: 'it-imperfetto',
    name: 'Imperfetto',
    category: SkillCategory.grammar,
    level: CEFRLevel.intermediate,
    description:
      'Imperfect tense for ongoing/habitual past actions, descriptions, age, weather, and time in the past.',
    prerequisiteSlugs: ['it-passato-prossimo-avere'],
    examples: [
      { target: 'Da bambino mangiavo molta pasta.', native: 'As a child I ate a lot of pasta.' },
      { target: 'Pioveva.', native: 'It was raining.' },
    ],
  },
  // ─── Vocabulary themes (also serve as scenario anchors) ────────────────
  {
    slug: 'it-vocab-greetings',
    name: 'Greetings and basic courtesy',
    category: SkillCategory.vocabulary,
    level: CEFRLevel.complete_beginner,
    description: 'Hello, goodbye, please, thank you, you’re welcome, excuse me.',
    prerequisiteSlugs: [],
    examples: [
      { target: 'Ciao!', native: 'Hi! / Bye!' },
      { target: 'Grazie mille.', native: 'Thank you very much.' },
      { target: 'Prego.', native: 'You’re welcome.' },
    ],
  },
  {
    slug: 'it-vocab-numbers-1-100',
    name: 'Numbers 1-100',
    category: SkillCategory.vocabulary,
    level: CEFRLevel.complete_beginner,
    description: 'Cardinal numbers 1-100, used for prices, dates, ages.',
    prerequisiteSlugs: [],
    examples: [
      { target: 'venti', native: 'twenty' },
      { target: 'cinquantatré', native: 'fifty-three' },
    ],
  },
  {
    slug: 'it-vocab-food-restaurant',
    name: 'Food and ordering at a restaurant',
    category: SkillCategory.vocabulary,
    level: CEFRLevel.beginner,
    description: 'Common Italian foods, menu items, and restaurant phrases.',
    prerequisiteSlugs: ['it-vocab-greetings'],
    examples: [
      { target: 'Vorrei una pizza margherita, per favore.', native: 'I would like a margherita pizza, please.' },
      { target: 'Il conto, per favore.', native: 'The check, please.' },
    ],
  },
  {
    slug: 'it-vocab-directions',
    name: 'Asking for directions',
    category: SkillCategory.vocabulary,
    level: CEFRLevel.beginner,
    description: 'How to ask where things are and understand basic responses.',
    prerequisiteSlugs: ['it-vocab-greetings'],
    examples: [
      { target: 'Dov’è la stazione?', native: 'Where is the station?' },
      { target: 'Sempre dritto.', native: 'Straight ahead.' },
    ],
  },
  // ─── Listening / speaking integration ──────────────────────────────────
  {
    slug: 'it-listening-everyday',
    name: 'Listening: everyday short exchanges',
    category: SkillCategory.listening,
    level: CEFRLevel.beginner,
    description: 'Comprehending short, slow Italian dialogues on familiar topics.',
    prerequisiteSlugs: ['it-vocab-greetings', 'it-essere-present'],
    examples: [],
  },
  {
    slug: 'it-speaking-self-intro',
    name: 'Speaking: introducing yourself',
    category: SkillCategory.speaking,
    level: CEFRLevel.complete_beginner,
    description: 'Saying your name, where you are from, what you do, why you are learning Italian.',
    prerequisiteSlugs: ['it-essere-present', 'it-vocab-greetings'],
    examples: [
      { target: 'Mi chiamo Anthony e sono di New York.', native: 'My name is Anthony and I’m from New York.' },
    ],
  },
  // ─── Culture ───────────────────────────────────────────────────────────
  {
    slug: 'it-culture-formal-vs-informal',
    name: 'Formal vs informal address (tu vs Lei)',
    category: SkillCategory.culture,
    level: CEFRLevel.beginner,
    description:
      'When to use the informal tu and when to use the formal Lei (third-person feminine, capitalized).',
    prerequisiteSlugs: ['it-subject-pronouns'],
    examples: [
      { target: 'Come sta, signor Rossi?', native: 'How are you (formal), Mr. Rossi?' },
      { target: 'Come stai?', native: 'How are you (informal)?' },
    ],
  },
];
