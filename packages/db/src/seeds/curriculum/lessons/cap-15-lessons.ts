// Additional lesson templates for Capitolo 15 — Le belle arti.
//
// These EXTEND the templates authored inline in units/cap-15-le-belle-arti.ts
// (the index merges both). This file provides a richer menu of curated lesson
// designs: per-skill drills for every chapter grammar point, an error-correction
// clinic, scenario roleplays, listening and speaking challenges, a vocabulary
// review, and a progress check.
//
// Rules mirror SPEC.md: original content; every in-string apostrophe is the
// curly ' (U+2019); slugs are globally unique and must not collide with the
// inline template slugs (cap15-passato-remoto-biography, cap15-gerund-progressive,
// cap15-museum-visit-roleplay, cap15-vocab-art-archaeology,
// cap15-volerci-metterci-drill).

import { CEFRLevel, LessonType, TaskType } from '@prisma/client';
import type { SeedLessonTemplate } from '../types';

export const unitCode = 'cap-15';

const lessons: SeedLessonTemplate[] = [
  // ─── 1. Passato remoto — regular paradigms drill ──────────────────────────
  {
    slug: 'cap15-drill-passato-remoto-regular',
    title: 'Parlò, credette, partì — the regular passato remoto',
    lessonType: LessonType.grammar,
    level: CEFRLevel.upper_intermediate,
    summary:
      'Build confidence with the regular passato remoto endings across all three conjugation ' +
      'classes before tackling the irregulars. Set in the context of minor Renaissance figures ' +
      'and historical anecdotes.',
    objectiveSkillSlugs: ['it-passato-remoto'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['art', 'history', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Three sets of endings',
        prompt:
          '-are verbs: parlai, parlasti, parlò, parlammo, parlaste, parlarono. ' +
          '-ere verbs: credei (or credetti), credesti, credé (or credette), credemmo, ' +
          'credeste, crederono (or credettero). ' +
          '-ire verbs: partii, partisti, partì, partimmo, partiste, partirono. ' +
          'The -are set is the most regular; the -ere set has two acceptable forms for io/lui/loro.',
        notes:
          'Stress that the accent on -ò (parlò) and -ì (partì) distinguishes third-person ' +
          'singular from first-person singular. Learners frequently omit the accent in writing.',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'Full paradigm: three conjugations',
        prompt:
          'Conjugate in full: (1) lavorare — a Renaissance craftsman’s apprenticeship narrative; ' +
          '(2) ricevere — an artist receiving a commission; (3) seguire — a student following a master.',
        exampleAnswer:
          'lavorai/lavorasti/lavorò/lavorammo/lavoraste/lavorarono; ' +
          'ricevei/ricevesti/ricevé/ricevemmo/riceveste/riceverono; ' +
          'seguii/seguisti/seguì/seguimmo/seguiste/seguirono',
        notes:
          'For ricevere, accept both the -ei/-é/-erono and the -etti/-ette/-ettero alternatives. ' +
          'Remind learners that the double-i in seguii marks io vs the accented seguì for lui/lei.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Regular forms in a historical passage',
        prompt:
          'Complete with the passato remoto: "Il giovane pittore ___ (lavorare) per dieci anni ' +
          'nella bottega del maestro. Un giorno il mecenate lo ___ (chiamare) e gli ___ (offrire) ' +
          'una grande commissione. Il pittore ___ (accettare) con gioia e ___ (partire) subito ' +
          'per Firenze."',
        exampleAnswer: 'lavorò; chiamò; offrì; accettò; partì',
        notes:
          'All five verbs are regular. If any learner uses the passato prossimo, acknowledge ' +
          'it is correct in speech but emphasise the passato remoto for historical narrative.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Historical facts → passato remoto',
        prompt:
          'Translate: "Galileo Galilei studied at the University of Pisa and later taught ' +
          'mathematics in Padua. He observed the moons of Jupiter and published his findings ' +
          'in 1610."',
        exampleAnswer:
          'Galileo Galilei studiò all’Università di Pisa e poi insegnò matematica a Padova. ' +
          'Osservò le lune di Giove e pubblicò le sue scoperte nel 1610.',
        notes:
          'All verbs are regular -are. Accept any reasonable synonym for "publish" ' +
          '(pubblicare → pubblicò, dare alle stampe → diede alle stampe).',
      },
      {
        taskType: TaskType.recap,
        focus: 'Spelling check: accents matter',
        prompt:
          'What is the difference between parlo and parlò? Between parti and partì? ' +
          'And between partii and partì?',
        exampleAnswer:
          'parlo = I speak (present); parlò = he/she spoke (passato remoto, accent signals past). ' +
          'parti = you leave (present imperative or informal); partì = he/she left. ' +
          'partii = I left (passato remoto, io); partì = he/she left (lui/lei).',
      },
    ],
  },

  // ─── 2. Passato remoto — irregulars deep-drill ────────────────────────────
  {
    slug: 'cap15-drill-passato-remoto-irregulars',
    title: 'Fui, ebbi, feci — the ten essential irregulars',
    lessonType: LessonType.grammar,
    level: CEFRLevel.upper_intermediate,
    summary:
      'Isolate and drill the ten most important irregular passato remoto verbs — essere, avere, ' +
      'fare, dire, vedere, venire, nascere, scrivere, prendere, dare — in Renaissance and ' +
      'literary contexts where they appear most naturally.',
    objectiveSkillSlugs: ['it-passato-remoto'],
    defaultDurationMinutes: 12,
    compatibleThemes: ['art', 'history', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Why the irregulars dominate literary Italian',
        prompt:
          'The ten most common verbs in Italian are almost all irregular in the passato remoto. ' +
          'Knowing fui/fosti/fu, ebbi/avesti/ebbe, feci/facesti/fece, dissi/dicesti/disse, ' +
          'vidi/vedesti/vide, venni/venisti/venne, nacqui/nascesti/nacque, ' +
          'scrissi/scrivesti/scrisse, presi/prendesti/prese, diedi/desti/diede ' +
          'gives you access to virtually all of Italian literary history.',
        notes:
          'Present the irregulars as a pattern set, not a random list. Note the -ss- stem ' +
          '(scrisse, disse), the doubling pattern (venni, feci), and the unique vowel shifts ' +
          '(nacque, vide). Group them visually if possible.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Identify the correct irregular form',
        prompt:
          'Choose the correct passato remoto: ' +
          '"Dante ___ (essere) esiliato da Firenze nel 1302." — fu / fui / era? ' +
          '"Leonardo ___ (avere) molti allievi nella sua bottega." — ebbe / aveva / ha avuto? ' +
          '"Caravaggio ___ (fare) scandalo con le sue opere." — feci / fece / faceva?',
        exampleAnswer: 'fu; ebbe; fece',
        notes:
          'Each distractor tests a different interference: fui (wrong person), era (imperfetto), ' +
          'aveva (imperfetto), ha avuto (passato prossimo), feci (wrong person). Flag the ' +
          'tense confusion as well as the person error.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Mixed irregulars in a biography',
        prompt:
          'Complete: "Michelangelo ___ (nascere) nel 1475. Da giovane ___ (venire) a Firenze ' +
          'e ___ (vedere) i grandi capolavori dell’antichità. Nel 1508 il Papa lo ___ (chiamare) ' +
          'a Roma: ___ (essere) l’inizio di quattro anni straordinari. Michelangelo ___ (scrivere) ' +
          'di sé: “Non ho amici e non ne voglio.”',
        exampleAnswer: 'nacque; venne; vide; chiamò; fu; scrisse',
        notes:
          'Note that chiamò is regular (-are). The quote is apocryphal — use it to anchor scrisse. ' +
          'If the learner writes naccette or vincette for nacque/venne, show the irregular root nacqu-/venn-.',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'io and lui/lei forms — rapid fire',
        prompt:
          'Give the io form and the lui/lei form for each: ' +
          'essere, avere, fare, dire, vedere, venire, nascere, scrivere, prendere, dare.',
        exampleAnswer:
          'fui/fu; ebbi/ebbe; feci/fece; dissi/disse; vidi/vide; ' +
          'venni/venne; nacqui/nacque; scrissi/scrisse; presi/prese; diedi/diede',
        notes:
          'This is a memorisation drill — accept the alternative detti/dette for dare. ' +
          'If the learner misses more than three, suggest writing them out as a set of flash cards.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Pattern recognition',
        prompt:
          'Which irregulars share the -ss- stem? Which use vowel doubling? Which change the root vowel?',
        exampleAnswer:
          '-ss- stem: scrisse, disse. Doubling: venni, feci (some learners also note ebbi). ' +
          'Root vowel change: nacque (nasc- → nacqu-), vide (ved- → vid-), prese (prend- → pres-).',
      },
    ],
  },

  // ─── 3. Ordinal numbers + centuries drill ─────────────────────────────────
  {
    slug: 'cap15-drill-ordinals-centuries',
    title: 'Il Cinquecento è il sedicesimo secolo — ordinals and art centuries',
    lessonType: LessonType.grammar,
    level: CEFRLevel.upper_intermediate,
    summary:
      'Master the ordinals from primo to decimo, form -esimo compounds, and learn the art-history ' +
      'shorthand (il Quattrocento, il Cinquecento, il Seicento) that comes up on every visit to an ' +
      'Italian gallery.',
    objectiveSkillSlugs: ['it-ordinal-numbers'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['art', 'history', 'culture', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Ordinals 1–10, -esimo, and the century shorthand',
        prompt:
          'Primo, secondo, terzo, quarto, quinto, sesto, settimo, ottavo, nono, decimo — ' +
          'these must be memorised. From eleven onwards: drop the final vowel of the cardinal, ' +
          'add -esimo (undicesimo, dodicesimo, ventesimo, centesimo). Agreement: they behave like ' +
          'adjectives (la terza sala, il secondo piano, i primi anni). ' +
          'Art shorthand: Italians name centuries by their hundreds — il Quattrocento = the 1400s ' +
          '(the 15th century); il Cinquecento = the 1500s (16th century); il Seicento = the 1600s ' +
          '(17th century); il Settecento = the 1700s (18th century).',
        notes:
          'The century shorthand trips up English speakers because Quattrocento literally means ' +
          '400 but refers to the 15th century. Use a simple table: 1200s → il Duecento (13th c.), ' +
          '1300s → il Trecento (14th c.) etc. This is high-priority for art discussion.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Insert the correct ordinal',
        prompt:
          'Complete with the ordinal number in full: ' +
          '"Dante visse nel ___ (13th) secolo." ' +
          '"Il Rinascimento fiorì nel ___ (15th) e nel ___ (16th) secolo." ' +
          '"Il David si trova al ___ (2nd) piano." ' +
          '"Questa è la ___ (3rd, f.) volta che visito Roma."',
        exampleAnswer: 'tredicesimo; quindicesimo; sedicesimo; secondo; terza',
        notes:
          'Emphasise agreement: tredicesimo (secolo, m.) but terza (volta, f.). ' +
          'For the century numbers, accept the art-shorthand il Quattrocento / il Cinquecento ' +
          'as well as the spelled-out ordinals.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Century shorthand — which art period?',
        prompt:
          'Match the artist to the correct century shorthand: ' +
          'Botticelli (1445–1510) → il ___; Caravaggio (1571–1610) → il ___; ' +
          'Canova (1757–1822) → il ___ / il ___.',
        exampleAnswer:
          'Botticelli → il Quattrocento (and early Cinquecento); ' +
          'Caravaggio → il Seicento (early); Canova → il Settecento / il primo Ottocento.',
        notes:
          'This is application-level: learners must map birth/death years to the shorthand. ' +
          'Caravaggio is a good test because he was born in 1571 (still Cinquecento) but most ' +
          'of his famous work is Seicento — praise partial answers that note both centuries.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Ordinals in context',
        prompt:
          'Translate: "The Uffizi is celebrating its five-hundredth anniversary this year. ' +
          'My third visit was the most memorable. The second floor has the best paintings."',
        exampleAnswer:
          'Gli Uffizi festeggiano il loro cinquecentesimo anniversario quest’anno. ' +
          'La mia terza visita è stata la più memorabile. ' +
          'Il secondo piano ha i dipinti più belli.',
        notes:
          'Cinquecentesimo is the main challenge — stress the elision rule (cinquecento → ' +
          'cinquecentesimo, dropping nothing here because cento ends in a consonant sound). ' +
          'Accept il piano secondo as an alternative word order.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Quick-fire century check',
        prompt: 'Without looking: what does il Trecento refer to? Il Quattrocento? Il Novecento?',
        exampleAnswer:
          'Il Trecento = the 1300s (14th century, the age of Dante and Giotto). ' +
          'Il Quattrocento = the 1400s (15th century, early Renaissance). ' +
          'Il Novecento = the 1900s (20th century, modern art).',
      },
    ],
  },

  // ─── 4. Volerci vs metterci — focused contrast drill ──────────────────────
  {
    slug: 'cap15-drill-volerci-vs-metterci',
    title: 'Ci vogliono secoli — volerci and metterci in the past',
    lessonType: LessonType.grammar,
    level: CEFRLevel.upper_intermediate,
    summary:
      'Deepen the volerci/metterci contrast by drilling both the present and the past tenses: ' +
      'ci è voluto/ci sono voluti vs ci ho messo/ci ha messo — common stumbling blocks.',
    objectiveSkillSlugs: ['it-volerci-metterci'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['art', 'history', 'culture', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Past tense of volerci and metterci',
        prompt:
          'Volerci in the past: ci è voluto (sg. subject: un anno), ci sono voluti (pl.: mesi). ' +
          'The auxiliary is essere and the participle agrees with the subject noun. ' +
          'Metterci in the past: ci ho messo (io), ci hai messo, ci ha messo, ci abbiamo messo … ' +
          'The auxiliary is avere, so the participle stays messo — no agreement. ' +
          'Example: Per restaurare il Colosseo ci sono voluti decenni. ' +
          'Il team di esperti ci ha messo tre anni solo per la fase preliminare.',
        notes:
          'The essere/avere split in the past is the most common error. ' +
          'Contrast ci è voluta (one female noun: un’opera) — agreement is often forgotten.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Present and past in one passage',
        prompt:
          'Complete: "Quanto ___ (volerci, present) per imparare a dipingere a olio? ' +
          'Di solito ___ (volerci, present) almeno due anni di pratica. ' +
          'Mia cugina ___ (metterci, passato) tre anni prima di fare il suo primo quadro decente. ' +
          'Alla fine ___ (volerci, passato) tanta pazienza."',
        exampleAnswer: 'ci vuole; ci vogliono; ci ha messo; ci è voluta',
        notes:
          'The last blank is the trap: pazienza is f. sg., so the agreement is ci è voluta. ' +
          'Flag any learner who writes ci è voluto — it must agree with pazienza.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Past-tense agreement errors',
        prompt:
          'Correct where wrong: ' +
          '"Ci è voluto molti anni per costruire il Duomo di Milano." ' +
          '"Io ci sono messo mezz’ora a trovare parcheggio." ' +
          '"Per completare gli affreschi ci ha voluto un’intera estate."',
        exampleAnswer:
          'Ci sono voluti molti anni … (anni is plural → ci sono voluti). ' +
          'Io ci ho messo mezz’ora … (metterci uses avere, not essere). ' +
          'Per completare gli affreschi ci è voluta un’intera estate. ' +
          '(estate is f. → ci è voluta, not ci ha voluto).',
        notes:
          'Three different error types: plural agreement, wrong auxiliary, gender agreement. ' +
          'Address each separately in feedback.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Talk about a real project or journey',
        prompt:
          'Describe a project or journey using both volerci and metterci — at least one in the past. ' +
          'For example: how long does it take to fly to Italy, and how long did it take you ' +
          'to pack for a trip?',
        notes:
          'Personalise: for art-interested learners, ask about a creative project; for travellers, ' +
          'a journey; for language learners, their Italian study. Reward correct past agreement.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Summary: the four key forms',
        prompt:
          'Give the Italian for: (1) It takes time. (2) It took a lot of energy (energia, f.). ' +
          '(3) I took two hours. (4) She took all day (la giornata intera).',
        exampleAnswer:
          'Ci vuole tempo. Ci è voluta molta energia. Ci ho messo due ore. Ci ha messo la giornata intera.',
      },
    ],
  },

  // ─── 5. Gerundio — progressive and "by doing" ─────────────────────────────
  {
    slug: 'cap15-drill-gerund-uses',
    title: 'Studiando si impara — the gerund beyond the progressive',
    lessonType: LessonType.grammar,
    level: CEFRLevel.upper_intermediate,
    summary:
      'Expand gerund skills beyond stare + gerundio into the free-standing gerund for ' +
      'simultaneous action and the instrumental "by doing" — with pronoun attachment practised ' +
      'separately.',
    objectiveSkillSlugs: ['it-gerund'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['art', 'culture', 'history', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The three jobs of the Italian gerund',
        prompt:
          'Job 1 — progressive (stare + gerundio): Sto leggendo un libro su Caravaggio. ' +
          'Job 2 — simultaneous action (while doing): Passeggiando per il museo, notai molti dettagli. ' +
          'Job 3 — instrumental (by doing): Osservando ogni dettaglio, si capisce lo stile dell’artista. ' +
          'Critical rule: the subject of the gerund and the subject of the main verb must be the same. ' +
          'Pronouns always attach to the end: guardandolo, scrivendola, leggendoli.',
        notes:
          'Learners often confuse the simultaneous gerund with the English present participle ' +
          'used as an adjective ("a running man") — in Italian that would be un uomo che corre. ' +
          'Emphasise that the Italian gerund is a verbal, not adjectival, form.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Identify and form the correct gerund',
        prompt:
          'Complete: "Gli studiosi ___ (analizzare, progressive) i manoscritti di Leonardo ' +
          'trovano informazioni straordinarie. ___ (Visitare, simultaneous) Pompei, si ha ' +
          'l’impressione di tornare all’antichità. ___ (Osservare, instrumental) la tecnica ' +
          'del pittore, si possono capire i suoi metodi."',
        exampleAnswer: 'stanno analizzando; Visitando; Osservando',
        notes:
          'The first blank requires stare conjugated in the present (stanno) + analizzando. ' +
          'The second and third are free-standing gerunds — no stare.',
      },
      {
        taskType: TaskType.translation,
        focus: '"By doing" and pronoun attachment',
        prompt:
          'Translate: "By reading Dante slowly, one discovers the beauty of medieval Italian. ' +
          'I was admiring the painting when a guard approached me and asked me to step back — ' +
          'I was studying it closely."',
        exampleAnswer:
          'Leggendo Dante lentamente, si scopre la bellezza dell’italiano medievale. ' +
          'Stavo ammirando il quadro quando una guardia mi si avvicinò e mi chiese di fare un passo indietro — ' +
          'lo stavo studiando da vicino.',
        notes:
          'The first sentence is instrumental. The second uses stare + gerundio (stavo ammirando, ' +
          'lo stavo studiando) — note that with stare + gerundio the pronoun precedes stare, not ' +
          'attaches to the gerund. This contrasts with the free-standing gerund where it attaches.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Catch the dangling gerund',
        prompt:
          'Find and correct the error in each sentence: ' +
          '"Visitando il Colosseo, la pioggia iniziò a cadere." ' +
          '"Ho fotografato il quadro guardandolo." ' +
          '"Facendo silenzio, il discorso del professore fu ascoltato con attenzione."',
        exampleAnswer:
          'Sentence 1: la pioggia did not visit the Colosseum — rewrite as: ' +
          'Mentre visitavo il Colosseo, la pioggia iniziò a cadere. ' +
          'Sentence 2: correct (guardandolo — pronoun attached, same subject). ' +
          'Sentence 3: dangling gerund — il discorso did not make silence. ' +
          'Rewrite: Facendo silenzio, gli studenti ascoltarono il discorso con attenzione.',
        notes:
          'Sentence 2 is intentionally correct — learners should recognise it as valid. ' +
          'The dangling gerund is the key teaching point in sentences 1 and 3.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Quick production',
        prompt:
          'Say one thing you are doing right now (progressive), one thing you were thinking ' +
          'about while doing something today (simultaneous), and one skill you improve by practising it.',
      },
    ],
  },

  // ─── 6. Error-correction clinic ────────────────────────────────────────────
  {
    slug: 'cap15-clinic-art-tense-errors',
    title: 'Clinica degli errori — passato remoto, volerci, gerund',
    lessonType: LessonType.grammar,
    level: CEFRLevel.upper_intermediate,
    summary:
      'A targeted clinic on the three main stumbling blocks of this chapter: irregular passato ' +
      'remoto forms, volerci agreement and auxiliary choice, and gerund vs infinitive. Fix the ' +
      'errors, understand the rule, and produce a clean sentence.',
    objectiveSkillSlugs: ['it-passato-remoto', 'it-volerci-metterci', 'it-gerund'],
    defaultDurationMinutes: 11,
    compatibleThemes: ['art', 'history', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Why these errors cluster',
        prompt:
          'The passato remoto irregulars, the volerci agreement trap, and the gerund-for-infinitive ' +
          'swap are the three errors that most often appear together in intermediate writing. ' +
          'Each one has a clear fix — let’s go through them systematically.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Passato remoto irregulars',
        prompt:
          'Correct every error: ' +
          '"Dante nacquì a Firenze nel 1265." ' +
          '"Leonardo faciì molti esperimenti scientifici." ' +
          '"Gli imperatori romani diederono grandi feste pubbliche." ' +
          '"Quando vidi il David per la prima volta, rimasto senza parole."',
        exampleAnswer:
          'nacque (not nacquì — the io form is nacqui, the lui/lei is nacque); ' +
          'fece (not faciì — irregular stem fec-); ' +
          'diedero (not diederono — the correct form drops the -no variant; also dettero); ' +
          'rimasi (not rimasto — passato remoto, not past participle: rimasi senza parole).',
        notes:
          'Four different irregulars. Address each root separately. ' +
          'Nacquì confuses the io and lui/lei forms — a very common error.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Volerci — auxiliary and agreement',
        prompt:
          'Correct: ' +
          '"Per dipingere la Cappella Sistina ci ha voluto quattro anni." ' +
          '"A me ci vuole molte ore per leggere un capitolo di Dante." ' +
          '"Il restauro ci sono messo cinque anni."',
        exampleAnswer:
          'Ci sono voluti quattro anni (anni is plural → essere auxiliary, plural participle). ' +
          'A me ci vogliono molte ore (vogliono agrees with ore, plural). ' +
          'Il restauro ci è voluto cinque anni OR ci sono voluti cinque anni per il restauro ' +
          '(volerci, not metterci — il restauro is a task, not a personal agent).',
        notes:
          'The third sentence also has the wrong verb (messo belongs to metterci). ' +
          'If the learner fixes only the auxiliary, give partial credit but explain the ' +
          'volerci/metterci distinction as well.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Gerund vs infinitive — and the dangling gerund',
        prompt:
          'Correct where wrong: ' +
          '"Visitando il museo, la collezione mi sembrò enorme." ' +
          '"Sto a guardare il quadro da dieci minuti." ' +
          '"Si impara sbagliare." ' +
          '"Guardandola, la statua è molto dettagliata."',
        exampleAnswer:
          'Sentence 1: dangling — la collezione did not visit the museum. Fix: ' +
          'Visitando il museo, trovai che la collezione era enorme. ' +
          'Sentence 2: sto + infinitive is wrong — use gerund: Sto guardando il quadro da dieci minuti. ' +
          'Sentence 3: the instrumental gerund requires -ando/-endo, not the infinitive: ' +
          'Si impara sbagliando. ' +
          'Sentence 4: correct — same subject (implicit one/you), gerund properly used.',
        notes:
          'Sentence 4 is intentionally correct so learners do not over-correct. ' +
          'Sto + infinitive (sentence 2) is the most common progressive error.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Clean production after the clinic',
        prompt:
          'Tell Wise two or three things about an Italian artist or historical figure you ' +
          'find interesting, using at least one passato remoto irregular, one gerund, and ' +
          'either volerci or metterci.',
        notes:
          'Free-production task after the clinic. Reward all three structures. If the learner ' +
          'struggles, offer a prompt: "What do you know about Dante, Michelangelo, or Caravaggio?"',
      },
    ],
  },

  // ─── 7. Scenario roleplay — guided museum tour ────────────────────────────
  {
    slug: 'cap15-roleplay-tour-guide',
    title: 'Benvenuti in questo capolavoro — playing the tour guide',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.upper_intermediate,
    summary:
      'You are the guide leading a small group through a Roman museum. Describe a sculpture ' +
      'using the gerund and art vocabulary, explain historical background in the passato remoto, ' +
      'use ordinals to navigate rooms, and answer a visitor’s questions.',
    objectiveSkillSlugs: ['it-vocab-art', 'it-vocab-artists', 'it-passato-remoto', 'it-gerund'],
    defaultDurationMinutes: 14,
    compatibleThemes: ['art', 'history', 'travel', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'You are a guide at a museum in Rome — perhaps the Musei Capitolini or the Galleria Borghese. ' +
          'A small group of international visitors is following you. Wise will play a visitor ' +
          'asking questions. Your job: describe what you see, give historical context, and navigate ' +
          'the space. Use the passato remoto for history, the gerund to describe what visitors ' +
          'are seeing, and ordinals to direct the group.',
        notes:
          'If the learner has a favourite Italian city or museum, set the scene there instead. ' +
          'The roleplay works for any great collection — the Uffizi, the Naples Archaeological Museum, ' +
          'the Borghese.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Open the tour: introduce the first room',
        prompt:
          'Welcome the group to the museum and introduce the first room. Say what period it ' +
          'covers, mention one key work, and direct the group to the second room using an ordinal.',
        exampleAnswer:
          'Benvenuti ai Musei Capitolini! Ci troviamo nella prima sala dedicata all’arte romana del ' +
          'primo secolo dopo Cristo. Il pezzo più importante è questo busto — guardate come lo scultore ' +
          'rese ogni dettaglio del viso con precisione straordinaria. Seguendomi, passiamo ora ' +
          'alla seconda sala dove troveremo i capolavori del secondo secolo.',
        notes:
          'Reward use of an ordinal, at least one gerund or gerund phrase, and art vocabulary. ' +
          'The example is a guide — the learner should use their own words.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Describe a specific artwork using the gerund',
        prompt:
          'Stop in front of a major work (choose one: a fresco, a sculpture, or a mosaic). ' +
          'Describe it in four to five sentences. Use at least two gerund constructions — ' +
          'one progressive and one free-standing.',
        exampleAnswer:
          'Stiamo guardando uno dei più grandi affreschi del museo. ' +
          'Osservandolo attentamente, notate come il pittore usò il colore rosso per guidare lo sguardo ' +
          'verso il centro della scena. La tecnica è quella tipica del Quattrocento: stendendo ' +
          'sottili strati di colore, l’artista ottenne una luminosità straordinaria. ' +
          'Avvicinandovi, potete vedere anche le piccole crepe tipiche degli affreschi antichi.',
        notes:
          'Four gerunds in the example — the learner needs at least two. ' +
          'Personalise: if they prefer sculpture, prompt with a Roman marble; if mosaics, with Ravenna or Naples.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Answer a visitor’s historical question in passato remoto',
        prompt:
          'A visitor asks: "Chi commissionò quest’opera? E quando?" Answer in three to four ' +
          'sentences using the passato remoto, naming a patron and an approximate date.',
        exampleAnswer:
          'Quest’opera fu commissionata dall’imperatore Adriano intorno al 120 dopo Cristo. ' +
          'L’artista venne chiamato da Atene, dove aveva già lavorato per anni. ' +
          'Quando l’imperatore vide il risultato finale, rimase così colpito che decise di collocare ' +
          'il pezzo nella sala più importante del palazzo.',
        notes:
          'Reward: fu commissionata, venne chiamato, vide, rimase (all passato remoto, several irregular). ' +
          'Accept any plausible historical scenario — accuracy about specific works is less important ' +
          'than grammatical correctness.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assessment of the guide role',
        prompt:
          'What did you find most challenging — describing the artwork, narrating history, ' +
          'or navigating in Italian? Which structure do you want more practice on?',
      },
    ],
  },

  // ─── 8. Scenario roleplay — biographical episode in passato remoto ─────────
  {
    slug: 'cap15-roleplay-historical-episode',
    title: 'Era una notte di gennaio — narrate a historical moment',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.advanced,
    summary:
      'Tell a biographical or historical episode entirely in the passato remoto, mixing regular ' +
      'and irregular verbs, and weave in the gerund for vivid simultaneous detail. Think of a ' +
      'narrator recounting the life of an Italian artist to a listener.',
    objectiveSkillSlugs: ['it-passato-remoto', 'it-gerund', 'it-vocab-artists'],
    defaultDurationMinutes: 13,
    compatibleThemes: ['art', 'history', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'The storytelling register',
        prompt:
          'In Italian literature and formal storytelling, the passato remoto is the tense of choice. ' +
          'Think of it like the English simple past in a novel: "He walked into the room, opened ' +
          'the window, and saw the city below him." Every verb in that sequence would be passato remoto ' +
          'in Italian. Adding a gerund gives the narration texture: "Aprendo la finestra, vide la città." ' +
          'Today you’ll narrate an episode from the life of an Italian artist.',
        notes:
          'Suggest three options: (a) the moment Michelangelo first saw the block of marble that ' +
          'became the David; (b) Caravaggio fleeing Rome after the fatal brawl in 1606; (c) Dante ' +
          'being exiled from Florence in 1302. Let the learner choose — or invent their own episode.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Narrate the opening of the episode',
        prompt:
          'Begin your narration. Set the scene (time, place, protagonist) and describe the first ' +
          'action. Use at least three passato remoto verbs and one gerund. Aim for five to seven sentences.',
        notes:
          'This is an open speaking task — model by offering the first sentence if the learner is stuck: ' +
          '"Era il 1501. Michelangelo arrivò a Firenze, entrò nel laboratorio e vide per la prima volta ' +
          'il grande blocco di marmo abbandonato."',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Fill in the missing verbs in a model narrative',
        prompt:
          'Complete the episode about Caravaggio: ' +
          '"Nel 1606 Caravaggio ___ (uccidere) un uomo in una rissa a Roma. ___ (Sapere) che la ' +
          'polizia lo cercava, ___ (fuggire) dalla città quella stessa notte. ___ (Viaggiare) ' +
          'verso il sud, ___ (arrivare) a Napoli dove ___ (trovare) rifugio presso un nobile ' +
          'mecenate. Lì ___ (dipingere) alcune delle sue opere più intense."',
        exampleAnswer:
          'uccise; Sapendo (gerund); fuggì; Viaggiando (gerund); arrivò; trovò; dipinse',
        notes:
          'The two gerunds (sapendo, viaggiando) create simultaneous/instrumental clauses. ' +
          'Uccidere has a regular passato remoto in -ere (uccise); fuggire is regular -ire (fuggì). ' +
          'Flag any learner who uses the imperfetto for action verbs — these are narrative actions, not states.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Bring the episode to a close',
        prompt:
          'Translate a closing passage: "Caravaggio spent the last four years of his life moving ' +
          'between Naples, Malta, and Sicily. He never returned to Rome. He died in 1610, ' +
          'still hoping for a pardon from the Pope."',
        exampleAnswer:
          'Caravaggio passò gli ultimi quattro anni della sua vita spostandosi tra Napoli, Malta e la Sicilia. ' +
          'Non tornò mai a Roma. Morì nel 1610, sperando ancora in un perdono del Papa.',
        notes:
          'Spostandosi is a reflexive gerund (simultaneous/manner); sperando ancora is a simultaneous gerund. ' +
          'Both are optional enrichments — reward them but do not penalise their absence.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Narrator’s toolkit',
        prompt:
          'Which verbs in your narration today were irregular in the passato remoto? ' +
          'List at least four with their forms.',
      },
    ],
  },

  // ─── 9. Listening challenge — narrated artist’s life ─────────────────────
  {
    slug: 'cap15-listening-artists-life',
    title: 'Ascoltando la storia — a narrated life in the passato remoto',
    lessonType: LessonType.listening_challenge,
    level: CEFRLevel.upper_intermediate,
    summary:
      'Listen to a short narrated biography of an Italian artist delivered entirely in the ' +
      'passato remoto. Train the ear to catch irregular forms, pick out key dates and ordinal ' +
      'references, and reconstruct the chronology.',
    objectiveSkillSlugs: ['it-passato-remoto', 'it-ordinal-numbers', 'it-vocab-artists'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['art', 'history', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Listening focus: the passato remoto in the wild',
        prompt:
          'In this listening task, Wise will read a short narrated biography — about two minutes ' +
          'of natural-speed Italian. Your job: (1) catch every passato remoto irregular you hear; ' +
          '(2) note any ordinal number or century reference; (3) reconstruct the order of events. ' +
          'The biography covers Artemisia Gentileschi — the first woman admitted to the Florentine ' +
          'Accademia delle Arti del Disegno.',
        notes:
          'The engine should produce a two-minute narration about Artemisia Gentileschi ' +
          '(1593–1656), mixing regular and irregular passato remoto, at least three ordinal/century ' +
          'references, and vocabulary from this chapter. Read at a measured but natural pace.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Catch the irregular verbs',
        prompt:
          'After listening: list as many irregular passato remoto verbs as you heard, with their ' +
          'subject. For example: "nacque — lei (Artemisia)".',
        notes:
          'Expected forms in a well-written biography: nacque, crebbe, vide (or studiò), ' +
          'divenne, ottenne, dipinse, vinse, fu (ammessa/riconosciuta). Award one point per ' +
          'correctly identified verb + subject pairing.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Ordinal and century comprehension',
        prompt:
          'Answer: In which century did Artemisia work primarily — il Cinquecento, il Seicento, or il Settecento? ' +
          'What floor of the Accademia was mentioned? Was her first masterpiece called la prima or la seconda opera?',
        exampleAnswer:
          'Il Seicento (she was born 1593, most famous work 1612–1620). ' +
          'Floor / other answers depend on the engine’s script — reward accurate recall.',
        notes:
          'The engine may script the floor and opera reference differently — the key is that ' +
          'the learner demonstrates ordinal comprehension, not a specific answer.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Chronological reconstruction',
        prompt:
          'Put these events in the order heard: (a) Artemisia was admitted to the Accademia. ' +
          '(b) She painted her most famous work. (c) She was born in Rome. (d) She moved to Florence.',
        exampleAnswer: 'c → d → b → a (or close variant depending on the engine script)',
        notes:
          'This tests global listening comprehension rather than grammar — a useful counterbalance ' +
          'to the grammar-focused tasks above.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Listener’s reflection',
        prompt:
          'Which passato remoto forms did you mishear or not recognise in the moment? ' +
          'What would you do differently if you listened again?',
      },
    ],
  },

  // ─── 10. Speaking challenge — describe an artwork with the gerund ──────────
  {
    slug: 'cap15-speaking-describe-artwork',
    title: 'Parlami di questo dipinto — describe an artwork in Italian',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.upper_intermediate,
    summary:
      'Choose any artwork — painting, sculpture, or photograph — and describe it in a one- to ' +
      'two-minute spoken monologue. Use the gerund for what is happening in the scene, art ' +
      'vocabulary throughout, and at least one passato remoto sentence giving historical context.',
    objectiveSkillSlugs: ['it-gerund', 'it-vocab-art', 'it-vocab-artists', 'it-passato-remoto'],
    defaultDurationMinutes: 12,
    compatibleThemes: ['art', 'culture', 'history', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'How to describe a visual work in Italian',
        prompt:
          'A strong art description moves through four layers: (1) what you see overall (the subject); ' +
          '(2) what is happening — ideal for the gerund (una figura femminile che sta guardando / ' +
          'guardando verso sinistra); (3) technique and style (lo stile, il colore, la luce); ' +
          '(4) your reaction or historical context. Today you do all four.',
        notes:
          'If the learner cannot think of a work, offer three options: Botticelli’s Primavera, ' +
          'Michelangelo’s David, or Caravaggio’s Chiamata di san Matteo. Alternatively let them ' +
          'choose a non-Italian artwork — the grammar is the goal, not Italian art knowledge.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Layers 1 and 2 — subject and action',
        prompt:
          'Describe what you see and what is happening. Use at least two gerund constructions — ' +
          'one with stare for something happening right now in the scene, one free-standing for ' +
          'simultaneous or instrumental action. Aim for four to five sentences.',
        notes:
          'For example: "Sto guardando la Primavera di Botticelli. Nel dipinto, tre donne stanno danzando ' +
          'in cerchio. Guardandole da vicino, si nota che le loro vesti sembrano quasi trasparenti. ' +
          'Al centro, una figura femminile sta rivolgendo lo sguardo verso di noi." ' +
          'Award one credit per correct gerund construction; note any dangling gerunds gently.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Layers 3 and 4 — technique and context',
        prompt:
          'Now describe the style, technique, or palette, and add one or two sentences of historical ' +
          'context in the passato remoto. Who made it, when, and for whom?',
        notes:
          'Reward: stile, colore, luce, tecnica, affresco/quadro/scultura + at least one correct ' +
          'passato remoto verb. The historical sentences may be simple: "Botticelli dipinse quest’opera ' +
          'verso il 1482. La commissionò la famiglia Medici."',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Your reaction — volerci or metterci',
        prompt:
          'Finish with your personal reaction. Include a volerci or metterci phrase: ' +
          'how long does it take to really appreciate this work? How long did it take the artist?',
        notes:
          'The connection between the visual description and the time-expression grammar is ' +
          'intentional — it grounds the structural lesson in authentic discourse.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Describe to understand',
        prompt:
          'Did describing the artwork in Italian make you look at it differently? ' +
          'Which Italian words felt most expressive?',
      },
    ],
  },

  // ─── 11. Vocabulary review — art and archaeology ──────────────────────────
  {
    slug: 'cap15-vocab-review-art-arch',
    title: 'Pennelli, rovine, capolavori — art and archaeology vocabulary review',
    lessonType: LessonType.vocabulary_review,
    level: CEFRLevel.upper_intermediate,
    summary:
      'Consolidate the full chapter vocabulary: visual arts, literature, professional titles with ' +
      'gender, and the archaeology cluster — practised in context with light grammatical framing.',
    objectiveSkillSlugs: ['it-vocab-art', 'it-vocab-artists'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['art', 'history', 'culture', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Two worlds of Italian culture',
        prompt:
          'Today we review the vocabulary that makes Italian art and history come alive: from ' +
          'the painter’s studio (la bottega) to the archaeologist’s trench (lo scavo), ' +
          'from the gallery wall to the Renaissance century shorthands. ' +
          'Knowing these words lets you read exhibition labels, understand museum audio guides, ' +
          'and talk about Italian culture with confidence.',
        notes:
          'If the learner has a declared interest (e.g., Roman history, Renaissance painting, ' +
          'or Italian literature), front-load the most relevant cluster.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Precise word choice in context',
        prompt:
          'Choose the best word: ' +
          '"Michelangelo era ___ (uno scultore / un pittore / uno scrittore) oltre che pittore." ' +
          '"Gli archeologi hanno trovato nuovi ___ (reperti / restauri / dipinti) a Pompei." ' +
          '"Il Colosseo è uno dei ___ (capolavori / romanzi / affreschi) dell’architettura romana."',
        exampleAnswer: 'uno scultore; reperti; capolavori',
        notes:
          'The first question reinforces that Michelangelo was primarily a sculptor (and also ' +
          'a painter and poet). The second tests the archaeology cluster. The third tests capolavoro ' +
          'in a non-painting context (architecture counts as a capolavoro).',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Gender and professional titles',
        prompt:
          'Fill in the correct professional title: ' +
          '"Sofonisba Anguissola fu una grande ___ (pittore, f.) del Cinquecento." ' +
          '"Il team di ___ (archeologo, m. pl.) lavorò per tre anni a Ercolano." ' +
          '"___ (architetto, f.) che progettò questo palazzo era famosa in tutta Europa."',
        exampleAnswer: 'pittrice; archeologi; L’architetta (or L’architetto)',
        notes:
          'Pittrice (not *pittora) is the form to emphasise. Both architetta and architetto are ' +
          'accepted for the feminine; mention that architetta is increasingly preferred. ' +
          'Archeologi is masculine plural but used as the generic plural (mixed groups).',
      },
      {
        taskType: TaskType.translation,
        focus: 'From English glosses to Italian in context',
        prompt:
          'Translate: "The exhibition of Roman mosaics opens on the fifteenth of June. ' +
          'The restoration of the frescoes took two years. According to the archaeologist, ' +
          'this find is the most important of the decade."',
        exampleAnswer:
          'La mostra dei mosaici romani apre il quindici giugno. ' +
          'Il restauro degli affreschi è durato due anni (or: ci sono voluti due anni per il restauro degli affreschi). ' +
          'Secondo l’archeologa (or l’archeologo), questo reperto è il più importante del decennio.',
        notes:
          'Accept either gender for l’archaeologist. Accept both regular past tenses for "took". ' +
          '"Of the decade" gives a chance to use decennio — a useful advanced word.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Essential glosses',
        prompt:
          'Give the Italian for: masterpiece, fresco, novel, poet (f.), excavation, restoration, style, exhibition.',
        exampleAnswer:
          'il capolavoro; l’affresco; il romanzo; la poetessa; gli scavi; il restauro; lo stile; la mostra',
      },
    ],
  },

  // ─── 12. Progress check ────────────────────────────────────────────────────
  {
    slug: 'cap15-progress-check',
    title: 'Verifica di fine capitolo — Le belle arti',
    lessonType: LessonType.progress_check,
    level: CEFRLevel.upper_intermediate,
    summary:
      'A mixed-skill checkpoint across all five chapter skills: passato remoto (regular and ' +
      'irregular), ordinal numbers, volerci/metterci, gerund, and art vocabulary — see what ' +
      'has become automatic and what still needs a further pass.',
    objectiveSkillSlugs: [
      'it-passato-remoto',
      'it-ordinal-numbers',
      'it-volerci-metterci',
      'it-gerund',
      'it-vocab-art',
      'it-vocab-artists',
    ],
    defaultDurationMinutes: 14,
    compatibleThemes: ['art', 'history', 'culture', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Chapter 15 — what you can now do',
        prompt:
          'You have covered the tense of Dante and Leonardo, the gerund of observation and discovery, ' +
          'the mathematics of time, and the language of Italy’s greatest artistic heritage. ' +
          'This checkpoint visits each skill briefly — the goal is self-awareness, not perfection.',
        notes:
          'Keep the tone light and encouraging. If a learner scores strongly on all tasks, ' +
          'flag them as ready for chapter 16 (congiuntivo).',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Passato remoto — mixed regular and irregular',
        prompt:
          'Complete with the passato remoto: ' +
          '"Raffaello ___ (nascere) a Urbino nel 1483 e ___ (morire) a Roma nel 1520. ' +
          'In soli trentasette anni ___ (fare) opere straordinarie. ' +
          'Quando il Papa lo ___ (vedere) lavorare, lo ___ (chiamare) a decorare le Stanze Vaticane."',
        exampleAnswer: 'nacque; morì; fece; vide; chiamò',
        notes:
          'Four irregulars (nacque, fece, vide) and two regular (morì, chiamò). ' +
          'If the learner mixes in passato prossimo or imperfetto, use it as a diagnostic signal.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Ordinals and centuries',
        prompt:
          'Translate: "Raphael was the third great genius of the Renaissance, after Leonardo and Michelangelo. ' +
          'His most famous work was painted in the early sixteenth century."',
        exampleAnswer:
          'Raffaello fu il terzo grande genio del Rinascimento, dopo Leonardo e Michelangelo. ' +
          'La sua opera più famosa fu dipinta all’inizio del Cinquecento.',
        notes:
          'Terzo must agree with genio (m. sg.). Il Cinquecento is the preferred shorthand. ' +
          'Accept early-sixteenth-century periphrasis (nel primo Cinquecento).',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Volerci vs metterci',
        prompt:
          'Choose: "Per visitare bene i Musei Vaticani ___ (ci vogliono / ci mettono) almeno quattro ore." ' +
          '"Noi ___ (ci vuole / ci mettiamo) sempre più tempo del previsto." ' +
          '"Quanto ___ (ci vorrà / ci metterò) per finire questo capitolo?"',
        exampleAnswer: 'ci vogliono; ci mettiamo; ci vorrà (impersonal future of volerci)',
        notes:
          'The third sentence uses the future tense of volerci — a useful preview. ' +
          'Accept ci metterò if the learner reads "I" as the subject of the third question.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Gerund — form and use',
        prompt:
          'Rewrite using a gerund: ' +
          '"Mentre camminavo per le sale, capii quanto fosse grande la collezione." ' +
          '"Mentre osservavo gli affreschi, mi resi conto di stare guardando la storia."',
        exampleAnswer:
          'Camminando per le sale, capii quanto fosse grande la collezione. ' +
          'Osservando gli affreschi, mi resi conto di stare guardando la storia.',
        notes:
          'Both sentences have the same subject in the mentre-clause and the main clause — ' +
          'so the gerund substitution is correct. If the learner is uncertain, affirm the rule.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Where are you now?',
        prompt:
          'Which skill felt most natural today — passato remoto, ordinals, volerci/metterci, gerund, ' +
          'or vocabulary? Which one do you want to return to? Mark it and Wise will schedule a ' +
          'recovery session.',
      },
    ],
  },
];

export default { unitCode, lessons };
