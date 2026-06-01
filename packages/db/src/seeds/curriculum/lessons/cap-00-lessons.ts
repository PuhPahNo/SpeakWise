// Additional lesson templates for Capitolo 0 — Buon giorno, Italia!
//
// These EXTEND the four templates authored inline in units/cap-00-preliminare.ts
// (the index merges both). Each cap-00 skill gets its own focused drill, plus a
// cross-skill error clinic, two distinct scenario roleplays, a listening
// challenge, a speaking challenge, a fresh vocabulary review, and a chapter
// checkpoint.
//
// Rules mirror SPEC.md: original content; every in-string apostrophe is the
// curly ' (U+2019); slugs are globally unique and must not collide with the
// four inline template slugs: cap00-first-hello, cap00-sounds-of-italian,
// cap00-numbers-in-the-wild, cap00-tell-me-about-you.

import { CEFRLevel, LessonType, TaskType } from '@prisma/client';
import type { SeedLessonTemplate } from '../types';

export const unitCode = 'cap-00';

const lessons: SeedLessonTemplate[] = [
  // ── 1. Focused: vowel lab ──────────────────────────────────────────────────
  {
    slug: 'cap00-vowel-lab',
    title: 'Vowel lab: a, e, i, o, u — pure every time',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.complete_beginner,
    summary:
      'A close-focus drill on the five Italian vowels — keeping each one crisp and steady, ' +
      'never sliding the way English vowels do. Build the muscle memory that gives you an Italian accent.',
    objectiveSkillSlugs: ['it-pronunciation-vowels'],
    defaultDurationMinutes: 7,
    compatibleThemes: ['music', 'food', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Why Italian vowels sound different',
        prompt:
          'English vowels glide and blur — "no" is really "now-oo". Italian vowels hold one clean sound ' +
          'from start to finish. Say "a" like the "a" in "father", never "ay".',
        notes: 'Keep it short: one contrast pair is enough before we drill.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Echo each vowel in isolation',
        prompt: 'Repeat after me, holding each sound for a full beat: a … e … i … o … u.',
        notes: 'Give feedback on any vowel that slides; celebrate the ones that stay pure.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Vowels inside words',
        prompt: 'Say these words, letting every vowel land cleanly: casa, vino, sole, bene, uno.',
        exampleAnswer: 'KAH-za, VEE-noh, SOH-leh, BEH-neh, OO-noh',
        notes: 'Model the phonetics; ask the learner to match the final vowel especially.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Spot the vowel error',
        prompt:
          'A learner says "KAY-za" for casa. Which mistake are they making? ' +
          'A) Diphthonging the "a" — B) Swallowing the final vowel — C) Using the wrong stress',
        exampleAnswer: 'A) Diphthonging the "a"',
      },
      {
        taskType: TaskType.recap,
        focus: 'The one-line rule',
        prompt: 'Finish this sentence: Italian vowels are ___.',
        exampleAnswer: 'pure — one sound each, every time',
      },
    ],
  },

  // ── 2. Focused: c/g lab ───────────────────────────────────────────────────
  {
    slug: 'cap00-c-g-hard-soft-lab',
    title: 'Hard vs soft c and g — the e/i trigger',
    lessonType: LessonType.grammar,
    level: CEFRLevel.complete_beginner,
    summary:
      'Master the rule that makes ciao sound like "chow" but casa like "kaza" — then see how ' +
      'the silent h overrides it. Drill with food words you already half-know.',
    objectiveSkillSlugs: ['it-pronunciation-c-g'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['food', 'travel', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The e/i soft trigger',
        prompt:
          'Before e or i: c = "ch" (cena = "chena"), g = "j" (gelato = "jelato"). ' +
          'Before a, o, u: c = "k" (casa), g = hard g (gatto). ' +
          'Add an h to force the hard sound even before e/i: che = "ke", spaghetti = "spa-GETTI".',
        notes:
          'Write the rule as a 3-column table in the learner’s mind: vowel → c sound → g sound.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Classify the c sound',
        prompt: 'In the word "cappuccino", the first c is ___.',
        exampleAnswer: 'hard (k) — before a',
        notes: 'Offer: hard (k) / soft (ch) / silent. Three choices.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Classify the g sound',
        prompt:
          'In "gnocchi" the gn cluster gives a "ny" sound — but in "spaghetti" the gh keeps the g ___.',
        exampleAnswer: 'hard',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Produce a minimal pair',
        prompt: 'Say both words and feel the difference: cena ("chena") — casa ("kaza").',
        notes: 'Listen for the soft vs hard distinction; give targeted feedback.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Apply the rule in writing',
        prompt: 'To write the "k" sound before "e" in Italian you need to add the letter ___.',
        exampleAnswer: 'h (e.g. che)',
      },
      {
        taskType: TaskType.recap,
        focus: 'Rule summary',
        prompt: 'Which vowels trigger a soft c/g? Which ones keep it hard?',
        exampleAnswer: 'e and i → soft; a, o, u → hard',
      },
    ],
  },

  // ── 3. Focused: gli/gn/sc lab ─────────────────────────────────────────────
  {
    slug: 'cap00-digraphs-lab',
    title: 'gli, gn, sc — the three Italian signatures',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.complete_beginner,
    summary:
      'The three letter clusters that have no English equivalent — and that instantly mark your ' +
      'speech as Italian when you nail them. Drill famiglia, gnocchi, and pesce until they ' +
      'feel natural.',
    objectiveSkillSlugs: ['it-pronunciation-digraphs'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['food', 'travel', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Why these matter',
        prompt:
          'Gli, gn, and sc before e/i are the three sounds that most mark Italian. ' +
          'Get these right and you sound unmistakably Italian. Let’s do them one at a time.',
        notes: 'Frame as an achievement milestone, not a hurdle.',
      },
      {
        taskType: TaskType.explanation,
        focus: 'The three sounds',
        prompt:
          'gli = like "lli" in "million" (famiglia = fah-MEE-lyah). ' +
          'gn = like "ny" in "canyon" (gnocchi = NYOH-kee). ' +
          'sc before e/i = "sh" (pesce = PEH-sheh; sciare = SHAH-reh).',
        notes: 'One English analogy per cluster. Keep it brief.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Drill gli',
        prompt: 'Say slowly: fa-MI-glia. Now faster: famiglia.',
        notes: 'If the learner says "fah-MEE-lee-ah", coach the ll → ly glide.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Drill gn and sc',
        prompt: 'Say: gnocchi, poi pesce.',
        exampleAnswer: 'NYOH-kee, PEH-sheh',
        notes: 'Praise the ny and sh; correct any hard-g or sk reading.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Distinguish sc-hard vs sc-soft',
        prompt: 'In "scuola" (school), the sc sounds like ___.',
        exampleAnswer: '"sk" — the u keeps it hard',
        notes: 'Offer: "sk" (scuola) / "sh" (pesce). Reinforce that e/i trigger the sh.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Rate yourself',
        prompt: "Which of the three clusters still feels awkward? That's the one to revisit.",
      },
    ],
  },

  // ── 4. Focused: double-consonants lab ─────────────────────────────────────
  {
    slug: 'cap00-double-consonants-lab',
    title: 'Doppia consonante — when length changes meaning',
    lessonType: LessonType.listening_challenge,
    level: CEFRLevel.complete_beginner,
    summary:
      'Double consonants are meaning-changing in Italian. Train your ear to hear the difference ' +
      'between pala and palla, then train your mouth to hold that consonant a beat longer.',
    objectiveSkillSlugs: ['it-pronunciation-double-consonants'],
    defaultDurationMinutes: 7,
    compatibleThemes: ['culture', 'food', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Length = meaning',
        prompt:
          'capello (hair) vs cappello (hat). sete (thirst) vs sette (seven). ' +
          'The only difference is how long you hold the consonant — so it matters.',
        notes:
          'Stress the semantic stakes: mispronouncing nonno as nono means ninth, not grandfather.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Hear the single vs double',
        prompt: 'Listen to both words. Which is the double-consonant one — A or B?',
        exampleAnswer: 'B (the held consonant)',
        notes:
          'Script: minimal pair A = "capello", B = "cappello". Engine plays both with a clear pause.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Choose the right spelling',
        prompt: 'You want to say "hat". Which spelling is correct?',
        exampleAnswer: 'cappello',
        notes: 'Offer: capello / cappello. Tie back to the listening.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Produce the hold',
        prompt: 'Say capello then cappello. Make the second one noticeably longer on the p.',
        notes: 'Give specific feedback: "the hold needs to be about twice as long."',
      },
      {
        taskType: TaskType.recap,
        focus: 'The trick',
        prompt: 'When you see a double consonant, what do you do differently?',
        exampleAnswer: 'Hold the consonant a full extra beat before releasing it.',
      },
    ],
  },

  // ── 5. Focused: numbers 0–100 drill ───────────────────────────────────────
  {
    slug: 'cap00-numbers-speed-drill',
    title: 'Numbers speed drill: teens, tens, and the vowel-drop',
    lessonType: LessonType.vocabulary_review,
    level: CEFRLevel.complete_beginner,
    summary:
      'A fast-paced drill targeting the two friction zones: the teens (tredici through diciannove) ' +
      "and the vowel-drop rule (ventuno, trentotto). Say numbers before you think — that's fluency.",
    objectiveSkillSlugs: ['it-vocab-numbers-1-100'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['travel', 'business', 'sports', 'food'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Two zones to nail',
        prompt:
          'Most numbers are easy. Two zones trip people up: the teens and the vowel-drop (ventuno, ' +
          'not "ventiuno"). We’ll drill both until they’re automatic.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'The teens in order',
        prompt:
          'Fill in the gaps: undici, dodici, ___, quattordici, quindici, sedici, ___, diciotto, diciannove.',
        exampleAnswer: 'tredici … diciassette',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Vowel-drop with uno and otto',
        prompt: 'Write in words: 21 = ___, 28 = ___, 31 = ___, 38 = ___.',
        exampleAnswer: 'ventuno, ventotto, trentuno, trentotto',
        notes: 'Probe all four vowel-drop cases.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Say a price aloud',
        prompt: 'A menu says €14,50. Say the price in Italian.',
        exampleAnswer: 'quattordici euro e cinquanta',
        notes:
          "Personalize with a real item from the learner's interest (food, sports ticket, etc.).",
      },
      {
        taskType: TaskType.recap,
        focus: 'The vowel-drop rule in words',
        prompt: 'Complete: venti drops its final vowel only before ___ and ___.',
        exampleAnswer: 'uno and otto',
      },
    ],
  },

  // ── 6. Focused: calendar drill ────────────────────────────────────────────
  {
    slug: 'cap00-calendar-drill',
    title: 'Calendar drill: days, months, and how to give a date',
    lessonType: LessonType.vocabulary_review,
    level: CEFRLevel.complete_beginner,
    summary:
      'Internalize the days and months, lock in the lowercase rule, and practice the Italian date ' +
      'formula — il + number + month — with real dates that matter to you.',
    objectiveSkillSlugs: ['it-calendar-days-months'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['travel', 'family', 'culture', 'business'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Three things that surprise English speakers',
        prompt:
          'Italian days and months are always lowercase (lunedì, gennaio). ' +
          'Dates use cardinal numbers except for the first (il primo). ' +
          'The formula is: il + number + month (il tre maggio = May 3rd).',
        notes: 'Highlight the three surprises explicitly — they are the most common errors.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Days in sequence',
        prompt: 'Fill in the gaps: lunedì, martedì, ___, giovedì, ___, sabato, domenica.',
        exampleAnswer: 'mercoledì … venerdì',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Correct date formula',
        prompt: 'How do you say "January 5th" in Italian?',
        exampleAnswer: 'il cinque gennaio',
        notes: 'Offer: il cinque gennaio / il quinto gennaio / cinque di gennaio.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Say a real date',
        prompt: 'Say your birthday in Italian.',
        notes:
          "Pull the learner's birthday from their profile if available; otherwise let them use any date.",
      },
      {
        taskType: TaskType.recap,
        focus: 'Capitalize or not?',
        prompt: 'Which are lowercase in Italian — days, months, or both?',
        exampleAnswer: 'Both — days and months are always lowercase in Italian.',
      },
    ],
  },

  // ── 7. Error-correction clinic ────────────────────────────────────────────
  {
    slug: 'cap00-error-clinic',
    title: 'Beginner error clinic: the classic cap-00 slip-ups',
    lessonType: LessonType.grammar,
    level: CEFRLevel.complete_beginner,
    summary:
      'A targeted clinic on the mistakes every English speaker makes in the first chapter: ' +
      'ciao-vs-buongiorno register, ventuno vowel-drop, date ordinals, and stress on caffè.',
    objectiveSkillSlugs: [
      'it-vocab-greetings',
      'it-culture-formal-vs-informal',
      'it-vocab-numbers-1-100',
      'it-calendar-days-months',
      'it-pronunciation-stress',
    ],
    defaultDurationMinutes: 10,
    compatibleThemes: ['culture', 'travel', 'food', 'business'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Frame it as a clinic, not a test',
        prompt:
          'Every learner makes the same handful of mistakes in chapter one. ' +
          'Let’s name them, fix them, and move on — no pressure.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Wrong register: ciao to a stranger',
        prompt: 'Fix: You walk into a pharmacy and say "Ciao, mi dà un antidolorifico."',
        exampleAnswer: 'Buongiorno, mi dà un antidolorifico.',
        notes: 'Explain: ciao is reserved for tu-relationships; a pharmacist gets buongiorno.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Vowel-drop miss',
        prompt: 'Fix the number: ventiuno → ___. Trenta + uno → ___.',
        exampleAnswer: 'ventuno … trentuno',
        notes: 'The hyphen and the extra vowel are the two forms of the same error.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Ordinal instead of cardinal for dates',
        prompt: 'Fix: Oggi è il secondo marzo.',
        exampleAnswer: 'Oggi è il due marzo.',
        notes: 'Only il primo is correct; all other dates use cardinals.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Missing accent on stressed final syllable',
        prompt: 'Fix the spelling and stress: "Prendo un caffe, grazie."',
        exampleAnswer: 'Prendo un caffè, grazie.',
        notes: 'Without the accent the word is misspelled and the stress sounds wrong.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Which error do you want to watch for?',
        prompt: 'Of these four mistakes, which one is most likely to catch you off guard?',
      },
    ],
  },

  // ── 8. Scenario roleplay: meeting a neighbor ──────────────────────────────
  {
    slug: 'cap00-roleplay-neighbor',
    title: 'Meet your new neighbor',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.complete_beginner,
    summary:
      'Your new Italian neighbor knocks on the door. Greet them at the right formality level, ' +
      'exchange names, say where you’re from, and arrange to meet again — a natural first-contact ' +
      'conversation outside the classroom.',
    objectiveSkillSlugs: [
      'it-vocab-greetings',
      'it-culture-formal-vs-informal',
      'it-speaking-self-intro',
    ],
    defaultDurationMinutes: 9,
    compatibleThemes: ['family', 'culture', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'There’s a knock at the door. It’s your new neighbor — an Italian-speaker your own age. ' +
          'This is a peer, so ciao is fine. Let’s see how the conversation flows.',
        notes: 'Keep the register informal since they are peers.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Open the door + greet',
        prompt: 'Answer the door and say hello.',
        exampleAnswer: 'Ciao! Benvenuto/a!',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Exchange names',
        prompt: 'Introduce yourself and ask their name.',
        exampleAnswer: 'Mi chiamo … E tu, come ti chiami?',
        notes: 'Use the learner’s actual name from their profile.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Say where you are from',
        prompt: 'Tell your neighbor where you are from.',
        exampleAnswer: 'Sono di New York.',
        notes: 'Personalize to the learner’s real city.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Close the conversation gracefully',
        prompt: 'Say you’re happy to meet them and say goodbye.',
        exampleAnswer: 'Piacere! A presto.',
      },
    ],
  },

  // ── 9. Scenario roleplay: spelling your name on the phone ─────────────────
  {
    slug: 'cap00-roleplay-spell-name-phone',
    title: 'Spelling your name on the phone',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.complete_beginner,
    summary:
      'A hotel receptionist asks you to spell your name over the phone. Use the Italian alphabet, ' +
      'say "doppia" for any double letter, and confirm the spelling at the end — a real-world skill ' +
      'you will need from day one.',
    objectiveSkillSlugs: ['it-alphabet', 'it-classroom-expressions'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['travel', 'business', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'You’re booking a hotel by phone. The receptionist asks: "Come si scrive il Suo cognome?" ' +
          'You need to spell it out using Italian letter names.',
        notes: 'Frame as a practical travel skill, not a language drill.',
      },
      {
        taskType: TaskType.explanation,
        focus: 'Key letter names to remember',
        prompt:
          'A few letter names differ from English: b = bi, c = ci, g = gi, h = acca, j = i lunga, ' +
          'w = vu doppia, y = ipsilon / i greca. And always say "doppia" for a double.',
        notes: 'Only flag the ones most likely to confuse English speakers.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Spell your first name',
        prompt: 'Spell your first name using Italian letter names.',
        notes: 'Use the learner’s real name. If it has a double letter, coach "doppia ___".',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Respond to "Come si scrive?"',
        prompt: 'The receptionist asks how to write your surname. Spell it out.',
        exampleAnswer: 'Si scrive: A-doppia N-A, ovvero A, doppia enne, A.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Doubles',
        prompt: 'How do you say "double n" when spelling aloud in Italian?',
        exampleAnswer: 'doppia enne',
      },
    ],
  },

  // ── 10. Listening challenge ────────────────────────────────────────────────
  {
    slug: 'cap00-listening-at-the-bar',
    title: 'Listening at the bar: catch the greeting, the order, and the price',
    lessonType: LessonType.listening_challenge,
    level: CEFRLevel.complete_beginner,
    summary:
      'Three short audio snippets at an Italian bar — a buongiorno, a coffee order, and a price. ' +
      'Train your ear to separate Italian sounds you have been studying from the stream of speech.',
    objectiveSkillSlugs: [
      'it-vocab-greetings',
      'it-vocab-numbers-1-100',
      'it-pronunciation-vowels',
    ],
    defaultDurationMinutes: 8,
    compatibleThemes: ['food', 'travel', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Ear training in a real setting',
        prompt:
          'Real Italian at a bar goes fast. We’re training your ear to catch three things: the greeting, ' +
          'the drink, and the price. Listen once for gist, then again for detail.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Catch the greeting',
        prompt: 'The customer says something when they walk in. What did they say?',
        exampleAnswer: 'Buongiorno',
        notes:
          'Script: "Buongiorno! Un cappuccino, per favore. — Certo. Sono un euro e ottanta." ' +
          'Engine plays the full snippet; ask about just the opening word.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Catch the drink order',
        prompt: 'What did the customer order?',
        exampleAnswer: 'un cappuccino',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Catch the price',
        prompt: 'How much did the barista say?',
        exampleAnswer: 'un euro e ottanta',
        notes: 'Offer: un euro e ottanta / uno e cinquanta / due euro. Test number discrimination.',
      },
      {
        taskType: TaskType.recap,
        focus: 'What helped you',
        prompt: 'Which word in the stream anchored you — what did you latch onto first?',
      },
    ],
  },

  // ── 11. Chapter checkpoint ─────────────────────────────────────────────────
  {
    slug: 'cap00-chapter-checkpoint',
    title: 'Chapter checkpoint: tutto insieme',
    lessonType: LessonType.progress_check,
    level: CEFRLevel.complete_beginner,
    summary:
      'A low-stakes mixed check across the whole chapter: register choice, a number, a date, ' +
      'a pronunciation call, and a quick self-intro — see what is solid and what needs one more pass.',
    objectiveSkillSlugs: [
      'it-vocab-greetings',
      'it-culture-formal-vs-informal',
      'it-vocab-numbers-1-100',
      'it-calendar-days-months',
      'it-pronunciation-c-g',
      'it-speaking-self-intro',
    ],
    defaultDurationMinutes: 10,
    compatibleThemes: ['culture', 'travel', 'family', 'business'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'No pressure — just a snapshot',
        prompt:
          'Five quick questions across the chapter. There’s no grade — it just shows you which ' +
          'topics are solid and which ones want a second look.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Register choice',
        prompt: 'You walk into a bank. Which greeting is correct?',
        exampleAnswer: 'Buongiorno',
        notes: 'Offer: Ciao / Buongiorno / Buonanotte.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Vowel-drop number',
        prompt: 'Write 21 in Italian words.',
        exampleAnswer: 'ventuno',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Date formula',
        prompt: 'Write "March 3rd" in Italian.',
        exampleAnswer: 'il tre marzo',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Pronunciation: soft c',
        prompt: 'Which word contains a "ch" sound: cane or cena?',
        exampleAnswer: 'cena',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Mini self-introduction',
        prompt: 'Introduce yourself in two sentences: name and where you’re from.',
        exampleAnswer: 'Mi chiamo … Sono di …',
        notes: 'Use the learner’s real name and city. Evaluate fluency and vowel quality.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assess',
        prompt: 'Which topic from this chapter do you want to revisit?',
      },
    ],
  },
];

export default { unitCode, lessons };
