// Additional lesson templates for Capitolo 2 — Come siamo.
//
// These EXTEND the templates authored inline in units/cap-02-come-siamo.ts (the index
// merges both). Follows the same rules as the cap-05 exemplar: original content;
// every in-string apostrophe is the curly ' (U+2019); slugs are globally unique
// and must not collide with the inline slugs; objectives reference real skill
// slugs from this or an earlier chapter.

import { CEFRLevel, LessonType, TaskType } from '@prisma/client';
import type { SeedLessonTemplate } from '../types';

export const unitCode = 'cap-02';

const lessons: SeedLessonTemplate[] = [
  // 1 — focused drill: essere conjugation
  {
    slug: 'cap02-drill-essere-conjugation',
    title: 'essere, six ways — rapid conjugation drill',
    lessonType: LessonType.grammar,
    level: CEFRLevel.complete_beginner,
    summary:
      'Lock the full essere paradigm into muscle memory through rapid-fire conjugation and context ' +
      'sentences before moving on to adjective agreement.',
    objectiveSkillSlugs: ['it-essere-present'],
    defaultDurationMinutes: 7,
    compatibleThemes: ['family', 'culture', 'sports'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The paradigm at a glance',
        prompt:
          'Essere is fully irregular. The six forms are: sono (io), sei (tu), è (lui/lei), ' +
          'siamo (noi), siete (voi), sono (loro). Note: sono is shared by first and third plural — ' +
          'only context tells you which.',
        notes: 'Display as a two-column table: pronoun | form. Flag the accent on è.',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'Produce the full paradigm',
        prompt: 'Write the correct form of essere for each pronoun: io, tu, lui, noi, voi, loro.',
        exampleAnswer: 'sono, sei, è, siamo, siete, sono',
        notes: 'Repeat the last form (sono = loro) so learners internalize the ambiguity.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Pick the right form in context',
        prompt:
          'Complete each sentence: ' +
          '"Tu ___ di Roma?" / "Noi ___ studenti." / "Loro ___ simpatici."',
        exampleAnswer: 'sei; siamo; sono',
        notes: 'Cover 2nd sing., 1st pl., 3rd pl. — the three forms learners drop most often.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Small sentences using essere',
        prompt: 'Translate: "She is tall and kind. We are Italian."',
        exampleAnswer: 'Lei è alta e gentile. Siamo italiani.',
        notes: 'Adjective agreement is implicit here — gentle exposure before the agreement drill.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The sono trap',
        prompt: 'How do you know whether "Sono stanchi" means "I am tired" or "They are tired"?',
      },
    ],
  },

  // 2 — focused drill: 4-ending vs 2-ending adjective agreement
  {
    slug: 'cap02-drill-adjective-agreement',
    title: 'Four endings vs two — the agreement grid',
    lessonType: LessonType.grammar,
    level: CEFRLevel.complete_beginner,
    summary:
      'Drill the two adjective types side by side — alto (-o/-a/-i/-e) vs intelligente (-e/-i) — ' +
      'until the pattern fires automatically in every gender-and-number combination.',
    objectiveSkillSlugs: ['it-adjectives-agreement'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['family', 'sports', 'film', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Two types, two behaviours',
        prompt:
          'Four-ending adjectives (e.g. alto) change all four ways: alto, alta, alti, alte. ' +
          'Two-ending adjectives (e.g. intelligente) simplify: intelligente for both genders in the ' +
          'singular, intelligenti for both genders in the plural. The ending of the adjective in its ' +
          'dictionary form tells you which type: -o = four-ending; -e = two-ending.',
        notes: 'A 2×2 vs 1×2 grid works well visually.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Identify the adjective type',
        prompt: 'Is "gentile" four-ending or two-ending? How do you know?',
        exampleAnswer:
          'Two-ending — its dictionary form ends in -e, so plural is gentili for all genders.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Agree the adjective — mixed types',
        prompt: 'Complete: "Le studentesse sono molt___ intelligent___ e molt___ simpatich___."',
        exampleAnswer: 'molto intelligenti e molto simpatiche',
        notes:
          'molto is invariable as an adverb; simpatiche targets the four-ending -o/-a/-i/-e pattern ' +
          'for an all-female plural group.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Catch the two-ending error',
        prompt: 'Fix: "Sofia è intelligenta e gentila."',
        exampleAnswer: 'Sofia è intelligente e gentile.',
        notes: 'Classic mistake: treating two-ending adjectives as four-ending.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Mixed-gender group → masculine plural',
        prompt: 'Translate: "Marco and Giulia are tall and cheerful."',
        exampleAnswer: 'Marco e Giulia sono alti e allegri.',
        notes: 'Reinforce the default masculine plural for mixed groups.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Quick-fire check',
        prompt:
          'What is the plural of "bravo"? What is the plural of "gentile"? ' +
          'Why are they different?',
      },
    ],
  },

  // 3 — focused drill: definite article by sound
  {
    slug: 'cap02-drill-definite-articles-sound',
    title: 'il, lo, or l’? — the sound-rule drill',
    lessonType: LessonType.grammar,
    level: CEFRLevel.complete_beginner,
    summary:
      'Master the two-step decision for choosing the right definite article by practising the sound ' +
      'rule in isolation — dozens of nouns, fast and focused.',
    objectiveSkillSlugs: ['it-definite-articles'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['family', 'travel', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The two-step decision tree',
        prompt:
          'Step 1 — gender: masculine or feminine? ' +
          "Step 2 — starting sound of the noun: vowel → l'; s+consonant, z, gn, ps, x, y → lo (m.) or la (f.); " +
          'everything else → il (m.) or la (f.). ' +
          "Plural versions follow the same logic: gli replaces lo/l' in the masculine plural; i replaces il.",
        notes:
          'A decision-tree diagram with three branches (vowel / special consonant / other) is ideal.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Masculine singular: il, lo, or l’',
        prompt:
          'Supply the correct masculine singular article: ' +
          '___ amico, ___ studente, ___ ragazzo, ___ zaino, ___ sport.',
        exampleAnswer: 'l’amico, lo studente, il ragazzo, lo zaino, lo sport',
        notes:
          'Covers all three masculine singular forms. "sport" begins with sp (s+consonant) → lo.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Masculine plural: i or gli',
        prompt: 'Pluralize with the right article: ___ amici, ___ studenti, ___ ragazzi.',
        exampleAnswer: 'gli amici, gli studenti, i ragazzi',
        notes: 'gli before vowel (amici) and s+cons. (studenti); i before regular consonant.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Feminine: la or l’',
        prompt: 'Choose the correct article for "amica": (A) la amica (B) l’amica.',
        exampleAnswer: 'B — l’amica (elision before vowel)',
        notes: 'Reinforce that both masculine and feminine elide before a vowel.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Trigger list for lo / gli',
        prompt:
          'List the consonant clusters that trigger lo (singular) or gli (plural) instead of il / i.',
      },
    ],
  },

  // 4 — focused drill: bello forms
  {
    slug: 'cap02-drill-bello-forms',
    title: 'bel, bello, bella, bei, begli, belle — drilling the bello map',
    lessonType: LessonType.grammar,
    level: CEFRLevel.complete_beginner,
    summary:
      'The six pre-noun forms of bello follow the definite article exactly. Drill the one-to-one ' +
      'mapping until choosing bel vs bello vs begli feels as natural as picking il vs lo vs gli.',
    objectiveSkillSlugs: ['it-bello-adjective', 'it-definite-articles'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['family', 'art', 'travel', 'film'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The mirror rule',
        prompt:
          'When bello comes directly before a noun, swap the article for a bello form: ' +
          'il → bel (un bel ragazzo), lo → bello (un bello stadio), l’ → bell’ (una bell’attrice), ' +
          'la → bella (una bella città), i → bei (dei bei quadri), gli → begli (dei begli occhi), ' +
          'le → belle (delle belle canzoni). ' +
          'After a verb or after the noun, bello uses normal adjective forms: è bello, uno spettacolo bello.',
        notes: 'Show the side-by-side column: article | bello-form.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Choose the pre-noun form',
        prompt:
          'Fill in: "un ___ paesaggio, un ___ zaino, una ___ idea, dei ___ occhi, dei ___ studenti."',
        exampleAnswer: 'bel paesaggio, bello zaino, bella idea, bei occhi, begli studenti',
        notes:
          'paesaggio → il → bel; zaino → lo → bello; idea → la → bella; occhi → i → bei; studenti → gli → begli.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Pre-noun vs predicative',
        prompt:
          'Which sentence uses bello correctly? ' +
          '(A) È un bello ragazzo. (B) È un bel ragazzo. (C) Il ragazzo è bello.',
        exampleAnswer:
          'Both B and C are correct — B uses the pre-noun form, C uses the predicative form.',
        notes: 'A is wrong: ragazzo follows il, so pre-noun form is bel, not bello.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Spot the bello error',
        prompt: 'Fix: "Hai dei belli amici!"',
        exampleAnswer: 'Hai dei begli amici!',
        notes: 'amici = gli amici → begli, not belli.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The predicative exception',
        prompt:
          'You say "un bel film" before the noun. What form do you use in "Questo film è ___"?',
        notes: 'Answer: bello — regular predicative form, article-like rule does not apply.',
      },
    ],
  },

  // 5 — focused drill: colors and invariable colors
  {
    slug: 'cap02-drill-colors-agreement',
    title: 'Colors: which ones change, which ones don’t',
    lessonType: LessonType.grammar,
    level: CEFRLevel.complete_beginner,
    summary:
      'Focused practice on color adjective agreement — contrasting the standard agreeing colors ' +
      '(rosso, verde, azzurro) with the invariable ones (blu, rosa, viola, arancione).',
    objectiveSkillSlugs: ['it-vocab-colors', 'it-adjectives-agreement'],
    defaultDurationMinutes: 7,
    compatibleThemes: ['family', 'art', 'sports', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Two camps of color',
        prompt:
          'Most Italian colors agree like normal adjectives: rosso/rossa/rossi/rosse. ' +
          'But a small group — blu, rosa, viola, arancione — are invariable: they never add an ending. ' +
          'Today we drill both until you can sort them instantly.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Agree the agreeing colors',
        prompt:
          'Complete with the correct form of the color: ' +
          '"una camicia ross___, due camicie ross___, un cappello verd___, tre cappelli verd___."',
        exampleAnswer: 'rossa, rosse, verde, verdi',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Invariable color test',
        prompt:
          'Which sentence is correct? ' + '(A) Le pareti sono viole. (B) Le pareti sono viola.',
        exampleAnswer: 'B — viola is invariable and never changes form.',
        notes: 'Repeat this pattern for blu and rosa in follow-up reps.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Fix the invariable error',
        prompt: 'Fix: "Ho comprato due zaini blui e una borsa rosi."',
        exampleAnswer: 'Ho comprato due zaini blu e una borsa rosa.',
        notes: 'Both blu and rosa are invariable — blui and rosi are never correct.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Describe using colors',
        prompt:
          'Look around you. Name two objects and give each one its Italian color, ' +
          'making sure to agree (or not agree) correctly.',
        notes:
          'Personalize to the learner’s environment. Reward correct invariable usage especially.',
      },
    ],
  },

  // 6 — focused drill: nationalities and lowercase rule
  {
    slug: 'cap02-drill-nationalities',
    title: 'Nationalities — lowercase, agreeing, and two-ending',
    lessonType: LessonType.grammar,
    level: CEFRLevel.complete_beginner,
    summary:
      'Practise the key Italian nationalities, nail the lowercase rule, and distinguish four-ending ' +
      '(italiano/a/i/e) from two-ending (francese/francesi) nationality adjectives.',
    objectiveSkillSlugs: ['it-vocab-nationalities', 'it-adjectives-agreement'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['family', 'travel', 'culture', 'sports'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Three rules for nationalities',
        prompt:
          'Rule 1 — lowercase: italiano, not "Italiano". ' +
          'Rule 2 — four-ending or two-ending? Most end in -o (italiano, americano, tedesco, russo) → four-ending. ' +
          'Several end in -e (francese, inglese, cinese, giapponese) → two-ending (no change m./f. singular; -i plural). ' +
          'Rule 3 — dopo essere, no article: "Sono americano," not "Sono un americano."',
        notes: 'The "no article after essere for nationalities" rule is a frequent error source.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Four-ending agreement',
        prompt:
          'Complete: "Sofia è italian___. I suoi genitori sono italian___. ' +
          'La sua migliore amica è tedesc___."',
        exampleAnswer:
          'italiana; italiani (or italiane — clarify group is mixed/all-male); tedesca',
        notes: 'Treat "genitori" as mixed-gender → italiani.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Two-ending nationality',
        prompt:
          'Complete: "Pierre è frances___. Anne e Marie sono frances___. ' +
          'Yuki è giapponese___."',
        exampleAnswer: 'francese; francesi; giapponese (f. sing. = same as m. sing.)',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Catch the capital-letter and article errors',
        prompt: 'Fix: "Sono un Americano e mia sorella è un’ Italiana."',
        exampleAnswer: 'Sono americano e mia sorella è italiana.',
        notes: 'Two errors: capitals and unnecessary articles after essere.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'State nationalities of people you know',
        prompt:
          'Say the nationality of yourself and two other people you know, using correct agreement.',
        notes: 'Pull nationality from the learner’s profile where available.',
      },
    ],
  },

  // 7 — error-correction clinic
  {
    slug: 'cap02-clinic-gender-agreement-errors',
    title: 'Agreement clinic: the four classic slips',
    lessonType: LessonType.grammar,
    level: CEFRLevel.complete_beginner,
    summary:
      'A targeted error-correction clinic on the most common gender-agreement mistakes in cap-02: ' +
      'treating two-ending adjectives as four-ending, capitalizing nationalities, making invariable ' +
      'colors agree, and using the wrong article before s+consonant nouns.',
    objectiveSkillSlugs: [
      'it-adjectives-agreement',
      'it-vocab-nationalities',
      'it-vocab-colors',
      'it-definite-articles',
    ],
    defaultDurationMinutes: 10,
    compatibleThemes: ['family', 'culture', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Frame the clinic',
        prompt:
          'I will show you sentences that contain the errors English speakers make most often ' +
          'in this chapter. Your job is to spot and fix them — no pressure, just pattern recognition.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Two-ending adjective treated as four-ending',
        prompt: 'Fix: "La mia professoressa è intelligenta e molto gentila."',
        exampleAnswer: 'La mia professoressa è intelligente e molto gentile.',
        notes:
          'intelligente and gentile both end in -e → two-ending; "intelligenta" and "gentila" do not exist.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Capital nationality + article after essere',
        prompt: 'Fix: "Marco è un Italiano e Hana è un’ Giapponese."',
        exampleAnswer: 'Marco è italiano e Hana è giapponese.',
        notes: 'Two errors each: capital letter and article after essere for nationalities.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Invariable color given a false ending',
        prompt: 'Fix: "Indosso una sciarpa violia e due scarpe blui."',
        exampleAnswer: 'Indosso una sciarpa viola e due scarpe blu.',
        notes: 'viola and blu are invariable — no endings ever.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Wrong article before s+consonant',
        prompt: 'Fix: "Il studente e il spagnolo sono amici."',
        exampleAnswer: 'Lo studente e lo spagnolo sono amici.',
        notes: 'Both nouns start with s+consonant → lo, not il.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Pattern review',
        prompt:
          'Which of the four errors in today’s clinic do you think you’re most likely to make again?',
      },
    ],
  },

  // 8 — scenario roleplay: describe a friend for a blind date
  {
    slug: 'cap02-roleplay-blind-date-setup',
    title: 'Setting up a blind date — describe your friend',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.complete_beginner,
    summary:
      'Your Italian friend asks you to describe your single friend so they can arrange an introduction. ' +
      'Use physical adjectives, personality adjectives, nationality, and colors in a natural conversation.',
    objectiveSkillSlugs: [
      'it-vocab-descriptions',
      'it-vocab-nationalities',
      'it-vocab-colors',
      'it-adjectives-agreement',
      'it-essere-present',
    ],
    defaultDurationMinutes: 11,
    compatibleThemes: ['family', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'Your Italian friend Valentina says: "Ho un amico single, si chiama Luca. ' +
          'Com’è il tuo amico / la tua amica?" She wants to know if they might hit it off. ' +
          'Describe your friend as warmly and accurately as you can.',
        notes:
          'Adapt gender of the friend to whatever the learner chooses. Encourage real details.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Physical description',
        prompt:
          'Describe your friend’s appearance in two sentences — height, build, hair or eye color.',
        exampleAnswer: 'È alto e magro. Ha gli occhi azzurri e i capelli neri.',
        notes: 'Prompt for at least one color adjective with correct invariable or agreeing form.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Personality description',
        prompt:
          'Now describe their personality — name at least two adjectives and say whether they’re fun to be around.',
        exampleAnswer: 'È molto simpatico e allegro. È anche intelligente e un po’ timido.',
        notes: 'Reward use of per niente or un po’ as natural qualifiers.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Nationality + origin',
        prompt: 'Translate: "She is Canadian, but her family is originally Italian."',
        exampleAnswer: 'È canadese, ma la sua famiglia è originariamente italiana.',
        notes: 'If learner doesn’t know "canadese," accept any nationality with correct agreement.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Full spoken pitch',
        prompt:
          'Now deliver the whole description out loud in one go — at least five sentences. ' +
          'Include appearance, personality, nationality, and one color somewhere.',
        notes: 'Gentle correction on agreement endings only; praise fluency.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Language notice',
        prompt: 'Which Italian adjective did you find hardest to produce naturally today? Why?',
      },
    ],
  },

  // 9 — scenario roleplay: describe a missing person to police
  {
    slug: 'cap02-roleplay-lost-person-report',
    title: 'At the police station — describe a missing person',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.complete_beginner,
    summary:
      'You need to describe someone who has gone missing — an urgent, precise use of all the ' +
      'cap-02 vocabulary: physical description, age, clothing colors, and nationality.',
    objectiveSkillSlugs: [
      'it-vocab-descriptions',
      'it-vocab-colors',
      'it-vocab-nationalities',
      'it-adjectives-agreement',
      'it-essere-present',
    ],
    defaultDurationMinutes: 10,
    compatibleThemes: ['family', 'travel', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'You are at a police station in Palermo. An officer asks: "Come si chiama la persona? ' +
          'Com’è fisicamente?" You need to describe your missing travel companion — fast and clearly.',
        notes: 'Let the learner invent or use a real person. Urgency frames precise description.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Physical description to the officer',
        prompt: 'Describe the person’s height, build, and approximate age.',
        exampleAnswer: 'È una donna alta e magra, circa trentacinque anni.',
        notes: 'Accept any plausible combination. Correct agreement errors gently.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Hair and eye details',
        prompt: 'The officer asks: "Di che colore sono i capelli e gli occhi?" Answer with colors.',
        exampleAnswer: 'Ha i capelli castani e gli occhi verdi.',
        notes:
          'Castani (chestnut-brown) is a useful word — introduce it if learner doesn’t know it.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Clothing with colors',
        prompt:
          'Complete the description of what she was wearing: ' +
          '"Indossava una giacca _____ (blue, invariable) e una borsa _____ (red, four-ending, f. sing.)."',
        exampleAnswer: 'una giacca blu e una borsa rossa',
        notes: 'Tests the invariable blu vs agreeing rossa contrast in a meaningful context.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Nationality and language',
        prompt: 'Translate: "She is American, but she speaks a little Italian."',
        exampleAnswer: 'È americana, ma parla un po’ di italiano.',
        notes:
          'un po’ di + language is idiomatic; keep correction light if learner gets nationality right.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Precision matters',
        prompt:
          'In an emergency description, which details — color, height, nationality — mattered most? ' +
          'Did Italian grammar help or slow you down?',
      },
    ],
  },

  // 10 — listening challenge: who is being described?
  {
    slug: 'cap02-listening-who-is-described',
    title: 'Listening gym: who are they talking about?',
    lessonType: LessonType.listening_challenge,
    level: CEFRLevel.complete_beginner,
    summary:
      'Train your ear on two short Italian exchanges in which one speaker describes a person. ' +
      'Use adjective endings and vocabulary clues to answer "who is being described and what are they like?"',
    objectiveSkillSlugs: [
      'it-listening-everyday',
      'it-vocab-descriptions',
      'it-vocab-nationalities',
      'it-vocab-colors',
    ],
    defaultDurationMinutes: 9,
    compatibleThemes: ['family', 'culture', 'sports'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Listening strategy',
        prompt:
          'Listen for two things: the adjective endings (they signal gender) and the content words ' +
          '(simpatico, alto, italiana…). You don’t need every word — anchor on those two channels.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Clip 1 — gist and gender',
        prompt:
          'Listen. Is the person being described male or female? What is the overall impression — ' +
          'positive, negative, or mixed?',
        notes:
          'Script (clip 1): "Il mio nuovo collega è molto bravo. È inglese, abbastanza alto, ' +
          'con i capelli rossi. Un tipo simpatico e tranquillo." — Male, positive. ' +
          'Engine generates the audio; this script is the model.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Clip 1 — nationality',
        prompt: 'What nationality is the colleague described in clip 1?',
        exampleAnswer: 'inglese',
        notes: 'Distractors: italiano, americano.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Clip 2 — detail extraction',
        prompt: 'Listen to clip 2. Write two adjectives you heard and the color mentioned.',
        notes:
          'Script (clip 2): "Mia cugina è bassa ma molto energica. Ha una giacca viola e ' +
          'gli occhi neri, è spagnola ma vive a Milano." — adjectives: bassa, energica; color: viola.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Reproduce and extend',
        prompt:
          'Describe the person from clip 2 out loud in your own words, then add one detail they didn’t mention.',
        notes: 'Transfer from listening to speaking — a key retention move.',
      },
    ],
  },

  // 11 — speaking challenge: describe a famous person or family member
  {
    slug: 'cap02-speaking-famous-or-family',
    title: 'Speak freely — describe someone famous or someone you love',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.complete_beginner,
    summary:
      'Open-ended speaking challenge: describe a famous person or a family member using the full ' +
      'cap-02 toolkit — essere, adjectives with agreement, nationality, colors — in free production.',
    objectiveSkillSlugs: [
      'it-essere-present',
      'it-adjectives-agreement',
      'it-vocab-descriptions',
      'it-vocab-nationalities',
      'it-vocab-colors',
    ],
    defaultDurationMinutes: 10,
    compatibleThemes: ['family', 'sports', 'film', 'music'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Your choice, your words',
        prompt:
          'Choose one person: a family member, a friend, or a famous person you admire. ' +
          'You’ll describe them in Italian using everything from this chapter. There is no script — ' +
          'just you and the language.',
        notes: 'Pull interest area from learner profile — athlete / musician / actor / chef etc.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Physical description (timed: 30 seconds)',
        prompt:
          'Describe their appearance in Italian — height, build, hair or eye color. Aim for 2–3 sentences.',
        exampleAnswer: 'È un uomo alto e atletico. Ha i capelli scuri e gli occhi marroni.',
        notes: 'Encourage use of at least one color adjective. Correct agreement in feedback only.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Personality and qualities',
        prompt:
          'Now describe what they are like as a person — use at least two adjectives and essere.',
        exampleAnswer: 'È molto determinato e simpatico. Non è per niente timido.',
        notes: 'Reward idiomatic qualifiers (molto, abbastanza, per niente, un po’).',
      },
      {
        taskType: TaskType.translation,
        focus: 'Nationality sentence in Italian',
        prompt:
          'Tell me their nationality in Italian — and remember the two rules (lowercase, no article after essere).',
        exampleAnswer: 'È argentino. / È italiana.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assessment',
        prompt:
          'Which part of the description came most naturally? Which part do you want to practise more?',
      },
    ],
  },

  // 12 — progress check
  {
    slug: 'cap02-checkpoint',
    title: 'Chapter checkpoint: Come siamo',
    lessonType: LessonType.progress_check,
    level: CEFRLevel.beginner,
    summary:
      'A quick mixed check across all of cap-02 — essere, adjective agreement, articles, bello, ' +
      'special plurals, nationalities, colors — to surface what is solid and what needs another pass.',
    objectiveSkillSlugs: [
      'it-essere-present',
      'it-adjectives-agreement',
      'it-definite-articles',
      'it-bello-adjective',
      'it-noun-plurals-special',
      'it-vocab-nationalities',
      'it-vocab-colors',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['family', 'culture', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Low-stakes check',
        prompt:
          'A few quick questions across the whole chapter. No pressure — the goal is to find ' +
          'what you’ve nailed and what deserves one more look.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'essere + adjective agreement',
        prompt: 'Complete: "Le mie amiche sono molt___ simpatic___ e abbastanza intelligent___."',
        exampleAnswer: 'molto simpatiche e abbastanza intelligenti',
        notes: 'molto invariable; simpatiche = four-ending f.pl.; intelligenti = two-ending pl.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'bello pre-noun form',
        prompt:
          'Choose the correct pre-noun form: "Ho degli ___ amici italiani." ' +
          '(A) bei (B) belli (C) begli',
        exampleAnswer: 'C — begli amici (amici = gli amici → begli)',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Special plural',
        prompt: 'Write the plural: "il lago → i _____, l’amico → gli _____, la banca → le _____."',
        exampleAnswer: 'laghi; amici; banche',
        notes: '-go → -ghi; amico → amici (learned word); -ca → -che.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Nationality + invariable color',
        prompt: 'Fix: "Sono un Messicano. Porto una sciarpa violia e uno zaino bluo."',
        exampleAnswer: 'Sono messicano. Porto una sciarpa viola e uno zaino blu.',
        notes: 'Three errors: capital + article after essere; violia; bluo.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Full description sentence',
        prompt:
          'Translate: "My sister is tall, cheerful, and French. She has beautiful green eyes."',
        exampleAnswer: 'Mia sorella è alta, allegra e francese. Ha dei begli occhi verdi.',
        notes:
          'Tests essere, four-ending agreement, two-ending nationality, begli + agreeing color.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assess',
        prompt:
          'Which topic from this chapter — articles, adjective agreement, bello forms, colors, ' +
          'nationalities, special plurals — do you want to revisit before moving on?',
      },
    ],
  },
];

export default { unitCode, lessons };
