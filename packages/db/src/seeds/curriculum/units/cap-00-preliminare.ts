// Capitolo Preliminare — Buon giorno, Italia!
// Theme: first contact. Greetings, courtesy, the classroom, the sounds and
// alphabet of Italian, numbers 1–100, and the calendar.
//
// This is the GOLDEN EXEMPLAR unit — every other unit file mirrors this shape,
// density, and quality bar. All content original (copyright-safe).

import { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client';
import type { SeedUnit } from '../types';

const unit: SeedUnit = {
  code: 'cap-00',
  order: 0,
  title: 'Buon giorno, Italia!',
  subtitle: 'First words, sounds, and numbers',
  theme: 'culture',
  level: CEFRLevel.complete_beginner,
  summary:
    'Your very first contact with Italian: how to greet people warmly and politely, ' +
    'navigate a classroom, pronounce every letter with confidence, count to a hundred, ' +
    'and talk about days, months, and seasons. This is the foundation everything else stands on.',
  canDo: [
    'Greet someone and say goodbye at the right level of formality',
    'Use core courtesy expressions (please, thank you, excuse me)',
    'Pronounce Italian vowels, the c/g sounds, and double consonants accurately',
    'Spell your name aloud using the Italian alphabet',
    'Count from 0 to 100 and exchange a phone number or price',
    'Say the day, the date, and the season',
    'Introduce yourself: name, origin, and why you are learning Italian',
  ],
  culturalNotes: [
    {
      title: 'Ciao is informal',
      body:
        'Ciao works for both "hi" and "bye", but only with people you would address as tu — ' +
        'friends, family, peers, children. With a stranger, an older person, or in a shop, ' +
        'lead with buongiorno (daytime) or buonasera (evening). Getting this right signals respect.',
    },
    {
      title: 'The hidden h and the missing letters',
      body:
        'Italian uses j, k, w, x, and y almost exclusively in borrowed words (jeans, weekend, taxi). ' +
        'The letter h is always silent — its job is to harden a c or g sound (chi, ghetto), never to be heard.',
    },
    {
      title: 'A coffee, standing up',
      body:
        'Italians usually drink an espresso quickly at the bar counter (al banco). Table service ' +
        'often costs more. Even a first "buongiorno" to the barista is part of the ritual.',
    },
  ],

  // ─── Skills ───────────────────────────────────────────────────────────────
  skills: [
    {
      slug: 'it-vocab-greetings',
      name: 'Greetings and basic courtesy',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.complete_beginner,
      description:
        'The everyday words for hello, goodbye, please, thank you, you’re welcome, and excuse me — ' +
        'the social glue of every Italian interaction.',
      prerequisiteSlugs: [],
      examples: [
        { target: 'Ciao!', native: 'Hi! / Bye!', note: 'informal only' },
        { target: 'Buongiorno, come va?', native: 'Good morning, how’s it going?' },
        { target: 'Grazie mille! — Prego.', native: 'Thank you so much! — You’re welcome.' },
      ],
      commonMistakes: [
        'using ciao with someone who deserves the formal buongiorno/buonasera',
        'confusing prego (you’re welcome / go ahead) with per favore (please)',
        'saying buonanotte as a generic goodbye instead of only at bedtime',
      ],
      recommendedPracticeTypes: [
        TaskType.roleplay,
        TaskType.multiple_choice,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['travel', 'food', 'family', 'business', 'culture'],
      teachingNotes:
        'Anchor each greeting to a time of day and a relationship. Drill the ciao-vs-buongiorno ' +
        'choice with concrete scenes (texting a friend vs entering a pharmacy). Pair every grazie ' +
        'with a prego so the call-and-response becomes automatic.',
    },
    {
      slug: 'it-culture-formal-vs-informal',
      name: 'Formal vs informal address (tu vs Lei)',
      category: SkillCategory.culture,
      level: CEFRLevel.complete_beginner,
      description:
        'Italian has two ways to say "you": informal tu for friends and peers, and formal Lei ' +
        '(capitalized, third-person) for strangers, elders, and professional settings.',
      prerequisiteSlugs: ['it-vocab-greetings'],
      examples: [
        { target: 'Ciao, come stai?', native: 'Hi, how are you? (informal)' },
        { target: 'Buongiorno, come sta?', native: 'Good morning, how are you? (formal)' },
        {
          target: 'Scusi, Lei è il signor Bianchi?',
          native: 'Excuse me, are you Mr. Bianchi? (formal)',
        },
      ],
      commonMistakes: [
        'using tu with a stranger or older person',
        'forgetting that Lei takes third-person singular verb forms (sta, not stai)',
        'mixing scusa (informal) and scusi (formal) with the wrong register',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.roleplay,
        TaskType.error_correction,
      ],
      compatibleThemes: ['business', 'travel', 'culture', 'family'],
      teachingNotes:
        'Teach register as a social radar, not a grammar rule. Contrast minimal pairs ' +
        '(stai/sta, scusa/scusi). Defer the full Lei conjugation logic — here it is recognition + the ' +
        'two fixed question forms come stai / come sta.',
    },
    {
      slug: 'it-classroom-expressions',
      name: 'Classroom language (in classe)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.complete_beginner,
      description:
        'The survival phrases for learning itself: how to say you don’t understand, ask how something ' +
        'is said or spelled, and ask someone to repeat or speak more slowly.',
      prerequisiteSlugs: ['it-vocab-greetings'],
      examples: [
        {
          target: 'Come si dice “homework” in italiano?',
          native: 'How do you say “homework” in Italian?',
        },
        {
          target: 'Non capisco. Può ripetere, per favore?',
          native: 'I don’t understand. Can you repeat, please?',
        },
        { target: 'Come si scrive?', native: 'How do you spell / write it?' },
      ],
      commonMistakes: [
        'saying non so (I don’t know) when meaning non capisco (I don’t understand)',
        'omitting per favore, which makes a request sound blunt',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.speaking_prompt,
        TaskType.roleplay,
      ],
      compatibleThemes: ['culture', 'family', 'business'],
      teachingNotes:
        'Frame these as the learner’s own toolkit for the whole course — phrases they will actually ' +
        'use with Wise. Make “Come si dice…?” feel like a superpower for unlocking any word.',
    },
    {
      slug: 'it-alphabet',
      name: 'The Italian alphabet and spelling aloud',
      category: SkillCategory.pronunciation,
      level: CEFRLevel.complete_beginner,
      description:
        'The 21 native letters plus the five "foreign" letters (j, k, w, x, y). Learn the letter names ' +
        'so you can spell your name and understand spellings given to you.',
      prerequisiteSlugs: [],
      examples: [
        {
          target: 'A, bi, ci, di, e, effe, gi…',
          native: 'a, b, c, d, e, f, g…',
          note: 'letter names',
        },
        { target: 'Mi chiamo Anna: A-doppia enne-A.', native: 'My name is Anna: A-double-N-A.' },
        { target: 'ipsilon / i greca', native: 'the letter y' },
      ],
      commonMistakes: [
        'pronouncing letter names in English (saying "doubleyou" for w instead of "vu doppia")',
        'forgetting "doppia/doppio" when spelling a double consonant aloud',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.speaking_prompt,
        TaskType.multiple_choice,
      ],
      compatibleThemes: ['travel', 'business', 'culture'],
      teachingNotes:
        'Most useful framing: spelling one’s own name and reading a license plate or email aloud. ' +
        'Drill doppia (double) since Italians always spell doubles explicitly.',
    },
    {
      slug: 'it-pronunciation-vowels',
      name: 'Italian vowel sounds',
      category: SkillCategory.pronunciation,
      level: CEFRLevel.complete_beginner,
      description:
        'The five Italian vowels — a, e, i, o, u — are pure and crisp, pronounced the same way every ' +
        'time, with no gliding or reduction the way English vowels blur.',
      prerequisiteSlugs: [],
      examples: [
        { target: 'casa', native: 'house', note: 'clear "ah"' },
        { target: 'vino', native: 'wine', note: 'pure "ee"' },
        { target: 'uno, due, tre', native: 'one, two, three', note: 'each vowel fully voiced' },
      ],
      commonMistakes: [
        'diphthongizing vowels the English way (turning "o" into "ow")',
        'reducing unstressed vowels to a schwa ("uh")',
        'swallowing the final vowel of a word',
      ],
      recommendedPracticeTypes: [TaskType.speaking_prompt, TaskType.listening_comprehension],
      compatibleThemes: ['music', 'food', 'travel'],
      teachingNotes:
        'Sing the vowels. The #1 accent fix for English speakers is keeping every vowel pure and giving ' +
        'the final vowel its full value (CA-sa, not "cahs"). Use minimal contrasts with English.',
    },
    {
      slug: 'it-pronunciation-c-g',
      name: 'Hard vs soft c and g (and the h that hardens)',
      category: SkillCategory.pronunciation,
      level: CEFRLevel.complete_beginner,
      description:
        'c and g are "soft" (ch/j sounds) before e or i, and "hard" (k/g sounds) before a, o, u — or ' +
        'when an h is inserted (che, ghi) to force the hard sound.',
      prerequisiteSlugs: ['it-pronunciation-vowels'],
      examples: [
        { target: 'ciao / cena', native: '"chow" / "cheh-na"', note: 'soft c before i, e' },
        { target: 'casa / amico', native: '"kah-za" / "ah-mee-ko"', note: 'hard c before a, o' },
        { target: 'spaghetti', native: 'the h keeps the g hard before i' },
      ],
      commonMistakes: [
        'reading "ci" as "see" instead of "chee"',
        'pronouncing the h in che/ghi as a separate sound',
        'making "gi" a hard g (it is the soft "j" sound: gelato = "jeh-lato")',
      ],
      recommendedPracticeTypes: [
        TaskType.multiple_choice,
        TaskType.speaking_prompt,
        TaskType.listening_comprehension,
      ],
      compatibleThemes: ['food', 'music', 'travel'],
      teachingNotes:
        'Use food words the learner already knows (ciao, cappuccino, gelato, spaghetti, gnocchi) as the ' +
        'pronunciation lab. The rule "e/i = soft, a/o/u = hard, h = hardener" covers nearly everything.',
    },
    {
      slug: 'it-pronunciation-digraphs',
      name: 'The special clusters: gli, gn, sc',
      category: SkillCategory.pronunciation,
      level: CEFRLevel.complete_beginner,
      description:
        'Three sound clusters with no English equivalent: gli (like "lli" in million), gn (like "ny" ' +
        'in canyon), and sc before e/i (a "sh" sound).',
      prerequisiteSlugs: ['it-pronunciation-c-g'],
      examples: [
        { target: 'famiglia', native: 'family', note: 'gli = "lyee"' },
        { target: 'gnocchi', native: 'gnocchi', note: 'gn = "ny"' },
        { target: 'pesce / sciare', native: 'fish / to ski', note: 'sc before e/i = "sh"' },
      ],
      commonMistakes: [
        'pronouncing the g in gli or gn as a hard g',
        'reading sc as "sk" before e/i (pesce is "pe-sheh", not "pe-skeh")',
      ],
      recommendedPracticeTypes: [
        TaskType.speaking_prompt,
        TaskType.listening_comprehension,
        TaskType.multiple_choice,
      ],
      compatibleThemes: ['food', 'sports', 'travel'],
      teachingNotes:
        'These three are the signature "you sound Italian now" sounds. Drill with high-frequency words ' +
        '(famiglia, gnocchi, pesce, scii). Contrast sc-hard (scuola "sk") vs sc-soft (sci "sh").',
    },
    {
      slug: 'it-pronunciation-double-consonants',
      name: 'Double consonants',
      category: SkillCategory.pronunciation,
      level: CEFRLevel.complete_beginner,
      description:
        'A doubled consonant is held noticeably longer than a single one — and the difference changes ' +
        'the meaning of the word, so it is not optional.',
      prerequisiteSlugs: ['it-pronunciation-vowels'],
      examples: [
        { target: 'pala vs palla', native: 'shovel vs ball' },
        { target: 'capello vs cappello', native: 'hair vs hat' },
        { target: 'sete vs sette', native: 'thirst vs seven' },
      ],
      commonMistakes: [
        'glossing over the double, collapsing two different words into one',
        'over-lengthening the vowel before a double instead of lengthening the consonant',
      ],
      recommendedPracticeTypes: [
        TaskType.listening_comprehension,
        TaskType.speaking_prompt,
        TaskType.multiple_choice,
      ],
      compatibleThemes: ['food', 'travel', 'culture'],
      teachingNotes:
        'Teach with minimal pairs and a tiny pause/hold on the consonant. Listening discrimination first ' +
        '(which word did you hear?), then production. High stakes: nonno (grandfather) vs nono (ninth).',
    },
    {
      slug: 'it-pronunciation-stress',
      name: 'Word stress and written accents',
      category: SkillCategory.pronunciation,
      level: CEFRLevel.complete_beginner,
      description:
        'Most Italian words stress the second-to-last syllable. A written accent (città, perché) marks ' +
        'stress on the final vowel and must be kept.',
      prerequisiteSlugs: ['it-pronunciation-vowels'],
      examples: [
        { target: 'aMIco, aMOre', native: 'friend, love', note: 'regular penultimate stress' },
        {
          target: 'città, università',
          native: 'city, university',
          note: 'final-syllable stress (accent)',
        },
        { target: 'È vs e', native: '"is" vs "and"', note: 'the accent distinguishes meaning' },
      ],
      commonMistakes: [
        'dropping the written accent (caffe instead of caffè)',
        'misplacing stress on irregular words (it is "TElefono", not "teLEfono")',
      ],
      recommendedPracticeTypes: [
        TaskType.speaking_prompt,
        TaskType.fill_blank,
        TaskType.multiple_choice,
      ],
      compatibleThemes: ['travel', 'culture', 'music'],
      teachingNotes:
        'Default rule: stress the penultimate syllable; trust the written accent when present. Flag the ' +
        'è/e and dà/da pairs where the accent is the only difference in meaning.',
    },
    {
      slug: 'it-vocab-numbers-1-100',
      name: 'Numbers 0–100',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.complete_beginner,
      description:
        'Cardinal numbers from zero to one hundred — for prices, ages, phone numbers, addresses, and ' +
        'quantities. The teens and the tens-plus-ones patterns are the part worth drilling.',
      prerequisiteSlugs: [],
      examples: [
        { target: 'zero, uno, due, tre, quattro, cinque', native: '0–5' },
        {
          target: 'ventuno, ventotto',
          native: '21, 28',
          note: 'venti drops its final vowel before uno/otto',
        },
        {
          target: 'Quanto costa? — Sette euro e cinquanta.',
          native: 'How much is it? — Seven fifty.',
        },
      ],
      commonMistakes: [
        'keeping the vowel in venti/trenta before uno/otto (it is ventuno, not "ventiuno")',
        'confusing the teens (quattordici/sedici) ordering',
        'mixing up cento (100) with cinque/cinquanta',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.speaking_prompt,
        TaskType.listening_comprehension,
      ],
      compatibleThemes: ['food', 'travel', 'business', 'sports'],
      teachingNotes:
        'Drill in real contexts: prices at a bar, a phone number, a jersey number, an age. The vowel-drop ' +
        'rule (ventuno, trentotto) and the teens are the two friction points — target them directly.',
    },
    {
      slug: 'it-calendar-days-months',
      name: 'Days, months, dates, and seasons',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.complete_beginner,
      description:
        'The seven days, twelve months, the four seasons, and how to give a date. Days and months are ' +
        'lowercase in Italian, and dates use cardinal numbers (except the first).',
      prerequisiteSlugs: ['it-vocab-numbers-1-100'],
      examples: [
        {
          target: 'lunedì, martedì, mercoledì…',
          native: 'Monday, Tuesday, Wednesday…',
          note: 'lowercase!',
        },
        {
          target: 'il primo maggio',
          native: 'May 1st',
          note: 'primo for the 1st; cardinals otherwise',
        },
        { target: 'il quindici agosto', native: 'August 15th' },
      ],
      commonMistakes: [
        'capitalizing days/months the English way',
        'using an ordinal for dates other than the first (it is "il due marzo", not "il secondo marzo")',
        'forgetting the article: "il" + number + month',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['travel', 'family', 'culture', 'business'],
      teachingNotes:
        'Connect to real planning: a birthday, a holiday (Ferragosto, Capodanno), a trip date. Reinforce ' +
        'lowercase and the cardinal-date rule, which surprise English speakers.',
    },
    {
      slug: 'it-speaking-self-intro',
      name: 'Introducing yourself',
      category: SkillCategory.speaking,
      level: CEFRLevel.complete_beginner,
      description:
        'Stitch the first words together into a real self-introduction: your name, where you’re from, ' +
        'and why you’re learning Italian — your first complete spoken exchange.',
      prerequisiteSlugs: ['it-vocab-greetings', 'it-pronunciation-vowels'],
      examples: [
        { target: 'Ciao, mi chiamo Anthony.', native: 'Hi, my name is Anthony.' },
        { target: 'Sono di New York. E tu?', native: 'I’m from New York. And you?' },
        {
          target: 'Studio italiano per viaggiare in Italia.',
          native: 'I’m studying Italian to travel in Italy.',
        },
      ],
      commonMistakes: [
        'saying "il mio nome è" (calque of English) instead of the natural "mi chiamo"',
        'forgetting to bounce the question back with "E tu?"',
      ],
      recommendedPracticeTypes: [TaskType.speaking_prompt, TaskType.roleplay, TaskType.reflection],
      compatibleThemes: ['travel', 'family', 'business', 'culture'],
      teachingNotes:
        'This is the learner’s first taste of real conversation — make it about THEM (their real name, ' +
        'city, and motivation). Keep "mi chiamo / sono di / studio italiano per…" as a reusable frame.',
    },
  ],

  // ─── Lesson templates ─────────────────────────────────────────────────────
  lessonTemplates: [
    {
      slug: 'cap00-first-hello',
      title: 'Your first hello',
      lessonType: LessonType.scenario_roleplay,
      level: CEFRLevel.complete_beginner,
      summary:
        'Walk into three Italian scenes — a café, a friend’s text, a pharmacy — and greet each person ' +
        'at the right level of formality.',
      objectiveSkillSlugs: ['it-vocab-greetings', 'it-culture-formal-vs-informal'],
      defaultDurationMinutes: 8,
      compatibleThemes: ['travel', 'food', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Set the scene and the goal',
          prompt:
            'Today you’ll greet three different people. The trick is matching the greeting to who they are.',
          notes:
            'Warm, 1–2 sentences. Theme the three people to the learner’s interest if possible.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Choose ciao vs buongiorno by relationship',
          prompt: 'You walk into a pharmacy. How do you greet the pharmacist?',
          exampleAnswer: 'Buongiorno',
          notes: 'Three options: Ciao / Buongiorno / Buonanotte. Explain why the formal one wins.',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'Greet + courtesy exchange at a café',
          prompt: 'Order a coffee: greet the barista, say please, and thank them.',
          exampleAnswer: 'Buongiorno! Un caffè, per favore. … Grazie! — Prego.',
          notes:
            'Personalize the order to the learner (cappuccino, tè…). Reward the grazie→prego loop.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Produce a goodbye at the right register',
          prompt: 'Say goodbye to a friend, then to the pharmacist.',
          exampleAnswer: 'Ciao! / Arrivederci!',
        },
        {
          taskType: TaskType.recap,
          focus: 'Lock in the ciao-vs-buongiorno rule',
          prompt: 'When is ciao the wrong choice?',
          notes: 'One-line takeaway the learner can repeat.',
        },
      ],
    },
    {
      slug: 'cap00-sounds-of-italian',
      title: 'The sounds of Italian',
      lessonType: LessonType.speaking_challenge,
      level: CEFRLevel.complete_beginner,
      summary:
        'A guided pronunciation lab using words you already half-know — ciao, gnocchi, spaghetti — to ' +
        'master vowels, the c/g rule, and the gli/gn/sc clusters.',
      objectiveSkillSlugs: [
        'it-pronunciation-vowels',
        'it-pronunciation-c-g',
        'it-pronunciation-digraphs',
      ],
      defaultDurationMinutes: 10,
      compatibleThemes: ['food', 'music', 'travel'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'The pure vowels',
          prompt: 'Five vowels, five clear sounds, every time. Listen and echo: a, e, i, o, u.',
          notes: 'Keep it tactile — contrast with how English blurs vowels.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Hard vs soft c',
          prompt: 'Which word has the "ch" sound: casa or ciao?',
          exampleAnswer: 'ciao',
          notes: 'Reinforce e/i = soft, a/o/u = hard.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Produce the gli/gn/sc clusters',
          prompt: 'Say: famiglia, gnocchi, pesce.',
          notes: 'Give immediate, specific feedback on the cluster, not the whole word.',
        },
        {
          taskType: TaskType.listening_comprehension,
          focus: 'Double-consonant discrimination',
          prompt: 'Which did you hear — pala or palla?',
          notes: 'Short A/B audio. This is recognition before production.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Self-assess the trickiest sound',
          prompt: 'Which sound do you want more reps on?',
        },
      ],
    },
    {
      slug: 'cap00-numbers-in-the-wild',
      title: 'Numbers in the wild',
      lessonType: LessonType.vocabulary_review,
      level: CEFRLevel.complete_beginner,
      summary:
        'Use 0–100 where they actually show up: a price at the bar, a phone number, an age, a jersey ' +
        'number. Lock in the ventuno / trentotto vowel-drop.',
      objectiveSkillSlugs: ['it-vocab-numbers-1-100'],
      defaultDurationMinutes: 8,
      compatibleThemes: ['food', 'travel', 'sports', 'business'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Why numbers first',
          prompt: 'Prices, ages, phone numbers — numbers unlock daily life.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Spell a tens+ones number',
          prompt: 'Write 28 in words.',
          exampleAnswer: 'ventotto',
          notes: 'Probe the vowel-drop directly.',
        },
        {
          taskType: TaskType.listening_comprehension,
          focus: 'Catch a price',
          prompt: 'How much was the coffee?',
          notes:
            'Audio: “Sono due euro e cinquanta.” Personalize the item to the learner’s interest.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Say a real number aloud',
          prompt: 'Say your age, or a year that matters to you, in Italian.',
        },
        {
          taskType: TaskType.recap,
          focus: 'The vowel-drop rule',
          prompt: 'Why is it ventuno and not “ventiuno”?',
        },
      ],
    },
    {
      slug: 'cap00-tell-me-about-you',
      title: 'Tell me about you',
      lessonType: LessonType.speaking_challenge,
      level: CEFRLevel.complete_beginner,
      summary:
        'Put it all together into your first real self-introduction: name, origin, and why you’re ' +
        'learning Italian — then ask it back.',
      objectiveSkillSlugs: ['it-speaking-self-intro', 'it-vocab-greetings'],
      defaultDurationMinutes: 9,
      compatibleThemes: ['travel', 'family', 'business', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Goal: a 3-sentence intro',
          prompt: 'By the end you’ll introduce yourself out loud, unscripted.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'The mi chiamo frame',
          prompt: 'Complete: “Ciao, ___ chiamo …”',
          exampleAnswer: 'mi',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Produce name + origin',
          prompt: 'Say your name and where you’re from.',
          exampleAnswer: 'Mi chiamo … e sono di …',
          notes: 'Use the learner’s real name and city from their profile.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Say your why',
          prompt: 'Say one reason you’re learning Italian.',
          notes:
            'Pull the learner’s real motivation from memory/profile (travel, family roots, food…).',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'Bounce the question back',
          prompt: 'Introduce yourself, then ask the other person about themselves.',
          exampleAnswer: '…E tu? Come ti chiami?',
        },
        {
          taskType: TaskType.reflection,
          focus: 'Notice the win',
          prompt: 'You just held your first Italian exchange. How did it feel?',
        },
      ],
    },
  ],

  // ─── Thematic vocabulary bank ─────────────────────────────────────────────
  vocabulary: [
    // Greetings & courtesy
    {
      slug: 'cap00-ciao',
      targetText: 'ciao',
      nativeText: 'hi / bye',
      partOfSpeech: 'interj',
      theme: 'saluti',
      register: 'informal',
      exampleSentence: 'Ciao, come stai?',
      exampleTranslation: 'Hi, how are you?',
    },
    {
      slug: 'cap00-buongiorno',
      targetText: 'buongiorno',
      nativeText: 'good morning / hello',
      partOfSpeech: 'interj',
      theme: 'saluti',
      register: 'neutral',
      exampleSentence: 'Buongiorno, signora.',
      exampleTranslation: 'Good morning, ma’am.',
    },
    {
      slug: 'cap00-buonasera',
      targetText: 'buonasera',
      nativeText: 'good evening',
      partOfSpeech: 'interj',
      theme: 'saluti',
      register: 'neutral',
    },
    {
      slug: 'cap00-buonanotte',
      targetText: 'buonanotte',
      nativeText: 'good night',
      partOfSpeech: 'interj',
      theme: 'saluti',
      register: 'neutral',
      exampleSentence: 'Buonanotte, a domani!',
      exampleTranslation: 'Good night, see you tomorrow!',
    },
    {
      slug: 'cap00-arrivederci',
      targetText: 'arrivederci',
      nativeText: 'goodbye',
      partOfSpeech: 'interj',
      theme: 'saluti',
      register: 'neutral',
    },
    {
      slug: 'cap00-salve',
      targetText: 'salve',
      nativeText: 'hello (neutral)',
      partOfSpeech: 'interj',
      theme: 'saluti',
      register: 'neutral',
    },
    {
      slug: 'cap00-per-favore',
      targetText: 'per favore',
      nativeText: 'please',
      partOfSpeech: 'phrase',
      theme: 'cortesia',
      register: 'neutral',
    },
    {
      slug: 'cap00-grazie',
      targetText: 'grazie',
      nativeText: 'thank you',
      partOfSpeech: 'interj',
      theme: 'cortesia',
      register: 'neutral',
      exampleSentence: 'Grazie mille!',
      exampleTranslation: 'Thanks a lot!',
    },
    {
      slug: 'cap00-prego',
      targetText: 'prego',
      nativeText: 'you’re welcome / go ahead',
      partOfSpeech: 'interj',
      theme: 'cortesia',
      register: 'neutral',
    },
    {
      slug: 'cap00-scusi',
      targetText: 'scusi',
      nativeText: 'excuse me (formal)',
      partOfSpeech: 'phrase',
      theme: 'cortesia',
      register: 'formal',
    },
    {
      slug: 'cap00-scusa',
      targetText: 'scusa',
      nativeText: 'excuse me / sorry (informal)',
      partOfSpeech: 'phrase',
      theme: 'cortesia',
      register: 'informal',
    },
    {
      slug: 'cap00-mi-dispiace',
      targetText: 'mi dispiace',
      nativeText: 'I’m sorry',
      partOfSpeech: 'phrase',
      theme: 'cortesia',
      register: 'neutral',
    },
    // Classroom
    {
      slug: 'cap00-la-lezione',
      targetText: 'la lezione',
      nativeText: 'the lesson / class',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'in-classe',
    },
    {
      slug: 'cap00-il-libro',
      targetText: 'il libro',
      nativeText: 'the book',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'in-classe',
    },
    {
      slug: 'cap00-la-penna',
      targetText: 'la penna',
      nativeText: 'the pen',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'in-classe',
    },
    {
      slug: 'cap00-la-domanda',
      targetText: 'la domanda',
      nativeText: 'the question',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'in-classe',
    },
    {
      slug: 'cap00-la-risposta',
      targetText: 'la risposta',
      nativeText: 'the answer',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'in-classe',
    },
    {
      slug: 'cap00-non-capisco',
      targetText: 'non capisco',
      nativeText: 'I don’t understand',
      partOfSpeech: 'phrase',
      theme: 'in-classe',
      exampleSentence: 'Non capisco, può ripetere?',
      exampleTranslation: 'I don’t understand, can you repeat?',
    },
    {
      slug: 'cap00-come-si-dice',
      targetText: 'come si dice…?',
      nativeText: 'how do you say…?',
      partOfSpeech: 'phrase',
      theme: 'in-classe',
    },
    // Calendar
    {
      slug: 'cap00-oggi',
      targetText: 'oggi',
      nativeText: 'today',
      partOfSpeech: 'adv',
      theme: 'calendario',
    },
    {
      slug: 'cap00-domani',
      targetText: 'domani',
      nativeText: 'tomorrow',
      partOfSpeech: 'adv',
      theme: 'calendario',
    },
    {
      slug: 'cap00-ieri',
      targetText: 'ieri',
      nativeText: 'yesterday',
      partOfSpeech: 'adv',
      theme: 'calendario',
    },
    {
      slug: 'cap00-la-settimana',
      targetText: 'la settimana',
      nativeText: 'the week',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'calendario',
    },
    {
      slug: 'cap00-il-mese',
      targetText: 'il mese',
      nativeText: 'the month',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'calendario',
    },
    {
      slug: 'cap00-la-primavera',
      targetText: 'la primavera',
      nativeText: 'spring',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'stagioni',
    },
    {
      slug: 'cap00-lestate',
      targetText: 'l’estate',
      nativeText: 'summer',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'stagioni',
    },
    {
      slug: 'cap00-lautunno',
      targetText: 'l’autunno',
      nativeText: 'autumn',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'stagioni',
    },
    {
      slug: 'cap00-linverno',
      targetText: 'l’inverno',
      nativeText: 'winter',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'stagioni',
    },
  ],
};

export default unit;
