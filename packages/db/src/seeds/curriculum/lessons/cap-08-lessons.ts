// Additional lesson templates for Capitolo 8 — Cinema, stampa e TV.
//
// These EXTEND the five templates authored inline in units/cap-08-cinema-stampa-tv.ts.
// The index file merges both. This file follows the same rules as the SPEC and the
// cap-05-lessons.ts exemplar:
//   - original content only (no copied textbook material)
//   - every in-string apostrophe is the curly ' (U+2019), never a straight '
//   - slugs are globally unique and do NOT collide with the five inline slugs:
//       cap08-how-things-used-to-be, cap08-story-with-interruption,
//       cap08-had-already-happened, cap08-talk-about-films, cap08-suffixes-mini-lesson
//   - objectiveSkillSlugs reference only this chapter or earlier canonical slugs

import { CEFRLevel, LessonType, TaskType } from '@prisma/client';
import type { SeedLessonTemplate } from '../types';

export const unitCode = 'cap-08';

const lessons: SeedLessonTemplate[] = [
  // ── 1. Per-skill drill: imperfetto forms including ero/facevo ────────────────
  {
    slug: 'cap08-drill-imperfetto-forms',
    title: 'Ero, facevo, dicevo — the imperfetto paradigm drill',
    lessonType: LessonType.grammar,
    level: CEFRLevel.lower_intermediate,
    summary:
      'A tight conjugation drill that locks in the imperfetto endings across all three verb classes ' +
      'and the five most important irregular stems — ero, facevo, dicevo, bevevo, dovevo.',
    objectiveSkillSlugs: ['it-imperfetto'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['film', 'family', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Five irregulars you cannot skip',
        prompt:
          'The imperfetto is mostly regular, but five very common verbs have irregular stems: ' +
          'essere → ero, fare → facevo, dire → dicevo, bere → bevevo, porre → ponevo. ' +
          'Everything else builds cleanly from the infinitive minus -re.',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'Regular -are/-ere/-ire across all persons',
        prompt: 'Give the full imperfetto paradigm (io → loro) for guardare, leggere, capire.',
        exampleAnswer:
          'guardavo/guardavi/guardava/guardavamo/guardavate/guardavano — ' +
          'leggevo/leggevi/leggeva/leggevamo/leggevate/leggevano — ' +
          'capivo/capivi/capiva/capivamo/capivate/capivano',
        notes:
          'Pause on the -evamo/-evate forms of -ere verbs — learners often write -avamo by analogy with -are.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Irregular stems in context',
        prompt:
          'Complete: "Quando ero ragazzo, mio padre ___ (fare) il giornalista e ___ (bere) ' +
          'sempre un caffè mentre ___ (leggere) le notizie del mattino."',
        exampleAnswer: 'faceva … beveva … leggeva',
        notes: 'All three are imperfetto — habitual past actions in a family memory frame.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Identify the correct irregular form',
        prompt:
          'Which is correct? — "Da piccola lei ___ (dire) sempre bugie." ' +
          '(a) dirava  (b) diceva  (c) direva',
        exampleAnswer: '(b) diceva',
        notes: 'dire → stem dic- + regular -ere imperfetto endings.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Use ero/facevo in a real sentence',
        prompt:
          'Say one sentence about what you or someone in your family used to do, ' +
          'using at least one irregular imperfetto form.',
        notes: 'Reward any correct use of ero, facevo, dicevo, or bevevo.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Irregular stem quick-fire',
        prompt: 'What is the io form of the imperfetto for: essere, fare, dire, bere?',
        exampleAnswer: 'ero, facevo, dicevo, bevevo',
      },
    ],
  },

  // ── 2. Per-skill drill: imperfetto vs passato prossimo with mentre ───────────
  {
    slug: 'cap08-drill-mentre-contrast',
    title: 'Mentre guardavo… — the interruption pattern',
    lessonType: LessonType.grammar,
    level: CEFRLevel.lower_intermediate,
    summary:
      'Focus drill on the mentre + imperfetto / passato prossimo interruption frame. ' +
      'Build confident tense-switching by composing and completing "while … suddenly …" sentences.',
    objectiveSkillSlugs: ['it-imperfetto-vs-passato-prossimo', 'it-imperfetto'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['film', 'culture', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The mentre frame',
        prompt:
          'Mentre introduces the ongoing background action (always imperfetto). ' +
          'The interrupting or completing event goes in the passato prossimo. ' +
          'Pattern: "Mentre + [imperfetto], + [passato prossimo]." ' +
          'Example: Mentre ascoltavo la radio, è cominciato un temporale.',
        notes:
          'Write the pattern on a "mental whiteboard" for the learner. Emphasize that mentre ' +
          'is the signal — wherever you see it, the next verb is imperfetto.',
      },
      {
        taskType: TaskType.tense_selection,
        focus: 'Choose the correct tense for each clause',
        prompt:
          'Fill in: "Mentre (leggere) ___ il giornale, il gatto (rovesciare) ___ il caffè sul tavolo."',
        exampleAnswer: 'leggevo … ha rovesciato',
        notes: 'rovesciare takes avere — ha rovesciato.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Complete the background clause',
        prompt:
          'The event is given — supply the mentre background: ' +
          '"___ (fare) la doccia, ho sentito un rumore strano."',
        exampleAnswer: 'Mentre facevo la doccia',
      },
      {
        taskType: TaskType.translation,
        focus: 'Translate a mentre sentence',
        prompt:
          'Translate: "While the director was explaining the scene, the actress interrupted him."',
        exampleAnswer: 'Mentre il regista spiegava la scena, l’attrice lo ha interrotto.',
        notes: 'interrompere → ha interrotto (irregular participle).',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Compose your own interruption story',
        prompt:
          'Tell Wise something that really happened: you were in the middle of doing something ' +
          '(imperfetto) when an event occurred (passato prossimo). Use mentre at least once.',
        notes:
          'Tie to the learner’s interests — a sports game, a film, cooking — to keep it personal. ' +
          'The goal is natural tense-switching, not perfection.',
      },
    ],
  },

  // ── 3. Per-skill drill: trapassato "had done" ────────────────────────────────
  {
    slug: 'cap08-drill-trapassato',
    title: 'Avevo già visto — the "had done" drill',
    lessonType: LessonType.grammar,
    level: CEFRLevel.lower_intermediate,
    summary:
      'A concentrated drill on the trapassato prossimo: form it, place it correctly on a three-point ' +
      'timeline, and distinguish it from the passato prossimo in realistic media sentences.',
    objectiveSkillSlugs: ['it-trapassato', 'it-imperfetto-vs-passato-prossimo'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['film', 'history', 'news'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The three-point timeline',
        prompt:
          'Passato prossimo = a completed past event. Trapassato = something that finished BEFORE that event. ' +
          'Formula: imperfetto of avere/essere + past participle. ' +
          'già is the reliable trigger word: avevo già visto quel film.',
        notes:
          'Draw a horizontal timeline with three points: NOW ← passato prossimo ← trapassato. ' +
          'Label each point with an example from a film plot.',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'Build the trapassato with essere',
        prompt: 'Give the trapassato prossimo (io/lei/noi) for: partire, andare.',
        exampleAnswer:
          'ero partito/a … era partita … eravamo partiti/e — ' +
          'ero andato/a … era andata … eravamo andati/e',
        notes:
          'Stress agreement: essere verbs agree with the subject in gender and number, same as passato prossimo.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'già as the trigger',
        prompt:
          'Complete: "Non ho guardato quella serie perché la mia amica me ne ___ (già parlare) troppo."',
        exampleAnswer: 'aveva già parlato',
        notes:
          'avere verb — aveva già parlato. The già signals we need to go one step further back.',
      },
      {
        taskType: TaskType.tense_selection,
        focus: 'Passato prossimo or trapassato?',
        prompt:
          'Choose the correct tense: "Quando il programma ___ (iniziare), noi ___ (già cenare)." ' +
          '— is iniziare passato prossimo or trapassato? Is cenare passato prossimo or trapassato?',
        exampleAnswer:
          'è iniziato (passato prossimo — the event that happened); avevamo già cenato (trapassato — finished before)',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce a trapassato sentence',
        prompt:
          'Translate: "The journalist had already written the article when the editor called."',
        exampleAnswer:
          'Il giornalista aveva già scritto l’articolo quando il redattore ha chiamato.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The formula one more time',
        prompt: 'How do you form the trapassato? Give one avere example and one essere example.',
      },
    ],
  },

  // ── 4. Per-skill drill: suffix nuance gattino/librone/parolaccia ─────────────
  {
    slug: 'cap08-drill-suffixes-nuance',
    title: 'Gattino, librone, parolaccia — suffix nuance',
    lessonType: LessonType.grammar,
    level: CEFRLevel.lower_intermediate,
    summary:
      'Go deeper on Italian alterati: understand the emotional and connotative difference between ' +
      '-ino (cute/small), -one (big/impressive), and -accio (bad/ugly), and practise the -one gender trap.',
    objectiveSkillSlugs: ['it-suffixes'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['film', 'news', 'family', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Nuance, not just size',
        prompt:
          'Suffixes carry attitude, not just size. Un gattino is a tiny, adorable cat. ' +
          'Un librone is a huge, possibly impressive tome. Un filmaccio is a terrible film — ' +
          'you’re expressing contempt, not just size. And remember: -one is always masculine, ' +
          'even when the base word is feminine (la notizia → il notiziOne).',
        notes:
          'Contrast the same root with different suffixes to show how tone shifts: ' +
          'il vento / il ventino (light breeze) / il ventone (strong wind) / il ventaccio (foul wind).',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Pick the right suffix for the context',
        prompt:
          'You want to say "a huge newspaper" with admiration. Which form is correct? ' +
          '(a) un giornalino  (b) un giornalone  (c) un giornalaccio',
        exampleAnswer: '(b) un giornalone',
        notes: '-one = big and impressive; -ino = small/cute; -accio = bad/ugly.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'The -one gender trap',
        prompt: 'Turn these feminine nouns into augmentatives: la parola → ___, la notizia → ___.',
        exampleAnswer: 'il parolone … il notiziOne',
        notes:
          'Both become masculine because -one always produces a masculine noun, regardless of the base gender.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Spot the suffix mistake',
        prompt:
          'A learner wrote: "Ho comprato un gattina — è piccolissima e carina." Fix the suffix.',
        exampleAnswer: 'Ho comprato una gattina — è piccolissima e carina.',
        notes:
          'gatto (m.) + -ino/-ina: if referring to a female kitten the article and noun ending adjust to una gattina.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Use all three suffixes in one go',
        prompt:
          'Describe a film night gone wrong: a terrible film (pejorative), a tiny screen (diminutive), ' +
          'and an enormous bowl of popcorn (augmentative). Use an alterato for each.',
        notes:
          'Sample: "Abbiamo guardato un filmaccio su uno schermino minuscolo con un secchione enorme di popcorn." ' +
          'Accept any plausible formation and praise creativity.',
      },
    ],
  },

  // ── 5. Error-correction clinic ───────────────────────────────────────────────
  {
    slug: 'cap08-clinic-tense-choice',
    title: 'Tense clinic: background vs event — spot the error',
    lessonType: LessonType.grammar,
    level: CEFRLevel.lower_intermediate,
    summary:
      'A targeted error-correction clinic on the classic tense-choice mistakes: ' +
      'using passato prossimo for habits and descriptions, using imperfetto for one-off events, ' +
      'wrong irregular imperfetto, and a mixed-up trapassato.',
    objectiveSkillSlugs: ['it-imperfetto-vs-passato-prossimo', 'it-imperfetto', 'it-trapassato'],
    defaultDurationMinutes: 11,
    compatibleThemes: ['film', 'news', 'history', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'The four common tense traps',
        prompt:
          'We are going to work through four classic errors that even advanced learners make. ' +
          'For each sentence I give you: find the tense error and correct it. ' +
          'After each fix, say why your choice is right.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Passato prossimo for a habit — wrong tense',
        prompt: 'Fix: "Quando ero piccolo ho guardato la TV ogni pomeriggio dopo la scuola."',
        exampleAnswer: 'Quando ero piccolo guardavo la TV ogni pomeriggio dopo la scuola.',
        notes:
          '"every afternoon" signals a habitual past action — imperfetto (guardavo), not passato prossimo.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Imperfetto for a completed one-off event — wrong tense',
        prompt: 'Fix: "Ieri sera guardavo un ottimo documentario sulla RAI."',
        exampleAnswer: 'Ieri sera ho guardato un ottimo documentario sulla RAI.',
        notes:
          '"Ieri sera" with no ongoing context signals a single completed event — passato prossimo (ho guardato).',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Irregular imperfetto — wrong stem',
        prompt:
          'Fix: "Mio nonno farava il giornalista e dirava sempre che la libertà di stampa era tutto."',
        exampleAnswer:
          'Mio nonno faceva il giornalista e diceva sempre che la libertà di stampa era tutto.',
        notes:
          'fare → faceva (not farava); dire → diceva (not dirava). These are the two most common stem errors.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Trapassato built with present auxiliary — wrong tense',
        prompt:
          'Fix: "Non sono andato al cinema perché ho già visto quel film la settimana scorsa."',
        exampleAnswer:
          'Non sono andato al cinema perché avevo già visto quel film la settimana prima.',
        notes:
          'The viewing happened before the decision not to go — trapassato (avevo già visto). ' +
          'Also note: "la settimana scorsa" usually refers to a recent week; in a narrative contrast, ' +
          '"la settimana prima" is more natural.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Diagnose your own pattern',
        prompt:
          'Which of the four errors feels most natural to make? Why? What reminder will help you catch it?',
        notes:
          'This metacognitive step helps the learner personalize their error-awareness. ' +
          'Accept any honest answer; give encouragement.',
      },
    ],
  },

  // ── 6. Scenario roleplay: tell a childhood story ─────────────────────────────
  {
    slug: 'cap08-roleplay-childhood-story',
    title: 'Com’eri da bambino? — share a childhood memory',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.lower_intermediate,
    summary:
      'An Italian friend asks about your childhood. Describe your family, habits, and a specific ' +
      "memory — blending imperfetto for background with passato prossimo for the story's events.",
    objectiveSkillSlugs: ['it-imperfetto', 'it-imperfetto-vs-passato-prossimo', 'it-vocab-media'],
    defaultDurationMinutes: 12,
    compatibleThemes: ['family', 'film', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'You’re having coffee with an Italian friend. She asks: "Com’eri da bambino/a? ' +
          'Cosa facevi nel tempo libero?" Let’s get you ready to answer naturally.',
        notes:
          'If the learner has a preferred topic area (music, sport, film), prime the roleplay ' +
          'with questions around that. The goal is a real, personal story, not a drill.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Describe your childhood home and habits',
        prompt:
          'Tell your friend: where you lived, what you used to watch or read, and one typical thing ' +
          'your family did on weekends. Use imperfetto throughout.',
        exampleAnswer:
          'Abitavo in una cittadina piccola. Il sabato guardavamo i cartoni animati la mattina e ' +
          'il pomeriggio andavamo al parco. Mia madre leggeva sempre il giornale domenica.',
        notes:
          'Correct any passato prossimo forms that should be imperfetto here. Encourage adjectives ' +
          'and weather descriptions (c’era il sole, faceva caldo) to enrich the scene.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Tell a specific memory that stands out',
        prompt:
          'Now describe one specific event from your childhood — something that happened once. ' +
          'Mix imperfetto background with passato prossimo for the event.',
        exampleAnswer:
          'Una volta, mentre guardavo la TV, ho visto per la prima volta un film di Fellini. ' +
          'Non capivo tutto, ma mi ha colpito moltissimo.',
        notes:
          'The switch from guardavo (background) to ho visto / mi ha colpito (events) is the target pattern. ' +
          'Praise any natural switching.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Your friend’s follow-up question',
        prompt:
          'Your friend asks: "E i tuoi genitori — che lavoro facevano?" Answer in 2–3 sentences ' +
          'using the imperfetto.',
        notes: 'Accept any plausible family description. Focus on imperfetto accuracy.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Notice the tense blend',
        prompt:
          'In your story, which verbs did you put in the imperfetto and which in the passato prossimo? ' +
          'Was the choice automatic, or did you have to stop and think?',
      },
    ],
  },

  // ── 7. Scenario roleplay: discuss a film you saw ─────────────────────────────
  {
    slug: 'cap08-roleplay-discuss-film',
    title: 'Hai visto il nuovo film? — discussing a film',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.lower_intermediate,
    summary:
      'You and an Italian friend compare reactions to a film: describe the plot (imperfetto for ' +
      'ongoing scenes), recount key events (passato prossimo), and use trapassato for flashbacks.',
    objectiveSkillSlugs: [
      'it-vocab-cinema-tv',
      'it-imperfetto-vs-passato-prossimo',
      'it-trapassato',
    ],
    defaultDurationMinutes: 13,
    compatibleThemes: ['film', 'culture', 'news'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Talking about a film — the key moves',
        prompt:
          'To discuss a film in Italian you need four tools: ' +
          '(1) vocab — il regista, la trama, il protagonista, la scena; ' +
          '(2) imperfetto for descriptions and ongoing scenes; ' +
          '(3) passato prossimo for plot events; ' +
          '(4) trapassato for flashbacks (what a character had already done).',
        notes:
          'Use a film the learner knows or a neutral placeholder like "un thriller italiano". ' +
          'Pull from their profile if possible.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Film vocabulary in a mini-plot summary',
        prompt:
          'Complete: "Il ___ (director) raccontava la storia di una ___ (journalist) ' +
          'che aveva già ___ (scoprire) uno scandalo prima che il film cominciasse."',
        exampleAnswer: 'regista … giornalista … scoperto',
        notes: 'scoperto = irregular past participle of scoprire.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Describe the opening scene',
        prompt:
          'Tell your friend what the opening of the film was like — weather, setting, main character. ' +
          'Use imperfetto to paint the scene.',
        exampleAnswer:
          'Era una notte buia. La protagonista camminava sola per le strade di Roma. ' +
          'Faceva freddo e c’era poca gente in giro.',
        notes:
          'Three imperfetto verbs in a row is natural here — this is a description, not a sequence of events.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Recount a turning-point scene',
        prompt:
          'Now tell your friend about the key plot event — the moment everything changed. ' +
          'Use passato prossimo for the events and imperfetto for what was happening around them.',
        exampleAnswer:
          'Mentre la giornalista stava rientrando a casa, ha trovato un messaggio anonimo. ' +
          'Qualcuno aveva già contattato la polizia prima di lei.',
        notes:
          'The sentence with aveva già contattato is a trapassato — the contact happened before she found the message.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Give a recommendation',
        prompt:
          'Tell Wise whether you’d recommend this film and why, in 3–4 sentences. ' +
          'Use at least one imperfetto, one passato prossimo, and one trapassato.',
        notes:
          'A light rubric works here: flag any tense that seems misused, but keep the focus on ' +
          'communicative success — they recommended a film.',
      },
    ],
  },

  // ── 8. Listening challenge ───────────────────────────────────────────────────
  {
    slug: 'cap08-listening-childhood-memory',
    title: 'Listening gym: habitual or one-off?',
    lessonType: LessonType.listening_challenge,
    level: CEFRLevel.lower_intermediate,
    summary:
      'Listen to a short first-person narration about a childhood memory — a mix of habitual ' +
      'background (imperfetto) and specific events (passato prossimo). ' +
      'Train your ear to hear which past tense is being used and why.',
    objectiveSkillSlugs: ['it-imperfetto', 'it-imperfetto-vs-passato-prossimo'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['family', 'film', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Ear training — tense as a signal',
        prompt:
          'In this listening exercise you will hear a narrator describe a childhood summer. ' +
          'Your job is to notice which verbs are in the imperfetto (habitual / background) ' +
          'and which are in the passato prossimo (something that happened once). ' +
          'The endings are the clue: listen for -avo / -evo vs ho/ha/è + participle.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Global comprehension: what was the story about?',
        prompt:
          'After listening, summarize in one or two sentences: what did the narrator describe?',
        notes:
          'Script for Wise to narrate (50–70 words): ' +
          '"D’estate andavamo sempre al mare in Liguria. Ogni mattina mia madre comprava il giornale ' +
          'all’edicola e lo leggeva sotto l’ombrellone. Io invece guardavo i cartoni animati in hotel. ' +
          'Un giorno, mentre giocavo sulla spiaggia, ho trovato una vecchia macchina fotografica ' +
          'abbandonata nella sabbia. L’ho portata a casa e non ho più smesso di fare fotografie." ' +
          'Personalize names or details to the learner’s interest profile.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Identify the habitual vs one-off action',
        prompt:
          'Which action was habitual? ' +
          '(a) trovare la macchina fotografica  (b) comprare il giornale ogni mattina  (c) portare la macchina a casa',
        exampleAnswer: '(b) comprare il giornale ogni mattina',
        notes: 'The key word is ogni mattina — every morning signals habit → imperfetto.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Reconstruct a sentence from the narration',
        prompt:
          'Without listening again, complete from memory: ' +
          '"Mentre ___ sulla spiaggia, ___ una vecchia macchina fotografica."',
        exampleAnswer: 'giocavo … ho trovato',
        notes:
          'Tests the mentre pattern: imperfetto in the background clause, passato prossimo for the event.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'What helped you distinguish the tenses?',
        prompt:
          'Which sound or word in the narration helped you recognize the imperfetto? ' +
          'Which helped you recognize the passato prossimo?',
        notes:
          'Target answers: -avo/-evo endings vs. ho/ha/è + participle. ' +
          'Encourage the learner to name specific moments from the audio.',
      },
    ],
  },

  // ── 9. Speaking challenge: life used to be / favourite film ──────────────────
  {
    slug: 'cap08-speaking-how-life-used-to-be',
    title: 'Come vivevi prima? — how life used to be',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.lower_intermediate,
    summary:
      'An open speaking challenge: describe how your life, media habits, or favourite pastime ' +
      'used to be — then compare with how things changed. Puts all three past tenses into play ' +
      'in extended natural speech.',
    objectiveSkillSlugs: [
      'it-imperfetto',
      'it-imperfetto-vs-passato-prossimo',
      'it-trapassato',
      'it-vocab-media',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['film', 'family', 'history', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'The goal: unscripted past-tense speech',
        prompt:
          'This is a free-speaking challenge. I’ll give you a prompt and you speak for at least ' +
          '60–90 seconds without stopping to translate. Mistakes are fine — fluency is the target.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Describe your life five or ten years ago',
        prompt:
          'Talk about your life several years ago: where you lived, what you used to do in the evenings, ' +
          'what films or TV you watched, how you consumed news. ' +
          'Use the imperfetto for habits and states. Aim for 5–6 sentences.',
        notes:
          'This should feel like a personal journal entry, not a grammar exercise. ' +
          'Encourage rich description: setting, people, feelings, weather.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Name a turning point',
        prompt:
          'Now describe one thing that changed — a move, a decision, a discovery. ' +
          'Use passato prossimo for the event and imperfetto for what came before.',
        notes:
          'This is where imperfetto vs passato prossimo is most visible. ' +
          'Listen for accurate tense switching and give specific, actionable feedback.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Introduce a "had already" layer',
        prompt:
          'Add one sentence using the trapassato: what had already happened before that change?',
        exampleAnswer: 'Prima che mi trasferissi a Milano, avevo già deciso di cambiare lavoro.',
        notes: 'Keep it low-stakes: even one correct trapassato sentence is a win at this level.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-rate your tense accuracy',
        prompt:
          'On a scale of 1 to 5, how confident did you feel switching between imperfetto, ' +
          'passato prossimo, and trapassato? Which one caused the most hesitation?',
      },
    ],
  },

  // ── 10. Vocabulary review: media & TV ────────────────────────────────────────
  {
    slug: 'cap08-vocab-review-media-tv',
    title: 'Vocabolario: stampa, cinema e televisione',
    lessonType: LessonType.vocabulary_review,
    level: CEFRLevel.lower_intermediate,
    summary:
      'A structured review of the chapter’s media and cinema vocabulary — from il telegiornale ' +
      'and la rivista to il regista and i sottotitoli. Active recall through context, ' +
      'sentence building, and a personal-opinion round.',
    objectiveSkillSlugs: ['it-vocab-media', 'it-vocab-cinema-tv'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['film', 'news', 'culture', 'art'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Activate the chapter vocabulary',
        prompt:
          'Before we work with new grammar we’ll make sure the words are solid. ' +
          'This review covers: press vocabulary (giornale, rivista, notizie, telegiornale, stampa, ' +
          'abbonamento, pubblicità) and cinema/TV vocabulary ' +
          '(film, regista, attore/attrice, canale, programma, schermo, documentario, serie, sottotitoli).',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Meaning discrimination',
        prompt:
          'What is il telegiornale? ' +
          '(a) a telegram  (b) a TV news bulletin  (c) a cinema magazine',
        exampleAnswer: '(b) a TV news bulletin',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Words in context',
        prompt:
          'Complete with the best word: ' +
          '"Il ___ ha girato il film in soli venti giorni." (director) ' +
          '"Guarda i film con i ___ in italiano per migliorare la lingua." (subtitles) ' +
          '"Ho un ___ digitale a un giornale di cinema." (subscription)',
        exampleAnswer: 'regista … sottotitoli … abbonamento',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce the Italian',
        prompt:
          'Translate: "I changed channel because the adverts were too long." ' +
          'Then: "The actress had already won three prizes before this film."',
        exampleAnswer:
          'Ho cambiato canale perché la pubblicità era troppo lunga. ' +
          'L’attrice aveva già vinto tre premi prima di questo film.',
        notes: 'Second sentence uses trapassato — a nice grammar-vocab integration point.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Your actual media habits',
        prompt:
          'Use five words from the review in a short paragraph about what you read, watch, or listen to. ' +
          'It does not have to be past tense — present is fine here.',
        notes:
          'The goal is active production of the vocabulary in a personally meaningful context. ' +
          'Praise any correct use of the target words.',
      },
    ],
  },

  // ── 11. Progress check ───────────────────────────────────────────────────────
  {
    slug: 'cap08-progress-check',
    title: 'Capitolo 8 — progress check',
    lessonType: LessonType.progress_check,
    level: CEFRLevel.intermediate,
    summary:
      'A mixed checkpoint across all chapter skills: imperfetto forms and uses, ' +
      'imperfetto vs passato prossimo contrast, trapassato, suffixes, and media vocabulary. ' +
      'Identifies what is solid and what needs another pass before moving on.',
    objectiveSkillSlugs: [
      'it-imperfetto',
      'it-imperfetto-vs-passato-prossimo',
      'it-trapassato',
      'it-suffixes',
      'it-vocab-media',
      'it-vocab-cinema-tv',
    ],
    defaultDurationMinutes: 14,
    compatibleThemes: ['film', 'news', 'culture', 'history'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Low-stakes checkpoint',
        prompt:
          'We are going to take stock of Capitolo 8. There are six tasks — one per main skill. ' +
          'No pressure: this is diagnostic, not a test. Be honest and we’ll know exactly what to review.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Imperfetto — irregular forms',
        prompt:
          'Complete: "Da bambina lei ___ (essere) timida, ma ___ (fare) sempre ridere tutti con le sue storie."',
        exampleAnswer: 'era … faceva',
        notes: 'Both essere and fare are irregular imperfetto — the core check.',
      },
      {
        taskType: TaskType.tense_selection,
        focus: 'Imperfetto vs passato prossimo in context',
        prompt:
          'Choose: "Stamattina (leggere) ___ il giornale quando (arrivare) ___ una email urgente."',
        exampleAnswer: 'leggevo … è arrivata',
        notes: 'leggevo = ongoing background; è arrivata = interrupting event.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Trapassato in a sentence',
        prompt: 'Translate: "When the documentary ended, I realised I had already seen it."',
        exampleAnswer:
          'Quando il documentario è finito, mi sono reso/a conto che lo avevo già visto.',
        notes:
          'lo avevo già visto = trapassato. lo = lo schermo / il documentario (direct object).',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Suffix identification',
        prompt:
          'What does una parolaccia mean? ' +
          '(a) a long, complex word  (b) a rude or ugly word  (c) a technical term',
        exampleAnswer: '(b) a rude or ugly word',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Media vocabulary',
        prompt:
          'Complete with the right word: ' +
          '"Su quale ___ danno quel programma?" (channel) ' +
          '"Non guardo mai la TV senza ___ in italiano." (subtitles)',
        exampleAnswer: 'canale … sottotitoli',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assessment',
        prompt:
          'Which of the six topics — imperfetto, tense contrast, trapassato, suffixes, press vocab, ' +
          'cinema vocab — do you want to revisit before moving to Capitolo 9?',
        notes:
          'Use the learner’s answer to route them to the most relevant lesson template for a follow-up session.',
      },
    ],
  },
];

export default { unitCode, lessons };
